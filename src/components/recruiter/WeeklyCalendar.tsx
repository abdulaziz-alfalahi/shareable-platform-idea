
import React from "react";
import { format } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TIME_SLOTS, getInterviewsForTimeSlot } from "@/utils/interviewUtils";

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
            {TIME_SLOTS.map((time, idx) => (
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
              
              {TIME_SLOTS.map((time, timeIdx) => {
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
  );
};

export default WeeklyCalendar;
