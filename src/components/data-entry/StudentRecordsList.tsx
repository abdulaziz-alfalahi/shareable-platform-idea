
import React, { useState } from "react";
import { Search, Download, Edit, Trash, ChevronDown, ChevronUp, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/toast";

// Mock data - in a real application, this would come from an API
const mockStudents = [
  {
    id: "ST00123",
    name: "Ahmed Al Mansoori",
    school: "Dubai National School",
    grade: "Grade 11",
    lastUpdated: "2023-06-12",
    status: "verified"
  },
  {
    id: "ST00124",
    name: "Fatima Al Hashimi",
    school: "Abu Dhabi Grammar School",
    grade: "Grade 10",
    lastUpdated: "2023-06-10",
    status: "pending"
  },
  {
    id: "ST00125",
    name: "Mohammed Al Shamsi",
    school: "Sharjah American Academy",
    grade: "Grade 12",
    lastUpdated: "2023-06-08",
    status: "verified"
  },
  {
    id: "ST00126",
    name: "Hessa Al Muhairi",
    school: "Emirates International School",
    grade: "Grade 11",
    lastUpdated: "2023-06-07",
    status: "error"
  },
  {
    id: "ST00127",
    name: "Saeed Al Nuaimi",
    school: "Ras Al Khaimah Academy",
    grade: "Grade 10",
    lastUpdated: "2023-06-05",
    status: "verified"
  },
  {
    id: "ST00128",
    name: "Noora Al Suwaidi",
    school: "Al Ain English Speaking School",
    grade: "Grade 12",
    lastUpdated: "2023-06-03",
    status: "pending"
  },
  {
    id: "ST00129",
    name: "Khalid Al Marzouqi",
    school: "Dubai International Academy",
    grade: "Grade 11",
    lastUpdated: "2023-06-01",
    status: "verified"
  }
];

type StatusType = "verified" | "pending" | "error";

interface StudentRecord {
  id: string;
  name: string;
  school: string;
  grade: string;
  lastUpdated: string;
  status: StatusType;
}

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

  const getStatusIcon = (status: StatusType) => {
    switch (status) {
      case "verified":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "pending":
        return <AlertCircle className="h-5 w-5 text-amber-500" />;
      case "error":
        return <XCircle className="h-5 w-5 text-red-500" />;
    }
  };

  const getStatusLabel = (status: StatusType) => {
    switch (status) {
      case "verified":
        return "Verified";
      case "pending":
        return "Pending Verification";
      case "error":
        return "Data Issues";
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
          <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
            <div className="relative w-full md:w-1/2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Search by name, ID, or school..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={handleExport}
            >
              <Download size={16} />
              Export Records
            </Button>
          </div>
          
          {filteredStudents.length === 0 ? (
            <div className="py-10 text-center">
              <p className="text-gray-500">No student records match your search criteria.</p>
            </div>
          ) : (
            <div className="border rounded-md overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead 
                      className="cursor-pointer hover:bg-muted transition-colors"
                      onClick={() => handleSort("id")}
                    >
                      <div className="flex items-center">
                        Student ID
                        {sortField === "id" && (
                          sortDirection === "asc" ? 
                            <ChevronUp size={16} /> : 
                            <ChevronDown size={16} />
                        )}
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-muted transition-colors"
                      onClick={() => handleSort("name")}
                    >
                      <div className="flex items-center">
                        Name
                        {sortField === "name" && (
                          sortDirection === "asc" ? 
                            <ChevronUp size={16} /> : 
                            <ChevronDown size={16} />
                        )}
                      </div>
                    </TableHead>
                    <TableHead>School</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-muted transition-colors"
                      onClick={() => handleSort("lastUpdated")}
                    >
                      <div className="flex items-center">
                        Last Updated
                        {sortField === "lastUpdated" && (
                          sortDirection === "asc" ? 
                            <ChevronUp size={16} /> : 
                            <ChevronDown size={16} />
                        )}
                      </div>
                    </TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.id}</TableCell>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.school}</TableCell>
                      <TableCell>{student.grade}</TableCell>
                      <TableCell>{new Date(student.lastUpdated).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(student.status)}
                          <span className="text-sm">{getStatusLabel(student.status)}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleEdit(student.id)}
                            title="Edit record"
                          >
                            <Edit size={16} />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleDelete(student.id, student.name)}
                            title="Delete record"
                          >
                            <Trash size={16} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
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
