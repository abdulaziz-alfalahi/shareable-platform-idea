
import { supabase } from "@/integrations/supabase/client";
import { Challenge } from "@/types/student";
import { toast } from "@/hooks/toast";

/**
 * Fetch user's active challenges from the database
 */
export const fetchUserChallenges = async (userId: string | number): Promise<Challenge[]> => {
  try {
    // For now, using the mock data from the existing API
    // In a real implementation, this would query Supabase
    const { getActiveChallenges } = await import('./challenges');
    return getActiveChallenges(Number(userId));
  } catch (error) {
    console.error("Error fetching challenges:", error);
    return [];
  }
};

/**
 * Update challenge progress for a user
 */
export const updateChallengeProgress = async (
  userId: string | number, 
  challengeId: number,
  increment: number = 1
): Promise<boolean> => {
  try {
    // In a real implementation, this would update the Supabase database
    const { updateChallengeProgress: updateProgress } = await import('./challenges');
    updateProgress(Number(userId), challengeId, increment);
    
    // Show toast notification about progress
    toast({
      title: "Challenge Updated",
      description: `You've made progress on your challenge!`,
    });
    
    return true;
  } catch (error) {
    console.error("Error updating challenge progress:", error);
    return false;
  }
};

/**
 * Complete a challenge for a user
 */
export const completeChallenge = async (
  userId: string | number,
  challengeId: number
): Promise<boolean> => {
  try {
    // This would be a transaction in the real implementation
    // Update challenge to completed status
    // Award stamp or points
    
    toast({
      title: "Challenge Completed! 🎉",
      description: "You've earned rewards for completing this challenge!",
      variant: "success",
    });
    
    return true;
  } catch (error) {
    console.error("Error completing challenge:", error);
    return false;
  }
};

/**
 * Get challenge completion percentage
 */
export const getChallengeCompletion = (
  currentProgress: number,
  requiredCount: number
): number => {
  return Math.min(Math.round((currentProgress / requiredCount) * 100), 100);
};
