import React from 'react';
import { Ticket, Priority, Sentiment, InboxFilter } from '../types';
import { AlertTriangle, Clock, Flame, BrainCircuit, Search, CheckCircle2, ShieldCheck, Coffee } from 'lucide-react';

interface InboxProps {
  tickets: Ticket[];
  onSelectTicket: (ticket: Ticket) => void;
  currentFilter: InboxFilter;
  onFilterChange: (filter: InboxFilter) => void;
}

const Inbox: React.FC<InboxProps> = ({ tickets, onSelectTicket, currentFilter, onFilterChange }) => {
  
  const getPriorityIcon = (priority: Priority) => {
    switch(priority) {
      case Priority.CRITICAL: return <Flame className="w-4 h-4 text-red-500 fill-red-50" />;
      case Priority.HIGH: return <AlertTriangle className="w-4 h-4 text-orange-500" />;
      default: return <Clock className="w-4 h-4 text-slate-400" />;
    }
  };

  const getSentimentColor = (sentiment: Sentiment) => {
    if (sentiment === Sentiment.ANGRY || sentiment === Sentiment.NEGATIVE) return 'bg-red-50 text-red-700 border-red-200';
    if (sentiment === Sentiment.POSITIVE) return 'bg-green-50 text-green-700 border-green-200';
    return 'bg-slate-50 text-slate-600 border-slate-200';
  };

  const filterTabClass = (filter: InboxFilter) => 
    `pb-3 border-b-2 font-medium text-sm transition-colors ${
      currentFilter === filter 
        ? 'border-blue-600 text-blue-600' 
        : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
    }`;

  const renderEmptyState = () => {
    switch (currentFilter) {
      case 'FOCUS':
        return (
          <div className="flex flex-col items-center justify-center h-96 text-center animate-in fade-in duration-500">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">You're all caught up!</h3>
            <p className="text-slate-500 max-w-sm">No high-priority tickets need your attention right now. Great job keeping the queue clear.</p>
          </div>
        );
      case 'REVIEW':
        return (
          <div className="flex flex-col items-center justify-center h-96 text-center animate-in fade-in duration-500">
             <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6">
              <BrainCircuit className="w-10 h-10 text-blue-500" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">AI is confident</h3>
            <p className="text-slate-500 max-w-sm">There are no low-confidence predictions requiring human review at the moment.</p>
          </div>
        );
      case 'ESCALATED':
        return (
          <div className="flex flex-col items-center justify-center h-96 text-center animate-in fade-in duration-500">
             <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mb-6">
              <ShieldCheck className="w-10 h-10 text-orange-500" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">No Active Escalations</h3>
            <p className="text-slate-500 max-w-sm">There are no tickets currently routed to L2/L3 support tiers.</p>
          </div>
        );
      case 'SNOOZED':
        return (
          <div className="flex flex-col items-center justify-center h-96 text-center animate-in fade-in duration-500">
             <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
              <Coffee className="w-10 h-10 text-slate-500" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Empty Snooze List</h3>
            <p className="text-slate-500 max-w-sm">No tickets are waiting for follow-up.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex-1 h-screen bg-slate-50 flex flex-col overflow-hidden">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-8 py-5 flex justify-between items-center flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Unified Inbox</h1>
          <p className="text-slate-500 text-sm mt-1">
            {currentFilter === 'FOCUS' ? 'AI has prioritized these tickets requiring immediate attention.' : 
             currentFilter === 'REVIEW' ? 'Low confidence suggestions requiring human expertise.' :
             currentFilter === 'ESCALATED' ? 'Tickets currently routed to L2/L3 teams.' : 
             'Tickets snoozed for later follow-up.'}
          </p>
        </div>
        <div className="flex gap-3">
          <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold border border-blue-100 flex items-center gap-2">
            <BrainCircuit className="w-3 h-3" />
            AI Auto-Resolved: 42 today
          </span>
        </div>
      </header>

      {/* Filters */}
      <div className="px-8 pt-6 pb-2 flex-shrink-0">
        <div className="flex gap-6 border-b border-slate-200">
          <button onClick={() => onFilterChange('FOCUS')} className={filterTabClass('FOCUS')}>
            Focus (High Confidence)
          </button>
          <button onClick={() => onFilterChange('REVIEW')} className={filterTabClass('REVIEW')}>
            Needs Review
          </button>
          <button onClick={() => onFilterChange('ESCALATED')} className={filterTabClass('ESCALATED')}>
            Escalated
          </button>
          <button onClick={() => onFilterChange('SNOOZED')} className={filterTabClass('SNOOZED')}>
            Snoozed
          </button>
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto px-8 py-4">
        {tickets.length === 0 ? (
          renderEmptyState()
        ) : (
          <div className="space-y-3 pb-8">
            {tickets.map((ticket) => (
              <div 
                key={ticket.id}
                onClick={() => onSelectTicket(ticket)}
                className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md hover:border-blue-300 transition-all cursor-pointer group relative overflow-hidden"
              >
                {/* Left Stripe for Priority */}
                <div className={`absolute left-0 top-0 bottom-0 w-1 ${ticket.priority === Priority.CRITICAL ? 'bg-red-500' : ticket.priority === Priority.HIGH ? 'bg-orange-400' : 'bg-slate-300'}`} />

                <div className="flex justify-between items-start pl-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                        {ticket.subject}
                      </h3>
                      {ticket.priority === Priority.CRITICAL && (
                        <span className="animate-pulse px-2 py-0.5 bg-red-100 text-red-700 text-[10px] font-bold uppercase rounded tracking-wide">
                          SLA Risk
                        </span>
                      )}
                    </div>
                    <p className="text-slate-500 text-sm line-clamp-1 mb-3">{ticket.description}</p>
                    
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                          <img src={ticket.customer.avatarUrl} className="w-5 h-5 rounded-full" alt="avatar"/>
                          <span className="font-medium text-slate-700">{ticket.customer.name}</span>
                          <span className="text-slate-300">|</span>
                          <span>{ticket.customer.tier} Tier</span>
                      </div>
                      
                      <div className={`text-xs px-2 py-0.5 rounded border ${getSentimentColor(ticket.sentiment)}`}>
                        {ticket.sentiment}
                      </div>

                      <div className="flex items-center gap-1 text-xs text-slate-400 ml-auto">
                          <Clock className="w-3 h-3" />
                          Received {new Date(ticket.receivedAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </div>
                    </div>
                  </div>

                  {/* AI Badge */}
                  <div className="ml-6 flex flex-col items-end gap-2">
                    <div className={`flex items-center gap-1.5 px-2 py-1 rounded-lg border shadow-sm ${ticket.aiConfidence >= 90 ? 'bg-indigo-50 text-indigo-700 border-indigo-100' : 'bg-orange-50 text-orange-700 border-orange-100'}`}>
                        <BrainCircuit className="w-4 h-4" />
                        <span className="font-bold text-sm">{ticket.aiConfidence}%</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium">CONFIDENCE</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Inbox;