
import React from "react";
import { Student, CareerMilestone } from "@/types/student";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Calendar, BadgeCheck } from "lucide-react";
import { useCareerProgress } from "@/hooks/useCareerProgress";

interface MilestonesTabProps {
  student: Student;
}

const MilestonesTab: React.FC<MilestonesTabProps> = ({ student }) => {
  // Use the career progress hook to potentially track and award milestones
  const { stamps, loading } = useCareerProgress(student.id);
  
  // Get milestones from the student object
  const milestones = student.careerMilestones || [];
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-AE', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  return (
    <div className="space-y-6">
      <Card className="border-emirati-sandBeige/50">
        <CardHeader className="pb-3 border-b border-emirati-sandBeige/20">
          <CardTitle className="text-2xl font-bold text-emirati-desertRed flex items-center">
            <Trophy className="h-6 w-6 mr-2 text-emirati-oasisGreen" />
            Career Milestones
          </CardTitle>
          <CardDescription>
            Track your progress and achievements throughout your career journey
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          {loading ? (
            <div className="flex justify-center py-8">
              <p className="text-muted-foreground">Loading milestones...</p>
            </div>
          ) : milestones.length > 0 ? (
            <div className="space-y-6">
              {milestones.map((milestone: CareerMilestone) => (
                <div 
                  key={milestone.id}
                  className="flex items-start p-4 rounded-lg border border-emirati-sandBeige/30 bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="bg-emirati-oasisGreen/10 p-3 rounded-full mr-4">
                    <BadgeCheck className="h-6 w-6 text-emirati-oasisGreen" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-emirati-desertRed">{milestone.title}</h3>
                    <p className="text-muted-foreground mt-1">{milestone.description}</p>
                    <div className="flex items-center mt-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>Achieved on {formatDate(milestone.dateAchieved)}</span>
                      <span className="ml-3 px-2 py-0.5 bg-emirati-oasisGreen/10 text-emirati-oasisGreen rounded-full">
                        +{milestone.points} points
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 px-4 border border-dashed border-emirati-sandBeige/50 rounded-lg">
              <Trophy className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium text-emirati-desertRed mb-2">No Milestones Yet</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                You haven't reached any career milestones yet. Complete activities, join workshops, and apply for opportunities to earn your first milestone.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MilestonesTab;
