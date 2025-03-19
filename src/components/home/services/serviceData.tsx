
import React from "react";
import { 
  Briefcase, 
  GraduationCap, 
  Users, 
  Building, 
  BookOpen, 
  Award,
  Compass,
  School,
  Clock,
  TrendingUp,
  Heart,
  Wallet,
  FileText,
  Globe,
  Calendar
} from "lucide-react";
import { ServiceData } from "./types";

export const servicesData: ServiceData[] = [
  {
    icon: <School className="w-8 h-8" />,
    title: "Early Education",
    description: "Academic guidance for school students to identify strengths and potential career paths.",
    link: "/student-dashboard",
    iconBg: "bg-emirati-camelBrown/10",
    stage: "early",
    hoverInfo: "Discover your strengths and interests early in your academic journey to plan for future success."
  },
  {
    icon: <GraduationCap className="w-8 h-8" />,
    title: "University Pathways",
    description: "Find the best university programs aligned with your career goals and interests.",
    link: "/career-passport",
    iconBg: "bg-emirati-desertGold/10",
    stage: "early",
    hoverInfo: "Navigate higher education options with personalized recommendations based on your career aspirations."
  },
  {
    icon: <Calendar className="w-8 h-8" />,
    title: "Summer Knowledge Camps",
    description: "Discover enriching summer programs offered by schools, universities, and companies.",
    link: "/summer-camps",
    iconBg: "bg-emirati-oasisGreen/10",
    stage: "early",
    hoverInfo: "Explore educational camps during summer breaks to enhance skills and knowledge."
  },
  {
    icon: <Compass className="w-8 h-8" />,
    title: "Career Exploration",
    description: "Discover potential career paths tailored to your skills, interests, and the UAE market needs.",
    link: "/mindmap?tab=exploration",
    iconBg: "bg-emirati-oasisGreen/10",
    stage: ["early", "mid"],
    hoverInfo: "Visualize career possibilities with our interactive tools to find your perfect match."
  },
  {
    icon: <Building className="w-8 h-8" />,
    title: "Internship Programs",
    description: "Gain practical experience through internships with leading UAE organizations.",
    link: "/internships",
    iconBg: "bg-emirati-camelBrown/10",
    stage: "early",
    hoverInfo: "Connect with top employers offering internship opportunities designed specifically for UAE nationals."
  },
  {
    icon: <Briefcase className="w-8 h-8" />,
    title: "Job Matching",
    description: "Find job opportunities that align with your skills, qualifications, and career aspirations.",
    link: "/job-applications",
    iconBg: "bg-emirati-desertGold/10",
    stage: ["early", "mid"],
    hoverInfo: "Our AI-powered matching system connects you with jobs that perfectly fit your profile and preferences."
  },
  {
    icon: <TrendingUp className="w-8 h-8" />,
    title: "Skills Development",
    description: "Enhance your professional capabilities through targeted training and certification programs.",
    link: "/training-centers",
    iconBg: "bg-emirati-oasisGreen/10",
    stage: ["early", "mid", "late"],
    hoverInfo: "Stay competitive with access to cutting-edge training programs developed in partnership with industry leaders."
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Mentorship",
    description: "Connect with experienced professionals who can guide you through your career journey.",
    link: "/student-dashboard?tab=mentors",
    iconBg: "bg-emirati-camelBrown/10",
    stage: ["early", "mid"],
    hoverInfo: "Learn from successful Emirati professionals who have volunteered to share their knowledge and experience."
  },
  {
    icon: <Award className="w-8 h-8" />,
    title: "Portfolio Building",
    description: "Create a compelling digital portfolio that showcases your achievements and capabilities.",
    link: "/portfolio-builder",
    iconBg: "bg-emirati-desertGold/10",
    stage: ["early", "mid"],
    hoverInfo: "Build a digital showcase of your accomplishments, projects, and skills to impress potential employers."
  },
  {
    icon: <FileText className="w-8 h-8" />,
    title: "Industry Guides",
    description: "Explore comprehensive guides to key UAE industries with career pathways and required skills.",
    link: "/industry-guides",
    iconBg: "bg-emirati-oasisGreen/10",
    stage: ["early", "mid", "late"],
    hoverInfo: "Get detailed insights into the UAE's key industries, employment trends, and growth opportunities."
  },
  {
    icon: <BookOpen className="w-8 h-8" />,
    title: "Educational Resources",
    description: "Access tailored learning materials for every career stage from entry-level to leadership.",
    link: "/educational-resources",
    iconBg: "bg-emirati-camelBrown/10",
    stage: ["early", "mid", "late"],
    hoverInfo: "Discover curated learning resources specific to your career stage and development needs."
  },
  {
    icon: <Clock className="w-8 h-8" />,
    title: "Mid-Career Transition",
    description: "Navigate career changes with personalized guidance and reskilling opportunities.",
    link: "/career-passport",
    iconBg: "bg-emirati-oasisGreen/10",
    stage: "mid",
    hoverInfo: "Plan and execute successful career transitions with expert guidance and targeted skill development."
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: "Cultural Achievement",
    description: "Earn special recognition by completing challenges that reflect UAE heritage and values.",
    link: "/achievements",
    iconBg: "bg-emirati-desertGold/10",
    stage: ["early", "mid"],
    hoverInfo: "Showcase your connection to Emirati culture and values through special achievement badges."
  },
  {
    icon: <Heart className="w-8 h-8" />,
    title: "Work-Life Balance",
    description: "Strategies and resources for maintaining a healthy balance throughout your career journey.",
    link: "/work-life-balance",
    iconBg: "bg-emirati-desertGold/10",
    stage: ["mid", "late"],
    hoverInfo: "Discover techniques and resources to help you maintain personal wellbeing while achieving professional success."
  },
  {
    icon: <Wallet className="w-8 h-8" />,
    title: "Retirement Planning",
    description: "Prepare for a fulfilling retirement with financial guidance and post-career opportunities.",
    link: "/enhanced-retirement-planning",
    iconBg: "bg-emirati-oasisGreen/10",
    stage: "late",
    hoverInfo: "Plan for a secure and fulfilling retirement with comprehensive financial planning tools and resources."
  },
];
