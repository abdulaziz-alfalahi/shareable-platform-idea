
import { CareerPath } from './pathwayTypes';
import { mockCareerPaths } from './mockData';

// Get all available career paths
export const getCareerPaths = async (): Promise<CareerPath[]> => {
  // In a production environment, this would fetch from an API
  // For now, we'll return mock data
  return mockCareerPaths;
};

// Get a specific career path by ID
export const getCareerPathById = async (pathId: string): Promise<CareerPath | null> => {
  const paths = await getCareerPaths();
  return paths.find(path => path.id === pathId) || null;
};
