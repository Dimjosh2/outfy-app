
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mic, Send, User, Bot, MicOff } from "lucide-react";

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
      text: "Hi! I'm your AI style assistant. What can I help you with today? You can ask me about outfit suggestions, color combinations, or style tips!",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recognitionRef = useRef<any>(null);

  const quickReplies = ['Work Outfit', 'Casual Look', 'Date Night', 'Weather-based', 'Color Matching'];

  // AI response logic - simulating intelligent responses
  const getAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('work') || message.includes('office') || message.includes('professional')) {
      return "For a professional work look, I'd recommend a tailored blazer with dress pants or a midi skirt. Navy, black, or gray are great base colors. Add a crisp white or light blue shirt, and finish with closed-toe shoes. This creates a polished, confident appearance perfect for the workplace!";
    }
    
    if (message.includes('casual') || message.includes('weekend') || message.includes('relaxed')) {
      return "For a casual yet stylish look, try well-fitted jeans with a comfortable sweater or a nice t-shirt. Layer with a denim jacket or cardigan. Sneakers or ankle boots work great. Don't forget accessories like a crossbody bag or simple jewelry to elevate the look!";
    }
    
    if (message.includes('date') || message.includes('dinner') || message.includes('romantic')) {
      return "For a date night, consider a midi dress in a flattering silhouette, or a nice blouse with dark jeans. Add heels or dressy flats, and a light jacket or blazer. Choose colors that make you feel confident - deep jewel tones or classic black work beautifully!";
    }
    
    if (message.includes('color') || message.includes('match') || message.includes('combination')) {
      return "Great question about color! Here are some timeless combinations: Navy + white + gold accents, Black + cream + silver, Burgundy + gray + rose gold, or Olive + cream + brown. For a pop of color, try coral with navy, or mustard with denim blue!";
    }
    
    if (message.includes('weather') || message.includes('rain') || message.includes('cold') || message.includes('hot')) {
      return "Weather-appropriate styling is key! For rainy days: waterproof shoes, layers you can remove, and a stylish trench coat. For cold weather: warm knits, boots, and a statement coat. For hot days: breathable fabrics like cotton or linen, light colors, and comfortable sandals!";
    }
    
    // Default response
    return `I'd love to help you with that! Based on your question about "${userMessage}", I recommend focusing on pieces that make you feel confident and comfortable. Consider your lifestyle, the occasion, and colors that complement your skin tone. Would you like me to suggest specific outfit combinations or color palettes?`;
  };

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

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(text),
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000); // Random delay between 1.5-2.5 seconds
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
      // Fallback for browsers without speech recognition
      alert('Voice recognition not supported in this browser. Try Chrome or Edge!');
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
        <h3 className="font-semibold flex items-center space-x-2">
          <Bot className="w-5 h-5" />
          <span>AI Style Assistant</span>
          {isTyping && <span className="text-sm opacity-75">(typing...)</span>}
        </h3>
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
            disabled={isListening}
          />
          <Button
            onClick={isListening ? stopVoiceRecognition : startVoiceRecognition}
            className={`${
              isListening 
                ? 'bg-red-500 hover:bg-red-600' 
                : 'bg-outfy-teal hover:bg-outfy-teal/90'
            } text-white`}
            size="sm"
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </Button>
          <Button
            onClick={() => handleSendMessage(inputText)}
            className="bg-outfy-coral hover:bg-outfy-coral/90 text-white"
            size="sm"
            disabled={!inputText.trim() || isTyping}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        {isListening && (
          <p className="text-xs text-outfy-teal mt-2 text-center">Listening... Speak now!</p>
        )}
      </div>
    </Card>
  );
};

export default AIChat;
