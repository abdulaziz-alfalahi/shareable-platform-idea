
import React, { useState } from "react";
import { Building, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface LocationFieldProps {
  location: string;
  setLocation: (location: string) => void;
}

const LocationField: React.FC<LocationFieldProps> = ({
  location,
  setLocation,
}) => {
  return (
    <div className="grid gap-2">
      <Label htmlFor="location">Interview Location</Label>
      <div className="relative">
        <Input
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter interview location"
          className="pl-10"
        />
        <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      </div>
    </div>
  );
};

export default LocationField;
