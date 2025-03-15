
import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import CareerPassport from '@/components/passport/CareerPassport';

const CareerPassportPage = () => {
  const { id } = useParams<{ id?: string }>();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <CareerPassport userId={id} />
      </main>
      <Footer />
    </div>
  );
};

export default CareerPassportPage;
