
import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, ChevronRight } from "lucide-react";
import { Internship } from "@/data/internshipsData";

interface InternshipCardProps {
  internship: Internship;
}

const InternshipCard: React.FC<InternshipCardProps> = ({ internship }) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-all border-emirati-sandBeige hover:border-emirati-oasisGreen/50">
      <CardHeader className="p-0">
        <div className="h-40 overflow-hidden bg-emirati-sandBeige/20">
          <img 
            src={internship.image} 
            alt={internship.title} 
            className="w-full h-full object-cover"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold text-emirati-deepBrown">{internship.title}</h3>
        <p className="text-emirati-oasisGreen font-medium">{internship.company}</p>
        
        <div className="grid grid-cols-2 gap-2 mt-3">
          <div className="flex items-center text-sm">
            <MapPin className="h-4 w-4 text-emirati-camelBrown mr-1" />
            <span>{internship.location}</span>
          </div>
          <div className="flex items-center text-sm">
            <Calendar className="h-4 w-4 text-emirati-camelBrown mr-1" />
            <span>{internship.duration}</span>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground mt-3">{internship.description}</p>
        
        <div className="mt-3">
          <div className="text-sm font-medium">Requirements:</div>
          <div className="text-sm text-muted-foreground">{internship.requirements}</div>
        </div>
      </CardContent>
      <CardFooter className="px-4 py-3 bg-emirati-sandBeige/10 flex justify-between items-center">
        <div className="text-sm">
          <span className="font-medium">Deadline:</span> {internship.deadline}
        </div>
        <Button 
          size="sm" 
          className="bg-emirati-oasisGreen hover:bg-emirati-oasisGreen/90"
        >
          Apply <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default InternshipCard;
