
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Briefcase, XCircle, CheckCircle, Clock } from "lucide-react";
import { JobMatchDetails } from "@/utils/career/types";
import { Vacancy } from "@/types/jobs";

interface QuickApplicationCardProps {
  matchDetails: JobMatchDetails;
  vacancy: Vacancy;
  hasApplied: boolean;
  isSubmitting: boolean;
  onApply: () => void;
}

const QuickApplicationCard: React.FC<QuickApplicationCardProps> = ({
  matchDetails,
  vacancy,
  hasApplied,
  isSubmitting,
  onApply
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium flex items-center">
          <Briefcase className="h-5 w-5 mr-2 text-emirati-oasisGreen" />
          Quick Application
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm">
            Your profile is <span className="font-medium">{matchDetails.matchPercentage}%</span> matched to this job.
          </p>
          
          {matchDetails.missingSkills.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Missing Skills</h4>
              <div className="flex flex-wrap gap-2">
                {matchDetails.missingSkills.map((skill, index) => (
                  <Badge key={index} variant="outline" className="bg-red-50 text-red-700 border-red-200">
                    <XCircle className="h-3 w-3 mr-1 text-red-500" />
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          <Button
            disabled={hasApplied || isSubmitting}
            onClick={onApply}
            className="w-full bg-emirati-oasisGreen text-white hover:bg-emirati-oasisGreen/90"
          >
            {isSubmitting ? (
              <>
                <Clock className="h-4 w-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : hasApplied ? (
              <>
                <CheckCircle className="h-4 w-4 mr-2" />
                Applied
              </>
            ) : (
              <>
                <Briefcase className="h-4 w-4 mr-2" />
                Apply with Profile
              </>
            )}
          </Button>
          
          <div className="text-xs text-muted-foreground">
            Your profile will be shared with {vacancy.company} as part of your application.
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickApplicationCard;
