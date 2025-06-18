
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mic, Send, User, Bot, MicOff } from "lucide-react";
import { useAuth } from '@/contexts/AuthContext';
import { useSubscription } from '@/hooks/useSubscription';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const AIChat = () => {
  const { user } = useAuth();
  const { canPerformAction, usage, tierInfo } = useSubscription();
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your AI style assistant. What can I help you with today? You can ask me about outfit suggestions, color combinations, or style tips!",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  const quickReplies = ['Work Outfit', 'Casual Look', 'Date Night', 'Weather-based', 'Color Matching'];

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to use the AI chat",
        variant: "destructive",
      });
      return;
    }

    if (!canPerformAction('aiChatsToday')) {
      toast({
        title: "Daily Limit Reached",
        description: `You can only send ${tierInfo.limits.aiChatsPerDay} messages per day on the ${tierInfo.name} plan. Upgrade for unlimited messages!`,
        variant: "destructive",
      });
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    try {
      const { data, error } = await supabase.functions.invoke('ai-chat', {
        body: { message: text }
      });

      if (error) throw error;

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Error calling AI chat:', error);
      toast({
        title: "Error",
        description: "Failed to get AI response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsTyping(false);
    }
  };

  // Voice recognition setup
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onstart = () => {
        setIsListening(true);
      };

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
        console.log('Speech recognition error');
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const startVoiceRecognition = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
    } else {
      toast({
        title: "Not Supported",
        description: "Voice recognition not supported in this browser. Try Chrome or Edge!",
        variant: "destructive",
      });
    }
  };

  const stopVoiceRecognition = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto h-96 flex flex-col shadow-lg">
      {/* Chat Header */}
      <div className="p-4 border-b bg-gradient-to-r from-outfy-teal to-emerald-600 text-white rounded-t-lg">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold flex items-center space-x-2">
            <Bot className="w-5 h-5" />
            <span>AI Style Assistant</span>
            {isTyping && <span className="text-sm opacity-75">(typing...)</span>}
          </h3>
          <div className="text-xs">
            {tierInfo.limits.aiChatsPerDay === -1 ? '∞' : `${usage.aiChatsToday}/${tierInfo.limits.aiChatsPerDay}`} today
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg shadow-sm ${
              message.isUser 
                ? 'bg-outfy-coral text-white' 
                : 'bg-white text-gray-900 border'
            }`}>
              <div className="flex items-start space-x-2">
                {!message.isUser && <Bot className="w-4 h-4 mt-1 flex-shrink-0 text-outfy-teal" />}
                <p className="text-sm leading-relaxed">{message.text}</p>
                {message.isUser && <User className="w-4 h-4 mt-1 flex-shrink-0" />}
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border px-4 py-3 rounded-lg shadow-sm">
              <div className="flex items-center space-x-2">
                <Bot className="w-4 h-4 text-outfy-teal" />
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-outfy-teal rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-outfy-teal rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-outfy-teal rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Replies */}
      <div className="px-4 pb-2 bg-white">
        <div className="flex flex-wrap gap-2">
          {quickReplies.map((reply) => (
            <Button
              key={reply}
              size="sm"
              variant="outline"
              onClick={() => handleSendMessage(reply)}
              className="text-xs hover:bg-outfy-teal hover:text-white transition-colors"
              disabled={!canPerformAction('aiChatsToday')}
            >
              {reply}
            </Button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="p-4 border-t bg-white rounded-b-lg">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputText)}
            placeholder={isListening ? "Listening..." : "Ask about outfits, style tips, or trends..."}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-outfy-teal text-sm"
            disabled={isListening || !canPerformAction('aiChatsToday')}
          />
          <Button
            onClick={isListening ? stopVoiceRecognition : startVoiceRecognition}
            className={`${
              isListening 
                ? 'bg-red-500 hover:bg-red-600' 
                : 'bg-outfy-teal hover:bg-outfy-teal/90'
            } text-white`}
            size="sm"
            disabled={!canPerformAction('aiChatsToday')}
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </Button>
          <Button
            onClick={() => handleSendMessage(inputText)}
            className="bg-outfy-coral hover:bg-outfy-coral/90 text-white"
            size="sm"
            disabled={!inputText.trim() || isTyping || !canPerformAction('aiChatsToday')}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        {isListening && (
          <p className="text-xs text-outfy-teal mt-2 text-center">Listening... Speak now!</p>
        )}
        {!canPerformAction('aiChatsToday') && (
          <p className="text-xs text-red-500 mt-2 text-center">
            Daily limit reached. Upgrade for unlimited messages!
          </p>
        )}
      </div>
    </Card>
  );
};

export default AIChat;
