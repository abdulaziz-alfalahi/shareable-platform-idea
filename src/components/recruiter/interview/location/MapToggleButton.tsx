
import React from "react";
import { Button } from "@/components/ui/button";
import { Map } from "lucide-react";

interface MapToggleButtonProps {
  onClick: () => void;
  isMapOpen: boolean;
}

const MapToggleButton: React.FC<MapToggleButtonProps> = ({ onClick, isMapOpen }) => {
  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className="flex items-center gap-1" 
      onClick={onClick}
    >
      <Map className="h-4 w-4" />
      {isMapOpen ? "Hide Map" : "Show Map"}
    </Button>
  );
};

export default MapToggleButton;
