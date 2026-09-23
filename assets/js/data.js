/* Les Pages Bleues — catégories et guides
   Champs d'un guide :
     safety        consigne de sécurité affichée avant de commencer
     keywords      synonymes utilisés par la recherche
     troubleshoot  pistes si le problème persiste
     sources       pages consultées pour vérifier la fiche [{ label, url }]
     photo         nom d'une photo de assets/img/photos (sinon celle de la catégorie)
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

  /* ================= ÉLECTROMÉNAGER ================= */
  {
    id: "courroie-lave-linge",
    title: "Remplacer la courroie d'un lave-linge",
    category: "electromenager",
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
    parts: ["Enduit de rebouchage", "Plaque de réparation autocollante (trou de plus de 3 cm)"],
    sources: [
      { label: "Bricolage Facile — reboucher un trou dans du placo", url: "https://www.bricolage-facile.net/reboucher-trou-du-placo-ba13/" }
    ],
    steps: [
      { title: "Nettoyer les bords", text: "Coupez au cutter les morceaux de carton et de plâtre qui dépassent, pour avoir des bords nets." },
      { title: "Poser une plaque si le trou est grand", text: "Pour un trou de plus de 3 cm, collez une plaque de réparation autocollante bien centrée par-dessus." },
      { title: "Appliquer l'enduit", text: "Chargez le couteau d'enduit et lissez en croix, en débordant de 5 cm autour. Couche fine : mieux vaut deux passes qu'une épaisse." },
      { title: "Laisser sécher et poncer", text: "Laissez sécher selon le pot (souvent 2 à 4 heures), puis poncez légèrement avec la cale jusqu'à ne plus sentir de bord au toucher.", tip: "Éclairez le mur de côté avec une lampe : les défauts apparaissent tout de suite." },
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

  /* ================= VÉLO, MOTO & MOBILITÉ ================= */
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
    steps: [
      { title: "Démonter la roue", text: "Ouvrez le frein si besoin, desserrez le blocage rapide ou les écrous et sortez la roue.", tip: "Pour la roue arrière, passez sur le plus petit pignon avant de la démonter : ce sera plus simple à remonter." },
      { title: "Sortir la chambre à air", text: "Glissez un démonte-pneu sous le pneu, accrochez-le à un rayon, puis le deuxième 10 cm plus loin et faites le tour. Retirez la chambre." },
      { title: "Trouver le trou", text: "Gonflez un peu la chambre et écoutez, ou plongez-la dans l'eau : le trou fait des bulles. Marquez-le au stylo." },
      { title: "Préparer et encoller", text: "Poncez autour du trou avec le papier du kit, étalez une fine couche de dissolution plus large que la rustine, et laissez sécher.", timer: 180, tip: "La dissolution doit être sèche au toucher : c'est le secret d'une rustine qui tient." },
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

  /* ================= JARDIN & EXTÉRIEUR ================= */
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
    parts: ["Raccord réparateur au diamètre du tuyau (15 ou 19 mm le plus souvent)"],
    steps: [
      { title: "Repérer la fuite", text: "Ouvrez l'eau, repérez le trou, marquez-le, puis fermez le robinet." },
      { title: "Couper la partie abîmée", text: "Coupez le tuyau bien droit de part et d'autre du trou, en retirant 2 cm de chaque côté." },
      { title: "Monter le raccord", text: "Dévissez les bagues du raccord, enfilez-les sur chaque bout de tuyau, puis enfoncez le raccord à fond et revissez fermement les bagues.", tip: "Trempez le bout du tuyau 1 minute dans l'eau chaude : il s'enfilera beaucoup plus facilement." },
      { title: "Tester", text: "Rouvrez l'eau progressivement et vérifiez que rien ne fuit." }
    ],
    troubleshoot: [
      "Ça fuit au raccord : la coupe n'est pas droite ou la bague n'est pas assez serrée."
    ]
  },

  /* ================= LOISIRS & SPORT ================= */
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
      { label: "JV Tech — nettoyer ses manettes sans abîmer les sticks", url: "https://www.jeuxvideo.com/news/2090082/manettes-ps5-xbox-et-switch-comment-les-nettoyer-sans-massacrer-les-sticks-et-les-boutons.htm" }
    ],
    steps: [
      { title: "Essayer sans ouvrir", text: "Appliquez une goutte d'alcool isopropylique à la base du stick avec un coton-tige et faites-le tourner dans tous les sens pendant une minute." },
      { title: "Tester", text: "Laissez l'alcool s'évaporer, rebranchez et testez dans les réglages de la console.", timer: 600 },
      { title: "Ouvrir la manette", text: "Si le drift persiste : retirez les vis (parfois sous les poignées ou les étiquettes) et séparez les coques avec un médiator.", tip: "Photographiez chaque étape : les nappes et ressorts se remontent plus facilement ainsi." },
      { title: "Nettoyer le potentiomètre", text: "Appliquez l'alcool directement sur le mécanisme du stick, faites-le tourner, puis laissez sécher avant de refermer.", timer: 600 },
      { title: "Remonter et recalibrer", text: "Remontez la manette et lancez la calibration des sticks dans les réglages de la console." }
    ],
    troubleshoot: [
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
