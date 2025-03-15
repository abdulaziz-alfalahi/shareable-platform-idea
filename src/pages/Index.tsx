
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
import { toast } from "@/components/ui/use-toast";
import { ErrorBoundary } from "@/components/ui/error-boundary";

export default function Index() {
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
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
    } catch (error) {
      console.error("Error initializing index page:", error);
      toast({
        title: "Error initializing",
        description: "There was a problem loading your profile. Some features may not work correctly.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }

    // Add event listener for unhandled promise rejections
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error("Unhandled promise rejection:", event.reason);
      // Prevent the default browser behavior (which might show an error)
      event.preventDefault();
    };

    window.addEventListener("unhandledrejection", handleUnhandledRejection);

    return () => {
      window.removeEventListener("unhandledrejection", handleUnhandledRejection);
    };
  }, []);

  const handleGetStartedClick = () => {
    try {
      setShowOnboarding(true);
    } catch (error) {
      console.error("Error showing onboarding:", error);
      toast({
        title: "Error",
        description: "There was a problem loading the onboarding flow. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Style for decorative elements inspired by UAE heritage
  const decorationStyle = {
    backgroundImage: "radial-gradient(circle, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 40%, rgba(204,170,102,0.1) 100%)",
    pointerEvents: "none", // Make sure decorative elements don't capture clicks
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-emirati-oasisGreen">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col relative">
      <Header />
      <main className="container mx-auto px-4 py-4 flex-1">
        {/* Decorative element inspired by UAE desert patterns */}
        <div 
          className="absolute top-0 right-0 w-64 h-64 -z-10 opacity-30 pointer-events-none"
          style={decorationStyle}
        ></div>
        
        <ErrorBoundary fallback={
          <div className="p-4 border border-red-300 bg-red-50 rounded-md text-red-900">
            <h3 className="text-lg font-semibold mb-2">Something went wrong</h3>
            <p>We're sorry, but there was an error loading this section. Please try refreshing the page.</p>
          </div>
        }>
          <HeroSection onGetStartedClick={handleGetStartedClick} />
          
          <div className="hidden md:block">
            <ThemeToggle />
          </div>
          
          <ServicesSection />
          <CareerJourneyTimeline />
          <TestimonialsSection />
          <FeaturedResourcesSection />
          <CallToActionSection onGetStartedClick={handleGetStartedClick} />
        </ErrorBoundary>
        
        {/* Decorative element inspired by UAE desert patterns */}
        <div 
          className="absolute bottom-0 left-0 w-64 h-64 -z-10 opacity-30 pointer-events-none"
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
