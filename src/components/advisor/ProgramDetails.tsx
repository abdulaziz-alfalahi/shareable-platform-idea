
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Student } from "@/types/student";

interface ProgramDetailsProps {
  student: Student;
  getStatusBadgeVariant: (status: string) => "default" | "secondary" | "destructive" | "outline";
  getRiskBadgeVariant: (risk: string) => "default" | "secondary" | "destructive" | "outline";
}

const ProgramDetails: React.FC<ProgramDetailsProps> = ({ 
  student, 
  getStatusBadgeVariant, 
  getRiskBadgeVariant 
}) => {
  return (
    <div>
      <h3 className="font-medium">Program Details</h3>
      <div className="mt-1 space-y-1 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Program:</span>
          <span>{student.program}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Year:</span>
          <span>{student.year}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">GPA:</span>
          <span>{student.gpa}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Status:</span>
          <Badge variant={getStatusBadgeVariant(student.advisingStatus)}>
            {student.advisingStatus}
          </Badge>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Risk Level:</span>
          <Badge variant={getRiskBadgeVariant(student.riskLevel)}>
            {student.riskLevel}
          </Badge>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Career Path:</span>
          <span>{student.careerPath}</span>
        </div>
      </div>
    </div>
  );
};

export default ProgramDetails;
