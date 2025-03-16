
import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import CareerPassport from '@/components/passport/CareerPassport';
import { studentData } from '@/data/studentMockData'; // Import mock student data

const CareerPassportPage = () => {
  const { id } = useParams<{ id?: string }>();
  
  // If no ID is provided, use the mock student data
  // In a real app, we would fetch the user from an authentication context
  const studentId = id ? parseInt(id) : studentData.id;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <CareerPassport userId={studentId} />
      </main>
      <Footer />
    </div>
  );
};

export default CareerPassportPage;
