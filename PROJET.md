# Les Pages Bleues — dossier de présentation du projet

> Ce document résume tout le projet pour qu'un assistant (ChatGPT, Claude…) ou un développeur puisse reprendre le
> travail sans contexte préalable. Mis à jour le 6 octobre 2026.

## 1. Le projet en bref

**Les Pages Bleues** est « l'encyclopédie collaborative de l'entretien et de la réparation », en français.
Slogan : *Réparer. Comprendre. Transmettre.* Objectif : que chacun puisse entretenir et réparer ses objets du
quotidien au lieu de les jeter, gratuitement.

- **Porteur du projet / éditeur :** Matthis Hache (particulier, projet non commercial pendant la bêta).
  Contact : matthis.hache@hotmail.fr.
- **État :** bêta. Site web statique complet + application iPhone (Xcode) qui embarque le site et tourne sur
  l'iPhone de l'éditeur. Compte Apple Developer Program payant actif. Prochaine étape visée : TestFlight.
- **Dépôt GitHub :** `asmoytb1-cloud/LesPagesBleues` (privé), branche de travail `claude/mes-pages-bleues-wpp3wx`.
- **Concurrents étudiés :** iFixit (guides de réparation, communauté, boutique), Spareka (pièces détachées +
  tutoriels). Positionnement : le **français**, l'**entretien** autant que la réparation, le **carnet d'entretien**
  par appareil, le **diagnostic guidé**, et les dispositifs français (bonus réparation, reprise des appareils).

## 2. Ce que fait le site aujourd'hui

**Principe :** « Je rencontre un problème → Les Pages Bleues m'aident à trouver une solution. » Interface refaite en
octobre 2026 pour être un compagnon simple et calme (voir § 2 bis).

| Fonction | Détail |
|---|---|
| **124 fiches vérifiées** | 11 domaines (Automobile, Moto, Électroménager, Téléphonie & informatique, Maison & bricolage, Vélo & mobilité, Jardin, Jeux & loisirs, Mode, Instruments, Autres). Chaque fiche : difficulté, durée, économie estimée, précautions de sécurité, outils, pièces, étapes (avec astuces et minuteurs), dépannage, **sources citées** (245 au total) et date de vérification. Au moins une fiche pour chacun des 85 types d'équipement. |
| **Schémas techniques** | Sur la fiche, juste après difficulté et durée : schéma de principe à repères numérotés, légende en texte, « Agrandir » (zoom ×2), papier clair aussi en thème sombre, imprimé avec la fiche, image de partage dédiée. 12 schémas validés sur les 124 du pack d'octobre 2026 ; les 112 autres sont à refaire (consignes dans `docs/visuels/AUDIT.md`) et ces fiches gardent leur photo. |
| **Mode accompagnement** | Une étape à la fois, en grand, lecture à voix haute, minuteurs, commandes vocales. |
| **Diagnostic** | 26 pannes courantes : description libre (ou choix de l'équipement) → questions une par une → « Voici ce que nous avons trouvé » (causes avec probabilité estimée, « Notre conseil ») → guide recommandé. Sans IA (règles pondérées). Photo jointe possible pour une question à la communauté (non analysée). |
| **Entretien** | Page qui rassemble les entretiens de tout le matériel : À faire, Bientôt, À venir (objet, entretien, échéance). |
| **Mon matériel** | L'utilisateur enregistre ses appareils, sa voiture, sa moto, et ne voit que les fiches qui les concernent. Catalogue de 85 types, marques courantes, modèles courants, saisie libre. |
| **Carnet d'entretien** | Par matériel : entretiens et contrôles à venir, intervalles tirés des fiches (réglables), prévision au kilométrage moyen, historique avec factures en photo, statistiques, impression, export pour la revente, rappels agenda (.ics). 85 plans d'entretien. |
| **Bonus réparation** | Encadré sur les fiches concernées : montant déduit chez un réparateur labellisé QualiRépar (barème ecosystem). |
| **Fin de vie** | Sur les domaines électriques : faire réparer avec le bonus, donner (outil ADEME), reprise « un pour un » / « un pour zéro ». |
| **Contribution** | Rédiger une fiche en 4 étapes (avec photos), poser des questions, signaler une erreur. Pendant la bêta, tout reste sur l'appareil (pas encore de partage). |
| **Bêta** | Badge « Bêta », page d'avis (envoyé par e-mail à l'éditeur). |
| **Qualité** | Thème automatique (clair par défaut, sombre bleu nuit), mobile, hors ligne, accessibilité (WCAG AA, axe-core), une page statique par fiche pour le référencement, impression/PDF. |

## 2 bis. Design et ergonomie (refonte d'octobre 2026)

- **Navigation identique partout** : Accueil · Diagnostic · Guides · Matériel · Plus (barre du bas sur mobile, en-tête
  sur ordinateur). « Plus » range le reste : carnet d'entretien, favoris, réparations, profil, communauté, ajouter une
  fiche, avis sur la bêta, apparence (automatique / clair / sombre), données, à propos et pages légales.
- **Accueil** : « Bonjour 👋 », « Que voulez-vous faire aujourd'hui ? », grande recherche « Décrivez votre problème… »
  (elle mène au diagnostic) et quatre cartes : Réparer, Entretenir, Mon matériel, Explorer. En dessous, seulement ce qui
  concerne l'utilisateur : la réparation en cours et les entretiens à prévoir.
- **Couleurs** : fond blanc légèrement bleuté, bleu pour l'accent (réparer, liens, boutons), vert pour l'entretien,
  ambre pour le matériel, rouge seulement pour le danger. Thème sombre : la même interface en bleu nuit.
- **Accessibilité cognitive** : mots simples, une action par élément, grandes zones à toucher (44 px et plus), aucune
  animation décorative, contrastes WCAG AA, et jamais une couleur seule (toujours un mot et une icône : « À faire »,
  « Bientôt », « À venir »).
- **Logo** : une page au coin replié bleu, d'où l'on a découpé une clé ; mot « Bleues » en bleu. Dessin unique dans
  `tools/icons.js` (favicon, icônes web, image de partage, icônes iPhone claire, sombre et teintée). Le coin replié revient,
  discrètement, sur les quatre cartes de l'accueil.
- **Système de design** dans `assets/css/style.css` : variables de couleur (thème clair sur `:root`, sombre via
  `prefers-color-scheme` ou `data-theme="dark"`), cartes, listes groupées, boutons, états, onglets.

## 3. Architecture technique

- **Site 100 % statique** : HTML, CSS et JavaScript « vanilla » (aucun framework, aucune dépendance au
  navigateur). Aucune donnée envoyée à un serveur : tout est dans le `localStorage` du navigateur (clés `lpb-*`).
- **Pas de backend** pour l'instant. Le partage entre utilisateurs (comptes, publication de fiches, modération)
  demandera une base de données (Supabase envisagé) et les obligations d'hébergeur (DSA, RGPD).

### Arborescence

```
index.html, guides.html, guide.html, categories.html, diagnostic.html, materiel.html, carnet.html, entretien.html,
plus.html, communaute.html, ajouter.html, profil.html, a-propos.html, beta.html, mentions-legales.html,
conditions-utilisation.html, confidentialite.html, 404.html     ← pages générées par tools/pages.py
fiches/*.html          ← une page statique par fiche (générée par tools/build.js)
categories/*.html      ← une page d'introduction par domaine (générée par tools/build.js)
assets/css/style.css   ← système de design (thème clair sur :root ; sombre via prefers-color-scheme ou [data-theme="dark"])
assets/js/
  data.js              ← CATEGORIES et GUIDES (les 124 fiches) — LA source du contenu
  common.js            ← utilitaires partagés : store (localStorage), icônes, en-tête/pied de page, matériel,
                         BONUS_REPARATION, SITE_CONTACT…
  guide-view.js        ← rendu HTML d'une fiche (utilisé dans le navigateur ET par la génération statique),
                         dont guideIllustration() : schéma validé, variante de modèle seulement si vérifiée
  illustrations-data.js← registre des schémas techniques (GÉNÉRÉ par tools/illustrations.js)
  diagnostics-data.js  ← les 26 diagnostics guidés
  materiel-data.js     ← catalogue du matériel (GÉNÉRÉ par tools/materiel.js, ne pas modifier à la main)
  entretien-data.js    ← MAINTENANCE : plans d'entretien par type de matériel
  carnet-core.js       ← calcul des échéances du carnet
  *.js                 ← un script par page (home.js, guides.js, guide.js, materiel.js, carnet.js…)
assets/img/photos/     ← photos libres de droits + credits.json (auteur, licence)
assets/img/technical/  ← schémas techniques validés (SVG recadrés) + images de partage 1200×630 (PNG), générés
docs/visuels/          ← VISUELS_TECHNIQUES.md (règles de dessin) et AUDIT.md (bilan de relecture des schémas)
tools/
  pages.py             ← gabarit commun + contenu des pages principales
  build.js             ← génère fiches/, categories/, sitemap.xml, robots.txt (+ lance materiel.js)
  materiel.js          ← génère materiel-data.js depuis tools/data/
  data/                ← types.json, marques.json, modeles.json, vehicules.txt (listes rédigées par l'équipe)
  fetch-wikidata.py    ← (facultatif) complète les modèles depuis Wikidata (CC0)
  icons.js             ← logo, favicon, icônes web et iPhone, image de partage (Playwright)
  illustrations.js     ← intègre un pack de schémas : node tools/illustrations.js <dossier du pack> (Playwright)
  data/illustrations-review.json ← relecture des schémas : « valide » ou « a-refaire » (raison, consigne de dessin)
tests/
  validate.js          ← contrôles de cohérence (fiches, sources, liens, catalogue, plans d'entretien…)
  e2e.js               ← 27 tests de bout en bout Playwright (toutes les pages, mobile, thèmes, accessibilité…)
ios/                   ← application iPhone (voir § 5)
```

### Format d'une fiche (dans `assets/js/data.js`)

```js
{
  id: "groupe-securite-chauffe-eau",          // minuscules et tirets, unique
  title: "Chauffe-eau : entretenir le groupe de sécurité",
  category: "maison",                          // un id de CATEGORIES
  devices: ["chauffe-eau"],                    // types de matériel concernés (APPLIANCE_TYPES)
  difficulty: "Facile",                        // Facile | Moyen | Difficile
  duration: "5 min", minutes: 5,
  savings: "≈ 100 €",
  keywords: ["chauffe-eau", "cumulus", …],
  summary: "…", safety: "…",
  tools: ["…"], parts: ["…"],
  sources: [{ label: "Organisme — titre de la page", url: "https://…" }],   // au moins 2, vérifiées
  steps: [{ title: "…", text: "…", tip: "…(facultatif)", timer: 300 /* secondes, facultatif */ }],
  troubleshoot: ["…"]
}
```

Plan d'entretien (`assets/js/entretien-data.js`) : `{ id, label, kind: "entretien" | "controle", months | days | km,
guide: "<id de fiche>", note }`. **Un intervalle doit toujours venir d'une fiche sourcée** (contrôlé par les tests).

### Commandes

```
npm install                                   # une fois (Playwright pour les tests)
python3 tools/pages.py                        # régénère les pages principales
node tools/illustrations.js <dossier du pack> # (si nouveaux schémas) relecture → assets/img/technical, registre, AUDIT.md
node tools/build.js                           # régénère fiches/, categories/, catalogue, sitemap
node tests/validate.js                        # contrôles de cohérence
python3 -m http.server 8765 &                 # serveur local
CHROMIUM_PATH=/chemin/vers/chromium node tests/e2e.js   # tests de bout en bout
```

Après chaque modification : `pages.py` → `build.js` → `validate.js` → `e2e.js`, et incrémenter `CACHE` dans `sw.js`.

## 4. Règles du projet (à respecter absolument)

1. **Vérifier chaque information** et citer au moins deux sources fiables (fabricants, organismes publics,
   professionnels). Aucun chiffre ni intervalle inventé.
2. **Jamais de copie** : on lit les sources, puis on **rédige avec nos propres mots**. Aucun texte, photo, schéma
   ou élément de design repris d'un autre site (iFixit l'interdit explicitement dans ses conditions ; ses contenus
   sont sous licence non commerciale).
3. **Pas d'extraction de bases de données de tiers** (droit du producteur de bases de données, art. L342-1 du code
   de la propriété intellectuelle). Les anciens catalogues extraits de Spareka, Leroy Merlin, Boulanger, Micromania,
   catcar.info et MotoBook ont été retirés ; les listes de marques et modèles sont rédigées par l'équipe ou issues
   de Wikidata (CC0).
4. **Photos** : uniquement libres de droits, créditées dans `credits.json`.
5. **Licence des textes** : CC BY-SA 4.0 (choix provisoire, modifiable tant que rien n'est publié).
6. **Sécurité d'abord** : chaque fiche commence par les précautions et dit quand appeler un professionnel.
7. **Confidentialité** : aucun cookie, aucune mesure d'audience, aucune donnée envoyée. Polices hébergées localement.
8. **Français clair**, pour des gens qui n'ont jamais tenu un tournevis.
9. **Schémas : une image fausse est pire qu'une image simple mais juste.** Un schéma n'est publié qu'après relecture
   face au texte de sa fiche (bon objet, chaque repère sur la bonne pièce) ; sinon la fiche garde sa photo. Une
   variante « marque + modèle » n'est affichée que si elle est vérifiée (date et sources), jamais parce qu'un modèle
   « ressemble ».

## 5. L'application iPhone (`ios/`)

- Projet Xcode 16+ (`ios/LesPagesBleues.xcodeproj`), SwiftUI + `WKWebView`, iOS 17 minimum.
  Identifiant : `fr.lespagesbleues.beta`, équipe : compte développeur de Matthis Hache.
- **Le site complet est embarqué** : une étape de compilation « Copier le site » recopie la racine du dépôt dans
  l'app (dossier `Site`). Il est servi sous l'adresse `lpb://app/…` par `SiteSchemeHandler.swift`, pour que le
  `localStorage`, `fetch()` et les liens relatifs fonctionnent hors ligne.
- `SiteView.swift` fait le lien avec iOS : liens externes et e-mails ouverts dans Safari/Mail, `confirm()` natif,
  `window.print()` → impression iOS, fichiers exportés → feuille de partage, thème choisi sur le site → barre d'état
  et fond de l'app (message `theme`). Le site sait qu'il est dans l'app grâce à `window.LPB_APP = "ios"`.
- `PrivacyInfo.xcprivacy` : aucun suivi, aucune donnée collectée.
- Testée et fonctionnelle sur l'iPhone de l'éditeur.

## 6. Prochaines étapes envisagées

1. **Notifications locales** des rappels du carnet d'entretien (pont JavaScript → Swift, `UNUserNotificationCenter`).
2. **TestFlight** : archive, envoi sur App Store Connect, testeurs internes puis externes.
3. Fonctions natives pour l'App Store (règle 4.2 d'Apple contre les apps « simple site web ») : widget (prochain
   entretien), synchronisation iCloud (CloudKit) du matériel et des carnets, raccourcis Siri.
4. Comptes et partage des fiches entre utilisateurs (backend, modération, conformité DSA/RGPD).
5. Relecture des fiches par des réparateurs ; nouvelles fiches selon les demandes des testeurs.
6. **Refaire les 112 schémas techniques** jugés faux ou passe-partout, d'après les consignes de `docs/visuels/AUDIT.md`,
   puis les intégrer avec `tools/illustrations.js`.
7. Mise en ligne publique du site (il faudra alors compléter les mentions légales : adresse, téléphone, hébergeur).

## 7. Points juridiques à garder en tête

- Nom « Les Pages Bleues » : déjà utilisé par d'autres dans des domaines différents ; recherche INPI faite par
  l'éditeur. Dépôt de marque à envisager avant le lancement public.
- Mentions légales (LCEN, art. 1-1) à compléter avant toute mise en ligne publique.
- Dès que des contenus d'utilisateurs seront partagés : obligations d'hébergeur (DSA : point de contact,
  signalement, motivation des décisions), RGPD (politique de confidentialité, droits des personnes).
