# Workflow n8n — JobFlow Production IA Job Matcher

Ce dossier contient le workflow officiel de production pour orchestrer la recherche d'emploi et le matching IA dans **JobFlow**.

---

## 🏗️ Architecture du Workflow (`jobflow-reliefweb-scraper-matching.json`)

Le workflow est découpé en 9 étapes séquentielles :

1. **`1. Déclencheur Planifié`** : Déclenchement automatique toutes les 4h (ou bouton *Execute Workflow* pour tester manuellement).
2. **`2. Charger Profil Candidat`** : Interroge la table `profiles` de Supabase avec la clé de service pour récupérer le nom et les critères du candidat (`JOBFLOW_DEMO_USER_ID`).
3. **`3. Scraper ReliefWeb (RDC / Humanitaire)`** : Fait une requête POST ciblée sur l'API officielle ReliefWeb pour récupérer les 10 dernières offres publiées en RDC.
4. **`4. Préparer les Offres pour l'IA`** : Découpe les offres et injecte le contexte du profil pour le traitement par lot.
5. **`5. LLM Matching & Génération de Lettre`** : Envoie à l'IA (OpenAI `gpt-4o-mini` ou Groq `llama-3.3-70b-versatile`) avec un prompt système strict en JSON :
   - Évaluation de la correspondance (score 0 à 100).
   - Résumé des points forts.
   - Rédaction d'une lettre de motivation sur-mesure en français.
6. **`6. Normaliser Résultat IA`** : Décode la réponse JSON du LLM et associe chaque analyse à son offre.
7. **`7. Filtrer Score >= 70%`** : Élimine les offres non pertinentes pour ne garder que les opportunités qualifiées.
8. **`8. Assembler Payload Sync`** : Construit le tableau final conforme au contrat d'interface JobFlow.
9. **`9. Synchroniser vers JobFlow (Live)`** : Envoie le tout en `POST /api/n8n/sync` avec le header d'authentification `x-jobflow-secret`.

---

## 🚀 Comment l'importer et le faire tourner

### 1. Importer dans n8n
1. Ouvrez votre instance n8n (`http://localhost:5678` ou n8n Cloud).
2. Cliquez sur **Workflows** > **Add Workflow**.
3. En haut à droite, menu **⋮** > **Import from File...** > choisissez `n8n/jobflow-reliefweb-scraper-matching.json`.

### 2. Variables requises dans n8n
Dans les paramètres de n8n (ou dans les nœuds correspondants), vérifiez que vous avez défini :

| Variable | Description | Exemple |
| :--- | :--- | :--- |
| `OPENAI_API_KEY` ou `GROQ_API_KEY` | Clé API pour le modèle IA | `sk-proj-...` ou `gsk_...` |
| `NEXT_PUBLIC_SUPABASE_URL` | Endpoint Supabase | `https://kabwfcmpobsljdyclxoa.supabase.co` |
| `SUPABASE_SECRET_KEY` | Clé de service Supabase | Présente dans votre `.env.local` |
| `N8N_JOBFLOW_WEBHOOK_SECRET` | Secret d'authentification | `290094a95e9d42feaf377cc0bca6b905a6b3b9a25a1d4ac38f9d0949d619acb9` |
| `JOBFLOW_APP_URL` | URL de l'app JobFlow | `http://localhost:3000` (ou votre URL de prod) |

### 3. Exécution & Résultat
Cliquez sur **"Test workflow"** : en quelques secondes, n8n scrap les offres, fait le matching par IA, génère les lettres et peuple directement votre dashboard JobFlow !
