
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  RefreshCcw, 
  Zap, 
  Award, 
  Calendar, 
  CheckCircle2, 
  Clock 
} from 'lucide-react';
import { Student, Challenge } from '@/types/student';
import { getChallengeCompletion } from '@/utils/career/challengesService';

interface DailyChallengesProps {
  student: Student;
  challenges: Challenge[];
  loading: boolean;
  onRefresh: () => void;
  onUpdateProgress: (challengeId: number) => void;
}

const DailyChallenges: React.FC<DailyChallengesProps> = ({
  student,
  challenges,
  loading,
  onRefresh,
  onUpdateProgress
}) => {
  // Calculate remaining time for daily challenges
  const getRemainingHours = (): number => {
    const now = new Date();
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
    const diffMs = endOfDay.getTime() - now.getTime();
    return Math.floor(diffMs / (1000 * 60 * 60));
  };

  // Filter for daily challenges
  const dailyChallenges = challenges.filter(challenge => {
    const startDate = new Date(challenge.startDate);
    const endDate = new Date(challenge.endDate);
    const today = new Date();
    return (
      startDate <= today && 
      endDate >= today && 
      endDate.getTime() - startDate.getTime() <= 86400000 * 2
    ); // ~2 days or less duration
  });

  return (
    <Card className="border-green-100 shadow-sm bg-gradient-to-br from-emerald-50 to-white">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-amber-500" />
            <CardTitle className="text-xl">Daily Challenges</CardTitle>
          </div>
          <Button variant="ghost" size="sm" onClick={onRefresh} disabled={loading}>
            <RefreshCcw className="h-4 w-4 mr-1" />
            Refresh
          </Button>
        </div>
        <CardDescription>
          Complete daily challenges to earn extra rewards
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="py-8 text-center text-muted-foreground">
            Loading challenges...
          </div>
        ) : dailyChallenges.length === 0 ? (
          <div className="py-8 text-center">
            <Award className="mx-auto h-12 w-12 text-muted-foreground mb-2 opacity-50" />
            <p className="text-muted-foreground">No daily challenges available today</p>
            <Button className="mt-4" variant="outline">Check Back Tomorrow</Button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Remaining time indicator */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <Clock className="h-4 w-4" />
              <span>{getRemainingHours()} hours remaining today</span>
            </div>
            
            {dailyChallenges.map(challenge => {
              const completionPercentage = getChallengeCompletion(
                challenge.currentProgress,
                challenge.requiredCount
              );
              const isCompleted = challenge.currentProgress >= challenge.requiredCount;
              
              return (
                <div key={challenge.id} className="border rounded-lg p-4 bg-white">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium flex items-center gap-2">
                        {challenge.title}
                        {isCompleted && (
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        )}
                      </h3>
                      <p className="text-sm text-muted-foreground">{challenge.description}</p>
                    </div>
                    <Badge variant={isCompleted ? "default" : "outline"}>
                      {isCompleted ? "Completed" : "In Progress"}
                    </Badge>
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        Daily Challenge
                      </span>
                      <span>
                        {challenge.currentProgress}/{challenge.requiredCount} 
                      </span>
                    </div>
                    <Progress value={completionPercentage} className="h-2" />
                  </div>
                  
                  <div className="mt-4 flex justify-end">
                    <Button 
                      size="sm" 
                      disabled={isCompleted}
                      onClick={() => onUpdateProgress(challenge.id)}
                    >
                      {isCompleted ? "Completed" : "Complete Step"}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DailyChallenges;
