
import { supabase } from "@/integrations/supabase/client";
import { Scholarship } from "@/types/scholarship";
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

import { ScholarshipMatch } from "@/types/scholarship";
