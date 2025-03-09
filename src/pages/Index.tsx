
import React from "react";
import { Header } from "@/components/home/Header";
import { HeroSection } from "@/components/home/HeroSection";
import { SearchBar } from "@/components/home/SearchBar";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CallToActionSection } from "@/components/home/CallToActionSection";
import { Footer } from "@/components/home/Footer";
import { CreateTestUsersButton } from "@/components/ui/create-test-users-button";

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <SearchBar />
          </div>
          
          {/* Admin section for creating test users */}
          <div className="mb-12 p-6 bg-muted rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Admin Tools</h2>
            <p className="mb-4">Create test users with all available roles and password "Test1234!"</p>
            <CreateTestUsersButton />
          </div>
          
          <TestimonialsSection />
          <CallToActionSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}
