# Brief prêt pour `/speckit.specify`

## Texte à transmettre

Je veux développer **SpecKit Play**, une application **locale Windows** à interface web, qui permet de piloter **GitHub Spec Kit au travers de Claude Code**, depuis le terminal intégré d'IntelliJ ou PowerShell, sans devoir saisir les commandes Spec Kit à chaque étape. L'outil doit être **simple, ludique et conversationnel**, avec une action principale à la fois.

Au démarrage, via une future commande `speckit-ui` depuis un dossier de projet, l'application ouvre le navigateur, détecte le projet, permet de choisir une session Claude Code (nouvelle / dernière / existante), ainsi que le dossier d'enregistrement des spécifications (par défaut dans le projet, option alternative compatible ou export externe). Le contexte du projet et les préférences doivent être mémorisés.

Elle guide les étapes **Specify, Clarify, Plan, Tasks, Analyze, Implement**. Les commandes doivent réellement être exécutées par Claude Code et les résultats s'afficher progressivement. Les étapes Constitution et Checklist doivent être accessibles en option avancée.

Pour **Clarify**, afficher les questions retournées par Claude, leurs propositions et l'option recommandée avec une justification courte ; autoriser une réponse personnalisée ; transmettre le choix et afficher les questions suivantes. Pour **Analyze**, catégoriser les constats (OK, avertissement, bloquant), proposer un correctif recommandé expliqué en quelques phrases, laisser l'utilisateur accepter, modifier ou rejeter chaque proposition, appliquer avec confirmation et relancer la vérification. Pour **Implement**, coder réellement dans le projet, afficher la progression, les fichiers modifiés, les tests, erreurs et autorisations nécessaires.

L'utilisateur doit pouvoir découvrir ses **skills Claude locaux**, choisir ceux à utiliser dès les premières phases ou à l'implémentation, modifier ce choix avant de coder et voir les skills effectivement utilisés. L'application ne doit pas prétendre à un rattachement en direct à un terminal occupé : concevoir une **reprise ou un passage de relais sécurisé** des sessions Claude.

Fournir une interface française accessible, un suivi des étapes, un historique des échanges, des erreurs et une conservation des résultats. L'application doit fonctionner localement sans serveur distant propre à SpecKit Play et sans nécessiter de plugin IntelliJ.

## Hors périmètre première version
- Collaboration multi-utilisateurs ou déploiement cloud.
- Réécriture du moteur Spec Kit.
- Prise de contrôle concurrente d'une même session interactive Claude déjà active.
- Modification silencieuse de fichiers hors projet sans validation explicite.

## Commandes du workflow à prendre en compte
`/speckit.specify`, `/speckit.clarify`, `/speckit.plan`, `/speckit.tasks`, `/speckit.analyze`, `/speckit.implement` ; avancé : `/speckit.constitution`, `/speckit.checklist` (selon version et installation).
