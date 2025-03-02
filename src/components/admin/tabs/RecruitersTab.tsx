
import React from "react";
import StatCard from "@/components/admin/StatCard";
import JobApplicationsChart from "@/components/admin/JobApplicationsChart";
import TopListTable from "@/components/admin/TopListTable";
import TimeSeriesChart from "@/components/admin/TimeSeriesChart";
import { AdminDashboardData } from "@/types/admin";

interface RecruitersTabProps {
  adminDashboardData: AdminDashboardData;
  recruiterColumns: any[];
  interviewsData: any[];
}

const RecruitersTab: React.FC<RecruitersTabProps> = ({ 
  adminDashboardData,
  recruiterColumns,
  interviewsData
}) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard metric={adminDashboardData.totalRecruiters} />
        <StatCard metric={adminDashboardData.totalVacancies} />
        <StatCard metric={adminDashboardData.totalInternships} />
        <StatCard metric={{
          id: "placements",
          name: "Successful Placements",
          value: 624,
          change: 14.3,
          icon: "Award"
        }} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <JobApplicationsChart data={adminDashboardData.jobApplicationsStatus} />
        <TopListTable
          title="Top Recruiters"
          data={adminDashboardData.topRecruiters}
          columns={recruiterColumns}
        />
      </div>

      <div className="grid grid-cols-1 gap-6">
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

export default RecruitersTab;
