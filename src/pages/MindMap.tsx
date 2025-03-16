
import React, { useState } from "react";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import MindMapContent from "@/components/mind-map/MindMapContent";

const MindMap = () => {
  const [activeTab, setActiveTab] = useState("student");

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <MindMapContent activeTab={activeTab} setActiveTab={setActiveTab} />
      </main>
      <Footer />
    </div>
  );
};

export default MindMap;
