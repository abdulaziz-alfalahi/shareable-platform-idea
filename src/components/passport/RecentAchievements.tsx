
import React from "react";
import { PassportStamp } from "@/types/student";
import { Award, Trophy, Star } from "lucide-react";

interface RecentAchievementsProps {
  achievements: PassportStamp[];
  loading: boolean;
}

const RecentAchievements: React.FC<RecentAchievementsProps> = ({ 
  achievements, 
  loading 
}) => {
  // Icon component function for displaying the appropriate icon
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "award": return <Award className="h-4 w-4" />;
      case "trophy": return <Trophy className="h-4 w-4" />;
      case "star": return <Star className="h-4 w-4" />;
      default: return <Award className="h-4 w-4" />;
    }
  };

  if (loading) {
    return (
      <div className="text-center py-2">
        <p className="text-sm text-muted-foreground">Loading achievements...</p>
      </div>
    );
  }

  if (achievements.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-sm text-muted-foreground">No achievements yet</p>
      </div>
    );
  }

  return (
    <>
      <h4 className="text-xs font-medium text-muted-foreground">Recent Achievements</h4>
      {achievements.map((stamp: PassportStamp) => (
        <div key={stamp.id} className="flex items-center space-x-2 py-1 border-b last:border-0">
          <div className="p-1 bg-primary/10 rounded">
            {getIconComponent(stamp.iconName)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{stamp.title}</p>
            <p className="text-xs text-muted-foreground">{stamp.dateEarned}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default React.memo(RecentAchievements);
