
import { supabase } from "@/integrations/supabase/client";

interface TrainingCenterInput {
  name: string;
  location?: string;
  contact_email?: string;
  contact_phone?: string;
  license_number?: string;
  description?: string;
}

interface TrainingProgramInput {
  center_id: string;
  name: string;
  description?: string;
  duration?: string;
  skill_level?: string;
  target_audience?: string;
  certification_offered?: boolean;
  start_date?: string;
  end_date?: string;
  cost?: number;
}

/**
 * Creates a new training center in the database
 */
export const createTrainingCenter = async (data: TrainingCenterInput) => {
  try {
    const { error } = await supabase
      .from('training_centers')
      .insert(data);

    if (error) throw error;
    
    return { success: true };
  } catch (error) {
    console.error("Error creating training center:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error occurred" 
    };
  }
};

/**
 * Creates a new training program in the database
 */
export const createTrainingProgram = async (data: TrainingProgramInput) => {
  try {
    const { error } = await supabase
      .from('training_programs')
      .insert(data);

    if (error) throw error;
    
    return { success: true };
  } catch (error) {
    console.error("Error creating training program:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error occurred" 
    };
  }
};

/**
 * Fetches all training centers from the database
 */
export const fetchTrainingCenters = async () => {
  try {
    const { data, error } = await supabase
      .from('training_centers')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    
    return { success: true, data };
  } catch (error) {
    console.error("Error fetching training centers:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error occurred",
      data: [] 
    };
  }
};

/**
 * Fetches all programs for a specific training center
 */
export const fetchProgramsByCenter = async (centerId: string) => {
  try {
    const { data, error } = await supabase
      .from('training_programs')
      .select('*')
      .eq('center_id', centerId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    
    return { success: true, data };
  } catch (error) {
    console.error(`Error fetching programs for center ${centerId}:`, error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error occurred",
      data: [] 
    };
  }
};
