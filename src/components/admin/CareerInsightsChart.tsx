
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  ChartContainer, 
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from "@/components/ui/chart";
import { HeatmapChart } from "recharts";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Legend, Area, AreaChart
} from "recharts";

interface CareerInsightsChartProps {
  className?: string;
}

const CareerInsightsChart: React.FC<CareerInsightsChartProps> = ({ className }) => {
  // Sample data for skill demand trends
  const skillDemandData = [
    { month: "Jan", AI: 85, Cybersecurity: 92, DataScience: 78, CloudComputing: 65, Blockchain: 42 },
    { month: "Feb", AI: 88, Cybersecurity: 90, DataScience: 82, CloudComputing: 68, Blockchain: 45 },
    { month: "Mar", AI: 92, Cybersecurity: 93, DataScience: 85, CloudComputing: 72, Blockchain: 48 },
    { month: "Apr", AI: 98, Cybersecurity: 95, DataScience: 88, CloudComputing: 75, Blockchain: 52 },
    { month: "May", AI: 105, Cybersecurity: 98, DataScience: 92, CloudComputing: 79, Blockchain: 55 },
    { month: "Jun", AI: 115, Cybersecurity: 102, DataScience: 96, CloudComputing: 84, Blockchain: 59 },
  ];

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Skill Demand Trends</CardTitle>
        <CardDescription>
          Top in-demand skills in the UAE job market (index: 100 = average demand)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={skillDemandData}>
              <defs>
                <linearGradient id="colorAI" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0.2}/>
                </linearGradient>
                <linearGradient id="colorCyber" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.2}/>
                </linearGradient>
                <linearGradient id="colorData" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ffc658" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#ffc658" stopOpacity={0.2}/>
                </linearGradient>
                <linearGradient id="colorCloud" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ff8042" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#ff8042" stopOpacity={0.2}/>
                </linearGradient>
                <linearGradient id="colorBlockchain" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0088FE" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#0088FE" stopOpacity={0.2}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" />
              <YAxis 
                domain={[0, 120]} 
                axisLine={false}
                tickLine={false}
              />
              <Tooltip 
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-background border border-border p-2 rounded shadow-md">
                        <p className="font-medium">{label}</p>
                        {payload.map((entry, index) => (
                          <p key={index} className="text-sm" style={{ color: entry.color }}>
                            {entry.name}: {entry.value}
                          </p>
                        ))}
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="AI" 
                stroke="#8884d8" 
                fillOpacity={1} 
                fill="url(#colorAI)" 
                stackId="1"
                name="AI & Machine Learning"
              />
              <Area 
                type="monotone" 
                dataKey="Cybersecurity" 
                stroke="#82ca9d" 
                fillOpacity={1}
                fill="url(#colorCyber)" 
                stackId="2"
                name="Cybersecurity"
              />
              <Area 
                type="monotone" 
                dataKey="DataScience" 
                stroke="#ffc658" 
                fillOpacity={1}
                fill="url(#colorData)" 
                stackId="3"
                name="Data Science"
              />
              <Area 
                type="monotone" 
                dataKey="CloudComputing" 
                stroke="#ff8042" 
                fillOpacity={1}
                fill="url(#colorCloud)" 
                stackId="4"
                name="Cloud Computing"
              />
              <Area 
                type="monotone" 
                dataKey="Blockchain" 
                stroke="#0088FE" 
                fillOpacity={1}
                fill="url(#colorBlockchain)" 
                stackId="5"
                name="Blockchain"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default CareerInsightsChart;
