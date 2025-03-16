
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Vacancy } from "@/types/jobs";

interface JobDetailHeaderProps {
  vacancy: Vacancy | null;
}

const JobDetailHeader: React.FC<JobDetailHeaderProps> = ({ vacancy }) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center mb-6">
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => navigate('/job-applications')}
        className="mr-4"
      >
        <ChevronLeft size={16} className="mr-1" /> Back
      </Button>
      <h1 className="text-3xl font-bold text-emirati-oasisGreen">
        {vacancy ? vacancy.title : "Job Not Found"}
      </h1>
    </div>
  );
};

export default JobDetailHeader;
