
// Export all mock data from one file
import { initialApplications } from './applicationData';
import { vacanciesData } from './vacancyData';
import { trainingProgramsData } from './trainingData';
import { jobLocationsData } from './jobLocationData';
import { extendedJobLocationsData } from './jobLocationDataExtended';
import { farJobLocationsData, workplaceLocation } from './jobLocationDataFar';
import { JobLocation } from '@/types/map';

// Combine all job location data
export const allJobLocationsData: JobLocation[] = [
  ...jobLocationsData,
  ...extendedJobLocationsData,
  ...farJobLocationsData,
  workplaceLocation
];

export {
  initialApplications,
  vacanciesData,
  trainingProgramsData,
  jobLocationsData,
  extendedJobLocationsData,
  farJobLocationsData,
  workplaceLocation
};
