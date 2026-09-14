import { NextRequest, NextResponse } from "next/server";
import { isSupabaseAdminConfigured, supabaseAdminQuery } from "../../../../lib/supabase";

type ApplyPayload = {
  matchId: string;
  role: string;
  company: string;
};

type StoredApplication = {
  id: string;
  user_id: string;
  job_offer_id: string;
  status: string;
  sent_at: string;
};

type StoredMatch = {
  id: string;
  job_offer_id: string;
  user_id: string;
};

export async function POST(request: NextRequest) {
  const userId = process.env.JOBFLOW_DEMO_USER_ID;
  const body = (await request.json().catch(() => null)) as ApplyPayload | null;

  if (!body || typeof body.matchId !== "string" || !body.role || !body.company) {
    return NextResponse.json({ error: "Données de candidature incomplètes." }, { status: 400 });
  }

  const currentDateFormatted = new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date());

  // Mode Supabase Live
  if (isSupabaseAdminConfigured() && userId && !userId.startsWith("00000000")) {
    try {
      // 1. Trouver le job_offer_id associé au match
      const matches = await supabaseAdminQuery<StoredMatch[]>(
        `matches?id=eq.${body.matchId}&select=id,job_offer_id,user_id&limit=1`
      );

      const match = matches[0];
      if (!match) {
        return NextResponse.json({ error: "Opportunité introuvable." }, { status: 404 });
      }

      // 2. Insérer la candidature dans Supabase
      const applications = await supabaseAdminQuery<StoredApplication[]>(
        "applications",
        {
          method: "POST",
          prefer: "return=representation",
          body: {
            user_id: userId,
            job_offer_id: match.job_offer_id,
            status: "Envoyée",
            sent_at: new Date().toISOString(),
          },
        }
      );

      const created = applications[0];

      return NextResponse.json({
        success: true,
        application: {
          id: created ? created.id : `app-${Date.now()}`,
          role: body.role,
          company: body.company,
          date: currentDateFormatted,
          status: "Envoyée" as const,
        },
      });
    } catch (error) {
      console.error("Erreur lors de l'enregistrement de la candidature:", error);
      return NextResponse.json({ error: "Échec de l'enregistrement en base." }, { status: 500 });
    }
  }

  // Mode Démonstration sans Supabase
  return NextResponse.json({
    success: true,
    application: {
      id: `mock-app-${Date.now()}`,
      role: body.role,
      company: body.company,
      date: currentDateFormatted,
      status: "Envoyée" as const,
    },
  });
}
