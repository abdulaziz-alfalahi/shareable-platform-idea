
import React from "react";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import HeroSection from "@/components/home/HeroSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CallToActionSection from "@/components/home/CallToActionSection";
import SearchBar from "@/components/home/SearchBar";
import ServicesSection from "@/components/home/ServicesSection";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen bg-emirati-sandstone">
      <Header />

      {/* Hero Section */}
      <HeroSection />

      {/* Search Section */}
      <section className="py-8 -mt-6 relative z-10">
        <div className="container mx-auto px-4">
          <SearchBar />
        </div>
      </section>

      {/* Services Section */}
      <ServicesSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Call to Action Section */}
      <CallToActionSection />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
