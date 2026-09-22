/* Les Pages Bleues — données de démonstration (catégories et guides) */

const CATEGORIES = [
  { id: "automobile", name: "Automobile", icon: "car" },
  { id: "electromenager", name: "Électroménager", icon: "washer" },
  { id: "telephonie", name: "Téléphonie & Informatique", short: "Téléphonie", icon: "laptop" },
  { id: "maison", name: "Maison & Bricolage", short: "Maison", icon: "drill" },
  { id: "velo", name: "Vélo, Moto & Mobilité", short: "Vélo", icon: "bike" },
  { id: "jardin", name: "Jardin & Extérieur", short: "Jardin", icon: "leaf" },
  { id: "loisirs", name: "Loisirs & Sport", short: "Loisirs", icon: "gamepad" },
  { id: "autres", name: "Autres", icon: "more" }
];

const GUIDES = [
  {
    id: "vidange-huile-moteur",
    title: "Changer l'huile moteur",
    category: "automobile",
    difficulty: "Facile",
    duration: "45 min",
    savings: "≈ 60 €",
    popular: true,
    summary: "Une vidange régulière protège votre moteur. Voici comment la faire vous-même, proprement et en sécurité.",
    tools: ["Clé à filtre", "Clé plate ou à douille", "Bac de récupération", "Entonnoir", "Gants"],
    parts: ["Huile moteur (voir carnet d'entretien)", "Filtre à huile", "Joint de bouchon de vidange"],
    steps: [
      { title: "Préparer le véhicule", text: "Faites tourner le moteur 5 minutes pour fluidifier l'huile, puis coupez-le. Garez-vous à plat, serrez le frein à main et laissez refroidir quelques minutes." },
      { title: "Vidanger l'ancienne huile", text: "Placez le bac sous le carter, dévissez le bouchon de vidange et laissez l'huile s'écouler entièrement (10 à 15 minutes)." },
      { title: "Remplacer le filtre", text: "Dévissez l'ancien filtre avec la clé à filtre. Huilez légèrement le joint du nouveau filtre et vissez-le à la main." },
      { title: "Refermer et remplir", text: "Remontez le bouchon avec un joint neuf. Versez la nouvelle huile par l'orifice de remplissage à l'aide de l'entonnoir." },
      { title: "Contrôler le niveau", text: "Attendez deux minutes, vérifiez à la jauge : le niveau doit se situer entre MIN et MAX. Démarrez, contrôlez l'absence de fuite." },
      { title: "Recycler", text: "Rapportez l'huile usagée et le filtre en déchetterie ou chez un garagiste : ne les jetez jamais dans la nature." }
    ]
  },
  {
    id: "courroie-lave-linge",
    title: "Remplacer la courroie d'un lave-linge",
    category: "electromenager",
    difficulty: "Moyen",
    duration: "30 min",
    savings: "≈ 90 €",
    popular: true,
    summary: "Le moteur tourne mais pas le tambour ? La courroie est sans doute usée ou sortie de sa poulie.",
    tools: ["Tournevis cruciforme", "Clé Torx", "Lampe"],
    parts: ["Courroie compatible (référence inscrite dessus)"],
    steps: [
      { title: "Débrancher l'appareil", text: "Coupez l'alimentation électrique et fermez l'arrivée d'eau. Écartez la machine du mur." },
      { title: "Ouvrir le panneau arrière", text: "Dévissez les vis du panneau arrière et retirez-le pour accéder à la poulie du tambour." },
      { title: "Retirer l'ancienne courroie", text: "Notez la référence imprimée sur la courroie. Faites tourner la poulie tout en tirant la courroie pour la dégager." },
      { title: "Installer la nouvelle", text: "Placez la courroie sur la poulie moteur, puis enroulez-la sur la grande poulie en la faisant tourner à la main." },
      { title: "Tester", text: "Tournez la poulie à la main pour vérifier l'alignement, revissez le panneau et lancez un cycle court." }
    ]
  },
  {
    id: "ecran-telephone",
    title: "Remplacer un écran de téléphone",
    category: "telephonie",
    difficulty: "Difficile",
    duration: "1 h 30",
    savings: "≈ 120 €",
    popular: true,
    summary: "Un écran fissuré n'est pas une fatalité. Avec patience et le bon kit, votre téléphone repart pour des années.",
    tools: ["Kit de tournevis de précision", "Ventouse", "Médiators", "Pistolet à chaleur ou sèche-cheveux", "Pince brucelles"],
    parts: ["Écran de remplacement compatible", "Adhésif d'étanchéité"],
    steps: [
      { title: "Éteindre et chauffer", text: "Éteignez le téléphone. Chauffez doucement les bords de l'écran pour ramollir la colle (environ 80 °C)." },
      { title: "Décoller l'écran", text: "Posez la ventouse, soulevez légèrement et glissez un médiator. Faites le tour sans forcer pour couper la colle." },
      { title: "Déconnecter la batterie", text: "Retirez la plaque de protection et débranchez la batterie en premier, avant toute nappe." },
      { title: "Changer l'écran", text: "Débranchez les nappes de l'ancien écran, connectez celles du nouveau, puis rebranchez la batterie pour tester." },
      { title: "Refermer", text: "Si tout fonctionne, posez l'adhésif neuf, refermez et pressez quelques minutes." }
    ]
  },
  {
    id: "plaquettes-frein",
    title: "Changer les plaquettes de frein",
    category: "automobile",
    difficulty: "Moyen",
    duration: "1 h",
    savings: "≈ 100 €",
    popular: true,
    summary: "Bruit métallique au freinage ? Il est temps de changer vos plaquettes. Toujours par paire, sur un même essieu.",
    tools: ["Cric et chandelles", "Clé à roue", "Clé à douille", "Repousse-piston", "Brosse métallique"],
    parts: ["Jeu de plaquettes avant ou arrière", "Graisse cuivrée"],
    steps: [
      { title: "Lever la voiture", text: "Desserrez les écrous, levez le véhicule et posez-le sur chandelles. Retirez la roue." },
      { title: "Déposer l'étrier", text: "Dévissez les vis de guidage de l'étrier et basculez-le, sans laisser pendre le flexible." },
      { title: "Retirer les plaquettes", text: "Sortez les anciennes plaquettes, nettoyez le support à la brosse et contrôlez l'épaisseur du disque." },
      { title: "Repousser le piston", text: "Repoussez le piston avec l'outil adapté pour laisser la place aux plaquettes neuves." },
      { title: "Remonter", text: "Posez les plaquettes, remontez l'étrier au couple, puis la roue. Pompez la pédale plusieurs fois avant de rouler." }
    ]
  },
  {
    id: "voiture-ne-demarre-plus",
    title: "Voiture qui ne démarre plus : diagnostic",
    category: "automobile",
    difficulty: "Facile",
    duration: "20 min",
    savings: "≈ 80 €",
    summary: "Batterie, démarreur ou alimentation ? Une méthode simple pour trouver la cause avant d'appeler un dépanneur.",
    tools: ["Multimètre", "Câbles de démarrage"],
    parts: [],
    steps: [
      { title: "Observer les symptômes", text: "Rien ne s'allume ? Plutôt la batterie. Un « clic » sans lancement ? Démarreur ou batterie faible. Le moteur tourne sans démarrer ? Carburant ou allumage." },
      { title: "Mesurer la batterie", text: "Au multimètre, une batterie saine affiche environ 12,6 V à l'arrêt. En dessous de 12,2 V, elle est déchargée." },
      { title: "Vérifier les cosses", text: "Des cosses oxydées ou desserrées empêchent le courant de passer. Nettoyez-les et resserrez-les." },
      { title: "Tenter un démarrage assisté", text: "Branchez les câbles : rouge sur + / +, noir sur – de la batterie saine puis sur une masse métallique du véhicule en panne." }
    ]
  },
  {
    id: "lave-linge-ne-vidange-pas",
    title: "Lave-linge qui ne vidange plus",
    category: "electromenager",
    difficulty: "Facile",
    duration: "20 min",
    savings: "≈ 70 €",
    summary: "Dans la majorité des cas, un simple nettoyage du filtre de vidange suffit.",
    tools: ["Serpillière", "Bassine plate", "Tournevis plat"],
    parts: [],
    steps: [
      { title: "Accéder au filtre", text: "Ouvrez la trappe en bas à l'avant de la machine. Placez une bassine plate et des serviettes." },
      { title: "Vider l'eau", text: "Utilisez le petit tuyau de vidange d'urgence s'il existe, sinon dévissez lentement le filtre." },
      { title: "Nettoyer", text: "Retirez pièces, cheveux et peluches. Vérifiez que l'hélice de la pompe tourne librement." },
      { title: "Remonter et tester", text: "Revissez le filtre bien à fond et lancez un programme essorage." }
    ]
  },
  {
    id: "crevaison-velo",
    title: "Réparer une crevaison de vélo",
    category: "velo",
    difficulty: "Facile",
    duration: "15 min",
    savings: "≈ 15 €",
    summary: "Le geste de base de tout cycliste : démonter, trouver le trou, rustiner.",
    tools: ["Démonte-pneus", "Pompe"],
    parts: ["Kit de rustines"],
    steps: [
      { title: "Démonter la roue", text: "Ouvrez le frein si besoin, desserrez le blocage et sortez la roue." },
      { title: "Sortir la chambre à air", text: "Glissez les démonte-pneus sous le pneu, faites le tour et retirez la chambre." },
      { title: "Trouver le trou", text: "Gonflez légèrement et écoutez, ou plongez la chambre dans l'eau pour repérer les bulles." },
      { title: "Rustiner", text: "Poncez, appliquez la dissolution, attendez qu'elle sèche puis pressez fermement la rustine." },
      { title: "Remonter", text: "Vérifiez l'intérieur du pneu (épine, verre), remontez et gonflez à la pression indiquée." }
    ]
  },
  {
    id: "robinet-qui-fuit",
    title: "Réparer un robinet qui fuit",
    category: "maison",
    difficulty: "Facile",
    duration: "30 min",
    savings: "≈ 90 €",
    summary: "Un robinet qui goutte gaspille jusqu'à 120 litres par jour. Le joint ou la cartouche sont souvent en cause.",
    tools: ["Clé à molette", "Tournevis", "Chiffon"],
    parts: ["Joint ou cartouche compatible"],
    steps: [
      { title: "Couper l'eau", text: "Fermez l'arrivée d'eau sous l'évier ou au compteur, puis ouvrez le robinet pour vider." },
      { title: "Démonter la tête", text: "Retirez le cache, dévissez la vis de la poignée puis la tête de robinet ou la cartouche." },
      { title: "Remplacer la pièce", text: "Emportez l'ancienne pièce en magasin pour trouver la bonne référence, et installez la neuve." },
      { title: "Remonter et tester", text: "Remontez, rouvrez l'eau doucement et vérifiez l'absence de fuite." }
    ]
  },
  {
    id: "tondeuse-ne-demarre-pas",
    title: "Tondeuse thermique qui ne démarre pas",
    category: "jardin",
    difficulty: "Moyen",
    duration: "40 min",
    savings: "≈ 60 €",
    summary: "Après l'hiver, bougie encrassée et essence vieillie sont les suspects habituels.",
    tools: ["Clé à bougie", "Brosse métallique", "Tournevis"],
    parts: ["Bougie neuve", "Filtre à air", "Essence fraîche"],
    steps: [
      { title: "Sécuriser", text: "Débranchez le capuchon de bougie avant toute intervention sous le carter." },
      { title: "Remplacer l'essence", text: "Videz l'essence de plus de 30 jours et remplissez avec de l'essence fraîche." },
      { title: "Contrôler la bougie", text: "Dévissez-la : si elle est noire ou humide, nettoyez-la ou remplacez-la." },
      { title: "Nettoyer le filtre à air", text: "Un filtre colmaté étouffe le moteur : soufflez-le ou remplacez-le." }
    ]
  },
  {
    id: "joystick-drift",
    title: "Corriger le drift d'une manette",
    category: "loisirs",
    difficulty: "Moyen",
    duration: "45 min",
    savings: "≈ 50 €",
    summary: "Votre personnage bouge tout seul ? Un nettoyage du joystick règle souvent le problème.",
    tools: ["Tournevis de précision", "Médiator", "Alcool isopropylique", "Coton-tige"],
    parts: ["Module joystick (si remplacement)"],
    steps: [
      { title: "Ouvrir la manette", text: "Retirez les vis (parfois sous les poignées) et séparez les coques avec un médiator." },
      { title: "Nettoyer le potentiomètre", text: "Appliquez quelques gouttes d'alcool isopropylique à la base du stick et faites-le tourner." },
      { title: "Laisser sécher et tester", text: "Attendez 10 minutes, remontez partiellement et testez. Si le drift persiste, remplacez le module." }
    ]
  },
  {
    id: "pc-lent",
    title: "Redonner de la vitesse à un vieil ordinateur",
    category: "telephonie",
    difficulty: "Facile",
    duration: "1 h",
    savings: "≈ 400 €",
    summary: "Avant de racheter, un SSD et un peu de ménage peuvent transformer votre machine.",
    tools: ["Tournevis cruciforme", "Clé USB", "Bombe d'air sec"],
    parts: ["SSD 2,5\" (optionnel)", "Pâte thermique (optionnel)"],
    steps: [
      { title: "Sauvegarder", text: "Copiez vos fichiers importants sur un disque externe ou dans le cloud." },
      { title: "Dépoussiérer", text: "Soufflez les grilles d'aération : un PC qui chauffe ralentit pour se protéger." },
      { title: "Installer un SSD", text: "Remplacez le disque dur mécanique par un SSD : c'est le gain le plus spectaculaire." },
      { title: "Réinstaller proprement", text: "Réinstallez le système depuis une clé USB et n'ajoutez que les logiciels utiles." }
    ]
  }
];
