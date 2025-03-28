
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, User } from "lucide-react";
import { OnboardingStepProps } from "../types";

const ProfileStep: React.FC<OnboardingStepProps> = ({ 
  data, 
  updateData, 
  onNext 
}) => {
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateData({ name: e.target.value });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-emirati-desertRed">مرحباً | Welcome to Emirati Journey</h2>
        <p className="text-center text-muted-foreground">Let's set up your profile to personalize your journey.</p>
        
        <div className="mt-6 flex justify-center">
          <div className="p-4 w-20 h-20 rounded-full bg-emirati-sandBeige/40 flex items-center justify-center">
            <User className="w-10 h-10 text-emirati-oasisGreen" />
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">Your Name</label>
          <input 
            type="text" 
            id="name" 
            value={data.name} 
            onChange={handleNameChange}
            className="w-full px-4 py-2 border border-emirati-sandBeige rounded-md focus:outline-none focus:ring-2 focus:ring-emirati-oasisGreen"
            placeholder="Enter your full name"
          />
        </div>
        
        <div className="mt-6 flex justify-end">
          <Button 
            onClick={onNext} 
            disabled={!data.name.trim()}
            className="bg-emirati-oasisGreen hover:bg-emirati-oasisGreen/90"
          >
            Continue <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileStep;
