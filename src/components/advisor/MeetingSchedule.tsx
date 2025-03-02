
import React, { useState } from "react";
import { format, parseISO, addDays } from "date-fns";
import { Calendar, CheckCircle, Clock, CalendarX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Student } from "@/types/student";
import ScheduleMeetingDialog from "./ScheduleMeetingDialog";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

interface MeetingScheduleProps {
  student: Student;
  formatDate: (dateString: string) => string;
}

const MeetingSchedule: React.FC<MeetingScheduleProps> = ({ student, formatDate }) => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const [meetings, setMeetings] = useState<{
    past: Array<{ date: string; status: "completed" }>;
    upcoming: Array<{ date: string; time: string; status: "upcoming" }>;
  }>({
    past: [{ date: student.lastMeeting, status: "completed" }],
    upcoming: student.nextMeeting ? [{ date: student.nextMeeting, time: "10:00 AM", status: "upcoming" }] : [],
  });

  const handleScheduleMeeting = (studentId: string, date: Date, time: string, notes: string) => {
    // In a real application, this would call an API to save the meeting
    console.log("Scheduling meeting:", { studentId, date, time, notes });
    
    // Update the meetings state with the new meeting
    const newMeeting = {
      date: format(date, "yyyy-MM-dd"),
      time,
      status: "upcoming" as const,
    };
    
    setMeetings(prev => ({
      ...prev,
      upcoming: [...prev.upcoming, newMeeting],
    }));
    
    // Show success toast
    toast({
      title: "Meeting scheduled",
      description: `Meeting with ${student.name} scheduled for ${format(date, "MMMM d, yyyy")} at ${time}.`,
    });
    
    setOpen(false);
  };

  const getMeetingStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "upcoming":
        return <Clock className="h-5 w-5 text-blue-500" />;
      case "canceled":
        return <CalendarX className="h-5 w-5 text-red-500" />;
      default:
        return <Calendar className="h-5 w-5" />;
    }
  };

  const sortedUpcoming = [...meetings.upcoming].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const sortedPast = [...meetings.past].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div>
      <div className="flex justify-between items-center">
        <h3 className="font-medium">Meeting Schedule</h3>
        <Button variant="outline" size="sm" onClick={() => setOpen(true)} className="h-8">
          <Calendar className="mr-1 h-4 w-4" /> Schedule
        </Button>
      </div>
      
      <div className="mt-2 space-y-3">
        {sortedUpcoming.length > 0 ? (
          <>
            <div className="text-sm text-muted-foreground mb-1">Upcoming Meetings</div>
            {sortedUpcoming.map((meeting, index) => (
              <div key={`upcoming-${index}`} className="border rounded-md p-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4" />
                    <div>
                      <div className="font-medium">Meeting</div>
                      <div className="text-sm text-muted-foreground flex items-center">
                        {formatDate(meeting.date)}
                        <Badge variant="outline" className="ml-2 text-xs">
                          {meeting.time}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  {getMeetingStatusIcon(meeting.status)}
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="text-sm text-muted-foreground p-3 border border-dashed rounded-md text-center">
            No upcoming meetings
          </div>
        )}
        
        {sortedPast.length > 0 && (
          <>
            <div className="text-sm text-muted-foreground mt-4 mb-1">Past Meetings</div>
            {sortedPast.map((meeting, index) => (
              <div key={`past-${index}`} className="border rounded-md p-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4" />
                    <div>
                      <div className="font-medium">Meeting</div>
                      <div className="text-sm text-muted-foreground">
                        {formatDate(meeting.date)}
                      </div>
                    </div>
                  </div>
                  {getMeetingStatusIcon(meeting.status)}
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      <ScheduleMeetingDialog
        student={student}
        open={open}
        onOpenChange={setOpen}
        onSchedule={handleScheduleMeeting}
      />
    </div>
  );
};

export default MeetingSchedule;
