
import React from "react";
import { Student } from "@/types/student";
import PassportWidget from "./PassportWidget";
import LeaderboardCard from "./LeaderboardCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Layers, Users, Trophy, MapPin } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import InteractivePassportStamp from "./InteractivePassportStamp";
import UaeGeometricPattern from "@/components/ui/uae/UaeGeometricPattern";

interface PassportMainContentProps {
  student: Student;
}

const PassportMainContent: React.FC<PassportMainContentProps> = ({ student }) => {
  const leaderboardData = [
    { name: "Ahmed M.", score: 4250, position: 1 },
    { name: "Fatima K.", score: 3980, position: 2 },
    { name: "Mohammed A.", score: 3780, position: 3 },
    { name: student.name, score: student.totalPoints, position: student.leaderboardRank || 4, isCurrentUser: true },
    { name: "Omar S.", score: 3450, position: 5 }
  ];

  // Get top stamps for the highlights section
  const topStamps = (student.passportStamps || [])
    .sort((a, b) => new Date(b.dateEarned).getTime() - new Date(a.dateEarned).getTime())
    .slice(0, 3);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        {/* Passport widget with improved styling */}
        <Card className="border-0 shadow-md overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-emirati-oasisGreen/90 to-emirati-palmGreen/90 text-white relative p-6">
            <UaeGeometricPattern 
              type="geometric" 
              position="background" 
              opacity={0.1} 
              className="absolute inset-0" 
            />
            <div className="relative z-10">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl flex items-center">
                  <Trophy className="mr-2 h-5 w-5" />
                  Career Journey
                </CardTitle>
                <span className="text-sm bg-white/20 px-2 py-1 rounded-full">
                  Level {student.passportLevel}
                </span>
              </div>
              <p className="text-sm mt-2 text-white/80">
                Track your professional growth and achievements
              </p>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <PassportWidget student={student} />
          </CardContent>
        </Card>

        {/* Passport highlights section */}
        <Card className="border-0 shadow-sm overflow-hidden">
          <CardHeader className="border-b bg-emirati-sandBeige/30 px-6">
            <CardTitle className="text-lg flex items-center text-emirati-deepBrown">
              <Layers className="mr-2 h-5 w-5 text-emirati-desertGold" />
              Passport Highlights
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Experience points */}
              <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-700">Experience Points</h3>
                  <span className="text-lg font-bold text-emirati-oasisGreen">{student.totalPoints}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Progress to Level {student.passportLevel + 1}</span>
                    <span>{student.totalPoints} / {500 * (student.passportLevel + 1)} points</span>
                  </div>
                  <Progress 
                    value={Math.min(Math.round((student.totalPoints / (500 * (student.passportLevel + 1))) * 100), 100)} 
                    className="h-2" 
                  />
                </div>
              </div>
              
              {/* Career position */}
              <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-700">Career Position</h3>
                  <span className="text-sm px-2 py-1 bg-emirati-desertGold/10 rounded-full text-emirati-camelBrown">
                    {student.careerPath || "Early Career"}
                  </span>
                </div>
                <div className="flex items-center mt-2">
                  <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-600">
                    Abu Dhabi, UAE
                  </span>
                </div>
              </div>
              
              {/* Recent achievements */}
              <div className="md:col-span-2">
                <h3 className="font-medium text-gray-700 mb-3">Recent Achievements</h3>
                <div className="space-y-3">
                  {topStamps.length > 0 ? (
                    topStamps.map((stamp) => (
                      <InteractivePassportStamp key={stamp.id} stamp={stamp} />
                    ))
                  ) : (
                    <div className="text-center py-4 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                      <p className="text-gray-500">Complete challenges to earn stamps!</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="space-y-6">
        {/* Leaderboard with improved styling */}
        <Card className="border-0 shadow-sm overflow-hidden">
          <CardHeader className="border-b bg-emirati-sandBeige/30 px-6">
            <CardTitle className="text-lg flex items-center text-emirati-deepBrown">
              <Users className="mr-2 h-5 w-5 text-emirati-camelBrown" />
              Leaderboard
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <LeaderboardCard 
              data={leaderboardData}
              title=""
              description=""
              category="Career Growth"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PassportMainContent;
