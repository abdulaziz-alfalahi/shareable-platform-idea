
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  ChevronDown,
  ChevronUp,
  Search,
  MapPin,
  Briefcase,
  CheckCircle,
  Calendar,
  Building,
  DollarSign,
  ArrowRight,
  EyeIcon
} from "lucide-react";
import { notifySuccess } from "@/utils/notification";
import VacancySkillsList from "./VacancySkillsList";
import SkillMatchVisualization from "./SkillMatchVisualization";
import JobVacancyCard from "./JobVacancyCard";

export interface Vacancy {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  matchPercentage: number;
  postedDate: string;
  requiredSkills: string[];
  matchedSkills: string[];
  missingSkills: string[];
  culturalFit?: number;
  careerPathAlignment?: number;
}

interface JobApplication {
  id: string;
  jobTitle: string;
  company: string;
  appliedDate: string;
  status: "Applied" | "In Review" | "Interview Scheduled" | "Rejected" | "Offer Received";
  priority: "high" | "medium" | "low";
}

interface MatchingVacanciesTabProps {
  vacancies: Vacancy[];
  setApplications: React.Dispatch<React.SetStateAction<JobApplication[]>>;
  applications: JobApplication[];
  matchType: string;
}

const MatchingVacanciesTab: React.FC<MatchingVacanciesTabProps> = ({
  vacancies,
  setApplications,
  applications,
  matchType
}) => {
  const navigate = useNavigate();
  const [expandedVacancy, setExpandedVacancy] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<"matchPercentage" | "postedDate">("matchPercentage");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [applyingId, setApplyingId] = useState<string | null>(null);

  // Filter vacancies based on search query
  const filteredVacancies = vacancies.filter(vacancy => {
    const searchLower = searchQuery.toLowerCase();
    return (
      vacancy.title.toLowerCase().includes(searchLower) ||
      vacancy.company.toLowerCase().includes(searchLower) ||
      vacancy.location.toLowerCase().includes(searchLower) ||
      vacancy.requiredSkills.some(skill => skill.toLowerCase().includes(searchLower))
    );
  });

  // Sort vacancies based on sort field and direction
  const sortedVacancies = [...filteredVacancies].sort((a, b) => {
    if (sortField === "matchPercentage") {
      return sortDirection === "desc" 
        ? b.matchPercentage - a.matchPercentage 
        : a.matchPercentage - b.matchPercentage;
    } else {
      // For date sorting, simple string comparison for demo
      return sortDirection === "desc" 
        ? b.postedDate.localeCompare(a.postedDate)
        : a.postedDate.localeCompare(b.postedDate);
    }
  });

  const toggleVacancyExpanded = (id: string) => {
    setExpandedVacancy(expandedVacancy === id ? null : id);
  };

  const handleViewDetails = (id: string) => {
    navigate(`/job-details/${id}`);
  };

  const handleSort = (field: "matchPercentage" | "postedDate") => {
    if (sortField === field) {
      setSortDirection(sortDirection === "desc" ? "asc" : "desc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const handleApply = (vacancy: Vacancy) => {
    setApplyingId(vacancy.id);
    
    // Check if already applied
    const alreadyApplied = applications.some(app => app.jobTitle === vacancy.title && app.company === vacancy.company);
    
    if (!alreadyApplied) {
      // Simulate API delay
      setTimeout(() => {
        const newApplication: JobApplication = {
          id: `app-${Date.now()}`,
          jobTitle: vacancy.title,
          company: vacancy.company,
          appliedDate: new Date().toLocaleDateString(),
          status: "Applied",
          priority: vacancy.matchPercentage > 80 ? "high" : vacancy.matchPercentage > 60 ? "medium" : "low"
        };
        
        setApplications(prev => [newApplication, ...prev]);
        
        notifySuccess({
          title: "Application Submitted",
          description: `You have successfully applied for ${vacancy.title} at ${vacancy.company}.`,
        });
        
        setApplyingId(null);
      }, 1000);
    } else {
      setTimeout(() => {
        notifySuccess({
          title: "Already Applied",
          description: `You have already applied for ${vacancy.title} at ${vacancy.company}.`,
        });
        setApplyingId(null);
      }, 500);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by job title, company, or skills..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleSort("matchPercentage")}
            className="flex items-center"
          >
            Match {sortField === "matchPercentage" && (
              sortDirection === "desc" ? 
                <ChevronDown className="ml-1 h-4 w-4" /> : 
                <ChevronUp className="ml-1 h-4 w-4" />
            )}
          </Button>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleSort("postedDate")}
            className="flex items-center"
          >
            Date {sortField === "postedDate" && (
              sortDirection === "desc" ? 
                <ChevronDown className="ml-1 h-4 w-4" /> : 
                <ChevronUp className="ml-1 h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {sortedVacancies.length > 0 ? (
        <div className="space-y-4">
          {sortedVacancies.map((vacancy) => (
            <JobVacancyCard
              key={vacancy.id}
              vacancy={vacancy}
              isExpanded={expandedVacancy === vacancy.id}
              onToggleExpand={() => toggleVacancyExpanded(vacancy.id)}
              onApply={() => handleApply(vacancy)}
              onViewDetails={() => handleViewDetails(vacancy.id)}
              isApplying={applyingId === vacancy.id}
              matchType={matchType}
            />
          ))}
        </div>
      ) : (
        <div className="text-center p-8 border rounded-lg">
          <Briefcase className="mx-auto h-10 w-10 text-muted-foreground mb-3" />
          <h3 className="text-lg font-medium">No Matching Vacancies</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            We couldn't find any vacancies matching your criteria. Try adjusting your search.
          </p>
        </div>
      )}
    </div>
  );
};

export default MatchingVacanciesTab;
