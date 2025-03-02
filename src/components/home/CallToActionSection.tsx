
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { GraduationCap, Briefcase, Users } from "lucide-react";

const CallToActionSection = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-emirati-deepBlue via-emirati-teal to-emirati-deepBlue text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Join the Emirati Employment Gateway Today</h2>
          <p className="text-lg mb-8 text-white/80">
            Whether you're a student, job seeker, or employer, we have the tools and resources to help you succeed.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="flex flex-col items-center p-6 bg-white/10 rounded-lg border border-white/20 backdrop-blur-sm transform transition-all hover:scale-105">
              <GraduationCap className="h-12 w-12 mb-4 text-emirati-gold" />
              <h3 className="text-xl font-semibold mb-2">For Students</h3>
              <p className="text-white/80 text-center">
                Discover career paths, build skills, and connect with potential employers.
              </p>
            </div>
            
            <div className="flex flex-col items-center p-6 bg-white/10 rounded-lg border border-white/20 backdrop-blur-sm transform transition-all hover:scale-105">
              <Briefcase className="h-12 w-12 mb-4 text-emirati-gold" />
              <h3 className="text-xl font-semibold mb-2">For Job Seekers</h3>
              <p className="text-white/80 text-center">
                Find opportunities that match your skills, location preferences, and career goals.
              </p>
            </div>
            
            <div className="flex flex-col items-center p-6 bg-white/10 rounded-lg border border-white/20 backdrop-blur-sm transform transition-all hover:scale-105">
              <Users className="h-12 w-12 mb-4 text-emirati-gold" />
              <h3 className="text-xl font-semibold mb-2">For Employers</h3>
              <p className="text-white/80 text-center">
                Connect with qualified Emirati talent and build a strong, diverse workforce.
              </p>
            </div>
          </div>
          
          <Link to="/student-dashboard">
            <Button size="lg" className="bg-emirati-gold text-emirati-deepBlue hover:bg-emirati-gold/90 animate-pulse">
              Get Started Now
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;
