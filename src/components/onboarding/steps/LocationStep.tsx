
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, Map } from "lucide-react";
import { OnboardingStepProps } from "../types";
import { uaeLocations } from "@/utils/locationUtils";

const LocationStep: React.FC<OnboardingStepProps> = ({ 
  data, 
  updateData, 
  onNext,
  onBack
}) => {
  const [locationSuggestions, setLocationSuggestions] = React.useState<string[]>([]);

  const handleLocationSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    updateData({ location: value });
    
    if (value.length >= 2) {
      // Filter UAE locations based on input
      const suggestions = uaeLocations.filter(
        location => location.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 5);
      setLocationSuggestions(suggestions);
    } else {
      setLocationSuggestions([]);
    }
  };

  const selectLocation = (location: string) => {
    updateData({ location });
    setLocationSuggestions([]);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-emirati-desertRed text-center">Where Are You Located?</h2>
      <p className="text-center text-muted-foreground">This helps us personalize opportunities near you.</p>
      
      <div className="space-y-4 mt-6">
        <div className="relative">
          <label htmlFor="location" className="block text-sm font-medium mb-1">
            Your Location in UAE
          </label>
          <div className="flex items-center">
            <Map className="h-5 w-5 text-emirati-camelBrown absolute left-3" />
            <input 
              type="text" 
              id="location" 
              value={data.location} 
              onChange={handleLocationSearch}
              className="w-full pl-10 px-4 py-2 border border-emirati-sandBeige rounded-md focus:outline-none focus:ring-2 focus:ring-emirati-oasisGreen"
              placeholder="Enter your city or emirate"
            />
          </div>
          
          {locationSuggestions.length > 0 && (
            <div className="absolute w-full mt-1 bg-white shadow-lg border border-emirati-sandBeige rounded-md z-10">
              {locationSuggestions.map((location, index) => (
                <div 
                  key={index}
                  onClick={() => selectLocation(location)}
                  className="px-4 py-2 cursor-pointer hover:bg-emirati-sandBeige/20"
                >
                  {location}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-4">
          <p className="text-sm text-muted-foreground">
            The UAE consists of seven emirates: Abu Dhabi, Dubai, Sharjah, Ajman, Umm Al Quwain, Ras Al Khaimah, and Fujairah.
          </p>
        </div>
      </div>
      
      <div className="mt-6 flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button 
          onClick={onNext}
          disabled={!data.location.trim()}
          className="bg-emirati-oasisGreen hover:bg-emirati-oasisGreen/90"
        >
          Continue <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default LocationStep;
