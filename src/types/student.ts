export interface StudentGoal {
  id: number;
  title: string;
  deadline: string;
  status: "Completed" | "In Progress" | "Not Started";
}

export interface StudentFeedback {
  id: number;
  type: string;
  date: string;
  content: string;
  advisor: string;
}

export interface PassportStamp {
  id: number;
  title: string;
  description: string;
  category: "Workshop" | "Assessment" | "Training" | "Employment" | "Education" | "Skills" | "Cultural";
  iconName: string;
  dateEarned: string;
  level: "Bronze" | "Silver" | "Gold";
  featured: boolean;
}

export interface CareerMilestone {
  id: number;
  title: string;
  description: string;
  dateAchieved: string;
  points: number;
  badgeUrl?: string;
}

export interface Challenge {
  id: number;
  title: string;
  description: string;
  requiredCount: number;
  currentProgress: number;
  category: "Workshop" | "Assessment" | "Training" | "Employment" | "Education" | "Skills";
  startDate: string;
  endDate: string;
  rewardTitle: string;
  rewardLevel: "Bronze" | "Silver" | "Gold";
}

export interface Student {
  id: number;
  name: string;
  program: string;
  year: number;
  gradeLevel: "grade-10" | "grade-11" | "grade-12" | "university-1" | "university-2" | "university-3" | "university-4";
  gpa: number;
  advisingStatus: string;
  riskLevel: string;
  progress: number;
  lastMeeting: string;
  nextMeeting: string;
  careerPath: string;
  flagged: boolean;
  coursesCompleted: number;
  totalCourses: number;
  achievements: string[];
  notes: string;
  goals: StudentGoal[];
  feedback: StudentFeedback[];
  passportStamps: PassportStamp[];
  careerMilestones: CareerMilestone[];
  passportLevel: number;
  totalPoints: number;
  skillsProgress?: number;
  certificationsProgress?: number;
  activeChallenges?: Challenge[];
  leaderboardRank?: number;
  inProgressCourses?: number;
  nextAssessment?: string;
  careerStage?: string;
  location?: string;
}

export interface FeedbackForm {
  studentId: number;
  type: string;
  content: string;
}

export interface GoalForm {
  studentId: number;
  title: string;
  deadline: string;
}

export interface PerformanceData {
  program: string;
  semester: string;
  averageGPA: number;
}
