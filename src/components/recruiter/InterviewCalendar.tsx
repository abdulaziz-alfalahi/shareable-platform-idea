
import React, { useState } from "react";
import { addDays, format, startOfWeek, addWeeks, subWeeks, isSameDay, isWithinInterval } from "date-fns";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Sample interview data
// In a real application, this would come from your backend
const SAMPLE_INTERVIEWS = [
  {
    id: 1,
    candidateName: "Sarah Johnson",
    position: "UI/UX Designer",
    date: new Date(2023, 11, 5, 10, 0),
    duration: 60, // in minutes
    status: "scheduled"
  },
  {
    id: 2,
    candidateName: "Mohammed Al Farsi",
    position: "Data Scientist",
    date: new Date(2023, 11, 7, 14, 30),
    duration: 45,
    status: "scheduled"
  },
  {
    id: 3,
    candidateName: "Priya Sharma",
    position: "Software Engineer",
    date: new Date(2023, 11, 8, 11, 0),
    duration: 60,
    status: "scheduled"
  },
  {
    id: 4,
    candidateName: "Alex Wong",
    position: "Project Manager",
    date: new Date(2023, 11, 12, 15, 0),
    duration: 45,
    status: "scheduled"
  }
];

interface InterviewCalendarProps {
  onScheduleInterview: () => void;
}

const InterviewCalendar: React.FC<InterviewCalendarProps> = ({ onScheduleInterview }) => {
  const [date, setDate] = useState<Date>(new Date());
  const [calendarView, setCalendarView] = useState<boolean>(false);
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(
    startOfWeek(new Date(), { weekStartsOn: 1 })
  );

  const timeSlots = [
    "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", 
    "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", 
    "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
    "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM"
  ];

  const daysOfWeek = Array.from({ length: 5 }, (_, i) => 
    addDays(currentWeekStart, i)
  );

  const handlePreviousWeek = () => {
    setCurrentWeekStart(subWeeks(currentWeekStart, 1));
  };

  const handleNextWeek = () => {
    setCurrentWeekStart(addWeeks(currentWeekStart, 1));
  };

  const getInterviewsForDay = (day: Date) => {
    return SAMPLE_INTERVIEWS.filter(interview => 
      isSameDay(interview.date, day)
    );
  };

  const getInterviewsForTimeSlot = (day: Date, timeSlot: string) => {
    const [hourStr, minuteStr] = timeSlot.split(':');
    const isPM = timeSlot.includes('PM');
    let hour = parseInt(hourStr);
    
    if (isPM && hour !== 12) hour += 12;
    if (!isPM && hour === 12) hour = 0;
    
    const minute = parseInt(minuteStr);
    
    const startTime = new Date(day);
    startTime.setHours(hour, minute, 0, 0);
    
    const endTime = new Date(startTime);
    endTime.setMinutes(endTime.getMinutes() + 30);
    
    return SAMPLE_INTERVIEWS.filter(interview => {
      const interviewEnd = new Date(interview.date);
      interviewEnd.setMinutes(interviewEnd.getMinutes() + interview.duration);
      
      return isWithinInterval(startTime, {
        start: interview.date,
        end: interviewEnd
      }) || isWithinInterval(interview.date, {
        start: startTime,
        end: endTime
      });
    });
  };

  return (
    <div className="space-y-4">
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
                onSelect={(newDate) => {
                  if (newDate) {
                    setDate(newDate);
                    setCurrentWeekStart(startOfWeek(newDate, { weekStartsOn: 1 }));
                    setCalendarView(false);
                  }
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Button onClick={onScheduleInterview}>Schedule Interview</Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle>Week of {format(currentWeekStart, "MMMM d, yyyy")}</CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={handlePreviousWeek}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleNextWeek}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-6 gap-4">
            {/* First column is for time slots */}
            <div className="space-y-4 pt-10">
              {timeSlots.map((time, idx) => (
                <div key={idx} className="h-16 flex items-center justify-end pr-2 text-sm text-muted-foreground">
                  {time}
                </div>
              ))}
            </div>
            
            {/* Days of the week */}
            {daysOfWeek.map((day, dayIdx) => (
              <div key={dayIdx} className="space-y-4">
                <div className="text-center p-2 font-medium border-b">
                  <div>{format(day, "EEE")}</div>
                  <div className="text-xl">{format(day, "d")}</div>
                </div>
                
                {timeSlots.map((time, timeIdx) => {
                  const interviews = getInterviewsForTimeSlot(day, time);
                  return (
                    <div 
                      key={timeIdx} 
                      className={`h-16 border rounded-md p-1 ${interviews.length > 0 ? 'bg-primary/10' : ''}`}
                    >
                      {interviews.map((interview) => (
                        <div 
                          key={interview.id}
                          className="text-xs p-1 bg-primary text-primary-foreground rounded truncate"
                          title={`${interview.candidateName} - ${interview.position}`}
                        >
                          {format(interview.date, "h:mm a")} {interview.candidateName}
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Upcoming Interviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {SAMPLE_INTERVIEWS.slice(0, 5).map((interview) => (
              <div key={interview.id} className="flex items-center justify-between border-b pb-3">
                <div>
                  <div className="font-medium">{interview.candidateName}</div>
                  <div className="text-sm text-muted-foreground">{interview.position}</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-sm">
                    {format(interview.date, "PPP")} at {format(interview.date, "h:mm a")}
                  </div>
                  <Badge>{interview.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InterviewCalendar;
