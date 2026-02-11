
import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Loader2, Sparkles } from 'lucide-react';
import { geminiService } from '../services/geminiService';
import { ChatMessage } from '../types';

interface ChatPreviewProps {
  systemPrompt: string;
  primaryColor: string;
  welcomeMessage: string;
}

const ChatPreview: React.FC<ChatPreviewProps> = ({ systemPrompt, primaryColor, welcomeMessage }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', role: 'model', content: welcomeMessage, timestamp: Date.now() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatSession, setChatSession] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      let currentChat = chatSession;
      if (!currentChat) {
        currentChat = await geminiService.createChat(systemPrompt);
        setChatSession(currentChat);
      }

      const response = await currentChat.sendMessage({ message: input });
      
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: response.text || "I'm not sure how to answer that based on the website content.",
        timestamp: Date.now()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: "Sorry, I encountered an error. Please check your API key in the .env file or try again.",
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 w-full max-w-full overflow-hidden">
      <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-4 overscroll-contain">
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-2 md:gap-3 max-w-[90%] md:max-w-[85%] ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center shrink-0 ${
                m.role === 'user' ? 'bg-indigo-600' : 'bg-white border border-slate-200 shadow-sm'
              }`}>
                {m.role === 'user' ? <User size={14} className="text-white" /> : <Bot size={14} className="text-indigo-600" />}
              </div>
              <div className={`p-3 md:p-4 rounded-2xl shadow-sm text-xs md:text-sm break-words ${
                m.role === 'user' 
                  ? 'bg-indigo-600 text-white rounded-tr-none' 
                  : 'bg-white border border-slate-100 text-slate-800 rounded-tl-none'
              }`}>
                {m.content}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex gap-2 md:gap-3 max-w-[85%]">
              <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center">
                <Loader2 size={14} className="text-indigo-600 animate-spin" />
              </div>
              <div className="p-3 md:p-4 rounded-2xl bg-white border border-slate-100 rounded-tl-none shadow-sm flex gap-1 items-center">
                <span className="w-1 h-1 bg-slate-300 rounded-full animate-bounce"></span>
                <span className="w-1 h-1 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1 h-1 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]"></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-3 md:p-4 bg-white border-t border-slate-200">
        <form onSubmit={handleSend} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything..."
            className="flex-1 px-3 md:px-4 py-2 bg-slate-50 border border-slate-200 rounded-full focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-xs md:text-sm"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center text-white transition-all disabled:opacity-50 flex-shrink-0"
            style={{ backgroundColor: primaryColor }}
          >
            <Send size={16} />
          </button>
        </form>
        <div className="flex items-center justify-center gap-1 mt-2">
            <Sparkles size={10} className="text-indigo-500" />
            <span className="text-[9px] md:text-[10px] text-slate-400 font-medium tracking-wide uppercase">Powered by BotAI</span>
        </div>
      </div>
    </div>
  );
};

export default ChatPreview;
