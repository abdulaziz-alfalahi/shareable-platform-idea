
import React from "react";
import { Button } from "@/components/ui/button";
import { Compass } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CareerPathHeader: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-bold text-emirati-deepBlue">Career Pathway Exploration</h2>
      <Button 
        className="bg-emirati-oasisGreen hover:bg-emirati-oasisGreen/90"
        onClick={() => navigate("/mindmap")}
      >
        <Compass className="mr-2 h-4 w-4" />
        Full Career Explorer
      </Button>
    </div>
  );
};

export default CareerPathHeader;
