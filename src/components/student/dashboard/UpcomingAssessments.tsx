
import React from "react";

const UpcomingAssessments = () => (
  <div className="rounded-lg border p-4">
    <h3 className="text-lg font-medium mb-4">Upcoming Assessments</h3>
    <div className="space-y-3">
      <div className="flex justify-between items-center p-3 bg-emirati-sandBeige/10 rounded">
        <div>
          <p className="font-medium">Programming Skills Assessment</p>
          <p className="text-sm text-muted-foreground">Due in 3 days</p>
        </div>
        <button className="text-emirati-oasisGreen text-sm font-medium">Prepare</button>
      </div>
      <div className="flex justify-between items-center p-3 bg-emirati-sandBeige/10 rounded">
        <div>
          <p className="font-medium">Technical Interview Practice</p>
          <p className="text-sm text-muted-foreground">Due in 1 week</p>
        </div>
        <button className="text-emirati-oasisGreen text-sm font-medium">Schedule</button>
      </div>
    </div>
  </div>
);

export default UpcomingAssessments;
