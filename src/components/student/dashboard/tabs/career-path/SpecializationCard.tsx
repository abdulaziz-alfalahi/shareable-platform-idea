
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, TrendingUp } from "lucide-react";
import { CareerSpecialization } from "./types";

interface SpecializationCardProps {
  specialization: CareerSpecialization;
  field: string;
  onExplorePathways: () => void;
}

const SpecializationCard: React.FC<SpecializationCardProps> = ({ 
  specialization, 
  field, 
  onExplorePathways 
}) => {
  return (
    <Card className="hover:shadow-md transition-shadow duration-300 border-emirati-sandBeige">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{specialization.name}</CardTitle>
        <CardDescription>{field}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm mb-3">{specialization.description}</p>
        <div className="flex items-center text-xs text-muted-foreground mb-4">
          <TrendingUp className="h-3.5 w-3.5 mr-1 text-emirati-oasisGreen" /> 
          <span>{specialization.popularity}</span>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full mt-2 border-emirati-oasisGreen text-emirati-oasisGreen hover:bg-emirati-oasisGreen/10"
          onClick={onExplorePathways}
        >
          See Career Paths <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default SpecializationCard;
