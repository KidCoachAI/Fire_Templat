'use client';

import React, {useState} from 'react';
import {BookOpen} from 'lucide-react';
import {Button} from '@/components/ui/button';

const FableBotPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleButtonClick = () => {
    setIsLoading(true);
    // Simulate loading delay
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">FableBot Mode</h1>
      <p className="text-gray-600 mb-8">Story-related content will go here.</p>
      <Button variant="primary" disabled={isLoading} onClick={handleButtonClick}>
        {isLoading ? (
          <>
            <BookOpen className="mr-2 h-4 w-4 animate-spin" />
            Loading...
          </>
        ) : (
          'Read a Story'
        )}
      </Button>
    </div>
  );
};

export default FableBotPage;
