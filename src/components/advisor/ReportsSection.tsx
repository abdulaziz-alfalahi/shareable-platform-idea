
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ReportsSection: React.FC = () => {
  return (
    <div className="grid grid-cols-1 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Available Reports</CardTitle>
          <CardDescription>Generate and download student reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border rounded-md p-4">
              <h3 className="text-lg font-medium">Student Progress Summary</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Overview of all students' academic progress, goals, and advising status.
              </p>
              <Button>Generate Report</Button>
            </div>
            
            <div className="border rounded-md p-4">
              <h3 className="text-lg font-medium">At-Risk Students</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Detailed report of students needing intervention or additional support.
              </p>
              <Button>Generate Report</Button>
            </div>
            
            <div className="border rounded-md p-4">
              <h3 className="text-lg font-medium">Advising Activity Log</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Summary of all advising sessions, feedback provided, and goals set.
              </p>
              <Button>Generate Report</Button>
            </div>
            
            <div className="border rounded-md p-4">
              <h3 className="text-lg font-medium">Program Completion Forecast</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Projections for program completion rates and graduation timelines.
              </p>
              <Button>Generate Report</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsSection;
