
import React from "react";
import TimeRangeSelector from "./TimeRangeSelector";

interface DashboardHeaderProps {
  timeRange: string;
  setTimeRange: (value: string) => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ 
  timeRange, 
  setTimeRange 
}) => {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold">Platform Monitoring Dashboard</h2>
      <TimeRangeSelector timeRange={timeRange} setTimeRange={setTimeRange} />
    </div>
  );
};

export default DashboardHeader;
