
import React, { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Student } from "@/types/student";
import { useToast } from "@/hooks/use-toast";

interface ScheduleMeetingDialogProps {
  student: Student;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSchedule: (studentId: string, date: Date, time: string, notes: string) => void;
}

const ScheduleMeetingDialog: React.FC<ScheduleMeetingDialogProps> = ({
  student,
  open,
  onOpenChange,
  onSchedule,
}) => {
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");

  const timeSlots = [
    "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
    "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM"
  ];

  const handleSchedule = () => {
    if (!date || !time) {
      toast({
        title: "Missing information",
        description: "Please select both a date and time for the meeting.",
        variant: "destructive",
      });
      return;
    }

    onSchedule(student.id, date, time, notes);
    resetForm();
  };

  const resetForm = () => {
    setDate(undefined);
    setTime("");
    setNotes("");
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      if (!isOpen) resetForm();
      onOpenChange(isOpen);
    }}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Schedule Meeting with {student.name}</DialogTitle>
          <DialogDescription>
            Select a date and time for your meeting with the student.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="date">Date</Label>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              disabled={(date) => {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                return date < today || date.getDay() === 0 || date.getDay() === 6;
              }}
              initialFocus
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="time">Time</Label>
            <Select value={time} onValueChange={setTime}>
              <SelectTrigger id="time" className="w-full">
                <SelectValue placeholder="Select a time slot" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((slot) => (
                  <SelectItem key={slot} value={slot}>
                    {slot}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="notes">Meeting Notes (Optional)</Label>
            <Input
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any meeting agenda or notes"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSchedule}>
            Schedule Meeting
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleMeetingDialog;
