
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
          backgroundImage: "url('https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
          filter: "brightness(0.4)"
        }}
      />
      
      {/* Arabic geometric pattern overlay */}
      <div 
        className="absolute inset-0 bg-repeat opacity-10 z-0" 
        style={{
          backgroundImage: "url('https://www.transparenttextures.com/patterns/arabesque.png')",
          backgroundSize: "200px"
        }}
      />
      
      {/* Hero content */}
      <div className="container mx-auto px-4 py-24 md:py-36 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white animate-fade-in font-serif">
            Shape Your Future in the UAE
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Your gateway to employment opportunities, career development, and professional growth
            from school to retirement.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <Link to="/student-dashboard">
              <Button size="lg" className="bg-emirati-oasisGreen hover:bg-emirati-oasisGreen/90 text-white">
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
      
      {/* Decorative element - Bottom wave pattern */}
      <div className="absolute bottom-0 left-0 right-0 h-16 md:h-24 z-10">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="absolute bottom-0 text-emirati-sandstone">
          <path fill="currentColor" fillOpacity="1" d="M0,160L48,160C96,160,192,160,288,170.7C384,181,480,203,576,186.7C672,171,768,117,864,101.3C960,85,1056,107,1152,117.3C1248,128,1344,128,1392,128L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </div>
  );
};

export default HeroSection;
