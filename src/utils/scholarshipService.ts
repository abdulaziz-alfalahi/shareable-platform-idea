
import { supabase } from "@/integrations/supabase/client";
import { 
  Scholarship, 
  StudentScholarshipProfile, 
  ScholarshipApplication, 
  ScholarshipNotification,
  ScholarshipMatch
} from "@/types/scholarship";
import { notifySuccess, notifyError } from "@/utils/notification";

/**
 * Fetches all active scholarships
 */
export const fetchScholarships = async (): Promise<Scholarship[]> => {
  try {
    const { data, error } = await supabase
      .from('scholarships')
      .select('*')
      .eq('status', 'active')
      .order('application_deadline', { ascending: true });

    if (error) throw error;
    
    return data || [];
  } catch (error) {
    console.error("Error fetching scholarships:", error);
    return [];
  }
};

/**
 * Fetches a single scholarship by ID
 */
export const fetchScholarshipById = async (id: string): Promise<Scholarship | null> => {
  try {
    const { data, error } = await supabase
      .from('scholarships')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error(`Error fetching scholarship with ID ${id}:`, error);
    return null;
  }
};

/**
 * Fetches matched scholarships for current user
 */
export const fetchMatchedScholarships = async (): Promise<ScholarshipMatch[]> => {
  try {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData?.user?.id) return [];

    const { data, error } = await supabase.rpc(
      'match_student_with_scholarships',
      { student_id: userData.user.id }
    );

    if (error) throw error;
    
    // Fetch full scholarship details for each match
    const matchesWithDetails = await Promise.all(
      (data || []).map(async (match: ScholarshipMatch) => {
        const scholarship = await fetchScholarshipById(match.scholarship_id);
        return {
          ...match,
          scholarship
        };
      })
    );
    
    return matchesWithDetails;
  } catch (error) {
    console.error("Error fetching matched scholarships:", error);
    return [];
  }
};

/**
 * Fetches or creates student scholarship profile
 */
export const getOrCreateStudentProfile = async (): Promise<StudentScholarshipProfile | null> => {
  try {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData?.user?.id) return null;

    // Try to get existing profile
    const { data: existingProfile, error: fetchError } = await supabase
      .from('student_scholarship_profiles')
      .select('*')
      .eq('user_id', userData.user.id)
      .single();

    if (existingProfile) return existingProfile;
    
    // If no profile exists, create one
    const { data: newProfile, error: insertError } = await supabase
      .from('student_scholarship_profiles')
      .insert({
        user_id: userData.user.id,
        academic_info: {},
        financial_info: {},
        areas_of_interest: [],
        achievements: [],
        documents: {}
      })
      .select('*')
      .single();

    if (insertError) throw insertError;
    
    return newProfile;
  } catch (error) {
    console.error("Error getting or creating student profile:", error);
    return null;
  }
};

/**
 * Updates student scholarship profile
 */
export const updateStudentProfile = async (
  profileData: Partial<StudentScholarshipProfile>
): Promise<{ success: boolean; message: string }> => {
  try {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData?.user?.id) {
      return { success: false, message: "User not authenticated" };
    }

    const { error } = await supabase
      .from('student_scholarship_profiles')
      .update(profileData)
      .eq('user_id', userData.user.id);

    if (error) throw error;
    
    notifySuccess({ title: "Profile updated successfully" });
    return { success: true, message: "Profile updated successfully" };
  } catch (error) {
    console.error("Error updating student profile:", error);
    notifyError({ title: "Failed to update profile", description: error instanceof Error ? error.message : "Unknown error" });
    return { 
      success: false, 
      message: error instanceof Error ? error.message : "Failed to update profile" 
    };
  }
};

/**
 * Fetches applications for current user
 */
export const fetchMyApplications = async (): Promise<ScholarshipApplication[]> => {
  try {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData?.user?.id) return [];

    const { data, error } = await supabase
      .from('scholarship_applications')
      .select(`
        *,
        scholarship:scholarships(*)
      `)
      .eq('applicant_id', userData.user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    
    return data || [];
  } catch (error) {
    console.error("Error fetching applications:", error);
    return [];
  }
};

/**
 * Creates or updates a scholarship application
 */
export const saveApplication = async (
  scholarshipId: string,
  applicationData: Partial<ScholarshipApplication>,
  isSubmitting = false
): Promise<{ success: boolean; applicationId?: string; message: string }> => {
  try {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData?.user?.id) {
      return { success: false, message: "User not authenticated" };
    }

    // Check if application already exists
    const { data: existingApp, error: fetchError } = await supabase
      .from('scholarship_applications')
      .select('id')
      .eq('scholarship_id', scholarshipId)
      .eq('applicant_id', userData.user.id)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 = not found
      throw fetchError;
    }
    
    let result;
    
    // Set submitted_at if submitting
    const dataToSave = {
      ...applicationData,
      ...(isSubmitting ? { 
        status: 'submitted',
        submitted_at: new Date().toISOString()
      } : {})
    };

    if (existingApp) {
      // Update existing application
      const { data, error } = await supabase
        .from('scholarship_applications')
        .update(dataToSave)
        .eq('id', existingApp.id)
        .select('id')
        .single();
        
      if (error) throw error;
      result = data;
    } else {
      // Create new application
      const { data, error } = await supabase
        .from('scholarship_applications')
        .insert({
          scholarship_id: scholarshipId,
          applicant_id: userData.user.id,
          status: isSubmitting ? 'submitted' : 'draft',
          submitted_at: isSubmitting ? new Date().toISOString() : null,
          ...dataToSave
        })
        .select('id')
        .single();
        
      if (error) throw error;
      result = data;
    }
    
    const message = isSubmitting 
      ? "Application submitted successfully" 
      : "Application saved as draft";
    
    notifySuccess({ title: message });
    return { 
      success: true, 
      applicationId: result.id,
      message 
    };
  } catch (error) {
    console.error("Error saving application:", error);
    const message = isSubmitting 
      ? "Failed to submit application" 
      : "Failed to save application";
    
    notifyError({ title: message, description: error instanceof Error ? error.message : "Unknown error" });
    return { 
      success: false, 
      message: error instanceof Error ? error.message : message 
    };
  }
};

/**
 * Fetches notifications for current user
 */
export const fetchNotifications = async (): Promise<ScholarshipNotification[]> => {
  try {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData?.user?.id) return [];

    const { data, error } = await supabase
      .from('scholarship_notifications')
      .select('*')
      .eq('user_id', userData.user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    
    return data || [];
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return [];
  }
};

/**
 * Marks a notification as read
 */
export const markNotificationAsRead = async (notificationId: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('scholarship_notifications')
      .update({ is_read: true })
      .eq('id', notificationId);

    if (error) throw error;
    
    return true;
  } catch (error) {
    console.error("Error marking notification as read:", error);
    return false;
  }
};

/**
 * For administrators: Create a new scholarship
 */
export const createScholarship = async (
  scholarshipData: Partial<Scholarship>
): Promise<{ success: boolean; scholarshipId?: string; message: string }> => {
  try {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData?.user?.id) {
      return { success: false, message: "User not authenticated" };
    }

    const { data, error } = await supabase
      .from('scholarships')
      .insert({
        ...scholarshipData,
        created_by: userData.user.id
      })
      .select('id')
      .single();

    if (error) throw error;
    
    notifySuccess({ title: "Scholarship created successfully" });
    return { 
      success: true, 
      scholarshipId: data.id,
      message: "Scholarship created successfully" 
    };
  } catch (error) {
    console.error("Error creating scholarship:", error);
    notifyError({ title: "Failed to create scholarship", description: error instanceof Error ? error.message : "Unknown error" });
    return { 
      success: false, 
      message: error instanceof Error ? error.message : "Failed to create scholarship" 
    };
  }
};
