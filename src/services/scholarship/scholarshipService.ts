
import { supabase } from "@/integrations/supabase/client";
import { Scholarship, ScholarshipApplication, ScholarshipMatch, StudentScholarshipProfile } from "@/types/scholarship";
import { toast } from "sonner";

// Fetch scholarships
export const fetchScholarships = async (filters?: Record<string, any>): Promise<Scholarship[]> => {
  try {
    let query = supabase.from('scholarships').select('*');
    
    // Apply filters
    if (filters) {
      if (filters.status) {
        query = query.eq('status', filters.status);
      }
      if (filters.sponsor) {
        query = query.eq('sponsor', filters.sponsor);
      }
      // Add more filters as needed
    }
    
    const { data, error } = await query.order('application_deadline', { ascending: true });
    
    if (error) throw error;
    
    return data as Scholarship[];
  } catch (error) {
    console.error('Error fetching scholarships:', error);
    toast.error('Failed to load scholarships');
    return [];
  }
};

// Fetch a single scholarship by ID
export const fetchScholarshipById = async (id: string): Promise<Scholarship | null> => {
  try {
    const { data, error } = await supabase
      .from('scholarships')
      .select('*')
      .eq('id', id)
      .maybeSingle();
    
    if (error) throw error;
    
    return data as Scholarship;
  } catch (error) {
    console.error('Error fetching scholarship:', error);
    toast.error('Failed to load scholarship details');
    return null;
  }
};

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

// Get scholarship matches for current user
export const getScholarshipMatches = async (): Promise<ScholarshipMatch[]> => {
  try {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) throw new Error('User not authenticated');
    
    const { data, error } = await supabase
      .rpc('match_student_with_scholarships', { student_id: user.id });
    
    if (error) throw error;
    
    return data as ScholarshipMatch[];
  } catch (error) {
    console.error('Error fetching scholarship matches:', error);
    toast.error('Failed to find matching scholarships');
    return [];
  }
};

// For providers to create or update scholarships
export const saveScholarship = async (scholarship: Partial<Scholarship>): Promise<string | null> => {
  try {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) throw new Error('User not authenticated');
    
    if (scholarship.id) {
      // Update existing scholarship
      const { error } = await supabase
        .from('scholarships')
        .update({
          ...scholarship,
          updated_at: new Date().toISOString()
        })
        .eq('id', scholarship.id);
      
      if (error) throw error;
      
      return scholarship.id;
    } else {
      // Create new scholarship
      const { data, error } = await supabase
        .from('scholarships')
        .insert({
          ...scholarship,
          created_by: user.id
        })
        .select('id')
        .single();
      
      if (error) throw error;
      
      return data.id;
    }
  } catch (error) {
    console.error('Error saving scholarship:', error);
    toast.error('Failed to save scholarship');
    return null;
  }
};
