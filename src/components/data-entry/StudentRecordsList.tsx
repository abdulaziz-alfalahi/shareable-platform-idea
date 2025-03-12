
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/toast";
import { StudentRecord } from "./types";
import StudentListControls from "./StudentListControls";
import StudentRecordsTable from "./StudentRecordsTable";
import { fetchStudentRecords, deleteStudentRecord, exportStudentRecordsToCSV } from "@/utils/dataEntryService";

const StudentRecordsList = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<keyof StudentRecord>("lastUpdated");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [students, setStudents] = useState<StudentRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch student records from database
  useEffect(() => {
    const loadStudentRecords = async () => {
      try {
        setIsLoading(true);
        const result = await fetchStudentRecords();

        if (!result.success) {
          throw new Error(result.error);
        }

        setStudents(result.data);
      } catch (error) {
        console.error("Error fetching student records:", error);
        toast({
          title: "Could not load student records",
          description: "There was a problem fetching the student data.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadStudentRecords();
  }, [toast]);

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
    // In a complete implementation, this would navigate to an edit form or open a modal
  };

  const handleDelete = async (studentId: string, studentName: string) => {
    if (window.confirm(`Are you sure you want to delete the record for ${studentName}?`)) {
      try {
        const result = await deleteStudentRecord(studentId);
        
        if (!result.success) {
          throw new Error(result.error);
        }

        // Update local state
        setStudents(prev => prev.filter(student => student.id !== studentId));
        
        toast({
          title: "Record Deleted",
          description: `Student record for ${studentName} has been deleted.`,
        });
      } catch (error) {
        console.error("Error deleting student record:", error);
        toast({
          title: "Error deleting record",
          description: "There was a problem deleting the student record.",
          variant: "destructive"
        });
      }
    }
  };

  const handleExport = async () => {
    try {
      const result = await exportStudentRecordsToCSV();
      
      if (!result.success) {
        throw new Error(result.error);
      }
      
      const csvContent = "data:text/csv;charset=utf-8," + result.data;
      const encodedUri = encodeURI(csvContent);
      
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "student_records.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: "Records Exported",
        description: "Student records have been exported as CSV.",
      });
    } catch (error) {
      console.error("Error exporting student records:", error);
      toast({
        title: "Export Failed",
        description: "There was a problem exporting the student records.",
        variant: "destructive"
      });
    }
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
          
          {isLoading ? (
            <div className="py-10 text-center">
              <p className="text-gray-500">Loading student records...</p>
            </div>
          ) : filteredStudents.length === 0 ? (
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
