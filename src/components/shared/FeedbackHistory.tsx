
import React from "react";
import { Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Student, StudentFeedback } from "@/types/student";
import { Separator } from "@/components/ui/separator";

interface FeedbackHistoryProps {
  feedback: StudentFeedback[];
  formatDate: (dateString: string) => string;
  onAddFeedback: () => void;
  showAddButton?: boolean;
  className?: string;
  emptyMessage?: string;
}

const FeedbackHistory: React.FC<FeedbackHistoryProps> = ({
  feedback,
  formatDate,
  onAddFeedback,
  showAddButton = true,
  className = "",
  emptyMessage = "No feedback recorded yet"
}) => {
  return (
    <div className={className}>
      {feedback.length > 0 ? (
        <div className="space-y-3">
          {feedback.map((feedback: StudentFeedback) => (
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
        </div>
      ) : (
        <div className="text-center py-6 text-muted-foreground">
          {emptyMessage}
        </div>
      )}
      
      {showAddButton && (
        <>
          {feedback.length > 0 && <Separator className="my-3" />}
          <Button 
            variant="outline" 
            className="w-full mt-3" 
            onClick={onAddFeedback}
          >
            <Plus className="mr-1 h-4 w-4" /> Add New Feedback
          </Button>
        </>
      )}
    </div>
  );
};

export default FeedbackHistory;
