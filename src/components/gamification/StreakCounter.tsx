
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Flame } from 'lucide-react';

interface StreakCounterProps {
  streak: number;
}

const StreakCounter: React.FC<StreakCounterProps> = ({ streak }) => {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-3 flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
          <Flame className="h-5 w-5 text-amber-500" />
        </div>
        <div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold">{streak}</span>
            <span className="text-sm text-muted-foreground">day streak</span>
          </div>
          <p className="text-xs text-muted-foreground">Keep it going!</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default StreakCounter;
