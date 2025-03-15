
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface HeroSectionProps {
  onGetStartedClick?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onGetStartedClick }) => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (onGetStartedClick) {
      onGetStartedClick();
    } else {
      navigate("/student-dashboard");
    }
  };

  return (
    <div className="relative py-16 md:py-24 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-emirati-desertGold/10 rounded-bl-full"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-emirati-oasisGreen/5 rounded-tr-full"></div>
      </div>
      
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-emirati-desertRed mb-6">
          Building the Future of <span className="text-emirati-oasisGreen">Emirati</span> Careers
        </h1>
        
        <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
          Your complete journey from education to employment. Discover opportunities, build skills, and 
          find your path to success in the UAE's growing economy.
        </p>
        
        <div className="space-x-4">
          <Button 
            size="lg" 
            className="bg-emirati-oasisGreen hover:bg-emirati-oasisGreen/90 text-white"
            onClick={handleGetStarted}
          >
            Get Started <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => navigate("/career-passport")}
          >
            Explore Career Passport
          </Button>
        </div>
        
        <div className="mt-12 flex flex-wrap justify-center gap-8">
          <div className="text-center">
            <p className="text-3xl font-bold text-emirati-oasisGreen">25,000+</p>
            <p className="text-sm text-gray-600">Students</p>
          </div>
          
          <div className="text-center">
            <p className="text-3xl font-bold text-emirati-camelBrown">1,500+</p>
            <p className="text-sm text-gray-600">Employers</p>
          </div>
          
          <div className="text-center">
            <p className="text-3xl font-bold text-emirati-desertGold">7,800+</p>
            <p className="text-sm text-gray-600">Placements</p>
          </div>
          
          <div className="text-center">
            <p className="text-3xl font-bold text-emirati-linkedinBlue">250+</p>
            <p className="text-sm text-gray-600">Training Centers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
