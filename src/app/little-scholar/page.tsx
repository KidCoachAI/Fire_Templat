'use client';

import React, {useState} from 'react';
import {GraduationCap} from 'lucide-react';
import {Button} from '@/components/ui/button';

const LittleScholarPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleButtonClick = () => {
    setIsLoading(true);
    // Simulate loading delay
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div
      className="flex flex-col items-center justify-center h-screen"
      style={{
        background: 'var(--scholar-green)',
      }}
    >
      <h1 className="text-4xl font-bold mb-4 text-white">LittleScholar Mode</h1>
      <p className="text-white mb-8">Homework-related content will go here.</p>
      <Button variant="primary" disabled={isLoading} onClick={handleButtonClick}>
        {isLoading ? (
          <>
            <GraduationCap className="mr-2 h-4 w-4 animate-spin" />
            Loading...
          </>
        ) : (
          'Start Learning'
        )}
      </Button>
    </div>
  );
};

export default LittleScholarPage;

