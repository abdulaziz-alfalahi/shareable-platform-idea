
import React, { useEffect } from "react";
import { notifyAdvisor } from "@/utils/notification";

const DashboardDemoNotifications: React.FC = () => {
  useEffect(() => {
    // Simulate notifications for demo purposes
    const timer1 = setTimeout(() => {
      notifyAdvisor({
        title: "Student at Risk",
        description: "Ahmed Al-Mansoori has missed 3 consecutive classes",
      });
    }, 2000);

    const timer2 = setTimeout(() => {
      notifyAdvisor({
        title: "Upcoming Meetings",
        description: "You have 3 student meetings scheduled for today",
      });
    }, 4000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  // This component doesn't render anything
  return null;
};

export default DashboardDemoNotifications;
