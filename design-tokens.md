# Design tokens – Nova Commerce

Valeurs relevées sur la maquette (à confirmer dans Figma avec « Copier en tant que CSS »).
Elles sont déclarées dans `css/style.css`, section `:root`.

## Couleurs
| Token | Valeur | Usage |
|---|---|---|
| --color-primary | #2563eb | lien actif, logo, courbe, liens |
| --color-primary-hover | #1d4ed8 | survol bouton primaire |
| --color-primary-soft | #eff4ff | fond des icônes KPI |
| --color-sidebar | #0f1b33 | fond sidebar |
| --color-sidebar-soft | #1a2945 | card d'aide, survol nav |
| --color-sidebar-text | #cbd5e1 | texte sidebar |
| --color-bg | #f5f7fb | fond de page, champ recherche |
| --color-surface | #ffffff | cards, header |
| --color-border | #e6eaf0 | bordures, grille du graphique |
| --color-text | #0f172a | texte principal |
| --color-text-muted | #64748b | texte secondaire, axes (contraste 4.7:1) |
| --color-thead | #f8fafc | en-tête du tableau, survol ligne |
| --color-success / -soft | #15803d / #e8f7ee | « Livrée », tendance + |
| --color-warning / -soft | #b45309 / #fef3e2 | « En préparation » |
| --color-danger / -soft | #dc2626 / #fdecec | « Annulée », tendance −, pastille notif |

Avatars (fonds pastel) : blue #e0e9ff, green #dff5e8, pink #fde4ef, orange #feecd6, purple #ebe5fd, teal #daf3f3, beige #f3ebe1.

## Espacements (base 4px)
--space-1: 4px · --space-2: 8px · --space-3: 12px · --space-4: 16px · --space-5: 20px · --space-6: 24px · --space-8: 32px

- Gouttière de page : 16px mobile, 24px tablette, 32px desktop
- Écart entre cards : 16px mobile, 20px tablette et desktop

## Typographie (Inter)
| Token | Taille | Usage |
|---|---|---|
| --font-xs | 11px | badges, sous-titres, en-têtes de tableau |
| --font-sm | 13px | nav, libellés KPI, cellules |
| --font-md | 14px | texte de base |
| --font-base | 16px | titres de card |
| --font-kpi | 28px | valeurs KPI (poids 400) |
| --font-h1 | 28px mobile / 32px desktop | titre de page (poids 500) |

## Formes
- --radius-sm: 6px · --radius-md: 8px (boutons, nav) · --radius-lg: 12px (cards) · --radius-full: 999px (avatars, badges)
- --shadow-card: 0 1px 2px rgba(15, 23, 42, 0.04)

## Layout
- Sidebar : 240px (desktop), 72px rail (tablette), panneau 260px (mobile)
- Header : 64px de haut
- Breakpoints : 768px, 1024px
