
import { supabase } from "@/integrations/supabase/client";
import { Student } from "@/types/student";
import { notifyMentorMatch } from "@/utils/notification";

export interface MentorProfile {
  id: string;
  name: string;
  industry: string;
  experience_years: number;
  expertise: string[];
  bio: string | null;
  available: boolean;
}

export interface MentorshipRequest {
  id: string;
  student_id: string;
  mentor_id: string;
  status: string;
  message: string | null;
  created_at: string;
}

/**
 * Service for handling mentor-related functionality
 */
export class MentorService {
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

  /**
   * Get a list of available mentors
   */
  async getAvailableMentors(): Promise<MentorProfile[]> {
    try {
      // This would be a real Supabase query in a production app
      // const { data, error } = await supabase
      //   .from('mentors')
      //   .select(`
      //     id,
      //     industry,
      //     experience_years,
      //     expertise,
      //     bio,
      //     available,
      //     profiles!inner(name)
      //   `)
      //   .eq('available', true);
      
      // if (error) throw error;
      
      // return data.map(item => ({
      //   id: item.id,
      //   name: item.profiles.name,
      //   industry: item.industry,
      //   experience_years: item.experience_years,
      //   expertise: item.expertise,
      //   bio: item.bio,
      //   available: item.available
      // }));
      
      // Mock data for now
      return [
        {
          id: "m1",
          name: "Ahmed Al Mansoori",
          industry: "Information Technology",
          experience_years: 12,
          expertise: ["Software Development", "AI", "Career Coaching"],
          bio: "Senior software engineer with over 12 years of experience in leading tech companies.",
          available: true
        },
        {
          id: "m2",
          name: "Fatima Al Hashemi",
          industry: "Finance",
          experience_years: 8,
          expertise: ["Investment Banking", "Financial Analysis", "Mentorship"],
          bio: "Finance professional specializing in investment strategies and career development.",
          available: true
        },
        {
          id: "m3",
          name: "Mohammed Al Marzooqi",
          industry: "Engineering",
          experience_years: 15,
          expertise: ["Civil Engineering", "Project Management", "Leadership"],
          bio: "Civil engineer and project manager with experience in major UAE infrastructure projects.",
          available: true
        }
      ];
    } catch (error) {
      console.error("Error fetching available mentors:", error);
      throw error;
    }
  }

  /**
   * Send a mentorship request to a mentor
   */
  async sendMentorshipRequest(studentId: string, mentorId: string, message?: string): Promise<{ success: boolean, error?: any }> {
    try {
      // This would be a real Supabase insert in a production app
      // const { data, error } = await supabase
      //   .from('mentorship_requests')
      //   .insert({
      //     student_id: studentId,
      //     mentor_id: mentorId,
      //     message: message || null
      //   });
      
      // if (error) throw error;
      
      // For now, return success
      return { success: true };
    } catch (error) {
      console.error("Error sending mentorship request:", error);
      return { success: false, error };
    }
  }

  /**
   * Get mentorship requests for a student
   */
  async getStudentMentorshipRequests(studentId: string): Promise<MentorshipRequest[]> {
    try {
      // This would be a real Supabase query in a production app
      // const { data, error } = await supabase
      //   .from('mentorship_requests')
      //   .select(`
      //     id,
      //     student_id,
      //     mentor_id,
      //     status,
      //     message,
      //     created_at,
      //     mentors!inner(
      //       profiles!inner(name),
      //       industry
      //     )
      //   `)
      //   .eq('student_id', studentId);
      
      // if (error) throw error;
      
      // Mock data for now
      return [
        {
          id: "r1",
          student_id: studentId,
          mentor_id: "m1",
          status: "pending",
          message: "I would like to learn more about career paths in software development.",
          created_at: "2023-10-15T08:30:00Z"
        }
      ];
    } catch (error) {
      console.error("Error fetching mentorship requests:", error);
      throw error;
    }
  }

  /**
   * Connect a student with a mentor
   */
  async connectWithMentor(
    studentId: number, 
    mentorId: number, 
    mentorName: string
  ): Promise<boolean> {
    try {
      // In production, this would create a record in Supabase
      // const { error } = await supabase
      //   .from('mentorship_requests')
      //   .insert({
      //     student_id: studentId,
      //     mentor_id: mentorId
      //   });
      
      // if (error) throw error;
      
      // Notify the user
      notifyMentorMatch({
        title: "Mentor Request Sent",
        description: `Your mentor request has been sent to ${mentorName}. They will respond shortly.`
      });
      
      return true;
    } catch (error) {
      console.error("Error connecting with mentor:", error);
      return false;
    }
  }

  /**
   * Register a user as a mentor
   */
  async registerAsMentor(userId: string, mentorData: {
    industry: string;
    experience_years: number;
    expertise: string[];
    bio?: string;
  }): Promise<{ success: boolean, error?: any }> {
    try {
      // This would be a real Supabase insert in a production app
      // const { error } = await supabase
      //   .from('mentors')
      //   .insert({
      //     id: userId,
      //     ...mentorData
      //   });
      
      // if (error) throw error;
      
      return { success: true };
    } catch (error) {
      console.error("Error registering as mentor:", error);
      return { success: false, error };
    }
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
