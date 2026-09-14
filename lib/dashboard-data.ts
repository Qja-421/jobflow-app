import { isSupabaseAdminConfigured, supabaseAdminQuery } from "./supabase";
import type { Application, DashboardData, Opportunity } from "./types";

const fallbackOpportunities: Opportunity[] = [
  { id: "demo-1", role: "Responsable de programme santé", company: "ALIMA", location: "Kinshasa · Hybride", source: "ReliefWeb", score: 94, date: "Il y a 2 h", ready: true },
  { id: "demo-2", role: "Chef·fe de projet Protection", company: "Médecins du Monde", location: "Goma · Sur site", source: "Impactpool", score: 89, date: "Il y a 5 h", ready: true },
  { id: "demo-3", role: "Chargé·e de partenariats", company: "Save the Children", location: "Kinshasa · Hybride", source: "LinkedIn", score: 82, date: "Hier", ready: false },
  { id: "demo-4", role: "Coordinateur·rice MEAL", company: "ACTED", location: "Bukavu · Sur site", source: "Indeed", score: 78, date: "Hier", ready: false },
];

const fallbackApplications: Application[] = [
  { id: "application-1", role: "Programme Officer", company: "UNICEF RDC", date: "12 sept. 2026", status: "Réponse reçue" },
  { id: "application-2", role: "Responsable projets", company: "Cordaid", date: "10 sept. 2026", status: "En attente" },
  { id: "application-3", role: "Grant Manager", company: "MSF Belgique", date: "08 sept. 2026", status: "Envoyée" },
];

const fallbackData: DashboardData = {
  userName: "Mariam",
  offersThisWeek: 38,
  applicationsSent: 14,
  responseRate: 21,
  pendingValidation: 7,
  opportunities: fallbackOpportunities,
  applications: fallbackApplications,
  documentsReady: 4,
  lastSyncedAt: "aujourd’hui, 09:42",
};

type SupabaseMatch = {
  id: string;
  score: number;
  status: "pending" | "ready" | "reviewing";
  created_at: string;
  job_offers: { title: string; company: string; location: string; source: string } | null;
};

type SupabaseProfile = {
  id: string;
  full_name: string;
};

type SupabaseApplication = {
  id: string;
  status: Application["status"];
  sent_at: string;
  job_offers: { title: string; company: string } | null;
};

function relativeDate(date: string) {
  const hours = Math.round((Date.now() - new Date(date).getTime()) / 3_600_000);
  if (hours < 1) return "À l’instant";
  if (hours < 24) return `Il y a ${hours} h`;
  if (hours < 48) return "Hier";
  return new Intl.DateTimeFormat("fr-FR", { day: "2-digit", month: "short" }).format(new Date(date));
}

/** Retourne les données réelles dès que Supabase et un utilisateur sont configurés, sinon les données de démonstration. */
export async function getDashboardData(): Promise<DashboardData> {
  const userId = process.env.JOBFLOW_DEMO_USER_ID;
  if (!isSupabaseAdminConfigured() || !userId || userId.startsWith("00000000")) return fallbackData;

  try {
    const [profiles, matches, applications] = await Promise.all([
      supabaseAdminQuery<SupabaseProfile[]>(`profiles?id=eq.${userId}&select=id,full_name`).catch(() => []),
      supabaseAdminQuery<SupabaseMatch[]>(`matches?user_id=eq.${userId}&select=id,score,status,created_at,job_offers(title,company,location,source)&order=created_at.desc&limit=20`),
      supabaseAdminQuery<SupabaseApplication[]>(`applications?user_id=eq.${userId}&select=id,status,sent_at,job_offers(title,company)&order=sent_at.desc&limit=10`),
    ]);

    const userName = profiles[0]?.full_name ? profiles[0].full_name.split(" ")[0] : fallbackData.userName;

    const opportunities = matches.filter((match) => match.job_offers).map((match) => ({
      id: match.id,
      role: match.job_offers!.title,
      company: match.job_offers!.company,
      location: match.job_offers!.location,
      source: match.job_offers!.source,
      score: match.score,
      date: relativeDate(match.created_at),
      ready: match.status === "ready",
    }));
    const latestApplications = applications.filter((application) => application.job_offers).map((application) => ({
      id: application.id,
      role: application.job_offers!.title,
      company: application.job_offers!.company,
      date: new Intl.DateTimeFormat("fr-FR", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(application.sent_at)),
      status: application.status,
    }));
    const sent = applications.filter((application) => application.status === "Envoyée" || application.status === "En attente" || application.status === "Réponse reçue").length;
    const answered = applications.filter((application) => application.status === "Réponse reçue").length;

    return {
      ...fallbackData,
      userName,
      offersThisWeek: matches.length,
      applicationsSent: sent,
      responseRate: sent ? Math.round((answered / sent) * 100) : 0,
      pendingValidation: matches.filter((match) => match.status === "ready" || match.status === "pending").length,
      opportunities,
      applications: latestApplications,
      documentsReady: matches.filter((match) => match.status === "ready").length * 2,
      lastSyncedAt: "à l’instant",
    };
  } catch (error) {
    console.error("Impossible de charger le dashboard Supabase.", error);
    return fallbackData;
  }
}
