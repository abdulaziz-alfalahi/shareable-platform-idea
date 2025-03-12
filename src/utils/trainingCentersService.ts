
import { supabase } from "@/integrations/supabase/client";

export interface TrainingCenter {
  id: string;
  name: string;
  location?: string;
  contact_email?: string;
  contact_phone?: string;
  license_number?: string;
  description?: string;
  created_at?: string;
}

export interface TrainingProgram {
  id: string;
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
  created_at?: string;
}

/**
 * Fetches all training centers from the database
 */
export const fetchTrainingCenters = async (): Promise<{
  success: boolean;
  data: TrainingCenter[];
  error?: string;
}> => {
  try {
    const { data, error } = await supabase
      .from('training_centers')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    
    return { success: true, data: data || [] };
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
 * Creates a new training center in the database
 */
export const createTrainingCenter = async (center: Omit<TrainingCenter, 'id' | 'created_at'>) => {
  try {
    const { error } = await supabase
      .from('training_centers')
      .insert(center);

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
 * Fetches all training programs for a training center
 */
export const fetchTrainingPrograms = async (centerId: string): Promise<{
  success: boolean;
  data: TrainingProgram[];
  error?: string;
}> => {
  try {
    const { data, error } = await supabase
      .from('training_programs')
      .select('*')
      .eq('center_id', centerId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    
    return { success: true, data: data || [] };
  } catch (error) {
    console.error("Error fetching training programs:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error occurred",
      data: [] 
    };
  }
};

/**
 * Creates a new training program in the database
 */
export const createTrainingProgram = async (program: Omit<TrainingProgram, 'id' | 'created_at'>) => {
  try {
    const { error } = await supabase
      .from('training_programs')
      .insert(program);

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
