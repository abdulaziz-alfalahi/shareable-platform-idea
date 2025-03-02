
import React from "react";
import StatCard from "@/components/admin/StatCard";
import UserTypeTable from "@/components/admin/UserTypeTable";
import TimeSeriesChart from "@/components/admin/TimeSeriesChart";
import { AdminDashboardData } from "@/types/admin";

interface OverviewTabProps {
  adminDashboardData: AdminDashboardData;
  interviewsData: any[];
}

const OverviewTab: React.FC<OverviewTabProps> = ({ 
  adminDashboardData,
  interviewsData
}) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard metric={adminDashboardData.totalStudents} />
        <StatCard metric={adminDashboardData.totalRecruiters} />
        <StatCard metric={adminDashboardData.totalVacancies} />
        <StatCard metric={adminDashboardData.totalInternships} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <UserTypeTable userData={adminDashboardData.usersByType} />
        <TimeSeriesChart
          title="Platform Growth"
          description="New user registrations over time"
          data={adminDashboardData.registrationsOverTime}
          className="col-span-1"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TimeSeriesChart
          title="Platform Engagement"
          description="Active users over time"
          data={adminDashboardData.activeUsersOverTime}
        />
        <TimeSeriesChart
          title="Interview Activity"
          data={interviewsData}
          colors={['#2c4a2e', '#6b9e76']}
          labels={['Scheduled', 'Completed']}
        />
      </div>
    </>
  );
};

export default OverviewTab;
