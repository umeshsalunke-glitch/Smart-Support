export enum TicketStatus {
  OPEN = 'OPEN',
  PENDING = 'PENDING', // Used for Snoozed
  RESOLVED = 'RESOLVED',
  ESCALATED = 'ESCALATED'
}

export enum Priority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL'
}

export enum Sentiment {
  POSITIVE = 'POSITIVE',
  NEUTRAL = 'NEUTRAL',
  NEGATIVE = 'NEGATIVE',
  ANGRY = 'ANGRY'
}

export enum Tier {
  FREE = 'FREE',
  PRO = 'PRO',
  ENTERPRISE = 'ENTERPRISE'
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  tier: Tier;
  ltv: number; // Lifetime Value
  avatarUrl: string;
  churnRisk: number; // 0-100
}

export interface Ticket {
  id: string;
  customerId: string;
  customer: Customer;
  subject: string;
  description: string; // The raw issue
  receivedAt: string;
  status: TicketStatus;
  priority: Priority;
  
  // AI Agent Data
  aiConfidence: number; // 0-100
  aiSummary: string;
  aiDetectedIssue: string; // e.g., "Billing Dispute"
  aiReasoning: string[];
  suggestedResponse: string;
  slaBreachAt: string;
  sentiment: Sentiment;
  tags: string[];
}

export type ViewState = 'INBOX' | 'TICKET_DETAIL' | 'DASHBOARD' | 'TEAM' | 'SETTINGS';
export type InboxFilter = 'FOCUS' | 'REVIEW' | 'ESCALATED' | 'SNOOZED';
