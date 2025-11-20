import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, ChefHat, Loader2 } from 'lucide-react';
import { chatWithChef } from '../services/gemini';
import { ChatMessage } from '../types';

export const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hi! I'm Chef CFC 👨‍🍳. Hungry? Ask me for recommendations!" }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;

    const userText = inputValue;
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsLoading(true);

    const responseText = await chatWithChef(userText);
    
    setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl w-[calc(100vw-48px)] sm:w-96 mb-4 overflow-hidden border border-gray-200 flex flex-col animate-in slide-in-from-bottom-10 duration-300 h-[60vh] sm:h-[500px] origin-bottom-right">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-600 to-red-700 p-4 flex justify-between items-center text-white shadow-sm">
            <div className="flex items-center gap-3">
              <div className="bg-white p-1.5 rounded-full text-red-600 shadow-sm">
                <ChefHat className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm leading-tight">Chef CFC</h3>
                <p className="text-[10px] text-red-100 flex items-center gap-1.5 opacity-90">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span> Always Online
                </p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="hover:bg-white/20 p-1.5 rounded-full transition"
              aria-label="Close Chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 scroll-smooth">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-red-600 text-white rounded-br-none' 
                      : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
               <div className="flex justify-start">
                 <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-none border border-gray-100 shadow-sm flex items-center gap-2">
                   <Loader2 className="w-4 h-4 animate-spin text-red-600" />
                   <span className="text-xs text-gray-500">Chef is thinking...</span>
                 </div>
               </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-100 flex gap-2 items-center">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about menu, spice levels..."
              className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:bg-white transition-all"
            />
            <button 
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="bg-red-600 text-white p-2.5 rounded-full hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-sm active:scale-95"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'} flex items-center gap-2 bg-gray-900 text-white px-5 py-3.5 rounded-full shadow-2xl hover:bg-black transition-all duration-300 transform hover:-translate-y-1 border-2 border-white/10`}
        aria-label="Open AI Assistant"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="font-bold hidden sm:inline">Chat with Chef</span>
      </button>
    </div>
  );
};