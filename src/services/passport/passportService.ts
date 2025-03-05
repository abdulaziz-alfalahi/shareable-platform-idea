
import { Student, PassportStamp, Challenge } from "@/types/student";
import { passportCache } from "@/utils/cacheUtils";
import { 
  awardPassportStamp, 
  checkMilestones, 
  shareAchievementToSocial,
  getActiveChallenges,
  getLeaderboardData,
  checkMilestoneEligibility 
} from "@/utils/careerUtils";

/**
 * Service for managing career passport functionality
 */
export class PassportService {
  async getPassport(studentId: number) {
    // Use the cache-aside pattern to get passport data
    return passportCache.getOrSet(
      `passport:${studentId}`,
      async () => {
        // In production this would fetch from Supabase
        // For demo, simulate delay and return mock data
        await new Promise(resolve => setTimeout(resolve, 300));
        
        return {
          stamps: [
            { 
              id: 1, 
              title: "Workshop Expert", 
              description: "Completed advanced workshop series", 
              category: "Workshop", 
              iconName: "award", 
              dateEarned: "2023-04-15", 
              level: "Silver", 
              featured: true 
            },
            { 
              id: 2, 
              title: "Job Application Master", 
              description: "Applied to 10+ positions", 
              category: "Employment", 
              iconName: "briefcase", 
              dateEarned: "2023-03-22", 
              level: "Gold", 
              featured: true 
            }
          ],
          totalPoints: 450,
          level: 3
        };
      },
      { ttl: 300 } // Cache for 5 minutes
    );
  }
  
  async awardStamp(studentId: number, category: string, level: "Bronze" | "Silver" | "Gold" = "Bronze"): Promise<PassportStamp | null> {
    // Call the utility function to award the stamp
    const newStamp = await awardPassportStamp(studentId, category, level);
    
    // Invalidate cache since the passport has been updated
    passportCache.delete(`passport:${studentId}`);
    
    return newStamp;
  }
  
  async shareToSocial(studentId: number, stampTitle: string, platform: "twitter" | "linkedin" | "facebook"): Promise<boolean> {
    // Call the utility function to share
    shareAchievementToSocial(stampTitle, platform);
    return true;
  }
  
  async getActiveChallenges(studentId: number): Promise<Challenge[]> {
    // Convert the challenges from careerUtils to the Student Challenge type
    const challenges = getActiveChallenges(studentId);
    return challenges;
  }
  
  async getLeaderboard(limit: number = 10): Promise<{name: string, score: number}[]> {
    return passportCache.getOrSet(
      'leaderboard',
      async () => getLeaderboardData(undefined, limit),
      { ttl: 600 } // Cache for 10 minutes
    );
  }
  
  async checkMilestoneEligibility(student: Student, serviceType: string): Promise<boolean> {
    return checkMilestoneEligibility(student, serviceType);
  }
}

// Export a singleton instance
export const passportService = new PassportService();

// Helper functions for direct imports
export const getPassport = (studentId: number) => 
  passportService.getPassport(studentId);

export const awardStamp = (studentId: number, category: string, level: "Bronze" | "Silver" | "Gold" = "Bronze") => 
  passportService.awardStamp(studentId, category, level);

export const shareToSocial = (studentId: number, stampTitle: string, platform: "twitter" | "linkedin" | "facebook") => 
  passportService.shareToSocial(studentId, stampTitle, platform);

export const getActiveChallenges = (studentId: number) => 
  passportService.getActiveChallenges(studentId);

export const getLeaderboard = (limit: number = 10) => 
  passportService.getLeaderboard(limit);

export const checkMilestoneEligibility = (student: Student, serviceType: string) => 
  passportService.checkMilestoneEligibility(student, serviceType);
