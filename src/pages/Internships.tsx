
import React from "react";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import InternshipHeader from "@/components/internships/InternshipHeader";
import InternshipList from "@/components/internships/InternshipList";
import InternshipTips from "@/components/internships/InternshipTips";
import { internshipsData } from "@/data/internshipsData";

const Internships = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <InternshipHeader />
        <InternshipList internships={internshipsData} />
        <InternshipTips />
      </main>
      <Footer />
    </div>
  );
};

export default Internships;
