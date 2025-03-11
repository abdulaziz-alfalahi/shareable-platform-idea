
import { supabase } from '@/integrations/supabase/client';

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
