
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { Target, Check, X, Briefcase, Globe } from 'lucide-react';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Vacancy } from './MatchingVacanciesTab';
import { Separator } from "@/components/ui/separator";

interface SkillMatchVisualizationProps {
  vacancy: Vacancy;
}

const SkillMatchVisualization: React.FC<SkillMatchVisualizationProps> = ({ vacancy }) => {
  const { 
    matchPercentage, 
    requiredSkills, 
    missingSkills,
    matchedSkills = [],
    culturalFit = 70,
    careerPathAlignment = 60
  } = vacancy;
  
  // Determine color based on match percentage
  const getMatchColor = (percentage: number) => {
    if (percentage >= 90) return "bg-green-500";
    if (percentage >= 75) return "bg-blue-500";
    if (percentage >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  // Count matched skills
  const matchedSkillsCount = matchedSkills.length;
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <Target className="h-5 w-5 mr-2 text-emirati-oasisGreen" />
          <span className="font-medium">Skills Match Visualization</span>
        </div>
        <div className="text-sm font-medium">
          {matchPercentage}% Match
        </div>
      </div>
      
      <Progress 
        value={matchPercentage} 
        className="h-3 w-full"
        indicatorStyle={{ backgroundColor: matchPercentage >= 90 ? '#16a34a' : 
                                          matchPercentage >= 75 ? '#2563eb' : 
                                          matchPercentage >= 60 ? '#ca8a04' : 
                                          '#dc2626' }}
      />
      
      <div className="bg-muted/20 p-4 rounded-md space-y-4">
        <div>
          <p className="text-sm mb-3 font-medium">Skills Breakdown:</p>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Matched Skills ({matchedSkillsCount}/{requiredSkills.length})</span>
              <span>{Math.round((matchedSkillsCount/requiredSkills.length) * 100)}%</span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {matchedSkills.map((skill, index) => (
                <TooltipProvider key={index}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                        <Check className="h-3 w-3 mr-1" />
                        {skill}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>You have this skill</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>
          </div>
          
          {missingSkills.length > 0 && (
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Missing Skills ({missingSkills.length}/{requiredSkills.length})</span>
                <span>{Math.round((missingSkills.length/requiredSkills.length) * 100)}%</span>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {missingSkills.map((skill, index) => (
                  <TooltipProvider key={index}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">
                          <X className="h-3 w-3 mr-1" />
                          {skill}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>You need to develop this skill</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <Separator />
        
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center text-sm">
                <Briefcase className="h-4 w-4 mr-2 text-emirati-oasisGreen" />
                <span>Career Path Alignment</span>
              </div>
              <span className="text-sm font-medium">{careerPathAlignment}%</span>
            </div>
            <Progress 
              value={careerPathAlignment} 
              className="h-2 w-full"
              indicatorStyle={{ backgroundColor: careerPathAlignment >= 70 ? '#16a34a' : '#ca8a04' }}
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center text-sm">
                <Globe className="h-4 w-4 mr-2 text-emirati-desertGold" />
                <span>Cultural Fit</span>
              </div>
              <span className="text-sm font-medium">{culturalFit}%</span>
            </div>
            <Progress 
              value={culturalFit} 
              className="h-2 w-full"
              indicatorStyle={{ backgroundColor: culturalFit >= 70 ? '#16a34a' : '#ca8a04' }}
            />
            <p className="text-xs text-muted-foreground italic">
              Based on UAE values and employment preferences
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillMatchVisualization;
