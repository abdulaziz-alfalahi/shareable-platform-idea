
import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, MessageSquare, CheckCircle, GraduationCap, BookOpen, Award, TrendingUp, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Student } from "@/types/student";

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
        <Card key={student.id} className={`overflow-hidden ${student.flagged ? 'border-red-300' : ''}`}>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center">
                  <h3 className="text-xl font-semibold">{student.name}</h3>
                  {student.flagged && (
                    <Badge variant="destructive" className="ml-2">Flagged</Badge>
                  )}
                </div>
                <div className="flex flex-col md:flex-row md:items-center flex-wrap gap-2 md:gap-4 mt-2 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <GraduationCap className="mr-1 h-4 w-4" /> {student.program}
                  </div>
                  <div className="flex items-center">
                    <BookOpen className="mr-1 h-4 w-4" /> Year {student.year}
                  </div>
                  <div className="flex items-center">
                    <Award className="mr-1 h-4 w-4" /> GPA: {student.gpa}
                  </div>
                  <div className="flex items-center">
                    <TrendingUp className="mr-1 h-4 w-4" /> {student.careerPath}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-3">
                  <Badge variant={getStatusBadgeVariant(student.advisingStatus) as any}>{student.advisingStatus}</Badge>
                  <Badge variant={getRiskBadgeVariant(student.riskLevel) as any}>Risk: {student.riskLevel}</Badge>
                </div>

                <div className="mt-3">
                  <div className="flex items-center justify-between mb-1 text-sm">
                    <span>Progress</span>
                    <span>{student.progress}%</span>
                  </div>
                  <Progress value={student.progress} className="h-2" />
                </div>

                <div className="mt-3 text-sm">
                  <div className="flex items-center mb-1">
                    <Calendar className="mr-1 h-4 w-4" /> 
                    <span className="mr-1 font-medium">Last Meeting:</span> {formatDate(student.lastMeeting)}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="mr-1 h-4 w-4" /> 
                    <span className="mr-1 font-medium">Next Meeting:</span> {formatDate(student.nextMeeting)}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 min-w-[120px]">
                <Button onClick={() => handleViewStudent(student)}>
                  View Profile <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
                <Button variant="outline" onClick={() => onAddFeedback(student)}>
                  <MessageSquare className="mr-1 h-4 w-4" /> Add Feedback
                </Button>
                <Button variant="outline" onClick={() => onAddGoal(student)}>
                  <CheckCircle className="mr-1 h-4 w-4" /> Add Goal
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StudentList;
