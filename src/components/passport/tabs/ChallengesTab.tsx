
import React from "react";
import { Student, Challenge } from "@/types/student";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ListChecks, Calendar, Clock, Award } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useGamification } from "@/hooks/useGamification";

interface ChallengesTabProps {
  student: Student;
}

const ChallengesTab: React.FC<ChallengesTabProps> = ({ student }) => {
  const { challenges, loading, updateProgress, completeChallenge, refreshChallenges } = useGamification(student);
  
  // Format date for display
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-AE', { 
        month: 'short', 
        day: 'numeric' 
      });
    } catch (e) {
      return "Invalid date";
    }
  };
  
  // Calculate days remaining
  const getDaysRemaining = (endDate: string) => {
    try {
      const end = new Date(endDate);
      const today = new Date();
      const diffTime = end.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays : 0;
    } catch (e) {
      return 0;
    }
  };
  
  // Get color based on challenge level
  const getLevelColor = (level: "Bronze" | "Silver" | "Gold") => {
    switch (level) {
      case "Gold": return "text-yellow-500";
      case "Silver": return "text-gray-400";
      case "Bronze": return "text-amber-700";
      default: return "text-gray-500";
    }
  };
  
  return (
    <div className="space-y-6">
      <Card className="border-emirati-sandBeige/50">
        <CardHeader className="pb-3 border-b border-emirati-sandBeige/20">
          <CardTitle className="text-2xl font-bold text-emirati-desertRed flex items-center">
            <ListChecks className="h-6 w-6 mr-2 text-emirati-oasisGreen" />
            Active Challenges
          </CardTitle>
          <CardDescription>
            Complete these challenges to earn rewards and advance your career
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          {loading ? (
            <div className="flex justify-center py-8">
              <p className="text-muted-foreground">Loading challenges...</p>
            </div>
          ) : challenges.length > 0 ? (
            <div className="space-y-6">
              {challenges.map((challenge: Challenge) => (
                <div 
                  key={challenge.id}
                  className="p-4 rounded-lg border border-emirati-sandBeige/30 bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-emirati-desertRed">
                        {challenge.title}
                      </h3>
                      <p className="text-muted-foreground mt-1">{challenge.description}</p>
                      
                      <div className="mt-4 flex flex-col gap-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">
                            {challenge.currentProgress} of {challenge.requiredCount} completed
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {Math.round((challenge.currentProgress / challenge.requiredCount) * 100)}%
                          </span>
                        </div>
                        <Progress 
                          value={(challenge.currentProgress / challenge.requiredCount) * 100} 
                          className="h-2 bg-emirati-sandBeige/20"
                        />
                      </div>
                      
                      <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{formatDate(challenge.startDate)} - {formatDate(challenge.endDate)}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{getDaysRemaining(challenge.endDate)} days left</span>
                        </div>
                        <div className="flex items-center">
                          <Award className="h-4 w-4 mr-1" />
                          <span className={getLevelColor(challenge.rewardLevel)}>
                            {challenge.rewardTitle} ({challenge.rewardLevel})
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <Button 
                        variant="outline" 
                        className="text-sm"
                        onClick={() => updateProgress(challenge.id)}
                        disabled={challenge.currentProgress >= challenge.requiredCount}
                      >
                        Log Progress
                      </Button>
                      
                      {challenge.currentProgress >= challenge.requiredCount && (
                        <Button 
                          variant="default"
                          className="bg-emirati-oasisGreen hover:bg-emirati-oasisGreen/90 text-sm"
                          onClick={() => completeChallenge(challenge.id)}
                        >
                          Claim Reward
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 px-4 border border-dashed border-emirati-sandBeige/50 rounded-lg">
              <ListChecks className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium text-emirati-desertRed mb-2">No Active Challenges</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                You don't have any active challenges at the moment. New challenges are added regularly, so check back soon!
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={refreshChallenges}
              >
                Refresh Challenges
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ChallengesTab;
