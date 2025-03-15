
import React from "react";
import { Student } from "@/types/student";
import PassportWidget from "@/components/passport/PassportWidget";
import LeaderboardCard from "@/components/passport/LeaderboardCard";
import UpcomingAssessments from "../UpcomingAssessments";
import { leaderboardData } from "@/data/studentMockData";

interface OverviewTabProps {
  student: Student;
}

const OverviewTab: React.FC<OverviewTabProps> = ({ student }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <div className="grid grid-cols-1 gap-6">
          <PassportWidget student={student} />
          <UpcomingAssessments />
        </div>
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

export default OverviewTab;
