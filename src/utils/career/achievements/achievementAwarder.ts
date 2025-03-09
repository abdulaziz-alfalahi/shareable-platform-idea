
import { Student, PassportStamp } from '@/types/student';
import { CulturalAchievement } from '../types';
import { awardPassportStamp } from '../stamps';
import { notifySuccess } from '../../notification';
import { culturalAchievements } from './culturalAchievementData';
import { checkCulturalAchievements } from './achievementChecker';

// Award a cultural achievement stamp to a student
export const awardCulturalAchievement = async (userId: number, achievementId: string): Promise<PassportStamp | null> => {
  const achievement = culturalAchievements.find(a => a.id === achievementId);
  
  if (!achievement) {
    console.error(`Cultural achievement with id ${achievementId} not found`);
    return null;
  }
  
  // Create a new cultural stamp
  const stamp = await awardPassportStamp(
    userId, 
    "Cultural", 
    achievement.stampLevel
  );
  
  if (stamp) {
    // Override default stamp properties with cultural achievement specifics
    stamp.title = achievement.name;
    stamp.description = achievement.description;
    stamp.iconName = achievement.iconName;
    stamp.featured = achievement.stampLevel === "Gold"; // Feature gold stamps
    
    // Show special cultural achievement notification
    notifySuccess({
      title: "Cultural Achievement Unlocked!",
      description: `You've earned the ${achievement.name} achievement, reflecting Emirati heritage and values!`
    });
  }
  
  return stamp;
};

// Process all eligible cultural achievements for a student
export const processCulturalAchievements = async (student: Student): Promise<PassportStamp[]> => {
  const eligibleAchievements = checkCulturalAchievements(student);
  const awardedStamps: PassportStamp[] = [];
  
  // Check if student already has these achievements
  const existingAchievementTitles = student.passportStamps
    .map(stamp => stamp.title.toLowerCase());
  
  // Award new achievements only
  for (const achievement of eligibleAchievements) {
    if (!existingAchievementTitles.includes(achievement.name.toLowerCase())) {
      const stamp = await awardCulturalAchievement(student.id, achievement.id);
      if (stamp) {
        awardedStamps.push(stamp);
      }
    }
  }
  
  return awardedStamps;
};
