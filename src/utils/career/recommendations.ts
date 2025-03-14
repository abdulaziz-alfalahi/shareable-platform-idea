
import { Student } from '@/types/student';
import { Vacancy } from './types';
import { getRecommendedJobs } from './skill-gap';

// Simple job recommendation function based on skills
export const recommendJobs = (student: Student, jobs: Vacancy[]): Vacancy[] => {
  // Use the enhanced job matching service
  return getRecommendedJobs(student, jobs);
};
