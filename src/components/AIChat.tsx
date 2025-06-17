
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mic, Send, User, Bot } from "lucide-react";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const AIChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your AI style assistant. What can I help you with today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const quickReplies = ['Work Outfit', 'Casual Look', 'Date Night', 'Weather-based'];

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: `Great question! For ${text.toLowerCase()}, I'd recommend a smart casual look with a crisp white shirt, navy blazer, and comfortable trousers. The weather is perfect for light layers today.`,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      mediaRecorder.start();
      setIsRecording(true);
      
      mediaRecorder.ondataavailable = (event) => {
        // In a real app, you'd send this to a speech-to-text service
        console.log('Voice data available:', event.data);
      };
      
      mediaRecorder.onstop = () => {
        stream.getTracks().forEach(track => track.stop());
        setIsRecording(false);
        // Simulate voice-to-text conversion
        handleSendMessage("What should I wear for a rainy day at work?");
      };
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto h-96 flex flex-col">
      {/* Chat Header */}
      <div className="p-4 border-b bg-outfy-teal text-white rounded-t-lg">
        <h3 className="font-semibold flex items-center space-x-2">
          <Bot className="w-5 h-5" />
          <span>AI Style Assistant</span>
        </h3>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
              message.isUser 
                ? 'bg-outfy-coral text-white' 
                : 'bg-gray-100 text-gray-900'
            }`}>
              <div className="flex items-start space-x-2">
                {!message.isUser && <Bot className="w-4 h-4 mt-1 flex-shrink-0" />}
                <p className="text-sm">{message.text}</p>
                {message.isUser && <User className="w-4 h-4 mt-1 flex-shrink-0" />}
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 px-4 py-2 rounded-lg">
              <div className="flex items-center space-x-1">
                <Bot className="w-4 h-4" />
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Replies */}
      <div className="px-4 pb-2">
        <div className="flex flex-wrap gap-2">
          {quickReplies.map((reply) => (
            <Button
              key={reply}
              size="sm"
              variant="outline"
              onClick={() => handleSendMessage(reply)}
              className="text-xs"
            >
              {reply}
            </Button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputText)}
            placeholder="Ask about outfits, style tips, or trends..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-outfy-teal text-sm"
          />
          <Button
            onClick={isRecording ? stopRecording : startRecording}
            className={`${isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-outfy-teal hover:bg-outfy-teal/90'} text-white`}
            size="sm"
          >
            <Mic className={`w-4 h-4 ${isRecording ? 'animate-pulse' : ''}`} />
          </Button>
          <Button
            onClick={() => handleSendMessage(inputText)}
            className="bg-outfy-coral hover:bg-outfy-coral/90 text-white"
            size="sm"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default AIChat;
