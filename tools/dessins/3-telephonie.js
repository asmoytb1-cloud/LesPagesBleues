/* Schémas redessinés — Téléphonie & Informatique. Chaque repère [libellé, x, y] est posé sur la pièce qu'il nomme. */
const { plus, minus, C, rect, circle, ellipse, path, poly, line, text, arrow, turn, forbid, check, screw, drop } = require("./lib.js");

const grid = (x, y, w, h, step = 18, o = {}) => Array.from({ length: Math.floor(w / step) - 1 }, (_, i) => line(x + step * (i + 1), y + 4, x + step * (i + 1), y + h - 4, { stroke: o.stroke || C.steel, sw: o.sw || 3 })).join("") +
  Array.from({ length: Math.floor(h / step) - 1 }, (_, i) => line(x + 4, y + step * (i + 1), x + w - 4, y + step * (i + 1), { stroke: o.stroke || C.steel, sw: o.sw || 3 })).join("");
const slats = (x, y, w, h, n = 6, o = {}) => Array.from({ length: n }, (_, i) => line(x + 10, y + (h / (n + 1)) * (i + 1), x + w - 10, y + (h / (n + 1)) * (i + 1), { stroke: o.stroke || C.ink, sw: o.sw || 4 })).join("");
const dust = (x, y, n = 6) => Array.from({ length: n }, (_, i) => circle(x + (i * 37) % 90, y + (i * 23) % 40, 4 + (i % 3), { fill: "#A99A86", sw: 0 })).join("");
const cloth = (x, y, w, h) => path(`M${x} ${y} L${x + w} ${y + 10} L${x + w - 10} ${y + h} L${x + 6} ${y + h - 8} Z`, { fill: C.amber, stroke: C.amberLine, sw: 4 });

module.exports = {
  "tetes-impression-imprimante": {
    d: [
      path("M250 300 L670 300 L640 190 L280 190 Z", { fill: C.light, sw: 5 }),
      rect(240, 300, 440, 190, { rx: 18 }), rect(270, 320, 380, 90, { rx: 6, fill: C.dark, sw: 3 }), line(280, 365, 640, 365, { stroke: C.steel, sw: 6 }),
      // chariot, cartouches, tête d'impression
      rect(380, 330, 140, 56, { rx: 6, fill: C.mid, sw: 4 }), ...["#5BC0EB", "#E05BA8", "#F2D24B", "#2B2F36"].map((c, i) => rect(390 + i * 32, 336, 26, 40, { rx: 4, fill: c, stroke: C.ink, sw: 3 })),
      rect(390, 386, 120, 10, { fill: "#20252C", sw: 0 }),
      // page de test des buses
      path("M330 490 L590 490 L610 600 L310 600 Z", { fill: C.white, sw: 4 }),
      ...[0, 1, 2, 3].map(i => path(`M${345 + i * 62} 515 ` + Array.from({ length: 6 }, (_, k) => `M${345 + i * 62 + k * 8} 515 L${345 + i * 62 + k * 8} ${i === 2 && k > 2 ? 530 : 580}`).join(" "), { fill: "none", stroke: ["#5BC0EB", "#E05BA8", "#F2D24B", "#2B2F36"][i], sw: 4 }))
    ],
    r: [["Capot ouvert", 460, 230], ["Cartouches ou réservoirs", 440, 355], ["Chariot", 510, 340], ["Tête d'impression (dessous)", 450, 391], ["Page de test des buses", 500, 560]]
  },

  "touche-clavier-bloquee": {
    d: [
      // clavier incliné, une touche bloquée
      path("M230 330 L620 270 L670 420 L280 490 Z", { fill: C.mid }),
      ...[0, 1, 2, 3].flatMap(r => Array.from({ length: 8 }, (_, c) => { const x = 270 + c * 45 + r * 12, y = 330 - c * 7 + r * 38; return path(`M${x} ${y} l36 -6 l6 26 l-36 6 Z`, { fill: r === 1 && c === 4 ? C.amber : C.white, stroke: r === 1 && c === 4 ? C.amberLine : C.ink, sw: 3 }); })),
      // coupe : touche, mécanisme, miettes
      rect(300, 540, 120, 24, { rx: 6, fill: C.amber, stroke: C.amberLine, sw: 4 }), path("M320 568 L400 600 M320 600 L400 568", { fill: "none", stroke: C.ink, sw: 5 }), line(290, 606, 430, 606, { sw: 6 }),
      circle(340, 596, 5, { fill: "#8A5A1E", sw: 0 }), circle(385, 598, 6, { fill: "#8A5A1E", sw: 0 }),
      // bombe d'air sec avec sa tige
      rect(580, 470, 60, 120, { rx: 14, fill: C.light }), rect(592, 448, 36, 24, { rx: 6, fill: C.dark, sw: 3 }), line(600, 455, 470, 380, { stroke: C.red, sw: 4 }), arrow(470, 380, 445, 366, { sw: 3, head: 12, color: C.steel })
    ],
    r: [["Touche bloquée", 470, 366], ["Mécanisme sous la touche", 360, 584], ["Miettes", 385, 598], ["Bombe d'air sec (tige)", 610, 530]]
  },

  "telephone-ne-charge-plus": {
    d: [
      path("M270 170 L630 170 L630 360 Q630 430 560 430 L340 430 Q270 430 270 360 Z", { fill: C.dark, stroke: "#252B33" }),
      rect(300, 175, 300, 200, { fill: "#4A5462", sw: 0 }),
      // port de charge en bas, peluches au fond
      rect(410, 412, 80, 20, { rx: 10, fill: "#14181D", stroke: C.steel, sw: 3 }), circle(432, 422, 4, { fill: "#A99A86", sw: 0 }), circle(450, 424, 5, { fill: "#A99A86", sw: 0 }), circle(468, 421, 4, { fill: "#A99A86", sw: 0 }),
      ...[330, 350, 370].map(x => circle(x, 415, 4, { fill: "#14181D", sw: 0 })), ...[530, 550, 570].map(x => circle(x, 415, 4, { fill: "#14181D", sw: 0 })),
      // cure-dent en bois
      line(520, 560, 455, 440, { stroke: "#C8A26B", sw: 7 }),
      // câble
      rect(330, 520, 60, 34, { rx: 8, fill: C.steel, sw: 4 }), rect(345, 500, 30, 22, { rx: 5, fill: C.mid, sw: 3 }), path("M360 554 C360 600 300 600 260 610", { fill: "none", sw: 8 })
    ],
    r: [["Port de charge", 410, 422], ["Peluches au fond du port", 450, 424], ["Cure-dent en bois (pas de métal)", 500, 520], ["Câble (essayer un autre)", 360, 537]]
  },

  "pc-lent": {
    d: [
      rect(240, 160, 440, 290, { rx: 14, fill: C.dark, stroke: "#252B33" }), rect(260, 180, 400, 250, { fill: C.white, sw: 0 }),
      rect(430, 450, 60, 50, { fill: C.mid, sw: 4 }), rect(380, 500, 160, 20, { rx: 8, fill: C.mid, sw: 4 }),
      // applications au démarrage (interrupteurs)
      ...[0, 1, 2, 3].map(i => rect(280, 200 + i * 50, 140, 26, { rx: 6, fill: C.light, sw: 3 }) + rect(430, 202 + i * 50, 44, 22, { rx: 11, fill: i ? C.mid : C.green, stroke: i ? C.ink : C.greenLine, sw: 3 }) + circle(i ? 442 : 462, 213 + i * 50, 8, { fill: C.white, sw: 2 })),
      // espace disque libre
      rect(500, 300, 140, 30, { rx: 8, fill: C.white, sw: 4 }), rect(504, 304, 112, 22, { rx: 6, fill: C.amber, stroke: "none", sw: 0 }),
      // aérations à dépoussiérer
      rect(540, 540, 150, 70, { rx: 10, fill: C.mid, sw: 4 }), slats(540, 540, 150, 70, 4), dust(560, 555)
    ],
    r: [["Applications au démarrage", 350, 263], ["Espace disque libre", 570, 315], ["Aérations à dépoussiérer", 615, 575]]
  },

  "nettoyer-montre-connectee": {
    d: [
      // bracelets détachés, barrettes à ressort
      rect(370, 150, 120, 110, { rx: 14, fill: C.dark }), line(360, 262, 500, 262, { stroke: C.steel, sw: 8 }),
      rect(370, 470, 120, 130, { rx: 14, fill: C.dark }), line(360, 466, 500, 466, { stroke: C.steel, sw: 8 }),
      // boîtier vu de dos, capteurs
      rect(330, 280, 200, 170, { rx: 50, fill: C.steel }), circle(430, 365, 52, { fill: C.dark, sw: 4 }),
      ...[[410, 345], [450, 345], [410, 385], [450, 385]].map(([x, y]) => circle(x, y, 7, { fill: C.green, stroke: C.greenLine, sw: 2 })),
      cloth(560, 330, 120, 100)
    ],
    r: [["Bracelet (détaché)", 430, 205], ["Barrette à ressort", 480, 262], ["Capteurs au dos", 430, 365], ["Boîtier", 350, 420], ["Chiffon doux", 620, 380]]
  },

  "mettre-a-jour-gps": {
    d: [
      // GPS
      rect(230, 300, 170, 120, { rx: 14, fill: C.dark }), rect(245, 314, 140, 92, { fill: "#C9E2C5", sw: 0 }), path("M255 380 L300 340 L340 360 L375 325", { fill: "none", stroke: C.blue, sw: 4 }),
      // câble USB jusqu'à l'ordinateur
      path("M400 360 C460 360 450 470 520 470", { fill: "none", stroke: C.ink, sw: 6 }),
      // ordinateur portable : logiciel du fabricant, barre de progression, espace mémoire
      rect(500, 230, 200, 150, { rx: 10, fill: C.dark }), rect(512, 242, 176, 126, { fill: C.white, sw: 0 }), path("M480 380 L720 380 L740 410 L460 410 Z", { fill: C.mid, sw: 4 }),
      rect(525, 270, 150, 20, { rx: 6, fill: C.light, sw: 3 }), rect(527, 272, 90, 16, { rx: 5, fill: C.blue, stroke: "none", sw: 0 }),
      rect(525, 320, 150, 20, { rx: 6, fill: C.light, sw: 3 }), rect(527, 322, 128, 16, { rx: 5, fill: C.amber, stroke: "none", sw: 0 })
    ],
    r: [["GPS", 315, 360], ["Câble USB", 455, 410], ["Logiciel du fabricant : mise à jour", 600, 280], ["Espace mémoire", 600, 330]]
  },

  "nettoyer-ecran-tv": {
    d: [
      rect(230, 160, 460, 280, { rx: 10, fill: C.dark, stroke: "#252B33" }), rect(246, 176, 428, 248, { fill: "#2B313A", sw: 0 }),
      rect(430, 440, 60, 50, { fill: C.mid, sw: 4 }), rect(360, 488, 200, 18, { rx: 8, fill: C.mid, sw: 4 }),
      // chiffon microfibre
      cloth(300, 230, 130, 110), arrow(440, 300, 510, 300, { sw: 5, head: 14 }),
      // vaporisateur : jamais directement sur l'écran
      rect(600, 500, 60, 100, { rx: 12, fill: C.light }), rect(612, 476, 36, 26, { fill: C.mid, sw: 3 }), line(612, 482, 580, 470, { sw: 5 }), forbid(560, 470, 18)
    ],
    r: [["Écran éteint et débranché", 600, 220], ["Chiffon microfibre sec, puis à peine humide", 360, 285], ["Ne pulvérisez jamais sur l'écran", 630, 550]]
  },

  "filtre-videoprojecteur": {
    d: [
      rect(250, 280, 420, 180, { rx: 30 }), circle(600, 370, 54, { fill: C.dark }), circle(600, 370, 34, { fill: "#5E9CCB", stroke: C.ink, sw: 4 }),
      slats(280, 300, 120, 140, 6),
      // capot du filtre retiré et filtre à air
      rect(420, 470, 140, 30, { rx: 6, fill: C.mid, sw: 4 }), rect(420, 520, 140, 70, { rx: 6, fill: C.white, sw: 4 }), grid(420, 520, 140, 70, 12, { stroke: C.steel, sw: 2 }), dust(440, 535),
      rect(420, 455, 140, 6, { fill: C.dark, sw: 0 }), arrow(490, 515, 490, 504, { sw: 4, head: 10, color: C.ink })
    ],
    r: [["Objectif", 600, 370], ["Aérations", 340, 370], ["Capot du filtre", 490, 485], ["Filtre à air", 520, 555]]
  },

  "lecteur-dvd-ne-lit-plus": {
    d: [
      rect(230, 260, 460, 120, { rx: 14 }), rect(300, 380, 260, 20, { fill: C.mid, sw: 4 }),
      // tiroir ouvert, disque face gravée vers le bas, lentille laser
      path("M300 400 L560 400 L600 520 L260 520 Z", { fill: C.light }), ellipse(430, 460, 120, 46, { fill: "#E6EEF7", stroke: C.ink, sw: 4 }), ellipse(430, 460, 22, 9, { fill: C.mid, sw: 3 }),
      circle(540, 495, 10, { fill: C.blue, stroke: C.dark, sw: 3 }), forbid(580, 470, 14)
    ],
    r: [["Lecteur", 600, 320], ["Tiroir", 300, 500], ["Disque : face lisible en dessous", 380, 460], ["Lentille laser : ne pas toucher", 540, 495]]
  },

  "barre-de-son-pas-de-son": {
    d: [
      // téléviseur vu de dos, ses prises
      rect(260, 150, 400, 250, { rx: 10, fill: C.mid }), rect(500, 300, 140, 80, { rx: 8, fill: C.light, sw: 4 }),
      rect(515, 315, 40, 18, { rx: 3, fill: C.dark, sw: 0 }), text(535, 362, "ARC", { size: 18 }), rect(585, 312, 30, 24, { rx: 4, fill: C.dark, sw: 0 }), text(600, 362, "OPT", { size: 18 }),
      // barre de son
      rect(240, 500, 440, 70, { rx: 30, fill: C.dark }), rect(560, 515, 40, 18, { rx: 3, fill: "#14181D", stroke: C.steel, sw: 2 }),
      // câble HDMI (ARC) et câble optique (si pas d'ARC)
      path("M535 333 C530 430 580 440 580 515", { fill: "none", stroke: C.ink, sw: 8 }),
      path("M600 336 C620 430 650 450 640 505", { fill: "none", stroke: C.amberLine, sw: 5, "stroke-dasharray": "10 8" })
    ],
    r: [["Prise HDMI ARC / eARC du téléviseur", 535, 324], ["Prise optique", 600, 324], ["Câble HDMI", 548, 430], ["Barre de son (entrée HDMI ARC)", 400, 535]]
  },

  "nettoyer-ecouteurs-casque": {
    d: [
      // casque : arceau, coussinets, grille
      path("M270 360 C270 170 520 170 520 360", { fill: "none", stroke: C.dark, sw: 18 }),
      rect(240, 340, 70, 130, { rx: 26, fill: C.dark }), rect(480, 340, 70, 130, { rx: 26, fill: C.dark }), rect(300, 352, 22, 106, { rx: 10, fill: C.steel, sw: 3 }),
      // écouteur intra : grille, embout silicone retiré
      rect(570, 250, 70, 110, { rx: 30, fill: C.light }), circle(605, 270, 22, { fill: C.steel, sw: 4 }), grid(590, 256, 30, 30, 8, { stroke: C.ink, sw: 1 }),
      path("M580 180 Q605 140 630 180 L622 200 L588 200 Z", { fill: "#BFE0F7", stroke: C.waterLine, sw: 4 }),
      // brosse souple
      rect(360, 520, 160, 20, { rx: 8, fill: C.amber, stroke: C.amberLine, sw: 4 }), ...Array.from({ length: 6 }, (_, i) => line(380 + i * 22, 540, 380 + i * 22, 570, { sw: 3 }))
    ],
    r: [["Coussinet", 275, 420], ["Grille du haut-parleur", 605, 270], ["Embout silicone (retiré)", 605, 185], ["Brosse souple", 440, 530]]
  },

  "nettoyer-objectif-appareil-photo": {
    d: [
      rect(260, 300, 260, 160, { rx: 16, fill: C.dark }), ellipse(520, 380, 30, 80, { fill: "#5E9CCB", stroke: C.ink, sw: 5 }),
      ...[300, 340, 380].map(x => line(x, 300, x, 460, { stroke: "#596372", sw: 4 })),
      // soufflette, pinceau, chiffon microfibre
      ellipse(640, 240, 46, 56, { fill: C.red, stroke: "#8E2323", sw: 4 }), line(610, 270, 560, 320, { stroke: C.dark, sw: 10 }),
      line(600, 480, 680, 560, { stroke: C.amberLine, sw: 8 }), path("M590 470 L570 440 L600 450 L615 470 Z", { fill: C.dark, sw: 2 }),
      path("M280 520 L420 530 L410 600 L286 590 Z", { fill: "#BFE0F7", stroke: C.waterLine, sw: 4 })
    ],
    r: [["Lentille frontale", 525, 380], ["Soufflette", 640, 240], ["Pinceau", 595, 462], ["Chiffon microfibre", 350, 560]]
  }
};
