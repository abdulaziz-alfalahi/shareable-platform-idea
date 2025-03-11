
import React from "react";
import { Link } from "react-router-dom";
import { 
  Briefcase, 
  GraduationCap, 
  Users, 
  Building, 
  BookOpen, 
  Award,
  Map
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, link }) => {
  return (
    <div className="bg-white rounded-lg shadow-md border border-emirati-sandBeige/30 p-6 transition-all duration-300 hover:shadow-lg hover:border-emirati-oasisGreen/30">
      <div className="text-emirati-oasisGreen mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-emirati-deepBlue mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <Link to={link}>
        <Button className="bg-emirati-oasisGreen hover:bg-emirati-oasisGreen/90 w-full">
          Learn More
        </Button>
      </Link>
    </div>
  );
};

const ServicesSection = () => {
  const services = [
    {
      icon: <GraduationCap className="w-10 h-10" />,
      title: "Career Development",
      description: "Personalized career pathways, skills assessment, and development plans tailored to your goals.",
      link: "/career-passport",
    },
    {
      icon: <Briefcase className="w-10 h-10" />,
      title: "Job Matching",
      description: "Find the perfect job opportunities that match your skills, preferences, and career aspirations.",
      link: "/job-applications",
    },
    {
      icon: <Users className="w-10 h-10" />,
      title: "Mentorship",
      description: "Connect with experienced professionals who can guide you through your career journey.",
      link: "/student-dashboard",
    },
    {
      icon: <BookOpen className="w-10 h-10" />,
      title: "Training Programs",
      description: "Access specialized training and courses to enhance your skills and qualifications.",
      link: "/training-centers",
    },
    {
      icon: <Building className="w-10 h-10" />,
      title: "Internship Opportunities",
      description: "Gain practical experience through internships with leading UAE organizations.",
      link: "/job-location-matching",
    },
    {
      icon: <Map className="w-10 h-10" />,
      title: "Platform Mindmap",
      description: "Visualize all user journeys through our comprehensive career development ecosystem.",
      link: "/mindmap",
    },
    {
      icon: <Award className="w-10 h-10" />,
      title: "Portfolio Building",
      description: "Create a compelling digital portfolio that showcases your achievements and capabilities.",
      link: "/achievements",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 animate-fade-in">
      {services.map((service, index) => (
        <ServiceCard
          key={index}
          icon={service.icon}
          title={service.title}
          description={service.description}
          link={service.link}
        />
      ))}
    </div>
  );
};

export default ServicesSection;
