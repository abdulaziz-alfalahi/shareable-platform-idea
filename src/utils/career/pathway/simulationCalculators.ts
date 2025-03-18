
/**
 * Calculation utilities for Career Pathway Simulation
 * Contains small, focused functions for various simulation calculations
 */

import { CareerPath } from './types';

/**
 * Calculate estimated time to complete the career path
 */
export const calculateTimeToComplete = (selectedNodes: string[]): string => {
  // Calculate time to complete (simplified)
  let timeMonths = selectedNodes.length * 18; // Assuming each node takes ~18 months
  return timeMonths > 24 
    ? `${Math.round(timeMonths / 12)} years` 
    : `${timeMonths} months`;
};

/**
 * Calculate potential salary based on the last node in the path
 */
export const calculatePotentialSalary = (path: CareerPath, selectedNodes: string[]): number => {
  const lastNodeId = selectedNodes[selectedNodes.length - 1];
  const lastNode = path.nodes.find(n => n.id === lastNodeId);
  return lastNode 
    ? Math.round((lastNode.salary.min + lastNode.salary.max) / 2)
    : 0;
};

/**
 * Collect and return all required skills from the selected nodes
 */
export const collectRequiredSkills = (path: CareerPath, selectedNodes: string[]): string[] => {
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
  return requiredSkills;
};

/**
 * Determine the challenge level based on the number of required skills
 */
export const determineChallengeLevel = (requiredSkills: string[]): 'low' | 'medium' | 'high' => {
  if (requiredSkills.length > 12) {
    return 'high';
  } else if (requiredSkills.length < 6) {
    return 'low';
  }
  return 'medium';
};

/**
 * Determine the demand level based on path popularity
 */
export const determineDemandLevel = (path: CareerPath): 'low' | 'medium' | 'high' => {
  if (path.popularity > 7) {
    return 'high';
  } else if (path.popularity < 4) {
    return 'low';
  }
  return 'medium';
};
