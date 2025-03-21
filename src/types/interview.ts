
export interface InterviewData {
  candidateName: string;
  position: string;
  date: Date;
  time: string;
  duration: string;
  location?: string;
  locationCoordinates?: {
    latitude: number;
    longitude: number;
  };
  notes: string;
}

export interface ScheduleInterviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSchedule: (data: InterviewData) => void;
}

export interface AutosaveStatus {
  isSaving: boolean;
  lastSaved: Date | null;
}

