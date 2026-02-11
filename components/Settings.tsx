import React, { useState } from 'react';
import { ToggleLeft, ToggleRight, Save, Bell, Shield, BrainCircuit, Moon, Slack, Webhook } from 'lucide-react';

const Settings: React.FC = () => {
  const [settings, setSettings] = useState({
    autoDraft: true,
    autoResolve: false,
    darkMode: false,
    notifications: true,
    escalationThreshold: 80,
    slackIntegration: true,
  });

  const toggle = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const Toggle = ({ active, onClick }: { active: boolean, onClick: () => void }) => (
    <button onClick={onClick} className={`transition-colors duration-200 ${active ? 'text-blue-600' : 'text-slate-300'}`}>
      {active ? <ToggleRight className="w-10 h-10" /> : <ToggleLeft className="w-10 h-10" />}
    </button>
  );

  return (
    <div className="flex-1 h-screen bg-slate-50 overflow-y-auto p-8">
      <header className="mb-8 border-b border-slate-200 pb-6">
        <h1 className="text-2xl font-bold text-slate-800">Platform Settings</h1>
        <p className="text-slate-500">Configure AI behavior and workspace preferences.</p>
      </header>

      <div className="max-w-3xl space-y-8">
        
        {/* AI Section */}
        <section className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
           <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                 <BrainCircuit className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold text-slate-800">AI Automation</h2>
           </div>

           <div className="space-y-6">
              <div className="flex justify-between items-center">
                 <div>
                    <h3 className="font-medium text-slate-800">Auto-Draft Responses</h3>
                    <p className="text-sm text-slate-500">AI will pre-write responses for all incoming tickets.</p>
                 </div>
                 <Toggle active={settings.autoDraft} onClick={() => toggle('autoDraft')} />
              </div>
              
              <div className="flex justify-between items-center">
                 <div>
                    <h3 className="font-medium text-slate-800">Auto-Resolve High Confidence</h3>
                    <p className="text-sm text-slate-500">Automatically close tickets with &gt;98% confidence score.</p>
                 </div>
                 <Toggle active={settings.autoResolve} onClick={() => toggle('autoResolve')} />
              </div>
              
              <div className="pt-2">
                 <div className="flex justify-between mb-2">
                    <h3 className="font-medium text-slate-800">Escalation Confidence Threshold</h3>
                    <span className="text-sm font-bold text-blue-600">{settings.escalationThreshold}%</span>
                 </div>
                 <input 
                   type="range" 
                   min="0" 
                   max="100" 
                   value={settings.escalationThreshold} 
                   onChange={(e) => setSettings({...settings, escalationThreshold: parseInt(e.target.value)})}
                   className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                 />
                 <p className="text-xs text-slate-500 mt-2">Tickets with confidence below this score are automatically flagged for human review.</p>
              </div>
           </div>
        </section>

        {/* Notifications & Integrations */}
        <section className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
           <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
                 <Bell className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold text-slate-800">Notifications & Integrations</h2>
           </div>
           
           <div className="space-y-6">
              <div className="flex justify-between items-center">
                 <div>
                    <h3 className="font-medium text-slate-800">SLA Breach Alerts</h3>
                    <p className="text-sm text-slate-500">Get notified 30 minutes before a ticket breaches SLA.</p>
                 </div>
                 <Toggle active={settings.notifications} onClick={() => toggle('notifications')} />
              </div>

              <div className="flex justify-between items-center border-t border-slate-100 pt-6">
                 <div className="flex items-center gap-3">
                    <div className="bg-slate-100 p-2 rounded">
                        <Slack className="w-5 h-5 text-slate-700" />
                    </div>
                    <div>
                        <h3 className="font-medium text-slate-800">Slack Integration</h3>
                        <p className="text-sm text-slate-500">Post high-priority escalations to #support-ops</p>
                    </div>
                 </div>
                 <Toggle active={settings.slackIntegration} onClick={() => toggle('slackIntegration')} />
              </div>
            </div>
        </section>

         {/* Preferences */}
         <section className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
           <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-slate-100 text-slate-600 rounded-lg">
                 <Moon className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold text-slate-800">Workspace</h2>
           </div>
           
           <div className="flex justify-between items-center">
                 <div>
                    <h3 className="font-medium text-slate-800">Dark Mode</h3>
                    <p className="text-sm text-slate-500">Easier on the eyes for night shifts.</p>
                 </div>
                 <Toggle active={settings.darkMode} onClick={() => toggle('darkMode')} />
            </div>
        </section>

        <div className="flex justify-end pt-4 pb-8">
           <button className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200">
              <Save className="w-4 h-4" /> Save Changes
           </button>
        </div>

      </div>
    </div>
  );
};

export default Settings;