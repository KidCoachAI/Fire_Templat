'use client';

import React, {useState} from 'react';
import {GraduationCap} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Textarea} from '@/components/ui/textarea';

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
      className="flex flex-col items-center justify-center min-h-screen p-4 bg-sky-100 text-black"
      style={{
        background: 'var(--scholar-green)',
      }}
    >
      <h1 className="text-4xl font-bold mb-4 text-black">LittleScholar Mode</h1>
      <p className="text-black mb-8">Homework-related content will go here.</p>

      <div className="w-full max-w-md space-y-4">
        <div>
          <Label htmlFor="prompt">Prompt</Label>
          <Input id="prompt" placeholder="Enter your homework question" />
        </div>
        <div>
          <Label htmlFor="chat">Chat</Label>
          <Textarea id="chat" placeholder="Conversation history" readOnly className="h-24" />
        </div>
        <div>
          <Label htmlFor="answer">Answer</Label>
          <Textarea id="answer" placeholder="Generated answer" readOnly className="h-24" />
        </div>
      </div>

      <Button variant="primary" disabled={isLoading} onClick={handleButtonClick} className="mt-8">
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
