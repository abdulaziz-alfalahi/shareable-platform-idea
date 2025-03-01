
import React from "react";
import { Progress } from "@/components/ui/progress";
import { Student } from "@/types/student";

interface ProgressSectionProps {
  student: Student;
}

const ProgressSection: React.FC<ProgressSectionProps> = ({ student }) => {
  return (
    <div>
      <h3 className="font-medium">Progress</h3>
      <div className="mt-1">
        <div className="flex justify-between mb-1 text-sm">
          <span>Overall Progress</span>
          <span>{student.progress}%</span>
        </div>
        <Progress value={student.progress} className="h-2 mb-2" />
        <div className="text-sm text-center">
          {student.coursesCompleted} of {student.totalCourses} courses completed
        </div>
      </div>
    </div>
  );
};

export default ProgressSection;
