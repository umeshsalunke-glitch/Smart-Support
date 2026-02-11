import React, { useState, useEffect } from 'react';
import { Ticket, Sentiment, Priority, TicketStatus } from '../types';
import { 
  ArrowLeft, BrainCircuit, AlertTriangle, 
  ThumbsUp, ThumbsDown, Send, Edit3, Sparkles, RefreshCw,
  ShieldAlert, Clock, CheckCircle2
} from 'lucide-react';
import { generateDraftResponse, analyzeEscalation } from '../services/geminiService';

interface TicketDetailProps {
  ticket: Ticket;
  onBack: () => void;
  onResolve: () => void;
  onSnooze: () => void;
  onEscalate: () => void;
}

const TicketDetail: React.FC<TicketDetailProps> = ({ ticket, onBack, onResolve, onSnooze, onEscalate }) => {
  const [draft, setDraft] = useState(ticket.suggestedResponse);
  const [isEditing, setIsEditing] = useState(false);
  const [isEscalating, setIsEscalating] = useState(false);
  const [escalationData, setEscalationData] = useState<{reason: string, recommendedTeam: string} | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [tone, setTone] = useState<'Formal' | 'Empathetic' | 'Direct'>('Empathetic');

  // Reset state when ticket changes
  useEffect(() => {
    setDraft(ticket.suggestedResponse);
    setIsEscalating(false);
    setEscalationData(null);
    setIsEditing(false);
  }, [ticket.id]);

  // Simulate AI Escalation check
  useEffect(() => {
    if (isEscalating && !escalationData) {
      setIsGenerating(true);
      analyzeEscalation(ticket).then(data => {
        setEscalationData(data);
        setIsGenerating(false);
      });
    }
  }, [isEscalating, ticket, escalationData]);

  const handleRegenerate = async () => {
    setIsGenerating(true);
    const newDraft = await generateDraftResponse(ticket, tone, "Rewrite this to be more concise.");
    setDraft(newDraft);
    setIsGenerating(false);
  };

  const handleToneChange = async (newTone: 'Formal' | 'Empathetic' | 'Direct') => {
    setTone(newTone);
    setIsGenerating(true);
    const newDraft = await generateDraftResponse(ticket, newTone);
    setDraft(newDraft);
    setIsGenerating(false);
  };

  // Simple Icon Components
  const ClockIcon = () => (
    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
  );

  const CheckCircle = ({className}: {className?: string}) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
  );

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <header className="h-16 border-b border-slate-200 flex items-center px-6 justify-between flex-shrink-0 bg-white z-10">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full text-slate-500">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
             <h2 className="font-bold text-slate-800 flex items-center gap-2">
                {ticket.subject}
                <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded font-normal border border-slate-200">
                   #{ticket.id}
                </span>
             </h2>
             <p className="text-xs text-slate-500">Via Email • {new Date(ticket.receivedAt).toLocaleString()}</p>
          </div>
        </div>
        
        {/* SLA Timer */}
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${ticket.priority === Priority.CRITICAL ? 'bg-red-50 border-red-200 text-red-700' : 'bg-slate-50 border-slate-200 text-slate-600'}`}>
          <ClockIcon />
          <span className="text-xs font-mono font-medium">SLA: 01:24:00</span>
        </div>
      </header>

      {/* Main Grid */}
      <div className="flex-1 grid grid-cols-12 overflow-hidden">
        
        {/* Left: Context (25%) */}
        <div className="col-span-3 border-r border-slate-200 bg-slate-50 overflow-y-auto p-5">
           
           {/* AI Summary Card */}
           <div className="bg-white p-4 rounded-xl border border-indigo-100 shadow-sm mb-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
              <div className="flex items-center gap-2 mb-2 text-indigo-700">
                <BrainCircuit className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wide">AI Summary</span>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed mb-3">
                {ticket.aiSummary}
              </p>
              <div className="flex flex-wrap gap-2">
                 <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded border border-slate-200 font-medium">
                    {ticket.aiDetectedIssue}
                 </span>
                 <span className={`px-2 py-1 text-xs rounded border font-medium ${ticket.sentiment === Sentiment.ANGRY ? 'bg-red-50 text-red-700 border-red-200' : 'bg-green-50 text-green-700 border-green-200'}`}>
                    {ticket.sentiment} Sentiment
                 </span>
              </div>
           </div>

           {/* Customer Profile */}
           <div className="mb-6">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Customer</h3>
              <div className="flex items-center gap-3 mb-3">
                <img src={ticket.customer.avatarUrl} className="w-10 h-10 rounded-full" alt="Customer" />
                <div>
                   <p className="font-semibold text-slate-800">{ticket.customer.name}</p>
                   <p className="text-xs text-slate-500">{ticket.customer.email}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-xs">
                 <div className="bg-white p-2 rounded border border-slate-200">
                    <p className="text-slate-400 mb-1">Tier</p>
                    <p className="font-medium text-slate-800">{ticket.customer.tier}</p>
                 </div>
                 <div className="bg-white p-2 rounded border border-slate-200">
                    <p className="text-slate-400 mb-1">LTV</p>
                    <p className="font-medium text-slate-800">${ticket.customer.ltv}</p>
                 </div>
                 <div className="bg-white p-2 rounded border border-slate-200 col-span-2">
                    <p className="text-slate-400 mb-1">Churn Risk</p>
                    <div className="w-full bg-slate-100 h-2 rounded-full mt-1 overflow-hidden">
                       <div 
                         className={`h-full rounded-full ${ticket.customer.churnRisk > 50 ? 'bg-red-500' : 'bg-green-500'}`} 
                         style={{width: `${ticket.customer.churnRisk}%`}}
                       />
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Center: The "Brain" & Workspace (50%) */}
        <div className="col-span-6 flex flex-col h-full bg-white relative">
           
           {!isEscalating ? (
             <>
              <div className="flex-1 overflow-y-auto p-8">
                  {/* AI Reasoning Section */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-indigo-500" />
                        AI Reasoning & Plan
                      </h3>
                      <span className="text-xs text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full font-medium">
                        Confidence: {ticket.aiConfidence}%
                      </span>
                    </div>
                    <div className="space-y-2">
                      {ticket.aiReasoning.map((reason, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-slate-700">{reason}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Draft Editor */}
                  <div className={`rounded-xl border transition-all duration-300 ${isEditing ? 'border-blue-400 ring-4 ring-blue-50 shadow-lg' : 'border-slate-200 shadow-sm'}`}>
                    <div className="bg-slate-50 border-b border-slate-200 px-4 py-2 flex items-center justify-between rounded-t-xl">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-500 uppercase">Draft Response</span>
                        <div className="h-4 w-[1px] bg-slate-300 mx-1" />
                        <div className="flex gap-1">
                          {(['Formal', 'Empathetic', 'Direct'] as const).map(t => (
                            <button 
                              key={t}
                              onClick={() => handleToneChange(t)}
                              className={`text-[10px] px-2 py-1 rounded-full transition-colors ${tone === t ? 'bg-blue-100 text-blue-700 font-medium' : 'text-slate-500 hover:bg-slate-200'}`}
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2">
                         <button onClick={handleRegenerate} title="Regenerate" className="p-1.5 hover:bg-white rounded text-slate-500">
                            <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
                         </button>
                         <button onClick={() => setIsEditing(!isEditing)} className="flex items-center gap-1 text-xs text-blue-600 font-medium hover:bg-blue-50 px-2 py-1 rounded">
                           <Edit3 className="w-3 h-3" />
                           {isEditing ? 'Done' : 'Edit'}
                         </button>
                      </div>
                    </div>
                    
                    <div className="p-0">
                      {isGenerating ? (
                        <div className="h-64 flex flex-col items-center justify-center text-slate-400 gap-3">
                          <Sparkles className="w-8 h-8 text-indigo-400 animate-pulse" />
                          <p className="text-sm">AI is thinking...</p>
                        </div>
                      ) : (
                        <textarea 
                          value={draft}
                          onChange={(e) => setDraft(e.target.value)}
                          readOnly={!isEditing}
                          className={`w-full h-64 p-4 text-sm text-slate-800 leading-relaxed resize-none focus:outline-none bg-white rounded-b-xl ${!isEditing ? 'cursor-default' : ''}`}
                        />
                      )}
                    </div>
                  </div>
              </div>
             </>
           ) : (
             <div className="flex-1 p-8 flex flex-col justify-center items-center bg-slate-50/50">
                <div className="max-w-md w-full bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
                   <div className="bg-orange-50 px-6 py-4 border-b border-orange-100 flex items-center gap-3">
                      <AlertTriangle className="w-6 h-6 text-orange-500" />
                      <div>
                        <h3 className="font-bold text-orange-800">Escalate Ticket</h3>
                        <p className="text-xs text-orange-600">AI is analyzing the best path...</p>
                      </div>
                   </div>
                   
                   <div className="p-6">
                      {isGenerating ? (
                        <div className="py-8 flex flex-col items-center gap-4">
                           <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
                           <p className="text-sm text-slate-500">Matching with L2/L3 specialists...</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                           <div>
                              <label className="text-xs font-bold text-slate-500 uppercase">Recommended Team</label>
                              <div className="mt-1 p-3 bg-indigo-50 border border-indigo-100 rounded-lg flex items-center justify-between text-indigo-900 font-medium text-sm">
                                 {escalationData?.recommendedTeam}
                                 <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                              </div>
                           </div>
                           <div>
                              <label className="text-xs font-bold text-slate-500 uppercase">Automated Context Note</label>
                              <textarea 
                                className="w-full mt-1 p-3 text-sm border border-slate-200 rounded-lg bg-slate-50 h-24"
                                readOnly
                                value={escalationData?.reason}
                              />
                           </div>
                        </div>
                      )}
                   </div>
                   
                   {!isGenerating && (
                     <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-3">
                        <button onClick={() => setIsEscalating(false)} className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800">Cancel</button>
                        <button onClick={onEscalate} className="px-4 py-2 text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 rounded-lg shadow-sm">Confirm Escalation</button>
                     </div>
                   )}
                </div>
             </div>
           )}

           {/* Feedback Footer */}
           <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-6 py-3 flex justify-between items-center text-xs text-slate-400">
              <p>Model: Gemini 3 Flash • Latency: 420ms</p>
              <div className="flex gap-4">
                 <button className="flex items-center gap-1 hover:text-slate-600 transition-colors"><ThumbsUp className="w-3 h-3" /> Good suggestion</button>
                 <button className="flex items-center gap-1 hover:text-slate-600 transition-colors"><ThumbsDown className="w-3 h-3" /> Needs improvement</button>
              </div>
           </div>
        </div>

        {/* Right: Actions (25%) */}
        <div className="col-span-3 border-l border-slate-200 bg-white p-6 flex flex-col gap-4">
           
           <div className="mb-4">
              <h3 className="text-sm font-bold text-slate-800 mb-4">Recommended Actions</h3>
              
              <button 
                onClick={onResolve}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-xl shadow-md shadow-blue-200 hover:shadow-lg transition-all flex items-center justify-between group mb-3"
              >
                 <div className="text-left">
                    <div className="font-bold text-lg">Approve & Send</div>
                    <div className="text-blue-100 text-xs mt-0.5">High Confidence match</div>
                 </div>
                 <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button 
                onClick={() => setIsEscalating(true)}
                className="w-full bg-white border border-slate-200 hover:border-orange-300 hover:bg-orange-50 text-slate-700 p-3 rounded-lg transition-all flex items-center gap-3 mb-2"
              >
                 <div className="bg-orange-100 p-2 rounded-md text-orange-600">
                    <ShieldAlert className="w-4 h-4" />
                 </div>
                 <span className="font-medium text-sm">Escalate Ticket</span>
              </button>

              <button 
                onClick={onSnooze}
                className="w-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 p-3 rounded-lg transition-all flex items-center gap-3"
              >
                 <div className="bg-slate-100 p-2 rounded-md text-slate-600">
                    <Clock className="w-4 h-4" />
                 </div>
                 <span className="font-medium text-sm">Snooze / Follow-up</span>
              </button>
           </div>

           <div className="mt-auto border-t border-slate-100 pt-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase mb-3">Similar Tickets</h4>
              <div className="space-y-3">
                 {[1,2].map(i => (
                    <div key={i} className="p-3 rounded bg-slate-50 border border-slate-100 hover:border-blue-200 cursor-pointer">
                       <div className="flex justify-between mb-1">
                          <span className="text-xs font-semibold text-slate-700">Ticket #{1000+i}</span>
                          <span className="text-[10px] bg-green-100 text-green-700 px-1 rounded">Resolved</span>
                       </div>
                       <p className="text-xs text-slate-500 line-clamp-1">Similar rate limiting issue...</p>
                    </div>
                 ))}
              </div>
           </div>

        </div>
      </div>
    </div>
  );
};

export default TicketDetail;