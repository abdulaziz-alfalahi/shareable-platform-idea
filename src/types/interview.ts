
export interface InterviewData {
  candidateName: string;
  position: string;
  date: Date;
  time: string;
  duration: string;
  location?: string;
  notes: string;
}

export interface ScheduleInterviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSchedule: (data: InterviewData) => void;
}
