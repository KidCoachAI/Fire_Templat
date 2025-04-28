'use client';

import React, {useState} from 'react';
import {Puzzle} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Textarea} from '@/components/ui/textarea';

const MindMosaicPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleButtonClick = () => {
    setIsLoading(true);
    // Simulate loading delay
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-4">MindMosaic Mode</h1>
      <p className="text-gray-600 mb-8">Mind games content will go here.</p>

      <div className="w-full max-w-md space-y-4">
        <div>
          <Label htmlFor="prompt">Prompt</Label>
          <Input id="prompt" placeholder="Enter your mind game query" />
        </div>
        <div>
          <Label htmlFor="chat">Chat</Label>
          <Textarea id="chat" placeholder="Conversation history" readOnly className="h-24" />
        </div>
        <div>
          <Label htmlFor="answer">Answer</Label>
          <Textarea id="answer" placeholder="Generated game content" readOnly className="h-24" />
        </div>
      </div>

      <Button variant="primary" disabled={isLoading} onClick={handleButtonClick} className="mt-8">
        {isLoading ? (
          <>
            <Puzzle className="mr-2 h-4 w-4 animate-spin" />
            Loading...
          </>
        ) : (
          'Start Playing'
        )}
      </Button>
    </div>
  );
};

export default MindMosaicPage;
