
import { Challenge } from '@/types/student';
import { notifyInfo } from '../notification';

// Get active challenges for a user
export const getActiveChallenges = (userId: number): Challenge[] => {
  // In a real app, this would fetch from a database
  const today = new Date().toISOString().split('T')[0];
  
  // Return mock challenges with the correct property names
  return [
    {
      id: 1,
      title: "Desert Trailblazer",
      description: "Complete 3 workshops in the current month",
      requiredCount: 3,
      currentProgress: 1,
      category: "Workshop",
      startDate: "2023-03-01",
      endDate: "2023-03-31",
      rewardTitle: "Desert Trailblazer",
      rewardLevel: "Silver"
    },
    {
      id: 2,
      title: "Falcon's Rise",
      description: "Apply to 5 job opportunities within two weeks",
      requiredCount: 5,
      currentProgress: 2,
      category: "Employment",
      startDate: "2023-03-15",
      endDate: "2023-03-29",
      rewardTitle: "Career Hunter",
      rewardLevel: "Bronze"
    },
    {
      id: 3,
      title: "Pearl Diver",
      description: "Complete all assessments with 80%+ score",
      requiredCount: 5,
      currentProgress: 3,
      category: "Assessment",
      startDate: "2023-02-01",
      endDate: "2023-04-30",
      rewardTitle: "Assessment Master",
      rewardLevel: "Gold"
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
