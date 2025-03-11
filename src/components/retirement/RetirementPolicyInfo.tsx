
import React, { useState } from "react";
import { AlertCircle } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";

const RetirementPolicyInfo: React.FC = () => {
  return (
    <div className="flex items-center mt-2">
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="link" className="h-auto p-0 text-emirati-desertRed">
            <AlertCircle className="h-4 w-4 mr-1" />
            <span className="text-sm">UAE Retirement Policies</span>
          </Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-96 text-sm">
          <div className="space-y-2">
            <h4 className="font-semibold">UAE Pension System for Emiratis</h4>
            <ul className="list-disc pl-4 space-y-1">
              <li>
                <span className="font-medium">Eligibility:</span> Emirati nationals with 15+ years of service (men) or 10+ years (women)
              </li>
              <li>
                <span className="font-medium">Retirement Age:</span> 60 years for men, 55 years for women
              </li>
              <li>
                <span className="font-medium">Early Retirement:</span> Available at 55 (men) and 50 (women) with reduced benefits
              </li>
              <li>
                <span className="font-medium">Pension Amount:</span> Up to 80% of final salary after 35 years of service
              </li>
              <li>
                <span className="font-medium">Contribution Rate:</span> 5% employee, 15% employer contribution
              </li>
            </ul>
            <p className="text-xs text-muted-foreground mt-2">
              *The simulator incorporates these policies into its calculations for Emirati nationals.
            </p>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
};

export default RetirementPolicyInfo;
