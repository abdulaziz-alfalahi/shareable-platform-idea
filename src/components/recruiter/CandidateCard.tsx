
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, Briefcase, MapPin, Clock, ChevronRight } from "lucide-react";
import { Candidate } from "@/hooks/recruiter/useCandidateSearch";

interface CandidateCardProps {
  candidate: Candidate;
}

const CandidateCard: React.FC<CandidateCardProps> = ({ candidate }) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold flex items-center">
              <User className="mr-2 h-5 w-5" /> {candidate.name}
            </h3>
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 mt-2 text-sm text-muted-foreground">
              <div className="flex items-center">
                <MapPin className="mr-1 h-4 w-4" /> {candidate.location}
              </div>
              <div className="flex items-center">
                <Briefcase className="mr-1 h-4 w-4" /> {candidate.experience} years
              </div>
              <div className="flex items-center">
                <Clock className="mr-1 h-4 w-4" /> {candidate.availability}
              </div>
            </div>
            <div className="mt-3">
              <p className="text-sm font-medium mb-1">Education</p>
              <p className="text-sm">{candidate.education}</p>
            </div>
          </div>
          <div className="md:text-right">
            <Button variant="outline" size="sm">
              View Profile <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-sm font-medium mb-2">Skills</p>
          <div className="flex flex-wrap gap-2">
            {candidate.skills.map((skill, index) => (
              <Badge key={index} variant="secondary">{skill}</Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CandidateCard;
