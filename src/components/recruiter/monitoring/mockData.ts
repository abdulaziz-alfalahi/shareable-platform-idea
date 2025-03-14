
// Mock data for the monitoring dashboard

export const interviewData = [
  { month: "Jan", scheduled: 15, completed: 12, canceled: 3 },
  { month: "Feb", scheduled: 18, completed: 15, canceled: 3 },
  { month: "Mar", scheduled: 25, completed: 22, canceled: 3 },
  { month: "Apr", scheduled: 32, completed: 28, canceled: 4 },
  { month: "May", scheduled: 28, completed: 24, canceled: 4 },
  { month: "Jun", scheduled: 35, completed: 30, canceled: 5 },
];

export const candidateStatusData = [
  { name: "Accepted", value: 124, color: "#16a34a" },
  { name: "Rejected", value: 87, color: "#dc2626" },
  { name: "In Process", value: 53, color: "#3b82f6" },
  { name: "On Hold", value: 29, color: "#f59e0b" },
];

export const vacancyData = [
  { month: "Jan", open: 25, filled: 18 },
  { month: "Feb", open: 32, filled: 24 },
  { month: "Mar", open: 30, filled: 22 },
  { month: "Apr", open: 35, filled: 28 },
  { month: "May", open: 42, filled: 30 },
  { month: "Jun", open: 38, filled: 32 },
];

export const advisorySessionsData = [
  { month: "Jan", sessions: 45 },
  { month: "Feb", sessions: 52 },
  { month: "Mar", sessions: 49 },
  { month: "Apr", sessions: 63 },
  { month: "May", sessions: 58 },
  { month: "Jun", sessions: 72 },
];

export const userGrowthData = [
  { month: "Jan", students: 250, recruiters: 45, advisors: 15 },
  { month: "Feb", students: 280, recruiters: 48, advisors: 16 },
  { month: "Mar", students: 320, recruiters: 52, advisors: 18 },
  { month: "Apr", students: 350, recruiters: 55, advisors: 22 },
  { month: "May", students: 390, recruiters: 60, advisors: 25 },
  { month: "Jun", students: 420, recruiters: 65, advisors: 28 },
];

// Update the statsCards data to explicitly specify trend as "up" | "down"
export const statsCards = [
  { 
    title: "Total Jobseekers", 
    value: "420", 
    change: "+8.3%", 
    trend: "up" as const, 
    icon: "Users",
    description: "Active students and graduates seeking employment"
  },
  { 
    title: "Open Vacancies", 
    value: "38", 
    change: "-9.5%", 
    trend: "down" as const, 
    icon: "Briefcase",
    description: "Currently open positions across all companies"
  },
  { 
    title: "Interviews This Month", 
    value: "35", 
    change: "+25.0%", 
    trend: "up" as const, 
    icon: "Calendar",
    description: "Scheduled interviews for current month"
  },
  { 
    title: "Candidates Placed", 
    value: "124", 
    change: "+12.7%", 
    trend: "up" as const, 
    icon: "UserCheck",
    description: "Successfully employed candidates year-to-date"
  },
];
