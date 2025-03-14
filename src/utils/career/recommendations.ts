
import { Student } from '@/types/student';
import { Vacancy as CareerVacancy } from './types';
import { Vacancy as UIVacancy } from '@/components/jobs/MatchingVacanciesTab';
import { getRecommendedJobs } from './skill-gap';

// Convert from UI Vacancy format to Career Vacancy format
const convertToCareerVacancy = (uiVacancies: UIVacancy[]): CareerVacancy[] => {
  return uiVacancies.map(vacancy => ({
    id: Number(vacancy.id),
    title: vacancy.title,
    company: vacancy.company,
    requirements: vacancy.requiredSkills,
    location: vacancy.location,
    type: "full-time" // Default value since UI Vacancy doesn't have this
  }));
};

// Convert from Career Vacancy format back to UI Vacancy format
const convertToUIVacancy = (
  careerVacancies: Array<CareerVacancy & { matchPercentage?: number, missingSkills?: string[] }>,
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
      requiredSkills: v.requirements || [],
      missingSkills: v.missingSkills || [],
      salary: original?.salary || "Not specified",
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
