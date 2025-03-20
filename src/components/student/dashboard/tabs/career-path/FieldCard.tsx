
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { CareerField } from "./types";

interface FieldCardProps {
  field: CareerField;
  onExploreSpecializations: () => void;
}

const FieldCard: React.FC<FieldCardProps> = ({ field, onExploreSpecializations }) => {
  return (
    <Card className="hover:shadow-md transition-shadow duration-300 border-emirati-sandBeige">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          {field.icon}
          <CardTitle className="text-xl">{field.name}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <h4 className="font-medium text-sm text-muted-foreground mb-2">Popular specializations:</h4>
        <ul className="space-y-1 mb-4">
          {field.specializations.map((spec, index) => (
            <li key={index} className="text-sm">
              {spec.name} <span className="text-xs text-emirati-oasisGreen">({spec.popularity})</span>
            </li>
          ))}
        </ul>
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full mt-2 border-emirati-oasisGreen text-emirati-oasisGreen hover:bg-emirati-oasisGreen/10"
          onClick={onExploreSpecializations}
        >
          Explore Specializations <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default FieldCard;
