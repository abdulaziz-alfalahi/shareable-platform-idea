
import React from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface DashboardHeaderProps {
  title: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ title }) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/")} 
          className="mr-4"
        >
          <ArrowLeft size={18} className="mr-1" /> Back
        </Button>
        <h1 className="text-3xl font-bold">{title}</h1>
      </div>
    </div>
  );
};

export default DashboardHeader;
