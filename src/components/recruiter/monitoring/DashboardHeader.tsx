
import React from "react";
import TimeRangeSelector from "./TimeRangeSelector";
import { UaeCard, UaeCardHeader, UaeCardTitle } from "@/components/ui/uae";

interface DashboardHeaderProps {
  timeRange: string;
  setTimeRange: (value: string) => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ 
  timeRange, 
  setTimeRange 
}) => {
  return (
    <UaeCard variant="oasis" className="mb-6">
      <UaeCardHeader className="flex flex-row items-center justify-between py-4">
        <UaeCardTitle className="text-2xl font-serif text-emirati-oasisGreen">
          Platform Monitoring Dashboard
        </UaeCardTitle>
        <TimeRangeSelector timeRange={timeRange} setTimeRange={setTimeRange} />
      </UaeCardHeader>
    </UaeCard>
  );
};

export default DashboardHeader;
