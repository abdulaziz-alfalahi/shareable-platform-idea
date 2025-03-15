
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, MapPin, Star, Check } from 'lucide-react';
import { useGamification } from '@/contexts/GamificationContext';
import { motion } from 'framer-motion';
import { PassportStamp } from '@/types/student';

const milestones = [
  { level: 1, title: "Journey Begins", icon: "map", reached: true },
  { level: 2, title: "Explorer", icon: "star", reached: true },
  { level: 3, title: "Achiever", icon: "trophy", reached: false },
  { level: 5, title: "Mentor", icon: "users", reached: false },
  { level: 7, title: "Leader", icon: "award", reached: false },
  { level: 10, title: "Master", icon: "crown", reached: false },
];

const ProgressVisualization: React.FC = () => {
  const { level, points, badges } = useGamification();
  
  // Calculate next level threshold
  const nextLevelThreshold = level * 500;
  const currentLevelThreshold = (level - 1) * 500;
  const progress = ((points - currentLevelThreshold) / (nextLevelThreshold - currentLevelThreshold)) * 100;
  
  // Get the most recent badges
  const recentBadges = badges.slice(0, 3);
  
  // Determine which milestones have been reached
  const updatedMilestones = milestones.map(milestone => ({
    ...milestone,
    reached: level >= milestone.level
  }));
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <Trophy className="h-5 w-5 text-amber-500" />
          Your Journey
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {/* Level and points */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/20 mb-3">
              <span className="text-4xl font-bold text-primary">{level}</span>
            </div>
            <h3 className="text-xl font-semibold">Level {level}</h3>
            <p className="text-sm text-muted-foreground mb-3">
              {points} points • {nextLevelThreshold - points} points to next level
            </p>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
          
          {/* Journey map visualization */}
          <div className="relative py-6">
            {/* Connection line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-muted -translate-x-1/2 z-0" />
            
            {/* Milestones */}
            <div className="relative z-10 space-y-8">
              {updatedMilestones.map((milestone, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex-1 text-right pr-4">
                    <p className={`font-medium ${milestone.reached ? 'text-primary' : 'text-muted-foreground'}`}>
                      {milestone.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Level {milestone.level}
                    </p>
                  </div>
                  
                  <motion.div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                      milestone.reached 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted text-muted-foreground'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    animate={milestone.reached ? { 
                      scale: [1, 1.2, 1],
                      transition: { duration: 0.5, repeat: 0 }
                    } : {}}
                  >
                    {milestone.reached ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Star className="h-4 w-4" />
                    )}
                  </motion.div>
                  
                  <div className="flex-1 pl-4">
                    {index === 0 && milestone.reached && (
                      <p className="text-xs text-green-600">Completed</p>
                    )}
                    {level === milestone.level && (
                      <p className="text-xs text-blue-600">Current Level</p>
                    )}
                    {level + 1 === milestone.level && (
                      <p className="text-xs text-amber-600">Next Milestone</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Recent achievements */}
          {recentBadges.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-3">Recent Achievements</h4>
              <div className="space-y-2">
                {recentBadges.map((badge, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-muted/50 rounded-md">
                    <div className="p-1 bg-primary/10 rounded-full">
                      <Star className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{badge.title}</p>
                      <p className="text-xs text-muted-foreground">{badge.dateEarned}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressVisualization;
