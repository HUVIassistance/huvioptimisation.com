export type Industry = 'construction' | 'services' | 'other';

export type Challenge = 'sales' | 'administration' | 'projects' | 'communication' | 'data';

export interface SystemRecommendation {
  title: string;
  description: string;
  modules: string[];
  aiAgents: string[];
  impactEstimate: string;
}

export interface LeadSubmission {
  id: string;
  name: string;
  email: string;
  company: string;
  phone?: string;
  industry: Industry;
  challenge: Challenge;
  createdAt: string;
  recommendation: SystemRecommendation;
}
