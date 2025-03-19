
import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import CareerPassport from '@/components/passport/CareerPassport';
import { studentData } from '@/data/studentMockData';
import UaeGeometricPattern from '@/components/ui/uae/UaeGeometricPattern';

const CareerPassportPage = () => {
  const { id } = useParams<{ id?: string }>();
  
  // If no ID is provided, use the mock student data
  const studentId = id ? parseInt(id) : studentData.id;
  
  return (
    <div className="min-h-screen flex flex-col bg-emirati-sandstone/30">
      <Header />
      
      <main className="flex-1 relative">
        {/* Background patterns */}
        <UaeGeometricPattern 
          type="dune"
          position="background"
          opacity={0.05}
          className="fixed top-0 left-0 w-full h-20"
        />
        
        <div className="container mx-auto py-8 px-4">
          <CareerPassport userId={studentId} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CareerPassportPage;
