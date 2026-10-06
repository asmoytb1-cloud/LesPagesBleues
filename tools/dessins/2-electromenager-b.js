/* Schémas redessinés — Électroménager (2/2). Chaque repère [libellé, x, y] est posé sur la pièce qu'il nomme. */
const { plus, minus, C, rect, circle, ellipse, path, poly, line, text, arrow, turn, forbid, check, screw, drop } = require("./lib.js");

const grid = (x, y, w, h, step = 18, o = {}) => Array.from({ length: Math.floor(w / step) - 1 }, (_, i) => line(x + step * (i + 1), y + 4, x + step * (i + 1), y + h - 4, { stroke: o.stroke || C.steel, sw: o.sw || 3 })).join("") +
  Array.from({ length: Math.floor(h / step) - 1 }, (_, i) => line(x + 4, y + step * (i + 1), x + w - 4, y + step * (i + 1), { stroke: o.stroke || C.steel, sw: o.sw || 3 })).join("");
const unplugged = (x, y) => rect(x, y, 46, 60, { rx: 8, fill: C.white, sw: 4 }) + circle(x + 15, y + 30, 5, { fill: C.dark, sw: 0 }) + circle(x + 31, y + 30, 5, { fill: C.dark, sw: 0 }) +
  rect(x + 70, y + 14, 44, 32, { rx: 8, fill: C.white, sw: 4 }) + line(x + 70, y + 24, x + 56, y + 24, { sw: 4 }) + line(x + 70, y + 36, x + 56, y + 36, { sw: 4 }) +
  path(`M${x + 114} ${y + 30} C${x + 150} ${y + 30} ${x + 150} ${y + 70} ${x + 190} ${y + 70}`, { fill: "none", sw: 5 });
const OIL = "#F6D58A";

module.exports = {
  "entretien-friteuse": {
    d: [
      rect(250, 200, 420, 52, { rx: 18, fill: C.mid }), rect(400, 210, 120, 32, { rx: 4, fill: C.dark, sw: 3 }), grid(400, 210, 120, 32, 10, { stroke: "#596372", sw: 2 }),
      rect(260, 260, 400, 300, { rx: 30 }), rect(290, 285, 340, 245, { rx: 10, fill: C.steel, sw: 5 }),
      rect(296, 360, 328, 164, { rx: 6, fill: OIL, stroke: "none", sw: 0 }),
      // panier (maille) et sa poignée
      rect(330, 300, 260, 190, { rx: 8, fill: "none", stroke: C.ink, sw: 4, "stroke-dasharray": "8 6" }), line(590, 320, 700, 280, { sw: 10 }),
      // repères MIN et MAX gravés dans la cuve
      line(290, 340, 315, 340, { sw: 5 }), text(325, 335, "MAX", { size: 18, anchor: "start" }), line(290, 440, 315, 440, { sw: 5 }), text(325, 435, "MIN", { size: 18, anchor: "start" })
    ],
    r: [["Filtre du couvercle", 460, 226], ["Repère MAX", 303, 340], ["Panier", 460, 300], ["Huile", 520, 470], ["Repère MIN", 303, 440], ["Cuve", 300, 515]]
  },

  "nettoyer-robot-mixeur": {
    d: [
      // bol, couteaux et joint démontés au-dessus du bloc moteur
      path("M330 170 L520 170 L495 370 L355 370 Z", { fill: "#F4F8FC" }), line(520, 200, 570, 230, { sw: 10 }), line(570, 230, 560, 330, { sw: 10 }),
      rect(385, 385, 80, 30, { rx: 6, fill: C.steel, sw: 4 }), path("M425 385 L380 360 M425 385 L470 360 M425 385 L395 395 M425 385 L455 395", { fill: "none", stroke: C.ink, sw: 6 }),
      ellipse(425, 432, 50, 10, { fill: C.dark, sw: 3 }),
      rect(320, 460, 210, 130, { rx: 24, fill: C.mid }), circle(425, 540, 22, { fill: C.dark, sw: 4 }),
      // les mains loin des lames
      forbid(500, 400, 14)
    ],
    r: [["Bol", 425, 270], ["Couteaux (mains à distance)", 445, 372], ["Joint", 425, 432], ["Bloc moteur : essuyer, jamais dans l'eau", 470, 500]]
  },

  "entretien-machine-a-pain": {
    d: [
      path("M300 220 L600 220 L580 520 L320 520 Z", { fill: C.dark, stroke: "#252B33" }), path("M312 232 L588 232 L570 508 L330 508 Z", { fill: "#4A5462", stroke: "none", sw: 0 }),
      path("M300 220 Q450 120 600 220", { fill: "none", stroke: C.steel, sw: 8 }),
      // pétrin sur son axe, joint de l'axe sous la cuve
      path("M420 490 L480 470 L490 500 L430 505 Z", { fill: C.steel, sw: 4 }), line(450, 505, 450, 590, { stroke: C.steel, sw: 14 }),
      rect(430, 530, 40, 14, { rx: 6, fill: C.amber, stroke: C.amberLine, sw: 3 }), rect(420, 585, 60, 22, { rx: 6, fill: C.mid, sw: 4 })
    ],
    r: [["Cuve (revêtement antiadhésif)", 370, 300], ["Pétrin", 455, 488], ["Axe du pétrin", 450, 565], ["Joint de l'axe", 450, 537]]
  },

  "nettoyer-extracteur-de-jus": {
    d: [
      // vis sans fin, tamis, bol (démontés, de haut en bas)
      path("M420 300 L480 300 L470 170 L430 170 Z", { fill: C.light }), path("M425 280 L475 260 M428 240 L472 220 M432 200 L468 186", { fill: "none", sw: 5 }),
      rect(340, 320, 220, 120, { rx: 14, fill: C.white }), grid(340, 320, 220, 120, 12, { stroke: C.steel, sw: 2 }),
      path("M300 460 L600 460 L585 570 L315 570 Z", { fill: C.mid }), line(600, 490, 650, 500, { sw: 10 }),
      // brosse
      rect(640, 220, 22, 160, { rx: 8, fill: C.amber, stroke: C.amberLine, sw: 4 }), ...Array.from({ length: 7 }, (_, i) => line(662, 230 + i * 20, 690, 230 + i * 20, { sw: 3 }))
    ],
    r: [["Vis sans fin", 450, 240], ["Tamis", 450, 380], ["Bol", 450, 520], ["Brosse", 651, 300]]
  },

  "nettoyer-appareil-raclette": {
    d: [
      rect(250, 210, 420, 34, { rx: 8, fill: C.dark }), ...Array.from({ length: 9 }, (_, i) => line(275 + i * 45, 214, 275 + i * 45, 240, { stroke: "#596372", sw: 4 })),
      rect(270, 244, 380, 50, { fill: C.mid }), path("M290 270 l20 -12 l20 24 l20 -24 l20 24 l20 -24 l20 24 l20 -24 l20 24 l20 -24 l20 24 l20 -24 l20 24 l20 -24 l20 24 l20 -24 l20 24", { fill: "none", stroke: C.red, sw: 4 }),
      // poêlons glissés sous la résistance
      ...[300, 420, 540].map(x => rect(x, 320, 90, 26, { rx: 6, fill: C.dark }) + line(x + 45, 346, x + 45, 420, { sw: 8 })),
      rect(260, 440, 400, 60, { rx: 16, fill: C.light })
    ],
    r: [["Plaque gril", 460, 227], ["Résistance (ne jamais mouiller)", 380, 270], ["Poêlons", 465, 333], ["Base", 460, 470]]
  },

  "entretien-yaourtiere": {
    d: [
      path("M270 250 Q460 150 650 250 L650 270 L270 270 Z", { fill: "#E9F1F9" }),
      ...[300, 370, 440, 510, 580].map(x => rect(x, 360, 54, 90, { rx: 8, fill: C.white, sw: 4 })),
      rect(250, 450, 420, 100, { rx: 24, fill: C.mid }), rect(280, 470, 360, 16, { rx: 6, fill: C.red, stroke: "none", sw: 0 })
    ],
    r: [["Couvercle", 460, 210], ["Pots", 467, 405], ["Base chauffante (essuyer seulement)", 460, 520]]
  },

  "nettoyer-trancheuse": {
    d: [
      rect(240, 460, 460, 90, { rx: 18, fill: C.mid }),
      circle(420, 330, 140, { fill: C.steel, sw: 6 }), circle(420, 330, 40, { fill: C.mid, sw: 5 }),
      path("M290 260 A150 150 0 0 1 560 280", { fill: "none", stroke: C.ink, sw: 18 }),
      // chariot
      path("M560 300 L700 280 L700 460 L570 460 Z", { fill: C.light }), line(600, 330, 680, 320, { stroke: C.steel, sw: 6 }),
      // molette d'épaisseur réglée sur zéro
      circle(275, 505, 30, { fill: C.white, sw: 5 }), line(275, 505, 275, 480, { stroke: C.red, sw: 5 }),
      unplugged(480, 560)
    ],
    r: [["Protège-lame", 420, 182], ["Lame circulaire", 360, 380], ["Chariot", 640, 400], ["Molette d'épaisseur sur zéro", 275, 505], ["Prise débranchée", 503, 590]]
  },

  "nettoyer-machine-a-glacons": {
    d: [
      rect(260, 170, 400, 400, { rx: 24 }), rect(290, 190, 340, 40, { rx: 8, fill: "#C9D6E3", sw: 4 }),
      // panier à glaçons et réservoir d'eau au fond
      rect(300, 260, 240, 130, { rx: 8, fill: C.white, sw: 4 }), grid(300, 260, 240, 130, 16, { stroke: C.steel, sw: 2 }),
      ...[[340, 300], [380, 320], [430, 300], [480, 330]].map(([x, y]) => rect(x, y, 30, 26, { rx: 6, fill: "#DDEFFC", stroke: C.waterLine, sw: 3 })),
      rect(290, 430, 340, 110, { rx: 6, fill: C.water, stroke: C.waterLine, sw: 4 }),
      // pelle, bouchon de vidange
      path("M570 270 L620 270 L615 340 L575 340 Z", { fill: C.mid, sw: 4 }), line(595, 340, 595, 400, { sw: 8 }),
      rect(600, 548, 30, 22, { rx: 5, fill: C.amber, stroke: C.amberLine, sw: 4 })
    ],
    r: [["Panier à glaçons", 420, 280], ["Pelle", 595, 300], ["Réservoir d'eau", 460, 500], ["Bouchon de vidange", 615, 559]]
  },

  "nettoyer-tireuse-a-biere": {
    d: [
      rect(280, 200, 290, 360, { rx: 30 }), rect(320, 300, 190, 220, { rx: 30, fill: C.steel, sw: 5 }), line(320, 360, 510, 360, { stroke: "#98A4B2", sw: 4 }), line(320, 460, 510, 460, { stroke: "#98A4B2", sw: 4 }),
      // tube de tirage, du fût au robinet
      path("M415 300 L415 240 L600 240", { fill: "none", stroke: C.amber, sw: 8 }),
      rect(590, 220, 40, 50, { rx: 8, fill: C.mid }), line(612, 220, 600, 150, { stroke: C.dark, sw: 14 }), rect(602, 270, 20, 40, { fill: C.steel, sw: 4 }),
      // bac d'égouttage
      rect(560, 520, 130, 24, { rx: 6, fill: C.dark }), ...[575, 600, 625, 650, 675].map(x => line(x, 524, x, 540, { stroke: "#596372", sw: 3 }))
    ],
    r: [["Robinet", 612, 245], ["Tube de tirage (à changer)", 500, 240], ["Fût", 415, 410], ["Bac d'égouttage", 625, 532]]
  },

  "cartouche-carafe-filtrante": {
    d: [
      path("M300 200 L560 200 L540 590 L320 590 Z", { fill: "#F4F8FC" }), path("M318 420 L542 420 L540 590 L320 590 Z", { fill: C.water, stroke: "none", sw: 0 }),
      path("M560 260 C640 260 640 480 548 480", { fill: "none", sw: 12 }),
      rect(290, 176, 280, 30, { rx: 10, fill: C.mid }), circle(470, 191, 12, { fill: C.green, stroke: C.greenLine, sw: 4 }),
      // entonnoir et cartouche (encoche d'orientation)
      path("M318 210 L542 210 L520 330 L340 330 Z", { fill: C.light, sw: 4 }),
      rect(400, 320, 60, 110, { rx: 16, fill: C.amber, stroke: C.amberLine, sw: 4 }), poly("420,320 440,320 430,336", { fill: C.dark, stroke: C.dark, sw: 2 })
    ],
    r: [["Indicateur de changement", 470, 191], ["Couvercle", 340, 190], ["Entonnoir", 360, 270], ["Encoche d'orientation", 430, 328], ["Cartouche", 430, 395]]
  },

  "debloquer-broyeur-evier": {
    d: [
      path("M220 190 L380 190 L380 220 L540 220 L540 190 L700 190", { fill: "none", sw: 8 }), forbid(460, 160, 18),
      rect(360, 230, 200, 270, { rx: 30, fill: C.mid }), path("M560 300 L650 300 L650 340", { fill: "none", stroke: C.steel, sw: 22 }),
      // dessous : empreinte six pans au centre, bouton de réarmement
      ellipse(460, 500, 100, 20, { fill: C.light, sw: 5 }), poly("452,493 468,493 474,500 468,507 452,507 446,500", { fill: C.dark, sw: 2 }),
      rect(515, 488, 26, 20, { rx: 6, fill: C.red, stroke: "#8E2323", sw: 3 }),
      // clé six pans engagée par dessous
      path("M460 505 L460 580 L540 580", { fill: "none", stroke: C.ink, sw: 10 }), turn(460, 580, 40, 200, 320)
    ],
    r: [["Entrée : jamais la main dedans", 460, 205], ["Broyeur", 400, 330], ["Empreinte six pans (dessous, au centre)", 460, 500], ["Bouton de réarmement", 528, 498], ["Clé six pans", 520, 580]]
  },

  "nettoyer-filtre-seche-cheveux": {
    d: [
      rect(300, 250, 300, 110, { rx: 50, fill: C.light }), path("M600 270 L680 285 L680 325 L600 340 Z", { fill: C.mid }),
      path("M440 360 L500 360 L520 570 L460 570 Z", { fill: C.light }),
      // filtre arrière amovible (sorti), flèches de l'air
      ellipse(240, 305, 22, 55, { fill: C.white, sw: 5 }), grid(220, 252, 40, 106, 10, { stroke: C.steel, sw: 2 }), arrow(270, 305, 298, 305, { sw: 4, head: 12, color: C.ink }),
      arrow(690, 305, 720, 305, { sw: 5, head: 14 })
    ],
    r: [["Filtre arrière (entrée d'air)", 240, 305], ["Sortie d'air", 640, 305], ["Corps", 450, 305]]
  },

  "entretien-rasoir-electrique": {
    d: [
      path("M370 330 L530 330 L520 590 L380 590 Z", { fill: C.light }), rect(395, 340, 110, 50, { rx: 10, fill: C.dark, sw: 3 }),
      // porte-têtes ouvert (articulé en haut)
      circle(450, 225, 100, { fill: C.mid }), ...[[410, 195], [490, 195], [450, 265]].map(([x, y]) => circle(x, y, 32, { fill: C.steel, sw: 4 }) + circle(x, y, 18, { fill: "none", stroke: "#98A4B2", sw: 3 })),
      line(450, 325, 450, 330, { sw: 8 }),
      // brosse
      rect(600, 300, 18, 140, { rx: 6, fill: C.amber, stroke: C.amberLine, sw: 4 }), ...Array.from({ length: 5 }, (_, i) => line(618, 312 + i * 26, 650, 312 + i * 26, { sw: 3 }))
    ],
    r: [["Têtes de coupe et grilles", 490, 195], ["Porte-têtes ouvert", 380, 280], ["Logement des poils", 450, 365], ["Brosse", 609, 370]]
  },

  "entretien-brosse-a-dents-electrique": {
    d: [
      rect(400, 330, 100, 280, { rx: 40, fill: C.light }), circle(450, 430, 16, { fill: C.blue, stroke: C.blue, sw: 2 }),
      line(450, 250, 450, 332, { stroke: C.steel, sw: 14 }), ...[[436, 318], [462, 322], [448, 308]].map(([x, y]) => circle(x, y, 5, { fill: "#C9B48A", sw: 0 })),
      // brossette retirée
      rect(560, 170, 40, 250, { rx: 16, fill: C.white }), rect(552, 180, 56, 70, { rx: 12, fill: "#BFE0F7", stroke: C.waterLine, sw: 4 }), arrow(560, 330, 470, 290, { sw: 5, head: 14 })
    ],
    r: [["Brossette (retirée)", 580, 300], ["Axe métallique", 450, 270], ["Dépôts sous la brossette", 449, 314], ["Manche", 450, 520]]
  },

  "detartrer-sterilisateur-biberons": {
    d: [
      path("M280 260 L640 260 L620 440 L300 440 Z", { fill: "#F4F8FC" }), rect(260, 440, 400, 110, { rx: 24, fill: C.mid }),
      // plaque chauffante entartrée au fond de la cuve
      ellipse(460, 425, 90, 16, { fill: C.dark, sw: 3 }), ...[[420, 422], [450, 428], [490, 420], [470, 430]].map(([x, y]) => circle(x, y, 5, { fill: C.white, sw: 0 })),
      // paniers et biberons
      rect(320, 200, 280, 20, { rx: 6, fill: C.steel, sw: 4 }), ...[350, 430, 510].map(x => rect(x, 220, 50, 150, { rx: 16, fill: C.white, sw: 4 }))
    ],
    r: [["Panier", 460, 210], ["Cuve", 600, 330], ["Plaque chauffante (tartre)", 460, 425], ["Base", 460, 500]]
  },

  "nettoyer-ventilateur": {
    d: [
      line(450, 500, 450, 590, { sw: 14 }), rect(370, 585, 160, 22, { rx: 10, fill: C.mid }),
      circle(455, 320, 170, { fill: "none", stroke: C.steel, sw: 10 }),
      // pales et écrou de l'hélice
      ...[0, 120, 240].map(a => { const r = a * Math.PI / 180; return ellipse(450 + 80 * Math.cos(r), 330 + 80 * Math.sin(r), 70, 34, { fill: "#C9DDF2", stroke: C.waterLine, sw: 4 }); }),
      circle(450, 330, 26, { fill: C.dark, sw: 4 }),
      // grille avant tenue par des clips
      circle(450, 330, 170, { fill: "none", sw: 8 }), ...Array.from({ length: 12 }, (_, i) => { const a = i * 30 * Math.PI / 180; return line(450 + 30 * Math.cos(a), 330 + 30 * Math.sin(a), 450 + 166 * Math.cos(a), 330 + 166 * Math.sin(a), { sw: 2 }); }),
      ...[0, 90, 180, 270].map(a => { const r = a * Math.PI / 180; return rect(450 + 170 * Math.cos(r) - 11, 330 + 170 * Math.sin(r) - 11, 22, 22, { rx: 4, fill: C.amber, stroke: C.amberLine, sw: 3 }); })
    ],
    r: [["Grille avant", 330, 220], ["Clip de la grille", 620, 330], ["Pale", 530, 330], ["Écrou de l'hélice", 450, 330]]
  },

  "filtres-purificateur-air": {
    d: [
      rect(250, 160, 180, 440, { rx: 26 }), grid(270, 180, 140, 60, 12, { stroke: C.steel, sw: 2 }),
      // trois filtres sortis
      rect(455, 220, 60, 320, { rx: 6, fill: C.white, sw: 4 }), grid(455, 220, 60, 320, 12, { stroke: C.steel, sw: 2 }),
      rect(535, 220, 60, 320, { rx: 6, fill: C.white, sw: 4 }), path("M540 230 " + Array.from({ length: 15 }, (_, i) => `L${i % 2 ? 590 : 540} ${240 + i * 20}`).join(" "), { fill: "none", sw: 2 }),
      rect(615, 220, 60, 320, { rx: 6, fill: C.dark }), ...Array.from({ length: 18 }, (_, i) => circle(630 + (i % 3) * 15, 240 + Math.floor(i / 3) * 50, 4, { fill: "#6B7583", sw: 0 })),
      // sens de l'air : entrée en bas, sortie en haut
      arrow(230, 560, 280, 560, { sw: 5, head: 14 }), arrow(340, 160, 340, 120, { sw: 5, head: 14 })
    ],
    r: [["Sortie d'air", 340, 140], ["Préfiltre", 485, 300], ["Filtre HEPA", 565, 380], ["Filtre à charbon", 645, 460], ["Entrée d'air", 255, 560]]
  },

  "detartrer-nettoyeur-vapeur": {
    d: [
      rect(280, 300, 330, 210, { rx: 70, fill: C.light }), rect(320, 330, 250, 150, { rx: 50, fill: "none", stroke: C.ink, sw: 4, "stroke-dasharray": "10 8" }),
      rect(300, 380, 50, 90, { rx: 10, fill: C.water, stroke: C.waterLine, sw: 4 }),
      rect(420, 265, 60, 40, { rx: 10, fill: C.amber, stroke: C.amberLine, sw: 5 }),
      circle(320, 520, 24, { fill: C.dark }), circle(570, 520, 24, { fill: C.dark }),
      path("M610 400 C680 400 680 250 640 200", { fill: "none", stroke: C.dark, sw: 12 })
    ],
    r: [["Bouchon de sécurité (à froid)", 450, 285], ["Chaudière", 470, 420], ["Niveau d'eau", 325, 425], ["Flexible", 668, 320]]
  },

  "housse-table-a-repasser": {
    d: [
      // plateau vu de dessus
      path("M240 300 Q240 210 340 205 L690 205 L690 395 L340 395 Q240 390 240 300 Z", { fill: "#DCE9F7", stroke: C.waterLine }),
      // coupe : housse, mousse, plateau, cordon sous le plateau
      path("M250 470 L690 470", { stroke: C.waterLine, sw: 8, fill: "none" }), rect(260, 478, 420, 22, { fill: "#F3E3C0", stroke: C.amberLine, sw: 3 }),
      rect(260, 504, 420, 14, { fill: C.steel, sw: 3 }), path("M250 470 Q238 500 262 530 L678 530 Q702 500 690 470", { fill: "none", stroke: C.waterLine, sw: 6 }),
      path("M300 534 L640 534", { stroke: C.ink, sw: 4, fill: "none", "stroke-dasharray": "10 6" }), rect(450, 528, 30, 18, { rx: 6, fill: C.dark, sw: 0 })
    ],
    r: [["Housse", 470, 300], ["Mousse", 560, 489], ["Plateau", 380, 511], ["Cordon de serrage (sous le plateau)", 465, 537]]
  },

  "entretien-cireuse": {
    d: [
      circle(400, 360, 170, { fill: C.mid }),
      ...[[400, 270], [320, 410], [480, 410]].map(([x, y]) => circle(x, y, 62, { fill: C.dark }) + Array.from({ length: 16 }, (_, i) => { const a = i * 22.5 * Math.PI / 180; return line(x + 20 * Math.cos(a), y + 20 * Math.sin(a), x + 56 * Math.cos(a), y + 56 * Math.sin(a), { stroke: "#6B7583", sw: 3 }); }).join("") + circle(x, y, 14, { fill: C.steel, sw: 3 })),
      // feutre de lustrage, à fixer sur un disque
      circle(620, 540, 62, { fill: "#F3E3C0", stroke: C.amberLine, sw: 5 }), circle(620, 540, 14, { fill: C.white, sw: 3 }), arrow(580, 495, 530, 450, { sw: 5, head: 14 })
    ],
    r: [["Brosse (ou disque)", 400, 240], ["Fixation centrale", 480, 410], ["Feutre de lustrage", 640, 560]]
  },

  "entretien-deshumidificateur": {
    d: [
      rect(300, 150, 300, 450, { rx: 30 }),
      // préfiltre (sorti en partie) sur la grille d'entrée
      rect(330, 190, 240, 130, { rx: 8, fill: C.white, sw: 4 }), grid(330, 190, 240, 130, 12, { stroke: C.steel, sw: 2 }), arrow(450, 185, 450, 150, { sw: 5, head: 14, color: C.ink }),
      // réservoir et son flotteur
      rect(320, 440, 260, 140, { rx: 10, fill: C.light, sw: 5 }), rect(326, 500, 248, 74, { fill: C.water, stroke: "none", sw: 0 }),
      circle(400, 500, 18, { fill: C.amber, stroke: C.amberLine, sw: 4 }), line(400, 482, 400, 450, { sw: 4 }),
      // sortie de vidange continue
      rect(600, 520, 30, 20, { fill: C.mid, sw: 4 }), path("M630 530 C680 530 690 580 690 610", { fill: "none", stroke: C.waterLine, sw: 10 })
    ],
    r: [["Préfiltre", 450, 255], ["Réservoir d'eau", 520, 540], ["Flotteur", 400, 500], ["Sortie de vidange continue", 615, 530]]
  }
};
