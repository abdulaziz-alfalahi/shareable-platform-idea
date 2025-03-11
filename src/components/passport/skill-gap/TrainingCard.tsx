
import React from "react";
import { Button } from "@/components/ui/button";
import { Clock, GraduationCap, Globe, Users, LayoutGrid } from "lucide-react";
import { TrainingRecommendation } from "@/utils/career/skillGapAnalysis";

interface TrainingCardProps {
  training: TrainingRecommendation;
  onEnroll: (trainingId: string, trainingTitle: string) => void;
  isEnrolling: boolean;
  enrollingId: string | null;
}

const TrainingCard: React.FC<TrainingCardProps> = ({ 
  training, 
  onEnroll,
  isEnrolling,
  enrollingId
}) => {
  // Get format icon
  const getFormatIcon = (format: 'online' | 'in-person' | 'hybrid'): React.ReactNode => {
    switch (format) {
      case 'online': return <Globe className="h-4 w-4" />;
      case 'in-person': return <Users className="h-4 w-4" />;
      case 'hybrid': return <LayoutGrid className="h-4 w-4" />;
    }
  };
  
  return (
    <div 
      className="border rounded-lg p-4 hover:border-primary/40 transition-colors"
    >
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-medium">{training.title}</h4>
          <p className="text-sm text-muted-foreground">{training.provider}</p>
          
          <div className="flex flex-wrap gap-2 mt-2">
            <div className="text-xs flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {training.duration}
            </div>
            <div className="text-xs flex items-center gap-1">
              <GraduationCap className="h-3.5 w-3.5" />
              {training.level.charAt(0).toUpperCase() + training.level.slice(1)}
            </div>
            <div className="text-xs flex items-center gap-1">
              {getFormatIcon(training.format)}
              {training.format.charAt(0).toUpperCase() + training.format.slice(1)}
            </div>
          </div>
        </div>
        
        <Button 
          size="sm" 
          className="whitespace-nowrap"
          onClick={() => onEnroll(training.id, training.title)}
          disabled={isEnrolling}
        >
          {isEnrolling && enrollingId === training.id ? "Enrolling..." : "Enroll"}
        </Button>
      </div>
    </div>
  );
};

export default TrainingCard;
