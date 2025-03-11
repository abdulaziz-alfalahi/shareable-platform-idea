
import React from "react";
import { Input } from "@/components/ui/input";
import { Search, BookOpen } from "lucide-react";
import { Student } from "@/types/student";
import { enrollInTraining, TrainingRecommendation } from "@/utils/career/skillGapAnalysis";
import TrainingCard from "./TrainingCard";

interface TrainingProgramsTabProps {
  searchTerm: string;
  searchResults: TrainingRecommendation[];
  onSearchTermChange: (term: string) => void;
  isEnrolling: boolean;
  enrollingId: string | null;
  setIsEnrolling: (isEnrolling: boolean) => void;
  setEnrollingId: (id: string | null) => void;
  student: Student;
}

const TrainingProgramsTab: React.FC<TrainingProgramsTabProps> = ({
  searchTerm,
  searchResults,
  onSearchTermChange,
  isEnrolling,
  enrollingId,
  setIsEnrolling,
  setEnrollingId,
  student
}) => {
  // Handle enrollment in a training program
  const handleEnroll = async (trainingId: string, trainingTitle: string) => {
    setIsEnrolling(true);
    setEnrollingId(trainingId);
    
    try {
      await enrollInTraining(student.id, trainingId, trainingTitle);
    } finally {
      setIsEnrolling(false);
      setEnrollingId(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search for training programs..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => onSearchTermChange(e.target.value)}
        />
      </div>
      
      {searchTerm.length > 2 ? (
        searchResults.length > 0 ? (
          <div className="space-y-3 mt-4">
            {searchResults.map(training => (
              <TrainingCard
                key={training.id}
                training={training}
                onEnroll={handleEnroll}
                isEnrolling={isEnrolling}
                enrollingId={enrollingId}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Search className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
            <h3 className="text-lg font-medium">No Results Found</h3>
            <p className="text-muted-foreground">
              Try different keywords or browse all training programs.
            </p>
          </div>
        )
      ) : (
        <div className="text-center py-8">
          <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
          <h3 className="text-lg font-medium">Search for Training Programs</h3>
          <p className="text-muted-foreground">
            Enter a skill or keyword to find relevant training programs.
          </p>
        </div>
      )}
    </div>
  );
};

export default TrainingProgramsTab;
