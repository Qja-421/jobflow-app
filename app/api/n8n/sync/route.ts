import { NextRequest, NextResponse } from "next/server";
import { isSupabaseAdminConfigured, supabaseAdminQuery } from "../../../../lib/supabase";

type IncomingOffer = {
  externalId: string;
  title: string;
  company: string;
  location: string;
  source: string;
  sourceUrl?: string;
  publishedAt?: string;
  score: number;
};

type SyncPayload = { userId: string; offers: IncomingOffer[] };
type StoredOffer = { id: string };

const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function hasValidPayload(value: unknown): value is SyncPayload {
  if (!value || typeof value !== "object") return false;
  const payload = value as Partial<SyncPayload>;
  return typeof payload.userId === "string" && uuidPattern.test(payload.userId) && Array.isArray(payload.offers) && payload.offers.length <= 100 && payload.offers.every((offer) => typeof offer.externalId === "string" && typeof offer.title === "string" && typeof offer.company === "string" && typeof offer.location === "string" && typeof offer.source === "string" && Number.isFinite(offer.score) && offer.score >= 0 && offer.score <= 100);
}

/**
 * Endpoint à appeler depuis n8n après le matching IA.
 * Header requis : x-jobflow-secret: valeur de N8N_JOBFLOW_WEBHOOK_SECRET
 */
export async function POST(request: NextRequest) {
  const expectedSecret = process.env.N8N_JOBFLOW_WEBHOOK_SECRET;
  if (!expectedSecret || request.headers.get("x-jobflow-secret") !== expectedSecret) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }
  if (!isSupabaseAdminConfigured()) {
    return NextResponse.json({ error: "Supabase serveur n’est pas configuré." }, { status: 503 });
  }

  const body: unknown = await request.json().catch(() => null);
  if (!hasValidPayload(body)) return NextResponse.json({ error: "Format de synchronisation invalide." }, { status: 400 });

  try {
    for (const offer of body.offers) {
      const stored = await supabaseAdminQuery<StoredOffer[]>("job_offers?on_conflict=external_id", {
        method: "POST",
        prefer: "resolution=merge-duplicates,return=representation",
        body: {
          external_id: offer.externalId,
          title: offer.title,
          company: offer.company,
          location: offer.location,
          source: offer.source,
          source_url: offer.sourceUrl ?? null,
          published_at: offer.publishedAt ?? new Date().toISOString(),
        },
      });
      const jobOffer = stored[0];
      if (!jobOffer) throw new Error("L’offre n’a pas été enregistrée.");

      await supabaseAdminQuery("matches?on_conflict=user_id,job_offer_id", {
        method: "POST",
        prefer: "resolution=merge-duplicates",
        body: {
          user_id: body.userId,
          job_offer_id: jobOffer.id,
          score: Math.round(offer.score),
          status: offer.score >= 85 ? "ready" : "reviewing",
        },
      });
    }
    return NextResponse.json({ synced: body.offers.length });
  } catch (error) {
    console.error("Synchronisation n8n impossible.", error);
    return NextResponse.json({ error: "La synchronisation a échoué." }, { status: 502 });
  }
}
