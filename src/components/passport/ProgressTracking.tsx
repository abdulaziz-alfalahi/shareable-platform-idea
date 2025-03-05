
import React, { useState } from 'react';
import { useCareerProgress } from '@/hooks/useCareerProgress';
import { Student } from '@/types/student';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Trophy, Award, Calendar, CheckCircle } from 'lucide-react';
import ProgressTrackingTable from './ProgressTrackingTable';

interface ProgressTrackingProps {
  student: Student;
}

const ProgressTracking: React.FC<ProgressTrackingProps> = ({ student }) => {
  const [skillsProgress, setSkillsProgress] = useState(student.skillsProgress || 0);
  const [workshopProgress, setWorkshopProgress] = useState(25);
  const [assessmentProgress, setAssessmentProgress] = useState(50);
  
  const { trackServiceProgress, checkAndAwardMilestone } = useCareerProgress({ 
    student 
  });
  
  // Sample progress items for the table
  const progressItems = [
    {
      id: "skills-101",
      category: "Skills",
      title: "Digital Marketing Fundamentals",
      progress: skillsProgress,
      lastUpdated: "2023-05-15",
      nextMilestone: "Complete Assessment",
      status: skillsProgress === 100 ? 'Completed' : 'In Progress'
    },
    {
      id: "workshop-202",
      category: "Workshop",
      title: "Leadership Workshop",
      progress: workshopProgress,
      lastUpdated: "2023-06-10",
      nextMilestone: "Group Presentation",
      status: workshopProgress === 100 ? 'Completed' : 'In Progress'
    },
    {
      id: "assessment-303",
      category: "Assessment",
      title: "Technical Skills Assessment",
      progress: assessmentProgress,
      lastUpdated: "2023-07-22",
      nextMilestone: "Final Submission",
      status: assessmentProgress === 100 ? 'Completed' : 'In Progress'
    },
    {
      id: "training-404",
      category: "Training",
      title: "Project Management Certification",
      progress: 10,
      lastUpdated: "2023-08-05",
      nextMilestone: "Module 1 Completion",
      status: 'Not Started'
    }
  ];
  
  const handleProgressUpdate = async (serviceId: string, progress: number, setProgressFn: React.Dispatch<React.SetStateAction<number>>) => {
    setProgressFn(progress);
    
    // Track the progress in our system
    trackServiceProgress(serviceId, progress);
    
    // Get service type from ID
    const serviceType = serviceId.split('-')[0].charAt(0).toUpperCase() + serviceId.split('-')[0].slice(1);
    
    // Check if this update triggers a milestone achievement
    if (progress === 100) {
      const awarded = await checkAndAwardMilestone(serviceType, progress);
      if (awarded) {
        // The notification is handled in the checkMilestones function
      }
    }
  };
  
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-amber-500" />
            Progress Tracking
          </CardTitle>
          <CardDescription>
            Track your progress toward career milestones and see where you're headed next
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProgressTrackingTable progressItems={progressItems} />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-emerald-500" />
            Test Controls - Update Progress
          </CardTitle>
          <CardDescription>
            Use these controls to simulate progress updates and trigger achievements
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <div className="flex justify-between mb-2">
              <span className="font-medium">Digital Marketing Skills</span>
              <span className="text-sm">{skillsProgress}%</span>
            </div>
            <div className="flex gap-4 items-center">
              <div className="flex-1">
                <Slider 
                  value={[skillsProgress]} 
                  onValueChange={(values) => setSkillsProgress(values[0])}
                  max={100}
                  step={10}
                />
              </div>
              <Button 
                size="sm"
                onClick={() => handleProgressUpdate('skills-101', skillsProgress, setSkillsProgress)}
              >
                Update
              </Button>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <span className="font-medium">Leadership Workshop</span>
              <span className="text-sm">{workshopProgress}%</span>
            </div>
            <div className="flex gap-4 items-center">
              <div className="flex-1">
                <Slider 
                  value={[workshopProgress]} 
                  onValueChange={(values) => setWorkshopProgress(values[0])}
                  max={100}
                  step={10}
                />
              </div>
              <Button 
                size="sm"
                onClick={() => handleProgressUpdate('workshop-202', workshopProgress, setWorkshopProgress)}
              >
                Update
              </Button>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <span className="font-medium">Technical Assessment</span>
              <span className="text-sm">{assessmentProgress}%</span>
            </div>
            <div className="flex gap-4 items-center">
              <div className="flex-1">
                <Slider 
                  value={[assessmentProgress]} 
                  onValueChange={(values) => setAssessmentProgress(values[0])}
                  max={100}
                  step={10}
                />
              </div>
              <Button 
                size="sm"
                onClick={() => handleProgressUpdate('assessment-303', assessmentProgress, setAssessmentProgress)}
              >
                Update
              </Button>
            </div>
          </div>
          
          <div className="p-4 border rounded-md bg-amber-50 mt-4">
            <div className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-amber-500 mt-0.5" />
              <div>
                <h4 className="font-medium">How to earn stamps</h4>
                <p className="text-sm text-muted-foreground">
                  Complete your progress to 100% to earn new passport stamps. Different activities award different types of stamps.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressTracking;
