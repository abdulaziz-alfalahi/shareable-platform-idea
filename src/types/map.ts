
/**
 * Map and location related types
 */

export interface JobLocation {
  id: string;
  title: string;
  company: string;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  distance?: number;
  matchPercentage?: number;
  portfolioMatch?: boolean;
  distanceFromUser?: number; // Added for dynamic position calculation
}

export interface JobMapProps {
  jobs: JobLocation[];
  onLocationUpdate?: (jobs: JobLocation[]) => void;
}
