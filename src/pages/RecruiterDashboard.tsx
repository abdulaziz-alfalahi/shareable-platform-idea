
import React, { useState, useEffect } from "react";
import { useToast } from "@/hooks/toast";
import { notifyRecruiter, notifySuccess } from "@/utils/notification";
import ScheduleInterviewDialog from "@/components/recruiter/ScheduleInterviewDialog";
import RoleNotifications from "@/components/notifications/RoleNotifications";
import { Button } from "@/components/ui/button";

const vacancies = [
  {
    id: 1,
    title: "UI/UX Designer",
    department: "Digital Products",
    location: "Downtown Dubai, UAE",
    type: "Full-time",
    requirements: ["UI/UX design experience", "Figma proficiency", "User research"],
    status: "Open",
    datePosted: "2023-10-15",
    coordinates: { latitude: 25.2048, longitude: 55.2708 }
  },
  {
    id: 2,
    title: "Data Scientist",
    department: "Analytics",
    location: "Abu Dhabi, UAE",
    type: "Full-time",
    requirements: ["Python", "Machine Learning", "Statistical Analysis"],
    status: "Open",
    datePosted: "2023-10-10",
    coordinates: { latitude: 24.4539, longitude: 54.3773 }
  },
  {
    id: 3,
    title: "Software Engineer",
    department: "IT",
    location: "Sharjah, UAE",
    type: "Full-time",
    requirements: ["Java", "Spring Boot", "Microservices"],
    status: "Draft",
    datePosted: "2023-10-18",
    coordinates: { latitude: 25.3463, longitude: 55.4209 }
  },
  {
    id: 4,
    title: "Project Manager",
    department: "Operations",
    location: "Dubai, UAE",
    type: "Contract",
    requirements: ["Project Management", "Agile methodologies", "Stakeholder management"],
    status: "Closed",
    datePosted: "2023-09-05",
    coordinates: { latitude: 25.0657, longitude: 55.1713 }
  }
];

const RecruiterDashboard = () => {
  const [activeTab, setActiveTab] = useState("vacancies");
  const [isScheduleInterviewDialogOpen, setIsScheduleInterviewDialogOpen] = useState(false);
  const [showNotificationsPanel, setShowNotificationsPanel] = useState(false);

  // Set up demo notifications
  useEffect(() => {
    setTimeout(() => {
      notifyRecruiter({
        title: "New Application",
        description: "Sarah Johnson has applied for UI/UX Designer position",
      });
    }, 2500);

    setTimeout(() => {
      notifyRecruiter({
        title: "Upcoming Interview",
        description: "Interview with Michael Brown in 30 minutes",
      });
    }, 4500);
  }, []);

  const handleScheduleInterview = (interviewData: any) => {
    console.log("Scheduling interview:", interviewData);
    notifySuccess({
      title: "Interview Scheduled",
      description: `Interview with ${interviewData.candidateName} for ${interviewData.position} scheduled on ${interviewData.date.toLocaleDateString()} at ${interviewData.time}.`,
    });
    setIsScheduleInterviewDialogOpen(false);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-emirati-desertRed">Recruiter Dashboard</h1>
        <div className="flex items-center gap-4">
          <RoleNotifications 
            role="recruiter"
            showNotificationsPanel={showNotificationsPanel}
            setShowNotificationsPanel={setShowNotificationsPanel}
          />
          <Button onClick={() => setIsScheduleInterviewDialogOpen(true)}>
            Schedule Interview
          </Button>
        </div>
      </div>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
        <div className="border-b">
          <div className="flex">
            <button
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === "vacancies" ? "border-b-2 border-emirati-desertRed text-emirati-desertRed" : "text-gray-500"
              }`}
              onClick={() => setActiveTab("vacancies")}
            >
              Job Vacancies
            </button>
            <button
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === "applications" ? "border-b-2 border-emirati-desertRed text-emirati-desertRed" : "text-gray-500"
              }`}
              onClick={() => setActiveTab("applications")}
            >
              Applications
            </button>
            <button
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === "candidates" ? "border-b-2 border-emirati-desertRed text-emirati-desertRed" : "text-gray-500"
              }`}
              onClick={() => setActiveTab("candidates")}
            >
              Candidates
            </button>
            <button
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === "interviews" ? "border-b-2 border-emirati-desertRed text-emirati-desertRed" : "text-gray-500"
              }`}
              onClick={() => setActiveTab("interviews")}
            >
              Interviews
            </button>
          </div>
        </div>
        <div className="p-6">
          {activeTab === "vacancies" && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Active Job Vacancies</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {vacancies.filter(v => v.status === "Open").map((vacancy) => (
                  <div key={vacancy.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <h3 className="text-lg font-medium text-emirati-oasisGreen">{vacancy.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{vacancy.department} | {vacancy.location}</p>
                    <div className="mt-2">
                      <span className="inline-block bg-emirati-sandBeige/20 rounded-full px-3 py-1 text-sm font-semibold text-emirati-desertRed">
                        {vacancy.type}
                      </span>
                    </div>
                    <div className="mt-3">
                      <p className="text-sm font-medium">Requirements:</p>
                      <ul className="mt-1 pl-5 text-sm text-gray-600 list-disc">
                        {vacancy.requirements.map((req, index) => (
                          <li key={index}>{req}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeTab === "applications" && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Recent Applications</h2>
              <p>Application management interface will be displayed here.</p>
            </div>
          )}
          {activeTab === "candidates" && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Candidate Pool</h2>
              <p>Candidate search and management interface will be displayed here.</p>
            </div>
          )}
          {activeTab === "interviews" && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Upcoming Interviews</h2>
              <p>Interview schedule and management interface will be displayed here.</p>
            </div>
          )}
        </div>
      </div>
      
      <ScheduleInterviewDialog
        open={isScheduleInterviewDialogOpen}
        onOpenChange={setIsScheduleInterviewDialogOpen}
        onSchedule={handleScheduleInterview}
      />
    </div>
  );
};

export default RecruiterDashboard;
