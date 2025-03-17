
/**
 * Type definitions for Career Pathway utilities
 */

// Types for Career Pathway Simulator
export interface CareerNode {
  id: string;
  title: string;
  description: string;
  level: 'entry' | 'mid' | 'senior' | 'expert';
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  skills: string[];
  education: string[];
  certifications?: string[];
  timeToAchieve?: string;
  prerequisites?: string[];
}

export interface CareerPath {
  id: string;
  name: string;
  description: string;
  sector: string;
  nodes: CareerNode[];
  popularity: number; // 1-10
}

export interface SimulationResult {
  timeToComplete: string;
  potentialSalary: number;
  requiredSkills: string[];
  challengeLevel: 'low' | 'medium' | 'high';
  demandLevel: 'low' | 'medium' | 'high';
  recommendedTraining: string[];
}
