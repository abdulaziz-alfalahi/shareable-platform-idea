
import React, { useState } from "react";
import { Users, Briefcase, Calendar, UserCheck } from "lucide-react";
import DashboardHeader from "./monitoring/DashboardHeader";
import { 
  interviewData, 
  candidateStatusData, 
  vacancyData, 
  advisorySessionsData, 
  userGrowthData,
  statsCards as statsCardsData
} from "./monitoring/mockData";
import { UaeStatCard } from "@/components/ui/uae";
import DashboardTabs from "./monitoring/DashboardTabs";
import { UaeDecoContainer, UaeDivider } from "@/components/ui/uae";
import { ErrorBoundary } from "@/components/ui/error-boundary";

const MonitoringDashboard = () => {
  const [timeRange, setTimeRange] = useState("6m");
  
  console.log("MonitoringDashboard rendering");

  // Map the icon strings to actual icon components
  // Ensure trend is strictly typed as "up" | "down"
  const statsCards = statsCardsData.map(card => ({
    ...card,
    icon: card.icon === "Users" ? <Users className="h-8 w-8 text-blue-500" /> :
          card.icon === "Briefcase" ? <Briefcase className="h-8 w-8 text-purple-500" /> :
          card.icon === "Calendar" ? <Calendar className="h-8 w-8 text-green-500" /> :
          <UserCheck className="h-8 w-8 text-emerald-500" />,
    trend: card.trend as "up" | "down" // Ensure trend is properly typed
  }));

  return (
    <ErrorBoundary>
      <UaeDecoContainer 
        variant="desert" 
        decoration="pattern" 
        patternUrl="https://www.transparenttextures.com/patterns/arabesque.png"
        className="space-y-6"
      >
        <DashboardHeader timeRange={timeRange} setTimeRange={setTimeRange} />

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {statsCards.map((stat, index) => (
            <UaeStatCard
              key={index}
              variant="desert"
              title={stat.title}
              value={stat.value}
              change={stat.change}
              trend={stat.trend}
              icon={stat.icon}
              description={stat.description}
            />
          ))}
        </div>

        <UaeDivider variant="gradient" />

        {/* Charts */}
        <DashboardTabs 
          interviewData={interviewData}
          candidateStatusData={candidateStatusData}
          vacancyData={vacancyData}
          advisorySessionsData={advisorySessionsData}
          userGrowthData={userGrowthData}
        />
      </UaeDecoContainer>
    </ErrorBoundary>
  );
};

export default MonitoringDashboard;
