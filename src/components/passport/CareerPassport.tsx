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

// Map level to badge color
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

// Map icon name to Lucide icon component
const getIconComponent = (iconName: string) => {
  const icons: Record<string, React.ReactNode> = {
    award: <Award className="h-5 w-5" />,
    star: <Star className="h-5 w-5" />,
    map: <Map className="h-5 w-5" />,
    briefcase: <Briefcase className="h-5 w-5" />,
    "graduation-cap": <GraduationCap className="h-5 w-5" />,
    code: <Code className="h-5 w-5" />,
    users: <Users className="h-5 w-5" />,
    "file-text": <FileText className="h-5 w-5" />,
    rocket: <Rocket className="h-5 w-5" />,
    settings: <Settings className="h-5 w-5" />,
    "bar-chart": <BarChart className="h-5 w-5" />,
    landmark: <Landmark className="h-5 w-5" />
  };

  return icons[iconName] || <Award className="h-5 w-5" />;
};

// Get next milestone points required
const getNextLevelPoints = (currentLevel: number): number => {
  const baseLine = 500;
  return baseLine * (currentLevel + 1);
};

const CareerPassport: React.FC<CareerPassportProps> = ({ student }) => {
  const featuredStamps = student.passportStamps.filter(stamp => stamp.featured);
  const otherStamps = student.passportStamps.filter(stamp => !stamp.featured);
  
  const nextLevelPoints = getNextLevelPoints(student.passportLevel);
  const progressToNextLevel = Math.min(Math.round((student.totalPoints / nextLevelPoints) * 100), 100);
  
  const handleShareAchievement = (stamp: PassportStamp) => {
    // In a real app, this would open a social sharing dialog
    console.log("Sharing achievement:", stamp.title);
    notifySuccess({
      title: "Achievement Shared",
      description: `You've shared your "${stamp.title}" achievement with your network.`
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
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Progress to next level */}
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span>Progress to Level {student.passportLevel + 1}</span>
              <span>{student.totalPoints} / {nextLevelPoints} points</span>
            </div>
            <Progress value={progressToNextLevel} className="h-2" />
          </div>

          {/* Featured achievements - displayed with more prominence */}
          {featuredStamps.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Featured Achievements</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {featuredStamps.map((stamp) => (
                  <div 
                    key={stamp.id} 
                    className={`border-2 rounded-lg p-4 flex items-start space-x-4 ${getCategoryColor(stamp.category)}`}
                  >
                    <div className={`p-2 rounded-full bg-white`}>
                      {getIconComponent(stamp.iconName)}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-semibold">{stamp.title}</h4>
                        <Badge className={getLevelBadgeColor(stamp.level)}>{stamp.level}</Badge>
                      </div>
                      <p className="text-sm mt-1">{stamp.description}</p>
                      <div className="flex justify-between items-center mt-3">
                        <span className="text-xs">{stamp.dateEarned}</span>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="text-xs h-7 px-2"
                          onClick={() => handleShareAchievement(stamp)}
                        >
                          <Share2 className="h-3 w-3 mr-1" /> Share
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Other achievements - displayed more compactly */}
          {otherStamps.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">All Achievements</h3>
              <div className="space-y-2">
                {otherStamps.map((stamp) => (
                  <div 
                    key={stamp.id} 
                    className="border rounded-lg p-3 flex items-center space-x-3"
                  >
                    <div className={`p-1.5 rounded-full ${getCategoryColor(stamp.category)}`}>
                      {getIconComponent(stamp.iconName)}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">{stamp.title}</h4>
                        <Badge variant="outline" className="text-xs">{stamp.category}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{stamp.dateEarned}</p>
                    </div>
                  </div>
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
