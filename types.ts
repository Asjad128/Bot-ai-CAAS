
export interface Bot {
  id: string;
  name: string;
  websiteUrl: string;
  status: 'active' | 'training' | 'error';
  lastTrained: string;
  trainedPages: number;
  config: BotConfig;
  analytics: BotAnalytics;
}

export interface BotConfig {
  primaryColor: string;
  welcomeMessage: string;
  systemPrompt: string;
  avatarUrl?: string;
}

export interface BotAnalytics {
  totalChats: number;
  avgResponseTime: number;
  satisfactionRate: number;
  topQueries: { query: string; count: number }[];
  history: { date: string; chats: number }[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: number;
}
