
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { InterviewData, ScheduleInterviewDialogProps } from "@/types/interview";
import CandidateFields from "./interview/CandidateFields";
import DatePickerField from "./interview/DatePickerField";
import TimeAndDurationFields from "./interview/TimeAndDurationFields";
import LocationField from "./interview/LocationField";
import NotesField from "./interview/NotesField";

const ScheduleInterviewDialog: React.FC<ScheduleInterviewDialogProps> = ({
  open,
  onOpenChange,
  onSchedule,
}) => {
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState("60");
  const [candidateName, setCandidateName] = useState("");
  const [position, setPosition] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");
  const [calendarOpen, setCalendarOpen] = useState(false);

  const handleSchedule = () => {
    if (!date || !time || !candidateName || !position) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    onSchedule({
      candidateName,
      position,
      date,
      time,
      duration,
      location,
      notes
    });

    resetForm();
  };

  const resetForm = () => {
    setDate(undefined);
    setTime("");
    setDuration("60");
    setCandidateName("");
    setPosition("");
    setLocation("");
    setNotes("");
    setCalendarOpen(false);
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    console.log("Date selected:", selectedDate);
    if (selectedDate) {
      setDate(selectedDate);
      // Use a setTimeout to avoid immediate closing of the calendar
      // which can interfere with the click event
      setTimeout(() => {
        setCalendarOpen(false);
      }, 150);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      if (!isOpen) resetForm();
      onOpenChange(isOpen);
    }}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Schedule Interview</DialogTitle>
          <DialogDescription>
            Set up an interview with a candidate for a position.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <CandidateFields 
            candidateName={candidateName}
            setCandidateName={setCandidateName}
            position={position}
            setPosition={setPosition}
          />

          <DatePickerField 
            date={date}
            onDateSelect={handleDateSelect}
            calendarOpen={calendarOpen}
            setCalendarOpen={setCalendarOpen}
          />

          <TimeAndDurationFields 
            time={time}
            setTime={setTime}
            duration={duration}
            setDuration={setDuration}
          />

          <LocationField
            location={location}
            setLocation={setLocation}
          />

          <NotesField
            notes={notes}
            setNotes={setNotes}
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSchedule}>
            Schedule Interview
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleInterviewDialog;
