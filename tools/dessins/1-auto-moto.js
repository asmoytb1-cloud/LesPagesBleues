/* Schémas redessinés — Auto / Moto. Chaque repère [libellé, x, y] est posé sur la pièce qu'il nomme. */
const { plus, minus, C, rect, circle, ellipse, path, poly, line, text, arrow, turn, forbid, check, screw, drop } = require("./lib.js");

// Roue de voiture vue de côté (pneu, jante, moyeu, écrous)
const carWheel = (cx, cy, r) => circle(cx, cy, r, { fill: C.dark, stroke: "#252B33" }) + circle(cx, cy, r * 0.64, { fill: C.steel }) +
  circle(cx, cy, r * 0.2, { fill: C.mid, sw: 5 }) +
  [0, 72, 144, 216, 288].map(a => circle(cx + r * 0.36 * Math.cos(a * Math.PI / 180), cy + r * 0.36 * Math.sin(a * Math.PI / 180), r * 0.055, { fill: C.dark, sw: 3 })).join("");
// Manomètre de gonfleur : cadran + aiguille + tuyau
const gauge = (x, y) => circle(x, y, 44, { fill: C.white, sw: 6 }) + path(`M${x - 28} ${y + 10} A30 30 0 0 1 ${x + 28} ${y + 10}`, { fill: "none", sw: 3 }) +
  line(x, y + 6, x + 18, y - 20, { stroke: C.red, sw: 4 }) + circle(x, y + 6, 5, { fill: C.ink, sw: 2 });

module.exports = {
  "pression-pneus-voiture": {
    d: [
      carWheel(400, 400, 170),
      // valve sur la jante, embout du gonfleur et tuyau jusqu'au manomètre
      path("M474 474 L500 500", { stroke: C.dark, sw: 12, fill: "none" }), rect(494, 494, 22, 22, { fill: C.ink, sw: 2, rx: 4 }),
      path("M512 512 C560 560 600 560 610 520", { fill: "none", stroke: C.dark, sw: 8 }), gauge(620, 470),
      // étiquette des pressions (montant de portière)
      rect(560, 170, 140, 110, { rx: 10, fill: C.white, sw: 5 }), text(630, 205, "AV / AR", { size: 22 }),
      line(580, 228, 680, 228, { sw: 4, stroke: C.steel }), line(580, 250, 680, 250, { sw: 4, stroke: C.steel }), text(630, 272, "bar", { size: 18, weight: 600 })
    ],
    r: [["Pneu", 262, 380], ["Jante", 330, 345], ["Valve", 488, 488], ["Manomètre du gonfleur", 620, 440], ["Étiquette des pressions (portière ou trappe à carburant)", 640, 190]]
  },

  "pile-cle-voiture": {
    d: [
      // coque extérieure (boutons) et coque intérieure (circuit, logement de la pile)
      rect(220, 200, 190, 320, { rx: 70, fill: C.mid }), circle(315, 300, 26, { fill: C.dark }), circle(315, 380, 26, { fill: C.dark }),
      rect(470, 200, 190, 320, { rx: 70, fill: C.mid }), rect(500, 250, 130, 220, { rx: 18, fill: "#BFD8C8", stroke: C.greenLine, sw: 4 }),
      circle(565, 360, 62, { fill: C.dark, sw: 4 }), circle(565, 360, 52, { fill: C.steel, sw: 4 }), plus(565, 360, 16, C.ink),
      text(565, 448, "CR2032", { size: 20, weight: 700 }),
      // fente d'ouverture et tournevis plat
      rect(300, 508, 30, 12, { fill: C.dark, sw: 2, rx: 3 }), path("M315 512 L345 600", { stroke: C.steel, sw: 12, fill: "none" }), rect(328, 580, 34, 40, { rx: 6, fill: C.amber, stroke: C.amberLine, sw: 4 })
    ],
    r: [["Pile bouton (face + vers le haut)", 590, 330], ["Logement de la pile", 520, 395], ["Fente d'ouverture", 315, 514], ["Coque avec les boutons", 300, 230]]
  },

  "vidange-huile-moteur": {
    d: [
      rect(310, 150, 250, 55, { rx: 10, fill: C.mid }), rect(300, 200, 270, 200, { rx: 14 }),
      // carter d'huile sous le moteur
      path("M310 400 L560 400 L540 460 L330 460 Z", { fill: C.steel }),
      // bouchon de remplissage, jauge, filtre
      rect(360, 122, 50, 30, { rx: 8, fill: C.amber, stroke: C.amberLine, sw: 4 }), drop(385, 100, 0.8, { fill: C.amber, stroke: C.amberLine }),
      line(500, 140, 500, 360, { sw: 6 }), circle(500, 126, 14, { fill: C.amber, stroke: C.amberLine, sw: 5 }),
      rect(570, 280, 64, 96, { rx: 10, fill: C.amber, stroke: C.amberLine, sw: 5 }), line(570, 300, 634, 300, { stroke: C.amberLine, sw: 3 }),
      // bouchon de vidange, écoulement, bac
      rect(428, 460, 26, 18, { fill: C.dark, sw: 3, rx: 3 }), line(441, 480, 441, 545, { stroke: "#8A5A1E", sw: 6 }),
      path("M350 545 L540 545 L525 595 L365 595 Z", { fill: C.mid })
    ],
    r: [["Bouchon de remplissage", 385, 137], ["Jauge", 500, 126], ["Filtre à huile", 602, 330], ["Carter d'huile", 470, 430], ["Bouchon de vidange", 441, 470], ["Bac de récupération", 445, 575]]
  },

  "voiture-ne-demarre-plus": {
    d: [
      // batterie et ses deux cosses
      rect(250, 270, 220, 150, { rx: 12, fill: C.dark, stroke: "#252B33" }), rect(280, 248, 40, 26, { fill: C.red, stroke: "#8E2323", sw: 4, rx: 4 }),
      rect(400, 248, 40, 26, { fill: C.ink, stroke: "#252B33", sw: 4, rx: 4 }), plus(300, 320, 16), minus(420, 320, 16),
      // câble + vers le démarreur, câble − vers la masse (carrosserie)
      path("M300 248 C300 190 640 210 640 430", { fill: "none", stroke: C.red, sw: 9 }),
      rect(590, 430, 110, 64, { rx: 26, fill: C.steel }), circle(600, 462, 20, { fill: C.mid, sw: 4 }),
      path("M420 248 L420 205 L520 205", { fill: "none", stroke: C.ink, sw: 9 }), rect(520, 190, 70, 30, { fill: C.mid, sw: 4 }), screw(540, 205, 9),
      // multimètre sur les bornes
      rect(240, 470, 130, 140, { rx: 14, fill: C.amber, stroke: C.amberLine, sw: 5 }), rect(258, 488, 94, 44, { fill: C.white, sw: 3, rx: 4 }), text(305, 520, "12,6 V", { size: 22 }),
      path("M270 470 C220 420 230 280 292 268", { fill: "none", stroke: C.red, sw: 4 }), path("M340 470 C500 470 500 300 426 270", { fill: "none", stroke: C.dark, sw: 4 })
    ],
    r: [["Cosse + (rouge)", 300, 255], ["Cosse − (vers la masse)", 420, 255], ["Masse sur la carrosserie", 555, 205], ["Démarreur", 660, 462], ["Multimètre", 305, 560]]
  },

  "ampoule-phare": {
    d: [
      // arrière du bloc optique
      path("M230 230 Q240 180 330 180 L640 200 Q690 210 690 270 L680 470 Q670 520 610 520 L300 520 Q240 520 230 460 Z", { fill: C.mid }),
      circle(430, 350, 92, { fill: C.dark }),
      // culot de l'ampoule, ressort de maintien, connecteur
      circle(430, 350, 48, { fill: C.steel, sw: 5 }), path("M372 320 Q430 270 488 320 L470 380 Q430 400 390 380 Z", { fill: "none", stroke: C.white, sw: 6 }),
      rect(405, 395, 50, 70, { rx: 8, fill: C.dark, stroke: "#252B33" }), path("M418 465 C418 520 380 560 340 580 M442 465 C442 525 420 565 400 600", { fill: "none", stroke: C.ink, sw: 5 }),
      // cache en caoutchouc retiré
      circle(625, 300, 58, { fill: C.dark, stroke: "#252B33" }), circle(625, 300, 30, { fill: "#4A5462", sw: 3 }), arrow(560, 330, 595, 320, { sw: 5 }),
      // détail : ampoule (verre à ne pas toucher)
      rect(560, 440, 60, 40, { rx: 6, fill: C.steel, sw: 4 }), ellipse(660, 460, 42, 22, { fill: "#F4F8FC", stroke: C.ink, sw: 4 }), forbid(665, 420, 14)
    ],
    r: [["Cache de protection (retiré)", 625, 270], ["Ressort de maintien", 430, 285], ["Culot de l'ampoule", 455, 355], ["Connecteur", 430, 440], ["Verre : ne pas le toucher", 660, 470]]
  },

  "balais-essuie-glace": {
    d: [
      // pare-brise et serviette posée dessous
      path("M200 600 L700 600", { stroke: C.waterLine, sw: 6, fill: "none" }), rect(240, 560, 230, 30, { rx: 12, fill: C.water, stroke: C.waterLine, sw: 4 }),
      // bras relevé, crochet en U au bout
      line(270, 570, 500, 270, { stroke: C.dark, sw: 18 }), path("M500 270 C505 225 548 220 552 250 L546 278", { fill: "none", stroke: C.dark, sw: 12 }),
      // balai accroché au crochet, languette au milieu
      line(410, 160, 650, 360, { stroke: C.dark, sw: 16 }), line(416, 176, 646, 376, { stroke: "#20252C", sw: 5 }),
      rect(518, 252, 26, 26, { fill: C.amber, stroke: C.amberLine, sw: 4, rx: 4 }),
      // sens de dépose : on fait glisser le balai vers le bas, le long du bras
      arrow(590, 300, 540, 360, { sw: 6 })
    ],
    r: [["Bras d'essuie-glace", 385, 420], ["Crochet en U", 504, 238], ["Languette de verrouillage", 531, 265], ["Balai", 618, 334], ["Serviette sur le pare-brise", 330, 575]]
  },

  "changer-roue": {
    d: [
      line(200, 500, 710, 500, { sw: 5 }),
      path("M230 420 L248 350 Q300 320 380 310 L470 255 Q530 240 590 255 L660 310 Q695 320 700 350 L705 420 Z", { fill: C.light }),
      carWheel(310, 440, 58), carWheel(620, 440, 58),
      // point de levage sous le bas de caisse, cric
      rect(512, 414, 30, 10, { fill: C.amber, stroke: C.amberLine, sw: 3 }),
      path("M527 424 L552 460 L527 492 L502 460 Z", { fill: "none", stroke: C.ink, sw: 6 }), rect(495, 490, 64, 10, { fill: C.ink, sw: 2 }),
      // détail : ordre de serrage en étoile
      circle(330, 190, 70, { fill: C.steel, sw: 5 }),
      ...[0, 1, 2, 3, 4].map(i => { const a = (-90 + i * 72) * Math.PI / 180; return circle(330 + 45 * Math.cos(a), 190 + 45 * Math.sin(a), 11, { fill: i === 0 ? C.amber : C.dark, stroke: i === 0 ? C.amberLine : C.ink, sw: 3 }); }),
      poly([0, 2, 4, 1, 3].map(i => { const a = (-90 + i * 72) * Math.PI / 180; return `${(330 + 45 * Math.cos(a)).toFixed(1)},${(190 + 45 * Math.sin(a)).toFixed(1)}`; }).join(" "), { fill: "none", stroke: C.blue, sw: 3 })
    ],
    r: [["Écrous : serrage en étoile", 330, 145], ["Point de levage", 527, 418], ["Cric", 540, 470], ["Roue", 620, 410]]
  },

  "changer-fusible-voiture": {
    d: [
      rect(230, 210, 290, 270, { rx: 16, fill: C.dark, stroke: "#252B33" }),
      ...[0, 1, 2, 3].flatMap(row => [0, 1, 2, 3, 4].map(col => rect(255 + col * 50, 240 + row * 55, 34, 40, { rx: 4, fill: [C.amber, "#7DB4E8", "#E88A8A", C.green][(row + col) % 4], stroke: "#252B33", sw: 3 }))),
      // pince d'extraction clipsée dans la boîte
      path("M470 455 L478 300 L486 300 L494 455", { fill: C.white, stroke: C.ink, sw: 4 }),
      // couvercle retourné : plan des fusibles
      rect(560, 200, 140, 210, { rx: 14, fill: C.light }), ...[0, 1, 2, 3, 4, 5].map(i => line(580, 232 + i * 28, 680, 232 + i * 28, { stroke: C.steel, sw: 5 })),
      // détail : fusible bon et fusible fondu
      rect(560, 470, 56, 76, { rx: 8, fill: "#FDEBCB", stroke: C.amberLine, sw: 4 }), path("M574 478 L574 500 Q588 520 602 500 L602 478", { fill: "none", stroke: C.ink, sw: 4 }), check(588, 575),
      rect(650, 470, 56, 76, { rx: 8, fill: "#FDEBCB", stroke: C.amberLine, sw: 4 }), path("M664 478 L664 500 Q668 508 672 506 M684 506 Q690 508 692 500 L692 478", { fill: "none", stroke: C.ink, sw: 4 }), forbid(678, 578, 14)
    ],
    r: [["Fusibles enfichables", 289, 260], ["Pince d'extraction", 482, 330], ["Plan au dos du couvercle", 630, 288], ["Fusible bon : filament entier", 588, 505], ["Fusible fondu : filament coupé", 678, 508]]
  },

  "liquide-refroidissement": {
    d: [
      // vase d'expansion translucide, liquide entre MIN et MAX
      rect(300, 230, 260, 270, { rx: 30, fill: C.white }), path("M306 372 L554 372 L554 470 Q554 494 530 494 L330 494 Q306 494 306 470 Z", { fill: "#F6C6DD", stroke: "none", sw: 0 }),
      line(300, 330, 330, 330, { sw: 5 }), line(300, 420, 330, 420, { sw: 5 }), text(355, 338, "MAX", { size: 20 }), text(352, 428, "MIN", { size: 20 }),
      rect(300, 230, 260, 270, { rx: 30, fill: "none" }),
      // bouchon : à n'ouvrir que moteur froid
      rect(395, 185, 70, 50, { rx: 10, fill: C.dark }),
      // durites
      path("M560 450 L640 450", { stroke: C.dark, sw: 16, fill: "none" }), path("M300 280 L230 280", { stroke: C.dark, sw: 16, fill: "none" }),
      check(600, 372)
    ],
    r: [["Bouchon : l'ouvrir seulement moteur froid", 430, 205], ["Repère MAX", 315, 330], ["Repère MIN", 315, 420], ["Bon niveau : entre MIN et MAX", 500, 400], ["Vase d'expansion", 530, 260]]
  },

  "filtre-habitacle": {
    d: [
      // planche de bord, boîte à gants déposée
      path("M210 180 L700 180 L700 270 L210 270 Z", { fill: C.mid }), rect(290, 270, 330, 190, { fill: C.dark, stroke: "#252B33" }),
      path("M300 520 L610 520 L590 600 L320 600 Z", { fill: C.light, "stroke-dasharray": "14 10" }),
      // logement du filtre, trappe, filtre plissé tiré vers soi
      rect(350, 310, 220, 44, { rx: 6, fill: C.steel, sw: 5 }), rect(570, 306, 26, 52, { rx: 4, fill: C.mid, sw: 4 }),
      rect(350, 380, 220, 60, { rx: 4, fill: C.white, sw: 5 }), path("M360 440 " + Array.from({ length: 10 }, (_, i) => `L${370 + i * 20} ${i % 2 ? 440 : 384}`).join(" "), { fill: "none", sw: 3 }),
      arrow(460, 390, 460, 432, { sw: 5, head: 14 })
    ],
    r: [["Logement du filtre", 460, 332], ["Trappe", 583, 320], ["Filtre à pollen", 395, 420], ["Flèche : sens de l'air", 460, 410], ["Boîte à gants déposée", 455, 560]]
  },

  "entretien-chaine-moto": {
    d: [
      line(200, 600, 700, 600, { sw: 5 }),
      // roue arrière levée par la béquille
      circle(520, 400, 150, { fill: C.dark, stroke: "#252B33" }), circle(520, 400, 110, { fill: C.light }),
      poly(Array.from({ length: 36 }, (_, i) => { const r = i % 2 ? 62 : 70, a = i * 10 * Math.PI / 180; return `${(520 + r * Math.cos(a)).toFixed(1)},${(400 + r * Math.sin(a)).toFixed(1)}`; }).join(" "), { fill: C.steel, sw: 4 }),
      circle(520, 400, 18, { fill: C.mid, sw: 4 }),
      // pignon de sortie de boîte, chaîne (brin supérieur et inférieur)
      circle(270, 380, 28, { fill: C.steel, sw: 4 }),
      line(270, 340, 520, 400, { stroke: C.mid, sw: 22 }),
      line(270, 352, 520, 330, { stroke: "#20252C", sw: 10 }), path("M270 408 Q395 470 520 470", { fill: "none", stroke: "#20252C", sw: 10 }),
      // béquille d'atelier
      line(470, 360, 450, 600, { sw: 10 }), line(570, 360, 590, 600, { sw: 10 }),
      // mesure de la tension au milieu du brin inférieur
      line(395, 405, 395, 475, { stroke: C.blue, sw: 4 }), arrow(395, 430, 395, 405, { sw: 4, head: 12 }), arrow(395, 445, 395, 475, { sw: 4, head: 12 })
    ],
    r: [["Pignon", 270, 380], ["Couronne", 566, 400], ["Chaîne (brin inférieur)", 330, 440], ["Tension : jeu mesuré au milieu", 395, 440], ["Béquille", 455, 560]]
  },

  "pression-pneus-moto": {
    d: [
      circle(400, 390, 170, { fill: C.dark, stroke: "#252B33" }), circle(400, 390, 125, { fill: C.light }),
      ...[90, 210, 330].map(a => { const r = a * Math.PI / 180; return line(400, 390, 400 + 120 * Math.cos(r), 390 + 120 * Math.sin(r), { stroke: C.steel, sw: 16 }); }),
      circle(400, 390, 80, { fill: "none", stroke: C.steel, sw: 10 }), circle(400, 390, 22, { fill: C.mid, sw: 4 }),
      // valve sur la jante et manomètre
      path("M480 478 L505 505", { stroke: C.dark, sw: 12, fill: "none" }), rect(500, 500, 22, 22, { fill: C.ink, sw: 2, rx: 4 }),
      path("M516 518 C560 560 600 560 615 520", { fill: "none", stroke: C.dark, sw: 8 }), gauge(625, 470),
      // notice : pressions avant / arrière
      rect(560, 160, 140, 120, { rx: 8, fill: C.white, sw: 5 }), text(630, 200, "AV", { size: 22 }), text(630, 250, "AR", { size: 22 }), line(585, 222, 675, 222, { stroke: C.steel, sw: 3 })
    ],
    r: [["Pneu", 262, 400], ["Jante", 300, 330], ["Valve", 492, 491], ["Manomètre", 625, 440], ["Pressions avant / arrière (notice)", 630, 195]]
  },

  "hivernage-moto": {
    d: [
      line(200, 560, 710, 560, { sw: 5 }),
      // housse respirante
      path("M230 520 Q220 270 440 250 Q690 250 700 520", { fill: "none", stroke: C.greenLine, sw: 5, "stroke-dasharray": "16 12" }),
      circle(290, 470, 80, { fill: C.dark, stroke: "#252B33" }), circle(290, 470, 48, { fill: C.light }),
      circle(620, 470, 80, { fill: C.dark, stroke: "#252B33" }), circle(620, 470, 48, { fill: C.light }),
      line(290, 470, 420, 380, { sw: 12 }), line(600, 330, 620, 470, { sw: 12 }), line(590, 300, 630, 290, { sw: 10 }),
      rect(410, 380, 120, 80, { rx: 12, fill: C.mid }),
      path("M420 340 Q450 290 540 300 Q580 310 570 350 L430 360 Z", { fill: C.light }), path("M300 360 L420 350 L420 372 L310 380 Z", { fill: C.dark }),
      // batterie sous la selle, mainteneur de charge
      rect(340, 380, 48, 38, { rx: 4, fill: C.amber, stroke: C.amberLine, sw: 4 }),
      path("M364 418 C364 520 400 560 420 560", { fill: "none", stroke: C.ink, sw: 4 }), rect(400, 530, 70, 30, { rx: 6, fill: C.white, sw: 4 }),
      // béquille centrale
      line(470, 460, 455, 560, { sw: 9 }), line(490, 460, 505, 560, { sw: 9 })
    ],
    r: [["Réservoir (plein)", 495, 315], ["Batterie", 364, 399], ["Mainteneur de charge", 435, 545], ["Pneus", 620, 400], ["Béquille centrale", 480, 520], ["Housse respirante", 690, 430]]
  }
};
