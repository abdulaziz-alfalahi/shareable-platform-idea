
import React from "react";
import { Link } from "react-router-dom";
import { 
  LucideIcon, 
  GraduationCap, 
  BookOpen, 
  Briefcase, 
  Users, 
  Building2, 
  Map, 
  Award
} from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
  icon?: LucideIcon;
};

const navItems: NavItem[] = [
  {
    label: "Student Resources",
    href: "/educational-resources",
    icon: BookOpen,
  },
  {
    label: "Job Opportunities",
    href: "/job-applications",
    icon: Briefcase,
  },
  {
    label: "Career Mapping",
    href: "/mindmap",
    icon: Map,
  },
  {
    label: "Training Centers",
    href: "/training-centers",
    icon: Building2,
  },
  {
    label: "Scholarships",
    href: "/scholarships",
    icon: Award,
  },
];

const DesktopNavigation = () => {
  return (
    <nav className="hidden md:flex items-center space-x-2">
      {navItems.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100 hover:text-emirati-oasisGreen transition-colors"
        >
          {item.icon && <item.icon className="h-4 w-4 mr-2 text-emirati-desertRed" />}
          {item.label}
        </Link>
      ))}
    </nav>
  );
};

export default DesktopNavigation;
