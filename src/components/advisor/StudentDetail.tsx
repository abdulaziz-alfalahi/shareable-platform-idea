
import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Student } from "@/types/student";

// Import smaller components
import StudentDetailHeader from "./StudentDetailHeader";
import ProgramDetails from "./ProgramDetails";
import ProgressSection from "./ProgressSection";
import AchievementsSection from "./AchievementsSection";
import StudentNotes from "./StudentNotes";
import DetailGoalsSection from "./DetailGoalsSection";
import DetailFeedbackSection from "./DetailFeedbackSection";
import MeetingSchedule from "./MeetingSchedule";

interface StudentDetailProps {
  student: Student | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onAddFeedback: (student: Student) => void;
  onAddGoal: (student: Student) => void;
  getStatusBadgeVariant: (status: string) => string;
  getRiskBadgeVariant: (risk: string) => string;
  formatDate: (dateString: string) => string;
}

const StudentDetail: React.FC<StudentDetailProps> = ({
  student,
  isOpen,
  onOpenChange,
  onAddFeedback,
  onAddGoal,
  getStatusBadgeVariant,
  getRiskBadgeVariant,
  formatDate
}) => {
  if (!student) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <StudentDetailHeader student={student} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          <div className="md:col-span-1">
            <div className="space-y-4">
              <ProgramDetails 
                student={student} 
                getStatusBadgeVariant={getStatusBadgeVariant} 
                getRiskBadgeVariant={getRiskBadgeVariant} 
              />
              
              <ProgressSection student={student} />
              
              <AchievementsSection achievements={student.achievements} />
              
              <StudentNotes notes={student.notes} />
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="space-y-6">
              <DetailGoalsSection 
                student={student} 
                formatDate={formatDate} 
                onAddGoal={onAddGoal} 
              />

              <Separator />

              <DetailFeedbackSection 
                student={student} 
                formatDate={formatDate} 
                onAddFeedback={onAddFeedback} 
              />

              <Separator />

              <MeetingSchedule student={student} formatDate={formatDate} />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StudentDetail;
