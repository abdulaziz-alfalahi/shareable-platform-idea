
import React from "react";
import { Calendar, CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Student } from "@/types/student";

interface MeetingScheduleProps {
  student: Student;
  formatDate: (dateString: string) => string;
}

const MeetingSchedule: React.FC<MeetingScheduleProps> = ({ student, formatDate }) => {
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
        
        <Button variant="outline" className="w-full">
          <Calendar className="mr-1 h-4 w-4" /> Schedule New Meeting
        </Button>
      </div>
    </div>
  );
};

export default MeetingSchedule;
