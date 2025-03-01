
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Student, FeedbackForm } from "@/types/student";

interface FeedbackDialogProps {
  student: Student | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  feedbackForm: FeedbackForm;
  setFeedbackForm: (form: FeedbackForm) => void;
  onSubmit: () => void;
}

const FeedbackDialog: React.FC<FeedbackDialogProps> = ({
  student,
  isOpen,
  onOpenChange,
  feedbackForm,
  setFeedbackForm,
  onSubmit
}) => {
  if (!student) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Feedback for {student.name}</DialogTitle>
          <DialogDescription>
            Provide feedback and comments on the student's progress or performance
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="feedback-type">Feedback Type</Label>
            <Select 
              value={feedbackForm.type} 
              onValueChange={(value) => setFeedbackForm({...feedbackForm, type: value})}
            >
              <SelectTrigger id="feedback-type">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Academic">Academic</SelectItem>
                <SelectItem value="Career">Career</SelectItem>
                <SelectItem value="Personal">Personal</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="feedback-content">Feedback Content</Label>
            <Textarea 
              id="feedback-content"
              placeholder="Enter your feedback here..."
              value={feedbackForm.content}
              onChange={(e) => setFeedbackForm({...feedbackForm, content: e.target.value})}
              className="min-h-[120px]"
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={onSubmit}>Submit Feedback</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackDialog;
