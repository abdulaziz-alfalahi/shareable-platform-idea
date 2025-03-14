
/**
 * Skill gap analysis entry point
 * Exports all functionality from the skill gap module
 */

// Re-export types
export type { SkillGap, TrainingRecommendation } from './types';

// Re-export core analysis functions
export {
  analyzeSkillGaps,
  getTopSkillRecommendations,
  extractStudentSkills
} from './analysis-service';

// Re-export training-related functions
export {
  enrollInTraining,
  getAllTrainingPrograms,
  searchTrainingPrograms
} from './training-service';
