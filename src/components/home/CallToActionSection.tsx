
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { GraduationCap, Briefcase, Users } from "lucide-react";

const CallToActionSection = () => {
  return (
    <section className="py-16 relative overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-emirati-oasisGreen to-emirati-deepBrown z-0"></div>
      
      {/* Arabic pattern overlay */}
      <div 
        className="absolute inset-0 bg-repeat opacity-5 z-0" 
        style={{
          backgroundImage: "url('https://www.transparenttextures.com/patterns/arabesque.png')",
          backgroundSize: "200px"
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-white font-serif">Join the Emirati Employment Gateway Today</h2>
          <p className="text-lg mb-8 text-white/80">
            Whether you're a student, job seeker, or employer, we have the tools and resources to help you succeed.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="flex flex-col items-center p-6 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/15 transition-colors border border-white/10">
              <GraduationCap className="h-12 w-12 mb-4 text-emirati-desertGold" />
              <h3 className="text-xl font-semibold mb-2 text-white">For Students</h3>
              <p className="text-white/80 text-center">
                Discover career paths, build skills, and connect with potential employers.
              </p>
            </div>
            
            <div className="flex flex-col items-center p-6 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/15 transition-colors border border-white/10">
              <Briefcase className="h-12 w-12 mb-4 text-emirati-desertGold" />
              <h3 className="text-xl font-semibold mb-2 text-white">For Job Seekers</h3>
              <p className="text-white/80 text-center">
                Find opportunities that match your skills, location preferences, and career goals.
              </p>
            </div>
            
            <div className="flex flex-col items-center p-6 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/15 transition-colors border border-white/10">
              <Users className="h-12 w-12 mb-4 text-emirati-desertGold" />
              <h3 className="text-xl font-semibold mb-2 text-white">For Employers</h3>
              <p className="text-white/80 text-center">
                Connect with qualified Emirati talent and build a strong, diverse workforce.
              </p>
            </div>
          </div>
          
          {/* UAE-inspired button styling */}
          <Link to="/student-dashboard">
            <Button size="lg" className="bg-emirati-desertGold text-emirati-oasisGreen hover:bg-emirati-desertGold/90 font-semibold relative overflow-hidden group">
              <span className="relative z-10">Get Started Now</span>
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;
