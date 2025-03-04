
// Job applications mock data
export const initialApplications = [
  {
    id: "1",
    company: "Dubai Future Foundation",
    position: "Senior Web Developer",
    date: "2023-05-15",
    status: "interview" as const,
    notes: "Second interview scheduled"
  },
  {
    id: "2",
    company: "Etihad Airways",
    position: "UX Designer",
    date: "2023-05-10",
    status: "applied" as const,
    notes: "Application submitted"
  }
];

// Vacancies mock data
export const vacanciesData = [
  {
    id: "1",
    title: "Front-end Developer",
    company: "Etisalat Digital",
    location: "Dubai Internet City",
    matchPercentage: 95,
    requiredSkills: ["React", "TypeScript", "Tailwind CSS"],
    missingSkills: [],
    salary: "25,000 - 30,000 AED",
    postedDate: "2 days ago"
  },
  {
    id: "2",
    title: "Full Stack Developer",
    company: "Emirates NBD",
    location: "DIFC, Dubai",
    matchPercentage: 90,
    requiredSkills: ["React", "Node.js", "MongoDB"],
    missingSkills: [],
    salary: "27,000 - 32,000 AED",
    postedDate: "1 week ago"
  },
  {
    id: "3",
    title: "Senior UX Designer",
    company: "Dubai Media Inc",
    location: "Media City, Dubai",
    matchPercentage: 85,
    requiredSkills: ["Figma", "User Research", "Prototyping"],
    missingSkills: [],
    salary: "30,000 - 35,000 AED",
    postedDate: "3 days ago"
  },
  {
    id: "4",
    title: "DevOps Engineer",
    company: "Abu Dhabi Digital Authority",
    location: "Abu Dhabi",
    matchPercentage: 80,
    requiredSkills: ["Kubernetes", "Docker", "CI/CD"],
    missingSkills: ["AWS", "Terraform"],
    salary: "28,000 - 33,000 AED",
    postedDate: "5 days ago"
  },
  {
    id: "5",
    title: "Data Scientist",
    company: "Majid Al Futtaim",
    location: "Dubai",
    matchPercentage: 75,
    requiredSkills: ["Python", "SQL", "Data Analysis"],
    missingSkills: ["TensorFlow", "Machine Learning"],
    salary: "26,000 - 31,000 AED",
    postedDate: "1 week ago"
  },
  {
    id: "6",
    title: "Project Manager",
    company: "Emaar Properties",
    location: "Downtown Dubai",
    matchPercentage: 85,
    requiredSkills: ["Agile", "Scrum", "Project Planning"],
    missingSkills: [],
    salary: "32,000 - 38,000 AED",
    postedDate: "2 weeks ago"
  },
  {
    id: "7",
    title: "Mobile App Developer",
    company: "DU Telecom",
    location: "Dubai",
    matchPercentage: 70,
    requiredSkills: ["React Native", "Redux", "API Integration"],
    missingSkills: ["Flutter", "Swift"],
    salary: "24,000 - 29,000 AED",
    postedDate: "3 days ago"
  },
  {
    id: "8",
    title: "Cybersecurity Analyst",
    company: "First Abu Dhabi Bank",
    location: "Abu Dhabi",
    matchPercentage: 65,
    requiredSkills: ["Network Security", "Threat Analysis"],
    missingSkills: ["CISSP Certification", "Penetration Testing"],
    salary: "29,000 - 34,000 AED",
    postedDate: "1 week ago"
  },
  {
    id: "9",
    title: "AI Specialist",
    company: "Smart Dubai",
    location: "Dubai",
    matchPercentage: 60,
    requiredSkills: ["Python", "Data Science"],
    missingSkills: ["NLP", "Machine Learning", "Deep Learning"],
    salary: "30,000 - 35,000 AED",
    postedDate: "5 days ago"
  },
  {
    id: "10",
    title: "Digital Marketing Manager",
    company: "Etihad Airways",
    location: "Abu Dhabi",
    matchPercentage: 55,
    requiredSkills: ["Social Media Marketing", "Content Strategy"],
    missingSkills: ["SEO", "SEM", "Analytics"],
    salary: "25,000 - 30,000 AED",
    postedDate: "2 weeks ago"
  }
];

// Training programs mock data
export const trainingProgramsData = [
  {
    id: "1",
    title: "AWS Cloud Certification",
    provider: "Emirates Institute of Technology",
    duration: "3 months",
    skills: ["AWS", "Cloud Architecture", "Terraform"],
    rating: 4.8
  },
  {
    id: "2",
    title: "Machine Learning Fundamentals",
    provider: "Abu Dhabi School of AI",
    duration: "2 months",
    skills: ["Machine Learning", "TensorFlow", "Deep Learning"],
    rating: 4.9
  },
  {
    id: "3",
    title: "Cybersecurity Professional",
    provider: "UAE Cyber Security Council",
    duration: "4 months",
    skills: ["CISSP Certification", "Penetration Testing", "Network Security"],
    rating: 4.7
  },
  {
    id: "4",
    title: "Mobile App Development",
    provider: "Dubai Future Academy",
    duration: "2 months",
    skills: ["Flutter", "Swift", "React Native"],
    rating: 4.6
  },
  {
    id: "5",
    title: "Digital Marketing Masterclass",
    provider: "Sharjah Media City",
    duration: "6 weeks",
    skills: ["SEO", "SEM", "Analytics", "Social Media Strategy"],
    rating: 4.5
  }
];

// Map job locations mock data
export const jobLocationsData = [
  {
    id: '1',
    title: 'Software Engineer',
    company: 'Dubai Tech Solutions',
    location: {
      latitude: 25.2048,
      longitude: 55.2708,
      address: 'Downtown Dubai, UAE'
    },
    matchPercentage: 92,
    portfolioMatch: true
  },
  {
    id: '2',
    title: 'Marketing Manager',
    company: 'Abu Dhabi Marketing Group',
    location: {
      latitude: 24.4539,
      longitude: 54.3773,
      address: 'Al Reem Island, Abu Dhabi, UAE'
    },
    matchPercentage: 78,
    portfolioMatch: false
  },
  {
    id: '3',
    title: 'Financial Analyst',
    company: 'Emirati Finance',
    location: {
      latitude: 25.0657,
      longitude: 55.1713,
      address: 'Dubai Marina, UAE'
    },
    matchPercentage: 85,
    portfolioMatch: true
  },
  {
    id: '4',
    title: 'HR Specialist',
    company: 'Global HR Solutions',
    location: {
      latitude: 25.1123,
      longitude: 55.1862,
      address: 'Jumeirah, Dubai, UAE'
    },
    matchPercentage: 70,
    portfolioMatch: false
  },
  {
    id: '5',
    title: 'Project Manager',
    company: 'Construction UAE',
    location: {
      latitude: 25.2744,
      longitude: 55.3032,
      address: 'Deira, Dubai, UAE'
    },
    matchPercentage: 88,
    portfolioMatch: true
  }
];
