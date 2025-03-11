
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Backpack, 
  FileText, 
  FileEdit, 
  Award, 
  Users, 
  GraduationCap, 
  School, 
  Clipboard,
  ArrowRight
} from "lucide-react";

const ServicesSection = () => {
  const services = [
    {
      icon: <Backpack className="text-emirati-oasisGreen" />,
      title: "Student Dashboard",
      description: "Explore career pathways, assess your skills, and discover personalized job recommendations.",
      path: "/student-dashboard"
    },
    {
      icon: <FileText className="text-emirati-oasisGreen" />,
      title: "Job Applications",
      description: "Apply for jobs, track your applications, and receive status updates in real-time.",
      path: "/job-applications"
    },
    {
      icon: <FileEdit className="text-emirati-oasisGreen" />,
      title: "Resume Builder",
      description: "Create and customize your professional resume with templates designed for UAE employers.",
      path: "/resume-builder"
    },
    {
      icon: <Award className="text-emirati-oasisGreen" />,
      title: "Achievements",
      description: "Track your career milestones, skills development progress, and earn recognition badges.",
      path: "/achievements"
    },
    {
      icon: <Users className="text-emirati-oasisGreen" />,
      title: "Recruiter Portal",
      description: "For employers to post jobs, review applications, and find qualified Emirati candidates.",
      path: "/recruiter-dashboard"
    },
    {
      icon: <School className="text-emirati-oasisGreen" />,
      title: "Training Centers",
      description: "Discover specialized training programs to enhance your skills and career prospects.",
      path: "/training-centers"
    },
    {
      icon: <Clipboard className="text-emirati-oasisGreen" />,
      title: "Assessment Centers",
      description: "Evaluate your skills and competencies through professional assessment services.",
      path: "/assessment-centers"
    },
    {
      icon: <GraduationCap className="text-emirati-oasisGreen" />,
      title: "Advisor Dashboard",
      description: "For academic advisors and career coaches to track student progress and provide feedback.",
      path: "/advisor-dashboard"
    }
  ];

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service, index) => (
        <ServiceCard 
          key={index}
          icon={service.icon}
          title={service.title}
          description={service.description}
          path={service.path}
        />
      ))}
    </section>
  );
};

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  path: string;
}

const ServiceCard = ({ icon, title, description, path }: ServiceCardProps) => {
  return (
    <Link to={path} className="no-underline group">
      <Card className="h-full transition-all duration-300 hover:shadow-md border-emirati-desertGold/30 hover:border-emirati-desertGold group-hover:translate-y-[-5px]">
        <CardHeader className="bg-gradient-to-r from-emirati-oasisGreen/10 to-transparent border-b">
          <CardTitle className="text-emirati-oasisGreen flex items-center gap-2">
            {icon}
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="text-muted-foreground">
            {description}
          </p>
          <div className="flex items-center mt-4 text-sm text-emirati-oasisGreen font-medium">
            <span>Explore</span>
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ServicesSection;
