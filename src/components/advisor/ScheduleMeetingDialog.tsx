
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

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

    // Convert student.id to string to ensure type compatibility
    onSchedule(student.id.toString(), date, time, notes);
    resetForm();
  };

  const resetForm = () => {
    setDate(undefined);
    setTime("");
    setNotes("");
    setIsCalendarOpen(false);
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    console.log("Meeting date selected:", selectedDate);
    setDate(selectedDate);
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
            <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                  id="date"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Select a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(newDate) => {
                    handleDateSelect(newDate);
                    setIsCalendarOpen(false);
                  }}
                  disabled={(date) => {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    return date < today || date.getDay() === 0 || date.getDay() === 6;
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="time">Time</Label>
            <Select value={time} onValueChange={setTime}>
              <SelectTrigger id="time" className="w-full">
                <SelectValue placeholder="Select a time slot">
                  {time ? (
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4" />
                      {time}
                    </div>
                  ) : (
                    "Select a time slot"
                  )}
                </SelectValue>
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
