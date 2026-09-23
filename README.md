# Les Pages Bleues

L'encyclopédie collaborative de la réparation, en français — **Réparer. Comprendre. Transmettre.**

Trouvez en quelques clics comment réparer vos objets, au lieu de les jeter.

## Ce que fait le site

| | |
| --- | --- |
| **69 guides vérifiés** | Automobile, électroménager, téléphonie, maison, vélo, jardin, loisirs, mode, instruments. Chaque fiche cite ses sources et sa date de vérification. |
| **Mode accompagnement** | Une étape à la fois en plein écran : minuteurs, lecture à voix haute, commandes vocales (« suivant », « répète »…), écran maintenu allumé, reprise là où on s'est arrêté. |
| **Diagnostic guidé** | 26 pannes courantes : on décrit le problème (texte ou voix), quelques questions, les causes sont classées avec un niveau de confiance, puis on va vers la bonne fiche… ou vers un réparateur labellisé. |
| **Mon matériel** | On enregistre ses appareils, sa voiture ou sa moto et on ne voit que les fiches qui les concernent. Catalogue : 85 types d'équipement, 4 600 marques et près de 1,3 million de modèles et références (Spareka, Leroy Merlin, Boulanger, Micromania), 34 marques et 677 modèles de voitures (catcar.info), 7 marques et 235 modèles de motos (MotoBook). |
| **Carnet d'entretien** | Pour chaque matériel, inspiré de MotoBook : entretiens et contrôles à venir (séparés), intervalles tirés des fiches et réglables, prévision de la date selon le kilométrage moyen, plan adapté (énergie, transmission), contrôles « défaillant » reliés à la bonne fiche, historique avec factures, statistiques de coûts, impression PDF, export pour la revente, rappels agenda (.ics). |
| **Recherche** | Synonymes, accents et pluriels ignorés, suggestions instantanées ; onglets Guides / Diagnostics / Discussions, filtres domaine, difficulté, durée, favoris et tri. |
| **Communauté** | Questions, astuces et retours de réparateurs structurés (symptôme, cause trouvée, réparation, temps, difficulté). |
| **Profil** | Fiches publiées, réparations, favoris, 10 badges, export / import / effacement des données. |
| **Contribution** | Formulaire en 4 étapes (informations, contenu, images, publication), brouillon automatique, photos compressées, fiches modifiables. |
| **Qualité** | Thème clair et sombre, version mobile avec barre d'onglets, hors ligne (installable sur téléphone), impression / PDF, accessibilité vérifiée (WCAG AA), une page statique par fiche pour le référencement. |

> **Important** : il n'y a pas encore de serveur. Fiches perso, messages, favoris et profil sont enregistrés **dans le navigateur de chaque visiteur**. Les comptes et le partage réel viendront avec un back-end.

## Lancer le site en local

Il faut seulement [Node.js](https://nodejs.org/) (version 18 ou plus) :

```sh
npm start            # puis ouvrir http://localhost:8000
```

## Modifier le contenu

1. Les guides sont dans `assets/js/data.js` (les champs sont décrits en haut du fichier).
2. Les pannes du diagnostic sont dans `assets/js/diagnostics-data.js`.
3. Après toute modification, régénérez les pages des fiches et vérifiez :

```sh
npm run build        # pages /fiches/*.html, sitemap.xml, robots.txt
npm run validate     # contrôle des données et de tous les liens
```

Pour ajouter une photo : déposez-la en WebP (1000 px de large environ) dans `assets/img/photos/`, ajoutez ses crédits dans `credits.json`, puis lancez `npm run photos` pour créer ses versions légères destinées aux téléphones.

Pensez à changer `REVIEWED_ON` dans `data.js` quand vous revérifiez les fiches, et à incrémenter `CACHE` dans `sw.js` quand vous publiez une nouvelle version (sinon les visiteurs hors ligne gardent l'ancienne).

Les pages principales (accueil, recherche, catégories…) sont générées par `python3 tools/pages.py` à partir de gabarits : modifiez le gabarit dans ce fichier plutôt que le HTML directement.

## Mettre à jour le catalogue du matériel

Le catalogue est généré par `tools/materiel.js` (lancé par `node tools/build.js`) à partir de `tools/data/`.
Les références Spareka et les produits Leroy Merlin viennent des plans de site publics de ces sites :
`python3 tools/fetch-catalogues.py` les relit (compter une trentaine de minutes pour Leroy Merlin), puis relancez `node tools/build.js`.
Les modèles sont écrits dans `assets/data/modeles/*.json` et chargés seulement quand on remplit « Mon matériel ».

## Tests

```sh
npm install                      # une seule fois
npx playwright install chromium  # une seule fois
npm test                         # génération + validation + 23 tests dans un vrai navigateur
```

Les tests couvrent toutes les pages (ordinateur et mobile, thèmes clair et sombre), la recherche, les fiches, le mode accompagnement, le diagnostic, la contribution avec photo, la communauté, le profil, le mode hors ligne, l'accessibilité (axe-core, ordre des titres) et la stabilité de la mise en page au chargement.

## Mettre en ligne (GitHub Pages)

1. Fusionner la branche de travail dans `main`.
2. Sur GitHub : **Settings → Pages**, source **Deploy from a branch**, branche **main**, dossier **/ (root)**.
3. Le site est en ligne quelques minutes plus tard à l'adresse `https://asmoytb1-cloud.github.io/LesPagesBleues/`.

Si vous utilisez un nom de domaine, remplacez l'adresse `SITE` dans `tools/build.js` et `tools/pages.py`, puis relancez `npm run build` et `python3 tools/pages.py`.

## Organisation des fichiers

```
index.html, guides.html, categories.html, …   pages du site
fiches/                                        une page statique par guide (générée)
assets/css/style.css                           styles (couleurs en variables, thèmes, mobile, impression)
assets/js/data.js                              catégories et guides
assets/js/diagnostics-data.js                  base de connaissances du diagnostic
assets/js/common.js                            fonctions partagées (recherche, cartes, en-tête, stockage…)
assets/js/guide-view.js                        rendu d'une fiche (utilisé par le site et par la génération)
assets/js/*.js                                 un script par page
assets/img/photos/                             photos sous licence libre + credits.json
assets/fonts/                                  polices Inter et Caveat (licence OFL)
tools/build.js, tools/pages.py, tools/serve.js génération et serveur local
tests/validate.js, tests/e2e.js                tests
sw.js, manifest.webmanifest                    hors ligne et installation
```

## Crédits

Les photos proviennent de banques d'images sous licences libres (CC0, domaine public, CC BY) ; auteurs et licences sont listés dans `assets/img/photos/credits.json` et sur la page À propos.

Les polices Inter et Caveat (SIL Open Font License) sont hébergées dans `assets/fonts/` : le site ne contacte aucun service tiers pendant la navigation.
