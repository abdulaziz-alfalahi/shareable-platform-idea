
import React from "react";
import { studentData } from "@/data/studentMockData";
import IntroStep from "./steps/IntroStep";
import QuestionsStep from "./steps/QuestionsStep";
import ResultsStep from "./steps/ResultsStep";
import { useAssessment } from "./hooks/useAssessment";

interface SelfAssessmentToolProps {
  assessmentName: string;
  onComplete: () => void;
}

const SelfAssessmentTool: React.FC<SelfAssessmentToolProps> = ({ 
  assessmentName,
  onComplete
}) => {
  // For demo purposes, use the student data from mock data
  const student = studentData;
  
  const {
    currentStep,
    currentQuestionIndex,
    questions,
    answers,
    results,
    handleStartAssessment,
    handleAnswerSelect,
    handleNextQuestion,
    handlePreviousQuestion
  } = useAssessment(assessmentName, student);
  
  // Introduction step
  if (currentStep === "intro") {
    return (
      <IntroStep
        assessmentName={assessmentName}
        questionsCount={questions.length}
        onCancel={onComplete}
        onStart={handleStartAssessment}
      />
    );
  }
  
  // Questions step
  if (currentStep === "questions") {
    return (
      <QuestionsStep
        assessmentName={assessmentName}
        questions={questions}
        currentQuestionIndex={currentQuestionIndex}
        answers={answers}
        onAnswerSelect={handleAnswerSelect}
        onPrevious={handlePreviousQuestion}
        onNext={handleNextQuestion}
      />
    );
  }
  
  // Results step
  return (
    <ResultsStep
      assessmentName={assessmentName}
      results={results}
      onComplete={onComplete}
    />
  );
};

export default SelfAssessmentTool;
