
import React from "react";
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Student } from "@/types/student";

interface StudentDetailHeaderProps {
  student: Student;
}

const StudentDetailHeader: React.FC<StudentDetailHeaderProps> = ({ student }) => {
  return (
    <DialogHeader>
      <DialogTitle className="text-xl">Student Profile: {student.name}</DialogTitle>
      <DialogDescription>
        Comprehensive view of student's academic progress and advising history
      </DialogDescription>
    </DialogHeader>
  );
};

export default StudentDetailHeader;
