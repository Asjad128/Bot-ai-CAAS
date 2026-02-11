
import React from 'react';
import { 
  Database, 
  Layers, 
  Cpu, 
  Search, 
  Zap, 
  Shield, 
  Code2, 
  Network 
} from 'lucide-react';

const StackCard = ({ icon: Icon, title, description, items }: { icon: any, title: string, description: string, items: string[] }) => (
  <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
    <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6">
      <Icon size={24} />
    </div>
    <h3 className="text-xl font-bold font-heading mb-3">{title}</h3>
    <p className="text-slate-500 text-sm mb-6 leading-relaxed">{description}</p>
    <div className="flex flex-wrap gap-2">
      {items.map(item => (
        <span key={item} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold">
          {item}
        </span>
      ))}
    </div>
  </div>
);

const TechStack = () => {
  return (
    <div className="space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-4xl font-extrabold font-heading text-slate-900">Technical Architecture</h1>
        <p className="text-lg text-slate-500">
          A high-performance RAG pipeline designed for speed, scalability, and extreme accuracy in neural information retrieval.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <StackCard 
          icon={Layers}
          title="Frontend Dashboard"
          description="Sleek, responsive UI built with React & TypeScript for bot management, customization, and real-time visualization."
          items={['React 18', 'Tailwind CSS', 'Recharts', 'Framer Motion']}
        />
        <StackCard 
          icon={Network}
          title="High-Performance API"
          description="A distributed backend orchestration layer handling auth, rate limiting, and chatbot execution flows."
          items={['FastAPI', 'Python 3.11', 'Redis', 'OAuth2']}
        />
        <StackCard 
          icon={Database}
          title="Vector Persistence"
          description="Semantic storage of website content using state-of-the-art embedding models and vector similarity search."
          items={['Pinecone', 'FAISS', 'PostgreSQL', 'LangChain']}
        />
        <StackCard 
          icon={Search}
          title="Website Crawler"
          description="Concurrent multi-threaded scraper that extracts clean semantic data while respecting robots.txt and sitemaps."
          items={['Playwright', 'Scrapy', 'BeautifulSoup']}
        />
        <StackCard 
          icon={Cpu}
          title="Neural Engine"
          description="Integration with world-class LLMs like Gemini to provide grounded, hallucination-free responses."
          items={['Gemini Pro', 'OpenAI', 'Llama 3', 'RAG Optimizers']}
        />
        <StackCard 
          icon={Shield}
          title="Enterprise Security"
          description="End-to-end data encryption and strict context-bound prompting to ensure data privacy."
          items={['TLS 1.3', 'JWT', 'RBAC', 'Context Filtering']}
        />
      </div>

      <div className="bg-slate-900 rounded-[3rem] p-12 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 blur-[100px] -translate-y-1/2 translate-x-1/2 rounded-full"></div>
        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl font-bold font-heading">The RAG Pipeline Flow</h2>
            <div className="space-y-4">
              {[
                { step: '01', title: 'Content Discovery', desc: 'System discovers and crawls linked pages from a provided URL.' },
                { step: '02', title: 'Chunking & Embeddings', desc: 'Text is parsed into semantic chunks and vectorized using BERT/Ada.' },
                { step: '03', title: 'Query Vectorization', desc: 'Incoming user queries are vectorized to search for relevant chunks.' },
                { step: '04', title: 'Context Augmentation', desc: 'Relevant text is injected into the LLM system prompt as ground truth.' },
                { step: '05', title: 'Final Generation', desc: 'The model generates a response strictly based on the injected context.' },
              ].map(item => (
                <div key={item.step} className="flex gap-4">
                  <span className="text-indigo-400 font-bold font-heading">{item.step}</span>
                  <div>
                    <h4 className="font-bold">{item.title}</h4>
                    <p className="text-sm text-slate-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 w-full">
            <h4 className="text-sm font-bold uppercase tracking-widest text-indigo-400 mb-6">Live System Log</h4>
            <div className="font-mono text-xs space-y-2 text-slate-300">
              <p className="text-emerald-400">[09:42:01] INFO: Initializing crawler for domain.com...</p>
              <p>[09:42:05] SCAN: Discovered 42 unique nodes.</p>
              <p>[09:42:12] VECTOR: Created 1,240 embeddings successfully.</p>
              <p>[09:42:15] DB: Synced Pinecone index 'prod-alpha-v1'.</p>
              <p className="text-amber-400">[09:43:01] WARN: Rate limit approach on search API.</p>
              <p className="text-indigo-400">[09:45:10] BOT: Request handled for user_id=452 (Latency: 142ms)</p>
              <div className="animate-pulse flex gap-1 mt-4">
                <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
                <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechStack;
