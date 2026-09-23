/* Les Pages Bleues — catégories et guides
   Champs d'un guide :
     safety        consigne de sécurité affichée avant de commencer
     keywords      synonymes utilisés par la recherche
     troubleshoot  pistes si le problème persiste
     sources       pages consultées pour vérifier la fiche [{ label, url }]
     photo         nom d'une photo de assets/img/photos (sinon celle de la catégorie)
     devices       types d'appareils concernés (voir tools/materiel.js) ; les fiches Automobile valent pour toutes les voitures
   Champs d'une étape :
     tip / safety  astuce / point de vigilance
     timer         temps d'attente en secondes (minuteur dans le mode accompagnement) */

const CATEGORIES = [
  { id: "automobile", name: "Automobile", icon: "car", photo: "automobile", desc: "Entretenir et réparer" },
  { id: "electromenager", name: "Électroménager", icon: "washer", photo: "electromenager", desc: "Diagnostiquer et dépanner" },
  { id: "telephonie", name: "Téléphonie & Informatique", short: "Téléphonie", icon: "laptop", photo: "telephonie", desc: "Réparer et optimiser" },
  { id: "maison", name: "Maison & Bricolage", short: "Maison", icon: "drill", photo: "maison", desc: "Plomberie, murs, électricité" },
  { id: "velo", name: "Vélo, Moto & Mobilité", short: "Vélo", icon: "bike", photo: "velo", desc: "Vélos, trottinettes…" },
  { id: "jardin", name: "Jardin & Extérieur", short: "Jardin", icon: "leaf", photo: "jardin", desc: "Entretenir et prolonger" },
  { id: "loisirs", name: "Jeux & Loisirs", short: "Loisirs", icon: "gamepad", photo: "loisirs", desc: "Consoles, manettes…" },
  { id: "autres", name: "Autres", icon: "more", desc: "Mode, musique et plus" },
  // Sous-catégories regroupées sous « Autres »
  { id: "mode", name: "Mode & Accessoires", short: "Mode", icon: "shirt", photo: "mode", parent: "autres", desc: "Vêtements, chaussures, sacs" },
  { id: "instruments", name: "Instruments de musique", short: "Musique", icon: "music", photo: "instruments", parent: "autres", desc: "Guitares et autres instruments" }
];

/* Date de la dernière vérification documentaire des fiches (sources citées dans chaque fiche) */
const REVIEWED_ON = "2026-09-23";

const DIFFICULTIES = ["Facile", "Moyen", "Difficile"];

const GUIDES = [
  /* ================= AUTOMOBILE ================= */
  {
    id: "pression-pneus-voiture",
    title: "Vérifier et régler la pression des pneus",
    category: "automobile",
    difficulty: "Facile",
    duration: "15 min",
    minutes: 15,
    savings: "≈ 40 €",
    keywords: ["pneus", "pression", "gonfler", "voiture", "station", "gonfleur", "manomètre", "sous-gonflé", "voyant", "roue de secours", "bar"],
    summary: "Des pneus sous-gonflés s'usent plus vite, font consommer davantage et freinent moins bien. Un contrôle par mois, à froid, en station.",
    safety: "Contrôlez à froid, après 10 km maximum : chaud, un pneu affiche une pression plus élevée que la réalité.",
    tools: ["Gonfleur de station avec manomètre", "Gants ou chiffon"],
    parts: [],
    sources: [
      { label: "Codes Rousseau — comment vérifier la pression des pneus", url: "https://public.codesrousseau.fr/conseils-pratiques/864-comment-verifier-la-pression-des-pneus.html" },
      { label: "Allopneus — comment contrôler la pression des pneus", url: "https://www.allopneus.com/guide-pratique/auto/conseils-pneu/pression-pneu-comment-faire" }
    ],
    steps: [
      { title: "Trouver la bonne pression", text: "Lisez l'étiquette collée sur la tranche de la portière conducteur, dans la trappe à carburant ou la boîte à gants, ou reportez-vous au manuel. La pression diffère souvent entre l'avant et l'arrière, et selon la charge." },
      { title: "Rouler peu", text: "Allez à la station la plus proche : moins de 10 km, pour que les pneus restent froids." },
      { title: "Brancher le gonfleur", text: "Dévissez le petit bouchon de la valve, au bord de la jante, et enfoncez fermement l'embout du gonfleur.", tip: "Gardez des gants ou un chiffon : les valves sont souvent sales." },
      { title: "Ajuster", text: "Lisez la pression et ajustez-la à la valeur de l'étiquette. Mettez toujours la même pression sur les deux pneus d'un même essieu." },
      { title: "Refermer les valves", text: "Revissez bien chaque bouchon : il protège la valve de la saleté et évite les fuites." },
      { title: "Penser à la roue de secours", text: "Contrôlez-la une à deux fois par an : dégonflée, elle ne vous sauvera pas en cas de crevaison.", tip: "Contrôlez les quatre pneus au moins une fois par mois et avant chaque long trajet." }
    ],
    troubleshoot: [
      "Un pneu perd régulièrement de la pression : il est peut-être endommagé, faites-le contrôler.",
      "Le voyant de pression des pneus s'allume : contrôlez et regonflez dès que possible."
    ]
  },
  {
    id: "pile-cle-voiture",
    title: "Changer la pile d'une clé de voiture",
    category: "automobile",
    difficulty: "Facile",
    duration: "5 min",
    minutes: 5,
    savings: "≈ 20 €",
    keywords: ["clé", "télécommande", "pile", "cr2032", "cr2025", "plip", "bip", "verrouillage", "centralisation", "portée", "ne marche plus"],
    summary: "La télécommande ne verrouille plus qu'à bout portant ? Sa pile s'use en quelques années et se change en cinq minutes.",
    safety: "Gardez les piles bouton, neuves comme usagées, hors de portée des enfants : avalées, elles provoquent des brûlures graves en quelques heures.",
    tools: ["Petit tournevis plat ou levier en plastique", "Chiffon doux"],
    parts: ["Pile bouton identique à l'ancienne (souvent CR2032 ou CR2025)"],
    sources: [
      { label: "Renault — manuel d'utilisation, remplacement de la pile de la télécommande", url: "https://www.user-manual.renault.com/fr/faites-connaissance-avec-votre-v%C3%A9hicule/cle-telecommande-16" },
      { label: "Pièces et Pneus — télécommande : remplacement de la pile et précautions", url: "https://blog.piecesetpneus.com/telecommandes-de-verrouillage-programmation-remplacement-de-pile-et-solutions-en-cas-de-perte/" },
      { label: "Sports Car Parts — changer la pile de sa clé sans l'abîmer", url: "https://www.sportscarparts.fr/comment-changer-pile-cle-voiture/" },
      { label: "DGCCRF — piles bouton et jeunes enfants", url: "https://www.economie.gouv.fr/dgccrf/les-fiches-pratiques/piles-boutons-et-jeunes-enfants-des-consequences-graves-en-cas-dingestion" }
    ],
    steps: [
      { title: "Identifier la pile", text: "Regardez dans la notice du véhicule quel modèle de pile utiliser et comment s'ouvre la clé. Sortez la clé de secours métallique si elle est intégrée au boîtier." },
      { title: "Ouvrir le boîtier", text: "Glissez le tournevis dans la fente ou l'encoche du boîtier et faites levier doucement pour séparer les deux coques.", tip: "Enveloppez la lame dans un chiffon, ou utilisez un levier en plastique (un médiator convient) : le boîtier ne sera pas marqué." },
      { title: "Noter le sens de la pile", text: "Avant de retirer l'ancienne pile, repérez de quel côté se trouve le « + ». Soulevez-la ensuite avec l'ongle ou un cure-dent.", safety: "Ne touchez pas les deux faces de la pile en même temps et évitez les outils métalliques : risque de court-circuit." },
      { title: "Mettre la pile neuve", text: "Insérez la pile neuve, du même modèle, exactement dans le même sens que l'ancienne." },
      { title: "Refermer et tester", text: "Emboîtez les deux coques jusqu'au clic, remettez la clé de secours, puis testez l'ouverture et la fermeture à distance." }
    ],
    troubleshoot: [
      "Rien ne se passe : vérifiez le sens de la pile. Si c'est bon, consultez la notice : certains véhicules demandent de resynchroniser la clé.",
      "La pile se vide vite : c'est normal sur les clés « mains libres », qui dialoguent en permanence avec la voiture."
    ]
  },
  {
    id: "vidange-huile-moteur",
    title: "Changer l'huile moteur",
    category: "automobile",
    difficulty: "Facile",
    duration: "45 min",
    minutes: 45,
    savings: "≈ 60 €",
    popular: true,
    keywords: ["vidange", "huile", "moteur", "filtre", "entretien voiture"],
    summary: "Une vidange régulière protège votre moteur. Voici comment la faire vous-même, proprement et en sécurité.",
    safety: "Mettez des gants et des lunettes : l'huile chaude brûle. Ne travaillez jamais sous une voiture tenue seulement par un cric.",
    tools: ["Gants et lunettes", "Clé à filtre", "Clé à douille (souvent 13 ou 17 pour le bouchon)", "Bac de récupération de 6 L", "Entonnoir", "Chiffons"],
    parts: ["Huile moteur (quantité et norme dans le carnet d'entretien)", "Filtre à huile", "Joint de bouchon de vidange"],
    photo: "automobile",
    sources: [
      { label: "Wynn's France — la vidange étape par étape", url: "https://www.wynns.fr/consommateur/une-vidange-dhuile-etape-par-etape/" },
      { label: "Garage ADN — vidange soi-même", url: "https://garage-adn.fr/entretien-voiture/vidange-voiture-soi-meme" }
    ],
    steps: [
      { title: "Chauffer puis caler la voiture", text: "Faites tourner le moteur 5 minutes pour fluidifier l'huile, puis coupez-le. Garez-vous à plat, serrez le frein à main et passez une vitesse.", tip: "Une huile tiède coule beaucoup plus vite qu'une huile froide." },
      { title: "Ouvrir le bouchon de remplissage", text: "Ouvrez le capot et dévissez le bouchon de remplissage d'huile sur le dessus du moteur : l'air qui entre aide l'huile à s'écouler." },
      { title: "Dévisser le bouchon de vidange", text: "Glissez le bac sous le carter. Prenez la clé à douille et desserrez le bouchon de vidange, puis finissez à la main.", tip: "Dévissez les derniers tours en poussant le bouchon vers le haut : l'huile ne vous coulera pas sur le bras.", safety: "L'huile peut être très chaude : gardez le visage à l'écart du jet." },
      { title: "Laisser couler", text: "Laissez l'huile s'écouler entièrement. Pendant ce temps, nettoyez le bouchon et remplacez son joint.", timer: 600 },
      { title: "Remplacer le filtre", text: "Dévissez l'ancien filtre avec la clé à filtre (un peu d'huile va couler). Huilez du doigt le joint du filtre neuf et vissez-le à la main, sans outil, jusqu'au contact puis encore trois quarts de tour." },
      { title: "Refermer et remplir", text: "Revissez le bouchon de vidange sans forcer. Versez la nouvelle huile avec l'entonnoir, en commençant par un demi-litre de moins que la quantité prévue." },
      { title: "Contrôler le niveau", text: "Attendez deux minutes, tirez la jauge, essuyez-la, replongez-la : le niveau doit être entre MIN et MAX. Complétez petit à petit. Démarrez 1 minute et vérifiez qu'il n'y a aucune fuite.", timer: 120 },
      { title: "Recycler", text: "Versez l'huile usagée dans les bidons vides et rapportez-la avec le filtre en déchetterie ou chez un garagiste. Jamais dans l'évier ni dans la nature." }
    ],
    troubleshoot: [
      "Le voyant d'huile reste allumé : coupez le moteur tout de suite et vérifiez le niveau.",
      "Une goutte au bouchon : le joint est mal placé ou n'a pas été changé.",
      "Pensez à remettre à zéro l'indicateur d'entretien (procédure dans le manuel)."
    ]
  },
  {
    id: "plaquettes-frein",
    title: "Changer les plaquettes de frein",
    category: "automobile",
    difficulty: "Moyen",
    duration: "1 h",
    minutes: 60,
    savings: "≈ 100 €",
    keywords: ["frein", "freinage", "plaquette", "disque", "bruit", "grincement"],
    summary: "Bruit métallique au freinage ? Il est temps de changer vos plaquettes. Toujours par paire, sur un même essieu.",
    safety: "Mettez des gants. Posez toujours la voiture sur chandelles, jamais sur le seul cric. Les freins sont un organe de sécurité : en cas de doute, faites contrôler.",
    tools: ["Gants", "Cric et chandelles", "Clé à roue", "Clé à douille (souvent 13 ou 15)", "Repousse-piston ou serre-joint", "Brosse métallique"],
    parts: ["Jeu de plaquettes (avant ou arrière)", "Graisse cuivrée pour freins"],
    photo: "frein",
    sources: [
      { label: "ATE — rodage des plaquettes de frein", url: "https://ate-freinage.fr/blog/rodage-des-plaquettes-de-frein/" },
      { label: "Oscaro — rodage des plaquettes neuves", url: "https://www.oscaro.com/fr/conseils-mecaniques/freinage/rodage-plaquettes-neuves" }
    ],
    steps: [
      { title: "Débloquer les écrous", text: "Voiture au sol, desserrez d'un demi-tour les écrous de la roue avec la clé à roue." },
      { title: "Lever et caler", text: "Levez la voiture au point de levage prévu, glissez une chandelle dessous puis redescendez légèrement le cric. Retirez la roue.", safety: "Secouez la voiture avant de passer les mains dessous : elle ne doit pas bouger." },
      { title: "Déposer l'étrier", text: "Avec la clé à douille, retirez les deux vis de guidage à l'arrière de l'étrier. Basculez l'étrier et accrochez-le avec un fil de fer.", safety: "Ne laissez jamais l'étrier pendre par son flexible de frein." },
      { title: "Sortir les anciennes plaquettes", text: "Retirez les plaquettes et les clips. Brossez le support. Regardez le disque : s'il est creusé ou a un gros rebord, il faut le changer aussi." },
      { title: "Repousser le piston", text: "Avec le repousse-piston, rentrez doucement le piston de l'étrier pour faire de la place aux plaquettes neuves.", safety: "Surveillez le bocal de liquide de frein : il remonte quand on repousse le piston et ne doit pas déborder." },
      { title: "Monter les plaquettes neuves", text: "Mettez une fine couche de graisse cuivrée sur les points de glissement (jamais sur la garniture). Posez les plaquettes, remettez l'étrier et serrez les vis." },
      { title: "Remonter et pomper", text: "Remontez la roue, redescendez la voiture et serrez les écrous en étoile. Avant de rouler, appuyez 10 fois sur la pédale de frein jusqu'à ce qu'elle soit ferme.", safety: "Faites l'autre côté de l'essieu avec les mêmes plaquettes." }
    ],
    troubleshoot: [
      "Pédale molle : il y a peut-être de l'air dans le circuit, faites contrôler avant de rouler.",
      "Léger bruit les premiers kilomètres : normal, les plaquettes se rodent. Pendant 300 à 500 km, freinez progressivement et évitez les freinages brusques.",
      "La voiture tire d'un côté : vérifiez le montage et le serrage des deux côtés."
    ]
  },
  {
    id: "voiture-ne-demarre-plus",
    title: "Voiture qui ne démarre plus : diagnostic",
    category: "automobile",
    difficulty: "Facile",
    duration: "20 min",
    minutes: 20,
    savings: "≈ 80 €",
    keywords: ["démarrage", "batterie", "panne", "démarreur", "clic", "ne démarre pas", "booster"],
    summary: "Batterie, démarreur ou alimentation ? Une méthode simple pour trouver la cause avant d'appeler un dépanneur.",
    safety: "Retirez bagues et montre avant de toucher la batterie, et ne mettez jamais en contact le + et le –.",
    tools: ["Multimètre", "Câbles de démarrage ou booster", "Brosse métallique"],
    parts: [],
    sources: [
      { label: "AD — tension d'une batterie de voiture", url: "https://www.ad.fr/guides/guide-conseil/batterie-alternateur-demarreur/tension-batterie-voiture" },
      { label: "Mister Auto — savoir si une batterie est chargée", url: "https://www.mister-auto.com/conseils-entretien/comment-savoir-quand-une-batterie-de-voiture-est-suffisamment-chargee/" }
    ],
    steps: [
      { title: "Observer les symptômes", text: "Mettez le contact. Rien ne s'allume : plutôt la batterie. Un « clic » sans lancement : batterie faible ou démarreur. Le moteur tourne mais ne part pas : carburant ou allumage." },
      { title: "Mesurer la batterie", text: "Réglez le multimètre sur 20 V continu. Pointe rouge sur +, noire sur –. Une batterie saine affiche environ 12,6 V. En dessous de 12,2 V, elle est déchargée." },
      { title: "Vérifier les cosses", text: "Des cosses blanchâtres ou qui bougent empêchent le courant de passer. Débranchez le – puis le +, brossez, et rebranchez le + puis le –, bien serrés." },
      { title: "Démarrer avec des câbles", text: "Rouge sur le + de la batterie à plat, puis sur le + de la batterie saine. Noir sur le – de la batterie saine, puis sur une partie métallique nue du moteur en panne. Démarrez la voiture qui aide, attendez 2 minutes, puis démarrez la vôtre.", timer: 120, safety: "Ne branchez pas la dernière pince noire directement sur la batterie à plat : risque d'étincelle." },
      { title: "Débrancher dans l'ordre inverse", text: "Retirez les pinces dans l'ordre inverse du branchement. Roulez au moins 30 minutes pour recharger la batterie." }
    ],
    troubleshoot: [
      "La voiture ne redémarre pas le lendemain : la batterie est sans doute usée (plus de 5 ans) ou quelque chose la vide.",
      "Même avec les câbles, seul un « clac » : le démarreur est probablement en cause.",
      "Le moteur tourne sans démarrer avec une batterie pleine : vérifiez le carburant, puis faites lire les codes défaut."
    ]
  },
  {
    id: "ampoule-phare",
    title: "Changer une ampoule de phare",
    category: "automobile",
    difficulty: "Facile",
    duration: "15 min",
    minutes: 15,
    savings: "≈ 30 €",
    keywords: ["phare", "ampoule", "H7", "H4", "feu", "lumière", "code"],
    summary: "Un phare grillé, c'est une amende et un danger. Dans la plupart des voitures, ça se change en quelques minutes, sans outil.",
    safety: "Coupez le contact et les feux. Une ampoule qui vient de s'éteindre est brûlante.",
    tools: ["Gants propres ou chiffon", "Tournevis (selon modèle)"],
    parts: ["Ampoule du bon type (H7, H4… indiqué dans le manuel ou sur l'ancienne)"],
    sources: [
      { label: "iCarsoft — changer une ampoule de phare", url: "https://www.icarsoft-france.fr/blogs/entretiens-vehicule/comment-changer-une-ampoule-de-phare" }
    ],
    steps: [
      { title: "Identifier l'ampoule", text: "Ouvrez le capot et repérez l'arrière du phare concerné. Le type d'ampoule est inscrit sur son culot ou dans le manuel." },
      { title: "Retirer le cache", text: "Tournez ou déclipsez le cache en caoutchouc ou en plastique à l'arrière du phare." },
      { title: "Débrancher et sortir l'ancienne", text: "Tirez le connecteur électrique, libérez le ressort ou tournez le culot, puis sortez l'ampoule." },
      { title: "Mettre la neuve", text: "Placez l'ampoule neuve dans le même sens, sans toucher le verre, puis remettez le ressort et le connecteur.", safety: "Ne touchez jamais le verre avec les doigts : la graisse fait éclater l'ampoule en chauffant.", tip: "Tenez-la par le culot métallique ou avec un chiffon propre. Si vous avez touché le verre, nettoyez-le avec un chiffon imbibé d'alcool." },
      { title: "Tester et refermer", text: "Allumez les feux pour vérifier, puis remettez le cache bien en place pour que l'eau n'entre pas." }
    ],
    troubleshoot: [
      "Toujours rien : vérifiez le fusible correspondant (schéma dans le manuel).",
      "Changez les ampoules par paire : l'autre côté ne va pas tarder à lâcher."
    ]
  },
  {
    id: "balais-essuie-glace",
    title: "Remplacer les balais d'essuie-glace",
    category: "automobile",
    difficulty: "Facile",
    duration: "10 min",
    minutes: 10,
    savings: "≈ 20 €",
    keywords: ["essuie-glace", "balai", "pare-brise", "traces", "pluie"],
    summary: "Traces, sauts, bruit : des balais usés gênent la visibilité. Les changer prend dix minutes.",
    safety: "Moteur coupé. Posez une serviette sur le pare-brise : un bras qui se rabat seul peut le fissurer.",
    tools: ["Serviette épaisse", "Mètre (pour la longueur)"],
    parts: ["Paire de balais à la bonne longueur et au bon type de fixation"],
    sources: [
      { label: "Mondial Pare-Brise — comment changer des essuie-glaces", url: "https://www.mondialparebrise.fr/nos-conseils/balais-d-essuie-glaces/comment-changer-des-essuie-glaces" },
      { label: "Vroomly — changer des balais d'essuie-glaces", url: "https://www.vroomly.com/blog/comment-changer-des-balais-dessuie-glaces/" }
    ],
    steps: [
      { title: "Relever les bras", text: "Posez une serviette sur le pare-brise et relevez le bras d'essuie-glace jusqu'à ce qu'il tienne seul." },
      { title: "Déclipser l'ancien balai", text: "Appuyez sur la languette de verrouillage au milieu du balai et faites-le glisser vers le bas pour le sortir du crochet." },
      { title: "Clipser le nouveau", text: "Glissez le nouveau balai dans le crochet jusqu'au « clic ». Tirez dessus pour vérifier qu'il tient." },
      { title: "Reposer doucement", text: "Rabattez le bras délicatement sur la vitre. Recommencez de l'autre côté, puis testez avec le lave-glace." }
    ],
    troubleshoot: [
      "Encore des traces : nettoyez le pare-brise à l'alcool ménager, la cire de lavage en est souvent la cause."
    ]
  },
  {
    id: "changer-roue",
    title: "Changer une roue crevée",
    category: "automobile",
    difficulty: "Facile",
    duration: "25 min",
    minutes: 25,
    savings: "≈ 90 €",
    keywords: ["roue", "crevaison", "pneu", "roue de secours", "galette"],
    summary: "Le geste que tout conducteur devrait savoir faire, au bord de la route comme au garage.",
    safety: "Sur autoroute, il est interdit de changer sa roue sur la bande d'arrêt d'urgence : mettez-vous derrière la glissière et appelez depuis une borne orange. Ailleurs : gilet jaune enfilé avant de sortir, triangle posé à au moins 30 m, feux de détresse, sur du plat et loin de la circulation.",
    tools: ["Gilet et triangle", "Cric", "Clé à roue", "Gants"],
    parts: ["Roue de secours gonflée"],
    sources: [
      { label: "Vinci Autoroutes — peut-on changer sa roue sur l'autoroute ?", url: "https://radio.vinci-autoroutes.com/article/peut-on-changer-sa-roue-sur-l-autoroute" },
      { label: "DGCCRF — gilet et triangle de sécurité", url: "https://www.economie.gouv.fr/dgccrf/les-fiches-pratiques/gilet-et-triangle-de-securite" },
      { label: "Allianz — roue de secours, vitesse et distance", url: "https://www.allianz.fr/assurance-particulier/vehicules/assurance-auto/conseils-pratiques/roues-secours.html" }
    ],
    steps: [
      { title: "Sécuriser", text: "Feux de détresse, frein à main, une vitesse enclenchée. Enfilez le gilet avant de sortir, faites sortir tout le monde côté trottoir, puis posez le triangle à au moins 30 mètres en amont (il doit être visible à 100 m).", safety: "Sur autoroute ou voie rapide, ne changez pas la roue vous-même : c'est interdit sur la bande d'arrêt d'urgence et très dangereux." },
      { title: "Débloquer les écrous", text: "Roue au sol, desserrez chaque écrou d'un demi-tour avec la clé à roue, sans les enlever.", tip: "Appuyez avec le pied sur la clé si c'est trop dur, en poussant dans le sens inverse des aiguilles d'une montre." },
      { title: "Lever la voiture", text: "Placez le cric sous le point de levage le plus proche (repère sur le bas de caisse) et levez jusqu'à ce que le pneu décolle de 3 cm.", safety: "Ne passez jamais une partie du corps sous la voiture sur cric." },
      { title: "Changer la roue", text: "Retirez les écrous, sortez la roue crevée et glissez-la sous la voiture par sécurité. Montez la roue de secours et vissez les écrous à la main." },
      { title: "Serrer en étoile", text: "Redescendez la voiture, puis serrez fort les écrous en étoile (un écrou, puis celui d'en face)." },
      { title: "Contrôler", text: "Vérifiez la pression de la roue de secours à la première station. Contrôlez le serrage des écrous après environ 50 km.", safety: "Une roue « galette » est provisoire : pas plus de 80 km/h, et faites réparer le pneu au plus vite (80 à 100 km maximum)." }
    ],
    troubleshoot: [
      "Écrou antivol : la clé spéciale est souvent dans la boîte à gants ou avec le cric."
    ]
  },

  {
    id: "changer-batterie-voiture",
    title: "Changer la batterie d'une voiture",
    category: "automobile",
    difficulty: "Facile",
    duration: "30 min",
    minutes: 30,
    savings: "≈ 50 €",
    keywords: ["batterie", "voiture", "remplacer batterie", "batterie à plat", "batterie morte", "borne", "cosse"],
    summary: "Batterie trop vieille pour tenir la charge ? La remplacer soi-même est simple, à condition de respecter l'ordre de branchement.",
    safety: "Portez gants et lunettes : une batterie contient de l'acide. Retirez bagues et montre, ne fumez pas à proximité, et ne mettez jamais un outil en contact avec les deux bornes.",
    tools: ["Gants et lunettes", "Clé plate ou à douille (souvent 10 mm)", "Brosse métallique", "Chiffon"],
    parts: ["Batterie de même dimension, même polarité (position du +), même capacité (Ah) et même puissance de démarrage (A)"],
    sources: [
      { label: "Fiches-auto — ordre pour débrancher et rebrancher une batterie", url: "https://www.fiches-auto.fr/articles-auto/tutoriels/s-2293-ordre-pour-debrancher-et-rebrancher-une-batterie-de-voiture.php" },
      { label: "Carglass — brancher et débrancher une batterie", url: "https://www.carglass.fr/faq/answers/6261/comment-brancher-et-debrancher-une-batterie-quelles-precautions-prendre" }
    ],
    steps: [
      { title: "Préparer", text: "Coupez le contact, retirez la clé et éteignez tous les équipements. Si votre autoradio demande un code après une coupure, retrouvez-le dans les papiers du véhicule avant de commencer." },
      { title: "Débrancher la borne –", text: "Desserrez l'écrou de la cosse noire (–) et retirez-la en premier. Écartez-la de la batterie pour qu'elle ne la touche plus.", safety: "Toujours le – en premier au démontage : si la clé touche la carrosserie en travaillant sur le +, il n'y a pas de court-circuit." },
      { title: "Débrancher la borne +", text: "Soulevez le cache rouge, desserrez et retirez la cosse du +." },
      { title: "Sortir l'ancienne batterie", text: "Retirez la bride ou la vis qui maintient la batterie, puis sortez-la en la gardant bien droite.", tip: "Une batterie pèse souvent 12 à 20 kg : pliez les jambes pour la soulever." },
      { title: "Nettoyer les cosses", text: "Brossez l'intérieur des cosses et le support pour retirer les dépôts blanchâtres." },
      { title: "Installer la neuve", text: "Posez la batterie neuve dans le même sens (le + du côté du câble rouge) et remettez la bride de fixation : la batterie ne doit pas bouger." },
      { title: "Brancher le + puis le –", text: "Rebranchez d'abord la cosse +, puis la cosse –, et serrez-les fermement. Démarrez, puis réglez l'heure et réinitialisez les vitres électriques si besoin (voir la notice)." },
      { title: "Recycler l'ancienne", text: "Rapportez l'ancienne batterie au magasin où vous achetez la neuve ou en déchetterie : elle se recycle presque entièrement." }
    ],
    troubleshoot: [
      "La voiture ne démarre toujours pas : vérifiez le serrage des cosses, puis faites contrôler l'alternateur et le démarreur.",
      "Des voyants restent allumés : certaines voitures demandent une initialisation de la batterie avec un outil de diagnostic."
    ]
  },
  {
    id: "changer-fusible-voiture",
    title: "Remplacer un fusible de voiture",
    category: "automobile",
    difficulty: "Facile",
    duration: "10 min",
    minutes: 10,
    savings: "≈ 40 €",
    keywords: ["fusible", "voiture", "boîte à fusibles", "autoradio", "allume-cigare", "prise 12 V", "vitre électrique", "ne marche plus", "électricité"],
    summary: "L'autoradio, l'allume-cigare ou une vitre ne marche plus d'un coup ? Un fusible a peut-être grillé. Il se change en quelques minutes.",
    safety: "Coupez le contact. Ne remplacez jamais un fusible par un modèle plus fort (ampérage supérieur) : le circuit risquerait de chauffer.",
    tools: ["Pince à fusibles (souvent fournie dans la boîte à fusibles) ou pince à becs fins", "Lampe"],
    parts: ["Fusible de même type et de même ampérage (même couleur)"],
    sources: [
      { label: "Caradisiac — comment changer un fusible de voiture", url: "https://www.caradisiac.com/Changer-un-fusible-de-voiture-101165.htm" },
      { label: "Mister Auto — vérifier et changer un fusible grillé", url: "https://www.mister-auto.com/blog/securite/comment-savoir-si-un-fusible-est-mort-sur-sa-voiture-et-pourquoi/" }
    ],
    steps: [
      { title: "Couper le contact", text: "Arrêtez le moteur et retirez la clé." },
      { title: "Trouver la boîte à fusibles", text: "Elle se trouve le plus souvent sur le côté du tableau de bord, sous le volant ou dans le compartiment moteur. La notice indique son emplacement." },
      { title: "Repérer le bon fusible", text: "Le schéma sous le couvercle ou dans la notice indique quel fusible protège quel équipement." },
      { title: "Le retirer et le contrôler", text: "Tirez le fusible bien droit avec la pince. Regardez à travers le plastique : si le filament métallique est coupé, il est grillé." },
      { title: "Mettre un fusible identique", text: "Enfoncez un fusible neuf de même ampérage (le chiffre écrit dessus, et la même couleur), puis testez l'équipement.", tip: "Gardez quelques fusibles de rechange dans la boîte à gants." }
    ],
    troubleshoot: [
      "Le fusible neuf grille aussitôt : il y a un court-circuit sur le circuit, faites-le contrôler par un professionnel.",
      "Le fusible est bon mais l'équipement ne marche pas : le problème vient de l'équipement lui-même ou de son câblage."
    ]
  },

  /* ================= ÉLECTROMÉNAGER ================= */
  {
    id: "filtre-seche-linge",
    title: "Sèche-linge qui sèche mal : nettoyer filtres et condenseur",
    category: "electromenager",
    devices: ["seche-linge"],
    difficulty: "Facile",
    duration: "20 min",
    minutes: 20,
    savings: "≈ 80 €",
    keywords: ["sèche-linge", "sèche mal", "linge humide", "filtre", "peluches", "condenseur", "échangeur", "voyant", "pompe à chaleur", "condensation", "long"],
    summary: "Linge encore humide, cycles qui s'allongent, voyant « filtre » allumé : des peluches bouchent souvent le filtre ou le condenseur.",
    safety: "Débranchez le sèche-linge avant d'intervenir.",
    tools: ["Aspirateur avec brosse", "Chiffon humide"],
    parts: [],
    sources: [
      { label: "Electrolux — nettoyage du condenseur et du filtre du sèche-linge", url: "https://support.electrolux.fr/support-articles/article/nettoyage-du-condenseur-et-du-filtre-du-seche-linge" },
      { label: "Bosch — nettoyer le sèche-linge", url: "https://www.bosch-home.be/fr/nos-services/aide-en-ligne/nettoyer-le-seche-linge" },
      { label: "Murfy — entretenir et nettoyer son sèche-linge", url: "https://murfy.fr/blog/entretien-nettoyage-seche-linge-pompe-a-chaleur-condensation-evacuation-2" }
    ],
    steps: [
      { title: "Débrancher", text: "Débranchez l'appareil et laissez refroidir s'il vient de tourner." },
      { title: "Nettoyer le filtre de porte", text: "Ouvrez la porte, tirez le filtre vers le haut, ouvrez-le et retirez les peluches à la main humide ou à l'aspirateur. Enlevez aussi celles coincées dans son logement et dans le joint.", tip: "À faire après chaque séchage : cela prend quelques secondes." },
      { title: "Laver le filtre s'il est encrassé", text: "S'il est très sale ou entartré, lavez-le à l'eau courante. Il est propre quand on voit la lumière au travers ; sinon, remplacez-le." },
      { title: "Vider le réservoir d'eau", text: "Sur un sèche-linge à condensation ou à pompe à chaleur, videz le réservoir d'eau après chaque cycle : plein, il interrompt le séchage suivant." },
      { title: "Nettoyer le condenseur", text: "Environ une fois par mois : ouvrez la trappe en bas de l'appareil, déverrouillez le condenseur (échangeur), sortez-le et rincez-le sous le robinet jusqu'à ce qu'il n'y ait plus de peluches. Laissez-le égoutter avant de le remettre. Sur les modèles où il ne se retire pas, enlevez les peluches au chiffon humide ou à l'aspirateur avec une brosse.", safety: "Il est fragile : seulement de l'eau claire, jamais d'objet dur ou pointu." }
    ],
    troubleshoot: [
      "Le voyant du condenseur reste allumé après nettoyage : vérifiez le verrouillage de la trappe, puis consultez la notice ou un réparateur."
    ]
  },
  {
    id: "detartrer-bouilloire",
    title: "Détartrer une bouilloire",
    category: "electromenager",
    devices: ["bouilloire"],
    difficulty: "Facile",
    duration: "10 min + 1 h de pose",
    minutes: 70,
    savings: "≈ 30 €",
    keywords: ["bouilloire", "tartre", "calcaire", "détartrage", "vinaigre", "eau calcaire", "dépôts blancs"],
    summary: "Le tartre allonge le temps de chauffe et laisse des particules dans le thé. Une heure de vinaigre blanc à froid suffit, comme l'indiquent les notices des fabricants.",
    safety: "Débranchez la bouilloire. Ne plongez jamais la bouilloire, son socle ou le cordon dans l'eau.",
    tools: ["Brosse douce (pour le filtre)"],
    parts: ["Vinaigre blanc à 8° (50 cl)"],
    sources: [
      { label: "Moulinex — notice et questions fréquentes, bouilloire Subito", url: "https://www.moulinex.ch/fr/notices/Produits/Boissons/Bouilloire/SUBITO/csp/7211000677" },
      { label: "KitchenAid — comment détartrer une bouilloire", url: "https://www.kitchenaid.fr/blog/comment-detartrer-une-bouilloire" }
    ],
    steps: [
      { title: "Vider et débrancher", text: "Débranchez la bouilloire et videz l'eau qui reste." },
      { title: "Verser le vinaigre", text: "Versez 50 cl de vinaigre blanc dans la bouilloire, sans la faire chauffer, et laissez agir 1 heure.", timer: 3600, tip: "Détartrez au moins une fois par mois si votre eau est très calcaire." },
      { title: "Nettoyer le filtre", text: "Pendant ce temps, retirez le filtre du bec s'il s'enlève, puis brossez-le ou faites-le tremper dans un peu de vinaigre." },
      { title: "Rincer", text: "Videz la bouilloire et rincez-la 5 ou 6 fois à l'eau claire. S'il reste du tartre, recommencez." },
      { title: "Chasser le goût", text: "Faites bouillir une fois de l'eau claire et jetez-la : il ne restera aucun goût de vinaigre." }
    ],
    troubleshoot: [
      "Ne frottez jamais le fond avec une éponge abrasive : la résistance ne doit pas être grattée.",
      "Bouilloire en plastique : utilisez de préférence un détartrant spécial, en suivant sa notice."
    ]
  },
  {
    id: "degivrer-congelateur",
    title: "Dégivrer un congélateur",
    category: "electromenager",
    devices: ["congelateur", "refrigerateur"],
    difficulty: "Facile",
    duration: "1 h à 2 h",
    minutes: 90,
    savings: "≈ 15 € par an",
    keywords: ["congélateur", "givre", "glace", "dégivrer", "dégivrage", "consommation", "freezer", "tiroir bloqué"],
    summary: "Le givre isole les parois et fait grimper la consommation : selon l'ADEME, 3 mm de givre peuvent l'augmenter de 30 %. Un dégivrage deux à trois fois par an règle le problème.",
    safety: "Débranchez l'appareil à la prise : la veille ne suffit pas. N'utilisez jamais de couteau ni d'objet pointu pour décoller la glace.",
    tools: ["Glacière ou sacs isothermes", "Serpillière et serviettes", "Casserole et dessous-de-plat", "Spatule en plastique ou en bois"],
    parts: [],
    sources: [
      { label: "Ekwateur — comment dégivrer un congélateur", url: "https://ekwateur.fr/blog/ma-consommation-d-energie/degivrage-congelateur/" },
      { label: "Alpiq — dégivrer un congélateur pour économiser l'énergie", url: "https://particuliers.alpiq.fr/guide-energie/economie-energie/degivrer-congelateur" }
    ],
    steps: [
      { title: "Mettre les aliments au froid", text: "Videz le congélateur et rangez les aliments bien serrés dans une glacière ou des sacs isothermes." },
      { title: "Débrancher", text: "Débranchez l'appareil à la prise, laissez la porte ouverte et posez serpillière et serviettes au pied pour recueillir l'eau." },
      { title: "Accélérer la fonte", text: "Posez une casserole d'eau bouillante sur un dessous-de-plat à l'intérieur, puis fermez la porte 15 minutes. Recommencez si besoin.", timer: 900, safety: "Ne posez jamais la casserole brûlante directement sur le plastique." },
      { title: "Décoller la glace", text: "Détachez les plaques de glace ramollies à la main ou avec la spatule, sans forcer.", safety: "Jamais de couteau ni d'objet pointu : vous risquez de percer la paroi et de rendre l'appareil inutilisable." },
      { title: "Nettoyer et sécher", text: "Nettoyez les parois et le joint avec de l'eau additionnée d'un peu de vinaigre blanc, puis séchez soigneusement : le givre reviendra moins vite." },
      { title: "Remettre en route", text: "Rebranchez l'appareil et attendez qu'il soit redescendu à au moins −6 °C avant de remettre les aliments." }
    ],
    troubleshoot: [
      "Le givre revient très vite : coincez une feuille de papier dans la porte fermée. Si elle glisse sans résistance, le joint est à changer (voir la fiche sur le joint de réfrigérateur)."
    ]
  },
  {
    id: "nettoyer-filtre-hotte",
    title: "Nettoyer les filtres d'une hotte qui aspire mal",
    category: "electromenager",
    devices: ["hotte"],
    difficulty: "Facile",
    duration: "15 min",
    minutes: 15,
    savings: "≈ 30 €",
    keywords: ["hotte", "filtre", "graisse", "aspire mal", "aspiration", "odeur", "charbon", "cuisine", "hotte aspirante"],
    summary: "Une hotte qui aspire mal a souvent un filtre saturé de graisse. Le filtre métallique se lave ; le filtre à charbon, lui, se remplace le plus souvent.",
    safety: "Hotte éteinte et plaques de cuisson froides. Des filtres encrassés augmentent le risque d'incendie de graisse : ne tardez pas.",
    tools: ["Éponge non abrasive", "Brosse souple", "Dégraissant ou liquide vaisselle"],
    parts: ["Filtre à charbon neuf compatible avec votre hotte (hotte en recyclage d'air uniquement)"],
    sources: [
      { label: "Bosch — nettoyer et changer les filtres de sa hotte", url: "https://www.bosch-home.fr/nos-astuces/nos-conseils/hottes/entretien-filtres" },
      { label: "Electrolux — nettoyer les filtres d'une hotte", url: "https://support.electrolux.fr/support-articles/article/filtres-a-charbon-pour-hotte-nettoyage-duree-de-vie" }
    ],
    steps: [
      { title: "Retirer le filtre à graisse", text: "Ouvrez le loquet du filtre métallique, sous la hotte, et retirez-le en le tenant à deux mains. La notice indique où il se trouve sur votre modèle." },
      { title: "Laver le filtre", text: "Au lave-vaisselle : seul, sans vaisselle, sur un programme court à basse température. À la main : faites-le tremper dans de l'eau chaude avec un dégraissant, brossez, puis rincez abondamment.", tip: "Un filtre en aluminium peut se ternir au lavage : cela ne change rien à son efficacité." },
      { title: "Vérifier le filtre à charbon", text: "Si votre hotte n'a pas de conduit vers l'extérieur (recyclage d'air), un filtre à charbon se trouve derrière. La plupart ne se lavent pas et se remplacent tous les 4 à 6 mois ; certains modèles dits régénérables se lavent et se sèchent au four, selon la notice." },
      { title: "Remonter", text: "Remettez le filtre à charbon, puis le filtre à graisse bien sec. Allumez la hotte pour vérifier l'aspiration.", tip: "Si vous cuisinez souvent, lavez le filtre métallique environ une fois par mois." }
    ],
    troubleshoot: [
      "Les odeurs restent avec une hotte en recyclage : le filtre à charbon est saturé. Remplacez-le par un modèle compatible avec votre hotte."
    ]
  },
  {
    id: "courroie-lave-linge",
    title: "Remplacer la courroie d'un lave-linge",
    category: "electromenager",
    devices: ["lave-linge"],
    difficulty: "Moyen",
    duration: "30 min",
    minutes: 30,
    savings: "≈ 90 €",
    popular: true,
    keywords: ["machine à laver", "lave-linge", "tambour", "courroie", "ne tourne plus"],
    summary: "Le moteur tourne mais pas le tambour ? La courroie est sans doute usée ou sortie de sa poulie.",
    safety: "Débranchez la prise avant d'ouvrir la machine, et mettez des gants : les tôles du châssis coupent.",
    tools: ["Gants", "Clé à douille de 10", "Tournevis cruciforme", "Lampe", "Petit bol pour les vis"],
    parts: ["Courroie compatible (référence inscrite dessus)"],
    sources: [
      { label: "Spareka — changer la courroie d'un lave-linge", url: "https://www.spareka.fr/comment-reparer/electromenager/lave-linge/comment-changer-la-courroie-d-un-lave-linge" },
      { label: "Tout-Électroménager — remplacer la courroie", url: "https://tout-electromenager.fr/129/tutoriels-de-depannage-electromenager/lave-linge-1/remplacer-la-courroie-de-son-lave-linge" },
      { label: "Adepem — changer la courroie d'un lave-linge", url: "https://www.adepem.com/blog/remplacer-courroie-lave-linge/" }
    ],
    steps: [
      { title: "Débrancher et dégager la machine", text: "Mettez des gants. Débranchez la prise, fermez le robinet d'arrivée d'eau et tirez doucement la machine pour avoir accès à l'arrière.", tip: "Prenez une photo de l'arrière avant de toucher à quoi que ce soit : elle vous servira au remontage." },
      { title: "Retirer le panneau arrière", text: "Prenez la douille de 10 (ou le tournevis cruciforme selon le modèle) et commencez par retirer les vis du cache arrière, en partant du haut. Posez-les dans un bol pour ne pas les perdre." },
      { title: "Noter la référence de la courroie", text: "Regardez la courroie : une référence est imprimée dessus (par exemple 1192 J5). Notez-la ou prenez-la en photo." },
      { title: "Enlever l'ancienne courroie", text: "Tirez la courroie vers vous d'une main et faites tourner la grande poulie de l'autre : elle sort toute seule.", safety: "Gardez les doigts hors de l'espace entre la courroie et la poulie." },
      { title: "Poser la courroie sur la poulie moteur", text: "Placez la nouvelle courroie d'abord autour de la petite poulie du moteur, bien dans les rainures." },
      { title: "Enrouler sur la grande poulie", text: "Posez la courroie sur le haut de la grande poulie, puis tournez celle-ci à la main : la courroie se met en place progressivement.", tip: "C'est normal que ce soit serré : une courroie neuve doit être bien tendue." },
      { title: "Vérifier, refermer et tester", text: "Faites faire quelques tours à la poulie pour vérifier l'alignement. Revissez le cache avec la douille de 10, rebranchez et lancez un programme rinçage-essorage." }
    ],
    troubleshoot: [
      "La courroie ressaute : vérifiez que le moteur est bien fixé et que la poulie n'a pas de jeu.",
      "Le tambour ne tourne toujours pas mais le moteur non plus : piste des charbons moteur ou de la carte électronique."
    ]
  },
  {
    id: "lave-linge-ne-vidange-pas",
    title: "Lave-linge qui ne vidange plus",
    category: "electromenager",
    devices: ["lave-linge"],
    difficulty: "Facile",
    duration: "20 min",
    minutes: 20,
    savings: "≈ 70 €",
    keywords: ["machine à laver", "eau", "vidange", "filtre", "pompe", "bouché", "reste de l'eau"],
    summary: "Dans la majorité des cas, un simple nettoyage du filtre de vidange suffit.",
    safety: "Débranchez la machine. Il reste souvent plusieurs litres d'eau : protégez le sol.",
    tools: ["Serpillières", "Bassine plate ou plat à four", "Tournevis plat"],
    parts: [],
    sources: [
      { label: "Siemens — nettoyer le filtre d'un lave-linge", url: "https://www.siemens-home.bsh-group.com/fr/nos-services/nettoyage-entretien/soin-du-linge/lave-linge/nettoyage-detartrage/filtre" },
      { label: "SOS Accessoire — nettoyer le filtre de vidange", url: "https://atelier.sos-accessoire.com/nettoyer-filtre-lave-linge/" }
    ],
    steps: [
      { title: "Accéder au filtre", text: "Ouvrez la petite trappe en bas à l'avant de la machine avec le tournevis plat. Posez les serpillières et la bassine plate dessous." },
      { title: "Vider l'eau", text: "S'il y a un petit tuyau de vidange d'urgence, sortez-le et débouchez-le au-dessus de la bassine. Sinon, dévissez le filtre d'un quart de tour à la fois pour contrôler le débit.", tip: "Il peut y avoir 5 à 10 litres : prévoyez plusieurs bassines." },
      { title: "Nettoyer le filtre", text: "Dévissez complètement le filtre, retirez pièces, cheveux, peluches, et rincez-le sous le robinet." },
      { title: "Vérifier l'hélice de la pompe", text: "Avec une lampe, regardez dans le logement : l'hélice doit tourner librement avec le doigt. Retirez ce qui la bloque." },
      { title: "Remonter et tester", text: "Revissez le filtre bien à fond, rebranchez et lancez un programme « vidange » ou « essorage »." }
    ],
    troubleshoot: [
      "L'eau ne sort pas du tout par le filtre : le tuyau de vidange derrière la machine est peut-être plié ou bouché.",
      "La pompe ronronne sans vider : elle est peut-être en fin de vie (pièce facile à changer)."
    ]
  },
  {
    id: "lave-vaisselle-lave-mal",
    title: "Lave-vaisselle qui lave mal",
    category: "electromenager",
    devices: ["lave-vaisselle"],
    difficulty: "Facile",
    duration: "30 min",
    minutes: 30,
    savings: "≈ 80 €",
    keywords: ["lave-vaisselle", "vaisselle sale", "filtre", "bras", "traces", "odeur"],
    summary: "Vaisselle encore sale ou mauvaises odeurs ? Filtre encrassé et bras bouchés sont presque toujours en cause.",
    safety: "Débranchez l'appareil. Attention au verre cassé au fond de la cuve : mettez des gants.",
    tools: ["Gants", "Cure-dents ou trombone", "Vieille brosse à dents"],
    parts: ["Produit nettoyant pour lave-vaisselle (facultatif)"],
    sources: [
      { label: "Bosch — nettoyer le filtre du lave-vaisselle", url: "https://www.bosch-home.fr/nos-services/aide-en-ligne/assistance-lave-vaisselle/entretien/comment-nettoyer-filtre-lave-vaisselle" },
      { label: "SOS Accessoire — nettoyer le filtre d'un lave-vaisselle", url: "https://atelier.sos-accessoire.com/nettoyer-filtre-lave-vaisselle/" }
    ],
    steps: [
      { title: "Sortir les paniers", text: "Retirez le panier du bas pour accéder au fond de la cuve." },
      { title: "Démonter le filtre", text: "Tournez le filtre cylindrique au centre d'un quart de tour dans le sens inverse des aiguilles d'une montre et soulevez-le avec la grille." },
      { title: "Nettoyer le filtre", text: "Rincez sous l'eau chaude et frottez avec la brosse à dents jusqu'à ce que la grille soit bien claire." },
      { title: "Déboucher les bras", text: "Retirez les bras de lavage (ils se déclipsent ou se dévissent). Débouchez chaque trou avec un cure-dents et rincez.", tip: "Secouez le bras : s'il fait du bruit, un morceau est coincé dedans." },
      { title: "Remonter et lancer un cycle à vide", text: "Remontez tout, puis lancez un programme chaud à vide avec le produit nettoyant." }
    ],
    troubleshoot: [
      "Traces blanches : réglez la dureté de l'eau et remettez du sel régénérant.",
      "Les bras ne tournent pas : vérifiez qu'aucun plat ne les bloque en fermant la porte."
    ]
  },
  {
    id: "joint-refrigerateur",
    title: "Réfrigérateur qui givre : vérifier le joint",
    category: "electromenager",
    devices: ["refrigerateur", "congelateur", "cave-a-vin"],
    difficulty: "Facile",
    duration: "20 min",
    minutes: 20,
    savings: "≈ 60 €",
    keywords: ["frigo", "réfrigérateur", "givre", "joint", "porte", "glace", "congélateur"],
    summary: "Du givre qui revient sans cesse ? Un joint de porte qui fuit laisse entrer l'air chaud et humide.",
    safety: "Débranchez l'appareil si vous devez dégivrer. N'utilisez jamais d'outil pointu pour arracher la glace.",
    tools: ["Feuille de papier", "Éponge", "Eau chaude savonneuse", "Sèche-cheveux"],
    parts: ["Joint de porte (seulement s'il est déchiré)"],
    sources: [
      { label: "Samsung — réfrigérateur qui givre ou qui fuit", url: "https://www.samsung.com/be_fr/support/home-appliances/que-faire-si-mon-refrigerateur-fait-du-givre-ou-fuit" },
      { label: "Murfy — réparer un joint de frigo", url: "https://murfy.fr/blog/joint-de-frigo" }
    ],
    steps: [
      { title: "Faire le test de la feuille", text: "Coincez une feuille de papier dans la porte fermée et tirez dessus. Elle doit résister. Refaites le test tout autour de la porte.", tip: "Là où la feuille glisse sans effort, le joint ne plaque plus." },
      { title: "Nettoyer le joint", text: "Lavez le joint et ses plis à l'eau tiède savonneuse : la saleté empêche souvent l'étanchéité. Séchez bien avec un chiffon." },
      { title: "Laisser le joint reprendre sa forme", text: "Fermez la porte et laissez-la fermée quelques heures : une légère déformation disparaît souvent d'elle-même.", safety: "N'utilisez une source de chaleur (sèche-cheveux) que si la notice du fabricant l'autorise : elle peut déformer le joint." },
      { title: "Vérifier l'aplomb", text: "Réglez les pieds pour que l'appareil penche très légèrement vers l'arrière : la porte se referme alors d'elle-même." },
      { title: "Refaire le test", text: "Refaites le test de la feuille tout autour de la porte. Si elle glisse encore au même endroit, le joint doit être remplacé." }
    ],
    troubleshoot: [
      "Le joint est déchiré ou durci : commandez un joint à la référence de l'appareil, il se clipse ou s'encastre.",
      "La porte ne ferme pas droite : réglez les pieds pour que l'appareil penche légèrement vers l'arrière."
    ]
  },
  {
    id: "aspirateur-aspire-mal",
    title: "Aspirateur qui n'aspire plus",
    category: "electromenager",
    devices: ["aspirateur"],
    difficulty: "Facile",
    duration: "15 min",
    minutes: 15,
    savings: "≈ 100 €",
    keywords: ["aspirateur", "aspiration", "filtre", "bouché", "puissance"],
    summary: "Avant d'en racheter un, vérifiez les trois coupables : sac ou bac plein, filtres encrassés, tuyau bouché.",
    safety: "Débranchez l'aspirateur (ou retirez la batterie) avant toute intervention.",
    tools: ["Manche à balai", "Vieille brosse à dents", "Ciseaux"],
    parts: ["Sac neuf (si modèle à sac)"],
    sources: [
      { label: "Rowenta — réparer un aspirateur qui n'aspire plus", url: "https://www.rowenta.fr/Aspirateurs-et-nettoyeurs/Aspirateurs-sans-fil/comment-r%C3%A9parer-un-aspirateur-qui-n'aspire-plus" },
      { label: "SOS Accessoire — aspirateur qui n'aspire plus", url: "https://www.sos-accessoire.com/aspirateur-aspire-plus.html" },
      { label: "Fiyo — l'aspirateur perd de la puissance", url: "https://www.fiyo.fr/conseils-de-reparation/aspirateur/aspirateur-perd-de-la-puissance-d-aspiration" }
    ],
    steps: [
      { title: "Vider le bac ou changer le sac", text: "Même à moitié plein, un sac peut réduire fortement l'aspiration. Videz le bac ou mettez un sac neuf." },
      { title: "Nettoyer les filtres", text: "Sortez les filtres (moteur et sortie d'air). Tapotez-les au-dessus d'une poubelle. Si le fabricant l'indique, rincez-les à l'eau claire.", safety: "Un filtre lavé doit sécher 24 h avant d'être remonté." },
      { title: "Déboucher le tuyau", text: "Détachez le tuyau et regardez au travers. Poussez doucement le bouchon avec le manche à balai." },
      { title: "Dégager la brosse", text: "Retournez la brosse, coupez les cheveux enroulés autour du rouleau avec les ciseaux et retirez-les." }
    ],
    troubleshoot: [
      "Odeur de brûlé : arrêtez tout, le moteur ou la courroie de la brosse chauffe.",
      "Le rouleau de brosse ne tourne plus : sa courroie est souvent cassée, c'est une petite pièce."
    ]
  },
  {
    id: "detartrer-cafetiere",
    title: "Détartrer une cafetière filtre",
    category: "electromenager",
    devices: ["cafetiere"],
    difficulty: "Facile",
    duration: "1 h 20",
    minutes: 80,
    savings: "≈ 40 €",
    keywords: ["cafetière", "calcaire", "tartre", "café", "machine à café", "détartrage", "vinaigre"],
    summary: "Café tiède, qui coule lentement ? Le calcaire bouche la cafetière. Voici la méthode indiquée par les fabricants de cafetières filtre.",
    safety: "Cette méthode concerne les cafetières filtre. Pour une machine expresso ou à capsules, utilisez le programme et le détartrant indiqués dans sa notice.",
    tools: ["Verre doseur"],
    parts: ["Vinaigre blanc (25 cl)", "Eau (50 cl)"],
    sources: [
      { label: "SEB — notice de la cafetière Express programmable (détartrage)", url: "https://www.seb.fr/notices/Produits/Boissons/Cafeti%C3%A8re/Express-programmable-inox/csp/8000032956" },
      { label: "Brita — précautions avec l'acide citrique", url: "https://www.brita.ch/fr_CH/magazine/filtres-grand-public/detartrer-acide-citrique" }
    ],
    steps: [
      { title: "Préparer la solution", text: "Retirez le filtre et le café. Versez 25 cl de vinaigre blanc et 50 cl d'eau dans le réservoir." },
      { title: "Lancer puis interrompre", text: "Lancez la cafetière sans café, puis arrêtez-la au bout de 2 minutes.", timer: 120 },
      { title: "Laisser agir", text: "Laissez reposer une heure : la solution dissout le calcaire dans le circuit.", timer: 3600 },
      { title: "Finir le cycle", text: "Redémarrez la cafetière pour faire passer le reste de la solution, puis videz et rincez la verseuse." },
      { title: "Rincer", text: "Faites passer deux réservoirs d'eau claire, toujours sans café, pour éliminer le goût du vinaigre.", tip: "À refaire tous les 20 à 40 cycles, ou une fois par mois si l'eau est calcaire." }
    ],
    troubleshoot: [
      "Encore lente : renouvelez l'opération complète, le calcaire était très épais.",
      "N'utilisez pas d'acide citrique chaud : chauffé, il forme des dépôts de citrate de calcium impossibles à enlever."
    ]  },

  {
    id: "lave-linge-ne-demarre-plus",
    title: "Lave-linge qui ne démarre plus",
    category: "electromenager",
    devices: ["lave-linge"],
    difficulty: "Facile",
    duration: "15 min",
    minutes: 15,
    savings: "≈ 80 €",
    popular: true,
    keywords: ["machine à laver", "lave-linge", "ne démarre pas", "ne s'allume pas", "porte", "sécurité enfant", "panne"],
    summary: "Avant d'appeler un dépanneur, cinq vérifications simples règlent une grande partie des pannes de démarrage.",
    safety: "Si la machine sent le brûlé ou fait disjoncter le tableau électrique, ne la rallumez pas : débranchez-la et faites-la contrôler.",
    tools: ["Une lampe ou un autre appareil pour tester la prise"],
    parts: [],
    sources: [
      { label: "Spareka — pourquoi mon lave-linge ne démarre pas ?", url: "https://www.spareka.fr/comment-reparer/electromenager/lave-linge/pourquoi-mon-lave-linge-ne-demarre-pas" },
      { label: "SOS Accessoire — le lave-linge ne démarre pas", url: "https://www.sos-accessoire.com/lave-linge-demarre-pas.html" }
    ],
    steps: [
      { title: "Tester la prise", text: "Débranchez le lave-linge et branchez une lampe sur la même prise. Si elle ne s'allume pas, le problème vient de la prise ou du circuit, pas de la machine." },
      { title: "Vérifier le tableau électrique", text: "Regardez si un disjoncteur a sauté. Réarmez-le une seule fois : s'il saute de nouveau au démarrage de la machine, arrêtez là.", safety: "Un disjoncteur qui saute à chaque lancement signale un défaut électrique : faites appel à un professionnel." },
      { title: "Bien fermer la porte", text: "Refermez la porte fermement : vous devez entendre un « clic ». Tant que la sécurité de porte ne se verrouille pas, la machine refuse de démarrer." },
      { title: "Désactiver la sécurité enfant", text: "Un petit cadenas allumé sur l'écran indique que les touches sont verrouillées. Maintenez les deux touches indiquées dans la notice pendant 3 secondes pour le désactiver." },
      { title: "Relancer un programme", text: "Vérifiez que le robinet d'arrivée d'eau est ouvert, choisissez un programme court et appuyez sur « Départ ». Notez tout code d'erreur affiché : il oriente le diagnostic." }
    ],
    troubleshoot: [
      "La porte ne se verrouille plus malgré le « clic » : la sécurité de porte est probablement en panne (voir la fiche dédiée).",
      "Un code d'erreur s'affiche : cherchez sa signification dans la notice ou sur le site du fabricant.",
      "Rien ne s'allume alors que la prise fonctionne : le câble d'alimentation, le filtre antiparasite ou la carte électronique sont en cause, faites-vous accompagner."
    ]
  },
  {
    id: "securite-porte-lave-linge",
    title: "Remplacer la sécurité de porte d'un lave-linge",
    category: "electromenager",
    devices: ["lave-linge"],
    difficulty: "Moyen",
    duration: "40 min",
    minutes: 40,
    savings: "≈ 90 €",
    keywords: ["lave-linge", "machine à laver", "porte", "hublot", "verrou", "sécurité de porte", "ne verrouille pas", "ne démarre pas"],
    summary: "La porte ne se verrouille plus et la machine refuse de démarrer ? La sécurité de porte, un petit boîtier électrique, se remplace sans démonter la machine.",
    safety: "Débranchez la machine avant toute intervention. Vérifiez qu'il ne reste pas d'eau dans le tambour.",
    tools: ["Tournevis plat", "Tournevis cruciforme ou Torx (selon le modèle)", "Téléphone pour prendre des photos"],
    parts: ["Sécurité de porte compatible (référence sur l'ancienne ou selon le modèle de la machine)"],
    sources: [
      { label: "Spareka — remplacer la sécurité de porte d'un lave-linge", url: "https://www.spareka.fr/comment-reparer/electromenager/lave-linge/comment-remplacer-la-securite-de-porte-d-un-lave-linge" },
      { label: "SOS Accessoire — changer la sécurité de porte d'un lave-linge", url: "https://atelier.sos-accessoire.com/changer-securite-porte-lave-linge/" },
      { label: "Adepem — réparer la sécurité de porte", url: "https://www.adepem.com/blog/remplacer-securite-porte-lave-linge/" }
    ],
    steps: [
      { title: "Débrancher et ouvrir la porte", text: "Débranchez la machine et ouvrez la porte en grand. Repérez la sécurité de porte : un boîtier fixé à droite de l'ouverture, là où entre le crochet de la porte." },
      { title: "Retirer le collier du joint", text: "Avec le tournevis plat, soulevez le ressort ou le collier métallique qui maintient le joint de hublot sur la façade, et retirez-le.", tip: "Photographiez la position du collier et de son ressort avant de l'enlever." },
      { title: "Replier le joint", text: "Décollez le bord du joint de la façade, tout autour, et repoussez-le vers l'intérieur du tambour : vous accédez à l'arrière de la sécurité de porte." },
      { title: "Dévisser l'ancienne sécurité", text: "Retirez les deux vis qui fixent la sécurité sur la façade, sortez-la par l'espace entre la façade et la cuve, puis débranchez son connecteur.", tip: "Prenez une photo du connecteur branché avant de le débrancher." },
      { title: "Installer la nouvelle", text: "Branchez le connecteur sur la sécurité neuve, placez-la dans son logement et revissez-la." },
      { title: "Remonter le joint", text: "Remettez le joint en place sur tout le pourtour de l'ouverture, puis replacez le collier en commençant par le haut." },
      { title: "Tester", text: "Rebranchez, fermez la porte (« clic ») et lancez un programme court : la porte doit se verrouiller puis se déverrouiller à la fin." }
    ],
    troubleshoot: [
      "La porte ne se verrouille toujours pas : vérifiez que le crochet de la porte n'est pas cassé ou tordu.",
      "Le joint fuit : il n'est pas bien engagé sur la façade, reprenez le remontage du collier."
    ]
  },

  /* ================= TÉLÉPHONIE & INFORMATIQUE ================= */
  {
    id: "tetes-impression-imprimante",
    title: "Imprimante qui laisse des traits : nettoyer les têtes",
    category: "telephonie",
    difficulty: "Facile",
    duration: "15 min",
    minutes: 15,
    savings: "≈ 60 €",
    keywords: ["imprimante", "jet d'encre", "traits", "lignes blanches", "bandes", "couleur manquante", "buses", "tête d'impression", "nettoyage", "epson", "hp", "canon"],
    summary: "Lignes blanches ou couleur qui manque : l'encre a souvent séché dans les buses. L'utilitaire de nettoyage de l'imprimante règle la plupart des cas.",
    safety: "N'éteignez jamais l'imprimante pendant un cycle de nettoyage : vous risquez de l'endommager.",
    tools: ["Menu Entretien de l'imprimante ou son logiciel", "Quelques feuilles de papier ordinaire"],
    parts: [],
    sources: [
      { label: "Epson — vérification des buses et nettoyage des têtes (FAQ)", url: "https://www.epson.fr/fr_FR/faq/KA-01087/contents" },
      { label: "Epson — nettoyage de la tête depuis le panneau de commande", url: "https://files.support.epson.com/docid/cpd3/cpd39354/source/printers/source/ink_functions/tasks/xp950/cleaning_head_lcd_xp950.html" },
      { label: "Informaticien à domicile — nettoyer les têtes d'imprimante", url: "https://www.informaticienadomicile.com/blog/actualites-nouveautes-informatiques/comment-nettoyer-les-tetes-dimprimantes-2/" }
    ],
    steps: [
      { title: "Vérifier les buses", text: "Chargez du papier ordinaire et lancez « Vérification des buses » depuis le menu Entretien de l'imprimante ou son logiciel. Des trous dans les lignes du motif signalent des buses bouchées." },
      { title: "Lancer un nettoyage", text: "Dans le même menu, lancez « Nettoyage de la tête » et attendez la fin du cycle.", tip: "Chaque nettoyage consomme un peu d'encre : vérifiez le résultat avant d'en relancer un." },
      { title: "Vérifier de nouveau", text: "Imprimez une nouvelle vérification des buses. S'il reste des trous, relancez un nettoyage." },
      { title: "Laisser reposer", text: "Toujours des défauts après 2 ou 3 nettoyages : éteignez l'imprimante et laissez-la reposer au moins 6 heures (une nuit, c'est l'idéal), puis refaites une vérification.", safety: "Ne dépassez pas six nettoyages d'affilée." }
    ],
    troubleshoot: [
      "Aucune amélioration : une cartouche est peut-être vide, trop ancienne ou abîmée. Remplacez-la.",
      "Pour que ça ne revienne pas : imprimez une page de temps en temps, une par semaine suffit à éviter que l'encre sèche."
    ]
  },
  {
    id: "touche-clavier-bloquee",
    title: "Nettoyer un clavier et débloquer une touche",
    category: "telephonie",
    difficulty: "Facile",
    duration: "15 min",
    minutes: 15,
    savings: "≈ 50 €",
    keywords: ["clavier", "touche", "colle", "bloquée", "ne répond pas", "accroche", "miettes", "poussière", "ordinateur portable", "macbook", "pc"],
    summary: "Une touche qui accroche, répond mal ou plus du tout : des miettes ou de la poussière sont souvent coincées dessous. De l'air comprimé suffit dans bien des cas.",
    safety: "Ordinateur éteint et débranché. Ne vaporisez jamais de liquide directement sur le clavier.",
    tools: ["Bombe d'air comprimé avec sa tige", "Chiffon microfibre", "Alcool isopropylique (70 % d'alcool pour 30 % d'eau)"],
    parts: [],
    sources: [
      { label: "Apple — nettoyer le clavier d'un MacBook ou MacBook Pro", url: "https://support.apple.com/fr-fr/102365" },
      { label: "Dell — nettoyer et entretenir votre ordinateur", url: "https://www.dell.com/support/kbdoc/fr-fr/000124077/comment-nettoyer-et-entretenir-votre-ordinateur-dell" }
    ],
    steps: [
      { title: "Éteindre et débrancher", text: "Éteignez l'ordinateur, puis débranchez le chargeur et tous les accessoires." },
      { title: "Incliner l'ordinateur", text: "Ouvrez l'écran et tenez l'ordinateur incliné à environ 75°, sans qu'il soit tout à fait vertical." },
      { title: "Souffler", text: "Fixez la tige sur la bombe et soufflez sur le clavier, ou seulement sur la touche en cause, de gauche à droite, le bout de la tige à environ 1 cm des touches.", safety: "Ne retournez pas et n'inclinez pas la bombe : elle projetterait un liquide glacé qui abîme le clavier et la peau." },
      { title: "Recommencer sur les côtés", text: "Tournez l'ordinateur sur son côté droit et soufflez de nouveau de gauche à droite. Faites de même sur le côté gauche." },
      { title: "Nettoyer la surface", text: "Essuyez les touches avec le chiffon juste humide (pas mouillé) du mélange alcool et eau.", tip: "Pas d'aspirateur : il crée de l'électricité statique, dangereuse pour les composants." }
    ],
    troubleshoot: [
      "La touche ne répond toujours pas : sur un MacBook, Apple conseille de passer par un centre de services agréé. Sur les autres ordinateurs, la touche ou le clavier se remplacent, souvent chez un réparateur."
    ]
  },
  {
    id: "ordinateur-portable-chauffe",
    title: "Ordinateur portable qui chauffe : nettoyer les aérations",
    category: "telephonie",
    difficulty: "Facile",
    duration: "15 min",
    minutes: 15,
    savings: "≈ 60 €",
    keywords: ["ordinateur", "portable", "pc", "chauffe", "surchauffe", "ventilateur", "bruit", "souffle", "s'éteint", "brûlant", "aération", "poussière"],
    summary: "Ventilateur qui souffle fort, dessous brûlant, ordinateur qui ralentit ou s'éteint : la poussière bouche souvent les aérations.",
    safety: "Ordinateur éteint, chargeur et accessoires débranchés. Pas d'aspirateur : il crée de l'électricité statique qui peut endommager les composants.",
    tools: ["Bombe d'air comprimé", "Chiffon microfibre sec"],
    parts: [],
    sources: [
      { label: "Dell — prévenir la surchauffe d'un ordinateur", url: "https://www.dell.com/support/contents/fr-fr/article/product-support/self-support-knowledgebase/battery-and-power/fan" },
      { label: "Dell — nettoyer et entretenir votre ordinateur", url: "https://www.dell.com/support/kbdoc/fr-fr/000124077/comment-nettoyer-et-entretenir-votre-ordinateur-dell" }
    ],
    steps: [
      { title: "Éteindre et débrancher", text: "Éteignez complètement l'ordinateur, puis débranchez le chargeur et les accessoires." },
      { title: "Repérer les aérations", text: "Cherchez les grilles d'aération : le plus souvent à l'arrière, sur les côtés et en dessous." },
      { title: "Souffler la poussière", text: "Soufflez par petites pressions dans chaque grille.", safety: "Tenez la bombe bien verticale : penchée ou retournée, elle projette de l'humidité." },
      { title: "Essuyer", text: "Retirez la poussière ressortie autour des grilles avec le chiffon sec." },
      { title: "Bien le poser", text: "Rebranchez et utilisez l'ordinateur sur une surface dure et plane : un lit ou un canapé bouchent les aérations." }
    ],
    troubleshoot: [
      "Toujours chaud : fermez les logiciels gourmands et installez les derniers pilotes depuis le site du fabricant.",
      "Le ventilateur fait un bruit anormal ou ne tourne plus : faites-le vérifier par un réparateur."
    ]
  },
  {
    id: "ecran-telephone",
    title: "Remplacer un écran de téléphone",
    category: "telephonie",
    difficulty: "Difficile",
    duration: "1 h 30",
    minutes: 90,
    savings: "≈ 120 €",
    popular: true,
    keywords: ["smartphone", "portable", "écran cassé", "fissuré", "vitre", "iphone", "android"],
    summary: "Un écran fissuré n'est pas une fatalité. Avec patience et le bon kit, votre téléphone repart pour des années.",
    safety: "Travaillez sur une surface propre et claire. Une batterie percée peut prendre feu : ne forcez jamais dessus avec un outil métallique.",
    tools: ["Kit de tournevis de précision", "Ventouse", "Médiators en plastique", "Sèche-cheveux", "Pince brucelles", "Feuille de papier pour ranger les vis"],
    parts: ["Écran de remplacement compatible avec votre modèle exact", "Adhésif d'étanchéité"],
    photo: "ecran",
    sources: [
      { label: "Samsung — autoréparer l'écran de son smartphone", url: "https://www.samsung.com/fr/support/mobile-devices/auto-reparer-l-ecran-de-mon-smartphone/" },
      { label: "iFixit — exemple de remplacement d'écran (Pixel 5)", url: "https://www.ifixit.com/Guide/Google+Pixel+5+Screen+Replacement/140507" }
    ],
    steps: [
      { title: "Éteindre et sauvegarder", text: "Sauvegardez vos données si l'écran répond encore, puis éteignez complètement le téléphone et retirez le tiroir SIM." },
      { title: "Chauffer les bords", text: "Chauffez les bords de l'écran au sèche-cheveux pour ramollir la colle.", timer: 90, tip: "Rangez chaque vis sur un papier en dessinant le téléphone : elles n'ont pas toutes la même longueur." },
      { title: "Décoller l'écran", text: "Posez la ventouse près du bas, soulevez légèrement et glissez un médiator dans l'ouverture. Faites le tour doucement pour couper la colle.", safety: "N'enfoncez pas le médiator de plus de 3 mm : des nappes fragiles passent juste en dessous." },
      { title: "Déconnecter la batterie", text: "Ouvrez l'écran comme un livre sans tirer sur les nappes. Retirez la plaque de protection et débranchez la batterie en premier, avant toute autre nappe." },
      { title: "Changer l'écran", text: "Débranchez les nappes de l'ancien écran, connectez celles du nouveau, puis rebranchez la batterie et allumez pour tester l'affichage et le tactile." },
      { title: "Refermer", text: "Éteignez, posez l'adhésif neuf, refermez et pressez les bords quelques minutes." }
    ],
    troubleshoot: [
      "Écran noir : une nappe est mal enfoncée, rouvrez et reclipsez-la bien droite.",
      "Tactile qui ne répond pas à certains endroits : l'écran de remplacement peut être défectueux, contactez le vendeur."
    ]
  },
  {
    id: "telephone-ne-charge-plus",
    title: "Téléphone qui ne charge plus bien",
    category: "telephonie",
    difficulty: "Facile",
    duration: "10 min",
    minutes: 10,
    savings: "≈ 60 €",
    keywords: ["charge", "chargeur", "port", "usb", "lightning", "batterie", "câble", "smartphone"],
    summary: "Câble qui tient mal, charge qui coupe ? Le port est souvent juste rempli de poussière de poche.",
    safety: "Éteignez le téléphone. N'utilisez jamais d'objet métallique dans le port.",
    tools: ["Lampe", "Cure-dent en bois", "Bombe d'air sec (facultatif)"],
    parts: [],
    sources: [
      { label: "TechRadar — nettoyer le port de charge d'un téléphone", url: "https://global.techradar.com/fr-fr/how-to/comment-nettoyer-le-port-de-charge-dun-telephone" }
    ],
    steps: [
      { title: "Tester un autre câble", text: "Essayez un autre câble et un autre chargeur que vous savez en bon état : c'est la cause la plus fréquente." },
      { title: "Inspecter le port", text: "Éteignez le téléphone et éclairez le port avec une lampe. Un tapis gris au fond est de la poussière tassée." },
      { title: "Nettoyer délicatement", text: "Grattez doucement le fond du port avec la pointe d'un cure-dent en bois, en ressortant la poussière vers l'extérieur. Nettoyage à sec uniquement, sans liquide.", safety: "Sur un port USB-C, évitez la languette centrale : elle est fragile.", tip: "Vous serez surpris de ce qui sort ! Continuez jusqu'à ce que le cure-dent ressorte propre." },
      { title: "Souffler et tester", text: "Soufflez avec la bombe d'air sec, rebranchez le câble : il doit s'enclencher avec un « clic » net." }
    ],
    troubleshoot: [
      "Charge toujours lente : vérifiez l'état de la batterie dans les réglages (au-dessous de 80 %, elle est usée).",
      "Le téléphone chauffe en charge : arrêtez de l'utiliser et faites vérifier la batterie."
    ]
  },
  {
    id: "pc-lent",
    title: "Redonner de la vitesse à un vieil ordinateur",
    category: "telephonie",
    difficulty: "Moyen",
    duration: "1 h",
    minutes: 60,
    savings: "≈ 400 €",
    keywords: ["ordinateur", "pc", "lent", "ssd", "portable", "windows", "ventilateur"],
    summary: "Avant de racheter, un SSD et un peu de ménage peuvent transformer votre machine.",
    safety: "Éteignez et débranchez l'ordinateur. Touchez une surface métallique avant d'ouvrir pour décharger l'électricité statique.",
    tools: ["Tournevis cruciforme de précision", "Clé USB de 16 Go", "Bombe d'air sec", "Disque externe"],
    parts: ["SSD 2,5\" ou M.2 selon la machine (facultatif)", "Pâte thermique (facultatif)"],
    sources: [
      { label: "CDM Informatique — ordinateur lent, SSD et disque dur", url: "https://www.cdminformatique.fr/ordinateur-lent-windows-lenteur-ssd-disque-dur-aide-conseils/" }
    ],
    steps: [
      { title: "Sauvegarder", text: "Copiez vos documents, photos et mots de passe sur un disque externe ou dans le cloud." },
      { title: "Faire le ménage logiciel", text: "Désinstallez les logiciels inutiles et désactivez ceux qui se lancent au démarrage (Gestionnaire des tâches > Démarrage)." },
      { title: "Dépoussiérer", text: "Soufflez dans les grilles d'aération par petites pressions. Un PC qui chauffe ralentit pour se protéger.", tip: "Bloquez le ventilateur avec un doigt pendant que vous soufflez pour ne pas le faire sur-tourner." },
      { title: "Installer un SSD", text: "Ouvrez la trappe, remplacez le disque dur mécanique par le SSD. C'est le gain de vitesse le plus spectaculaire." },
      { title: "Réinstaller proprement", text: "Réinstallez le système depuis la clé USB, puis n'ajoutez que les logiciels utiles et restaurez vos fichiers." }
    ],
    troubleshoot: [
      "Le SSD n'est pas vu : vérifiez qu'il est bien enfoncé et initialisez-le pendant l'installation.",
      "Toujours lent : ajouter de la mémoire vive (RAM) est souvent possible et peu coûteux."
    ]
  },

  /* ================= MAISON & BRICOLAGE ================= */
  {
    id: "detartrer-pommeau-douche",
    title: "Détartrer un pommeau de douche",
    category: "maison",
    difficulty: "Facile",
    duration: "10 min + une nuit",
    minutes: 10,
    savings: "≈ 20 €",
    keywords: ["pommeau", "douche", "douchette", "calcaire", "tartre", "jets", "bouché", "vinaigre", "détartrer", "pression douche"],
    summary: "Jets qui partent de travers ou faiblissent : le calcaire bouche les buses. Une nuit dans le vinaigre blanc suffit le plus souvent.",
    safety: "Évitez les projections de vinaigre dans les yeux et aérez la salle de bain.",
    tools: ["Sac plastique solide", "Élastique ou lien", "Vieille brosse à dents", "Chiffon microfibre"],
    parts: ["Vinaigre blanc"],
    sources: [
      { label: "MesDépanneurs — détartrer un pommeau de douche", url: "https://www.mesdepanneurs.fr/blog/detartrer-pommeau-douche" },
      { label: "Ma Salle de Bain — détartrer un pommeau de douche", url: "https://www.masalledebain.com/blog/materiaux-et-entretien-10/comment-detartrer-un-pommeau-de-douche-14" }
    ],
    steps: [
      { title: "Dévisser le pommeau", text: "Dévissez le pommeau du flexible et plongez-le dans un récipient de vinaigre blanc." },
      { title: "Sinon, l'emballer", text: "S'il ne se dévisse pas, remplissez un sac plastique de vinaigre blanc, enfilez-le autour du pommeau pour que les buses trempent, et fermez-le avec un élastique." },
      { title: "Laisser agir", text: "Laissez tremper plusieurs heures, idéalement toute une nuit." },
      { title: "Frotter les buses", text: "Frottez les picots avec la vieille brosse à dents pour déloger le calcaire restant.", tip: "Frottez doucement : trop appuyer peut enfoncer les dépôts dans les trous." },
      { title: "Rincer et remonter", text: "Rincez abondamment à l'eau claire, puis revissez le pommeau et essuyez-le." }
    ],
    troubleshoot: [
      "Pour espacer les détartrages : passez la main sur les picots en silicone de temps en temps et essuyez la douchette après la douche."
    ]
  },
  {
    id: "regler-porte-placard",
    title: "Régler une porte de placard qui frotte ou penche",
    category: "maison",
    difficulty: "Facile",
    duration: "15 min",
    minutes: 15,
    savings: "≈ 50 €",
    keywords: ["porte", "placard", "cuisine", "meuble", "charnière", "frotte", "penche", "ferme mal", "décalée", "réglage", "armoire"],
    summary: "Porte qui frotte, penche ou ferme mal : les charnières de meuble se règlent dans trois directions avec un simple tournevis.",
    safety: "Ne retirez jamais complètement les vis de l'embase : desserrez-les seulement, sinon la porte tombe.",
    tools: ["Tournevis cruciforme PZ2"],
    parts: [],
    sources: [
      { label: "Furnica — régler une charnière de meuble pas à pas", url: "https://furnica.fr/blogs/infos/regler-charniere-meuble-guide-etape-par-etape" },
      { label: "MesDépanneurs — comment régler une porte de placard", url: "https://www.mesdepanneurs.fr/blog/regler-porte-placard" }
    ],
    steps: [
      { title: "Observer le défaut", text: "Porte fermée, repérez ce qui ne va pas : elle frotte en haut ou en bas, penche côté poignée, les espaces entre les portes sont inégaux, ou elle ressort du meuble.", tip: "Réglez toujours dans cet ordre : hauteur, puis côté, puis profondeur." },
      { title: "Régler la hauteur", text: "Ouvrez la porte. Sur la plupart des charnières, desserrez d'un demi-tour les deux vis de l'embase (la partie vissée dans le meuble), faites glisser la porte vers le haut ou le bas, puis resserrez en commençant par la charnière du haut. Certains modèles ont une vis dédiée à la hauteur." },
      { title: "Régler le côté", text: "Tournez la vis de réglage latéral pour décaler la porte vers la gauche ou la droite. La charnière du haut agit sur le haut de la porte, celle du bas sur le bas : c'est ainsi qu'on redresse une porte qui penche." },
      { title: "Régler la profondeur", text: "Tournez la vis de profondeur pour rapprocher ou éloigner la porte du meuble, jusqu'à ce qu'elle ferme à plat sans frotter." },
      { title: "Vérifier", text: "Procédez par petits ajustements en refermant la porte à chaque fois. Visez des espaces réguliers de 1,5 à 3 mm entre les portes.", tip: "Utilisez bien un embout PZ2 : un embout PH ripe dans ces vis et abîme leur tête." }
    ],
    troubleshoot: [
      "La porte ne se règle plus assez : la charnière est peut-être cassée. Notez sa marque et son modèle pour en racheter une identique."
    ]
  },
  {
    id: "deboucher-toilettes",
    title: "Déboucher des toilettes",
    category: "maison",
    difficulty: "Facile",
    duration: "30 min",
    minutes: 30,
    savings: "≈ 100 €",
    keywords: ["toilettes", "wc", "bouché", "bouchon", "cuvette", "déborde", "ventouse", "furet", "canalisation", "chasse d'eau", "évacuation"],
    summary: "L'eau monte dans la cuvette et ne s'évacue plus ? Le plus souvent, eau chaude, ventouse puis furet suffisent, dans cet ordre.",
    safety: "Ne tirez plus la chasse si l'eau est déjà remontée : la cuvette peut déborder. Portez des gants.",
    tools: ["Gants de ménage", "Seau et petit récipient", "Ventouse à collerette (spéciale WC)", "Furet de plomberie (si besoin)"],
    parts: ["Liquide vaisselle"],
    sources: [
      { label: "Castorama — comment déboucher un WC", url: "https://www.castorama.fr/idees-et-conseils/comment-deboucher-un-wc/CF_CC_npcart_100501.art" },
      { label: "Yoojo — déboucher des toilettes soi-même", url: "https://yoojo.fr/bricolage/guides/comment-deboucher-des-toilettes-astuces-videos-43" },
      { label: "MesDépanneurs — déboucher des WC : méthodes et erreurs à éviter", url: "https://www.mesdepanneurs.fr/blog/deboucher-WC" }
    ],
    steps: [
      { title: "Couper l'eau et vider", text: "Fermez le robinet d'arrivée d'eau du réservoir (sur le côté ou en dessous), puis retirez le plus possible d'eau stagnante avec un petit récipient." },
      { title: "Eau chaude et liquide vaisselle", text: "Versez un demi-verre de liquide vaisselle dans la cuvette et attendez 10 minutes, puis versez d'un coup 2 à 3 litres d'eau très chaude.", timer: 600, safety: "Jamais d'eau bouillante : elle peut abîmer la porcelaine et les joints. Attention aux éclaboussures." },
      { title: "Observer", text: "Attendez quelques minutes. Si le niveau baisse, recommencez une fois. S'il ne bouge pas, passez à la ventouse." },
      { title: "Utiliser la ventouse", text: "Placez la ventouse au fond de la cuvette pour boucher complètement l'orifice : elle doit être sous l'eau. Poussez doucement, puis faites des allers-retours énergiques et tirez d'un coup sec.", tip: "Une ventouse à collerette (jupe en caoutchouc) épouse bien mieux le fond des WC qu'une ventouse d'évier." },
      { title: "Passer le furet si besoin", text: "Déroulez le furet dans la cuvette jusqu'à sentir le bouchon, puis tournez la manivelle en poussant : il perce le bouchon ou l'accroche pour le ressortir." },
      { title: "Vérifier", text: "Rouvrez l'arrivée d'eau et tirez la chasse : l'eau doit s'évacuer normalement." }
    ],
    troubleshoot: [
      "Un objet est tombé (jouet, lingette…) ou le bouchon résiste au furet : appelez un plombier plutôt que d'insister.",
      "Déboucheur chimique : en dernier recours seulement, avec gants, pièce aérée, et jamais mélangé à un autre produit (vinaigre, eau de Javel).",
      "Maison sur fosse septique : pas de soude ni de produit chimique, ils détruisent les bactéries utiles de la fosse."
    ]
  },
  {
    id: "robinet-qui-fuit",
    title: "Réparer un robinet qui fuit",
    category: "maison",
    difficulty: "Facile",
    duration: "30 min",
    minutes: 30,
    savings: "≈ 90 €",
    keywords: ["robinet", "fuite", "goutte", "mitigeur", "joint", "cartouche", "plomberie"],
    summary: "Un robinet qui goutte perd près de 100 litres d'eau par jour. Le joint ou la cartouche sont presque toujours en cause.",
    safety: "Coupez l'eau avant de démonter quoi que ce soit, et gardez un chiffon sous la main.",
    tools: ["Clé à molette", "Tournevis plat et cruciforme", "Clé Allen (mitigeur)", "Chiffon"],
    parts: ["Joint ou cartouche compatible (emportez l'ancienne en magasin)"],
    photo: "robinet",
    sources: [
      { label: "OIEau — volume d'eau perdu par un robinet qui fuit", url: "https://chiffrecle.oieau.fr/827" }
    ],
    steps: [
      { title: "Couper l'eau", text: "Fermez les robinets d'arrêt sous l'évier (ou au compteur), puis ouvrez le robinet pour le vider.", tip: "Bouchez la bonde avec un chiffon : une petite vis qui tombe dans le siphon, c'est vite arrivé." },
      { title: "Démonter la poignée", text: "Retirez le petit cache coloré avec un tournevis plat, puis dévissez la vis de la poignée (clé Allen pour un mitigeur)." },
      { title: "Sortir la tête ou la cartouche", text: "Avec la clé à molette, dévissez l'écrou et sortez la tête de robinet ou la cartouche. Notez son sens de montage." },
      { title: "Remplacer la pièce", text: "Changez le joint au bout de la tête, ou installez la cartouche neuve de même référence." },
      { title: "Remonter et tester", text: "Remontez dans l'ordre inverse, sans trop serrer. Rouvrez l'eau doucement et vérifiez qu'il n'y a plus de goutte." }
    ],
    troubleshoot: [
      "Ça fuit au pied du robinet : ce sont les joints toriques du bec qu'il faut changer.",
      "Le robinet est entartré : trempez les pièces une heure dans du vinaigre blanc avant de remonter."
    ]
  },
  {
    id: "chasse-eau-coule",
    title: "Chasse d'eau qui coule en permanence",
    category: "maison",
    difficulty: "Facile",
    duration: "30 min",
    minutes: 30,
    savings: "≈ 100 €",
    keywords: ["toilettes", "wc", "chasse d'eau", "fuite", "flotteur", "clapet", "mécanisme"],
    summary: "Une chasse d'eau qui fuit peut perdre jusqu'à 400 litres d'eau par jour. La cause : le flotteur ou le joint du clapet.",
    safety: "Fermez le robinet d'arrivée d'eau des toilettes avant d'intervenir.",
    tools: ["Colorant alimentaire", "Éponge", "Seau"],
    parts: ["Joint de clapet ou mécanisme complet (selon le diagnostic)"],
    sources: [
      { label: "OIEau — volume d'eau perdu par une fuite", url: "https://chiffrecle.oieau.fr/827" }
    ],
    steps: [
      { title: "Confirmer la fuite", text: "Versez quelques gouttes de colorant alimentaire dans le réservoir sans tirer la chasse. Attendez : si la couleur arrive dans la cuvette, le clapet fuit.", timer: 900 },
      { title: "Régler le flotteur", text: "Ouvrez le couvercle du réservoir. Si l'eau coule par le trop-plein (le tube central), baissez le flotteur avec sa vis ou sa bague de réglage." },
      { title: "Vider le réservoir", text: "Fermez le robinet d'arrivée d'eau, tirez la chasse, épongez le fond du réservoir." },
      { title: "Changer le joint du clapet", text: "Tournez le mécanisme d'un quart de tour pour le sortir, retirez le joint plat du bas et remplacez-le par un neuf de même diamètre.", tip: "Un joint un peu entartré se nettoie parfois au vinaigre, mais un neuf coûte quelques euros." },
      { title: "Remonter et tester", text: "Remettez le mécanisme, rouvrez l'eau et vérifiez que le remplissage s'arrête 2 cm sous le haut du trop-plein." }
    ],
    troubleshoot: [
      "Ça coule encore : le mécanisme entier est usé, un modèle universel se change en 20 minutes.",
      "Le réservoir se remplit très lentement : nettoyez le filtre du robinet flotteur."
    ]
  },
  {
    id: "evier-bouche",
    title: "Déboucher un évier",
    category: "maison",
    difficulty: "Facile",
    duration: "30 min",
    minutes: 30,
    savings: "≈ 120 €",
    keywords: ["évier", "lavabo", "bouché", "siphon", "canalisation", "eau stagne", "ventouse"],
    summary: "Ventouse, siphon, et si besoin furet : la méthode dans l'ordre, sans produit agressif.",
    safety: "Mettez des gants. Si vous avez déjà versé un déboucheur chimique, ne démontez rien et ne mélangez aucun autre produit.",
    tools: ["Gants", "Ventouse", "Seau", "Vieille brosse", "Furet (si besoin)"],
    parts: ["Bicarbonate de soude et vinaigre blanc (entretien)"],
    sources: [
      { label: "Le Kit du Plombier — eau bouillante et canalisations", url: "https://lekitduplombier.fr/eau-bouillante-danger-canalisations/" }
    ],
    steps: [
      { title: "Essayer la ventouse", text: "Laissez 5 cm d'eau dans l'évier, bouchez le trop-plein avec un chiffon humide, puis pompez fermement une dizaine de fois avec la ventouse." },
      { title: "Démonter le siphon", text: "Placez le seau dessous et dévissez à la main les deux écrous du siphon (la pièce en U sous l'évier)." },
      { title: "Nettoyer le siphon", text: "Videz et brossez l'intérieur du siphon : c'est là que la graisse et les déchets s'accumulent." },
      { title: "Passer le furet si besoin", text: "Si le bouchon est plus loin, glissez le furet dans le tuyau du mur en tournant la manivelle jusqu'à sentir le bouchon céder." },
      { title: "Remonter et rincer", text: "Revissez le siphon avec ses joints, puis faites couler de l'eau pour vérifier l'étanchéité." },
      { title: "Entretenir", text: "Versez 3 cuillères de bicarbonate puis un verre de vinaigre blanc. Laissez mousser, puis rincez à l'eau chaude du robinet.", timer: 900, tip: "À faire une fois par mois pour éviter que ça recommence.", safety: "Pas d'eau bouillante : les tuyaux en PVC ramollissent dès 60 à 70 °C." }
    ],
    troubleshoot: [
      "Plusieurs évacuations bouchées en même temps : le problème est dans la colonne commune, appelez un professionnel."
    ]
  },
  {
    id: "trou-placo",
    title: "Reboucher un trou dans un mur en placo",
    category: "maison",
    difficulty: "Facile",
    duration: "40 min",
    minutes: 40,
    savings: "≈ 80 €",
    keywords: ["mur", "placo", "plâtre", "trou", "cheville", "enduit", "rebouchage", "cloison"],
    summary: "Cheville arrachée ou coup de poignée de porte ? Un trou dans du placo se rebouche proprement et ne se voit plus.",
    safety: "Vérifiez qu'aucun câble ou tuyau ne passe derrière avant de découper. Portez un masque en ponçant.",
    tools: ["Cutter", "Couteau à enduire", "Cale et papier de verre fin", "Masque anti-poussière"],
    parts: ["Enduit de rebouchage", "Plaque de réparation autocollante (trou de 2 à 8 cm)"],
    sources: [
      { label: "Castorama — réparer un trou dans un mur", url: "https://www.castorama.fr/idees-et-conseils/comment-reparer-un-trou-dans-un-mur/CF_CPRD_npcart_100536.art" },
      { label: "Sauvegarde Junior — reboucher un trou dans du placo selon sa taille", url: "https://www.sauvegardejunior.com/reboucher-trou-placo/" }
    ],
    steps: [
      { title: "Nettoyer les bords", text: "Coupez au cutter les morceaux de carton et de plâtre qui dépassent, pour avoir des bords nets." },
      { title: "Poser une plaque si le trou est grand", text: "Mesurez le trou. Moins de 2 cm : l'enduit seul suffit. De 2 à 8 cm : collez une plaque de réparation autocollante bien centrée par-dessus, sinon l'enduit tombe dans le vide de la cloison.", safety: "Au-delà d'une dizaine de centimètres, il faut découper et remplacer un morceau de plaque : ce n'est plus un simple rebouchage." },
      { title: "Appliquer l'enduit", text: "Chargez le couteau d'enduit et lissez en croix, en débordant de 5 cm autour. Couche fine : mieux vaut deux passes qu'une épaisse." },
      { title: "Laisser sécher et poncer", text: "Laissez sécher le temps indiqué sur le pot, puis poncez légèrement avec la cale (grain 180, puis 240 pour la finition) jusqu'à ne plus sentir de bord au toucher.", tip: "Éclairez le mur de côté avec une lampe : les défauts apparaissent tout de suite." },
      { title: "Finir", text: "Passez une deuxième couche fine si besoin, poncez, dépoussiérez, puis appliquez une sous-couche avant la peinture." }
    ],
    troubleshoot: [
      "L'enduit se fendille : la couche était trop épaisse. Poncez et remettez une couche fine."
    ]
  },

  {
    id: "remplacer-prise-electrique",
    title: "Remplacer une prise électrique",
    category: "maison",
    difficulty: "Moyen",
    duration: "30 min",
    minutes: 30,
    savings: "≈ 90 €",
    popular: true,
    keywords: ["prise", "électricité", "prise murale", "prise cassée", "prise qui chauffe", "220 V", "courant"],
    summary: "Une prise fendue ou qui bouge est dangereuse. La remplacer à l'identique est à la portée de tous, à condition de respecter scrupuleusement la sécurité.",
    safety: "Coupez le disjoncteur du circuit (ou le disjoncteur général) et vérifiez l'absence de tension avant de toucher un fil. Traces noires, odeur de brûlé ou fils abîmés : n'allez pas plus loin et faites appel à un électricien.",
    tools: ["Vérificateur d'absence de tension (VAT) ou multimètre", "Tournevis d'électricien isolé", "Tournevis plat", "Niveau à bulle"],
    parts: ["Prise 2P+T neuve (norme NF), du même type de fixation"],
    sources: [
      { label: "Castorama — comment remplacer une prise électrique", url: "https://www.castorama.fr/idees-et-conseils/comment-remplacer-une-prise-electrique/CF_CPRD_npcart_100234.art" },
      { label: "ELECdirect — remplacer une prise en 6 étapes", url: "https://blog.elecdirect.fr/tutos/remplacer-une-prise-electrique" }
    ],
    steps: [
      { title: "Couper le courant", text: "Au tableau électrique, coupez le disjoncteur qui alimente la prise. Dans le doute, coupez le disjoncteur général.", safety: "Prévenez les personnes de la maison pour que personne ne remette le courant pendant l'intervention." },
      { title: "Vérifier l'absence de tension", text: "Branchez le vérificateur sur la prise (ou mesurez entre les trous au multimètre) : il ne doit détecter aucune tension.", safety: "Un simple tournevis testeur n'est pas fiable : utilisez un vérificateur d'absence de tension." },
      { title: "Démonter l'ancienne prise", text: "Déclipsez la plaque de finition avec le tournevis plat, puis dévissez les vis ou les griffes qui tiennent le mécanisme dans la boîte." },
      { title: "Repérer et débrancher les fils", text: "Photographiez le branchement, puis libérez les fils : phase (rouge, marron ou noir), neutre (bleu) et terre (vert-jaune).", tip: "Si un fil est noirci ou dénudé sur une grande longueur, arrêtez-vous : il faut refaire le raccordement proprement." },
      { title: "Brancher la nouvelle prise", text: "Raccordez chaque fil sur la borne correspondante (L, N et terre) et vérifiez en tirant doucement qu'il est bien serré. Aucune partie cuivrée ne doit dépasser." },
      { title: "Fixer bien droit", text: "Serrez une première vis, mettez la prise de niveau avec le niveau à bulle, puis serrez la seconde et reposez la plaque." },
      { title: "Remettre le courant et tester", text: "Réarmez le disjoncteur et vérifiez la prise en branchant une lampe." }
    ],
    troubleshoot: [
      "Le disjoncteur saute en remettant le courant : coupez immédiatement, un fil touche probablement une autre borne ou la boîte.",
      "La prise chauffe à l'usage : ne l'utilisez plus et faites contrôler l'installation par un électricien."
    ]
  },

  {
    id: "refaire-joint-silicone",
    title: "Refaire un joint silicone de salle de bain",
    category: "maison",
    difficulty: "Facile",
    duration: "1 h + 24 h de séchage",
    minutes: 60,
    savings: "≈ 80 €",
    keywords: ["joint", "silicone", "salle de bain", "douche", "baignoire", "moisissure", "joint noir", "étanchéité", "évier"],
    summary: "Un joint noirci ou décollé laisse passer l'eau derrière la baignoire ou la douche. Le refaire proprement est à la portée de tous.",
    safety: "Aérez la pièce pendant et après l'application. Utilisez la lame du cutter avec précaution, en coupant toujours vers l'extérieur.",
    tools: ["Cutter ou coupe-joint", "Grattoir en plastique", "Ruban de masquage", "Pistolet à silicone", "Lisseur à joint (ou le doigt)", "Chiffons"],
    parts: ["Cartouche de silicone sanitaire (anti-moisissures)", "Alcool ménager", "Eau savonneuse"],
    sources: [
      { label: "Sika — comment refaire un joint de salle de bain", url: "https://fra.sika.com/fr/bricolage/conseils-astuces/conseil-joints.html" },
      { label: "Travaux.com — refaire les joints de salle de bain", url: "https://www.travaux.com/sols-carrelage/articles/refaire-les-joints-de-salle-de-bains" }
    ],
    steps: [
      { title: "Retirer l'ancien joint", text: "Incisez l'ancien silicone le long de ses deux bords au cutter, puis tirez-le pour l'enlever en longues bandes." },
      { title: "Éliminer les résidus", text: "Grattez les restes avec le grattoir en plastique, sans rayer l'émail ni le carrelage." },
      { title: "Dégraisser et sécher", text: "Nettoyez à l'alcool ménager et laissez sécher complètement : le silicone n'adhère pas sur un support humide ou gras.", tip: "Idéalement, n'utilisez pas la douche la veille pour que tout soit bien sec." },
      { title: "Poser le ruban de masquage", text: "Collez un ruban de chaque côté du joint à refaire, en laissant l'espace à remplir entre les deux." },
      { title: "Appliquer le silicone", text: "Coupez la buse en biseau à la largeur du joint et déposez un cordon régulier, d'un seul geste continu." },
      { title: "Lisser", text: "Lissez aussitôt avec le lisseur ou le doigt trempé dans l'eau savonneuse, d'un geste continu." },
      { title: "Retirer le ruban et laisser sécher", text: "Retirez le ruban immédiatement, avant que le silicone ne sèche, puis attendez 24 heures avant de mouiller le joint." }
    ],
    troubleshoot: [
      "Le joint se décolle : le support n'était pas assez sec ou dégraissé, recommencez après un nettoyage à l'alcool.",
      "Il noircit vite : aérez mieux la pièce après chaque douche et choisissez un silicone sanitaire anti-moisissures."
    ]
  },
  {
    id: "changer-flexible-douche",
    title: "Changer un flexible de douche",
    category: "maison",
    difficulty: "Facile",
    duration: "10 min",
    minutes: 10,
    savings: "≈ 60 €",
    keywords: ["douche", "flexible", "fuite", "pommeau", "douchette", "tuyau de douche", "raccord", "joint"],
    summary: "Un flexible qui fuit ou se perce se change en dix minutes, sans outil ou presque : le raccord est standard.",
    safety: "Fermez le robinet de la douche avant de commencer. Pas de pince sur les raccords chromés sans chiffon de protection.",
    tools: ["Clé à molette (au cas où)", "Chiffon"],
    parts: ["Flexible de douche au raccord standard 1/2 pouce (15/21), livré avec ses joints"],
    sources: [
      { label: "OBI — changer un flexible de douche en 5 étapes", url: "https://www.obi.ch/fr/magazine/habitat/salle-de-bains/changer-un-flexible-de-douche" },
      { label: "Guide plomberie — changer un flexible de douche", url: "https://www.guide-plomberie.fr/plomberie/changer-un-flexible-de-douche/" }
    ],
    steps: [
      { title: "Fermer le robinet", text: "Fermez bien le mitigeur ou le robinet de la douche." },
      { title: "Dévisser l'ancien flexible", text: "Dévissez à la main l'écrou côté robinet, puis celui côté douchette. Si c'est trop serré, utilisez la clé à molette en protégeant l'écrou avec un chiffon." },
      { title: "Vérifier les joints", text: "Assurez-vous que chaque extrémité du nouveau flexible a son joint, bien à plat au fond de l'écrou.", tip: "Si un vieux joint est resté collé dans le robinet ou la douchette, retirez-le." },
      { title: "Visser le nouveau flexible", text: "Vissez l'extrémité à écrou hexagonal sur le robinet et l'extrémité conique sur la douchette, à la main, sans forcer, pour ne pas écraser les joints." },
      { title: "Tester", text: "Ouvrez l'eau et vérifiez les deux raccords. S'il y a une goutte, serrez d'un petit quart de tour à la clé, avec le chiffon." }
    ],
    troubleshoot: [
      "Ça fuit toujours au raccord : démontez, vérifiez que le joint est bien à plat et en bon état, puis revissez.",
      "Faible débit : détartrez la douchette en la trempant quelques heures dans du vinaigre blanc."
    ]
  },

  /* ================= VÉLO, MOTO & MOBILITÉ ================= */
  {
    id: "gonfler-pneu-velo",
    title: "Gonfler un pneu de vélo à la bonne pression",
    category: "velo",
    difficulty: "Facile",
    duration: "5 min",
    minutes: 5,
    savings: "≈ 10 €",
    keywords: ["pneu", "gonfler", "pression", "valve", "presta", "schrader", "pompe", "dégonflé", "bar", "psi", "vélo", "roue"],
    summary: "Un pneu trop peu gonflé crève plus facilement et s'use vite. La bonne pression est écrite sur le flanc du pneu : il suffit d'une pompe avec manomètre.",
    safety: "Ne dépassez jamais la pression maximale gravée sur le flanc du pneu.",
    tools: ["Pompe à pied avec manomètre"],
    parts: [],
    sources: [
      { label: "Decathlon — comment bien gonfler un pneu de vélo", url: "https://conseilsport.decathlon.fr/comment-bien-gonfler-un-pneu-de-velo" }
    ],
    steps: [
      { title: "Lire la pression", text: "Cherchez sur le flanc du pneu la fourchette de pression, par exemple « Min 4.0 – Max 6.0 bar ». Plus vous êtes lourd ou chargé, plus il faut viser le haut de la fourchette.", tip: "Repères moyens : 3,5 à 5 bars pour un vélo de ville, 6 à 7,5 bars pour un vélo de route." },
      { title: "Préparer la valve", text: "Retirez le bouchon. Valve fine (Presta) : dévissez de quelques millimètres la petite molette au sommet et appuyez brièvement dessus jusqu'au « pfff ». Valve large (Schrader, comme sur une voiture) : rien d'autre à faire." },
      { title: "Brancher la pompe", text: "Enfoncez l'embout bien droit sur la valve, perpendiculaire à la jante, puis verrouillez le levier." },
      { title: "Gonfler", text: "Pompez régulièrement en surveillant le manomètre jusqu'à la pression visée." },
      { title: "Retirer et refermer", text: "Déverrouillez le levier et retirez l'embout d'un coup sec, dans l'axe de la valve. Sur une valve Presta, revissez la molette à la main. Remettez le bouchon.", tip: "Un petit « pschit » en retirant l'embout est normal : la pression ne change pas." }
    ],
    troubleshoot: [
      "Contrôlez la pression au moins une fois par mois : une chambre à air laisse toujours filer un peu d'air.",
      "Le pneu est à plat en 24 à 48 heures : c'est une petite crevaison, voir la fiche « Réparer une crevaison »."
    ]
  },
  {
    id: "crevaison-velo",
    title: "Réparer une crevaison de vélo",
    category: "velo",
    difficulty: "Facile",
    duration: "20 min",
    minutes: 20,
    savings: "≈ 15 €",
    keywords: ["vélo", "crevaison", "chambre à air", "rustine", "pneu", "roue"],
    summary: "Le geste de base de tout cycliste : démonter, trouver le trou, rustiner.",
    safety: "Pas de danger particulier : prévoyez juste un chiffon, les mains vont noircir.",
    tools: ["2 démonte-pneus", "Pompe", "Bassine d'eau (facultatif)"],
    parts: ["Kit de rustines avec dissolution"],
    sources: [
      { label: "Decathlon — poser une rustine", url: "https://conseilsport.decathlon.fr/comment-poser-une-rustine" },
      { label: "Wikilivres — réparer une chambre à air", url: "https://fr.wikibooks.org/wiki/M%C3%A9canique_v%C3%A9lo/R%C3%A9parer_une_chambre_%C3%A0_air" }
    ],
    steps: [
      { title: "Démonter la roue", text: "Ouvrez le frein si besoin, desserrez le blocage rapide ou les écrous et sortez la roue.", tip: "Pour la roue arrière, passez sur le plus petit pignon avant de la démonter : ce sera plus simple à remonter." },
      { title: "Sortir la chambre à air", text: "Glissez un démonte-pneu sous le pneu, accrochez-le à un rayon, puis le deuxième 10 cm plus loin et faites le tour. Retirez la chambre." },
      { title: "Trouver le trou", text: "Gonflez un peu la chambre et écoutez, ou plongez-la dans l'eau : le trou fait des bulles. Marquez-le au stylo." },
      { title: "Préparer et encoller", text: "Poncez autour du trou avec le papier du kit, étalez une fine couche de dissolution plus large que la rustine, et attendez qu'elle devienne mate.", timer: 300, tip: "La dissolution ne doit plus briller (environ 5 minutes) : c'est le secret d'une rustine qui tient." },
      { title: "Poser la rustine", text: "Retirez le film de la rustine sans toucher la face collante et pressez-la fort pendant une minute, en insistant sur les bords." },
      { title: "Vérifier le pneu", text: "Passez doucement les doigts à l'intérieur du pneu pour trouver l'épine ou le morceau de verre responsable, et retirez-le.", safety: "Allez-y délicatement : un éclat de verre peut couper." },
      { title: "Remonter et gonfler", text: "Remettez la chambre légèrement gonflée, rentrez le pneu à la main, gonflez à la pression écrite sur le flanc du pneu, puis remontez la roue." }
    ],
    troubleshoot: [
      "Crevaison à nouveau le lendemain : l'objet est resté dans le pneu, ou le fond de jante est abîmé.",
      "Deux petits trous côte à côte : pincement en roulant sous-gonflé, gonflez plus."
    ]
  },
  {
    id: "regler-freins-velo",
    title: "Régler les freins d'un vélo",
    category: "velo",
    difficulty: "Facile",
    duration: "20 min",
    minutes: 20,
    savings: "≈ 25 €",
    keywords: ["vélo", "frein", "patin", "câble", "v-brake", "levier", "freine mal"],
    summary: "Levier qui touche le guidon, patins qui frottent ? Un réglage simple suffit sur les freins à patins.",
    safety: "Testez toujours le freinage à l'arrêt puis à basse vitesse avant de reprendre la route.",
    tools: ["Clés Allen (4 et 5 mm)", "Clé plate de 10"],
    parts: ["Patins neufs (s'ils sont usés jusqu'aux rainures)"],
    sources: [
      { label: "Wiklou — régler des freins V-brake", url: "https://wiklou.org/wiki/R%C3%A9gler_des_freins_v-brake" },
      { label: "Decathlon — régler ses freins de vélo", url: "https://conseilsport.decathlon.fr/comment-regler-ses-freins-de-velo" }
    ],
    steps: [
      { title: "Contrôler les patins", text: "Regardez les rainures des patins : s'il n'y en a plus, remplacez-les. Retirez les petits cailloux incrustés." },
      { title: "Tendre avec la molette", text: "Tournez la molette de réglage au niveau du levier (dans le sens inverse des aiguilles d'une montre) pour tendre le câble. Le levier doit freiner à mi-course." },
      { title: "Retendre le câble si besoin", text: "Si la molette ne suffit pas, desserrez la vis qui pince le câble sur le frein, tirez le câble de quelques millimètres et resserrez." },
      { title: "Aligner les patins", text: "Desserrez le patin, placez-le bien à plat sur la jante (jamais sur le pneu ni sous la jante) et resserrez en tenant le levier serré. Il doit rester 1 à 2 mm entre patin et jante de chaque côté." },
      { title: "Centrer le frein", text: "Si un patin frotte, tournez la petite vis de rappel sur le côté du frein d'un quart de tour pour rééquilibrer." }
    ],
    troubleshoot: [
      "Le frein grince : nettoyez la jante à l'alcool et vérifiez que l'avant du patin touche un poil avant l'arrière.",
      "Freins à disque : le réglage est différent, consultez un guide dédié."
    ]
  },
  {
    id: "entretien-chaine-velo",
    title: "Nettoyer et graisser une chaîne de vélo",
    category: "velo",
    difficulty: "Facile",
    duration: "20 min",
    minutes: 20,
    savings: "≈ 30 €",
    keywords: ["vélo", "chaîne", "graisser", "huile", "dérailleur", "grince", "saute"],
    summary: "Une chaîne propre et huilée, c'est un vélo silencieux et une transmission qui dure deux fois plus longtemps.",
    safety: "Gardez les doigts loin des pignons quand vous faites tourner le pédalier.",
    tools: ["Chiffons", "Vieille brosse à dents", "Journal (sous le vélo)"],
    parts: ["Dégraissant", "Lubrifiant pour chaîne de vélo"],
    sources: [
      { label: "Decathlon — nettoyer et lubrifier sa chaîne", url: "https://conseilsport.decathlon.fr/chaine-de-velo-comment-bien-la-nettoyer-et-lubrifier" }
    ],
    steps: [
      { title: "Protéger le sol", text: "Posez le vélo contre un mur ou sur un pied, avec un journal sous la transmission." },
      { title: "Dégraisser", text: "Appliquez le dégraissant sur la chaîne en tournant le pédalier à l'envers, puis frottez avec la brosse, aussi sur les pignons." },
      { title: "Essuyer", text: "Pincez la chaîne dans un chiffon sec et faites tourner le pédalier jusqu'à ce que le chiffon reste propre." },
      { title: "Laisser sécher", text: "La chaîne doit être sèche avant d'être huilée.", timer: 300 },
      { title: "Huiler chaque maillon", text: "Déposez une goutte de lubrifiant sur chaque rouleau de la chaîne, en tournant doucement le pédalier.", tip: "Commencez au niveau du maillon rapide (plus brillant) pour savoir quand vous avez fait le tour." },
      { title: "Retirer l'excès", text: "Attendez quelques minutes, puis essuyez l'extérieur de la chaîne : le lubrifiant doit être dedans, pas dessus.", timer: 180 }
    ],
    troubleshoot: [
      "La chaîne saute sous l'effort : elle est peut-être usée (mesurez-la avec un contrôleur d'usure) ou le dérailleur est à régler."
    ]
  },

  {
    id: "regler-derailleur-arriere",
    title: "Régler le dérailleur arrière d'un vélo",
    category: "velo",
    difficulty: "Moyen",
    duration: "30 min",
    minutes: 30,
    savings: "≈ 25 €",
    keywords: ["vélo", "dérailleur", "vitesses", "chaîne saute", "passe mal", "indexation", "câble", "butée"],
    summary: "Les vitesses passent mal ou la chaîne saute ? Un dérailleur se règle en suivant toujours le même ordre : butées, câble, puis écartement.",
    safety: "Faites les réglages vélo sur un pied ou retourné, roue arrière libre, et gardez les doigts loin des pignons quand vous pédalez à la main.",
    tools: ["Tournevis cruciforme", "Clé Allen de 5 mm", "Pied d'atelier (ou un vélo retourné)"],
    parts: [],
    sources: [
      { label: "Decathlon — réglage de votre dérailleur arrière", url: "https://conseilsport.decathlon.fr/reglage-de-votre-derailleur-arriere-on-vous-explique" },
      { label: "La Boîte à Cycle — réglage d'un dérailleur arrière Shimano", url: "https://laboiteacycle.com/blog/entretien-velo-maison/reglage-derailleur-arriere-shimano" }
    ],
    steps: [
      { title: "Vérifier la patte", text: "Regardez le dérailleur de derrière : il doit pendre bien droit, dans l'axe des pignons. Une patte tordue (après une chute) empêche tout réglage et doit être redressée par un vélociste." },
      { title: "Régler la butée H", text: "Passez sur le plus petit pignon. Tournez la vis marquée H jusqu'à ce que le galet du haut soit parfaitement aligné sous ce pignon." },
      { title: "Régler la butée L", text: "Passez doucement sur le plus grand pignon. Réglez la vis L pour que la chaîne y monte bien, sans jamais pouvoir passer au-delà vers les rayons.", safety: "Une butée L mal réglée peut envoyer la chaîne dans les rayons et détruire la roue." },
      { title: "Régler la tension du câble", text: "Revenez sur le petit pignon, puis passez une vitesse. Si la chaîne hésite à monter, dévissez la molette de réglage d'un demi-tour ; si elle monte de deux pignons, vissez-la. Répétez vitesse après vitesse.", tip: "Travaillez par demi-tours et testez à chaque fois : c'est un réglage de précision." },
      { title: "Régler l'écartement", text: "Sur le grand pignon, réglez la vis B pour laisser environ 5 à 6 mm entre le galet du haut et les dents du pignon." },
      { title: "Tester toute la cassette", text: "Passez toutes les vitesses en montant puis en descendant : le passage doit être net, sans bruit de frottement." }
    ],
    troubleshoot: [
      "Impossible d'obtenir un passage net : le câble ou sa gaine sont peut-être usés ou encrassés, remplacez-les.",
      "La chaîne saute sous l'effort malgré un bon réglage : la chaîne ou les pignons sont usés."
    ]
  },

  /* ================= JARDIN & EXTÉRIEUR ================= */
  {
    id: "fil-coupe-bordure",
    title: "Recharger le fil d'un coupe-bordure",
    category: "jardin",
    difficulty: "Facile",
    duration: "15 min",
    minutes: 15,
    savings: "≈ 15 €",
    keywords: ["coupe-bordure", "débroussailleuse", "rotofil", "fil", "nylon", "bobine", "recharger", "casse", "tête de coupe"],
    summary: "Plus de fil sur la bobine ? La recharger soi-même coûte bien moins cher qu'une bobine neuve, à condition de respecter le sens d'enroulement.",
    safety: "Appareil éteint et moteur complètement arrêté : débranchez-le du secteur ou retirez sa batterie avant d'ouvrir la tête de coupe.",
    tools: ["Gants", "Ciseaux ou pince coupante"],
    parts: ["Fil nylon du diamètre indiqué dans la notice"],
    sources: [
      { label: "Stihl — enrouler le fil de coupe", url: "https://www.stihl.fr/fr/conseils-tutoriels/entretien-outils-motorises/conseils-debroussailleuse/enrouler-le-fil-de-coupe" },
      { label: "Maintenir son jardin — changer le fil d'un coupe-bordures", url: "https://maintenirsonjardin.fr/changer-le-fil-dun-coupe-bordures/" },
      { label: "Outillage de Pro — changer le fil d'un coupe-bordure", url: "https://outillage-de-pro.com/comment-changer-le-fil-dun-coupe-bordure/" },
      { label: "Coupe-bordure.com — recharger ou remplacer la bobine", url: "https://www.coupe-bordure.com/comment-changer-fil-coupe-bordure/" }
    ],
    steps: [
      { title: "Mettre en sécurité", text: "Éteignez l'appareil et attendez l'arrêt complet. Débranchez-le ou retirez la batterie." },
      { title: "Ouvrir la tête", text: "Retournez l'appareil, déverrouillez le capot de la tête de coupe dans le sens indiqué dessus et sortez la bobine." },
      { title: "Préparer le fil", text: "Coupez la longueur de fil indiquée dans la notice. Pour une bobine à deux fils, pliez-le en deux et accrochez le milieu dans l'encoche ou les trous prévus sur la bobine." },
      { title: "Enrouler", text: "Enroulez bien serré, spires côte à côte sans chevauchement, dans le sens des flèches gravées sur la bobine. Sans flèche : dans le sens inverse de la rotation de la tête.", safety: "Un fil enroulé à l'envers ou en vrac ne sortira pas pendant la coupe." },
      { title: "Bloquer les extrémités", text: "Coincez les bouts du fil dans les encoches de retenue de la bobine pour qu'il ne se déroule pas." },
      { title: "Remonter", text: "Remettez la bobine, faites passer les bouts par les trous de la tête, replacez le capot jusqu'au clic, puis tirez légèrement sur le fil pour vérifier qu'il tient.", tip: "Laissez tremper la bobine 24 heures dans l'eau avant usage : le fil devient plus souple et casse moins." }
    ],
    troubleshoot: [
      "Le fil casse souvent : diamètre inadapté ou chocs contre les murs et les pierres. Plus l'herbe est haute, plus le fil doit être épais, dans la limite indiquée par la notice.",
      "Pressé ? La plupart des marques vendent des bobines déjà garnies, qui se remplacent en une minute."
    ]
  },
  {
    id: "tondeuse-ne-demarre-pas",
    title: "Tondeuse thermique qui ne démarre pas",
    category: "jardin",
    difficulty: "Moyen",
    duration: "40 min",
    minutes: 40,
    savings: "≈ 60 €",
    keywords: ["tondeuse", "démarrage", "bougie", "essence", "moteur", "gazon", "pelouse"],
    summary: "Après l'hiver, bougie encrassée et essence vieillie sont les suspects habituels.",
    safety: "Mettez des gants et débranchez le capuchon de bougie avant de toucher à la lame. Faites le plein moteur froid, jamais près d'une flamme.",
    tools: ["Gants", "Clé à bougie", "Brosse métallique", "Tournevis", "Jerrican de récupération"],
    parts: ["Bougie neuve", "Filtre à air", "Essence fraîche"],
    sources: [
      { label: "Husqvarna — examiner et remplacer une bougie", url: "https://www.husqvarna.com/fr/assistance/husqvarna-self-service/comment-examiner-et-remplacer-une-bougie-sur-une-tondeuse-autoportee-ka-70091/" },
      { label: "OOGarden — changer la bougie de sa tondeuse", url: "https://www.oogarden.com/editorial-1383-changer-bougie-tondeuse.html" }
    ],
    steps: [
      { title: "Sécuriser", text: "Débranchez le capuchon de la bougie : la tondeuse ne peut plus démarrer par accident." },
      { title: "Remplacer l'essence", text: "Si l'essence a plus de 30 jours, videz le réservoir dans un jerrican et remplissez avec de l'essence fraîche.", tip: "L'essence vieillit et bouche le carburateur : c'est la cause n°1 des pannes de printemps." },
      { title: "Contrôler la bougie", text: "Dévissez la bougie avec la clé à bougie. Noire ou humide : brossez-la ou, mieux, remplacez-la. Revissez à la main jusqu'au contact, puis serrez d'environ un quart de tour à la clé (voir la notice)." },
      { title: "Nettoyer le filtre à air", text: "Ouvrez le boîtier du filtre. Tapotez un filtre papier ou lavez un filtre mousse ; remplacez-le s'il est très encrassé." },
      { title: "Démarrer", text: "Rebranchez le capuchon, appuyez 3 fois sur la poire d'amorçage si la tondeuse en a une, puis tirez le lanceur d'un geste franc." }
    ],
    troubleshoot: [
      "Démarre puis cale : le carburateur est encrassé, un nettoyage au spray nettoyant carburateur aide souvent.",
      "Le lanceur est bloqué : une touffe d'herbe coince peut-être la lame, vérifiez (bougie débranchée !)."
    ]
  },
  {
    id: "affuter-secateur",
    title: "Nettoyer et affûter un sécateur",
    category: "jardin",
    difficulty: "Facile",
    duration: "20 min",
    minutes: 20,
    savings: "≈ 30 €",
    keywords: ["sécateur", "affûter", "aiguiser", "lame", "taille", "jardinage", "outil"],
    summary: "Un sécateur qui mâche les branches blesse les plantes. Nettoyé et affûté, il coupe net comme au premier jour.",
    safety: "Mettez des gants épais : une lame affûtée coupe. Affûtez toujours en éloignant la lame de vous.",
    tools: ["Gants épais", "Pierre à affûter ou lime diamant", "Clé plate ou tournevis", "Éponge grattante"],
    parts: ["Huile légère (type huile de machine)"],
    sources: [
      { label: "Ma passion du verger — affûtage du sécateur", url: "https://mapassionduverger.fr/taille-et-forme-fruitiere/laffutage-et-lentretien-du-secateur/" }
    ],
    steps: [
      { title: "Nettoyer les lames", text: "Frottez la sève et la rouille avec l'éponge grattante et un peu d'eau savonneuse, puis séchez bien." },
      { title: "Repérer le biseau", text: "Seule la lame coupante a un biseau (le côté en pente). C'est uniquement lui qu'on affûte, jamais la contre-lame plate." },
      { title: "Affûter", text: "Posez la pierre à plat sur le biseau en gardant le même angle, et poussez de la base vers la pointe une dizaine de fois.", tip: "Coloriez le biseau au feutre : quand toute l'encre est partie, l'angle est bon." },
      { title: "Ébavurer", text: "Passez une ou deux fois la pierre bien à plat sur la face opposée pour retirer le petit morfil." },
      { title: "Huiler et tester", text: "Mettez une goutte d'huile sur l'axe et le ressort, ouvrez-fermez plusieurs fois, et testez sur une feuille de papier." }
    ],
    troubleshoot: [
      "Les lames ne se croisent plus bien : resserrez légèrement l'écrou de l'axe."
    ]
  },
  {
    id: "tuyau-arrosage-perce",
    title: "Réparer un tuyau d'arrosage percé",
    category: "jardin",
    difficulty: "Facile",
    duration: "10 min",
    minutes: 10,
    savings: "≈ 25 €",
    keywords: ["tuyau", "arrosage", "fuite", "percé", "raccord", "jardin"],
    summary: "Un trou dans le tuyau ne justifie pas d'en racheter un : un raccord réparateur coûte trois fois rien.",
    safety: "Fermez le robinet et videz la pression avant de couper.",
    tools: ["Cutter ou sécateur", "Mètre"],
    parts: ["Raccord réparateur au diamètre du tuyau (12,5, 15 ou 19 mm selon le tuyau)"],
    sources: [
      { label: "Atoutloisir — réparer un tuyau d'arrosage", url: "https://www.atoutloisir.com/blog/reparer-tuyau-arrosage/" },
      { label: "Hozelock — raccord réparateur de tuyau (12,5, 15 et 19 mm)", url: "https://www.hozelock.fr/produit/raccord-reparateur-de-tuyau/" },
      { label: "Atoutloisir — assouplir un tuyau à l'eau chaude", url: "https://www.atoutloisir.com/blog/comment-raccorder-tuyau-darrosage-robinet-sans-fuite/" }
    ],
    steps: [
      { title: "Repérer la fuite", text: "Ouvrez l'eau, repérez le trou, marquez-le, puis fermez le robinet." },
      { title: "Couper la partie abîmée", text: "Coupez le tuyau net et bien droit de part et d'autre du trou, pour retirer toute la partie abîmée ou fissurée." },
      { title: "Monter le raccord", text: "Dévissez les bagues du raccord, enfilez-les sur chaque bout de tuyau, puis enfoncez le raccord à fond et revissez fermement les bagues.", tip: "Tuyau trop rigide ? Trempez le bout 2 à 3 minutes dans de l'eau chaude (pas bouillante) : il s'enfilera beaucoup plus facilement." },
      { title: "Tester", text: "Vérifiez que tout est bien serré, puis rouvrez l'eau progressivement et contrôlez qu'aucune goutte ne perle au raccord." }
    ],
    troubleshoot: [
      "Ça fuit au raccord : la coupe n'est pas droite ou la bague n'est pas assez serrée."
    ]
  },

  {
    id: "affuter-lame-tondeuse",
    title: "Affûter la lame d'une tondeuse",
    category: "jardin",
    difficulty: "Moyen",
    duration: "45 min",
    minutes: 45,
    savings: "≈ 30 €",
    keywords: ["tondeuse", "lame", "affûter", "aiguiser", "herbe arrachée", "pelouse", "gazon", "jardin"],
    summary: "Une lame émoussée arrache l'herbe au lieu de la couper : la pelouse jaunit. Une lame affûtée et équilibrée coupe net et ménage le moteur.",
    safety: "Débranchez le capuchon de bougie (tondeuse thermique) ou retirez la batterie et débranchez la prise (électrique). Portez des gants épais : même émoussée, la lame coupe.",
    tools: ["Gants épais", "Clé à douille adaptée au boulon de lame", "Cale en bois", "Lime plate ou meule", "Étau", "Tournevis (pour l'équilibrage)", "Feutre"],
    parts: [],
    sources: [
      { label: "Stihl — aiguiser une lame de tondeuse à gazon", url: "https://www.stihl.fr/fr/conseils-tutoriels/entretien-outils-motorises/conseils-tondeuse-gazon/affuter-lame-tondeuse" },
      { label: "Webmotoculture — affûter une lame de tondeuse", url: "https://www.webmotoculture.com/guides/71-comment-affuter-une-lame-de-tondeuse" }
    ],
    steps: [
      { title: "Mettre la tondeuse en sécurité", text: "Débranchez le capuchon de bougie ou la batterie, puis basculez la tondeuse sur le côté comme indiqué dans la notice.", safety: "Sur une tondeuse thermique, basculez-la en général bougie vers le haut, pour éviter que l'huile et l'essence coulent dans le filtre à air." },
      { title: "Démonter la lame", text: "Bloquez la lame avec une cale en bois contre le carter, puis desserrez le boulon central avec la clé.", tip: "Marquez au feutre la face qui regarde le sol : la lame doit être remontée dans le même sens." },
      { title: "Affûter", text: "Serrez la lame dans l'étau et limez chaque tranchant en respectant l'angle d'origine (environ 30°), en poussant la lime vers le tranchant. Faites le même nombre de passes de chaque côté." },
      { title: "Équilibrer", text: "Posez la lame à plat sur un tournevis passé dans son trou central. Si un côté penche, retirez un peu de métal de ce côté à la lime, jusqu'à ce qu'elle reste horizontale.", safety: "Une lame déséquilibrée fait vibrer la tondeuse et fatigue le moteur." },
      { title: "Remonter", text: "Remettez la lame dans le bon sens, serrez fermement le boulon (au couple indiqué dans la notice), puis rebranchez la bougie ou la batterie." }
    ],
    troubleshoot: [
      "La tondeuse vibre : la lame est mal équilibrée ou tordue. Une lame tordue se remplace, elle ne se redresse pas.",
      "La lame a des éclats profonds : remplacez-la par une lame d'origine."
    ]
  },

  /* ================= LOISIRS & SPORT ================= */
  {
    id: "matelas-gonflable-perce",
    title: "Réparer un matelas gonflable percé",
    category: "loisirs",
    difficulty: "Facile",
    duration: "20 min + 3 h de séchage",
    minutes: 20,
    savings: "≈ 30 €",
    keywords: ["matelas gonflable", "gonflable", "fuite", "percé", "trou", "dégonfle", "rustine", "patch", "camping", "piscine", "bouée"],
    summary: "Un matelas qui se dégonfle pendant la nuit a souvent un petit trou. On le trouve avec de l'eau savonneuse et on le bouche avec une rustine.",
    safety: "Fuite au niveau de la valve ou d'une soudure : ne collez rien, contactez le vendeur ou le fabricant, surtout s'il est encore sous garantie.",
    tools: ["Eau savonneuse (savon doux)", "Éponge ou vaporisateur", "Stylo", "Chiffon propre"],
    parts: ["Kit de réparation pour vinyle (rustines et colle)"],
    sources: [
      { label: "Intex — réparer une fuite sur un matelas gonflable", url: "https://www.intex.fr/conseils/matelas/25-comment-reparer-une-fuite-sur-mon-matelas-gonflable-" },
      { label: "Decathlon — réparer un matelas gonflable ou autogonflant", url: "https://conseilsport.decathlon.fr/comment-entretenir-et-reparer-un-matelas-gonflable-ou-autogonflant" }
    ],
    steps: [
      { title: "Chercher la fuite", text: "Gonflez le matelas au maximum et passez de l'eau savonneuse sur la surface : des bulles se forment à l'endroit du trou. On peut aussi passer la main lentement pour sentir le souffle.", tip: "Prenez un savon doux : un produit agressif peut tacher le matelas." },
      { title: "Marquer le trou", text: "Séchez la zone et entourez le trou au stylo pour ne pas le perdre." },
      { title: "Dégonfler et préparer", text: "Dégonflez complètement le matelas. La zone doit être propre, sèche et dégraissée." },
      { title: "Coller la rustine", text: "Mettez la colle sur la rustine, attendez quelques secondes qu'elle commence à blanchir, puis posez-la sur le trou et appuyez uniformément 1 à 2 minutes.", timer: 120 },
      { title: "Laisser sécher", text: "Attendez 3 heures avant de regonfler.", timer: 10800 },
      { title: "Vérifier", text: "Regonflez et refaites le test de l'eau savonneuse : plus de bulles, c'est réparé." }
    ],
    troubleshoot: [
      "Pour éviter une nouvelle fuite : pas de bagues, bijoux ou objets pointus sur le matelas."
    ]
  },
  {
    id: "reinitialiser-manette-ps5",
    title: "Réinitialiser une manette PS5 qui ne répond plus",
    category: "loisirs",
    difficulty: "Facile",
    duration: "5 min",
    minutes: 5,
    savings: "≈ 70 €",
    keywords: ["manette", "dualsense", "ps5", "playstation", "ne répond plus", "déconnexion", "se déconnecte", "appairage", "bluetooth", "reset", "réinitialiser", "bug"],
    summary: "Manette qui se déconnecte, ne s'appaire plus ou ne répond plus ? Avant de la remplacer, une réinitialisation par le petit bouton au dos règle souvent le problème.",
    safety: "Utilisez une épingle ou un trombone fin, sans forcer : le bouton se trouve au fond d'un petit orifice.",
    tools: ["Épingle ou trombone déplié", "Câble USB fourni avec la manette"],
    parts: [],
    sources: [
      { label: "PlayStation — résoudre les problèmes de manette DualSense", url: "https://www.playstation.com/fr-fr/support/hardware/troubleshoot-dualsense/" }
    ],
    steps: [
      { title: "Éteindre la console", text: "Éteignez complètement votre PS5, puis débranchez la manette du câble USB." },
      { title: "Trouver le bouton", text: "Retournez la manette : le bouton de réinitialisation est au fond du petit orifice situé à côté du logo Sony." },
      { title: "Réinitialiser", text: "Enfoncez l'épingle et maintenez le bouton appuyé pendant au moins 5 secondes." },
      { title: "Reconnecter", text: "Rallumez la console, branchez la manette avec le câble USB fourni, puis appuyez sur la touche PS.", tip: "Utilisez de préférence le câble d'origine : certains câbles ne font que charger, sans transmettre de données." },
      { title: "Tester", text: "Vérifiez que la manette répond dans les menus, puis débranchez le câble pour jouer sans fil." }
    ],
    troubleshoot: [
      "Toujours des soucis : installez la dernière version du logiciel système de la PS5, puis consultez la page d'assistance PlayStation pour les problèmes de touches ou de joystick.",
      "Le personnage avance tout seul : c'est plutôt un « drift » du joystick, voir la fiche dédiée."
    ]
  },
  {
    id: "depoussierer-ps5",
    title: "Dépoussiérer une PS5 qui chauffe ou souffle fort",
    category: "loisirs",
    difficulty: "Facile",
    duration: "20 min",
    minutes: 20,
    savings: "≈ 40 €",
    keywords: ["ps5", "playstation", "console", "poussière", "ventilateur", "bruit", "souffle", "chauffe", "surchauffe", "nettoyer", "dépoussiérer"],
    summary: "La poussière bouche les aérations et fait chauffer la console. La PS5 d'origine a des attrape-poussière prévus pour être aspirés, sans rien dévisser à l'intérieur.",
    safety: "Console complètement éteinte (pas en mode repos) et tous les câbles débranchés. Touchez un objet métallique avant de commencer pour évacuer l'électricité statique.",
    tools: ["Aspirateur avec un embout fin", "Pinceau souple", "Chiffon doux et sec", "Pièce de monnaie ou tournevis plat (vis du socle)"],
    parts: [],
    sources: [
      { label: "iFixit — nettoyer la poussière d'une PlayStation 5 sans l'ouvrir", url: "https://www.ifixit.com/Guide/How+to+Clean+Dust+Out+of+a+Playstation+5+Without+Opening+It/141735" },
      { label: "We Are PlayStation — comment dépoussiérer sa PS5", url: "https://www.weareplaystation.fr/communautes/playstation-5/actualites-communaute/console-playstation-5-comment-depoussierer-sa-ps5" }
    ],
    steps: [
      { title: "Éteindre et débrancher", text: "Éteignez complètement la console et débranchez tous les câbles. Posez-la sur une surface propre et douce." },
      { title: "Retirer le socle", text: "Console debout : retournez-la, dévissez la vis du socle avec une pièce ou un tournevis plat et soulevez le socle. Console couchée : soulevez simplement le socle.", tip: "Rangez la vis dans le petit logement prévu sous le socle pour ne pas la perdre." },
      { title: "Retirer la façade", text: "Posez la console, logo PlayStation vers le haut. Soulevez le coin de la façade blanche près du logo, puis faites-la glisser vers le bas de la console.", safety: "Ne forcez pas : si elle résiste, soulevez un peu plus le coin avant de la faire glisser. Sur une PS5 « Slim », la façade s'enlève autrement : suivez sa notice." },
      { title: "Aspirer les attrape-poussière", text: "Deux orifices apparaissent sous la façade : ce sont les attrape-poussière. Aspirez-les avec l'embout fin, à faible puissance si possible." },
      { title: "Dépoussiérer les grilles", text: "Passez le pinceau sur les grilles d'aération, puis essuyez la coque avec le chiffon sec.", safety: "Aucun produit liquide ni chimique sur la console." },
      { title: "Remonter", text: "Replacez la façade en la faisant glisser jusqu'au clic, puis remettez le socle. Rebranchez et allumez." }
    ],
    troubleshoot: [
      "Toujours bruyante ou chaude : sortez-la d'un meuble fermé et laissez de l'espace autour, surtout à l'arrière, d'où sort l'air chaud.",
      "Ne démontez pas le ventilateur intérieur vous-même : au-delà de ce nettoyage, faites appel à un réparateur."
    ]
  },
  {
    id: "joystick-drift",
    title: "Corriger le drift d'une manette",
    category: "loisirs",
    difficulty: "Moyen",
    duration: "45 min",
    minutes: 45,
    savings: "≈ 50 €",
    keywords: ["manette", "joystick", "drift", "console", "jeu vidéo", "stick", "bouge tout seul"],
    summary: "Votre personnage bouge tout seul ? Un nettoyage du joystick règle souvent le problème.",
    safety: "Débranchez la manette. L'alcool isopropylique est inflammable : pas de flamme à proximité.",
    tools: ["Tournevis de précision", "Médiator", "Alcool isopropylique", "Coton-tige"],
    parts: ["Module joystick (si remplacement)"],
    sources: [
      { label: "Nintendo — sticks des Joy-Con qui ne répondent pas correctement (drift)", url: "https://www.nintendo.com/fr-fr/Assistance/Nintendo-Switch/Depannage/Les-sticks-des-manettes-Joy-Con-ne-repondent-pas-correctement-ou-ne-fonctionnent-pas-bug-de-reactivite-du-stick-ou-drift--1908347.html" },
      { label: "JV Tech — nettoyer ses manettes sans abîmer les sticks", url: "https://www.jeuxvideo.com/news/2090082/manettes-ps5-xbox-et-switch-comment-les-nettoyer-sans-massacrer-les-sticks-et-les-boutons.htm" }
    ],
    steps: [
      { title: "Essayer sans ouvrir", text: "Appliquez une goutte d'alcool isopropylique à la base du stick avec un coton-tige et faites-le tourner dans tous les sens pendant une minute." },
      { title: "Tester", text: "Laissez l'alcool s'évaporer, retirez étui et autocollants éventuels, rebranchez, puis calibrez les sticks et testez dans les réglages de la console.", timer: 600 },
      { title: "Ouvrir la manette", text: "Si le drift persiste : retirez les vis (parfois sous les poignées ou les étiquettes) et séparez les coques avec un médiator.", tip: "Photographiez chaque étape : les nappes et ressorts se remontent plus facilement ainsi." },
      { title: "Nettoyer le potentiomètre", text: "Appliquez l'alcool directement sur le mécanisme du stick, faites-le tourner, puis laissez sécher avant de refermer.", timer: 600 },
      { title: "Remonter et recalibrer", text: "Remontez la manette et lancez la calibration des sticks dans les réglages de la console." }
    ],
    troubleshoot: [
      "Joy-Con de Nintendo Switch : Nintendo indique réparer sans frais, jusqu'à nouvel ordre, le drift dû à un défaut de fabrication ou à l'usure normale (conditions sur sa page d'assistance). Contactez-le avant d'ouvrir la manette.",
      "Le drift revient vite : le module joystick est usé, il se remplace (soudure nécessaire sur certains modèles)."
    ]
  },
  {
    id: "recoller-semelle",
    title: "Recoller la semelle d'une chaussure de sport",
    category: "mode",
    difficulty: "Facile",
    duration: "30 min + 24 h de séchage",
    minutes: 30,
    savings: "≈ 70 €",
    keywords: ["chaussure", "basket", "semelle", "décollée", "colle", "randonnée", "running"],
    summary: "Une semelle qui bâille n'est pas la fin de vos chaussures. Avec la bonne colle, la réparation tient des années.",
    safety: "Colle néoprène : travaillez dans une pièce aérée, sans flamme, et portez des gants.",
    tools: ["Gants", "Papier de verre moyen", "Pinceau ou spatule", "Serre-joints ou gros élastiques"],
    parts: ["Colle néoprène (colle contact) ou colle spéciale chaussures", "Alcool ménager"],
    sources: [
      { label: "Decathlon — recoller une semelle de chaussure", url: "https://conseilsport.decathlon.fr/comment-recoller-une-semelle-de-chaussure" }
    ],
    steps: [
      { title: "Nettoyer", text: "Ouvrez bien la partie décollée, retirez l'ancienne colle et la saleté, puis dégraissez à l'alcool ménager." },
      { title: "Poncer", text: "Poncez légèrement les deux surfaces pour qu'elles soient rugueuses : la colle accroche mieux." },
      { title: "Encoller les deux faces", text: "Étalez une fine couche de colle sur la semelle ET sur la chaussure, puis laissez sécher à l'air libre.", timer: 600, tip: "La colle doit être sèche au toucher : c'est le principe de la colle contact." },
      { title: "Presser fort", text: "Positionnez bien la semelle (le contact est immédiat, pas de seconde chance) et pressez très fort quelques secondes." },
      { title: "Maintenir 24 h", text: "Serrez avec des serre-joints ou des élastiques et laissez sécher 24 à 48 heures avant de porter.", timer: 300, tip: "Pressez fort pendant les 5 premières minutes : c'est là que tout se joue." }
    ],
    troubleshoot: [
      "Ça se redécolle : la surface n'était pas assez dégraissée, ou les deux faces n'avaient pas de colle."
    ]
  },

  /* ================= AUTRES ================= */
  {
    id: "patch-jean",
    title: "Réparer un trou dans un jean sans couture",
    category: "mode",
    difficulty: "Facile",
    duration: "15 min",
    minutes: 15,
    savings: "≈ 30 €",
    keywords: ["jean", "trou", "accroc", "déchirure", "patch", "thermocollant", "pantalon", "genou", "entrejambe", "pièce", "repasser"],
    summary: "Un trou au genou ou un accroc ? Une pièce thermocollante posée à l'envers le répare au fer à repasser, presque sans que ça se voie.",
    safety: "Couvrez toujours la pièce d'un torchon en coton pendant le repassage, et ne laissez pas le fer chaud sans surveillance.",
    tools: ["Fer à repasser", "Torchon en coton", "Petits ciseaux"],
    parts: ["Pièce thermocollante de la couleur du jean"],
    sources: [
      { label: "Couture Retouches Rennes — réparer un trou dans un jean", url: "https://www.couture-retouches-rennes.fr/reparer-trou-jean-sans-machine" },
      { label: "Mercerie Durand — réparer un jean sans couture", url: "https://www.merceriedurand.com/details-comment+reparer+un+trou+sur+mon+jeans+sans+couture+votre+mercerie+d+avignon+vous+donne+quelques+astuces-132.html" },
      { label: "Comment économiser — réparer un jean troué", url: "https://www.comment-economiser.fr/reparer-jean-troue.html" }
    ],
    steps: [
      { title: "Préparer le trou", text: "Retournez le jean sur l'envers et coupez les fils qui dépassent autour du trou." },
      { title: "Découper la pièce", text: "Découpez une pièce qui dépasse d'au moins 2 cm tout autour du trou, en arrondissant les coins.", tip: "Des coins arrondis se décollent beaucoup moins avec les frottements." },
      { title: "Positionner", text: "Posez la pièce sur le trou, face collante contre le tissu (c'est la face plus lisse ou brillante), puis couvrez-la d'un torchon en coton." },
      { title: "Repasser", text: "Fer réglé sur « coton », sans vapeur : appuyez fermement 20 à 30 secondes, sans faire glisser le fer. Pour une grande pièce, recommencez zone par zone.", timer: 30 },
      { title: "Laisser refroidir", text: "Laissez refroidir complètement, au moins 10 minutes, avant de retourner le jean : c'est en refroidissant que la colle prend.", timer: 600 }
    ],
    troubleshoot: [
      "La pièce se décolle : évitez le sèche-linge, sa chaleur ramollit la colle. Repassez de nouveau quelques secondes si un bord se soulève."
    ]
  },
  {
    id: "recoudre-bouton",
    title: "Recoudre un bouton",
    category: "mode",
    difficulty: "Facile",
    duration: "10 min",
    minutes: 10,
    savings: "≈ 10 €",
    keywords: ["bouton", "coudre", "recoudre", "couture", "chemise", "veste", "manteau", "pantalon", "jean", "aiguille", "fil"],
    summary: "Un bouton qui pend ou qui est tombé se recoud en dix minutes, même sans avoir jamais cousu.",
    safety: "Piquez toujours en éloignant l'aiguille de vos doigts ; un dé à coudre aide sur les tissus épais.",
    tools: ["Aiguille fine", "Fil solide, de la couleur du tissu", "Ciseaux", "Épingle, allumette ou cure-dent"],
    parts: ["Le bouton"],
    sources: [
      { label: "Petit Citron — coudre un bouton", url: "https://www.petitcitron.com/techniques-de-couture/coudre-un-bouton/" },
      { label: "YouSchool — coudre un bouton à la main", url: "https://www.youschool.fr/mode/coudre-un-bouton/" }
    ],
    steps: [
      { title: "Préparer le fil", text: "Enfilez l'aiguille, doublez le fil et faites un nœud en prenant les deux extrémités ensemble." },
      { title: "Ancrer le fil", text: "À l'emplacement du bouton, faites un tout petit point (2 mm) sur l'endroit du tissu pour bien fixer le fil, puis passez l'aiguille par un trou du bouton." },
      { title: "Laisser un espace", text: "Posez une épingle, une allumette ou un cure-dent sur le bouton, entre les trous, et cousez par-dessus : cela laissera un petit espace entre bouton et tissu.", tip: "Sur un tissu fin, cette astuce n'est pas nécessaire." },
      { title: "Coudre", text: "Passez l'aiguille d'un trou à l'autre plusieurs fois, en traversant le tissu, sans trop serrer. Pour un bouton à 4 trous : deux lignes parallèles ou un X." },
      { title: "Former la tige", text: "Retirez l'épingle, ressortez l'aiguille sous le bouton, tirez légèrement le bouton et enroulez le fil 5 ou 6 fois autour des fils qui le tiennent." },
      { title: "Arrêter le fil", text: "Terminez par quelques petits points serrés sur l'envers du tissu (ou un nœud), puis coupez le fil." }
    ],
    troubleshoot: [
      "Le bouton passe mal dans la boutonnière : la tige est trop courte. Recommencez en laissant un peu plus d'espace."
    ]
  },
  {
    id: "fermeture-eclair",
    title: "Réparer une fermeture éclair qui s'ouvre",
    category: "mode",
    difficulty: "Facile",
    duration: "10 min",
    minutes: 10,
    savings: "≈ 30 €",
    keywords: ["fermeture éclair", "zip", "curseur", "blouson", "sac", "vêtement", "couture"],
    summary: "La fermeture se rouvre derrière le curseur ? Le curseur s'est simplement écarté. Une pince suffit.",
    safety: "Allez-y très progressivement : un curseur trop serré peut casser.",
    tools: ["Pince plate", "Crayon à papier"],
    parts: [],
    sources: [
      { label: "Petromax — réparer une fermeture éclair", url: "https://petromax.com/fr/blogs/guide/zipper-repair-when-small-defects-stop-big-adventures" }
    ],
    steps: [
      { title: "Descendre le curseur", text: "Ramenez le curseur tout en bas de la fermeture, là où les dents sont encore bien engagées." },
      { title: "Resserrer le curseur", text: "Avec la pince plate, pincez doucement les deux côtés du curseur, côté arrière (là où les dents sortent fermées), un côté puis l'autre.", tip: "Serrez très peu à la fois, puis testez. On peut toujours resserrer, jamais desserrer." },
      { title: "Tester", text: "Remontez la fermeture : les dents doivent se refermer derrière le curseur. Sinon, resserrez un tout petit peu." },
      { title: "Lubrifier", text: "Frottez la mine d'un crayon à papier sur les dents : le graphite rend la fermeture plus douce." }
    ],
    troubleshoot: [
      "Il manque des dents : la fermeture doit être remplacée, une retoucherie le fait à petit prix."
    ]
  },

  /* ================= INSTRUMENTS DE MUSIQUE ================= */
  {
    id: "cordes-guitare-classique",
    title: "Changer les cordes d'une guitare classique",
    category: "instruments",
    difficulty: "Facile",
    duration: "40 min",
    minutes: 40,
    savings: "≈ 20 €",
    keywords: ["guitare classique", "guitare", "cordes", "nylon", "changer", "nœud", "chevalet", "mécanique", "accorder", "espagnole"],
    summary: "Sur une guitare classique, les cordes en nylon se nouent au chevalet. Le geste paraît compliqué la première fois, puis devient vite naturel.",
    safety: "Détendez complètement la corde à la mécanique avant de la dénouer ou de la couper.",
    tools: ["Pince coupante ou ciseaux", "Accordeur"],
    parts: ["Jeu de cordes nylon pour guitare classique"],
    sources: [
      { label: "HGuitare — changer les cordes de sa guitare classique", url: "https://www.hguitare.com/communaute/blog/materiel/changer-cordes-guitare-classique" },
      { label: "Guitaratonton — changer une corde de guitare classique en images", url: "https://www.guitaratonton.fr/changer-une-corde-de-guitare-classique-en-images/" }
    ],
    steps: [
      { title: "Retirer l'ancienne corde", text: "Détendez la corde à la mécanique jusqu'à ce qu'elle soit lâche, puis dénouez-la au chevalet.", tip: "Changez les cordes une par une et regardez comment le nœud est fait sur les autres : c'est votre modèle." },
      { title: "Passer la corde au chevalet", text: "Passez la nouvelle corde dans le trou du chevalet et laissez dépasser 2 à 3 cm de l'autre côté." },
      { title: "Faire le nœud", text: "Remontez le bout qui dépasse, passez-le derrière la corde et ramenez-le par-dessus. Repassez-le derrière la corde une deuxième fois, dans le même sens, puis glissez-le dans la boucle côté extérieur et tendez." },
      { title: "Fixer à la mécanique", text: "Passez l'autre bout dans le trou de la mécanique en laissant un peu de mou, de quoi faire environ 2 tours : à peu près 4 doigts entre la corde et la touche pour les cordes aiguës, 3 doigts pour les graves." },
      { title: "Tendre", text: "Gardez la corde tendue d'une main et tournez la mécanique de l'autre, dans le bon sens : regardez de quel côté de la tête se trouve la clé." },
      { title: "Accorder et stabiliser", text: "Accordez, tirez légèrement sur la corde, réaccordez, et recommencez jusqu'à ce qu'elle ne bouge plus entre deux tirages.", tip: "Des cordes neuves se désaccordent souvent au début : c'est normal, le nylon s'étire." },
      { title: "Couper l'excédent", text: "Une fois la corde enroulée et accordée, coupez ce qui dépasse, sans couper trop court." }
    ],
    troubleshoot: [
      "Le nœud glisse au chevalet : refaites-le en serrant bien la boucle avant de tendre.",
      "Combien de tours à la mécanique ? Trop, et la corde perd un peu de résonance ; pas assez, et elle tient moins bien l'accord. Environ 2 tours suffisent."
    ]
  },
  {
    id: "cordes-guitare-folk",
    title: "Changer les cordes d'une guitare folk",
    category: "instruments",
    difficulty: "Facile",
    duration: "30 min",
    minutes: 30,
    savings: "≈ 20 €",
    keywords: ["guitare", "cordes", "folk", "acoustique", "musique", "instrument", "accorder"],
    summary: "Des cordes ternes qui ne tiennent plus l'accord ? Les changer redonne vie au son de la guitare, et c'est un geste que tout guitariste peut apprendre.",
    safety: "Portez des lunettes si possible : une corde qui casse sous tension peut fouetter. Coupez les bouts de corde avec une pince, jamais en tirant.",
    tools: ["Tire-cheville (ou pince à bec)", "Pince coupante", "Accordeur", "Chiffon doux"],
    parts: ["Jeu de cordes pour guitare folk (acier)"],
    photo: "instruments",
    sources: [
      { label: "Atelier de la guitare — changer les cordes d'une folk", url: "https://atelierdelaguitare.fr/changer-les-cordes-de-votre-guitare-folk/" },
      { label: "MyGuitare — 7 étapes pour changer les cordes", url: "https://www.myguitare.com/blog/changer-cordes-guitare-folk/" }
    ],
    steps: [
      { title: "Détendre les cordes", text: "Tournez les mécaniques pour relâcher complètement chaque corde, jusqu'à ce qu'elles pendent." },
      { title: "Retirer les chevilles", text: "Au chevalet, retirez chaque cheville avec le tire-cheville en poussant légèrement la corde vers l'intérieur pour la décoincer, puis sortez l'ancienne corde.", tip: "Profitez que les cordes sont retirées pour dépoussiérer la touche avec un chiffon doux." },
      { title: "Fixer la corde au chevalet", text: "Glissez la boule de la nouvelle corde dans son trou, remettez la cheville, puis tirez la corde vers le haut en maintenant la cheville du pouce : la boule doit venir se caler sous la table." },
      { title: "Enrouler sur la mécanique", text: "Passez la corde dans le trou de la mécanique en laissant du mou (environ 5 cm pour les cordes graves), puis tournez en guidant la corde pour qu'elle s'enroule vers le bas : 2 à 3 tours suffisent." },
      { title: "Couper l'excédent", text: "Coupez le bout de corde qui dépasse de la mécanique à quelques millimètres avec la pince coupante." },
      { title: "Accorder et étirer", text: "Accordez chaque corde, tirez-la doucement vers le haut pour l'étirer, puis réaccordez. Répétez jusqu'à ce que l'accord tienne.", tip: "Des cordes neuves se désaccordent pendant quelques jours : c'est normal." }
    ],
    troubleshoot: [
      "La corde glisse à la mécanique : ajoutez un tour d'enroulement en faisant passer la corde sous elle-même.",
      "Ça frise sur une case : ce n'est pas lié aux cordes, le réglage du manche est à revoir par un luthier."
    ]
  }
];
