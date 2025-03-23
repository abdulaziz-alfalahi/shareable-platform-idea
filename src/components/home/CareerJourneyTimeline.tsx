
import React from "react";
import { motion } from "framer-motion";
import { 
  GraduationCap,
  Briefcase,
  Award,
  Building,
  Users,
  BookOpen,
  Rocket,
  TrendingUp,
  Target,
  Heart,
  Wallet
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface TimelineStage {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  link: string;
  linkText: string;
}

const CareerJourneyTimeline: React.FC = () => {
  const timelineStages: TimelineStage[] = [
    {
      icon: <GraduationCap className="h-8 w-8" />,
      title: "Education",
      description: "Begin your journey with quality education and academic guidance tailored to your strengths.",
      color: "bg-blue-500",
      link: "/student-dashboard",
      linkText: "Student Resources"
    },
    {
      icon: <Rocket className="h-8 w-8" />,
      title: "Career Launch",
      description: "Discover your path with internships, skill assessments, and entry-level opportunities.",
      color: "bg-emirati-teal",
      link: "/job-location-matching",
      linkText: "Find Opportunities"
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Professional Growth",
      description: "Develop your skills and advance your career through training and mentorship.",
      color: "bg-emirati-gold",
      link: "/training-centers",
      linkText: "Explore Training"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Leadership",
      description: "Take on leadership roles and contribute to your organization and community.",
      color: "bg-purple-500",
      link: "/career-passport",
      linkText: "Leadership Resources"
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Work-Life Balance",
      description: "Maintain balance and well-being throughout your professional journey.",
      color: "bg-pink-500",
      link: "/career-passport",
      linkText: "Wellness Resources"
    },
    {
      icon: <Wallet className="h-8 w-8" />,
      title: "Retirement Planning",
      description: "Prepare for a fulfilling retirement with financial planning and resources.",
      color: "bg-amber-500",
      link: "/enhanced-retirement-planning",
      linkText: "Plan Your Future"
    },
  ];

  return (
    <div className="py-16 bg-emirati-sandstone/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-emirati-navy mb-4 font-display">
            Your Personalized Career Journey
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            From education to retirement, we support every step of your professional development
          </p>
        </div>

        {/* Decorative element */}
        <div className="flex justify-center mb-10">
          <div className="h-px w-40 bg-emirati-gold relative">
            <div className="absolute -bottom-2 h-1 w-full bg-emirati-teal"></div>
            <div className="absolute -top-2 h-1 w-full bg-emirati-teal"></div>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 via-emirati-teal to-amber-500 rounded-full"></div>

          <div className="space-y-12 md:space-y-0">
            {timelineStages.map((stage, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.2,
                  ease: "easeOut" 
                }}
                className={`flex flex-col md:flex-row md:items-center ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } mb-12`}
              >
                {/* Content */}
                <div className={`md:w-1/2 ${
                  index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"
                }`}>
                  <div className={`p-6 bg-white rounded-xl shadow-md border-l-4 ${stage.color.replace('bg-', 'border-')} hover:shadow-lg transition-shadow`}>
                    <h3 className="text-xl font-bold mb-2 text-emirati-navy">{stage.title}</h3>
                    <p className="text-gray-600 mb-4">{stage.description}</p>
                    <Link to={stage.link}>
                      <Button 
                        className={`${stage.color} hover:${stage.color.replace('bg-', 'bg-')}/90 rounded-full`}
                      >
                        {stage.linkText}
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Icon in middle for desktop */}
                <div className="hidden md:flex md:w-0 justify-center">
                  <div className={`${stage.color} w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-white z-10`}>
                    {stage.icon}
                  </div>
                </div>

                {/* Icon on side for mobile */}
                <div className="md:hidden flex justify-center my-4">
                  <div className={`${stage.color} w-12 h-12 rounded-full shadow-lg flex items-center justify-center text-white`}>
                    {stage.icon}
                  </div>
                </div>
                
                {/* Empty div to maintain layout */}
                <div className="md:w-1/2"></div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-emirati-navy mb-4">Ready to start your journey?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Create your Career Passport today and begin tracking your progress through each stage of your professional development.
          </p>
          <Link to="/career-passport">
            <Button className="bg-emirati-navy hover:bg-emirati-navy/90 px-8 py-6 text-lg rounded-full">
              Create Your Career Passport
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CareerJourneyTimeline;
