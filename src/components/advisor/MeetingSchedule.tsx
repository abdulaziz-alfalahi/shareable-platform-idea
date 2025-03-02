import React, { useState } from "react";
import { format } from "date-fns";
import { Calendar, CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Student } from "@/types/student";
import ScheduleMeetingDialog from "./ScheduleMeetingDialog";
import { useToast } from "@/hooks/use-toast";

interface MeetingScheduleProps {
  student: Student;
  formatDate: (dateString: string) => string;
}

const MeetingSchedule: React.FC<MeetingScheduleProps> = ({ student, formatDate }) => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handleScheduleMeeting = (studentId: string, date: Date, time: string, notes: string) => {
    // In a real application, this would call an API to save the meeting
    console.log("Scheduling meeting:", { studentId, date, time, notes });
    
    // Show success toast
    toast({
      title: "Meeting scheduled",
      description: `Meeting with ${student.name} scheduled for ${format(date, "MMMM d, yyyy")} at ${time}.`,
    });
    
    setOpen(false);
  };

  return (
    <div>
      <h3 className="font-medium">Meeting Schedule</h3>
      <div className="mt-2 space-y-3">
        <div className="border rounded-md p-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              <div>
                <div className="font-medium">Last Meeting</div>
                <div className="text-sm text-muted-foreground">
                  {formatDate(student.lastMeeting)}
                </div>
              </div>
            </div>
            <CheckCircle className="h-5 w-5 text-green-500" />
          </div>
        </div>
        
        <div className="border rounded-md p-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              <div>
                <div className="font-medium">Next Meeting</div>
                <div className="text-sm text-muted-foreground">
                  {formatDate(student.nextMeeting)}
                </div>
              </div>
            </div>
            <Clock className="h-5 w-5 text-blue-500" />
          </div>
        </div>
        
        <Button variant="outline" className="w-full" onClick={() => setOpen(true)}>
          <Calendar className="mr-1 h-4 w-4" /> Schedule New Meeting
        </Button>
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
