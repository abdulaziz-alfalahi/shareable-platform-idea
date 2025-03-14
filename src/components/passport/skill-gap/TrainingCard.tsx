
import React from "react";
import { Button } from "@/components/ui/button";
import { Clock, GraduationCap, Globe, Users, LayoutGrid, Calendar } from "lucide-react";
import { TrainingRecommendation } from "@/utils/career/skillGapAnalysis";
import { formatSkillLevel, getTrainingFormatLabel } from "./utils";

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
  
  // Get format color class
  const getFormatColorClass = (format: 'online' | 'in-person' | 'hybrid'): string => {
    switch (format) {
      case 'online': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'in-person': return 'bg-green-100 text-green-700 border-green-200';
      case 'hybrid': return 'bg-purple-100 text-purple-700 border-purple-200';
    }
  };
  
  // Get level color class
  const getLevelColorClass = (level: 'beginner' | 'intermediate' | 'advanced'): string => {
    switch (level) {
      case 'beginner': return 'bg-emirati-sandstone/20 text-emirati-camelBrown';
      case 'intermediate': return 'bg-emirati-desertGold/20 text-emirati-desertGold';
      case 'advanced': return 'bg-emirati-oasisGreen/20 text-emirati-oasisGreen';
    }
  };
  
  return (
    <div 
      className="border rounded-lg p-4 hover:border-emirati-oasisGreen/30 transition-colors hover:shadow-md bg-white"
    >
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-medium text-emirati-deepBrown">{training.title}</h4>
          <p className="text-sm text-muted-foreground">{training.provider}</p>
          
          <div className="flex flex-wrap gap-2 mt-3">
            <div className="text-xs flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full">
              <Clock className="h-3.5 w-3.5" />
              {training.duration}
            </div>
            <div className={`text-xs flex items-center gap-1 px-2 py-1 rounded-full ${getLevelColorClass(training.level)}`}>
              <GraduationCap className="h-3.5 w-3.5" />
              {formatSkillLevel(training.level)}
            </div>
            <div className={`text-xs flex items-center gap-1 px-2 py-1 rounded-full ${getFormatColorClass(training.format)}`}>
              {getFormatIcon(training.format)}
              {getTrainingFormatLabel(training.format)}
            </div>
          </div>
        </div>
        
        <Button 
          size="sm" 
          className="bg-emirati-oasisGreen hover:bg-emirati-oasisGreen/90 whitespace-nowrap"
          onClick={() => onEnroll(training.id, training.title)}
          disabled={isEnrolling}
        >
          {isEnrolling && enrollingId === training.id ? "Enrolling..." : "Enroll Now"}
        </Button>
      </div>
    </div>
  );
};

export default TrainingCard;
