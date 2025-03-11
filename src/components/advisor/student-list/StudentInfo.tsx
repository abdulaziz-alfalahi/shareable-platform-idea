
import React from "react";
import { GraduationCap, BookOpen, Award, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Student } from "@/types/student";

interface StudentInfoProps {
  student: Student;
  getStatusBadgeVariant: (status: string) => string;
  getRiskBadgeVariant: (risk: string) => string;
}

const StudentInfo: React.FC<StudentInfoProps> = ({
  student,
  getStatusBadgeVariant,
  getRiskBadgeVariant
}) => {
  return (
    <>
      <div className="flex items-center">
        <h3 className="text-xl font-semibold">{student.name}</h3>
        {student.flagged && (
          <Badge variant="destructive" className="ml-2">Flagged</Badge>
        )}
      </div>
      <div className="flex flex-col md:flex-row md:items-center flex-wrap gap-2 md:gap-4 mt-2 text-sm text-muted-foreground">
        <div className="flex items-center">
          <GraduationCap className="mr-1 h-4 w-4" /> {student.program}
        </div>
        <div className="flex items-center">
          <BookOpen className="mr-1 h-4 w-4" /> Year {student.year}
        </div>
        <div className="flex items-center">
          <Award className="mr-1 h-4 w-4" /> GPA: {student.gpa}
        </div>
        <div className="flex items-center">
          <TrendingUp className="mr-1 h-4 w-4" /> {student.careerPath}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-3">
        <Badge variant={getStatusBadgeVariant(student.advisingStatus) as any}>
          {student.advisingStatus}
        </Badge>
        <Badge variant={getRiskBadgeVariant(student.riskLevel) as any}>
          Risk: {student.riskLevel}
        </Badge>
      </div>
    </>
  );
};

export default StudentInfo;
