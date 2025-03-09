
// Re-export all achievement-related functionality from their dedicated modules
export { culturalAchievements } from './achievements/culturalAchievementData';
export { 
  checkCulturalAchievements,
  getStudentCulturalAchievementProgress 
} from './achievements/achievementChecker';
export { 
  awardCulturalAchievement,
  processCulturalAchievements 
} from './achievements/achievementAwarder';
