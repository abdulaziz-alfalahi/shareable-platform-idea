
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { OnboardingStepProps } from "../types";
import { roleOptions } from "../data";
import { UserRole } from "@/components/notifications/RoleNotifications";

const RoleStep: React.FC<OnboardingStepProps> = ({ 
  data, 
  updateData, 
  onNext,
  onBack
}) => {
  const handleRoleSelect = (role: UserRole) => {
    updateData({ role });
    onNext();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-emirati-desertRed text-center">Choose Your Role</h2>
      <p className="text-center text-muted-foreground">Select the role that best describes you.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {roleOptions.map((role) => {
          const IconComponent = role.icon;
          return (
            <div 
              key={role.id}
              onClick={() => handleRoleSelect(role.id)}
              className={`p-4 border rounded-lg cursor-pointer transition-all ${
                data.role === role.id 
                  ? 'border-emirati-oasisGreen bg-emirati-sandBeige/10' 
                  : 'border-emirati-sandBeige hover:border-emirati-desertGold'
              }`}
            >
              <div className="flex items-center space-x-4">
                <div>
                  <IconComponent className="w-8 h-8 text-emirati-oasisGreen" />
                </div>
                <div>
                  <h3 className="font-semibold">{role.name}</h3>
                  <p className="text-sm text-muted-foreground">{role.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button 
          onClick={onNext}
          className="bg-emirati-oasisGreen hover:bg-emirati-oasisGreen/90"
        >
          Continue <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default RoleStep;
