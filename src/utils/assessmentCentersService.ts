
import { supabase } from "@/integrations/supabase/client";

export interface AssessmentCenter {
  id: string;
  name: string;
  location?: string;
  contact_email?: string;
  contact_phone?: string;
  license_number?: string;
  description?: string;
  created_at?: string;
}

export interface AssessmentType {
  id: string;
  center_id: string;
  name: string;
  description?: string;
  duration?: string;
  skill_areas?: string[];
  certification_level?: string;
  cost?: number;
  created_at?: string;
}

/**
 * Fetches all assessment centers from the database
 */
export const fetchAssessmentCenters = async (): Promise<{
  success: boolean;
  data: AssessmentCenter[];
  error?: string;
}> => {
  try {
    const { data, error } = await supabase
      .from('assessment_centers')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    
    return { success: true, data: data || [] };
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
 * Creates a new assessment center in the database
 */
export const createAssessmentCenter = async (center: Omit<AssessmentCenter, 'id' | 'created_at'>) => {
  try {
    const { error } = await supabase
      .from('assessment_centers')
      .insert(center);

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
 * Fetches all assessment types for an assessment center
 */
export const fetchAssessmentTypes = async (centerId: string): Promise<{
  success: boolean;
  data: AssessmentType[];
  error?: string;
}> => {
  try {
    const { data, error } = await supabase
      .from('assessment_types')
      .select('*')
      .eq('center_id', centerId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    
    return { success: true, data: data || [] };
  } catch (error) {
    console.error("Error fetching assessment types:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error occurred",
      data: [] 
    };
  }
};

/**
 * Creates a new assessment type in the database
 */
export const createAssessmentType = async (assessmentType: Omit<AssessmentType, 'id' | 'created_at'>) => {
  try {
    const { error } = await supabase
      .from('assessment_types')
      .insert(assessmentType);

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
