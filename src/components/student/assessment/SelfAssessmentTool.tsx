
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle2, AlertTriangle } from "lucide-react";
import { 
  getAssessmentQuestions, 
  analyzeSelfAssessment, 
  submitAssessmentResults,
  AssessmentQuestion,
  AssessmentResult
} from "@/utils/career/skill-gap/assessment-service";
import { studentMockData } from "@/data/studentMockData";

interface SelfAssessmentToolProps {
  assessmentName: string;
  onComplete: () => void;
}

const SelfAssessmentTool: React.FC<SelfAssessmentToolProps> = ({ 
  assessmentName,
  onComplete
}) => {
  // For demo purposes, use the first student from mock data
  const student = studentMockData[0];
  
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
  
  // Introduction step
  if (currentStep === "intro") {
    return (
      <Card className="border border-emirati-sandstone/30">
        <CardHeader className="bg-emirati-oasisGreen/5 border-b border-emirati-sandstone/20">
          <CardTitle>{assessmentName}</CardTitle>
          <CardDescription>
            This assessment will help identify your strengths and areas for improvement
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <p>
              This assessment contains {questions.length} questions about your skills and experiences.
              The results will help you understand your current strengths and identify areas
              for professional development.
            </p>
            
            <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
              <h3 className="font-medium text-blue-800 mb-2">How to get the most accurate results:</h3>
              <ul className="list-disc pl-5 text-blue-700 space-y-1">
                <li>Answer honestly based on your current abilities, not what you aspire to.</li>
                <li>Consider specific examples from your experience when rating yourself.</li>
                <li>Take your time to reflect on each question.</li>
              </ul>
            </div>
            
            <p className="text-sm text-muted-foreground">
              This assessment will take approximately {Math.ceil(questions.length * 1.5)} minutes to complete.
            </p>
          </div>
        </CardContent>
        <CardFooter className="bg-muted/10 border-t border-emirati-sandstone/20 justify-between">
          <Button variant="outline" onClick={onComplete}>
            Cancel
          </Button>
          <Button 
            onClick={handleStartAssessment}
            className="bg-emirati-oasisGreen hover:bg-emirati-oasisGreen/90"
          >
            Begin Assessment
          </Button>
        </CardFooter>
      </Card>
    );
  }
  
  // Questions step
  if (currentStep === "questions") {
    const currentQuestion = questions[currentQuestionIndex];
    const progress = Math.round(((currentQuestionIndex + 1) / questions.length) * 100);
    
    return (
      <Card className="border border-emirati-sandstone/30">
        <CardHeader className="bg-emirati-oasisGreen/5 border-b border-emirati-sandstone/20">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">{assessmentName}</CardTitle>
            <span className="text-sm text-muted-foreground">
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
          </div>
          <Progress 
            value={progress} 
            className="h-2 mt-2"
            indicatorStyle={{ backgroundColor: "#16a34a" }}
          />
        </CardHeader>
        <CardContent className="pt-6">
          {currentQuestion && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium">{currentQuestion.question}</h3>
              
              <RadioGroup
                value={answers[currentQuestion.id]?.toString()}
                onValueChange={(value) => handleAnswerSelect(currentQuestion.id, parseInt(value))}
                className="space-y-3"
              >
                {currentQuestion.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem 
                      value={option.score.toString()} 
                      id={`option-${index}`} 
                    />
                    <Label htmlFor={`option-${index}`} className="cursor-pointer">
                      {option.text}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}
        </CardContent>
        <CardFooter className="bg-muted/10 border-t border-emirati-sandstone/20 justify-between">
          <Button 
            variant="outline" 
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </Button>
          <Button 
            onClick={handleNextQuestion}
            disabled={!answers[currentQuestion?.id]}
            className="bg-emirati-oasisGreen hover:bg-emirati-oasisGreen/90"
          >
            {currentQuestionIndex < questions.length - 1 ? "Next" : "Finish"}
          </Button>
        </CardFooter>
      </Card>
    );
  }
  
  // Results step
  return (
    <Card className="border border-emirati-sandstone/30">
      <CardHeader className="bg-emirati-oasisGreen/5 border-b border-emirati-sandstone/20">
        <CardTitle>{assessmentName} Results</CardTitle>
        <CardDescription>
          Your assessment has been completed successfully
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div className="bg-green-50 p-4 rounded-md border border-green-100 flex items-start">
            <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
            <p className="text-green-800">
              Thank you for completing the assessment. Your results have been analyzed and 
              will help guide your professional development journey.
            </p>
          </div>
          
          <h3 className="font-medium text-lg">Skill Assessment Summary</h3>
          
          <div className="space-y-4">
            {results.map((result, index) => (
              <div key={index} className="border rounded-md overflow-hidden">
                <div className="bg-muted/20 p-3 border-b flex justify-between items-center">
                  <h4 className="font-medium">{result.skillName}</h4>
                  <div className="flex items-center">
                    <span className="text-sm mr-2">Proficiency:</span>
                    <span 
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        result.score >= 70 ? "bg-green-100 text-green-800" : 
                        result.score >= 40 ? "bg-yellow-100 text-yellow-800" : 
                        "bg-red-100 text-red-800"
                      }`}
                    >
                      {result.score >= 70 ? "Advanced" : 
                       result.score >= 40 ? "Intermediate" : 
                       "Beginner"}
                    </span>
                  </div>
                </div>
                <div className="p-3 space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Score:</span>
                      <span>{result.score}%</span>
                    </div>
                    <Progress 
                      value={result.score} 
                      className="h-2"
                      indicatorStyle={{ 
                        backgroundColor: result.score >= 70 ? "#16a34a" : 
                                       result.score >= 40 ? "#ca8a04" : 
                                       "#dc2626" 
                      }}
                    />
                  </div>
                  
                  <p className="text-sm">{result.feedback}</p>
                  
                  {result.recommendedTraining.length > 0 && (
                    <div>
                      <h5 className="text-sm font-medium mb-1">Recommended Training:</h5>
                      <ul className="text-sm space-y-1">
                        {result.recommendedTraining.map((training, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emirati-oasisGreen mt-1.5 mr-2"></span>
                            {training}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {results.some(r => r.score < 40) && (
            <div className="bg-yellow-50 p-4 rounded-md border border-yellow-100 flex items-start">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 mr-2 flex-shrink-0" />
              <div className="text-yellow-800">
                <p className="font-medium">Areas that need attention</p>
                <p className="text-sm mt-1">
                  Consider focusing on skills with lower scores first. These represent your biggest opportunities for growth.
                </p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="bg-muted/10 border-t border-emirati-sandstone/20 justify-end">
        <Button 
          onClick={onComplete}
          className="bg-emirati-oasisGreen hover:bg-emirati-oasisGreen/90"
        >
          Return to Dashboard
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SelfAssessmentTool;
