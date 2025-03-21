
import { Student } from '@/types/student';
import { SkillGap } from './types';
import { uaeJobMarketTrends, trainingRecommendations } from './mock-data';

/**
 * Extract student skills from achievements and passport stamps
 */
export const extractStudentSkills = (student: Student): string[] => {
  const skillsFromAchievements = student.achievements || [];
  
  // Extract skills from passport stamps (those with 'Skills' category)
  const skillsFromStamps = student.passportStamps
    .filter(stamp => stamp.category === 'Skills')
    .map(stamp => stamp.title);
  
  // Hard-coded skills for demonstration purposes
  // In a real app, these would come from a more sophisticated assessment
  const additionalSkills = [
    "Leadership", 
    "Strategic Planning", 
    "Project Management",
    "Communication",
    "Problem Solving"
  ];
  
  // Combine and deduplicate skills
  return Array.from(new Set([
    ...skillsFromAchievements.map(s => s), 
    ...skillsFromStamps,
    ...additionalSkills
  ]));
};

/**
 * Analyze skill gaps based on market trends and student profile
 */
export const analyzeSkillGaps = (student: Student): SkillGap[] => {
  const studentSkills = extractStudentSkills(student);
  const skillGaps: SkillGap[] = [];
  
  // Find skills in high demand that the student doesn't have
  for (const trend of uaeJobMarketTrends) {
    // Check if student has this skill already
    const hasSkill = studentSkills.some(skill => 
      skill.toLowerCase().includes(trend.skill.toLowerCase()) || 
      trend.skill.toLowerCase().includes(skill.toLowerCase())
    );
    
    if (!hasSkill) {
      // Calculate relevance based on student's career path and the skill's sector
      // This is a simplified calculation - in a real app, this would be more sophisticated
      let relevanceScore = trend.growth;
      
      // If student has a career path that matches the sector, increase relevance
      if (student.careerPath && trend.sector.toLowerCase().includes(student.careerPath.toLowerCase())) {
        relevanceScore += 20;
      }
      
      // Cap at 100
      relevanceScore = Math.min(relevanceScore, 100);
      
      // Add to skill gaps if relevance is above a threshold
      if (relevanceScore > 15) {
        skillGaps.push({
          skill: trend.skill,
          demandLevel: trend.priority as 'high' | 'medium' | 'low',
          relevanceScore,
          suggestedTraining: trainingRecommendations[trend.skill] || []
        });
      }
    }
  }
  
  // Sort skill gaps by relevance (highest first)
  return skillGaps.sort((a, b) => b.relevanceScore - a.relevanceScore);
};

/**
 * Get top recommended skills for a student
 */
export const getTopSkillRecommendations = (student: Student, limit: number = 3): SkillGap[] => {
  const gaps = analyzeSkillGaps(student);
  return gaps.slice(0, limit);
};

/**
 * Calculate the overall skill market fit percentage
 */
export const calculateSkillMarketFit = (student: Student): number => {
  const studentSkills = extractStudentSkills(student);
  const skillGaps = analyzeSkillGaps(student);
  
  // Simple calculation: (existing skills) / (existing skills + gaps) * 100
  return Math.min(100, Math.round((studentSkills.length / (studentSkills.length + skillGaps.length)) * 100));
};
