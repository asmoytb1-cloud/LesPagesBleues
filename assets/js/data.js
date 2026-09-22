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
    safety: "Mettez des gants et des lunettes : l'huile chaude brûle. Ne travaillez jamais sous une voiture tenue seulement par un cric.",
    tools: ["Clé à filtre", "Clé plate ou à douille", "Bac de récupération", "Entonnoir", "Gants"],
    parts: ["Huile moteur (voir carnet d'entretien)", "Filtre à huile", "Joint de bouchon de vidange"],
    steps: [
      { title: "Préparer le véhicule", text: "Faites tourner le moteur 5 minutes pour fluidifier l'huile, puis coupez-le. Garez-vous à plat, serrez le frein à main et laissez refroidir quelques minutes." },
      { title: "Vidanger l'ancienne huile", text: "Placez le bac sous le carter, dévissez le bouchon de vidange et laissez l'huile s'écouler entièrement (10 à 15 minutes).", tip: "Dévissez les derniers tours à la main en poussant le bouchon vers le haut : l'huile ne vous coulera pas sur le bras." },
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
    safety: "Débranchez la prise avant d'ouvrir la machine, et mettez des gants : les tôles du châssis coupent.",
    tools: ["Gants", "Clé à douille de 10", "Tournevis cruciforme", "Lampe", "Petit bol pour les vis"],
    parts: ["Courroie compatible (référence inscrite dessus)"],
    steps: [
      { title: "Débrancher et dégager la machine", text: "Mettez des gants. Débranchez la prise, fermez le robinet d'arrivée d'eau et tirez doucement la machine pour avoir accès à l'arrière.", tip: "Prenez une photo de l'arrière avant de toucher à quoi que ce soit : elle vous servira au remontage." },
      { title: "Retirer le panneau arrière", text: "Prenez la douille de 10 (ou le tournevis cruciforme selon le modèle) et commencez par retirer les vis du cache arrière, en partant du haut. Posez-les dans un bol pour ne pas les perdre." },
      { title: "Noter la référence de la courroie", text: "Regardez la courroie : une référence est imprimée dessus (par exemple 1192 J5). Notez-la ou prenez-la en photo." },
      { title: "Enlever l'ancienne courroie", text: "Tirez la courroie vers vous d'une main et faites tourner la grande poulie de l'autre : elle sort toute seule.", safety: "Gardez les doigts hors de l'espace entre la courroie et la poulie." },
      { title: "Poser la courroie sur la poulie moteur", text: "Placez la nouvelle courroie d'abord autour de la petite poulie du moteur, bien dans les rainures." },
      { title: "Enrouler sur la grande poulie", text: "Posez la courroie sur le haut de la grande poulie, puis tournez celle-ci à la main : la courroie se met en place progressivement.", tip: "C'est normal que ce soit serré : une courroie neuve doit être bien tendue." },
      { title: "Vérifier, refermer et tester", text: "Faites faire quelques tours à la poulie pour vérifier l'alignement. Revissez le cache avec la douille de 10, rebranchez et lancez un programme rinçage-essorage." }
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
    safety: "Travaillez sur une surface propre et claire. Une batterie percée peut prendre feu : ne forcez jamais dessus avec un outil métallique.",
    tools: ["Kit de tournevis de précision", "Ventouse", "Médiators", "Pistolet à chaleur ou sèche-cheveux", "Pince brucelles"],
    parts: ["Écran de remplacement compatible", "Adhésif d'étanchéité"],
    steps: [
      { title: "Éteindre et chauffer", text: "Éteignez le téléphone. Chauffez doucement les bords de l'écran pour ramollir la colle (environ 80 °C).", tip: "Rangez chaque vis sur un papier en dessinant le téléphone : elles n'ont pas toutes la même longueur." },
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
    safety: "Mettez des gants. Posez toujours la voiture sur chandelles, jamais sur le seul cric.",
    tools: ["Cric et chandelles", "Clé à roue", "Clé à douille", "Repousse-piston", "Brosse métallique"],
    parts: ["Jeu de plaquettes avant ou arrière", "Graisse cuivrée"],
    steps: [
      { title: "Lever la voiture", text: "Desserrez les écrous, levez le véhicule et posez-le sur chandelles. Retirez la roue." },
      { title: "Déposer l'étrier", text: "Dévissez les vis de guidage de l'étrier et basculez-le, sans laisser pendre le flexible." },
      { title: "Retirer les plaquettes", text: "Sortez les anciennes plaquettes, nettoyez le support à la brosse et contrôlez l'épaisseur du disque." },
      { title: "Repousser le piston", text: "Repoussez le piston avec l'outil adapté pour laisser la place aux plaquettes neuves.", safety: "Surveillez le bocal de liquide de frein : il remonte quand on repousse le piston et ne doit pas déborder." },
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
    safety: "Retirez bagues et montre avant de toucher la batterie, et ne mettez jamais en contact le + et le –.",
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
    safety: "Débranchez la machine. Il reste souvent plusieurs litres d'eau : protégez le sol.",
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
    safety: "Pas de danger particulier : prévoyez juste un chiffon, les mains vont noircir.",
    tools: ["Démonte-pneus", "Pompe"],
    parts: ["Kit de rustines"],
    steps: [
      { title: "Démonter la roue", text: "Ouvrez le frein si besoin, desserrez le blocage et sortez la roue." },
      { title: "Sortir la chambre à air", text: "Glissez les démonte-pneus sous le pneu, faites le tour et retirez la chambre." },
      { title: "Trouver le trou", text: "Gonflez légèrement et écoutez, ou plongez la chambre dans l'eau pour repérer les bulles." },
      { title: "Rustiner", text: "Poncez, appliquez la dissolution, attendez qu'elle sèche puis pressez fermement la rustine.", tip: "Attendez vraiment que la dissolution soit sèche au toucher (2-3 minutes) : c'est le secret d'une rustine qui tient." },
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
    safety: "Coupez l'eau avant de démonter quoi que ce soit, et gardez un chiffon sous la main.",
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
    safety: "Mettez des gants et débranchez le capuchon de bougie avant de toucher à la lame. Faites le plein moteur froid.",
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
    safety: "Débranchez la manette et retirez la batterie si possible. L'alcool isopropylique est inflammable.",
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
    safety: "Éteignez et débranchez l'ordinateur. Touchez une surface métallique avant d'ouvrir pour décharger l'électricité statique.",
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
