
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Student, PassportStamp } from "@/types/student";
import { Award, ArrowRight, Trophy, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { passportCache } from "@/utils/cacheUtils";

interface PassportWidgetProps {
  student: Student;
}

const PassportWidget: React.FC<PassportWidgetProps> = ({ student }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [recentAchievements, setRecentAchievements] = useState<PassportStamp[]>([]);
  
  // Use effect to load cached data if available
  useEffect(() => {
    const fetchCachedData = async () => {
      setLoading(true);
      try {
        // Get cached passport data if available
        const cachedData = passportCache.get<PassportStamp[]>(`recentAchievements:${student.id}`);
        
        if (cachedData) {
          setRecentAchievements(cachedData);
        } else {
          // If not cached, compute and cache it
          const sortedAchievements = student.passportStamps
            .sort((a, b) => new Date(b.dateEarned).getTime() - new Date(a.dateEarned).getTime())
            .slice(0, 3);
          
          setRecentAchievements(sortedAchievements);
          
          // Cache for future use
          passportCache.set(`recentAchievements:${student.id}`, sortedAchievements, { ttl: 300 }); // 5 minutes
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchCachedData();
  }, [student.id, student.passportStamps]);
    
  // Calculate next level progress
  const nextLevelPoints = 500 * (student.passportLevel + 1);
  const progressToNextLevel = Math.min(Math.round((student.totalPoints / nextLevelPoints) * 100), 100);
  
  // Memoized icon component function for better performance
  const getIconComponent = React.useCallback((iconName: string) => {
    switch (iconName) {
      case "award": return <Award className="h-4 w-4" />;
      case "trophy": return <Trophy className="h-4 w-4" />;
      case "star": return <Star className="h-4 w-4" />;
      default: return <Award className="h-4 w-4" />;
    }
  }, []);

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center justify-between">
          <span className="flex items-center">
            <Award className="mr-2 h-5 w-5 text-primary" />
            Career Passport
          </span>
          <span className="text-sm font-normal text-muted-foreground">
            Level {student.passportLevel}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Level progress */}
        <div className="mt-2 mb-4">
          <div className="flex justify-between text-xs mb-1">
            <span>Progress to Level {student.passportLevel + 1}</span>
            <span>{student.totalPoints} / {nextLevelPoints} points</span>
          </div>
          <Progress value={progressToNextLevel} className="h-1.5" />
        </div>
        
        {/* Recent achievements */}
        <div className="space-y-2 mb-4">
          {loading ? (
            <div className="text-center py-2">
              <p className="text-sm text-muted-foreground">Loading achievements...</p>
            </div>
          ) : recentAchievements.length > 0 ? (
            <>
              <h4 className="text-xs font-medium text-muted-foreground">Recent Achievements</h4>
              {recentAchievements.map((stamp: PassportStamp) => (
                <div key={stamp.id} className="flex items-center space-x-2 py-1 border-b last:border-0">
                  <div className="p-1 bg-primary/10 rounded">
                    {getIconComponent(stamp.iconName)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{stamp.title}</p>
                    <p className="text-xs text-muted-foreground">{stamp.dateEarned}</p>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="text-center py-4">
              <p className="text-sm text-muted-foreground">No achievements yet</p>
            </div>
          )}
        </div>
        
        <Button 
          variant="outline" 
          className="w-full" 
          size="sm"
          onClick={() => navigate(`/career-passport/${student.id}`)}
        >
          View Full Passport <ArrowRight className="ml-1 h-3 w-3" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default React.memo(PassportWidget);
