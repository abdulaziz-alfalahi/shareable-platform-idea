
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AchievementNotification from '@/components/gamification/AchievementNotification';
import StreakCounter from '@/components/gamification/StreakCounter';
import PointsWidget from '@/components/gamification/PointsWidget';
import PointsHistory from '@/components/gamification/PointsHistory';
import QuestTracker, { Quest } from '@/components/gamification/QuestTracker';
import RewardShop from '@/components/gamification/RewardShop';
import ProgressVisualization from '@/components/gamification/ProgressVisualization';
import { GamificationProvider, useGamification } from '@/contexts/GamificationContext';
import { studentData } from '@/data/studentMockData';
import { PassportStamp } from '@/types/student';
import { GraduationCap, Gift, Map, ChartLine, TrendingUp } from 'lucide-react';
import { UaeGeometricPattern } from '@/components/ui/uae';

// Mock quests data
const mockQuests: Quest[] = [
  {
    id: 'career-path-quest',
    title: 'Career Pathfinder',
    description: 'Complete these steps to clarify your career direction',
    steps: [
      {
        id: 'career-assessment',
        title: 'Complete Career Assessment',
        description: 'Take the full career aptitude assessment',
        pointsReward: 50,
        isCompleted: true
      },
      {
        id: 'research-industries',
        title: 'Research Industries',
        description: 'Research 3 potential industries',
        pointsReward: 30,
        isCompleted: false
      },
      {
        id: 'mentor-meeting',
        title: 'Meet with Mentor',
        description: 'Schedule and complete a mentor meeting',
        pointsReward: 75,
        isCompleted: false
      }
    ],
    reward: {
      title: 'Career Clarity Badge',
      description: 'Special badge for your profile',
      points: 100,
      iconName: 'award'
    },
    deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    category: 'career'
  },
  {
    id: 'emirati-heritage-quest',
    title: 'Emirati Heritage Explorer',
    description: 'Connect your career journey with UAE cultural elements',
    steps: [
      {
        id: 'cultural-workshop',
        title: 'Attend Cultural Workshop',
        description: 'Participate in a UAE heritage workshop',
        pointsReward: 40,
        isCompleted: false
      },
      {
        id: 'connect-traditions',
        title: 'Relate Traditions to Career',
        description: 'Write reflection on UAE values in your field',
        pointsReward: 35,
        isCompleted: false
      },
      {
        id: 'network-event',
        title: 'Network with UAE Professionals',
        description: 'Connect with 3 UAE professionals in your field',
        pointsReward: 60,
        isCompleted: false
      }
    ],
    reward: {
      title: 'Heritage Connection Badge',
      description: 'Special cultural badge for your profile',
      points: 120,
      iconName: 'palm-tree'
    },
    category: 'cultural'
  }
];

// Inner component that uses the gamification context
const GamificationDashboardContent: React.FC = () => {
  const { 
    points, 
    level, 
    streak, 
    badges, 
    recentAchievements 
  } = useGamification();
  
  const [activeTab, setActiveTab] = useState("overview");
  const [recentAchievement, setRecentAchievement] = useState<PassportStamp | null>(null);
  
  // Show achievement notification when a new one is earned
  useEffect(() => {
    if (recentAchievements && recentAchievements.length > 0) {
      setRecentAchievement(recentAchievements[0]);
    }
  }, [recentAchievements]);
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Cultural design elements */}
      <div className="absolute right-0 top-0 w-full h-64 overflow-hidden -z-10 opacity-10">
        <UaeGeometricPattern type="dune" position="background" size="lg" className="w-full h-full" />
      </div>
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-emirati-deepBlue mb-2">Gamification Dashboard</h1>
        <p className="text-gray-600">Track your progress, complete challenges, and earn rewards</p>
      </div>
      
      {/* Stats overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <StreakCounter streak={streak} />
        <PointsWidget 
          points={points} 
          level={level} 
          nextLevelAt={level * 500} 
        />
        <div className="bg-white border rounded-md p-4 flex items-center gap-4 shadow-sm">
          <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
            <GraduationCap className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Achievements</p>
            <p className="text-2xl font-bold">{badges.length}</p>
          </div>
        </div>
      </div>
      
      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="mb-4">
          <TabsTrigger value="overview" className="flex items-center gap-1">
            <TrendingUp className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="quests" className="flex items-center gap-1">
            <Map className="h-4 w-4" />
            Quests
          </TabsTrigger>
          <TabsTrigger value="rewards" className="flex items-center gap-1">
            <Gift className="h-4 w-4" />
            Rewards
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-1">
            <ChartLine className="h-4 w-4" />
            Points History
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          {/* Journey progress visualization */}
          <ProgressVisualization />
        </TabsContent>
        
        <TabsContent value="quests" className="space-y-6">
          {/* Active quests */}
          <QuestTracker quests={mockQuests} />
        </TabsContent>
        
        <TabsContent value="rewards" className="space-y-6">
          {/* Reward shop */}
          <RewardShop />
        </TabsContent>
        
        <TabsContent value="history" className="space-y-6">
          {/* Points history */}
          <PointsHistory />
        </TabsContent>
      </Tabs>
      
      {/* Achievement notification */}
      <AchievementNotification 
        achievement={recentAchievement} 
        onClose={() => setRecentAchievement(null)} 
      />
    </div>
  );
};

// Main component with provider wrapper
const GamificationDashboard: React.FC = () => {
  return (
    <GamificationProvider studentId={studentData.id}>
      <GamificationDashboardContent />
    </GamificationProvider>
  );
};

export default GamificationDashboard;
