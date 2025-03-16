
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MapPinIcon } from 'lucide-react';

interface MapControlsProps {
  locationSearch: string;
  setLocationSearch: (location: string) => void;
  searchLocation: () => void;
  searchRadius: number;
  handleRadiusChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onLocationUpdate?: (jobs: any[]) => void;
}

const MapControls: React.FC<MapControlsProps> = ({
  locationSearch,
  setLocationSearch,
  searchLocation,
  searchRadius,
  handleRadiusChange,
  onLocationUpdate
}) => {
  return (
    <div className="space-y-4">
      {onLocationUpdate && (
        <div className="mb-4">
          <div className="flex gap-2">
            <Input
              placeholder="Search for a location..."
              value={locationSearch}
              onChange={(e) => setLocationSearch(e.target.value)}
              className="flex-1"
              onKeyDown={(e) => {
                if (e.key === 'Enter') searchLocation();
              }}
            />
            <Button onClick={searchLocation}>Search</Button>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Search for a location or click on the map to place the marker. Drag the marker to adjust the position.
          </p>
        </div>
      )}
      
      <div className="flex items-center gap-4 mb-4">
        <MapPinIcon className="text-emirati-oasisGreen" />
        <div className="flex-1">
          <label htmlFor="radius" className="block text-sm font-medium mb-1">
            Search Radius: {searchRadius} km
          </label>
          <Input
            id="radius"
            type="range"
            min="1"
            max="50"
            value={searchRadius}
            onChange={handleRadiusChange}
          />
        </div>
      </div>
    </div>
  );
};

export default MapControls;
