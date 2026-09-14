# Instructions pour l'agent de développement

Avant de commencer, lis dans l'ordre :
1. `PROJECT.md` — contexte produit, livrables, structure des pages
2. `DESIGN-SYSTEM.md` — design tokens, composants et règles à respecter strictement

## Ta mission
Développer les deux livrables décrits dans `PROJECT.md` (landing page + dashboard client) en respectant fidèlement les tokens de couleur, typographie et espacement définis dans `DESIGN-SYSTEM.md`.

## Consignes générales
- Stack : Next.js + React + Tailwind CSS.
- Toutes les données affichées sont mockées, réalistes, en français.
- Commence par la landing page, puis passe au dashboard une fois validée.
- Ne dévie pas du design system : pas de couleurs, radius, ombres ou poids de police hors de ceux listés dans `DESIGN-SYSTEM.md`.
- Structure le code en composants réutilisables (Nav, Button, Card, MetricTile, StatusPulse, Footer, etc.) plutôt qu'en pages monolithiques.

## Ordre de développement recommandé
1. Setup du projet (Next.js + Tailwind) + intégration des tokens du design system (CSS variables ou config Tailwind).
2. Composants de base : boutons, cards, nav, footer.
3. Landing page complète.
4. Composants dashboard : metric tile, liste d'offres, suivi de statuts.
5. Dashboard complet avec données mockées.

Une fois chaque étape terminée, montre un aperçu avant de passer à la suivante.
