
import React from "react";
import { Link } from "react-router-dom";
import { 
  Briefcase, 
  GraduationCap, 
  Users, 
  Building, 
  BookOpen, 
  Award,
  Map,
  Database,
  Coffee,
  Compass,
  Landmark,
  Palmtree
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
  iconBg?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, link, iconBg = "bg-emirati-oasisGreen/10" }) => {
  return (
    <div className="bg-white rounded-lg shadow-md border border-emirati-sandstone/30 p-6 transition-all duration-300 hover:shadow-lg hover:border-emirati-oasisGreen/30 group">
      <div className={`${iconBg} w-16 h-16 rounded-full flex items-center justify-center text-emirati-oasisGreen mb-4 group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-emirati-deepBrown mb-2">{title}</h3>
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
      icon: <GraduationCap className="w-8 h-8" />,
      title: "Career Development",
      description: "Personalized career pathways, skills assessment, and development plans tailored to your goals.",
      link: "/career-passport",
      iconBg: "bg-emirati-desertGold/10"
    },
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: "Job Matching",
      description: "Find the perfect job opportunities that match your skills, preferences, and career aspirations.",
      link: "/job-applications",
      iconBg: "bg-emirati-oasisGreen/10"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Mentorship",
      description: "Connect with experienced professionals who can guide you through your career journey.",
      link: "/student-dashboard",
      iconBg: "bg-emirati-camelBrown/10"
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Training Programs",
      description: "Access specialized training and courses to enhance your skills and qualifications.",
      link: "/training-centers",
      iconBg: "bg-emirati-desertGold/10"
    },
    {
      icon: <Building className="w-8 h-8" />,
      title: "Internship Opportunities",
      description: "Gain practical experience through internships with leading UAE organizations.",
      link: "/job-location-matching",
      iconBg: "bg-emirati-oasisGreen/10"
    },
    {
      icon: <Map className="w-8 h-8" />,
      title: "Platform Mindmap",
      description: "Visualize all user journeys through our comprehensive career development ecosystem.",
      link: "/mindmap",
      iconBg: "bg-emirati-camelBrown/10"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Portfolio Building",
      description: "Create a compelling digital portfolio that showcases your achievements and capabilities.",
      link: "/achievements",
      iconBg: "bg-emirati-desertGold/10"
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "Data Entry",
      description: "Upload and manage student academic records and reports for platform integration.",
      link: "/data-entry",
      iconBg: "bg-emirati-oasisGreen/10"
    },
  ];

  return (
    <div>
      {/* Arabic-inspired decorative pattern */}
      <div className="flex justify-center mb-8">
        <div className="h-px w-40 bg-emirati-desertGold relative">
          <div className="absolute -bottom-2 h-1 w-full bg-emirati-oasisGreen"></div>
          <div className="absolute -top-2 h-1 w-full bg-emirati-oasisGreen"></div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12 animate-fade-in">
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            icon={service.icon}
            title={service.title}
            description={service.description}
            link={service.link}
            iconBg={service.iconBg}
          />
        ))}
      </div>
      
      {/* Arabic-inspired decorative pattern */}
      <div className="flex justify-center mt-8">
        <div className="h-px w-40 bg-emirati-desertGold relative">
          <div className="absolute -bottom-2 h-1 w-full bg-emirati-oasisGreen"></div>
          <div className="absolute -top-2 h-1 w-full bg-emirati-oasisGreen"></div>
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;
