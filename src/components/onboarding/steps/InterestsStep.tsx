
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { OnboardingStepProps } from "../types";
import { interestOptions } from "../data";

const InterestsStep: React.FC<OnboardingStepProps> = ({ 
  data, 
  updateData, 
  onNext,
  onBack
}) => {
  const toggleInterest = (interestId: string) => {
    if (data.interests.includes(interestId)) {
      updateData({
        interests: data.interests.filter(id => id !== interestId)
      });
    } else {
      updateData({
        interests: [...data.interests, interestId]
      });
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-emirati-desertRed text-center">Areas of Interest</h2>
      <p className="text-center text-muted-foreground">Select sectors or fields that interest you most.</p>
      
      <div className="flex flex-wrap gap-3 mt-6">
        {interestOptions.map((interest) => (
          <div 
            key={interest.id}
            onClick={() => toggleInterest(interest.id)}
            className={`px-4 py-2 rounded-full cursor-pointer transition-all ${
              data.interests.includes(interest.id)
                ? 'bg-emirati-oasisGreen text-white' 
                : 'bg-emirati-sandBeige/20 hover:bg-emirati-sandBeige/40'
            }`}
          >
            {interest.name}
          </div>
        ))}
      </div>
      
      <div className="mt-6 flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button 
          onClick={onNext}
          disabled={data.interests.length === 0}
          className="bg-emirati-oasisGreen hover:bg-emirati-oasisGreen/90"
        >
          Continue <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default InterestsStep;
