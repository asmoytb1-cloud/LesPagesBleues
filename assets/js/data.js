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
  { id: "automobile", name: "Auto / Moto", short: "Auto / Moto", icon: "car", photo: "automobile", desc: "Voitures et motos : entretenir et réparer",
    intro: "Niveaux, pneus, freins, batterie, ampoules : une bonne partie de l'entretien d'une voiture ou d'une moto se fait avec quelques outils et la notice du véhicule. Les fiches indiquent à chaque fois ce qui reste l'affaire d'un garage.",
    tips: ["Travaillez moteur coupé et froid, sur un sol plat, frein à main serré (ou béquille bien posée).",
      "Ne vous glissez jamais sous un véhicule soutenu seulement par un cric.",
      "Gardez la notice à portée de main : niveaux, pressions et références y figurent.",
      "Freins, direction, pneus : au moindre doute, faites contrôler par un professionnel."] },
  { id: "electromenager", name: "Électroménager", icon: "washer", photo: "electromenager", desc: "Diagnostiquer et dépanner",
    intro: "Lave-linge qui ne vidange plus, frigo qui givre, aspirateur qui n'aspire plus… Beaucoup de pannes viennent d'un filtre bouché, d'un joint ou d'une pièce d'usure facile à changer. Commencez par le diagnostic : il vous oriente vers la bonne fiche.",
    tips: ["Débranchez l'appareil avant toute intervention ; fermez aussi le robinet d'eau pour un lave-linge ou un lave-vaisselle.",
      "Relevez la référence sur la plaque signalétique : elle donne la bonne notice et la bonne pièce.",
      "Circuit de froid d'un réfrigérateur, intérieur d'un micro-ondes : n'y touchez pas, c'est le travail d'un professionnel.",
      "Appareil récent ? Vérifiez la garantie avant de l'ouvrir."] },
  { id: "telephonie", name: "Téléphonie & Informatique", short: "Téléphonie", icon: "laptop", photo: "telephonie", desc: "Smartphones, ordinateurs, imprimantes",
    intro: "Téléphone qui charge mal, ordinateur lent ou qui chauffe, touche bloquée, imprimante qui imprime pâle : de nombreux problèmes se règlent par un nettoyage, un réglage ou une pièce standard, sans matériel de pro.",
    tips: ["Sauvegardez vos données avant toute intervention.",
      "Éteignez et débranchez l'appareil avant de l'ouvrir.",
      "Une batterie gonflée ou percée est dangereuse : ne la forcez pas, confiez-la à un réparateur.",
      "Ouvrir un appareil sous garantie peut l'annuler : vérifiez d'abord."] },
  { id: "maison", name: "Maison & Bricolage", short: "Maison", icon: "drill", photo: "maison", desc: "Plomberie, murs, électricité, outillage",
    intro: "Robinet qui goutte, chasse d'eau qui coule, joint noirci, trou dans une cloison, prise abîmée : les petits travaux de la maison sont souvent plus simples qu'il n'y paraît, à condition de respecter quelques règles de sécurité.",
    tips: ["Électricité : coupez le courant au tableau et vérifiez l'absence de tension avant de toucher une prise ou un interrupteur.",
      "Plomberie : fermez l'arrivée d'eau avant de démonter un robinet ou un mécanisme de WC.",
      "Gaz, tableau électrique, chaudière : faites appel à un professionnel.",
      "Portez des lunettes de protection pour percer, poncer ou meuler."] },
  { id: "velo", name: "Vélo & Mobilité", short: "Vélo", icon: "bike", photo: "velo", desc: "Vélos, vélos électriques, trottinettes",
    intro: "Crevaison, chaîne qui saute, freins qui frottent, dérailleur mal réglé : l'entretien d'un vélo s'apprend vite et se fait avec peu d'outils. Les engins électriques demandent en plus quelques précautions avec la batterie.",
    tips: ["Contrôlez freins et pneus avant chaque sortie.",
      "Vélo ou trottinette électrique : éteignez-le et retirez la batterie quand c'est possible avant d'intervenir.",
      "Serrez les pièces au couple indiqué par le fabricant quand il est donné.",
      "Freins qui restent douteux après réglage : ne roulez pas, faites vérifier."] },
  { id: "jardin", name: "Jardin & Extérieur", short: "Jardin", icon: "leaf", photo: "jardin", desc: "Tondeuse, taille, arrosage",
    intro: "Tondeuse qui ne démarre pas, lame émoussée, fil de coupe-bordure épuisé, tuyau percé : un peu d'entretien avant la saison évite la plupart des pannes du jardin.",
    tips: ["Avant de toucher une lame : débranchez le câble de bougie, le cordon ou la batterie.",
      "Portez des gants épais pour manipuler lames et chaînes.",
      "Faites le plein moteur froid, en extérieur, loin de toute flamme.",
      "Tronçonneuse, débroussailleuse : gants, lunettes et protection auditive indispensables."] },
  { id: "loisirs", name: "Jeux & Loisirs", short: "Loisirs", icon: "gamepad", photo: "loisirs", desc: "Consoles, manettes, loisirs",
    intro: "Manette qui dérive ou ne répond plus, console qui chauffe et fait du bruit, matelas gonflable qui fuit : les pannes des loisirs se règlent souvent par une réinitialisation, un dépoussiérage ou une rustine.",
    tips: ["Éteignez complètement la console et débranchez-la avant de l'ouvrir.",
      "Ouvrir une console ou une manette peut annuler la garantie : vérifiez d'abord.",
      "Utilisez des tournevis adaptés aux vis (cruciforme fin, Torx) pour ne pas les abîmer.",
      "Dépoussiérez régulièrement les aérations : une console encrassée chauffe davantage et devient bruyante."] },
  { id: "autres", name: "Autres", icon: "more", desc: "Mode, musique et plus",
    intro: "Vêtements, chaussures, instruments de musique… Tout ce qui ne rentre pas dans les grandes catégories, et que l'on peut aussi réparer soi-même.",
    tips: ["Testez d'abord colle, fil ou produit sur une partie cachée.", "Au moindre doute sur un objet de valeur, demandez l'avis d'un artisan."] },
  // Sous-catégories
  { id: "moto", name: "Moto", icon: "moto", photo: "automobile", parent: "automobile", desc: "Entretien de la moto",
    intro: "Chaîne, pneus, batterie : l'entretien courant d'une moto se fait à la maison avec peu d'outils. Suivez toujours les valeurs de la notice de votre modèle.",
    tips: ["Moto sur béquille centrale ou sur un lève-moto, sur un sol plat et dur.", "Chaîne et roue arrière : moteur coupé, jamais de main près de la couronne moteur tournant."] },
  { id: "mode", name: "Mode & Accessoires", short: "Mode", icon: "shirt", photo: "mode", parent: "autres", desc: "Vêtements, chaussures, sacs",
    intro: "Bouton arraché, fermeture éclair qui déraille, jean troué, semelle décollée : quelques gestes de couture et de collage prolongent la vie de vos vêtements et chaussures.",
    tips: ["Testez la colle ou le produit sur une zone cachée.", "Utilisez un fil de la même matière et de la même couleur que le tissu."] },
  { id: "instruments", name: "Instruments de musique", short: "Musique", icon: "music", photo: "instruments", parent: "autres", desc: "Guitares et autres instruments",
    intro: "Changer des cordes, régler un instrument : l'entretien courant se fait soi-même, avec un peu de patience.",
    tips: ["Notez ou photographiez les réglages avant de démonter quoi que ce soit.", "Pour une fissure ou un problème de manche, voyez un luthier."] }
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

  {
    id: "niveau-huile-moteur",
    title: "Vérifier le niveau d'huile moteur et faire l'appoint",
    category: "automobile",
    difficulty: "Facile",
    duration: "10 min",
    minutes: 10,
    keywords: ["huile", "niveau d'huile", "jauge", "appoint", "moteur", "voyant huile", "burette", "mini", "maxi", "entretien", "contrôle"],
    summary: "Un chiffon et deux minutes : contrôler l'huile régulièrement, et en remettre si besoin, évite de lourds dégâts au moteur.",
    safety: "Voyant d'huile rouge allumé en roulant : il signale une pression d'huile trop faible. Arrêtez-vous dès que c'est possible sans danger, coupez le moteur et consultez la notice. Contrôlez le niveau moteur froid, pour ne pas vous brûler.",
    tools: ["Chiffon ou papier absorbant", "Entonnoir", "Huile moteur à la norme du constructeur"],
    parts: [],
    sources: [
      { label: "TotalEnergies — vérifier le niveau d'huile moteur", url: "https://services.totalenergies.fr/faq/q/verifier-niveau-huile-moteur" },
      { label: "Volkswagen — connaissance de l'huile moteur (niveau, norme, voyants)", url: "https://www.volkswagen.fr/fr/entretenir-ma-volkswagen/entretien-et-pieces/fluides-huile-moteur/connaissance-huile.html" }
    ],
    steps: [
      { title: "Se garer à plat, moteur froid", text: "Garez-vous sur un sol plat, coupez le moteur et attendez qu'il soit froid : l'huile a alors eu le temps de redescendre." },
      { title: "Sortir et essuyer la jauge", text: "Ouvrez le capot et repérez la jauge : une tige terminée par un anneau ou un crochet de couleur vive. Sortez-la et essuyez-la avec le chiffon.", tip: "Pas de jauge visible ? La notice indique comment contrôler le niveau sur votre modèle." },
      { title: "Mesurer", text: "Replongez la jauge à fond, puis ressortez-la. Le trait d'huile doit se trouver entre les repères mini et maxi : dans ce cas, rien à faire." },
      { title: "Choisir la bonne huile", text: "S'il en manque, prenez une huile qui respecte la norme indiquée dans la notice ; comparez-la avec l'étiquette du bidon. Chez certaines marques, la norme figure aussi sur un autocollant dans le compartiment moteur." },
      { title: "Faire l'appoint petit à petit", text: "Ouvrez le bouchon de remplissage d'huile, sur le dessus du moteur, et versez lentement à l'entonnoir. Attendez quelques minutes que l'huile descende, puis mesurez de nouveau. Recommencez jusqu'à être entre mini et maxi.", safety: "Ne dépassez jamais le repère maxi." },
      { title: "Refermer", text: "Revissez bien le bouchon de remplissage, remettez la jauge à fond et refermez le capot.", tip: "Contrôlez le niveau environ tous les 2 000 km." }
    ],
    troubleshoot: [
      "Voyant d'huile jaune ou orange : le niveau est trop bas, ou le circuit d'huile a un défaut. Vérifiez le niveau ; si le voyant reste allumé, voyez un garage.",
      "Vous devez souvent refaire l'appoint : le moteur consomme ou perd de l'huile. Faites-le contrôler.",
      "Pour la vidange complète, voir la fiche « Changer l'huile moteur »."
    ]
  },
  {
    id: "liquide-refroidissement",
    title: "Contrôler le liquide de refroidissement",
    category: "automobile",
    difficulty: "Facile",
    duration: "10 min",
    minutes: 10,
    keywords: ["liquide de refroidissement", "vase d'expansion", "surchauffe", "température moteur", "antigel", "niveau", "appoint", "fuite", "voyant température"],
    summary: "Le liquide de refroidissement empêche le moteur de surchauffer. Un coup d'œil au vase d'expansion chaque mois suffit.",
    safety: "Ne jamais ouvrir le vase d'expansion moteur chaud : risque de brûlure. Travaillez moteur froid, avec gants et lunettes de protection.",
    tools: ["Gants et lunettes de protection", "Chiffon", "Liquide de refroidissement du même type que celui en place"],
    parts: [],
    sources: [
      { label: "TotalEnergies — quand et comment changer le liquide de refroidissement", url: "https://services.totalenergies.fr/particuliers/conseils/entretien-vehicule/centre-entretien/nos-conseils-entretien-auto/ou-mettre-le-liquide-de-refroidissement" },
      { label: "Vroomly — niveau de liquide de refroidissement", url: "https://www.vroomly.com/blog/niveau-de-liquide-de-refroidissement-quand-et-comment-le-faire/" }
    ],
    steps: [
      { title: "Moteur froid, voiture à plat", text: "Garez-vous sur un sol plat et attendez que le moteur ait refroidi. À chaud, on risque de se brûler, et le niveau monte avec la chaleur, ce qui fausse la mesure." },
      { title: "Trouver le vase d'expansion", text: "Capot ouvert, cherchez un bocal en plastique transparent sur la partie haute du moteur, avec des repères mini et maxi. Le liquide est en général jaune, vert, rose ou orange." },
      { title: "Lire le niveau", text: "Le liquide doit se trouver entre les repères mini et maxi. S'il est au-dessus du mini, refermez le capot : c'est terminé." },
      { title: "Faire l'appoint si besoin", text: "Si le niveau est proche ou en dessous du mini, dévissez le bouchon en le couvrant d'un chiffon, puis ajoutez du liquide sans dépasser le maxi. Revissez bien.", safety: "Utilisez le même liquide que celui déjà en place, et n'ajoutez jamais d'eau. En cas de doute sur le type (minéral ou organique), consultez le carnet d'entretien." }
    ],
    troubleshoot: [
      "Le niveau baisse sans cesse : durite desserrée, fuite au radiateur, à la pompe à eau ou au joint de culasse… Faites vérifier par un garage sans attendre.",
      "Dépôts blanchâtres autour du vase ou odeur de liquide brûlé : signe de projections ou de fuite, à faire contrôler.",
      "Au-delà de l'appoint, le liquide se remplace entièrement : tous les 2 ans ou 60 000 km environ, ou selon le constructeur."
    ]
  },
  {
    id: "filtre-habitacle",
    title: "Changer le filtre d'habitacle (filtre à pollen)",
    category: "automobile",
    difficulty: "Facile",
    duration: "20 min",
    minutes: 20,
    keywords: ["filtre d'habitacle", "filtre à pollen", "filtre charbon", "ventilation", "soufflerie", "buée", "désembuage", "odeur", "climatisation", "boîte à gants", "allergie"],
    summary: "Ventilation faible, pare-brise qui désembue mal, mauvaise odeur à l'allumage de la clim : le filtre d'habitacle est sans doute encrassé.",
    safety: "Moteur et contact coupés. Allez-y doucement avec les clips en plastique de la boîte à gants : ils cassent facilement.",
    tools: ["Tournevis", "Lampe"],
    parts: ["Filtre d'habitacle à la référence de la voiture"],
    sources: [
      { label: "Carglass — quand et comment changer le filtre d'habitacle", url: "https://www.carglass.fr/faq/answers/6220/comment-et-quand-changer-le-filtre-d-habitacle-de-ma-voiture" },
      { label: "Vroomly — changer un filtre d'habitacle", url: "https://www.vroomly.com/blog/comment-changer-son-filtre-dhabitacle-voiture/" },
      { label: "Tesla — remplacement des filtres de l'habitacle (sens de montage)", url: "https://service.tesla.com/docs/Public/diy/models/fr_ca/GUID-40C70444-9DFD-47C4-86ED-AB3F1AE3A97A.html" }
    ],
    steps: [
      { title: "Repérer l'emplacement", text: "Le plus souvent, le filtre est derrière ou sous la boîte à gants. Sur d'autres voitures, il est sous le capot, au pied du pare-brise, ou près de la pédale d'accélérateur. La notice ou la revue technique vous le dira." },
      { title: "Choisir le filtre", text: "Filtre à pollen simple (blanc) contre pollens et particules, à charbon actif (gris) qui arrête aussi pollution et odeurs, ou au polyphénol contre les allergènes. Prenez la référence qui correspond à votre voiture." },
      { title: "Accéder au filtre", text: "Videz la boîte à gants, dévissez ses vis de fixation et tirez-la doucement pour la sortir. Retirez ensuite le cache en plastique placé devant le filtre." },
      { title: "Sortir l'ancien filtre", text: "Avant de le retirer, repérez la flèche imprimée sur sa tranche : elle indique le sens du passage de l'air. Sortez-le en le gardant bien à plat pour ne pas semer la poussière." },
      { title: "Poser le neuf dans le bon sens", text: "Glissez le filtre neuf avec la flèche dans le même sens que l'ancien. Sur une Tesla, par exemple, les flèches doivent pointer vers l'arrière de la voiture." },
      { title: "Remonter", text: "Remettez le cache, puis la boîte à gants et ses vis. Mettez la ventilation en marche pour vérifier le souffle.", tip: "À changer environ tous les ans ou tous les 15 000 km, plus souvent si vous roulez beaucoup en ville (pollution) ou à la campagne (pollens)." }
    ],
    troubleshoot: [
      "L'odeur persiste avec un filtre neuf : pulvérisez un produit antibactérien dédié dans les conduits de ventilation, ou faites-le faire en atelier."
    ]
  },
  /* ================= MOTO ================= */
  {
    id: "entretien-chaine-moto",
    title: "Nettoyer, graisser et contrôler la chaîne de sa moto",
    category: "moto",
    difficulty: "Facile",
    duration: "30 min",
    minutes: 30,
    keywords: ["moto", "chaîne", "kit chaîne", "graisser", "lubrifier", "graisse", "dégraissant", "tension", "débattement", "couronne", "pignon", "à-coups"],
    summary: "Une chaîne propre, graissée et bien tendue dure plus longtemps et évite les à-coups. Graissage tous les 500 km environ, nettoyage tous les 1 000 km.",
    safety: "Moteur coupé, contact coupé : ne faites jamais tourner la roue arrière au moteur pour graisser. Gardez les doigts loin de la couronne et du pignon.",
    tools: ["Béquille centrale ou béquille d'atelier", "Dégraissant pour chaîne moto", "Brosse souple (une brosse à dents convient)", "Chiffons propres", "Carton"],
    parts: ["Lubrifiant pour chaîne moto"],
    sources: [
      { label: "TotalEnergies — entretenir le kit chaîne de sa moto", url: "https://services.totalenergies.fr/particuliers/conseils/entretien-vehicule/centre-entretien/nos-conseils-entretien-moto/entretenir-kit-chaine-moto" }
    ],
    steps: [
      { title: "Surélever la roue arrière", text: "Mettez la moto sur sa béquille centrale ou sur une béquille d'atelier, pour que la roue arrière tourne librement à la main. Glissez un carton sous la chaîne pour protéger le sol." },
      { title: "Dégraisser", text: "Appliquez le dégraissant sur la chaîne, brossez doucement pour décoller les résidus en tournant la roue à la main, puis essuyez au chiffon sec.", safety: "Pas de jet haute pression sur la chaîne ni de produit trop agressif : ils abîment les joints toriques." },
      { title: "Laisser sécher", text: "Laissez la chaîne sécher complètement avant de la graisser : on ne graisse pas une chaîne humide ou sale." },
      { title: "Graisser", text: "Appliquez le lubrifiant au centre de la chaîne, par l'intérieur, tout en faisant tourner la roue arrière à la main. Sans excès : le surplus retient la poussière.", tip: "C'est plus efficace après avoir roulé, chaîne légèrement tiède. Avec une bombe, glissez un carton derrière la chaîne pour protéger la roue." },
      { title: "Contrôler la tension", text: "À mi-chemin entre le pignon et la couronne, soulevez puis abaissez la chaîne et mesurez son débattement. Il se compte généralement en quelques centimètres ; la valeur exacte de votre moto est dans la notice." },
      { title: "Surveiller l'usure", text: "Regardez les dents de la couronne (pointues, déformées ?), cherchez rouille et points durs en faisant tourner la roue. Un kit chaîne se change en général entre 10 000 et 15 000 km selon l'usage." }
    ],
    troubleshoot: [
      "La tension ne se règle plus ou le kit est usé : faites remplacer chaîne, pignon et couronne ensemble par un atelier.",
      "Vous roulez sous la pluie ou sur routes sableuses : graissez plus souvent, environ tous les 250 km."
    ]
  },
  {
    id: "pression-pneus-moto",
    title: "Vérifier la pression des pneus de sa moto",
    category: "moto",
    difficulty: "Facile",
    duration: "10 min",
    minutes: 10,
    keywords: ["moto", "pneus", "pression", "gonfler", "manomètre", "bar", "sous-gonflé", "à froid", "valve", "tenue de route"],
    summary: "Sur deux roues, la pression change tout : tenue de route, freinage, usure. À contrôler toutes les deux semaines, à froid, et avant tout long trajet.",
    safety: "Ne dégonflez jamais un pneu chaud pour le ramener à la valeur « à froid » : attendez qu'il refroidisse.",
    tools: ["Manomètre fiable (ou gonfleur de station)"],
    parts: [],
    sources: [
      { label: "Michelin — guide de la pression des pneus moto", url: "https://www.michelin.ch/fr/motorbike/conseils-moto/entretenir-pneus/guide-pression-pneus-moto" },
      { label: "Pirelli — FAQ pneus moto (pression)", url: "https://www.pirelli.com/tyres/fr-fr/moto/faq" }
    ],
    steps: [
      { title: "Trouver la bonne pression", text: "Les valeurs avant et arrière sont données par le constructeur de la moto, dans la notice. Respectez-les à la lettre." },
      { title: "Mesurer à froid", text: "Contrôlez des pneus froids : moto arrêtée depuis au moins deux heures, ou après moins de 3 km à basse vitesse. Moto sur sol plat." },
      { title: "Mesurer", text: "Dévissez le bouchon de valve, appliquez le manomètre bien droit et lisez la pression. Comparez-la à la valeur de la notice." },
      { title: "Ajuster", text: "Regonflez si la pression est basse ; si elle est trop haute (à froid), dégonflez par petites pressions sur la valve et remesurez." },
      { title: "Remettre le bouchon", text: "Revissez le bouchon de valve : il protège la valve de la poussière.", tip: "À refaire toutes les deux semaines et avant chaque long trajet. Pneus gonflés à l'azote : contrôle régulier quand même, et regonflage à l'azote uniquement." }
    ],
    troubleshoot: [
      "Vous avez mesuré à chaud : la pression lue est plus élevée que la valeur à froid. Ne dégonflez pas ; suivez les consignes du fabricant ou recontrôlez à froid.",
      "Le pneu perd de la pression d'une semaine à l'autre : cherchez une crevaison lente et faites vérifier la valve."
    ]
  },
  {
    id: "hivernage-moto",
    title: "Préparer sa moto pour l'hiver (hivernage)",
    category: "moto",
    difficulty: "Facile",
    duration: "1 h 30",
    minutes: 90,
    keywords: ["moto", "hivernage", "hiver", "stockage", "batterie", "chargeur", "mainteneur de charge", "essence", "stabilisateur", "housse", "béquille", "garage"],
    summary: "Batterie à plat, carburant dégradé, pneus déformés, rouille : quelques gestes avant de ranger la moto évitent les mauvaises surprises au printemps.",
    safety: "Travaillez moteur froid, moto sur béquille stable. Débranchez la batterie en commençant par la borne négative (–).",
    tools: ["Produits de lavage moto", "Lubrifiant chaîne", "Chargeur de batterie adapté (mainteneur de charge)", "Béquille centrale ou d'atelier", "Housse respirante si la moto reste dehors"],
    parts: ["Stabilisateur de carburant (facultatif)"],
    sources: [
      { label: "Michelin — ranger sa moto pour l'hiver, étape par étape", url: "https://www.michelin.ch/fr/motorbike/conseils-moto/entretenir-pneus/conseils-hivernage-moto" }
    ],
    steps: [
      { title: "Lire la notice", text: "Chaque moto a ses exigences d'hivernage : vérifiez d'abord ce que prévoit la notice de votre modèle." },
      { title: "Laver et lubrifier", text: "Lavez et séchez complètement la moto, jantes et pneus compris, en insistant sur les recoins où l'humidité reste. Puis lubrifiez la chaîne, les câbles et les pièces mobiles contre la rouille." },
      { title: "Contrôler les liquides", text: "Vidange d'huile et filtre avant l'hivernage si c'est le moment. Vérifiez le liquide de frein (niveau, couleur) et, sur une moto refroidie par liquide, l'absence de fuite et la protection antigel." },
      { title: "Faire le plein", text: "Remplissez le réservoir de carburant frais : moins d'air, moins de condensation et de rouille. Si vous ajoutez un stabilisateur, faites tourner le moteur quelques minutes pour qu'il circule." },
      { title: "S'occuper de la batterie", text: "Débranchez-la pour éviter qu'elle se vide. Si possible, rangez-la au sec, à l'abri du gel et de la chaleur, et branchez-la sur un chargeur de maintien qui la garde chargée sans la surcharger." },
      { title: "Soulager les pneus", text: "Posez la moto sur une béquille centrale ou d'atelier pour que les pneus ne portent pas tout le poids. Sinon, faites tourner les roues de temps en temps pour changer le point d'appui." },
      { title: "Choisir l'abri", text: "À l'intérieur de préférence. Dehors, utilisez une housse imperméable et respirante, bien fixée, pour limiter humidité et condensation." }
    ],
    troubleshoot: [
      "Au printemps, la moto ne démarre pas : rechargez la batterie avant tout, puis voyez un atelier si elle ne tient pas la charge.",
      "Avant de reprendre la route : contrôlez la pression des pneus (voir la fiche dédiée) et le graissage de la chaîne."
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

  {
    id: "frigo-eau-au-fond",
    title: "Eau au fond du réfrigérateur : déboucher le trou d'évacuation",
    category: "electromenager",
    devices: ["refrigerateur"],
    difficulty: "Facile",
    duration: "15 min",
    minutes: 15,
    keywords: ["réfrigérateur", "frigo", "eau", "flaque", "fuite", "coule", "bac à légumes", "trou d'évacuation", "drain", "dégivrage", "humide", "stagne"],
    summary: "De l'eau stagne sous le bac à légumes ou coule au fond du frigo ? Le petit trou qui évacue l'eau de dégivrage est souvent bouché.",
    safety: "Débranchez le réfrigérateur avant de nettoyer. N'enfoncez jamais d'outil rigide ou pointu dans le trou d'évacuation : vous pourriez abîmer l'appareil.",
    tools: ["Coton-tige ou goupillon souple", "Eau chaude", "Éponge et chiffon"],
    parts: [],
    sources: [
      { label: "Bosch — nettoyer le trou d'évacuation du frigo", url: "https://www.bosch-home.fr/nos-services/aide-en-ligne/assistance-refrigerateur-congelateur/entretien-frigo/nettoyer-trou-evacuation-frigo" },
      { label: "Bosch — mon frigo fait de l'eau : les causes", url: "https://www.bosch-home.fr/nos-services/aide-en-ligne/assistance-refrigerateur-congelateur/reparer-frigo/mon-frigo-fait-de-eau" }
    ],
    steps: [
      { title: "Comprendre d'où vient l'eau", text: "La paroi du fond du frigo givre puis dégivre régulièrement. L'eau descend par une rigole, puis par un petit trou vers un bac situé à l'arrière, près du compresseur, où elle s'évapore. Si ce trou se bouche (miettes, bout d'emballage), l'eau déborde à l'intérieur." },
      { title: "Débrancher et dégager le fond", text: "Débranchez le réfrigérateur, sortez le bac à légumes et épongez l'eau. Le trou se trouve en général au fond, derrière le bac à légumes, au bas de la rigole." },
      { title: "Déboucher en douceur", text: "Introduisez un coton-tige ou un goupillon souple dans le trou et tournez doucement pour ramener les saletés. Ne forcez pas.", safety: "Pas de tournevis, de pique ou de fil de fer : un outil rigide peut abîmer l'appareil." },
      { title: "Rincer à l'eau chaude", text: "Versez un peu d'eau chaude dans l'orifice : elle doit s'écouler sans remonter. Recommencez le nettoyage si elle stagne." },
      { title: "Nettoyer et rebrancher", text: "Essuyez les parois avec un chiffon humide et un produit adapté au réfrigérateur, remettez le bac à légumes et rebranchez.", tip: "Couvrez les aliments frais : leur humidité fait aussi de la condensation dans le frigo." }
    ],
    troubleshoot: [
      "L'eau coule par terre, derrière l'appareil : le bac de récupération à l'arrière est peut-être fissuré ou mal placé. Contrôlez-le, nettoyez-le, remplacez-le si besoin.",
      "Le trou est propre mais ça déborde encore : à l'arrière, entre le bac et le châssis, un petit clapet en caoutchouc peut être obstrué. Nettoyez-le, ou remplacez-le s'il est abîmé.",
      "La flaque est devant, au pied de la porte : le joint de porte laisse sans doute entrer l'air chaud (voir la fiche sur le joint de réfrigérateur)."
    ]
  },
  {
    id: "nettoyer-condenseur-frigo",
    title: "Nettoyer le condenseur du réfrigérateur",
    category: "electromenager",
    devices: ["refrigerateur", "congelateur"],
    difficulty: "Facile",
    duration: "20 min",
    minutes: 20,
    keywords: ["réfrigérateur", "frigo", "congélateur", "condenseur", "serpentins", "grille arrière", "poussière", "chauffe", "consommation", "refroidit mal", "bruit"],
    summary: "La grille ou les serpentins à l'arrière du frigo évacuent la chaleur. Couverts de poussière, ils fatiguent l'appareil et font grimper la facture.",
    safety: "Débranchez le réfrigérateur avant de commencer. Déplacez-le à deux : il est lourd et peut basculer.",
    tools: ["Pinceau ou brosse à poils doux", "Aspirateur avec embout fin"],
    parts: [],
    sources: [
      { label: "Bosch — nettoyer le condenseur du frigo", url: "https://www.bosch-home.fr/nos-services/aide-en-ligne/assistance-refrigerateur-congelateur/entretien-frigo/nettoyer-condenseur-frigo" }
    ],
    steps: [
      { title: "Vérifier la notice", text: "Selon le modèle, le condenseur n'a pas besoin d'être nettoyé, ou ne doit l'être que par un technicien. Vérifiez dans la notice avant de commencer.", tip: "Un nettoyage régulier n'est utile que dans certains cas : animaux à poils, logement poussiéreux, cuisine grasse. Comptez alors tous les 2 à 3 mois." },
      { title: "Débrancher et écarter l'appareil", text: "Débranchez le réfrigérateur puis, avec l'aide d'un proche, écartez-le du mur. Le condenseur est en général en bas et à l'arrière ; sur certains modèles récents, il est à l'avant." },
      { title: "Retirer le panneau inférieur", text: "Déposez le panneau du bas (à l'arrière ou à l'avant selon le modèle). S'il résiste, ne forcez pas : soulevez-le délicatement avant de le tirer vers vous." },
      { title: "Dépoussiérer", text: "Retirez un maximum de poussière au pinceau ou à la brosse douce, puis passez l'aspirateur avec un embout fin, sans vous presser." },
      { title: "Remonter et replacer", text: "Remettez le panneau, replacez l'appareil en laissant 3 à 5 cm entre le frigo et le mur (ou la niche) pour qu'il respire, puis rebranchez." }
    ],
    troubleshoot: [
      "Le frigo refroidit toujours mal : lancez le diagnostic « Le réfrigérateur givre ou refroidit mal », ou faites appel à un réparateur."
    ]
  },
  {
    id: "detartrer-centrale-vapeur",
    title: "Détartrer une centrale vapeur",
    category: "electromenager",
    devices: ["fer-a-repasser"],
    difficulty: "Facile",
    duration: "30 min (+ 2 h de refroidissement)",
    minutes: 30,
    keywords: ["centrale vapeur", "fer à repasser", "repassage", "tartre", "calcaire", "détartrer", "vapeur faible", "taches", "collecteur", "anti-calc", "semelle"],
    summary: "Vapeur faible ou par à-coups, taches brunes ou blanches sur le linge : le calcaire encrasse la cuve. Un détartrage régulier lui rend sa vapeur.",
    safety: "Débranchez la centrale et laissez-la refroidir complètement (au moins 2 heures) avant de l'ouvrir. Chaque modèle a sa méthode : suivez d'abord la notice.",
    tools: ["Produit détartrant adapté aux centrales vapeur", "Récipient ou évier", "Chiffon doux", "Coton-tige"],
    parts: [],
    sources: [
      { label: "Calor — détartrer une centrale vapeur", url: "https://www.rowenta.fr/calor/centrales-vapeur-calor-basse-pression/detartrer-centrale-vapeur" }
    ],
    steps: [
      { title: "Débrancher et laisser refroidir", text: "Débranchez la centrale et attendez au moins deux heures qu'elle refroidisse complètement.", timer: 7200 },
      { title: "Rincer le collecteur de tartre (si présent)", text: "Beaucoup de modèles ont un collecteur anti-calcaire amovible dans la cuve. Retirez-le, rincez-le à l'eau claire et remettez-le en place.", tip: "Sur ces modèles, c'est souvent l'essentiel de l'entretien : voyez la notice." },
      { title: "Vider la cuve", text: "Ouvrez le bouchon de vidange, sous l'appareil, pour évacuer l'eau restante et les premiers dépôts." },
      { title: "Passer le détartrant", text: "Versez dans le réservoir un mélange d'eau et de détartrant adapté, au dosage indiqué sur le flacon. Rebranchez, attendez que le voyant indique que la centrale est prête, puis actionnez la vapeur plusieurs fois au-dessus d'un évier ou d'un vieux linge.", safety: "Pas de vinaigre blanc ni de bicarbonate : le fabricant les déconseille (joints abîmés, résidus dans les circuits)." },
      { title: "Rincer à l'eau claire", text: "Débranchez, videz la cuve par le bouchon de vidange et rincez-la. Refaites un passage à l'eau claire en actionnant la vapeur, jusqu'à ce que l'eau sorte limpide." },
      { title: "Nettoyer la semelle", text: "Appareil débranché et froid, passez un chiffon doux à peine humide (eau tiède) sur la semelle, puis un coton-tige humide dans les trous de vapeur. Ni abrasif ni détartrant sur la semelle.", tip: "Selon l'usage et la dureté de l'eau, détartrez tous les un à deux mois." }
    ],
    troubleshoot: [
      "Le voyant d'entretien reste allumé : il s'éteint normalement une fois le détartrage bien fait ; sinon, voyez la manipulation décrite dans la notice de votre modèle.",
      "Des traces sur le linge après détartrage : le rinçage était insuffisant. Refaites un passage à l'eau claire."
    ]
  },
  {
    id: "entretien-aspirateur-robot",
    title: "Aspirateur robot qui nettoie mal : l'entretien complet",
    category: "electromenager",
    devices: ["aspirateur-robot"],
    difficulty: "Facile",
    duration: "20 min",
    minutes: 20,
    keywords: ["aspirateur robot", "robot aspirateur", "roomba", "deebot", "roborock", "brosse", "cheveux", "filtre", "capteurs", "roues", "aspire mal", "se perd", "station", "charge"],
    summary: "Il laisse des saletés, se déplace mal ou se recharge mal ? Cheveux enroulés, filtre colmaté et capteurs sales en sont souvent la cause.",
    safety: "Éteignez le robot et débranchez sa station avant de le nettoyer : un nettoyage programmé pourrait le mettre en route.",
    tools: ["Chiffon microfibre sec", "Brosse souple (une vieille brosse à dents convient)", "Ciseaux", "Eau et savon doux"],
    parts: ["Filtre de rechange (à changer tous les 6 mois à 1 an)"],
    sources: [
      { label: "Ecovacs — nettoyer un aspirateur robot", url: "https://www.ecovacs.com/fr/blog/comment-nettoyer-aspirateur-robot" },
      { label: "Spareka — nettoyer son aspirateur robot", url: "https://www.spareka.fr/comment-reparer/electromenager/aspirateur-robot/comment-nettoyer-son-aspirateur-robot" }
    ],
    steps: [
      { title: "Éteindre et débrancher", text: "Sortez le robot de sa station, éteignez-le avec son bouton, puis débranchez la station." },
      { title: "Vider et laver le bac", text: "Videz le bac à poussière, brossez l'intérieur. S'il est très sale, lavez-le à l'eau et au savon doux, puis laissez-le sécher complètement avant de le remettre." },
      { title: "Libérer le rouleau central", text: "Retournez le robot, retirez le couvercle du rouleau et sortez-le. Enlevez cheveux et fibres enroulés, aux ciseaux si besoin, sans entailler le rouleau. Nettoyez aussi la zone d'aspiration." },
      { title: "Nettoyer les brosses latérales", text: "Retirez-les, lavez-les à l'eau et remontez-les une fois sèches.", tip: "Elles ne sont pas interchangeables : respectez les repères « L » (gauche) et « R » (droite) sur les brosses et sur le robot." },
      { title: "Dépoussiérer le filtre", text: "Tapotez le filtre au-dessus d'une poubelle et finissez à la brosse douce. Ne le passez sous l'eau que si le fabricant l'autorise, et laissez-le sécher à l'air avant de le remettre.", tip: "Remplacez-le tous les six mois à un an." },
      { title: "Roues et capteurs", text: "Nettoyez les roues au chiffon sec ou à la brosse. Essuyez les capteurs (dessous et avant du robot) au chiffon microfibre, sans appuyer.", safety: "Jamais d'eau sur les capteurs : l'humidité les abîme." },
      { title: "Nettoyer la station", text: "Essuyez la base de charge au chiffon microfibre sec, en particulier ses contacts. Videz et nettoyez ses réservoirs ou son sac s'il y en a, et laissez sécher avant de rebrancher." }
    ],
    troubleshoot: [
      "Il ne se recharge plus bien : des saletés sur les contacts de charge (robot et station) peuvent gêner. Nettoyez-les au chiffon sec.",
      "Il se cogne ou tourne en rond : essuyez de nouveau les capteurs et vérifiez que rien n'est enroulé autour des roues."
    ]
  },
  {
    id: "climatiseur-mobile-refroidit-mal",
    title: "Climatiseur mobile qui refroidit mal : filtres et vidange",
    category: "electromenager",
    devices: ["climatiseur"],
    difficulty: "Facile",
    duration: "15 min",
    minutes: 15,
    keywords: ["climatiseur", "clim", "climatiseur mobile", "refroidit mal", "souffle faible", "filtre", "réservoir", "eau", "FL", "vidange", "ne marche plus", "rangement"],
    summary: "Souffle faible, pièce qui ne se rafraîchit plus, appareil arrêté avec un code : des filtres encrassés ou un réservoir d'eau plein en sont souvent la cause.",
    safety: "Éteignez l'appareil et débranchez-le avant tout nettoyage. Ne le faites jamais fonctionner sans ses filtres.",
    tools: ["Aspirateur", "Chiffon légèrement humide", "Récipient bas"],
    parts: [],
    sources: [
      { label: "Rowenta — notice du climatiseur mobile RWAC1400H (entretien et dépannage)", url: "https://fc.darty.com/notices/6/2/5/5/6255f5e5d84d3c5dabc71ff8656f37eaa8420826.pdf" }
    ],
    steps: [
      { title: "Éteindre et débrancher", text: "Arrêtez le climatiseur depuis son panneau de commande, puis débranchez-le." },
      { title: "Sortir les filtres", text: "Retirez les grilles d'entrée d'air : les filtres se trouvent juste derrière." },
      { title: "Nettoyer les filtres", text: "Aspirez-les ou tapotez-les pour enlever la poussière, puis rincez-les soigneusement à l'eau courante." },
      { title: "Les laisser sécher", text: "Laissez-les sécher complètement avant de les remettre en place, puis reposez les grilles.", tip: "En période d'utilisation, nettoyez-les régulièrement : la notice cite des filtres sales comme première cause de rafraîchissement faible." },
      { title: "Vider le réservoir si l'appareil l'indique", text: "Quand le réservoir interne est plein, l'appareil s'arrête et affiche un code (« FL » sur ce modèle Rowenta ; voyez la notice du vôtre). Débranchez, placez un récipient sous l'orifice de vidange du bas, retirez les bouchons, laissez couler, puis remettez-les." },
      { title: "Nettoyer le boîtier", text: "Essuyez l'extérieur avec un chiffon légèrement humide. Jamais de produit chimique ni d'abrasif." }
    ],
    troubleshoot: [
      "Toujours peu de fraîcheur : vérifiez que l'entrée et la sortie d'air ne sont pas bloquées, fermez portes, fenêtres et rideaux, et éloignez les sources de chaleur.",
      "L'appareil est bruyant : posez-le sur une surface plane et rigide pour limiter les vibrations.",
      "Le compresseur ne démarre pas tout de suite : une protection le retarde de quelques minutes après l'allumage. Patientez environ 3 minutes.",
      "Pour le ranger en fin de saison : videz toute l'eau, faites-le tourner quelques heures en mode ventilation pour sécher l'intérieur, nettoyez les filtres et rangez-le au sec."
    ]
  },
  /* ================= TÉLÉPHONIE & INFORMATIQUE ================= */
  {
    id: "tetes-impression-imprimante",
    title: "Imprimante qui laisse des traits : nettoyer les têtes",
    category: "telephonie",
    devices: ["imprimante"],
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
    devices: ["ordinateur-portable", "ordinateur-bureau"],
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
    devices: ["ordinateur-portable"],
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
    devices: ["smartphone"],
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
    devices: ["smartphone", "tablette"],
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
    devices: ["ordinateur-portable", "ordinateur-bureau"],
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
    devices: ["robinet"],
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
    devices: ["chasse-eau"],
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
    devices: ["robinet"],
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
    devices: ["chasse-eau"],
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
    devices: ["robinet"],
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
    devices: ["velo", "velo-electrique"],
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
    devices: ["velo", "velo-electrique"],
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
    devices: ["velo", "velo-electrique"],
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
    devices: ["velo", "velo-electrique"],
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
    devices: ["velo", "velo-electrique"],
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
    devices: ["debroussailleuse"],
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
    devices: ["tondeuse"],
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
    devices: ["tondeuse"],
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
    devices: ["manette"],
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
    devices: ["console"],
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
    devices: ["manette"],
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
  },
  {
    id: "groupe-securite-chauffe-eau",
    title: "Chauffe-eau : entretenir le groupe de sécurité",
    category: "maison",
    devices: ["chauffe-eau"],
    difficulty: "Facile",
    duration: "5 min",
    minutes: 5,
    savings: "≈ 100 €",
    keywords: ["chauffe-eau", "ballon d'eau chaude", "cumulus", "groupe de sécurité", "soupape", "fuite", "goutte", "tartre", "calcaire", "pression", "7 bar", "entretien"],
    summary: "Le groupe de sécurité protège votre ballon d'eau chaude contre une surpression. Le manœuvrer une fois par mois évite que le calcaire ne le bloque : trente secondes, sans outil.",
    safety: "L'eau qui s'écoule par la soupape sort du ballon : elle peut être très chaude. Gardez les mains à l'écart de l'évacuation.",
    tools: ["Aucun outil", "Une lampe si le ballon est dans un placard sombre"],
    parts: [],
    sources: [
      { label: "Savelys (groupe ENGIE) — rôle et entretien du groupe de sécurité", url: "https://www.savelys.fr/dossiers/role-du-groupe-de-securite-chauffe-eau" },
      { label: "Selectra — groupe de sécurité du chauffe-eau : fonctionnement et entretien", url: "https://climate.selectra.com/fr/renovation-energetique/chauffe-eau/groupe-de-securite" }
    ],
    steps: [
      { title: "Repérer le groupe de sécurité", text: "C'est le petit bloc installé sur l'arrivée d'eau froide, sous le ballon ou à côté, relié à un entonnoir d'évacuation. Il libère automatiquement de l'eau si la pression dépasse 7 bar." },
      { title: "Manœuvrer la soupape", text: "Tournez d'un quart de tour la molette ou le levier de vidange : un peu d'eau s'écoule dans l'entonnoir. Maintenez quelques secondes, puis refermez.", tip: "Ce geste chasse le calcaire qui finirait par bloquer la soupape." },
      { title: "Vérifier que tout se referme", text: "Une fois la molette revenue en place, l'écoulement doit s'arrêter. Surveillez l'entonnoir une minute." },
      { title: "Savoir ce qui est normal", text: "Pendant que le ballon chauffe, l'eau se dilate : quelques litres par cycle s'écoulent par le groupe de sécurité (3 à 5 litres pour un ballon de 200 litres). Ce n'est pas une panne." },
      { title: "Recommencer chaque mois", text: "Notez la date dans le carnet d'entretien : la manœuvre est à refaire une fois par mois, surtout si votre eau est calcaire." }
    ],
    troubleshoot: [
      "Ça goutte en permanence, même quand le ballon ne chauffe pas : du calcaire, une pression du réseau trop forte ou l'absence de vase d'expansion en sont les causes habituelles. Si la fuite persiste après quelques manœuvres, le groupe de sécurité est à remplacer.",
      "La molette ne tourne plus ou rien ne s'écoule : la soupape est bloquée et ne protège plus le ballon. Faites-la remplacer rapidement.",
      "La pression du réseau dépasse 5 bar : un réducteur de pression en amont prolonge la vie du groupe de sécurité.",
      "Un groupe de sécurité dure en général 5 à 8 ans, moins en eau très calcaire."
    ]
  },
  {
    id: "nettoyer-bouches-vmc",
    title: "Nettoyer les bouches et entrées d'air de la VMC",
    category: "maison",
    devices: ["vmc"],
    difficulty: "Facile",
    duration: "30 min",
    minutes: 30,
    savings: "≈ 130 €",
    keywords: ["vmc", "ventilation", "bouche d'extraction", "entrée d'air", "aération", "humidité", "moisissure", "condensation", "double flux", "filtre", "salle de bain", "cuisine"],
    summary: "Des bouches encrassées aspirent mal : l'humidité reste dans la maison. Deux nettoyages par an, au printemps et à l'automne, suffisent à garder une VMC efficace.",
    safety: "Coupez l'alimentation électrique de la VMC avant de démonter les bouches.",
    tools: ["Tournevis (selon les bouches)", "Eau savonneuse et éponge", "Chiffon humide", "Aspirateur avec embout brosse", "Une feuille de papier toilette pour le test"],
    parts: ["Filtres de rechange pour une VMC double flux"],
    sources: [
      { label: "Qualitel — comment nettoyer votre VMC", url: "https://www.qualitel.org/particuliers/conseils/entretien-vmc/" },
      { label: "Ventilation Direct — démonter et nettoyer les bouches de VMC", url: "https://www.ventildirect.fr/blog/comment-demonter-et-nettoyer-bouches-vmc-n36" }
    ],
    steps: [
      { title: "Couper la VMC", text: "Coupez son disjoncteur au tableau électrique." },
      { title: "Démonter les bouches d'extraction", text: "Dans la cuisine, la salle de bain et les WC, retirez la grille de chaque bouche : elle se déclipse ou se tourne, parfois une vis la maintient.", tip: "Prenez une photo avant de démonter : le remontage sera plus simple." },
      { title: "Laver les grilles", text: "Lavez grille et volet à l'eau savonneuse, rincez et laissez sécher. Certaines grilles passent au lave-vaisselle : vérifiez la notice. Essuyez le corps de la bouche resté au plafond avec un chiffon humide." },
      { title: "Dépoussiérer les entrées d'air", text: "Dans les pièces à vivre, passez l'aspirateur ou un chiffon humide sur les entrées d'air des fenêtres. Ne les bouchez jamais : c'est par là que l'air neuf entre." },
      { title: "Changer les filtres (double flux)", text: "Si votre VMC est à double flux, remplacez ses filtres une à deux fois par an, plus souvent en ville." },
      { title: "Remonter et tester", text: "Remontez les bouches, rallumez la VMC et approchez une feuille de papier toilette de chaque bouche : elle doit être aspirée et rester plaquée.", tip: "Faites contrôler l'installation par un professionnel tous les trois ans, comme le recommande l'ADEME." }
    ],
    troubleshoot: [
      "La feuille ne tient pas après nettoyage : le moteur ou les gaines sont en cause (gaine écrasée ou débranchée dans les combles). Faites intervenir un professionnel.",
      "La VMC est bruyante : une bouche mal remontée ou un caisson encrassé peuvent vibrer."
    ]
  },
  {
    id: "entretien-poele-granules",
    title: "Poêle à granulés : l'entretien courant",
    category: "maison",
    devices: ["poele-granules"],
    difficulty: "Facile",
    duration: "15 min",
    minutes: 15,
    savings: "≈ 400 €",
    keywords: ["poêle à granulés", "poêle à pellets", "pellets", "granulés", "creuset", "brasero", "cendrier", "cendres", "vitre", "ramonage", "entretien annuel", "chauffage"],
    summary: "Un creuset encrassé et un cendrier plein font mal brûler les granulés. Quelques gestes réguliers, plus le ramonage et l'entretien professionnels, évitent les pannes et les feux de conduit.",
    safety: "Travaillez uniquement sur un poêle éteint, froid et débranché. Les cendres peuvent rester chaudes longtemps : utilisez un aspirateur à cendres et un seau métallique avec couvercle.",
    tools: ["Aspirateur à cendres (avec filtre)", "Seau métallique avec couvercle", "Chiffon microfibre humide"],
    parts: [],
    sources: [
      { label: "Les Experts Chaleur Bois — ramonage et entretien d'un poêle à granulés", url: "https://www.expertschaleurbois.fr/poele-a-granules/entretien-poele-a-granules/" },
      { label: "Proxi-TotalEnergies — ramonage et entretien d'un poêle à granulés", url: "https://proxi.totalenergies.fr/particuliers/actualites/tout-savoir-sur-le-ramonage-et-lentretien-dun-poele-a-granules" }
    ],
    steps: [
      { title: "Éteindre et laisser refroidir", text: "Arrêtez le poêle, attendez qu'il soit complètement froid, puis débranchez-le." },
      { title: "Vider le creuset", text: "Retirez le creuset (le petit bac percé où brûlent les granulés) et aspirez les cendres et résidus. Vérifiez que ses trous ne sont pas bouchés : c'est par eux qu'arrive l'air de combustion.", tip: "L'idéal est de le faire chaque jour de chauffe." },
      { title: "Vider le cendrier", text: "Videz le cendrier dans le seau métallique, environ une fois par semaine selon votre consommation." },
      { title: "Nettoyer la vitre", text: "Tous les deux ou trois jours, essuyez la vitre froide avec un chiffon microfibre humide." },
      { title: "Aspirer le réservoir", text: "Une fois par mois, videz le réservoir et aspirez la sciure accumulée au fond : elle peut bloquer la vis sans fin." },
      { title: "Planifier les interventions professionnelles", text: "Le ramonage du conduit est obligatoire deux fois par an, et l'entretien complet de l'appareil une fois par an. Gardez les attestations : l'assurance peut les demander.", tip: "Enregistrez ces rendez-vous dans le carnet d'entretien pour recevoir un rappel." }
    ],
    troubleshoot: [
      "Les granulés s'accumulent sans brûler : le creuset est encrassé ou les granulés sont humides.",
      "La vitre noircit très vite : combustion incomplète, souvent un creuset bouché ou un conduit à ramoner."
    ]
  },
  {
    id: "entretien-trottinette-electrique",
    title: "Trottinette électrique : l'entretien régulier",
    category: "velo",
    devices: ["trottinette-electrique"],
    difficulty: "Facile",
    duration: "20 min",
    minutes: 20,
    savings: "≈ 60 €",
    keywords: ["trottinette électrique", "trottinette", "xiaomi", "ninebot", "segway", "pneus", "pression", "crevaison", "freins", "vis", "batterie", "autonomie", "entretien", "edpm"],
    summary: "Pneus mal gonflés, freins déréglés et vis desserrées causent la plupart des pannes évitables. Un contrôle par semaine et un serrage régulier prolongent la vie de la trottinette.",
    safety: "Éteignez la trottinette avant toute intervention. Ne lavez jamais une trottinette au jet d'eau : l'eau abîme la batterie et l'électronique.",
    tools: ["Pompe avec manomètre (embout adapté à la valve)", "Clés Allen", "Chiffon doux et éponge légèrement humide", "Brosse souple"],
    parts: ["Plaquettes de frein si elles sont usées (freins à disque)"],
    sources: [
      { label: "Matmut — entretien de la trottinette électrique", url: "https://www.matmut.fr/assurance/nvei/conseils/guide-prevention-trottinette-electrique/entretien" },
      { label: "Decathlon — guide d'entretien de la trottinette électrique", url: "https://conseilsport.decathlon.fr/notre-guide-dentretien-pour-votre-trottinette-electrique" }
    ],
    steps: [
      { title: "Contrôler les pneus", text: "Chaque semaine, vérifiez la pression au manomètre et regonflez à la valeur indiquée sur le flanc du pneu ou dans la notice. Regardez aussi l'état : un pneu fissuré ou déformé est à changer.", tip: "Un pneu sous-gonflé crève plus facilement et réduit l'autonomie." },
      { title: "Vérifier les freins", text: "Tous les trois mois, contrôlez le réglage : tambour à régler, plaquettes de disque à surveiller, frein électromagnétique sans réglage. Resserrez la molette du levier si le frein est trop mou.", tip: "N'huilez jamais un frein." },
      { title: "Resserrer la visserie", text: "Vérifiez les vis du guidon, des roues, du frein et du système de pliage. Resserrez à la clé Allen d'environ un quart de tour, sans forcer." },
      { title: "Nettoyer sans eau", text: "Après une sortie sale, passez une brosse souple puis une éponge à peine humide et un chiffon doux. Évitez les flaques en roulant." },
      { title: "Soigner la batterie", text: "Utilisez uniquement le chargeur d'origine et évitez l'humidité et le froid. Si la trottinette reste longtemps au garage, rechargez-la tous les 3 à 4 mois à environ 70 %, dans un endroit sec et tempéré." }
    ],
    troubleshoot: [
      "Le frein reste mou après réglage : plaquettes usées ou câble détendu, à faire contrôler.",
      "Un jeu apparaît dans la colonne de direction : ne roulez pas avant de l'avoir fait resserrer.",
      "Autonomie en baisse : vérifiez d'abord la pression des pneus, puis l'état de la batterie."
    ]
  },
  {
    id: "entretien-robot-tondeuse",
    title: "Robot tondeuse : nettoyage, lames et hivernage",
    category: "jardin",
    devices: ["robot-tondeuse"],
    difficulty: "Facile",
    duration: "20 min",
    minutes: 20,
    savings: "≈ 80 €",
    keywords: ["robot tondeuse", "tondeuse robot", "automower", "husqvarna", "worx", "gardena", "lames", "station de charge", "hivernage", "batterie", "coupe", "gazon jaunit"],
    summary: "Herbe collée sous le carter, lames émoussées et contacts de charge sales dégradent la tonte. Un nettoyage par semaine en saison et un hivernage soigné suffisent.",
    safety: "Arrêtez le robot et coupez son alimentation (bouton d'arrêt, code de sécurité ou batterie selon le modèle) avant de le retourner. Portez des gants : les lames coupent.",
    tools: ["Gants de protection", "Brosse à poils durs", "Chiffon légèrement humide", "Tournevis adapté aux vis des lames"],
    parts: ["Jeu de lames de rechange (avec leurs vis)"],
    sources: [
      { label: "eufy — entretien d'un robot tondeuse", url: "https://www.eufy.com/eu-fr/blogs/lawn-mower/robot-lawn-mower-maintenance" },
      { label: "50 Factory — entretien robot tondeuse : nettoyage, lames, batterie", url: "https://www.50factory.com/content/20023-entretien-robot-tondeuse-nettoyage-lames-batterie-et-pieces-50-factory" }
    ],
    steps: [
      { title: "Arrêter le robot", text: "Mettez-le hors tension et enfilez des gants avant de le manipuler." },
      { title: "Nettoyer le carter et les roues", text: "Chaque semaine en saison, retournez le robot et brossez l'herbe collée sous le carter, autour du disque de coupe et des roues. Finissez au chiffon légèrement humide.", tip: "Jamais de jet d'eau ni de nettoyeur haute pression : l'eau atteint les joints, les roulements et l'électronique." },
      { title: "Contrôler les lames", text: "Toutes les quatre à six semaines, regardez les lames : émoussées, tordues ou ébréchées, elles arrachent l'herbe au lieu de la couper, et le gazon jaunit." },
      { title: "Remplacer les lames", text: "Changez toutes les lames en même temps pour garder le disque équilibré, avec des vis neuves si les anciennes sont usées." },
      { title: "Nettoyer les contacts de charge", text: "Essuyez au chiffon sec les contacts du robot et de la station : sales, ils provoquent des charges ratées et des arrêts inattendus." },
      { title: "Hiverner", text: "En fin de saison, nettoyez tout le robot, rechargez la batterie à environ 70 % et rangez-le dans un endroit sec et ventilé. Rentrez la station ou débranchez son alimentation.", tip: "Au printemps, vérifiez lames, roues et batterie avant la première tonte." }
    ],
    troubleshoot: [
      "Le robot ne rentre pas se charger : nettoyez les contacts et vérifiez que le fil périphérique n'est pas coupé.",
      "La coupe est irrégulière malgré des lames neuves : de l'herbe bloque peut-être le disque de coupe."
    ]
  },
  {
    id: "hivernage-nettoyeur-haute-pression",
    title: "Nettoyeur haute pression : vidanger et hiverner",
    category: "jardin",
    devices: ["nettoyeur-haute-pression"],
    difficulty: "Facile",
    duration: "15 min",
    minutes: 15,
    savings: "≈ 150 €",
    keywords: ["nettoyeur haute pression", "karcher", "kärcher", "pompe", "gel", "hiver", "hivernage", "antigel", "filtre", "pression faible", "lance", "pistolet"],
    summary: "L'eau restée dans la pompe gèle et la fait éclater. Vider l'appareil après chaque usage et l'hiverner à l'abri du gel évite la panne la plus coûteuse.",
    safety: "Débranchez l'appareil avant de démonter les accessoires, et relâchez la pression en appuyant sur la gâchette du pistolet.",
    tools: ["Graisse ou lubrifiant pour les raccords", "Brosse et chiffon", "Antigel spécial nettoyeur (si l'appareil ne peut pas être rangé hors gel)"],
    parts: [],
    sources: [
      { label: "Kärcher — stocker son nettoyeur haute pression en hiver", url: "https://www.kaercher.com/fr/comment-stocker-son-nettoyeur-haute-pression-en-hiver.html" },
      { label: "Castorama — entretenir un nettoyeur haute pression", url: "https://www.castorama.fr/idees-et-conseils/entretenir-un-nettoyeur-haute-pression/CF_CPRD_npcart_100338.art" }
    ],
    steps: [
      { title: "Couper l'eau et vider la pompe", text: "Après chaque utilisation, fermez l'arrivée d'eau puis appuyez quelques secondes sur la gâchette du pistolet pour vider la pompe. Débranchez ensuite l'appareil." },
      { title: "Démonter les accessoires", text: "Débranchez le tuyau haute pression, le pistolet, la lance et le tuyau d'arrivée d'eau, et laissez-les s'égoutter." },
      { title: "Nettoyer le filtre d'arrivée d'eau", text: "Une fois par an, au moment de l'hivernage, dévissez le raccord d'arrivée et rincez le petit filtre qui s'y trouve." },
      { title: "Nettoyer et graisser", text: "Nettoyez l'appareil avant de le ranger : la saleté durcit pendant l'hiver. Mettez un peu de graisse sur les raccords filetés et clipsés pour qu'ils ne restent pas bloqués." },
      { title: "Ranger à l'abri du gel", text: "Stockez l'appareil dans un local sec et hors gel. Une housse est possible, mais pas étanche à l'air.", tip: "Si le local peut geler, faites circuler un antigel spécial nettoyeur, selon la notice de l'appareil." }
    ],
    troubleshoot: [
      "La pression est faible : filtre d'arrivée d'eau encrassé ou buse bouchée. Nettoyez le filtre et purgez l'appareil.",
      "De l'eau fuit sous la pompe après l'hiver : la pompe a probablement gelé, faites-la contrôler."
    ]
  },
  {
    id: "entretien-taille-haie",
    title: "Taille-haie : nettoyer et huiler les lames",
    category: "jardin",
    devices: ["taille-haie"],
    difficulty: "Facile",
    duration: "15 min",
    minutes: 15,
    savings: "≈ 50 €",
    keywords: ["taille-haie", "taille haie", "lames", "résine", "sève", "huile", "rouille", "coupe mal", "stihl", "hivernage", "batterie"],
    summary: "La sève et la résine durcissent sur les lames et freinent la coupe. Un nettoyage et un huilage après chaque usage gardent les lames efficaces et sans rouille.",
    safety: "Rendez l'outil inerte avant de toucher aux lames : débranchez-le, retirez la batterie ou, sur un modèle thermique, le capuchon de bougie. Portez des gants.",
    tools: ["Gants de protection", "Brosse", "Dissolvant de résine (spray d'entretien pour lames)", "Huile d'entretien", "Chiffon"],
    parts: [],
    sources: [
      { label: "STIHL — comment nettoyer un taille-haie", url: "https://www.stihl.fr/fr/conseils-tutoriels/entretien-outils-motorises/conseils-taille-haie/nettoyer-taille-haie" },
      { label: "Castorama — comment entretenir un taille-haie", url: "https://www.castorama.fr/idees-et-conseils/comment-entretenir-un-taille-haie/CF_CPRD_npcart_100378.art" }
    ],
    steps: [
      { title: "Mettre l'outil hors service", text: "Débranchez le câble, retirez la batterie ou le capuchon de bougie, et enfilez des gants." },
      { title: "Brosser les lames", text: "Après chaque utilisation, retirez à la brosse les feuilles et débris coincés entre les dents." },
      { title: "Dissoudre la résine", text: "Pulvérisez un dissolvant de résine sur les lames. Sur un modèle qui le permet, faites-le tourner brièvement pour bien répartir le produit, puis remettez-le hors service." },
      { title: "Huiler", text: "Essuyez puis appliquez une fine couche d'huile d'entretien des deux côtés des lames : elle les protège de la rouille.", tip: "Pendant une longue séance de taille, huilez aussi les lames de temps en temps." },
      { title: "Préparer l'hiver", text: "Avant de ranger l'outil pour la saison, vérifiez l'affûtage et le jeu des lames. Modèle à batterie : stockez la batterie à part, chargée à 40-60 %, au frais. Modèle thermique : videz le réservoir et faites tourner le moteur jusqu'à l'arrêt." }
    ],
    troubleshoot: [
      "Les lames arrachent les branches au lieu de les couper : elles sont émoussées. Faites-les affûter ou remplacez-les.",
      "Les lames forcent ou chauffent : résine accumulée ou manque d'huile. Nettoyez et huilez."
    ]
  },
  {
    id: "entretien-deshumidificateur",
    title: "Déshumidificateur : nettoyer le filtre et le réservoir",
    category: "electromenager",
    devices: ["deshumidificateur"],
    difficulty: "Facile",
    duration: "15 min",
    minutes: 15,
    savings: "≈ 40 €",
    keywords: ["déshumidificateur", "humidité", "filtre", "réservoir", "bac", "odeur", "moisissure", "condensation", "capteur", "entretien"],
    summary: "Un filtre poussiéreux fait chuter l'efficacité et l'eau qui stagne dans le réservoir sent mauvais. Un entretien mensuel suffit.",
    safety: "Débranchez l'appareil avant de le nettoyer.",
    tools: ["Aspirateur avec embout brosse", "Eau chaude et liquide vaisselle doux", "Vinaigre blanc (en cas d'odeur)", "Chiffon"],
    parts: ["Filtre de rechange si le vôtre n'est pas lavable"],
    sources: [
      { label: "air&me — comment entretenir son déshumidificateur", url: "https://www.airandme.fr/blog/deshumidification/comment-entretenir-son-deshumidificateur/" },
      { label: "Coolblue — comment entretenir mon déshumidificateur", url: "https://www.coolblue.be/fr/conseils/entretenir-deshumidificateur.html" }
    ],
    steps: [
      { title: "Débrancher", text: "Éteignez et débranchez l'appareil." },
      { title: "Nettoyer le préfiltre", text: "Retirez le filtre amovible (souvent derrière la grille d'entrée d'air), passez-le à l'aspirateur ou rincez-le à l'eau, puis laissez-le sécher complètement avant de le remettre.", tip: "Environ une fois par mois, plus souvent dans une pièce poussiéreuse." },
      { title: "Laver le réservoir", text: "Videz le réservoir et lavez-le à l'eau chaude avec un peu de liquide vaisselle doux. En cas d'odeur, rincez à l'eau vinaigrée." },
      { title: "Dépoussiérer grilles et capteur", text: "Passez l'aspirateur sur les grilles d'entrée et de sortie d'air et sur le capteur d'humidité : couvert de poussière, il mesure mal." },
      { title: "Remonter et remettre en route", text: "Remettez le filtre sec et le réservoir, puis rebranchez. Videz ensuite le réservoir régulièrement pour ne pas laisser l'eau stagner.", tip: "Un filtre non lavable (jetable ou à charbon) se remplace : la notice indique sa durée de vie." }
    ],
    troubleshoot: [
      "L'appareil tourne mais récupère peu d'eau : filtre encrassé, ou pièce trop froide pour certains modèles.",
      "Il s'arrête tout seul : le réservoir est plein ou mal positionné."
    ]
  },
  {
    id: "nettoyer-four",
    title: "Nettoyer son four : pyrolyse ou nettoyage à la main",
    category: "electromenager",
    devices: ["four"],
    difficulty: "Facile",
    duration: "30 min (+ cycle)",
    minutes: 30,
    savings: "≈ 30 €",
    keywords: ["four", "pyrolyse", "nettoyer four", "graisse", "vitre", "joint de porte", "bicarbonate", "odeur", "fumée", "autonettoyant", "catalyse"],
    summary: "Graisses cuites et projections finissent par fumer et sentir. La pyrolyse réduit tout en cendres ; sans pyrolyse, une pâte de bicarbonate fait le travail.",
    safety: "Travaillez four froid. Pendant une pyrolyse, la porte reste verrouillée : aérez la cuisine et éloignez enfants et animaux, les oiseaux en particulier sont sensibles aux fumées.",
    tools: ["Chiffon humide et éponge douce", "Bicarbonate de soude", "Eau savonneuse"],
    parts: [],
    sources: [
      { label: "Electrolux — utiliser le nettoyage pyrolytique de votre four", url: "https://support.electrolux.fr/support-articles/article/comment-utiliser-le-nettoyage-pyrolytique-sur-votre-four-electrolux" },
      { label: "Le Petit Savoir — comment nettoyer un four à pyrolyse", url: "https://www.lepetitsavoir.fr/articles/comment-nettoyer-un-four-a-pyrolyse" }
    ],
    steps: [
      { title: "Vider le four froid", text: "Retirez grilles, plaques et supports de grille amovibles : ils ne sont en général pas prévus pour la pyrolyse. Essuyez les gros résidus avec une éponge humide." },
      { title: "Contrôler le joint de porte", text: "Regardez le joint en caoutchouc : s'il est déchiré ou écrasé, la pyrolyse sera moins efficace. Nettoyez-le seulement à l'eau savonneuse, jamais avec un produit abrasif." },
      { title: "Lancer la pyrolyse", text: "Choisissez la durée selon l'encrassement (souvent 1 h pour un four peu sale, jusqu'à 2 h 30 à 3 h pour un four très sale). La porte se verrouille pendant le cycle. Ouvrez une fenêtre ou mettez la hotte en marche.", tip: "Pas de pyrolyse ? Étalez une pâte de bicarbonate et d'eau sur les taches, laissez agir, puis frottez à l'éponge douce et rincez." },
      { title: "Essuyer les cendres", text: "Quand le four est redevenu froid, retirez les cendres avec un chiffon humide." },
      { title: "Nettoyer les accessoires et remonter", text: "Lavez grilles et plaques à part, puis remettez-les en place." }
    ],
    troubleshoot: [
      "La porte reste verrouillée après le cycle : c'est normal tant que le four n'a pas refroidi.",
      "Des traces restent après la pyrolyse : relancez un cycle plus long ou terminez au bicarbonate.",
      "Mauvaise odeur persistante ou porte qui ferme mal : faites contrôler le four."
    ]
  },
  {
    id: "nettoyer-micro-ondes",
    title: "Nettoyer un micro-ondes avec un bol d'eau et de vinaigre",
    category: "electromenager",
    devices: ["micro-ondes"],
    difficulty: "Facile",
    duration: "15 min",
    minutes: 15,
    savings: "≈ 10 €",
    keywords: ["micro-ondes", "micro-onde", "nettoyer", "vinaigre", "citron", "odeur", "graisse", "étincelles", "plaque de mica", "plateau"],
    summary: "Un bol d'eau vinaigrée qui bout quelques minutes décolle les projections : il ne reste qu'à essuyer. Sans produit chimique.",
    safety: "Utilisez un bol compatible micro-ondes et ne faites jamais fonctionner l'appareil à vide. Le bol sort très chaud : prenez une manique.",
    tools: ["Bol compatible micro-ondes", "Vinaigre blanc", "Un citron", "Chiffon microfibre", "Manique"],
    parts: [],
    sources: [
      { label: "Murfy — nettoyer son micro-ondes sans effort ni produit chimique", url: "https://murfy.fr/blog/nettoyer-son-micro-ondes-sans-effort-ni-produit-chimique" },
      { label: "Shiva — nettoyer votre micro-ondes en 3 minutes", url: "https://www.shiva.fr/astuces-et-actualites/nettoyage-cuisine-et-salle-de-bain/comment-nettoyer-votre-micro-onde-en-trois-minutes" }
    ],
    steps: [
      { title: "Préparer le bol", text: "Remplissez un bol aux deux tiers d'eau et au tiers de vinaigre blanc, puis ajoutez le jus d'un demi-citron." },
      { title: "Faire bouillir", text: "Chauffez à pleine puissance environ 5 minutes, jusqu'à ébullition.", timer: 300 },
      { title: "Laisser agir la vapeur", text: "Laissez la porte fermée 3 à 4 minutes : la vapeur ramollit les salissures.", timer: 210 },
      { title: "Essuyer", text: "Sortez le bol avec une manique et passez un chiffon microfibre sur toutes les parois. Trempez l'éponge dans le mélange pour les taches tenaces. Lavez le plateau tournant à part." },
      { title: "Ménager la plaque de mica", text: "La petite plaque cartonnée sur une paroi protège le guide d'ondes : essuyez-la avec un chiffon à peine humide, sans la détremper." }
    ],
    troubleshoot: [
      "Des étincelles apparaissent : plaque de mica abîmée ou encrassée, ou objet métallique à l'intérieur. Arrêtez l'appareil ; la plaque de mica se remplace facilement.",
      "L'odeur persiste : recommencez avec plus de citron."
    ]
  },
  {
    id: "nettoyer-plaque-vitroceramique",
    title: "Nettoyer une plaque vitrocéramique ou à induction",
    category: "electromenager",
    devices: ["plaque-de-cuisson"],
    difficulty: "Facile",
    duration: "10 min",
    minutes: 10,
    savings: "≈ 20 €",
    keywords: ["plaque", "vitrocéramique", "induction", "taches", "brûlé", "grattoir", "calcaire", "rayures", "sucre", "vinaigre", "bicarbonate"],
    summary: "Un grattoir bien tenu, un nettoyant adapté et un coup de vinaigre pour le calcaire : la plaque retrouve son éclat sans une rayure.",
    safety: "Attendez que la plaque refroidisse et vérifiez que tous les foyers sont éteints. La lame du grattoir coupe : manipulez-la avec soin.",
    tools: ["Grattoir à lame pour vitrocéramique", "Éponge non abrasive", "Nettoyant pour vitrocéramique", "Vinaigre blanc", "Chiffon microfibre"],
    parts: [],
    sources: [
      { label: "BUT — nettoyer une plaque vitrocéramique ou à induction", url: "https://blog.but.fr/article/comment-nettoyer-une-plaque-vitroceramique-ou-a-induction/" },
      { label: "BUT — utiliser un grattoir pour vitrocéramique sans danger", url: "https://blog.but.fr/article/comment-utiliser-un-grattoir-pour-vitroceramique-sans-danger/" }
    ],
    steps: [
      { title: "Essuyer après chaque cuisson", text: "Une tache fraîche part d'un coup d'éponge douce à l'eau chaude. C'est le meilleur entretien." },
      { title: "Gratter les résidus cuits", text: "Humidifiez la zone, puis passez le grattoir presque à plat (environ 45°), en un seul geste glissé, sans à-coups. Il retire le brûlé sans rayer le verre." },
      { title: "Appliquer un nettoyant adapté", text: "Laissez agir quelques minutes un nettoyant pour vitrocéramique, frottez à l'éponge non abrasive, puis essuyez." },
      { title: "Dissoudre le calcaire", text: "Pour les auréoles blanches, imbibez un chiffon de vinaigre blanc, laissez agir une trentaine de minutes, puis rincez et séchez." },
      { title: "Finir au chiffon sec", text: "Lustrez avec un chiffon microfibre sec pour éviter les traces." }
    ],
    troubleshoot: [
      "Éponge grattoir, paille de fer ou poudre à récurer : à bannir, ils rayent définitivement le verre.",
      "Le verre est fêlé : n'utilisez plus la plaque et coupez son disjoncteur, le remplacement du verre est une affaire de professionnel."
    ]
  },
  {
    id: "nettoyer-grille-pain",
    title: "Grille-pain : retirer les miettes en toute sécurité",
    category: "electromenager",
    devices: ["grille-pain"],
    difficulty: "Facile",
    duration: "5 min",
    minutes: 5,
    savings: "≈ 25 €",
    keywords: ["grille-pain", "toaster", "miettes", "tiroir à miettes", "odeur de brûlé", "fumée", "incendie", "nettoyer"],
    summary: "Les miettes qui s'accumulent au fond chauffent, carbonisent et peuvent s'enflammer. Vider le tiroir à miettes après usage suffit à l'éviter.",
    safety: "Débranchez le grille-pain et laissez-le refroidir. N'introduisez jamais de couteau ou de fourchette dans les fentes : risque d'électrocution.",
    tools: ["Pinceau à pâtisserie souple", "Chiffon humide"],
    parts: [],
    sources: [
      { label: "L'essentiel — retirer les miettes d'un grille-pain sans l'endommager", url: "https://www.lessentiel.lu/fr/story/entretien-comment-retirer-les-miettes-d-un-grille-pain-103638057" },
      { label: "20 minutes — comment retirer les miettes d'un grille-pain", url: "https://www.20min.ch/fr/story/entretien-comment-retirer-les-miettes-d-un-grille-pain-103637751" }
    ],
    steps: [
      { title: "Débrancher et laisser refroidir", text: "Retirez la prise et attendez que l'appareil soit froid." },
      { title: "Vider le tiroir à miettes", text: "Sortez le tiroir situé en bas de l'appareil, videz-le, essuyez-le et remettez-le bien sec.", tip: "Le mieux est de le vider après chaque utilisation." },
      { title: "Déloger les miettes restantes", text: "Retournez doucement le grille-pain au-dessus de l'évier et passez un pinceau souple dans les fentes. Ne le secouez pas fort : des miettes pourraient se coincer entre les résistances." },
      { title: "Nettoyer l'extérieur", text: "Essuyez la coque avec un chiffon humide et une goutte de liquide vaisselle. Jamais d'eau à l'intérieur." }
    ],
    troubleshoot: [
      "Une tranche reste coincée : débranchez d'abord, laissez refroidir, puis retirez-la avec une pince en bois.",
      "Le grille-pain ne reste plus enclenché : souvent un défaut du mécanisme ou de l'électroaimant, à faire réparer."
    ]
  },
  {
    id: "joint-cocotte-minute",
    title: "Cocotte-minute : entretenir le joint et les soupapes",
    category: "electromenager",
    devices: ["cocotte"],
    difficulty: "Facile",
    duration: "10 min",
    minutes: 10,
    savings: "≈ 60 €",
    keywords: ["cocotte-minute", "autocuiseur", "seb", "joint", "soupape", "fuite de vapeur", "ne monte pas en pression", "couvercle", "entretien"],
    summary: "Un joint usé laisse fuir la vapeur et la cocotte ne monte plus en pression. Le joint se change chaque année, et les soupapes se vérifient avant chaque cuisson.",
    safety: "N'ouvrez jamais une cocotte encore sous pression, et ne forcez jamais sur le couvercle. N'utilisez que des pièces d'origine.",
    tools: ["Éponge et liquide vaisselle", "Une aiguille pour déboucher le conduit de vapeur"],
    parts: ["Joint de rechange adapté au modèle et au diamètre"],
    sources: [
      { label: "SEB — mode d'emploi et questions fréquentes Clipso Minut Eco", url: "https://www.seb.fr/notices/csp/1510001855" },
      { label: "Spareka — joint de cocotte-minute Seb : entretien et remplacement", url: "https://aide.spareka.fr/choisir-joint-cocotte-minute/" }
    ],
    steps: [
      { title: "Laver le joint après chaque cuisson", text: "Retirez le joint et nettoyez-le avec son logement à l'éponge et au liquide vaisselle. Ne mettez jamais le joint au lave-vaisselle." },
      { title: "Vérifier les soupapes", text: "Avant chaque utilisation, vérifiez que les soupapes ne sont pas obstruées et que la soupape de fonctionnement bouge librement. Si le conduit de vapeur est bouché, retirez les dépôts avec une aiguille." },
      { title: "Changer le joint chaque année", text: "Remplacez le joint tous les ans, plus tôt s'il est durci, fissuré ou déformé. Choisissez le joint correspondant au modèle et au diamètre de la cuve." },
      { title: "Bien ranger", text: "Posez le couvercle retourné sur la cuve : le joint ne s'écrase pas entre deux utilisations." }
    ],
    troubleshoot: [
      "De la vapeur fuit autour du couvercle : joint usé ou mal placé, ou bord de cuve abîmé.",
      "La soupape de sécurité se déclenche : la soupape de fonctionnement est probablement bouchée. Arrêtez la cuisson et nettoyez-la.",
      "Le couvercle ne se ferme plus : joint neuf trop sec, humidifiez-le légèrement."
    ]
  },
  {
    id: "entretien-friteuse",
    title: "Friteuse : changer l'huile et entretenir les filtres",
    category: "electromenager",
    devices: ["friteuse"],
    difficulty: "Facile",
    duration: "30 min",
    minutes: 30,
    savings: "≈ 20 €",
    keywords: ["friteuse", "huile", "changer l'huile", "filtre", "charbon", "odeur", "fumée", "claquements", "cuve", "seb"],
    summary: "Une huile trop vieille fume, sent mauvais et donne des fritures moins bonnes. SEB conseille de la changer au plus tard toutes les 10 utilisations, 5 pour le tournesol et l'arachide.",
    safety: "Attendez que l'huile soit complètement froide avant de la filtrer ou de la vider : de l'huile chaude brûle gravement. Débranchez la friteuse.",
    tools: ["Filtre papier, tamis ou écumoire", "Récipient refermable pour l'huile usagée", "Papier absorbant", "Éponge non abrasive"],
    parts: ["Filtre anti-odeur de rechange (selon le modèle)"],
    sources: [
      { label: "SEB — mode d'emploi et questions fréquentes Filtra One", url: "https://www.seb.fr/notices/csp/7211000829" },
      { label: "SEB — questions fréquentes Oleoclean Pro", url: "https://www.seb.fr/notices/csp/7211001578" }
    ],
    steps: [
      { title: "Filtrer après chaque utilisation", text: "Une fois l'huile refroidie, filtrez-la avec un filtre papier, un tamis ou une écumoire : les résidus accélèrent sa dégradation." },
      { title: "Changer l'huile à temps", text: "Au plus tard après 10 utilisations ; après 5 pour les huiles de tournesol et d'arachide. Plus souvent si vous faites frire poisson, fruits de mer ou beignets." },
      { title: "Vider et nettoyer la cuve", text: "Cuve amovible : lavez-la à l'eau chaude savonneuse et séchez-la. Cuve fixe : essuyez l'huile au papier absorbant, puis nettoyez à l'eau savonneuse sans jamais mouiller la partie électrique." },
      { title: "Remplacer les filtres", text: "Filtre métallique au charbon actif : après 35 à 50 fritures selon le modèle. Filtre en mousse : toutes les 20 fritures." },
      { title: "Jeter l'huile usagée", text: "Versez-la dans un récipient fermé et déposez-la en déchetterie. Jamais dans l'évier." }
    ],
    troubleshoot: [
      "De petits claquements pendant la chauffe : il y a de l'eau dans le bain, changez l'huile.",
      "L'huile fume à température normale : elle est usée."
    ]
  },
  {
    id: "nettoyer-robot-mixeur",
    title: "Nettoyer un robot de cuisine ou un blender sans se couper",
    category: "electromenager",
    devices: ["robot-de-cuisine"],
    difficulty: "Facile",
    duration: "10 min",
    minutes: 10,
    savings: "≈ 15 €",
    keywords: ["robot", "mixeur", "blender", "hachoir", "bol", "lames", "nettoyer", "odeur", "bol opaque", "moteur"],
    summary: "Un peu d'eau chaude savonneuse qu'on fait tourner dans le bol nettoie les lames sans y mettre les doigts. Le bloc moteur, lui, ne va jamais sous l'eau.",
    safety: "Débranchez l'appareil avant de démonter les lames. Ne plongez jamais le bloc moteur dans l'eau.",
    tools: ["Liquide vaisselle", "Éponge douce", "Bicarbonate de soude (bol terne)", "Chiffon doux"],
    parts: [],
    sources: [
      { label: "Allo Réparateurs — comment bien nettoyer son mixeur", url: "https://www.allo-reparateurs.fr/electromenager/petit-electromenager/petit-electromenager-cuisine/robot-de-cuisine/depannage-electromenager,comment-bien-nettoyer-son-mixeur,2036.html" },
      { label: "Matériel Horeca — comment laver un blender mixeur", url: "https://www.materiel-horeca.com/guide/comment-laver-un-blender-mixeur/" }
    ],
    steps: [
      { title: "Faire tourner de l'eau savonneuse", text: "Juste après usage, versez de l'eau tiède et quelques gouttes de liquide vaisselle dans le bol, fermez et faites tourner une trentaine de secondes. Videz et rincez." },
      { title: "Débrancher et démonter", text: "Débranchez, puis démontez bol, couvercle et lames. Lavez-les à l'eau chaude savonneuse en tenant les lames par leur support." },
      { title: "Vérifier le lave-vaisselle", text: "Ne passez au lave-vaisselle que les pièces que la notice autorise." },
      { title: "Essuyer le bloc moteur", text: "Passez un chiffon doux légèrement humide et savonneux, puis séchez. Jamais sous le robinet." },
      { title: "Raviver un bol terne", text: "Remplissez le bol d'eau chaude avec deux cuillerées de bicarbonate, faites tourner 30 secondes, puis lavez normalement." }
    ],
    troubleshoot: [
      "Le robot ne démarre pas : bol ou couvercle mal verrouillé, la sécurité bloque le moteur.",
      "Odeur de chaud : laissez refroidir le moteur, il est peut-être en surchauffe après un usage prolongé."
    ]
  },
  {
    id: "entretien-machine-a-pain",
    title: "Machine à pain : entretenir la cuve et le pétrin",
    category: "electromenager",
    devices: ["machine-a-pain"],
    difficulty: "Facile",
    duration: "15 min",
    minutes: 15,
    savings: "≈ 40 €",
    keywords: ["machine à pain", "cuve", "pétrin", "pale", "couteau pétrisseur", "antiadhésif", "grince", "bruit", "pâte collée"],
    summary: "Le revêtement antiadhésif de la cuve est fragile. Un nettoyage doux, un trempage pour la pâte collée et une goutte d'huile sur l'axe prolongent sa vie.",
    safety: "Débranchez la machine et laissez refroidir la cuve avant de la manipuler.",
    tools: ["Spatule plate et souple", "Éponge douce", "Huile végétale"],
    parts: ["Cuve et pale de rechange, si l'axe grince toujours"],
    sources: [
      { label: "NPM Lille — entretien d'une machine à pain", url: "https://www.npm.fr/petit-menager-a-11/conseils-d-entretien-petit-menager-b-451/entretien-d-une-machine-a-pain-c-57441" },
      { label: "Spareka — remplacer la cuve et la lame de pétrissage", url: "https://www.spareka.fr/comment-reparer/electromenager/machine-a-pain/comment-remplacer-la-cuve-et-la-lame-de-petrissage-d-une-machine-a-pain" }
    ],
    steps: [
      { title: "Démouler sans abîmer", text: "Utilisez une spatule plate et souple, jamais d'ustensile pointu ou métallique qui rayerait le revêtement." },
      { title: "Faire tremper", text: "Si de la pâte reste collée, laissez tremper la cuve et la pale dans de l'eau tiède : les résidus se décollent seuls." },
      { title: "Laver en douceur", text: "Éponge douce et eau suffisent. Évitez les produits agressifs, qui abîment le revêtement et peuvent donner un goût au pain." },
      { title: "Lubrifier l'axe", text: "Si la machine grince pendant le pétrissage, mettez une goutte d'huile végétale sur l'axe de la pale." }
    ],
    troubleshoot: [
      "Le bruit continue malgré l'huile : le roulement de la cuve est usé. Changez la cuve pour éviter que le moteur ne force.",
      "La pale ne tourne plus mais le moteur tourne : la courroie ou l'entraînement de la cuve est en cause."
    ]
  },
  {
    id: "nettoyer-extracteur-de-jus",
    title: "Nettoyer un extracteur de jus et son tamis",
    category: "electromenager",
    devices: ["extracteur-de-jus"],
    difficulty: "Facile",
    duration: "10 min",
    minutes: 10,
    savings: "≈ 30 €",
    keywords: ["extracteur de jus", "centrifugeuse", "tamis", "filtre", "pulpe", "brosse", "taches", "curcuma", "carotte", "vis"],
    summary: "La pulpe qui sèche dans les mailles du tamis se retire très mal et finit par l'abîmer. Rincer tout de suite après le jus règle le problème.",
    safety: "Débranchez l'appareil avant de le démonter. Le bloc moteur ne doit jamais toucher l'eau.",
    tools: ["Brosse fournie ou brosse souple", "Liquide vaisselle", "Vinaigre blanc (taches)"],
    parts: [],
    sources: [
      { label: "Ctendance — nettoyer un extracteur de jus", url: "https://www.ctendance.fr/entretien/nettoyer-extracteur-de-jus/" },
      { label: "Darty — conseils pour nettoyer sa machine à jus", url: "https://www.darty.com/darty-et-vous/cuisine/equipement/petit-electromenager/nos-conseils-pour-nettoyer-sa-machine-jus" }
    ],
    steps: [
      { title: "Nettoyer tout de suite", text: "Dès le jus terminé, débranchez et démontez les pièces amovibles : la pulpe sèche très vite." },
      { title: "Rincer", text: "Passez chaque pièce sous l'eau courante." },
      { title: "Brosser le tamis", text: "Frottez les mailles du tamis avec la brosse fournie, doucement pour ne pas les déformer. Une vieille brosse à dents aide dans les recoins." },
      { title: "Laver et sécher", text: "Lavez au liquide vaisselle, rincez et laissez sécher. Vérifiez dans la notice quelles pièces passent au lave-vaisselle." },
      { title: "Essuyer le bloc moteur", text: "Un chiffon humide suffit." }
    ],
    troubleshoot: [
      "Pièces colorées (curcuma, carotte) : laissez-les tremper une nuit dans du vinaigre blanc, puis frottez.",
      "Le jus contient beaucoup de pulpe : tamis colmaté ou mal monté."
    ]
  },
  {
    id: "nettoyer-appareil-raclette",
    title: "Nettoyer un appareil à raclette ou un grill",
    category: "electromenager",
    devices: ["raclette-grill"],
    difficulty: "Facile",
    duration: "15 min (+ 1 h de pose)",
    minutes: 15,
    savings: "≈ 20 €",
    keywords: ["raclette", "pierrade", "grill", "plancha", "croque-monsieur", "gaufrier", "coupelles", "fromage brûlé", "antiadhésif", "bicarbonate"],
    summary: "Le fromage cuit colle aux plaques et aux coupelles. Une pâte de bicarbonate le décolle sans rayer le revêtement antiadhésif.",
    safety: "Débranchez l'appareil et laissez-le refroidir complètement. N'immergez jamais la base électrique.",
    tools: ["Bicarbonate de soude", "Chiffon microfibre", "Éponge douce", "Vinaigre blanc"],
    parts: [],
    sources: [
      { label: "Matériel Horeca — nettoyer un appareil à raclette en 3 étapes", url: "https://www.materiel-horeca.com/guide/comment-nettoyer-un-appareil-a-raclette-3-etapes-a-suivre/" },
      { label: "Le Bicarbonate La Baleine — nettoyer votre appareil à raclette", url: "https://www.le-bicarbonate.com/nettoyer-votre-appareil-raclette" }
    ],
    steps: [
      { title: "Faire fondre les restes", text: "En fin de repas, laissez chauffer quelques minutes pour ramollir le fromage, puis débranchez et laissez refroidir complètement." },
      { title: "Appliquer une pâte de bicarbonate", text: "Mélangez deux doses de bicarbonate pour une dose d'eau, étalez sur la plaque froide et laissez poser une heure.", timer: 3600 },
      { title: "Essuyer", text: "Retirez la pâte avec un chiffon microfibre, puis passez un chiffon imbibé de vinaigre blanc contre les odeurs." },
      { title: "Faire tremper les coupelles", text: "Laissez-les une heure dans l'eau chaude additionnée de bicarbonate, puis lavez-les à l'éponge douce et au liquide vaisselle." },
      { title: "Essuyer la base", text: "Un chiffon humide sur la base, sans jamais la plonger dans l'eau. Plaques et coupelles passent parfois au lave-vaisselle : vérifiez la notice." }
    ],
    troubleshoot: [
      "Poudre à récurer et éponge grattoir sont à éviter : elles détruisent le revêtement antiadhésif.",
      "L'appareil ne chauffe plus : vérifiez le cordon et le bouton ; sinon la résistance ou le thermostat est en cause."
    ]
  },
  {
    id: "entretien-yaourtiere",
    title: "Yaourtière : nettoyage et yaourts trop liquides",
    category: "electromenager",
    devices: ["yaourtiere"],
    difficulty: "Facile",
    duration: "10 min",
    minutes: 10,
    savings: "≈ 15 €",
    keywords: ["yaourtière", "yaourts", "pots", "yaourt liquide", "ferment", "nettoyer", "multi délices"],
    summary: "Des pots mal rincés et une yaourtière qu'on bouge pendant la fermentation donnent des yaourts liquides. Entretien et astuces pour des yaourts fermes.",
    safety: "Débranchez l'appareil avant de le nettoyer et ne mettez jamais sa base dans l'eau.",
    tools: ["Chiffon humide", "Eau chaude savonneuse"],
    parts: [],
    sources: [
      { label: "SEB — mode d'emploi et questions fréquentes La Yaourtière 8 pots", url: "https://www.seb.fr/notices/Produits/Cuisson-%C3%A9lectrique/Yaourti%C3%A8re/La-Yaourti%C3%A8re-8-pots/csp/1500887221" },
      { label: "Yaourt Maison — nettoyer et entretenir sa yaourtière", url: "https://www.yaourtmaison.fr/guides/conseils-astuces-nettoyage-yaourrtiere.html" }
    ],
    steps: [
      { title: "Nettoyer la base", text: "Débranchez-la, puis essuyez-la avec un chiffon humide, de l'eau chaude et du savon. Jamais sous l'eau." },
      { title: "Laver les pots", text: "Pots et couvercles passent au lave-vaisselle sur la plupart des modèles." },
      { title: "Rincer à fond", text: "Rincez bien les pots : un reste de produit vaisselle empêche les yaourts de prendre." },
      { title: "Soigner la fermentation", text: "Lait et ferment à température ambiante, yaourtière posée sur un support stable et immobile (pas sur le réfrigérateur qui vibre), ferment frais." }
    ],
    troubleshoot: [
      "Yaourts liquides : ajoutez un peu de lait en poudre, allongez le temps de fermentation ou changez de ferment.",
      "Yaourts aux fruits qui ne prennent pas : faites d'abord cuire les fruits, leur acidité gêne la fermentation."
    ]
  },
  {
    id: "nettoyer-trancheuse",
    title: "Nettoyer une trancheuse électrique sans se couper",
    category: "electromenager",
    devices: ["trancheuse"],
    difficulty: "Moyen",
    duration: "15 min",
    minutes: 15,
    savings: "≈ 30 €",
    keywords: ["trancheuse", "trancheuse à jambon", "couteau électrique", "lame", "nettoyer", "gants anti-coupure", "chariot", "hygiène"],
    summary: "Les résidus de charcuterie sur la lame sont un nid à bactéries. Un nettoyage après chaque usage, lame à zéro et gants aux mains.",
    safety: "Débranchez la trancheuse et mettez le réglage d'épaisseur sur 0 : la lame est alors protégée. Portez des gants anti-coupure. N'immergez jamais l'appareil.",
    tools: ["Gants anti-coupure", "Chiffon doux", "Eau savonneuse ou nettoyant pour inox non abrasif", "Quelques gouttes d'huile"],
    parts: [],
    sources: [
      { label: "Matériel Horeca — avec quel produit nettoyer une trancheuse à jambon", url: "https://www.materiel-horeca.com/guide/avec-quel-produit-nettoyer-une-trancheuse-a-jambon/" },
      { label: "Matériel Horeca — comment nettoyer une trancheuse", url: "https://www.materiel-horeca.com/guide/comment-nettoyer-une-trancheuse-professionnelle/" }
    ],
    steps: [
      { title: "Sécuriser", text: "Débranchez, réglez l'épaisseur sur 0 et enfilez les gants anti-coupure." },
      { title: "Retirer les pièces amovibles", text: "Démontez le chariot ou plateau (souvent retenu par une molette) et les protections prévues pour être retirées." },
      { title: "Nettoyer la lame", text: "Avec un chiffon et de l'eau savonneuse, essuyez la lame du centre vers l'extérieur, jamais en travers du tranchant." },
      { title: "Nettoyer le reste", text: "Essuyez le bâti au chiffon savonneux, rincez au chiffon humide et séchez bien." },
      { title: "Lubrifier et remonter", text: "Mettez quelques gouttes d'huile sur les barres de glissement du chariot, puis remontez." }
    ],
    troubleshoot: [
      "La coupe devient déchirée : la lame est émoussée, faites-la affûter ou remplacez-la.",
      "Le chariot accroche : nettoyez et huilez ses barres de glissement."
    ]
  },
  {
    id: "nettoyer-machine-a-glacons",
    title: "Nettoyer et détartrer une machine à glaçons",
    category: "electromenager",
    devices: ["machine-a-glacons"],
    difficulty: "Facile",
    duration: "30 min",
    minutes: 30,
    savings: "≈ 30 €",
    keywords: ["machine à glaçons", "glaçons", "calcaire", "détartrer", "vinaigre", "goût", "odeur", "réservoir"],
    summary: "L'eau stagnante et le calcaire donnent un goût aux glaçons et encrassent la machine. Un nettoyage au vinaigre blanc suivi de rinçages règle le problème.",
    safety: "Débranchez la machine avant de la nettoyer et rincez abondamment : les premiers glaçons après nettoyage sont à jeter.",
    tools: ["Vinaigre blanc", "Éponge douce", "Chiffon sec"],
    parts: [],
    sources: [
      { label: "Iceshop — comment nettoyer une machine à glaçons", url: "https://www.iceshop.fr/guide/comment-nettoyer-une-machine-a-glacons/" },
      { label: "Darty — nettoyer et détartrer sa machine à glaçons", url: "https://www.darty.com/darty-et-vous/cuisine/equipement/froid/comment-nettoyer-et-detartrer-sa-machine-glacons" }
    ],
    steps: [
      { title: "Débrancher et vider", text: "Débranchez, retirez les glaçons et videz l'eau du réservoir." },
      { title: "Frotter au vinaigre", text: "Nettoyez l'intérieur avec une éponge humide imbibée de quelques cuillerées de vinaigre blanc, en insistant sur les dépôts blancs." },
      { title: "Lancer un cycle de nettoyage", text: "Si la machine a un programme de nettoyage, lancez-le avec de l'eau vinaigrée selon la notice." },
      { title: "Rincer", text: "Rincez plusieurs fois à l'eau claire, puis faites deux cycles de glaçons que vous jetterez." },
      { title: "Sécher et redémarrer", text: "Séchez le bac à glaçons et laissez sécher une dizaine de minutes avant de relancer.", tip: "Ne laissez pas l'eau stagner si la machine ne sert pas : videz-la." }
    ],
    troubleshoot: [
      "Les glaçons ont un goût : eau restée trop longtemps, nettoyez et changez l'eau.",
      "La machine ne produit plus : calcaire sur le capteur ou l'évaporateur, détartrez ; sinon capteur ou pompe à vérifier."
    ]
  },
  {
    id: "nettoyer-tireuse-a-biere",
    title: "Nettoyer une tireuse à bière à chaque changement de fût",
    category: "electromenager",
    devices: ["tireuse-a-biere"],
    difficulty: "Facile",
    duration: "15 min",
    minutes: 15,
    savings: "≈ 20 €",
    keywords: ["tireuse à bière", "perfectdraft", "beertender", "fût", "tube de tirage", "robinet", "mousse", "goût", "égouttoir"],
    summary: "Des résidus de bière dans le robinet donnent un mauvais goût et trop de mousse. On nettoie les pièces de tirage à chaque changement de fût.",
    safety: "Débranchez la tireuse avant de la nettoyer.",
    tools: ["Eau chaude et un peu de liquide vaisselle", "Chiffon humide", "Torchon propre"],
    parts: ["Tube de tirage neuf (à usage unique sur certains modèles, dont PerfectDraft)"],
    sources: [
      { label: "PerfectDraft — nettoyer les pièces de la tireuse", url: "https://www.perfectdraft.com/fr-fr/blog/post/comment-nettoyer-pieces-tireuse-biere-perfectdraft" },
      { label: "PerfectDraft — nettoyer et entretenir ma tireuse", url: "https://support.perfectdraft.com/hc/fr/articles/5555637974175-Comment-nettoyer-et-entretenir-ma-tireuse-PerfectDraft" }
    ],
    steps: [
      { title: "Débrancher", text: "Débranchez la tireuse et retirez le fût vide." },
      { title: "Nettoyer le robinet", text: "Démontez la poignée du robinet et rincez les pièces à l'eau chaude, avec un peu de liquide vaisselle si besoin. Le robinet ne va pas au lave-vaisselle." },
      { title: "Changer le tube de tirage", text: "Sur les modèles où il est à usage unique, installez le tube neuf fourni avec le fût." },
      { title: "Laver bec et égouttoir", text: "Lavez-les à l'eau chaude savonneuse ou au lave-vaisselle, et videz l'égouttoir chaque jour d'utilisation." },
      { title: "Essuyer l'extérieur", text: "Un chiffon humide, sans produit abrasif, acide ni détartrant." }
    ],
    troubleshoot: [
      "Trop de mousse : fût pas assez froid, ou robinet mal rincé.",
      "De l'eau sous la tireuse : c'est souvent de la condensation, pas une fuite. Videz l'égouttoir."
    ]
  },
  {
    id: "cartouche-carafe-filtrante",
    title: "Carafe filtrante : changer et préparer la cartouche",
    category: "electromenager",
    devices: ["carafe-filtrante"],
    difficulty: "Facile",
    duration: "10 min",
    minutes: 10,
    savings: "≈ 10 €",
    keywords: ["carafe filtrante", "brita", "cartouche", "filtre", "maxtra", "eau", "calcaire", "goût", "4 semaines"],
    summary: "Une cartouche usée ne filtre plus. Elle se change au moins toutes les quatre semaines, après une courte préparation.",
    safety: "Gardez l'eau filtrée au frais, à l'abri du soleil, et buvez-la dans la journée.",
    tools: ["Un récipient d'eau froide"],
    parts: ["Cartouche filtrante compatible"],
    sources: [
      { label: "BRITA — FAQ filtres et cartouches", url: "https://www.brita.fr/faq/filtres-cartouches?sc=general" },
      { label: "BRITA — FAQ filtres et cartouches filtrantes", url: "https://www.brita.fr/pages/faq-filtres-cartouches" }
    ],
    steps: [
      { title: "Tremper la cartouche neuve", text: "Plongez-la dans un récipient d'eau froide et secouez-la doucement pour chasser les bulles d'air." },
      { title: "La mettre en place", text: "Insérez-la dans l'entonnoir de la carafe jusqu'au clic." },
      { title: "Jeter les deux premières filtrations", text: "Remplissez et laissez filtrer deux fois : cette eau peut arroser les plantes." },
      { title: "Noter la date", text: "Changez la cartouche au moins toutes les quatre semaines, plus tôt si l'eau est très calcaire ou si vous consommez beaucoup.", tip: "Le carnet d'entretien vous le rappellera." },
      { title: "Laver la carafe", text: "Lavez régulièrement la carafe et l'entonnoir à l'eau et au liquide vaisselle doux." }
    ],
    troubleshoot: [
      "L'eau filtre très lentement : bulles d'air dans la cartouche, retrempez-la.",
      "Des particules noires dans l'eau : des grains de charbon actif, sans danger ; rincez la cartouche."
    ]
  },
  {
    id: "debloquer-broyeur-evier",
    title: "Broyeur sous évier bloqué : le débloquer et l'entretenir",
    category: "electromenager",
    devices: ["broyeur"],
    difficulty: "Facile",
    duration: "15 min",
    minutes: 15,
    savings: "≈ 120 €",
    keywords: ["broyeur", "broyeur sous évier", "insinkerator", "bloqué", "ronronne", "ne tourne plus", "clé de déblocage", "reset", "odeur", "évier"],
    summary: "Le moteur ronronne mais rien ne tourne ? Une clé de déblocage glissée sous l'appareil et le bouton de réarmement suffisent souvent. Et un entretien hebdomadaire évite de recommencer.",
    safety: "Coupez l'alimentation du broyeur avant toute intervention. Ne mettez jamais la main dans le broyeur : utilisez une pince pour retirer un objet.",
    tools: ["Clé de déblocage fournie ou clé Allen adaptée", "Pince longue", "Lampe de poche", "Glaçons et gros sel"],
    parts: [],
    sources: [
      { label: "MonBroyeur (distributeur InSinkErator) — FAQ des broyeurs", url: "https://monbroyeur.com/content/18-faq-insinkerator" },
      { label: "MonBroyeur — entretenir votre broyeur InSinkErator", url: "https://monbroyeur.com/blog/post/comment-entretenir-votre-broyeur-de-dechets-pour-evier-insinkerator" }
    ],
    steps: [
      { title: "Couper l'alimentation", text: "Débranchez le broyeur ou coupez son disjoncteur." },
      { title: "Retirer ce qui bloque", text: "À la lampe, regardez dans la chambre de broyage et retirez à la pince tout objet tombé dedans (couvert, noyau, capsule)." },
      { title: "Débloquer le disque", text: "Insérez la clé dans l'empreinte au centre, sous l'appareil. Tournez-la dans un sens puis dans l'autre jusqu'à ce qu'elle fasse un tour complet librement." },
      { title: "Réarmer", text: "Retirez la clé, appuyez sur le bouton de réarmement sous le broyeur, puis remettez le courant et testez avec l'eau froide qui coule." },
      { title: "Entretenir chaque semaine", text: "Versez une douzaine de glaçons et une poignée de gros sel, puis faites tourner 30 secondes avec l'eau froide.", tip: "Faites toujours couler l'eau froide avant, pendant et 15 secondes après le broyage : elle fige les graisses." }
    ],
    troubleshoot: [
      "À ne pas mettre : huile et graisses de cuisson, objets non alimentaires, grandes quantités de coquilles d'œuf.",
      "Mauvaise odeur : broyez quelques quartiers de citron avec l'eau froide.",
      "Rien ne se passe, pas même un bruit : vérifiez l'alimentation et l'interrupteur (souvent pneumatique, sur le bord de l'évier)."
    ]
  },
  {
    id: "nettoyer-filtre-seche-cheveux",
    title: "Sèche-cheveux qui chauffe trop ou se coupe : nettoyer le filtre",
    category: "electromenager",
    devices: ["seche-cheveux"],
    difficulty: "Facile",
    duration: "5 min",
    minutes: 5,
    savings: "≈ 30 €",
    keywords: ["sèche-cheveux", "séchoir", "filtre", "grille arrière", "surchauffe", "se coupe", "s'arrête", "odeur de brûlé", "cheveux", "poussière"],
    summary: "Un filtre bouché par les cheveux et la poussière empêche l'air d'entrer : l'appareil surchauffe et sa sécurité le coupe. Le nettoyer prend cinq minutes.",
    safety: "Débranchez l'appareil et laissez-le refroidir. Des étincelles, un fil abîmé ou un bruit anormal : ne l'utilisez plus et faites-le réparer.",
    tools: ["Brosse souple et sèche (une vieille brosse à dents convient)", "Chiffon doux"],
    parts: ["Grille arrière de rechange si elle est abîmée"],
    sources: [
      { label: "Coiffea — comment entretenir son sèche-cheveux", url: "https://www.coiffea.com/blog/comment-entretenir-son-seche-cheveux" },
      { label: "Protégez-Vous — utiliser et nettoyer votre séchoir à cheveux", url: "https://www.protegez-vous.ca/habitation/entretien-sechoir-cheveux" }
    ],
    steps: [
      { title: "Débrancher et laisser refroidir", text: "Attendez que l'appareil soit froid." },
      { title: "Retirer le filtre arrière", text: "Tournez ou déclipsez la grille à l'arrière, là où l'air est aspiré, et sortez le filtre." },
      { title: "Brosser", text: "Retirez cheveux et poussière avec une brosse souple et sèche, sur les deux faces du filtre et sur la grille." },
      { title: "Remonter", text: "Remettez le filtre et la grille bien en place avant de rebrancher.", tip: "Environ une fois par mois ; toutes les semaines en usage quotidien intensif." },
      { title: "Bien ranger", text: "Laissez refroidir avant de ranger et n'enroulez pas le cordon serré autour de l'appareil : cela abîme le fil." }
    ],
    troubleshoot: [
      "Il se coupe tout seul puis repart après refroidissement : c'est la sécurité thermique. Nettoyez le filtre.",
      "Il souffle mais ne chauffe plus : la résistance ou le thermostat est en cause, réparation à confier."
    ]
  },
  {
    id: "entretien-rasoir-electrique",
    title: "Rasoir électrique : nettoyer, lubrifier et changer les têtes",
    category: "electromenager",
    devices: ["rasoir"],
    difficulty: "Facile",
    duration: "10 min",
    minutes: 10,
    savings: "≈ 40 €",
    keywords: ["rasoir électrique", "rasoir", "philips", "braun", "têtes", "grille", "lames", "irritation", "tire les poils", "lubrifier", "tondeuse"],
    summary: "Des poils coincés et des lames sèches font tirer le rasoir et irritent la peau. Un nettoyage régulier, une goutte d'huile et des têtes neuves en temps voulu.",
    safety: "Éteignez le rasoir et débranchez-le. Ne rincez sous l'eau que si le rasoir est indiqué étanche.",
    tools: ["Brosse fournie", "Chiffon propre", "Huile pour rasoir (ou huile minérale)"],
    parts: ["Têtes ou cassette de rechange de la même série"],
    sources: [
      { label: "Philips — guide du nettoyage pour rasoir électrique", url: "https://www.philips.fr/c-e/soins-pour-homme/rasage/astuces-rasage/guide-du-nettoyage-pour-rasoir-electrique.html" },
      { label: "Braun — nettoyer et entretenir votre rasoir", url: "https://fr.braun.com/fr-fr/male-grooming/face-shaving-tips/how-to-clean-and-look-after-your-shaver" }
    ],
    steps: [
      { title: "Ouvrir les têtes", text: "Suivez la notice pour ouvrir ou retirer l'unité de rasage." },
      { title: "Chasser les poils", text: "Brossez ou soufflez les poils coincés entre les lames. Évitez de frotter la grille fine avec la brosse : elle est fragile." },
      { title: "Rincer si le rasoir est étanche", text: "Rincez sous l'eau tiède, avec une solution de nettoyage si vous en avez une, puis laissez sécher à l'air ou au chiffon propre." },
      { title: "Lubrifier", text: "Déposez une ou deux gouttes d'huile sur les lames, puis faites tourner le rasoir quelques secondes pour la répartir." },
      { title: "Changer les têtes à temps", text: "Quand le rasage devient moins précis ou irritant, remplacez les têtes par celles de la même série (la référence figure sur l'ancienne unité ou dans la notice)." }
    ],
    troubleshoot: [
      "Le rasoir tire les poils : lames émoussées ou encrassées.",
      "L'autonomie chute : la batterie vieillit ; sur beaucoup de modèles elle se remplace en atelier."
    ]
  },
  {
    id: "entretien-brosse-a-dents-electrique",
    title: "Brosse à dents électrique : entretien et brossette",
    category: "electromenager",
    devices: ["brosse-a-dents"],
    difficulty: "Facile",
    duration: "5 min",
    minutes: 5,
    savings: "≈ 15 €",
    keywords: ["brosse à dents électrique", "oral-b", "sonicare", "brossette", "tête", "3 mois", "nettoyer", "manche", "dentifrice"],
    summary: "Une brossette s'use en trois mois et du dentifrice séché s'accumule sous la tête. Rincer, sécher, remplacer à temps.",
    safety: "Retirez la brosse de son chargeur avant de la nettoyer.",
    tools: ["Serviette douce", "Détergent doux"],
    parts: ["Brossettes de rechange compatibles"],
    sources: [
      { label: "Oral-B — comment et quand remplacer votre brosse", url: "https://www.oralb.fr/fr-fr/guide-de-demarrage/comment-et-quand-remplacer-votre-brosse" },
      { label: "Oral-B — comment nettoyer votre brosse à dents électrique", url: "https://www.oralb.ca/fr-ca/sante-buccodentaire/pourquoi-oral-b/brosses-a-dents-electriques/comment-nettoyer-une-brosse-a-dents-electrique" }
    ],
    steps: [
      { title: "Rincer après chaque brossage", text: "Rincez la brossette à l'eau du robinet pour retirer dentifrice et débris." },
      { title: "Nettoyer sous la brossette", text: "Régulièrement, retirez la brossette et rincez séparément la brossette et le haut du manche, où le dentifrice s'accumule. Nettoyez l'extérieur du manche au détergent doux." },
      { title: "Sécher debout", text: "Essuyez avec une serviette douce et rangez la brosse à la verticale pour qu'elle sèche à l'air." },
      { title: "Changer la brossette", text: "Tous les trois mois, ou plus tôt quand les poils indicateurs ont perdu la moitié de leur couleur ou s'écartent." }
    ],
    troubleshoot: [
      "La brosse ne charge plus : essuyez le socle et le bas du manche, et vérifiez la prise.",
      "Elle vibre moins fort : batterie faible ou brossette mal enfoncée."
    ]
  },
  {
    id: "detartrer-sterilisateur-biberons",
    title: "Détartrer un stérilisateur de biberons",
    category: "electromenager",
    devices: ["puericulture"],
    difficulty: "Facile",
    duration: "20 min",
    minutes: 20,
    savings: "≈ 40 €",
    keywords: ["stérilisateur", "biberons", "philips avent", "calcaire", "taches blanches", "plaque chauffante", "vinaigre", "détartrer", "puériculture", "chauffe-biberon"],
    summary: "Les taches blanches ou brunes sur la plaque chauffante, c'est du calcaire. Un cycle au vinaigre blanc toutes les deux semaines garde le stérilisateur efficace.",
    safety: "Débranchez l'appareil et laissez-le refroidir avant de le vider. Rincez très soigneusement : aucun résidu de vinaigre ne doit rester pour les biberons.",
    tools: ["Vinaigre blanc à 5 % (ou détartrant à l'acide citrique)", "Éponge", "Chiffon humide"],
    parts: [],
    sources: [
      { label: "Philips Avent — éliminer les taches blanches ou brunes de la plaque chauffante", url: "https://www.philips.fr/c-f/XC000019369/comment-%C3%A9liminer-les-taches-blanches-brunes-sur-la-plaque-chauffante-de-mon-st%C3%A9rilisateur-philips-avent" },
      { label: "Philips — mode d'emploi du stérilisateur SCF291", url: "https://www.documents.philips.com/assets/20220407/afb7ae9216394e229956ae7000264a74.pdf" }
    ],
    steps: [
      { title: "Préparer le mélange", text: "Versez dans le réservoir 12 ml de vinaigre blanc à 5 % (2,5 cuillères à café) et 120 ml d'eau. Chaque modèle a ses propres quantités : vérifiez la notice." },
      { title: "Lancer un cycle", text: "Remettez panier et couvercle, puis mettez l'appareil en marche environ 5 minutes (ou un cycle complet selon la notice).", timer: 300 },
      { title: "Laisser refroidir", text: "Attendez au moins 5 minutes, appareil débranché.", timer: 300 },
      { title: "Rincer", text: "Videz, frottez les traces de calcaire à l'éponge et rincez soigneusement le réservoir, le panier et le couvercle. Essuyez le socle au chiffon humide." },
      { title: "Recommencer toutes les deux semaines", text: "Plus souvent si l'eau est calcaire.", tip: "N'utilisez que du vinaigre blanc ou un détartrant à l'acide citrique." }
    ],
    troubleshoot: [
      "Il reste des taches : refaites un cycle.",
      "L'appareil s'arrête trop tôt : c'est souvent le calcaire sur la plaque qui fausse la détection."
    ]
  },
  {
    id: "nettoyer-ventilateur",
    title: "Nettoyer les pales et la grille d'un ventilateur",
    category: "electromenager",
    devices: ["ventilateur"],
    difficulty: "Facile",
    duration: "20 min",
    minutes: 20,
    savings: "≈ 20 €",
    keywords: ["ventilateur", "pales", "grille", "poussière", "bruit", "ventilateur sur pied", "colonne", "nettoyer", "rangement"],
    summary: "La poussière sur les pales est brassée dans la pièce et fait forcer le moteur. Un démontage de la grille et un coup de chiffon suffisent.",
    safety: "Débranchez le ventilateur et attendez quelques minutes que le moteur refroidisse. Pas d'eau sur le bloc moteur.",
    tools: ["Tournevis (si la grille est vissée)", "Chiffon microfibre", "Brosse douce", "Eau tiède et savon doux"],
    parts: [],
    sources: [
      { label: "BUT — nettoyer un ventilateur", url: "https://blog.but.fr/article/comment-nettoyer-efficacement-votre-ventilateur/" },
      { label: "Casafan — nettoyer les pales d'un ventilateur sur pied", url: "https://www.casafan.fr/news/ventilateurs-silencieux/comment-nettoyer-les-pales-dun-ventilateur-sur-pied" }
    ],
    steps: [
      { title: "Débrancher", text: "Débranchez et laissez le moteur refroidir." },
      { title: "Ouvrir la grille", text: "Retirez la grille avant : clips sur le pourtour ou petite vis selon les modèles." },
      { title: "Dépoussiérer les pales", text: "Essuyez chaque pale, devant et derrière, avec un chiffon légèrement humide et savonneux, puis séchez." },
      { title: "Laver la grille", text: "Dépoussiérez-la à la brosse ou passez-la sous l'eau savonneuse, puis séchez-la entièrement." },
      { title: "Dépoussiérer le moteur et remonter", text: "Passez une brosse sèche sur les aérations du moteur, puis remontez une fois tout bien sec." }
    ],
    troubleshoot: [
      "Il vibre ou fait du bruit : pale mal serrée ou grille mal clipsée.",
      "Les pales tournent lentement : poussière dans le moteur ; si le problème reste, le condensateur de démarrage est souvent en cause."
    ]
  },
  {
    id: "filtres-purificateur-air",
    title: "Purificateur d'air : entretenir et changer les filtres",
    category: "electromenager",
    devices: ["purificateur"],
    difficulty: "Facile",
    duration: "15 min",
    minutes: 15,
    savings: "≈ 50 €",
    keywords: ["purificateur d'air", "filtre", "hepa", "préfiltre", "charbon actif", "odeur", "débit", "bruit", "voyant filtre"],
    summary: "Un filtre saturé fait chuter le débit d'air, augmente le bruit et laisse revenir les odeurs. Préfiltre à nettoyer, filtre HEPA à remplacer.",
    safety: "Éteignez et débranchez le purificateur avant d'ouvrir le capot.",
    tools: ["Aspirateur avec brosse douce", "Chiffon sec"],
    parts: ["Filtre HEPA ou charbon de rechange (référence du fabricant)"],
    sources: [
      { label: "IQAir — à quelle fréquence changer le filtre d'un purificateur d'air", url: "https://www.iqair.com/fr/newsroom/how-often-should-you-change-an-air-purifier-filter" },
      { label: "Smart Air — quand remplacer les filtres HEPA", url: "https://smartairfilters.com/fr/quand-remplacer-filtres-hepa-purificateurs-air/" }
    ],
    steps: [
      { title: "Éteindre et ouvrir", text: "Débranchez l'appareil et retirez le capot d'accès aux filtres." },
      { title: "Nettoyer le préfiltre", text: "Passez l'aspirateur à faible puissance, ou lavez-le à l'eau tiède s'il est lavable, puis laissez-le sécher complètement." },
      { title: "Contrôler le filtre HEPA", text: "La plupart ne se lavent pas. Remplacez-le s'il est gris et encrassé, souvent tous les 6 à 12 mois en usage courant." },
      { title: "Remplacer le filtre à charbon", text: "Il absorbe les odeurs et se remplace souvent tous les 3 à 12 mois." },
      { title: "Remonter et réinitialiser", text: "Remettez les filtres dans le bon sens, refermez, puis réinitialisez le voyant de filtre selon la notice." }
    ],
    troubleshoot: [
      "Débit d'air plus faible au même réglage, bruit accru ou odeurs qui reviennent : filtre à changer.",
      "Les filtres s'encrassent vite : fumée, animaux, cuisine ou fonctionnement continu à grande vitesse."
    ]
  },
  {
    id: "detartrer-nettoyeur-vapeur",
    title: "Nettoyeur vapeur : bonne eau et détartrage",
    category: "electromenager",
    devices: ["nettoyeur-vapeur"],
    difficulty: "Facile",
    duration: "30 min",
    minutes: 30,
    savings: "≈ 60 €",
    keywords: ["nettoyeur vapeur", "balai vapeur", "karcher", "calcaire", "détartrer", "chaudière", "eau déminéralisée", "moins de vapeur", "patins"],
    summary: "Le calcaire réduit la vapeur jusqu'à boucher l'appareil. Choisir la bonne eau et détartrer dès que le débit baisse prolonge sa vie.",
    safety: "N'ouvrez jamais le bouchon de la chaudière tant qu'elle est sous pression : risque de brûlure grave. Travaillez appareil débranché et froid.",
    tools: ["Détartrant recommandé par le fabricant", "Eau déminéralisée"],
    parts: ["Patins microfibre de rechange"],
    sources: [
      { label: "Le Coin Ménage — entretenir et détartrer son nettoyeur vapeur", url: "https://www.lecoinmenage.fr/blog/nettoyeurs/entretenir-detartrer-nettoyeur-vapeur/" },
      { label: "Kärcher — mode d'emploi du nettoyeur vapeur SC 1", url: "https://www.notice-facile.com/notice/6821/karcher+sc1-_f" }
    ],
    steps: [
      { title: "Choisir la bonne eau", text: "L'eau du robinet convient le plus souvent. En eau calcaire, coupez-la avec de l'eau déminéralisée. N'ajoutez ni parfum, ni vinaigre, ni additif non prévu par la notice." },
      { title: "Refroidir et débrancher", text: "Avant tout entretien, débranchez et attendez le refroidissement complet." },
      { title: "Détartrer", text: "Suivez la notice : introduisez le détartrant du fabricant dans la chaudière froide, laissez agir le temps indiqué." },
      { title: "Rincer", text: "Videz et rincez la chaudière plusieurs fois à l'eau claire." },
      { title: "Entretenir les accessoires", text: "Lavez les patins microfibre en machine sans adoucissant, videz le réservoir après chaque usage et rangez l'appareil sec.", tip: "Détartrez dès que la vapeur faiblit." }
    ],
    troubleshoot: [
      "Peu ou pas de vapeur : calcaire, détartrez.",
      "Des gouttes d'eau au lieu de vapeur : l'appareil n'a pas fini de chauffer, ou la chaudière est entartrée."
    ]
  },
  {
    id: "housse-table-a-repasser",
    title: "Table à repasser : changer la housse",
    category: "electromenager",
    devices: ["table-a-repasser"],
    difficulty: "Facile",
    duration: "10 min",
    minutes: 10,
    savings: "≈ 30 €",
    keywords: ["table à repasser", "planche à repasser", "housse", "mousse", "feutre", "cordon", "brûlée", "tâchée", "brabantia"],
    summary: "Une housse brûlée, tachée ou tassée marque le linge. On la change en dix minutes, sans changer de table.",
    safety: "Débranchez le fer et attendez qu'il refroidisse avant de manipuler la table.",
    tools: ["Ciseaux"],
    parts: ["Housse à la taille du plateau (longueur × largeur)"],
    sources: [
      { label: "Brabantia — à quel moment changer la housse de votre table à repasser", url: "https://www.brabantia.com/be_fr/blog/a-quel-moment-devez-vous-changer-la-housse-de-votre-table-a-repasser-1" },
      { label: "Brabantia — fixer une nouvelle housse de table à repasser", url: "https://service.brabantia.com/hc/en-us/articles/4407473747089-How-do-I-attach-a-new-ironing-board-cover" }
    ],
    steps: [
      { title: "Mesurer le plateau", text: "Mesurez la longueur et la largeur du plateau pour choisir une housse à la bonne taille." },
      { title: "Retirer l'ancienne housse", text: "Desserrez le cordon ou les attaches sous le plateau et retirez la housse. Gardez la mousse ou le feutre s'ils sont en bon état et que la nouvelle housse n'en a pas." },
      { title: "Poser la nouvelle housse", text: "Enfilez-la par la pointe, puis tirez-la sur l'arrière du plateau en la centrant." },
      { title: "Serrer le cordon", text: "Tirez sur le cordon pour tendre la housse sous le plateau, bloquez l'arrêt-cordon, puis nouez ou coupez l'excédent en laissant 15 à 20 cm." },
      { title: "Ranger au sec", text: "Pliez la table et rangez-la dans un endroit sec : l'humidité fait moisir la housse." }
    ],
    troubleshoot: [
      "La housse glisse : resserrez le cordon ou ajoutez des attaches élastiques sous le plateau.",
      "Le réglage de hauteur ne se bloque plus : le levier ou le crantage est usé, consultez la notice."
    ]
  },
  {
    id: "entretien-cireuse",
    title: "Cireuse à parquet : cirer, lustrer et entretenir",
    category: "electromenager",
    devices: ["cireuse"],
    difficulty: "Facile",
    duration: "1 h (+ séchage)",
    minutes: 60,
    savings: "≈ 50 €",
    keywords: ["cireuse", "lustreuse", "parquet", "cire", "brosses", "feutres", "lustrage", "entretien du parquet"],
    summary: "Brosses et feutres encrassés de vieille cire étalent la saleté. Préparer le sol, cirer, lustrer, puis nettoyer les accessoires.",
    safety: "Débranchez la cireuse avant de changer une brosse ou un feutre. Aérez pendant le cirage.",
    tools: ["Aspirateur", "Cire liquide pour parquet", "Chiffon coton"],
    parts: ["Brosses et feutres de rechange"],
    sources: [
      { label: "Syntilor — cireuse à parquet : bien la choisir et l'utiliser", url: "https://www.syntilor.com/blog/cireuse-a-parquet-mode-demploi" },
      { label: "PagesJaunes — cireuse à parquet", url: "https://parquet.pagesjaunes.fr/astuce/voir/518871/cireuse-a-parquet" }
    ],
    steps: [
      { title: "Préparer le sol", text: "Aspirez soigneusement le parquet ; s'il est très encrassé, utilisez un décapant adapté avant de cirer." },
      { title: "Choisir l'accessoire", text: "Brosse dure pour nettoyer, brosse souple pour étaler la cire, feutre pour lustrer." },
      { title: "Cirer", text: "Remplissez le réservoir de cire liquide et passez la machine régulièrement sur toute la surface, bords compris. Laissez sécher le temps indiqué par le fabricant de la cire, souvent quelques heures." },
      { title: "Lustrer", text: "Une fois la cire sèche, passez le feutre de lustrage." },
      { title: "Nettoyer les accessoires", text: "Débranchez, retirez brosses et feutres et débarrassez-les de la cire et de la poussière avant de les ranger." }
    ],
    troubleshoot: [
      "Le parquet reste terne : cire pas assez sèche avant le lustrage, ou feutre encrassé.",
      "La cireuse saute ou vibre : brosse mal enclenchée ou usée de façon inégale."
    ]
  },
  {
    id: "nettoyer-montre-connectee",
    title: "Nettoyer une montre connectée et son bracelet",
    category: "telephonie",
    devices: ["montre-connectee"],
    difficulty: "Facile",
    duration: "10 min",
    minutes: 10,
    savings: "≈ 30 €",
    keywords: ["montre connectée", "apple watch", "garmin", "fitbit", "bracelet", "capteurs", "irritation", "nettoyer", "fréquence cardiaque"],
    summary: "Sueur, crème solaire et lotion se déposent sur les capteurs et le bracelet : mesures faussées et peau irritée. Un nettoyage à l'eau douce suffit.",
    safety: "Éteignez la montre et retirez-la du chargeur. Pas de savon, de produit ménager, d'air comprimé ni d'ultrasons.",
    tools: ["Chiffon doux non pelucheux", "Eau douce"],
    parts: [],
    sources: [
      { label: "Apple — nettoyage de votre Apple Watch", url: "https://support.apple.com/fr-afri/108893" },
      { label: "Apple — informations d'entretien du bracelet", url: "https://support.apple.com/fr-afri/guide/watch/apda101f4abe/5.0/watchos" }
    ],
    steps: [
      { title: "Éteindre et retirer le bracelet", text: "Éteignez la montre, retirez-la du chargeur et détachez le bracelet, surtout s'il est en cuir." },
      { title: "Essuyer le boîtier", text: "Passez un chiffon non pelucheux légèrement humidifié d'eau douce. Sur un modèle étanche, un filet d'eau tiède peut retirer les résidus : vérifiez la notice." },
      { title: "Sécher", text: "Séchez entièrement au chiffon doux, capteurs compris." },
      { title: "Nettoyer le bracelet", text: "Essuyez-le au chiffon légèrement humide et laissez-le sécher à l'air avant de le remettre. Ne plongez jamais un bracelet en cuir dans l'eau." }
    ],
    troubleshoot: [
      "Mesures cardiaques irrégulières : capteurs sales ou montre trop lâche au poignet.",
      "La montre ne charge plus : essuyez le dos de la montre et le chargeur."
    ]
  },
  {
    id: "mettre-a-jour-gps",
    title: "Mettre à jour les cartes d'un GPS voiture",
    category: "telephonie",
    devices: ["gps"],
    difficulty: "Facile",
    duration: "1 h",
    minutes: 60,
    savings: "≈ 80 €",
    keywords: ["gps", "garmin", "tomtom", "cartes", "mise à jour", "garmin express", "carte micro sd", "radars", "logiciel"],
    summary: "Un GPS aux cartes périmées ne connaît pas les routes récentes. La mise à jour se fait depuis un ordinateur avec le logiciel du fabricant.",
    safety: "Ne débranchez pas le GPS pendant l'installation : une mise à jour interrompue peut le bloquer.",
    tools: ["Ordinateur avec connexion Internet", "Câble USB du GPS"],
    parts: ["Carte microSD si la mémoire est insuffisante"],
    sources: [
      { label: "Garmin — mise à jour de cartes et de logiciels avec Garmin Express (Drive 51/61)", url: "https://www8.garmin.com/manuals/webhelp/drive51-61/FR-FR/GUID-AB01F4C7-F1B1-4169-BC92-A222FF8344EC.html" },
      { label: "Garmin — mise à jour des cartes et logiciels automobiles avec Garmin Express", url: "https://support.garmin.com/fr-CH/?faq=xAwoBhInw15dPzLj52ekCA" }
    ],
    steps: [
      { title: "Installer le logiciel", text: "Sur l'ordinateur, installez le logiciel du fabricant (Garmin Express sur garmin.com/express, ou l'outil équivalent de votre marque)." },
      { title: "Brancher le GPS", text: "Lancez le logiciel et reliez le GPS à l'ordinateur avec son câble USB." },
      { title: "Ajouter l'appareil", text: "Cliquez sur « Ajouter un appareil » et suivez les instructions." },
      { title: "Installer les mises à jour", text: "Choisissez « Tout installer », ou affichez le détail pour choisir. Suivez les consignes, qui peuvent demander de débrancher puis rebrancher le GPS.", tip: "Les cartes sont volumineuses : prévoyez du temps avec une connexion lente." },
      { title: "Libérer de la place si besoin", text: "Si la mémoire manque, ajoutez une carte microSD pour recevoir les cartes." }
    ],
    troubleshoot: [
      "Le GPS n'est pas reconnu : essayez un autre câble ou un autre port USB.",
      "Mises à jour payantes : certains modèles ont des cartes à vie, d'autres non. Vérifiez sur le compte du fabricant."
    ]
  },
  {
    id: "nettoyer-ecran-tv",
    title: "Nettoyer un écran de télé ou d'ordinateur sans l'abîmer",
    category: "telephonie",
    devices: ["television", "ecran-pc"],
    difficulty: "Facile",
    duration: "10 min",
    minutes: 10,
    savings: "≈ 400 €",
    keywords: ["écran", "télévision", "tv", "moniteur", "écran pc", "oled", "qled", "lcd", "traces", "poussière", "nettoyer", "microfibre"],
    summary: "Un produit vitre ou un essuie-tout peut ruiner une dalle en une fois. Un chiffon microfibre, un peu d'eau déposée sur le chiffon, et c'est tout.",
    safety: "Éteignez l'écran et débranchez-le. Ne vaporisez jamais de liquide directement sur l'écran : il peut couler à l'intérieur.",
    tools: ["Chiffon microfibre propre, réservé à l'écran", "Eau distillée (ou eau du robinet)"],
    parts: [],
    sources: [
      { label: "Lecoindunet — bien nettoyer un écran QLED, OLED, LED ou LCD", url: "https://www.lecoindunet.com/nettoyer-ecran-led" },
      { label: "Samsung — conseils pour nettoyer correctement l'écran de votre TV", url: "https://ushl.samsung.com/fr/support/tv-audio-video/conseils-pour-nettoyer-correctement-l-ecran-de-votre-tv" }
    ],
    steps: [
      { title: "Éteindre et débrancher", text: "Éteignez l'écran, attendez qu'il refroidisse et débranchez-le. Écran noir, les traces se voient mieux." },
      { title: "Dépoussiérer à sec", text: "Passez le chiffon microfibre sec, en mouvements doux, sans appuyer." },
      { title: "Humidifier le chiffon pour les traces", text: "Déposez un peu d'eau distillée sur un coin du chiffon, jamais sur l'écran, puis essuyez doucement." },
      { title: "Sécher", text: "Repassez avec la partie sèche du chiffon pour ne laisser aucune humidité." },
      { title: "Nettoyer le cadre et les aérations", text: "Dépoussiérez le cadre, le pied et les grilles d'aération." }
    ],
    troubleshoot: [
      "À proscrire : alcool, ammoniaque, produit vitre, essuie-tout, vieux torchon, pression forte.",
      "Une tache persiste sous la surface : c'est un défaut de dalle (pixel mort, marque), pas une salissure."
    ]
  },
  {
    id: "filtre-videoprojecteur",
    title: "Vidéoprojecteur : nettoyer le filtre à air",
    category: "telephonie",
    devices: ["videoprojecteur"],
    difficulty: "Facile",
    duration: "10 min",
    minutes: 10,
    savings: "≈ 150 €",
    keywords: ["vidéoprojecteur", "projecteur", "filtre", "poussière", "surchauffe", "voyant", "lampe", "image terne", "epson", "ventilateur"],
    summary: "Un filtre encrassé fait chauffer le projecteur, l'arrête par sécurité et use la lampe plus vite. Le nettoyer se fait à l'aspirateur ou au pinceau.",
    safety: "Éteignez le projecteur, débranchez-le et laissez-le refroidir : la lampe est brûlante.",
    tools: ["Petit aspirateur pour ordinateur ou pinceau très souple"],
    parts: ["Filtre de rechange si le filtre est abîmé"],
    sources: [
      { label: "Epson — nettoyage du filtre à air et des orifices d'aération", url: "https://files.support.epson.com/docid/cpd5/cpd59708/source/maintenance/tasks/cleaning_air_filter.html" },
      { label: "Epson — entretien du filtre à air et des évents", url: "https://files.support.epson.com/docid/cpd4/cpd41027/source/maintenance/concepts/maint_filter_vent.html" }
    ],
    steps: [
      { title: "Éteindre et débrancher", text: "Mettez le projecteur hors tension, débranchez-le et laissez-le refroidir." },
      { title: "Retirer le filtre", text: "Ouvrez le couvercle du filtre (voir la notice) et sortez le filtre." },
      { title: "Dépoussiérer", text: "Aspirez délicatement les deux faces avec un petit aspirateur, ou passez un pinceau très souple. Dépoussiérez aussi les grilles d'aération." },
      { title: "Remonter", text: "Remettez le filtre et le couvercle, puis rebranchez.", tip: "Plus souvent si la pièce est poussiéreuse ou enfumée, et tout de suite en cas d'alerte de surchauffe." }
    ],
    troubleshoot: [
      "Pas d'eau, de détergent, de solvant ni d'air comprimé sur le filtre.",
      "La poussière ne part pas ou le filtre est déchiré : remplacez-le.",
      "Image plus sombre qu'avant : la lampe approche de sa fin de vie ; le mode Éco la ménage."
    ]
  },
  {
    id: "lecteur-dvd-ne-lit-plus",
    title: "Lecteur DVD ou Blu-ray qui ne lit plus les disques",
    category: "telephonie",
    devices: ["lecteur-video"],
    difficulty: "Facile",
    duration: "20 min",
    minutes: 20,
    savings: "≈ 80 €",
    keywords: ["lecteur dvd", "blu-ray", "ne lit plus", "disque", "lentille", "mise à jour", "firmware", "zone", "rayé", "sony"],
    summary: "Avant d'accuser la lentille, vérifiez le disque, sa zone et le logiciel du lecteur. Et évitez les disques de nettoyage.",
    safety: "N'ouvrez pas le lecteur : le laser peut être dangereux pour les yeux et l'appareil reste sous tension à l'intérieur.",
    tools: ["Chiffon doux et sec", "Clé USB (pour une mise à jour)"],
    parts: [],
    sources: [
      { label: "Sony — mode d'emploi d'un lecteur Blu-ray (entretien des disques)", url: "https://www.sony.fr/electronics/support/res/manuals/4261/42610922M.pdf" },
      { label: "Sony — procédure de mise à jour du logiciel du lecteur Blu-ray", url: "https://www.sony.fr/electronics/support/home-video-blu-ray-disc-players-recorders/ubp-x700/articles/00069793" }
    ],
    steps: [
      { title: "Essayer un autre disque", text: "Si un autre disque passe, le problème vient du premier (sale, rayé ou d'une autre zone géographique)." },
      { title: "Nettoyer le disque", text: "Essuyez-le avec un chiffon doux, en lignes droites du centre vers l'extérieur. Pas de solvant ni d'antistatique pour vinyle." },
      { title: "Vérifier la zone", text: "Un DVD ou Blu-ray d'une autre région que le lecteur ne sera pas lu." },
      { title: "Mettre à jour le logiciel", text: "Installez la dernière mise à jour du lecteur, par Internet ou par clé USB, en suivant la procédure du fabricant. Ne coupez pas le courant pendant la mise à jour." },
      { title: "Réinitialiser", text: "En dernier recours, rétablissez les réglages d'usine depuis le menu." }
    ],
    troubleshoot: [
      "N'utilisez pas de disque de nettoyage de lentille ni de nettoyant en spray : Sony les déconseille, ils peuvent provoquer une panne.",
      "Aucun disque ne passe après tout cela : la lentille ou le bloc optique est en cause, réparation en atelier."
    ]
  },
  {
    id: "barre-de-son-pas-de-son",
    title: "Barre de son ou home cinéma sans son avec la télé",
    category: "telephonie",
    devices: ["hifi"],
    difficulty: "Facile",
    duration: "15 min",
    minutes: 15,
    savings: "≈ 60 €",
    keywords: ["barre de son", "home cinéma", "pas de son", "hdmi arc", "earc", "cec", "anynet", "optique", "bluetooth", "télé"],
    summary: "Le plus souvent, ce n'est pas une panne : mauvais port HDMI, CEC désactivé ou sortie audio de la télé mal réglée.",
    safety: "Éteignez les appareils avant de débrancher ou rebrancher un câble.",
    tools: ["Télécommandes de la télé et de la barre de son", "Câble HDMI compatible ARC/eARC"],
    parts: [],
    sources: [
      { label: "Samsung — que faire si ma barre de son n'émet aucun son", url: "https://www.samsung.com/fr/support/tv-audio-video/ma-barre-de-son-samsung-n-emet-aucun-son/" },
      { label: "Samsung — aucun son avec l'eARC", url: "https://www.samsung.com/ca_fr/support/tv-audio-video/samsung-tv-no-sound-from-soundbar-when-using-earc/" }
    ],
    steps: [
      { title: "Vérifier l'évidence", text: "Tout est allumé, le son n'est coupé ni sur la télé ni sur la barre, le volume est monté." },
      { title: "Brancher sur les bons ports", text: "Le câble HDMI doit aller du port HDMI marqué ARC ou eARC de la télé au port « HDMI TO TV (ARC/eARC) » de la barre." },
      { title: "Activer le HDMI-CEC", text: "Dans les réglages de la télé, activez la fonction CEC (Anynet+ chez Samsung, SimpLink chez LG, Bravia Sync chez Sony)." },
      { title: "Choisir la sortie audio", text: "Réglez la sortie son de la télé sur la barre de son ou « système audio externe », et la source de la barre sur l'entrée TV/ARC." },
      { title: "Redémarrer et tester", text: "Éteignez tout, débranchez quelques minutes, rebranchez. Essayez un autre câble HDMI si le problème persiste." }
    ],
    troubleshoot: [
      "En Bluetooth : supprimez l'appairage et refaites-le depuis la télé.",
      "Son décalé : cherchez le réglage de synchronisation audio (lip sync) dans la télé ou la barre."
    ]
  },
  {
    id: "nettoyer-ecouteurs-casque",
    title: "Nettoyer des écouteurs ou un casque",
    category: "telephonie",
    devices: ["casque-ecouteurs", "casque-gaming"],
    difficulty: "Facile",
    duration: "10 min",
    minutes: 10,
    savings: "≈ 30 €",
    keywords: ["écouteurs", "airpods", "casque", "casque gaming", "cérumen", "grille", "son faible", "coussinets", "embouts", "boîtier de charge"],
    summary: "Le cérumen qui bouche les grilles fait baisser le son d'un côté. Un nettoyage à sec, sans liquide dans les orifices, suffit généralement.",
    safety: "Ne faites entrer aucun liquide dans les orifices ni dans le port de charge. Pas d'objet pointu ni abrasif.",
    tools: ["Chiffon doux, sec et non pelucheux", "Coton-tige sec", "Brosse à poils souples et secs"],
    parts: ["Embouts ou coussinets de rechange"],
    sources: [
      { label: "Apple — comment nettoyer vos AirPods", url: "https://support.apple.com/fr-afri/HT208729" },
      { label: "Apple — utiliser des écouteurs filaires Apple", url: "https://support.apple.com/fr-afri/108042" }
    ],
    steps: [
      { title: "Débrancher", text: "Déconnectez le casque ou sortez les écouteurs de leur boîtier." },
      { title: "Dégager les grilles", text: "Retirez les débris des grilles du haut-parleur et du micro avec une brosse souple sèche ou un coton-tige sec, sans appuyer." },
      { title: "Essuyer le corps", text: "Passez un chiffon doux, sec ou très légèrement humide d'eau claire, puis séchez." },
      { title: "Nettoyer embouts et coussinets", text: "Les embouts en silicone amovibles se rincent à l'eau claire et se sèchent à fond avant d'être remis. Essuyez les coussinets de casque au chiffon légèrement humide." },
      { title: "Nettoyer le boîtier de charge", text: "Retirez les débris à la brosse sèche, puis passez un chiffon sec. Laissez tout sécher avant de recharger." }
    ],
    troubleshoot: [
      "Un seul côté est faible : grille encrassée ; sur un casque filaire, testez aussi un autre câble.",
      "Le boîtier ne charge plus un écouteur : poussière sur les contacts, nettoyez-les au coton-tige sec."
    ]
  },
  {
    id: "nettoyer-objectif-appareil-photo",
    title: "Nettoyer l'objectif d'un appareil photo",
    category: "telephonie",
    devices: ["appareil-photo"],
    difficulty: "Facile",
    duration: "10 min",
    minutes: 10,
    savings: "≈ 60 €",
    keywords: ["appareil photo", "objectif", "lentille", "poussière", "traces", "soufflette", "capteur", "reflex", "hybride", "tamron"],
    summary: "Poussières et traces de doigts donnent des photos voilées. Du moins agressif au plus : soufflette, pinceau, puis chiffon humidifié.",
    safety: "Pas d'air comprimé en bombe, pas de mouchoir ni d'essuie-tout : ils rayent les traitements de la lentille.",
    tools: ["Poire soufflante", "Pinceau doux", "Chiffon microfibre pour optique", "Liquide de nettoyage pour optique"],
    parts: [],
    sources: [
      { label: "Tamron — comment nettoyer votre objectif", url: "https://www.tamron.eu/fr-FR/actualites/actualites-du-blog/comment-nettoyer-votre-objectif-" },
      { label: "Conseils Photos — nettoyer son objectif sans le rayer", url: "https://www.conseils-photos.com/articles/nettoyer-entretenir-objectif-photo-sans-rayure-poussiere-traces-buee-capteur-tuto-2026" }
    ],
    steps: [
      { title: "Éteindre", text: "Éteignez l'appareil. Pour un objectif interchangeable, retirez-le et bouchez le boîtier." },
      { title: "Souffler", text: "Chassez les poussières avec la poire soufflante, sans toucher la lentille." },
      { title: "Brosser", text: "Passez un pinceau doux pour les particules qui restent." },
      { title: "Essuyer", text: "Déposez une ou deux gouttes de liquide sur le chiffon, jamais sur la lentille, puis essuyez en cercles du centre vers l'extérieur." },
      { title: "Protéger", text: "Remettez les bouchons et rangez l'objectif au sec, avec un sachet de gel de silice." }
    ],
    troubleshoot: [
      "Des taches au même endroit sur toutes les photos : c'est le capteur. Lancez le nettoyage automatique du boîtier, puis une soufflette capteur ; sinon confiez-le au SAV.",
      "Buée à l'intérieur de l'objectif : laissez-le sécher à température ambiante ; si elle revient, faites-le contrôler."
    ]
  },
  {
    id: "calibrer-hoverboard",
    title: "Hoverboard qui tire d'un côté : le recalibrer",
    category: "velo",
    devices: ["gyropode"],
    difficulty: "Facile",
    duration: "5 min",
    minutes: 5,
    savings: "≈ 80 €",
    keywords: ["hoverboard", "gyropode", "gyroroue", "calibrer", "recalibrer", "tire d'un côté", "voyant rouge", "bip", "gyroscope", "réinitialiser"],
    summary: "Il tourne plus lentement d'un côté, penche ou bipe ? Un recalibrage des capteurs règle souvent le problème en quelques minutes.",
    safety: "Faites l'essai après calibrage sur un sol dégagé, avec casque et protections.",
    tools: ["Une surface plane et horizontale"],
    parts: [],
    sources: [
      { label: "Mobilité Douce — calibrer ou réinitialiser un hoverboard", url: "https://www.mobilite-douce.fr/hoverboard-electrique/guides-techniques/comment-calibrer-reinitialiser-un-hoverboard/" },
      { label: "Hover-Store — recalibrer un hoverboard", url: "https://hover-store.fr/recalibrer-un-hoverboard/" }
    ],
    steps: [
      { title: "Éteindre", text: "Éteignez l'hoverboard avec son bouton (pas avec la télécommande)." },
      { title: "Poser à plat", text: "Placez-le sur un sol plat et horizontal, les deux plateaux bien alignés." },
      { title: "Lancer le calibrage", text: "Maintenez le bouton d'alimentation enfoncé environ 5 secondes (jusqu'à 15 selon les modèles), jusqu'au bip et au clignotement des voyants." },
      { title: "Attendre sans toucher", text: "Laissez-le immobile une trentaine de secondes.", timer: 30 },
      { title: "Éteindre et tester", text: "Éteignez-le pour enregistrer le calibrage, rallumez-le puis testez des virages dans les deux sens.", tip: "La procédure varie selon les marques : vérifiez la notice." }
    ],
    troubleshoot: [
      "Voyant rouge qui clignote : le nombre de clignotements indique la panne (batterie, capteur...). Consultez le tableau de la notice.",
      "Le problème revient après calibrage : un capteur (gyroscope) ou une carte est à remplacer."
    ]
  },
  {
    id: "entretien-perceuse-visseuse",
    title: "Perceuse-visseuse sans fil : batterie, mandrin et aérations",
    category: "maison",
    devices: ["perceuse"],
    difficulty: "Facile",
    duration: "15 min",
    minutes: 15,
    savings: "≈ 60 €",
    keywords: ["perceuse", "visseuse", "perceuse-visseuse", "batterie", "lithium", "autonomie", "mandrin", "aérations", "sans fil", "makita", "bosch", "ryobi"],
    summary: "Une batterie mal stockée perd de la capacité, des aérations bouchées font chauffer le moteur. Quelques habitudes prolongent la vie de l'outil.",
    safety: "Retirez la batterie avant tout nettoyage ou changement d'embout. Portez des lunettes si vous soufflez les aérations.",
    tools: ["Pinceau ou soufflette", "Chiffon sec", "Graisse pour métaux (mandrin)"],
    parts: ["Batterie de rechange d'origine si l'autonomie s'effondre"],
    sources: [
      { label: "Bricotou — utiliser et entretenir les batteries de perceuse-visseuse", url: "https://www.bricotou.com/les-batteries-et-accus-perceuse-visseuse-sans-fil-comment-les-utiliser-et-les-entretenir/" },
      { label: "Les-Outils.com — maintenance préventive de la perceuse-visseuse sans fil", url: "https://www.les-outils.com/maintenance-preventive-de-votre-perceuse-visseuse-sans-fil-guide-complet/" }
    ],
    steps: [
      { title: "Retirer la batterie après usage", text: "Sortez la batterie de l'outil à la fin du travail." },
      { title: "Recharger sans attendre la panne", text: "Une batterie lithium-ion n'a pas d'effet mémoire : rechargez-la quand vous voulez, mais évitez de la vider complètement, cela lui fait perdre de la capacité. Utilisez le chargeur d'origine." },
      { title: "Bien stocker", text: "Pour un rangement de plusieurs semaines, laissez-la à environ 40 % de charge, dans un endroit frais et sec." },
      { title: "Dépoussiérer les aérations", text: "Chassez la poussière des ouïes du moteur au pinceau ou à la soufflette, à une quinzaine de centimètres." },
      { title: "Entretenir le mandrin", text: "Nettoyez les mors et mettez un peu de graisse pour métaux quand le serrage devient dur." }
    ],
    troubleshoot: [
      "L'outil s'arrête en plein effort : la protection de la batterie ou du moteur se déclenche, laissez refroidir.",
      "Des étincelles visibles dans les aérations et une perte de puissance (outil filaire ou moteur à charbons) : les charbons sont usés, ils se remplacent."
    ]
  },
  {
    id: "entretien-ponceuse",
    title: "Ponceuse : changer l'abrasif et nettoyer le plateau",
    category: "maison",
    devices: ["scie-ponceuse"],
    difficulty: "Facile",
    duration: "10 min",
    minutes: 10,
    savings: "≈ 40 €",
    keywords: ["ponceuse", "abrasif", "papier de verre", "scratch", "velcro", "plateau", "poussière", "sac", "aspiration", "excentrique", "vibrante", "scie"],
    summary: "La poussière de ponçage bouche le scratch du plateau et le moteur. Un nettoyage après chaque usage et un abrasif bien posé changent tout.",
    safety: "Débranchez l'outil (ou retirez la batterie) avant de changer l'abrasif. Portez masque et lunettes : la poussière de ponçage est nocive.",
    tools: ["Soufflette ou aspirateur avec brosse", "Ruban adhésif", "Brosse à dents"],
    parts: ["Abrasifs au bon format et au bon grain", "Plateau ou velcro de rechange si le scratch ne tient plus"],
    sources: [
      { label: "Ponceuse-vibrante.com — comment entretenir une ponceuse vibrante", url: "https://ponceuse-vibrante.com/comment-entretenir-une-ponceuse-vibrante/" },
      { label: "Le Bon Abrasif — réparer le velcro de la ponceuse", url: "https://www.lebonabrasif.com/blog/index/billet/14051_comment-changer-le-velcro-du-plateau-de-poncage" }
    ],
    steps: [
      { title: "Débrancher", text: "Débranchez l'outil ou retirez sa batterie." },
      { title: "Retirer l'abrasif usé", text: "Décollez l'abrasif du plateau à scratch ou libérez-le des pinces." },
      { title: "Nettoyer le scratch", text: "Soufflez ou aspirez la poussière du plateau. Pour les poils et débris incrustés, collez et décollez un ruban adhésif, ou passez une brosse à dents." },
      { title: "Poser le nouvel abrasif", text: "Alignez bien ses trous sur ceux du plateau pour que l'aspiration fonctionne, puis appuyez." },
      { title: "Vider le sac et dépoussiérer le moteur", text: "Videz le sac ou le bac à poussière, branchez un aspirateur si possible, et soufflez les aérations du moteur après chaque séance." }
    ],
    troubleshoot: [
      "L'abrasif se décroche : scratch encrassé ou usé ; nettoyez-le, sinon remplacez le plateau ou son velcro.",
      "Le moteur crache des étincelles ou ne démarre plus : charbons à changer (modèles filaires)."
    ]
  },
  {
    id: "filtre-aspirateur-eau-poussiere",
    title: "Aspirateur eau et poussières : nettoyer le filtre",
    category: "maison",
    devices: ["aspirateur-chantier"],
    difficulty: "Facile",
    duration: "15 min",
    minutes: 15,
    savings: "≈ 40 €",
    keywords: ["aspirateur eau et poussières", "aspirateur de chantier", "karcher", "wd", "filtre", "cartouche", "aspire mal", "cuve", "décolmatage"],
    summary: "Un filtre cartouche colmaté fait perdre l'aspiration et chauffer le moteur. On le tape, on le rince, on le laisse sécher.",
    safety: "Débranchez l'aspirateur avant d'ouvrir la cuve. Portez un masque si vous videz des poussières fines (plâtre, ciment).",
    tools: ["Poubelle ou sac à gravats", "Jet d'eau"],
    parts: ["Filtre cartouche de rechange du même modèle", "Sacs filtrants"],
    sources: [
      { label: "Comment-entretenir.fr — entretenir son aspirateur Kärcher", url: "https://www.comment-entretenir.fr/entretenir-son-aspirateur-karcher/" },
      { label: "Kärcher — mode d'emploi WD 2", url: "https://www.modesdemploi.fr/karcher/wd2/mode-d-emploi" }
    ],
    steps: [
      { title: "Débrancher et vider la cuve", text: "Videz la cuve, ou changez le sac s'il est plein. Rincez de temps en temps l'intérieur de la cuve." },
      { title: "Décolmater le filtre", text: "Tapotez le filtre au-dessus d'une poubelle, ou utilisez le bouton de décolmatage si votre modèle en a un." },
      { title: "Rincer si besoin", text: "Rincez le filtre cartouche à l'eau courante, sans le frotter ni le brosser." },
      { title: "Laisser sécher entièrement", text: "Ne le remontez que parfaitement sec." },
      { title: "Nettoyer les suceurs", text: "Retirez cheveux et débris des embouts et vérifiez que le flexible n'est pas bouché." }
    ],
    troubleshoot: [
      "La poussière ressort : filtre mal monté ou déchiré, remplacez-le.",
      "Pour aspirer de l'eau, suivez la notice : sur beaucoup de modèles, on retire le sac, et parfois on change de filtre."
    ]
  },
  {
    id: "entretien-radiateur-electrique",
    title: "Radiateur électrique : le dépoussiérer avant l'hiver",
    category: "maison",
    devices: ["radiateur-electrique"],
    difficulty: "Facile",
    duration: "15 min",
    minutes: 15,
    savings: "≈ 30 €",
    keywords: ["radiateur électrique", "convecteur", "radiateur à inertie", "poussière", "odeur de brûlé", "grilles", "chauffage", "atlantic", "entretien"],
    summary: "La poussière dans les grilles brûle au démarrage, sent mauvais et freine la chauffe. Deux dépoussiérages par an suffisent ; pas de purge sur un radiateur électrique.",
    safety: "Coupez l'alimentation (disjoncteur ou interrupteur sur 0) et laissez refroidir. Ne touchez pas aux connexions électriques.",
    tools: ["Aspirateur avec embout fin ou brosse souple", "Sèche-cheveux en air froid", "Eau tiède avec savon ou vinaigre blanc", "Chiffon"],
    parts: [],
    sources: [
      { label: "Atlantic — quel entretien pour mon radiateur électrique", url: "https://www.atlantic.fr/aide/chauffage-electrique/informations/quel-entretien-pour-mon-radiateur-electrique" },
      { label: "IZI by EDF — comment entretenir ses radiateurs électriques", url: "https://www.izi-by-edf-renov.fr/blog/radiateur-electrique-comment-entretenir" }
    ],
    steps: [
      { title: "Couper et refroidir", text: "Coupez le radiateur au tableau ou mettez son interrupteur sur 0, et attendez qu'il refroidisse." },
      { title: "Dépoussiérer les grilles", text: "Aspirez les grilles d'entrée et de sortie d'air avec un embout fin ou une brosse douce. Un sèche-cheveux en air froid chasse la poussière de l'arrière." },
      { title: "Nettoyer la façade", text: "Passez un chiffon imbibé d'eau tiède savonneuse ou vinaigrée, sans produit abrasif. Les grilles amovibles se lavent à part." },
      { title: "Sécher avant de rallumer", text: "Séchez tout avec un chiffon propre avant de remettre en marche.", tip: "Au printemps à l'arrêt du chauffage et à l'automne avant de le relancer." }
    ],
    troubleshoot: [
      "Ne couvrez jamais un radiateur en fonctionnement (linge à sécher, meuble contre la grille).",
      "Odeur de brûlé au premier allumage : poussière qui brûle, normal quelques minutes ; si elle persiste, coupez et faites contrôler.",
      "Le radiateur ne chauffe plus : vérifiez le disjoncteur et le mode (hors-gel, fil pilote) avant de soupçonner une panne."
    ]
  },
  {
    id: "entretien-pompe-a-chaleur",
    title: "Pompe à chaleur : entretien obligatoire et gestes simples",
    category: "maison",
    devices: ["pompe-a-chaleur"],
    difficulty: "Facile",
    duration: "20 min",
    minutes: 20,
    savings: "≈ 180 €",
    keywords: ["pompe à chaleur", "pac", "climatisation réversible", "unité extérieure", "entretien obligatoire", "décret", "feuilles", "filtres", "attestation"],
    summary: "Une pompe à chaleur de 4 à 70 kW doit être entretenue par un professionnel au moins tous les deux ans. Entre deux visites, dégager et dépoussiérer l'unité extérieure l'aide à bien fonctionner.",
    safety: "Coupez l'alimentation de la pompe à chaleur avant de nettoyer l'unité extérieure. Ne touchez jamais au circuit frigorifique : seul un professionnel certifié y est autorisé.",
    tools: ["Balai", "Brosse souple", "Eau savonneuse"],
    parts: [],
    sources: [
      { label: "Légifrance — décret n° 2020-912 du 28 juillet 2020", url: "https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000042164734" },
      { label: "IZI by EDF — l'entretien d'une pompe à chaleur est-il obligatoire", url: "https://www.izi-by-edf-renov.fr/blog/obligation-entretien-pompe-a-chaleur" }
    ],
    steps: [
      { title: "Planifier l'entretien obligatoire", text: "Faites entretenir la pompe à chaleur par un professionnel certifié au moins tous les deux ans (puissance de 4 à 70 kW). Il contrôle notamment l'étanchéité du circuit frigorifique et vous remet un rapport à conserver." },
      { title: "Couper l'alimentation", text: "Avant de nettoyer l'unité extérieure, coupez son alimentation." },
      { title: "Dégager l'unité extérieure", text: "Retirez feuilles, branches et débris autour et devant l'unité pour que l'air circule librement." },
      { title: "Dépoussiérer", text: "Nettoyez la carrosserie avec une brosse souple et de l'eau savonneuse, sans jet sous pression sur les ailettes." },
      { title: "Nettoyer les filtres intérieurs", text: "Si votre système a des unités intérieures (PAC air-air), nettoyez leurs filtres selon la notice." }
    ],
    troubleshoot: [
      "Sans attestation d'entretien, l'assureur ou la garantie peut refuser une prise en charge.",
      "Givre sur l'unité extérieure en hiver : elle se dégivre seule par cycles ; un bloc de glace permanent demande un dépannage."
    ]
  },
  {
    id: "entretien-portail-motorise",
    title: "Portail ou porte de garage motorisé : entretien et cellules",
    category: "maison",
    devices: ["motorisation"],
    difficulty: "Facile",
    duration: "30 min",
    minutes: 30,
    savings: "≈ 150 €",
    keywords: ["portail motorisé", "portail électrique", "porte de garage", "volet roulant", "cellules photoélectriques", "rail", "gonds", "somfy", "ne s'ouvre plus", "télécommande"],
    summary: "Des cellules sales ou mal alignées bloquent le portail, des rails encrassés font forcer le moteur. Deux entretiens par an évitent la plupart des pannes.",
    safety: "Coupez l'alimentation du moteur avant de travailler sur les parties mobiles. Ne mettez jamais les mains près d'un portail en mouvement.",
    tools: ["Chiffon microfibre", "Brosse", "Lubrifiant sec (sans graisse épaisse)", "Sécateur"],
    parts: ["Pile de télécommande"],
    sources: [
      { label: "Somfy — guide d'entretien d'un portail électrique", url: "https://www.somfy.fr/idees-et-projets/articles/guide-d-entretien-d-un-portail-electrique" },
      { label: "SCS Sentinel — entretenir sa motorisation de portail", url: "https://blog.scs-sentinel.com/comment-entretenir-sa-motorisation-de-portail/" }
    ],
    steps: [
      { title: "Nettoyer les cellules", text: "Essuyez les deux cellules photoélectriques au chiffon microfibre et vérifiez qu'elles sont bien face à face, sans végétation devant." },
      { title: "Tester la sécurité", text: "Portail en fermeture, passez un objet entre les cellules : il doit s'arrêter ou repartir en arrière." },
      { title: "Nettoyer rails et crémaillère", text: "Portail coulissant : balayez le rail et retirez gravillons et feuilles. Porte de garage : dépoussiérez les rails." },
      { title: "Lubrifier les articulations", text: "Portail battant : lubrifiez gonds, charnières et bras. Évitez les graisses épaisses sur les rails, elles retiennent la poussière." },
      { title: "Tailler et vérifier", text: "Coupez la végétation qui gêne le mouvement, vérifiez le boîtier de commande (propre, sans insectes) et la pile de la télécommande.", tip: "Idéalement après l'été et avant l'hiver." }
    ],
    troubleshoot: [
      "Le portail s'ouvre mais ne se ferme plus : cellules sales, masquées ou désalignées.",
      "Il ne réagit plus à une télécommande mais bien à l'autre : pile usée.",
      "Bruit anormal, à-coups ou ralentissements : faites contrôler le moteur."
    ]
  },
  {
    id: "visiophone-ne-sonne-plus",
    title: "Interphone ou visiophone qui ne sonne plus",
    category: "maison",
    devices: ["interphone"],
    difficulty: "Facile",
    duration: "20 min",
    minutes: 20,
    savings: "≈ 100 €",
    keywords: ["interphone", "visiophone", "ne sonne plus", "pas d'image", "écran noir", "gâche", "transformateur", "piles", "sonnette"],
    summary: "Avant de changer le visiophone, vérifiez l'alimentation, les piles et faites une réinitialisation : c'est souvent suffisant.",
    safety: "Coupez le disjoncteur avant d'ouvrir un boîtier ou de toucher un fil. Au-delà des vérifications simples, faites appel à un électricien.",
    tools: ["Tournevis", "Piles neuves (modèles sans fil)", "Chiffon doux"],
    parts: [],
    sources: [
      { label: "IZI by EDF — visiophone : les pannes fréquentes", url: "https://izi-by-edf.fr/blog/depannage-electrique-visiophone" },
      { label: "Bob Dépannage — réparer ou remplacer un interphone ou visiophone", url: "https://www.bobdepannage.fr/service/electricite/reparer-remplacer-un-interphone-visiophone" }
    ],
    steps: [
      { title: "Vérifier l'alimentation", text: "Regardez au tableau électrique que le disjoncteur du visiophone (ou son transformateur) n'a pas sauté." },
      { title: "Changer les piles", text: "Sur un modèle sans fil, remplacez les piles ou rechargez la batterie de la platine de rue et du moniteur." },
      { title: "Réinitialiser", text: "Coupez l'alimentation deux minutes, puis rétablissez-la." },
      { title: "Nettoyer la caméra", text: "Si l'image est floue, essuyez l'objectif de la platine de rue au chiffon doux." },
      { title: "Isoler la panne", text: "Sonnerie muette mais image présente, son absent, ou gâche qui n'ouvre plus : notez ce qui fonctionne encore, cela orientera le dépanneur." }
    ],
    troubleshoot: [
      "En immeuble, demandez aux voisins : si personne n'a de sonnerie, la panne est sur l'installation commune.",
      "Écran totalement noir après un orage : transformateur souvent grillé, à faire vérifier."
    ]
  },
  {
    id: "entretien-souffleur-feuilles",
    title: "Souffleur de feuilles : entretien et hivernage",
    category: "jardin",
    devices: ["souffleur"],
    difficulty: "Facile",
    duration: "20 min",
    minutes: 20,
    savings: "≈ 50 €",
    keywords: ["souffleur", "aspiro-souffleur", "souffleur de feuilles", "thermique", "2 temps", "filtre à air", "bougie", "mélange", "hivernage", "batterie"],
    summary: "Filtre à air bouché et vieux mélange de carburant sont les deux grandes causes de démarrage difficile. Entretien régulier, puis hivernage soigné.",
    safety: "Moteur arrêté et froid, capuchon de bougie retiré (thermique), prise débranchée ou batterie retirée (électrique). Portez gants et lunettes.",
    tools: ["Clé à bougie", "Eau savonneuse chaude", "Bidon homologué pour carburant"],
    parts: ["Filtre à air et bougie de rechange"],
    sources: [
      { label: "AgriEuro — guide d'entretien des souffleurs-aspirateurs", url: "https://blog.agrieuro.fr/lentretien-des-souffleurs-aspirateurs/" },
      { label: "Gamm vert — entretien du souffleur thermique", url: "https://www.gammvert.fr/conseils/conseils-de-jardinage/entretien-du-souffleur-thermique" }
    ],
    steps: [
      { title: "Contrôler avant usage", text: "Vérifiez que le tube de soufflage n'est ni fêlé ni bouché et que les grilles d'entrée d'air sont dégagées. Sur un modèle électrique, contrôlez le câble." },
      { title: "Nettoyer le filtre à air", text: "Toutes les 10 à 15 heures d'utilisation (thermique), démontez le filtre et nettoyez-le, ou remplacez-le s'il est abîmé." },
      { title: "Surveiller la bougie", text: "Contrôlez-la et changez-la si elle est usée, selon l'intervalle de la notice." },
      { title: "Utiliser un mélange frais", text: "Moteur 2 temps : préparez le mélange essence-huile au dosage de la notice, en petites quantités ; un mélange de plus d'un mois se dégrade." },
      { title: "Hiverner", text: "Videz le réservoir dans un bidon homologué, faites tourner le moteur jusqu'à l'arrêt, puis rangez au sec. Modèle à batterie : stockez la batterie à part, au frais et au sec." }
    ],
    troubleshoot: [
      "Il démarre mal au printemps : carburant resté dans le réservoir tout l'hiver, videz-le et remettez du mélange frais.",
      "Il perd de la puissance : filtre à air encrassé."
    ]
  },
  {
    id: "entretien-motobineuse",
    title: "Motobineuse : huile, filtre à air et hivernage",
    category: "jardin",
    devices: ["motobineuse"],
    difficulty: "Moyen",
    duration: "45 min",
    minutes: 45,
    savings: "≈ 80 €",
    keywords: ["motobineuse", "motoculteur", "vidange", "huile moteur", "filtre à air", "fraises", "hivernage", "pubert", "4 temps"],
    summary: "Un moteur qui tourne avec une huile usée ou un filtre bouché s'use vite. Contrôle d'huile à chaque usage, vidange aux bons intervalles, fraises propres en fin de saison.",
    safety: "Moteur arrêté et froid, capuchon de bougie retiré. Portez des gants pour manipuler les fraises, qui coupent.",
    tools: ["Bac de vidange", "Entonnoir", "Clés adaptées", "Brosse", "Chiffon"],
    parts: ["Huile moteur 4 temps (SAE 10W30 chez Pubert, voir la notice)", "Élément de filtre à air"],
    sources: [
      { label: "Pubert — entretien du filtre et de l'huile moteur de votre motobineuse", url: "https://pubert.com/conseil/entretien-filtre-huile-moteur-motobineuse-motoculteur/" },
      { label: "AgriEuro — guide d'entretien des motobineuses et motoculteurs", url: "https://blog.agrieuro.fr/lentretien-des-motobineuses-et-des-motoculteurs/" }
    ],
    steps: [
      { title: "Contrôler l'huile avant chaque usage", text: "Machine à plat, vérifiez que le niveau se situe entre le minimum et le maximum de la jauge ; complétez si besoin avec l'huile de la notice." },
      { title: "Faire la vidange", text: "Première vidange après 10 heures ou un an, puis toutes les 50 heures ou tous les trois ans, au premier terme atteint (intervalles Pubert : vérifiez ceux de votre moteur). Vidangez moteur tiède, dans un bac, puis remplissez d'huile neuve." },
      { title: "Entretenir le filtre à air", text: "Regardez-le à chaque usage et nettoyez-le au moins toutes les 25 heures ; changez l'élément toutes les 200 heures ou s'il est abîmé." },
      { title: "Nettoyer les fraises", text: "Retirez terre et racines après chaque usage et vérifiez leur tranchant, surtout en sol caillouteux." },
      { title: "Hiverner", text: "Videz le carburant ou ajoutez un stabilisant, nettoyez et graissez légèrement les fraises, puis rangez au sec." }
    ],
    troubleshoot: [
      "Fumée bleue : trop d'huile ou machine trop inclinée pendant le travail.",
      "Démarrage difficile : carburant vieux, bougie encrassée ou filtre à air bouché."
    ]
  },
  {
    id: "amorcer-pompe-surface",
    title: "Amorcer une pompe de surface ou d'arrosage",
    category: "jardin",
    devices: ["pompe"],
    difficulty: "Facile",
    duration: "20 min",
    minutes: 20,
    savings: "≈ 100 €",
    keywords: ["pompe de surface", "pompe d'arrosage", "surpresseur", "amorcer", "désamorcée", "ne pompe plus", "clapet anti-retour", "crépine", "gel", "hivernage"],
    summary: "Une pompe de surface doit être pleine d'eau pour aspirer. Si elle tourne sans rien débiter, elle est désamorcée : on la remplit par son bouchon d'amorçage.",
    safety: "Ne faites jamais tourner la pompe à sec : elle chauffe et s'abîme en quelques minutes. Débranchez-la avant d'ouvrir le bouchon.",
    tools: ["Bouteille ou seau d'eau", "Entonnoir"],
    parts: ["Clapet anti-retour avec crépine, si le tuyau d'aspiration n'en a pas"],
    sources: [
      { label: "Castorama — démarrer et amorcer une pompe de surface", url: "https://www.castorama.fr/idees-et-conseils/comment-demarrer-et-amorcer-une-pompe-de-surface/CF_CPRD_npcart_100529.art" },
      { label: "Pompe&Moteur — pourquoi ma pompe de surface ne s'amorce pas", url: "https://www.pompe-moteur.fr/blog/pourquoi-ma-pompe-de-surface-ne-samorce-pas--n38" }
    ],
    steps: [
      { title: "Vérifier l'aspiration", text: "Plongez le tuyau d'aspiration dans l'eau. Il doit être rigide et étanche, avec un clapet anti-retour et une crépine au bout." },
      { title: "Débrancher et ouvrir", text: "Débranchez la pompe, détachez le tuyau de sortie et dévissez le bouchon d'amorçage sur le corps de pompe." },
      { title: "Remplir", text: "Versez lentement de l'eau jusqu'à ce qu'elle déborde par l'orifice." },
      { title: "Refermer", text: "Revissez bien le bouchon et rebranchez le tuyau de sortie." },
      { title: "Démarrer", text: "Branchez et lancez la pompe : l'eau doit arriver en quelques secondes. Sinon, arrêtez et recommencez deux ou trois fois." }
    ],
    troubleshoot: [
      "Elle se désamorce à chaque arrêt : clapet anti-retour défectueux ou prise d'air sur un raccord.",
      "Avant l'hiver : videz le corps de pompe et rangez-la hors gel."
    ]
  },
  {
    id: "barbecue-gaz-fuite-nettoyage",
    title: "Barbecue ou plancha gaz : tester les fuites et nettoyer",
    category: "jardin",
    devices: ["barbecue"],
    difficulty: "Facile",
    duration: "20 min",
    minutes: 20,
    savings: "≈ 50 €",
    keywords: ["barbecue", "plancha", "gaz", "fuite", "flexible", "détendeur", "eau savonneuse", "date de péremption", "grille", "bac à graisse"],
    summary: "Un flexible périmé ou un raccord mal serré peut laisser fuir le gaz. Le test à l'eau savonneuse prend deux minutes et se fait à chaque changement de bouteille.",
    safety: "Faites le test dehors, loin de toute flamme ou cigarette ; ne cherchez jamais une fuite avec une flamme. Odeur de gaz ou bulles : fermez immédiatement la bouteille.",
    tools: ["Eau et liquide vaisselle", "Pinceau ou vaporisateur", "Brosse à grille en laiton"],
    parts: ["Flexible gaz aux normes, si sa date est dépassée"],
    sources: [
      { label: "Char-Broil — sécurité du barbecue à gaz : vérifier les fuites", url: "https://www.charbroil.fr/conseils/securite-du-barbecue-a-gaz-pour-verifier-les-fuites" },
      { label: "Esprit Barbecue — détecter une fuite de gaz sur un barbecue", url: "https://www.esprit-barbecue.fr/content/119-comment-detecter-fuite-gaz-sur-barbecue" }
    ],
    steps: [
      { title: "Vérifier la date du flexible", text: "La date limite est gravée sur le tuyau. Dépassée, ou tuyau craquelé : remplacez-le, même s'il ne fuit pas." },
      { title: "Mettre sous pression", text: "Fermez tous les boutons des brûleurs, puis ouvrez le robinet de la bouteille." },
      { title: "Badigeonner d'eau savonneuse", text: "Appliquez le mélange eau et liquide vaisselle sur le robinet de la bouteille, le détendeur, les raccords et tout le flexible." },
      { title: "Observer", text: "Des bulles qui grossissent signalent une fuite : fermez la bouteille, resserrez ou changez la pièce, puis refaites le test." },
      { title: "Nettoyer grille et bac", text: "Brossez la grille encore chaude avec une brosse en laiton, videz et lavez le bac de récupération des graisses à l'eau chaude savonneuse." }
    ],
    troubleshoot: [
      "Flamme jaune et faible : brûleur encrassé ou araignée dans le tube d'arrivée d'air, nettoyez-le.",
      "Refaites le test en début de saison et à chaque changement de bouteille."
    ]
  },
  {
    id: "entretien-eau-piscine",
    title: "Piscine : pH, chlore et filtration au quotidien",
    category: "jardin",
    devices: ["piscine"],
    difficulty: "Facile",
    duration: "20 min",
    minutes: 20,
    savings: "≈ 200 €",
    keywords: ["piscine", "ph", "chlore", "filtration", "skimmer", "eau verte", "eau trouble", "algues", "analyse", "filtre à sable", "contre-lavage"],
    summary: "Une eau claire tient à trois réglages : un pH entre 7,2 et 7,6, un taux de chlore suffisant et une filtration adaptée à la température.",
    safety: "Ne mélangez jamais deux produits de traitement entre eux, et versez toujours le produit dans l'eau, jamais l'inverse. Rangez-les hors de portée des enfants.",
    tools: ["Trousse d'analyse pH et chlore (bandelettes ou pastilles)", "Épuisette", "Brosse de ligne d'eau"],
    parts: ["Produits pH plus / pH moins et désinfectant"],
    sources: [
      { label: "Génération Piscine — entretenir sa piscine au chlore", url: "https://www.generationpiscine.com/comment-bien-entretenir-sa-piscine-au-chlore/" },
      { label: "Piscines France — guide d'utilisation et d'entretien d'une piscine", url: "https://www.piscines-france.fr/pdf/Guide_utilisation_et_entretien_piscine.pdf" }
    ],
    steps: [
      { title: "Analyser l'eau", text: "Mesurez le pH et le chlore libre une fois par semaine si la piscine sert peu, deux à trois fois par semaine en pleine saison." },
      { title: "Régler le pH d'abord", text: "Visez un pH entre 7,2 et 7,6 : en dehors, le chlore agit mal et l'eau irrite les yeux." },
      { title: "Ajuster le chlore", text: "Maintenez le chlore libre au taux conseillé par le fabricant de vos produits, souvent autour de 1 mg/l (environ 0,5 à 1,5 mg/l)." },
      { title: "Adapter la filtration", text: "Plus l'eau est chaude, plus il faut filtrer longtemps. Règle courante : autant d'heures par jour que la moitié de la température de l'eau (28 °C → 14 h)." },
      { title: "Vider skimmers et préfiltre", text: "Videz les paniers des skimmers et le préfiltre de la pompe au moins deux fois par semaine en saison, et nettoyez le filtre (contre-lavage pour un filtre à sable) toutes les 2 à 4 semaines." }
    ],
    troubleshoot: [
      "Eau verte : pH trop haut ou manque de chlore, souvent après un orage ou une forte chaleur. Corrigez le pH, faites un traitement choc et filtrez en continu.",
      "Pression du filtre qui monte : il est encrassé, faites un contre-lavage."
    ]
  },
  {
    id: "volant-jeu-calibrage",
    title: "Volant de jeu décentré ou qui ne se calibre plus",
    category: "loisirs",
    devices: ["volant"],
    difficulty: "Facile",
    duration: "15 min",
    minutes: 15,
    savings: "≈ 100 €",
    keywords: ["volant", "logitech", "g29", "g920", "g923", "thrustmaster", "calibrage", "décentré", "pédalier", "retour de force", "g hub"],
    summary: "Au démarrage, un volant à retour de force tourne à fond d'un côté puis de l'autre : c'est son calibrage. S'il est raté ou si le volant tire d'un côté, une remise sous tension propre suffit souvent.",
    safety: "Gardez les mains hors du volant pendant qu'il se calibre : il tourne seul avec force.",
    tools: ["Ordinateur ou console", "Logiciel du fabricant (G HUB pour Logitech)"],
    parts: [],
    sources: [
      { label: "SimRacingCockpit — dépannage des volants Logitech G29, G920 et G923", url: "https://simracingcockpit.gg/logitech-wheel-troubleshooting/" },
      { label: "Joycheck — logiciel des volants Logitech : G HUB ou Logitech Gaming Software", url: "https://joycheck.io/blog/logitech-wheel-setup/" }
    ],
    steps: [
      { title: "Débrancher entièrement", text: "Débranchez le câble USB, puis l'alimentation du volant." },
      { title: "Attendre", text: "Patientez une quinzaine de secondes.", timer: 15 },
      { title: "Rebrancher dans l'ordre", text: "Rebranchez d'abord l'alimentation, puis l'USB. Branchez de préférence directement sur l'ordinateur ou la console, pas sur un hub." },
      { title: "Laisser calibrer sans toucher", text: "Le volant tourne à fond à gauche, à fond à droite puis revient au centre. Ne le touchez pas avant la fin." },
      { title: "Mettre à jour", text: "Sur PC, installez le logiciel du fabricant (G HUB pour Logitech), mettez à jour le micrologiciel et réglez l'angle de rotation et les pédales." }
    ],
    troubleshoot: [
      "Le volant bouge à peine et un voyant clignote : il ne reçoit pas assez de courant, vérifiez le bloc d'alimentation et sa prise.",
      "Une pédale agit sans qu'on la touche : ajoutez une petite zone morte dans le logiciel.",
      "Cliquetis pendant le retour de force : bruit normal des engrenages, réduisez les effets dans le jeu."
    ]
  }
];
