
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle, AlertCircle, Info } from "lucide-react";
import { Student } from "@/types/student";
import { calculateCulturalFitScore } from "@/utils/career/skill-gap/ai-recommendations";

interface CulturalFitAssessmentProps {
  student: Student;
  employer: {
    name: string;
    industry: string;
    values: string[];
    workStyle: 'remote' | 'hybrid' | 'in-office';
  };
}

const CulturalFitAssessment: React.FC<CulturalFitAssessmentProps> = ({
  student,
  employer
}) => {
  const [culturalFit, setCulturalFit] = useState(() => 
    calculateCulturalFitScore(
      student, 
      employer.values, 
      employer.workStyle,
      employer.industry
    )
  );

  // Get the color based on the score
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-amber-600";
    return "text-red-600";
  };

  // Get the indicator icon based on the score
  const getScoreIcon = (score: number) => {
    if (score >= 80) return <CheckCircle className="h-5 w-5 text-green-600" />;
    if (score >= 60) return <AlertCircle className="h-5 w-5 text-amber-600" />;
    return <XCircle className="h-5 w-5 text-red-600" />;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Info className="h-5 w-5 mr-2 text-emirati-oasisGreen" />
          Cultural Fit Assessment
        </CardTitle>
        <CardDescription>
          Analyze your cultural fit with {employer.name} in the {employer.industry} industry
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall fit score */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full border-8 border-emirati-oasisGreen/20 mb-2">
            <span className={`text-2xl font-bold ${getScoreColor(culturalFit.overallScore)}`}>
              {culturalFit.overallScore}%
            </span>
          </div>
          <h3 className="font-medium">Overall Cultural Fit</h3>
        </div>

        {/* Detailed scores */}
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                {getScoreIcon(culturalFit.valueFit)}
                <span className="ml-2 text-sm font-medium">Value Alignment</span>
              </div>
              <span className={`text-sm font-medium ${getScoreColor(culturalFit.valueFit)}`}>
                {culturalFit.valueFit}%
              </span>
            </div>
            <Progress 
              value={culturalFit.valueFit} 
              className="h-2" 
              indicatorStyle={{ 
                backgroundColor: culturalFit.valueFit >= 80 ? 'rgb(22, 163, 74)' : 
                                culturalFit.valueFit >= 60 ? 'rgb(217, 119, 6)' : 
                                'rgb(220, 38, 38)' 
              }}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                {getScoreIcon(culturalFit.industryFit)}
                <span className="ml-2 text-sm font-medium">Industry Alignment</span>
              </div>
              <span className={`text-sm font-medium ${getScoreColor(culturalFit.industryFit)}`}>
                {culturalFit.industryFit}%
              </span>
            </div>
            <Progress 
              value={culturalFit.industryFit} 
              className="h-2" 
              indicatorStyle={{ 
                backgroundColor: culturalFit.industryFit >= 80 ? 'rgb(22, 163, 74)' : 
                                culturalFit.industryFit >= 60 ? 'rgb(217, 119, 6)' : 
                                'rgb(220, 38, 38)' 
              }}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                {getScoreIcon(culturalFit.workStyleFit)}
                <span className="ml-2 text-sm font-medium">Work Style Compatibility</span>
              </div>
              <span className={`text-sm font-medium ${getScoreColor(culturalFit.workStyleFit)}`}>
                {culturalFit.workStyleFit}%
              </span>
            </div>
            <Progress 
              value={culturalFit.workStyleFit} 
              className="h-2" 
              indicatorStyle={{ 
                backgroundColor: culturalFit.workStyleFit >= 80 ? 'rgb(22, 163, 74)' : 
                                culturalFit.workStyleFit >= 60 ? 'rgb(217, 119, 6)' : 
                                'rgb(220, 38, 38)' 
              }}
            />
          </div>
        </div>

        {/* Improvement Areas */}
        {culturalFit.improvementAreas.length > 0 && (
          <div className="bg-amber-50 border border-amber-100 rounded-md p-3">
            <h4 className="text-sm font-medium text-amber-800 mb-2">Areas for Improvement</h4>
            <ul className="space-y-1">
              {culturalFit.improvementAreas.map((area, index) => (
                <li key={index} className="text-xs text-amber-700 flex items-start">
                  <AlertCircle className="h-3 w-3 mr-1 mt-0.5 text-amber-600" />
                  {area}
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Employer Values */}
        <div className="bg-slate-50 rounded-md p-3">
          <h4 className="text-sm font-medium mb-2">{employer.name} Values</h4>
          <div className="flex flex-wrap gap-2">
            {employer.values.map((value, index) => (
              <span key={index} className="text-xs bg-white px-2 py-1 rounded border">
                {value}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-emirati-sandBeige/10 border-t">
        <p className="text-xs text-muted-foreground">
          This assessment is based on your profile information and cultural indicators. Complete more cultural assessments to improve accuracy.
        </p>
      </CardFooter>
    </Card>
  );
};

export default CulturalFitAssessment;
