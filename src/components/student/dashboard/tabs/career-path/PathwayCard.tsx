
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, ChevronRight, TrendingUp } from "lucide-react";
import { CareerPathway } from "./types";
import { useNavigate } from "react-router-dom";

interface PathwayCardProps {
  pathway: CareerPathway;
}

const PathwayCard: React.FC<PathwayCardProps> = ({ pathway }) => {
  const navigate = useNavigate();

  return (
    <Card className="hover:shadow-md transition-shadow duration-300 border-emirati-sandBeige">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{pathway.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="flex items-center text-xs">
            <Briefcase className="h-3.5 w-3.5 mr-1 text-emirati-oasisGreen" />
            <span>Salary: {pathway.salary}</span>
          </div>
          <div className="flex items-center text-xs">
            <TrendingUp className="h-3.5 w-3.5 mr-1 text-emirati-oasisGreen" />
            <span>Growth: {pathway.growth}</span>
          </div>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full mt-2 border-emirati-oasisGreen text-emirati-oasisGreen hover:bg-emirati-oasisGreen/10"
          onClick={() => navigate("/mindmap?tab=simulator")}
        >
          Simulate This Path <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default PathwayCard;
