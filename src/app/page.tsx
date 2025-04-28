"use client";

import { useEffect, useState, useRef, ChangeEvent } from "react";
import {
  AskAtlasIcon,
  FableBotIcon,
  MindMeadowIcon,
  MindMosaicIcon,
  ScholarHatPencilIcon,
  StarChatIcon,
  ThoughtTrailIcon,
  TinkerTalkIcon,
} from "@/components/icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Carousel,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import SpellChecker from "@/lib/spell-checker"; // Import the SpellChecker class

const coachAvatarUrl = "https://picsum.photos/id/237/200/300";

const modes = [
  {
    name: "LittleScholar",
    description: "Homework Mode",
    icon: ScholarHatPencilIcon,
    color: "scholar-green",
    character: "Owl with glasses",
    backgroundPattern: "Subtle grid paper texture",
    id: "little-scholar",
    route: "/little-scholar", // Example route, adjust as needed
  },
  {
    name: "MindMeadow",
    description: "Personal Questions",
    icon: MindMeadowIcon,
    color: "meadow-green",
    character: "Friendly butterfly guide",
    backgroundPattern: "Gentle grass and flower patterns",
    id: "mind-meadow", 
    route: "/mind-meadow"
  },
  {
    name: "StarChat",
    description: "Science",
    icon: StarChatIcon,
    color: "deep-space-purple",
    character: "Astronaut explorer",
    backgroundPattern: "Subtle constellation patterns",
    id: "star-chat", 
    route: "/star-chat"
  },
  {
    name: "TinkerTalk",
    description: "How Things Work",
    icon: TinkerTalkIcon,
    color: "workshop-orange",
    character: "Robot builder with tools",
    backgroundPattern: "Blueprint grid",
    id: "tinker-talk", 
    route: "/tinker-talk"
  },
  {
    name: "FableBot",
    description: "Stories",
    icon: FableBotIcon,
    color: "storybook-red",
    character: "Robot storyteller with bow tie",
    backgroundPattern: "Subtle storybook page texture",
    id: "fable-bot", 
    route: "/fable-bot"
  },
  {
    name: "AskAtlas",
    description: "Geography",
    icon: AskAtlasIcon,
    color: "primary",
    character: "Explorer with backpack and compass",
    backgroundPattern: "Subtle map contour lines",
    id: "ask-atlas", 
    route: "/ask-atlas"
  },
  {
    name: "ThoughtTrail",
    description: "Journal/Ideas",
    icon: ThoughtTrailIcon,
    color: "trail-brown",
    character: "Hiker with notebook",
    backgroundPattern: "Subtle paper texture",
    id: "thought-trail", 
    route: "/thought-trail"
  },
  {
    name: "MindMosaic",
    description: "Mind Games",
    icon: MindMosaicIcon,
    color: "deep-space-purple",
    character: "Puzzle master with 3D glasses",
    backgroundPattern: "Interlocking geometric shapes",
    id: "mind-mosaic", 
    route: "/mind-mosaic"
  },
];

// Define the structure for chat history entries
interface ChatMessageEntry {
  userText: string;
  correctedText: string;
  isCorrecting?:boolean
}

// ChatMessage component to render each line of the chat
function ChatMessage({ message, isCorrecting }: { message: ChatMessageEntry , isCorrecting: boolean }) {
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

export default function Home() {
  // State variables for header and footer prompts
  const [headerPrompt, setHeaderPrompt] = useState("Please be kind and patient.");
  const [footerPrompt, setFooterPrompt] = useState("Remember to ask clarifying questions.");
  const { toast } = useToast();
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  // State variable to store the text in the text input
  const [inputText, setInputText] = useState("");
  // State variable to store the chat history
  const [chatHistory, setChatHistory] = useState<ChatMessageEntry[]>([]);
  const [isCorrecting, setIsCorrecting] = useState(false);


  // Create an instance of the SpellChecker class
  const spellChecker = new SpellChecker();

  // useEffect hook to load the model when the component mounts
  useEffect(() => {
    const loadModel = async () => {
      try {
        // Load the model
        await spellChecker.loadModel({
          progressCallback: ({ loaded, total }) => {
            console.log(`Loading model: ${Math.round(loaded / total * 100)}%`);
          },
        });
      } catch (error) {
        console.error("Failed to load spell checker model:", error);
      }
    };

    loadModel();
  }, []);

  // Function to save the prompts
  const savePrompts = () => {
    toast({
      title: "Prompts saved!",
      description: "Your custom prompts have been saved.",
    });
  };

  // Function to handle the next carousel item
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % modes.length);
  };

  // Function to handle the previous carousel item
  const handlePrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + modes.length) % modes.length
    );
  };

  // Function to handle the click on a mode
  const handleModeClick = (route: string) => {
    router.push(route);
  };
  
  // Function to handle text correction as it's typed
  const handleTextChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    setInputText(text);
    if(text.length == 0){
        setIsCorrecting(false)
    }
    else {
        setIsCorrecting(true)
    }
    try {
        const corrected = await spellChecker.correct(text);
        setChatHistory((prevHistory) => [
          ...prevHistory,
          { userText: text, correctedText: corrected , isCorrecting:true},
        ]);
    } catch (error) {
        console.error("Error during spell correction:", error);
    }
  };

  // Function to handle the click on the correct button
  const handleCorrect = async () => {
    try {
      // Correct the text
      const corrected = await spellChecker.correct(inputText);
      // Add the input and corrected text to the chat history
      setChatHistory((prevHistory) => [...prevHistory, { userText: inputText, correctedText: corrected }]);
      setInputText("")
      setIsCorrecting(false)

    } catch (error) {
      console.error("Error during spell correction:", error);
    }
  };

  // Function to reset the state variable and the text input to empty
  const handleReset = () => {
    setChatHistory([]);
    setInputText("");
    setIsCorrecting(false);
  };





  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="p-4 border-b border-border sticky top-0 bg-background">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-semibold">KidCoach</h1>
          <Sheet>
            <SheetTrigger asChild >
              <Button variant="outline">Edit Prompts</Button>
            </SheetTrigger>
            <SheetContent className="sm:max-w-lg">
              <SheetHeader>
                <SheetTitle>Edit Prompts</SheetTitle>
                <SheetDescription>
                  Customize the header and footer prompts for the AI.
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2" >
                  <Label htmlFor="header">Header Prompt</Label>
                  <Input
                    id="header"
                    value={headerPrompt}
                    onChange={(e) => setHeaderPrompt(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">

                  <Label htmlFor="footer">Footer Prompt</Label>
                  <Input id="footer" value={footerPrompt} onChange={(e) => setFooterPrompt(e.target.value)} />
                </div>
              </div>
              <Button onClick={savePrompts}>Save changes</Button>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="container mx-auto">
          <section className="mb-8 text-center">
            <Avatar className="w-24 h-24 mx-auto mb-4">
              <AvatarImage src={coachAvatarUrl} alt="Coach Avatar" />
              <AvatarFallback>KC</AvatarFallback>
            </Avatar>
            <h2 className="text-3xl font-bold mb-2">Welcome to KidCoach!</h2> 
            <p className="text-muted-foreground">
              Choose a mode to start learning and exploring.
            </p>

            {
              spellChecker.corrector == null && (<p>Loading Model...</p>)
            }
          </section>

          <section>
            {/* Input to test the spell checker */}
            <div className="flex flex-col space-y-2 mb-4">
              <Label htmlFor="test-input">Test Spell Checker</Label>
              <Input
                className= {isCorrecting ? 'bg-gray-100' : ''}
                id="test-input"
                value={inputText}
                onChange={handleTextChange}
              />
              <Button onClick={handleCorrect}>Correct</Button>
              <Button onClick={handleReset}>Reset</Button>

            </div>
            {/* Render the chat history */}
            {chatHistory.map((message, index) => (
              <ChatMessage key={index} message={message} isCorrecting={isCorrecting && index == chatHistory.length -1} />
            ))}
            {/* Result of the corrected text 
            {correctedText && (
              <div className="mb-4 p-4 border rounded">
                <Label>Corrected Text:</Label>
                <div>{correctedText}</div>
              </div>
            )}
            {/* Carousel section */}
            <Carousel
              ref={carouselRef}
              className="w-full max-w-2xl mx-auto"
              opts={{
                loop: true,
              }}
            >
              <CarouselContent style={{ scrollBehavior: "smooth" }}>
                {modes.map((mode, index) => (
                  <CarouselItem
                    key={mode.id}
                    className="md:basis-1/2 lg:basis-1/3"
                    style={{
                      transform: `translateX(-${currentIndex * 100}%)`,
                    }}
                  >
                    <Card
                      className="h-full cursor-pointer"
                      onClick={() => handleModeClick(mode.route)}
                    >
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <mode.icon className="mr-2 h-6 w-6 text-muted-foreground" />
                            {mode.name}
                          </CardTitle>
                          <CardDescription>{mode.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">
                            Character: {mode.character}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Background: {mode.backgroundPattern}
                          </p>
                        </CardContent>
                      </Card>
                  </CarouselItem>
                ))} 
              </CarouselContent>
              <CarouselPrevious onClick={handlePrevious} className="left-2" />
              <CarouselNext onClick={handleNext} className="right-2" />
            </Carousel>
          </section>
        </div>
      </main>


      <footer className="p-4 border-t border-border text-center text-sm text-muted-foreground">
        {footerPrompt} &copy; 2024 KidCoach
      </footer>
    </div>
  );
