
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/toast";
import { StudentRecord } from "./types";
import { mockStudents } from "./mockData";
import StudentListControls from "./StudentListControls";
import StudentRecordsTable from "./StudentRecordsTable";

const StudentRecordsList = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<keyof StudentRecord>("lastUpdated");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [students, setStudents] = useState<StudentRecord[]>(mockStudents);

  const handleSort = (field: keyof StudentRecord) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedStudents = [...students].sort((a, b) => {
    if (a[sortField] < b[sortField]) return sortDirection === "asc" ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const filteredStudents = sortedStudents.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.school.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (studentId: string) => {
    toast({
      title: "Edit Student Record",
      description: `Opening editor for student ${studentId}`,
    });
  };

  const handleDelete = (studentId: string, studentName: string) => {
    if (window.confirm(`Are you sure you want to delete the record for ${studentName}?`)) {
      setStudents(prev => prev.filter(student => student.id !== studentId));
      
      toast({
        title: "Record Deleted",
        description: `Student record for ${studentName} has been deleted.`,
      });
    }
  };

  const handleExport = () => {
    toast({
      title: "Exporting Records",
      description: "Student records are being prepared for download.",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Manage Student Records</CardTitle>
          <CardDescription>
            View, search, edit, and manage all student data entries in the system.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <StudentListControls 
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onExport={handleExport}
          />
          
          {filteredStudents.length === 0 ? (
            <div className="py-10 text-center">
              <p className="text-gray-500">No student records match your search criteria.</p>
            </div>
          ) : (
            <StudentRecordsTable 
              students={filteredStudents}
              sortField={sortField}
              sortDirection={sortDirection}
              onSort={handleSort}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
          
          <div className="mt-4 text-sm text-gray-500">
            Showing {filteredStudents.length} of {students.length} records
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentRecordsList;
