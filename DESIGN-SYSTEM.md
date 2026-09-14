# Design System — "Factory" (dark, terminal war room)

## Palette
```
--color-obsidian-canvas: #101010;   /* fond de page */
--color-carbon-lift: #1d1a18;       /* surfaces surélevées, nav, boutons */
--color-ash-stroke: #3d3a39;        /* bordures fines */
--color-graphite-mid: #4d4947;      /* fills neutres charts */
--color-warm-granite: #8a8380;      /* texte secondaire */
--color-pale-stone: #b8b3b0;        /* texte tertiaire */
--color-bone: #eeeeee;              /* texte principal + cartes claires */
--color-chalk: #fafafa;             /* bouton clair haute emphase */
--color-signal-orange: #ee6018;     /* accent data/statut live UNIQUEMENT */
--color-metric-green: #a0ca92;      /* accent tendance positive UNIQUEMENT */
```

## Typographie
- Police principale : Geist (fallback Inter, system-ui), poids 400 quasi partout, 500 seulement pour emphase forte (ex. titres footer).
- Police mono : Geist Mono (fallback JetBrains Mono), UNIQUEMENT en 12px uppercase, tracking serré — pour labels, statuts, eyebrows, en-têtes de colonnes.
- Échelle : caption 12px / body-sm 14px / body 16px / heading 36px / heading-lg 44px / display 72px.
- Letter-spacing négatif proportionnel à la taille (-0.04em à 72px, -0.025em à 44px, -0.02em à 12px).
- Line-height jamais au-dessus de 1.5.

## Espacement & formes
- Base unit : 8px. Gap de section : 96px+. Card padding : 24px.
- Border-radius : 3px (boutons/nav), 10px (cards), 20px (grands panneaux). Jamais plus arrondi.
- Aucune ombre portée, aucun blur/glow. La profondeur vient UNIQUEMENT du contraste figure/fond (carte #eeeeee sur canvas #101010).

## Composants clés à reproduire
- **Nav top bar** : transparente sur fond #101010, wordmark en Geist Mono 12px uppercase, hauteur ~64px.
- **Bouton clair** : #fafafa fill, texte foncé, radius 3px — action principale (ex. "Essayer gratuitement").
- **Bouton sombre** : #1d1a18 fill, texte #eeeeee, radius 3px — actions secondaires.
- **Lien ghost** : transparent, bordure 1px #3d3a39, radius 0, texte #eeeeee.
- **Card claire** : #eeeeee, radius 10px, padding 24px, texte foncé à l'intérieur — seul objet "brillant" autorisé sur fond noir, pour CTA et sections featured.
- **Dashboard frame** : façon fenêtre macOS (points traffic-light), fond #0d0d0d, radius 10px, contenu = grille de "metric tiles".
- **Metric tile** : pas de fond, bordure fine 1px #1d1a18, label Geist Mono 12px uppercase #b8b3b0, valeur Geist 36px #eeeeee, mini sparkline 40px en #ee6018 (négatif) ou #a0ca92 (positif).
- **Status pulse** : petit cercle plein 6px en #ee6018 devant un label "live".
- **Logo strip** : simple ligne de wordmarks en #8a8380, pas de cartes, pas de séparateurs.
- **Footer** : fond #101010, colonnes de liens #8a8380, titres en Geist Mono uppercase #eeeeee.

## Règles strictes (Do/Don't)
- Ne jamais utiliser l'orange ou le vert comme fond de bouton ou de carte — réservés aux indicateurs de données/statut.
- Ne jamais utiliser un poids de police > 500.
- Ne jamais ajouter d'ombre, de blur ou de dégradé pour simuler la profondeur.
- Ne pas dépasser les radius indiqués.
- Transitions courtes et mécaniques (0.15–0.2s, cubic-bezier(0.4,0,0.2,1)) — pas d'effet spring/parallax.

## CSS Custom Properties
```css
:root {
  --color-obsidian-canvas: #101010;
  --color-carbon-lift: #1d1a18;
  --color-ash-stroke: #3d3a39;
  --color-graphite-mid: #4d4947;
  --color-warm-granite: #8a8380;
  --color-pale-stone: #b8b3b0;
  --color-bone: #eeeeee;
  --color-chalk: #fafafa;
  --color-signal-orange: #ee6018;
  --color-metric-green: #a0ca92;

  --font-geist: 'Geist', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-geist-mono: 'Geist Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;

  --text-caption: 12px;
  --text-body-sm: 14px;
  --text-body: 16px;
  --text-heading: 36px;
  --text-heading-lg: 44px;
  --text-display: 72px;

  --spacing-8: 8px;
  --spacing-16: 16px;
  --spacing-24: 24px;
  --spacing-32: 32px;
  --spacing-40: 40px;
  --spacing-56: 56px;
  --spacing-80: 80px;
  --spacing-96: 96px;
  --spacing-120: 120px;

  --radius-nav: 3px;
  --radius-cards: 10px;
  --radius-buttons: 3px;
  --radius-largepanels: 20px;
}
```
