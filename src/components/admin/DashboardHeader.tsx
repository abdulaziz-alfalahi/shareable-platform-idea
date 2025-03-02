
import React from "react";
import { LayoutDashboard } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import NotificationsPanel from "./NotificationsPanel";

interface DashboardHeaderProps {
  timeRange: string;
  setTimeRange: (value: string) => void;
  showNotificationsPanel: boolean;
  setShowNotificationsPanel: (show: boolean) => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  timeRange,
  setTimeRange,
  showNotificationsPanel,
  setShowNotificationsPanel
}) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold flex items-center">
        <LayoutDashboard className="mr-2 h-6 w-6" />
        Administrator Dashboard
      </h1>
      
      <div className="flex items-center space-x-4">
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="month">Last Month</SelectItem>
            <SelectItem value="quarter">Last 3 Months</SelectItem>
            <SelectItem value="halfyear">Last 6 Months</SelectItem>
            <SelectItem value="year">Last Year</SelectItem>
          </SelectContent>
        </Select>

        <NotificationsPanel 
          showNotificationsPanel={showNotificationsPanel}
          setShowNotificationsPanel={setShowNotificationsPanel}
        />
      </div>
    </div>
  );
};

export default DashboardHeader;
