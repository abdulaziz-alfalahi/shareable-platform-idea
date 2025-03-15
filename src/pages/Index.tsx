
import React, { useState, useEffect } from "react";
import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CallToActionSection from "@/components/home/CallToActionSection";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import FeaturedResourcesSection from "@/components/home/FeaturedResourcesSection";
import CareerJourneyTimeline from "@/components/home/CareerJourneyTimeline";
import ThemeToggle from "@/components/home/theme/ThemeToggle";
import OnboardingWrapper from "@/components/onboarding/OnboardingWrapper";

export default function Index() {
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    // Check if user has completed onboarding
    const hasCompletedOnboarding = localStorage.getItem('hasCompletedOnboarding') === 'true';
    setHasSeenOnboarding(hasCompletedOnboarding);
    
    // If returning user already has a profile, get their data
    if (hasCompletedOnboarding) {
      const userProfile = localStorage.getItem('userProfile');
      if (userProfile) {
        console.log("Returning user profile:", JSON.parse(userProfile));
        // In a real app, you would use this to personalize the experience
      }
    }
  }, []);

  const handleGetStartedClick = () => {
    setShowOnboarding(true);
  };

  // Style for decorative elements inspired by UAE heritage
  const decorationStyle = {
    backgroundImage: "radial-gradient(circle, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 40%, rgba(204,170,102,0.1) 100%)",
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      <Header />
      <main className="container mx-auto px-4 py-4 flex-1">
        {/* Decorative element inspired by UAE desert patterns */}
        <div 
          className="absolute top-0 right-0 w-64 h-64 -z-10 opacity-30"
          style={decorationStyle}
        ></div>
        
        <HeroSection onGetStartedClick={handleGetStartedClick} />
        
        <div className="hidden md:block">
          <ThemeToggle />
        </div>
        
        <ServicesSection />
        <CareerJourneyTimeline />
        <TestimonialsSection />
        <FeaturedResourcesSection />
        <CallToActionSection onGetStartedClick={handleGetStartedClick} />
        
        {/* Decorative element inspired by UAE desert patterns */}
        <div 
          className="absolute bottom-0 left-0 w-64 h-64 -z-10 opacity-30"
          style={decorationStyle}
        ></div>
      </main>
      <Footer />
      
      {showOnboarding && (
        <OnboardingWrapper hasCompletedOnboarding={hasSeenOnboarding} />
      )}
    </div>
  );
}
