'use client';

import React, {useState} from 'react';
import {Globe} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Textarea} from '@/components/ui/textarea';

const StarChatPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [chat, setChat] = useState('');
  const [answer, setAnswer] = useState('');

  const handleSendClick = () => {
    setIsLoading(true);
    // Simulate loading delay
    setTimeout(() => {
      setIsLoading(false);
      setAnswer('Generated science content based on: ' + prompt); // Simulate an answer
    }, 2000);
  };

  const handleClearPromptClick = () => {
    setPrompt('');
  };

  const handleClearChatClick = () => {
    setChat('');
  };

  const handleClearAnswerClick = () => {
    setAnswer('');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <Button variant="destructive" className="mb-4">
        Alert
      </Button>
      <h1 className="text-4xl font-bold mb-4">StarChat Mode</h1>
      <p className="text-gray-600 mb-8">Science-related content will go here.</p>

      <div className="w-full max-w-md space-y-4">
        <div className="flex flex-col">
          <Label htmlFor="prompt" className="text-center">
            Prompt
          </Label>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={handleClearPromptClick}>
              Clear
            </Button>
            <Input
              id="prompt"
              placeholder="Enter your science question"
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
            />
            <Button variant="primary" size="sm" disabled={isLoading} onClick={handleSendClick}>
              {isLoading ? (
                <>
                  <Globe className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </>
              ) : (
                'Send'
              )}
            </Button>
          </div>
        </div>

        <div className="flex flex-col">
          <Label htmlFor="chat" className="text-center">
            Chat
          </Label>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              No
            </Button>
            <Textarea id="chat" placeholder="Conversation history" readOnly className="h-24" />
            <Button variant="outline" size="sm" onClick={handleClearChatClick}>
              Yes
            </Button>
          </div>
        </div>

        <div className="flex flex-col">
          <Label htmlFor="answer" className="text-center">
            Answer
          </Label>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={handleClearAnswerClick}>
              Clear
            </Button>
            <Textarea id="answer" placeholder="Generated science content" readOnly className="h-24" />
            <Button variant="outline" size="sm">
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StarChatPage;

    