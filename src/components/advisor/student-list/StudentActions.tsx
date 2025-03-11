
import React from "react";
import { ChevronRight, MessageSquare, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Student } from "@/types/student";

interface StudentActionsProps {
  student: Student;
  onViewStudent: (student: Student) => void;
  onAddFeedback: (student: Student) => void;
  onAddGoal: (student: Student) => void;
}

const StudentActions: React.FC<StudentActionsProps> = ({
  student,
  onViewStudent,
  onAddFeedback,
  onAddGoal
}) => {
  return (
    <div className="flex flex-col gap-2 min-w-[120px]">
      <Button onClick={() => onViewStudent(student)}>
        View Profile <ChevronRight className="ml-1 h-4 w-4" />
      </Button>
      <Button variant="outline" onClick={() => onAddFeedback(student)}>
        <MessageSquare className="mr-1 h-4 w-4" /> Add Feedback
      </Button>
      <Button variant="outline" onClick={() => onAddGoal(student)}>
        <CheckCircle className="mr-1 h-4 w-4" /> Add Goal
      </Button>
    </div>
  );
};

export default StudentActions;
