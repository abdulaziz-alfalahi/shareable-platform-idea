
import { Student } from '@/types/student';
import { Vacancy, JobMatchDetails } from '../types';
import { extractStudentSkills } from './analysis-service';

/**
 * Calculate the match percentage between a student's skills and a job's requirements
 */
export const calculateSkillMatch = (studentSkills: string[], jobRequirements: string[]): number => {
  if (!jobRequirements.length) return 0;
  
  // Count how many job requirements the student meets
  const matchedRequirements = jobRequirements.filter(req => 
    studentSkills.some(skill => 
      skill.toLowerCase().includes(req.toLowerCase()) || 
      req.toLowerCase().includes(skill.toLowerCase())
    )
  );
  
  // Calculate the match percentage
  return Math.round((matchedRequirements.length / jobRequirements.length) * 100);
};

/**
 * Identify skills that the student is missing for a job
 */
export const identifyMissingSkills = (studentSkills: string[], jobRequirements: string[]): string[] => {
  return jobRequirements.filter(req => 
    !studentSkills.some(skill => 
      skill.toLowerCase().includes(req.toLowerCase()) || 
      req.toLowerCase().includes(skill.toLowerCase())
    )
  );
};

/**
 * Get jobs recommended based on student's skills
 */
export const getRecommendedJobs = (student: Student, vacancies: Vacancy[]): Array<Vacancy & { matchPercentage: number, matchedSkills: string[], missingSkills: string[] }> => {
  const studentSkills = extractStudentSkills(student);
  
  // Calculate match for each vacancy
  const matchedVacancies = vacancies.map(vacancy => {
    const matchPercentage = calculateSkillMatch(studentSkills, vacancy.requirements);
    const missingSkills = identifyMissingSkills(studentSkills, vacancy.requirements);
    const matchedSkills = vacancy.requirements.filter(req => !missingSkills.includes(req));
    
    return {
      ...vacancy,
      matchPercentage,
      matchedSkills,
      missingSkills
    };
  });
  
  // Sort by match percentage (highest first)
  return matchedVacancies.sort((a, b) => b.matchPercentage - a.matchPercentage);
};

/**
 * Get jobs aligned with student's career path
 */
export const getCareerPathAlignedJobs = (student: Student, vacancies: Vacancy[]): Array<Vacancy & { matchPercentage: number, matchedSkills: string[], missingSkills: string[], careerPathAlignment: number, culturalFit: number }> => {
  // First, get basic skill matches
  const matchedVacancies = getRecommendedJobs(student, vacancies);
  
  // Then enhance with career path alignment score and cultural fit
  return matchedVacancies.map(vacancy => {
    // Calculate career path alignment (simplified for demo)
    // In real implementation, this would be more sophisticated
    const careerPathAlignment = student.careerPath && 
      vacancy.title.toLowerCase().includes(student.careerPath.toLowerCase()) ? 90 : 
      student.careerPath && 
      vacancy.company.toLowerCase().includes(student.careerPath.toLowerCase()) ? 70 : 50;
    
    // Calculate cultural fit (simplified for demo)
    // In real implementation, this would include values alignment, etc.
    const culturalFit = Math.min(85, 50 + (vacancy.matchPercentage / 5) + (Math.random() * 20));
    
    return {
      ...vacancy,
      careerPathAlignment,
      culturalFit: Math.round(culturalFit)
    };
  }).sort((a, b) => {
    // Sort by a combination of match percentage and career path alignment
    const aScore = (a.matchPercentage * 0.6) + (a.careerPathAlignment * 0.4);
    const bScore = (b.matchPercentage * 0.6) + (b.careerPathAlignment * 0.4);
    return bScore - aScore;
  });
};

/**
 * Get detailed job match information
 */
export const getDetailedJobMatch = (student: Student, vacancy: Vacancy): JobMatchDetails => {
  const studentSkills = extractStudentSkills(student);
  const matchPercentage = calculateSkillMatch(studentSkills, vacancy.requirements);
  const missingSkills = identifyMissingSkills(studentSkills, vacancy.requirements);
  const matchedSkills = vacancy.requirements.filter(req => !missingSkills.includes(req));
  
  // Calculate career path alignment
  const careerPathAlignment = student.careerPath && 
    vacancy.title.toLowerCase().includes(student.careerPath.toLowerCase()) ? 90 : 
    student.careerPath && 
    vacancy.company.toLowerCase().includes(student.careerPath.toLowerCase()) ? 70 : 50;
  
  // Calculate cultural fit 
  const culturalFit = Math.min(85, 50 + (matchPercentage / 5) + (Math.random() * 20));
  
  return {
    matchPercentage,
    matchedSkills,
    missingSkills,
    careerPathAlignment,
    culturalFit: Math.round(culturalFit)
  };
};
