
import React from "react";
import { Student } from "@/types/student";
import PassportWidget from "./PassportWidget";
import LeaderboardCard from "./LeaderboardCard";

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

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <PassportWidget student={student} />
      </div>
      <div>
        <LeaderboardCard 
          data={leaderboardData}
          title="Passport Leaderboard"
          description="Top achievers this month"
          category="Career Growth"
        />
      </div>
    </div>
  );
};

export default PassportMainContent;
