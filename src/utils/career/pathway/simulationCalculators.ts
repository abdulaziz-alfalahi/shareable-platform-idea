
/**
 * Career Pathway Simulation Calculators
 * 
 * This module provides specialized calculation utilities for the Career Pathway Simulation feature.
 * It contains small, focused functions that handle various simulation metrics like time estimates,
 * salary projections, skill requirements, and difficulty assessments.
 */

import { CareerPath } from './types';

/**
 * Calculate the estimated time required to complete the selected career path nodes
 * 
 * @param selectedNodes - Array of node IDs in the selected path
 * @returns Formatted string representing the time to complete (e.g. "2 years" or "18 months")
 */
export const calculateTimeToComplete = (selectedNodes: string[]): string => {
  if (!selectedNodes || selectedNodes.length === 0) {
    return "0 months";
  }
  
  // Calculate time to complete (simplified)
  const timeMonths = selectedNodes.length * 18; // Assuming each node takes ~18 months
  
  return timeMonths > 24 
    ? `${Math.round(timeMonths / 12)} years` 
    : `${timeMonths} months`;
};

/**
 * Calculate the potential salary based on the highest level node in the selected path
 * 
 * @param path - The full career path object containing all node data
 * @param selectedNodes - Array of node IDs that have been selected
 * @returns Numeric value representing the estimated annual salary in AED
 * @throws Error if path or nodes are invalid
 */
export const calculatePotentialSalary = (path: CareerPath, selectedNodes: string[]): number => {
  if (!path || !path.nodes || !selectedNodes || selectedNodes.length === 0) {
    return 0;
  }
  
  // Get the last (highest) node in the path
  const lastNodeId = selectedNodes[selectedNodes.length - 1];
  const lastNode = path.nodes.find(n => n.id === lastNodeId);
  
  if (!lastNode || !lastNode.salary) {
    console.warn(`Could not find valid salary data for node ${lastNodeId}`);
    return 0;
  }
  
  // Calculate average of min and max salary
  return Math.round((lastNode.salary.min + lastNode.salary.max) / 2);
};

/**
 * Extract and consolidate all required skills from the selected career path nodes
 * 
 * @param path - The full career path object containing all node data
 * @param selectedNodes - Array of node IDs that have been selected
 * @returns Array of unique skill names required for the selected path
 */
export const collectRequiredSkills = (path: CareerPath, selectedNodes: string[]): string[] => {
  if (!path || !path.nodes || !selectedNodes || selectedNodes.length === 0) {
    return [];
  }
  
  const uniqueSkills = new Set<string>();
  
  selectedNodes.forEach(nodeId => {
    const node = path.nodes.find(n => n.id === nodeId);
    if (node && node.skills) {
      node.skills.forEach(skill => uniqueSkills.add(skill));
    }
  });
  
  return Array.from(uniqueSkills);
};

/**
 * Categorize the difficulty level of a career path based on required skills count
 * 
 * @param requiredSkills - Array of skills required for the career path
 * @returns Difficulty level classification: 'low', 'medium', or 'high'
 */
export const determineChallengeLevel = (requiredSkills: string[]): 'low' | 'medium' | 'high' => {
  if (!requiredSkills) {
    return 'low';
  }
  
  const skillCount = requiredSkills.length;
  
  if (skillCount > 12) {
    return 'high';
  } else if (skillCount < 6) {
    return 'low';
  }
  return 'medium';
};

/**
 * Determine market demand level based on path popularity
 * 
 * @param path - The career path object containing popularity data
 * @returns Demand level classification: 'low', 'medium', or 'high'
 */
export const determineDemandLevel = (path: CareerPath): 'low' | 'medium' | 'high' => {
  if (!path || typeof path.popularity !== 'number') {
    console.warn('Invalid path popularity data');
    return 'medium';
  }
  
  if (path.popularity > 7) {
    return 'high';
  } else if (path.popularity < 4) {
    return 'low';
  }
  return 'medium';
};

/**
 * Calculate the financial impact of completing the career path
 * 
 * @param currentSalary - User's current salary (if available)
 * @param potentialSalary - Calculated potential salary after completing the path
 * @returns Percentage increase over current salary, or null if current salary is not provided
 */
export const calculateFinancialImpact = (currentSalary: number | undefined, potentialSalary: number): number | null => {
  if (!currentSalary || currentSalary <= 0 || !potentialSalary) {
    return null;
  }
  
  const percentageIncrease = ((potentialSalary - currentSalary) / currentSalary) * 100;
  return Math.round(percentageIncrease);
};
