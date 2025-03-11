
import React from "react";
import { Progress } from "@/components/ui/progress";

interface StudentProgressProps {
  progress: number;
}

const StudentProgress: React.FC<StudentProgressProps> = ({ progress }) => {
  return (
    <div className="mt-3">
      <div className="flex items-center justify-between mb-1 text-sm">
        <span>Progress</span>
        <span>{progress}%</span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
};

export default StudentProgress;
