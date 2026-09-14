# Brancher Supabase et n8n

## 1. Créer le schéma

Dans Supabase, ouvre **SQL Editor**, colle le contenu de `supabase/schema.sql`, puis exécute-le.

## 2. Configurer l’application

Copie `.env.example` en `.env.local`, puis renseigne :

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `JOBFLOW_DEMO_USER_ID` avec l’UUID d’un utilisateur existant
- `SUPABASE_SECRET_KEY` et `N8N_JOBFLOW_WEBHOOK_SECRET` pour l’automatisation n8n

L’application utilise temporairement cet UUID côté serveur pour afficher les données. Dès que Supabase Auth est ajouté, il devra être remplacé par l’utilisateur connecté : la `service_role key` ne doit jamais passer au navigateur.

## 3. Configurer n8n

Deux intégrations sont possibles. La plus simple consiste à utiliser le connecteur Supabase dans n8n avec la **service_role key** uniquement dans n8n (jamais dans une variable `NEXT_PUBLIC_*`) :

1. insérer ou mettre à jour l’offre dans `job_offers` avec un `external_id` stable ;
2. insérer ou mettre à jour le score dans `matches` pour le `user_id` concerné ;
3. après validation de l’utilisateur, insérer une ligne dans `applications`.

Le dashboard lira automatiquement les tables `matches`, `job_offers` et `applications`. S’il n’y a pas encore de configuration valide, il conserve les données de démonstration.

Sinon, n8n peut appeler `POST /api/n8n/sync` avec l’en-tête `x-jobflow-secret` et ce format :

```json
{
  "userId": "uuid-du-profil",
  "offers": [{
    "externalId": "reliefweb-12345",
    "title": "Responsable de programme santé",
    "company": "ALIMA",
    "location": "Kinshasa · Hybride",
    "source": "ReliefWeb",
    "sourceUrl": "https://…",
    "score": 94
  }]
}
```

## Sécurité

- N’ajoute jamais de `service_role key` dans une variable `NEXT_PUBLIC_*`.
- Garde `.env.local` hors du dépôt.
- Les politiques RLS du schéma limitent la lecture aux lignes de l’utilisateur connecté.
