
import React from "react";
import { Plus } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Student } from "@/types/student";
import { formatDate } from "@/utils/advisorUtils";

interface FeedbackSectionProps {
  student: Student;
  onAddFeedback: () => void;
}

const FeedbackSection: React.FC<FeedbackSectionProps> = ({ student, onAddFeedback }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Feedback History</CardTitle>
        <Button size="sm" onClick={onAddFeedback}>
          <Plus className="h-4 w-4 mr-1" /> Add Feedback
        </Button>
      </CardHeader>
      <CardContent>
        {student.feedback.length > 0 ? (
          <div className="space-y-3">
            {student.feedback.map((feedback) => (
              <div key={feedback.id} className="border rounded-md p-4">
                <div className="flex justify-between items-center mb-2">
                  <Badge variant="outline">
                    {feedback.type} Feedback
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {formatDate(feedback.date)}
                  </span>
                </div>
                <p className="text-sm mb-2">{feedback.content}</p>
                <div className="text-xs text-muted-foreground">
                  Provided by: {feedback.advisor}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-muted-foreground">
            No feedback recorded yet
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FeedbackSection;
