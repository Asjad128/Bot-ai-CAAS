
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  PlusCircle, 
  BarChart3, 
  Settings, 
  Cpu, 
  Zap,
  Search,
  Bell,
  Menu,
  X
} from 'lucide-react';
import Dashboard from './components/Dashboard';
import BotBuilder from './components/BotBuilder';
import BotDetail from './components/BotDetail';
import Analytics from './components/Analytics';
import SettingsPage from './components/Settings';
import { Bot } from './types';

const INITIAL_BOTS: Bot[] = [
  {
    id: '1',
    name: 'Main Support AI',
    websiteUrl: 'https://support.botai.io',
    status: 'active',
    lastTrained: '2023-11-20T10:30:00Z',
    trainedPages: 45,
    config: {
      primaryColor: '#6366f1',
      welcomeMessage: 'Hi there! How can I help you today?',
      systemPrompt: 'You are a helpful support assistant for BotAI.',
    },
    analytics: {
      totalChats: 1240,
      avgResponseTime: 1.2,
      satisfactionRate: 98,
      topQueries: [
        { query: 'Pricing plans', count: 450 },
        { query: 'Reset password', count: 320 },
      ],
      history: [
        { date: 'Nov 01', chats: 40 },
        { date: 'Nov 02', chats: 55 },
        { date: 'Nov 03', chats: 62 },
        { date: 'Nov 04', chats: 48 },
        { date: 'Nov 05', chats: 70 },
      ]
    }
  }
];

const SidebarItem = ({ icon: Icon, label, path, active, onClick }: { icon: any, label: string, path: string, active: boolean, onClick?: () => void }) => (
  <Link 
    to={path}
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
      active 
        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 neon-glow' 
        : 'text-slate-500 hover:bg-slate-100 hover:text-indigo-600'
    }`}
  >
    <Icon size={20} className={active ? 'animate-pulse' : ''} />
    <span className="font-semibold">{label}</span>
  </Link>
);

const AppContent = () => {
  const location = useLocation();
  const [bots, setBots] = useState<Bot[]>(INITIAL_BOTS);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const addBot = (newBot: Bot) => {
    setBots(prev => [...prev, newBot]);
  };

  return (
    <div className="flex min-h-screen bg-slate-50 max-w-full">
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar - Desktop and Mobile */}
      <aside className={`w-64 bg-white border-r border-slate-200 p-6 flex flex-col fixed h-screen overflow-y-auto z-50 transition-transform duration-300 ${
        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>
        <div className="flex items-center gap-3 px-2 mb-10 group cursor-pointer">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200 group-hover:rotate-12 transition-transform duration-300">
            <Cpu size={24} />
          </div>
          <span className="text-2xl font-extrabold font-heading tracking-tight gradient-text">BotAI</span>
        </div>

        <nav className="space-y-2 flex-1">
          <SidebarItem icon={LayoutDashboard} label="Dashboard" path="/" active={location.pathname === '/'} onClick={() => setMobileMenuOpen(false)} />
          <SidebarItem icon={PlusCircle} label="Create Bot" path="/create" active={location.pathname === '/create'} onClick={() => setMobileMenuOpen(false)} />
          <SidebarItem icon={BarChart3} label="Analytics" path="/analytics" active={location.pathname === '/analytics'} onClick={() => setMobileMenuOpen(false)} />
        </nav>

        <div className="mt-auto pt-6 border-t border-slate-100">
          <SidebarItem icon={Settings} label="Settings" path="/settings" active={location.pathname === '/settings'} onClick={() => setMobileMenuOpen(false)} />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto md:ml-64 w-full">
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-4 md:px-8 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            
            {/* Logo for Mobile */}
            <div className="flex md:hidden items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                <Cpu size={18} />
              </div>
              <span className="text-xl font-extrabold font-heading gradient-text">BotAI</span>
            </div>

            {/* Search - Desktop only */}
            <div className="hidden lg:flex items-center gap-4 text-slate-400 bg-slate-50 px-4 py-2.5 rounded-2xl w-72 xl:w-96 border border-slate-100">
              <Search size={18} />
              <input type="text" placeholder="Find agents, stats or keys..." className="bg-transparent border-none outline-none text-sm w-full text-slate-600 font-medium" />
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-4 text-slate-400 bg-slate-50 px-4 py-2.5 rounded-2xl w-72 xl:w-96 border border-slate-100">
            <Search size={18} />
            <input type="text" placeholder="Find agents, stats or keys..." className="bg-transparent border-none outline-none text-sm w-full text-slate-600 font-medium" />
          </div>
          <div className="flex items-center gap-2 md:gap-5">
            <button className="relative p-2.5 text-slate-500 hover:bg-slate-50 rounded-xl transition-all border border-transparent hover:border-slate-100">
              <Zap size={20} className="fill-indigo-50 text-indigo-500" />
            </button>
            <button className="relative p-2.5 text-slate-500 hover:bg-slate-50 rounded-xl transition-all border border-transparent hover:border-slate-100">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-indigo-100 cursor-pointer hover:scale-105 transition-transform">
              JD
            </div>
          </div>
        </header>

        <div className="p-4 md:p-8 max-w-7xl mx-auto w-full">
          <Routes>
            <Route path="/" element={<Dashboard bots={bots} />} />
            <Route path="/create" element={<BotBuilder onBotCreated={addBot} />} />
            <Route path="/bot/:id" element={<BotDetail bots={bots} />} />
            <Route path="/analytics" element={<Analytics bots={bots} />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<div className="text-center py-20 font-heading text-2xl text-slate-300">Feature Coming Soon</div>} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
