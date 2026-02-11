
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  Globe, 
  Settings, 
  Code, 
  BarChart, 
  Activity, 
  CheckCircle2, 
  Copy, 
  Check, 
  Clock, 
  FileText,
  Trash2,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import { Bot } from '../types';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

interface BotDetailProps {
  bots: Bot[];
}

const BotDetail: React.FC<BotDetailProps> = ({ bots }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const bot = bots.find(b => b.id === id);
  const [copied, setCopied] = useState(false);

  if (!bot) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <h2 className="text-2xl font-bold text-slate-400">Agent not found</h2>
        <button onClick={() => navigate('/')} className="mt-4 text-indigo-600 font-bold underline">Return to Dashboard</button>
      </div>
    );
  }

  const embedCode = `<script 
  src="https://cdn.botai.io/v1/widget.js" 
  data-agent-id="${bot.id}" 
  async
></script>`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const crawledPages = [
    { path: '/', title: 'Home Page', date: '2 hours ago' },
    { path: '/pricing', title: 'Pricing & Plans', date: '2 hours ago' },
    { path: '/features', title: 'Product Features', date: '5 hours ago' },
    { path: '/blog/ai-future', title: 'Blog: The Future of AI', date: '1 day ago' },
    { path: '/docs/api', title: 'API Documentation', date: '2 days ago' },
  ];

  return (
    <div className="space-y-6 md:space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/')}
            className="p-3 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 transition-colors text-slate-500"
          >
            <ChevronLeft size={20} />
          </button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-extrabold font-heading text-slate-900">{bot.name}</h1>
              <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-full border border-emerald-100 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                LIVE
              </span>
            </div>
            <p className="text-slate-400 font-medium flex items-center gap-2 mt-1">
              <Globe size={14} /> {bot.websiteUrl}
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button className="flex items-center justify-center gap-2 px-5 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">
                <RefreshCw size={18} /> Re-train Agent
            </button>
            <button className="flex items-center justify-center gap-2 px-5 py-3 bg-rose-50 border border-rose-100 rounded-2xl text-sm font-bold text-rose-600 hover:bg-rose-100 transition-all">
                <Trash2 size={18} /> Delete Agent
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Stats & Analytics */}
        <div className="lg:col-span-2 space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Engagements</p>
                <p className="text-2xl font-extrabold text-slate-900">{bot.analytics.totalChats.toLocaleString()}</p>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Avg Score</p>
                <p className="text-2xl font-extrabold text-slate-900">{bot.analytics.satisfactionRate}%</p>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Knowledge Units</p>
                <p className="text-2xl font-extrabold text-slate-900">{bot.trainedPages * 12} Vectors</p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold font-heading text-slate-900">Conversion Impact</h3>
                <div className="flex items-center gap-2 bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-xs font-bold">
                    <Activity size={14} /> Real-time tracking
                </div>
            </div>
            <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={bot.analytics.history}>
                        <defs>
                            <linearGradient id="botColor" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15}/>
                                <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 700}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 700}} />
                        <Tooltip 
                            contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', fontWeight: 700}}
                        />
                        <Area type="monotone" dataKey="chats" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#botColor)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
          </div>

          {/* Crawl Data Section */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold font-heading text-slate-900">Training Corpus</h3>
                <span className="text-sm font-bold text-slate-400">{bot.trainedPages} pages indexed</span>
            </div>
            <div className="divide-y divide-slate-50 border border-slate-100 rounded-2xl overflow-hidden">
                {crawledPages.map((page, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-white hover:bg-slate-50 transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-slate-100 rounded-lg text-slate-400">
                                <FileText size={16} />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-800">{page.title}</p>
                                <p className="text-xs text-slate-400">{page.path}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-[10px] font-extrabold text-slate-300 uppercase tracking-tighter">{page.date}</span>
                            <CheckCircle2 size={16} className="text-emerald-500" />
                        </div>
                    </div>
                ))}
            </div>
            <button className="w-full mt-4 py-3 text-sm font-bold text-indigo-600 bg-indigo-50 rounded-2xl hover:bg-indigo-100 transition-colors">
                View Full Index Map
            </button>
          </div>
        </div>

        {/* Right Column - Embed Widget */}
        <div className="space-y-8">
            <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-indigo-200 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 blur-[50px] -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700"></div>
                <h3 className="text-xl font-bold font-heading mb-4 flex items-center gap-3">
                    <Code className="text-indigo-400" size={24} />
                    Deploy to Website
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6 font-medium">
                    Paste this snippet into your website's <code className="text-indigo-300 bg-white/5 px-1.5 py-0.5 rounded">&lt;head&gt;</code> to activate the agent instantly.
                </p>

                <div className="bg-black/40 border border-white/10 rounded-2xl p-4 md:p-5 relative group/code overflow-x-auto">
                    <pre className="text-[10px] md:text-[11px] font-mono text-indigo-100 whitespace-pre-wrap leading-relaxed break-all">
                        {embedCode}
                    </pre>
                    <button 
                        onClick={copyToClipboard}
                        className="absolute top-3 right-3 p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-all active:scale-90"
                    >
                        {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} className="text-white" />}
                    </button>
                </div>

                <div className="mt-8 pt-8 border-t border-white/10 space-y-4">
                    <div className="flex items-start gap-3">
                        <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
                        <p className="text-xs text-slate-300 font-medium">Universal compatibility (React, Next.js, WordPress)</p>
                    </div>
                    <div className="flex items-start gap-3">
                        <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
                        <p className="text-xs text-slate-300 font-medium">Ultra-lightweight footprint (&lt; 15kb)</p>
                    </div>
                    <div className="flex items-start gap-3">
                        <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
                        <p className="text-xs text-slate-300 font-medium">Automatic context-aware training</p>
                    </div>
                </div>

                <button className="w-full mt-8 py-4 bg-indigo-600 hover:bg-indigo-500 rounded-2xl font-bold text-sm transition-all shadow-lg shadow-indigo-900/50 flex items-center justify-center gap-2">
                    Open Developer Docs <ExternalLink size={16} />
                </button>
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                <h3 className="text-lg font-bold font-heading text-slate-900 mb-4">Training Status</h3>
                <div className="space-y-6">
                    <div>
                        <div className="flex justify-between text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-2">
                            <span>Semantic Mapping</span>
                            <span className="text-indigo-600">Complete</span>
                        </div>
                        <div className="h-2 bg-slate-50 rounded-full overflow-hidden">
                            <div className="h-full bg-indigo-500 w-full"></div>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-2">
                            <span>Vector Indexing</span>
                            <span className="text-indigo-600">100%</span>
                        </div>
                        <div className="h-2 bg-slate-50 rounded-full overflow-hidden">
                            <div className="h-full bg-indigo-500 w-full"></div>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-2">
                            <span>Last Sync</span>
                            <span className="text-slate-500">Today, 10:22 AM</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default BotDetail;
