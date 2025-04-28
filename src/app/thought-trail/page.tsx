'use client';

import React, {useEffect, useState, ChangeEvent} from 'react';
import {BrainCircuit} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Textarea} from '@/components/ui/textarea';
import SpellChecker from '@/lib/spell-checker';

const ThoughtTrailPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [chat, setChat] = useState('');
  const [answer, setAnswer] = useState('');

  const handleSendClick = () => {
    setIsLoading(true);
    // Simulate loading delay
    setTimeout(() => {
      setIsLoading(false);
      setAnswer('Generated ideas based on: ' + prompt); // Simulate an answer
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

  // State variable to store the text in the text input
  const [inputText, setInputText] = useState('');
  // State variable to store the chat history
  const [chatHistory, setChatHistory] = useState<ChatMessageEntry[]>([]);
  const [isCorrecting, setIsCorrecting] = useState(false);

  // Define the structure for chat history entries
  interface ChatMessageEntry {
    userText: string;
    correctedText: string;
    isCorrecting?: boolean;
  }

  // ChatMessage component to render each line of the chat
  function ChatMessage({message, isCorrecting}: {message: ChatMessageEntry; isCorrecting: boolean}) {
    return (
      <div className={`mb-2 p-3 border rounded ${isCorrecting ? 'bg-gray-100' : 'text-gray-500'}`}>
        <div>
          <strong>User:</strong> {message.userText}
        </div>
        <div>
          <strong>Corrected:</strong> {message.correctedText}
        </div>
      </div>
    );
  }

  // Create an instance of the SpellChecker class
  const spellChecker = new SpellChecker();

  // useEffect hook to load the model when the component mounts
  useEffect(() => {
    const loadModel = async () => {
      try {
        // Load the model
        await spellChecker.loadModel({
          progressCallback: ({loaded, total}) => {
            console.log(`Loading model: ${Math.round((loaded / total) * 100)}%`);
          },
        });
      } catch (error) {
        console.error('Failed to load spell checker model:', error);
      }
    };

    loadModel();
  }, []);

  // Function to handle text correction as it's typed
  const handleTextChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    setInputText(text);
    if (text.length == 0) {
      setIsCorrecting(false);
    } else {
      setIsCorrecting(true);
    }
    try {
      const corrected = await spellChecker.correct(text);
      setChatHistory(prevHistory => [
        ...prevHistory,
        {userText: text, correctedText: corrected, isCorrecting: true},
      ]);
    } catch (error) {
      console.error('Error during spell correction:', error);
    }
  };

  // Function to handle the click on the correct button
  const handleCorrect = async () => {
    const corrected = await spellChecker.correct(inputText);
      setChatHistory(prevHistory => [...prevHistory, {userText: inputText, correctedText: corrected}]);
      setInputText(corrected);
    setIsCorrecting(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <Button variant="destructive" className="mb-4">
        Alert
      </Button>
      <h1 className="text-4xl font-bold mb-4">ThoughtTrail Mode</h1>

      {spellChecker.corrector == null && <p>Loading Model...</p>}

      <section>
        {/* Input to test the spell checker */}
        <div className="flex flex-col space-y-2 mb-4">
          <Label htmlFor="test-input">Test Spell Checker</Label>
          <Input
            className={isCorrecting ? 'bg-gray-100' : ''}
            id="test-input"
            value={inputText}
            onChange={handleTextChange}
          />
          <Button onClick={handleCorrect}>Correct</Button>
          <Button onClick={() => {setChatHistory([]); setInputText(''); setIsCorrecting(false);}}>Reset</Button>
        </div>
        {/* Render the chat history */}
        {chatHistory.map((message, index) => (
          <ChatMessage key={index} message={message} isCorrecting={isCorrecting && index == chatHistory.length - 1} />
        ))}
      </section>

      <p className="text-gray-600 mb-8">Journal/Ideas content will go here.</p>

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
              placeholder="Enter your journal entry"
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
            />
            <Button variant="primary" size="sm" disabled={isLoading} onClick={handleSendClick}>
              {isLoading ? (
                <>
                  <BrainCircuit className="mr-2 h-4 w-4 animate-spin" />
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
            <Textarea id="answer" placeholder="Generated ideas" readOnly className="h-24" />
            <Button variant="outline" size="sm">
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThoughtTrailPage;

    