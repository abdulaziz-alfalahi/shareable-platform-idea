
import React from "react";
import { useNavigate } from "react-router-dom";
import { Student } from "@/types/student";
import StudentCard from "./student-list/StudentCard";

interface StudentListProps {
  students: Student[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  riskFilter: string;
  setRiskFilter: (risk: string) => void;
  onAddFeedback: (student: Student) => void;
  onAddGoal: (student: Student) => void;
  onViewStudent?: (student: Student) => void;
  getStatusBadgeVariant: (status: string) => string;
  getRiskBadgeVariant: (risk: string) => string;
  formatDate: (dateString: string) => string;
}

const StudentList: React.FC<StudentListProps> = ({
  students,
  searchQuery,
  statusFilter,
  riskFilter,
  onAddFeedback,
  onAddGoal,
  onViewStudent,
  getStatusBadgeVariant,
  getRiskBadgeVariant,
  formatDate
}) => {
  const navigate = useNavigate();

  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.program.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "All" || student.advisingStatus === statusFilter;
    const matchesRisk = riskFilter === "All" || student.riskLevel === riskFilter;
    
    return matchesSearch && matchesStatus && matchesRisk;
  });

  const handleViewStudent = (student: Student) => {
    if (onViewStudent) {
      onViewStudent(student);
    } else {
      navigate(`/student/${student.id}`);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      {filteredStudents.map((student) => (
        <StudentCard
          key={student.id}
          student={student}
          onViewStudent={handleViewStudent}
          onAddFeedback={onAddFeedback}
          onAddGoal={onAddGoal}
          getStatusBadgeVariant={getStatusBadgeVariant}
          getRiskBadgeVariant={getRiskBadgeVariant}
          formatDate={formatDate}
        />
      ))}
    </div>
  );
};

export default StudentList;
