
import { Student } from "@/types/student";

/**
 * Service for handling mentor eligibility functionality
 */
export class EligibilityService {
  /**
   * Check if a student is eligible to become a mentor
   */
  checkMentorEligibility(student: Student): boolean {
    // Students with 10+ stamps and at least 2 years of work experience can be mentors
    const hasEnoughStamps = student.passportStamps.length >= 10;
    
    // Check for work experience stamps
    const hasWorkExperience = student.passportStamps.some(
      stamp => stamp.category === "Employment" && stamp.level !== "Bronze"
    );
    
    return hasEnoughStamps && hasWorkExperience;
  }

  /**
   * Find potential mentors for a student
   */
  async findPotentialMentors(student: Student): Promise<{id: string, name: string, industry: string, stamps: number}[]> {
    try {
      // In a real implementation, we would query Supabase:
      // const { data, error } = await supabase
      //   .from('mentors')
      //   .select('id, profiles(name), industry, expertise')
      //   .eq('available', true)
      //   .limit(10);
      
      // For now, return mock data
      return [
        { id: "m1", name: "Ahmed Al Mansoori", industry: "Information Technology", stamps: 32 },
        { id: "m2", name: "Fatima Al Hashemi", industry: "Finance", stamps: 28 },
        { id: "m3", name: "Mohammed Al Marzooqi", industry: "Engineering", stamps: 25 }
      ];
    } catch (error) {
      console.error("Error finding potential mentors:", error);
      throw error;
    }
  }
}

// Export a singleton instance for easy import
export const eligibilityService = new EligibilityService();

// Helper functions for direct imports
export const checkMentorEligibility = (student: Student) => 
  eligibilityService.checkMentorEligibility(student);

export const findPotentialMentors = (student: Student) => 
  eligibilityService.findPotentialMentors(student);
