
import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, Clock, GraduationCap, BookOpen, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface Career {
  id: number;
  title: string;
  description: string;
  field: string;
  growth: string;
  salary: string;
  education: string;
  skills: string[];
  image: string;
}

interface CareerCardProps {
  career: Career;
}

const CareerCard: React.FC<CareerCardProps> = ({ career }) => {
  return (
    <Card className="overflow-hidden border-emirati-sandBeige hover:border-emirati-oasisGreen/50 transition-all duration-300 hover:shadow-md">
      <CardHeader className="p-0">
        <div className="h-40 overflow-hidden bg-emirati-sandBeige/20">
          <img 
            src={career.image} 
            alt={career.title} 
            className="w-full h-full object-cover"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-3">
        <div>
          <h3 className="text-xl font-semibold text-emirati-deepBrown">{career.title}</h3>
          <p className="text-muted-foreground text-sm mt-1">{career.description}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center text-sm">
            <TrendingUp className="h-4 w-4 text-emirati-oasisGreen mr-1" />
            <span>Growth: {career.growth}</span>
          </div>
          <div className="flex items-center text-sm">
            <GraduationCap className="h-4 w-4 text-emirati-oasisGreen mr-1" />
            <span>Required Education</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1.5 mt-3">
          {career.skills.slice(0, 3).map((skill, index) => (
            <Badge 
              key={index} 
              variant="outline" 
              className="bg-emirati-sandBeige/30 border-emirati-sandBeige text-xs"
            >
              {skill}
            </Badge>
          ))}
          {career.skills.length > 3 && (
            <Badge variant="outline" className="text-xs">+{career.skills.length - 3} more</Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="px-4 pb-4 pt-0 flex justify-between">
        <Button 
          variant="outline" 
          size="sm" 
          className="text-emirati-oasisGreen border-emirati-oasisGreen/80 hover:bg-emirati-oasisGreen/10"
        >
          Save
        </Button>
        <Button 
          size="sm" 
          className="bg-emirati-oasisGreen hover:bg-emirati-oasisGreen/90"
          asChild
        >
          <Link to={`/career-passport?career=${career.id}`}>
            Explore <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CareerCard;
