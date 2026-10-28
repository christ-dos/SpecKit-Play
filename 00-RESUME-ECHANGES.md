# Résumé de nos échanges — décisions produit

## Problème à résoudre
L'utilisation de GitHub Spec Kit depuis le terminal Claude Code est trop technique et peu ludique. L'objectif est de guider toutes les étapes dans une interface simple, où l'on voit les réponses de Claude, peut choisir parmi ses propositions et répondre librement.

## Périmètre retenu
- **Application locale Windows**, indépendante d'IntelliJ, accessible dans le navigateur.
- **Lancement depuis le dossier d'un projet** via une commande future `speckit-ui`, depuis PowerShell ou le terminal intégré IntelliJ. Cette commande est à développer, elle n'est pas native.
- **Détection du projet courant** à partir du répertoire de lancement, avec validation visible.
- **Session Claude Code** : créer une session, reprendre la dernière ou sélectionner une session existante. Le passage de relais est exclusif : ne pas piloter simultanément la même session dans deux processus.
- **Dossier de sortie des spécifications** : par défaut `specs/` dans le projet ; préférence pour un emplacement personnalisé, sous réserve de compatibilité avec les conventions et scripts Spec Kit. Prévoir au minimum une option d'export/copie externe fiable.
- **Configuration persistante par projet** : dossier de destination et skills sélectionnés.
- **Workflow principal (6 étapes)** : Spécifier → Clarifier → Planifier → Tâches → Analyser → Implémenter.
- **Constitution** et **Checklist** : options facultatives dans un menu avancé, pas des étapes bloquantes affichées en permanence.
- **Skills locaux** : découverte, sélection au début et révision avant implémentation ; leur invocation réelle doit être journalisée et non simplement supposée.
- **Clarifier** : questions dynamiques de Claude, réponses à choix (avec recommandation et explication), plus réponse libre, historique question/réponse.
- **Analyser** : résultats avec niveaux OK / avertissement / bloquant, correctif recommandé + justification courte, possibilité modifier, valider, appliquer puis relancer l'analyse.
- **Implémenter** : lancement réel de Claude Code dans le projet (modification code, commandes et tests), progression, journal, fichiers créés/modifiés, résultats des tests, confirmations avant opérations sensibles.
- **UX** : une action principale par écran, libellés accessibles, technique masquée par défaut, interaction conversationnelle et résultats en temps réel.

## Ce qui est acquis / non acquis
- Un prototype HTML précédent permet de tester l'ergonomie, **mais simule Claude**.
- Le rattachement **à une session Claude déjà active** n'est pas équivalent à reprendre son historique. Les mécanismes de reprise (`--resume`) et d'accès programmatique doivent faire l'objet d'un prototype technique et de tests de concurrence.
- Le choix d'un répertoire de sortie totalement arbitraire peut entrer en conflit avec les chemins attendus par Spec Kit : compatibilité à établir avant engagement.
- Une commande `speckit-ui` devra être installée et ne fonctionne pas encore.

## Décision d'architecture provisoire
Frontend React/TypeScript + serveur local Node.js, communication localhost, processus Claude Code contrôlé et événements en streaming. Ne pas refaire Spec Kit.

## Questions à trancher pendant Spec Kit
1. Comment rattacher de façon fiable le contexte d'une session terminal et interdire les accès simultanés ?
2. Quelles sorties des commandes `/speckit.*` sont suffisamment structurées pour alimenter les choix de Clarify et le rapport Analyze ?
3. Quelle stratégie officielle et sûre pour le chemin personnalisé : configuration du projet, lien, ou export ?
4. Comment choisir/activer les skills avec traçabilité effective ?
5. Comment présenter et confirmer les permissions Claude Code et les actions destructrices ?
