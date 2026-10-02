# Rapport – TP Intégration de dashboard assistée par IA

> Transparence : l'analyse de la maquette (Étape 0) et le code ont été produits avec Claude Code.

## Ce que l'IA a mal fait, et pourquoi
- **Rustines CSS** : un `!important` dans le bloc reduced-motion et des règles en double et contradictoires pour l'icône d'aide sur tablette. Elle écrit vite, empile les règles et ne se relit pas tant qu'on ne le lui demande pas.
- **Valeur codée en dur** : la couleur du dégradé du graphique était écrite en hexadécimal dans le JS au lieu d'utiliser le token `--color-primary`. Rien dans le prompt n'interdisait de dupliquer les valeurs.
- **Décisions prises seule sur les ambiguïtés de la maquette** : icône € ajoutée à la card CA, écarts réguliers entre les cards, points du graphique replacés sur la courbe, bouton période masqué sur mobile, tableau en scroll horizontal. Les choix sont défendables, mais personne ne les a validés.
- **Faux diagnostic** : à la première capture mobile, la page semblait déborder. Le problème venait en fait de la largeur minimale de la fenêtre en mode headless. Il a fallu revérifier dans une vraie largeur de 375 px.

## Ce que j'ai appris sur le cadrage
- Lister les incohérences de la maquette dans le prompt et exiger que l'IA pose la question au lieu de trancher.
- Interdire explicitement `!important`, les styles inline et les valeurs hors tokens : sinon, elle les utilise.
- Découper en sous-tâches (HTML → CSS mobile → tablette → desktop → JS) et valider chaque étape en mode Plan.
- Ne jamais croire l'IA quand elle dit « c'est responsive » : vérifier soi-même en redimensionnant la fenêtre.

## Fichiers de l'Étape 3
- [CLAUDE.md](CLAUDE.md)
- [design-tokens.md](design-tokens.md)
