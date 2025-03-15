import { CulturalAchievement } from '@/utils/career/types';
// Fix the import to reference the correct export name
import { culturalAchievements } from './achievements/culturalAchievementData';

export const getCulturalAchievementById = (id: string): CulturalAchievement | undefined => {
  return culturalAchievements.find(achievement => achievement.id === id);
};

export const getCulturalAchievementsByCategory = (category: string): CulturalAchievement[] => {
  return culturalAchievements.filter(achievement => achievement.category === category);
};

export const getAllCulturalAchievements = (): CulturalAchievement[] => {
  return culturalAchievements;
};
