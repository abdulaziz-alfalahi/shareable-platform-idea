
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PortfolioHeader: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex items-center mb-6">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate(-1)}
        className="mr-4"
      >
        <ChevronLeft size={16} className="mr-1" /> Back
      </Button>
      <h1 className="text-3xl font-bold text-emirati-oasisGreen">
        Portfolio Builder
      </h1>
    </div>
  );
};

export default PortfolioHeader;
