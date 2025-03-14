
import React from "react";
import { Building, MapPin, Search } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TrainingCenter } from "@/utils/trainingCentersService";

interface TrainingCenterListProps {
  centers: TrainingCenter[];
  isLoading: boolean;
  searchTerm: string;
  activeCenter: string | null;
  onSearchChange: (value: string) => void;
  onCenterSelect: (centerId: string) => void;
}

const TrainingCenterList: React.FC<TrainingCenterListProps> = ({
  centers,
  isLoading,
  searchTerm,
  activeCenter,
  onSearchChange,
  onCenterSelect
}) => {
  const filteredCenters = centers.filter(center =>
    center.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (center.location && center.location.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Building className="mr-2 h-5 w-5 text-emirati-oasisGreen" />
          Training Centers
        </CardTitle>
        <CardDescription>
          Browse accredited training centers
        </CardDescription>
        <div className="mt-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search centers..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Loading training centers...</p>
          </div>
        ) : filteredCenters.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No training centers found</p>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredCenters.map((center) => (
              <div 
                key={center.id}
                className={`p-3 rounded-md cursor-pointer transition-colors ${
                  activeCenter === center.id ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'
                }`}
                onClick={() => onCenterSelect(center.id)}
              >
                <h3 className="font-medium text-base">{center.name}</h3>
                {center.location && (
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <MapPin className="h-3.5 w-3.5 mr-1" />
                    {center.location}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TrainingCenterList;
