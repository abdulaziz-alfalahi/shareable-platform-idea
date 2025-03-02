
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartData } from "@/types/admin";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer 
} from "recharts";

interface JobApplicationsChartProps {
  data: ChartData[];
}

const JobApplicationsChart: React.FC<JobApplicationsChartProps> = ({ data }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Job Applications Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="name" 
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => value.toLocaleString()}
              />
              <Tooltip
                formatter={(value) => [`${value.toLocaleString()} applications`, '']}
              />
              <Bar 
                dataKey="value" 
                fill="#2c4a2e" 
                barSize={40}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobApplicationsChart;
