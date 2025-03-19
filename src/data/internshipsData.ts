
export interface Internship {
  id: number;
  title: string;
  company: string;
  location: string;
  duration: string;
  stipend: string;
  deadline: string;
  requirements: string;
  description: string;
  image: string;
}

export const internshipsData: Internship[] = [
  {
    id: 1,
    title: "Engineering Internship Program",
    company: "ADNOC",
    location: "Abu Dhabi",
    duration: "3 months",
    stipend: "AED 5,000/month",
    deadline: "June 15, 2023",
    requirements: "Engineering students in their 3rd or 4th year",
    description: "Gain hands-on experience in petroleum engineering, project management, and innovation at one of UAE's largest energy companies.",
    image: "/placeholder.svg"
  },
  {
    id: 2,
    title: "Finance Development Program",
    company: "Dubai Islamic Bank",
    location: "Dubai",
    duration: "6 months",
    stipend: "AED 4,500/month",
    deadline: "July 1, 2023",
    requirements: "Finance or Accounting majors with 3.0+ GPA",
    description: "Comprehensive rotation program across different financial departments including investment, retail banking, and Islamic finance principles.",
    image: "/placeholder.svg"
  },
  {
    id: 3,
    title: "Technology Innovation Internship",
    company: "Etisalat Digital",
    location: "Dubai",
    duration: "4 months",
    stipend: "AED 5,500/month",
    deadline: "June 30, 2023",
    requirements: "Computer Science or IT students with programming experience",
    description: "Work with cutting-edge technologies like AI, IoT, and 5G applications while developing solutions for real business challenges.",
    image: "/placeholder.svg"
  },
  {
    id: 4,
    title: "Healthcare Management Trainee",
    company: "Cleveland Clinic Abu Dhabi",
    location: "Abu Dhabi",
    duration: "6 months",
    stipend: "AED 4,800/month",
    deadline: "July 15, 2023",
    requirements: "Healthcare Management or related field students",
    description: "Learn about hospital administration, patient care coordination, and healthcare operations in a world-class medical facility.",
    image: "/placeholder.svg"
  },
  {
    id: 5,
    title: "Tourism & Hospitality Internship",
    company: "Jumeirah Group",
    location: "Dubai",
    duration: "3 months",
    stipend: "AED 4,000/month",
    deadline: "August 1, 2023",
    requirements: "Hospitality, Tourism or Business students",
    description: "Gain exposure to luxury hospitality operations, guest services, and event management in one of UAE's premier hotel chains.",
    image: "/placeholder.svg"
  },
  {
    id: 6,
    title: "Media & Communications Program",
    company: "MBC Group",
    location: "Dubai",
    duration: "4 months",
    stipend: "AED 4,200/month",
    deadline: "July 10, 2023",
    requirements: "Media, Communication or Journalism students",
    description: "Develop skills in content creation, digital media strategy, and broadcasting in the Arab world's largest media company.",
    image: "/placeholder.svg"
  }
];
