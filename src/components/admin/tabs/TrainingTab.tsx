
import React from "react";
import StatCard from "@/components/admin/StatCard";
import TopListTable from "@/components/admin/TopListTable";
import TimeSeriesChart from "@/components/admin/TimeSeriesChart";
import { AdminDashboardData } from "@/types/admin";

interface TrainingTabProps {
  adminDashboardData: AdminDashboardData;
  trainingColumns: any[];
}

const TrainingTab: React.FC<TrainingTabProps> = ({ 
  adminDashboardData,
  trainingColumns
}) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard metric={adminDashboardData.totalTrainingCenters} />
        <StatCard metric={adminDashboardData.totalAssessmentCenters} />
        <StatCard metric={{
          id: "programs",
          name: "Active Programs",
          value: 156,
          change: 8.7,
          icon: "GraduationCap"
        }} />
        <StatCard metric={{
          id: "enrollments",
          name: "Enrollments",
          value: 8742,
          change: 12.4,
          icon: "Users"
        }} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TopListTable
          title="Top Training Centers"
          data={adminDashboardData.topTrainingCenters}
          columns={trainingColumns}
        />
        <TimeSeriesChart
          title="Training Enrollments"
          description="Monthly training program enrollments"
          data={adminDashboardData.registrationsOverTime}
        />
      </div>
    </>
  );
};

export default TrainingTab;
