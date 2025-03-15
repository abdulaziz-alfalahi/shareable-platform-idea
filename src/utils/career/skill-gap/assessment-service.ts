
/**
 * Main entry point for assessment related functionality
 * Re-exports from more focused assessment service files
 */

// Re-export types
export type { AssessmentResult, AssessmentQuestion } from './assessment-types';

// Re-export functions from assessment questions
export { getAssessmentQuestions } from './assessment-questions';

// Re-export functions from assessment results
export { 
  analyzeSelfAssessment,
  submitAssessmentResults
} from './assessment-results';
