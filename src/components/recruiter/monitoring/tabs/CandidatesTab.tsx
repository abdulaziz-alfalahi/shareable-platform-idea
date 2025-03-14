
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface CandidateStatus {
  name: string;
  value: number;
  color: string;
}

interface CandidatesTabProps {
  candidateStatusData: CandidateStatus[];
}

const CandidatesTab: React.FC<CandidatesTabProps> = ({ 
  candidateStatusData 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <Card>
        <CardHeader>
          <CardTitle>Candidate Status Distribution</CardTitle>
          <CardDescription>Overview of candidate placement outcomes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={candidateStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {candidateStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} Candidates`, 'Count']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="space-y-1">
            <CardTitle>Candidate Performance</CardTitle>
            <CardDescription>Detailed analytics of candidate placement</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-medium">Placement Success Rate</p>
                <p className="text-sm font-medium">58.9%</p>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: "58.9%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-medium">Interview to Offer Ratio</p>
                <p className="text-sm font-medium">42.3%</p>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: "42.3%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-medium">Offer Acceptance Rate</p>
                <p className="text-sm font-medium">89.7%</p>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 rounded-full" style={{ width: "89.7%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-medium">90-Day Retention</p>
                <p className="text-sm font-medium">94.2%</p>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: "94.2%" }}></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CandidatesTab;
