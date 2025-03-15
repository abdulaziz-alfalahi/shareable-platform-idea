
import { Student } from "@/types/student";

// Mock student data that conforms to the Student type
export const studentData: Student = {
  id: 123,
  name: "Mohammed Al Mansoori",
  program: "Computer Science",
  year: 3,
  gradeLevel: "university-3",
  gpa: 3.75,
  advisingStatus: "On Track",
  riskLevel: "Low",
  progress: 65,
  lastMeeting: "2023-10-10",
  nextMeeting: "2023-11-15",
  careerPath: "Software Engineering",
  flagged: false,
  coursesCompleted: 12,
  totalCourses: 32,
  achievements: ["Dean's List 2023", "Hackathon Winner"],
  notes: "Mohammed is making excellent progress in his studies.",
  goals: [],
  feedback: [],
  passportStamps: [],
  careerMilestones: [],
  passportLevel: 3,
  totalPoints: 3620,
  leaderboardRank: 4,
  inProgressCourses: 3,
  nextAssessment: "2023-11-15T13:00:00"
};

export const leaderboardData = [
  { name: "Ahmed M.", score: 4250, position: 1 },
  { name: "Fatima K.", score: 3980, position: 2 },
  { name: "Mohammed A.", score: 3780, position: 3 },
  { name: studentData.name, score: studentData.totalPoints, position: studentData.leaderboardRank || 4, isCurrentUser: true },
  { name: "Omar S.", score: 3450, position: 5 }
];
