/* Schémas redessinés — Jeux & Loisirs, Mode, Instruments. Chaque repère [libellé, x, y] est posé sur la pièce qu'il nomme. */
const { plus, minus, C, rect, circle, ellipse, path, poly, line, text, arrow, turn, forbid, check, screw, drop } = require("./lib.js");

const DENIM = "#6F8FB5", WOOD = "#C99A5B", WOOD2 = "#9C6B33";
// Guitare de profil couchée : caisse (deux lobes), rosace, manche, tête
const guitarBody = () => ellipse(285, 380, 68, 92, { fill: WOOD, stroke: WOOD2 }) + ellipse(380, 380, 54, 72, { fill: WOOD, stroke: WOOD2 }) +
  rect(300, 318, 60, 124, { fill: WOOD, stroke: "none", sw: 0 }) + circle(372, 380, 24, { fill: "#3B2A18", stroke: WOOD2, sw: 4 }) +
  rect(432, 364, 203, 32, { fill: "#5A4128", stroke: "#3B2A18", sw: 4 });

module.exports = {
  "matelas-gonflable-perce": {
    d: [
      rect(230, 190, 450, 330, { rx: 40, fill: "#BFD9EE", stroke: C.waterLine }), ...[260, 310, 360, 410, 460].map(y => line(260, y, 650, y, { stroke: "#9CC2E2", sw: 4 })),
      rect(240, 200, 30, 30, { rx: 6, fill: C.white, sw: 4 }),
      // zone savonnée : les bulles montrent la fuite ; trou marqué au stylo
      ellipse(520, 360, 70, 45, { fill: C.white, stroke: "none", sw: 0, "fill-opacity": ".6" }), ...[[500, 350, 9], [520, 340, 6], [535, 360, 11], [512, 372, 5]].map(([x, y, r]) => circle(x, y, r, { fill: "none", stroke: C.waterLine, sw: 3 })),
      circle(520, 360, 22, { fill: "none", stroke: C.red, sw: 4 }),
      // rustine et colle
      rect(320, 560, 70, 50, { rx: 10, fill: C.amber, stroke: C.amberLine, sw: 4 }), rect(430, 570, 90, 30, { rx: 10, fill: C.white, sw: 4 }), rect(520, 578, 20, 14, { fill: C.dark, sw: 0 })
    ],
    r: [["Valve", 255, 215], ["Eau savonneuse : les bulles montrent la fuite", 560, 340], ["Trou marqué", 520, 382], ["Rustine", 355, 585], ["Colle", 475, 585]]
  },

  "reinitialiser-manette-ps5": {
    d: [
      // manette vue de dos : gâchettes, emplacement du logo, petit trou
      path("M260 280 Q450 230 640 280 L690 500 Q690 560 630 560 Q590 560 560 500 L340 500 Q310 560 270 560 Q210 560 210 500 Z", { fill: C.light }),
      rect(280, 245, 90, 40, { rx: 14, fill: C.mid, sw: 4 }), rect(530, 245, 90, 40, { rx: 14, fill: C.mid, sw: 4 }),
      rect(410, 330, 80, 26, { rx: 6, fill: C.mid, sw: 3 }), circle(510, 343, 6, { fill: "#14181D", sw: 0 }),
      // trombone déplié engagé dans le trou
      path("M512 345 L600 420 Q615 432 600 445 L560 480 Q548 490 560 500 L590 525", { fill: "none", stroke: C.steel, sw: 5 }),
      // prise USB en haut et câble
      rect(435, 255, 30, 12, { rx: 4, fill: "#14181D", sw: 0 }), path("M450 255 L450 200 C450 170 520 160 560 160", { fill: "none", stroke: C.dark, sw: 8 })
    ],
    r: [["Câble USB", 500, 166], ["Prise USB-C", 450, 261], ["Emplacement du logo", 450, 343], ["Petit trou de réinitialisation", 510, 343], ["Trombone déplié", 600, 430]]
  },

  "depoussierer-ps5": {
    d: [
      // console couchée, logo vers le haut, façade retirée
      rect(230, 300, 420, 140, { rx: 20, fill: "#2B313A", stroke: "#14181D" }),
      path("M230 300 L650 300 L700 260 L280 260 Z", { fill: C.white, sw: 5 }), arrow(560, 250, 610, 220, { sw: 4, head: 12, color: C.ink }),
      // attrape-poussière, grilles
      circle(330, 370, 18, { fill: "#14181D", stroke: C.steel, sw: 3 }), circle(400, 370, 18, { fill: "#14181D", stroke: C.steel, sw: 3 }),
      ...Array.from({ length: 8 }, (_, i) => line(480 + i * 18, 330, 480 + i * 18, 410, { stroke: "#596372", sw: 4 })),
      // embout fin d'aspirateur (faible puissance)
      path("M300 560 L360 400 L376 406 L320 566 Z", { fill: C.mid, sw: 4 }), path("M300 560 C280 600 240 610 220 612", { fill: "none", stroke: C.dark, sw: 14 })
    ],
    r: [["Façade retirée", 520, 280], ["Attrape-poussière (deux orifices)", 400, 370], ["Grilles d'aération", 540, 370], ["Embout fin, faible puissance", 330, 500]]
  },

  "patch-jean": {
    d: [
      // jambe retournée (envers), trou, pièce thermocollante, torchon, fer
      path("M300 170 L560 170 L600 600 L260 600 Z", { fill: DENIM, stroke: "#3E5A7E" }), path("M430 170 L430 600", { stroke: "#3E5A7E", sw: 3, "stroke-dasharray": "10 8", fill: "none" }),
      ellipse(400, 440, 30, 20, { fill: "#2B313A", sw: 3 }),
      rect(350, 400, 100, 80, { rx: 10, fill: C.amber, stroke: C.amberLine, sw: 4, "fill-opacity": ".75" }),
      rect(320, 380, 190, 60, { fill: C.white, sw: 4, "fill-opacity": ".92" }),
      path("M330 300 L470 300 Q515 300 515 340 L515 378 L320 378 Z", { fill: C.mid }), line(390, 300, 430, 255, { stroke: C.ink, sw: 10 }), line(430, 255, 495, 255, { stroke: C.ink, sw: 10 }), arrow(560, 300, 560, 360, { sw: 5, head: 14 })
    ],
    r: [["Fer à repasser", 420, 340], ["Torchon (entre le fer et la pièce)", 480, 410], ["Pièce thermocollante", 430, 470], ["Jambe retournée (envers)", 540, 540]]
  },

  "recoudre-bouton": {
    d: [
      rect(220, 200, 300, 380, { fill: "#DCE6F1", stroke: C.waterLine }),
      // bouton à quatre trous, fil en croix
      circle(370, 380, 90, { fill: C.white }), ...[[340, 350], [400, 350], [340, 410], [400, 410]].map(([x, y]) => circle(x, y, 12, { fill: "#DCE6F1", sw: 4 })),
      line(340, 350, 400, 410, { stroke: C.red, sw: 5 }), line(400, 350, 340, 410, { stroke: C.red, sw: 5 }),
      // coupe : tige de fil sous le bouton, nœud au dos
      rect(560, 260, 30, 260, { fill: "#DCE6F1", stroke: C.waterLine, sw: 4 }), rect(610, 300, 24, 180, { rx: 8, fill: C.white, sw: 4 }),
      line(590, 360, 610, 360, { stroke: C.red, sw: 5 }), line(590, 420, 610, 420, { stroke: C.red, sw: 5 }), rect(590, 352, 20, 76, { fill: "none", stroke: C.red, sw: 4 }),
      circle(552, 390, 8, { fill: C.red, stroke: "#8E2323", sw: 2 })
    ],
    r: [["Bouton à quatre trous", 450, 330], ["Fil en croix (ou en parallèle)", 370, 380], ["Tissu", 260, 540], ["Tige de fil sous le bouton", 600, 390], ["Nœud au dos", 552, 390]]
  },

  "fermeture-eclair": {
    d: [
      // rubans cousus, dents, curseur, arrêt du bas
      rect(330, 160, 90, 440, { fill: C.light }), rect(470, 160, 90, 440, { fill: C.light }),
      line(345, 165, 345, 595, { stroke: C.ink, sw: 2, "stroke-dasharray": "8 6" }), line(545, 165, 545, 595, { stroke: C.ink, sw: 2, "stroke-dasharray": "8 6" }),
      ...Array.from({ length: 10 }, (_, i) => rect(395 - i * 3, 180 + i * 18, 22, 10, { fill: C.steel, sw: 2 }) + rect(473 + i * 3, 189 + i * 18, 22, 10, { fill: C.steel, sw: 2 })),
      ...Array.from({ length: 12 }, (_, i) => rect(i % 2 ? 444 : 424, 380 + i * 16, 22, 10, { fill: C.steel, sw: 2 })),
      path("M410 330 L480 330 L470 380 L420 380 Z", { fill: C.amber, stroke: C.amberLine, sw: 4 }), rect(436, 380, 18, 40, { rx: 6, fill: C.amber, stroke: C.amberLine, sw: 3 }),
      rect(426, 576, 38, 14, { rx: 4, fill: C.dark, sw: 0 }),
      // pince plate serrant l'arrière du curseur, un côté puis l'autre
      path("M610 330 L500 362 M610 380 L500 368", { fill: "none", stroke: C.blue, sw: 10 })
    ],
    r: [["Dents", 485, 230], ["Curseur", 445, 345], ["Pince plate : serrer l'arrière du curseur", 560, 352], ["Ruban cousu", 345, 480], ["Arrêt du bas", 445, 583]]
  },

  "cordes-guitare-classique": {
    d: [
      guitarBody(),
      // chevalet et nœud, sillet, tête ajourée avec ses mécaniques
      rect(240, 345, 24, 70, { rx: 4, fill: "#5A4128", stroke: "#3B2A18", sw: 3 }), circle(238, 368, 8, { fill: "none", stroke: C.white, sw: 3 }),
      ...[358, 372, 386, 400].map(y => line(252, y, 645, y, { stroke: "#E6EEF7", sw: 2 })),
      rect(635, 355, 10, 50, { fill: C.white, sw: 2 }),
      rect(645, 340, 70, 80, { rx: 8, fill: "#5A4128", stroke: "#3B2A18", sw: 4 }), rect(655, 355, 50, 14, { fill: C.light, sw: 2 }), rect(655, 391, 50, 14, { fill: C.light, sw: 2 }),
      ...[660, 680, 700].map(x => circle(x, 330, 8, { fill: C.steel, sw: 3 }))
    ],
    r: [["Chevalet : nœud de la corde", 238, 368], ["Rosace", 372, 400], ["Sillet", 640, 380], ["Tête ajourée", 680, 380], ["Mécanique (clé)", 680, 330]]
  },

  "cordes-guitare-folk": {
    d: [
      guitarBody(),
      // chevalet et chevilles, sillet, tête pleine et mécaniques
      rect(240, 345, 30, 70, { rx: 4, fill: "#2B1F12", stroke: "#3B2A18", sw: 3 }), ...[355, 368, 381, 394, 407].map(y => circle(255, y, 5, { fill: C.white, sw: 2 })),
      ...[358, 372, 386, 400].map(y => line(262, y, 645, y, { stroke: "#E6EEF7", sw: 2 })),
      rect(635, 355, 10, 50, { fill: C.white, sw: 2 }),
      path("M645 345 L710 335 L715 425 L645 415 Z", { fill: "#2B1F12", stroke: "#3B2A18", sw: 4 }),
      ...[660, 680, 700].map(x => circle(x, 320, 9, { fill: C.steel, sw: 3 }) + circle(x, 440, 9, { fill: C.steel, sw: 3 })),
      turn(680, 320, 26, 200, 330, { sw: 4 })
    ],
    r: [["Chevilles", 255, 381], ["Chevalet", 255, 412], ["Sillet", 640, 380], ["Tête", 680, 380], ["Mécanique : la corde s'enroule vers le bas", 680, 320]]
  }
};
