
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OverviewTab from "@/components/student/dashboard/tabs/OverviewTab";
import AssessmentsTab from "@/components/student/dashboard/tabs/AssessmentsTab";
import CoursesTab from "@/components/student/dashboard/tabs/CoursesTab";
import CareerPathTab from "@/components/student/dashboard/tabs/CareerPathTab";
import MentorsTab from "@/components/student/dashboard/tabs/MentorsTab";
import ScholarshipsTab from "@/components/student/dashboard/tabs/ScholarshipsTab";
import { Student } from "@/types/student";

const StudentDashboard: React.FC = () => {
  // Mock student data with full Student type properties
  const student: Student = {
    id: 1,
    name: "Ahmed Mohammed",
    program: "Computer Engineering",
    year: 3,
    gradeLevel: "university-3",
    gpa: 3.8,
    advisingStatus: "Active",
    riskLevel: "Low",
    progress: 75,
    lastMeeting: "2023-05-10",
    nextMeeting: "2023-06-15",
    careerPath: "Software Development",
    flagged: false,
    coursesCompleted: 12,
    totalCourses: 20,
    achievements: ["Dean's List", "Hackathon Winner"],
    notes: "Excellent progress in core subjects",
    goals: [{
      id: 1,
      title: "Complete Advanced Programming Course",
      deadline: "2023-08-30",
      status: "In Progress"
    }],
    feedback: [{
      id: 1,
      type: "Academic",
      date: "2023-04-15",
      content: "Excellent work on your last project",
      advisor: "Dr. Khalid"
    }],
    passportStamps: [{
      id: 1,
      title: "Technical Skills Achievement",
      description: "Completed Python certification",
      category: "Skills",
      iconName: "code",
      dateEarned: "2023-03-20",
      level: "Silver",
      featured: true
    }],
    careerMilestones: [{
      id: 1,
      title: "First Internship",
      description: "Completed internship at Tech Co",
      dateAchieved: "2022-08-15",
      points: 100,
      badgeUrl: "/badges/internship.svg"
    }],
    passportLevel: 3,
    totalPoints: 450,
    activeChallenges: [{
      id: 1,
      title: "Complete 3 Technical Workshops",
      description: "Attend and complete workshops on emerging technologies",
      requiredCount: 3,
      currentProgress: 1,
      category: "Workshop",
      startDate: "2023-05-01",
      endDate: "2023-06-30",
      rewardTitle: "Workshop Enthusiast",
      rewardLevel: "Silver"
    }],
    leaderboardRank: 15,
    inProgressCourses: 4,
    nextAssessment: "2023-06-05",
    careerStage: "Advanced Learning",
    location: "Abu Dhabi"
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Student Dashboard</h1>
      
      <Tabs defaultValue="overview">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="assessments">Assessments</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="career-path">Career Path</TabsTrigger>
          <TabsTrigger value="mentors">Mentors</TabsTrigger>
          <TabsTrigger value="scholarships">Scholarships</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <OverviewTab student={student} />
        </TabsContent>
        
        <TabsContent value="assessments">
          <AssessmentsTab />
        </TabsContent>
        
        <TabsContent value="courses">
          <CoursesTab />
        </TabsContent>
        
        <TabsContent value="career-path">
          <CareerPathTab />
        </TabsContent>
        
        <TabsContent value="mentors">
          <MentorsTab />
        </TabsContent>
        
        <TabsContent value="scholarships">
          <ScholarshipsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentDashboard;
