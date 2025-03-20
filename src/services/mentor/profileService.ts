
import { supabase } from "@/integrations/supabase/client";
import { MentorProfile } from "./types";

/**
 * Service for handling mentor profile management
 */
export class ProfileService {
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
export const profileService = new ProfileService();
