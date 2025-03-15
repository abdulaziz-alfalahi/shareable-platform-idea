
import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LocationIcon from "./location/LocationIcon";
import LocationSuggestions from "./location/LocationSuggestions";
import MapToggleButton from "./location/MapToggleButton";
import { filterLocationSuggestions } from "@/utils/locationUtils";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { MapIcon } from "lucide-react";

interface LocationFieldProps {
  location: string;
  setLocation: (location: string) => void;
}

const LocationField: React.FC<LocationFieldProps> = ({
  location,
  setLocation,
}) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [showMap, setShowMap] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Update suggestions when location input changes
    const filteredSuggestions = filterLocationSuggestions(location);
    setSuggestions(filteredSuggestions);
  }, [location]);

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
    setShowSuggestions(true);
  };

  const handleSuggestionSelect = (suggestion: string) => {
    setLocation(suggestion);
    setShowSuggestions(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleBlur = () => {
    // Small delay to allow click on suggestion
    setTimeout(() => setShowSuggestions(false), 150);
  };

  const handleFocus = () => {
    if (location.length >= 2) {
      setShowSuggestions(true);
    }
  };

  const toggleMap = () => {
    setShowMap(!showMap);
  };

  return (
    <div className="grid gap-2">
      <div className="flex justify-between items-center">
        <Label htmlFor="location">Interview Location</Label>
        <MapToggleButton onClick={toggleMap} isMapOpen={showMap} />
      </div>
      
      <div className="relative">
        <Input
          id="location"
          ref={inputRef}
          value={location}
          onChange={handleLocationChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          placeholder="Enter interview location"
          className="pl-10"
        />
        <LocationIcon />
        
        <LocationSuggestions
          suggestions={suggestions}
          isVisible={showSuggestions}
          onSelect={handleSuggestionSelect}
        />
      </div>

      {showMap && (
        <div className="mt-2 border rounded-md p-4">
          <Alert className="bg-emirati-sandBeige/10 border-emirati-oasisGreen">
            <MapIcon className="h-5 w-5 text-emirati-oasisGreen" />
            <AlertTitle>Map Feature Temporarily Unavailable</AlertTitle>
            <AlertDescription>
              We're currently improving our map functionality. Please enter the location manually.
            </AlertDescription>
          </Alert>
        </div>
      )}
    </div>
  );
};

export default LocationField;
