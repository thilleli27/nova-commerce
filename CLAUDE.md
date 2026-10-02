# Contexte du projet
Dashboard e-commerce « Nova Commerce », intégré à partir d'une maquette Figma (desktop 1440, tablette 768, mobile 375).
Les valeurs visuelles sont dans `design-tokens.md` : ne jamais inventer une couleur, un espacement ou une taille hors de ce fichier.

## Stack
- HTML5 sémantique
- CSS natif, variables CSS (pas de Bootstrap, Tailwind, préprocesseur)
- JavaScript vanilla, sans librairie (le graphique est un SVG généré en JS)
- Police Inter (Google Fonts)

## Structure de fichiers
- index.html
- css/style.css (ordre : tokens → base → composants → layout → media queries → préférences)
- js/script.js
- assets/maquette/ (exports PDF de la maquette)

## Règles HTML
- Landmarks : aside (sidebar) > nav, header, main, section par bloc
- Un seul h1 (« Tableau de bord »), h2 par card, h3 pour les libellés KPI
- Tableau : caption, th scope="col"
- Icônes SVG inline avec aria-hidden="true" ; tout bouton icône a un aria-label
- Lien d'évitement « Aller au contenu principal »

## Règles CSS
- Mobile first : breakpoints min-width 768px et 1024px, rien d'autre
- Nommage BEM (`.kpi__value`, `.badge--success`), états en `.is-*`
- Jamais de style inline, jamais de `!important`
- Toujours passer par les variables de `:root`, y compris dans le JS (getComputedStyle)
- Focus visible sur tout élément interactif (`:focus-visible`)
- Contraste texte ≥ 4.5:1 : texte secondaire en `--color-text-muted`, jamais plus clair

## Comportement responsive attendu
- < 768px : sidebar en panneau ouvert par un burger (aria-expanded, Échap, overlay), recherche derrière une icône, KPI en 1 colonne, tableau en scroll horizontal, emails masqués, bouton période masqué
- 768–1023px : sidebar en rail d'icônes (libellés gardés pour les lecteurs d'écran), KPI en 2×2, avatar sans nom
- ≥ 1024px : sidebar complète 240px, KPI en 4 colonnes, nom et rôle de l'utilisateur affichés

## Méthode de travail
- Toujours commencer en mode Plan et attendre ma validation
- Une sous-tâche à la fois (structure HTML → CSS mobile → tablette → desktop → JS), je valide entre chaque
- Si la maquette est ambiguë ou incohérente, me poser la question au lieu de trancher seul
- Vérifier le rendu dans un vrai navigateur aux 3 largeurs avant de dire que c'est fini
