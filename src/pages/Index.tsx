
import React from "react";
import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CallToActionSection from "@/components/home/CallToActionSection";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import FeaturedResourcesSection from "@/components/home/FeaturedResourcesSection";
import CareerJourneyTimeline from "@/components/home/CareerJourneyTimeline";
import ThemeToggle from "@/components/home/theme/ThemeToggle";

export default function Index() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-4">
        <HeroSection />
        <ThemeToggle />
        <ServicesSection />
        <CareerJourneyTimeline />
        <TestimonialsSection />
        <FeaturedResourcesSection />
        <CallToActionSection />
      </main>
      <Footer />
    </div>
  );
}
