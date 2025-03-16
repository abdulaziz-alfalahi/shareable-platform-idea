
import React from "react";
import { PassportStamp } from "@/types/student";
import AchievementIcon from "./achievement/AchievementIcon";

interface RecentAchievementsProps {
  achievements: PassportStamp[];
  loading: boolean;
  error?: string | null;
}

const RecentAchievements: React.FC<RecentAchievementsProps> = ({ 
  achievements, 
  loading,
  error 
}) => {
  if (loading) {
    return (
      <div className="py-2">
        <h3 className="text-sm font-medium mb-2">Recent Achievements</h3>
        <div className="animate-pulse space-y-2">
          <div className="h-8 bg-gray-200 rounded"></div>
          <div className="h-8 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-2">
        <h3 className="text-sm font-medium mb-2">Recent Achievements</h3>
        <div className="text-sm text-red-500">{error}</div>
      </div>
    );
  }

  if (!achievements || achievements.length === 0) {
    return (
      <div className="py-2">
        <h3 className="text-sm font-medium mb-2">Recent Achievements</h3>
        <p className="text-sm text-gray-500">No achievements yet. Complete challenges to earn stamps!</p>
      </div>
    );
  }

  return (
    <div className="py-2">
      <h3 className="text-sm font-medium mb-2">Recent Achievements</h3>
      <ul className="space-y-2">
        {achievements.map((achievement) => (
          <li key={achievement.id} className="flex items-center gap-2 p-1 hover:bg-gray-50 rounded">
            <AchievementIcon 
              name={achievement.iconName} 
              level={achievement.level} 
              size="sm" 
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{achievement.title}</p>
              <p className="text-xs text-gray-500 truncate">{achievement.description}</p>
            </div>
            <span className="text-xs text-gray-400">
              {new Date(achievement.dateEarned).toLocaleDateString()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentAchievements;
