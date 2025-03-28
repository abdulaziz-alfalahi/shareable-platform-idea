
export interface JourneyStep {
  title: string;
  items: string[];
}

export interface PersonaJourney {
  id: string;
  title: string;
  steps: JourneyStep[];
}

export const journeyData: PersonaJourney[] = [
  {
    id: "student",
    title: "Student Journey: From Registration to Career Success",
    steps: [
      {
        title: "Registration & Onboarding",
        items: [
          "Sign up on the platform using UAE Pass integration",
          "Complete initial profile with academic background, interests, and goals",
          "Take a comprehensive skills and interest assessment",
          "Receive personalized dashboard setup based on assessment results"
        ]
      },
      {
        title: "Career Exploration Phase",
        items: [
          "Explore recommended career paths based on assessment results",
          "Use the Career Passport to view potential career journeys",
          "Browse the available training programs, job opportunities, and educational resources",
          "Attend virtual career orientation sessions or workshops"
        ]
      },
      {
        title: "Goal Setting & Planning",
        items: [
          "Work with advisors to set clear educational and career goals",
          "Establish milestone targets in the Career Passport system",
          "Create a personalized development plan with recommended courses",
          "Schedule regular check-ins with career advisors"
        ]
      },
      {
        title: "Skill Development",
        items: [
          "Enroll in recommended courses and training programs",
          "Complete assessments to identify and address skill gaps",
          "Earn stamps in the Career Passport for completed training",
          "Track progress through the skills development dashboard"
        ]
      },
      {
        title: "Internship & Early Experience",
        items: [
          "Search and apply for internships through the job matching system",
          "Prepare for interviews with virtual practice sessions",
          "Gain practical experience through part-time or remote opportunities",
          "Receive mentorship from industry professionals"
        ]
      }
    ]
  },
  {
    id: "recruiter",
    title: "Recruiter Journey on the Platform",
    steps: [
      {
        title: "Onboarding and Account Setup",
        items: [
          "Register on the platform using UAE Pass integration",
          "Complete profile with company information, industry sector, and recruitment needs",
          "Set preferences for candidate matching and notifications"
        ]
      },
      {
        title: "Post and Manage Job Vacancies",
        items: [
          "Create detailed job listings with skills, qualifications, and cultural fit requirements",
          "Set location preferences (using the map integration for geographical targeting)",
          "Specify opportunity type (full-time, part-time, remote, or gig work)",
          "Track application status and vacancy performance metrics"
        ]
      },
      {
        title: "Search and Match with Candidates",
        items: [
          "Use the advanced search features to filter Emirati talent by qualifications, skills, and availability",
          "Review candidate profiles, portfolios, and skills assessments",
          "Get AI-powered matching suggestions based on job requirements",
          "Save promising candidates to shortlists for specific roles"
        ]
      },
      {
        title: "Interview and Assessment Process",
        items: [
          "Schedule interviews with candidates through the platform calendar",
          "Conduct virtual interviews when appropriate",
          "Document interview feedback and assessment results",
          "Compare candidates against job requirements"
        ]
      },
      {
        title: "Collaborate with Training Institutes",
        items: [
          "Identify skill gaps in the candidate pool",
          "Partner with training institutes to develop targeted programs",
          "Offer internships or training opportunities to promising candidates",
          "Track progress of candidates in training programs"
        ]
      }
    ]
  },
  {
    id: "parent",
    title: "Parent Journey on the Platform",
    steps: [
      {
        title: "Registration and Setup",
        items: [
          "Register on the platform using UAE Pass integration",
          "Create a parent profile and link to their child's profile",
          "Complete questionnaires about their child's strengths, interests, and educational background",
          "Set notification preferences for academic and career milestones"
        ]
      },
      {
        title: "Educational Assessment and Planning",
        items: [
          "Review their child's academic profile and performance metrics",
          "Access assessment results to understand strengths and areas for improvement",
          "Explore recommended study paths based on their child's aptitudes",
          "Collaborate with career advisors to develop personalized educational plans"
        ]
      },
      {
        title: "Career Path Exploration",
        items: [
          "Use the Career Pathway Simulator with their child to explore potential career paths",
          "Review industry trends and employment opportunities in the UAE",
          "Understand skill requirements for different professions",
          "Compare different educational routes to desired careers"
        ]
      },
      {
        title: "Academic Progress Monitoring",
        items: [
          "Track their child's coursework completion and grades",
          "Monitor progress towards educational milestones",
          "Review teacher/advisor feedback and recommendations",
          "Receive alerts about academic concerns or achievements"
        ]
      },
      {
        title: "Extracurricular and Skill Development",
        items: [
          "Discover workshops, competitions, and enrichment activities aligned with career interests",
          "Support their child in building a portfolio of achievements and experiences",
          "Track skills development and certification progress",
          "Monitor their child's Career Passport to see growth in various competencies"
        ]
      }
    ]
  },
  {
    id: "internship",
    title: "Internship Coordinator Journey on the Platform",
    steps: [
      {
        title: "Onboarding and Setup",
        items: [
          "Register on the platform using UAE Pass integration",
          "Create a profile specifying educational institution and department",
          "Set up program parameters (duration, credit requirements, evaluation criteria)",
          "Configure notification preferences and dashboard views"
        ]
      },
      {
        title: "Program Management",
        items: [
          "Define internship seasons and application timelines",
          "Create different internship program structures",
          "Establish skill-based requirements for various departments/majors",
          "Upload documentation and learning objectives for students"
        ]
      },
      {
        title: "Student Management",
        items: [
          "Access student profiles and performance metrics",
          "Review student skill assessments and career interests",
          "Filter students by major, year, and skill set",
          "Track student progress toward internship requirements"
        ]
      },
      {
        title: "Employer Partnership Management",
        items: [
          "Browse and connect with registered companies",
          "View company profiles and internship history",
          "Send partnership requests to potential host companies",
          "Manage existing partnerships and agreements"
        ]
      },
      {
        title: "Internship Matching Process",
        items: [
          "Post available internships with detailed requirements",
          "Use the matching algorithm to suggest suitable students for positions",
          "Review matching scores based on skills, interests, and location",
          "Create shortlists of candidates for each opportunity"
        ]
      }
    ]
  },
  {
    id: "advisor",
    title: "Advisor Journey on the Platform",
    steps: [
      {
        title: "Onboarding and Profile Setup",
        items: [
          "Register on the platform using UAE Pass integration",
          "Complete profile with specialization areas (academic, career, personal development)",
          "Set availability for student appointments and consultations",
          "Configure notification preferences for student activities and alerts"
        ]
      },
      {
        title: "Dashboard Orientation and Management",
        items: [
          "Access the Advisor Dashboard to view assigned students",
          "Review student profiles, academic records, and progress metrics",
          "Monitor flagged students who require immediate attention",
          "Customize dashboard views based on priority metrics (risk level, upcoming deadlines)"
        ]
      },
      {
        title: "Student Assessment and Planning",
        items: [
          "Review comprehensive student profiles including academic performance, career interests, and skill assessments",
          "Identify strengths, weaknesses, and potential career paths for each student",
          "Set up personalized development plans with specific goals and milestones",
          "Schedule regular check-in meetings with students"
        ]
      },
      {
        title: "Feedback and Goal Management",
        items: [
          "Provide structured feedback on student progress",
          "Create and assign specific, measurable goals for students",
          "Track goal completion rates and adjust timelines as needed",
          "Document all interactions and recommendations for continuity"
        ]
      },
      {
        title: "Risk Management and Intervention",
        items: [
          "Monitor the risk indicators for students (attendance, grades, participation)",
          "Receive alerts when students are flagged as 'At Risk' or 'Needs Attention'",
          "Implement intervention strategies for at-risk students",
          "Document intervention outcomes and follow-up actions"
        ]
      }
    ]
  },
  {
    id: "command",
    title: "Command and Control Center Agent Journey",
    steps: [
      {
        title: "Centralized Monitoring Dashboard Access",
        items: [
          "Log in with specialized Command and Control credentials",
          "Access the real-time monitoring dashboard showing system-wide activity",
          "View key performance indicators across all platform functions",
          "Configure personalized dashboard views based on priority areas"
        ]
      },
      {
        title: "System Performance Oversight",
        items: [
          "Monitor platform traffic, response times, and user engagement metrics",
          "Track system health indicators and resource utilization",
          "Receive automated alerts for performance anomalies or bottlenecks",
          "Initiate diagnostic procedures when performance issues are detected"
        ]
      },
      {
        title: "Data Flow and Integration Management",
        items: [
          "Oversee data exchange between platform components and external systems",
          "Monitor API performance and integration points with partner services",
          "Ensure data synchronization across the platform ecosystem",
          "Identify and resolve data flow disruptions or inconsistencies"
        ]
      },
      {
        title: "User Activity Monitoring and Support",
        items: [
          "View aggregated user activity patterns across different user types",
          "Identify unusual usage patterns that may indicate issues",
          "Monitor support ticket volume and resolution metrics",
          "Coordinate response to system-wide issues affecting multiple users"
        ]
      },
      {
        title: "Security and Compliance Monitoring",
        items: [
          "Oversee security monitoring systems for potential threats or breaches",
          "Track compliance with data protection regulations and policies",
          "Review access logs for sensitive system areas and data",
          "Coordinate response to security incidents or policy violations"
        ]
      }
    ]
  },
  {
    id: "policy",
    title: "Government Policy Maker Journey",
    steps: [
      {
        title: "Data Dashboard Overview",
        items: [
          "Access a specialized policy dashboard with high-level metrics and trends",
          "Review aggregate workforce development statistics across the Emirates",
          "Analyze employment rates, educational pathway popularity, and skills gaps",
          "Identify key performance indicators related to Emiratization policies"
        ]
      },
      {
        title: "Demographic and Geographic Analysis",
        items: [
          "Examine user distribution across different emirates and regions",
          "Analyze participation rates across age groups, educational backgrounds, and sectors",
          "Review geographical patterns in employment, education, and skills development",
          "Identify underserved areas or demographics requiring targeted policy interventions"
        ]
      },
      {
        title: "Strategic Workforce Planning",
        items: [
          "Access predictive analytics on future workforce needs and compositions",
          "Review industry-specific employment trends and emerging sectors",
          "Analyze the alignment between educational outputs and market demands",
          "Identify strategic areas for policy development or refinement"
        ]
      },
      {
        title: "Educational Pathway Effectiveness",
        items: [
          "Evaluate completion rates and outcomes across different educational paths",
          "Compare employment success rates between various educational tracks",
          "Analyze time-to-employment metrics for different qualifications",
          "Identify educational approaches with highest return on investment"
        ]
      },
      {
        title: "Skills Gap Analysis and Response",
        items: [
          "Review comprehensive reports on skills shortages across sectors",
          "Analyze effectiveness of current upskilling and reskilling initiatives",
          "Identify emerging skill needs based on industry trends and forecasts",
          "Plan policy interventions to address critical skills gaps"
        ]
      }
    ]
  },
  {
    id: "jobseeker",
    title: "Jobseeker Journey on the Platform",
    steps: [
      {
        title: "Registration and Profile Setup",
        items: [
          "Register using UAE Pass integration for secure, verified identity",
          "Complete a comprehensive personal profile with education, skills, and work experience",
          "Upload supporting documents like certificates, previous work samples, and recommendation letters",
          "Set job preferences including sectors, work types (full-time, part-time, remote, gig), and location preferences"
        ]
      },
      {
        title: "Skills Assessment and Gap Analysis",
        items: [
          "Complete initial skills assessment to establish baseline capabilities",
          "Review automated skill gap analysis comparing skills to desired career paths",
          "Identify strengths and areas for development relative to job market demands",
          "Set personal development goals based on the assessment results"
        ]
      },
      {
        title: "Career Passport Development",
        items: [
          "Build a digital Career Passport that showcases verified achievements and credentials",
          "Collect digital badges and stamps for completed courses, skills, and experiences",
          "Request verification of previous employment and educational accomplishments",
          "Highlight cultural achievements and community contributions relevant to employers"
        ]
      },
      {
        title: "Career Path Exploration",
        items: [
          "Use the Career Pathway Simulator to explore potential career trajectories",
          "Compare different career paths based on growth potential, salary ranges, and skill requirements",
          "Receive personalized recommendations for suitable career directions",
          "Understand the time investment and steps required for each potential path"
        ]
      },
      {
        title: "Personalized Learning and Development",
        items: [
          "Access customized training recommendations to address identified skill gaps",
          "Enroll in relevant courses and programs through integrated training partners",
          "Track learning progress and update skill profile as new competencies are gained",
          "Complete micro-credentials and certifications aligned with career goals"
        ]
      }
    ]
  }
];
