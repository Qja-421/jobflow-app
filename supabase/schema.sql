-- JobFlow — à exécuter dans Supabase SQL Editor avant de configurer n8n.
create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.job_offers (
  id uuid primary key default gen_random_uuid(),
  external_id text unique,
  title text not null,
  company text not null,
  location text not null,
  source text not null,
  source_url text,
  published_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create table if not exists public.matches (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  job_offer_id uuid not null references public.job_offers(id) on delete cascade,
  score smallint not null check (score between 0 and 100),
  status text not null default 'reviewing' check (status in ('reviewing', 'pending', 'ready', 'dismissed')),
  created_at timestamptz not null default now(),
  unique(user_id, job_offer_id)
);

create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  job_offer_id uuid not null references public.job_offers(id) on delete cascade,
  status text not null default 'Envoyée' check (status in ('Envoyée', 'En attente', 'Réponse reçue')),
  sent_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists matches_user_created_at_idx on public.matches(user_id, created_at desc);
create index if not exists applications_user_sent_at_idx on public.applications(user_id, sent_at desc);

alter table public.profiles enable row level security;
alter table public.job_offers enable row level security;
alter table public.matches enable row level security;
alter table public.applications enable row level security;

-- Un utilisateur connecté ne lit que son tableau de bord et les offres qui y sont associées.
create policy "profiles are private" on public.profiles for select using (auth.uid() = id);
create policy "users read their matches" on public.matches for select using (auth.uid() = user_id);
create policy "users read their applications" on public.applications for select using (auth.uid() = user_id);
create policy "users read matched offers" on public.job_offers for select using (
  exists (select 1 from public.matches where matches.job_offer_id = job_offers.id and matches.user_id = auth.uid())
);

-- n8n doit écrire avec la service_role key via le connecteur Supabase : elle contourne RLS côté serveur.
