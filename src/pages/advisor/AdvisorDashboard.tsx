
import React, { useState } from "react";
import DashboardHeader from "@/components/advisor/DashboardHeader";
import DashboardFilters from "@/components/advisor/DashboardFilters";
import StudentList from "@/components/advisor/StudentList";

const AdvisorDashboard: React.FC = () => {
  // State for filters and search
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [yearFilter, setYearFilter] = useState("all");
  const [specialtyFilter, setSpecialtyFilter] = useState("all");
  
  // Mock student data (in a real app, this would come from an API)
  const students = [
    // Add some mock students here
    { id: 1, name: "Ahmed Ali", status: "active", year: "3", specialty: "Computer Science" },
    { id: 2, name: "Fatima Mohammed", status: "inactive", year: "2", specialty: "Business" },
    // Add more as needed
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      <DashboardHeader 
        title="Advisor Dashboard" 
      />
      <DashboardFilters 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        yearFilter={yearFilter}
        setYearFilter={setYearFilter}
        specialtyFilter={specialtyFilter}
        setSpecialtyFilter={setSpecialtyFilter}
      />
      <StudentList 
        students={students}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        yearFilter={yearFilter}
        setYearFilter={setYearFilter}
        specialtyFilter={specialtyFilter}
        setSpecialtyFilter={setSpecialtyFilter}
        onViewStudent={() => {}}
        onScheduleMeeting={() => {}}
        onAddFeedback={() => {}}
      />
    </div>
  );
};

export default AdvisorDashboard;
