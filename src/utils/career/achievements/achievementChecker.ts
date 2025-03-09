
import { Student } from '@/types/student';
import { CulturalAchievement } from '../types';
import { culturalAchievements } from './culturalAchievementData';

// Check if a student qualifies for any cultural achievements
export const checkCulturalAchievements = (student: Student): CulturalAchievement[] => {
  const qualifiedAchievements: CulturalAchievement[] = [];
  
  // Check each achievement criteria
  culturalAchievements.forEach(achievement => {
    switch (achievement.id) {
      case "bedouin-resilience":
        // Check if completed 10 challenges
        if (student.activeChallenges?.filter(c => c.currentProgress >= c.requiredCount).length >= achievement.requiredCount) {
          qualifiedAchievements.push(achievement);
        }
        break;
      case "falcon-vision":
        // Check if mentored 5 users (simplified check using stamps as proxy)
        const mentorshipStamps = student.passportStamps.filter(s => 
          s.category === "Skills" && s.title.toLowerCase().includes("mentor"));
        if (mentorshipStamps.length >= achievement.requiredCount) {
          qualifiedAchievements.push(achievement);
        }
        break;
      case "majlis-wisdom":
        // Check if participated in 3 discussion forums (simplified)
        const workshopStamps = student.passportStamps.filter(s => 
          s.category === "Workshop" && s.title.toLowerCase().includes("discussion"));
        if (workshopStamps.length >= achievement.requiredCount) {
          qualifiedAchievements.push(achievement);
        }
        break;
      case "pearl-diver":
        // Check if completed 5 assessments
        const assessmentStamps = student.passportStamps.filter(s => 
          s.category === "Assessment");
        if (assessmentStamps.length >= achievement.requiredCount) {
          qualifiedAchievements.push(achievement);
        }
        break;
      case "desert-navigator":
        // Check if achieved 3 career milestones
        if (student.careerMilestones.length >= achievement.requiredCount) {
          qualifiedAchievements.push(achievement);
        }
        break;
    }
  });
  
  return qualifiedAchievements;
};

// Get all cultural achievements with progress information for a student
export const getStudentCulturalAchievementProgress = (student: Student) => {
  return culturalAchievements.map(achievement => {
    let currentProgress = 0;
    let isCompleted = false;
    
    // Calculate progress based on achievement type
    switch (achievement.id) {
      case "bedouin-resilience":
        // Count completed challenges
        currentProgress = student.activeChallenges?.filter(c => 
          c.currentProgress >= c.requiredCount).length || 0;
        break;
      case "falcon-vision":
        // Count mentorship stamps
        currentProgress = student.passportStamps.filter(s => 
          s.category === "Skills" && s.title.toLowerCase().includes("mentor")).length;
        break;
      case "majlis-wisdom":
        // Count discussion workshop stamps
        currentProgress = student.passportStamps.filter(s => 
          s.category === "Workshop" && s.title.toLowerCase().includes("discussion")).length;
        break;
      case "pearl-diver":
        // Count assessment stamps
        currentProgress = student.passportStamps.filter(s => 
          s.category === "Assessment").length;
        break;
      case "desert-navigator":
        // Count career milestones
        currentProgress = student.careerMilestones.length;
        break;
    }
    
    // Check if this achievement has already been awarded
    isCompleted = student.passportStamps.some(stamp => 
      stamp.title.toLowerCase() === achievement.name.toLowerCase());
    
    return {
      ...achievement,
      currentProgress,
      totalRequired: achievement.requiredCount,
      progressPercentage: Math.min(Math.round((currentProgress / achievement.requiredCount) * 100), 100),
      isCompleted
    };
  });
};
