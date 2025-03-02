
import React from "react";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SAMPLE_INTERVIEWS } from "@/utils/interviewUtils";

const UpcomingInterviews: React.FC = () => {
  return (
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
  );
};

export default UpcomingInterviews;
