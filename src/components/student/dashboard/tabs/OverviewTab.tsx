
import React from "react";
import { Student } from "@/types/student";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, Book, Calendar } from "lucide-react";
import ActiveChallenges from "@/components/passport/ActiveChallenges";
import UpcomingAssessments from "@/components/student/dashboard/UpcomingAssessments";
import { Link } from "react-router-dom";
import StreakCounter from "@/components/gamification/StreakCounter";
import PointsWidget from "@/components/gamification/PointsWidget";
import { getStudentChallenges } from "@/services/passport/passportService";

interface OverviewTabProps {
  student: Student;
}

const OverviewTab: React.FC<OverviewTabProps> = ({ student }) => {
  // Get active challenges from the student's passport
  const activeChallenges = student.activeChallenges || getStudentChallenges(student.id);
  
  // Mock login streak (this would come from a database in a real app)
  const loginStreak = 5;
  
  return (
    <div className="space-y-6">
      {/* Gamification Widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <StreakCounter streak={loginStreak} />
        <PointsWidget 
          points={student.totalPoints} 
          level={student.passportLevel} 
          nextLevelAt={500 * (student.passportLevel + 1)} 
        />
        
        <Card className="overflow-hidden sm:col-span-2">
          <CardContent className="p-3 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Trophy className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-sm font-medium">Next Achievement</p>
                <p className="text-xs text-muted-foreground">Complete 3 more assessments</p>
              </div>
            </div>
            <Link to="/achievements">
              <Button variant="outline" size="sm">View All</Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Challenges */}
        <div>
          <ActiveChallenges 
            challenges={activeChallenges} 
            onViewDetails={(id) => console.log(`View challenge ${id}`)}
          />
        </div>
        
        {/* Upcoming Assessments */}
        <div>
          <UpcomingAssessments student={student} />
        </div>
      </div>
      
      {/* Quick Actions */}
      <Card>
        <CardContent className="p-4">
          <h3 className="font-medium mb-3">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <Button variant="outline" className="flex flex-col h-auto py-3">
              <Book className="h-5 w-5 mb-1" />
              <span className="text-xs">Start Course</span>
            </Button>
            <Button variant="outline" className="flex flex-col h-auto py-3">
              <Trophy className="h-5 w-5 mb-1" />
              <span className="text-xs">Daily Challenge</span>
            </Button>
            <Button variant="outline" className="flex flex-col h-auto py-3">
              <Calendar className="h-5 w-5 mb-1" />
              <span className="text-xs">Book Assessment</span>
            </Button>
            <Link to="/achievements" className="block">
              <Button variant="outline" className="flex flex-col h-auto py-3 w-full">
                <Trophy className="h-5 w-5 mb-1" />
                <span className="text-xs">View Achievements</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OverviewTab;
