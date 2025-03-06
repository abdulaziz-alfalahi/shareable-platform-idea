
import { CareerPath, SimulationResult } from './pathwayTypes';
import { Student } from '@/types/student';
import { mockCareerPaths } from './mockData';
import { generateRecommendedTraining } from './trainingRecommendations';

// Simulate a career path for a student
export const simulateCareerPath = (
  student: Student,
  pathId: string,
  selectedNodes: string[]
): SimulationResult => {
  // Get path data
  const path = mockCareerPaths.find(p => p.id === pathId);
  if (!path) {
    throw new Error(`Career path with ID ${pathId} not found`);
  }
  
  // Calculate time to complete (simplified)
  let timeMonths = selectedNodes.length * 18; // Assuming each node takes ~18 months
  const timeToComplete = timeMonths > 24 
    ? `${Math.round(timeMonths / 12)} years` 
    : `${timeMonths} months`;
  
  // Calculate potential salary
  const lastNodeId = selectedNodes[selectedNodes.length - 1];
  const lastNode = path.nodes.find(n => n.id === lastNodeId);
  const potentialSalary = lastNode 
    ? Math.round((lastNode.salary.min + lastNode.salary.max) / 2)
    : 0;
  
  // Collect required skills
  const requiredSkills: string[] = [];
  selectedNodes.forEach(nodeId => {
    const node = path.nodes.find(n => n.id === nodeId);
    if (node) {
      node.skills.forEach(skill => {
        if (!requiredSkills.includes(skill)) {
          requiredSkills.push(skill);
        }
      });
    }
  });
  
  // Determine challenge level (simplified)
  let challengeLevel: 'low' | 'medium' | 'high' = 'medium';
  if (requiredSkills.length > 12) {
    challengeLevel = 'high';
  } else if (requiredSkills.length < 6) {
    challengeLevel = 'low';
  }
  
  // Determine demand level based on path popularity
  let demandLevel: 'low' | 'medium' | 'high' = 'medium';
  if (path.popularity > 7) {
    demandLevel = 'high';
  } else if (path.popularity < 4) {
    demandLevel = 'low';
  }
  
  // Generate recommended training
  const recommendedTraining = generateRecommendedTraining(requiredSkills);
  
  return {
    timeToComplete,
    potentialSalary,
    requiredSkills,
    challengeLevel,
    demandLevel,
    recommendedTraining
  };
};
