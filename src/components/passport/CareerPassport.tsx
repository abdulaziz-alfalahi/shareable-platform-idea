import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Student, PassportStamp, Challenge } from "@/types/student";
import { 
  Award, 
  GraduationCap, 
  Rocket, 
  BarChart
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { notifySuccess } from "@/utils/notification";
import InteractivePassportStamp from "./InteractivePassportStamp";
import ProgressTrackingTable from "./ProgressTrackingTable";
import ActiveChallenges from "./ActiveChallenges";
import LeaderboardCard from "./LeaderboardCard";
import { getLeaderboardData, getActiveChallenges } from "@/utils/careerUtils";

interface CareerPassportProps {
  student: Student;
}

// Get next milestone points required
const getNextLevelPoints = (currentLevel: number): number => {
  const baseLine = 500;
  return baseLine * (currentLevel + 1);
};

// Sample progress items for the tracking table
const getProgressItems = (stamps: PassportStamp[]) => {
  // Create progress items based on passport stamps
  return stamps.map(stamp => ({
    id: stamp.id.toString(),
    category: stamp.category,
    title: stamp.title,
    progress: Math.floor(Math.random() * 100), // In a real app, this would come from the user_progress table
    lastUpdated: stamp.dateEarned,
    nextMilestone: `Level ${stamp.level === "Bronze" ? "Silver" : stamp.level === "Silver" ? "Gold" : "Mastery"}`,
    status: Math.random() > 0.3 ? 'In Progress' : (Math.random() > 0.5 ? 'Completed' : 'Not Started') as 'In Progress' | 'Completed' | 'Not Started'
  }));
};

const CareerPassport: React.FC<CareerPassportProps> = ({ student }) => {
  const [activeTab, setActiveTab] = useState("achievements");
  const [leaderboardData, setLeaderboardData] = useState<{name: string, score: number}[]>([]);
  const [activeChallenges, setActiveChallenges] = useState<Challenge[]>([]);
  
  React.useEffect(() => {
    // Fetch leaderboard data
    getLeaderboardData().then(data => {
      // Mark the current user in the leaderboard
      const enhancedData = data.map(entry => ({
        ...entry,
        isCurrentUser: entry.name === student.name
      }));
      setLeaderboardData(enhancedData);
    });
    
    // Get active challenges
    const challenges = getActiveChallenges(student.id);
    // Convert to Challenge type with currentProgress
    const formattedChallenges: Challenge[] = challenges.map(c => ({
      ...c,
      currentProgress: c.progress || 0,
      category: c.category as "Workshop" | "Assessment" | "Training" | "Employment" | "Education" | "Skills",
    }));
    setActiveChallenges(formattedChallenges);
  }, [student.id, student.name]);

  const featuredStamps = student.passportStamps.filter(stamp => stamp.featured);
  const otherStamps = student.passportStamps.filter(stamp => !stamp.featured);
  
  const nextLevelPoints = getNextLevelPoints(student.passportLevel);
  const progressToNextLevel = Math.min(Math.round((student.totalPoints / nextLevelPoints) * 100), 100);
  
  // Generate progress items for the tracking table
  const progressItems = getProgressItems(student.passportStamps);

  const handleChallengeDetails = (challengeId: number) => {
    notifySuccess({
      title: "Challenge Details",
      description: `Viewing details for challenge #${challengeId}`
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl font-bold text-primary">Career Passport</CardTitle>
              <CardDescription>Track your journey and showcase your achievements</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className="text-sm py-1 px-3">Level {student.passportLevel}</Badge>
              <Badge variant="outline" className="text-sm py-1 px-3">{student.totalPoints} Points</Badge>
              {student.leaderboardRank && (
                <Badge variant="secondary" className="text-sm py-1 px-3">
                  <BarChart className="h-3 w-3 mr-1 inline-block" />
                  Rank #{student.leaderboardRank}
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Progress to next level with UAE-themed colors */}
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span>Progress to Level {student.passportLevel + 1}</span>
              <span>{student.totalPoints} / {nextLevelPoints} points</span>
            </div>
            <Progress 
              value={progressToNextLevel} 
              className="h-2" 
              // Add UAE-themed color gradient for progress bars
              style={{
                background: 'linear-gradient(to right, #f5e8c7, #f5e8c7)',
              }}
              // The actual progress indicator with UAE-inspired green
              indicatorStyle={{
                background: 'linear-gradient(to right, #2c4a2e, #4a7c31)',
              }}
            />
          </div>

          {/* Tabs for different passport sections */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="challenges">Challenges</TabsTrigger>
              <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            </TabsList>
            
            <TabsContent value="achievements">
              {/* Featured achievements with interactive stamps */}
              {featuredStamps.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Featured Achievements</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {featuredStamps.map((stamp) => (
                      <InteractivePassportStamp key={stamp.id} stamp={stamp} />
                    ))}
                  </div>
                </div>
              )}

              {/* Progress tracking table */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Progress Tracking</h3>
                <ProgressTrackingTable progressItems={progressItems} />
              </div>

              {/* Other achievements - displayed more compactly */}
              {otherStamps.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">All Achievements</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {otherStamps.map((stamp) => (
                      <InteractivePassportStamp key={stamp.id} stamp={stamp} />
                    ))}
                  </div>
                </div>
              )}

              {/* No achievements placeholder */}
              {student.passportStamps.length === 0 && (
                <div className="text-center py-8">
                  <GraduationCap className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                  <h3 className="text-lg font-medium">Your passport is empty!</h3>
                  <p className="text-muted-foreground mt-1">
                    Complete tasks and achieve milestones to earn stamps and badges
                  </p>
                  <Button className="mt-4">Explore Opportunities</Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="challenges">
              <div className="space-y-6">
                <ActiveChallenges 
                  challenges={activeChallenges} 
                  onViewDetails={handleChallengeDetails} 
                />
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Completed Challenges</CardTitle>
                    <CardDescription>Your challenge history</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-6">
                      <Rocket className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                      <p className="text-muted-foreground">No completed challenges yet.</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Active challenges will appear here once completed.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="leaderboard">
              <div className="space-y-6">
                <LeaderboardCard 
                  data={leaderboardData}
                  title="Passport Points Leaderboard"
                  description="Top achievers this month"
                  currentUserRank={student.leaderboardRank}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <LeaderboardCard 
                    data={leaderboardData.slice(0, 5)}
                    title="Workshop Leaders"
                    description="Most workshop stamps earned"
                    category="Workshop"
                  />
                  
                  <LeaderboardCard 
                    data={leaderboardData.slice(0, 5)}
                    title="Skills Masters"
                    description="Highest skill certification scores"
                    category="Skills"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default CareerPassport;
