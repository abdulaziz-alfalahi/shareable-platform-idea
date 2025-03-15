
/**
 * Type definitions for skills assessment functionality
 */

export interface AssessmentResult {
  skillName: string;
  score: number;
  feedback: string;
  recommendedTraining: string[];
}

export interface AssessmentQuestion {
  id: number;
  question: string;
  skillArea: string;
  options: {
    text: string;
    score: number;
  }[];
}
