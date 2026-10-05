/* Les Pages Bleues — plans d'entretien proposés dans le carnet d'entretien, par type de matériel.
   Principe (entretiens périodiques d'un côté, points de contrôle de l'autre, intervalles
   réglables, anticipation selon le kilométrage moyen). Chaque intervalle vient d'une fiche vérifiée (champ guide) ;
   sans intervalle dans la fiche, la tâche est proposée « selon la notice » et l'utilisateur règle lui-même l'intervalle.
   kind : "entretien" (on le fait) ou "controle" (on vérifie un état : bon, à surveiller, défaillant).
   months / days / km : intervalle, le premier atteint déclenche le suivant. when : conditions (énergie, transmission). */

const MAINTENANCE = {
  voiture: [
    { id: "pression-pneus", label: "Pression des pneus", kind: "controle", months: 1, guide: "pression-pneus-voiture", note: "À froid, et avant chaque long trajet." },
    { id: "roue-secours", label: "Pression de la roue de secours", kind: "controle", months: 6, guide: "pression-pneus-voiture" },
    { id: "niveau-huile", label: "Niveau d'huile moteur", kind: "controle", km: 2000, guide: "niveau-huile-moteur", when: { energie: ["thermique", "hybride"] } },
    { id: "liquide-refroidissement", label: "Niveau du liquide de refroidissement", kind: "controle", months: 1, guide: "liquide-refroidissement" },
    { id: "remplacement-refroidissement", label: "Remplacement du liquide de refroidissement", kind: "entretien", months: 24, km: 60000, guide: "liquide-refroidissement", note: "Ou selon le constructeur." },
    { id: "filtre-habitacle", label: "Filtre d'habitacle", kind: "entretien", months: 12, km: 15000, guide: "filtre-habitacle", note: "Plus souvent en ville ou à la campagne (pollens)." },
    { id: "vidange", label: "Vidange et filtre à huile", kind: "entretien", guide: "vidange-huile-moteur", note: "Intervalle : voir le carnet du constructeur.", when: { energie: ["thermique", "hybride"] } },
    { id: "plaquettes", label: "Usure des plaquettes de frein", kind: "controle", guide: "plaquettes-frein" },
    { id: "balais", label: "Balais d'essuie-glace", kind: "controle", guide: "balais-essuie-glace" },
    { id: "ampoules", label: "Éclairage et ampoules", kind: "controle", guide: "ampoule-phare" }
  ],
  moto: [
    { id: "pression-pneus", label: "Pression des pneus", kind: "controle", days: 14, guide: "pression-pneus-moto", note: "À froid, et avant chaque long trajet." },
    { id: "graissage-chaine", label: "Graissage de la chaîne", kind: "entretien", km: 500, guide: "entretien-chaine-moto", note: "Environ tous les 250 km sous la pluie ou sur routes sableuses.", when: { transmission: ["chaine"] } },
    { id: "tension-chaine", label: "Tension de la chaîne", kind: "controle", km: 500, guide: "entretien-chaine-moto", note: "À chaque graissage. Valeur dans la notice.", when: { transmission: ["chaine"] } },
    { id: "nettoyage-chaine", label: "Nettoyage de la chaîne", kind: "entretien", km: 1000, guide: "entretien-chaine-moto", when: { transmission: ["chaine"] } },
    { id: "kit-chaine", label: "Usure du kit chaîne", kind: "controle", km: 10000, guide: "entretien-chaine-moto", note: "Un kit se change en général entre 10 000 et 15 000 km.", when: { transmission: ["chaine"] } },
    { id: "hivernage", label: "Hivernage", kind: "entretien", months: 12, guide: "hivernage-moto", note: "Avant chaque hiver, si la moto reste au garage." },
    { id: "vidange", label: "Vidange et filtre à huile", kind: "entretien", note: "Intervalle : voir le carnet du constructeur.", when: { energie: ["thermique"] } }
  ],
  "lave-linge": [
    { id: "filtre-vidange", label: "Nettoyage du filtre de vidange", kind: "entretien", guide: "lave-linge-ne-vidange-pas", note: "Intervalle : voir la notice." },
    { id: "joint-porte", label: "État du joint de hublot et de la sécurité de porte", kind: "controle", guide: "securite-porte-lave-linge" }
  ],
  "lave-vaisselle": [
    { id: "filtres", label: "Nettoyage des filtres et des bras de lavage", kind: "entretien", guide: "lave-vaisselle-lave-mal", note: "Intervalle : voir la notice." }
  ],
  "seche-linge": [
    { id: "filtre-porte", label: "Filtre de porte", kind: "entretien", guide: "filtre-seche-linge", note: "À vider après chaque séchage." },
    { id: "condenseur", label: "Nettoyage du condenseur", kind: "entretien", months: 1, guide: "filtre-seche-linge" }
  ],
  refrigerateur: [
    { id: "condenseur", label: "Dépoussiérage du condenseur", kind: "entretien", months: 3, guide: "nettoyer-condenseur-frigo", note: "Tous les 2 à 3 mois si animaux, poussière ou cuisine grasse ; sinon rarement utile." },
    { id: "joint", label: "Étanchéité du joint de porte", kind: "controle", guide: "joint-refrigerateur" },
    { id: "evacuation", label: "Trou d'évacuation (eau au fond)", kind: "controle", guide: "frigo-eau-au-fond" },
    { id: "givre", label: "Épaisseur de givre", kind: "controle", months: 4, guide: "degivrer-congelateur", note: "Dégivrer au-delà de 3 mm." }
  ],
  congelateur: [
    { id: "degivrage", label: "Dégivrage", kind: "entretien", months: 4, guide: "degivrer-congelateur", note: "Deux à trois fois par an." },
    { id: "condenseur", label: "Dépoussiérage du condenseur", kind: "entretien", months: 3, guide: "nettoyer-condenseur-frigo" },
    { id: "joint", label: "Étanchéité du joint de porte", kind: "controle", guide: "joint-refrigerateur" }
  ],
  bouilloire: [{ id: "detartrage", label: "Détartrage", kind: "entretien", months: 1, guide: "detartrer-bouilloire", note: "Une fois par mois si l'eau est très calcaire." }],
  cafetiere: [{ id: "detartrage", label: "Détartrage", kind: "entretien", months: 1, guide: "detartrer-cafetiere", note: "Tous les 20 à 40 cycles, ou une fois par mois si l'eau est calcaire." }],
  hotte: [
    { id: "filtre-metal", label: "Lavage du filtre métallique", kind: "entretien", months: 1, guide: "nettoyer-filtre-hotte", note: "Si vous cuisinez souvent." },
    { id: "filtre-charbon", label: "Remplacement du filtre à charbon", kind: "entretien", months: 4, guide: "nettoyer-filtre-hotte", note: "Tous les 4 à 6 mois (hotte à recyclage)." }
  ],
  "fer-a-repasser": [{ id: "detartrage", label: "Détartrage", kind: "entretien", months: 2, guide: "detartrer-centrale-vapeur", note: "Tous les un à deux mois selon l'usage et l'eau." }],
  aspirateur: [{ id: "filtres", label: "Sac, bac et filtres", kind: "controle", guide: "aspirateur-aspire-mal" }],
  "aspirateur-robot": [
    { id: "entretien", label: "Brosses, capteurs et roues", kind: "entretien", guide: "entretien-aspirateur-robot", note: "Intervalle : voir la notice." },
    { id: "filtre", label: "Remplacement du filtre", kind: "entretien", months: 6, guide: "entretien-aspirateur-robot", note: "Tous les six mois à un an." }
  ],
  climatiseur: [{ id: "filtres", label: "Nettoyage des filtres", kind: "entretien", guide: "climatiseur-mobile-refroidit-mal", note: "Régulièrement pendant la saison." }],
  velo: [
    { id: "pression", label: "Pression des pneus", kind: "controle", months: 1, guide: "gonfler-pneu-velo" },
    { id: "chaine", label: "Nettoyage et graissage de la chaîne", kind: "entretien", guide: "entretien-chaine-velo" },
    { id: "freins", label: "Freins", kind: "controle", guide: "regler-freins-velo", note: "Avant chaque sortie." }
  ],
  "velo-electrique": "velo",
  tondeuse: [
    { id: "lame", label: "Affûtage de la lame", kind: "entretien", guide: "affuter-lame-tondeuse" },
    { id: "essence", label: "Essence de moins de 30 jours", kind: "controle", guide: "tondeuse-ne-demarre-pas", note: "Au-delà, videz et refaites le plein." }
  ],
  debroussailleuse: [{ id: "fil", label: "Fil de coupe", kind: "controle", guide: "fil-coupe-bordure" }],
  console: [{ id: "poussiere", label: "Dépoussiérage des aérations", kind: "entretien", guide: "depoussierer-ps5" }],
  manette: [{ id: "joysticks", label: "Joysticks (dérive)", kind: "controle", guide: "joystick-drift" }],
  smartphone: [{ id: "batterie", label: "État de la batterie", kind: "controle", guide: "telephone-ne-charge-plus", note: "Usée sous 80 %." }],
  tablette: [{ id: "batterie", label: "État de la batterie", kind: "controle", guide: "telephone-ne-charge-plus" }],
  "ordinateur-portable": [{ id: "ventilation", label: "Dépoussiérage des aérations", kind: "entretien", guide: "ordinateur-portable-chauffe" }],
  imprimante: [{ id: "tetes", label: "Qualité d'impression (têtes)", kind: "controle", guide: "tetes-impression-imprimante" }],
  "chauffe-eau": [{ id: "groupe-securite", label: "Manœuvre du groupe de sécurité", kind: "entretien", months: 1, guide: "groupe-securite-chauffe-eau", note: "Un quart de tour quelques secondes, puis refermer." }],
  vmc: [
    { id: "bouches", label: "Nettoyage des bouches et entrées d'air", kind: "entretien", months: 6, guide: "nettoyer-bouches-vmc", note: "Au printemps et à l'automne." },
    { id: "filtres", label: "Remplacement des filtres (double flux)", kind: "entretien", months: 12, guide: "nettoyer-bouches-vmc", note: "Une à deux fois par an, plus souvent en ville." },
    { id: "professionnel", label: "Contrôle par un professionnel", kind: "controle", months: 36, guide: "nettoyer-bouches-vmc", note: "Recommandé par l'ADEME tous les trois ans." }
  ],
  "poele-granules": [
    { id: "cendrier", label: "Vidage du cendrier", kind: "entretien", days: 7, guide: "entretien-poele-granules", note: "Creuset : idéalement chaque jour de chauffe." },
    { id: "reservoir", label: "Aspiration de la sciure du réservoir", kind: "entretien", months: 1, guide: "entretien-poele-granules" },
    { id: "ramonage", label: "Ramonage du conduit", kind: "entretien", months: 6, guide: "entretien-poele-granules", note: "Obligatoire deux fois par an, par un professionnel." },
    { id: "entretien-annuel", label: "Entretien annuel par un professionnel", kind: "entretien", months: 12, guide: "entretien-poele-granules", note: "Gardez l'attestation." }
  ],
  "trottinette-electrique": [
    { id: "pneus", label: "Pression et état des pneus", kind: "controle", days: 7, guide: "entretien-trottinette-electrique" },
    { id: "freins", label: "Réglage des freins", kind: "controle", months: 3, guide: "entretien-trottinette-electrique" },
    { id: "vis", label: "Serrage de la visserie", kind: "controle", guide: "entretien-trottinette-electrique", note: "Guidon, roues, frein et pliage." }
  ],
  "robot-tondeuse": [
    { id: "nettoyage", label: "Nettoyage du carter et des roues", kind: "entretien", days: 7, guide: "entretien-robot-tondeuse", note: "Pendant la saison de tonte." },
    { id: "lames", label: "État des lames", kind: "controle", days: 28, guide: "entretien-robot-tondeuse", note: "Toutes les 4 à 6 semaines." },
    { id: "hivernage", label: "Hivernage", kind: "entretien", months: 12, guide: "entretien-robot-tondeuse", note: "Batterie à environ 70 %, au sec." }
  ],
  "nettoyeur-haute-pression": [
    { id: "hivernage", label: "Hivernage et filtre d'arrivée d'eau", kind: "entretien", months: 12, guide: "hivernage-nettoyeur-haute-pression", note: "Et vider la pompe après chaque utilisation." }
  ],
  "taille-haie": [
    { id: "lames", label: "Nettoyage et huilage des lames", kind: "entretien", guide: "entretien-taille-haie", note: "Après chaque utilisation." },
    { id: "hivernage", label: "Préparation pour l'hiver", kind: "entretien", months: 12, guide: "entretien-taille-haie" }
  ],
  deshumidificateur: [
    { id: "filtre", label: "Nettoyage du préfiltre", kind: "entretien", months: 1, guide: "entretien-deshumidificateur" },
    { id: "reservoir", label: "Lavage du réservoir", kind: "entretien", months: 1, guide: "entretien-deshumidificateur" }
  ],
  "table-a-repasser": [{ id: "housse", label: "État de la housse", kind: "controle", guide: "housse-table-a-repasser" }],
  "cave-a-vin": [{ id: "joint", label: "Étanchéité du joint de porte", kind: "controle", guide: "joint-refrigerateur" }],
  "machine-a-glacons": [{ id: "nettoyage", label: "Nettoyage et détartrage", kind: "entretien", guide: "nettoyer-machine-a-glacons", note: "Plus souvent en eau calcaire ; videz l'eau si la machine ne sert pas." }],
  four: [
    { id: "nettoyage", label: "Nettoyage ou pyrolyse", kind: "entretien", guide: "nettoyer-four" },
    { id: "joint", label: "État du joint de porte", kind: "controle", guide: "nettoyer-four" }
  ],
  "plaque-de-cuisson": [{ id: "nettoyage", label: "Nettoyage complet et calcaire", kind: "entretien", guide: "nettoyer-plaque-vitroceramique" }],
  "micro-ondes": [{ id: "nettoyage", label: "Nettoyage à la vapeur vinaigrée", kind: "entretien", guide: "nettoyer-micro-ondes" }],
  "grille-pain": [{ id: "miettes", label: "Tiroir à miettes", kind: "entretien", guide: "nettoyer-grille-pain", note: "Idéalement après chaque utilisation." }],
  "robot-de-cuisine": [{ id: "nettoyage", label: "Nettoyage du bol et des lames", kind: "entretien", guide: "nettoyer-robot-mixeur", note: "Après chaque utilisation." }],
  "machine-a-pain": [{ id: "cuve", label: "Cuve et axe de la pale", kind: "controle", guide: "entretien-machine-a-pain" }],
  friteuse: [
    { id: "huile", label: "Changement de l'huile", kind: "entretien", guide: "entretien-friteuse", note: "Au plus tard toutes les 10 utilisations (5 pour tournesol et arachide)." },
    { id: "filtre", label: "Filtre anti-odeur", kind: "entretien", guide: "entretien-friteuse", note: "Mousse : 20 fritures ; métal et charbon : 35 à 50." }
  ],
  cocotte: [
    { id: "joint", label: "Remplacement du joint", kind: "entretien", months: 12, guide: "joint-cocotte-minute" },
    { id: "soupapes", label: "Soupapes non obstruées", kind: "controle", guide: "joint-cocotte-minute", note: "Avant chaque utilisation." }
  ],
  "extracteur-de-jus": [{ id: "tamis", label: "Nettoyage du tamis", kind: "entretien", guide: "nettoyer-extracteur-de-jus", note: "Juste après chaque jus." }],
  "raclette-grill": [{ id: "plaques", label: "Nettoyage des plaques et coupelles", kind: "entretien", guide: "nettoyer-appareil-raclette" }],
  yaourtiere: [{ id: "pots", label: "Lavage et rinçage des pots", kind: "entretien", guide: "entretien-yaourtiere", note: "Après chaque fournée." }],
  trancheuse: [{ id: "lame", label: "Nettoyage de la lame et du chariot", kind: "entretien", guide: "nettoyer-trancheuse", note: "Après chaque utilisation." }],
  "tireuse-a-biere": [{ id: "tirage", label: "Nettoyage du robinet et du tube", kind: "entretien", guide: "nettoyer-tireuse-a-biere", note: "À chaque changement de fût." }],
  "carafe-filtrante": [{ id: "cartouche", label: "Changement de la cartouche", kind: "entretien", days: 28, guide: "cartouche-carafe-filtrante" }],
  "nettoyeur-vapeur": [{ id: "detartrage", label: "Détartrage de la chaudière", kind: "entretien", guide: "detartrer-nettoyeur-vapeur", note: "Dès que la vapeur faiblit." }],
  cireuse: [{ id: "accessoires", label: "Nettoyage des brosses et feutres", kind: "entretien", guide: "entretien-cireuse" }],
  ventilateur: [{ id: "pales", label: "Dépoussiérage des pales et de la grille", kind: "entretien", guide: "nettoyer-ventilateur" }],
  purificateur: [
    { id: "prefiltre", label: "Nettoyage du préfiltre", kind: "entretien", guide: "filtres-purificateur-air" },
    { id: "hepa", label: "Remplacement du filtre HEPA", kind: "entretien", months: 12, guide: "filtres-purificateur-air", note: "Souvent tous les 6 à 12 mois." }
  ],
  broyeur: [{ id: "nettoyage", label: "Glaçons et gros sel", kind: "entretien", days: 7, guide: "debloquer-broyeur-evier" }],
  "seche-cheveux": [{ id: "filtre", label: "Nettoyage du filtre arrière", kind: "entretien", months: 1, guide: "nettoyer-filtre-seche-cheveux" }],
  rasoir: [
    { id: "nettoyage", label: "Nettoyage et lubrification", kind: "entretien", guide: "entretien-rasoir-electrique" },
    { id: "tetes", label: "Usure des têtes", kind: "controle", guide: "entretien-rasoir-electrique" }
  ],
  "brosse-a-dents": [{ id: "brossette", label: "Changement de la brossette", kind: "entretien", months: 3, guide: "entretien-brosse-a-dents-electrique" }],
  puericulture: [{ id: "detartrage", label: "Détartrage du stérilisateur", kind: "entretien", days: 14, guide: "detartrer-sterilisateur-biberons" }],
  "montre-connectee": [{ id: "nettoyage", label: "Nettoyage du boîtier et du bracelet", kind: "entretien", guide: "nettoyer-montre-connectee" }],
  gps: [{ id: "cartes", label: "Mise à jour des cartes", kind: "entretien", guide: "mettre-a-jour-gps" }],
  "ordinateur-bureau": [{ id: "lenteur", label: "Démarrage et espace disque", kind: "controle", guide: "pc-lent" }],
  "ecran-pc": [{ id: "ecran", label: "Nettoyage de l'écran", kind: "entretien", guide: "nettoyer-ecran-tv" }],
  television: [{ id: "ecran", label: "Nettoyage de l'écran et des aérations", kind: "entretien", guide: "nettoyer-ecran-tv" }],
  videoprojecteur: [{ id: "filtre", label: "Nettoyage du filtre à air", kind: "entretien", guide: "filtre-videoprojecteur", note: "Plus souvent en pièce poussiéreuse." }],
  "lecteur-video": [{ id: "logiciel", label: "Mise à jour du logiciel", kind: "entretien", guide: "lecteur-dvd-ne-lit-plus" }],
  hifi: [{ id: "branchements", label: "Branchements et réglages audio", kind: "controle", guide: "barre-de-son-pas-de-son" }],
  "casque-ecouteurs": [{ id: "grilles", label: "Nettoyage des grilles et embouts", kind: "entretien", guide: "nettoyer-ecouteurs-casque" }],
  "casque-gaming": "casque-ecouteurs",
  "appareil-photo": [{ id: "objectif", label: "Nettoyage de l'objectif", kind: "entretien", guide: "nettoyer-objectif-appareil-photo" }],
  gyropode: [{ id: "calibrage", label: "Tenue de trajectoire (calibrage)", kind: "controle", guide: "calibrer-hoverboard" }],
  perceuse: [
    { id: "aerations", label: "Dépoussiérage des aérations", kind: "entretien", guide: "entretien-perceuse-visseuse" },
    { id: "batterie", label: "Charge de la batterie rangée", kind: "controle", guide: "entretien-perceuse-visseuse", note: "Environ 40 % pour un long stockage." }
  ],
  "scie-ponceuse": [{ id: "nettoyage", label: "Plateau, sac et aérations", kind: "entretien", guide: "entretien-ponceuse", note: "Après chaque séance." }],
  "aspirateur-chantier": [{ id: "filtre", label: "Décolmatage du filtre et vidage de la cuve", kind: "entretien", guide: "filtre-aspirateur-eau-poussiere" }],
  robinet: [{ id: "pommeau", label: "Détartrage du pommeau", kind: "entretien", guide: "detartrer-pommeau-douche" }],
  "chasse-eau": [{ id: "fuite", label: "La chasse ne coule pas en continu", kind: "controle", guide: "chasse-eau-coule" }],
  "radiateur-electrique": [{ id: "grilles", label: "Dépoussiérage des grilles", kind: "entretien", months: 6, guide: "entretien-radiateur-electrique", note: "Au printemps et à l'automne." }],
  "pompe-a-chaleur": [
    { id: "professionnel", label: "Entretien obligatoire par un professionnel", kind: "entretien", months: 24, guide: "entretien-pompe-a-chaleur", note: "PAC de 4 à 70 kW. Gardez le rapport." },
    { id: "unite-exterieure", label: "Unité extérieure dégagée et propre", kind: "controle", guide: "entretien-pompe-a-chaleur" }
  ],
  motorisation: [{ id: "entretien", label: "Cellules, rails et articulations", kind: "entretien", months: 6, guide: "entretien-portail-motorise", note: "Après l'été et avant l'hiver." }],
  interphone: [{ id: "fonctionnement", label: "Sonnerie, son et image", kind: "controle", guide: "visiophone-ne-sonne-plus" }],
  souffleur: [
    { id: "filtre", label: "Filtre à air (thermique)", kind: "entretien", guide: "entretien-souffleur-feuilles", note: "Toutes les 10 à 15 heures d'utilisation." },
    { id: "hivernage", label: "Hivernage", kind: "entretien", months: 12, guide: "entretien-souffleur-feuilles" }
  ],
  motobineuse: [
    { id: "niveau-huile", label: "Niveau d'huile", kind: "controle", guide: "entretien-motobineuse", note: "Avant chaque utilisation." },
    { id: "vidange", label: "Vidange", kind: "entretien", months: 36, guide: "entretien-motobineuse", note: "Ou toutes les 50 heures ; première vidange après 10 heures ou un an." },
    { id: "hivernage", label: "Hivernage", kind: "entretien", months: 12, guide: "entretien-motobineuse" }
  ],
  pompe: [{ id: "hivernage", label: "Vidange et rangement hors gel", kind: "entretien", months: 12, guide: "amorcer-pompe-surface" }],
  barbecue: [
    { id: "fuite", label: "Test de fuite à l'eau savonneuse", kind: "controle", guide: "barbecue-gaz-fuite-nettoyage", note: "À chaque changement de bouteille." },
    { id: "flexible", label: "Date limite du flexible", kind: "controle", guide: "barbecue-gaz-fuite-nettoyage", note: "Gravée sur le tuyau." }
  ],
  piscine: [
    { id: "analyse", label: "Analyse pH et chlore", kind: "controle", days: 7, guide: "entretien-eau-piscine", note: "Deux à trois fois par semaine en pleine saison." },
    { id: "skimmers", label: "Paniers de skimmers et préfiltre", kind: "entretien", days: 3, guide: "entretien-eau-piscine", note: "Au moins deux fois par semaine en saison." },
    { id: "filtre", label: "Nettoyage du filtre (contre-lavage)", kind: "entretien", days: 21, guide: "entretien-eau-piscine", note: "Toutes les 2 à 4 semaines." }
  ],
  volant: [{ id: "calibrage", label: "Calibrage et micrologiciel", kind: "controle", guide: "volant-jeu-calibrage" }]
};

// Options qui adaptent le plan (énergie, transmission)
const VEHICLE_OPTIONS = {
  voiture: { energie: [["thermique", "Thermique"], ["hybride", "Hybride"], ["electrique", "Électrique"]] },
  moto: { energie: [["thermique", "Thermique"], ["electrique", "Électrique"]], transmission: [["chaine", "Chaîne"], ["courroie", "Courroie"], ["cardan", "Cardan"]] }
};
