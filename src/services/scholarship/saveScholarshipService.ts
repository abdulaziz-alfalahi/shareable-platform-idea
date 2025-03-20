
import { supabase } from "@/integrations/supabase/client";
import { Scholarship } from "@/types/scholarship";
import { toast } from "sonner";

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
      // Ensure required fields are present
      if (!scholarship.title || !scholarship.award_amount || !scholarship.application_deadline || !scholarship.eligibility_criteria) {
        throw new Error('Missing required fields for scholarship');
      }
      
      // Explicitly list fields to match the database schema
      const { data, error } = await supabase
        .from('scholarships')
        .insert({
          title: scholarship.title,
          description: scholarship.description,
          sponsor: scholarship.sponsor,
          award_amount: scholarship.award_amount,
          application_deadline: scholarship.application_deadline,
          eligibility_criteria: scholarship.eligibility_criteria,
          requirements: scholarship.requirements,
          document_requirements: scholarship.document_requirements,
          website_url: scholarship.website_url,
          status: scholarship.status || 'draft',
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
