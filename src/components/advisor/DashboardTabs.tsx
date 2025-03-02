
import React from "react";
import { User, BarChart2, FileText } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StudentList from "@/components/advisor/StudentList";
import AnalyticsSection from "@/components/advisor/AnalyticsSection";
import ReportsSection from "@/components/advisor/ReportsSection";
import DashboardFilters from "@/components/advisor/DashboardFilters";
import { Student } from "@/types/student";
import { getStatusBadgeVariant, getRiskBadgeVariant, formatDate } from "@/utils/advisorUtils";

interface DashboardTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  riskFilter: string;
  setRiskFilter: (risk: string) => void;
  students: Student[];
  performanceData: any;
  onViewStudent: (student: Student) => void;
  onAddFeedback: (student: Student) => void;
  onAddGoal: (student: Student) => void;
}

const DashboardTabs: React.FC<DashboardTabsProps> = ({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  riskFilter,
  setRiskFilter,
  students,
  performanceData,
  onViewStudent,
  onAddFeedback,
  onAddGoal,
}) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-1 md:grid-cols-3">
        <TabsTrigger value="students">
          <User className="mr-2 h-4 w-4" /> Student Management
        </TabsTrigger>
        <TabsTrigger value="analytics">
          <BarChart2 className="mr-2 h-4 w-4" /> Analytics
        </TabsTrigger>
        <TabsTrigger value="reports">
          <FileText className="mr-2 h-4 w-4" /> Reports
        </TabsTrigger>
      </TabsList>

      <TabsContent value="students" className="mt-6">
        {activeTab === "students" && (
          <>
            <DashboardFilters 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              riskFilter={riskFilter}
              setRiskFilter={setRiskFilter}
            />
            
            <StudentList 
              students={students}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              riskFilter={riskFilter}
              setRiskFilter={setRiskFilter}
              onViewStudent={onViewStudent}
              onAddFeedback={onAddFeedback}
              onAddGoal={onAddGoal}
              getStatusBadgeVariant={getStatusBadgeVariant}
              getRiskBadgeVariant={getRiskBadgeVariant}
              formatDate={formatDate}
            />
          </>
        )}
      </TabsContent>

      <TabsContent value="analytics" className="mt-6">
        <AnalyticsSection performanceData={performanceData} />
      </TabsContent>

      <TabsContent value="reports" className="mt-6">
        <ReportsSection />
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabs;
