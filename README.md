# Les Pages Bleues

L'encyclopédie collaborative de l'entretien et de la réparation, en français — **Réparer. Comprendre. Transmettre.**

« Je rencontre un problème → Les Pages Bleues m'aident à trouver une solution. » Réparer, entretenir et faire durer
ses objets, au lieu de les jeter.

## Le parcours

L'accueil pose une seule question — *Que voulez-vous faire aujourd'hui ?* — avec une grande recherche
(« Décrivez votre problème… ») et quatre choix : **Réparer** (j'ai un problème), **Entretenir** (éviter les pannes),
**Mon matériel** (mes appareils et véhicules) et **Explorer** (tous les guides). Partout, la même barre de navigation :
**Accueil · Diagnostic · Guides · Matériel · Plus**.

L'interface est pensée pour être calme et accessible à tous, y compris aux personnes autistes ou fatiguées : mots
simples, une action par élément, de grandes zones à toucher, aucune animation décorative, et jamais une couleur seule
pour porter une information (toujours un mot et une icône). Le thème suit le réglage de l'appareil (clair par défaut,
bleu nuit le soir) et peut être imposé dans **Plus › Apparence**.

## Ce que fait le site

| | |
| --- | --- |
| **124 guides vérifiés** | Automobile, électroménager, téléphonie, maison, vélo, jardin, loisirs, mode, instruments. Chaque fiche cite ses sources et sa date de vérification. |
| **Fiche guide** | Titre, difficulté, durée, économie, puis le visuel : le schéma technique de la fiche (repères numérotés, légende, « Agrandir » avec zoom) quand il a été relu et validé, sinon la photo. Ensuite quatre onglets : Étapes, Outils, Pièces, Sécurité. Bouton « Commencer le guide » vers le mode accompagnement. |
| **Mode accompagnement** | Une étape à la fois en plein écran (« Étape suivante → ») : minuteurs, lecture à voix haute, commandes vocales (« suivant », « répète »…), écran maintenu allumé, reprise là où on s'est arrêté. |
| **Diagnostic** | 26 pannes courantes, sans intelligence artificielle : on décrit ce qui se passe (texte ou voix) ou on choisit l'équipement, on répond à quelques questions une par une, puis « Voici ce que nous avons trouvé » : causes classées avec une probabilité estimée, « Notre conseil » et le guide recommandé. Une photo peut être jointe à la question posée à la communauté (elle n'est pas analysée). |
| **Mon matériel** | On enregistre ses appareils, sa voiture ou sa moto et on ne voit que les fiches qui les concernent (au moins une fiche pour chaque type d'équipement). Catalogue : 85 types d'équipement avec leurs marques courantes, des modèles courants (smartphones, consoles, voitures, motos…) et saisie libre pour tout le reste. |
| **Entretien** | Tous les entretiens de tout le matériel sur une page : À faire, Bientôt, À venir, avec l'objet, l'entretien et l'échéance. |
| **Carnet d'entretien** | Pour chaque matériel : entretiens et contrôles à venir (séparés), intervalles tirés des fiches et réglables, prévision de la date selon le kilométrage moyen, plan adapté (énergie, transmission), contrôles « défaillant » reliés à la bonne fiche, historique avec factures, statistiques de coûts, impression PDF, export pour la revente, rappels agenda (.ics). |
| **Recherche** | Synonymes, accents et pluriels ignorés, suggestions instantanées ; onglets Guides / Diagnostics / Discussions, filtres domaine, difficulté, durée, favoris et tri. |
| **Communauté** | Questions, astuces et retours de réparateurs structurés (symptôme, cause trouvée, réparation, temps, difficulté). |
| **Profil** | Fiches publiées, réparations, favoris, 10 badges, export / import / effacement des données. |
| **Contribution** | Formulaire en 4 étapes (informations, contenu, images, publication), brouillon automatique, photos compressées, fiches modifiables. |
| **Qualité** | Thème automatique, clair ou sombre, version mobile avec barre d'onglets, hors ligne (installable sur téléphone), impression / PDF, accessibilité vérifiée (WCAG AA), une page statique par fiche pour le référencement. |

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

Le logo (une page au coin replié bleu, d'où l'on a découpé une clé) est dessiné une seule fois dans `tools/icons.js`,
qui produit le favicon, les icônes de l'application web, l'image de partage et les icônes de l'app iPhone (claire,
sombre et teintée) : `node tools/icons.js` après une modification du logo.

**Schémas techniques.** Un pack d'illustrations (`manifest.json` et `svg/<id>.svg`, une par fiche) s'intègre avec
`node tools/illustrations.js <dossier du pack>`. Seuls les schémas marqués `"valide"` dans
`tools/data/illustrations-review.json` sont publiés : la règle est qu'une image fausse est pire qu'une image simple mais
juste, et les autres fiches gardent leur photo. La commande répare et nettoie les fichiers, redessine les repères,
recadre, et produit `assets/img/technical/<id>.svg`, l'image de partage `<id>.png`, le registre
`assets/js/illustrations-data.js` et le bilan `docs/visuels/AUDIT.md` (raison et consigne de dessin pour chaque schéma
à refaire). Une variante propre à une marque ou un modèle ne s'affiche que si elle a été vérifiée (date et sources).
Règles de dessin : `docs/visuels/VISUELS_TECHNIQUES.md`.

## Application iPhone (Xcode)

Le dossier `ios/` contient une application iOS qui embarque tout le site : il fonctionne hors ligne et
les données restent sur l'iPhone (stockage local de l'app).

1. Sur le Mac, récupérez le dépôt (branche `claude/mes-pages-bleues-wpp3wx`) et ouvrez `ios/LesPagesBleues.xcodeproj` (Xcode 16 ou plus récent).
2. Cible **LesPagesBleues** › **Signing & Capabilities** : choisissez votre **Team** (un identifiant Apple suffit, « Personal Team »).
   Si Xcode refuse l'identifiant `fr.lespagesbleues.beta`, remplacez-le par un identifiant à vous (ex. `fr.votrenom.pagesbleues`).
3. Branchez l'iPhone, choisissez-le en haut de la fenêtre, puis **Run** (⌘R).
4. Première fois sur l'iPhone : *Réglages › Confidentialité et sécurité › Mode développeur* (activer, redémarrer), puis
   *Réglages › Général › VPN et gestion de l'appareil* › faire confiance à votre profil de développeur.

À chaque compilation, l'étape « Copier le site » recopie la racine du dépôt dans l'app : relancez `node tools/build.js`
après une modification des fiches, puis Run. Avec un compte Apple gratuit, l'app installée expire au bout de 7 jours :
il suffit de relancer Run. Pour inspecter l'app : Safari sur le Mac › menu Développement › votre iPhone.

Dans l'app, les liens externes et les e-mails s'ouvrent dans Safari et Mail, l'impression passe par iOS, les fichiers
exportés (carnet, données, rappels d'agenda) sont proposés dans la feuille de partage, et la barre d'état suit le thème
choisi sur le site (automatique, clair ou sombre).

## Mettre à jour le catalogue du matériel

Le catalogue est généré par `tools/materiel.js` (lancé par `node tools/build.js`) à partir de `tools/data/` :
`types.json` (types d'équipement), `marques.json` (marques courantes par famille), `modeles.json` (modèles courants
d'appareils) et `vehicules.txt` (voitures et motos). Ces listes sont **rédigées par l'équipe** : on n'y recopie jamais
le catalogue ou la base de données d'un autre site (droit du producteur de bases de données, art. L342-1 du code de la
propriété intellectuelle). Le formulaire accepte n'importe quelle autre marque ou modèle.

Pour compléter avec des données ouvertes, `python3 tools/fetch-wikidata.py` télécharge des modèles depuis Wikidata
(CC0, domaine public) dans `tools/data/wikidata-modeles.json`, que le générateur fusionne automatiquement.

## Tests

```sh
npm install                      # une seule fois
npx playwright install chromium  # une seule fois
npm test                         # génération + validation + 27 tests dans un vrai navigateur
```

Les tests couvrent toutes les pages (ordinateur et mobile, thèmes clair et sombre), l'accueil et la navigation, la recherche, les fiches et leurs onglets, les schémas techniques (légende, agrandir, thème sombre, impression, hors ligne), le mode accompagnement, le diagnostic, Mon matériel, l'entretien, le choix du thème, la contribution avec photo, la communauté, le profil, le mode hors ligne, l'accessibilité (axe-core, ordre des titres) et la stabilité de la mise en page au chargement.

## Mettre en ligne (GitHub Pages)

1. Fusionner la branche de travail dans `main`.
2. Sur GitHub : **Settings → Pages**, source **Deploy from a branch**, branche **main**, dossier **/ (root)**.
3. Le site est en ligne quelques minutes plus tard à l'adresse `https://asmoytb1-cloud.github.io/LesPagesBleues/`.

Si vous utilisez un nom de domaine, remplacez l'adresse `SITE` dans `tools/build.js` et `tools/pages.py`, puis relancez `npm run build` et `python3 tools/pages.py`.

## Organisation des fichiers

```
index.html, guides.html, categories.html, …   pages du site
fiches/                                        une page statique par guide (générée)
assets/css/style.css                           système de design : couleurs en variables (clair, sombre), composants, mobile, impression
assets/js/data.js                              catégories et guides
assets/js/diagnostics-data.js                  base de connaissances du diagnostic
assets/js/common.js                            fonctions partagées (recherche, cartes, en-tête, stockage…)
assets/js/guide-view.js                        rendu d'une fiche (utilisé par le site et par la génération)
assets/js/*.js                                 un script par page
assets/img/photos/                             photos sous licence libre + credits.json
assets/img/technical/                          schémas techniques validés (SVG) et images de partage (PNG), générés
assets/js/illustrations-data.js                registre des schémas (généré par tools/illustrations.js)
assets/fonts/                                  police Inter (licence OFL)
tools/build.js, tools/pages.py, tools/serve.js génération et serveur local
tools/icons.js                                 logo, favicon, icônes (web et iPhone), image de partage
tools/illustrations.js                         intégration d'un pack de schémas techniques (relecture : tools/data/illustrations-review.json)
docs/visuels/                                  règles de dessin des schémas et bilan de relecture (AUDIT.md)
tests/validate.js, tests/e2e.js                tests
sw.js, manifest.webmanifest                    hors ligne et installation
```

## Crédits

Les photos proviennent de banques d'images sous licences libres (CC0, domaine public, CC BY) ; auteurs et licences sont listés dans `assets/img/photos/credits.json` et sur la page À propos.

La police Inter (SIL Open Font License) est hébergée dans `assets/fonts/` : le site ne contacte aucun service tiers pendant la navigation.
