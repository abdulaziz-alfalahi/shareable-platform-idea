
import { supabase } from "@/integrations/supabase/client";
import { notifyMentorMatch } from "@/utils/notification";
import { MentorshipRequest } from "./types";

/**
 * Service for handling mentorship requests
 */
export class RequestService {
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
}

// Export a singleton instance for easy import
export const requestService = new RequestService();

// Helper function for direct import
export const connectWithMentor = (studentId: number, mentorId: number, mentorName: string) => 
  requestService.connectWithMentor(studentId, mentorId, mentorName);
