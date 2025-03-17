
/**
 * Data services for Career Pathway
 * Handles data fetching and persistence
 */

import { supabase } from '@/integrations/supabase/client';
import { CareerPath, CareerNode } from './types';
import { mockCareerPaths } from '../mockData';

// Get all available career paths
export const getCareerPaths = async (): Promise<CareerPath[]> => {
  try {
    // Fetch career paths from Supabase
    const { data: pathsData, error: pathsError } = await supabase
      .from('career_paths')
      .select('*');

    if (pathsError) throw pathsError;

    if (!pathsData || pathsData.length === 0) {
      console.log("No career paths found in database, using mock data");
      return mockCareerPaths; // Fallback to mock data if no paths in database
    }

    // For each career path, fetch the nodes
    const careerPaths: CareerPath[] = await Promise.all(
      pathsData.map(async (path) => {
        // Fetch nodes for this path
        const { data: nodesData, error: nodesError } = await supabase
          .from('career_path_nodes')
          .select('*')
          .eq('path_id', path.id);

        if (nodesError) throw nodesError;

        // For each node, fetch skills and prerequisites
        const nodes: CareerNode[] = await Promise.all(
          (nodesData || []).map(async (node) => {
            // Fetch skills
            const { data: skillsData, error: skillsError } = await supabase
              .from('node_skills')
              .select('skill')
              .eq('node_id', node.id);
            
            if (skillsError) throw skillsError;

            // Fetch prerequisites
            const { data: prereqData, error: prereqError } = await supabase
              .from('node_prerequisites')
              .select('prerequisite_node_id')
              .eq('node_id', node.id);
            
            if (prereqError) throw prereqError;

            // Convert months to display string
            const timeToAchieve = node.time_to_achieve <= 12 
              ? `${node.time_to_achieve} months` 
              : `${Math.floor(node.time_to_achieve / 12)} years`;

            return {
              id: node.id,
              title: node.title,
              description: node.description || '',
              level: node.level as 'entry' | 'mid' | 'senior' | 'expert',
              salary: {
                min: node.salary_min,
                max: node.salary_max,
                currency: 'AED'
              },
              skills: skillsData?.map(s => s.skill) || [],
              education: ['Required education'], // Default education
              certifications: [], 
              timeToAchieve: timeToAchieve,
              prerequisites: prereqData?.map(p => p.prerequisite_node_id) || []
            };
          })
        );

        return {
          id: path.id,
          name: path.title,
          description: path.description || '',
          sector: path.industry || '',
          popularity: path.popularity || 5,
          nodes: nodes
        };
      })
    );

    return careerPaths;
  } catch (error) {
    console.error("Error fetching career paths:", error);
    return mockCareerPaths; // Fallback to mock data on error
  }
};

// Get a specific career path by ID
export const getCareerPathById = async (pathId: string): Promise<CareerPath | null> => {
  try {
    const paths = await getCareerPaths();
    return paths.find(path => path.id === pathId) || null;
  } catch (error) {
    console.error("Error fetching career path by ID:", error);
    return null;
  }
};

// Save a new simulation result to the database
export const saveSimulationResult = async (
  userId: string,
  pathId: string, 
  selectedNodes: string[],
  result: {
    timeToComplete: string;
    potentialSalary: number;
    challengeLevel: 'low' | 'medium' | 'high';
    demandLevel: 'low' | 'medium' | 'high';
    requiredSkills: string[];
    recommendedTraining: string[];
  }
) => {
  try {
    // 1. Insert the simulation result
    const { data: simulationData, error: simulationError } = await supabase
      .from('user_simulations')
      .insert({
        user_id: userId,
        path_id: pathId,
        time_to_complete: result.timeToComplete,
        potential_salary: result.potentialSalary,
        challenge_level: result.challengeLevel,
        demand_level: result.demandLevel
      })
      .select();

    if (simulationError) throw simulationError;
    if (!simulationData || simulationData.length === 0) throw new Error('Failed to insert simulation');

    const simulationId = simulationData[0].id;

    // 2. Insert selected nodes
    const selectedNodesData = selectedNodes.map(nodeId => ({
      simulation_id: simulationId,
      node_id: nodeId
    }));

    const { error: nodesError } = await supabase
      .from('simulation_selected_nodes')
      .insert(selectedNodesData);

    if (nodesError) throw nodesError;

    // 3. Insert required skills
    const skillsData = result.requiredSkills.map(skill => ({
      simulation_id: simulationId,
      skill
    }));

    const { error: skillsError } = await supabase
      .from('simulation_required_skills')
      .insert(skillsData);

    if (skillsError) throw skillsError;

    // 4. Insert recommended training
    const trainingData = result.recommendedTraining.map(training => ({
      simulation_id: simulationId,
      training_program: training
    }));

    const { error: trainingError } = await supabase
      .from('simulation_recommended_training')
      .insert(trainingData);

    if (trainingError) throw trainingError;

    return simulationId;
  } catch (error) {
    console.error("Error saving simulation:", error);
    throw error;
  }
};

// Get user simulations
export const getUserSimulations = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('user_simulations')
      .select(`
        *,
        simulation_selected_nodes(node_id),
        simulation_required_skills(skill),
        simulation_recommended_training(training_program)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching user simulations:", error);
    return [];
  }
};
