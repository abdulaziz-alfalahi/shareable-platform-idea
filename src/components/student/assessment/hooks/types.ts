
import { Student } from "@/types/student";
import { AssessmentQuestion, AssessmentResult } from "@/utils/career/skill-gap/assessment-types";

export type AssessmentStep = "intro" | "questions" | "results";

export interface AssessmentState {
  currentStep: AssessmentStep;
  currentQuestionIndex: number;
  questions: AssessmentQuestion[];
  answers: Record<number, number>;
  results: AssessmentResult[];
  isSubmitting: boolean;
}

export interface UseAssessmentReturn extends AssessmentState {
  handleStartAssessment: () => void;
  handleAnswerSelect: (questionId: number, score: number) => void;
  handleNextQuestion: () => void;
  handlePreviousQuestion: () => void;
}
