
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Vacancy } from "@/types/jobs";
import { useIsMobile } from "@/hooks/use-mobile";

interface JobDetailHeaderProps {
  vacancy: Vacancy | null;
}

const JobDetailHeader: React.FC<JobDetailHeaderProps> = ({ vacancy }) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6">
      <Button 
        variant="ghost" 
        size={isMobile ? "sm" : "default"} 
        onClick={() => navigate('/job-applications')}
        className="px-2"
      >
        <ChevronLeft size={16} className="mr-1" /> Back
      </Button>
      <h1 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-emirati-oasisGreen line-clamp-2`}>
        {vacancy ? vacancy.title : "Job Not Found"}
      </h1>
    </div>
  );
};

export default JobDetailHeader;
