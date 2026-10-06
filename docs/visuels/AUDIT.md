# Schémas techniques : relecture du pack « LesPagesBleues_Illustrations_v1 »

Relu le 6 octobre 2026, fiche par fiche, en comparant chaque schéma au texte de sa fiche.
Ce fichier est produit par `node tools/illustrations.js <dossier du pack>` à partir de
`tools/data/illustrations-review.json` : pour changer une décision, modifier ce fichier de relecture puis relancer la commande.

**Règle appliquée**, celle de la bible des visuels : « Une belle image fausse est pire qu'une image simple mais juste. »
Un schéma n'est affiché que s'il montre le bon objet et que chaque repère désigne la bonne pièce.
Sinon la fiche garde sa photo, comme le prévoit l'ordre « schéma technique > photo propre à la fiche > photo du domaine ».

## Résultat

- **12 schémas intégrés**, dont 4 avec des repères corrigés (détail ci-dessous) ;
- **112 schémas à refaire** : dessin d'un autre objet, dessin passe-partout repris d'une fiche à l'autre, ou repères qui désignent la mauvaise pièce.

## Défauts communs aux fichiers du pack, corrigés pour les schémas intégrés

- **Balises cassées** dans 15 fichiers (`/>circle` au lieu de `/><circle`) : un élément du dessin ne s'affichait pas
  (stick gauche de la manette, ligne de collage de la semelle, plateau du vélo, tige du mécanisme de chasse…). La balise est réparée (2 des schémas intégrés étaient concernés).
- **Texte provisoire** « Famille d'équipement » dans le panneau de droite et **faux bouton** « SCHÉMA DE PRINCIPE » : seule la zone de dessin est gardée.
- **Repères** : traits de rappel qui barrent les libellés, couleur différente selon le domaine (orange et vert trop pâles sur fond blanc).
  Les repères sont redessinés en bleu Pages Bleues et numérotés ; la légende est écrite en texte dans la fiche,
  lisible sur téléphone et par les lecteurs d'écran.
- **Planche entière** (1200 × 780, avec titres, outils et étapes déjà présents dans la fiche) illisible sur téléphone : le schéma est recadré sur le dessin.

## Schémas intégrés (12)

| Fiche | Repères affichés | Correction |
| --- | --- | --- |
| Changer les plaquettes de frein (`plaquettes-frein`) | 1. Disque ; 2. Étrier ; 3. Plaquette ; 4. Moyeu | — |
| Changer la batterie d'une voiture (`changer-batterie-voiture`) | 1. Borne + ; 2. Borne – ; 3. Batterie | — |
| Vérifier le niveau d'huile moteur et faire l'appoint (`niveau-huile-moteur`) | 1. Bouchon ; 2. Jauge ; 3. Niveau | — |
| Détartrer une bouilloire (`detartrer-bouilloire`) | 1. Cuve ; 2. Anse | — |
| Lave-linge qui ne démarre plus (`lave-linge-ne-demarre-plus`) | 1. Écran et touches ; 2. Porte (hublot) ; 3. Tambour | « Joint » pointait le coin de la carrosserie : repères remplacés par les éléments que la fiche fait vérifier (écran et touches, porte) et le tambour. |
| Ordinateur portable qui chauffe : nettoyer les aérations (`ordinateur-portable-chauffe`) | 1. Écran ; 2. Aérations (côtés, arrière ou dessous) | Le repère « Aérations » pointait la face avant du clavier ; la fiche les situe à l'arrière, sur les côtés et en dessous : il est déplacé sur le côté. |
| Remplacer un écran de téléphone (`ecran-telephone`) | 1. Écran ; 2. Châssis | — |
| Tondeuse thermique qui ne démarre pas (`tondeuse-ne-demarre-pas`) | 1. Moteur ; 2. Carter | — |
| Corriger le drift d'une manette (`joystick-drift`) | 1. Stick gauche ; 2. Stick droit | Les deux cercles identiques sont les deux sticks : « Boutons » devient « Stick droit ». |
| Recoller la semelle d'une chaussure de sport (`recoller-semelle`) | 1. Ligne de collage ; 2. Semelle | « Semelle » pointait le dessus de la chaussure et « Colle / joint » l'intérieur de la semelle : repères replacés sur la ligne de collage et sur la semelle. |
| Barbecue ou plancha gaz : tester les fuites et nettoyer (`barbecue-gaz-fuite-nettoyage`) | 1. Grille ; 2. Arrivée gaz | — |
| Volant de jeu décentré ou qui ne se calibre plus (`volant-jeu-calibrage`) | 1. Volant ; 2. Base | — |

## Schémas à refaire (112)

Classés par domaine. Pour chaque fiche : ce qui ne va pas, puis ce que le schéma doit montrer.

### Auto / Moto (13)

- **Vérifier et régler la pression des pneus** (`pression-pneus-voiture`) — Autre objet : disque et étrier de frein au lieu d'un pneu.
  *À dessiner :* Roue vue de côté : pneu, jante, valve sur la jante, manomètre sur la valve ; encart : étiquette des pressions (montant de portière ou trappe à carburant).
- **Changer la pile d'une clé de voiture** (`pile-cle-voiture`) — Autre objet : batterie de voiture au lieu d'une télécommande de clé.
  *À dessiner :* Télécommande ouverte en deux coques : pile bouton (souvent CR2032 ou CR2025), logement, fente d'ouverture ; repère + de la pile.
- **Changer l'huile moteur** (`vidange-huile-moteur`) — Zone d'intervention absente : ni bouchon de vidange ni filtre à huile.
  *À dessiner :* Moteur et carter d'huile : bouchon de remplissage (haut), jauge, bouchon de vidange (sous le carter), filtre à huile, bac de récupération.
- **Voiture qui ne démarre plus : diagnostic** (`voiture-ne-demarre-plus`) — Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *À dessiner :* Compartiment moteur simplifié : batterie et cosses, masse, démarreur ; multimètre sur la batterie.
- **Changer une ampoule de phare** (`ampoule-phare`) — Autre objet : ampoule domestique au lieu d'une ampoule de phare à culot.
  *À dessiner :* Arrière du bloc optique : cache, connecteur, ampoule de phare (ne pas toucher le verre), maintien (ressort ou bague).
- **Remplacer les balais d'essuie-glace** (`balais-essuie-glace`) — Un seul trait : « Balai » et « Bras » désignent le même objet ; l'agrafe de fixation, où l'on intervient, n'apparaît pas.
  *À dessiner :* Bras relevé au-dessus d'une serviette : bras, crochet en U au bout du bras, balai, languette de verrouillage au milieu du balai ; sens de glissement fléché.
- **Changer une roue crevée** (`changer-roue`) — Autre objet : disque de frein au lieu de la roue et du cric.
  *À dessiner :* Voiture de profil : point de levage sous le bas de caisse, cric, roue, écrous ; ordre de serrage en étoile.
- **Remplacer un fusible de voiture** (`changer-fusible-voiture`) — Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *À dessiner :* Boîte à fusibles ouverte : fusibles enfichables, pince d'extraction, plan au dos du couvercle ; fusible bon et fusible fondu (filament coupé).
- **Contrôler le liquide de refroidissement** (`liquide-refroidissement`) — Repère faux : le liquide de refroidissement ne se lit pas à la jauge mais sur le vase d'expansion.
  *À dessiner :* Vase d'expansion translucide avec repères MIN et MAX, bouchon (à n'ouvrir qu'à froid) ; niveau correct entre les repères.
- **Changer le filtre d'habitacle (filtre à pollen)** (`filtre-habitacle`) — Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *À dessiner :* Boîte à gants démontée ou bas de pare-brise : trappe du filtre, filtre à pollen, flèche du sens de l'air.
- **Nettoyer, graisser et contrôler la chaîne de sa moto** (`entretien-chaine-moto`) — Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *À dessiner :* Roue arrière de moto sur béquille : chaîne, couronne, pignon ; mesure de la tension au milieu du brin inférieur.
- **Vérifier la pression des pneus de sa moto** (`pression-pneus-moto`) — Autre objet : disque et étrier de frein au lieu d'un pneu de moto.
  *À dessiner :* Roue de moto : pneu, valve, manomètre ; encart des pressions avant et arrière (notice).
- **Préparer sa moto pour l'hiver (hivernage)** (`hivernage-moto`) — Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *À dessiner :* Moto de profil : batterie (mainteneur de charge), réservoir, pneus, béquille ; housse respirante.

### Électroménager (41)

- **Sèche-linge qui sèche mal : nettoyer filtres et condenseur** (`filtre-seche-linge`) — Zone d'intervention absente : ni filtre de porte ni condenseur.
  *À dessiner :* Sèche-linge porte ouverte : filtre dans l'encadrement de porte, réservoir d'eau, condenseur ou filtre de plinthe en bas (selon modèle).
- **Dégivrer un congélateur** (`degivrer-congelateur`) — Autre objet : lave-linge avec « tambour » au lieu d'un congélateur.
  *À dessiner :* Congélateur ouvert : givre sur les parois, bac pour l'eau de fonte, serviettes ; aucun objet pointu.
- **Nettoyer les filtres d'une hotte qui aspire mal** (`nettoyer-filtre-hotte`) — Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *À dessiner :* Hotte vue de dessous : filtre à graisse métallique et son loquet ; filtre à charbon derrière (hotte en recyclage).
- **Remplacer la courroie d'un lave-linge** (`courroie-lave-linge`) — Zone d'intervention absente : la courroie, à l'arrière, n'apparaît pas.
  *À dessiner :* Lave-linge vu de dos, panneau retiré : grande poulie du tambour, courroie, petite poulie du moteur.
- **Lave-linge qui ne vidange plus** (`lave-linge-ne-vidange-pas`) — Zone d'intervention absente : le filtre de vidange n'apparaît pas.
  *À dessiner :* Bas de la façade : trappe ouverte, filtre de vidange, petit tuyau de purge, bac pour l'eau.
- **Lave-vaisselle qui lave mal** (`lave-vaisselle-lave-mal`) — Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *À dessiner :* Cuve vue de dessus : bras de lavage et leurs trous, filtre cylindrique et filtre plat au fond.
- **Réfrigérateur qui givre : vérifier le joint** (`joint-refrigerateur`) — Autre objet : lave-linge au lieu d'un réfrigérateur.
  *À dessiner :* Porte de réfrigérateur entrouverte : joint magnétique sur le pourtour ; test de la feuille de papier coincée dans la porte.
- **Aspirateur qui n'aspire plus** (`aspirateur-aspire-mal`) — Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *À dessiner :* Aspirateur traîneau : bac ou sac, filtres (moteur et sortie), tuyau, brosse ; trajet de l'air fléché.
- **Détartrer une cafetière filtre** (`detartrer-cafetiere`) — Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *À dessiner :* Cafetière filtre en coupe : réservoir d'eau, tube d'eau chaude et plaque chauffante, porte-filtre, verseuse.
- **Remplacer la sécurité de porte d'un lave-linge** (`securite-porte-lave-linge`) — La sécurité de porte, objet de la fiche, n'est pas dessinée ; « Joint » pointe la carrosserie.
  *À dessiner :* Lave-linge porte ouverte : joint de hublot et son collier, crochet de la porte, sécurité de porte à droite de l'ouverture (deux vis) et son connecteur.
- **Eau au fond du réfrigérateur : déboucher le trou d'évacuation** (`frigo-eau-au-fond`) — Autre objet : lave-linge au lieu d'un réfrigérateur.
  *À dessiner :* Paroi du fond du réfrigérateur : rigole, trou d'évacuation, tuyau vers le bac d'évaporation près du compresseur.
- **Nettoyer le condenseur du réfrigérateur** (`nettoyer-condenseur-frigo`) — Autre objet : lave-linge au lieu d'un réfrigérateur.
  *À dessiner :* Arrière du réfrigérateur : condenseur (serpentin) au dos ou en bas derrière la plinthe, brosse longue ; appareil débranché.
- **Détartrer une centrale vapeur** (`detartrer-centrale-vapeur`) — Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *À dessiner :* Centrale vapeur : fer, base avec réservoir, collecteur de tartre (si présent), bouchon de vidange de la chaudière.
- **Aspirateur robot qui nettoie mal : l'entretien complet** (`entretien-aspirateur-robot`) — Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *À dessiner :* Robot vu de dessous : brosse rouleau, brosses latérales, roues, capteurs de vide ; bac et filtre.
- **Climatiseur mobile qui refroidit mal : filtres et vidange** (`climatiseur-mobile-refroidit-mal`) — Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *À dessiner :* Climatiseur mobile vu de dos : grilles et filtres à air, gaine d'évacuation, bouchon de vidange des condensats.
- **Déshumidificateur : nettoyer le filtre et le réservoir** (`entretien-deshumidificateur`) — Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *À dessiner :* Déshumidificateur : préfiltre, réservoir d'eau et son flotteur, sortie de vidange continue.
- **Nettoyer son four : pyrolyse ou nettoyage à la main** (`nettoyer-four`) — Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *À dessiner :* Four porte ouverte : joint de porte, parois, grilles et lèchefrite.
- **Nettoyer un micro-ondes avec un bol d'eau et de vinaigre** (`nettoyer-micro-ondes`) — Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *À dessiner :* Micro-ondes ouvert : bol d'eau vinaigrée sur le plateau, parois, plateau tournant.
- **Nettoyer une plaque vitrocéramique ou à induction** (`nettoyer-plaque-vitroceramique`) — Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *À dessiner :* Plaque vue de dessus : foyers, grattoir à lame tenu incliné, nettoyant adapté ; plaque froide.
- **Grille-pain : retirer les miettes en toute sécurité** (`nettoyer-grille-pain`) — Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *À dessiner :* Grille-pain : fentes, tiroir à miettes sous l'appareil ; appareil débranché.
- **Cocotte-minute : entretenir le joint et les soupapes** (`joint-cocotte-minute`) — Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *À dessiner :* Couvercle vu de dessous : joint, soupape de fonctionnement, soupape de sécurité.
- **Friteuse : changer l'huile et entretenir les filtres** (`entretien-friteuse`) — Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *À dessiner :* Friteuse en coupe : cuve, huile, panier, filtre du couvercle, repères MIN et MAX.
- **Nettoyer un robot de cuisine ou un blender sans se couper** (`nettoyer-robot-mixeur`) — Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *À dessiner :* Bol de blender démonté : couteaux, joint, base moteur ; mains éloignées des lames.
- **Machine à pain : entretenir la cuve et le pétrin** (`entretien-machine-a-pain`) — Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *À dessiner :* Cuve de machine à pain : pétrin sur son axe, revêtement antiadhésif, joint de l'axe.
- **Nettoyer un extracteur de jus et son tamis** (`nettoyer-extracteur-de-jus`) — Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *À dessiner :* Extracteur démonté : vis sans fin, tamis, brosse, bol.
- **Nettoyer un appareil à raclette ou un grill** (`nettoyer-appareil-raclette`) — Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *À dessiner :* Appareil à raclette : plaque gril, poêlons, résistance ; appareil refroidi.
- **Yaourtière : nettoyage et yaourts trop liquides** (`entretien-yaourtiere`) — Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *À dessiner :* Yaourtière : base chauffante, pots, couvercle.
- **Nettoyer une trancheuse électrique sans se couper** (`nettoyer-trancheuse`) — Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *À dessiner :* Trancheuse : lame circulaire, protège-lame, chariot, molette d'épaisseur à zéro ; appareil débranché.
- **Nettoyer et détartrer une machine à glaçons** (`nettoyer-machine-a-glacons`) — Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *À dessiner :* Machine à glaçons : réservoir d'eau, panier et pelle, bouchon de vidange.
- **Nettoyer une tireuse à bière à chaque changement de fût** (`nettoyer-tireuse-a-biere`) — Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *À dessiner :* Tireuse : fût, tube de tirage, robinet, bac d'égouttage.
- **Carafe filtrante : changer et préparer la cartouche** (`cartouche-carafe-filtrante`) — Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *À dessiner :* Carafe : couvercle, entonnoir, cartouche et son encoche d'orientation, indicateur de changement.
- **Broyeur sous évier bloqué : le débloquer et l'entretenir** (`debloquer-broyeur-evier`) — Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *À dessiner :* Broyeur sous l'évier : clé à six pans dans l'axe sous l'appareil, bouton de réarmement ; jamais la main dans l'entrée.
- **Sèche-cheveux qui chauffe trop ou se coupe : nettoyer le filtre** (`nettoyer-filtre-seche-cheveux`) — Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *À dessiner :* Sèche-cheveux : grille d'entrée d'air à l'arrière (filtre amovible), sortie d'air.
- **Rasoir électrique : nettoyer, lubrifier et changer les têtes** (`entretien-rasoir-electrique`) — Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *À dessiner :* Rasoir : têtes de coupe et grilles, porte-têtes ouvert, brosse.
- **Brosse à dents électrique : entretien et brossette** (`entretien-brosse-a-dents-electrique`) — Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *À dessiner :* Brosse à dents : manche, axe métallique, brossette ; dépôts sous la brossette.
- **Détartrer un stérilisateur de biberons** (`detartrer-sterilisateur-biberons`) — Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *À dessiner :* Stérilisateur électrique : plaque chauffante entartrée, cuve, paniers.
- **Nettoyer les pales et la grille d'un ventilateur** (`nettoyer-ventilateur`) — Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *À dessiner :* Ventilateur : grille avant à clips, pales, écrou de l'hélice, grille arrière.
- **Purificateur d'air : entretenir et changer les filtres** (`filtres-purificateur-air`) — Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *À dessiner :* Purificateur ouvert : préfiltre, filtre HEPA, filtre à charbon, sens de l'air.
- **Nettoyeur vapeur : bonne eau et détartrage** (`detartrer-nettoyeur-vapeur`) — Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *À dessiner :* Nettoyeur vapeur : réservoir, bouchon de sécurité, chaudière.
- **Table à repasser : changer la housse** (`housse-table-a-repasser`) — Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *À dessiner :* Plateau de table à repasser : housse, mousse, cordon de serrage sous le plateau.
- **Cireuse à parquet : cirer, lustrer et entretenir** (`entretien-cireuse`) — Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *À dessiner :* Cireuse vue de dessous : brosses ou disques, feutres de lustrage.

### Téléphonie & Informatique (12)

- **Imprimante qui laisse des traits : nettoyer les têtes** (`tetes-impression-imprimante`) — Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *À dessiner :* Imprimante capot ouvert : chariot, cartouches ou réservoirs, tête d'impression ; page de test des buses.
- **Nettoyer un clavier et débloquer une touche** (`touche-clavier-bloquee`) — Zone d'intervention absente : le clavier n'est pas désigné.
  *À dessiner :* Clavier incliné : touche, mécanisme sous la touche, miettes ; bombe d'air sec.
- **Téléphone qui ne charge plus bien** (`telephone-ne-charge-plus`) — Le port de charge est placé sur le côté au lieu du bas, et les peluches au fond du port, cause habituelle, n'apparaissent pas.
  *À dessiner :* Bas du téléphone : port de charge, peluches au fond du port, cure-dent en bois, câble.
- **Redonner de la vitesse à un vieil ordinateur** (`pc-lent`) — Repères sans rapport : le problème est surtout logiciel.
  *À dessiner :* Écran de l'ordinateur : applications au démarrage, espace disque libre ; encart : aérations à dépoussiérer.
- **Nettoyer une montre connectée et son bracelet** (`nettoyer-montre-connectee`) — Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *À dessiner :* Montre : boîtier, capteurs au dos, bracelet démonté (barrettes).
- **Mettre à jour les cartes d'un GPS voiture** (`mettre-a-jour-gps`) — Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *À dessiner :* GPS relié à l'ordinateur par câble USB, logiciel du fabricant, espace mémoire.
- **Nettoyer un écran de télé ou d'ordinateur sans l'abîmer** (`nettoyer-ecran-tv`) — Autre objet : téléphone au lieu d'un écran de télévision.
  *À dessiner :* Écran éteint : chiffon microfibre sec, puis légèrement humide, sans pulvériser sur l'écran.
- **Vidéoprojecteur : nettoyer le filtre à air** (`filtre-videoprojecteur`) — Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *À dessiner :* Vidéoprojecteur : capot du filtre à air, filtre, aérations, objectif.
- **Lecteur DVD ou Blu-ray qui ne lit plus les disques** (`lecteur-dvd-ne-lit-plus`) — Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *À dessiner :* Lecteur : tiroir, disque (face lisible), lentille laser (ne pas toucher).
- **Barre de son ou home cinéma sans son avec la télé** (`barre-de-son-pas-de-son`) — Repères sans rapport : le problème vient des branchements et réglages.
  *À dessiner :* Télé et barre de son : câble HDMI sur les ports ARC/eARC, câble optique, réglage de la sortie audio.
- **Nettoyer des écouteurs ou un casque** (`nettoyer-ecouteurs-casque`) — Dessin méconnaissable : ni des écouteurs ni un casque.
  *À dessiner :* Écouteurs intra et casque : grilles des haut-parleurs, embouts silicone retirés, brosse souple.
- **Nettoyer l'objectif d'un appareil photo** (`nettoyer-objectif-appareil-photo`) — Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *À dessiner :* Objectif : lentille frontale, soufflette, pinceau, chiffon microfibre.

### Maison & Bricolage (20)

- **Détartrer un pommeau de douche** (`detartrer-pommeau-douche`) — Autre objet : robinet et cartouche au lieu du pommeau.
  *À dessiner :* Pommeau de douche : buses entartrées, sachet de vinaigre tenu par un élastique, raccord dévissable.
- **Régler une porte de placard qui frotte ou penche** (`regler-porte-placard`) — Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *À dessiner :* Charnière invisible (à cuvette) de face : vis de réglage latéral, de profondeur et de hauteur, avec flèches.
- **Déboucher des toilettes** (`deboucher-toilettes`) — Même dessin que la chasse d'eau (« Réservoir », « Mécanisme ») : ni la cuvette, ni le siphon, ni l'évacuation.
  *À dessiner :* Cuvette en coupe : siphon, bouchon, ventouse à collerette, niveau d'eau.
- **Réparer un robinet qui fuit** (`robinet-qui-fuit`) — Dessin abstrait (un tuyau coudé) : on ne reconnaît ni le bec, ni la poignée, ni l'emplacement de la cartouche.
  *À dessiner :* Robinet en coupe : cache et vis de poignée, écrou, tête à clapet ou cartouche de mitigeur, joint ; robinets d'arrêt sous l'évier.
- **Chasse d'eau qui coule en permanence** (`chasse-eau-coule`) — Dessin incohérent : « Réservoir » désigne le petit rectangle du haut alors que le mécanisme est dessiné dans la grande forme arrondie, qui évoque la cuvette.
  *À dessiner :* Réservoir ouvert : robinet flotteur et arrivée d'eau, mécanisme de chasse avec trop-plein (tube central) et joint plat du clapet, niveau d'eau 2 cm sous le haut du trop-plein.
- **Déboucher un évier** (`evier-bouche`) — Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *À dessiner :* Sous l'évier : bonde, siphon démontable (écrous), bassine dessous ; ventouse au-dessus.
- **Reboucher un trou dans un mur en placo** (`trou-placo`) — Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *À dessiner :* Plaque de plâtre en coupe : trou, renfort ou bande, couches d'enduit, ponçage.
- **Remplacer une prise électrique** (`remplacer-prise-electrique`) — Repère faux : « bornes » désigne les trous de la façade ; les bornes sont à l'arrière.
  *À dessiner :* Prise démontée : bornes à l'arrière (phase, neutre, terre vert-jaune), mécanisme, plaque, fixations ; disjoncteur coupé.
- **Refaire un joint silicone de salle de bain** (`refaire-joint-silicone`) — Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *À dessiner :* Angle baignoire-carrelage en coupe : ancien joint retiré, ruban de masquage, cordon de silicone, lissage.
- **Changer un flexible de douche** (`changer-flexible-douche`) — Autre objet : robinet et cartouche au lieu du flexible.
  *À dessiner :* Mitigeur, flexible et pommeau : écrous de raccord aux deux bouts, joints plats à remplacer.
- **Chauffe-eau : entretenir le groupe de sécurité** (`groupe-securite-chauffe-eau`) — Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *À dessiner :* Groupe de sécurité sous le chauffe-eau : arrivée d'eau froide, robinet, soupape à manœuvrer, siphon d'évacuation.
- **Nettoyer les bouches et entrées d'air de la VMC** (`nettoyer-bouches-vmc`) — Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *À dessiner :* Bouche d'extraction au plafond : grille démontable, réglage d'ouverture ; entrée d'air au-dessus de la fenêtre.
- **Poêle à granulés : l'entretien courant** (`entretien-poele-granules`) — Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *À dessiner :* Poêle porte ouverte : creuset et ses trous d'air, cendrier, vitre ; trémie à granulés.
- **Perceuse-visseuse sans fil : batterie, mandrin et aérations** (`entretien-perceuse-visseuse`) — Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *À dessiner :* Perceuse-visseuse : batterie retirée, mandrin, aérations du moteur, chargeur.
- **Ponceuse : changer l'abrasif et nettoyer le plateau** (`entretien-ponceuse`) — Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *À dessiner :* Ponceuse vue de dessous : plateau à scratch, abrasif, trous d'aspiration alignés, sac à poussière.
- **Aspirateur eau et poussières : nettoyer le filtre** (`filtre-aspirateur-eau-poussiere`) — Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *À dessiner :* Aspirateur de chantier : cuve, filtre cartouche plissé, flotteur, tuyau.
- **Radiateur électrique : le dépoussiérer avant l'hiver** (`entretien-radiateur-electrique`) — Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *À dessiner :* Radiateur : grilles d'entrée d'air en bas et de sortie en haut, façade, thermostat.
- **Pompe à chaleur : entretien obligatoire et gestes simples** (`entretien-pompe-a-chaleur`) — Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *À dessiner :* Unité extérieure : grille du ventilateur, ailettes de l'échangeur, évacuation des condensats ; espace libre autour.
- **Portail ou porte de garage motorisé : entretien et cellules** (`entretien-portail-motorise`) — Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *À dessiner :* Portail : cellules photoélectriques (émetteur et récepteur), moteur, rail ou crémaillère, feu clignotant.
- **Interphone ou visiophone qui ne sonne plus** (`visiophone-ne-sonne-plus`) — Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *À dessiner :* Platine de rue et poste intérieur : alimentation, piles (modèles sans fil), volume de la sonnerie.

### Vélo & Mobilité (7)

- **Gonfler un pneu de vélo à la bonne pression** (`gonfler-pneu-velo`) — Repères faux : « Pneu » et « Valve » pointent une barre entre les deux roues, pas la roue.
  *À dessiner :* Roue de vélo : pneu (pression lue sur le flanc), jante, valve Presta ou Schrader, embout de pompe.
- **Réparer une crevaison de vélo** (`crevaison-velo`) — Repères faux : « Pneu » et « Valve » pointent une barre entre les deux roues, pas la roue.
  *À dessiner :* Roue démontée : pneu, chambre à air, valve, démonte-pneus, rustine sur le trou.
- **Régler les freins d'un vélo** (`regler-freins-velo`) — Dessin confus : cadre en zigzag et « Câble / patin » placé sous la roue, loin du frein.
  *À dessiner :* Frein à patins vu de face : bras, patins à plat sur la jante, câble et sa vis de serrage, vis de rappel ; molette de réglage au levier.
- **Nettoyer et graisser une chaîne de vélo** (`entretien-chaine-velo`) — « Transmission » pointe le haut du cadre ; ni la chaîne, ni le plateau, ni les pignons ne sont dessinés.
  *À dessiner :* Vélo de profil côté transmission : plateau, chaîne, cassette, dérailleur ; burette au-dessus des rouleaux de la chaîne, chiffon, pédalier tourné à l'envers.
- **Régler le dérailleur arrière d'un vélo** (`regler-derailleur-arriere`) — « Chaîne » pointe le hauban du cadre : la chaîne n'est pas dessinée.
  *À dessiner :* Dérailleur arrière en gros plan : patte, vis de butée H et L, vis B, galets, cassette, chaîne, molette de tension du câble.
- **Trottinette électrique : l'entretien régulier** (`entretien-trottinette-electrique`) — Autre objet : vélo à chaîne au lieu d'une trottinette.
  *À dessiner :* Trottinette de profil : pneus, freins, système de pliage, visserie de la potence ; batterie dans le plateau.
- **Hoverboard qui tire d'un côté : le recalibrer** (`calibrer-hoverboard`) — Autre objet : vélo à chaîne au lieu d'un hoverboard.
  *À dessiner :* Hoverboard posé à plat : deux plateaux, roues, bouton marche, voyants ; plateaux horizontaux pendant le calibrage.

### Jardin & Extérieur (11)

- **Recharger le fil d'un coupe-bordure** (`fil-coupe-bordure`) — Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *À dessiner :* Tête du coupe-bordure ouverte : bobine, sens d'enroulement fléché, fil, œillets de sortie.
- **Nettoyer et affûter un sécateur** (`affuter-secateur`) — Dessin méconnaissable (deux barres croisées) : ni la lame coupante ni son biseau, seul côté à affûter, ne sont visibles.
  *À dessiner :* Sécateur ouvert : lame coupante avec son biseau, contre-lame plate, axe et ressort ; pierre posée à plat sur le biseau, poussée de la base vers la pointe.
- **Réparer un tuyau d'arrosage percé** (`tuyau-arrosage-perce`) — Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *À dessiner :* Tuyau coupé de part et d'autre de la fuite, raccord réparateur entre les deux bouts.
- **Affûter la lame d'une tondeuse** (`affuter-lame-tondeuse`) — Zone d'intervention absente : la lame, sous le carter, n'apparaît pas.
  *À dessiner :* Tondeuse basculée, filtre à air vers le haut : lame, écrou central, cale en bois ; bougie débranchée.
- **Robot tondeuse : nettoyage, lames et hivernage** (`entretien-robot-tondeuse`) — Autre objet : tondeuse thermique au lieu d'un robot.
  *À dessiner :* Robot vu de dessous : disque porte-lames, petites lames pivotantes, roues ; station de charge.
- **Nettoyeur haute pression : vidanger et hiverner** (`hivernage-nettoyeur-haute-pression`) — Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *À dessiner :* Nettoyeur haute pression : arrivée d'eau et son filtre, pompe, flexible, pistolet ; vidange avant le gel.
- **Taille-haie : nettoyer et huiler les lames** (`entretien-taille-haie`) — Autre objet : tondeuse au lieu d'un taille-haie.
  *À dessiner :* Lamier du taille-haie : deux lames dentées, fourreau ; zones à brosser et à huiler.
- **Souffleur de feuilles : entretien et hivernage** (`entretien-souffleur-feuilles`) — Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *À dessiner :* Souffleur thermique : filtre à air sous son capot, bougie, réservoir, tube de soufflage.
- **Motobineuse : huile, filtre à air et hivernage** (`entretien-motobineuse`) — Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *À dessiner :* Motobineuse : moteur avec jauge et bouchon de vidange, filtre à air, fraises.
- **Amorcer une pompe de surface ou d'arrosage** (`amorcer-pompe-surface`) — Zone d'intervention absente : le bouchon d'amorçage n'apparaît pas.
  *À dessiner :* Pompe de surface : bouchon de remplissage sur le dessus, tuyau d'aspiration avec clapet, refoulement.
- **Piscine : pH, chlore et filtration au quotidien** (`entretien-eau-piscine`) — « Filtration » pointe un arc dans le bassin : ni skimmer, ni pompe, ni filtre.
  *À dessiner :* Piscine en coupe : skimmers et leurs paniers, pompe et préfiltre, filtre, refoulement ; trousse d'analyse pH (7,2 à 7,6) et chlore.

### Jeux & Loisirs (3)

- **Réparer un matelas gonflable percé** (`matelas-gonflable-perce`) — Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *À dessiner :* Matelas : eau savonneuse sur la zone suspecte (bulles), trou marqué, rustine et colle, valve.
- **Réinitialiser une manette PS5 qui ne répond plus** (`reinitialiser-manette-ps5`) — Zone d'intervention absente : le petit bouton de réinitialisation, au dos, n'apparaît pas.
  *À dessiner :* Dos de la manette : petit trou de réinitialisation, trombone déplié, câble USB.
- **Dépoussiérer une PS5 qui chauffe ou souffle fort** (`depoussierer-ps5`) — Autre objet : manette au lieu de la console.
  *À dessiner :* Console couchée, façade retirée : ventilateur, pièges à poussière, aspirateur à faible puissance.

### Mode & Accessoires (3)

- **Réparer un trou dans un jean sans couture** (`patch-jean`) — Dessin sans détail utile (un trapèze et une couture) : ni le trou ni la pièce ne sont dessinés.
  *À dessiner :* Jambe de jean retournée : trou, pièce thermocollante, fer à repasser et torchon.
- **Recoudre un bouton** (`recoudre-bouton`) — Autre objet : fermeture éclair au lieu d'un bouton.
  *À dessiner :* Bouton à quatre trous sur le tissu : fil en croix ou en parallèle, tige de fil sous le bouton, nœud au dos.
- **Réparer une fermeture éclair qui s'ouvre** (`fermeture-eclair`) — Le curseur, où l'on intervient, n'est pas dessiné ; « Couture » pointe la fermeture elle-même.
  *À dessiner :* Fermeture vue de face : curseur, deux rangées de dents, arrêt du bas, ruban cousu ; pince plate serrant l'arrière du curseur, un côté puis l'autre.

### Instruments de musique (2)

- **Changer les cordes d'une guitare classique** (`cordes-guitare-classique`) — Dessin méconnaissable (deux cercles et des cordes) : ce n'est pas une guitare.
  *À dessiner :* Guitare classique : chevalet et nœud de la corde, tête ajourée avec mécaniques, sillet.
- **Changer les cordes d'une guitare folk** (`cordes-guitare-folk`) — Dessin méconnaissable (deux cercles et des cordes) : ce n'est pas une guitare.
  *À dessiner :* Guitare folk : chevalet et chevilles, tête pleine avec mécaniques, sens d'enroulement.

## Intégrer un schéma refait

1. Déposer le nouveau pack (même structure : `manifest.json`, `svg/<id>.svg` au gabarit 1200 × 780).
2. Relire le schéma face au texte de la fiche ; dans `tools/data/illustrations-review.json`, passer la fiche à
   `"statut": "valide"` (et, si un repère est mal placé, donner la liste `reperes` corrigée).
3. Lancer `node tools/illustrations.js <dossier du pack>`, puis `node tools/build.js`, `node tests/validate.js` et `node tests/e2e.js`.
