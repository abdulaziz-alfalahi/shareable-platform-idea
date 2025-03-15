
/**
 * Service for analyzing assessment results and providing feedback
 */
import { Student } from '@/types/student';
import { notifySuccess } from '@/utils/notification';
import { analyzeSkillGaps } from './analysis-service';
import { AssessmentResult } from './assessment-types';
import { generateRecommendedTraining } from '@/utils/career/trainingRecommendations';

/**
 * Analyze student's self-assessment results and provide feedback
 */
export const analyzeSelfAssessment = (
  student: Student, 
  assessmentResults: Record<string, number>
): AssessmentResult[] => {
  const results: AssessmentResult[] = [];
  const skillGaps = analyzeSkillGaps(student);
  
  // Process each assessed skill
  Object.entries(assessmentResults).forEach(([skillName, score]) => {
    // Find matching skill gap if it exists
    const matchingGap = skillGaps.find(
      gap => gap.skill.toLowerCase() === skillName.toLowerCase()
    );
    
    // Generate feedback based on score
    let feedback = '';
    let recommendedTraining: string[] = [];
    
    if (score < 30) {
      feedback = `Your self-assessment indicates a significant gap in ${skillName}. We recommend focused training in this area.`;
      // If we have gap data, use its training recommendations
      recommendedTraining = matchingGap 
        ? matchingGap.suggestedTraining.map(t => t.title)
        : [`Introductory ${skillName} course`];
    } else if (score < 70) {
      feedback = `You have some knowledge of ${skillName}, but there's room for improvement.`;
      recommendedTraining = matchingGap 
        ? matchingGap.suggestedTraining.map(t => t.title)
        : [`Intermediate ${skillName} workshop`];
    } else {
      feedback = `You demonstrate strong confidence in ${skillName}. Consider advanced training to further enhance this strength.`;
      recommendedTraining = [`Advanced ${skillName} masterclass`];
    }
    
    results.push({
      skillName,
      score,
      feedback,
      recommendedTraining
    });
  });
  
  return results;
};

/**
 * Submit assessment results
 */
export const submitAssessmentResults = async (
  userId: number,
  assessmentName: string,
  results: AssessmentResult[]
): Promise<boolean> => {
  try {
    // In a real app, this would make an API call to save results
    console.log(`Submitting assessment "${assessmentName}" for user ${userId}:`, results);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Show success notification
    notifySuccess({
      title: "Assessment Completed",
      description: `Your ${assessmentName} assessment has been saved.`
    });
    
    return true;
  } catch (error) {
    console.error("Error submitting assessment:", error);
    return false;
  }
};
