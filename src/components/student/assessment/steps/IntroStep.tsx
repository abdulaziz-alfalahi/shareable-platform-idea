
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface IntroStepProps {
  assessmentName: string;
  questionsCount: number;
  onCancel: () => void;
  onStart: () => void;
}

const IntroStep: React.FC<IntroStepProps> = ({
  assessmentName,
  questionsCount,
  onCancel,
  onStart,
}) => {
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
            This assessment contains {questionsCount} questions about your skills and experiences.
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
            This assessment will take approximately {Math.ceil(questionsCount * 1.5)} minutes to complete.
          </p>
        </div>
      </CardContent>
      <CardFooter className="bg-muted/10 border-t border-emirati-sandstone/20 justify-between">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button 
          onClick={onStart}
          className="bg-emirati-oasisGreen hover:bg-emirati-oasisGreen/90"
        >
          Begin Assessment
        </Button>
      </CardFooter>
    </Card>
  );
};

export default IntroStep;
