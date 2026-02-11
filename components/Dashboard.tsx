import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { ArrowUpRight, ArrowDownRight, DollarSign, Clock, Zap } from 'lucide-react';

const data = [
  { name: 'Mon', manual: 40, auto: 24, amt: 2400 },
  { name: 'Tue', manual: 30, auto: 139, amt: 2210 },
  { name: 'Wed', manual: 20, auto: 98, amt: 2290 },
  { name: 'Thu', manual: 27, auto: 39, amt: 2000 },
  { name: 'Fri', manual: 18, auto: 48, amt: 2181 },
  { name: 'Sat', manual: 23, auto: 38, amt: 2500 },
  { name: 'Sun', manual: 34, auto: 43, amt: 2100 },
];

const confidenceData = [
    { name: 'Wk 1', confidence: 65 },
    { name: 'Wk 2', confidence: 72 },
    { name: 'Wk 3', confidence: 78 },
    { name: 'Wk 4', confidence: 85 },
    { name: 'Wk 5', confidence: 92 },
];

const Dashboard: React.FC = () => {
  return (
    <div className="flex-1 h-screen bg-slate-50 overflow-y-auto p-8">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Support Operations</h1>
        <p className="text-slate-500">Real-time overview of AI performance and agent efficiency.</p>
      </header>

      {/* Metrics Row */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Auto-Resolution Rate', value: '42.8%', trend: '+12%', icon: Zap, color: 'indigo' },
          { label: 'Avg Handle Time', value: '1m 24s', trend: '-35%', icon: Clock, color: 'green' },
          { label: 'Est. Cost Savings', value: '$12,450', trend: '+8%', icon: DollarSign, color: 'blue' },
          { label: 'Escalation Rate', value: '4.2%', trend: '-2%', icon: ArrowUpRight, color: 'orange' },
        ].map((metric, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
             <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-lg bg-${metric.color}-50 text-${metric.color}-600`}>
                   <metric.icon className="w-6 h-6" />
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${metric.trend.startsWith('+') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                   {metric.trend}
                </span>
             </div>
             <h3 className="text-3xl font-bold text-slate-800 mb-1">{metric.value}</h3>
             <p className="text-sm text-slate-500">{metric.label}</p>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-80">
          <h3 className="font-bold text-slate-800 mb-6">Resolution Volume (Auto vs Manual)</h3>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorAuto" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip />
              <Area type="monotone" dataKey="auto" stroke="#4f46e5" fillOpacity={1} fill="url(#colorAuto)" strokeWidth={2} />
              <Area type="monotone" dataKey="manual" stroke="#cbd5e1" fill="transparent" strokeDasharray="5 5" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-80">
          <h3 className="font-bold text-slate-800 mb-6">AI Confidence Trend</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={confidenceData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} domain={[0, 100]} />
              <Tooltip />
              <Bar dataKey="confidence" fill="#10b981" radius={[4, 4, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Risk Monitor */}
       <div className="bg-red-50 rounded-xl border border-red-100 p-6 flex items-center justify-between">
          <div>
             <h3 className="text-lg font-bold text-red-900 mb-1">Risk Alert: "Billing" Topic Spike</h3>
             <p className="text-red-700 text-sm">Detected 45% increase in refund requests in the last hour. AI confidence dropped by 12% on this topic.</p>
          </div>
          <button className="bg-white text-red-700 px-4 py-2 rounded-lg border border-red-200 font-semibold shadow-sm text-sm hover:bg-red-50">View Details</button>
       </div>

    </div>
  );
};

export default Dashboard;