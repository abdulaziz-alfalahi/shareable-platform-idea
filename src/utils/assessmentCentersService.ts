
import { supabase } from "@/integrations/supabase/client";

interface AssessmentCenterInput {
  name: string;
  location?: string;
  contact_email?: string;
  contact_phone?: string;
  license_number?: string;
  description?: string;
}

interface AssessmentTypeInput {
  center_id: string;
  name: string;
  description?: string;
  duration?: string;
  skill_areas?: string[];
  certification_level?: string;
  cost?: number;
}

/**
 * Creates a new assessment center in the database
 */
export const createAssessmentCenter = async (data: AssessmentCenterInput) => {
  try {
    const { error } = await supabase
      .from('assessment_centers')
      .insert(data);

    if (error) throw error;
    
    return { success: true };
  } catch (error) {
    console.error("Error creating assessment center:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error occurred" 
    };
  }
};

/**
 * Creates a new assessment type in the database
 */
export const createAssessmentType = async (data: AssessmentTypeInput) => {
  try {
    const { error } = await supabase
      .from('assessment_types')
      .insert(data);

    if (error) throw error;
    
    return { success: true };
  } catch (error) {
    console.error("Error creating assessment type:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error occurred" 
    };
  }
};

/**
 * Fetches all assessment centers from the database
 */
export const fetchAssessmentCenters = async () => {
  try {
    const { data, error } = await supabase
      .from('assessment_centers')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    
    return { success: true, data };
  } catch (error) {
    console.error("Error fetching assessment centers:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error occurred",
      data: [] 
    };
  }
};

/**
 * Fetches all assessment types for a specific assessment center
 */
export const fetchAssessmentTypesByCenter = async (centerId: string) => {
  try {
    const { data, error } = await supabase
      .from('assessment_types')
      .select('*')
      .eq('center_id', centerId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    
    return { success: true, data };
  } catch (error) {
    console.error(`Error fetching assessment types for center ${centerId}:`, error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error occurred",
      data: [] 
    };
  }
};
