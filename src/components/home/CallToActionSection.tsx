
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface CallToActionSectionProps {
  onGetStartedClick?: () => void;
}

const CallToActionSection: React.FC<CallToActionSectionProps> = ({ 
  onGetStartedClick 
}) => {
  return (
    <section className="bg-emirati-navy text-white py-16 rounded-3xl my-16 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-emirati-teal/20 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-emirati-gold/20 rounded-full filter blur-3xl"></div>
      
      <div className="container mx-auto text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-display font-semibold text-white mb-6">
          Ready to Start Your Emirati Journey?
        </h2>
        
        <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
          Begin your career path today and unlock a world of opportunities designed specifically for Emiratis.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button 
            className="bg-white text-emirati-navy font-medium py-4 px-8 rounded-full shadow-sm hover:shadow-lg transition-all duration-300"
            onClick={onGetStartedClick}
          >
            Start Your Journey
          </button>
          
          <Link to="/resume-builder" className="bg-emirati-teal/20 hover:bg-emirati-teal/30 text-white font-medium py-4 px-8 rounded-full border border-emirati-teal/30 transition-all duration-300">
            Create Your Resume
          </Link>
        </div>
        
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
          <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
            <h3 className="font-semibold text-emirati-gold mb-2">Students & Graduates</h3>
            <p className="text-sm text-white/80 mb-3">Discover career paths, connect with mentors, and find opportunities</p>
            <Button variant="ghost" size="sm" className="w-full text-white hover:text-white hover:bg-white/10" asChild>
              <Link to="/student-dashboard">Explore</Link>
            </Button>
          </div>
          
          <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
            <h3 className="font-semibold text-emirati-gold mb-2">Professionals</h3>
            <p className="text-sm text-white/80 mb-3">Upskill, find new opportunities, and advance your career</p>
            <Button variant="ghost" size="sm" className="w-full text-white hover:text-white hover:bg-white/10" asChild>
              <Link to="/career-passport">Explore</Link>
            </Button>
          </div>
          
          <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
            <h3 className="font-semibold text-emirati-gold mb-2">Employers</h3>
            <p className="text-sm text-white/80 mb-3">Find qualified Emirati talent and contribute to Emiratization goals</p>
            <Button variant="ghost" size="sm" className="w-full text-white hover:text-white hover:bg-white/10" asChild>
              <Link to="/recruiter-dashboard">Explore</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;
