import React from "react";
import StatCard from "@/components/admin/StatCard";
import AgeDistributionChart from "@/components/admin/AgeDistributionChart";
import TopListTable from "@/components/admin/TopListTable";
import TimeSeriesChart from "@/components/admin/TimeSeriesChart";
import PlacementMetrics from "@/components/admin/PlacementMetrics";
import SkillGapInsightsCard from "@/components/admin/SkillGapInsightsCard";
import CareerInsightsChart from "@/components/admin/CareerInsightsChart";
import { AdminDashboardData } from "@/types/admin";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { UserRound, Users } from "lucide-react";
import JobseekersCard from "@/components/admin/JobseekersCard";

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

  // Gender distribution data
  const genderDistributionData = [
    { name: "Male", value: 58, color: "#3b82f6" },
    { name: "Female", value: 42, color: "#ec4899" }
  ];

  // Render the gender distribution chart
  const renderGenderDistribution = () => {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Gender Distribution</CardTitle>
          <CardDescription>
            Enrollment by gender
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={genderDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {genderDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Percentage']}
                />
                <Legend
                  verticalAlign="bottom"
                  align="center"
                  layout="horizontal"
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Male Students</p>
                <p className="text-2xl font-bold">2,324</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-pink-500 mr-2"></div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Female Students</p>
                <p className="text-2xl font-bold">1,680</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard metric={adminDashboardData.totalStudents} />
        <StatCard metric={adminDashboardData.totalAdvisors} />
        <StatCard metric={adminDashboardData.totalParents} />
        <StatCard metric={adminDashboardData.totalJobseekers} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="md:col-span-1">
          {renderGenderDistribution()}
        </div>
        <AgeDistributionChart data={adminDashboardData.studentsByAgeGroup} />
        <TopListTable
          title="Top Educational Paths"
          data={adminDashboardData.topEducationalPaths}
          columns={pathColumns}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <TimeSeriesChart
          title="Student Engagement"
          description="Active students over time"
          data={adminDashboardData.activeUsersOverTime}
        />
        <JobseekersCard data={adminDashboardData.jobseekersByCategory} />
      </div>

      <h3 className="text-xl font-semibold mt-8 mb-4">Career & Skills Analytics</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SkillGapInsightsCard data={skillGapData} />
        <CareerInsightsChart />
      </div>
    </>
  );
};

export default StudentsTab;
