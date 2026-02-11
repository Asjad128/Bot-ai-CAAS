
import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line,
  AreaChart,
  Area
} from 'recharts';
import { Bot } from '../types';
import { 
  TrendingUp, 
  MessageCircle, 
  Clock, 
  ThumbsUp, 
  Search,
  Filter
} from 'lucide-react';

interface AnalyticsProps {
  bots: Bot[];
}

const Analytics: React.FC<AnalyticsProps> = ({ bots }) => {
  const combinedHistory = bots.reduce((acc: any[], bot) => {
    bot.analytics.history.forEach((h, idx) => {
      if (acc[idx]) {
        acc[idx].chats += h.chats;
      } else {
        acc.push({ date: h.date, chats: h.chats });
      }
    });
    return acc;
  }, []);

  return (
    <div className="space-y-6 md:space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-heading mb-2">Performance Analytics</h1>
          <p className="text-slate-500">Insights into how your AI agents are interacting with users.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium hover:bg-slate-50 w-full sm:w-auto">
                <Filter size={16} /> Last 30 Days
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 w-full sm:w-auto">
                Export Data
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Main Chart */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-8">
                <h3 className="font-bold text-lg font-heading">Total Conversations</h3>
                <div className="flex items-center gap-2 text-emerald-600 font-medium text-sm">
                    <TrendingUp size={16} /> +15.4% vs last month
                </div>
            </div>
            <div className="h-64 md:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={combinedHistory}>
                  <defs>
                    <linearGradient id="colorChats" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <Tooltip 
                    contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}}
                  />
                  <Area type="monotone" dataKey="chats" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorChats)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-lg font-heading mb-6">Response Accuracy</h3>
                <div className="h-48 md:h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={bots}>
                            <XAxis dataKey="name" axisLine={false} tickLine={false} hide />
                            <Tooltip cursor={{fill: 'transparent'}} />
                            <Bar dataKey="analytics.satisfactionRate" fill="#818cf8" radius={[10, 10, 10, 10]} barSize={40} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-lg font-heading mb-6">Top User Queries</h3>
                <div className="space-y-4">
                    {bots[0]?.analytics.topQueries.map((q, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                            <span className="text-sm font-medium text-slate-700">{q.query}</span>
                            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">{q.count} calls</span>
                        </div>
                    ))}
                </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
            <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-8 rounded-3xl text-white shadow-xl">
                <h3 className="text-lg font-bold mb-6">Summary Metrics</h3>
                <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                            <MessageCircle size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-indigo-100 font-medium">Total Messages</p>
                            <p className="text-2xl font-bold">48,290</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                            <Clock size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-indigo-100 font-medium">Avg Resolution</p>
                            <p className="text-2xl font-bold">1m 42s</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                            <ThumbsUp size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-indigo-100 font-medium">Customer CSAT</p>
                            <p className="text-2xl font-bold">94%</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-lg font-heading mb-6">System Health</h3>
                <div className="space-y-4">
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between text-xs font-bold uppercase text-slate-400">
                            <span>Embedding Engine</span>
                            <span className="text-emerald-500">99.9%</span>
                        </div>
                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 w-[99.9%]"></div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between text-xs font-bold uppercase text-slate-400">
                            <span>Vector DB Latency</span>
                            <span className="text-emerald-500">12ms</span>
                        </div>
                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 w-[85%]"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
