
import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { AssessmentQuestion } from "@/utils/career/skill-gap/assessment-service";

interface QuestionsStepProps {
  assessmentName: string;
  questions: AssessmentQuestion[];
  currentQuestionIndex: number;
  answers: Record<number, number>;
  onAnswerSelect: (questionId: number, score: number) => void;
  onPrevious: () => void;
  onNext: () => void;
}

const QuestionsStep: React.FC<QuestionsStepProps> = ({
  assessmentName,
  questions,
  currentQuestionIndex,
  answers,
  onAnswerSelect,
  onPrevious,
  onNext,
}) => {
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
              onValueChange={(value) => onAnswerSelect(currentQuestion.id, parseInt(value))}
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
          onClick={onPrevious}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </Button>
        <Button 
          onClick={onNext}
          disabled={!answers[currentQuestion?.id]}
          className="bg-emirati-oasisGreen hover:bg-emirati-oasisGreen/90"
        >
          {currentQuestionIndex < questions.length - 1 ? "Next" : "Finish"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QuestionsStep;
