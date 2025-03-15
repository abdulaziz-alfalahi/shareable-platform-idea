
import { Student } from '@/types/student';
import { SkillGap } from './types';
import { analyzeSkillGaps } from './analysis-service';
import { TrainingRecommendation, getAllTrainingPrograms } from './training-service';

/**
 * Generate AI-powered training recommendations based on skill gaps and job market trends
 */
export const generateAIRecommendations = (
  student: Student, 
  targetJobTitle?: string
): { 
  recommendedSkills: SkillGap[], 
  recommendedPrograms: TrainingRecommendation[],
  recommendationReason: string 
}[] => {
  // Get the student's skill gaps
  const skillGaps = analyzeSkillGaps(student);
  const allPrograms = getAllTrainingPrograms();
  const recommendations: { 
    recommendedSkills: SkillGap[], 
    recommendedPrograms: TrainingRecommendation[],
    recommendationReason: string 
  }[] = [];

  // Group skill gaps by domain/category for focused learning paths
  const skillDomains: Record<string, SkillGap[]> = {
    'technical': [],
    'management': [],
    'communication': [],
    'industry-specific': []
  };

  // Categorize skills (simplified version - in production this would use ML)
  skillGaps.forEach(gap => {
    const skill = gap.skill.toLowerCase();
    if (skill.includes('programming') || skill.includes('data') || skill.includes('software') || skill.includes('design')) {
      skillDomains['technical'].push(gap);
    } else if (skill.includes('leadership') || skill.includes('management') || skill.includes('strategy')) {
      skillDomains['management'].push(gap);
    } else if (skill.includes('communication') || skill.includes('presentation') || skill.includes('writing')) {
      skillDomains['communication'].push(gap);
    } else {
      skillDomains['industry-specific'].push(gap);
    }
  });

  // Generate learning paths based on skill domains
  Object.entries(skillDomains).forEach(([domain, domainSkills]) => {
    if (domainSkills.length === 0) return;
    
    // Get top 3 skills per domain
    const topSkills = domainSkills.slice(0, 3);
    
    // Find matching training programs
    const matchingPrograms = allPrograms.filter(program => 
      topSkills.some(skill => 
        program.title.toLowerCase().includes(skill.skill.toLowerCase()) ||
        (program.description && program.description.toLowerCase().includes(skill.skill.toLowerCase()))
      )
    ).slice(0, 3);
    
    if (matchingPrograms.length > 0) {
      recommendations.push({
        recommendedSkills: topSkills,
        recommendedPrograms: matchingPrograms,
        recommendationReason: `These ${domain} skills are highly relevant to ${targetJobTitle || 'your career goals'} and current UAE job market trends.`
      });
    }
  });

  return recommendations;
};

/**
 * Generate personalized career transition recommendations
 */
export const generateCareerTransitionRecommendations = (
  student: Student,
  desiredIndustry: string
): {
  currentPath: string,
  targetPath: string,
  requiredSkills: string[],
  estimatedTimeMonths: number,
  recommendedTraining: TrainingRecommendation[]
} => {
  // This is a simplified version - in production this would use ML models
  // and real labor market data to generate recommendations
  
  const currentPath = student.careerPath || 'Unknown';
  const studentSkillGaps = analyzeSkillGaps(student);
  const allPrograms = getAllTrainingPrograms();
  
  // Randomly select 3-5 skills that would be needed for transition
  const requiredSkills = studentSkillGaps
    .sort(() => 0.5 - Math.random())
    .slice(0, 3 + Math.floor(Math.random() * 3))
    .map(gap => gap.skill);
  
  // Find matching training programs
  const recommendedTraining = allPrograms.filter(program => 
    requiredSkills.some(skill => 
      program.title.toLowerCase().includes(skill.toLowerCase()) ||
      (program.description && program.description.toLowerCase().includes(skill.toLowerCase()))
    )
  ).slice(0, 3);
  
  return {
    currentPath,
    targetPath: desiredIndustry,
    requiredSkills,
    estimatedTimeMonths: 3 + Math.floor(Math.random() * 9), // 3-12 months
    recommendedTraining
  };
};

/**
 * Calculate the cultural fit score between a student and an employer
 */
export const calculateCulturalFitScore = (
  student: Student,
  employerValues: string[],
  employerWorkStyle: 'remote' | 'hybrid' | 'in-office',
  employerIndustry: string
): {
  overallScore: number,
  valueFit: number,
  industryFit: number,
  workStyleFit: number,
  improvementAreas: string[]
} => {
  // Extract cultural indicators from student profile
  // In a real implementation, this would come from assessments
  const studentValues = student.passportStamps
    .filter(stamp => stamp.category === 'Cultural')
    .map(stamp => stamp.title);
    
  // Calculate value alignment (30% of overall score)
  const sharedValues = employerValues.filter(value => 
    studentValues.some(sv => sv.toLowerCase().includes(value.toLowerCase()))
  );
  const valueFit = Math.min(100, Math.round((sharedValues.length / employerValues.length) * 100));
  
  // Calculate industry alignment (40% of overall score)
  const industryFit = student.careerPath && 
    student.careerPath.toLowerCase().includes(employerIndustry.toLowerCase()) ? 
    90 : 60;
  
  // Work style fit (30% of overall score)
  // In a real implementation, this would come from preferences stored in the profile
  const workStylePreference = 'hybrid'; // placeholder - would be from student profile
  const workStyleFit = workStylePreference === employerWorkStyle ? 100 : 
    (workStylePreference === 'hybrid' || employerWorkStyle === 'hybrid') ? 70 : 40;
  
  // Calculate overall score
  const overallScore = Math.round(
    (valueFit * 0.3) + (industryFit * 0.4) + (workStyleFit * 0.3)
  );
  
  // Generate improvement areas
  const improvementAreas: string[] = [];
  if (valueFit < 70) {
    improvementAreas.push(`Align more with ${employerIndustry} industry values`);
  }
  if (industryFit < 70) {
    improvementAreas.push(`Gain more experience in the ${employerIndustry} industry`);
  }
  if (workStyleFit < 70) {
    improvementAreas.push(`Adapt to ${employerWorkStyle} work environments`);
  }
  
  return {
    overallScore,
    valueFit,
    industryFit,
    workStyleFit,
    improvementAreas
  };
};
