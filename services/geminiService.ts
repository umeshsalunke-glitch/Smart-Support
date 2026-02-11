import { GoogleGenAI } from "@google/genai";
import { Ticket } from "../types";

// Helper to check for key without exposing it in code text
const hasKey = () => !!process.env.API_KEY;

export const generateDraftResponse = async (ticket: Ticket, tone: string, instruction?: string): Promise<string> => {
  if (!hasKey()) {
    console.warn("No API Key provided. Using mock response.");
    return `[Mock AI (${tone})]: Based on your request to "${instruction || 'reply'}", here is a draft...\n\nHi ${ticket.customer.name},\n\nThank you for reaching out regarding ${ticket.subject}. We are looking into it.`;
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    You are an expert customer support agent.
    
    Context:
    Customer Name: ${ticket.customer.name}
    Issue: ${ticket.description}
    Detected Issue Category: ${ticket.aiDetectedIssue}
    Current Tier: ${ticket.customer.tier}
    
    Task: Write a response to the customer.
    Tone: ${tone}
    Additional Instructions: ${instruction || "Be concise and helpful."}
    
    Return ONLY the email body text.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview', // Using fast model for interactive drafts
      contents: prompt,
    });
    return response.text || "I'm having trouble generating a draft right now.";
  } catch (error) {
    console.error("Gemini API Error", error);
    return "Error connecting to AI service.";
  }
};

export const analyzeEscalation = async (ticket: Ticket): Promise<{ reason: string; recommendedTeam: string }> => {
   if (!hasKey()) {
    return {
      reason: "Complex technical issue involving production infrastructure.",
      recommendedTeam: "Level 3 - Engineering Support"
    };
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = `
    Analyze this support ticket for escalation.
    Ticket: ${ticket.description}
    Subject: ${ticket.subject}
    
    Output JSON with format: { "reason": string, "recommendedTeam": string }
  `;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
    });
    return JSON.parse(response.text || '{}');
  } catch (e) {
      return { reason: "AI Analysis failed", recommendedTeam: "General Support" };
  }
}