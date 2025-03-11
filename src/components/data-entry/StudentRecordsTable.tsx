
import React from "react";
import { ChevronDown, ChevronUp, Edit, Trash } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import StudentStatusIndicator from "./StudentStatusIndicator";
import { StudentRecord } from "./types";

interface StudentRecordsTableProps {
  students: StudentRecord[];
  sortField: keyof StudentRecord;
  sortDirection: "asc" | "desc";
  onSort: (field: keyof StudentRecord) => void;
  onEdit: (studentId: string) => void;
  onDelete: (studentId: string, studentName: string) => void;
}

const StudentRecordsTable: React.FC<StudentRecordsTableProps> = ({
  students,
  sortField,
  sortDirection,
  onSort,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="border rounded-md overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead 
              className="cursor-pointer hover:bg-muted transition-colors"
              onClick={() => onSort("id")}
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
              onClick={() => onSort("name")}
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
              onClick={() => onSort("lastUpdated")}
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
          {students.map((student) => (
            <TableRow key={student.id}>
              <TableCell className="font-medium">{student.id}</TableCell>
              <TableCell>{student.name}</TableCell>
              <TableCell>{student.school}</TableCell>
              <TableCell>{student.grade}</TableCell>
              <TableCell>{new Date(student.lastUpdated).toLocaleDateString()}</TableCell>
              <TableCell>
                <StudentStatusIndicator status={student.status} />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => onEdit(student.id)}
                    title="Edit record"
                  >
                    <Edit size={16} />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => onDelete(student.id, student.name)}
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
  );
};

export default StudentRecordsTable;
