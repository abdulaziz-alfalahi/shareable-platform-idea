
import React, { useState } from "react";
import { addDays, startOfWeek, addWeeks, subWeeks } from "date-fns";
import CalendarHeader from "./CalendarHeader";
import WeeklyCalendar from "./WeeklyCalendar";
import UpcomingInterviews from "./UpcomingInterviews";

interface InterviewCalendarProps {
  onScheduleInterview: () => void;
}

const InterviewCalendar: React.FC<InterviewCalendarProps> = ({ onScheduleInterview }) => {
  const [date, setDate] = useState<Date>(new Date());
  const [calendarView, setCalendarView] = useState<boolean>(false);
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(
    startOfWeek(new Date(), { weekStartsOn: 1 })
  );

  const daysOfWeek = Array.from({ length: 5 }, (_, i) => 
    addDays(currentWeekStart, i)
  );

  const handlePreviousWeek = () => {
    setCurrentWeekStart(subWeeks(currentWeekStart, 1));
  };

  const handleNextWeek = () => {
    setCurrentWeekStart(addWeeks(currentWeekStart, 1));
  };

  return (
    <div className="space-y-4">
      <CalendarHeader 
        date={date}
        setDate={setDate}
        currentWeekStart={currentWeekStart}
        handlePreviousWeek={handlePreviousWeek}
        handleNextWeek={handleNextWeek}
        onScheduleInterview={onScheduleInterview}
        calendarView={calendarView}
        setCalendarView={setCalendarView}
      />

      <WeeklyCalendar 
        currentWeekStart={currentWeekStart}
        daysOfWeek={daysOfWeek}
        handlePreviousWeek={handlePreviousWeek}
        handleNextWeek={handleNextWeek}
      />

      <UpcomingInterviews />
    </div>
  );
};

export default InterviewCalendar;
