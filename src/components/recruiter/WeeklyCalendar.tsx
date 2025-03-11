
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import CalendarHeader from "./calendar/CalendarHeader";
import TimeColumn from "./calendar/TimeColumn";
import DayColumn from "./calendar/DayColumn";

interface WeeklyCalendarProps {
  currentWeekStart: Date;
  daysOfWeek: Date[];
  handlePreviousWeek: () => void;
  handleNextWeek: () => void;
}

const WeeklyCalendar: React.FC<WeeklyCalendarProps> = ({
  currentWeekStart,
  daysOfWeek,
  handlePreviousWeek,
  handleNextWeek
}) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CalendarHeader 
          currentWeekStart={currentWeekStart}
          handlePreviousWeek={handlePreviousWeek}
          handleNextWeek={handleNextWeek}
        />
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-6 gap-4">
          {/* First column is for time slots */}
          <TimeColumn />
          
          {/* Days of the week */}
          {daysOfWeek.map((day, dayIdx) => (
            <DayColumn key={dayIdx} day={day} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeeklyCalendar;
