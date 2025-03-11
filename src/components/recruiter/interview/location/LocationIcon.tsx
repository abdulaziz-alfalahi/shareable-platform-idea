
import React from "react";
import { Building, MapPin } from "lucide-react";

interface LocationIconProps {
  useMapPin?: boolean;
  className?: string;
}

const LocationIcon: React.FC<LocationIconProps> = ({ 
  useMapPin = false, 
  className = "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" 
}) => {
  return useMapPin ? (
    <MapPin className={className} />
  ) : (
    <Building className={className} />
  );
};

export default LocationIcon;
