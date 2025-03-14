
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
        {/* Decorative cultural element */}
        <div className="flex justify-center mb-12">
          <div className="h-20 w-20 relative">
            <div className="absolute inset-0 bg-emirati-desertGold rounded-full opacity-20"></div>
            <div className="absolute inset-2 bg-emirati-oasisGreen rounded-full opacity-30"></div>
            <div className="absolute inset-4 bg-emirati-camelBrown rounded-full opacity-40"></div>
            <div className="absolute inset-6 bg-emirati-desertGold rounded-full opacity-50"></div>
            <div className="absolute inset-8 bg-emirati-oasisGreen rounded-full opacity-60"></div>
          </div>
        </div>
        
        <section className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl font-extrabold text-emirati-oasisGreen mb-4 font-serif">
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
