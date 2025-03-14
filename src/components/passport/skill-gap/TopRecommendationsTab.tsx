
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, ChevronRight, ExternalLink } from "lucide-react";
import { Student } from "@/types/student";
import { 
  getTopSkillRecommendations, 
  enrollInTraining,
  SkillGap
} from "@/utils/career/skillGapAnalysis";
import TrainingCard from "./TrainingCard";
import { getDemandLevelColor, getSkillRelevanceColor } from "./utils";

interface TopRecommendationsTabProps {
  student: Student;
  onViewAllGaps: () => void;
}

const TopRecommendationsTab: React.FC<TopRecommendationsTabProps> = ({ 
  student,
  onViewAllGaps 
}) => {
  const topRecommendations = getTopSkillRecommendations(student);
  const [expandedSkill, setExpandedSkill] = useState<string | null>(null);
  const [enrolling, setEnrolling] = useState(false);
  const [enrollingId, setEnrollingId] = useState<string | null>(null);
  
  // Handle enrollment in a training program
  const handleEnroll = async (trainingId: string, trainingTitle: string) => {
    setEnrolling(true);
    setEnrollingId(trainingId);
    try {
      await enrollInTraining(student.id, trainingId, trainingTitle);
    } finally {
      setEnrolling(false);
      setEnrollingId(null);
    }
  };

  // Toggle expanded skill view
  const toggleSkillExpand = (skillName: string) => {
    setExpandedSkill(expandedSkill === skillName ? null : skillName);
  };

  if (topRecommendations.length === 0) {
    return (
      <div className="text-center py-8 bg-emirati-sandstone/20 rounded-lg border border-emirati-sandstone/30">
        <TrendingUp className="mx-auto h-12 w-12 text-emirati-oasisGreen mb-3" />
        <h3 className="text-lg font-medium text-emirati-deepBrown">No Skill Gaps Found</h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          Your profile already matches well with current job market demands in the UAE.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <p className="text-sm text-emirati-deepBrown mb-4 bg-emirati-sandstone/20 p-3 rounded-lg border border-emirati-sandstone/30">
        Based on your profile and UAE job market trends, here are your top skill recommendations to improve your employability:
      </p>
      
      {topRecommendations.map((gap) => (
        <div 
          key={gap.skill} 
          className="border border-emirati-sandstone/30 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md"
        >
          <div 
            className="p-4 cursor-pointer hover:bg-emirati-sandstone/10"
            onClick={() => toggleSkillExpand(gap.skill)}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium capitalize text-emirati-deepBrown">{gap.skill}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${getDemandLevelColor(gap.demandLevel)}`}>
                    {gap.demandLevel} demand
                  </span>
                </div>
                
                <div className="mt-3 mb-2">
                  <div className="flex justify-between text-xs text-emirati-deepBrown">
                    <span>Relevance to Your Profile</span>
                    <span>{gap.relevanceScore}%</span>
                  </div>
                  <Progress 
                    value={gap.relevanceScore} 
                    className="h-2 mt-1" 
                    indicatorStyle={{ backgroundColor: getSkillRelevanceColor(gap.relevanceScore) }}
                  />
                </div>
                
                <p className="text-sm text-muted-foreground mt-3">
                  {gap.demandLevel === 'high' 
                    ? `This skill is in high demand in the UAE job market and highly relevant to your career path.`
                    : gap.demandLevel === 'medium'
                      ? `This skill is growing in importance in the UAE job market and could enhance your profile.`
                      : `While not critical, this skill would complement your existing capabilities.`
                  }
                </p>
              </div>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="ml-2 mt-1"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleSkillExpand(gap.skill);
                }}
              >
                <ChevronRight className={`h-5 w-5 transform transition-transform ${expandedSkill === gap.skill ? 'rotate-90' : ''}`} />
              </Button>
            </div>
          </div>
          
          {expandedSkill === gap.skill && gap.suggestedTraining.length > 0 && (
            <div className="bg-emirati-sandstone/5 border-t border-emirati-sandstone/30 p-4">
              <h4 className="text-sm font-medium mb-3 text-emirati-deepBrown flex items-center">
                <ExternalLink className="h-4 w-4 mr-2" />
                Recommended Training Options
              </h4>
              <div className="space-y-3">
                {gap.suggestedTraining.map(training => (
                  <TrainingCard 
                    key={training.id} 
                    training={training} 
                    onEnroll={handleEnroll} 
                    isEnrolling={enrolling}
                    enrollingId={enrollingId}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
      
      <div className="mt-6 text-center">
        <Button 
          variant="outline" 
          onClick={onViewAllGaps}
          className="border-emirati-oasisGreen text-emirati-oasisGreen hover:bg-emirati-oasisGreen/10"
        >
          View All Skill Gaps
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default TopRecommendationsTab;
