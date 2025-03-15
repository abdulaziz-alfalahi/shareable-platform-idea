
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Award, Filter } from "lucide-react";
import { Student } from "@/types/student";
import { 
  getStudentCulturalAchievementProgress, 
  filterAchievementsByCategory 
} from "@/utils/career/achievements/achievementChecker";
import { culturalAchievementCategories } from "@/utils/career/achievements/culturalAchievementData";
import AchievementCard from "./achievement/AchievementCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CulturalAchievementsProps {
  student: Student;
}

const CulturalAchievements: React.FC<CulturalAchievementsProps> = ({ student }) => {
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const allAchievements = getStudentCulturalAchievementProgress(student);
  
  const filteredAchievements = categoryFilter === "all" 
    ? allAchievements 
    : filterAchievementsByCategory(allAchievements, categoryFilter);
  
  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold text-primary flex items-center">
            <Award className="h-6 w-6 mr-2" />
            Cultural Achievements
          </CardTitle>
          
          <Select
            value={categoryFilter}
            onValueChange={setCategoryFilter}
          >
            <SelectTrigger className="w-[180px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {culturalAchievementCategories.map(category => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <CardDescription>
          Earn special badges inspired by UAE heritage and cultural values
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {filteredAchievements.length === 0 ? (
            <p className="text-center text-muted-foreground py-6">
              No achievements found in this category.
            </p>
          ) : (
            filteredAchievements.map((achievement) => (
              <AchievementCard 
                key={achievement.id} 
                achievement={achievement} 
              />
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CulturalAchievements;
