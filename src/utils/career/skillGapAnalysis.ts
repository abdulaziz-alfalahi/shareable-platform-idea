
/**
 * This file is maintained for backward compatibility
 * It re-exports everything from the skill-gap module
 */

// Re-export types using 'export type' syntax for isolatedModules compatibility
export type { SkillGap, TrainingRecommendation } from './skill-gap';

// Re-export functions directly (non-type exports)
export {
  analyzeSkillGaps,
  getTopSkillRecommendations,
  enrollInTraining,
  getAllTrainingPrograms,
  searchTrainingPrograms
} from './skill-gap';
