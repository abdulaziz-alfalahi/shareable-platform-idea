
import React from "react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { LineChart, CheckCircle, BookOpen } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SkillGap } from "@/utils/career/skill-gap";

interface SkillProgressTrackerProps {
  inProgressSkills: {
    skill: string;
    trainingTitle: string;
    progress: number;
    estimatedCompletion: string;
  }[];
  completedSkills: string[];
  recommendedSkills: SkillGap[];
  onViewTraining: () => void;
}

const SkillProgressTracker: React.FC<SkillProgressTrackerProps> = ({
  inProgressSkills,
  completedSkills,
  recommendedSkills,
  onViewTraining
}) => {
  // Get top recommended skills that aren't already in progress or completed
  const topRecommendations = recommendedSkills
    .filter(gap => 
      !inProgressSkills.some(s => s.skill.toLowerCase() === gap.skill.toLowerCase()) &&
      !completedSkills.some(s => s.toLowerCase() === gap.skill.toLowerCase())
    )
    .slice(0, 3);

  return (
    <Card>
      <CardHeader className="border-b pb-3">
        <CardTitle className="text-lg font-semibold flex items-center text-emirati-deepBlue">
          <LineChart className="mr-2 h-5 w-5 text-emirati-oasisGreen" />
          Skill Development Progress
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-5 space-y-6">
        {/* Skills in progress */}
        <div>
          <h3 className="text-sm font-medium mb-3">Skills In Progress</h3>
          
          {inProgressSkills.length > 0 ? (
            <div className="space-y-4">
              {inProgressSkills.map((skill, index) => (
                <div key={index} className="border rounded-md p-3">
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <h4 className="text-sm font-medium">{skill.skill}</h4>
                      <p className="text-xs text-muted-foreground">{skill.trainingTitle}</p>
                    </div>
                    <Badge className="bg-emirati-oasisGreen">{skill.progress}%</Badge>
                  </div>
                  <Progress value={skill.progress} className="h-2 mb-2" />
                  <p className="text-xs text-right text-muted-foreground">
                    Est. completion: {skill.estimatedCompletion}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4 bg-muted/20 rounded-md">
              <BookOpen className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                You're not currently developing any skills
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-2 text-emirati-oasisGreen border-emirati-oasisGreen/50 hover:bg-emirati-oasisGreen/10"
                onClick={onViewTraining}
              >
                Find Training Programs
              </Button>
            </div>
          )}
        </div>
        
        {/* Recently completed skills */}
        {completedSkills.length > 0 && (
          <div>
            <h3 className="text-sm font-medium mb-3 flex items-center">
              <CheckCircle className="mr-2 h-4 w-4 text-emirati-oasisGreen" />
              Recently Completed Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {completedSkills.map((skill, index) => (
                <Badge key={index} className="bg-green-100 text-green-800 border border-green-200">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        {/* Recommended next skills */}
        {topRecommendations.length > 0 && (
          <div className="border-t pt-4 mt-4">
            <h3 className="text-sm font-medium mb-3">Recommended Next Skills</h3>
            <div className="space-y-2">
              {topRecommendations.map((gap, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium">{gap.skill}</p>
                    <p className="text-xs text-muted-foreground">
                      {gap.demandLevel === 'high' 
                        ? 'High demand in UAE job market' 
                        : gap.demandLevel === 'medium'
                          ? 'Growing demand in UAE job market'
                          : 'Emerging skill in UAE job market'
                      }
                    </p>
                  </div>
                  <Badge 
                    className={`
                      ${gap.demandLevel === 'high' 
                        ? 'bg-red-100 text-red-800 border-red-200' 
                        : gap.demandLevel === 'medium'
                          ? 'bg-amber-100 text-amber-800 border-amber-200'
                          : 'bg-blue-100 text-blue-800 border-blue-200'
                      }
                    `}
                  >
                    {gap.demandLevel}
                  </Badge>
                </div>
              ))}
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full mt-2 text-emirati-oasisGreen border-emirati-oasisGreen/50 hover:bg-emirati-oasisGreen/10"
                onClick={onViewTraining}
              >
                Start Developing These Skills
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SkillProgressTracker;
