
// Re-export all achievement-related functionality from their dedicated modules
export { culturalAchievements, culturalAchievementCategories } from './achievements/culturalAchievementData';
export { 
  checkCulturalAchievements,
  getStudentCulturalAchievementProgress,
  filterAchievementsByCategory 
} from './achievements/achievementChecker';
export { 
  awardCulturalAchievement,
  processCulturalAchievements 
} from './achievements/achievementAwarder';
export {
  calculateEmploymentAchievements
} from './achievements/employmentAchievements';
