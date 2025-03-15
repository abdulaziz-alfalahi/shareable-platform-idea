
import { Student } from '@/types/student';
import { Vacancy, JobMatchDetails } from './types';
import { Vacancy as UIVacancy } from '@/types/jobs';
import { getRecommendedJobs, getCareerPathAlignedJobs, getDetailedJobMatch } from './skill-gap';

// Convert from UI Vacancy format to Career Vacancy format
const convertToCareerVacancy = (uiVacancies: UIVacancy[]): Vacancy[] => {
  return uiVacancies.map(vacancy => ({
    id: Number(vacancy.id),
    title: vacancy.title,
    company: vacancy.company,
    requiredSkills: vacancy.requiredSkills,
    location: vacancy.location,
    type: "full-time", // Default value since UI Vacancy doesn't have this
    salary: vacancy.salary,
    description: vacancy.description || ""
  }));
};

// Convert from Career Vacancy format back to UI Vacancy format
const convertToUIVacancy = (
  careerVacancies: Array<Vacancy & { 
    matchPercentage?: number, 
    matchedSkills?: string[], 
    missingSkills?: string[],
    culturalFit?: number,
    careerPathAlignment?: number
  }>,
  originalVacancies: UIVacancy[]
): UIVacancy[] => {
  // Create a map of original vacancies by ID for quick lookup
  const originalVacancyMap = new Map(
    originalVacancies.map(v => [v.id, v])
  );

  return careerVacancies.map(v => {
    const original = originalVacancyMap.get(String(v.id));
    return {
      id: String(v.id),
      title: v.title,
      company: v.company,
      location: v.location,
      matchPercentage: v.matchPercentage || 0,
      requiredSkills: v.requiredSkills || [],
      missingSkills: v.missingSkills || [],
      matchedSkills: v.matchedSkills || [],
      culturalFit: v.culturalFit,
      careerPathAlignment: v.careerPathAlignment,
      salary: v.salary || original?.salary || "Not specified",
      postedDate: original?.postedDate || new Date().toLocaleDateString()
    };
  });
};

// Enhanced job recommendation function based on skills
export const recommendJobs = (student: Student, uiVacancies: UIVacancy[]): UIVacancy[] => {
  // Convert UI vacancies to career vacancies
  const careerVacancies = convertToCareerVacancy(uiVacancies);
  
  // Use the enhanced job matching service
  const recommendedCareerVacancies = getRecommendedJobs(student, careerVacancies);
  
  // Convert back to UI vacancies format
  return convertToUIVacancy(recommendedCareerVacancies, uiVacancies);
};

// Enhanced job recommendation function based on career path
export const recommendCareerAlignedJobs = (student: Student, uiVacancies: UIVacancy[]): UIVacancy[] => {
  // Convert UI vacancies to career vacancies
  const careerVacancies = convertToCareerVacancy(uiVacancies);
  
  // Use the career path aligned matching service
  const alignedCareerVacancies = getCareerPathAlignedJobs(student, careerVacancies);
  
  // Convert back to UI vacancies format
  return convertToUIVacancy(alignedCareerVacancies, uiVacancies);
};

// Get detailed match information for a specific job
export const getJobMatchDetails = (student: Student, vacancy: UIVacancy): JobMatchDetails => {
  const careerVacancy: Vacancy = {
    id: Number(vacancy.id),
    title: vacancy.title,
    company: vacancy.company,
    requiredSkills: vacancy.requiredSkills,
    location: vacancy.location,
    type: "full-time",
    salary: vacancy.salary,
    description: vacancy.description
  };
  
  return getDetailedJobMatch(student, careerVacancy);
};
