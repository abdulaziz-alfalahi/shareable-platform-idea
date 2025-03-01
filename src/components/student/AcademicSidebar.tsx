
import React from "react";
import { Calendar, Clock, CheckCircle, Star } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Student } from "@/types/student";
import { formatDate } from "@/utils/advisorUtils";

interface AcademicSidebarProps {
  student: Student;
}

const AcademicSidebar: React.FC<AcademicSidebarProps> = ({ student }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Program Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Program</span>
                <span className="font-medium">{student.program}</span>
              </div>
              <Separator className="my-2" />
              
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Year</span>
                <span className="font-medium">{student.year}</span>
              </div>
              <Separator className="my-2" />
              
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">GPA</span>
                <span className="font-medium">{student.gpa}</span>
              </div>
              <Separator className="my-2" />
              
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Career Path</span>
                <span className="font-medium">{student.careerPath}</span>
              </div>
            </div>

            <div className="pt-2">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">Degree Progress</span>
                <span className="text-sm font-medium">{student.progress}%</span>
              </div>
              <Progress value={student.progress} className="h-2 mb-1" />
              <div className="text-xs text-center text-muted-foreground">
                {student.coursesCompleted} of {student.totalCourses} courses completed
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Achievements</CardTitle>
        </CardHeader>
        <CardContent>
          {student.achievements.length > 0 ? (
            <div className="space-y-2">
              {student.achievements.map((achievement, index) => (
                <div key={index} className="flex items-start">
                  <Star className="mr-2 h-4 w-4 mt-1 text-yellow-500 flex-shrink-0" />
                  <span>{achievement}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4 text-muted-foreground">
              No achievements recorded yet
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Meetings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border rounded-md p-3">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">Last Meeting</div>
                  <div className="text-sm text-muted-foreground">
                    {formatDate(student.lastMeeting)}
                  </div>
                </div>
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
            </div>
            
            <div className="border rounded-md p-3">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">Next Meeting</div>
                  <div className="text-sm text-muted-foreground">
                    {formatDate(student.nextMeeting)}
                  </div>
                </div>
                <Clock className="h-5 w-5 text-blue-500" />
              </div>
            </div>
            
            <Button variant="outline" className="w-full">
              <Calendar className="mr-1 h-4 w-4" /> Schedule New Meeting
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AcademicSidebar;
