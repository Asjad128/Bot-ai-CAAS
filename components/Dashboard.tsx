
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, 
  MoreVertical, 
  ExternalLink, 
  Circle, 
  Activity, 
  Users, 
  Clock,
  ArrowRight,
  // Fix: Added missing Zap icon import
  Zap
} from 'lucide-react';
import { Bot } from '../types';

interface DashboardProps {
  bots: Bot[];
}

const StatCard: React.FC<{ title: string, value: string, icon: any, trend?: string }> = ({ title, value, icon: Icon, trend }) => (
  <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:neon-glow transition-all duration-300">
    <div className="flex items-center justify-between mb-4">
      <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
        <Icon size={22} />
      </div>
      {trend && (
        <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${trend.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
          {trend}
        </span>
      )}
    </div>
    <h3 className="text-slate-500 text-sm font-semibold mb-1 uppercase tracking-wider">{title}</h3>
    <p className="text-3xl font-extrabold font-heading text-slate-900">{value}</p>
  </div>
);

const BotCard: React.FC<{ bot: Bot }> = ({ bot }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white border border-slate-100 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group flex flex-col">
      <div className="p-5 md:p-7 flex-1 flex flex-col">
        <div className="flex items-start justify-between mb-4 md:mb-6">
          <div className="flex items-center gap-3 md:gap-4 min-w-0 flex-1">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 text-indigo-600 flex items-center justify-center font-bold text-lg md:text-xl group-hover:scale-110 transition-transform flex-shrink-0">
              {bot.name.charAt(0)}
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="font-bold text-slate-900 text-base md:text-lg truncate">{bot.name}</h4>
              <p className="text-[10px] md:text-xs text-slate-400 font-medium flex items-center gap-1 truncate">
                <ExternalLink size={12} className="flex-shrink-0" />
                <span className="truncate">{bot.websiteUrl.replace('https://', '')}</span>
              </p>
            </div>
          </div>
          <button className="text-slate-300 hover:text-slate-600 p-2 rounded-lg hover:bg-slate-50 transition-colors flex-shrink-0">
            <MoreVertical size={18} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-6">
          <div className="bg-slate-50 p-3 md:p-4 rounded-2xl border border-slate-100">
            <p className="text-[10px] uppercase tracking-widest text-slate-400 font-extrabold mb-1.5">Status</p>
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${bot.status === 'active' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
              <span className="text-xs md:text-sm font-bold text-slate-700 capitalize truncate">{bot.status}</span>
            </div>
          </div>
          <div className="bg-slate-50 p-3 md:p-4 rounded-2xl border border-slate-100">
            <p className="text-[10px] uppercase tracking-widest text-slate-400 font-extrabold mb-1.5">Model</p>
            <span className="text-xs md:text-sm font-bold text-slate-700 truncate block">Gemini Flash</span>
          </div>
        </div>

        <div className="flex items-center justify-between px-1 flex-wrap gap-2">
            <div className="flex items-center gap-2 text-slate-500">
              <Activity size={14} className="text-indigo-500 flex-shrink-0" />
              <span className="text-xs font-bold whitespace-nowrap">{bot.analytics.totalChats.toLocaleString()} Chats</span>
            </div>
            <div className="flex items-center gap-2 text-slate-500">
              <Users size={14} className="text-purple-500 flex-shrink-0" />
              <span className="text-xs font-bold whitespace-nowrap">{bot.trainedPages} Pages</span>
            </div>
        </div>
      </div>
      
      <div className="px-5 md:px-7 pb-5 md:pb-7 pt-2 flex flex-col sm:flex-row gap-3">
        <button 
          onClick={() => navigate(`/bot/${bot.id}`)}
          className="flex-1 py-3 md:py-3.5 px-4 bg-slate-900 text-white rounded-2xl text-xs md:text-sm font-bold hover:bg-slate-800 hover:neon-glow transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          View Details <ArrowRight size={14} />
        </button>
        <button 
          onClick={() => navigate('/create')}
          className="py-3 md:py-3.5 px-4 bg-white border border-slate-200 text-slate-700 rounded-2xl text-xs md:text-sm font-bold hover:bg-slate-50 transition-all active:scale-95 flex items-center justify-center"
        >
          Train
        </button>
      </div>
    </div>
  );
};

const Dashboard: React.FC<DashboardProps> = ({ bots }) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 md:space-y-10 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold font-heading mb-3 text-slate-900">Neural Agents</h1>
          <p className="text-slate-500 font-medium text-lg">Your autonomous fleet of trained knowledge workers.</p>
        </div>
        <button 
          onClick={() => navigate('/create')}
          className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3.5 rounded-2xl text-sm font-bold transition-all shadow-xl shadow-indigo-100 hover:scale-105 active:scale-95 w-full md:w-auto"
        >
          <Plus size={20} />
          Create New Agent
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        <StatCard title="Active Bots" value={bots.length.toString()} icon={Activity} />
        <StatCard title="Messages Handled" value="12.4k" icon={Users} trend="+18.5%" />
        <StatCard title="AI Accuracy" value="98.2%" icon={Zap} trend="+0.4%" />
        <StatCard title="Latency" value="122ms" icon={Clock} />
      </div>

      <div className="pt-6">
        <div className="flex items-center gap-3 mb-8">
            <div className="w-2 h-8 bg-indigo-600 rounded-full"></div>
            <h2 className="text-2xl font-extrabold font-heading text-slate-900">Active Chatbots</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
          {bots.map(bot => (
            <BotCard key={bot.id} bot={bot} />
          ))}
          <button 
            onClick={() => navigate('/create')}
            className="border-2 border-dashed border-slate-200 rounded-[2rem] p-6 md:p-8 flex flex-col items-center justify-center text-slate-400 hover:border-indigo-400 hover:bg-indigo-50/30 hover:text-indigo-500 transition-all duration-300 group min-h-[250px]"
          >
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-3xl bg-slate-50 flex items-center justify-center mb-4 md:mb-5 group-hover:bg-indigo-100 group-hover:rotate-12 transition-all">
              <Plus size={28} />
            </div>
            <span className="font-bold text-base md:text-lg text-center">Deploy another agent</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
