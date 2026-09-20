export type ApplicationStatus = "Envoyée" | "En attente" | "Réponse reçue";

export type Opportunity = {
  id: string;
  role: string;
  company: string;
  location: string;
  source: string;
  sourceUrl?: string;
  score: number;
  date: string;
  ready: boolean;
};

export type Application = {
  id: string;
  role: string;
  company: string;
  date: string;
  status: ApplicationStatus;
};

export type DashboardData = {
  userName: string;
  offersThisWeek: number;
  applicationsSent: number;
  responseRate: number;
  pendingValidation: number;
  opportunities: Opportunity[];
  applications: Application[];
  documentsReady: number;
  lastSyncedAt: string;
};
