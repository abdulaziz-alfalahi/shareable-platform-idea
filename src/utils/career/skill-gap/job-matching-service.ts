
import { Student } from '@/types/student';
import { Vacancy, JobMatchDetails, EmploymentPreference } from '@/utils/career/types';
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

/**
 * Identify matched skills based on job requirements
 */
export const identifyMatchedSkills = (
  studentSkills: string[],
  jobRequirements: string[]
): string[] => {
  const matchedSkills: string[] = [];
  
  jobRequirements.forEach(requirement => {
    const normalizedRequirement = requirement.toLowerCase();
    
    // Find the student skills that match this requirement
    studentSkills.forEach(skill => {
      if (normalizedRequirement.includes(skill.toLowerCase()) || 
          skill.toLowerCase().includes(normalizedRequirement)) {
        if (!matchedSkills.includes(requirement)) {
          matchedSkills.push(requirement);
        }
      }
    });
  });
  
  return matchedSkills;
};

/**
 * Calculate cultural fit score based on UAE values and job characteristics
 */
export const calculateCulturalFit = (
  student: Student,
  vacancy: Vacancy
): number => {
  // Base cultural fit score
  let culturalFitScore = 50;
  
  // Check if student has cultural achievement stamps
  const culturalAchievements = student.passportStamps.filter(
    stamp => ["Heritage", "Hospitality", "Craftsmanship", "Navigation", "Employment"].includes(stamp.category)
  );
  
  // Add points for cultural achievements
  culturalFitScore += culturalAchievements.length * 5;
  
  // Check if job is in UAE government sector 
  // (simplified logic, in real app this would be more sophisticated)
  if (vacancy.company.toLowerCase().includes('government') || 
      vacancy.company.toLowerCase().includes('ministry') ||
      vacancy.company.toLowerCase().includes('authority')) {
    culturalFitScore += 15;
  }
  
  // Check for location preferences (UAE cities get bonus)
  const uaeCities = ['dubai', 'abu dhabi', 'sharjah', 'ajman', 'ras al khaimah', 'fujairah', 'umm al quwain'];
  if (uaeCities.some(city => vacancy.location.toLowerCase().includes(city))) {
    culturalFitScore += 10;
  }
  
  // Cap the score at 100
  return Math.min(culturalFitScore, 100);
};

// Define an intermediate type to work with both vacancy types
interface EnhancedVacancy extends Vacancy {
  matchPercentage?: number;
  matchedSkills?: string[];
  missingSkills?: string[];
  culturalFit?: number;
  careerPathAlignment?: number;
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
    
    // Get missing and matched skills
    const missingSkills = identifyMissingSkills(studentSkills, requirements);
    const matchedSkills = identifyMatchedSkills(studentSkills, requirements);
    
    // Calculate cultural fit
    const culturalFit = calculateCulturalFit(student, job);
    
    // Calculate career path alignment
    const careerPath = student.careerPath?.toLowerCase() || '';
    const careerPathAlignment = job.title.toLowerCase().includes(careerPath) || 
                               job.company.toLowerCase().includes(careerPath) ? 
                               80 : 50;
    
    return {
      ...job,
      matchPercentage,
      matchedSkills,
      missingSkills,
      culturalFit,
      careerPathAlignment
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
    const matchedSkills = identifyMatchedSkills(studentSkills, requirements);
    
    // Calculate cultural fit
    const culturalFit = calculateCulturalFit(student, job);
    
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
      matchedSkills,
      missingSkills,
      culturalFit,
      careerPathAlignment: relevantTrends.length > 0 ? 85 : 60
    };
  });
  
  // Sort by match percentage (highest first)
  return alignedJobs.sort((a, b) => 
    (b.matchPercentage || 0) - (a.matchPercentage || 0)
  );
};

/**
 * Get detailed match information for a specific vacancy
 */
export const getDetailedJobMatch = (
  student: Student,
  vacancy: Vacancy
): JobMatchDetails => {
  const studentSkills = extractStudentSkills(student);
  const requirements = vacancy.requirements || [];
  
  const matchPercentage = calculateSkillMatch(studentSkills, requirements);
  const missingSkills = identifyMissingSkills(studentSkills, requirements);
  const matchedSkills = identifyMatchedSkills(studentSkills, requirements);
  
  // Calculate career path alignment
  const careerPath = student.careerPath?.toLowerCase() || '';
  const careerPathAlignment = vacancy.title.toLowerCase().includes(careerPath) || 
                             vacancy.company.toLowerCase().includes(careerPath) ? 
                             80 : 50;
  
  // Calculate cultural fit
  const culturalFit = calculateCulturalFit(student, vacancy);
  
  return {
    matchPercentage,
    matchedSkills,
    missingSkills,
    careerPathAlignment,
    culturalFit
  };
};
