
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { TimeSeriesData } from "@/types/admin";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Legend 
} from "recharts";

interface TimeSeriesChartProps {
  title: string;
  description?: string;
  data: TimeSeriesData[] | TimeSeriesData[][];
  colors?: string[];
  labels?: string[];
  className?: string;
}

const TimeSeriesChart: React.FC<TimeSeriesChartProps> = ({ 
  title, 
  description, 
  data, 
  colors = ['#2c4a2e'],
  labels = ['Value'],
  className 
}) => {
  const isMultiSeries = Array.isArray(data[0]);
  
  // Prepare data for multi-series charts
  const chartData = isMultiSeries 
    ? (data[0] as TimeSeriesData[]).map((item, i) => {
        const dataPoint: any = { date: item.date };
        (data as TimeSeriesData[][]).forEach((series, seriesIndex) => {
          dataPoint[labels[seriesIndex]] = series[i]?.value;
        });
        return dataPoint;
      })
    : data;

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="date" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => value.toLocaleString()}
              />
              <Tooltip
                formatter={(value) => [value.toLocaleString(), '']}
              />
              {isMultiSeries ? (
                <>
                  {labels.map((label, index) => (
                    <Line
                      key={label}
                      type="monotone"
                      dataKey={label}
                      stroke={colors[index % colors.length]}
                      strokeWidth={2}
                      dot={{ r: 3 }}
                      activeDot={{ r: 5 }}
                    />
                  ))}
                  <Legend />
                </>
              ) : (
                <Line
                  type="monotone"
                  dataKey="value"
                  name={labels[0]}
                  stroke={colors[0]}
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default TimeSeriesChart;
