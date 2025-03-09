
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";
import { CandidateFilters } from "@/hooks/recruiter/useCandidateSearch";

interface CandidateSearchFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  candidateFilters: CandidateFilters;
  setCandidateFilters: (filters: CandidateFilters) => void;
}

const CandidateSearchFilters: React.FC<CandidateSearchFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  showFilters,
  setShowFilters,
  candidateFilters,
  setCandidateFilters
}) => {
  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="relative w-full md:max-w-sm">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search candidates by name or skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
          <Filter className="mr-2 h-4 w-4" /> 
          {showFilters ? "Hide Filters" : "Show Filters"}
        </Button>
      </div>
      
      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 border rounded-lg bg-muted/30">
          <div>
            <Label htmlFor="location-filter">Location</Label>
            <Select 
              value={candidateFilters.location} 
              onValueChange={(value) => setCandidateFilters({...candidateFilters, location: value})}
            >
              <SelectTrigger id="location-filter">
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Locations</SelectItem>
                <SelectItem value="Dubai">Dubai</SelectItem>
                <SelectItem value="Abu Dhabi">Abu Dhabi</SelectItem>
                <SelectItem value="Sharjah">Sharjah</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="experience-filter">Experience</Label>
            <Select 
              value={candidateFilters.experience} 
              onValueChange={(value) => setCandidateFilters({...candidateFilters, experience: value})}
            >
              <SelectTrigger id="experience-filter">
                <SelectValue placeholder="Select experience range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Experience Levels</SelectItem>
                <SelectItem value="0-2">0-2 years</SelectItem>
                <SelectItem value="3-5">3-5 years</SelectItem>
                <SelectItem value="6-8">6-8 years</SelectItem>
                <SelectItem value="9">9+ years</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="availability-filter">Availability</Label>
            <Select 
              value={candidateFilters.availability} 
              onValueChange={(value) => setCandidateFilters({...candidateFilters, availability: value})}
            >
              <SelectTrigger id="availability-filter">
                <SelectValue placeholder="Select availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Availability</SelectItem>
                <SelectItem value="Immediate">Immediate</SelectItem>
                <SelectItem value="2 weeks">2 weeks</SelectItem>
                <SelectItem value="1 month">1 month</SelectItem>
                <SelectItem value="Negotiable">Negotiable</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
    </>
  );
};

export default CandidateSearchFilters;
