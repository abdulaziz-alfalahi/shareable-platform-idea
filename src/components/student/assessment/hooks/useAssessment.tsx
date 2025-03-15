
import { useState, useEffect } from "react";
import { Student } from "@/types/student";
import {
  getAssessmentQuestions,
  analyzeSelfAssessment,
  submitAssessmentResults,
  AssessmentQuestion,
  AssessmentResult
} from "@/utils/career/skill-gap/assessment-service";

export function useAssessment(assessmentName: string, student: Student) {
  const [currentStep, setCurrentStep] = useState<"intro" | "questions" | "results">("intro");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<AssessmentQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [results, setResults] = useState<AssessmentResult[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Load questions when component mounts
  useEffect(() => {
    if (assessmentName === "Skills Self-Assessment") {
      setQuestions(getAssessmentQuestions([
        "Leadership", 
        "Communication", 
        "Programming", 
        "Data Analysis"
      ]));
    } else if (assessmentName === "Technical Skills Assessment") {
      setQuestions(getAssessmentQuestions([
        "Programming", 
        "Data Analysis"
      ]));
    }
  }, [assessmentName]);
  
  const handleStartAssessment = () => {
    setCurrentStep("questions");
  };
  
  const handleAnswerSelect = (questionId: number, score: number) => {
    setAnswers({
      ...answers,
      [questionId]: score
    });
  };
  
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      finishAssessment();
    }
  };
  
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  const finishAssessment = async () => {
    setIsSubmitting(true);
    
    try {
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
      setResults(assessmentResults);
      
      // Submit results to backend (simulated)
      await submitAssessmentResults(student.id, assessmentName, assessmentResults);
      
      // Show results
      setCurrentStep("results");
    } catch (error) {
      console.error("Error processing assessment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return {
    currentStep,
    currentQuestionIndex,
    questions,
    answers,
    results,
    isSubmitting,
    handleStartAssessment,
    handleAnswerSelect,
    handleNextQuestion,
    handlePreviousQuestion
  };
}
