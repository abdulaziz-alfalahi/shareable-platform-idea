import { Student, PassportStamp, Challenge } from "@/types/student";
import { passportCache } from "@/utils/cacheUtils";
import { notifyAchievement } from "@/utils/notification";

/**
 * Service for handling passport-related functionality
 * This is part of a modular microservice architecture
 */
export class PassportService {
  /**
   * Get a student's passport data with caching
   */
  async getStudentPassport(studentId: number): Promise<{
    stamps: PassportStamp[],
    totalPoints: number,
    level: number
  }> {
    return passportCache.getOrSet(
      `passport:${studentId}`, 
      async () => {
        // In production, this would fetch from Supabase
        // For this demo, we're using mock data
        const { students } = await import("@/data/mockData");
        const student = students.find(s => s.id === studentId);
        
        if (!student) {
          throw new Error(`Student with ID ${studentId} not found`);
        }
        
        return {
          stamps: student.passportStamps,
          totalPoints: student.totalPoints,
          level: student.passportLevel
        };
      },
      { ttl: 600 } // Cache for 10 minutes
    );
  }

  /**
   * Award a new stamp to a student
   */
  async awardStamp(studentId: number, stamp: Omit<PassportStamp, "id">): Promise<PassportStamp> {
    // In production, this would insert into Supabase
    // For this demo, we'll just return a mock result
    
    // Create a new stamp with an ID
    const newStamp: PassportStamp = {
      id: Date.now(), // Use timestamp as a simple ID generator
      ...stamp
    };

    // Invalidate cache so the new stamp appears
    passportCache.delete(`passport:${studentId}`);
    
    // Notify the user
    notifyAchievement({
      title: "New Achievement!",
      description: `You've earned the "${newStamp.title}" stamp!`
    });
    
    return newStamp;
  }

  /**
   * Get active challenges for a student with caching
   */
  async getActiveChallenges(studentId: number): Promise<Challenge[]> {
    return passportCache.getOrSet(
      `challenges:${studentId}`,
      async () => {
        // In production, this would fetch from Supabase
        const { getActiveChallenges } = await import("@/utils/careerUtils");
        return getActiveChallenges(studentId);
      },
      { ttl: 300 } // Cache for 5 minutes
    );
  }

  /**
   * Check and award milestones based on student progress
   */
  async checkAndAwardMilestone(student: Student): Promise<PassportStamp | null> {
    // This functionality could be moved to its own service
    // For now, we'll keep it here
    const { checkMilestoneEligibility } = await import("@/utils/careerUtils");
    const eligibleMilestone = checkMilestoneEligibility(student);
    
    if (eligibleMilestone) {
      // Invalidate cache
      passportCache.delete(`passport:${student.id}`);
      
      return eligibleMilestone;
    }
    
    return null;
  }
}

// Export a singleton instance for easy import
export const passportService = new PassportService();

// Helper functions for direct imports
export const getStudentPassport = (studentId: number) => 
  passportService.getStudentPassport(studentId);

export const awardStamp = (studentId: number, stamp: Omit<PassportStamp, "id">) => 
  passportService.awardStamp(studentId, stamp);

export const getActiveChallenges = (studentId: number) => 
  passportService.getActiveChallenges(studentId);

export const checkAndAwardMilestone = (student: Student) => 
  passportService.checkAndAwardMilestone(student);
