
import React from "react";
import { format } from "date-fns";
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

interface CalendarHeaderProps {
  date: Date;
  setDate: (date: Date) => void;
  currentWeekStart: Date;
  handlePreviousWeek: () => void;
  handleNextWeek: () => void;
  onScheduleInterview: () => void;
  calendarView: boolean;
  setCalendarView: (open: boolean) => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  date,
  setDate,
  currentWeekStart,
  handlePreviousWeek,
  handleNextWeek,
  onScheduleInterview,
  calendarView,
  setCalendarView
}) => {
  const handleDateSelect = (newDate: Date | undefined) => {
    console.log("Calendar date selected in header:", newDate);
    if (newDate) {
      setDate(newDate);
      setTimeout(() => {
        setCalendarView(false);
      }, 100);
    }
  };

  return (
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold">Interview Schedule</h2>
      <div className="flex items-center gap-2">
        <Popover open={calendarView} onOpenChange={setCalendarView}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="gap-2">
              <CalendarIcon className="h-4 w-4" />
              {format(date, "PPP")}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateSelect}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <Button onClick={onScheduleInterview}>Schedule Interview</Button>
      </div>
    </div>
  );
};

export default CalendarHeader;
