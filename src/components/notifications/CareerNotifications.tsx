
import { useEffect } from "react";
import { notifyInfo, notifySuccess, notifyWarning } from "@/utils/notification";

interface CareerNotificationsProps {
  studentId?: string;
}

// This component doesn't render anything visible,
// it just sets up notifications to be displayed at appropriate times
const CareerNotifications = ({ studentId }: CareerNotificationsProps) => {
  useEffect(() => {
    // Simulate real-time notifications with timeouts
    
    // Job opportunity notification
    const jobTimeout = setTimeout(() => {
      notifyInfo({
        title: "New Job Opportunity",
        description: "A new Software Engineer position at Dubai Technology was just posted that matches your skills.",
      });
    }, 15000); // After 15 seconds
    
    // Training recommendation
    const trainingTimeout = setTimeout(() => {
      notifySuccess({
        title: "Training Recommendation",
        description: "Based on job market trends, we recommend the 'Advanced Cloud Computing' course.",
      });
    }, 30000); // After 30 seconds
    
    // Mentor match
    const mentorTimeout = setTimeout(() => {
      notifyInfo({
        title: "Mentor Match Found",
        description: "Fatima Al-Mansouri, Senior Developer at Abu Dhabi Digital, is available for mentorship.",
      });
    }, 45000); // After 45 seconds
    
    // Skill gap alert
    const skillGapTimeout = setTimeout(() => {
      notifyWarning({
        title: "Skill Gap Detected",
        description: "Adding Docker to your skillset could increase your job matches by 30%.",
      });
    }, 60000); // After 60 seconds

    return () => {
      // Clean up timeouts
      clearTimeout(jobTimeout);
      clearTimeout(trainingTimeout);
      clearTimeout(mentorTimeout);
      clearTimeout(skillGapTimeout);
    };
  }, [studentId]);

  // This component doesn't render anything visible
  return null;
};

export default CareerNotifications;
