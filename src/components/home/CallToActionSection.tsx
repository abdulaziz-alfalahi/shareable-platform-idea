
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface CallToActionSectionProps {
  onGetStartedClick?: () => void;
}

const CallToActionSection: React.FC<CallToActionSectionProps> = ({ 
  onGetStartedClick 
}) => {
  return (
    <section className="py-16 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-emirati-oasisGreen/5 -z-10"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-emirati-desertGold/20 rounded-bl-full -z-10"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-emirati-oasisGreen/20 rounded-tr-full -z-10"></div>
      
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-emirati-desertRed mb-4">
          Ready to Start Your Emirati Journey?
        </h2>
        
        <p className="text-lg text-gray-700 max-w-xl mx-auto mb-8">
          Begin your career path today and unlock a world of opportunities designed specifically for Emiratis.
        </p>
        
        <Button 
          size="lg" 
          className="bg-emirati-oasisGreen hover:bg-emirati-oasisGreen/90 text-white"
          onClick={onGetStartedClick}
        >
          Get Started Now <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
          <div className="p-4 rounded-lg bg-white shadow-sm">
            <h3 className="font-semibold text-emirati-oasisGreen mb-2">Students & Graduates</h3>
            <p className="text-sm text-gray-600">Discover career paths, connect with mentors, and find opportunities</p>
          </div>
          
          <div className="p-4 rounded-lg bg-white shadow-sm">
            <h3 className="font-semibold text-emirati-camelBrown mb-2">Professionals</h3>
            <p className="text-sm text-gray-600">Upskill, find new opportunities, and advance your career</p>
          </div>
          
          <div className="p-4 rounded-lg bg-white shadow-sm">
            <h3 className="font-semibold text-emirati-desertGold mb-2">Employers</h3>
            <p className="text-sm text-gray-600">Find qualified Emirati talent and contribute to Emiratization goals</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;
