
import React from "react";
import StatCard from "@/components/admin/StatCard";
import AgeDistributionChart from "@/components/admin/AgeDistributionChart";
import TopListTable from "@/components/admin/TopListTable";
import TimeSeriesChart from "@/components/admin/TimeSeriesChart";
import PlacementMetrics from "@/components/admin/PlacementMetrics";
import SkillGapInsightsCard from "@/components/admin/SkillGapInsightsCard";
import CareerInsightsChart from "@/components/admin/CareerInsightsChart";
import { AdminDashboardData } from "@/types/admin";

interface StudentsTabProps {
  adminDashboardData: AdminDashboardData;
  pathColumns: any[];
}

const StudentsTab: React.FC<StudentsTabProps> = ({ 
  adminDashboardData,
  pathColumns
}) => {
  // Sample skill gap data for the new component
  const skillGapData = [
    { skill: "AI & Machine Learning", demandScore: 85, supplyScore: 42, gap: 43, trend: "increasing" as const, sector: "Technology" },
    { skill: "Cybersecurity", demandScore: 92, supplyScore: 55, gap: 37, trend: "increasing" as const, sector: "Technology" },
    { skill: "Data Analysis", demandScore: 78, supplyScore: 48, gap: 30, trend: "stable" as const, sector: "Business" },
    { skill: "Digital Marketing", demandScore: 72, supplyScore: 45, gap: 27, trend: "increasing" as const, sector: "Marketing" },
    { skill: "UX/UI Design", demandScore: 65, supplyScore: 40, gap: 25, trend: "stable" as const, sector: "Design" },
    { skill: "Blockchain", demandScore: 55, supplyScore: 32, gap: 23, trend: "increasing" as const, sector: "Technology" },
    { skill: "Project Management", demandScore: 70, supplyScore: 52, gap: 18, trend: "decreasing" as const, sector: "Management" }
  ];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard metric={adminDashboardData.totalStudents} />
        <StatCard metric={adminDashboardData.totalAdvisors} />
        <StatCard metric={adminDashboardData.totalParents} />
        <StatCard metric={adminDashboardData.totalInternships} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <AgeDistributionChart data={adminDashboardData.studentsByAgeGroup} />
        <TopListTable
          title="Top Educational Paths"
          data={adminDashboardData.topEducationalPaths}
          columns={pathColumns}
          className="col-span-2"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <TimeSeriesChart
          title="Student Engagement"
          description="Active students over time"
          data={adminDashboardData.activeUsersOverTime}
        />
        <PlacementMetrics
          placementRate={adminDashboardData.placementRate}
          averageTimeToHire={adminDashboardData.averageTimeToHire}
        />
      </div>

      {/* New skill insights section */}
      <h3 className="text-xl font-semibold mt-8 mb-4">Career & Skills Analytics</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SkillGapInsightsCard data={skillGapData} />
        <CareerInsightsChart />
      </div>
    </>
  );
};

export default StudentsTab;
