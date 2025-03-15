
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AchievementIcon, getLevelColor, getProgressLabel } from "./AchievementIcon";

interface AchievementData {
  id: string;
  name: string;
  description: string;
  iconName: string;
  category: string;
  stampLevel: "Bronze" | "Silver" | "Gold";
  currentProgress: number;
  totalRequired: number;
  progressPercentage: number;
  isCompleted: boolean;
  culturalBackground?: string;
}

interface AchievementCardProps {
  achievement: AchievementData;
}

const AchievementCard: React.FC<AchievementCardProps> = ({ achievement }) => {
  const levelColor = getLevelColor(achievement.stampLevel);
  const progressLabel = getProgressLabel(achievement.category);
  
  const getLevelBadgeStyles = (level: "Bronze" | "Silver" | "Gold") => {
    switch (level) {
      case "Gold": return "text-yellow-600 border-yellow-300 bg-yellow-50";
      case "Silver": return "text-slate-600 border-slate-300 bg-slate-50";
      default: return "text-amber-600 border-amber-300 bg-amber-50";
    }
  };

  const getProgressIndicatorStyle = (level: "Bronze" | "Silver" | "Gold") => {
    switch (level) {
      case "Gold": return 'linear-gradient(to right, #d4a017, #ffd700)';
      case "Silver": return 'linear-gradient(to right, #9ca3af, #cbd5e1)';
      default: return 'linear-gradient(to right, #b45309, #d97706)';
    }
  };

  return (
    <div 
      className={`border rounded-lg p-4 ${achievement.isCompleted ? 'border-primary/40 bg-primary/5' : 'border-muted'}`}
    >
      <div className="flex items-start gap-4">
        <div className={`p-2.5 rounded-full ${levelColor} bg-opacity-20 text-primary`}>
          <AchievementIcon iconName={achievement.iconName} />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">
              {achievement.name}
              {achievement.isCompleted && (
                <Badge variant="outline" className="ml-2 bg-primary/10 text-primary">
                  Earned
                </Badge>
              )}
            </h3>
            <Badge 
              variant="outline" 
              className={getLevelBadgeStyles(achievement.stampLevel)}
            >
              {achievement.stampLevel}
            </Badge>
          </div>
          
          <p className="text-sm text-muted-foreground mt-1">{achievement.description}</p>
          
          {achievement.culturalBackground && (
            <div className="mt-2 text-xs text-emirati-desertRed bg-emirati-sandBeige/20 p-2 rounded-md italic">
              {achievement.culturalBackground}
            </div>
          )}
          
          <div className="mt-3">
            <div className="flex justify-between text-xs mb-1">
              <span>Progress</span>
              <span className="font-medium">
                {achievement.currentProgress}/{achievement.totalRequired} {progressLabel}
              </span>
            </div>
            <Progress 
              value={achievement.progressPercentage} 
              className="h-2"
              indicatorStyle={{
                background: getProgressIndicatorStyle(achievement.stampLevel)
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AchievementCard;
