
import { getAssessmentQuestions } from "@/utils/career/skill-gap/assessment-service";

/**
 * Helper function to load assessment questions based on assessment name
 */
export function loadAssessmentQuestions(assessmentName: string): ReturnType<typeof getAssessmentQuestions> {
  if (assessmentName === "Skills Self-Assessment") {
    return getAssessmentQuestions([
      "Leadership", 
      "Communication", 
      "Programming", 
      "Data Analysis"
    ]);
  } else if (assessmentName === "Technical Skills Assessment") {
    return getAssessmentQuestions([
      "Programming", 
      "Data Analysis"
    ]);
  }
  
  // Default to empty array if no matching assessment
  return [];
}
