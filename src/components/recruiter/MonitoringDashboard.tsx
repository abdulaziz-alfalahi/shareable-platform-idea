
import React, { useState } from "react";
import { Users, Briefcase, Calendar, UserCheck } from "lucide-react";
import DashboardHeader from "./monitoring/DashboardHeader";
import StatCards from "./monitoring/StatCards";
import DashboardTabs from "./monitoring/DashboardTabs";
import { 
  interviewData, 
  candidateStatusData, 
  vacancyData, 
  advisorySessionsData, 
  userGrowthData,
  statsCards as statsCardsData
} from "./monitoring/mockData";

const MonitoringDashboard = () => {
  const [timeRange, setTimeRange] = useState("6m");

  // Map the icon strings to actual icon components
  const statsCards = statsCardsData.map(card => ({
    ...card,
    icon: card.icon === "Users" ? <Users className="h-8 w-8 text-blue-500" /> :
          card.icon === "Briefcase" ? <Briefcase className="h-8 w-8 text-purple-500" /> :
          card.icon === "Calendar" ? <Calendar className="h-8 w-8 text-green-500" /> :
          <UserCheck className="h-8 w-8 text-emerald-500" />
  }));

  return (
    <div className="space-y-6">
      <DashboardHeader timeRange={timeRange} setTimeRange={setTimeRange} />

      {/* Stats Cards */}
      <StatCards stats={statsCards} />

      {/* Charts */}
      <DashboardTabs 
        interviewData={interviewData}
        candidateStatusData={candidateStatusData}
        vacancyData={vacancyData}
        advisorySessionsData={advisorySessionsData}
        userGrowthData={userGrowthData}
      />
    </div>
  );
};

export default MonitoringDashboard;
