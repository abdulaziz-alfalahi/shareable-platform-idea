
import React from "react";
import RecruiterNotifications from "./RecruiterNotifications";

interface RecruiterDashboardHeaderProps {
  showNotificationsPanel: boolean;
  setShowNotificationsPanel: (show: boolean) => void;
}

const RecruiterDashboardHeader: React.FC<RecruiterDashboardHeaderProps> = ({
  showNotificationsPanel,
  setShowNotificationsPanel
}) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold">Recruiter Dashboard</h1>
      <RecruiterNotifications 
        showNotificationsPanel={showNotificationsPanel}
        setShowNotificationsPanel={setShowNotificationsPanel}
      />
    </div>
  );
};

export default RecruiterDashboardHeader;
