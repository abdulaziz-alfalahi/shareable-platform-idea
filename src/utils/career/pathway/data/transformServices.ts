
/**
 * Data transformation services for Career Pathway
 * Handles all data transformation operations
 */

import { supabase } from '@/integrations/supabase/client';
import { CareerNode } from '../types';

/**
 * Transform raw node data into CareerNode objects
 */
export const transformNodeData = async (node: any): Promise<CareerNode> => {
  // Fetch skills
  const { data: skillsData, error: skillsError } = await supabase
    .from('node_skills')
    .select('skill')
    .eq('node_id', node.id);
  
  if (skillsError) throw skillsError;

  // Fetch prerequisites
  const { data: prereqData, error: prereqError } = await supabase
    .from('node_prerequisites')
    .select('prerequisite_node_id')
    .eq('node_id', node.id);
  
  if (prereqError) throw prereqError;

  // Convert months to display string
  const timeToAchieve = formatTimeToAchieve(node.time_to_achieve);

  return {
    id: node.id,
    title: node.title,
    description: node.description || '',
    level: node.level as 'entry' | 'mid' | 'senior' | 'expert',
    salary: {
      min: node.salary_min,
      max: node.salary_max,
      currency: 'AED'
    },
    skills: skillsData?.map(s => s.skill) || [],
    education: ['Required education'], // Default education
    certifications: [], 
    timeToAchieve: timeToAchieve,
    prerequisites: prereqData?.map(p => p.prerequisite_node_id) || []
  };
};

/**
 * Format time to achieve (months) into a display string
 */
export const formatTimeToAchieve = (months: number): string => {
  return months <= 12 
    ? `${months} months` 
    : `${Math.floor(months / 12)} years`;
};
