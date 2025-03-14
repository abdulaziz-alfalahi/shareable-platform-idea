
import React from "react";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FormSuccessProps {
  title: string;
  description: string;
  onReset: () => void;
  resetButtonText?: string;
}

const FormSuccess: React.FC<FormSuccessProps> = ({
  title,
  description,
  onReset,
  resetButtonText = "Add Another Record"
}) => {
  return (
    <Card className="p-6 text-center">
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="bg-green-100 p-3 rounded-full">
          <Check className="h-10 w-10 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        <p className="text-gray-600 max-w-md">
          {description}
        </p>
        <div className="flex space-x-3 mt-4">
          <Button 
            variant="outline" 
            onClick={onReset}
          >
            {resetButtonText}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default FormSuccess;
