
import React from "react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BarChart2, TrendingUp, PieChart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SkillGap } from "@/utils/career/skill-gap";
import { getDemandLevelColor, getSkillRelevanceColor } from "./utils";

interface SkillGapVisualizationProps {
  skillGaps: SkillGap[];
  studentSkills: string[];
  className?: string;
}

const SkillGapVisualization: React.FC<SkillGapVisualizationProps> = ({
  skillGaps,
  studentSkills,
  className
}) => {
  // Calculate the overall skill match percentage
  const marketDemandScore = skillGaps.length > 0 
    ? Math.min(100, Math.round((studentSkills.length / (studentSkills.length + skillGaps.length)) * 100))
    : 100;

  // Categorize skill gaps by demand level
  const highDemandGaps = skillGaps.filter(gap => gap.demandLevel === 'high');
  const mediumDemandGaps = skillGaps.filter(gap => gap.demandLevel === 'medium');
  const lowDemandGaps = skillGaps.filter(gap => gap.demandLevel === 'low');
  
  return (
    <Card className={className}>
      <CardHeader className="border-b pb-3">
        <CardTitle className="text-lg font-semibold flex items-center text-emirati-deepBlue">
          <PieChart className="mr-2 h-5 w-5 text-emirati-oasisGreen" /> 
          Skills Market Fit Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-5 space-y-6">
        {/* Overall market readiness score */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Overall Market Readiness</span>
            <span className="text-sm font-medium">{marketDemandScore}%</span>
          </div>
          <Progress 
            value={marketDemandScore} 
            className="h-2.5" 
            indicatorStyle={{ 
              backgroundColor: marketDemandScore > 75 
                ? 'var(--emirati-oasisGreen)' 
                : marketDemandScore > 50 
                  ? 'var(--emirati-desertGold)' 
                  : 'var(--emirati-camelBrown)' 
            }}
          />
          <p className="text-xs text-muted-foreground">
            Based on UAE labor market demand analysis compared to your current skills
          </p>
        </div>

        {/* Skill gap breakdown */}
        <div>
          <h3 className="text-sm font-medium mb-3 flex items-center">
            <BarChart2 className="mr-2 h-4 w-4 text-emirati-deepBlue/70" />
            Skill Gap Breakdown
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* High demand skills card */}
            <div className="bg-red-50 border border-red-100 rounded-md p-3">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-red-800">High Demand</span>
                <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
                  {highDemandGaps.length}
                </Badge>
              </div>
              {highDemandGaps.length > 0 ? (
                <ul className="space-y-1">
                  {highDemandGaps.slice(0, 3).map((gap, index) => (
                    <li key={index} className="text-xs text-red-700 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1 text-red-600" />
                      {gap.skill}
                    </li>
                  ))}
                  {highDemandGaps.length > 3 && (
                    <li className="text-xs text-red-700 italic">
                      +{highDemandGaps.length - 3} more
                    </li>
                  )}
                </ul>
              ) : (
                <p className="text-xs text-muted-foreground">No high demand skill gaps detected</p>
              )}
            </div>
            
            {/* Medium demand skills card */}
            <div className="bg-amber-50 border border-amber-100 rounded-md p-3">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-amber-800">Medium Demand</span>
                <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
                  {mediumDemandGaps.length}
                </Badge>
              </div>
              {mediumDemandGaps.length > 0 ? (
                <ul className="space-y-1">
                  {mediumDemandGaps.slice(0, 3).map((gap, index) => (
                    <li key={index} className="text-xs text-amber-700 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1 text-amber-600" />
                      {gap.skill}
                    </li>
                  ))}
                  {mediumDemandGaps.length > 3 && (
                    <li className="text-xs text-amber-700 italic">
                      +{mediumDemandGaps.length - 3} more
                    </li>
                  )}
                </ul>
              ) : (
                <p className="text-xs text-muted-foreground">No medium demand skill gaps detected</p>
              )}
            </div>
            
            {/* Low demand skills card */}
            <div className="bg-blue-50 border border-blue-100 rounded-md p-3">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-blue-800">Low Demand</span>
                <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                  {lowDemandGaps.length}
                </Badge>
              </div>
              {lowDemandGaps.length > 0 ? (
                <ul className="space-y-1">
                  {lowDemandGaps.slice(0, 3).map((gap, index) => (
                    <li key={index} className="text-xs text-blue-700 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1 text-blue-600" />
                      {gap.skill}
                    </li>
                  ))}
                  {lowDemandGaps.length > 3 && (
                    <li className="text-xs text-blue-700 italic">
                      +{lowDemandGaps.length - 3} more
                    </li>
                  )}
                </ul>
              ) : (
                <p className="text-xs text-muted-foreground">No low demand skill gaps detected</p>
              )}
            </div>
          </div>
        </div>
        
        {/* Current skills summary */}
        <div className="border rounded-md p-3 bg-emirati-sandBeige/10">
          <h3 className="text-sm font-medium mb-2">Current Skills ({studentSkills.length})</h3>
          <div className="flex flex-wrap gap-2">
            {studentSkills.slice(0, 8).map((skill, index) => (
              <Badge key={index} variant="outline" className="bg-emirati-oasisGreen/10 text-emirati-oasisGreen">
                {skill}
              </Badge>
            ))}
            {studentSkills.length > 8 && (
              <Badge variant="outline" className="bg-emirati-oasisGreen/5 text-emirati-deepBlue">
                +{studentSkills.length - 8} more
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillGapVisualization;
