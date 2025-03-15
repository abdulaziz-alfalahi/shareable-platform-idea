
import { Challenge, Student } from '@/types/student';
import { toast } from '@/hooks/toast';

// Fetch user challenges
export const fetchUserChallenges = async (userId: number): Promise<Challenge[]> => {
  // This would be an API call in production
  console.log(`Fetching challenges for user ${userId}`);
  
  // Mock data for development
  const mockChallenges: Challenge[] = [
    {
      id: 1,
      title: "Complete Your Profile",
      description: "Fill out all sections of your user profile",
      requiredCount: 5,
      currentProgress: 3,
      category: "Skills",
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      rewardTitle: "Profile Master",
      rewardLevel: "Bronze"
    },
    {
      id: 2,
      title: "Networking Champion",
      description: "Connect with 3 industry professionals",
      requiredCount: 3,
      currentProgress: 1,
      category: "Employment",
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      rewardTitle: "Connection Expert",
      rewardLevel: "Silver"
    },
    {
      id: 3,
      title: "Desert Explorer",
      description: "Complete 5 career assessments to discover your path",
      requiredCount: 5,
      currentProgress: 2,
      category: "Assessment",
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(),
      rewardTitle: "Self-Discovery Navigator",
      rewardLevel: "Gold"
    }
  ];
  
  return mockChallenges;
};

// Update challenge progress
export const updateChallengeProgress = async (
  userId: number,
  challengeId: number,
  increment: number = 1
): Promise<boolean> => {
  // This would be an API call in production
  console.log(`Updating challenge ${challengeId} progress by ${increment} for user ${userId}`);
  
  // In a real implementation, this would update the database
  // For now, we'll just return success
  
  // Simulate delay for UI feedback
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Show notification if needed
  toast({
    title: "Progress Updated",
    description: "Your challenge progress has been updated.",
    type: "success"
  });
  
  return true;
};

// Complete a challenge
export const completeChallenge = async (
  userId: number,
  challengeId: number
): Promise<boolean> => {
  // This would be an API call in production
  console.log(`Completing challenge ${challengeId} for user ${userId}`);
  
  // In a real implementation, this would update the database and award points/badges
  // For now, we'll just return success
  
  // Simulate delay for UI feedback
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Show notification
  toast({
    title: "Challenge Completed!",
    description: "Congratulations! You've earned points and a special badge.",
    type: "celebratory"
  });
  
  return true;
};

// Get challenge completion percentage
export const getChallengeCompletion = (
  currentProgress: number,
  requiredCount: number
): number => {
  return Math.min(Math.round((currentProgress / requiredCount) * 100), 100);
};

// Generate daily challenges
export const generateDailyChallenges = async (userId: number): Promise<Challenge[]> => {
  // In a real application, this would generate personalized challenges based on user data
  console.log(`Generating daily challenges for user ${userId}`);
  
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const dailyChallenges: Challenge[] = [
    {
      id: 101,
      title: "Day's Reflection",
      description: "Write down 3 career goals for the next month",
      requiredCount: 1,
      currentProgress: 0,
      category: "Skills",
      startDate: today.toISOString(),
      endDate: tomorrow.toISOString(),
      rewardTitle: "Daily Planner",
      rewardLevel: "Bronze"
    },
    {
      id: 102,
      title: "Quick Learning",
      description: "Watch one career development video",
      requiredCount: 1,
      currentProgress: 0,
      category: "Education",
      startDate: today.toISOString(),
      endDate: tomorrow.toISOString(),
      rewardTitle: "Continuous Learner",
      rewardLevel: "Bronze"
    }
  ];
  
  return dailyChallenges;
};

// Get student challenges (mock implementation)
export const getStudentChallenges = (studentId: number): Challenge[] => {
  // This would be fetched from a database in a real application
  return [
    {
      id: 201,
      title: "Network Navigator",
      description: "Connect with 5 professionals in your field",
      requiredCount: 5,
      currentProgress: 2,
      category: "Employment",
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      rewardTitle: "Networking Pro",
      rewardLevel: "Silver"
    },
    {
      id: 202,
      title: "Majlis Master",
      description: "Participate in 3 community discussions",
      requiredCount: 3,
      currentProgress: 1,
      category: "Skills",
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
      rewardTitle: "Community Leader",
      rewardLevel: "Bronze"
    }
  ];
};
