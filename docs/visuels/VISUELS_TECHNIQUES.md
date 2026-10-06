# Les Pages Bleues — Bible des visuels techniques

## Objectif

Remplacer les photos génériques actuelles et les illustrations passe-partout par un système visuel propriétaire : des planches techniques inspirées des anciens manuels d’atelier, mais redessinées dans un langage moderne Les Pages Bleues. Chaque guide possède désormais son propre visuel principal, au lieu de retomber automatiquement sur la photo du domaine.

## Pourquoi ce choix

Le projet contient actuellement 124 fiches mais seulement une petite bibliothèque de photos réutilisées ; la propriété `photo` peut notamment retomber sur la photo de catégorie. Cette logique est pratique pour une bêta mais provoque précisément l’effet “fausse illustration” que l’on veut supprimer.

Le nouveau système doit éviter l’esthétique de documentation photo typique d’iFixit : iFixit documente explicitement des guides par étapes avec photos, marqueurs et éléments de détail (temps, difficulté, outils, pièces). Les Pages Bleues prennent donc une autre direction visuelle : planches techniques, vues éclatées, coupes, nomenclature, repères et variantes de conception.

## Règle absolue de fiabilité

Une belle image fausse est pire qu’une image simple mais juste. Aucun détail de fixation, connecteur, sens de montage, position de pièce, forme de carter, commande ou couple ne doit être inventé. Pour un matériel ou véhicule donné, une variante “marque + modèle + année/phase” n’est affichée comme exacte que si elle est vérifiée dans une source fiable. Sinon le visuel reste explicitement générique de famille et l’interface indique que la disposition peut varier.

## Langage graphique propriétaire

- Fond ivoire/blanc légèrement bleuté en mode clair ; fond bleu nuit en mode sombre.
- Contours gris graphite fins, jamais noir pur massif.
- Bleu Pages Bleues pour les repères principaux, numéros d’étapes et flèches.
- Orange ambre pour les pièces à remplacer ou manipulations nécessitant une vigilance particulière.
- Vert doux pour les contrôles validés et l’entretien.
- Rouge uniquement pour les dangers ou interdictions.
- Vues orthographiques, coupes, demi-coupes et éclatés privilégiés.
- Pièces numérotées avec une nomenclature claire (ex. 01, 02, 03) plutôt que des marqueurs ronds multicolores omniprésents.
- Flèches courtes, directionnelles, avec ligne de rappel propre ; éviter les flèches décoratives.
- Ajouter une petite étiquette “VARIANTE” lorsqu’une pièce ou géométrie dépend du modèle.
- Les illustrations doivent rester originales : aucune copie ou traçage d’un manuel constructeur, d’iFixit ou d’une photo tierce.
- Pas de logo de constructeur dans un schéma générique.

## Structure d’un visuel de guide

- 1. Vue principale : objet ou sous-ensemble dans son orientation réelle.
- 2. Vue détail : zoom sur la pièce manipulée.
- 3. Repères : pièces, points de déconnexion, vis, clips, joints, sens de rotation ou de traction.
- 4. Sécurité : pictogramme et zone réservée si risque électrique, thermique, mécanique, chimique ou pression.
- 5. Variante : petit encart si deux conceptions fréquentes existent.
- 6. Nomenclature : nom simple + terme technique utile.
- 7. Échelle visuelle : privilégier la compréhension ; ne pas afficher de dimensions inventées.

## Format de fichier

Chaque guide dispose de deux ressources prévues : `assets/img/technical/<guideId>.webp` pour le visuel principal et `assets/img/technical/<guideId>-detail.webp` pour un zoom ou une seconde vue. Les variantes éventuelles vivent dans `assets/img/technical/variants/<guideId>/<variant-key>.webp`.

## Sélection dynamique des variantes

Ordre de résolution recommandé : exact modèle vérifié → famille + marque vérifiée → famille générique → aucune illustration, uniquement si le visuel risquerait d’induire en erreur. L’absence de variante exacte ne doit jamais être compensée par une invention.

## Cartographie actuelle

Nombre de fiches à illustrer : **124**.


### Assets actuellement réutilisés

- `automobile` : 15 fiches concernées
- `ecran` : 1 fiches concernées
- `electromenager` : 43 fiches concernées
- `frein` : 1 fiches concernées
- `instruments` : 2 fiches concernées
- `jardin` : 13 fiches concernées
- `loisirs` : 5 fiches concernées
- `maison` : 19 fiches concernées
- `mode` : 4 fiches concernées
- `robinet` : 1 fiches concernées
- `telephonie` : 13 fiches concernées
- `velo` : 7 fiches concernées

Le manifest JSON joint contient la liste complète des 124 fiches, leur asset cible et la politique de variante.


## Pipeline de production conseillé

- 1. Vérifier le contenu de la fiche et ses étapes.
- 2. Identifier l’appareil/famille et les variantes structurelles réellement pertinentes.
- 3. Vérifier au minimum deux sources techniques quand l’illustration représente une intervention concrète ; privilégier fabricant, organisme public, documentation professionnelle et manuel correspondant.
- 4. Concevoir d’abord la vue technique, sans texte superflu.
- 5. Faire une seconde passe de contrôle : chaque vis, connecteur, joint, filtre, clip et sens d’accès doit être cohérent avec le texte.
- 6. Générer/exporter en WebP avec transparence ou fond clair selon besoin, puis les déclinaisons 480 px / 800 px.
- 7. Intégrer dans la fiche et tester mobile clair/sombre.
- 8. Marquer la date de vérification dans le registre de visuels.

## Références visuelles internes

- `reference/LPB-technical-style-reference.png` : planche de freinage servant de **référence de direction artistique**, pas de source technique à copier.

- `reference/LPB-ui-reference.png` : référence du langage visuel de l’application.
