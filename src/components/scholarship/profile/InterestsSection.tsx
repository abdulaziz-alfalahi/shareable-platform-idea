
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus, X } from "lucide-react";
import { StudentScholarshipProfile } from "@/types/scholarship";

interface InterestsSectionProps {
  profile: StudentScholarshipProfile | null;
  addInterest: (interest: string) => Promise<void>;
  removeInterest: (index: number) => Promise<void>;
}

const InterestsSection: React.FC<InterestsSectionProps> = ({ 
  profile, 
  addInterest, 
  removeInterest 
}) => {
  const [newInterest, setNewInterest] = useState("");

  const handleAddInterest = async () => {
    if (!newInterest.trim()) return;
    await addInterest(newInterest);
    setNewInterest("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Areas of Interest</CardTitle>
        <CardDescription>
          Add subjects, fields, or careers you're interested in.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex space-x-2">
            <Input
              placeholder="Enter an area of interest"
              value={newInterest}
              onChange={(e) => setNewInterest(e.target.value)}
              className="flex-1"
            />
            <Button
              onClick={handleAddInterest}
              className="bg-emirati-oasisGreen hover:bg-emirati-oasisGreen/90"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add
            </Button>
          </div>

          <Separator className="my-4" />

          {profile?.areas_of_interest && profile.areas_of_interest.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {profile.areas_of_interest.map((interest, index) => (
                <div
                  key={index}
                  className="flex items-center bg-emirati-sandBeige/20 text-emirati-deepBrown px-3 py-1 rounded-full"
                >
                  <span>{interest}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeInterest(index)}
                    className="ml-1 h-6 w-6 p-0 text-emirati-deepBrown hover:bg-emirati-sandBeige/40"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>No areas of interest added yet.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default InterestsSection;
