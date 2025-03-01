
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Award, Trophy, Star, Medal, Check } from "lucide-react";
import { Link } from "react-router-dom";

// Define types for our achievements system
interface Achievement {
  id: string;
  title: string;
  description: string;
  points: number;
  icon: "award" | "trophy" | "star" | "medal" | "check";
  unlocked: boolean;
  progress?: number;
  maxProgress?: number;
}

interface UserPoints {
  total: number;
  level: number;
  nextLevelAt: number;
}

const Achievements = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [userPoints, setUserPoints] = useState<UserPoints>({
    total: 0,
    level: 1,
    nextLevelAt: 100
  });

  // Mock function to unlock an achievement
  const unlockAchievement = (id: string) => {
    setAchievements(prev => 
      prev.map(achievement => 
        achievement.id === id 
          ? { ...achievement, unlocked: true, progress: achievement.maxProgress } 
          : achievement
      )
    );
    
    // Add the points
    const achievement = achievements.find(a => a.id === id);
    if (achievement && !achievement.unlocked) {
      addPoints(achievement.points);
    }
  };

  // Mock function to increment progress on an achievement
  const incrementProgress = (id: string, amount: number = 1) => {
    setAchievements(prev => 
      prev.map(achievement => {
        if (achievement.id === id && achievement.progress !== undefined && achievement.maxProgress !== undefined) {
          const newProgress = Math.min(achievement.progress + amount, achievement.maxProgress);
          const wasUnlocked = achievement.unlocked;
          const isNowUnlocked = newProgress >= achievement.maxProgress;
          
          // If we just unlocked this achievement, add the points
          if (!wasUnlocked && isNowUnlocked) {
            addPoints(achievement.points);
          }
          
          return {
            ...achievement,
            progress: newProgress,
            unlocked: isNowUnlocked
          };
        }
        return achievement;
      })
    );
  };

  // Add points to user total and check for level up
  const addPoints = (points: number) => {
    setUserPoints(prev => {
      const newTotal = prev.total + points;
      let newLevel = prev.level;
      let newNextLevelAt = prev.nextLevelAt;
      
      // Check for level up
      if (newTotal >= prev.nextLevelAt) {
        newLevel++;
        newNextLevelAt = Math.floor(prev.nextLevelAt * 1.5); // Each level requires more points
      }
      
      return {
        total: newTotal,
        level: newLevel,
        nextLevelAt: newNextLevelAt
      };
    });
  };

  // Initialize with some sample achievements
  useEffect(() => {
    const sampleAchievements: Achievement[] = [
      {
        id: "first-resume",
        title: "Resume Builder",
        description: "Create your first resume",
        points: 50,
        icon: "award",
        unlocked: false
      },
      {
        id: "job-hunter",
        title: "Job Hunter",
        description: "Apply to 5 jobs",
        points: 100,
        icon: "trophy",
        unlocked: false,
        progress: 0,
        maxProgress: 5
      },
      {
        id: "location-master",
        title: "Location Master",
        description: "Find 3 jobs in your preferred location",
        points: 75,
        icon: "medal",
        unlocked: false,
        progress: 0,
        maxProgress: 3
      },
      {
        id: "profile-complete",
        title: "Profile Complete",
        description: "Complete your user profile",
        points: 25,
        icon: "check",
        unlocked: false
      },
      {
        id: "job-offer",
        title: "Job Offer",
        description: "Receive your first job offer",
        points: 200,
        icon: "star",
        unlocked: false
      }
    ];
    
    setAchievements(sampleAchievements);
  }, []);

  // For demo purposes, add buttons to unlock achievements and add progress
  const renderDemoControls = () => (
    <div className="mt-8 space-y-4 border p-4 rounded-lg bg-gray-50">
      <h3 className="text-lg font-medium">Demo Controls</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button 
          onClick={() => unlockAchievement("first-resume")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Unlock "Resume Builder"
        </button>
        <button 
          onClick={() => unlockAchievement("profile-complete")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Unlock "Profile Complete"
        </button>
        <button 
          onClick={() => incrementProgress("job-hunter", 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Progress "Job Hunter" (+1)
        </button>
        <button 
          onClick={() => incrementProgress("location-master", 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Progress "Location Master" (+1)
        </button>
        <button 
          onClick={() => unlockAchievement("job-offer")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Unlock "Job Offer"
        </button>
      </div>
    </div>
  );

  // Render the icon for an achievement
  const renderIcon = (icon: Achievement["icon"]) => {
    switch (icon) {
      case "award": return <Award className="h-6 w-6" />;
      case "trophy": return <Trophy className="h-6 w-6" />;
      case "star": return <Star className="h-6 w-6" />;
      case "medal": return <Medal className="h-6 w-6" />;
      case "check": return <Check className="h-6 w-6" />;
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Achievements & Points</h1>
          <p className="text-gray-600">Track your progress and earn rewards</p>
        </div>
        <Link to="/" className="text-blue-500 hover:underline">
          Back to Home
        </Link>
      </div>

      {/* User points and level section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Your Progress</CardTitle>
          <CardDescription>Level up by completing achievements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-medium">Total Points</span>
              <Badge variant="outline" className="text-lg">{userPoints.total}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">Current Level</span>
              <Badge className="bg-blue-500">{userPoints.level}</Badge>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm">Progress to Level {userPoints.level + 1}</span>
                <span className="text-sm">{userPoints.total} / {userPoints.nextLevelAt}</span>
              </div>
              <Progress 
                value={(userPoints.total / userPoints.nextLevelAt) * 100} 
                className="h-2" 
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Achievements section */}
      <h2 className="text-2xl font-bold mb-4">Your Achievements</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {achievements.map((achievement) => (
          <Card key={achievement.id} className={achievement.unlocked ? "border-green-500" : ""}>
            <CardHeader className="flex flex-row items-center space-y-0 gap-4">
              <div className={`p-2 rounded-full ${achievement.unlocked ? "bg-green-100 text-green-500" : "bg-gray-100 text-gray-500"}`}>
                {renderIcon(achievement.icon)}
              </div>
              <div>
                <CardTitle className="text-lg">{achievement.title}</CardTitle>
                <CardDescription>{achievement.description}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              {achievement.progress !== undefined && achievement.maxProgress !== undefined && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{achievement.progress} / {achievement.maxProgress}</span>
                  </div>
                  <Progress 
                    value={(achievement.progress / achievement.maxProgress) * 100} 
                    className="h-2" 
                  />
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <span className="text-sm font-medium">{achievement.points} points</span>
              {achievement.unlocked ? (
                <Badge className="bg-green-500">Unlocked</Badge>
              ) : (
                <Badge variant="outline">Locked</Badge>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Demo controls for testing */}
      {renderDemoControls()}
    </div>
  );
};

export default Achievements;
