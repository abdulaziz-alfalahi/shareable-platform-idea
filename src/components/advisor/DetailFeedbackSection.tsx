
import React from "react";
import { Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Student, StudentFeedback } from "@/types/student";

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
      <div className="space-y-3">
        {student.feedback.map((feedback: StudentFeedback) => (
          <div key={feedback.id} className="border rounded-md p-3">
            <div className="flex justify-between items-start mb-2">
              <Badge variant="outline">{feedback.type} Feedback</Badge>
              <span className="text-sm text-muted-foreground">
                {formatDate(feedback.date)}
              </span>
            </div>
            <p className="text-sm mb-1">{feedback.content}</p>
            <div className="text-xs text-muted-foreground">
              Provided by: {feedback.advisor}
            </div>
          </div>
        ))}
        <Button 
          variant="outline" 
          className="w-full" 
          onClick={() => onAddFeedback(student)}
        >
          <Plus className="mr-1 h-4 w-4" /> Add New Feedback
        </Button>
      </div>
    </div>
  );
};

export default DetailFeedbackSection;
