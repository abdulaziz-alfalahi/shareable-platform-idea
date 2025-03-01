
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Student, GoalForm } from "@/types/student";

interface GoalDialogProps {
  student: Student | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  goalForm: GoalForm;
  setGoalForm: (form: GoalForm) => void;
  onSubmit: () => void;
}

const GoalDialog: React.FC<GoalDialogProps> = ({
  student,
  isOpen,
  onOpenChange,
  goalForm,
  setGoalForm,
  onSubmit
}) => {
  if (!student) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Goal for {student.name}</DialogTitle>
          <DialogDescription>
            Set a new academic or career goal for the student
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="goal-title">Goal Title</Label>
            <Input 
              id="goal-title"
              placeholder="Enter goal title..."
              value={goalForm.title}
              onChange={(e) => setGoalForm({...goalForm, title: e.target.value})}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="goal-deadline">Deadline</Label>
            <Input 
              id="goal-deadline"
              type="date"
              value={goalForm.deadline}
              onChange={(e) => setGoalForm({...goalForm, deadline: e.target.value})}
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={onSubmit}>Add Goal</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GoalDialog;
