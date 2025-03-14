
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface VacancyData {
  month: string;
  open: number;
  filled: number;
}

interface VacanciesTabProps {
  vacancyData: VacancyData[];
}

const VacanciesTab: React.FC<VacanciesTabProps> = ({ 
  vacancyData 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <Card>
        <CardHeader>
          <CardTitle>Vacancy Trends</CardTitle>
          <CardDescription>Open vs. filled positions over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={vacancyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="open" 
                  stroke="#8884d8" 
                  name="Open Positions" 
                  activeDot={{ r: 8 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="filled" 
                  stroke="#82ca9d" 
                  name="Filled Positions" 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="space-y-1">
            <CardTitle>Vacancy Metrics</CardTitle>
            <CardDescription>Key performance indicators for job vacancies</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <div>
              <h4 className="text-sm font-medium mb-3">Vacancy Distribution by Type</h4>
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                  <p className="text-sm flex-1">Full-time</p>
                  <p className="text-sm font-medium">65%</p>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                  <p className="text-sm flex-1">Part-time</p>
                  <p className="text-sm font-medium">15%</p>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-purple-500 mr-2"></div>
                  <p className="text-sm flex-1">Contract</p>
                  <p className="text-sm font-medium">12%</p>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-orange-500 mr-2"></div>
                  <p className="text-sm flex-1">Remote</p>
                  <p className="text-sm font-medium">8%</p>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-3">Time-to-Fill Statistics (Days)</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-100 rounded-lg p-3">
                  <p className="text-xs text-gray-500">Average</p>
                  <p className="text-xl font-bold">38</p>
                </div>
                <div className="bg-gray-100 rounded-lg p-3">
                  <p className="text-xs text-gray-500">Median</p>
                  <p className="text-xl font-bold">32</p>
                </div>
                <div className="bg-gray-100 rounded-lg p-3">
                  <p className="text-xs text-gray-500">Tech Roles</p>
                  <p className="text-xl font-bold">45</p>
                </div>
                <div className="bg-gray-100 rounded-lg p-3">
                  <p className="text-xs text-gray-500">Non-Tech</p>
                  <p className="text-xl font-bold">30</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VacanciesTab;
