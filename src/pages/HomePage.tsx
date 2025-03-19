
import React from "react";
import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/services/ServicesSection";
import CareerJourneyTimeline from "@/components/home/CareerJourneyTimeline";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FeaturedResourcesSection from "@/components/home/FeaturedResourcesSection";
import CallToActionSection from "@/components/home/CallToActionSection";

const HomePage: React.FC = () => {
  return (
    <div className="container mx-auto px-4">
      <HeroSection />
      <ServicesSection />
      <CareerJourneyTimeline />
      <TestimonialsSection />
      <FeaturedResourcesSection />
      <CallToActionSection />
    </div>
  );
};

export default HomePage;
