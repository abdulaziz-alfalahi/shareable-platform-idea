
// Export all career utility functions from their respective files
export * from './types';
export * from './milestones';
export * from './stamps';
export * from './challenges';
export * from './leaderboard';
export * from './mentors';
export * from './recommendations';
export * from './passportData';
export * from './culturalAchievements';
export * from './pathwayDataService';
export * from './pathwaySimulation';
export * from './trainingRecommendations';

// Export from skillGapAnalysis but exclude already exported types
export {
  analyzeSkillGaps,
  getTopSkillRecommendations,
  enrollInTraining,
  getAllTrainingPrograms,
  searchTrainingPrograms
} from './skillGapAnalysis';
