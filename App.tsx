import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Inbox from './components/Inbox';
import TicketDetail from './components/TicketDetail';
import Dashboard from './components/Dashboard';
import Team from './components/Team';
import Settings from './components/Settings';
import { MOCK_TICKETS } from './services/mockData';
import { Ticket, ViewState, InboxFilter, TicketStatus } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('INBOX');
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [tickets, setTickets] = useState<Ticket[]>(MOCK_TICKETS);
  const [inboxFilter, setInboxFilter] = useState<InboxFilter>('FOCUS');

  const handleSelectTicket = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setCurrentView('TICKET_DETAIL');
  };

  // Helper to update a specific ticket in state
  const updateTicketStatus = (ticketId: string, newStatus: TicketStatus) => {
     setTickets(prev => prev.map(t => 
        t.id === ticketId ? { ...t, status: newStatus } : t
     ));
     
     // Return to inbox after action
     setSelectedTicket(null);
     setCurrentView('INBOX');
  };

  const handleResolveTicket = () => {
    if (selectedTicket) updateTicketStatus(selectedTicket.id, TicketStatus.RESOLVED);
  };

  const handleEscalateTicket = () => {
    if (selectedTicket) updateTicketStatus(selectedTicket.id, TicketStatus.ESCALATED);
  };

  const handleSnoozeTicket = () => {
    if (selectedTicket) updateTicketStatus(selectedTicket.id, TicketStatus.PENDING);
  };

  // Filter Logic
  const filteredTickets = tickets.filter(ticket => {
     // Exclude resolved tickets from all active views
     if (ticket.status === TicketStatus.RESOLVED) return false;

     switch (inboxFilter) {
        case 'FOCUS':
           // High confidence, Open tickets
           return ticket.status === TicketStatus.OPEN && ticket.aiConfidence >= 90;
        case 'REVIEW':
           // Low confidence, Open tickets
           return ticket.status === TicketStatus.OPEN && ticket.aiConfidence < 90;
        case 'ESCALATED':
           return ticket.status === TicketStatus.ESCALATED;
        case 'SNOOZED':
           return ticket.status === TicketStatus.PENDING;
        default:
           return true;
     }
  });

  const renderContent = () => {
    switch (currentView) {
      case 'INBOX':
        return (
          <Inbox 
             tickets={filteredTickets} 
             onSelectTicket={handleSelectTicket} 
             currentFilter={inboxFilter}
             onFilterChange={setInboxFilter}
          />
        );
      case 'TICKET_DETAIL':
        return selectedTicket ? (
          <TicketDetail 
            ticket={selectedTicket} 
            onBack={() => setCurrentView('INBOX')}
            onResolve={handleResolveTicket}
            onEscalate={handleEscalateTicket}
            onSnooze={handleSnoozeTicket}
          />
        ) : (
          <Inbox 
            tickets={filteredTickets} 
            onSelectTicket={handleSelectTicket} 
            currentFilter={inboxFilter}
            onFilterChange={setInboxFilter}
          />
        );
      case 'DASHBOARD':
        return <Dashboard />;
      case 'TEAM':
        return <Team />;
      case 'SETTINGS':
        return <Settings />;
      default:
        return (
          <Inbox 
            tickets={filteredTickets} 
            onSelectTicket={handleSelectTicket} 
            currentFilter={inboxFilter}
            onFilterChange={setInboxFilter}
          />
        );
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900">
      <Sidebar currentView={currentView} onChangeView={setCurrentView} />
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;