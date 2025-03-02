import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0" 
        style={{ 
          backgroundImage: "url('/og-image.png')",  // Using the og-image.png which is available in public folder
          filter: "brightness(0.6)"
        }}
      />
      
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40 z-1"></div>
      
      {/* Hero content */}
      <div className="container mx-auto px-4 py-24 md:py-36 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white animate-fade-in">
            <span className="text-emirati-gold">Emirati</span> Employment Gateway
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Your gateway to employment opportunities, career development, and professional growth
            from school to retirement in the United Arab Emirates.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <Link to="/student-dashboard">
              <Button size="lg" className="bg-emirati-gold hover:bg-emirati-gold/90 text-emirati-deepBlue">
                Start Your Journey <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/job-location-matching">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Explore Opportunities
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Curved bottom shape */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-emirati-sandstone rounded-t-[50%] z-10"></div>
    </div>
  );
};

export default HeroSection;
