
import { supabase } from "@/integrations/supabase/client";
import { ScholarshipApplication } from "@/types/scholarship";
import { toast } from "sonner";

// Apply for a scholarship
export const applyForScholarship = async (
  scholarshipId: string, 
  application: Partial<ScholarshipApplication>
): Promise<boolean> => {
  try {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) throw new Error('User not authenticated');
    
    const { data: existingApplication } = await supabase
      .from('scholarship_applications')
      .select('id')
      .eq('scholarship_id', scholarshipId)
      .eq('applicant_id', user.id)
      .maybeSingle();
    
    if (existingApplication) {
      // Update existing application
      const { error } = await supabase
        .from('scholarship_applications')
        .update({
          ...application,
          updated_at: new Date().toISOString()
        })
        .eq('id', existingApplication.id);
      
      if (error) throw error;
    } else {
      // Create new application
      const { error } = await supabase
        .from('scholarship_applications')
        .insert({
          ...application,
          scholarship_id: scholarshipId,
          applicant_id: user.id
        });
      
      if (error) throw error;
    }
    
    toast.success('Scholarship application submitted successfully');
    return true;
  } catch (error) {
    console.error('Error applying for scholarship:', error);
    toast.error('Failed to submit scholarship application');
    return false;
  }
};

// Fetch user's scholarship applications
export const fetchUserApplications = async (): Promise<ScholarshipApplication[]> => {
  try {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) throw new Error('User not authenticated');
    
    const { data, error } = await supabase
      .from('scholarship_applications')
      .select('*, scholarships(*)')
      .eq('applicant_id', user.id)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    return data as unknown as ScholarshipApplication[];
  } catch (error) {
    console.error('Error fetching user applications:', error);
    toast.error('Failed to load your scholarship applications');
    return [];
  }
};
