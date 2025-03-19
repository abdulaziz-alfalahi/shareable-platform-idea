
/**
 * Map and location related types
 */

export interface CareerPathPin {
  type: string;
  icon: string;
  color: string;
}

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
  careerPathPin?: CareerPathPin; // Added for career path pins
}

export interface JobMapProps {
  jobs: JobLocation[];
  onLocationUpdate?: (jobs: JobLocation[]) => void;
  onNearbyJobsUpdate?: (jobs: JobLocation[]) => void;
  onRadiusChange?: (radius: number) => void;
}
