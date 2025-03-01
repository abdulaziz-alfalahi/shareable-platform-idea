
import React from "react";
import { Star } from "lucide-react";

interface AchievementsSectionProps {
  achievements: string[];
}

const AchievementsSection: React.FC<AchievementsSectionProps> = ({ achievements }) => {
  return (
    <div>
      <h3 className="font-medium">Achievements</h3>
      <div className="mt-1 space-y-1">
        {achievements.map((achievement: string, index: number) => (
          <div key={index} className="flex items-center text-sm">
            <Star className="mr-2 h-4 w-4 text-yellow-500" />
            {achievement}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementsSection;
