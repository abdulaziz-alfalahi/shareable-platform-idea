
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { OnboardingStepProps } from "../types";
import { getRoleSpecificContent } from "../data";

const CompleteStep: React.FC<OnboardingStepProps> = ({ 
  data, 
  onNext
}) => {
  const roleContent = getRoleSpecificContent(data.role);

  return (
    <div className="space-y-6 text-center">
      <div className="flex justify-center">
        <CheckCircle className="w-16 h-16 text-emirati-oasisGreen" />
      </div>
      
      <h2 className="text-2xl font-bold text-emirati-desertRed">{roleContent.title}</h2>
      <p className="text-muted-foreground">
        Thank you, {data.name}. {roleContent.message}
      </p>
      
      <div className="mt-4 bg-emirati-sandBeige/10 p-4 rounded-md">
        <h3 className="font-semibold text-emirati-oasisGreen mb-2">Recommended Next Steps:</h3>
        <ul className="space-y-1 text-left">
          {roleContent.nextSteps.map((step, index) => (
            <li key={index} className="flex items-center">
              <CheckCircle className="w-4 h-4 text-emirati-desertGold mr-2" />
              {step}
            </li>
          ))}
        </ul>
      </div>
      
      <div className="mt-8">
        <Button 
          onClick={onNext}
          className="w-full bg-emirati-oasisGreen hover:bg-emirati-oasisGreen/90"
        >
          Start Your Journey
        </Button>
      </div>
    </div>
  );
};

export default CompleteStep;
