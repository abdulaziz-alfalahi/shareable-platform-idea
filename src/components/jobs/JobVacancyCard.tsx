import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BuildingIcon, 
  CalendarIcon,
  MapPinIcon,
  SendIcon,
  ArrowUpCircleIcon,
  InfoIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  TrendingUpIcon
} from "lucide-react";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import SkillMatchVisualization from "./SkillMatchVisualization";
import { Vacancy } from "@/types/jobs";
import VacancySkillsList from "./VacancySkillsList";
import { Badge } from "@/components/ui/badge";

interface JobVacancyCardProps {
  vacancy: Vacancy;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onApply: () => void;
  onViewDetails: () => void;
  isApplying: boolean;
  matchType?: string;
}

export const getMatchColor = (percentage: number) => {
  if (percentage >= 90) return "text-green-600";
  if (percentage >= 75) return "text-blue-600";
  if (percentage >= 60) return "text-yellow-600";
  return "text-red-600";
};

const JobVacancyCard = ({ 
  vacancy, 
  isExpanded, 
  onToggleExpand, 
  onApply, 
  onViewDetails, 
  isApplying, 
  matchType = "skill-match" 
}: JobVacancyCardProps) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl text-emirati-oasisGreen flex items-center">
              {vacancy.title}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className={`ml-3 text-sm font-medium ${getMatchColor(vacancy.matchPercentage)} flex items-center`}>
                      {vacancy.matchPercentage}% Match
                      <InfoIcon size={14} className="ml-1 text-gray-400" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-sm">
                      {matchType === "skill-match" 
                        ? "This score is based on how well your skills match the job requirements" 
                        : "This score includes your career path alignment with this position"}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardTitle>
            <CardDescription className="flex items-center mt-1">
              <BuildingIcon size={16} className="mr-1" /> 
              {vacancy.company}
            </CardDescription>
          </div>
          
          {matchType === "career-path" && (
            <Badge variant="outline" className="bg-emirati-desertGold/10 text-emirati-desertGold border-emirati-desertGold flex items-center">
              <TrendingUpIcon size={12} className="mr-1" />
              Career Path
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-3 space-y-2">
          <div className="flex items-center text-sm text-gray-600">
            <MapPinIcon size={14} className="mr-1 text-emirati-camelBrown" /> 
            {vacancy.location}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <CalendarIcon size={14} className="mr-1 text-emirati-camelBrown" /> 
            Posted: {vacancy.postedDate}
          </div>
          <div className="flex items-center text-sm font-medium">
            {vacancy.salary}
          </div>
        </div>
        
        {!isExpanded ? (
          <VacancySkillsList vacancy={vacancy} />
        ) : (
          <SkillMatchVisualization vacancy={vacancy} />
        )}
        
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onToggleExpand}
          className="w-full mt-3 text-emirati-desertGold"
        >
          {isExpanded ? (
            <>Show Skills <ChevronUpIcon className="ml-1 h-4 w-4" /></>
          ) : (
            <>View Match Details <ChevronDownIcon className="ml-1 h-4 w-4" /></>
          )}
        </Button>
      </CardContent>
      <CardFooter className="pt-1">
        <Button 
          className="w-full bg-emirati-oasisGreen hover:bg-emirati-desertGold"
          onClick={onApply}
          disabled={isApplying}
        >
          {isApplying ? "Applying..." : (
            <><SendIcon size={14} className="mr-1" /> Apply Now</>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default JobVacancyCard;
