
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PointsWidgetProps {
  points: number;
  level: number;
  nextLevelAt: number;
}

const PointsWidget: React.FC<PointsWidgetProps> = ({ points, level, nextLevelAt }) => {
  const progressPercentage = Math.min(Math.round((points / nextLevelAt) * 100), 100);
  
  return (
    <Link to="/achievements" className="block">
      <Card className="overflow-hidden hover:shadow-md transition-all cursor-pointer">
        <CardContent className="p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-500" />
              <span className="font-medium">Level {level}</span>
            </div>
            <span className="text-sm">{points} / {nextLevelAt}</span>
          </div>
          <Progress value={progressPercentage} className="h-1.5" />
        </CardContent>
      </Card>
    </Link>
  );
};

export default PointsWidget;
