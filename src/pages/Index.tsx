
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
    // In a real app, this would check localStorage or a database
    const hasCompletedOnboarding = localStorage.getItem('hasCompletedOnboarding');
    setHasSeenOnboarding(!!hasCompletedOnboarding);
  }, []);

  const handleGetStartedClick = () => {
    setShowOnboarding(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container mx-auto px-4 py-4 flex-1">
        <HeroSection onGetStartedClick={handleGetStartedClick} />
        <div className="hidden md:block">
          <ThemeToggle />
        </div>
        <ServicesSection />
        <CareerJourneyTimeline />
        <TestimonialsSection />
        <FeaturedResourcesSection />
        <CallToActionSection onGetStartedClick={handleGetStartedClick} />
      </main>
      <Footer />
      
      {showOnboarding && (
        <OnboardingWrapper hasCompletedOnboarding={hasSeenOnboarding} />
      )}
    </div>
  );
}
