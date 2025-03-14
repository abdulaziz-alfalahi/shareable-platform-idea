
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
  School,
  Clock,
  TrendingUp,
  Heart,
  PiggyBank
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
      icon: <School className="w-8 h-8" />,
      title: "Early Education",
      description: "Academic guidance for school students to identify strengths and potential career paths.",
      link: "/student-dashboard",
      iconBg: "bg-emirati-camelBrown/10"
    },
    {
      icon: <GraduationCap className="w-8 h-8" />,
      title: "University Pathways",
      description: "Find the best university programs aligned with your career goals and interests.",
      link: "/career-passport",
      iconBg: "bg-emirati-desertGold/10"
    },
    {
      icon: <Compass className="w-8 h-8" />,
      title: "Career Exploration",
      description: "Discover potential career paths tailored to your skills, interests, and the UAE market needs.",
      link: "/mindmap",
      iconBg: "bg-emirati-oasisGreen/10"
    },
    {
      icon: <Building className="w-8 h-8" />,
      title: "Internship Programs",
      description: "Gain practical experience through internships with leading UAE organizations.",
      link: "/job-location-matching",
      iconBg: "bg-emirati-camelBrown/10"
    },
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: "Job Matching",
      description: "Find job opportunities that align with your skills, qualifications, and career aspirations.",
      link: "/job-applications",
      iconBg: "bg-emirati-desertGold/10"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Skills Development",
      description: "Enhance your professional capabilities through targeted training and certification programs.",
      link: "/training-centers",
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
      icon: <Award className="w-8 h-8" />,
      title: "Portfolio Building",
      description: "Create a compelling digital portfolio that showcases your achievements and capabilities.",
      link: "/achievements",
      iconBg: "bg-emirati-desertGold/10"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Mid-Career Transition",
      description: "Navigate career changes with personalized guidance and reskilling opportunities.",
      link: "/career-passport",
      iconBg: "bg-emirati-oasisGreen/10"
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Continuous Learning",
      description: "Access lifelong learning resources to stay relevant in an evolving job market.",
      link: "/training-centers",
      iconBg: "bg-emirati-camelBrown/10"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Work-Life Balance",
      description: "Strategies and resources for maintaining a healthy balance throughout your career journey.",
      link: "/student-dashboard",
      iconBg: "bg-emirati-desertGold/10"
    },
    {
      icon: <PiggyBank className="w-8 h-8" />,
      title: "Retirement Planning",
      description: "Prepare for a fulfilling retirement with financial guidance and post-career opportunities.",
      link: "/mindmap",
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
