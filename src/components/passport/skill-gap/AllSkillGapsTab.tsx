
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BarChart, Search, SlidersHorizontal, BookOpen } from "lucide-react";
import { Student } from "@/types/student";
import { analyzeSkillGaps } from "@/utils/career/skill-gap"; // Updated import path
import { getDemandLevelColor, getSkillRelevanceColor } from "./utils";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface AllSkillGapsTabProps {
  student: Student;
  onViewTraining: (skill: string) => void;
}

const AllSkillGapsTab: React.FC<AllSkillGapsTabProps> = ({ student, onViewTraining }) => {
  const allSkillGaps = analyzeSkillGaps(student);
  const [searchTerm, setSearchTerm] = useState("");
  const [demandFilter, setDemandFilter] = useState<"all" | "high" | "medium" | "low">("all");
  
  // Filter skill gaps based on search and demand filter
  const filteredSkillGaps = allSkillGaps
    .filter(gap => 
      gap.skill.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (demandFilter === "all" || gap.demandLevel === demandFilter)
    );

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setDemandFilter("all");
  };

  if (allSkillGaps.length === 0) {
    return (
      <div className="text-center py-8 bg-emirati-sandstone/20 rounded-lg border border-emirati-sandstone/30">
        <BarChart className="mx-auto h-12 w-12 text-emirati-oasisGreen mb-3" />
        <h3 className="text-lg font-medium text-emirati-deepBrown">No Skill Gaps Found</h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          Your profile already matches well with current job market demands in the UAE.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search skills..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <Button
            variant={demandFilter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setDemandFilter("all")}
            className={demandFilter === "all" ? "bg-emirati-oasisGreen hover:bg-emirati-oasisGreen/90" : ""}
          >
            All
          </Button>
          <Button
            variant={demandFilter === "high" ? "default" : "outline"}
            size="sm"
            onClick={() => setDemandFilter("high")}
            className={demandFilter === "high" ? "bg-emirati-oasisGreen hover:bg-emirati-oasisGreen/90" : ""}
          >
            High Demand
          </Button>
          <Button
            variant={demandFilter === "medium" ? "default" : "outline"}
            size="sm"
            onClick={() => setDemandFilter("medium")}
            className={demandFilter === "medium" ? "bg-emirati-oasisGreen hover:bg-emirati-oasisGreen/90" : ""}
          >
            Medium
          </Button>
        </div>
        
        {(searchTerm || demandFilter !== "all") && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Clear Filters
          </Button>
        )}
      </div>
      
      {filteredSkillGaps.length === 0 ? (
        <div className="text-center py-8 bg-emirati-sandstone/20 rounded-lg">
          <Search className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
          <h3 className="text-lg font-medium">No Matching Skills</h3>
          <p className="text-muted-foreground">
            Try changing your search or filters
          </p>
        </div>
      ) : (
        <>
          <p className="text-sm text-muted-foreground">
            Found {filteredSkillGaps.length} skill gap{filteredSkillGaps.length !== 1 && 's'} for the UAE job market
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredSkillGaps.map((gap) => (
              <div 
                key={gap.skill} 
                className="border rounded-lg p-4 hover:border-emirati-oasisGreen/50 transition-all hover:shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-medium capitalize text-emirati-deepBrown">{gap.skill}</h3>
                  <Badge className={`${getDemandLevelColor(gap.demandLevel)}`}>
                    {gap.demandLevel}
                  </Badge>
                </div>
                
                <div className="mt-3">
                  <div className="flex justify-between text-xs">
                    <span>Relevance</span>
                    <span>{gap.relevanceScore}%</span>
                  </div>
                  <Progress 
                    value={gap.relevanceScore} 
                    className="h-2 mt-1" 
                    indicatorStyle={{ backgroundColor: getSkillRelevanceColor(gap.relevanceScore) }}
                  />
                </div>
                
                {gap.suggestedTraining.length > 0 ? (
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="mt-3 flex items-center text-emirati-oasisGreen border-emirati-oasisGreen/50 hover:bg-emirati-oasisGreen/10"
                    onClick={() => onViewTraining(gap.skill)}
                  >
                    <BookOpen className="h-3.5 w-3.5 mr-1.5" />
                    View {gap.suggestedTraining.length} Training Option{gap.suggestedTraining.length !== 1 && 's'}
                  </Button>
                ) : (
                  <p className="text-xs text-muted-foreground mt-3 italic">No specific training available yet</p>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AllSkillGapsTab;
