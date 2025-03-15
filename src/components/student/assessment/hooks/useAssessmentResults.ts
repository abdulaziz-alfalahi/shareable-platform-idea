
import { Student } from "@/types/student";
import { AssessmentQuestion, AssessmentResult, analyzeSelfAssessment, submitAssessmentResults } from "@/utils/career/skill-gap/assessment-service";

/**
 * Process answers and calculate assessment results
 */
export async function processAssessmentResults(
  student: Student,
  questions: AssessmentQuestion[],
  answers: Record<number, number>,
  assessmentName: string
): Promise<AssessmentResult[]> {
  // Process answers by skill area
  const skillScores: Record<string, number[]> = {};
  
  // Group scores by skill area
  questions.forEach(question => {
    const score = answers[question.id] || 0;
    if (!skillScores[question.skillArea]) {
      skillScores[question.skillArea] = [];
    }
    skillScores[question.skillArea].push(score);
  });
  
  // Calculate average score for each skill area
  const avgSkillScores: Record<string, number> = {};
  Object.entries(skillScores).forEach(([skill, scores]) => {
    const sum = scores.reduce((a, b) => a + b, 0);
    avgSkillScores[skill] = Math.round(sum / scores.length);
  });
  
  // Analyze the results
  const assessmentResults = analyzeSelfAssessment(student, avgSkillScores);
  
  // Submit results to backend (simulated)
  await submitAssessmentResults(student.id, assessmentName, assessmentResults);
  
  return assessmentResults;
}
