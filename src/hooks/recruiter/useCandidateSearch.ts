
import { useState } from "react";

// Types
export interface Candidate {
  id: number;
  name: string;
  skills: string[];
  experience: number;
  education: string;
  location: string;
  availability: string;
}

export interface CandidateFilters {
  location: string;
  experience: string;
  availability: string;
}

// Mock data
const allCandidates: Candidate[] = [
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

export const useCandidateSearch = (defaultSearchQuery: string = "") => {
  const [searchQuery, setSearchQuery] = useState(defaultSearchQuery);
  const [showFilters, setShowFilters] = useState(false);
  const [candidateFilters, setCandidateFilters] = useState<CandidateFilters>({
    location: "All",
    experience: "All",
    availability: "All",
  });

  const searchCandidates = (): Candidate[] => {
    let filteredCandidates = allCandidates;
    
    // Filter by search query
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      filteredCandidates = filteredCandidates.filter(candidate => 
        candidate.name.toLowerCase().includes(searchLower) || 
        candidate.skills.some(skill => skill.toLowerCase().includes(searchLower))
      );
    }
    
    // Filter by location
    if (candidateFilters.location && candidateFilters.location !== "All") {
      filteredCandidates = filteredCandidates.filter(c => c.location === candidateFilters.location);
    }
    
    // Filter by experience
    if (candidateFilters.experience && candidateFilters.experience !== "All") {
      const [min, max] = candidateFilters.experience.split('-').map(Number);
      filteredCandidates = filteredCandidates.filter(c => {
        if (max) {
          return c.experience >= min && c.experience <= max;
        } else {
          return c.experience >= min;
        }
      });
    }
    
    // Filter by availability
    if (candidateFilters.availability && candidateFilters.availability !== "All") {
      filteredCandidates = filteredCandidates.filter(c => c.availability === candidateFilters.availability);
    }
    
    return filteredCandidates;
  };

  const candidates = searchCandidates();

  return {
    searchQuery,
    setSearchQuery,
    showFilters,
    setShowFilters,
    candidateFilters,
    setCandidateFilters,
    candidates
  };
};
