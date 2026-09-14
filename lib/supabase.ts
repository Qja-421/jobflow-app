type QueryOptions = {
  method?: "GET" | "POST" | "PATCH";
  body?: unknown;
  prefer?: string;
};

const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceRoleKey = process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;

export function isSupabaseConfigured() {
  return Boolean(url && anonKey && !url.includes("your-project") && !anonKey.includes("your-anon"));
}

export function isSupabaseAdminConfigured() {
  return isSupabaseConfigured() && Boolean(serviceRoleKey && !serviceRoleKey.includes("your-service"));
}

/**
 * Client REST léger, réservé au serveur. Les accès sont contrôlés par les
 * politiques RLS déclarées dans supabase/schema.sql.
 */
export async function supabaseQuery<T>(path: string, options: QueryOptions = {}): Promise<T> {
  return querySupabase<T>(path, anonKey, options);
}

/** À appeler uniquement depuis les routes serveur déclenchées par n8n. */
export async function supabaseAdminQuery<T>(path: string, options: QueryOptions = {}): Promise<T> {
  return querySupabase<T>(path, serviceRoleKey, options, true);
}

async function querySupabase<T>(path: string, key: string | undefined, options: QueryOptions, requireAdmin = false): Promise<T> {
  if (requireAdmin ? !isSupabaseAdminConfigured() : !isSupabaseConfigured()) {
    throw new Error("Supabase n’est pas configuré.");
  }

  const response = await fetch(`${url}/rest/v1/${path}`, {
    method: options.method ?? "GET",
    headers: {
      apikey: key!,
      Authorization: `Bearer ${key!}`,
      "Content-Type": "application/json",
      ...(options.prefer ? { Prefer: options.prefer } : {}),
    },
    ...(options.body ? { body: JSON.stringify(options.body) } : {}),
    cache: "no-store",
  });

  if (!response.ok) throw new Error(`Supabase a répondu ${response.status}.`);
  return response.json() as Promise<T>;
}
