
import React from 'react';
import Header from '@/components/home/Header';
import TestAccountsManager from '@/components/admin/TestAccountsManager';

const TestAccountsPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-emirati-sandstone/10">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-emirati-desertRed mb-6">Test Accounts</h1>
          <TestAccountsManager />
        </div>
      </main>
    </div>
  );
};

export default TestAccountsPage;
