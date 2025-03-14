
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface UserGrowthData {
  month: string;
  students: number;
  recruiters: number;
  advisors: number;
}

interface GrowthTabProps {
  userGrowthData: UserGrowthData[];
}

const GrowthTab: React.FC<GrowthTabProps> = ({ 
  userGrowthData 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <Card>
        <CardHeader>
          <CardTitle>Platform User Growth</CardTitle>
          <CardDescription>Growth of different user types over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="students" 
                  stackId="1"
                  stroke="#8884d8" 
                  fill="#8884d8" 
                  name="Students"
                />
                <Area 
                  type="monotone" 
                  dataKey="recruiters" 
                  stackId="1"
                  stroke="#82ca9d" 
                  fill="#82ca9d" 
                  name="Recruiters"
                />
                <Area 
                  type="monotone" 
                  dataKey="advisors" 
                  stackId="1"
                  stroke="#ffc658" 
                  fill="#ffc658" 
                  name="Advisors"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Engagement Metrics</CardTitle>
          <CardDescription>Key platform usage statistics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-medium mb-2">Daily Active Users</h4>
              <div className="flex items-center">
                <div className="text-2xl font-bold mr-2">245</div>
                <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">
                  +18.2%
                </span>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2">Average Session Duration</h4>
              <div className="flex items-center">
                <div className="text-2xl font-bold mr-2">14m 32s</div>
                <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">
                  +2.4%
                </span>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2">Interactions per Session</h4>
              <div className="flex items-center">
                <div className="text-2xl font-bold mr-2">8.3</div>
                <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">
                  +5.1%
                </span>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2">Monthly Active Users</h4>
              <div className="flex items-center">
                <div className="text-2xl font-bold mr-2">1,834</div>
                <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">
                  +12.7%
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GrowthTab;
