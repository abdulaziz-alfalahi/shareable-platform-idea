
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Flame, Trophy, Calendar } from "lucide-react";
import { Student, Challenge } from "@/types/student";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AchievementIcon } from './achievement/AchievementIcon';

interface CulturalChallengesProps {
  student: Student;
}

const CulturalChallenges: React.FC<CulturalChallengesProps> = ({ student }) => {
  // Filter challenges that are related to Emirati culture
  const culturalChallenges = student.activeChallenges?.filter(challenge => 
    challenge.title.includes("Desert") || 
    challenge.title.includes("Falcon") || 
    challenge.title.includes("Pearl") ||
    challenge.title.includes("Bedouin") ||
    challenge.title.includes("Dhow") ||
    challenge.title.includes("Arabic") ||
    challenge.title.includes("Majlis") ||
    challenge.title.includes("Oasis")
  ) || [];

  // Add some additional cultural challenges if needed
  const additionalChallenges: Challenge[] = [
    {
      id: 100,
      title: "Majlis Diplomacy",
      description: "Participate in 3 group discussions where you successfully mediate different perspectives",
      requiredCount: 3,
      currentProgress: 1,
      category: "Skills",
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      rewardTitle: "Cultural Diplomat",
      rewardLevel: "Bronze"
    },
    {
      id: 101,
      title: "Sadu Weaver",
      description: "Connect 5 different skills together in a project, inspired by the traditional Sadu weaving technique",
      requiredCount: 5,
      currentProgress: 2,
      category: "Skills",
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      rewardTitle: "Master Weaver",
      rewardLevel: "Silver"
    }
  ];

  const allChallenges = [...culturalChallenges, ...additionalChallenges];
  
  const getBadgeColor = (level: string) => {
    switch (level) {
      case "Gold": return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "Silver": return "bg-slate-100 text-slate-800 border-slate-300";
      default: return "bg-amber-100 text-amber-800 border-amber-300";
    }
  };

  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-2xl font-bold text-emirati-desertRed flex items-center">
          <Flame className="h-6 w-6 mr-2" />
          Cultural Challenges
        </CardTitle>
        <CardDescription>
          Complete these challenges inspired by Emirati heritage to earn special rewards
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {allChallenges.map((challenge) => {
            const progressPercentage = Math.min(Math.round((challenge.currentProgress / challenge.requiredCount) * 100), 100);
            
            return (
              <div key={challenge.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-full bg-emirati-sandBeige/20">
                      <AchievementIcon iconName={
                        challenge.title.includes("Majlis") ? "users" :
                        challenge.title.includes("Desert") ? "sun" :
                        challenge.title.includes("Pearl") ? "gem" :
                        challenge.title.includes("Falcon") ? "eagle" :
                        challenge.title.includes("Dhow") ? "sailboat" :
                        "award"
                      } />
                    </div>
                    
                    <div>
                      <h3 className="font-medium">{challenge.title}</h3>
                      <p className="text-sm text-muted-foreground">{challenge.description}</p>
                    </div>
                  </div>
                  
                  <Badge 
                    variant="outline" 
                    className={getBadgeColor(challenge.rewardLevel)}
                  >
                    {challenge.rewardLevel} Reward
                  </Badge>
                </div>
                
                <div className="mt-4">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      Ends: {new Date(challenge.endDate).toLocaleDateString()}
                    </span>
                    <span className="font-medium">
                      {challenge.currentProgress}/{challenge.requiredCount} Complete
                    </span>
                  </div>
                  <Progress 
                    value={progressPercentage} 
                    className="h-2"
                  />
                </div>
                
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <Trophy className="h-4 w-4 text-emirati-desertGold mr-1" />
                    <span className="text-sm">Reward: {challenge.rewardTitle}</span>
                  </div>
                  
                  <Button variant="outline" size="sm">
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

export default CulturalChallenges;
