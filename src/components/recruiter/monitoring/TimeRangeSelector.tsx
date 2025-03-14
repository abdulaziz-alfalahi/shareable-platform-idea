
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface TimeRangeSelectorProps {
  timeRange: string;
  setTimeRange: (value: string) => void;
}

const TimeRangeSelector: React.FC<TimeRangeSelectorProps> = ({ 
  timeRange, 
  setTimeRange 
}) => {
  return (
    <Select value={timeRange} onValueChange={setTimeRange}>
      <SelectTrigger className="w-[150px]">
        <SelectValue placeholder="Select time range" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="1m">Last Month</SelectItem>
        <SelectItem value="3m">Last 3 Months</SelectItem>
        <SelectItem value="6m">Last 6 Months</SelectItem>
        <SelectItem value="1y">Last Year</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default TimeRangeSelector;
