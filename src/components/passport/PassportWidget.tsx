
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Student } from "@/types/student";
import { Award, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

import { usePassportData } from "@/hooks/passport/usePassportData";
import LevelProgress from "./LevelProgress";
import RecentAchievements from "./RecentAchievements";

interface PassportWidgetProps {
  student: Student;
}

const PassportWidget: React.FC<PassportWidgetProps> = ({ student }) => {
  const navigate = useNavigate();
  const { 
    loading, 
    recentAchievements, 
    progressToNextLevel, 
    nextLevelPoints 
  } = usePassportData(student);
  
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center justify-between">
          <span className="flex items-center">
            <Award className="mr-2 h-5 w-5 text-primary" />
            Career Passport
          </span>
          <span className="text-sm font-normal text-muted-foreground">
            Level {student.passportLevel}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Level progress */}
        <LevelProgress 
          currentLevel={student.passportLevel}
          totalPoints={student.totalPoints}
          nextLevelPoints={nextLevelPoints}
          progressPercentage={progressToNextLevel}
        />
        
        {/* Recent achievements */}
        <div className="space-y-2 mb-4">
          <RecentAchievements 
            achievements={recentAchievements}
            loading={loading}
          />
        </div>
        
        <Button 
          variant="outline" 
          className="w-full" 
          size="sm"
          onClick={() => navigate(`/career-passport/${student.id}`)}
        >
          View Full Passport <ArrowRight className="ml-1 h-3 w-3" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default React.memo(PassportWidget);
