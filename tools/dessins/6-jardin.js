/* Schémas redessinés — Jardin & Extérieur. Chaque repère [libellé, x, y] est posé sur la pièce qu'il nomme. */
const { plus, minus, C, rect, circle, ellipse, path, poly, line, text, arrow, turn, forbid, check, screw, drop } = require("./lib.js");

const grid = (x, y, w, h, step = 18, o = {}) => Array.from({ length: Math.floor(w / step) - 1 }, (_, i) => line(x + step * (i + 1), y + 4, x + step * (i + 1), y + h - 4, { stroke: o.stroke || C.steel, sw: o.sw || 3 })).join("") +
  Array.from({ length: Math.floor(h / step) - 1 }, (_, i) => line(x + 4, y + step * (i + 1), x + w - 4, y + step * (i + 1), { stroke: o.stroke || C.steel, sw: o.sw || 3 })).join("");
const hex = (x, y, r, o = {}) => poly(Array.from({ length: 6 }, (_, i) => `${(x + r * Math.cos(i * Math.PI / 3)).toFixed(1)},${(y + r * Math.sin(i * Math.PI / 3)).toFixed(1)}`).join(" "), { fill: o.fill || C.steel, sw: o.sw || 4 });
const pipe = (d, w = 22) => path(d, { fill: "none", stroke: C.ink, sw: w + 8 }) + path(d, { fill: "none", stroke: C.steel, sw: w });
const HOSE = "#3E9B5A";
const plug = (x, y) => rect(x, y, 30, 40, { rx: 6, fill: C.white, sw: 4 }) + line(x + 15, y + 40, x + 15, y + 58, { stroke: C.steel, sw: 8 });

module.exports = {
  "fil-coupe-bordure": {
    d: [
      // tête ouverte : boîtier, bobine (flèche gravée), fil, œillets
      circle(420, 380, 160, { fill: C.mid }), circle(260, 380, 14, { fill: C.dark, stroke: C.steel, sw: 4 }), circle(580, 380, 14, { fill: C.dark, stroke: C.steel, sw: 4 }),
      circle(420, 380, 100, { fill: C.light }), ...[92, 84, 76].map(r => circle(420, 380, r, { fill: "none", stroke: HOSE, sw: 6 })), circle(420, 380, 30, { fill: C.steel, sw: 4 }),
      turn(420, 380, 54, 200, 320, { sw: 5 }),
      path("M505 335 L578 372 M335 425 L262 388", { fill: "none", stroke: HOSE, sw: 6 }),
      // couvercle retiré
      circle(640, 220, 60, { fill: C.light }), circle(640, 220, 18, { fill: C.mid, sw: 3 })
    ],
    r: [["Couvercle (retiré)", 640, 180], ["Bobine", 420, 412], ["Flèche : sens d'enroulement", 400, 330], ["Fil", 540, 352], ["Œillet de sortie", 580, 380]]
  },

  "affuter-secateur": {
    d: [
      // poignées et ressort
      path("M420 330 L250 560 L290 580 L440 350 Z", { fill: C.red, stroke: "#8E2323", sw: 4 }), path("M440 340 L340 600 L385 605 L460 350 Z", { fill: C.red, stroke: "#8E2323", sw: 4 }),
      path("M360 450 l16 -12 l4 20 l16 -12 l4 20 l16 -12", { fill: "none", stroke: C.ink, sw: 4 }),
      // contre-lame (crochet plat) et lame coupante avec son biseau
      path("M430 340 Q520 300 600 330 Q560 360 470 370 Z", { fill: C.mid }),
      path("M430 330 Q480 230 610 170 Q560 260 450 345 Z", { fill: C.steel }), path("M450 335 Q540 260 604 178 L596 190 Q540 270 458 342 Z", { fill: "#E6EEF7", stroke: C.amberLine, sw: 3 }),
      circle(440, 335, 16, { fill: C.dark, sw: 3 }),
      // pierre posée à plat sur le biseau, poussée de la base vers la pointe
      path("M500 210 L560 160 L585 185 L525 235 Z", { fill: "#7D8794", sw: 4 }), arrow(470, 250, 580, 150, { sw: 4, head: 12 })
    ],
    r: [["Pierre à affûter", 542, 198], ["Lame coupante", 500, 270], ["Biseau : seul côté à affûter", 560, 228], ["Contre-lame (ne pas affûter)", 540, 340], ["Axe", 440, 335], ["Ressort", 385, 444]]
  },

  "tuyau-arrosage-perce": {
    d: [
      // tuyau coupé de part et d'autre de la fuite, raccord réparateur
      line(220, 330, 390, 330, { stroke: HOSE, sw: 34 }), line(510, 330, 700, 330, { stroke: HOSE, sw: 34 }),
      rect(380, 300, 140, 60, { rx: 12, fill: C.amber, stroke: C.amberLine, sw: 4 }), rect(370, 296, 36, 68, { rx: 8, fill: "#E3A13F", stroke: C.amberLine, sw: 4 }), rect(494, 296, 36, 68, { rx: 8, fill: "#E3A13F", stroke: C.amberLine, sw: 4 }),
      // partie abîmée retirée
      line(380, 470, 520, 470, { stroke: HOSE, sw: 34 }), circle(450, 470, 7, { fill: C.dark, sw: 0 }), drop(445, 505, 0.6), drop(462, 520, 0.5),
      arrow(450, 440, 450, 380, { sw: 4, head: 12, color: C.ink })
    ],
    r: [["Tuyau", 280, 330], ["Écrou de serrage", 388, 330], ["Raccord réparateur", 450, 330], ["Partie percée, coupée", 450, 470]]
  },

  "affuter-lame-tondeuse": {
    d: [
      // tondeuse basculée, carter vu de dessous
      circle(440, 370, 190, { fill: C.mid }), circle(440, 370, 160, { fill: "#C3CBD5", sw: 3 }),
      poly("290,330 590,390 586,412 286,352", { fill: C.steel, sw: 5 }), hex(440, 371, 22, { fill: C.dark }),
      // cale en bois qui bloque la lame
      poly("596,380 640,360 646,400 600,412", { fill: "#C8A26B", stroke: C.amberLine, sw: 4 }),
      // bougie débranchée
      rect(230, 170, 30, 50, { rx: 6, fill: C.white, sw: 4 }), path("M290 175 C320 175 320 230 300 250", { fill: "none", stroke: C.dark, sw: 6 }), rect(280, 160, 24, 30, { rx: 6, fill: C.dark, sw: 0 })
    ],
    r: [["Capuchon de bougie débranché", 292, 175], ["Lame", 360, 343], ["Écrou central", 440, 371], ["Cale en bois", 620, 390], ["Carter", 440, 540]]
  },

  "entretien-robot-tondeuse": {
    d: [
      ellipse(440, 370, 230, 170, { fill: C.light }),
      // disque porte-lames et petites lames pivotantes
      circle(440, 390, 80, { fill: C.mid }), ...[0, 120, 240].map(a => { const r = a * Math.PI / 180, x = 440 + 70 * Math.cos(r), y = 390 + 70 * Math.sin(r); return rect(x - 16, y - 7, 32, 14, { rx: 3, fill: C.amber, stroke: C.amberLine, sw: 3 }); }), screw(440, 390, 12),
      // roues motrices, roulette avant, contacts de charge
      rect(220, 300, 46, 120, { rx: 16, fill: C.dark }), rect(614, 300, 46, 120, { rx: 16, fill: C.dark }), circle(440, 225, 18, { fill: C.dark }),
      rect(390, 520, 30, 12, { fill: C.steel, sw: 2 }), rect(460, 520, 30, 12, { fill: C.steel, sw: 2 })
    ],
    r: [["Roulette avant", 440, 225], ["Disque porte-lames", 440, 350], ["Petite lame pivotante", 510, 390], ["Roue motrice", 637, 360], ["Contacts de charge", 405, 526]]
  },

  "hivernage-nettoyeur-haute-pression": {
    d: [
      rect(280, 260, 230, 250, { rx: 30, fill: C.light }), rect(320, 400, 150, 80, { rx: 10, fill: C.mid, sw: 4, "stroke-dasharray": "10 6" }),
      circle(320, 525, 30, { fill: C.dark }), circle(480, 525, 30, { fill: C.dark }),
      // arrivée d'eau et son filtre (vidange avant le gel)
      rect(240, 430, 44, 30, { rx: 6, fill: C.amber, stroke: C.amberLine, sw: 4 }), grid(244, 434, 36, 22, 8, { stroke: C.amberLine, sw: 1 }), drop(250, 485, 0.6), drop(270, 500, 0.5),
      // flexible haute pression et pistolet
      path("M510 450 C600 450 560 300 640 280", { fill: "none", stroke: C.dark, sw: 9 }), path("M630 270 L690 260 L700 300 L660 310 L650 350 L630 350 Z", { fill: C.amber, stroke: C.amberLine, sw: 4 }), line(690, 268, 720, 200, { stroke: C.ink, sw: 8 })
    ],
    r: [["Arrivée d'eau et son filtre : vider avant le gel", 262, 445], ["Pompe", 395, 440], ["Flexible haute pression", 580, 380], ["Pistolet", 660, 300]]
  },

  "entretien-taille-haie": {
    d: [
      rect(220, 330, 140, 90, { rx: 28, fill: C.amber, stroke: C.amberLine, sw: 5 }),
      // lamier : deux lames dentées superposées
      rect(360, 352, 330, 46, { rx: 8, fill: C.steel }), ...Array.from({ length: 11 }, (_, i) => poly(`${372 + i * 30},352 ${387 + i * 30},330 ${402 + i * 30},352`, { fill: C.steel, sw: 3 }) + poly(`${372 + i * 30},398 ${387 + i * 30},420 ${402 + i * 30},398`, { fill: C.steel, sw: 3 })),
      line(370, 375, 680, 375, { stroke: "#98A4B2", sw: 4 }),
      // fourreau (protège-lame), brosse et huile
      rect(520, 470, 180, 70, { rx: 12, fill: C.dark }),
      path("M300 470 L330 450 L346 492 L318 500 Z", { fill: C.amber, stroke: C.amberLine, sw: 4 }), drop(450, 360, 0.6, { fill: C.amber, stroke: C.amberLine })
    ],
    r: [["Lames dentées", 500, 340], ["Zone à huiler (entre les lames)", 450, 375], ["Fourreau (protège-lame)", 610, 505], ["Brosse", 322, 476]]
  },

  "entretien-souffleur-feuilles": {
    d: [
      rect(280, 300, 240, 200, { rx: 26, fill: C.light }), path("M520 380 L700 340 L700 380 L520 420 Z", { fill: C.mid }),
      // capot du filtre à air (ouvert) et filtre
      rect(230, 320, 50, 120, { rx: 10, fill: C.mid, sw: 4 }), rect(190, 330, 34, 100, { rx: 6, fill: C.white, sw: 4 }), grid(190, 330, 34, 100, 10, { stroke: C.steel, sw: 2 }),
      // bougie, réservoir
      rect(400, 270, 26, 34, { rx: 4, fill: C.white, sw: 4 }), rect(398, 250, 30, 22, { rx: 6, fill: C.dark, sw: 0 }),
      rect(300, 440, 200, 60, { rx: 10, fill: "#F6E7B8", stroke: C.amberLine, sw: 4 })
    ],
    r: [["Filtre à air", 207, 380], ["Capot du filtre", 255, 330], ["Bougie", 413, 280], ["Réservoir (mélange frais)", 400, 470], ["Tube de soufflage", 620, 365]]
  },

  "entretien-motobineuse": {
    d: [
      line(500, 300, 680, 160, { stroke: C.ink, sw: 12 }), line(520, 320, 700, 190, { stroke: C.ink, sw: 12 }),
      rect(320, 240, 200, 150, { rx: 20, fill: C.light }), rect(260, 260, 60, 100, { rx: 12, fill: C.mid, sw: 4 }),
      // bouchon de remplissage et jauge, bouchon de vidange
      rect(450, 216, 34, 28, { rx: 6, fill: C.amber, stroke: C.amberLine, sw: 4 }), rect(330, 384, 26, 18, { rx: 4, fill: C.dark, sw: 0 }),
      // fraises
      line(300, 470, 560, 470, { stroke: C.ink, sw: 10 }), ...[330, 430, 530].map(x => [0, 60, 120].map(a => { const r = a * Math.PI / 180; return line(x - 50 * Math.cos(r), 470 - 50 * Math.sin(r), x + 50 * Math.cos(r), 470 + 50 * Math.sin(r), { stroke: C.steel, sw: 8 }); }).join(""))
    ],
    r: [["Bouchon de remplissage et jauge", 467, 230], ["Filtre à air", 290, 310], ["Bouchon de vidange", 343, 393], ["Fraises", 530, 470]]
  },

  "amorcer-pompe-surface": {
    d: [
      // pompe : corps, bouchon de remplissage, moteur
      rect(300, 280, 140, 130, { rx: 20, fill: C.light }), rect(440, 290, 200, 110, { rx: 30, fill: C.mid }), ...[470, 500, 530, 560, 590].map(x => line(x, 300, x, 390, { stroke: C.steel, sw: 3 })),
      rect(350, 252, 40, 30, { rx: 6, fill: C.amber, stroke: C.amberLine, sw: 4 }),
      // refoulement, aspiration avec clapet et crépine dans l'eau
      pipe("M370 280 L370 230 L300 230 L300 160", 16), pipe("M300 360 L240 360 L240 560", 16),
      rect(224, 556, 32, 40, { rx: 6, fill: C.dark, sw: 3 }), rect(190, 520, 140, 90, { fill: C.water, stroke: "none", sw: 0, "fill-opacity": ".7" })
    ],
    r: [["Refoulement", 300, 180], ["Bouchon de remplissage", 370, 262], ["Corps de pompe", 370, 345], ["Moteur", 560, 345], ["Tuyau d'aspiration", 240, 460], ["Clapet et crépine", 240, 576]]
  },

  "entretien-eau-piscine": {
    d: [
      // bassin en coupe : skimmer, refoulement
      path("M220 230 L220 420 Q220 470 270 470 L520 470 Q560 470 560 420 L560 230", { fill: C.water, stroke: C.ink, sw: 6 }), rect(226, 230, 328, 30, { fill: C.white, stroke: "none", sw: 0 }),
      rect(214, 250, 46, 50, { rx: 6, fill: C.mid, sw: 4 }), grid(220, 262, 34, 30, 9, { stroke: C.ink, sw: 1 }), circle(560, 380, 12, { fill: C.dark, sw: 3 }),
      // local technique : pompe et préfiltre, filtre
      pipe("M240 300 L240 540 L420 540", 12), rect(420, 510, 90, 60, { rx: 14, fill: C.mid }), rect(430, 488, 50, 26, { rx: 6, fill: C.white, sw: 4 }),
      rect(560, 470, 90, 130, { rx: 40, fill: C.light }), pipe("M510 540 L560 540", 12), pipe("M605 470 L605 380 L572 380", 12),
      // trousse d'analyse
      rect(600, 170, 100, 80, { rx: 10, fill: C.white, sw: 4 }), rect(615, 185, 16, 50, { rx: 6, fill: "#F2D24B", stroke: C.ink, sw: 2 }), rect(642, 185, 16, 50, { rx: 6, fill: "#E05BA8", stroke: C.ink, sw: 2 })
    ],
    r: [["Trousse d'analyse (pH 7,2 à 7,6 ; chlore)", 650, 200], ["Skimmer et son panier", 237, 275], ["Refoulement", 560, 380], ["Pompe et préfiltre", 455, 520], ["Filtre", 605, 535]]
  }
};
