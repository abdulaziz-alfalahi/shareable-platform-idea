
import { Student, PassportStamp } from '@/types/student';
import { CulturalAchievement } from './types';
import { awardPassportStamp } from './stamps';
import { notifySuccess } from '../notification';

// Define cultural achievements tied to Emirati heritage
export const culturalAchievements: CulturalAchievement[] = [
  {
    id: "bedouin-resilience",
    name: "Bedouin Resilience",
    description: "Displayed remarkable persistence by completing 10 challenges, embodying the resilience of Bedouin ancestors who thrived in challenging environments.",
    iconName: "palm-tree",
    requiredCount: 10,
    category: "Resilience",
    stampLevel: "Silver"
  },
  {
    id: "falcon-vision",
    name: "Falcon Vision",
    description: "Demonstrated exceptional mentorship by guiding 5 peers, honoring the UAE's reverence for falcons as symbols of vision and guidance.",
    iconName: "eagle",
    requiredCount: 5,
    category: "Mentorship",
    stampLevel: "Gold"
  },
  {
    id: "majlis-wisdom",
    name: "Majlis Wisdom",
    description: "Shared knowledge in 3 discussion forums, continuing the tradition of the majlis as a place of community learning and discourse.",
    iconName: "users",
    requiredCount: 3,
    category: "Leadership",
    stampLevel: "Bronze"
  },
  {
    id: "pearl-diver",
    name: "Pearl Diver",
    description: "Discovered valuable opportunities by completing 5 assessment challenges, embodying the spirit of traditional pearl divers who sought treasures beneath the surface.",
    iconName: "gem",
    requiredCount: 5,
    category: "Innovation",
    stampLevel: "Silver"
  },
  {
    id: "desert-navigator",
    name: "Desert Navigator",
    description: "Successfully guided your career journey through 3 major milestones, much like traditional navigators who used stars to cross the vast deserts.",
    iconName: "compass",
    requiredCount: 3,
    category: "Heritage",
    stampLevel: "Bronze"
  }
];

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
