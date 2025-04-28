'use client';

import React, {useState} from 'react';
import {Lightbulb} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Textarea} from '@/components/ui/textarea';

const TinkerTalkPage = () => {
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
      <h1 className="text-4xl font-bold mb-4">TinkerTalk Mode</h1>
      <p className="text-gray-600 mb-8">How Things Work content will go here.</p>

      <div className="w-full max-w-md space-y-4">
        <div>
          <Label htmlFor="prompt">Prompt</Label>
          <Input id="prompt" placeholder="Enter your how things work question" />
        </div>
        <div>
          <Label htmlFor="chat">Chat</Label>
          <Textarea id="chat" placeholder="Conversation history" readOnly className="h-24" />
        </div>
        <div>
          <Label htmlFor="answer">Answer</Label>
          <Textarea id="answer" placeholder="Generated explanation" readOnly className="h-24" />
        </div>
      </div>

      <Button variant="primary" disabled={isLoading} onClick={handleButtonClick} className="mt-8">
        {isLoading ? (
          <>
            <Lightbulb className="mr-2 h-4 w-4 animate-spin" />
            Loading...
          </>
        ) : (
          'Explore How Things Work'
        )}
      </Button>
    </div>
  );
};

export default TinkerTalkPage;
