import React from 'react';
import { Inbox, Settings, Users, BarChart3, Zap } from 'lucide-react';
import { ViewState } from '../types';

interface SidebarProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onChangeView }) => {
  const navItemClass = (active: boolean) => 
    `flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors duration-200 ${
      active 
        ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' 
        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
    }`;

  return (
    <div className="w-64 bg-white border-r border-slate-200 h-screen flex flex-col flex-shrink-0">
      <div className="p-6 flex items-center gap-2">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <Zap className="text-white w-5 h-5 fill-current" />
        </div>
        <span className="font-bold text-xl text-slate-800 tracking-tight">SmartHelp</span>
      </div>

      <div className="flex-1 py-4">
        <div 
          className={navItemClass(currentView === 'INBOX' || currentView === 'TICKET_DETAIL')}
          onClick={() => onChangeView('INBOX')}
        >
          <Inbox className="w-5 h-5" />
          <span className="font-medium">Unified Inbox</span>
        </div>
        
        <div 
          className={navItemClass(currentView === 'DASHBOARD')}
          onClick={() => onChangeView('DASHBOARD')}
        >
          <BarChart3 className="w-5 h-5" />
          <span className="font-medium">Performance</span>
        </div>

        <div 
          className={navItemClass(currentView === 'TEAM')}
          onClick={() => onChangeView('TEAM')}
        >
          <Users className="w-5 h-5" />
          <span className="font-medium">Team</span>
        </div>
        
        <div 
          className={navItemClass(currentView === 'SETTINGS')}
          onClick={() => onChangeView('SETTINGS')}
        >
          <Settings className="w-5 h-5" />
          <span className="font-medium">Settings</span>
        </div>
      </div>

      <div className="p-4 border-t border-slate-100">
        <div className="flex items-center gap-3">
          <img 
            src="https://picsum.photos/100/100?random=user" 
            alt="Agent" 
            className="w-10 h-10 rounded-full border border-slate-200"
          />
          <div>
            <p className="text-sm font-semibold text-slate-700">Alex M.</p>
            <p className="text-xs text-green-600 font-medium">● Online</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;