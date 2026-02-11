import { Ticket, TicketStatus, Priority, Sentiment, Tier } from '../types';

const generateDate = (minutesAgo: number) => {
  const date = new Date();
  date.setMinutes(date.getMinutes() - minutesAgo);
  return date.toISOString();
};

const slaDate = (hoursAhead: number) => {
  const date = new Date();
  date.setHours(date.getHours() + hoursAhead);
  return date.toISOString();
};

export const MOCK_TICKETS: Ticket[] = [
  {
    id: 'T-1024',
    customerId: 'C-001',
    customer: {
      id: 'C-001',
      name: 'Sarah Chen',
      email: 'sarah.c@techcorp.io',
      tier: Tier.ENTERPRISE,
      ltv: 12500,
      avatarUrl: 'https://picsum.photos/200/200?random=1',
      churnRisk: 12,
    },
    subject: 'API Rate Limiting interfering with production',
    description: "Hi support, we're seeing 429 errors on our production endpoint starting 20 minutes ago. We are on the Enterprise plan and shouldn't be hitting limits yet. This is blocking our checkout flow.",
    receivedAt: generateDate(15),
    status: TicketStatus.OPEN,
    priority: Priority.CRITICAL,
    aiConfidence: 94,
    aiSummary: "Customer reports 429 errors (Rate Limiting) on production endpoints despite Enterprise tier. Blocking checkout flow.",
    aiDetectedIssue: "API Infrastructure / False Positive Limit",
    aiReasoning: [
      "Customer is Enterprise Tier (Unlimited API access).",
      "Keywords '429 error' and 'blocking checkout' indicate high urgency.",
      "System logs show a spike in traffic from their IP triggered DDOS protection erroneously."
    ],
    suggestedResponse: "Hi Sarah,\n\nI've immediately investigated the 429 errors you're seeing. It looks like our automated DDOS protection triggered a false positive due to the traffic spike. I have manually whitelisted your production IP range, and the errors should subside within the next 2 minutes.\n\nI'll monitor this closely for the next hour to ensure stability.\n\nBest,\n[Agent Name]",
    slaBreachAt: slaDate(1),
    sentiment: Sentiment.NEGATIVE,
    tags: ['Technical', 'Urgent', 'Enterprise']
  },
  {
    id: 'T-1025',
    customerId: 'C-002',
    customer: {
      id: 'C-002',
      name: 'Marcus Johnson',
      email: 'marcus@startuplab.com',
      tier: Tier.PRO,
      ltv: 850,
      avatarUrl: 'https://picsum.photos/200/200?random=2',
      churnRisk: 5,
    },
    subject: 'How do I invite a teammate?',
    description: "Hey, just upgraded to Pro but can't find the invite button. Can you help?",
    receivedAt: generateDate(45),
    status: TicketStatus.OPEN,
    priority: Priority.LOW,
    aiConfidence: 99,
    aiSummary: "User needs help locating the 'Invite Team Member' functionality after upgrading to Pro.",
    aiDetectedIssue: "UX / Navigation Support",
    aiReasoning: [
      "Question matches FAQ #402 exactly.",
      "User status is confirmed as Pro.",
      "Low sentiment risk."
    ],
    suggestedResponse: "Hi Marcus,\n\nWelcome to Pro! You can invite your team by going to Settings > Team Members and clicking the blue 'Invite' button in the top right corner.\n\nHere is a quick link: [Link to Settings]\n\nLet me know if you have any trouble finding it!\n\nCheers,\n[Agent Name]",
    slaBreachAt: slaDate(4),
    sentiment: Sentiment.POSITIVE,
    tags: ['How-to', 'Onboarding']
  },
  {
    id: 'T-1026',
    customerId: 'C-003',
    customer: {
      id: 'C-003',
      name: 'Elena Rodriguez',
      email: 'elena@vandalay.com',
      tier: Tier.FREE,
      ltv: 0,
      avatarUrl: 'https://picsum.photos/200/200?random=3',
      churnRisk: 85,
    },
    subject: 'Refund request - extremely unhappy',
    description: "I was charged for a Pro subscription I didn't authorize. I want my money back immediately or I will file a chargeback. This is ridiculous.",
    receivedAt: generateDate(120),
    status: TicketStatus.OPEN,
    priority: Priority.HIGH,
    aiConfidence: 72,
    aiSummary: "Customer demands refund for unauthorized Pro charge. Threatening chargeback.",
    aiDetectedIssue: "Billing / Refund / Churn Risk",
    aiReasoning: [
      "Detected high negative sentiment and keywords 'chargeback', 'ridiculous'.",
      "Refund policy allows full refund within 7 days.",
      "Billing history shows trial ended yesterday."
    ],
    suggestedResponse: "Hi Elena,\n\nI completely understand your concern. It looks like your trial automatically converted to a subscription yesterday. Since you caught this immediately, I have processed a full refund of $29.00 right now. You should see it on your statement in 3-5 business days.\n\nI've also downgraded your account back to Free so no future charges will occur.\n\nSincere apologies for the surprise.\n\nBest,\n[Agent Name]",
    slaBreachAt: slaDate(2),
    sentiment: Sentiment.ANGRY,
    tags: ['Billing', 'Refund', 'Risk']
  },
  {
    id: 'T-1027',
    customerId: 'C-004',
    customer: {
      id: 'C-004',
      name: 'David Kim',
      email: 'david.k@enterprise.net',
      tier: Tier.ENTERPRISE,
      ltv: 45000,
      avatarUrl: 'https://picsum.photos/200/200?random=4',
      churnRisk: 2,
    },
    subject: 'Custom SSO Integration Issue',
    description: "We are trying to configure SAML with Okta but getting a 500 error on the callback URL. Logs attached.",
    receivedAt: generateDate(300),
    status: TicketStatus.ESCALATED,
    priority: Priority.MEDIUM,
    aiConfidence: 65,
    aiSummary: "Enterprise customer facing 500 errors during SAML SSO setup with Okta.",
    aiDetectedIssue: "Technical / Integration",
    aiReasoning: [
      "Complex integration issue requiring log analysis.",
      "AI lacks access to backend logs for this specific error code.",
      "Escalated to Solutions Engineering."
    ],
    suggestedResponse: "",
    slaBreachAt: slaDate(24),
    sentiment: Sentiment.NEUTRAL,
    tags: ['Technical', 'SSO', 'Escalated']
  },
  {
    id: 'T-1028',
    customerId: 'C-005',
    customer: {
      id: 'C-005',
      name: 'Priya Patel',
      email: 'priya@agency.design',
      tier: Tier.PRO,
      ltv: 1200,
      avatarUrl: 'https://picsum.photos/200/200?random=5',
      churnRisk: 8,
    },
    subject: 'Feature Request: Dark Mode',
    description: "Any updates on when dark mode is coming? My eyes are burning.",
    receivedAt: generateDate(1440),
    status: TicketStatus.PENDING, // Snoozed
    priority: Priority.LOW,
    aiConfidence: 98,
    aiSummary: "User inquiring about Dark Mode release date.",
    aiDetectedIssue: "Feature Request",
    aiReasoning: [
      "Feature request tag identified.",
      "Snoozed until next product release update."
    ],
    suggestedResponse: "",
    slaBreachAt: slaDate(48),
    sentiment: Sentiment.NEUTRAL,
    tags: ['Feature Request', 'Snoozed']
  }
];