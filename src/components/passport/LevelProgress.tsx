
import React from "react";
import { Progress } from "@/components/ui/progress";

interface LevelProgressProps {
  currentLevel: number;
  totalPoints: number;
  nextLevelPoints: number;
  progressPercentage: number;
}

const LevelProgress: React.FC<LevelProgressProps> = ({
  currentLevel,
  totalPoints,
  nextLevelPoints,
  progressPercentage
}) => {
  return (
    <div className="mt-2 mb-4">
      <div className="flex justify-between text-xs mb-1">
        <span>Progress to Level {currentLevel + 1}</span>
        <span>{totalPoints} / {nextLevelPoints} points</span>
      </div>
      <Progress value={progressPercentage} className="h-1.5" />
    </div>
  );
};

export default React.memo(LevelProgress);
