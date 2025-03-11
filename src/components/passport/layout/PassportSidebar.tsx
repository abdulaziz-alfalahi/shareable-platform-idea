
import React from "react";
import CareerMilestones from "@/components/passport/CareerMilestones";
import { Student } from "@/types/student";

interface PassportSidebarProps {
  student: Student;
}

const PassportSidebar: React.FC<PassportSidebarProps> = ({ student }) => {
  return (
    <div className="space-y-6">
      <CareerMilestones student={student} />
    </div>
  );
};

export default PassportSidebar;
