
import React from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BarChart } from "lucide-react";
import { Student } from "@/types/student";
import { analyzeSkillGaps } from "@/utils/career/skillGapAnalysis";
import { getDemandLevelColor } from "./utils";

interface AllSkillGapsTabProps {
  student: Student;
  onViewTraining: (skill: string) => void;
}

const AllSkillGapsTab: React.FC<AllSkillGapsTabProps> = ({ student, onViewTraining }) => {
  const skillGaps = analyzeSkillGaps(student);

  if (skillGaps.length === 0) {
    return (
      <div className="text-center py-8">
        <BarChart className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
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
        Here are all identified skill gaps based on the current UAE job market:
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {skillGaps.map((gap) => (
          <div key={gap.skill} className="border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium capitalize">{gap.skill}</h3>
              <span className={`text-xs px-2 py-0.5 rounded-full ${getDemandLevelColor(gap.demandLevel)}`}>
                {gap.demandLevel}
              </span>
            </div>
            
            <div className="mt-2">
              <div className="flex justify-between text-xs">
                <span>Relevance</span>
                <span>{gap.relevanceScore}%</span>
              </div>
              <Progress value={gap.relevanceScore} className="h-1.5 mt-1" />
            </div>
            
            {gap.suggestedTraining.length > 0 ? (
              <Button 
                variant="link" 
                className="p-0 h-auto mt-2 text-xs"
                onClick={() => onViewTraining(gap.skill)}
              >
                View {gap.suggestedTraining.length} training options
              </Button>
            ) : (
              <p className="text-xs text-muted-foreground mt-2">No specific training available</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllSkillGapsTab;
