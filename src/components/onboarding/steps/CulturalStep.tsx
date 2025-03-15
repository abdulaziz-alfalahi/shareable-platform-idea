
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { OnboardingStepProps } from "../types";
import { culturalValues } from "../data";

const CulturalStep: React.FC<OnboardingStepProps> = ({ 
  data, 
  updateData, 
  onNext,
  onBack
}) => {
  const toggleCulturalValue = (valueId: string) => {
    if (data.culturalValues.includes(valueId)) {
      updateData({
        culturalValues: data.culturalValues.filter(id => id !== valueId)
      });
    } else {
      updateData({
        culturalValues: [...data.culturalValues, valueId]
      });
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-emirati-desertRed text-center">Cultural Values</h2>
      <p className="text-center text-muted-foreground">Select values that align with your personal and professional journey.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {culturalValues.map((value) => (
          <div 
            key={value.id}
            onClick={() => toggleCulturalValue(value.id)}
            className={`p-4 border rounded-lg cursor-pointer transition-all ${
              data.culturalValues.includes(value.id) 
                ? 'border-emirati-oasisGreen bg-emirati-sandBeige/10' 
                : 'border-emirati-sandBeige hover:border-emirati-desertGold'
            }`}
          >
            <h3 className="font-semibold">{value.name}</h3>
            <p className="text-sm text-muted-foreground">{value.description}</p>
          </div>
        ))}
      </div>
      
      <div className="mt-6 flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button 
          onClick={onNext}
          disabled={data.culturalValues.length === 0}
          className="bg-emirati-oasisGreen hover:bg-emirati-oasisGreen/90"
        >
          Continue <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default CulturalStep;
