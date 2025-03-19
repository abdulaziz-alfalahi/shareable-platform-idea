import { ReactNode } from "react";
import { 
  Briefcase, 
  GraduationCap, 
  BookOpen, 
  Users, 
  BookMarked, 
  Map, 
  FileText, 
  Building2,
  Award
} from "lucide-react";
import { ServiceCategory, Service } from "./types";

export const serviceCategories: ServiceCategory[] = [
  { id: "all", label: "All Services" },
  { id: "education", label: "Education" },
  { id: "employment", label: "Employment" },
  { id: "career", label: "Career" },
  { id: "student", label: "Student" },
];

export const services: Service[] = [
  {
    id: "job-matching",
    title: "Job Matching",
    description: "Find employment opportunities that match your skills and location preferences.",
    icon: <Briefcase className="h-8 w-8 text-emirati-desertRed" />,
    href: "/job-applications",
    categories: ["employment", "career"],
  },
  {
    id: "career-pathways",
    title: "Career Pathways",
    description: "Explore different career paths and plan your professional journey.",
    icon: <Map className="h-8 w-8 text-emirati-desertRed" />,
    href: "/mindmap",
    categories: ["career", "education"],
  },
  {
    id: "training-centers",
    title: "Training Centers",
    description: "Discover accredited training centers offering skills development programs.",
    icon: <Building2 className="h-8 w-8 text-emirati-desertRed" />,
    href: "/training-centers",
    categories: ["education", "career"],
  },
  {
    id: "educational-resources",
    title: "Educational Resources",
    description: "Access learning materials to enhance your knowledge and skills.",
    icon: <BookOpen className="h-8 w-8 text-emirati-desertRed" />,
    href: "/educational-resources",
    categories: ["education", "student"],
  },
  {
    id: "internships",
    title: "Internships",
    description: "Find internship opportunities to gain practical work experience.",
    icon: <GraduationCap className="h-8 w-8 text-emirati-desertRed" />,
    href: "/internships",
    categories: ["student", "employment"],
  },
  {
    id: "portfolio-builder",
    title: "Portfolio Builder",
    description: "Create a professional portfolio to showcase your skills and achievements.",
    icon: <FileText className="h-8 w-8 text-emirati-desertRed" />,
    href: "/portfolio-builder",
    categories: ["career", "student"],
  },
  {
    id: "scholarships",
    title: "Scholarships",
    description: "Discover and apply for scholarships to fund your education journey.",
    icon: <Award className="h-8 w-8 text-emirati-desertRed" />,
    href: "/scholarships",
    categories: ["education", "student"],
  },
];
