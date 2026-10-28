# Spécification technique — hypothèses à valider

## Architecture indicative
```text
PowerShell / Terminal IntelliJ
        │ speckit-ui (CLI lanceur à installer)
        ▼
Serveur local Node.js (127.0.0.1, port libre)
   ├── API HTTP : projets, préférences, sessions, artefacts
   ├── canal SSE ou WebSocket : logs, état, questions, résultats
   ├── orchestrateur : un processus Claude actif par session
   ├── adaptateur CLI Claude : reprise, exécution, flux structuré
   ├── adaptateur Spec Kit : vérification installation/commandes/chemins
   └── persistance locale : paramètres + états (JSON/SQLite)
        │
        ▼
Claude Code CLI ── Spec Kit ── fichiers du projet
        ▲
        │
Frontend React/TypeScript dans le navigateur
```

## Principes techniques
- L'exécution est **locale** et bornée au dossier de projet approuvé.
- Faire un POC de `claude -p`, `--resume` et des formats de sortie structurés, sans supposer qu'ils offrent un contrôle simultané de l'interface terminal.
- Une session = un propriétaire actif. Journaliser les sessions, PID et interruptions ; proposer arrêt et reprise contrôlée.
- Pour Clarify, ne pas présumer que toutes les propositions sont transmises dans un JSON stable : prévoir adaptateur et mode brut.
- Les commandes Spec Kit et fichiers produits varient selon la version, les détecter et valider.
- Conserver les conventions natives `specs/<feature>/...` par défaut. Toute sortie externe doit être explicitement testée avec l'enchaînement complet ; préférer une copie/export plutôt que changer silencieusement les chemins.
- Scanner uniquement des répertoires de skills locaux explicitement choisis ou reconnus. Lister les chemins exacts et vérifier qu'un skill a réellement été invoqué.
- Ne pas exposer le serveur sur le réseau ; appliquer jeton local/contrôle d'origine, validation et canonicalisation des chemins.
- Éviter `--dangerously-skip-permissions` ; exposer à l'utilisateur les confirmations que la CLI nécessite ou basculer dans un mécanisme d'approbation documenté.
- Afficher les changements des fichiers via diff et les tests via leurs sorties réelles.

## POC technique prioritaire
1. Depuis les deux terminaux Windows, détecter cwd et démarrer un serveur local.
2. Lancer Claude sur un projet test en mode non interactif, recevoir un flux lisible.
3. Capturer session_id, arrêter puis reprendre sans perte de contexte.
4. Faire tourner une étape Spec Kit réelle et lire les artefacts produits.
5. Simuler session déjà occupée et vérifier le verrouillage.
6. Valider Clarify avec ses choix réels et les permissions avant Implémentation.

## Décisions ouvertes
- Electron/Tauri vs navigateur + serveur local (préférence actuelle : navigateur + serveur).
- Flux SSE vs WebSocket, selon interactivité retenue.
- Source de vérité des artefacts et mécanisme destination externe.
- Gestion des réponses de permissions et de questions Claude en CLI.
- Version minimale de Node, Claude Code et Spec Kit à supporter.
