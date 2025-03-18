
/**
 * Data fetch services for Career Pathway
 * Handles all data retrieval operations
 */

import { supabase } from '@/integrations/supabase/client';
import { CareerPath } from '../types';
import { transformNodeData } from './transformServices';
import { mockCareerPaths } from '../../mockData';

/**
 * Get all available career paths
 */
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

        // Transform node data
        const nodes = await Promise.all(
          (nodesData || []).map(transformNodeData)
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

/**
 * Get a specific career path by ID
 */
export const getCareerPathById = async (pathId: string): Promise<CareerPath | null> => {
  try {
    const paths = await getCareerPaths();
    return paths.find(path => path.id === pathId) || null;
  } catch (error) {
    console.error("Error fetching career path by ID:", error);
    return null;
  }
};

/**
 * Get user simulations
 */
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
