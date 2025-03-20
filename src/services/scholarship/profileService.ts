
import { supabase } from "@/integrations/supabase/client";
import { StudentScholarshipProfile } from "@/types/scholarship";
import { toast } from "sonner";

// Create or update student scholarship profile
export const saveStudentProfile = async (profile: Partial<StudentScholarshipProfile>): Promise<boolean> => {
  try {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) throw new Error('User not authenticated');
    
    const { data: existingProfile } = await supabase
      .from('student_scholarship_profiles')
      .select('id')
      .eq('user_id', user.id)
      .maybeSingle();
    
    if (existingProfile) {
      // Update existing profile
      const { error } = await supabase
        .from('student_scholarship_profiles')
        .update({
          ...profile,
          updated_at: new Date().toISOString()
        })
        .eq('id', existingProfile.id);
      
      if (error) throw error;
    } else {
      // Create new profile
      const { error } = await supabase
        .from('student_scholarship_profiles')
        .insert({
          ...profile,
          user_id: user.id
        });
      
      if (error) throw error;
    }
    
    toast.success('Scholarship profile saved successfully');
    return true;
  } catch (error) {
    console.error('Error saving student profile:', error);
    toast.error('Failed to save scholarship profile');
    return false;
  }
};

// Fetch student scholarship profile
export const fetchStudentProfile = async (): Promise<StudentScholarshipProfile | null> => {
  try {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) throw new Error('User not authenticated');
    
    const { data, error } = await supabase
      .from('student_scholarship_profiles')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();
    
    if (error) throw error;
    
    return data as StudentScholarshipProfile;
  } catch (error) {
    console.error('Error fetching student profile:', error);
    toast.error('Failed to load scholarship profile');
    return null;
  }
};
