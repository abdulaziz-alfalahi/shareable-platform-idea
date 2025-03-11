
import React from "react";
import { ChevronRight, MessageSquare, CheckCircle, GraduationCap, BookOpen, Award, TrendingUp, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Student } from "@/types/student";
import StudentInfo from "./StudentInfo";
import StudentProgress from "./StudentProgress";
import StudentMeetings from "./StudentMeetings";
import StudentActions from "./StudentActions";

interface StudentCardProps {
  student: Student;
  onViewStudent: (student: Student) => void;
  onAddFeedback: (student: Student) => void;
  onAddGoal: (student: Student) => void;
  getStatusBadgeVariant: (status: string) => string;
  getRiskBadgeVariant: (risk: string) => string;
  formatDate: (dateString: string) => string;
}

const StudentCard: React.FC<StudentCardProps> = ({
  student,
  onViewStudent,
  onAddFeedback,
  onAddGoal,
  getStatusBadgeVariant,
  getRiskBadgeVariant,
  formatDate
}) => {
  return (
    <Card key={student.id} className={`overflow-hidden ${student.flagged ? 'border-red-300' : ''}`}>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          <div className="flex-1">
            <StudentInfo 
              student={student} 
              getStatusBadgeVariant={getStatusBadgeVariant}
              getRiskBadgeVariant={getRiskBadgeVariant}
            />
            
            <StudentProgress progress={student.progress} />
            
            <StudentMeetings 
              lastMeeting={student.lastMeeting} 
              nextMeeting={student.nextMeeting} 
              formatDate={formatDate} 
            />
          </div>

          <StudentActions 
            student={student}
            onViewStudent={onViewStudent}
            onAddFeedback={onAddFeedback}
            onAddGoal={onAddGoal}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentCard;
