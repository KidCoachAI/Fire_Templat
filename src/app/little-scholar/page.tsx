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
        backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'42\' height=\'42\' viewBox=\'0 0 42 42\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M0 0h42v42H0z\'/%3E%3Cpath d=\'M3 3h13v13H3zM26 3h13v13H26zM26 26h13v13H26zM3 26h13v13H3z\' stroke=\'%23ddd\' stroke-width=\'2\'/%3E%3C/g%3E%3C/svg%3E")', // Subtle grid paper texture
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
