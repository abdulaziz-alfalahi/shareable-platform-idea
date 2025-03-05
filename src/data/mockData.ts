
import { Student, PerformanceData } from "@/types/student";

export const students: Student[] = [
  {
    id: 1,
    name: "Alex Johnson",
    program: "Computer Science",
    year: 3,
    gradeLevel: "university-3",
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
    ],
    passportStamps: [
      {
        id: 1,
        title: "Workshop Explorer",
        description: "Completed 3 career development workshops",
        category: "Workshop",
        iconName: "award",
        dateEarned: "2023-08-15",
        level: "Silver",
        featured: true
      },
      {
        id: 2,
        title: "Skills Master",
        description: "Achieved proficiency in 5 programming languages",
        category: "Skills",
        iconName: "code",
        dateEarned: "2023-07-22",
        level: "Gold",
        featured: true
      },
      {
        id: 3,
        title: "Internship Ready",
        description: "Successfully completed internship preparation program",
        category: "Training",
        iconName: "briefcase",
        dateEarned: "2023-09-05",
        level: "Bronze",
        featured: false
      }
    ],
    careerMilestones: [
      {
        id: 1,
        title: "First Internship",
        description: "Secured summer internship at Tech Solutions Inc.",
        dateAchieved: "2023-06-10",
        points: 250
      },
      {
        id: 2,
        title: "Project Leadership",
        description: "Led team of 5 in developing mobile application",
        dateAchieved: "2023-04-15",
        points: 150
      }
    ],
    passportLevel: 3,
    totalPoints: 750
  },
  {
    id: 2,
    name: "Taylor Rivera",
    program: "Business Administration",
    year: 2,
    gradeLevel: "university-2",
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
    ],
    passportStamps: [
      {
        id: 4,
        title: "Networking Pro",
        description: "Connected with 10+ industry professionals",
        category: "Skills",
        iconName: "users",
        dateEarned: "2023-08-10",
        level: "Silver",
        featured: true
      },
      {
        id: 5,
        title: "Presentation Ace",
        description: "Delivered outstanding presentation at business forum",
        category: "Skills",
        iconName: "presentation",
        dateEarned: "2023-05-18",
        level: "Bronze",
        featured: false
      }
    ],
    careerMilestones: [
      {
        id: 3,
        title: "Club Leadership",
        description: "Elected president of Marketing Club",
        dateAchieved: "2023-03-20",
        points: 175
      }
    ],
    passportLevel: 2,
    totalPoints: 350
  },
  {
    id: 3,
    name: "Jordan Chen",
    program: "Mechanical Engineering",
    year: 4,
    gradeLevel: "university-4",
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
    ],
    passportStamps: [
      {
        id: 6,
        title: "Research Excellence",
        description: "Published paper in peer-reviewed journal",
        category: "Education",
        iconName: "file-text",
        dateEarned: "2023-07-30",
        level: "Gold",
        featured: true
      },
      {
        id: 7,
        title: "Industry Internship",
        description: "Completed prestigious internship at NASA",
        category: "Employment",
        iconName: "rocket",
        dateEarned: "2023-08-25",
        level: "Gold",
        featured: true
      },
      {
        id: 8,
        title: "Technical Mastery",
        description: "Demonstrated advanced proficiency in CAD software",
        category: "Skills",
        iconName: "tool",
        dateEarned: "2023-04-12",
        level: "Silver",
        featured: false
      }
    ],
    careerMilestones: [
      {
        id: 4,
        title: "Research Publication",
        description: "First author on aerospace engineering journal paper",
        dateAchieved: "2023-07-30",
        points: 300
      },
      {
        id: 5,
        title: "NASA Internship",
        description: "Selected from 500+ applicants for prestigious position",
        dateAchieved: "2022-06-15",
        points: 400
      }
    ],
    passportLevel: 5,
    totalPoints: 1200
  },
  {
    id: 4,
    name: "Morgan Williams",
    program: "Psychology",
    year: 1,
    gradeLevel: "university-1",
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
    ],
    passportStamps: [
      {
        id: 9,
        title: "First Steps",
        description: "Completed university orientation program",
        category: "Education",
        iconName: "map",
        dateEarned: "2023-09-01",
        level: "Bronze",
        featured: false
      }
    ],
    careerMilestones: [],
    passportLevel: 1,
    totalPoints: 50
  },
  {
    id: 5,
    name: "Jamie Lee",
    program: "Finance",
    year: 3,
    gradeLevel: "university-3",
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
    ],
    passportStamps: [
      {
        id: 10,
        title: "Financial Analyst",
        description: "Won university-wide financial analysis competition",
        category: "Skills",
        iconName: "bar-chart",
        dateEarned: "2023-06-15",
        level: "Gold",
        featured: true
      },
      {
        id: 11,
        title: "Leadership Role",
        description: "Elected as Investment Club Treasurer",
        category: "Skills",
        iconName: "landmark",
        dateEarned: "2023-04-05",
        level: "Silver",
        featured: false
      },
      {
        id: 12,
        title: "Interview Ready",
        description: "Completed finance industry interview preparation program",
        category: "Training",
        iconName: "briefcase",
        dateEarned: "2023-09-10",
        level: "Bronze",
        featured: false
      }
    ],
    careerMilestones: [
      {
        id: 6,
        title: "Investment Competition",
        description: "First place in university investment challenge",
        dateAchieved: "2023-06-15",
        points: 225
      },
      {
        id: 7,
        title: "Club Leadership",
        description: "Managed $10,000 budget as Investment Club Treasurer",
        dateAchieved: "2023-04-05",
        points: 175
      }
    ],
    passportLevel: 4,
    totalPoints: 850
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
