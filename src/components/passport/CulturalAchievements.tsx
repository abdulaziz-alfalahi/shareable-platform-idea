
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
import { Student } from "@/types/student";
import { 
  Users, 
  Eagle, 
  Compass, 
  PalmTree, 
  Gem,
  Award,
  LucideIcon
} from "lucide-react";
import { getStudentCulturalAchievementProgress } from "@/utils/career";

interface CulturalAchievementsProps {
  student: Student;
}

const CulturalAchievements: React.FC<CulturalAchievementsProps> = ({ student }) => {
  const achievements = getStudentCulturalAchievementProgress(student);
  
  // Map icon names to Lucide icons
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "users": return <Users className="h-5 w-5" />;
      case "eagle": return <Eagle className="h-5 w-5" />;
      case "compass": return <Compass className="h-5 w-5" />;
      case "palm-tree": return <PalmTree className="h-5 w-5" />;
      case "gem": return <Gem className="h-5 w-5" />;
      default: return <Award className="h-5 w-5" />;
    }
  };
  
  // Define custom colors for different achievement levels
  const getLevelColor = (level: "Bronze" | "Silver" | "Gold") => {
    switch (level) {
      case "Bronze": return "bg-amber-500";
      case "Silver": return "bg-slate-400";
      case "Gold": return "bg-yellow-500";
      default: return "bg-primary";
    }
  };

  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-2xl font-bold text-primary flex items-center">
          <Award className="h-6 w-6 mr-2" />
          Cultural Achievements
        </CardTitle>
        <CardDescription>
          Earn special badges inspired by UAE heritage and cultural values
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {achievements.map((achievement) => (
            <div 
              key={achievement.id} 
              className={`border rounded-lg p-4 ${achievement.isCompleted ? 'border-primary/40 bg-primary/5' : 'border-muted'}`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-2.5 rounded-full ${getLevelColor(achievement.stampLevel)} bg-opacity-20 text-primary`}>
                  {getIconComponent(achievement.iconName)}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">
                      {achievement.name}
                      {achievement.isCompleted && (
                        <Badge variant="outline" className="ml-2 bg-primary/10 text-primary">
                          Earned
                        </Badge>
                      )}
                    </h3>
                    <Badge variant="outline" className={`${achievement.stampLevel === "Gold" ? "text-yellow-600 border-yellow-300 bg-yellow-50" : achievement.stampLevel === "Silver" ? "text-slate-600 border-slate-300 bg-slate-50" : "text-amber-600 border-amber-300 bg-amber-50"}`}>
                      {achievement.stampLevel}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mt-1">{achievement.description}</p>
                  
                  <div className="mt-3">
                    <div className="flex justify-between text-xs mb-1">
                      <span>Progress</span>
                      <span className="font-medium">
                        {achievement.currentProgress}/{achievement.totalRequired} {achievement.category === "Mentorship" ? "mentees" : 
                          achievement.category === "Resilience" ? "challenges" : 
                          achievement.category === "Leadership" ? "discussions" : 
                          achievement.category === "Innovation" ? "assessments" : 
                          "milestones"}
                      </span>
                    </div>
                    <Progress 
                      value={achievement.progressPercentage} 
                      className="h-2"
                      indicatorStyle={{
                        background: achievement.stampLevel === "Gold" 
                          ? 'linear-gradient(to right, #d4a017, #ffd700)' 
                          : achievement.stampLevel === "Silver" 
                            ? 'linear-gradient(to right, #9ca3af, #cbd5e1)' 
                            : 'linear-gradient(to right, #b45309, #d97706)'
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CulturalAchievements;
