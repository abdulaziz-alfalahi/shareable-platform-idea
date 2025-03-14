
import React from "react";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { UaeDivider } from "@/components/ui/uae";
import { Wallet } from "lucide-react";

const RetirementHeader: React.FC = () => {
  return (
    <>
      <div className="flex items-center space-x-4">
        <Wallet className="h-8 w-8 text-emirati-desertGold" />
        <div>
          <CardTitle className="text-2xl font-bold text-emirati-desertRed">
            Emirati Retirement Planner
          </CardTitle>
          <CardDescription>
            Plan your retirement journey with our comprehensive calculator tailored for UAE nationals
          </CardDescription>
        </div>
      </div>
      <UaeDivider variant="gradient" className="mt-4" />
    </>
  );
};

export default RetirementHeader;
