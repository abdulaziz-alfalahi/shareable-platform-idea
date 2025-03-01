
import React from "react";
import { Star, Calendar, Clock, CheckCircle, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Student, StudentGoal, StudentFeedback } from "@/types/student";

interface StudentDetailProps {
  student: Student | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onAddFeedback: (student: Student) => void;
  onAddGoal: (student: Student) => void;
  getStatusBadgeVariant: (status: string) => string;
  getRiskBadgeVariant: (risk: string) => string;
  formatDate: (dateString: string) => string;
}

const StudentDetail: React.FC<StudentDetailProps> = ({
  student,
  isOpen,
  onOpenChange,
  onAddFeedback,
  onAddGoal,
  getStatusBadgeVariant,
  getRiskBadgeVariant,
  formatDate
}) => {
  if (!student) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Student Profile: {student.name}</DialogTitle>
          <DialogDescription>
            Comprehensive view of student's academic progress and advising history
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          <div className="md:col-span-1">
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Program Details</h3>
                <div className="mt-1 space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Program:</span>
                    <span>{student.program}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Year:</span>
                    <span>{student.year}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">GPA:</span>
                    <span>{student.gpa}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <Badge variant={getStatusBadgeVariant(student.advisingStatus) as any}>
                      {student.advisingStatus}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Risk Level:</span>
                    <Badge variant={getRiskBadgeVariant(student.riskLevel) as any}>
                      {student.riskLevel}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Career Path:</span>
                    <span>{student.careerPath}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium">Progress</h3>
                <div className="mt-1">
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Overall Progress</span>
                    <span>{student.progress}%</span>
                  </div>
                  <Progress value={student.progress} className="h-2 mb-2" />
                  <div className="text-sm text-center">
                    {student.coursesCompleted} of {student.totalCourses} courses completed
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium">Achievements</h3>
                <div className="mt-1 space-y-1">
                  {student.achievements.map((achievement: string, index: number) => (
                    <div key={index} className="flex items-center text-sm">
                      <Star className="mr-2 h-4 w-4 text-yellow-500" />
                      {achievement}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium">Advising Notes</h3>
                <div className="mt-1 p-3 bg-muted rounded-md text-sm">
                  {student.notes}
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">Goals</h3>
                <div className="space-y-3">
                  {student.goals.map((goal: StudentGoal) => (
                    <div key={goal.id} className="border rounded-md p-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{goal.title}</h4>
                          <div className="text-sm text-muted-foreground">
                            Deadline: {formatDate(goal.deadline)}
                          </div>
                        </div>
                        <Badge variant={
                          goal.status === "Completed" ? "default" :
                          goal.status === "In Progress" ? "outline" : "secondary"
                        }>
                          {goal.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={() => onAddGoal(student)}
                  >
                    <Plus className="mr-1 h-4 w-4" /> Add New Goal
                  </Button>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium mb-2">Feedback History</h3>
                <div className="space-y-3">
                  {student.feedback.map((feedback: StudentFeedback) => (
                    <div key={feedback.id} className="border rounded-md p-3">
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="outline">{feedback.type} Feedback</Badge>
                        <span className="text-sm text-muted-foreground">
                          {formatDate(feedback.date)}
                        </span>
                      </div>
                      <p className="text-sm mb-1">{feedback.content}</p>
                      <div className="text-xs text-muted-foreground">
                        Provided by: {feedback.advisor}
                      </div>
                    </div>
                  ))}
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={() => onAddFeedback(student)}
                  >
                    <Plus className="mr-1 h-4 w-4" /> Add New Feedback
                  </Button>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium">Meeting Schedule</h3>
                <div className="mt-2 space-y-3">
                  <div className="border rounded-md p-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4" />
                        <div>
                          <div className="font-medium">Last Meeting</div>
                          <div className="text-sm text-muted-foreground">
                            {formatDate(student.lastMeeting)}
                          </div>
                        </div>
                      </div>
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                  </div>
                  
                  <div className="border rounded-md p-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4" />
                        <div>
                          <div className="font-medium">Next Meeting</div>
                          <div className="text-sm text-muted-foreground">
                            {formatDate(student.nextMeeting)}
                          </div>
                        </div>
                      </div>
                      <Clock className="h-5 w-5 text-blue-500" />
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    <Calendar className="mr-1 h-4 w-4" /> Schedule New Meeting
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StudentDetail;
