
import { Student } from '@/types/student';
import { Vacancy } from './types';

// Simple job recommendation function based on skills
export const recommendJobs = (student: Student, jobs: Vacancy[]): Vacancy[] => {
  // Extract skills from student (in a real app, you'd have a skills field)
  const userSkills = student.achievements; // Using achievements as proxy for skills
  
  // Calculate similarity between user skills and job requirements
  const scoredJobs = jobs.map(job => {
    const matchingSkills = userSkills.filter(skill => 
      job.requirements.some(requirement => 
        requirement.toLowerCase().includes(skill.toLowerCase()) || 
        skill.toLowerCase().includes(requirement.toLowerCase())
      )
    );
    
    return {
      ...job,
      matchScore: matchingSkills.length / Math.max(userSkills.length, job.requirements.length)
    };
  });
  
  // Sort by match score (highest first) and return the original job objects
  return scoredJobs
    .sort((a, b) => b.matchScore - a.matchScore)
    .map(({ matchScore, ...job }) => job as Vacancy);
};
