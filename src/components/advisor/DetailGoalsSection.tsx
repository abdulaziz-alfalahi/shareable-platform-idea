
import React from "react";
import { Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Student, StudentGoal } from "@/types/student";

interface DetailGoalsSectionProps {
  student: Student;
  formatDate: (dateString: string) => string;
  onAddGoal: (student: Student) => void;
}

const DetailGoalsSection: React.FC<DetailGoalsSectionProps> = ({ 
  student, 
  formatDate, 
  onAddGoal 
}) => {
  return (
    <div>
      <h3 className="font-medium mb-2">Goals</h3>
      <div className="space-y-3">
        {student.goals.map((goal: StudentGoal) => (
          <div key={goal.id} className="border rounded-md p-3">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium">{goal.title}</h4>
                <div className="text-sm text-muted-foreground">
                  Deadline: {formatDate(goal.deadline)}
                </div>
              </div>
              <Badge variant={
                goal.status === "Completed" ? "default" :
                goal.status === "In Progress" ? "outline" : "secondary"
              }>
                {goal.status}
              </Badge>
            </div>
          </div>
        ))}
        <Button 
          variant="outline" 
          className="w-full" 
          onClick={() => onAddGoal(student)}
        >
          <Plus className="mr-1 h-4 w-4" /> Add New Goal
        </Button>
      </div>
    </div>
  );
};

export default DetailGoalsSection;
