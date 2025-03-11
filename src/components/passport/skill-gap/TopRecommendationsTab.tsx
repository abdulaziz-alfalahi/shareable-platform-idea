
import React from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, ChevronRight } from "lucide-react";
import { Student } from "@/types/student";
import { 
  getTopSkillRecommendations, 
  enrollInTraining,
  SkillGap
} from "@/utils/career/skillGapAnalysis";
import TrainingCard from "./TrainingCard";
import { getDemandLevelColor } from "./utils";

interface TopRecommendationsTabProps {
  student: Student;
  onViewAllGaps: () => void;
}

const TopRecommendationsTab: React.FC<TopRecommendationsTabProps> = ({ 
  student,
  onViewAllGaps 
}) => {
  const topRecommendations = getTopSkillRecommendations(student);
  
  // Handle enrollment in a training program
  const handleEnroll = async (trainingId: string, trainingTitle: string) => {
    await enrollInTraining(student.id, trainingId, trainingTitle);
  };

  if (topRecommendations.length === 0) {
    return (
      <div className="text-center py-8">
        <TrendingUp className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
        <h3 className="text-lg font-medium">No Skill Gaps Found</h3>
        <p className="text-muted-foreground">
          Your profile already matches well with current job market demands.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground mb-2">
        Based on your profile and UAE job market trends, here are your top skill recommendations:
      </p>
      
      {topRecommendations.map((gap) => (
        <div key={gap.skill} className="border rounded-lg p-4">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-medium capitalize">{gap.skill}</h3>
                <span className={`text-xs px-2 py-0.5 rounded-full ${getDemandLevelColor(gap.demandLevel)}`}>
                  {gap.demandLevel} demand
                </span>
              </div>
              
              <div className="mt-2 mb-3">
                <div className="flex justify-between text-xs">
                  <span>Relevance to Your Profile</span>
                  <span>{gap.relevanceScore}%</span>
                </div>
                <Progress value={gap.relevanceScore} className="h-2 mt-1" />
              </div>
            </div>
          </div>
          
          {gap.suggestedTraining.length > 0 && (
            <div className="mt-3">
              <h4 className="text-sm font-medium mb-2">Recommended Training:</h4>
              <div className="space-y-2">
                {gap.suggestedTraining.slice(0, 2).map(training => (
                  <TrainingCard 
                    key={training.id} 
                    training={training} 
                    onEnroll={handleEnroll} 
                    isEnrolling={false}
                    enrollingId={null}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
      
      <div className="mt-4 text-center">
        <Button variant="outline" onClick={onViewAllGaps}>
          View All Skill Gaps
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default TopRecommendationsTab;
