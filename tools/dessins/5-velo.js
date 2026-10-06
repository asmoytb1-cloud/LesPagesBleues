/* Schémas redessinés — Vélo & Mobilité. Chaque repère [libellé, x, y] est posé sur la pièce qu'il nomme. */
const { plus, minus, C, rect, circle, ellipse, path, poly, line, text, arrow, turn, forbid, check, screw, drop } = require("./lib.js");

const hex = (x, y, r, o = {}) => poly(Array.from({ length: 6 }, (_, i) => `${(x + r * Math.cos(i * Math.PI / 3)).toFixed(1)},${(y + r * Math.sin(i * Math.PI / 3)).toFixed(1)}`).join(" "), { fill: o.fill || C.steel, sw: o.sw || 4 });
const cog = (x, y, r, teeth, o = {}) => poly(Array.from({ length: teeth * 2 }, (_, i) => { const rr = i % 2 ? r - 7 : r, a = i * Math.PI / teeth; return `${(x + rr * Math.cos(a)).toFixed(1)},${(y + rr * Math.sin(a)).toFixed(1)}`; }).join(" "), { fill: o.fill || C.steel, sw: o.sw || 4 });
const spokes = (x, y, r1, r2, n = 16) => Array.from({ length: n }, (_, i) => { const a = i * 2 * Math.PI / n; return line(x + r1 * Math.cos(a), y + r1 * Math.sin(a), x + r2 * Math.cos(a), y + r2 * Math.sin(a), { stroke: C.steel, sw: 2 }); }).join("");

module.exports = {
  "gonfler-pneu-velo": {
    d: [
      circle(450, 340, 210, { fill: C.dark, stroke: "#252B33" }), circle(450, 340, 178, { fill: C.steel, sw: 5 }), circle(450, 340, 166, { fill: C.white, sw: 3 }),
      spokes(450, 340, 22, 164), circle(450, 340, 22, { fill: C.mid, sw: 4 }),
      // pression indiquée sur le flanc
      rect(395, 140, 110, 22, { rx: 4, fill: "#5A616B", sw: 0 }), text(450, 157, "bar · PSI", { size: 16, fill: C.white }),
      // valve et embout de la pompe
      line(450, 506, 450, 470, { stroke: C.ink, sw: 8 }), rect(432, 430, 36, 44, { rx: 8, fill: C.amber, stroke: C.amberLine, sw: 4 }),
      path("M468 445 C540 445 600 520 640 600", { fill: "none", stroke: C.dark, sw: 9 })
    ],
    r: [["Pression indiquée sur le flanc", 450, 151], ["Pneu", 270, 260], ["Jante", 290, 400], ["Valve (Presta ou Schrader)", 450, 495], ["Embout de la pompe", 450, 452]]
  },

  "crevaison-velo": {
    d: [
      // jante, pneu ouvert d'un côté avec deux démonte-pneus
      circle(360, 380, 170, { fill: "none", stroke: C.steel, sw: 14 }), path("M360 200 A180 180 0 1 0 520 470", { fill: "none", stroke: C.dark, sw: 22 }),
      rect(300, 170, 18, 70, { rx: 6, fill: C.blue, stroke: "#174BAA", sw: 3 }), rect(402, 170, 18, 70, { rx: 6, fill: C.blue, stroke: "#174BAA", sw: 3 }),
      // chambre à air sortie, trou, rustine
      ellipse(560, 380, 120, 160, { fill: "none", stroke: "#5A616B", sw: 16 }),
      rect(660, 360, 34, 40, { rx: 8, fill: C.amber, stroke: C.amberLine, sw: 4 }),
      line(470, 470, 470, 520, { stroke: C.ink, sw: 8 }), rect(462, 516, 16, 20, { rx: 3, fill: C.dark, sw: 0 })
    ],
    r: [["Démonte-pneus", 309, 205], ["Pneu", 230, 420], ["Chambre à air", 560, 222], ["Rustine sur le trou", 677, 380], ["Valve", 470, 500]]
  },

  "regler-freins-velo": {
    d: [
      // vue de face : pneu, jante, patins, bras, câble
      ellipse(450, 245, 42, 48, { fill: C.dark, stroke: "#252B33" }), path("M410 290 L490 290 L475 380 L425 380 Z", { fill: C.steel }),
      line(375, 470, 375, 190, { stroke: C.ink, sw: 14 }), line(525, 470, 525, 190, { stroke: C.ink, sw: 14 }),
      rect(388, 312, 26, 44, { rx: 6, fill: C.amber, stroke: C.amberLine, sw: 4 }), rect(486, 312, 26, 44, { rx: 6, fill: C.amber, stroke: C.amberLine, sw: 4 }),
      circle(375, 470, 12, { fill: C.mid, sw: 4 }), circle(525, 470, 12, { fill: C.mid, sw: 4 }), screw(375, 430, 8),
      path("M375 190 Q450 150 525 190", { fill: "none", stroke: C.dark, sw: 5 }), hex(525, 195, 14), path("M525 190 C540 120 620 110 660 140", { fill: "none", stroke: C.dark, sw: 5 }),
      // levier et sa molette de réglage
      rect(600, 150, 100, 26, { rx: 10, fill: C.mid, sw: 4 }), circle(612, 140, 14, { fill: C.amber, stroke: C.amberLine, sw: 4 })
    ],
    r: [["Pneu", 450, 230], ["Jante", 450, 345], ["Patin, à plat sur la jante", 401, 334], ["Bras du frein", 525, 260], ["Vis de serrage du câble", 525, 195], ["Vis de rappel", 375, 430], ["Molette de réglage (levier)", 612, 140]]
  },

  "entretien-chaine-velo": {
    d: [
      // plateau et manivelle, cassette, dérailleur
      cog(300, 420, 82, 30), circle(300, 420, 22, { fill: C.mid, sw: 4 }), line(300, 420, 230, 510, { stroke: C.ink, sw: 14 }), turn(300, 420, 112, 300, 220),
      cog(580, 410, 52, 18), cog(580, 410, 38, 14, { fill: C.mid }), circle(580, 410, 12, { fill: C.dark, sw: 0 }),
      line(580, 410, 600, 480, { stroke: C.ink, sw: 8 }), circle(595, 480, 13, { fill: C.mid, sw: 4 }), circle(610, 545, 13, { fill: C.mid, sw: 4 }),
      // chaîne
      line(300, 338, 580, 358, { stroke: "#20252C", sw: 9 }), path("M300 502 L610 558 M610 532 L595 493 L620 462", { fill: "none", stroke: "#20252C", sw: 9 }),
      // burette au-dessus du brin inférieur, chiffon
      path("M430 440 L460 430 L470 470 L450 480 Z", { fill: C.amber, stroke: C.amberLine, sw: 4 }), line(445, 480, 450, 515, { stroke: C.amberLine, sw: 4 }), drop(450, 512, 0.5, { fill: C.amber, stroke: C.amberLine }),
      path("M500 520 L560 528 L555 575 L500 566 Z", { fill: C.white, stroke: C.ink, sw: 4 })
    ],
    r: [["Plateau", 300, 340], ["Chaîne", 440, 349], ["Cassette", 580, 360], ["Dérailleur", 610, 545], ["Burette : une goutte par rouleau", 455, 460], ["Chiffon", 530, 548]]
  },

  "regler-derailleur-arriere": {
    d: [
      // cassette (vue de côté)
      ...[120, 100, 82, 66].map((r, i) => circle(330, 300, r, { fill: i % 2 ? C.mid : C.steel, sw: 4 })), circle(330, 300, 16, { fill: C.dark, sw: 0 }),
      // patte, corps du dérailleur, vis H, L et B, molette
      path("M330 300 L430 330", { stroke: C.ink, sw: 16, fill: "none" }), screw(430, 330, 10),
      path("M430 320 L540 330 L515 420 L405 410 Z", { fill: C.light }),
      text(482, 360, "H", { size: 20 }), screw(500, 354, 8), text(482, 392, "L", { size: 20 }), screw(500, 386, 8), screw(410, 300, 8),
      circle(548, 324, 14, { fill: C.amber, stroke: C.amberLine, sw: 4 }), path("M556 314 C600 260 650 240 700 240", { fill: "none", stroke: C.dark, sw: 5 }),
      // chape et galets, chaîne
      line(465, 415, 490, 560, { stroke: C.ink, sw: 10 }), circle(470, 445, 20, { fill: C.mid, sw: 4 }), circle(488, 545, 20, { fill: C.mid, sw: 4 }),
      path("M330 420 L470 425 L488 565 L250 520", { fill: "none", stroke: "#20252C", sw: 7 })
    ],
    r: [["Patte de dérailleur", 380, 315], ["Vis B", 410, 300], ["Vis de butée H", 500, 354], ["Vis de butée L", 500, 386], ["Molette de tension du câble", 548, 324], ["Galet du haut", 470, 445], ["Cassette", 330, 190]]
  },

  "entretien-trottinette-electrique": {
    d: [
      line(200, 575, 710, 575, { sw: 5 }),
      circle(260, 520, 52, { fill: C.dark, stroke: "#252B33" }), circle(260, 520, 22, { fill: C.steel, sw: 4 }),
      circle(640, 520, 52, { fill: C.dark, stroke: "#252B33" }), circle(640, 520, 22, { fill: C.steel, sw: 4 }),
      // plateau (batterie dedans), garde-boue et frein arrière
      rect(300, 470, 300, 36, { rx: 12, fill: C.mid }), rect(330, 476, 240, 24, { rx: 6, fill: C.amber, stroke: C.amberLine, sw: 3, "stroke-dasharray": "8 5" }),
      path("M200 500 Q220 450 280 455", { fill: "none", stroke: C.ink, sw: 8 }), circle(260, 520, 34, { fill: "none", stroke: C.red, sw: 4 }),
      // potence, système de pliage, guidon
      line(640, 520, 600, 220, { stroke: C.ink, sw: 16 }), rect(590, 400, 40, 50, { rx: 8, fill: C.light }), screw(610, 425, 8),
      line(550, 215, 660, 215, { stroke: C.ink, sw: 12 }), screw(605, 250, 7), screw(612, 300, 7)
    ],
    r: [["Pneu", 640, 470], ["Frein arrière", 260, 486], ["Batterie (dans le plateau)", 450, 488], ["Système de pliage", 610, 425], ["Visserie de la potence et du guidon", 605, 250]]
  },

  "calibrer-hoverboard": {
    d: [
      // vu de dessus : deux plateaux, roues, voyants, bouton
      rect(250, 250, 420, 170, { rx: 70, fill: C.light }),
      rect(205, 270, 46, 130, { rx: 16, fill: C.dark }), rect(669, 270, 46, 130, { rx: 16, fill: C.dark }),
      rect(280, 280, 160, 110, { rx: 20, fill: C.dark }), rect(480, 280, 160, 110, { rx: 20, fill: C.dark }),
      circle(460, 300, 7, { fill: C.green, stroke: C.greenLine, sw: 2 }), circle(460, 325, 7, { fill: C.green, stroke: C.greenLine, sw: 2 }),
      circle(460, 420, 12, { fill: C.blue, stroke: "#174BAA", sw: 3 }),
      // posé bien à plat : vue de côté sur le sol, niveau
      line(230, 560, 690, 560, { sw: 5 }), rect(260, 520, 400, 30, { rx: 14, fill: C.light }), circle(240, 540, 20, { fill: C.dark }), circle(680, 540, 20, { fill: C.dark }),
      rect(410, 480, 100, 26, { rx: 8, fill: C.white, sw: 4 }), ellipse(460, 493, 14, 7, { fill: C.green, stroke: C.greenLine, sw: 2 })
    ],
    r: [["Plateau gauche", 360, 335], ["Voyants", 460, 312], ["Plateau droit", 560, 335], ["Roue", 692, 335], ["Bouton marche (maintenu)", 460, 420], ["Bien à plat sur un sol horizontal", 460, 493]]
  }
};
