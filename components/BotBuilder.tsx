
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Globe, 
  CheckCircle2, 
  Loader2, 
  ArrowRight, 
  Layout, 
  Settings2, 
  Sparkles,
  MessageSquare,
  // Fix: Added missing RefreshCw icon import
  RefreshCw
} from 'lucide-react';
import { geminiService } from '../services/geminiService';
import { Bot, BotConfig } from '../types';
import ChatPreview from './ChatPreview';

interface BotBuilderProps {
  onBotCreated: (bot: Bot) => void;
}

const steps = [
  { id: 1, label: 'Source', icon: Globe },
  { id: 2, label: 'Knowledge', icon: Layout },
  { id: 3, label: 'Identity', icon: Settings2 },
  { id: 4, label: 'Review', icon: Sparkles },
];

const BotBuilder: React.FC<BotBuilderProps> = ({ onBotCreated }) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [url, setUrl] = useState('');
  const [botName, setBotName] = useState('');
  const [isCrawling, setIsCrawling] = useState(false);
  const [crawlProgress, setCrawlProgress] = useState(0);
  const [summarizedContext, setSummarizedContext] = useState('');
  
  const [config, setConfig] = useState<BotConfig>({
    primaryColor: '#6366f1',
    welcomeMessage: 'Hello! I am your AI assistant, trained on this website. How can I help?',
    systemPrompt: 'You are a helpful AI assistant trained on website content. Use the provided context to answer questions accurately.',
  });

  const startCrawl = async () => {
    if (!url) return;
    setIsCrawling(true);
    setCrawlProgress(0);
    
    const interval = setInterval(() => {
      setCrawlProgress(prev => {
        if (prev >= 95) {
          clearInterval(interval);
          return 95;
        }
        return prev + 5;
      });
    }, 150);

    try {
      const summary = await geminiService.summarizeWebsite(
        url, 
        `Sample website content: Welcome to ${botName || 'our company'}. We provide innovative solutions and excellent customer service. Our main features include: automated support, 24/7 availability, and seamless integration.`
      );
      setSummarizedContext(summary);
      setCrawlProgress(100);
      
      setTimeout(() => {
        clearInterval(interval);
        setIsCrawling(false);
        setCurrentStep(3);
      }, 1000);
    } catch (error) {
      console.error('Crawl error:', error);
      clearInterval(interval);
      setSummarizedContext(`Sample context for ${botName}: This bot is trained on website content about products, services, and customer support.`);
      setCrawlProgress(100);
      setTimeout(() => {
        setIsCrawling(false);
        setCurrentStep(3);
      }, 1000);
    }
  };

  const finalizeBot = () => {
    const newBot: Bot = {
      id: Date.now().toString(),
      name: botName || 'My Custom Bot',
      websiteUrl: url,
      status: 'active',
      lastTrained: new Date().toISOString(),
      trainedPages: Math.floor(Math.random() * 20) + 10,
      config: {
        ...config,
        systemPrompt: `${config.systemPrompt}\n\nWebsite Context: ${summarizedContext}`
      },
      analytics: {
        totalChats: 0,
        avgResponseTime: 0,
        satisfactionRate: 100,
        topQueries: [],
        history: [
            { date: 'Mon', chats: 0 },
            { date: 'Tue', chats: 0 },
            { date: 'Wed', chats: 0 },
            { date: 'Thu', chats: 0 },
            { date: 'Fri', chats: 0 },
        ]
      }
    };
    onBotCreated(newBot);
    navigate('/');
  };

  return (
    <div className="max-w-4xl mx-auto py-4 px-2">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold font-heading mb-3 text-slate-900">Agent Architect</h1>
        <p className="text-slate-400 font-medium text-lg">Build and train a custom neural network on your documentation.</p>
      </div>

      {/* Stepper */}
      <div className="hidden md:flex items-center justify-between mb-8 md:mb-16 relative px-4 md:px-10">
        <div className="absolute top-5 left-10 right-10 h-0.5 bg-slate-100 -translate-y-1/2 z-0"></div>
        {steps.map((step) => {
          const Icon = step.icon;
          const isActive = currentStep === step.id;
          const isCompleted = currentStep > step.id;

          return (
            <div key={step.id} className="relative z-10 flex flex-col items-center">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                isActive ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-200 scale-110' : 
                isCompleted ? 'bg-emerald-500 text-white' : 'bg-white border-2 border-slate-100 text-slate-300'
              }`}>
                {isCompleted ? <CheckCircle2 size={24} /> : <Icon size={24} />}
              </div>
              <span className={`text-[10px] font-extrabold mt-3 uppercase tracking-widest ${isActive ? 'text-indigo-600' : 'text-slate-400'}`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      <div className="bg-white border border-slate-100 rounded-[2.5rem] p-10 shadow-xl shadow-slate-100/50">
        {currentStep === 1 && (
          <div className="space-y-8">
            <h3 className="text-2xl font-bold font-heading text-slate-900">Define data source</h3>
            <div className="space-y-6">
                <div>
                  <label className="block text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-3">Agent Name</label>
                  <input 
                    type="text" 
                    value={botName}
                    onChange={(e) => setBotName(e.target.value)}
                    placeholder="e.g. Documentation Assistant"
                    className="w-full px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-3">Target Domain URL</label>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input 
                      type="url" 
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="https://docs.yourcompany.com"
                      className="flex-1 px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-semibold"
                    />
                    <button 
                      onClick={() => setCurrentStep(2)}
                      disabled={!url || !botName}
                      className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-indigo-700 disabled:opacity-50 transition-all flex items-center justify-center gap-2 active:scale-95 shadow-lg shadow-indigo-100 w-full sm:w-auto"
                    >
                      Initiate <ArrowRight size={20} />
                    </button>
                  </div>
                </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="text-center py-12 space-y-8">
            <div className="relative inline-block">
              <div className="w-32 h-32 rounded-[2rem] border-4 border-slate-50 border-t-indigo-600 animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Globe className="text-indigo-600" size={40} />
              </div>
            </div>
            <div className="space-y-2">
                <h3 className="text-2xl font-bold font-heading text-slate-900">Building Neural Map</h3>
                <p className="text-slate-400 font-medium max-w-md mx-auto">
                  Parsing <strong>{url}</strong> and synthesizing knowledge chunks using Gemini 3.
                </p>
            </div>
            
            <div className="w-full max-w-sm mx-auto">
                <div className="flex justify-between text-xs font-bold text-indigo-600 mb-2">
                    <span>{crawlProgress}% Analyzed</span>
                    <span>Optimizing...</span>
                </div>
                <div className="w-full bg-slate-50 h-3 rounded-full overflow-hidden border border-slate-100">
                  <div 
                    className="h-full bg-indigo-600 transition-all duration-300 rounded-full" 
                    style={{ width: `${crawlProgress}%` }}
                  ></div>
                </div>
            </div>

            <button 
                onClick={startCrawl}
                disabled={isCrawling}
                className="text-indigo-600 font-bold hover:underline flex items-center gap-2 mx-auto disabled:text-slate-400"
            >
                {!isCrawling ? <RefreshCw size={18} /> : null}
                {!isCrawling ? "Start Analysis Simulation" : "Processing Vectors..."}
            </button>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-10">
            <h3 className="text-2xl font-bold font-heading text-slate-900">Identity Design</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10">
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-3">Onboarding Hook</label>
                  <textarea 
                    value={config.welcomeMessage}
                    onChange={(e) => setConfig({...config, welcomeMessage: e.target.value})}
                    className="w-full px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white h-28 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-3">Accent Color</label>
                  <div className="flex gap-4">
                    {['#6366f1', '#ec4899', '#10b981', '#f59e0b', '#0ea5e9'].map(color => (
                      <button 
                        key={color}
                        onClick={() => setConfig({...config, primaryColor: color})}
                        className={`w-12 h-12 rounded-2xl transition-all duration-300 ${config.primaryColor === color ? 'ring-4 ring-slate-100 scale-110 shadow-lg' : 'opacity-60 hover:opacity-100'}`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
                <button 
                  onClick={() => setCurrentStep(4)}
                  className="w-full bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-100 active:scale-95"
                >
                  Generate Preview
                </button>
              </div>
              <div className="bg-slate-50 rounded-[2rem] p-4 md:p-8 border border-slate-100">
                <h4 className="text-[10px] font-extrabold uppercase text-slate-400 mb-4 md:mb-6 tracking-[0.2em] text-center">Neural Interface Preview</h4>
                <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden w-full mx-auto max-w-sm flex flex-col border border-slate-100" style={{ aspectRatio: '4/5' }}>
                  <div className="h-14 md:h-16 flex items-center px-4 md:px-6 text-white" style={{ backgroundColor: config.primaryColor }}>
                    <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-white/20 mr-2 md:mr-3 animate-pulse flex-shrink-0"></div>
                    <span className="font-bold text-xs md:text-sm tracking-tight truncate">{botName || 'AI Assistant'}</span>
                  </div>
                  <div className="flex-1 p-4 md:p-6 flex flex-col gap-3 md:gap-4 overflow-hidden">
                    <div className="bg-slate-50 rounded-2xl rounded-tl-none p-3 md:p-4 text-[10px] md:text-xs w-[90%] text-slate-600 font-medium leading-relaxed break-words">
                      {config.welcomeMessage}
                    </div>
                  </div>
                  <div className="p-3 md:p-4 border-t border-slate-100 bg-slate-50/50 flex gap-2 md:gap-3">
                    <div className="flex-1 bg-white border border-slate-100 rounded-xl px-3 md:px-4 py-2 text-[10px] md:text-[11px] text-slate-300 font-bold truncate">Ask something...</div>
                    <div className="w-8 h-8 md:w-9 md:h-9 rounded-xl flex items-center justify-center text-white flex-shrink-0" style={{ backgroundColor: config.primaryColor }}>
                      <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-10">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold font-heading flex items-center gap-3 text-slate-900">
                  <Sparkles size={28} className="text-amber-400 animate-pulse" />
                  Synthesis Complete
                </h3>
                <p className="text-slate-400 font-medium">Your agent is active and grounded in your data.</p>
              </div>
              <button 
                onClick={finalizeBot}
                className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 active:scale-95"
              >
                Go to Dashboard
              </button>
            </div>

            <div className="border-2 border-slate-100 rounded-[2.5rem] h-[400px] md:h-[550px] overflow-hidden shadow-inner bg-slate-50/30">
               <ChatPreview 
                  systemPrompt={config.systemPrompt + `\n\nContext:\n${summarizedContext}`} 
                  primaryColor={config.primaryColor}
                  welcomeMessage={config.welcomeMessage}
               />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BotBuilder;
