
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
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, AlertTriangle } from "lucide-react";
import { AssessmentResult } from "@/utils/career/skill-gap/assessment-service";

interface ResultsStepProps {
  assessmentName: string;
  results: AssessmentResult[];
  onComplete: () => void;
}

const ResultsStep: React.FC<ResultsStepProps> = ({
  assessmentName,
  results,
  onComplete,
}) => {
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

export default ResultsStep;
