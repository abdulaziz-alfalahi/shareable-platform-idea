
import React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";

interface DatePickerFieldProps {
  date: Date | undefined;
  onDateSelect: (date: Date | undefined) => void;
  calendarOpen: boolean;
  setCalendarOpen: (open: boolean) => void;
}

const DatePickerField: React.FC<DatePickerFieldProps> = ({
  date,
  onDateSelect,
  calendarOpen,
  setCalendarOpen,
}) => {
  return (
    <div className="grid gap-2">
      <Label htmlFor="date">Date</Label>
      <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
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
            onSelect={onDateSelect}
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
  );
};

export default DatePickerField;
