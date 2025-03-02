
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, User, Briefcase, MapPin, Clock, ChevronRight } from "lucide-react";

interface Candidate {
  id: number;
  name: string;
  skills: string[];
  experience: number;
  education: string;
  location: string;
  availability: string;
}

interface CandidateSearchProps {
  defaultSearchQuery?: string;
}

const CandidateSearch: React.FC<CandidateSearchProps> = ({ defaultSearchQuery = "" }) => {
  const [searchQuery, setSearchQuery] = useState(defaultSearchQuery);
  const [showFilters, setShowFilters] = useState(false);
  const [candidateFilters, setCandidateFilters] = useState({
    location: "All",
    experience: "All",
    availability: "All",
  });

  const searchCandidates = (query: string, filters: any): Candidate[] => {
    const allCandidates = [
      { id: 101, name: "Sarah Johnson", skills: ["UI/UX", "Figma", "Sketch", "User Research"], experience: 5, education: "Bachelor's in Design", location: "Dubai", availability: "Immediate" },
      { id: 102, name: "Mohammed Al Farsi", skills: ["UI Design", "Adobe XD", "Prototyping"], experience: 3, education: "Master's in HCI", location: "Dubai", availability: "2 weeks" },
      { id: 103, name: "Priya Sharma", skills: ["UX Research", "Wireframing", "User Testing"], experience: 4, education: "Bachelor's in Psychology", location: "Abu Dhabi", availability: "1 month" },
      { id: 104, name: "Alex Wong", skills: ["Product Design", "Figma", "HTML/CSS"], experience: 6, education: "Master's in Design", location: "Dubai", availability: "Immediate" },
      { id: 105, name: "Fatima Hassan", skills: ["Visual Design", "Illustration", "Branding"], experience: 2, education: "Bachelor's in Fine Arts", location: "Sharjah", availability: "2 weeks" },
      { id: 106, name: "Daniel Kim", skills: ["Interaction Design", "Prototyping", "User Flows"], experience: 7, education: "PhD in Design", location: "Dubai", availability: "Negotiable" },
      { id: 107, name: "Layla Ahmed", skills: ["UI Design", "Design Systems", "Accessibility"], experience: 4, education: "Bachelor's in Computer Science", location: "Abu Dhabi", availability: "Immediate" },
      { id: 108, name: "Raj Patel", skills: ["UX Design", "Research", "Information Architecture"], experience: 5, education: "Master's in Information Science", location: "Dubai", availability: "1 month" },
      { id: 109, name: "Emma Wilson", skills: ["Visual Design", "Branding", "Typography"], experience: 3, education: "Bachelor's in Graphic Design", location: "Sharjah", availability: "2 weeks" },
      { id: 110, name: "Omar Mahmoud", skills: ["UI Development", "Figma", "React"], experience: 4, education: "Bachelor's in Computer Science", location: "Dubai", availability: "Immediate" },
      { id: 111, name: "Jennifer Lee", skills: ["Content Strategy", "UX Writing", "Information Architecture"], experience: 6, education: "Master's in English", location: "Dubai", availability: "1 month" },
      { id: 112, name: "Ahmed Al Mansoori", skills: ["UI Design", "Motion Graphics", "Design Systems"], experience: 5, education: "Bachelor's in Digital Media", location: "Abu Dhabi", availability: "Immediate" },
      { id: 113, name: "Sophia Rodriguez", skills: ["User Research", "Usability Testing", "Prototyping"], experience: 4, education: "Master's in Human Factors", location: "Dubai", availability: "2 weeks" },
      { id: 114, name: "Michael Chen", skills: ["Product Design", "Design Thinking", "Wireframing"], experience: 7, education: "MBA", location: "Sharjah", availability: "Negotiable" },
      { id: 115, name: "Aisha Khalid", skills: ["UX Design", "Design Strategy", "Workshop Facilitation"], experience: 8, education: "PhD in Design", location: "Dubai", availability: "1 month" },
    ];
    
    let filteredCandidates = allCandidates;
    if (query) {
      const searchLower = query.toLowerCase();
      filteredCandidates = filteredCandidates.filter(candidate => 
        candidate.name.toLowerCase().includes(searchLower) || 
        candidate.skills.some(skill => skill.toLowerCase().includes(searchLower))
      );
    }
    
    if (filters.location && filters.location !== "All") {
      filteredCandidates = filteredCandidates.filter(c => c.location === filters.location);
    }
    
    if (filters.experience && filters.experience !== "All") {
      const [min, max] = filters.experience.split('-').map(Number);
      filteredCandidates = filteredCandidates.filter(c => {
        if (max) {
          return c.experience >= min && c.experience <= max;
        } else {
          return c.experience >= min;
        }
      });
    }
    
    if (filters.availability && filters.availability !== "All") {
      filteredCandidates = filteredCandidates.filter(c => c.availability === filters.availability);
    }
    
    return filteredCandidates;
  };

  const candidates = searchCandidates(searchQuery, candidateFilters);

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
      
      <div className="space-y-4">
        {candidates.map((candidate) => (
          <Card key={candidate.id}>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold flex items-center">
                    <User className="mr-2 h-5 w-5" /> {candidate.name}
                  </h3>
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 mt-2 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <MapPin className="mr-1 h-4 w-4" /> {candidate.location}
                    </div>
                    <div className="flex items-center">
                      <Briefcase className="mr-1 h-4 w-4" /> {candidate.experience} years
                    </div>
                    <div className="flex items-center">
                      <Clock className="mr-1 h-4 w-4" /> {candidate.availability}
                    </div>
                  </div>
                  <div className="mt-3">
                    <p className="text-sm font-medium mb-1">Education</p>
                    <p className="text-sm">{candidate.education}</p>
                  </div>
                </div>
                <div className="md:text-right">
                  <Button variant="outline" size="sm">
                    View Profile <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm font-medium mb-2">Skills</p>
                <div className="flex flex-wrap gap-2">
                  {candidate.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

export default CandidateSearch;
