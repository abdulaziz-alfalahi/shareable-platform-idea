
import React from 'react';
import { Student } from '@/types/student';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { useCareerProgress } from '@/hooks/useCareerProgress';
import { notifyInfo } from '@/utils/notification';

interface ProgressTrackingProps {
  student: Student;
  serviceId: string;
  serviceName: string;
  currentProgress: number;
}

const ProgressTracking: React.FC<ProgressTrackingProps> = ({ 
  student, 
  serviceId, 
  serviceName, 
  currentProgress 
}) => {
  const { 
    trackServiceProgress, 
    loading, 
    checkAndAwardMilestone 
  } = useCareerProgress(student.id);

  const handleProgressUpdate = async (increment: number) => {
    // Calculate new progress (capped at 100%)
    const newProgress = Math.min(currentProgress + increment, 100);
    
    // Track the progress
    trackServiceProgress(serviceId, newProgress);
    
    // Check if milestone achieved
    const achieved = await checkAndAwardMilestone(
      student.id, 
      newProgress, 
      serviceName
    );
    
    if (!achieved && newProgress >= 90) {
      notifyInfo({
        title: "Almost There!",
        description: `You're at ${newProgress}% in ${serviceName}. Keep going!`
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{serviceName} Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Current Progress</span>
              <span>{currentProgress}%</span>
            </div>
            <Progress 
              value={currentProgress} 
              className="h-2.5"
              // UAE-inspired green progress indicator
              indicatorStyle={{
                background: 'linear-gradient(to right, #2c4a2e, #4a7c31)',
              }}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleProgressUpdate(5)}
              disabled={loading || currentProgress >= 100}
            >
              +5% Progress
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleProgressUpdate(10)}
              disabled={loading || currentProgress >= 100}
            >
              +10% Progress
            </Button>
          </div>
          
          {currentProgress >= 100 && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-md text-sm text-green-800">
              Congratulations! You've completed this milestone.
            </div>
          )}
          
          {currentProgress >= 90 && currentProgress < 100 && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-md text-sm text-amber-800">
              You're almost there! Keep going to earn your stamp.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressTracking;
