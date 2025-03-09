
import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Award } from "lucide-react";
import { Student } from "@/types/student";
import { getStudentCulturalAchievementProgress } from "@/utils/career";
import AchievementCard from "./achievement/AchievementCard";

interface CulturalAchievementsProps {
  student: Student;
}

const CulturalAchievements: React.FC<CulturalAchievementsProps> = ({ student }) => {
  const achievements = getStudentCulturalAchievementProgress(student);
  
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
            <AchievementCard 
              key={achievement.id} 
              achievement={achievement} 
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CulturalAchievements;
