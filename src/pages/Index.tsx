import { useState } from 'react';
import HeroSection from '@/components/bistro/HeroSection';
import URLBuilder from '@/components/bistro/URLBuilder';
import DocumentTypes from '@/components/bistro/DocumentTypes';
import HTTPSimulator from '@/components/bistro/HTTPSimulator';
import ConnectionRace from '@/components/bistro/ConnectionRace';
import CookiesProxy from '@/components/bistro/CookiesProxy';
import Quiz from '@/components/bistro/Quiz';
import AdminPanel from '@/components/bistro/AdminPanel';

const Index = () => {
  const [startedLearning, setStartedLearning] = useState(false);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <HeroSection onStart={() => setStartedLearning(true)} />
      
      {startedLearning && (
        <div className="space-y-24 pb-24">
          <URLBuilder />
          <DocumentTypes />
          <HTTPSimulator />
          <ConnectionRace />
          <CookiesProxy />
          <Quiz />
          <AdminPanel />
        </div>
      )}
    </div>
  );
};

export default Index;
