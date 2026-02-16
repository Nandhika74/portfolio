import React, { useState, useRef, useEffect } from 'react';
import { PortfolioAIService } from '../services/geminiService.ts';
import { ChatMessage } from '../types.ts';

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hello! I'm Nandhika's AI assistant. I can tell you about her projects (like GreenTrack AI), her academic ranking, or her technical stack. What would you like to know?" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatRef = useRef<PortfolioAIService | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      chatRef.current = new PortfolioAIService();
    } catch (e) {
      console.error("AI Assistant could not start:", e);
    }
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const clearChat = () => {
    setMessages([{ role: 'model', text: "Chat cleared! How can I help you now?" }]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !chatRef.current || isTyping) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsTyping(true);

    let fullResponse = '';
    try {
      const stream = chatRef.current.sendMessageStream(userMessage);
      setMessages(prev => [...prev, { role: 'model', text: '' }]);
      
      for await (const chunk of stream) {
        if (chunk) {
          fullResponse += chunk;
          setMessages(prev => {
            const last = [...prev];
            if (last.length > 0) {
              last[last.length - 1].text = fullResponse;
            }
            return last;
          });
        }
      }
    } catch (error) {
      console.error("Chat Stream Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, I hit a snag. Please try again later." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[350px] sm:w-[400px] h-[550px] glass rounded-[32px] shadow-2xl overflow-hidden flex flex-col border border-white/20 animate-slide-up ring-1 ring-white/10">
          <div className="p-5 bg-gradient-to-r from-blue-600 to-purple-600 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm border border-white/20">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              </div>
              <div>
                <p className="font-bold text-white text-sm leading-tight">Nandhika's AI</p>
                <p className="text-[10px] text-white/70 font-medium">Powered by Gemini 3</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
                <button onClick={clearChat} className="text-white/60 hover:text-white transition-colors" title="Clear chat">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>
                <button onClick={() => setIsOpen(false)} className="text-white hover:opacity-70">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>
          </div>

          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-5 space-y-4 scroll-smooth bg-slate-900/40"
          >
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-none' 
                    : 'bg-white/10 text-slate-200 rounded-tl-none border border-white/10'
                }`}>
                  {msg.text || (isTyping && idx === messages.length - 1 ? "..." : "")}
                </div>
              </div>
            ))}
            {isTyping && !messages[messages.length-1].text && (
              <div className="flex justify-start">
                 <div className="bg-white/10 text-slate-400 p-3 rounded-2xl rounded-tl-none flex gap-1">
                    <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                 </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="p-4 border-t border-white/10 flex gap-2 bg-slate-900/80 backdrop-blur-xl">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about her skills or projects..."
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 text-white placeholder:text-slate-500"
            />
            <button 
              type="submit"
              disabled={isTyping}
              className="bg-blue-600 text-white w-12 h-12 flex items-center justify-center rounded-xl hover:bg-blue-500 transition-all disabled:opacity-50 active:scale-90"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
            </button>
          </form>
        </div>
      )}

      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-full bg-blue-600 hover:bg-blue-500 text-white shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 group relative ring-4 ring-blue-500/20"
      >
        {isOpen ? (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        ) : (
          <svg className="w-8 h-8 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
        )}
        {!isOpen && (
          <span className="absolute -top-3 -right-3 bg-pink-500 text-[10px] font-bold px-2 py-1.5 rounded-full animate-bounce shadow-lg">
            ASK ME
          </span>
        )}
      </button>
    </div>
  );
};

export default AIAssistant;