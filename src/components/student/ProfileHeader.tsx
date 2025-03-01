
import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, MessageSquare, CheckCircle, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Student } from "@/types/student";
import { getStatusBadgeVariant, getRiskBadgeVariant } from "@/utils/advisorUtils";

interface ProfileHeaderProps {
  student: Student;
  onAddFeedback: () => void;
  onAddGoal: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  student,
  onAddFeedback,
  onAddGoal
}) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex items-center mb-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/advisor-dashboard")} 
          className="mr-4"
        >
          <ArrowLeft size={18} className="mr-1" /> Back to Dashboard
        </Button>
        <h1 className="text-3xl font-bold">Student Profile</h1>
      </div>

      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold">{student.name}</h2>
                {student.flagged && (
                  <Badge variant="destructive">Flagged</Badge>
                )}
              </div>
              <div className="flex flex-wrap gap-3 mt-2">
                <Badge variant={getStatusBadgeVariant(student.advisingStatus) as any}>
                  {student.advisingStatus}
                </Badge>
                <Badge variant={getRiskBadgeVariant(student.riskLevel) as any}>
                  Risk: {student.riskLevel}
                </Badge>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <Button onClick={onAddFeedback}>
                <MessageSquare className="mr-1 h-4 w-4" /> Add Feedback
              </Button>
              <Button variant="outline" onClick={onAddGoal}>
                <CheckCircle className="mr-1 h-4 w-4" /> Add Goal
              </Button>
              <Button variant="outline">
                <Calendar className="mr-1 h-4 w-4" /> Schedule Meeting
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default ProfileHeader;
