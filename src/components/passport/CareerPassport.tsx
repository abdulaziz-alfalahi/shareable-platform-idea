import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Student, PassportStamp } from "@/types/student";
import { 
  Award, 
  Star, 
  Map, 
  Briefcase, 
  GraduationCap, 
  Code, 
  Users, 
  FileText, 
  Rocket, 
  Settings, 
  BarChart, 
  Landmark, 
  Share2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { notifySuccess } from "@/utils/notification";
import InteractivePassportStamp from "./InteractivePassportStamp";
import ProgressTrackingTable from "./ProgressTrackingTable";

interface CareerPassportProps {
  student: Student;
}

// Map category to a specific color for visual distinction
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
  const featuredStamps = student.passportStamps.filter(stamp => stamp.featured);
  const otherStamps = student.passportStamps.filter(stamp => !stamp.featured);
  
  const nextLevelPoints = getNextLevelPoints(student.passportLevel);
  const progressToNextLevel = Math.min(Math.round((student.totalPoints / nextLevelPoints) * 100), 100);
  
  // Generate progress items for the tracking table
  const progressItems = getProgressItems(student.passportStamps);

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
        </CardContent>
      </Card>
    </div>
  );
};

export default CareerPassport;
