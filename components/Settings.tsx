import React from 'react';
import { Settings as SettingsIcon, Bell, Lock, Palette, Globe } from 'lucide-react';

const SettingCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-100 hover:shadow-md transition-all">
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 flex-shrink-0">
        <Icon size={24} />
      </div>
      <div className="flex-1">
        <h3 className="font-bold text-slate-900 mb-1">{title}</h3>
        <p className="text-sm text-slate-500">{description}</p>
      </div>
    </div>
  </div>
);

const Settings: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-heading mb-2">Settings</h1>
        <p className="text-slate-500">Manage your account and application preferences</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SettingCard 
          icon={Bell}
          title="Notifications"
          description="Configure how you receive updates and alerts"
        />
        <SettingCard 
          icon={Lock}
          title="Privacy & Security"
          description="Manage your data and security settings"
        />
        <SettingCard 
          icon={Palette}
          title="Appearance"
          description="Customize the look and feel of your dashboard"
        />
        <SettingCard 
          icon={Globe}
          title="API Settings"
          description="Configure API keys and integration settings"
        />
      </div>

      <div className="bg-white p-8 rounded-3xl border border-slate-100">
        <h2 className="text-xl font-bold mb-4">API Configuration</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-slate-600 mb-2">Gemini API Key</label>
            <input 
              type="password"
              placeholder="Enter your API key"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            <p className="text-xs text-slate-400 mt-2">
              Get your API key from <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Google AI Studio</a>
            </p>
          </div>
          <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
