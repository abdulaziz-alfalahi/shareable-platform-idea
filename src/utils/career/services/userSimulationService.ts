
import { supabase } from '@/integrations/supabase/client';

// Get user's previous simulations
export const getUserSimulations = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('user_simulations')
      .select(`
        *,
        career_paths!inner(title, industry),
        simulation_required_skills(skill),
        simulation_recommended_training(training_program),
        simulation_selected_nodes(node_id)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching user simulations:", error);
    return [];
  }
};
