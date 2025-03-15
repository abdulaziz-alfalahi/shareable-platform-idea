
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { OnboardingStepProps } from "../types";

const GoalsStep: React.FC<OnboardingStepProps> = ({ 
  data, 
  updateData, 
  onNext,
  onBack
}) => {
  const handleAddGoal = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.currentTarget.value.trim()) {
      updateData({
        goals: [...data.goals, e.currentTarget.value.trim()]
      });
      e.currentTarget.value = '';
    }
  };
  
  const handleRemoveGoal = (index: number) => {
    updateData({
      goals: data.goals.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-emirati-desertRed text-center">Your Career Goals</h2>
      <p className="text-center text-muted-foreground">What do you hope to achieve in your career journey?</p>
      
      <div className="space-y-4 mt-6">
        <div>
          <label htmlFor="goal" className="block text-sm font-medium mb-1">Add a goal (press Enter to add)</label>
          <input 
            type="text" 
            id="goal" 
            onKeyDown={handleAddGoal}
            className="w-full px-4 py-2 border border-emirati-sandBeige rounded-md focus:outline-none focus:ring-2 focus:ring-emirati-oasisGreen"
            placeholder="e.g., Complete a professional certification"
          />
        </div>
        
        <div className="mt-4">
          {data.goals.length > 0 ? (
            <ul className="space-y-2">
              {data.goals.map((goal, index) => (
                <li key={index} className="flex justify-between items-center p-2 bg-emirati-sandBeige/10 rounded">
                  <span>{goal}</span>
                  <button 
                    onClick={() => handleRemoveGoal(index)}
                    className="text-emirati-subtleRed hover:text-emirati-desertRed"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground text-center py-4">No goals added yet</p>
          )}
        </div>
      </div>
      
      <div className="mt-6 flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button 
          onClick={onNext}
          disabled={data.goals.length === 0}
          className="bg-emirati-oasisGreen hover:bg-emirati-oasisGreen/90"
        >
          Continue <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default GoalsStep;
