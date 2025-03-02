
import React from "react";
import StatCard from "@/components/admin/StatCard";
import AgeDistributionChart from "@/components/admin/AgeDistributionChart";
import TopListTable from "@/components/admin/TopListTable";
import TimeSeriesChart from "@/components/admin/TimeSeriesChart";
import PlacementMetrics from "@/components/admin/PlacementMetrics";
import { AdminDashboardData } from "@/types/admin";

interface StudentsTabProps {
  adminDashboardData: AdminDashboardData;
  pathColumns: any[];
}

const StudentsTab: React.FC<StudentsTabProps> = ({ 
  adminDashboardData,
  pathColumns
}) => {
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
    </>
  );
};

export default StudentsTab;
