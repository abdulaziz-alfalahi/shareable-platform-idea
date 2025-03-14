
import React, { useState } from "react";
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
  Wallet
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";

// Define career stages for filtering
type CareerStage = "all" | "early" | "mid" | "late";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
  iconBg?: string;
  stage: CareerStage | CareerStage[];
  hoverInfo?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ 
  icon, 
  title, 
  description, 
  link, 
  iconBg = "bg-emirati-oasisGreen/10",
  hoverInfo,
}) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="bg-white rounded-lg shadow-md border border-emirati-sandstone/30 p-6 transition-all duration-300 
                      hover:shadow-lg hover:border-emirati-oasisGreen/30 group hover:-translate-y-1 
                      hover:shadow-emirati-oasisGreen/10">
          <div className={`${iconBg} w-16 h-16 rounded-full flex items-center justify-center text-emirati-oasisGreen mb-4 
                          group-hover:scale-110 transition-transform`}>
            {icon}
          </div>
          <h3 className="text-xl font-semibold text-emirati-deepBrown mb-2 group-hover:text-emirati-oasisGreen transition-colors">{title}</h3>
          <p className="text-gray-600 mb-4">{description}</p>
          <Link to={link}>
            <Button className="bg-emirati-oasisGreen hover:bg-emirati-oasisGreen/90 w-full 
                             transform transition-transform group-hover:scale-[1.02]">
              Learn More
            </Button>
          </Link>
        </div>
      </HoverCardTrigger>
      {hoverInfo && (
        <HoverCardContent className="w-80 p-4 bg-white border border-emirati-sandBeige shadow-md">
          <p className="text-sm text-emirati-deepBrown">{hoverInfo}</p>
        </HoverCardContent>
      )}
    </HoverCard>
  );
};

const FilterButton: React.FC<{
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}> = ({ active, onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
        active 
          ? "bg-emirati-oasisGreen text-white shadow-md" 
          : "bg-emirati-sandBeige/50 text-emirati-deepBrown hover:bg-emirati-sandBeige"
      )}
    >
      {children}
    </button>
  );
};

const ServicesSection = () => {
  const [activeFilter, setActiveFilter] = useState<CareerStage>("all");

  const services: ServiceCardProps[] = [
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
      icon: <Compass className="w-8 h-8" />,
      title: "Career Exploration",
      description: "Discover potential career paths tailored to your skills, interests, and the UAE market needs.",
      link: "/mindmap",
      iconBg: "bg-emirati-oasisGreen/10",
      stage: ["early", "mid"],
      hoverInfo: "Visualize career possibilities with our interactive mind mapping tools to find your perfect match."
    },
    {
      icon: <Building className="w-8 h-8" />,
      title: "Internship Programs",
      description: "Gain practical experience through internships with leading UAE organizations.",
      link: "/job-location-matching",
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
      link: "/student-dashboard",
      iconBg: "bg-emirati-camelBrown/10",
      stage: ["early", "mid"],
      hoverInfo: "Learn from successful Emirati professionals who have volunteered to share their knowledge and experience."
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Portfolio Building",
      description: "Create a compelling digital portfolio that showcases your achievements and capabilities.",
      link: "/achievements",
      iconBg: "bg-emirati-desertGold/10",
      stage: ["early", "mid"],
      hoverInfo: "Build a digital showcase of your accomplishments, projects, and skills to impress potential employers."
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
      icon: <BookOpen className="w-8 h-8" />,
      title: "Continuous Learning",
      description: "Access lifelong learning resources to stay relevant in an evolving job market.",
      link: "/training-centers",
      iconBg: "bg-emirati-camelBrown/10",
      stage: ["mid", "late"],
      hoverInfo: "Explore our vast library of courses, workshops, and resources designed for ongoing professional growth."
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Work-Life Balance",
      description: "Strategies and resources for maintaining a healthy balance throughout your career journey.",
      link: "/student-dashboard",
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

  // Filter services based on active filter
  const filteredServices = services.filter(service => 
    activeFilter === "all" || 
    (Array.isArray(service.stage) 
      ? service.stage.includes(activeFilter)
      : service.stage === activeFilter)
  );

  return (
    <div>
      <div className="flex justify-center mb-8">
        <div className="h-px w-40 bg-emirati-desertGold relative">
          <div className="absolute -bottom-2 h-1 w-full bg-emirati-oasisGreen"></div>
          <div className="absolute -top-2 h-1 w-full bg-emirati-oasisGreen"></div>
        </div>
      </div>
      
      {/* Filter buttons */}
      <div className="flex justify-center gap-4 mb-10">
        <FilterButton 
          active={activeFilter === "all"} 
          onClick={() => setActiveFilter("all")}
        >
          All Services
        </FilterButton>
        <FilterButton 
          active={activeFilter === "early"} 
          onClick={() => setActiveFilter("early")}
        >
          Early Career
        </FilterButton>
        <FilterButton 
          active={activeFilter === "mid"} 
          onClick={() => setActiveFilter("mid")}
        >
          Mid Career
        </FilterButton>
        <FilterButton 
          active={activeFilter === "late"} 
          onClick={() => setActiveFilter("late")}
        >
          Late Career
        </FilterButton>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
        {filteredServices.map((service, index) => (
          <div 
            className="animate-fade-in" 
            style={{ animationDelay: `${index * 0.1}s` }}
            key={index}
          >
            <ServiceCard
              icon={service.icon}
              title={service.title}
              description={service.description}
              link={service.link}
              iconBg={service.iconBg}
              stage={service.stage}
              hoverInfo={service.hoverInfo}
            />
          </div>
        ))}
      </div>
      
      {/* Show a message when no services match the filter */}
      {filteredServices.length === 0 && (
        <div className="text-center py-10 animate-fade-in">
          <p className="text-lg text-emirati-deepBrown">No services available for this career stage.</p>
        </div>
      )}
      
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
