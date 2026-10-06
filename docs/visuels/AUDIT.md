# Schémas techniques des fiches : relecture et redessin

Ce fichier est produit par `node tools/illustrations.js` à partir de `tools/data/illustrations-review.json`.
Pour changer une décision, modifier ce fichier de relecture puis relancer la commande.

**Règle appliquée**, celle de la bible des visuels (`docs/visuels/VISUELS_TECHNIQUES.md`) : « Une belle image fausse est pire
qu'une image simple mais juste. » Un schéma n'est affiché que s'il montre le bon objet et que chaque repère désigne la
bonne pièce, d'après le texte de sa fiche. Tous restent des **schémas de principe** : la mention « la conception peut
varier selon le modèle » accompagne chacun d'eux.

## Résultat (6 octobre 2026)

- **124 fiches sur 124 ont leur schéma technique**.
- 12 schémas viennent du pack « Illustrations v1 », relus un par un (4 avec des repères corrigés).
- 112 schémas du pack étaient faux ou passe-partout : ils ont été **redessinés** par Les Pages Bleues
  (`tools/dessins/`), d'après la consigne écrite pour chacun, puis relus de la même façon.

## Traitement commun

- Les fichiers du pack avaient des **balises cassées** (`/>circle` au lieu de `/><circle`) : un élément du dessin ne
  s'affichait pas. Elles sont réparées.
- Seule la **zone de dessin** est gardée : ni titre, ni texte provisoire (« Famille d'équipement »), ni faux bouton.
- Les **repères** sont redessinés en bleu Pages Bleues, numérotés, sans traits qui se croisent ; la légende est écrite
  en texte dans la fiche, lisible sur téléphone et par les lecteurs d'écran.
- Aucun contenu actif ou externe n'est accepté (script, lien, image, style) : seulement des formes simples.

## Schémas du pack, relus (12)

| Fiche | Repères | Correction |
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

## Schémas redessinés (112)

Pour chaque fiche : le défaut du schéma d'origine, puis ce que montre le nouveau schéma.

### Auto / Moto (13)

- **Vérifier et régler la pression des pneus** (`pression-pneus-voiture`) — *Pack :* Autre objet : disque et étrier de frein au lieu d'un pneu.
  *Nouveau schéma :* 1. Étiquette des pressions (portière ou trappe à carburant) ; 2. Jante ; 3. Pneu ; 4. Manomètre du gonfleur ; 5. Valve.
- **Changer la pile d'une clé de voiture** (`pile-cle-voiture`) — *Pack :* Autre objet : batterie de voiture au lieu d'une télécommande de clé.
  *Nouveau schéma :* 1. Coque avec les boutons ; 2. Pile bouton (face + vers le haut) ; 3. Logement de la pile ; 4. Fente d'ouverture.
- **Changer l'huile moteur** (`vidange-huile-moteur`) — *Pack :* Zone d'intervention absente : ni bouchon de vidange ni filtre à huile.
  *Nouveau schéma :* 1. Bouchon de remplissage ; 2. Jauge ; 3. Filtre à huile ; 4. Carter d'huile ; 5. Bouchon de vidange ; 6. Bac de récupération.
- **Voiture qui ne démarre plus : diagnostic** (`voiture-ne-demarre-plus`) — *Pack :* Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *Nouveau schéma :* 1. Masse sur la carrosserie ; 2. Cosse + (rouge) ; 3. Cosse − (vers la masse) ; 4. Démarreur ; 5. Multimètre.
- **Changer une ampoule de phare** (`ampoule-phare`) — *Pack :* Autre objet : ampoule domestique au lieu d'une ampoule de phare à culot.
  *Nouveau schéma :* 1. Cache de protection (retiré) ; 2. Ressort de maintien ; 3. Culot de l'ampoule ; 4. Connecteur ; 5. Verre : ne pas le toucher.
- **Remplacer les balais d'essuie-glace** (`balais-essuie-glace`) — *Pack :* Un seul trait : « Balai » et « Bras » désignent le même objet ; l'agrafe de fixation, où l'on intervient, n'apparaît pas.
  *Nouveau schéma :* 1. Crochet en U ; 2. Languette de verrouillage ; 3. Balai ; 4. Bras d'essuie-glace ; 5. Serviette sur le pare-brise.
- **Changer une roue crevée** (`changer-roue`) — *Pack :* Autre objet : disque de frein au lieu de la roue et du cric.
  *Nouveau schéma :* 1. Écrous : serrage en étoile ; 2. Roue ; 3. Point de levage ; 4. Cric.
- **Remplacer un fusible de voiture** (`changer-fusible-voiture`) — *Pack :* Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *Nouveau schéma :* 1. Fusibles enfichables ; 2. Plan au dos du couvercle ; 3. Pince d'extraction ; 4. Fusible bon : filament entier ; 5. Fusible fondu : filament coupé.
- **Contrôler le liquide de refroidissement** (`liquide-refroidissement`) — *Pack :* Repère faux : le liquide de refroidissement ne se lit pas à la jauge mais sur le vase d'expansion.
  *Nouveau schéma :* 1. Bouchon : l'ouvrir seulement moteur froid ; 2. Vase d'expansion ; 3. Repère MAX ; 4. Repère MIN ; 5. Bon niveau : entre MIN et MAX.
- **Changer le filtre d'habitacle (filtre à pollen)** (`filtre-habitacle`) — *Pack :* Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *Nouveau schéma :* 1. Trappe ; 2. Logement du filtre ; 3. Flèche : sens de l'air ; 4. Filtre à pollen ; 5. Boîte à gants déposée.
- **Nettoyer, graisser et contrôler la chaîne de sa moto** (`entretien-chaine-moto`) — *Pack :* Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *Nouveau schéma :* 1. Couronne ; 2. Pignon ; 3. Tension : jeu mesuré au milieu ; 4. Chaîne (brin inférieur) ; 5. Béquille.
- **Vérifier la pression des pneus de sa moto** (`pression-pneus-moto`) — *Pack :* Autre objet : disque et étrier de frein au lieu d'un pneu de moto.
  *Nouveau schéma :* 1. Pressions avant / arrière (notice) ; 2. Jante ; 3. Pneu ; 4. Manomètre ; 5. Valve.
- **Préparer sa moto pour l'hiver (hivernage)** (`hivernage-moto`) — *Pack :* Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *Nouveau schéma :* 1. Réservoir (plein) ; 2. Pneus ; 3. Batterie ; 4. Housse respirante ; 5. Béquille centrale ; 6. Mainteneur de charge.

### Électroménager (41)

- **Sèche-linge qui sèche mal : nettoyer filtres et condenseur** (`filtre-seche-linge`) — *Pack :* Zone d'intervention absente : ni filtre de porte ni condenseur.
  *Nouveau schéma :* 1. Réservoir d'eau ; 2. Porte ouverte ; 3. Filtre de porte ; 4. Condenseur, derrière la plinthe (selon modèle).
- **Dégivrer un congélateur** (`degivrer-congelateur`) — *Pack :* Autre objet : lave-linge avec « tambour » au lieu d'un congélateur.
  *Nouveau schéma :* 1. Givre sur les parois ; 2. Spatule en plastique ; 3. Casserole d'eau chaude ; 4. Jamais d'objet pointu ; 5. Serviettes et bac pour l'eau de fonte.
- **Nettoyer les filtres d'une hotte qui aspire mal** (`nettoyer-filtre-hotte`) — *Pack :* Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *Nouveau schéma :* 1. Filtre à graisse métallique ; 2. Loquet du filtre ; 3. Filtre à charbon (hotte en recyclage).
- **Remplacer la courroie d'un lave-linge** (`courroie-lave-linge`) — *Pack :* Zone d'intervention absente : la courroie, à l'arrière, n'apparaît pas.
  *Nouveau schéma :* 1. Grande poulie du tambour ; 2. Courroie ; 3. Petite poulie du moteur ; 4. Moteur.
- **Lave-linge qui ne vidange plus** (`lave-linge-ne-vidange-pas`) — *Pack :* Zone d'intervention absente : le filtre de vidange n'apparaît pas.
  *Nouveau schéma :* 1. Filtre de vidange (à dévisser) ; 2. Tuyau de purge ; 3. Trappe ouverte ; 4. Bac plat pour l'eau.
- **Lave-vaisselle qui lave mal** (`lave-vaisselle-lave-mal`) — *Pack :* Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *Nouveau schéma :* 1. Trous à déboucher ; 2. Bras de lavage ; 3. Filtre cylindrique ; 4. Filtre plat.
- **Réfrigérateur qui givre : vérifier le joint** (`joint-refrigerateur`) — *Pack :* Autre objet : lave-linge au lieu d'un réfrigérateur.
  *Nouveau schéma :* 1. Feuille de papier coincée : elle doit résister ; 2. Porte ; 3. Joint magnétique (tout le tour de la porte).
- **Aspirateur qui n'aspire plus** (`aspirateur-aspire-mal`) — *Pack :* Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *Nouveau schéma :* 1. Flexible et tube ; 2. Filtre de sortie ; 3. Sac ou bac ; 4. Filtre moteur ; 5. Brosse.
- **Détartrer une cafetière filtre** (`detartrer-cafetiere`) — *Pack :* Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *Nouveau schéma :* 1. Porte-filtre ; 2. Tube d'eau chaude ; 3. Verseuse ; 4. Réservoir d'eau ; 5. Plaque chauffante.
- **Remplacer la sécurité de porte d'un lave-linge** (`securite-porte-lave-linge`) — *Pack :* La sécurité de porte, objet de la fiche, n'est pas dessinée ; « Joint » pointe la carrosserie.
  *Nouveau schéma :* 1. Collier du joint ; 2. Sécurité de porte (deux vis) ; 3. Crochet de la porte ; 4. Joint de hublot ; 5. Connecteur.
- **Eau au fond du réfrigérateur : déboucher le trou d'évacuation** (`frigo-eau-au-fond`) — *Pack :* Autre objet : lave-linge au lieu d'un réfrigérateur.
  *Nouveau schéma :* 1. Compresseur ; 2. Trou d'évacuation ; 3. Rigole ; 4. Tuyau d'évacuation ; 5. Bac d'évaporation.
- **Nettoyer le condenseur du réfrigérateur** (`nettoyer-condenseur-frigo`) — *Pack :* Autre objet : lave-linge au lieu d'un réfrigérateur.
  *Nouveau schéma :* 1. Brosse souple ; 2. Condenseur (au dos, ou en bas selon le modèle) ; 3. Compresseur ; 4. Prise débranchée.
- **Détartrer une centrale vapeur** (`detartrer-centrale-vapeur`) — *Pack :* Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *Nouveau schéma :* 1. Fer ; 2. Semelle ; 3. Réservoir d'eau ; 4. Cuve (chaudière) ; 5. Collecteur de tartre (si présent).
- **Aspirateur robot qui nettoie mal : l'entretien complet** (`entretien-aspirateur-robot`) — *Pack :* Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *Nouveau schéma :* 1. Capteur de vide ; 2. Brosse latérale ; 3. Roue ; 4. Brosse rouleau ; 5. Bac et filtre.
- **Climatiseur mobile qui refroidit mal : filtres et vidange** (`climatiseur-mobile-refroidit-mal`) — *Pack :* Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *Nouveau schéma :* 1. Gaine d'évacuation ; 2. Filtre à air (haut) ; 3. Filtre à air (bas) ; 4. Bouchon de vidange.
- **Déshumidificateur : nettoyer le filtre et le réservoir** (`entretien-deshumidificateur`) — *Pack :* Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *Nouveau schéma :* 1. Préfiltre ; 2. Sortie de vidange continue ; 3. Flotteur ; 4. Réservoir d'eau.
- **Nettoyer son four : pyrolyse ou nettoyage à la main** (`nettoyer-four`) — *Pack :* Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *Nouveau schéma :* 1. Parois ; 2. Joint de porte ; 3. Grille ; 4. Lèchefrite ; 5. Porte (vitre).
- **Nettoyer un micro-ondes avec un bol d'eau et de vinaigre** (`nettoyer-micro-ondes`) — *Pack :* Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *Nouveau schéma :* 1. Parois ; 2. Plaque de mica (ne pas frotter) ; 3. Porte ; 4. Bol d'eau vinaigrée ; 5. Plateau tournant.
- **Nettoyer une plaque vitrocéramique ou à induction** (`nettoyer-plaque-vitroceramique`) — *Pack :* Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *Nouveau schéma :* 1. Foyer ; 2. Résidus cuits ; 3. Grattoir à lame, tenu incliné.
- **Grille-pain : retirer les miettes en toute sécurité** (`nettoyer-grille-pain`) — *Pack :* Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *Nouveau schéma :* 1. Fentes ; 2. Manette ; 3. Tiroir à miettes ; 4. Prise débranchée.
- **Cocotte-minute : entretenir le joint et les soupapes** (`joint-cocotte-minute`) — *Pack :* Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *Nouveau schéma :* 1. Joint ; 2. Soupape de sécurité ; 3. Soupape de fonctionnement ; 4. Couvercle.
- **Friteuse : changer l'huile et entretenir les filtres** (`entretien-friteuse`) — *Pack :* Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *Nouveau schéma :* 1. Filtre du couvercle ; 2. Panier ; 3. Repère MAX ; 4. Repère MIN ; 5. Huile ; 6. Cuve.
- **Nettoyer un robot de cuisine ou un blender sans se couper** (`nettoyer-robot-mixeur`) — *Pack :* Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *Nouveau schéma :* 1. Bol ; 2. Couteaux (mains à distance) ; 3. Joint ; 4. Bloc moteur : essuyer, jamais dans l'eau.
- **Machine à pain : entretenir la cuve et le pétrin** (`entretien-machine-a-pain`) — *Pack :* Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *Nouveau schéma :* 1. Cuve (revêtement antiadhésif) ; 2. Pétrin ; 3. Joint de l'axe ; 4. Axe du pétrin.
- **Nettoyer un extracteur de jus et son tamis** (`nettoyer-extracteur-de-jus`) — *Pack :* Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *Nouveau schéma :* 1. Vis sans fin ; 2. Brosse ; 3. Tamis ; 4. Bol.
- **Nettoyer un appareil à raclette ou un grill** (`nettoyer-appareil-raclette`) — *Pack :* Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *Nouveau schéma :* 1. Plaque gril ; 2. Résistance (ne jamais mouiller) ; 3. Poêlons ; 4. Base.
- **Yaourtière : nettoyage et yaourts trop liquides** (`entretien-yaourtiere`) — *Pack :* Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *Nouveau schéma :* 1. Couvercle ; 2. Pots ; 3. Base chauffante (essuyer seulement).
- **Nettoyer une trancheuse électrique sans se couper** (`nettoyer-trancheuse`) — *Pack :* Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *Nouveau schéma :* 1. Protège-lame ; 2. Lame circulaire ; 3. Chariot ; 4. Molette d'épaisseur sur zéro ; 5. Prise débranchée.
- **Nettoyer et détartrer une machine à glaçons** (`nettoyer-machine-a-glacons`) — *Pack :* Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *Nouveau schéma :* 1. Panier à glaçons ; 2. Pelle ; 3. Réservoir d'eau ; 4. Bouchon de vidange.
- **Nettoyer une tireuse à bière à chaque changement de fût** (`nettoyer-tireuse-a-biere`) — *Pack :* Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *Nouveau schéma :* 1. Tube de tirage (à changer) ; 2. Robinet ; 3. Fût ; 4. Bac d'égouttage.
- **Carafe filtrante : changer et préparer la cartouche** (`cartouche-carafe-filtrante`) — *Pack :* Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *Nouveau schéma :* 1. Couvercle ; 2. Indicateur de changement ; 3. Entonnoir ; 4. Encoche d'orientation ; 5. Cartouche.
- **Broyeur sous évier bloqué : le débloquer et l'entretenir** (`debloquer-broyeur-evier`) — *Pack :* Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *Nouveau schéma :* 1. Entrée : jamais la main dedans ; 2. Broyeur ; 3. Bouton de réarmement ; 4. Empreinte six pans (dessous, au centre) ; 5. Clé six pans.
- **Sèche-cheveux qui chauffe trop ou se coupe : nettoyer le filtre** (`nettoyer-filtre-seche-cheveux`) — *Pack :* Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *Nouveau schéma :* 1. Filtre arrière (entrée d'air) ; 2. Corps ; 3. Sortie d'air.
- **Rasoir électrique : nettoyer, lubrifier et changer les têtes** (`entretien-rasoir-electrique`) — *Pack :* Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *Nouveau schéma :* 1. Têtes de coupe et grilles ; 2. Porte-têtes ouvert ; 3. Logement des poils ; 4. Brosse.
- **Brosse à dents électrique : entretien et brossette** (`entretien-brosse-a-dents-electrique`) — *Pack :* Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *Nouveau schéma :* 1. Axe métallique ; 2. Brossette (retirée) ; 3. Dépôts sous la brossette ; 4. Manche.
- **Détartrer un stérilisateur de biberons** (`detartrer-sterilisateur-biberons`) — *Pack :* Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *Nouveau schéma :* 1. Panier ; 2. Cuve ; 3. Plaque chauffante (tartre) ; 4. Base.
- **Nettoyer les pales et la grille d'un ventilateur** (`nettoyer-ventilateur`) — *Pack :* Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *Nouveau schéma :* 1. Grille avant ; 2. Écrou de l'hélice ; 3. Pale ; 4. Clip de la grille.
- **Purificateur d'air : entretenir et changer les filtres** (`filtres-purificateur-air`) — *Pack :* Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *Nouveau schéma :* 1. Sortie d'air ; 2. Préfiltre ; 3. Filtre HEPA ; 4. Filtre à charbon ; 5. Entrée d'air.
- **Nettoyeur vapeur : bonne eau et détartrage** (`detartrer-nettoyeur-vapeur`) — *Pack :* Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *Nouveau schéma :* 1. Bouchon de sécurité (à froid) ; 2. Flexible ; 3. Niveau d'eau ; 4. Chaudière.
- **Table à repasser : changer la housse** (`housse-table-a-repasser`) — *Pack :* Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *Nouveau schéma :* 1. Housse ; 2. Mousse ; 3. Plateau ; 4. Cordon de serrage (sous le plateau).
- **Cireuse à parquet : cirer, lustrer et entretenir** (`entretien-cireuse`) — *Pack :* Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *Nouveau schéma :* 1. Brosse (ou disque) ; 2. Fixation centrale ; 3. Feutre de lustrage.

### Téléphonie & Informatique (12)

- **Imprimante qui laisse des traits : nettoyer les têtes** (`tetes-impression-imprimante`) — *Pack :* Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *Nouveau schéma :* 1. Capot ouvert ; 2. Chariot ; 3. Cartouches ou réservoirs ; 4. Tête d'impression (dessous) ; 5. Page de test des buses.
- **Nettoyer un clavier et débloquer une touche** (`touche-clavier-bloquee`) — *Pack :* Zone d'intervention absente : le clavier n'est pas désigné.
  *Nouveau schéma :* 1. Touche bloquée ; 2. Bombe d'air sec (tige) ; 3. Mécanisme sous la touche ; 4. Miettes.
- **Téléphone qui ne charge plus bien** (`telephone-ne-charge-plus`) — *Pack :* Le port de charge est placé sur le côté au lieu du bas, et les peluches au fond du port, cause habituelle, n'apparaissent pas.
  *Nouveau schéma :* 1. Peluches au fond du port ; 2. Port de charge ; 3. Cure-dent en bois (pas de métal) ; 4. Câble (essayer un autre).
- **Redonner de la vitesse à un vieil ordinateur** (`pc-lent`) — *Pack :* Repères sans rapport : le problème est surtout logiciel.
  *Nouveau schéma :* 1. Applications au démarrage ; 2. Espace disque libre ; 3. Aérations à dépoussiérer.
- **Nettoyer une montre connectée et son bracelet** (`nettoyer-montre-connectee`) — *Pack :* Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *Nouveau schéma :* 1. Bracelet (détaché) ; 2. Barrette à ressort ; 3. Capteurs au dos ; 4. Boîtier ; 5. Chiffon doux.
- **Mettre à jour les cartes d'un GPS voiture** (`mettre-a-jour-gps`) — *Pack :* Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *Nouveau schéma :* 1. Logiciel du fabricant : mise à jour ; 2. Espace mémoire ; 3. GPS ; 4. Câble USB.
- **Nettoyer un écran de télé ou d'ordinateur sans l'abîmer** (`nettoyer-ecran-tv`) — *Pack :* Autre objet : téléphone au lieu d'un écran de télévision.
  *Nouveau schéma :* 1. Écran éteint et débranché ; 2. Chiffon microfibre sec, puis à peine humide ; 3. Ne pulvérisez jamais sur l'écran.
- **Vidéoprojecteur : nettoyer le filtre à air** (`filtre-videoprojecteur`) — *Pack :* Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *Nouveau schéma :* 1. Objectif ; 2. Aérations ; 3. Capot du filtre ; 4. Filtre à air.
- **Lecteur DVD ou Blu-ray qui ne lit plus les disques** (`lecteur-dvd-ne-lit-plus`) — *Pack :* Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *Nouveau schéma :* 1. Lecteur ; 2. Disque : face lisible en dessous ; 3. Lentille laser : ne pas toucher ; 4. Tiroir.
- **Barre de son ou home cinéma sans son avec la télé** (`barre-de-son-pas-de-son`) — *Pack :* Repères sans rapport : le problème vient des branchements et réglages.
  *Nouveau schéma :* 1. Prise optique ; 2. Prise HDMI ARC / eARC du téléviseur ; 3. Câble HDMI ; 4. Barre de son (entrée HDMI ARC).
- **Nettoyer des écouteurs ou un casque** (`nettoyer-ecouteurs-casque`) — *Pack :* Dessin méconnaissable : ni des écouteurs ni un casque.
  *Nouveau schéma :* 1. Embout silicone (retiré) ; 2. Grille du haut-parleur ; 3. Coussinet ; 4. Brosse souple.
- **Nettoyer l'objectif d'un appareil photo** (`nettoyer-objectif-appareil-photo`) — *Pack :* Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *Nouveau schéma :* 1. Soufflette ; 2. Lentille frontale ; 3. Pinceau ; 4. Chiffon microfibre.

### Maison & Bricolage (20)

- **Détartrer un pommeau de douche** (`detartrer-pommeau-douche`) — *Pack :* Autre objet : robinet et cartouche au lieu du pommeau.
  *Nouveau schéma :* 1. Élastique ; 2. Raccord à dévisser ; 3. Buses entartrées ; 4. Sachet de vinaigre blanc.
- **Régler une porte de placard qui frotte ou penche** (`regler-porte-placard`) — *Pack :* Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *Nouveau schéma :* 1. Vis de réglage de profondeur ; 2. Cuvette (dans la porte) ; 3. Vis de réglage latéral ; 4. Vis de hauteur (embase).
- **Déboucher des toilettes** (`deboucher-toilettes`) — *Pack :* Même dessin que la chasse d'eau (« Réservoir », « Mécanisme ») : ni la cuvette, ni le siphon, ni l'évacuation.
  *Nouveau schéma :* 1. Cuvette ; 2. Niveau d'eau ; 3. Ventouse à collerette ; 4. Bouchon ; 5. Siphon.
- **Réparer un robinet qui fuit** (`robinet-qui-fuit`) — *Pack :* Dessin abstrait (un tuyau coudé) : on ne reconnaît ni le bec, ni la poignée, ni l'emplacement de la cartouche.
  *Nouveau schéma :* 1. Cache et vis de poignée ; 2. Poignée ; 3. Écrou ; 4. Cartouche (ou tête à clapet) ; 5. Joint ; 6. Robinet d'arrêt (fermé).
- **Chasse d'eau qui coule en permanence** (`chasse-eau-coule`) — *Pack :* Dessin incohérent : « Réservoir » désigne le petit rectangle du haut alors que le mécanisme est dessiné dans la grande forme arrondie, qui évoque la cuvette.
  *Nouveau schéma :* 1. Robinet flotteur ; 2. Haut du trop-plein (tube central) ; 3. Flotteur ; 4. Niveau d'eau : 2 cm sous le trop-plein ; 5. Joint plat du clapet ; 6. Arrivée d'eau.
- **Déboucher un évier** (`evier-bouche`) — *Pack :* Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *Nouveau schéma :* 1. Ventouse ; 2. Bonde ; 3. Écrous du siphon ; 4. Siphon démontable ; 5. Seau.
- **Reboucher un trou dans un mur en placo** (`trou-placo`) — *Pack :* Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *Nouveau schéma :* 1. Cale à poncer ; 2. Bande ; 3. Plaque de plâtre ; 4. Enduit (en plusieurs couches) ; 5. Renfort derrière le trou.
- **Remplacer une prise électrique** (`remplacer-prise-electrique`) — *Pack :* Repère faux : « bornes » désigne les trous de la façade ; les bornes sont à l'arrière.
  *Nouveau schéma :* 1. Disjoncteur coupé ; 2. Borne de terre (fil vert-jaune) ; 3. Vis de fixation ; 4. Borne de phase (fil rouge ou marron) ; 5. Borne de neutre (fil bleu).
- **Refaire un joint silicone de salle de bain** (`refaire-joint-silicone`) — *Pack :* Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *Nouveau schéma :* 1. Carrelage ; 2. Lisseur (ou le doigt) ; 3. Ruban de masquage ; 4. Cordon de silicone ; 5. Rebord de la baignoire.
- **Changer un flexible de douche** (`changer-flexible-douche`) — *Pack :* Autre objet : robinet et cartouche au lieu du flexible.
  *Nouveau schéma :* 1. Écrou côté pommeau ; 2. Écrou côté mitigeur ; 3. Joint plat ; 4. Joint plat (côté pommeau) ; 5. Flexible.
- **Chauffe-eau : entretenir le groupe de sécurité** (`groupe-securite-chauffe-eau`) — *Pack :* Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *Nouveau schéma :* 1. Chauffe-eau ; 2. Robinet du groupe ; 3. Soupape (à manœuvrer) ; 4. Siphon d'évacuation ; 5. Arrivée d'eau froide.
- **Nettoyer les bouches et entrées d'air de la VMC** (`nettoyer-bouches-vmc`) — *Pack :* Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *Nouveau schéma :* 1. Bouche d'extraction (plafond) ; 2. Entrée d'air (au-dessus de la fenêtre) ; 3. Réglage d'ouverture ; 4. Grille démontée ; 5. Fenêtre.
- **Poêle à granulés : l'entretien courant** (`entretien-poele-granules`) — *Pack :* Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *Nouveau schéma :* 1. Trémie à granulés (couvercle) ; 2. Vitre de la porte ; 3. Creuset (trous d'air) ; 4. Cendrier.
- **Perceuse-visseuse sans fil : batterie, mandrin et aérations** (`entretien-perceuse-visseuse`) — *Pack :* Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *Nouveau schéma :* 1. Aérations du moteur ; 2. Mandrin ; 3. Chargeur ; 4. Batterie (retirée).
- **Ponceuse : changer l'abrasif et nettoyer le plateau** (`entretien-ponceuse`) — *Pack :* Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *Nouveau schéma :* 1. Abrasif ; 2. Plateau à scratch ; 3. Trous d'aspiration (alignés) ; 4. Sac à poussière.
- **Aspirateur eau et poussières : nettoyer le filtre** (`filtre-aspirateur-eau-poussiere`) — *Pack :* Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *Nouveau schéma :* 1. Tête moteur ; 2. Tuyau ; 3. Filtre cartouche plissé ; 4. Flotteur ; 5. Cuve.
- **Radiateur électrique : le dépoussiérer avant l'hiver** (`entretien-radiateur-electrique`) — *Pack :* Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *Nouveau schéma :* 1. Grille de sortie d'air (haut) ; 2. Thermostat ; 3. Façade ; 4. Grille d'entrée d'air (bas).
- **Pompe à chaleur : entretien obligatoire et gestes simples** (`entretien-pompe-a-chaleur`) — *Pack :* Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *Nouveau schéma :* 1. Grille du ventilateur ; 2. Ailettes de l'échangeur (ne pas tordre) ; 3. Espace libre autour ; 4. Évacuation des condensats.
- **Portail ou porte de garage motorisé : entretien et cellules** (`entretien-portail-motorise`) — *Pack :* Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *Nouveau schéma :* 1. Feu clignotant ; 2. Cellule (récepteur) ; 3. Cellule (émetteur) ; 4. Crémaillère ; 5. Moteur ; 6. Rail.
- **Interphone ou visiophone qui ne sonne plus** (`visiophone-ne-sonne-plus`) — *Pack :* Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *Nouveau schéma :* 1. Platine de rue ; 2. Poste intérieur ; 3. Réglage du volume de la sonnerie ; 4. Bouton d'appel ; 5. Piles (modèles sans fil) ; 6. Alimentation (tableau électrique).

### Vélo & Mobilité (7)

- **Gonfler un pneu de vélo à la bonne pression** (`gonfler-pneu-velo`) — *Pack :* Repères faux : « Pneu » et « Valve » pointent une barre entre les deux roues, pas la roue.
  *Nouveau schéma :* 1. Pression indiquée sur le flanc ; 2. Pneu ; 3. Jante ; 4. Embout de la pompe ; 5. Valve (Presta ou Schrader).
- **Réparer une crevaison de vélo** (`crevaison-velo`) — *Pack :* Repères faux : « Pneu » et « Valve » pointent une barre entre les deux roues, pas la roue.
  *Nouveau schéma :* 1. Démonte-pneus ; 2. Chambre à air ; 3. Rustine sur le trou ; 4. Pneu ; 5. Valve.
- **Régler les freins d'un vélo** (`regler-freins-velo`) — *Pack :* Dessin confus : cadre en zigzag et « Câble / patin » placé sous la roue, loin du frein.
  *Nouveau schéma :* 1. Molette de réglage (levier) ; 2. Vis de serrage du câble ; 3. Pneu ; 4. Bras du frein ; 5. Patin, à plat sur la jante ; 6. Jante ; 7. Vis de rappel.
- **Nettoyer et graisser une chaîne de vélo** (`entretien-chaine-velo`) — *Pack :* « Transmission » pointe le haut du cadre ; ni la chaîne, ni le plateau, ni les pignons ne sont dessinés.
  *Nouveau schéma :* 1. Plateau ; 2. Chaîne ; 3. Cassette ; 4. Burette : une goutte par rouleau ; 5. Dérailleur ; 6. Chiffon.
- **Régler le dérailleur arrière d'un vélo** (`regler-derailleur-arriere`) — *Pack :* « Chaîne » pointe le hauban du cadre : la chaîne n'est pas dessinée.
  *Nouveau schéma :* 1. Cassette ; 2. Vis B ; 3. Patte de dérailleur ; 4. Molette de tension du câble ; 5. Vis de butée H ; 6. Vis de butée L ; 7. Galet du haut.
- **Trottinette électrique : l'entretien régulier** (`entretien-trottinette-electrique`) — *Pack :* Autre objet : vélo à chaîne au lieu d'une trottinette.
  *Nouveau schéma :* 1. Visserie de la potence et du guidon ; 2. Système de pliage ; 3. Pneu ; 4. Frein arrière ; 5. Batterie (dans le plateau).
- **Hoverboard qui tire d'un côté : le recalibrer** (`calibrer-hoverboard`) — *Pack :* Autre objet : vélo à chaîne au lieu d'un hoverboard.
  *Nouveau schéma :* 1. Voyants ; 2. Plateau gauche ; 3. Plateau droit ; 4. Roue ; 5. Bouton marche (maintenu) ; 6. Bien à plat sur un sol horizontal.

### Jardin & Extérieur (11)

- **Recharger le fil d'un coupe-bordure** (`fil-coupe-bordure`) — *Pack :* Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *Nouveau schéma :* 1. Couvercle (retiré) ; 2. Flèche : sens d'enroulement ; 3. Fil ; 4. Bobine ; 5. Œillet de sortie.
- **Nettoyer et affûter un sécateur** (`affuter-secateur`) — *Pack :* Dessin méconnaissable (deux barres croisées) : ni la lame coupante ni son biseau, seul côté à affûter, ne sont visibles.
  *Nouveau schéma :* 1. Pierre à affûter ; 2. Biseau : seul côté à affûter ; 3. Lame coupante ; 4. Axe ; 5. Contre-lame (ne pas affûter) ; 6. Ressort.
- **Réparer un tuyau d'arrosage percé** (`tuyau-arrosage-perce`) — *Pack :* Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *Nouveau schéma :* 1. Tuyau ; 2. Écrou de serrage ; 3. Raccord réparateur ; 4. Partie percée, coupée.
- **Affûter la lame d'une tondeuse** (`affuter-lame-tondeuse`) — *Pack :* Zone d'intervention absente : la lame, sous le carter, n'apparaît pas.
  *Nouveau schéma :* 1. Capuchon de bougie débranché ; 2. Lame ; 3. Écrou central ; 4. Cale en bois ; 5. Carter.
- **Robot tondeuse : nettoyage, lames et hivernage** (`entretien-robot-tondeuse`) — *Pack :* Autre objet : tondeuse thermique au lieu d'un robot.
  *Nouveau schéma :* 1. Roulette avant ; 2. Disque porte-lames ; 3. Roue motrice ; 4. Petite lame pivotante ; 5. Contacts de charge.
- **Nettoyeur haute pression : vidanger et hiverner** (`hivernage-nettoyeur-haute-pression`) — *Pack :* Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *Nouveau schéma :* 1. Pistolet ; 2. Flexible haute pression ; 3. Arrivée d'eau et son filtre : vider avant le gel ; 4. Pompe.
- **Taille-haie : nettoyer et huiler les lames** (`entretien-taille-haie`) — *Pack :* Autre objet : tondeuse au lieu d'un taille-haie.
  *Nouveau schéma :* 1. Lames dentées ; 2. Zone à huiler (entre les lames) ; 3. Brosse ; 4. Fourreau (protège-lame).
- **Souffleur de feuilles : entretien et hivernage** (`entretien-souffleur-feuilles`) — *Pack :* Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *Nouveau schéma :* 1. Bougie ; 2. Capot du filtre ; 3. Filtre à air ; 4. Tube de soufflage ; 5. Réservoir (mélange frais).
- **Motobineuse : huile, filtre à air et hivernage** (`entretien-motobineuse`) — *Pack :* Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *Nouveau schéma :* 1. Bouchon de remplissage et jauge ; 2. Filtre à air ; 3. Bouchon de vidange ; 4. Fraises.
- **Amorcer une pompe de surface ou d'arrosage** (`amorcer-pompe-surface`) — *Pack :* Zone d'intervention absente : le bouchon d'amorçage n'apparaît pas.
  *Nouveau schéma :* 1. Refoulement ; 2. Bouchon de remplissage ; 3. Corps de pompe ; 4. Moteur ; 5. Tuyau d'aspiration ; 6. Clapet et crépine.
- **Piscine : pH, chlore et filtration au quotidien** (`entretien-eau-piscine`) — *Pack :* « Filtration » pointe un arc dans le bassin : ni skimmer, ni pompe, ni filtre.
  *Nouveau schéma :* 1. Trousse d'analyse (pH 7,2 à 7,6 ; chlore) ; 2. Skimmer et son panier ; 3. Refoulement ; 4. Pompe et préfiltre ; 5. Filtre.

### Jeux & Loisirs (3)

- **Réparer un matelas gonflable percé** (`matelas-gonflable-perce`) — *Pack :* Dessin générique, identique à celui d'autres fiches : il ne montre ni l'objet ni la zone d'intervention.
  *Nouveau schéma :* 1. Valve ; 2. Eau savonneuse : les bulles montrent la fuite ; 3. Trou marqué ; 4. Rustine ; 5. Colle.
- **Réinitialiser une manette PS5 qui ne répond plus** (`reinitialiser-manette-ps5`) — *Pack :* Zone d'intervention absente : le petit bouton de réinitialisation, au dos, n'apparaît pas.
  *Nouveau schéma :* 1. Câble USB ; 2. Prise USB-C ; 3. Emplacement du logo ; 4. Petit trou de réinitialisation ; 5. Trombone déplié.
- **Dépoussiérer une PS5 qui chauffe ou souffle fort** (`depoussierer-ps5`) — *Pack :* Autre objet : manette au lieu de la console.
  *Nouveau schéma :* 1. Façade retirée ; 2. Attrape-poussière (deux orifices) ; 3. Grilles d'aération ; 4. Embout fin, faible puissance.

### Mode & Accessoires (3)

- **Réparer un trou dans un jean sans couture** (`patch-jean`) — *Pack :* Dessin sans détail utile (un trapèze et une couture) : ni le trou ni la pièce ne sont dessinés.
  *Nouveau schéma :* 1. Fer à repasser ; 2. Torchon (entre le fer et la pièce) ; 3. Pièce thermocollante ; 4. Jambe retournée (envers).
- **Recoudre un bouton** (`recoudre-bouton`) — *Pack :* Autre objet : fermeture éclair au lieu d'un bouton.
  *Nouveau schéma :* 1. Bouton à quatre trous ; 2. Fil en croix (ou en parallèle) ; 3. Nœud au dos ; 4. Tige de fil sous le bouton ; 5. Tissu.
- **Réparer une fermeture éclair qui s'ouvre** (`fermeture-eclair`) — *Pack :* Le curseur, où l'on intervient, n'est pas dessiné ; « Couture » pointe la fermeture elle-même.
  *Nouveau schéma :* 1. Dents ; 2. Curseur ; 3. Pince plate : serrer l'arrière du curseur ; 4. Ruban cousu ; 5. Arrêt du bas.

### Instruments de musique (2)

- **Changer les cordes d'une guitare classique** (`cordes-guitare-classique`) — *Pack :* Dessin méconnaissable (deux cercles et des cordes) : ce n'est pas une guitare.
  *Nouveau schéma :* 1. Mécanique (clé) ; 2. Chevalet : nœud de la corde ; 3. Rosace ; 4. Sillet ; 5. Tête ajourée.
- **Changer les cordes d'une guitare folk** (`cordes-guitare-folk`) — *Pack :* Dessin méconnaissable (deux cercles et des cordes) : ce n'est pas une guitare.
  *Nouveau schéma :* 1. Mécanique : la corde s'enroule vers le bas ; 2. Chevilles ; 3. Chevalet ; 4. Sillet ; 5. Tête.

## Modifier ou ajouter un schéma

1. Dessin redessiné : modifier sa description dans `tools/dessins/` (formes simples, repères `[libellé, x, y]` posés
   sur la bonne pièce), puis `node tools/dessins/build.js`.
   Schéma venu d'un pack : le déposer dans `tools/schemas/svg/<id>.svg` (gabarit 1200 × 780).
2. Le relire face au texte de la fiche ; dans `tools/data/illustrations-review.json`, statut `"valide"`.
3. `node tools/illustrations.js`, puis `node tools/build.js`, `node tests/validate.js` et `node tests/e2e.js`.
