/* Schémas redessinés — Électroménager (1/2). Chaque repère [libellé, x, y] est posé sur la pièce qu'il nomme. */
const { plus, minus, C, rect, circle, ellipse, path, poly, line, text, arrow, turn, forbid, check, screw, drop } = require("./lib.js");

const grid = (x, y, w, h, step = 18, o = {}) => Array.from({ length: Math.floor(w / step) - 1 }, (_, i) => line(x + step * (i + 1), y + 4, x + step * (i + 1), y + h - 4, { stroke: o.stroke || C.steel, sw: o.sw || 3 })).join("") +
  Array.from({ length: Math.floor(h / step) - 1 }, (_, i) => line(x + 4, y + step * (i + 1), x + w - 4, y + step * (i + 1), { stroke: o.stroke || C.steel, sw: o.sw || 3 })).join("");
const slats = (x, y, w, h, n = 6, o = {}) => Array.from({ length: n }, (_, i) => line(x + 10, y + (h / (n + 1)) * (i + 1), x + w - 10, y + (h / (n + 1)) * (i + 1), { stroke: o.stroke || C.ink, sw: o.sw || 4 })).join("");
const unplugged = (x, y) => rect(x, y, 46, 60, { rx: 8, fill: C.white, sw: 4 }) + circle(x + 15, y + 30, 5, { fill: C.dark, sw: 0 }) + circle(x + 31, y + 30, 5, { fill: C.dark, sw: 0 }) +
  rect(x + 70, y + 14, 44, 32, { rx: 8, fill: C.white, sw: 4 }) + line(x + 70, y + 24, x + 56, y + 24, { sw: 4 }) + line(x + 70, y + 36, x + 56, y + 36, { sw: 4 }) +
  path(`M${x + 114} ${y + 30} C${x + 150} ${y + 30} ${x + 150} ${y + 70} ${x + 190} ${y + 70}`, { fill: "none", sw: 5 });

module.exports = {
  "filtre-seche-linge": {
    d: [
      rect(300, 170, 300, 440, { rx: 18 }), rect(300, 170, 300, 50, { rx: 18, fill: C.mid }),
      rect(316, 180, 100, 30, { rx: 6, fill: C.water, stroke: C.waterLine, sw: 4 }),
      circle(450, 370, 96, { fill: C.dark }), circle(450, 370, 104, { fill: "none", stroke: C.steel, sw: 8 }),
      // porte ouverte (vue de biais), filtre sorti du bas de l'encadrement
      ellipse(250, 370, 38, 100, { fill: C.light, sw: 5 }), ellipse(250, 370, 22, 70, { fill: "#C9D6E3", sw: 3 }),
      rect(410, 430, 80, 58, { rx: 8, fill: C.amber, stroke: C.amberLine, sw: 4 }), grid(410, 430, 80, 58, 14, { stroke: C.amberLine, sw: 2 }), arrow(450, 425, 450, 385, { sw: 5, head: 14 }),
      // trappe de plinthe et condenseur (selon le modèle)
      rect(330, 535, 240, 60, { rx: 6, fill: C.mid, sw: 4 }), slats(330, 535, 240, 60, 4, { stroke: C.steel })
    ],
    r: [["Réservoir d'eau", 366, 195], ["Porte ouverte", 250, 300], ["Filtre de porte", 450, 460], ["Condenseur, derrière la plinthe (selon modèle)", 450, 565]]
  },

  "degivrer-congelateur": {
    d: [
      rect(290, 160, 290, 430, { rx: 14 }), rect(310, 180, 250, 390, { fill: C.white, sw: 4 }),
      // givre sur les parois
      path("M318 188 L318 562 L552 562 L552 188", { fill: "none", stroke: "#BFE0F7", sw: 18 }), line(318, 300, 552, 300, { stroke: "#BFE0F7", sw: 10 }),
      // porte ouverte
      path("M580 160 L660 190 L660 570 L580 590 Z", { fill: C.light, sw: 5 }),
      // casserole d'eau chaude sur un dessous-de-plat, vapeur
      rect(370, 470, 130, 12, { fill: C.dark, sw: 0 }), rect(380, 410, 110, 60, { rx: 8, fill: C.steel, sw: 5 }), line(490, 425, 540, 415, { sw: 8 }),
      path("M410 395 q10 -18 0 -36 M440 395 q10 -18 0 -36 M470 395 q10 -18 0 -36", { fill: "none", stroke: C.steel, sw: 4 }),
      // serviettes et bac pour l'eau de fonte
      rect(250, 596, 380, 22, { rx: 10, fill: C.water, stroke: C.waterLine, sw: 4 }),
      // spatule en plastique (oui), couteau (non)
      line(640, 300, 690, 380, { stroke: C.greenLine, sw: 10 }), path("M682 368 L705 405 L688 415 L668 380 Z", { fill: C.green, stroke: C.greenLine, sw: 4 }), check(700, 290, 16),
      line(630, 470, 690, 540, { stroke: C.steel, sw: 8 }), line(690, 540, 705, 558, { stroke: C.dark, sw: 12 }), forbid(690, 480, 16)
    ],
    r: [["Givre sur les parois", 318, 250], ["Casserole d'eau chaude", 435, 440], ["Serviettes et bac pour l'eau de fonte", 420, 607], ["Spatule en plastique", 693, 395], ["Jamais d'objet pointu", 660, 505]]
  },

  "nettoyer-filtre-hotte": {
    d: [
      rect(410, 150, 100, 120, { fill: C.mid, sw: 5 }), path("M300 270 L620 270 L690 330 L230 330 Z", { fill: C.light }),
      rect(230, 330, 460, 180, { rx: 10, fill: C.mid }),
      // deux filtres à graisse métalliques, avec leur loquet
      rect(250, 345, 200, 150, { rx: 6, fill: C.steel, sw: 4 }), grid(250, 345, 200, 150, 16, { stroke: "#98A4B2", sw: 2 }), rect(325, 485, 50, 16, { rx: 5, fill: C.dark, sw: 0 }),
      rect(470, 345, 200, 150, { rx: 6, fill: C.steel, sw: 4 }), grid(470, 345, 200, 150, 16, { stroke: "#98A4B2", sw: 2 }), rect(545, 485, 50, 16, { rx: 5, fill: C.dark, sw: 0 }),
      // filtre à charbon (hotte en recyclage), sorti
      ellipse(450, 575, 80, 26, { fill: C.dark }), ellipse(450, 575, 40, 12, { fill: "#596372", sw: 3 }), arrow(450, 545, 450, 515, { sw: 5, head: 14 })
    ],
    r: [["Filtre à graisse métallique", 350, 400], ["Loquet du filtre", 350, 493], ["Filtre à charbon (hotte en recyclage)", 490, 575]]
  },

  "courroie-lave-linge": {
    d: [
      rect(250, 150, 420, 460, { rx: 14, fill: C.light }), screw(275, 175), screw(645, 175), screw(275, 585), screw(645, 585),
      // grande poulie du tambour (trois branches)
      circle(460, 320, 120, { fill: C.steel, sw: 6 }), ...[30, 150, 270].map(a => { const r = a * Math.PI / 180; return line(460, 320, 460 + 112 * Math.cos(r), 320 + 112 * Math.sin(r), { stroke: C.ink, sw: 14 }); }),
      circle(460, 320, 22, { fill: C.dark, sw: 4 }),
      // moteur et sa petite poulie
      rect(395, 520, 130, 66, { rx: 16, fill: C.mid }), circle(460, 520, 24, { fill: C.dark, sw: 4 }),
      // courroie
      path("M340 320 A120 120 0 1 1 580 320 L484 520 A24 24 0 0 1 436 520 Z", { fill: "none", stroke: "#20252C", sw: 9 })
    ],
    r: [["Grande poulie du tambour", 460, 215], ["Courroie", 388, 420], ["Petite poulie du moteur", 460, 520], ["Moteur", 505, 560]]
  },

  "lave-linge-ne-vidange-pas": {
    d: [
      path("M240 150 L680 150 L680 560 L240 560 Z", { fill: C.light }), path("M330 150 A130 130 0 0 0 590 150", { fill: C.dark }),
      // trappe ouverte, bouchon du filtre de vidange, tuyau de purge
      rect(520, 420, 130, 100, { rx: 8, fill: C.mid, sw: 4 }), path("M520 520 L650 520 L670 580 L500 580 Z", { fill: C.light, sw: 4 }),
      circle(600, 465, 34, { fill: C.white, sw: 5 }), rect(586, 440, 28, 50, { rx: 6, fill: C.mid, sw: 3 }),
      path("M540 470 C510 480 480 520 470 560", { fill: "none", stroke: C.dark, sw: 12 }), rect(458, 556, 24, 18, { rx: 4, fill: C.red, sw: 0 }),
      // eau recueillie dans un bac plat
      line(470, 578, 470, 596, { stroke: C.waterLine, sw: 5 }), rect(330, 596, 300, 22, { rx: 6, fill: C.water, stroke: C.waterLine, sw: 4 })
    ],
    r: [["Trappe ouverte", 585, 550], ["Filtre de vidange (à dévisser)", 600, 465], ["Tuyau de purge", 495, 520], ["Bac plat pour l'eau", 400, 607]]
  },

  "lave-vaisselle-lave-mal": {
    d: [
      rect(230, 160, 460, 460, { rx: 14, fill: C.light }), rect(250, 180, 420, 420, { rx: 8, fill: C.white, sw: 3 }),
      // bras de lavage et leurs trous
      line(290, 380, 630, 260, { stroke: C.ink, sw: 34 }), line(290, 380, 630, 260, { stroke: C.steel, sw: 24 }),
      ...[0.1, 0.25, 0.4, 0.62, 0.77, 0.92].map(t => circle(290 + 340 * t, 380 - 120 * t, 4, { fill: C.dark, sw: 0 })),
      circle(460, 320, 26, { fill: C.mid, sw: 5 }),
      // filtre plat au fond et filtre cylindrique au centre
      ellipse(460, 520, 120, 46, { fill: C.mid, sw: 5 }), grid(370, 500, 180, 40, 14, { stroke: "#98A4B2", sw: 2 }),
      circle(460, 520, 32, { fill: C.steel, sw: 5 }), circle(460, 520, 18, { fill: C.dark, sw: 0 })
    ],
    r: [["Bras de lavage", 370, 352], ["Trous à déboucher", 528, 296], ["Filtre cylindrique", 460, 500], ["Filtre plat", 370, 528]]
  },

  "joint-refrigerateur": {
    d: [
      rect(230, 160, 200, 450, { rx: 16 }), rect(246, 180, 168, 410, { fill: C.white, sw: 3 }), line(246, 330, 414, 330, { stroke: C.steel, sw: 6 }), line(246, 450, 414, 450, { stroke: C.steel, sw: 6 }),
      // porte entrouverte : joint magnétique tout autour
      path("M430 160 L530 190 L530 580 L430 610 Z", { fill: C.light, sw: 5 }), path("M442 180 L518 203 L518 567 L442 590 Z", { fill: "none", stroke: "#7D8794", sw: 12 }),
      // test de la feuille : porte fermée sur une feuille de papier, qu'on tire
      rect(565, 260, 40, 220, { fill: C.mid, sw: 4 }), rect(633, 260, 40, 220, { fill: C.light, sw: 4 }), rect(605, 260, 28, 220, { fill: "#7D8794", sw: 3 }),
      rect(609, 210, 20, 150, { fill: C.white, sw: 3 }), arrow(619, 205, 619, 150, { sw: 5, head: 14 })
    ],
    r: [["Joint magnétique (tout le tour de la porte)", 518, 380], ["Porte", 480, 280], ["Feuille de papier coincée : elle doit résister", 619, 230]]
  },

  "aspirateur-aspire-mal": {
    d: [
      // brosse, tube, flexible
      rect(225, 560, 130, 30, { rx: 10, fill: C.dark }), line(290, 560, 330, 330, { stroke: C.steel, sw: 14 }),
      path("M330 330 C340 270 420 300 450 410", { fill: "none", stroke: C.dark, sw: 16 }),
      // corps : sac ou bac, filtre moteur, filtre de sortie
      rect(440, 360, 230, 150, { rx: 60, fill: C.light }), rect(470, 385, 90, 100, { rx: 10, fill: C.amber, stroke: C.amberLine, sw: 4 }),
      rect(575, 390, 26, 90, { fill: C.white, sw: 4 }), grid(575, 390, 26, 90, 10, { stroke: C.steel, sw: 2 }),
      rect(640, 395, 22, 80, { rx: 4, fill: C.mid, sw: 4 }), slats(640, 395, 22, 80, 4, { sw: 2 }),
      circle(480, 515, 22, { fill: C.dark }), circle(630, 515, 22, { fill: C.dark }),
      // trajet de l'air
      arrow(300, 530, 318, 440, { sw: 5, head: 14 }), arrow(670, 435, 715, 435, { sw: 5, head: 14 })
    ],
    r: [["Brosse", 260, 575], ["Flexible et tube", 380, 300], ["Sac ou bac", 515, 435], ["Filtre moteur", 588, 435], ["Filtre de sortie", 651, 400]]
  },

  "detartrer-cafetiere": {
    d: [
      // tour arrière avec le réservoir, bras supérieur, porte-filtre, verseuse, socle
      rect(500, 170, 150, 390, { rx: 14, fill: C.light }), rect(515, 300, 120, 200, { rx: 6, fill: C.water, stroke: C.waterLine, sw: 4 }),
      rect(290, 170, 360, 70, { rx: 14, fill: C.light }), path("M320 240 L470 240 L440 320 L350 320 Z", { fill: C.mid }),
      path("M330 350 L460 350 L480 470 Q480 530 400 530 Q330 530 320 470 Z", { fill: "#F4F8FC", stroke: C.ink, sw: 5 }), path("M332 440 L470 440 L474 470 Q474 518 400 518 Q336 518 328 470 Z", { fill: "#8A5A1E", stroke: "none", sw: 0 }),
      rect(270, 540, 400, 50, { rx: 12, fill: C.mid }), ellipse(400, 540, 90, 10, { fill: C.red, stroke: "#8E2323", sw: 3 }),
      // tube d'eau chaude : du réservoir, chauffé sous la plaque, jusqu'au-dessus du filtre
      path("M575 500 L575 568 L640 568 L640 205 L400 205 L400 240", { fill: "none", stroke: C.blue, sw: 6, "stroke-dasharray": "12 8" })
    ],
    r: [["Réservoir d'eau", 575, 400], ["Tube d'eau chaude", 640, 380], ["Porte-filtre", 395, 280], ["Verseuse", 470, 400], ["Plaque chauffante", 400, 540]]
  },

  "securite-porte-lave-linge": {
    d: [
      rect(260, 160, 420, 450, { rx: 16, fill: C.light }), rect(260, 160, 420, 60, { rx: 16, fill: C.mid }),
      // ouverture, joint de hublot et son collier
      circle(440, 400, 112, { fill: C.dark }), circle(440, 400, 100, { fill: "none", stroke: "#7D8794", sw: 22 }), circle(440, 400, 114, { fill: "none", stroke: C.steel, sw: 4 }),
      // porte ouverte à gauche, crochet sur son bord libre
      ellipse(240, 400, 34, 112, { fill: C.light, sw: 5 }), ellipse(240, 400, 18, 80, { fill: "#C9D6E3", sw: 3 }), rect(196, 390, 22, 20, { fill: C.steel, sw: 3 }),
      // sécurité de porte à droite de l'ouverture (deux vis), connecteur derrière
      rect(560, 370, 40, 60, { rx: 6, fill: C.amber, stroke: C.amberLine, sw: 4 }), screw(580, 352, 8), screw(580, 448, 8), rect(553, 392, 12, 16, { fill: C.dark, sw: 0 }),
      path("M600 400 C640 400 640 470 660 480", { fill: "none", stroke: C.ink, sw: 5, "stroke-dasharray": "8 6" }), rect(640, 478, 34, 24, { rx: 4, fill: C.white, sw: 4 })
    ],
    r: [["Joint de hublot", 340, 400], ["Collier du joint", 440, 286], ["Crochet de la porte", 207, 400], ["Sécurité de porte (deux vis)", 580, 400], ["Connecteur", 657, 490]]
  },

  "frigo-eau-au-fond": {
    d: [
      rect(250, 150, 420, 420, { rx: 14 }), rect(275, 170, 370, 380, { fill: C.white, sw: 3 }),
      line(275, 290, 645, 290, { stroke: C.steel, sw: 6 }), line(275, 390, 645, 390, { stroke: C.steel, sw: 6 }),
      // rigole et trou d'évacuation au bas de la paroi du fond
      path("M300 470 Q460 500 620 470", { fill: "none", stroke: C.waterLine, sw: 10 }), circle(460, 486, 12, { fill: C.dark, sw: 0 }), drop(400, 455, 0.7), drop(520, 455, 0.7),
      // tuyau jusqu'au bac d'évaporation, près du compresseur
      path("M460 498 L460 595", { fill: "none", stroke: C.ink, sw: 7, "stroke-dasharray": "10 7" }),
      rect(400, 590, 130, 26, { rx: 6, fill: C.water, stroke: C.waterLine, sw: 4 }), rect(560, 575, 80, 44, { rx: 18, fill: C.dark })
    ],
    r: [["Rigole", 340, 482], ["Trou d'évacuation", 460, 486], ["Tuyau d'évacuation", 460, 550], ["Bac d'évaporation", 440, 603], ["Compresseur", 600, 597]]
  },

  "nettoyer-condenseur-frigo": {
    d: [
      rect(300, 150, 290, 450, { rx: 12, fill: C.mid }),
      // serpentin du condenseur au dos
      path("M330 190 L560 190 L560 225 L330 225 L330 260 L560 260 L560 295 L330 295 L330 330 L560 330 L560 365 L330 365 L330 400 L560 400 L560 435 L330 435", { fill: "none", stroke: C.ink, sw: 6 }),
      // compresseur en bas
      rect(470, 500, 100, 80, { rx: 34, fill: C.dark }),
      // brosse longue
      line(640, 160, 560, 350, { stroke: C.amberLine, sw: 10 }), rect(536, 340, 46, 26, { rx: 6, fill: C.amber, stroke: C.amberLine, sw: 4 }),
      // appareil débranché
      unplugged(230, 520)
    ],
    r: [["Condenseur (au dos, ou en bas selon le modèle)", 445, 330], ["Compresseur", 520, 540], ["Brosse souple", 610, 230], ["Prise débranchée", 253, 550]]
  },

  "detartrer-centrale-vapeur": {
    d: [
      rect(250, 420, 430, 160, { rx: 34, fill: C.light }), rect(275, 445, 140, 110, { rx: 10, fill: C.water, stroke: C.waterLine, sw: 4 }),
      rect(430, 470, 140, 80, { rx: 20, fill: C.mid, sw: 4 }),
      // fer posé sur la base, cordon vapeur
      path("M420 410 L640 410 Q640 330 560 320 L480 320 Q430 330 420 410 Z", { fill: C.white }), path("M410 412 L650 412", { stroke: C.steel, sw: 12 }), path("M500 320 Q520 280 580 290", { fill: "none", sw: 10 }),
      path("M640 400 C700 380 700 470 680 480", { fill: "none", stroke: C.dark, sw: 9 }),
      // collecteur de tartre (si présent)
      circle(620, 510, 24, { fill: C.amber, stroke: C.amberLine, sw: 4 }), line(608, 510, 632, 510, { stroke: C.amberLine, sw: 4 })
    ],
    r: [["Fer", 560, 360], ["Semelle", 530, 412], ["Réservoir d'eau", 345, 500], ["Cuve (chaudière)", 500, 510], ["Collecteur de tartre (si présent)", 620, 510]]
  },

  "entretien-aspirateur-robot": {
    d: [
      circle(450, 390, 210, { fill: C.light }),
      // roues motrices, roulette avant, capteurs de vide
      rect(240, 345, 34, 90, { rx: 12, fill: C.dark }), rect(626, 345, 34, 90, { rx: 12, fill: C.dark }), circle(450, 218, 16, { fill: C.dark }),
      rect(320, 220, 24, 14, { rx: 4, fill: C.dark, sw: 0 }), rect(556, 220, 24, 14, { rx: 4, fill: C.dark, sw: 0 }), rect(250, 300, 24, 14, { rx: 4, fill: C.dark, sw: 0 }),
      // brosses latérales
      ...[[300, 260], [600, 260]].map(([x, y]) => [0, 60, 120, 180, 240, 300].map(a => line(x, y, x + 46 * Math.cos(a * Math.PI / 180), y + 46 * Math.sin(a * Math.PI / 180), { stroke: C.ink, sw: 4 })).join("") + circle(x, y, 10, { fill: C.mid, sw: 3 })),
      // brosse rouleau
      rect(340, 370, 220, 52, { rx: 20, fill: C.amber, stroke: C.amberLine, sw: 4 }), path("M360 372 L390 420 M400 372 L430 420 M440 372 L470 420 M480 372 L510 420 M520 372 L550 420", { fill: "none", stroke: C.amberLine, sw: 3 }),
      // bac et filtre (à l'arrière)
      rect(380, 480, 140, 80, { rx: 10, fill: C.mid, sw: 4, "stroke-dasharray": "10 6" }), grid(400, 495, 100, 50, 12, { stroke: C.steel, sw: 2 })
    ],
    r: [["Capteur de vide", 332, 227], ["Brosse latérale", 300, 260], ["Brosse rouleau", 450, 396], ["Roue", 643, 390], ["Bac et filtre", 450, 520]]
  },

  "climatiseur-mobile-refroidit-mal": {
    d: [
      rect(300, 150, 320, 460, { rx: 30, fill: C.light }),
      // sortie de la gaine d'évacuation
      circle(460, 220, 46, { fill: C.dark }), path("M460 174 C520 120 620 140 680 160", { fill: "none", stroke: C.steel, sw: 40 }), path("M470 180 C520 140 610 155 680 170", { fill: "none", stroke: C.ink, sw: 3, "stroke-dasharray": "6 10" }),
      // filtres à air (haut et bas)
      rect(340, 300, 240, 110, { rx: 8, fill: C.white, sw: 4 }), grid(340, 300, 240, 110, 14, { stroke: C.steel, sw: 2 }),
      rect(340, 430, 240, 110, { rx: 8, fill: C.white, sw: 4 }), grid(340, 430, 240, 110, 14, { stroke: C.steel, sw: 2 }),
      // bouchon de vidange des condensats
      rect(540, 560, 34, 26, { rx: 6, fill: C.amber, stroke: C.amberLine, sw: 4 }), drop(557, 605, 0.6)
    ],
    r: [["Gaine d'évacuation", 560, 150], ["Filtre à air (haut)", 460, 355], ["Filtre à air (bas)", 460, 485], ["Bouchon de vidange", 557, 573]]
  },

  "nettoyer-four": {
    d: [
      rect(240, 150, 440, 360, { rx: 14 }), rect(240, 150, 440, 50, { rx: 14, fill: C.mid }),
      // ouverture du four et joint tout autour
      rect(270, 220, 380, 270, { rx: 8, fill: C.white, stroke: "#7D8794", sw: 12 }),
      // grille et lèchefrite
      line(290, 330, 630, 330, { stroke: C.ink, sw: 5 }), ...Array.from({ length: 12 }, (_, i) => line(300 + i * 28, 322, 300 + i * 28, 338, { sw: 3 })),
      path("M290 430 L630 430 L615 462 L305 462 Z", { fill: C.dark }),
      // porte abaissée (vitre)
      path("M240 510 L680 510 L720 600 L200 600 Z", { fill: C.light, sw: 5 }), path("M290 522 L630 522 L655 586 L265 586 Z", { fill: "#C9D6E3", sw: 3 })
    ],
    r: [["Joint de porte", 270, 300], ["Parois", 600, 260], ["Grille", 460, 330], ["Lèchefrite", 460, 446], ["Porte (vitre)", 460, 555]]
  },

  "nettoyer-micro-ondes": {
    d: [
      rect(240, 190, 440, 320, { rx: 18 }), rect(265, 215, 290, 270, { rx: 6, fill: C.white, sw: 4 }), rect(570, 215, 85, 270, { rx: 6, fill: C.mid, sw: 4 }),
      // plaque de mica sur la paroi
      rect(500, 260, 40, 60, { fill: "#F3E3C0", stroke: C.amberLine, sw: 3 }),
      // plateau tournant et bol d'eau vinaigrée
      ellipse(410, 455, 120, 22, { fill: C.steel, sw: 4 }), path("M360 445 L460 445 L448 400 L372 400 Z", { fill: "#F4F8FC", stroke: C.ink, sw: 4 }), path("M376 412 L444 412", { stroke: C.waterLine, sw: 6 }),
      path("M390 385 q10 -18 0 -36 M420 385 q10 -18 0 -36 M450 385 q10 -18 0 -36", { fill: "none", stroke: C.steel, sw: 4 }),
      // porte ouverte
      path("M240 190 L190 160 L190 540 L240 510 Z", { fill: C.light, sw: 5 })
    ],
    r: [["Bol d'eau vinaigrée", 410, 425], ["Plateau tournant", 300, 458], ["Parois", 300, 240], ["Plaque de mica (ne pas frotter)", 520, 290], ["Porte", 215, 350]]
  },

  "nettoyer-plaque-vitroceramique": {
    d: [
      rect(230, 180, 460, 400, { rx: 18, fill: C.dark, stroke: "#252B33" }),
      circle(340, 290, 70, { fill: "none", stroke: "#8C96A3", sw: 5 }), circle(560, 290, 55, { fill: "none", stroke: "#8C96A3", sw: 5 }),
      circle(330, 480, 55, { fill: "none", stroke: "#8C96A3", sw: 5 }), circle(560, 470, 80, { fill: "none", stroke: "#8C96A3", sw: 5 }),
      // résidus cuits et grattoir tenu incliné
      ellipse(545, 455, 26, 14, { fill: "#8A5A1E", stroke: "none", sw: 0 }), path("M575 460 L625 425 L700 520 L655 548 Z", { fill: C.amber, stroke: C.amberLine, sw: 4 }), line(568, 470, 590, 446, { stroke: C.steel, sw: 6 })
    ],
    r: [["Foyer", 340, 220], ["Résidus cuits", 540, 455], ["Grattoir à lame, tenu incliné", 640, 485]]
  },

  "nettoyer-grille-pain": {
    d: [
      rect(270, 260, 380, 240, { rx: 50, fill: C.light }), rect(320, 270, 120, 26, { rx: 12, fill: C.dark }), rect(480, 270, 120, 26, { rx: 12, fill: C.dark }),
      rect(650, 330, 30, 70, { rx: 8, fill: C.mid, sw: 4 }),
      // tiroir à miettes sorti
      path("M300 500 L560 500 L560 540 L300 540 Z", { fill: C.mid, sw: 4 }), ...[330, 360, 395, 430, 470, 505].map((x, i) => circle(x, 520 + (i % 2) * 6, 4, { fill: "#8A5A1E", sw: 0 })),
      // appareil débranché
      unplugged(250, 560)
    ],
    r: [["Fentes", 380, 283], ["Manette", 665, 365], ["Tiroir à miettes", 430, 520], ["Prise débranchée", 273, 590]]
  },

  "joint-cocotte-minute": {
    d: [
      // couvercle vu de dessous
      circle(450, 380, 200, { fill: C.steel }), circle(450, 380, 185, { fill: "none", stroke: C.dark, sw: 18 }),
      rect(230, 360, 30, 40, { rx: 6, fill: C.mid, sw: 4 }), rect(640, 360, 30, 40, { rx: 6, fill: C.mid, sw: 4 }),
      // soupape de fonctionnement (centre) et soupape de sécurité
      circle(450, 380, 30, { fill: C.mid, sw: 5 }), circle(450, 380, 10, { fill: C.dark, sw: 0 }),
      circle(540, 300, 18, { fill: C.amber, stroke: C.amberLine, sw: 4 })
    ],
    r: [["Joint", 450, 195], ["Soupape de fonctionnement", 450, 380], ["Soupape de sécurité", 540, 300], ["Couvercle", 360, 500]]
  }
};
