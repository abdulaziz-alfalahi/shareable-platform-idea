
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

export interface Student {
  id: number;
  name: string;
  program: string;
  year: number;
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
