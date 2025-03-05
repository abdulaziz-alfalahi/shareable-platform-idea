
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Trophy, Calendar, Award } from "lucide-react";
import { Challenge } from "@/types/student";
import { Button } from "@/components/ui/button";

interface ActiveChallengesProps {
  challenges: Challenge[];
  onViewDetails?: (challengeId: number) => void;
}

const getLevelBadgeColor = (level: string): string => {
  switch (level) {
    case "Bronze":
      return "bg-amber-500";
    case "Silver":
      return "bg-slate-400";
    case "Gold":
      return "bg-yellow-500";
    default:
      return "bg-gray-500";
  }
};

const getCategoryColor = (category: string): string => {
  switch (category) {
    case "Workshop":
      return "bg-amber-100 text-amber-800 border-amber-300";
    case "Assessment":
      return "bg-violet-100 text-violet-800 border-violet-300";
    case "Training":
      return "bg-emerald-100 text-emerald-800 border-emerald-300";
    case "Employment":
      return "bg-blue-100 text-blue-800 border-blue-300";
    case "Education":
      return "bg-rose-100 text-rose-800 border-rose-300";
    case "Skills":
      return "bg-cyan-100 text-cyan-800 border-cyan-300";
    default:
      return "bg-gray-100 text-gray-800 border-gray-300";
  }
};

const ActiveChallenges: React.FC<ActiveChallengesProps> = ({ challenges, onViewDetails }) => {
  // Calculate days remaining for each challenge
  const getDaysRemaining = (endDate: string): number => {
    const end = new Date(endDate);
    const today = new Date();
    const diffTime = end.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  if (!challenges || challenges.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Active Challenges</CardTitle>
          <CardDescription>Complete challenges to earn special stamps</CardDescription>
        </CardHeader>
        <CardContent className="text-center py-6">
          <Trophy className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
          <p className="text-muted-foreground">No active challenges at the moment.</p>
          <Button className="mt-4">Explore Challenges</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Active Challenges</CardTitle>
        <CardDescription>Complete time-limited challenges to earn special stamps</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {challenges.map((challenge) => {
            const daysRemaining = getDaysRemaining(challenge.endDate);
            const progressPercentage = (challenge.currentProgress / challenge.requiredCount) * 100;
            
            return (
              <div key={challenge.id} className="border rounded-lg overflow-hidden">
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-lg">{challenge.title}</h3>
                      <p className="text-sm text-muted-foreground">{challenge.description}</p>
                    </div>
                    <Badge 
                      className={`${getLevelBadgeColor(challenge.rewardLevel)} text-white`}
                    >
                      {challenge.rewardLevel}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center text-sm space-x-1 mb-3">
                    <Calendar className="h-3 w-3 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      {daysRemaining > 0 
                        ? `${daysRemaining} days remaining` 
                        : "Deadline passed"}
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{challenge.currentProgress} / {challenge.requiredCount}</span>
                    </div>
                    <Progress 
                      value={progressPercentage} 
                      className="h-2"
                      // UAE-themed color gradient
                      style={{
                        background: 'linear-gradient(to right, #f5e8c7, #f5e8c7)',
                      }}
                      // Progress indicator with UAE-inspired green
                      indicatorStyle={{
                        background: 'linear-gradient(to right, #2c4a2e, #4a7c31)',
                      }}
                    />
                  </div>
                  
                  <div className="mt-4 flex justify-between items-center">
                    <Badge className={`${getCategoryColor(challenge.category)}`}>
                      {challenge.category}
                    </Badge>
                    
                    <div className="flex items-center text-sm">
                      <Award className="h-4 w-4 mr-1 text-primary" />
                      <span>Reward: {challenge.rewardTitle}</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-muted px-4 py-2 flex justify-end">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => onViewDetails && onViewDetails(challenge.id)}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActiveChallenges;
