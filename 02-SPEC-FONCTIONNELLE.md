# Spécification fonctionnelle initiale

## Acteur
Une personne développeuse utilisant Claude Code sur Windows depuis un terminal IntelliJ ou PowerShell.

## Exigences
| ID | Priorité | Besoin |
|---|---|---|
| F-01 | Must | Lancer `speckit-ui` depuis le dossier projet et ouvrir localhost dans le navigateur |
| F-02 | Must | Afficher et confirmer le chemin du projet |
| F-03 | Must | Créer / reprendre / choisir une session Claude en prévenant les accès simultanés |
| F-04 | Must | Destination par défaut `specs/` ; afficher le chemin réel de sortie |
| F-05 | Should | Destination personnalisée lorsqu'elle est compatible ; sinon export/copie explicite |
| F-06 | Must | Exécuter réellement les six étapes et diffuser sorties/erreurs |
| F-07 | Must | Clarify : propositions recommandées, choix libre, réponses successives |
| F-08 | Must | Analyze : résultats classés, correction expliquée, approbation par élément, nouvelle analyse |
| F-09 | Must | Implement : édition réelle des fichiers, résumé du diff, tests, erreurs |
| F-10 | Must | Aucun contournement silencieux des demandes de permissions |
| F-11 | Should | Détecter les skills locaux et mémoriser choix par projet/étape |
| F-12 | Must | Afficher la preuve d'utilisation des skills, ou « non confirmé » |
| F-13 | Should | Sauvegarder configuration et état d'avancement par projet |
| F-14 | Should | Rendre accessibles Constitution et Checklist via Options avancées |
| F-15 | Must | Indiquer clairement quand un écran est une simulation et non une exécution réelle |

## Parcours nominal
1. Depuis le répertoire du projet, lancer `speckit-ui`.
2. Voir le projet détecté, confirmer session et destination, choisir les skills.
3. Décrire la fonctionnalité, démarrer Specify, consulter le `spec.md` produit.
4. Parcourir Clarify ; choisir une proposition ou rédiger une réponse, renouveler jusqu'à clôture.
5. Lancer Plan et Tasks ; consulter les fichiers et la progression.
6. Lancer Analyze ; traiter chaque anomalie, relancer jusqu'à résultat acceptable.
7. Confirmer les skills et autorisations d'Implement ; lancer, observer et inspecter résultats.

## Scénarios d'erreur
- CLI Claude introuvable / non authentifiée.
- Projet sans Spec Kit initialisé ou commande Spec Kit absente.
- Session introuvable, déjà utilisée ou reprise impossible.
- Commande échouée, processus interrompu, flux perdu, délai expiré.
- Chemin non autorisé, hors périmètre, ou incompatible avec Spec Kit.
- Réponse Clarify non structurée : affichage brut et réponse libre de repli.
- Absence de skill / impossibilité de prouver invocation.

## Critères d'acceptation clés
- AC-01 : au lancement depuis PowerShell **et** terminal IntelliJ, le chemin du projet affiché correspond au répertoire de travail attendu.
- AC-02 : un clic sur Specify crée un véritable artefact dans le projet ou affiche l'erreur réelle.
- AC-03 : une question Clarify permet sélection **ou** réponse libre, envoyée à Claude ; la réponse suivante est issue de Claude et non pré-écrite.
- AC-04 : chaque constat Analyze affiche sévérité, impact, proposition, justification et action choisie.
- AC-05 : Implement montre les modifications effectives et n'annonce jamais des tests réussis sans résultat de test.
- AC-06 : les décisions de destination et de skills sont restaurées au prochain lancement du même projet.
- AC-07 : si une session est déjà pilotée ailleurs, l'utilisateur est informé et aucun démarrage concurrent ne se fait à son insu.
