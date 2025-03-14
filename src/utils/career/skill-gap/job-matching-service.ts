
import { Student } from '@/types/student';
import { Vacancy } from '@/utils/career/types';
import { uaeJobMarketTrends } from './mock-data';
import { extractStudentSkills } from './analysis-service';

/**
 * Calculate skill match percentage between student skills and job requirements
 */
export const calculateSkillMatch = (
  studentSkills: string[],
  jobRequirements: string[]
): number => {
  if (!jobRequirements.length) return 0;
  
  let matchCount = 0;
  
  // Count how many job requirements are fulfilled by student skills
  jobRequirements.forEach(requirement => {
    const normalizedRequirement = requirement.toLowerCase();
    
    // Check if any student skill matches or is part of this requirement
    const hasMatchingSkill = studentSkills.some(skill => 
      normalizedRequirement.includes(skill.toLowerCase()) || 
      skill.toLowerCase().includes(normalizedRequirement)
    );
    
    if (hasMatchingSkill) {
      matchCount++;
    }
  });
  
  // Calculate percentage
  return Math.round((matchCount / jobRequirements.length) * 100);
};

/**
 * Identify missing skills based on job requirements
 */
export const identifyMissingSkills = (
  studentSkills: string[],
  jobRequirements: string[]
): string[] => {
  const missingSkills: string[] = [];
  
  jobRequirements.forEach(requirement => {
    const normalizedRequirement = requirement.toLowerCase();
    
    // Check if this requirement is not fulfilled by any student skill
    const isMissingSkill = !studentSkills.some(skill => 
      normalizedRequirement.includes(skill.toLowerCase()) || 
      skill.toLowerCase().includes(normalizedRequirement)
    );
    
    if (isMissingSkill) {
      missingSkills.push(requirement);
    }
  });
  
  return missingSkills;
};

// Define an intermediate type to work with both vacancy types
interface EnhancedVacancy extends Vacancy {
  matchPercentage?: number;
  missingSkills?: string[];
}

/**
 * Enhanced job recommendations based on skill matching
 */
export const getRecommendedJobs = (
  student: Student,
  vacancies: Vacancy[]
): EnhancedVacancy[] => {
  const studentSkills = extractStudentSkills(student);
  
  // Calculate match score for each job
  const scoredJobs = vacancies.map(job => {
    // For each job, get the list of required skills
    const requirements = job.requirements || [];
    
    // Calculate match percentage
    const matchPercentage = calculateSkillMatch(studentSkills, requirements);
    
    // Get missing skills
    const missingSkills = identifyMissingSkills(studentSkills, requirements);
    
    return {
      ...job,
      matchPercentage,
      missingSkills
    };
  });
  
  // Sort by match percentage (highest first)
  return scoredJobs.sort((a, b) => 
    (b.matchPercentage || 0) - (a.matchPercentage || 0)
  );
};

/**
 * Returns job recommendations with career path insights
 * This is more future-focused, suggesting jobs that align with student career goals
 */
export const getCareerPathAlignedJobs = (
  student: Student,
  vacancies: Vacancy[]
): EnhancedVacancy[] => {
  // Get student's career path
  const careerPath = student.careerPath?.toLowerCase();
  
  if (!careerPath) {
    return getRecommendedJobs(student, vacancies);
  }
  
  const studentSkills = extractStudentSkills(student);
  
  // Find market trends related to student's career path
  const relevantTrends = uaeJobMarketTrends.filter(trend => 
    trend.sector.toLowerCase().includes(careerPath)
  );
  
  // Calculate job alignment scores
  const alignedJobs = vacancies.map(job => {
    // Basic skill match
    const requirements = job.requirements || [];
    
    const matchPercentage = calculateSkillMatch(studentSkills, requirements);
    const missingSkills = identifyMissingSkills(studentSkills, requirements);
    
    // Calculate career path alignment (bonus points)
    const jobTitle = job.title.toLowerCase();
    const careerAlignmentBonus = relevantTrends.some(trend => 
      jobTitle.includes(trend.skill.toLowerCase()) || 
      (job.company && job.company.toLowerCase().includes(trend.sector.toLowerCase()))
    ) ? 15 : 0;
    
    // Calculate final score with bonus
    const finalMatchScore = Math.min(matchPercentage + careerAlignmentBonus, 100);
    
    return {
      ...job,
      matchPercentage: finalMatchScore,
      missingSkills
    };
  });
  
  // Sort by match percentage (highest first)
  return alignedJobs.sort((a, b) => 
    (b.matchPercentage || 0) - (a.matchPercentage || 0)
  );
};
