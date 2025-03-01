
import React from "react";
import { Student, FeedbackForm, GoalForm } from "@/types/student";
import StudentDetail from "@/components/advisor/StudentDetail";
import FeedbackDialog from "@/components/advisor/FeedbackDialog";
import GoalDialog from "@/components/advisor/GoalDialog";

interface StudentDialogsProps {
  selectedStudent: Student | null;
  isViewStudentDialogOpen: boolean;
  setIsViewStudentDialogOpen: (isOpen: boolean) => void;
  isAddFeedbackDialogOpen: boolean;
  setIsAddFeedbackDialogOpen: (isOpen: boolean) => void;
  isAddGoalDialogOpen: boolean;
  setIsAddGoalDialogOpen: (isOpen: boolean) => void;
  feedbackForm: FeedbackForm;
  setFeedbackForm: React.Dispatch<React.SetStateAction<FeedbackForm>>;
  goalForm: GoalForm;
  setGoalForm: React.Dispatch<React.SetStateAction<GoalForm>>;
  handleSubmitFeedback: () => void;
  handleSubmitGoal: () => void;
  getStatusBadgeVariant: (status: string) => string;
  getRiskBadgeVariant: (risk: string) => string;
  formatDate: (dateString: string) => string;
  onAddFeedback: (student: Student) => void;
  onAddGoal: (student: Student) => void;
}

const StudentDialogs: React.FC<StudentDialogsProps> = ({
  selectedStudent,
  isViewStudentDialogOpen,
  setIsViewStudentDialogOpen,
  isAddFeedbackDialogOpen,
  setIsAddFeedbackDialogOpen,
  isAddGoalDialogOpen,
  setIsAddGoalDialogOpen,
  feedbackForm,
  setFeedbackForm,
  goalForm,
  setGoalForm,
  handleSubmitFeedback,
  handleSubmitGoal,
  getStatusBadgeVariant,
  getRiskBadgeVariant,
  formatDate,
  onAddFeedback,
  onAddGoal
}) => {
  return (
    <>
      <StudentDetail 
        student={selectedStudent}
        isOpen={isViewStudentDialogOpen}
        onOpenChange={setIsViewStudentDialogOpen}
        onAddFeedback={onAddFeedback}
        onAddGoal={onAddGoal}
        getStatusBadgeVariant={getStatusBadgeVariant}
        getRiskBadgeVariant={getRiskBadgeVariant}
        formatDate={formatDate}
      />

      <FeedbackDialog 
        student={selectedStudent}
        isOpen={isAddFeedbackDialogOpen}
        onOpenChange={setIsAddFeedbackDialogOpen}
        feedbackForm={feedbackForm}
        setFeedbackForm={setFeedbackForm}
        onSubmit={handleSubmitFeedback}
      />

      <GoalDialog 
        student={selectedStudent}
        isOpen={isAddGoalDialogOpen}
        onOpenChange={setIsAddGoalDialogOpen}
        goalForm={goalForm}
        setGoalForm={setGoalForm}
        onSubmit={handleSubmitGoal}
      />
    </>
  );
};

export default StudentDialogs;
