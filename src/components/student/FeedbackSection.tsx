
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Student } from "@/types/student";
import { formatDate } from "@/utils/advisorUtils";
import FeedbackHistory from "@/components/shared/FeedbackHistory";

interface FeedbackSectionProps {
  student: Student;
  onAddFeedback: () => void;
}

const FeedbackSection: React.FC<FeedbackSectionProps> = ({ student, onAddFeedback }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Feedback History</CardTitle>
      </CardHeader>
      <CardContent>
        <FeedbackHistory
          feedback={student.feedback}
          formatDate={formatDate}
          onAddFeedback={onAddFeedback}
          emptyMessage="No feedback recorded yet"
        />
      </CardContent>
    </Card>
  );
};

export default FeedbackSection;
