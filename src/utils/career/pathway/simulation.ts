
/**
 * Simulation utilities for Career Pathway
 */

import { CareerPath, SimulationResult } from './types';
import { Student } from '@/types/student';
import { getCareerPathById } from './dataService';
import { generateRecommendedTraining } from './recommendations';
import { 
  calculateTimeToComplete, 
  calculatePotentialSalary,
  collectRequiredSkills,
  determineChallengeLevel,
  determineDemandLevel 
} from './simulationCalculators';
import { saveSimulationResult, getStudentSimulations } from './simulationStorage';

// Main simulation function that orchestrates the overall simulation process
export const simulateCareerPath = async (
  student: Student,
  pathId: string,
  selectedNodes: string[]
): Promise<SimulationResult> => {
  // Get path data
  const path = await getCareerPathById(pathId);
  if (!path) {
    throw new Error(`Career path with ID ${pathId} not found`);
  }
  
  // Calculate time to complete
  const timeToComplete = calculateTimeToComplete(selectedNodes);
  
  // Calculate potential salary
  const potentialSalary = calculatePotentialSalary(path, selectedNodes);
  
  // Collect required skills
  const requiredSkills = collectRequiredSkills(path, selectedNodes);
  
  // Determine challenge level
  const challengeLevel = determineChallengeLevel(requiredSkills);
  
  // Determine demand level based on path popularity
  const demandLevel = determineDemandLevel(path);
  
  // Generate recommended training
  const recommendedTraining = generateRecommendedTraining(requiredSkills);
  
  const result = {
    timeToComplete,
    potentialSalary,
    requiredSkills,
    challengeLevel,
    demandLevel,
    recommendedTraining
  };
  
  // If the student is logged in, save the simulation result
  if (student.id) {
    try {
      await saveSimulationResult(
        student.id.toString(),
        pathId,
        selectedNodes,
        result
      );
    } catch (error) {
      console.error("Failed to save simulation result:", error);
      // Continue without saving - don't interrupt the user experience
    }
  }
  
  return result;
};

// Get historical simulations for this student
export const getStudentSimulationHistory = async (student: Student) => {
  if (!student.id) return [];
  
  try {
    return await getStudentSimulations(student.id.toString());
  } catch (error) {
    console.error("Error fetching simulation history:", error);
    return [];
  }
};
