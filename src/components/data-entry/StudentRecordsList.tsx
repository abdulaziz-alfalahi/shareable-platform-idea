
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/toast";
import { StudentRecord } from "./types";
import StudentListControls from "./StudentListControls";
import StudentRecordsTable from "./StudentRecordsTable";
import { supabase } from "@/integrations/supabase/client";

const StudentRecordsList = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<keyof StudentRecord>("lastUpdated");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [students, setStudents] = useState<StudentRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch student records from Supabase
  useEffect(() => {
    const fetchStudentRecords = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('student_records')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;

        // Transform the data to match our StudentRecord type
        const transformedData: StudentRecord[] = data.map(record => ({
          id: record.student_id,
          name: record.student_name,
          school: record.school || 'Not specified',
          grade: record.grade || 'Not specified',
          lastUpdated: record.updated_at,
          status: "verified" as const // Default status
        }));

        setStudents(transformedData);
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

    fetchStudentRecords();
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
        // Delete from Supabase
        const { error } = await supabase
          .from('student_records')
          .delete()
          .eq('student_id', studentId);

        if (error) throw error;

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

  const handleExport = () => {
    // Export functionality could be expanded to generate CSV/Excel files
    const exportData = filteredStudents.map(({ id, name, school, grade, lastUpdated, status }) => ({
      ID: id,
      Name: name,
      School: school,
      Grade: grade,
      'Last Updated': new Date(lastUpdated).toLocaleDateString(),
      Status: status
    }));

    const csvContent = "data:text/csv;charset=utf-8," + 
      Object.keys(exportData[0]).join(",") + "\n" +
      exportData.map(row => Object.values(row).join(",")).join("\n");

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
