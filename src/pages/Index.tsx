
import React from "react";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import HeroSection from "@/components/home/HeroSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CallToActionSection from "@/components/home/CallToActionSection";
import SearchBar from "@/components/home/SearchBar";
import ServicesSection from "@/components/home/ServicesSection";
import FeaturedResourcesSection from "@/components/home/FeaturedResourcesSection";

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
      <main className="flex-1 container mx-auto py-12 px-4">
        <section className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl font-extrabold text-emirati-oasisGreen mb-4">
            Our Services
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Your gateway to employment opportunities, career development resources, and professional growth in the UAE.
          </p>
        </section>

        <ServicesSection />
        <FeaturedResourcesSection />
      </main>

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
