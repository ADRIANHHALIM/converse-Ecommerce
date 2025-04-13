
import React, { useState } from 'react';
import { MessageCircle, X, Send, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

interface Message {
  id: number;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const predefinedResponses = [
  {
    question: "What sizes do you offer?",
    answer: "We offer sizes from US 5 to US 13. You can check our size guide for detailed measurements to find your perfect fit."
  },
  {
    question: "Do you ship internationally?",
    answer: "Yes, we ship to most countries worldwide. International shipping typically takes 7-14 business days depending on your location."
  },
  {
    question: "What's your return policy?",
    answer: "We offer a 30-day return policy for unworn items in original packaging. Please visit our Returns page for more details."
  },
  {
    question: "How can I track my order?",
    answer: "Once your order ships, you'll receive a tracking number via email. You can also check your order status in your account dashboard."
  },
];

const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Hi there! 👋 How can we help you today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  
  const handleSend = () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      content: inputValue,
      isUser: true,
      timestamp: new Date(),
    };
    
    setMessages([...messages, userMessage]);
    setInputValue('');
    
    // Simulate bot response after a delay
    setTimeout(() => {
      const botMessage: Message = {
        id: messages.length + 2,
        content: "Thanks for your message! Our customer service team will respond shortly. In the meantime, you may find answers in our FAQ section.",
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    }, 1000);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleQuickQuestion = (question: string, answer: string) => {
    // Add user question
    const userMessage: Message = {
      id: messages.length + 1,
      content: question,
      isUser: true,
      timestamp: new Date(),
    };
    
    // Add automated answer
    const botMessage: Message = {
      id: messages.length + 2,
      content: answer,
      isUser: false,
      timestamp: new Date(),
    };
    
    setMessages([...messages, userMessage, botMessage]);
  };
  
  return (
    <>
      {/* Chat toggle button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50 bg-black hover:bg-gray-800"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </Button>
      
      {/* Chat window */}
      <div
        className={cn(
          "fixed bottom-24 right-6 w-[350px] rounded-xl bg-white shadow-xl z-50 overflow-hidden transition-all duration-300 transform origin-bottom-right",
          isOpen ? "scale-100 opacity-100" : "scale-90 opacity-0 pointer-events-none"
        )}
      >
        {/* Chat header */}
        <div className="bg-black text-white p-4">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center mr-3">
              <MessageCircle className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-medium">Customer Support</h3>
              <p className="text-xs text-gray-300">We typically reply within minutes</p>
            </div>
          </div>
        </div>
        
        {/* Chat messages */}
        <ScrollArea className="h-80 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex",
                  message.isUser ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[80%] rounded-2xl px-4 py-2",
                    message.isUser
                      ? "bg-black text-white rounded-tr-none"
                      : "bg-gray-100 text-gray-800 rounded-tl-none"
                  )}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className="text-right text-xs mt-1 opacity-60">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        
        {/* Quick questions */}
        <div className="p-3 border-t border-gray-100">
          <p className="text-xs text-gray-500 mb-2">Common Questions:</p>
          <div className="overflow-x-auto flex space-x-2 pb-2">
            {predefinedResponses.map((item, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="whitespace-nowrap text-xs h-7"
                onClick={() => handleQuickQuestion(item.question, item.answer)}
              >
                {item.question} <ChevronRight className="ml-1 h-3 w-3" />
              </Button>
            ))}
          </div>
        </div>
        
        {/* Message input */}
        <div className="p-3 border-t border-gray-200">
          <div className="flex gap-2">
            <Textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="min-h-[60px] resize-none"
            />
            <Button
              onClick={handleSend}
              disabled={!inputValue.trim()}
              className="h-auto"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LiveChat;
