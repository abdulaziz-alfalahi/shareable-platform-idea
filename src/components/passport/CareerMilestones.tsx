
import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Trophy, 
  Milestone, 
  Target, 
  Flag, 
  Map, 
  ArrowRight 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Student, CareerMilestone } from "@/types/student";
import { Separator } from "@/components/ui/separator";

interface CareerMilestonesProps {
  student: Student;
  showRecommendations?: boolean;
}

// Sample AI-driven recommendations based on student profile
const getRecommendations = (student: Student) => {
  const recommendations = [
    {
      id: 1,
      title: "Complete Technical Assessment",
      description: "Demonstrate your coding skills through our technical assessment",
      points: 100,
      match: "High"
    },
    {
      id: 2,
      title: "Join Industry Workshop",
      description: "Attend our upcoming workshop on AI in Business",
      points: 75,
      match: "Medium"
    },
    {
      id: 3,
      title: "Update Your Resume",
      description: "Use our resume builder to create a professional resume",
      points: 50,
      match: "High"
    }
  ];

  return recommendations.slice(0, 3); // Return top 3 recommendations
};

const CareerMilestones: React.FC<CareerMilestonesProps> = ({ 
  student, 
  showRecommendations = true 
}) => {
  const recommendations = getRecommendations(student);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-2xl font-bold text-primary">Career Journey</CardTitle>
        <CardDescription>Track your milestones and plan your next steps</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Career milestones timeline */}
        {student.careerMilestones.length > 0 ? (
          <div className="relative pl-8 pb-4 space-y-6 before:absolute before:left-3.5 before:top-0 before:h-full before:w-0.5 before:bg-muted">
            {student.careerMilestones.map((milestone, index) => (
              <div key={milestone.id} className="relative">
                <div className="absolute -left-8 mt-1.5 h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                  <Trophy className="h-3 w-3 text-primary-foreground" />
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-start justify-between">
                    <h3 className="font-medium">{milestone.title}</h3>
                    <span className="text-sm text-muted-foreground bg-muted px-2 py-0.5 rounded">
                      +{milestone.points} pts
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{milestone.description}</p>
                  <p className="text-xs text-muted-foreground">{milestone.dateAchieved}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <Map className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
            <h3 className="text-lg font-medium">Start your journey</h3>
            <p className="text-muted-foreground mt-1">
              Your career milestones will appear here as you progress
            </p>
          </div>
        )}

        {/* AI-driven recommendations */}
        {showRecommendations && (
          <>
            <Separator className="my-6" />
            <div>
              <h3 className="text-lg font-semibold mb-3">Recommended Next Steps</h3>
              <div className="space-y-4">
                {recommendations.map((rec) => (
                  <div 
                    key={rec.id} 
                    className="border rounded-lg p-4 space-y-2 hover:border-primary transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium">{rec.title}</h4>
                      <span className="text-xs bg-muted px-2 py-0.5 rounded">
                        Match: {rec.match}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{rec.description}</p>
                    <div className="flex justify-between items-center pt-1">
                      <span className="text-xs text-muted-foreground">
                        +{rec.points} points on completion
                      </span>
                      <Button variant="outline" size="sm" className="h-7 text-xs">
                        Get Started <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default CareerMilestones;
