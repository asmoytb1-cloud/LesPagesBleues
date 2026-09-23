/* Les Pages Bleues — plans d'entretien proposés dans le carnet d'entretien, par type de matériel.
   Inspiré du suivi de MotoBook (entretiens périodiques d'un côté, points de contrôle de l'autre, intervalles
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
  imprimante: [{ id: "tetes", label: "Qualité d'impression (têtes)", kind: "controle", guide: "tetes-impression-imprimante" }]
};

// Options qui adaptent le plan (comme la transmission d'une moto chez MotoBook)
const VEHICLE_OPTIONS = {
  voiture: { energie: [["thermique", "Thermique"], ["hybride", "Hybride"], ["electrique", "Électrique"]] },
  moto: { energie: [["thermique", "Thermique"], ["electrique", "Électrique"]], transmission: [["chaine", "Chaîne"], ["courroie", "Courroie"], ["cardan", "Cardan"]] }
};
