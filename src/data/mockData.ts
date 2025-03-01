
import { Student, PerformanceData } from "@/types/student";

export const students: Student[] = [
  {
    id: 1,
    name: "Alex Johnson",
    program: "Computer Science",
    year: 3,
    gpa: 3.78,
    advisingStatus: "On Track",
    riskLevel: "Low",
    progress: 75,
    lastMeeting: "2023-09-15",
    nextMeeting: "2023-11-10",
    careerPath: "Software Engineering",
    flagged: false,
    coursesCompleted: 24,
    totalCourses: 32,
    achievements: [
      "Dean's List 2023",
      "Hackathon Winner",
      "Research Assistant"
    ],
    notes: "Alex is making excellent progress. Shows particular aptitude for machine learning concepts. Has expressed interest in graduate studies.",
    goals: [
      {
        id: 101,
        title: "Complete Internship Application",
        deadline: "2023-11-30",
        status: "In Progress"
      },
      {
        id: 102,
        title: "Research Graduate Programs",
        deadline: "2024-01-15",
        status: "Not Started"
      }
    ],
    feedback: [
      {
        id: 201,
        type: "Academic",
        date: "2023-09-15",
        content: "Strong performance in algorithm analysis. Should consider taking advanced AI courses next semester.",
        advisor: "Dr. Smith"
      }
    ]
  },
  {
    id: 2,
    name: "Taylor Rivera",
    program: "Business Administration",
    year: 2,
    gpa: 3.25,
    advisingStatus: "Needs Attention",
    riskLevel: "Medium",
    progress: 48,
    lastMeeting: "2023-08-22",
    nextMeeting: "2023-10-25",
    careerPath: "Marketing",
    flagged: true,
    coursesCompleted: 15,
    totalCourses: 32,
    achievements: [
      "Marketing Club President",
      "Case Competition Finalist"
    ],
    notes: "Taylor has good leadership skills but is struggling with quantitative courses. Has missed two appointments in the past semester.",
    goals: [
      {
        id: 103,
        title: "Improve Mathematics Grade",
        deadline: "2023-12-15",
        status: "In Progress"
      },
      {
        id: 104,
        title: "Join Business Analytics Project",
        deadline: "2023-11-05",
        status: "Completed"
      }
    ],
    feedback: [
      {
        id: 202,
        type: "Academic",
        date: "2023-08-22",
        content: "Struggling with Business Statistics. Recommended tutoring services.",
        advisor: "Prof. Johnson"
      },
      {
        id: 203,
        type: "Personal",
        date: "2023-07-10",
        content: "Discussed work-life balance strategies. Taylor is overcommitted to extracurriculars.",
        advisor: "Prof. Johnson"
      }
    ]
  },
  {
    id: 3,
    name: "Jordan Chen",
    program: "Mechanical Engineering",
    year: 4,
    gpa: 3.91,
    advisingStatus: "On Track",
    riskLevel: "Low",
    progress: 94,
    lastMeeting: "2023-09-05",
    nextMeeting: "2023-11-15",
    careerPath: "Aerospace Engineering",
    flagged: false,
    coursesCompleted: 30,
    totalCourses: 32,
    achievements: [
      "Engineering Scholar Award",
      "Research Publication",
      "NASA Internship"
    ],
    notes: "Jordan is an exceptional student ready for graduation. Has already received job offers from top aerospace companies.",
    goals: [
      {
        id: 105,
        title: "Complete Senior Project",
        deadline: "2023-12-01",
        status: "In Progress"
      },
      {
        id: 106,
        title: "Evaluate Job Offers",
        deadline: "2023-11-30",
        status: "In Progress"
      }
    ],
    feedback: [
      {
        id: 204,
        type: "Career",
        date: "2023-09-05",
        content: "Discussed job offers and career trajectory. Provided guidance on evaluating compensation packages.",
        advisor: "Dr. Martinez"
      }
    ]
  },
  {
    id: 4,
    name: "Morgan Williams",
    program: "Psychology",
    year: 1,
    gpa: 2.45,
    advisingStatus: "At Risk",
    riskLevel: "High",
    progress: 15,
    lastMeeting: "2023-09-20",
    nextMeeting: "2023-10-15",
    careerPath: "Clinical Psychology",
    flagged: true,
    coursesCompleted: 5,
    totalCourses: 32,
    achievements: [],
    notes: "Morgan is struggling with the transition to university. Has missed several classes and is at risk of academic probation.",
    goals: [
      {
        id: 107,
        title: "Improve Attendance",
        deadline: "2023-10-30",
        status: "Not Started"
      },
      {
        id: 108,
        title: "Meet with Academic Success Coach",
        deadline: "2023-10-10",
        status: "Not Started"
      }
    ],
    feedback: [
      {
        id: 205,
        type: "Academic",
        date: "2023-09-20",
        content: "Serious concerns about academic performance. Recommended academic probation intervention program.",
        advisor: "Dr. Patel"
      },
      {
        id: 206,
        type: "Personal",
        date: "2023-09-20",
        content: "Discussed personal challenges affecting academics. Referred to university counseling services.",
        advisor: "Dr. Patel"
      }
    ]
  },
  {
    id: 5,
    name: "Jamie Lee",
    program: "Finance",
    year: 3,
    gpa: 3.67,
    advisingStatus: "On Track",
    riskLevel: "Low",
    progress: 70,
    lastMeeting: "2023-08-30",
    nextMeeting: "2023-11-05",
    careerPath: "Investment Banking",
    flagged: false,
    coursesCompleted: 22,
    totalCourses: 32,
    achievements: [
      "Financial Analysis Competition Winner",
      "Investment Club Treasurer"
    ],
    notes: "Jamie shows strong analytical skills and leadership potential. Has secured a summer internship at Goldman Sachs.",
    goals: [
      {
        id: 109,
        title: "CFA Level 1 Preparation",
        deadline: "2024-02-15",
        status: "In Progress"
      },
      {
        id: 110,
        title: "Network with Alumni in Banking",
        deadline: "2023-12-01",
        status: "In Progress"
      }
    ],
    feedback: [
      {
        id: 207,
        type: "Career",
        date: "2023-08-30",
        content: "Excellent progress on career development. Discussed post-graduation options and MBA possibilities.",
        advisor: "Dr. Rodriguez"
      }
    ]
  }
];

export const performanceData: PerformanceData[] = [
  { program: "Computer Science", semester: "Fall 2022", averageGPA: 3.4 },
  { program: "Computer Science", semester: "Spring 2023", averageGPA: 3.5 },
  { program: "Computer Science", semester: "Fall 2023", averageGPA: 3.6 },
  { program: "Business Administration", semester: "Fall 2022", averageGPA: 3.2 },
  { program: "Business Administration", semester: "Spring 2023", averageGPA: 3.3 },
  { program: "Business Administration", semester: "Fall 2023", averageGPA: 3.1 },
  { program: "Mechanical Engineering", semester: "Fall 2022", averageGPA: 3.5 },
  { program: "Mechanical Engineering", semester: "Spring 2023", averageGPA: 3.6 },
  { program: "Mechanical Engineering", semester: "Fall 2023", averageGPA: 3.7 },
  { program: "Psychology", semester: "Fall 2022", averageGPA: 3.3 },
  { program: "Psychology", semester: "Spring 2023", averageGPA: 3.4 },
  { program: "Psychology", semester: "Fall 2023", averageGPA: 3.2 },
  { program: "Finance", semester: "Fall 2022", averageGPA: 3.4 },
  { program: "Finance", semester: "Spring 2023", averageGPA: 3.5 },
  { program: "Finance", semester: "Fall 2023", averageGPA: 3.3 }
];
