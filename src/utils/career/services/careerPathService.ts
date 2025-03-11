
import { supabase } from '@/integrations/supabase/client';
import { CareerPath, CareerNode } from '../pathwayTypes';
import { mockCareerPaths } from '../mockData';

// Get all available career paths
export const getCareerPaths = async (): Promise<CareerPath[]> => {
  try {
    // Fetch career paths from Supabase
    const { data: pathsData, error: pathsError } = await supabase
      .from('career_paths')
      .select('*');

    if (pathsError) throw pathsError;

    if (!pathsData || pathsData.length === 0) {
      console.log("No career paths found in database, using mock data");
      return mockCareerPaths; // Fallback to mock data if no paths in database
    }

    // For each career path, fetch the nodes
    const careerPaths: CareerPath[] = await Promise.all(
      pathsData.map(async (path) => {
        // Fetch nodes for this path
        const { data: nodesData, error: nodesError } = await supabase
          .from('career_path_nodes')
          .select('*')
          .eq('path_id', path.id);

        if (nodesError) throw nodesError;

        // For each node, fetch skills and prerequisites
        const nodes: CareerNode[] = await Promise.all(
          (nodesData || []).map(async (node) => {
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
            const timeToAchieve = node.time_to_achieve <= 12 
              ? `${node.time_to_achieve} months` 
              : `${Math.floor(node.time_to_achieve / 12)} years`;

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
          })
        );

        return {
          id: path.id,
          name: path.title,
          description: path.description || '',
          sector: path.industry || '',
          popularity: path.popularity || 5,
          nodes: nodes
        };
      })
    );

    return careerPaths;
  } catch (error) {
    console.error("Error fetching career paths:", error);
    return mockCareerPaths; // Fallback to mock data on error
  }
};

// Get a specific career path by ID
export const getCareerPathById = async (pathId: string): Promise<CareerPath | null> => {
  try {
    const paths = await getCareerPaths();
    return paths.find(path => path.id === pathId) || null;
  } catch (error) {
    console.error("Error fetching career path by ID:", error);
    return null;
  }
};
