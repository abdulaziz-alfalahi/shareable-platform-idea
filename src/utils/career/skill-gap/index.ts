
/**
 * Skill gap analysis entry point
 * Exports all functionality from the skill gap module
 */

// Re-export types
export type { SkillGap, TrainingRecommendation } from './types';
export type { AssessmentResult, AssessmentQuestion } from './assessment-service';

// Re-export core analysis functions
export {
  analyzeSkillGaps,
  getTopSkillRecommendations,
  extractStudentSkills
} from './analysis-service';

// Re-export training-related functions
export {
  enrollInTraining,
  getAllTrainingPrograms,
  searchTrainingPrograms
} from './training-service';

// Re-export job matching functions
export {
  calculateSkillMatch,
  identifyMissingSkills,
  getRecommendedJobs,
  getCareerPathAlignedJobs,
  getDetailedJobMatch
} from './job-matching-service';

// Re-export assessment functions
export {
  analyzeSelfAssessment,
  getAssessmentQuestions,
  submitAssessmentResults
} from './assessment-service';
