
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from "recharts";

interface InterviewData {
  month: string;
  scheduled: number;
  completed: number;
  canceled: number;
}

interface AdvisoryData {
  month: string;
  sessions: number;
}

interface InterviewsTabProps {
  interviewData: InterviewData[];
  advisorySessionsData: AdvisoryData[];
}

const InterviewsTab: React.FC<InterviewsTabProps> = ({ 
  interviewData,
  advisorySessionsData 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <Card>
        <CardHeader>
          <CardTitle>Interview Trends</CardTitle>
          <CardDescription>Monthly interviews scheduled, completed, and canceled</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={interviewData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="scheduled" fill="#8884d8" name="Scheduled" />
                <Bar dataKey="completed" fill="#82ca9d" name="Completed" />
                <Bar dataKey="canceled" fill="#ff8042" name="Canceled" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Advisory Sessions</CardTitle>
          <CardDescription>Monthly career advisory sessions conducted</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={advisorySessionsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="sessions" 
                  stroke="#8884d8" 
                  fill="#8884d8" 
                  fillOpacity={0.3} 
                  name="Sessions"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InterviewsTab;
