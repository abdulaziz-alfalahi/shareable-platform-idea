
import React from "react";
import { Clock } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { timeSlots, durations } from "./InterviewFormUtils";

interface TimeAndDurationFieldsProps {
  time: string;
  setTime: (time: string) => void;
  duration: string;
  setDuration: (duration: string) => void;
}

const TimeAndDurationFields: React.FC<TimeAndDurationFieldsProps> = ({
  time,
  setTime,
  duration,
  setDuration,
}) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="grid gap-2">
        <Label htmlFor="time">Time</Label>
        <Select value={time} onValueChange={setTime}>
          <SelectTrigger id="time" className="w-full">
            <SelectValue placeholder="Select time">
              {time ? (
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4" />
                  {time}
                </div>
              ) : (
                "Select time"
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
        <Label htmlFor="duration">Duration</Label>
        <Select value={duration} onValueChange={setDuration}>
          <SelectTrigger id="duration">
            <SelectValue placeholder="Select duration" />
          </SelectTrigger>
          <SelectContent>
            {durations.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default TimeAndDurationFields;
