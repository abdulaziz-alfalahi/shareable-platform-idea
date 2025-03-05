
import { Student } from "@/types/student";
import { passportCache } from "@/utils/cacheUtils";
import { notifyMentorMatch } from "@/utils/notification";

/**
 * Service for handling mentor-related functionality
 * This is part of a modular microservice architecture
 */
export class MentorService {
  /**
   * Check if a student is eligible to be a mentor
   */
  checkMentorEligibility(student: Student): boolean {
    // Students with 10+ stamps can be mentors
    return student.passportStamps.length >= 10;
  }

  /**
   * Find potential mentors for a student with caching
   */
  async findPotentialMentors(student: Student): Promise<{id: number, name: string, stamps: number}[]> {
    return passportCache.getOrSet(
      `mentors:${student.id}`,
      async () => {
        // In production, this would fetch from Supabase
        // For this demo, we're using the existing function
        const { findPotentialMentors } = await import("@/utils/career");
        return findPotentialMentors(student);
      },
      { ttl: 1800 } // Cache for 30 minutes since mentor data changes less frequently
    );
  }

  /**
   * Connect a student with a mentor
   */
  async connectWithMentor(
    studentId: number, 
    mentorId: number, 
    mentorName: string
  ): Promise<boolean> {
    // In production, this would create a record in Supabase
    // For this demo, we'll just return success
    
    // Notify the user
    notifyMentorMatch({
      title: "Mentor Request Sent",
      description: `Your mentor request has been sent to ${mentorName}. They will respond shortly.`
    });
    
    return true;
  }
}

// Export a singleton instance for easy import
export const mentorService = new MentorService();

// Helper functions for direct imports
export const checkMentorEligibility = (student: Student) => 
  mentorService.checkMentorEligibility(student);

export const findPotentialMentors = (student: Student) => 
  mentorService.findPotentialMentors(student);

export const connectWithMentor = (studentId: number, mentorId: number, mentorName: string) => 
  mentorService.connectWithMentor(studentId, mentorId, mentorName);
