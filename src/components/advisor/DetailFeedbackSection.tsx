
import React from "react";
import { Student } from "@/types/student";
import FeedbackHistory from "@/components/shared/FeedbackHistory";

interface DetailFeedbackSectionProps {
  student: Student;
  formatDate: (dateString: string) => string;
  onAddFeedback: (student: Student) => void;
}

const DetailFeedbackSection: React.FC<DetailFeedbackSectionProps> = ({ 
  student, 
  formatDate, 
  onAddFeedback 
}) => {
  return (
    <div>
      <h3 className="font-medium mb-2">Feedback History</h3>
      <FeedbackHistory
        feedback={student.feedback}
        formatDate={formatDate}
        onAddFeedback={() => onAddFeedback(student)}
      />
    </div>
  );
};

export default DetailFeedbackSection;
