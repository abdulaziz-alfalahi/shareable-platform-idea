
/**
 * Storage utilities for Career Pathway Simulation
 * Handles persisting and retrieving simulation data
 */

import { supabase } from '@/integrations/supabase/client';
import { SimulationResult } from './types';
import { getUserSimulations } from './dataService';

/**
 * Save a simulation result to the database
 */
export const saveSimulationResult = async (
  userId: string,
  pathId: string, 
  selectedNodes: string[],
  result: SimulationResult
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
    await saveSelectedNodes(simulationId, selectedNodes);
    
    // 3. Insert required skills
    await saveRequiredSkills(simulationId, result.requiredSkills);
    
    // 4. Insert recommended training
    await saveRecommendedTraining(simulationId, result.recommendedTraining);

    return simulationId;
  } catch (error) {
    console.error("Error saving simulation:", error);
    throw error;
  }
};

/**
 * Get all simulations for a given user
 */
export const getStudentSimulations = async (userId: string) => {
  return await getUserSimulations(userId);
};

/**
 * Save selected nodes for a simulation
 */
const saveSelectedNodes = async (simulationId: string, selectedNodes: string[]) => {
  const selectedNodesData = selectedNodes.map(nodeId => ({
    simulation_id: simulationId,
    node_id: nodeId
  }));

  const { error } = await supabase
    .from('simulation_selected_nodes')
    .insert(selectedNodesData);

  if (error) throw error;
};

/**
 * Save required skills for a simulation
 */
const saveRequiredSkills = async (simulationId: string, skills: string[]) => {
  const skillsData = skills.map(skill => ({
    simulation_id: simulationId,
    skill
  }));

  const { error } = await supabase
    .from('simulation_required_skills')
    .insert(skillsData);

  if (error) throw error;
};

/**
 * Save recommended training for a simulation
 */
const saveRecommendedTraining = async (simulationId: string, training: string[]) => {
  const trainingData = training.map(program => ({
    simulation_id: simulationId,
    training_program: program
  }));

  const { error } = await supabase
    .from('simulation_recommended_training')
    .insert(trainingData);

  if (error) throw error;
};
