
import React from "react";
import { 
  GraduationCap, 
  Briefcase, 
  Building, 
  User, 
  Target
} from "lucide-react";
import { UserRole } from "@/components/notifications/RoleNotifications";

export interface RoleOption {
  id: UserRole;
  name: string;
  icon: React.ReactNode;
  description: string;
}

export const roleOptions: RoleOption[] = [
  {
    id: "student",
    name: "Student",
    icon: <GraduationCap className="w-8 h-8 text-emirati-oasisGreen" />,
    description: "Find your career path, build skills, and connect with mentors"
  },
  {
    id: "recruiter",
    name: "Recruiter",
    icon: <Briefcase className="w-8 h-8 text-emirati-desertRed" />,
    description: "Find qualified Emirati talent for your organization"
  },
  {
    id: "advisor",
    name: "Career Advisor",
    icon: <Target className="w-8 h-8 text-emirati-desertGold" />,
    description: "Guide students and professionals in their career journey"
  },
  {
    id: "training",
    name: "Training Institute",
    icon: <Building className="w-8 h-8 text-emirati-camelBrown" />,
    description: "Offer training programs to upskill Emirati workforce"
  },
  {
    id: "parent",
    name: "Parent",
    icon: <User className="w-8 h-8 text-emirati-linkedinBlue" />,
    description: "Support and monitor your child's educational journey"
  }
];

export interface InterestOption {
  id: string;
  name: string;
}

export const interestOptions: InterestOption[] = [
  { id: "technology", name: "Technology & Innovation" },
  { id: "business", name: "Business & Finance" },
  { id: "government", name: "Government Services" },
  { id: "education", name: "Education & Research" },
  { id: "energy", name: "Energy & Sustainability" },
  { id: "healthcare", name: "Healthcare & Sciences" },
  { id: "tourism", name: "Tourism & Hospitality" },
  { id: "engineering", name: "Engineering & Construction" },
  { id: "arts", name: "Arts & Culture" },
  { id: "aerospace", name: "Aerospace & Defense" },
  { id: "logistics", name: "Logistics & Supply Chain" },
  { id: "maritime", name: "Maritime & Port Operations" },
  { id: "financial-services", name: "Financial Services" },
  { id: "cybersecurity", name: "Cybersecurity" },
  { id: "smart-cities", name: "Smart Cities & Urban Planning" }
];

export const culturalValues = [
  { id: "tolerance", name: "Tolerance & Respect", description: "Embracing diversity and promoting respect for all cultures" },
  { id: "excellence", name: "Pursuit of Excellence", description: "Striving for the highest standards in all endeavors" },
  { id: "innovation", name: "Innovation & Creativity", description: "Finding new solutions to challenges" },
  { id: "leadership", name: "Leadership & Responsibility", description: "Taking initiative and responsibility in professional and community roles" },
  { id: "heritage", name: "Cultural Heritage", description: "Honoring and preserving Emirati traditions and culture" },
  { id: "sustainability", name: "Sustainability", description: "Contributing to environmental and economic sustainability" }
];

export const getRoleSpecificContent = (role: UserRole) => {
  switch(role) {
    case "student":
      return {
        title: "Ready to Begin Your Learning Journey!",
        message: "Explore courses, connect with mentors, build your skills portfolio, and set your career path.",
        nextSteps: ["Explore available courses", "Connect with mentors in your field", "Complete your skills assessment"]
      };
    case "recruiter":
      return {
        title: "Ready to Find Top Emirati Talent!",
        message: "Post job opportunities, search for qualified candidates, and connect with training institutes.",
        nextSteps: ["Post your first job opportunity", "Browse candidate profiles", "Set up your company profile"]
      };
    case "advisor":
      return {
        title: "Ready to Guide the Next Generation!",
        message: "Help students discover their potential, provide career guidance, and track their progress.",
        nextSteps: ["View your assigned students", "Schedule guidance sessions", "Create career path recommendations"]
      };
    case "training":
      return {
        title: "Ready to Upskill the Workforce!",
        message: "Offer training programs, certifications, and skills development opportunities.",
        nextSteps: ["Add your training programs", "Connect with industry partners", "View skill gaps in the market"]
      };
    case "parent":
      return {
        title: "Ready to Support Your Child's Journey!",
        message: "Monitor progress, communicate with educators, and help guide educational decisions.",
        nextSteps: ["Link to your child's account", "View upcoming assessments", "Explore career options together"]
      };
    default:
      return {
        title: "Setup Complete!",
        message: "Your Emirati Journey profile is now ready.",
        nextSteps: ["Complete your profile", "Explore the platform", "Connect with others"]
      };
  }
};
