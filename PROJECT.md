# Projet : JobFlow — Plateforme SaaS d'automatisation de recherche d'emploi et de candidature

## Contexte produit
Plateforme web (landing page + dashboard client) pour un SaaS qui automatise, pour chaque utilisateur abonné :
- la surveillance de portails d'offres d'emploi (LinkedIn, Indeed, ReliefWeb, Impactpool, portails africains/congolais),
- le matching IA entre l'offre et le profil du candidat,
- la génération automatique de CV et lettres de motivation adaptés,
- la candidature automatique ou semi-automatique (validation en un clic) sur ces portails.

L'orchestration backend se fait via n8n + Supabase + API IA (Groq/Claude) ; le frontend consomme ces données via API/Supabase.

## Livrables attendus
1. **Landing page marketing** : hero, proposition de valeur, comment ça marche, tarifs, logos partenaires/portails supportés, CTA final.
2. **Dashboard client** : vue des offres matchées, statut des candidatures, CV/lettres générés, métriques (nb offres trouvées, nb candidatures envoyées, taux de réponse).

## Stack technique
- Next.js + React + Tailwind CSS (v4 si possible, sinon config classique)
- Composants réutilisables, responsive (mobile-first)
- Données mockées pour l'instant (pas de vraie connexion Supabase à ce stade)

## Structure de la landing page
1. Nav (logo "JOBFLOW" + liens Produit / Tarifs / Comment ça marche / Contact + bouton "Essayer")
2. Hero : titre fort (ex. "Votre recherche d'emploi, automatisée."), sous-titre, 2 boutons (CTA + démo), à droite un dashboard preview (screenshot-style, données mockées)
3. Logo strip : portails supportés (LinkedIn, Indeed, ReliefWeb, Impactpool, etc.)
4. Feature cards (3-4) : "Recherche automatique", "Matching IA", "CV & lettres générés", "Candidature en 1 clic"
5. Section "Comment ça marche" en 3-4 étapes numérotées
6. Tarifs : 2 offres (Standard / Premium) en cards
7. CTA final (light card #eeeeee, texte foncé, bouton sombre)
8. Footer

## Structure du dashboard
1. Sidebar ou top nav simple : Offres / Candidatures / CV & Lettres / Paramètres
2. Rangée de metric tiles en haut : "Offres trouvées cette semaine", "Candidatures envoyées", "Taux de réponse", "Offres en attente de validation"
3. Liste des offres matchées avec score de pertinence, bouton "Valider la candidature"
4. Suivi des statuts de candidature (Envoyée / En attente / Réponse reçue)

## Données mockées
Toutes les données affichées doivent être réalistes et en français (noms d'offres, entreprises, statuts).
