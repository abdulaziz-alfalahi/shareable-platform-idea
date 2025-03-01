
import React from "react";
import { Plus } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Student, StudentGoal } from "@/types/student";
import { formatDate } from "@/utils/advisorUtils";

interface GoalsSectionProps {
  student: Student;
  onAddGoal: () => void;
}

const GoalsSection: React.FC<GoalsSectionProps> = ({ student, onAddGoal }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Goals</CardTitle>
        <Button size="sm" onClick={onAddGoal}>
          <Plus className="h-4 w-4 mr-1" /> Add Goal
        </Button>
      </CardHeader>
      <CardContent>
        {student.goals.length > 0 ? (
          <div className="space-y-3">
            {student.goals.map((goal) => (
              <div key={goal.id} className="border rounded-md p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{goal.title}</h4>
                    <div className="text-sm text-muted-foreground mt-1">
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
          </div>
        ) : (
          <div className="text-center py-6 text-muted-foreground">
            No goals set yet
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GoalsSection;
