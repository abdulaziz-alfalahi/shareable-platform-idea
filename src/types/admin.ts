
export interface PlatformMetric {
  id: string;
  name: string;
  value: number;
  change: number; // percentage change
  icon: string;
}

export interface ChartData {
  name: string;
  value: number;
}

export interface TimeSeriesData {
  date: string;
  value: number;
}

export interface UserTypeData {
  type: string;
  count: number;
  active: number;
  growth: number;
}

export interface AgeGroupData {
  group: string;
  count: number;
}

export interface TopEducationalPath {
  path: string;
  studentsCount: number;
  growth: number;
}

export interface TopRecruiter {
  name: string;
  openPositions: number;
  hires: number;
  logo?: string;
}

export interface TopTrainingCenter {
  name: string;
  programs: number;
  enrollments: number;
  logo?: string;
}

export interface JobseekerData {
  category: string;
  count: number;
  hired: number;
  growthRate: number;
}

export interface AdminDashboardData {
  totalStudents: PlatformMetric;
  totalRecruiters: PlatformMetric;
  totalVacancies: PlatformMetric;
  totalInternships: PlatformMetric;
  totalTrainingCenters: PlatformMetric;
  totalAssessmentCenters: PlatformMetric;
  totalAdvisors: PlatformMetric;
  totalParents: PlatformMetric;
  
  usersByType: UserTypeData[];
  studentsByAgeGroup: AgeGroupData[];
  registrationsOverTime: TimeSeriesData[];
  activeUsersOverTime: TimeSeriesData[];
  
  interviewsScheduled: TimeSeriesData[];
  interviewsCompleted: TimeSeriesData[];
  
  topEducationalPaths: TopEducationalPath[];
  topRecruiters: TopRecruiter[];
  topTrainingCenters: TopTrainingCenter[];
  
  jobApplicationsStatus: ChartData[];
  placementRate: number;
  averageTimeToHire: number;
  
  // Added for jobseekers
  totalJobseekers: PlatformMetric;
  jobseekersByCategory: JobseekerData[];
  jobseekersOverTime: TimeSeriesData[];
}
