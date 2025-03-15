
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Video, Mic, MicOff, VideoOff, Phone, SendIcon, Copy, Clock, Calendar } from "lucide-react";
import { notifyRecruiter, notifySuccess } from "@/utils/notification";

interface VideoInterviewPanelProps {
  interviewId?: string;
  candidateName: string;
  candidateEmail: string;
  positionTitle: string;
  onClose: () => void;
}

const VideoInterviewPanel: React.FC<VideoInterviewPanelProps> = ({
  interviewId = "INT-" + Math.floor(Math.random() * 10000),
  candidateName,
  candidateEmail,
  positionTitle,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<string>("interview");
  const [isVideoEnabled, setIsVideoEnabled] = useState<boolean>(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState<boolean>(true);
  const [isInterviewActive, setIsInterviewActive] = useState<boolean>(false);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [messages, setMessages] = useState<Array<{text: string, sender: 'you' | 'candidate', time: string}>>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [interviewNotes, setInterviewNotes] = useState<string>("");
  
  // Format elapsed time as mm:ss
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Start the interview
  const startInterview = () => {
    setIsInterviewActive(true);
    
    // Simulate timer
    const timer = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);
    
    // Clean up timer when component unmounts
    return () => clearInterval(timer);
  };
  
  // End the interview
  const endInterview = () => {
    setIsInterviewActive(false);
    notifySuccess({
      title: "Interview Completed",
      description: `Your interview with ${candidateName} has ended. Don't forget to save your notes.`,
    });
  };
  
  // Send a chat message
  const sendMessage = () => {
    if (newMessage.trim()) {
      const now = new Date();
      const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
      
      setMessages([
        ...messages,
        { text: newMessage, sender: 'you', time: timeString }
      ]);
      
      setNewMessage("");
      
      // Simulate candidate response after a delay
      if (Math.random() > 0.5 && isInterviewActive) {
        setTimeout(() => {
          const responses = [
            "That's an interesting question. Let me think about it.",
            "I've worked on similar projects in the past.",
            "I'm really excited about this opportunity.",
            "Could you explain more about the team structure?",
            "I believe my experience in this area would be valuable."
          ];
          
          const randomResponse = responses[Math.floor(Math.random() * responses.length)];
          const replyTime = new Date();
          const replyTimeString = `${replyTime.getHours().toString().padStart(2, '0')}:${replyTime.getMinutes().toString().padStart(2, '0')}`;
          
          setMessages(prev => [
            ...prev,
            { text: randomResponse, sender: 'candidate', time: replyTimeString }
          ]);
        }, 1500 + Math.random() * 2000);
      }
    }
  };
  
  // Copy interview link
  const copyInterviewLink = () => {
    const link = `https://emirate-careers.ae/interview/${interviewId}`;
    navigator.clipboard.writeText(link);
    notifySuccess({
      title: "Link Copied",
      description: "Interview link has been copied to clipboard.",
    });
  };
  
  // Generate interview questions based on position
  const getInterviewQuestions = (): string[] => {
    const generalQuestions = [
      "Tell me about yourself and your experience.",
      "Why are you interested in this position?",
      "Describe a challenging situation you faced at work and how you handled it.",
      "What are your strengths and weaknesses?",
      "Where do you see yourself in 5 years?"
    ];
    
    const technicalQuestions = [
      "What specific technical skills do you have that relate to this position?",
      "Describe a project where you used [relevant technology].",
      "How do you stay current with industry trends?",
      "What's your approach to problem-solving?",
      "How do you handle tight deadlines?"
    ];
    
    const culturalQuestions = [
      "How would you describe your work style?",
      "What type of work environment helps you thrive?",
      "How do you handle feedback?",
      "Tell me about a time you had to adapt to a significant change at work.",
      "How do you prioritize your tasks when you have multiple deadlines?"
    ];
    
    return [...generalQuestions, ...technicalQuestions, ...culturalQuestions];
  };
  
  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center">
              <Video className="h-5 w-5 mr-2 text-emirati-oasisGreen" />
              Interview with {candidateName}
            </CardTitle>
            <CardDescription>
              {positionTitle} • Interview ID: {interviewId}
            </CardDescription>
          </div>
          {isInterviewActive && (
            <div className="flex items-center bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
              <Clock className="h-4 w-4 mr-1" />
              {formatTime(elapsedTime)}
            </div>
          )}
        </div>
      </CardHeader>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="mx-4 bg-emirati-sandBeige/20">
          <TabsTrigger value="interview" className="data-[state=active]:bg-emirati-oasisGreen data-[state=active]:text-white">
            <Video className="h-4 w-4 mr-2" /> Interview
          </TabsTrigger>
          <TabsTrigger value="questions" className="data-[state=active]:bg-emirati-oasisGreen data-[state=active]:text-white">
            Questions
          </TabsTrigger>
          <TabsTrigger value="notes" className="data-[state=active]:bg-emirati-oasisGreen data-[state=active]:text-white">
            Notes
          </TabsTrigger>
          <TabsTrigger value="schedule" className="data-[state=active]:bg-emirati-oasisGreen data-[state=active]:text-white">
            Schedule
          </TabsTrigger>
        </TabsList>
        
        <CardContent className="flex-1 p-2 overflow-hidden">
          <TabsContent value="interview" className="h-full flex flex-col mt-0 p-2">
            {!isInterviewActive ? (
              <div className="flex flex-col items-center justify-center h-full">
                <div className="bg-emirati-sandBeige/20 rounded-full p-6 mb-4">
                  <Video className="h-12 w-12 text-emirati-oasisGreen" />
                </div>
                <h3 className="text-xl font-medium mb-2">Start Video Interview</h3>
                <p className="text-muted-foreground text-center max-w-md mb-6">
                  You're about to start a video interview with {candidateName} for the {positionTitle} position.
                </p>
                <div className="flex gap-3">
                  <Button 
                    variant={isVideoEnabled ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setIsVideoEnabled(!isVideoEnabled)}
                    className={isVideoEnabled ? "bg-emirati-oasisGreen text-white" : ""}
                  >
                    {isVideoEnabled ? <Video className="h-4 w-4 mr-2" /> : <VideoOff className="h-4 w-4 mr-2" />}
                    {isVideoEnabled ? "Video On" : "Video Off"}
                  </Button>
                  <Button 
                    variant={isAudioEnabled ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setIsAudioEnabled(!isAudioEnabled)}
                    className={isAudioEnabled ? "bg-emirati-oasisGreen text-white" : ""}
                  >
                    {isAudioEnabled ? <Mic className="h-4 w-4 mr-2" /> : <MicOff className="h-4 w-4 mr-2" />}
                    {isAudioEnabled ? "Audio On" : "Audio Off"}
                  </Button>
                </div>
                <Button className="mt-6 bg-emirati-oasisGreen text-white" onClick={startInterview}>
                  Start Interview
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-full">
                <div className="lg:col-span-2 bg-gray-900 rounded-md flex items-center justify-center relative h-60 lg:h-auto">
                  <div className="text-white text-center">
                    <Video className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>Video stream would appear here in a real application</p>
                  </div>
                  
                  <div className="absolute bottom-4 left-4 bg-gray-800 rounded p-2 flex gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => setIsVideoEnabled(!isVideoEnabled)}
                      className="bg-gray-700 hover:bg-gray-600 text-white h-8 w-8"
                    >
                      {isVideoEnabled ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => setIsAudioEnabled(!isAudioEnabled)}
                      className="bg-gray-700 hover:bg-gray-600 text-white h-8 w-8"
                    >
                      {isAudioEnabled ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={endInterview}
                      className="bg-red-700 hover:bg-red-600 text-white h-8 w-8"
                    >
                      <Phone className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="absolute bottom-4 right-4 p-2">
                    <div className="bg-gray-900 rounded w-24 h-24 border border-gray-700 flex items-center justify-center overflow-hidden">
                      <p className="text-white text-xs">You</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col h-60 lg:h-auto bg-slate-50 rounded-md">
                  <div className="p-2 border-b">
                    <h4 className="text-sm font-medium">Chat</h4>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto p-2 space-y-2">
                    {messages.length > 0 ? (
                      messages.map((msg, index) => (
                        <div 
                          key={index} 
                          className={`flex ${msg.sender === 'you' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div 
                            className={`max-w-[80%] px-3 py-2 rounded-md text-sm ${
                              msg.sender === 'you' 
                                ? 'bg-emirati-oasisGreen text-white rounded-tr-none' 
                                : 'bg-white border rounded-tl-none'
                            }`}
                          >
                            <p>{msg.text}</p>
                            <p className={`text-xs ${msg.sender === 'you' ? 'text-white/70' : 'text-slate-500'} text-right mt-1`}>
                              {msg.time}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-xs text-muted-foreground py-4">
                        Send a message to start chatting
                      </p>
                    )}
                  </div>
                  
                  <div className="p-2 border-t flex gap-2">
                    <Input 
                      placeholder="Type a message..." 
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      className="text-sm"
                    />
                    <Button size="icon" onClick={sendMessage} className="bg-emirati-oasisGreen text-white">
                      <SendIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="questions" className="mt-0 p-2 h-full overflow-y-auto">
            <div className="space-y-4">
              <div className="bg-emirati-sandBeige/10 rounded-md p-3">
                <h3 className="text-sm font-medium mb-2">Suggested Questions</h3>
                <p className="text-xs text-muted-foreground mb-4">
                  Click on a question to copy it to your clipboard. These questions are tailored for the {positionTitle} position.
                </p>
                
                <div className="space-y-2">
                  {getInterviewQuestions().map((question, index) => (
                    <div 
                      key={index} 
                      className="bg-white p-2 rounded border flex justify-between items-center cursor-pointer hover:bg-slate-50"
                      onClick={() => {
                        navigator.clipboard.writeText(question);
                        notifySuccess({
                          title: "Question Copied",
                          description: "Interview question copied to clipboard.",
                        });
                      }}
                    >
                      <p className="text-sm">{question}</p>
                      <Copy className="h-4 w-4 text-muted-foreground" />
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-emirati-sandBeige/10 rounded-md p-3">
                <h3 className="text-sm font-medium mb-2">Custom Questions</h3>
                <p className="text-xs text-muted-foreground mb-2">
                  Add your own questions for this interview.
                </p>
                
                <div className="flex gap-2">
                  <Input placeholder="Enter a custom question..." />
                  <Button className="bg-emirati-oasisGreen text-white">Add</Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="notes" className="mt-0 p-2 h-full flex flex-col">
            <div className="flex-1">
              <Textarea 
                placeholder="Take notes during the interview here. These notes will be saved automatically and visible only to you."
                className="h-full resize-none"
                value={interviewNotes}
                onChange={(e) => setInterviewNotes(e.target.value)}
              />
            </div>
            <div className="mt-auto pt-4 flex justify-end">
              <Button
                onClick={() => {
                  notifySuccess({
                    title: "Notes Saved",
                    description: "Your interview notes have been saved.",
                  });
                }}
                className="bg-emirati-oasisGreen text-white"
              >
                Save Notes
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="schedule" className="mt-0 p-2 h-full">
            <div className="space-y-4">
              <div className="bg-emirati-sandBeige/10 rounded-md p-3">
                <h3 className="text-sm font-medium mb-2">Interview Details</h3>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Candidate</p>
                      <p className="text-sm font-medium">{candidateName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Position</p>
                      <p className="text-sm font-medium">{positionTitle}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Email</p>
                      <p className="text-sm font-medium">{candidateEmail}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Interview ID</p>
                      <p className="text-sm font-medium">{interviewId}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-emirati-sandBeige/10 rounded-md p-3">
                <h3 className="text-sm font-medium mb-2">Share Interview Link</h3>
                <p className="text-xs text-muted-foreground mb-2">
                  Copy and share this link with the candidate.
                </p>
                <div className="flex gap-2">
                  <Input value={`https://emirate-careers.ae/interview/${interviewId}`} readOnly />
                  <Button onClick={copyInterviewLink} className="bg-emirati-oasisGreen text-white">
                    <Copy className="h-4 w-4 mr-2" /> Copy
                  </Button>
                </div>
              </div>
              
              <div className="bg-emirati-sandBeige/10 rounded-md p-3">
                <h3 className="text-sm font-medium mb-2">Schedule Next Interview</h3>
                <p className="text-xs text-muted-foreground mb-2">
                  Set up a follow-up interview with this candidate.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Date</p>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-muted-foreground mr-2" />
                      <Input type="date" />
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Time</p>
                    <Input type="time" />
                  </div>
                </div>
                <Button className="w-full bg-emirati-oasisGreen text-white">
                  Schedule Next Interview
                </Button>
              </div>
            </div>
          </TabsContent>
        </CardContent>
      </Tabs>
      
      <CardFooter className="justify-between border-t pt-4">
        <Button variant="outline" onClick={onClose}>Close</Button>
        
        {isInterviewActive && (
          <Button variant="destructive" onClick={endInterview}>
            <Phone className="h-4 w-4 mr-2" /> End Interview
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default VideoInterviewPanel;
