
import React from "react";
import { Calendar } from "lucide-react";

interface StudentMeetingsProps {
  lastMeeting: string;
  nextMeeting: string;
  formatDate: (dateString: string) => string;
}

const StudentMeetings: React.FC<StudentMeetingsProps> = ({
  lastMeeting,
  nextMeeting,
  formatDate
}) => {
  return (
    <div className="mt-3 text-sm">
      <div className="flex items-center mb-1">
        <Calendar className="mr-1 h-4 w-4" /> 
        <span className="mr-1 font-medium">Last Meeting:</span> {formatDate(lastMeeting)}
      </div>
      <div className="flex items-center">
        <Calendar className="mr-1 h-4 w-4" /> 
        <span className="mr-1 font-medium">Next Meeting:</span> {formatDate(nextMeeting)}
      </div>
    </div>
  );
};

export default StudentMeetings;
