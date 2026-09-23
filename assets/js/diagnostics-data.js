/* Les Pages Bleues — base de connaissances du diagnostic guidé.
   Chaque symptôme propose quelques questions ; chaque cause possible gagne ou perd des points selon
   les réponses (weights[question][réponse]). Les causes renvoient vers une fiche (guide) quand elle existe.
   Réponses possibles : "oui", "non", "nsp" (je ne sais pas). */

const YES_NO = [{ v: "oui", label: "Oui" }, { v: "non", label: "Non" }, { v: "nsp", label: "Je ne sais pas" }];

const DIAGNOSTICS = [
  {
    id: "lave-linge-ne-demarre-pas", title: "Le lave-linge ne démarre pas", device: "Lave-linge", category: "electromenager",
    keywords: ["lave-linge", "machine à laver", "démarre pas", "démarre plus", "s'allume pas", "rien ne se passe", "bouton départ"],
    intro: "Commençons par les causes les plus simples : dans la majorité des cas, la machine se protège à cause d'un détail.",
    questions: [
      { id: "voyants", text: "L'écran ou les voyants s'allument-ils ?", options: YES_NO },
      { id: "clic", text: "Entendez-vous un « clic » quand vous fermez la porte ?", options: YES_NO },
      { id: "cadenas", text: "Voyez-vous un petit cadenas ou une clé allumée sur l'écran ?", options: YES_NO }
    ],
    causes: [
      { title: "Pas de courant : prise, rallonge ou disjoncteur", base: 1, weights: { voyants: { non: 5, oui: -4 } },
        checks: ["Branchez une lampe sur la même prise.", "Regardez au tableau électrique si un disjoncteur a sauté."], guide: "lave-linge-ne-demarre-plus", level: 1 },
      { title: "Porte mal fermée ou sécurité de porte en panne", base: 1, weights: { clic: { non: 4, oui: -2 }, voyants: { oui: 1 } },
        checks: ["Refermez fermement la porte.", "Si le « clic » ne vient plus du tout, la sécurité de porte est probablement en cause."], guide: "securite-porte-lave-linge", level: 2 },
      { title: "Sécurité enfant activée", base: 0, weights: { cadenas: { oui: 6, non: -3 }, voyants: { oui: 1, non: -3 } },
        checks: ["Maintenez les deux touches indiquées dans la notice pendant 3 secondes."], guide: "lave-linge-ne-demarre-plus", level: 1 },
      { title: "Carte électronique ou câble d'alimentation", base: 0, weights: { voyants: { non: 2 }, clic: { oui: 1 } },
        checks: ["Si la prise fonctionne mais que rien ne s'allume, faites établir un diagnostic par un professionnel."], pro: true, level: 3 }
    ]
  },
  {
    id: "lave-linge-ne-vidange-pas", title: "Le lave-linge ne vidange plus", device: "Lave-linge", category: "electromenager",
    keywords: ["lave-linge", "machine à laver", "vidange", "eau reste", "reste de l'eau", "n'essore pas", "pompe", "filtre"],
    intro: "De l'eau qui reste dans le tambour vient presque toujours d'un bouchon sur le chemin de l'évacuation.",
    safety: "Débranchez la machine avant d'ouvrir le filtre : il peut rester plusieurs litres d'eau.",
    questions: [
      { id: "ronron", text: "Entendez-vous la pompe tourner (un ronronnement) en fin de cycle ?", options: YES_NO },
      { id: "filtre", text: "Avez-vous nettoyé le filtre de vidange depuis moins de 3 mois ?", options: YES_NO },
      { id: "tuyau", text: "Le tuyau d'évacuation derrière la machine a-t-il pu être plié ou déplacé ?", options: YES_NO }
    ],
    causes: [
      { title: "Filtre de vidange bouché", base: 3, weights: { filtre: { non: 3, oui: -2 }, ronron: { oui: 1 } },
        checks: ["Ouvrez la trappe en bas à l'avant et nettoyez le filtre."], guide: "lave-linge-ne-vidange-pas", level: 1 },
      { title: "Tuyau d'évacuation plié ou bouché", base: 1, weights: { tuyau: { oui: 4, non: -1 }, filtre: { oui: 1 } },
        checks: ["Écartez la machine et vérifiez que le tuyau n'est ni écrasé ni plié.", "Vérifiez que le siphon où il se branche n'est pas bouché."], guide: "evier-bouche", level: 1 },
      { title: "Pompe de vidange bloquée ou en fin de vie", base: 0, weights: { ronron: { non: 3, oui: 1 }, filtre: { oui: 2 } },
        checks: ["Filtre retiré, vérifiez que l'hélice de la pompe tourne librement avec le doigt.", "Si elle ne tourne pas du tout malgré un filtre propre, la pompe est à remplacer."], guide: "lave-linge-ne-vidange-pas", level: 2 }
    ]
  },
  {
    id: "lave-linge-tambour-ne-tourne-pas", title: "Le tambour du lave-linge ne tourne plus", device: "Lave-linge", category: "electromenager",
    keywords: ["lave-linge", "machine à laver", "tambour", "ne tourne pas", "ne tourne plus", "courroie", "moteur"],
    intro: "Le moteur entraîne le tambour par une courroie : c'est souvent elle qui a lâché.",
    safety: "Débranchez la machine avant de toucher au tambour.",
    questions: [
      { id: "moteur", text: "Entendez-vous le moteur tourner alors que le tambour reste immobile ?", options: YES_NO },
      { id: "libre", text: "Machine débranchée, le tambour tourne-t-il très facilement à la main, sans résistance ?", options: YES_NO },
      { id: "odeur", text: "Avez-vous senti une odeur de brûlé ?", options: YES_NO }
    ],
    causes: [
      { title: "Courroie cassée ou sortie de sa poulie", base: 2, weights: { moteur: { oui: 4, non: -1 }, libre: { oui: 3, non: -2 } },
        checks: ["Retirez le panneau arrière et regardez si la courroie est en place."], guide: "courroie-lave-linge", level: 2 },
      { title: "Charbons du moteur usés", base: 1, weights: { moteur: { non: 3 }, odeur: { oui: 1 } },
        checks: ["Les charbons se contrôlent en démontant le moteur : c'est une réparation intermédiaire, faites-vous accompagner."], level: 2, pro: true },
      { title: "Moteur ou carte électronique", base: 0, weights: { moteur: { non: 2 }, odeur: { oui: 3 } },
        checks: ["Une odeur de brûlé impose d'arrêter d'utiliser la machine et de demander un diagnostic professionnel."], pro: true, level: 3 }
    ]
  },
  {
    id: "lave-linge-bruit-essorage", title: "Le lave-linge fait du bruit à l'essorage", device: "Lave-linge", category: "electromenager",
    keywords: ["lave-linge", "machine à laver", "bruit", "claque", "claquement", "cogne", "tape", "essorage", "vibre", "vibration", "grince"],
    intro: "Un bruit à l'essorage peut venir d'un objet oublié, d'un mauvais calage, des amortisseurs ou des roulements. Quelques questions pour faire le tri.",
    safety: "Débranchez la machine avant de manipuler le tambour.",
    questions: [
      { id: "main", text: "Machine débranchée, entendez-vous un bruit (raclement, tintement) en tournant le tambour à la main ?", options: YES_NO },
      { id: "vibre", text: "La machine vibre-t-elle fortement ou se déplace-t-elle pendant l'essorage ?", options: YES_NO },
      { id: "brusque", text: "Le bruit est-il apparu brusquement, d'un lavage à l'autre ?", options: YES_NO },
      { id: "rebond", text: "Hublot ouvert, si vous appuyez fort sur le haut du tambour, rebondit-il plusieurs fois ?", options: YES_NO }
    ],
    causes: [
      { title: "Un objet coincé entre le tambour et la cuve", base: 2, weights: { main: { oui: 4, non: -2 }, brusque: { oui: 2, non: -1 } },
        checks: ["Tournez le tambour à la main et écoutez : un tintement métallique trahit une pièce ou une baleine de soutien-gorge.", "Nettoyez le filtre de vidange, où finissent souvent ces objets."], guide: "lave-linge-ne-vidange-pas", level: 1 },
      { title: "Linge mal réparti ou machine mal calée", base: 2, weights: { vibre: { oui: 3, non: -2 }, main: { non: 1 } },
        checks: ["Vérifiez que la machine est de niveau et que ses quatre pieds touchent le sol.", "Relancez un essorage avec une charge normale, bien répartie.", "Sur une machine neuve ou déménagée, vérifiez que les cales de transport ont été retirées."], level: 1 },
      { title: "Amortisseurs usés", base: 0, weights: { rebond: { oui: 5, non: -2 }, vibre: { oui: 2 }, brusque: { non: 1 } },
        checks: ["Un tambour qui rebondit plusieurs fois au lieu de se stabiliser indique des amortisseurs fatigués. On les remplace toujours par paire."], level: 2, time: "environ 45 min" },
      { title: "Roulements du tambour usés", base: 0, weights: { main: { oui: 2 }, brusque: { non: 2 }, vibre: { non: 1 } },
        checks: ["Soulevez le bord du tambour : un jeu important et un grondement en rotation signalent des roulements usés.", "C'est une réparation lourde : faites établir un devis (le bonus réparation peut s'appliquer)."], pro: true, level: 3 }
    ]
  },
  {
    id: "voiture-ne-demarre-pas", title: "La voiture ne démarre pas", device: "Voiture", category: "automobile",
    keywords: ["voiture", "auto", "démarre pas", "démarre plus", "batterie", "démarreur", "clic", "ne part pas", "moteur"],
    intro: "Batterie, démarreur ou alimentation : les symptômes permettent souvent de trancher en deux minutes.",
    safety: "Retirez bagues et montre avant de toucher la batterie, et ne mettez jamais en contact le + et le –.",
    questions: [
      { id: "tableau", text: "En mettant le contact, le tableau de bord s'allume-t-il normalement ?", options: YES_NO },
      { id: "clic", text: "En tournant la clé (ou en appuyant sur Start), entendez-vous seulement un « clic » ?", options: YES_NO },
      { id: "lance", text: "Le moteur tourne-t-il (il « brasse ») sans jamais démarrer ?", options: YES_NO },
      { id: "froid", text: "Fait-il froid, ou la voiture est-elle restée plusieurs jours sans rouler ?", options: YES_NO }
    ],
    causes: [
      { title: "Batterie déchargée", base: 2, weights: { tableau: { non: 4, oui: -1 }, clic: { oui: 3 }, froid: { oui: 2 }, lance: { oui: -3 } },
        checks: ["Mesurez la batterie au multimètre : environ 12,6 V si elle est chargée, moins de 12,2 V si elle est à moitié vide.", "Tentez un démarrage avec des câbles ou un booster."], guide: "voiture-ne-demarre-plus", level: 1 },
      { title: "Cosses de batterie oxydées ou desserrées", base: 1, weights: { tableau: { non: 2 }, clic: { oui: 1 } },
        checks: ["Des dépôts blanchâtres ou une cosse qui bouge empêchent le courant de passer : nettoyez et resserrez."], guide: "voiture-ne-demarre-plus", level: 1 },
      { title: "Démarreur défaillant", base: 0, weights: { clic: { oui: 3 }, tableau: { oui: 2, non: -2 }, lance: { oui: -3 } },
        checks: ["Si la batterie est bonne mais qu'on n'entend qu'un « clac », le démarreur est probablement en cause : faites-le contrôler."], pro: true, level: 3 },
      { title: "Alimentation en carburant ou allumage", base: 0, weights: { lance: { oui: 5, non: -3 }, tableau: { oui: 1 } },
        checks: ["Vérifiez le niveau de carburant (la jauge peut mentir).", "Si le moteur brasse sans démarrer avec du carburant, faites lire les codes défaut par un garage."], pro: true, level: 3 }
    ]
  },
  {
    id: "bruit-freinage", title: "Bruit en freinant (voiture)", device: "Voiture", category: "automobile",
    keywords: ["voiture", "frein", "freinage", "bruit", "grince", "grincement", "couine", "frotte", "métal"],
    intro: "Les freins sont un organe de sécurité : un bruit métallique mérite une vérification rapide.",
    safety: "En cas de doute sur l'efficacité du freinage, ne roulez pas et faites contrôler le véhicule.",
    questions: [
      { id: "metal", text: "Est-ce un bruit métallique qui frotte ou qui racle ?", options: YES_NO },
      { id: "voyant", text: "Un voyant d'usure des freins est-il allumé au tableau de bord ?", options: YES_NO },
      { id: "humide", text: "Le bruit disparaît-il après quelques freinages, surtout par temps humide ?", options: YES_NO }
    ],
    causes: [
      { title: "Plaquettes usées", base: 2, weights: { metal: { oui: 3 }, voyant: { oui: 4 }, humide: { non: 1 } },
        checks: ["Regardez l'épaisseur de garniture à travers la jante : en dessous de 3 mm environ, il faut changer les plaquettes."], guide: "plaquettes-frein", level: 2 },
      { title: "Disques usés ou voilés", base: 0, weights: { metal: { oui: 2 }, humide: { non: 1 } },
        checks: ["Un disque creusé, avec un gros rebord, ou des vibrations dans la pédale indiquent qu'il faut changer les disques (par paire)."], pro: true, level: 3 },
      { title: "Humidité ou légère rouille de surface", base: 1, weights: { humide: { oui: 5, non: -3 }, metal: { non: 1 }, voyant: { oui: -3 } },
        checks: ["Un léger couinement qui disparaît après quelques freinages est normal après la pluie ou un stationnement prolongé."], level: 1 }
    ]
  },
  {
    id: "telephone-ne-charge-pas", title: "Le téléphone ne charge plus bien", device: "Téléphone", category: "telephonie",
    keywords: ["téléphone", "smartphone", "portable", "charge", "chargeur", "ne charge pas", "câble", "port", "batterie", "iphone", "android"],
    intro: "Avant de soupçonner la batterie, vérifions le plus fréquent : le câble et le port de charge.",
    questions: [
      { id: "autre", text: "Avez-vous essayé avec un autre câble et un autre chargeur en bon état ?", options: [{ v: "oui-ok", label: "Oui, et ça marche" }, { v: "oui-ko", label: "Oui, sans succès" }, { v: "non", label: "Pas encore" }] },
      { id: "tient", text: "Le câble tient-il mal dans le port, ou faut-il le tenir en biais pour que ça charge ?", options: YES_NO },
      { id: "vite", text: "Le téléphone se décharge-t-il beaucoup plus vite qu'avant ?", options: YES_NO }
    ],
    causes: [
      { title: "Câble ou chargeur défectueux", base: 2, weights: { autre: { "oui-ok": 8, "oui-ko": -4, non: 2 } },
        checks: ["Testez un autre câble et un autre chargeur : ce sont les pièces qui s'usent le plus vite."], level: 1 },
      { title: "Port de charge encrassé", base: 2, weights: { tient: { oui: 4, non: -1 }, autre: { "oui-ko": 2 } },
        checks: ["Éteignez le téléphone et regardez le port avec une lampe : de la poussière tassée au fond empêche le contact."], guide: "telephone-ne-charge-plus", level: 1 },
      { title: "Batterie usée", base: 0, weights: { vite: { oui: 4, non: -2 }, autre: { "oui-ko": 1 } },
        checks: ["Consultez l'état de la batterie dans les réglages : en dessous de 80 % de capacité, elle est usée.", "Le remplacement se fait chez un réparateur (bonus réparation possible chez un réparateur labellisé)."], pro: true, level: 3 }
    ]
  },
  {
    id: "ecran-casse", title: "Écran de téléphone fissuré ou qui n'affiche plus", device: "Téléphone", category: "telephonie",
    keywords: ["téléphone", "smartphone", "écran", "fissuré", "cassé", "vitre", "tactile", "noir", "affichage"],
    intro: "Selon que l'image s'affiche encore ou non, la réparation n'est pas la même.",
    questions: [
      { id: "image", text: "L'écran affiche-t-il encore l'image normalement ?", options: YES_NO },
      { id: "tactile", text: "Le tactile répond-il partout ?", options: YES_NO },
      { id: "gonfle", text: "L'écran se soulève-t-il ou le téléphone semble-t-il gonflé ?", options: YES_NO }
    ],
    causes: [
      { title: "Vitre cassée, écran encore fonctionnel", base: 2, weights: { image: { oui: 3, non: -3 }, tactile: { oui: 2 } },
        checks: ["Protégez la vitre avec un film pour éviter les coupures et les infiltrations en attendant la réparation."], guide: "ecran-telephone", level: 3 },
      { title: "Bloc écran (dalle) endommagé", base: 0, weights: { image: { non: 4 }, tactile: { non: 3 } },
        checks: ["Taches noires, lignes ou écran noir : il faut remplacer le bloc écran complet."], guide: "ecran-telephone", level: 3 },
      { title: "Batterie gonflée — danger", base: 0, weights: { gonfle: { oui: 10, non: -5 } },
        checks: ["N'utilisez plus et ne rechargez plus le téléphone. Ne percez jamais la batterie : confiez-le à un réparateur."], pro: true, level: 3, danger: true }
    ]
  },
  {
    id: "ordinateur-lent", title: "L'ordinateur est devenu très lent", device: "Ordinateur", category: "telephonie",
    keywords: ["ordinateur", "pc", "portable", "lent", "rame", "ventilateur", "chauffe", "bruit", "windows"],
    intro: "Un ordinateur qui rame n'est pas forcément bon à jeter : trois causes reviennent souvent.",
    questions: [
      { id: "chauffe", text: "Le ventilateur souffle-t-il fort ou l'ordinateur chauffe-t-il beaucoup ?", options: YES_NO },
      { id: "demarrage", text: "Le démarrage prend-il plusieurs minutes ?", options: YES_NO },
      { id: "ssd", text: "Savez-vous si l'ordinateur a un disque SSD ?", options: [{ v: "ssd", label: "Oui, un SSD" }, { v: "hdd", label: "Non, un disque dur classique" }, { v: "nsp", label: "Je ne sais pas" }] }
    ],
    causes: [
      { title: "Poussière et surchauffe", base: 1, weights: { chauffe: { oui: 4, non: -2 } },
        checks: ["Dépoussiérez les grilles d'aération : un ordinateur qui chauffe ralentit pour se protéger."], guide: "pc-lent", level: 1 },
      { title: "Disque dur mécanique trop lent", base: 1, weights: { ssd: { hdd: 5, ssd: -4, nsp: 1 }, demarrage: { oui: 2 } },
        checks: ["Remplacer le disque dur par un SSD est l'amélioration la plus spectaculaire."], guide: "pc-lent", level: 2 },
      { title: "Trop de logiciels au démarrage", base: 2, weights: { demarrage: { oui: 2 } },
        checks: ["Désactivez les programmes inutiles au démarrage (Gestionnaire des tâches > Démarrage)."], guide: "pc-lent", level: 1 }
    ]
  },
  {
    id: "robinet-fuit", title: "Le robinet fuit ou goutte", device: "Robinet", category: "maison",
    keywords: ["robinet", "fuite", "fuit", "goutte", "mitigeur", "évier", "lavabo", "plomberie"],
    intro: "Un robinet qui goutte perd près de 100 litres d'eau par jour : la réparation vaut le coup.",
    questions: [
      { id: "bec", text: "L'eau goutte-t-elle par le bec quand le robinet est fermé ?", options: YES_NO },
      { id: "pied", text: "L'eau fuit-elle au pied du robinet ou sous la poignée ?", options: YES_NO },
      { id: "mitigeur", text: "Est-ce un mitigeur (une seule manette pour le chaud et le froid) ?", options: YES_NO }
    ],
    causes: [
      { title: "Joint ou cartouche usé", base: 2, weights: { bec: { oui: 4, non: -2 }, mitigeur: { oui: 1 } },
        checks: ["Coupez l'eau, démontez la tête ou la cartouche et emportez-la en magasin pour trouver la même."], guide: "robinet-qui-fuit", level: 1 },
      { title: "Joints toriques du bec ou de la tête usés", base: 0, weights: { pied: { oui: 5, non: -2 } },
        checks: ["Une fuite au pied ou sous la poignée vient des joints toriques : ils se changent de la même façon."], guide: "robinet-qui-fuit", level: 1 },
      { title: "Raccord ou flexible sous l'évier", base: 0, weights: { pied: { oui: 1 }, bec: { non: 2 } },
        checks: ["Essuyez tout, puis passez un papier sec sous les raccords pour repérer la goutte.", "Resserrez doucement le raccord ou remplacez le flexible."], level: 1 }
    ]
  },
  {
    id: "chasse-eau-coule", title: "La chasse d'eau coule en permanence", device: "Toilettes", category: "maison",
    keywords: ["toilettes", "wc", "chasse d'eau", "coule", "fuite", "eau coule", "cuvette", "flotteur", "réservoir"],
    intro: "Une chasse d'eau qui fuit peut perdre jusqu'à 400 litres par jour. Deux pièces sont presque toujours en cause.",
    questions: [
      { id: "tropplein", text: "Réservoir ouvert, l'eau passe-t-elle par-dessus le tube central (le trop-plein) ?", options: YES_NO },
      { id: "remplit", text: "Le réservoir se remet-il à remplir tout seul de temps en temps ?", options: YES_NO }
    ],
    causes: [
      { title: "Flotteur réglé trop haut", base: 1, weights: { tropplein: { oui: 5, non: -2 } },
        checks: ["Baissez le flotteur avec sa vis ou sa bague de réglage : l'eau doit s'arrêter 2 cm sous le haut du trop-plein."], guide: "chasse-eau-coule", level: 1 },
      { title: "Joint du clapet usé", base: 2, weights: { tropplein: { non: 3 }, remplit: { oui: 3 } },
        checks: ["Mettez quelques gouttes de colorant dans le réservoir : si la couleur arrive dans la cuvette sans tirer la chasse, le clapet fuit."], guide: "chasse-eau-coule", level: 1 }
    ]
  },
  {
    id: "evier-bouche", title: "L'évier ou le lavabo est bouché", device: "Évier", category: "maison",
    keywords: ["évier", "lavabo", "bouché", "bouchon", "eau stagne", "s'écoule mal", "siphon", "canalisation", "douche"],
    intro: "Dans la plupart des cas, le bouchon se trouve dans le siphon, juste sous l'évier.",
    safety: "Si vous avez déjà versé un déboucheur chimique, ne démontez rien et ne mélangez aucun autre produit.",
    questions: [
      { id: "plusieurs", text: "Plusieurs évacuations de la maison sont-elles bouchées en même temps ?", options: YES_NO },
      { id: "lent", text: "L'eau finit-elle par s'écouler, lentement ?", options: YES_NO }
    ],
    causes: [
      { title: "Siphon encrassé", base: 3, weights: { plusieurs: { non: 2, oui: -3 }, lent: { oui: 1 } },
        checks: ["Essayez la ventouse, puis démontez et nettoyez le siphon au-dessus d'un seau."], guide: "evier-bouche", level: 1 },
      { title: "Bouchon plus loin dans la canalisation", base: 1, weights: { lent: { non: 2 } },
        checks: ["Si le siphon est propre, passez un furet dans le tuyau du mur."], guide: "evier-bouche", level: 2 },
      { title: "Colonne d'évacuation commune bouchée", base: 0, weights: { plusieurs: { oui: 6, non: -3 } },
        checks: ["Quand plusieurs évacuations sont touchées, le problème est dans la colonne commune : appelez un plombier."], pro: true, level: 3 }
    ]
  },
  {
    id: "frigo-givre", title: "Le réfrigérateur givre ou refroidit mal", device: "Réfrigérateur", category: "electromenager",
    keywords: ["frigo", "réfrigérateur", "givre", "glace", "refroidit mal", "chaud", "congélateur", "joint", "porte"],
    intro: "Du givre qui revient sans cesse signale souvent de l'air chaud qui entre par la porte.",
    questions: [
      { id: "feuille", text: "Une feuille de papier coincée dans la porte fermée glisse-t-elle sans résistance à certains endroits ?", options: YES_NO },
      { id: "arriere", text: "L'appareil est-il collé au mur ou dans un endroit très chaud (à côté du four, en plein soleil) ?", options: YES_NO },
      { id: "moteur", text: "Le moteur (compresseur) tourne-t-il presque sans arrêt ?", options: YES_NO }
    ],
    causes: [
      { title: "Joint de porte qui ne plaque plus", base: 2, weights: { feuille: { oui: 5, non: -3 } },
        checks: ["Nettoyez le joint et refaites le test de la feuille tout autour de la porte."], guide: "joint-refrigerateur", level: 1 },
      { title: "Mauvaise aération de l'appareil", base: 1, weights: { arriere: { oui: 4, non: -1 }, moteur: { oui: 1 } },
        checks: ["Laissez quelques centimètres d'espace à l'arrière et éloignez l'appareil des sources de chaleur."], level: 1 },
      { title: "Thermostat, sonde ou circuit de froid", base: 0, weights: { moteur: { oui: 2 }, feuille: { non: 2 } },
        checks: ["Si le joint est bon et l'aération correcte, faites appel à un frigoriste : le circuit de froid ne se répare pas soi-même."], pro: true, level: 3 }
    ]
  },
  {
    id: "aspirateur-aspire-mal", title: "L'aspirateur n'aspire plus", device: "Aspirateur", category: "electromenager",
    keywords: ["aspirateur", "aspire", "aspiration", "puissance", "n'aspire plus", "filtre", "sac", "bouché"],
    intro: "Trois coupables reviennent presque toujours : sac ou bac plein, filtres encrassés, tuyau bouché.",
    safety: "Débranchez l'aspirateur (ou retirez la batterie) avant toute intervention.",
    questions: [
      { id: "plein", text: "Le sac ou le bac est-il à moitié plein ou plus ?", options: YES_NO },
      { id: "filtres", text: "Avez-vous nettoyé les filtres ces derniers mois ?", options: YES_NO },
      { id: "tuyau", text: "Sans tuyau ni brosse, l'aspirateur aspire-t-il fort directement à l'entrée ?", options: YES_NO },
      { id: "brule", text: "Sentez-vous une odeur de brûlé ?", options: YES_NO }
    ],
    causes: [
      { title: "Sac ou bac trop plein", base: 2, weights: { plein: { oui: 4, non: -2 } }, checks: ["Videz le bac ou mettez un sac neuf."], guide: "aspirateur-aspire-mal", level: 1 },
      { title: "Filtres encrassés", base: 2, weights: { filtres: { non: 3, oui: -2 } }, checks: ["Nettoyez ou lavez les filtres, et laissez-les sécher 24 h avant de les remonter."], guide: "aspirateur-aspire-mal", level: 1 },
      { title: "Tuyau ou brosse bouchés", base: 1, weights: { tuyau: { oui: 5, non: -2 } }, checks: ["Si l'aspiration est bonne sans le tuyau, c'est lui (ou la brosse) qui est bouché : poussez le bouchon avec un manche à balai."], guide: "aspirateur-aspire-mal", level: 1 },
      { title: "Moteur ou courroie de brosse qui chauffe", base: 0, weights: { brule: { oui: 8, non: -2 } }, checks: ["Arrêtez tout : une odeur de brûlé signale un moteur ou une courroie qui chauffe."], pro: true, level: 2 }
    ]
  },
  {
    id: "lave-vaisselle-lave-mal", title: "Le lave-vaisselle lave mal", device: "Lave-vaisselle", category: "electromenager",
    keywords: ["lave-vaisselle", "vaisselle sale", "lave mal", "traces", "odeur", "filtre", "bras"],
    intro: "Vaisselle encore sale ou mauvaises odeurs : le filtre et les bras de lavage sont les premiers suspects.",
    questions: [
      { id: "odeur", text: "Y a-t-il une mauvaise odeur dans la cuve ?", options: YES_NO },
      { id: "blanc", text: "La vaisselle ressort-elle avec des traces blanches ?", options: YES_NO },
      { id: "bras", text: "Les bras de lavage tournent-ils librement à la main ?", options: YES_NO }
    ],
    causes: [
      { title: "Filtre encrassé", base: 3, weights: { odeur: { oui: 3 } }, checks: ["Dévissez le filtre au fond de la cuve et rincez-le à l'eau chaude."], guide: "lave-vaisselle-lave-mal", level: 1 },
      { title: "Bras de lavage bouchés ou bloqués", base: 1, weights: { bras: { non: 4, oui: -1 } }, checks: ["Débouchez les trous des bras avec un cure-dent.", "Vérifiez qu'aucun plat ne les bloque."], guide: "lave-vaisselle-lave-mal", level: 1 },
      { title: "Sel régénérant ou dureté de l'eau mal réglés", base: 0, weights: { blanc: { oui: 5, non: -2 } }, checks: ["Remettez du sel régénérant et réglez la dureté de l'eau selon la notice."], level: 1 }
    ]
  },
  {
    id: "cafetiere-lente", title: "La cafetière coule lentement ou fait un café tiède", device: "Cafetière", category: "electromenager",
    keywords: ["cafetière", "café", "lente", "tiède", "calcaire", "tartre", "coule mal"],
    intro: "Le calcaire est presque toujours responsable.",
    questions: [
      { id: "detartre", text: "La cafetière a-t-elle été détartrée ce mois-ci ?", options: YES_NO },
      { id: "type", text: "De quel type de cafetière s'agit-il ?", options: [{ v: "filtre", label: "Cafetière filtre" }, { v: "expresso", label: "Expresso ou capsules" }] }
    ],
    causes: [
      { title: "Circuit entartré (cafetière filtre)", base: 2, weights: { detartre: { non: 3, oui: -2 }, type: { filtre: 3, expresso: -5 } }, checks: ["Détartrez avec la méthode de la notice : vinaigre blanc et eau, pause d'une heure, puis deux rinçages."], guide: "detartrer-cafetiere", level: 1 },
      { title: "Machine expresso ou à capsules à détartrer", base: 1, weights: { type: { expresso: 5, filtre: -5 }, detartre: { non: 2 } }, checks: ["Utilisez le programme de détartrage et le produit indiqués dans la notice de votre machine."], level: 1 },
      { title: "Résistance ou thermostat défaillant", base: 0, weights: { detartre: { oui: 3 } }, checks: ["Si le café reste tiède après un détartrage, la chauffe est en cause : faites établir un devis."], pro: true, level: 3 }
    ]
  },
  {
    id: "tondeuse-ne-demarre-pas", title: "La tondeuse ne démarre pas", device: "Tondeuse", category: "jardin",
    keywords: ["tondeuse", "démarre pas", "démarre plus", "moteur", "bougie", "essence", "lanceur", "gazon"],
    intro: "Après l'hiver, l'essence vieillie et la bougie encrassée sont les suspects habituels.",
    safety: "Débranchez le capuchon de bougie avant de toucher à la lame.",
    questions: [
      { id: "essence", text: "L'essence dans le réservoir a-t-elle plus d'un mois ?", options: YES_NO },
      { id: "cale", text: "Le moteur démarre-t-il puis cale-t-il aussitôt ?", options: YES_NO },
      { id: "lanceur", text: "Le lanceur (la ficelle) est-il bloqué ou très dur à tirer ?", options: YES_NO }
    ],
    causes: [
      { title: "Essence trop vieille", base: 2, weights: { essence: { oui: 5, non: -2 } }, checks: ["Videz le réservoir et remplissez avec de l'essence fraîche."], guide: "tondeuse-ne-demarre-pas", level: 1 },
      { title: "Bougie encrassée", base: 2, weights: { cale: { non: 1 }, essence: { non: 1 } }, checks: ["Démontez la bougie : noire ou humide, remplacez-la."], guide: "tondeuse-ne-demarre-pas", level: 1 },
      { title: "Carburateur encrassé", base: 0, weights: { cale: { oui: 5 }, essence: { oui: 1 } }, checks: ["Un moteur qui démarre puis cale signale souvent un carburateur à nettoyer."], level: 2 },
      { title: "Lame bloquée par de l'herbe", base: 0, weights: { lanceur: { oui: 6, non: -2 } }, checks: ["Bougie débranchée, retournez la tondeuse et dégagez l'herbe autour de la lame."], level: 1 }
    ]
  },
  {
    id: "velo-freine-mal", title: "Le vélo freine mal", device: "Vélo", category: "velo",
    keywords: ["vélo", "frein", "freine mal", "patin", "levier", "câble", "v-brake"],
    intro: "Sur un vélo à patins, un réglage suffit souvent. Pour les freins à disque, le réglage est différent.",
    safety: "Testez toujours le freinage à l'arrêt, puis à basse vitesse, avant de reprendre la route.",
    questions: [
      { id: "disque", text: "Votre vélo a-t-il des freins à disque (un disque métallique au centre de la roue) ?", options: YES_NO },
      { id: "guidon", text: "Le levier touche-t-il presque le guidon quand vous freinez ?", options: YES_NO },
      { id: "rainures", text: "Les patins sont-ils lisses, sans rainures visibles ?", options: YES_NO }
    ],
    causes: [
      { title: "Câble de frein détendu", base: 1, weights: { guidon: { oui: 4, non: -1 }, disque: { oui: -2 } }, checks: ["Retendez le câble avec la molette au niveau du levier."], guide: "regler-freins-velo", level: 1 },
      { title: "Patins usés", base: 1, weights: { rainures: { oui: 4, non: -2 }, disque: { oui: -4 } }, checks: ["Des patins sans rainures doivent être remplacés."], guide: "regler-freins-velo", level: 1 },
      { title: "Frein à disque à régler ou purger", base: 0, weights: { disque: { oui: 6, non: -5 } }, checks: ["Les freins à disque (surtout hydrauliques) demandent un réglage spécifique : faites-vous aider par un vélociste si vous débutez."], pro: true, level: 2 }
    ]
  },
  {
    id: "chaine-velo", title: "La chaîne du vélo grince ou saute", device: "Vélo", category: "velo",
    keywords: ["vélo", "chaîne", "grince", "saute", "déraille", "dérailleur", "bruit", "rouille"],
    intro: "Une chaîne sale ou sèche grince ; une chaîne usée saute sous l'effort.",
    questions: [
      { id: "grince", text: "La chaîne grince-t-elle ou semble-t-elle sèche ?", options: YES_NO },
      { id: "saute", text: "La chaîne saute-t-elle quand vous appuyez fort sur les pédales ?", options: YES_NO },
      { id: "km", text: "La chaîne a-t-elle plusieurs milliers de kilomètres ?", options: YES_NO }
    ],
    causes: [
      { title: "Chaîne sale ou mal lubrifiée", base: 2, weights: { grince: { oui: 4, non: -2 } }, checks: ["Dégraissez, séchez, puis mettez une goutte de lubrifiant par maillon."], guide: "entretien-chaine-velo", level: 1 },
      { title: "Chaîne usée", base: 0, weights: { saute: { oui: 3 }, km: { oui: 3, non: -1 } }, checks: ["Mesurez l'allongement avec un contrôleur d'usure : une chaîne usée abîme aussi les pignons."], level: 2 },
      { title: "Dérailleur à régler", base: 0, weights: { saute: { oui: 2 }, km: { non: 1 } }, checks: ["Si la chaîne est en bon état, faites régler le dérailleur (butées et tension de câble)."], pro: true, level: 2 }
    ]
  },
  {
    id: "manette-drift", title: "Le personnage bouge tout seul (manette)", device: "Manette", category: "loisirs",
    keywords: ["manette", "joystick", "drift", "bouge tout seul", "stick", "console", "ps5", "switch", "xbox"],
    intro: "C'est le « drift » : le capteur du joystick est encrassé ou usé.",
    questions: [
      { id: "leger", text: "Le mouvement parasite est-il léger (le personnage glisse doucement) ?", options: YES_NO },
      { id: "garantie", text: "La manette est-elle encore sous garantie ?", options: YES_NO }
    ],
    causes: [
      { title: "Joystick encrassé", base: 2, weights: { leger: { oui: 3 } }, checks: ["Nettoyez la base du stick à l'alcool isopropylique avec un coton-tige, puis recalibrez."], guide: "joystick-drift", level: 2 },
      { title: "Module joystick usé", base: 0, weights: { leger: { non: 3 } }, checks: ["Si le drift revient vite, le module doit être remplacé (soudure nécessaire sur certains modèles)."], pro: true, level: 3 },
      { title: "Prise en charge sous garantie", base: 0, weights: { garantie: { oui: 6, non: -5 } }, checks: ["Avant d'ouvrir la manette, contactez le service après-vente : l'ouverture peut annuler la garantie."], level: 1 }
    ]
  },
  {
    id: "prise-electrique", title: "Une prise électrique est abîmée ou chauffe", device: "Prise électrique", category: "maison",
    keywords: ["prise", "électricité", "prise cassée", "chauffe", "brûlé", "étincelle", "ne marche plus", "courant"],
    intro: "Une prise abîmée se remplace facilement, mais certains signes imposent d'appeler un électricien.",
    safety: "Coupez le disjoncteur du circuit avant toute intervention.",
    questions: [
      { id: "noir", text: "Voyez-vous des traces noires, du plastique fondu ou sentez-vous une odeur de brûlé ?", options: YES_NO },
      { id: "fendue", text: "La prise est-elle fendue, ou bouge-t-elle dans le mur ?", options: YES_NO },
      { id: "courant", text: "Un appareil branché sur cette prise fonctionne-t-il encore ?", options: YES_NO }
    ],
    causes: [
      { title: "Surchauffe du raccordement — danger", base: 0, weights: { noir: { oui: 10, non: -4 } }, checks: ["Ne l'utilisez plus et coupez le circuit. Faites vérifier l'installation par un électricien."], pro: true, level: 3, danger: true },
      { title: "Prise fendue ou mal fixée", base: 1, weights: { fendue: { oui: 5, non: -2 }, noir: { oui: -2 } }, checks: ["Remplacez la prise à l'identique, courant coupé et absence de tension vérifiée."], guide: "remplacer-prise-electrique", level: 2 },
      { title: "Disjoncteur coupé ou fil desserré", base: 1, weights: { courant: { non: 4, oui: -2 }, noir: { oui: -2 } }, checks: ["Vérifiez le tableau électrique. Si le disjoncteur est enclenché, un fil est peut-être desserré dans la prise."], guide: "remplacer-prise-electrique", level: 2 }
    ]
  }
];

/* Recherche d'un symptôme à partir d'une description libre */
function diagnosticScores(text) {
  const words = queryWords(text);
  if (!words.length) return [];
  const scored = DIAGNOSTICS.map(d => {
    const hay = normalize([d.title, d.keywords.join(" "), d.device, d.intro].join(" "));
    const matched = words.filter(w => hay.includes(w)).length;
    // Au moins la moitié des mots doivent correspondre (« machine à coudre » n'est pas un lave-linge)
    if (matched < Math.ceil(words.length / 2)) return [d, 0];
    return [d, scoreText([[d.title, 6], [d.keywords.join(" "), 4], [d.device, 3], [d.intro, 1]], words)];
  }).filter(([, s]) => s > 0);
  const best = Math.max(0, ...scored.map(([, s]) => s));
  return scored.filter(([, s]) => s >= best * 0.4).sort((a, b) => b[1] - a[1]);
}
function searchDiagnostics(text) { return diagnosticScores(text).map(([d]) => d); }

/* Classement des causes selon les réponses : score, puis confiance relative */
function rankCauses(diag, answers) {
  const scored = diag.causes.map(c => {
    let s = c.base || 0;
    for (const [q, w] of Object.entries(c.weights || {})) if (answers[q] && w[answers[q]] !== undefined) s += w[answers[q]];
    return { ...c, score: s };
  }).sort((a, b) => b.score - a.score);
  const positives = scored.map(c => Math.max(0, c.score));
  const total = positives.reduce((a, b) => a + b, 0) || 1;
  return scored.map((c, i) => {
    const share = positives[i] / total;
    const confidence = c.score <= 0 ? "faible" : share >= 0.5 ? "élevée" : share >= 0.25 ? "moyenne" : "faible";
    return { ...c, share, confidence };
  });
}
