
import React from "react";
import { format } from "date-fns";
import { TIME_SLOTS, getInterviewsForTimeSlot } from "@/utils/interviewUtils";

interface DayColumnProps {
  day: Date;
}

const DayColumn: React.FC<DayColumnProps> = ({ day }) => {
  return (
    <div className="space-y-4">
      <div className="text-center p-2 font-medium border-b">
        <div>{format(day, "EEE")}</div>
        <div className="text-xl">{format(day, "d")}</div>
      </div>

      {TIME_SLOTS.map((time, timeIdx) => {
        const interviews = getInterviewsForTimeSlot(day, time);
        return (
          <TimeSlot 
            key={timeIdx} 
            time={time} 
            interviews={interviews} 
          />
        );
      })}
    </div>
  );
};

interface TimeSlotProps {
  time: string;
  interviews: any[];
}

const TimeSlot: React.FC<TimeSlotProps> = ({ time, interviews }) => {
  return (
    <div
      className={`h-16 border rounded-md p-1 ${
        interviews.length > 0 ? "bg-primary/10" : ""
      }`}
    >
      {interviews.map((interview) => (
        <InterviewItem key={interview.id} interview={interview} />
      ))}
    </div>
  );
};

interface InterviewItemProps {
  interview: any;
}

const InterviewItem: React.FC<InterviewItemProps> = ({ interview }) => {
  return (
    <div
      className="text-xs p-1 bg-primary text-primary-foreground rounded truncate"
      title={`${interview.candidateName} - ${interview.position}`}
    >
      {format(interview.date, "h:mm a")} {interview.candidateName}
    </div>
  );
};

export default DayColumn;
