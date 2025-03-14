
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, BookOpen, Filter, X } from "lucide-react";
import { Student } from "@/types/student";
import { 
  enrollInTraining, 
  TrainingRecommendation, 
  getAllTrainingPrograms,
  searchTrainingPrograms 
} from "@/utils/career/skillGapAnalysis";
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
  const [selectedFormat, setSelectedFormat] = useState<"all" | "online" | "in-person" | "hybrid">("all");
  const [selectedLevel, setSelectedLevel] = useState<"all" | "beginner" | "intermediate" | "advanced">("all");
  const [displayResults, setDisplayResults] = useState<TrainingRecommendation[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  
  // Apply filters to search results
  useEffect(() => {
    let results = searchResults.length > 0 ? searchResults : getAllTrainingPrograms();
    
    if (selectedFormat !== "all") {
      results = results.filter(program => program.format === selectedFormat);
    }
    
    if (selectedLevel !== "all") {
      results = results.filter(program => program.level === selectedLevel);
    }
    
    setDisplayResults(results);
  }, [searchResults, selectedFormat, selectedLevel]);
  
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

  // Reset all filters
  const resetFilters = () => {
    setSelectedFormat("all");
    setSelectedLevel("all");
    onSearchTermChange("");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search for training programs..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => onSearchTermChange(e.target.value)}
          />
        </div>
        
        <Button
          variant="outline"
          size="icon"
          onClick={() => setShowFilters(!showFilters)}
          className={showFilters ? "border-emirati-oasisGreen text-emirati-oasisGreen" : ""}
        >
          <Filter className="h-4 w-4" />
        </Button>
        
        {(selectedFormat !== "all" || selectedLevel !== "all" || searchTerm) && (
          <Button
            variant="ghost"
            size="icon"
            onClick={resetFilters}
            title="Clear all filters"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      
      {showFilters && (
        <div className="p-4 bg-emirati-sandstone/10 rounded-lg border border-emirati-sandstone/30 space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-2 text-emirati-deepBrown">Format</h4>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedFormat === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFormat("all")}
                className={selectedFormat === "all" ? "bg-emirati-oasisGreen hover:bg-emirati-oasisGreen/90" : ""}
              >
                All Formats
              </Button>
              <Button
                variant={selectedFormat === "online" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFormat("online")}
                className={selectedFormat === "online" ? "bg-emirati-oasisGreen hover:bg-emirati-oasisGreen/90" : ""}
              >
                Online
              </Button>
              <Button
                variant={selectedFormat === "in-person" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFormat("in-person")}
                className={selectedFormat === "in-person" ? "bg-emirati-oasisGreen hover:bg-emirati-oasisGreen/90" : ""}
              >
                In-Person
              </Button>
              <Button
                variant={selectedFormat === "hybrid" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFormat("hybrid")}
                className={selectedFormat === "hybrid" ? "bg-emirati-oasisGreen hover:bg-emirati-oasisGreen/90" : ""}
              >
                Hybrid
              </Button>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2 text-emirati-deepBrown">Level</h4>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedLevel === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedLevel("all")}
                className={selectedLevel === "all" ? "bg-emirati-oasisGreen hover:bg-emirati-oasisGreen/90" : ""}
              >
                All Levels
              </Button>
              <Button
                variant={selectedLevel === "beginner" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedLevel("beginner")}
                className={selectedLevel === "beginner" ? "bg-emirati-oasisGreen hover:bg-emirati-oasisGreen/90" : ""}
              >
                Beginner
              </Button>
              <Button
                variant={selectedLevel === "intermediate" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedLevel("intermediate")}
                className={selectedLevel === "intermediate" ? "bg-emirati-oasisGreen hover:bg-emirati-oasisGreen/90" : ""}
              >
                Intermediate
              </Button>
              <Button
                variant={selectedLevel === "advanced" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedLevel("advanced")}
                className={selectedLevel === "advanced" ? "bg-emirati-oasisGreen hover:bg-emirati-oasisGreen/90" : ""}
              >
                Advanced
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {displayResults.length > 0 ? (
        <div className="space-y-3 mt-4">
          <p className="text-sm text-muted-foreground">
            Found {displayResults.length} training program{displayResults.length !== 1 && 's'}
          </p>
          
          {displayResults.map(training => (
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
        <div className="text-center py-8 bg-emirati-sandstone/20 rounded-lg border border-emirati-sandstone/30">
          {searchTerm.length > 0 ? (
            <>
              <Search className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
              <h3 className="text-lg font-medium text-emirati-deepBrown">No Results Found</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Try different keywords or browse all training programs by clearing your search.
              </p>
            </>
          ) : (
            <>
              <BookOpen className="mx-auto h-12 w-12 text-emirati-oasisGreen mb-3" />
              <h3 className="text-lg font-medium text-emirati-deepBrown">Search for Training Programs</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Enter a skill or keyword to find relevant training programs in the UAE.
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default TrainingProgramsTab;
