
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, Legend, Cell } from "recharts";

// Since HeatmapChart doesn't exist in recharts, we'll use ScatterChart instead
// which is better suited for the visualization we need

const data = [
  { x: 1, y: 1, z: 10, name: "Software Development" },
  { x: 1, y: 2, z: 8, name: "Data Science" },
  { x: 1, y: 3, z: 6, name: "Cybersecurity" },
  { x: 1, y: 4, z: 5, name: "UI/UX Design" },
  
  { x: 2, y: 1, z: 7, name: "Cloud Engineering" },
  { x: 2, y: 2, z: 9, name: "DevOps" },
  { x: 2, y: 3, z: 4, name: "Project Management" },
  { x: 2, y: 4, z: 3, name: "Digital Marketing" },
  
  { x: 3, y: 1, z: 6, name: "AI & Machine Learning" },
  { x: 3, y: 2, z: 5, name: "Blockchain" },
  { x: 3, y: 3, z: 8, name: "Mobile Development" },
  { x: 3, y: 4, z: 7, name: "Business Analysis" },
  
  { x: 4, y: 1, z: 4, name: "Content Creation" },
  { x: 4, y: 2, z: 3, name: "Product Management" },
  { x: 4, y: 3, z: 5, name: "Quality Assurance" },
  { x: 4, y: 4, z: 2, name: "Network Administration" },
];

const COLORS = [
  '#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', 
  '#a4de6c', '#d0ed57', '#ffc658', '#ff8c00',
  '#ff7300', '#ff5d00', '#ff4500', '#ff3300',
  '#ff1a00', '#ff0000', '#cc0000', '#990000'
];

const CareerInsightsChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Career Field Insights</CardTitle>
        <CardDescription>Demand and growth projections across career fields</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart
              margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
              }}
            >
              <CartesianGrid />
              <XAxis 
                type="number" 
                dataKey="x" 
                name="Growth" 
                domain={[0, 5]} 
                tickCount={5}
                tickFormatter={(value) => {
                  const labels = ["", "Low", "Moderate", "High", "Very High"];
                  return labels[value] || "";
                }}
              />
              <YAxis 
                type="number" 
                dataKey="y" 
                name="Demand" 
                domain={[0, 5]}
                tickCount={5}
                tickFormatter={(value) => {
                  const labels = ["", "Low", "Moderate", "High", "Very High"];
                  return labels[value] || "";
                }}
              />
              <ZAxis 
                type="number" 
                dataKey="z" 
                range={[100, 500]} 
                name="Market Size" 
              />
              <Tooltip 
                cursor={{ strokeDasharray: '3 3' }} 
                formatter={(value, name, props) => {
                  if (name === "Market Size") return [value, name];
                  if (name === "name") return [value, "Field"];
                  return [value, name];
                }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-white p-2 border rounded shadow">
                        <p className="font-bold">{data.name}</p>
                        <p>Growth: {["Low", "Moderate", "High", "Very High"][data.x]}</p>
                        <p>Demand: {["Low", "Moderate", "High", "Very High"][data.y]}</p>
                        <p>Market Size: {data.z}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend />
              <Scatter name="Career Fields" data={data}>
                {
                  data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))
                }
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default CareerInsightsChart;
