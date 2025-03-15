
import { useState, useEffect } from "react";
import { Student } from "@/types/student";
import { AssessmentStep, UseAssessmentReturn } from "./types";
import { loadAssessmentQuestions } from "./useAssessmentQuestions";
import { processAssessmentResults } from "./useAssessmentResults";

export function useAssessment(assessmentName: string, student: Student): UseAssessmentReturn {
  const [currentStep, setCurrentStep] = useState<AssessmentStep>("intro");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]); 
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [results, setResults] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Load questions when component mounts
  useEffect(() => {
    setQuestions(loadAssessmentQuestions(assessmentName));
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
      const assessmentResults = await processAssessmentResults(
        student,
        questions,
        answers,
        assessmentName
      );
      
      setResults(assessmentResults);
      
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
