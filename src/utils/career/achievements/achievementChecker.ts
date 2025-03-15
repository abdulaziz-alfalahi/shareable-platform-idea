
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
      case "coffee-hospitality":
        // Check if hosted 4 career networking events
        const hospitalityStamps = student.passportStamps.filter(s => 
          s.category === "Workshop" && s.title.toLowerCase().includes("network"));
        if (hospitalityStamps.length >= achievement.requiredCount) {
          qualifiedAchievements.push(achievement);
        }
        break;
      case "dhow-builder":
        // Check if added 5 projects to portfolio
        const projectStamps = student.passportStamps.filter(s => 
          s.category === "Skills" && s.title.toLowerCase().includes("project"));
        if (projectStamps.length >= achievement.requiredCount) {
          qualifiedAchievements.push(achievement);
        }
        break;
      case "date-palm-cultivator":
        // Check if connected with 6 industry mentors
        const mentorConnections = student.passportStamps.filter(s => 
          (s.category === "Education" || s.category === "Training") && s.title.toLowerCase().includes("mentor"));
        if (mentorConnections.length >= achievement.requiredCount) {
          qualifiedAchievements.push(achievement);
        }
        break;
      case "desert-bloom":
        // Check if completed 8 skill development courses
        const courseStamps = student.passportStamps.filter(s => 
          s.category === "Training" || s.category === "Education");
        if (courseStamps.length >= achievement.requiredCount) {
          qualifiedAchievements.push(achievement);
        }
        break;
      case "oasis-builder":
        // Check if connected 7 peers with resources/opportunities
        const connectionStamps = student.passportStamps.filter(s => 
          s.category === "Skills" && s.title.toLowerCase().includes("network"));
        if (connectionStamps.length >= achievement.requiredCount) {
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
      case "coffee-hospitality":
        // Count networking events
        currentProgress = student.passportStamps.filter(s => 
          s.category === "Workshop" && s.title.toLowerCase().includes("network")).length;
        break;
      case "dhow-builder":
        // Count portfolio projects
        currentProgress = student.passportStamps.filter(s => 
          s.category === "Skills" && s.title.toLowerCase().includes("project")).length;
        break;
      case "date-palm-cultivator":
        // Count mentor connections
        currentProgress = student.passportStamps.filter(s => 
          (s.category === "Education" || s.category === "Training") && 
          s.title.toLowerCase().includes("mentor")).length;
        break;
      case "desert-bloom":
        // Count skill development courses
        currentProgress = student.passportStamps.filter(s => 
          s.category === "Training" || s.category === "Education").length;
        break;
      case "oasis-builder":
        // Count peer connections
        currentProgress = student.passportStamps.filter(s => 
          s.category === "Skills" && s.title.toLowerCase().includes("network")).length;
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

// Filter achievements by category
export const filterAchievementsByCategory = (achievements: ReturnType<typeof getStudentCulturalAchievementProgress>, category?: string) => {
  if (!category) return achievements;
  return achievements.filter(achievement => achievement.category.toLowerCase() === category.toLowerCase());
};
