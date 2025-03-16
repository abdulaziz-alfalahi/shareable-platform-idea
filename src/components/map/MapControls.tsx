
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MapPinIcon } from 'lucide-react';
import { useLanguage } from '@/components/i18n/LanguageContext';

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
  const { t, language } = useLanguage();
  
  return (
    <div className={`space-y-4 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      {onLocationUpdate && (
        <div className="mb-4">
          <div className="flex gap-2">
            <Input
              placeholder={t('map.location')}
              value={locationSearch}
              onChange={(e) => setLocationSearch(e.target.value)}
              className="flex-1"
              onKeyDown={(e) => {
                if (e.key === 'Enter') searchLocation();
              }}
            />
            <Button onClick={searchLocation}>{t('action.search')}</Button>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {t('map.tip')}
          </p>
        </div>
      )}
      
      <div className="flex items-center gap-4 mb-4">
        <MapPinIcon className="text-emirati-oasisGreen" />
        <div className="flex-1">
          <label htmlFor="radius" className="block text-sm font-medium mb-1">
            {t('map.radius')}: {searchRadius} km
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
