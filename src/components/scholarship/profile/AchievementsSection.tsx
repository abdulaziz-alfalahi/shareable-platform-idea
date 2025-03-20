
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus, X } from "lucide-react";
import { StudentScholarshipProfile } from "@/types/scholarship";

interface AchievementsSectionProps {
  profile: StudentScholarshipProfile | null;
  addAchievement: (achievement: string) => Promise<void>;
  removeAchievement: (index: number) => Promise<void>;
}

const AchievementsSection: React.FC<AchievementsSectionProps> = ({ 
  profile, 
  addAchievement, 
  removeAchievement 
}) => {
  const [newAchievement, setNewAchievement] = useState("");

  const handleAddAchievement = async () => {
    if (!newAchievement.trim()) return;
    await addAchievement(newAchievement);
    setNewAchievement("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Achievements</CardTitle>
        <CardDescription>
          Add your academic, extracurricular, and professional achievements.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex space-x-2">
            <Input
              placeholder="Enter an achievement"
              value={newAchievement}
              onChange={(e) => setNewAchievement(e.target.value)}
              className="flex-1"
            />
            <Button
              onClick={handleAddAchievement}
              className="bg-emirati-oasisGreen hover:bg-emirati-oasisGreen/90"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add
            </Button>
          </div>

          <Separator className="my-4" />

          {profile?.achievements && profile.achievements.length > 0 ? (
            <ul className="space-y-3">
              {profile.achievements.map((achievement, index) => (
                <li key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                  <span>{achievement}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeAchievement(index)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>No achievements added yet.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AchievementsSection;
