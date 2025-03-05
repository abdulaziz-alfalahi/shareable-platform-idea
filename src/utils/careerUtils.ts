import { Student, CareerMilestone, PassportStamp } from '@/types/student';
import { notifySuccess, notifyInfo } from './notification';

// Define a Challenge type for time-bound challenges
export interface Challenge {
  id: number;
  title: string;
  description: string;
  requiredCount: number;
  category: string;
  startDate: string;
  endDate: string;
  rewardTitle: string;
  rewardLevel: "Bronze" | "Silver" | "Gold";
  progress?: number;
}

// Simplified Vacancy type for job matching
interface Vacancy {
  id: number;
  title: string;
  company: string;
  requirements: string[];
  location: string;
  type: string;
}

// Career milestone achievement check functions
export const checkMilestones = async (userId: number, progress: number, serviceType: string): Promise<boolean> => {
  // This would normally be a server API call
  // Simulating backend logic here
  console.log(`Checking milestones for ${userId} with ${progress}% progress in ${serviceType}`);
  
  // Mock achievement logic
  if (progress >= 100) {
    // Create a new milestone
    const milestone: CareerMilestone = {
      id: Math.floor(Math.random() * 10000),
      title: `${serviceType} Mastery`,
      description: `Successfully completed all ${serviceType} requirements`,
      dateAchieved: new Date().toISOString().split('T')[0],
      points: 100,
      badgeUrl: `/badges/${serviceType.toLowerCase()}.png`
    };
    
    console.log('New milestone achieved:', milestone);
    
    // Award a stamp automatically
    await awardPassportStamp(userId, serviceType);
    
    return true;
  }
  
  return false;
};

// Track progress for a specific user and service
export const trackProgress = (userId: number, serviceId: string, progress: number): void => {
  // This would be a server call to update the user_progress table
  console.log(`Tracking progress for user ${userId}, service ${serviceId}: ${progress}%`);
  
  // Simulate database update
  setTimeout(() => {
    console.log('Progress updated successfully');
  }, 500);
};

// Award a passport stamp with tiered levels (Bronze, Silver, Gold)
export const awardPassportStamp = async (userId: number, category: string, level: "Bronze" | "Silver" | "Gold" = "Bronze"): Promise<PassportStamp | null> => {
  // This would be a server call in production
  console.log(`Awarding ${level} ${category} stamp to user ${userId}`);
  
  // Create a new stamp with the appropriate level
  const stamp: PassportStamp = {
    id: Math.floor(Math.random() * 10000),
    title: getLeveledTitle(category, level),
    description: getLeveledDescription(category, level),
    category: category as "Workshop" | "Assessment" | "Training" | "Employment" | "Education" | "Skills",
    iconName: getCategoryIcon(category),
    dateEarned: new Date().toISOString().split('T')[0],
    level: level,
    featured: level === "Gold" // Gold stamps are featured by default
  };
  
  // Show success notification
  notifySuccess({
    title: "Achievement Unlocked!",
    description: `You've earned the ${stamp.title} stamp!`
  });
  
  return stamp;
};

// Get a title appropriate for the stamp level
const getLeveledTitle = (category: string, level: "Bronze" | "Silver" | "Gold"): string => {
  switch (level) {
    case "Bronze":
      return `${category} Explorer`;
    case "Silver":
      return `${category} Specialist`;
    case "Gold":
      return `${category} Master`;
    default:
      return `${category} Achievement`;
  }
};

// Get a description appropriate for the stamp level
const getLeveledDescription = (category: string, level: "Bronze" | "Silver" | "Gold"): string => {
  switch (level) {
    case "Bronze":
      return `Started your journey in ${category} with basic skills and knowledge.`;
    case "Silver":
      return `Demonstrated intermediate proficiency in ${category} with notable achievements.`;
    case "Gold":
      return `Achieved mastery level in ${category} with outstanding accomplishments.`;
    default:
      return `Recognized for achievements in ${category}.`;
  }
};

// Get appropriate icon based on category
const getCategoryIcon = (category: string): string => {
  switch (category.toLowerCase()) {
    case "workshop":
      return "star";
    case "assessment":
      return "award";
    case "training":
      return "graduation-cap";
    case "employment":
      return "briefcase";
    case "education":
      return "graduation-cap";
    case "skills":
      return "code";
    default:
      return "award";
  }
};

// Subscribe to passport updates (real-time)
export const subscribeToPassportUpdates = (
  userId: number, 
  callback: (newStamp: PassportStamp) => void
): (() => void) => {
  // This would use Supabase or Firebase real-time subscriptions
  console.log(`Subscribing to passport updates for user ${userId}`);
  
  // For demonstration, we'll just simulate a new stamp after 5 seconds
  const timeoutId = setTimeout(() => {
    const newStamp: PassportStamp = {
      id: Math.floor(Math.random() * 10000),
      title: "Workshop Master",
      description: "Completed a series of industry workshops",
      category: "Workshop",
      iconName: "graduation-cap",
      dateEarned: new Date().toISOString().split('T')[0],
      level: "Silver",
      featured: true
    };
    
    callback(newStamp);
  }, 5000);
  
  // Return a function to unsubscribe
  return () => {
    clearTimeout(timeoutId);
    console.log(`Unsubscribed from passport updates for user ${userId}`);
  };
};

// Simple job recommendation function based on skills
export const recommendJobs = (student: Student, jobs: Vacancy[]): Vacancy[] => {
  // Extract skills from student (in a real app, you'd have a skills field)
  const userSkills = student.achievements; // Using achievements as proxy for skills
  
  // Calculate similarity between user skills and job requirements
  const scoredJobs = jobs.map(job => {
    const matchingSkills = userSkills.filter(skill => 
      job.requirements.some(requirement => 
        requirement.toLowerCase().includes(skill.toLowerCase()) || 
        skill.toLowerCase().includes(requirement.toLowerCase())
      )
    );
    
    return {
      ...job,
      matchScore: matchingSkills.length / Math.max(userSkills.length, job.requirements.length)
    };
  });
  
  // Sort by match score (highest first) and return the original job objects
  return scoredJobs
    .sort((a, b) => b.matchScore - a.matchScore)
    .map(({ matchScore, ...job }) => job as Vacancy);
};

// Get active challenges for a user
export const getActiveChallenges = (userId: number): Challenge[] => {
  // In a real app, this would fetch from a database
  const today = new Date().toISOString().split('T')[0];
  
  // Return mock challenges
  return [
    {
      id: 1,
      title: "Desert Trailblazer",
      description: "Complete 3 workshops in the current month",
      requiredCount: 3,
      category: "Workshop",
      startDate: "2023-03-01",
      endDate: "2023-03-31",
      rewardTitle: "Desert Trailblazer",
      rewardLevel: "Silver",
      progress: 1
    },
    {
      id: 2,
      title: "Falcon's Rise",
      description: "Apply to 5 job opportunities within two weeks",
      requiredCount: 5,
      category: "Employment",
      startDate: "2023-03-15",
      endDate: "2023-03-29",
      rewardTitle: "Career Hunter",
      rewardLevel: "Bronze",
      progress: 2
    },
    {
      id: 3,
      title: "Pearl Diver",
      description: "Complete all assessments with 80%+ score",
      requiredCount: 5,
      category: "Assessment",
      startDate: "2023-02-01",
      endDate: "2023-04-30",
      rewardTitle: "Assessment Master",
      rewardLevel: "Gold",
      progress: 3
    }
  ];
};

// Update challenge progress
export const updateChallengeProgress = (userId: number, challengeId: number, increment: number = 1): void => {
  // In a real app, this would update progress in a database
  console.log(`Updating challenge ${challengeId} progress for user ${userId} by +${increment}`);
  
  // Simulate checking if challenge is completed
  setTimeout(() => {
    notifyInfo({
      title: "Challenge Progress Updated",
      description: "You're making progress on your active challenge!"
    });
  }, 500);
};

// Get leaderboard data 
export const getLeaderboardData = async (category?: string, limit: number = 10): Promise<{name: string, score: number}[]> => {
  // In a real app, this would fetch from the database using the SQL provided
  console.log(`Fetching leaderboard data${category ? ` for ${category}` : ''}, limit: ${limit}`);
  
  // Return mock leaderboard data
  return [
    { name: "Ahmed Al Mansoori", score: 32 },
    { name: "Fatima Al Hashemi", score: 28 },
    { name: "Mohammed Al Marzooqi", score: 25 },
    { name: "Amna Al Suwaidi", score: 23 },
    { name: "Omar Al Shamsi", score: 21 },
    { name: "Mariam Al Zaabi", score: 19 },
    { name: "Saeed Al Dhaheri", score: 18 },
    { name: "Aisha Al Falasi", score: 17 },
    { name: "Ibrahim Al Mazrouei", score: 16 },
    { name: "Sara Al Qubaisi", score: 15 }
  ];
};
