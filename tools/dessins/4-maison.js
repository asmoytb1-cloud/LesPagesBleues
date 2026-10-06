/* Schémas redessinés — Maison & Bricolage. Chaque repère [libellé, x, y] est posé sur la pièce qu'il nomme. */
const { plus, minus, C, rect, circle, ellipse, path, poly, line, text, arrow, turn, forbid, check, screw, drop } = require("./lib.js");

const grid = (x, y, w, h, step = 18, o = {}) => Array.from({ length: Math.floor(w / step) - 1 }, (_, i) => line(x + step * (i + 1), y + 4, x + step * (i + 1), y + h - 4, { stroke: o.stroke || C.steel, sw: o.sw || 3 })).join("") +
  Array.from({ length: Math.floor(h / step) - 1 }, (_, i) => line(x + 4, y + step * (i + 1), x + w - 4, y + step * (i + 1), { stroke: o.stroke || C.steel, sw: o.sw || 3 })).join("");
const slats = (x, y, w, h, n = 6, o = {}) => Array.from({ length: n }, (_, i) => line(x + 10, y + (h / (n + 1)) * (i + 1), x + w - 10, y + (h / (n + 1)) * (i + 1), { stroke: o.stroke || C.ink, sw: o.sw || 4 })).join("");
const hex = (x, y, r, o = {}) => poly(Array.from({ length: 6 }, (_, i) => `${(x + r * Math.cos(i * Math.PI / 3)).toFixed(1)},${(y + r * Math.sin(i * Math.PI / 3)).toFixed(1)}`).join(" "), { fill: o.fill || C.steel, sw: o.sw || 4 });
const pipe = (d, w = 22) => path(d, { fill: "none", stroke: C.ink, sw: w + 8 }) + path(d, { fill: "none", stroke: C.steel, sw: w });
const BROWN = "#8A5A1E", BLUEW = "#2B6DE0";

module.exports = {
  "detartrer-pommeau-douche": {
    d: [
      pipe("M680 160 L540 250", 18), hex(530, 258, 22),
      circle(420, 350, 110, { fill: C.steel }), circle(420, 350, 92, { fill: C.mid, sw: 4 }),
      ...Array.from({ length: 19 }, (_, i) => { const a = i * 2.4, r = 12 + 4.2 * i; return circle(420 + r * Math.cos(a), 350 + r * Math.sin(a), 6, { fill: i % 4 === 0 ? C.white : C.dark, stroke: i % 4 === 0 ? C.ink : "none", sw: 2 }); }),
      // sachet de vinaigre tenu par un élastique
      path("M300 250 Q260 380 320 480 Q420 540 520 470 Q560 380 510 262 Z", { fill: C.water, stroke: C.waterLine, sw: 4, "fill-opacity": ".45" }),
      rect(495, 246, 30, 16, { rx: 6, fill: C.amber, stroke: C.amberLine, sw: 3 })
    ],
    r: [["Raccord à dévisser", 530, 258], ["Élastique", 510, 254], ["Buses entartrées", 452, 330], ["Sachet de vinaigre blanc", 360, 480]]
  },

  "regler-porte-placard": {
    d: [
      rect(220, 190, 60, 380, { fill: C.light }), circle(320, 380, 50, { fill: C.mid }), circle(320, 380, 34, { fill: C.steel, sw: 4 }),
      rect(350, 350, 230, 60, { rx: 10, fill: C.steel }), rect(520, 300, 110, 160, { rx: 10, fill: C.mid }),
      rect(560, 318, 20, 34, { rx: 8, fill: C.white, sw: 3 }), rect(560, 408, 20, 34, { rx: 8, fill: C.white, sw: 3 }),
      screw(420, 380, 13), screw(500, 380, 13), screw(570, 335, 9), screw(570, 425, 9),
      // flèches : côté, profondeur, hauteur
      arrow(380, 320, 330, 320, { sw: 4, head: 12 }), arrow(460, 320, 510, 320, { sw: 4, head: 12 }),
      arrow(500, 450, 470, 500, { sw: 4, head: 12 }), arrow(650, 380, 650, 320, { sw: 4, head: 12 }), arrow(650, 390, 650, 450, { sw: 4, head: 12 })
    ],
    r: [["Cuvette (dans la porte)", 320, 380], ["Vis de réglage latéral", 420, 380], ["Vis de réglage de profondeur", 500, 380], ["Vis de hauteur (embase)", 570, 425]]
  },

  "deboucher-toilettes": {
    d: [
      // cuvette en coupe, eau, siphon et bouchon
      path("M250 220 L640 220 L600 360 Q560 440 470 450 L430 450 Q330 440 290 360 Z", { fill: C.light }),
      path("M318 360 L572 360 Q545 430 470 438 L430 438 Q350 430 318 360 Z", { fill: C.water, stroke: "none", sw: 0 }),
      pipe("M450 450 L450 520 Q450 560 500 560 L520 560 Q560 560 560 520 L560 480 Q560 450 600 450 L680 450", 34),
      ellipse(560, 500, 22, 28, { fill: C.amber, stroke: C.amberLine, sw: 4 }),
      // ventouse à collerette
      line(450, 130, 450, 380, { stroke: C.amberLine, sw: 12 }), path("M390 400 Q450 340 510 400 Z", { fill: C.red, stroke: "#8E2323", sw: 4 }), rect(432, 398, 36, 40, { rx: 6, fill: C.red, stroke: "#8E2323", sw: 4 })
    ],
    r: [["Ventouse à collerette", 450, 410], ["Niveau d'eau", 340, 365], ["Siphon", 500, 560], ["Bouchon", 560, 500], ["Cuvette", 600, 260]]
  },

  "robinet-qui-fuit": {
    d: [
      // pièces démontées, de haut en bas : cache, vis, poignée, écrou, cartouche et joint, corps
      circle(430, 160, 16, { fill: C.red, stroke: "#8E2323", sw: 4 }), rect(422, 182, 16, 24, { fill: C.steel, sw: 3 }),
      rect(370, 210, 120, 36, { rx: 14, fill: C.light }),
      hex(430, 285, 34),
      rect(405, 315, 50, 80, { rx: 10, fill: C.amber, stroke: C.amberLine, sw: 4 }), ellipse(430, 402, 28, 8, { fill: C.dark, sw: 2 }),
      rect(370, 420, 120, 80, { rx: 16, fill: C.steel }), path("M490 440 Q620 430 630 500", { fill: "none", stroke: C.ink, sw: 30 }), path("M490 440 Q620 430 630 500", { fill: "none", stroke: C.steel, sw: 22 }),
      line(230, 515, 690, 515, { sw: 8 }),
      // robinet d'arrêt sous l'évier
      pipe("M430 520 L430 610", 16), rect(408, 560, 44, 30, { rx: 6, fill: C.mid, sw: 4 }), line(452, 575, 500, 575, { stroke: C.blue, sw: 10 })
    ],
    r: [["Cache et vis de poignée", 430, 170], ["Poignée", 470, 228], ["Écrou", 430, 285], ["Cartouche (ou tête à clapet)", 430, 350], ["Joint", 450, 402], ["Robinet d'arrêt (fermé)", 476, 575]]
  },

  "chasse-eau-coule": {
    d: [
      rect(250, 180, 420, 390, { rx: 14, fill: C.white }), rect(256, 330, 408, 234, { fill: C.water, stroke: "none", sw: 0 }), line(256, 330, 664, 330, { stroke: C.waterLine, sw: 4 }),
      // arrivée d'eau et robinet flotteur
      pipe("M300 610 L300 250", 14), rect(282, 236, 40, 30, { rx: 6, fill: C.mid, sw: 4 }), line(322, 250, 380, 290, { sw: 5 }), rect(370, 290, 40, 40, { rx: 10, fill: C.amber, stroke: C.amberLine, sw: 4 }),
      // mécanisme de chasse : trop-plein (tube central), joint plat du clapet
      rect(500, 230, 70, 300, { rx: 10, fill: "none", stroke: C.ink, sw: 5 }), line(535, 300, 535, 530, { stroke: C.steel, sw: 18 }), line(535, 300, 535, 530, { stroke: C.ink, sw: 2 }),
      rect(495, 535, 80, 14, { rx: 6, fill: C.amber, stroke: C.amberLine, sw: 3 }),
      // repère : niveau 2 cm sous le haut du trop-plein
      line(600, 300, 640, 300, { stroke: C.blue, sw: 3 }), arrow(620, 312, 620, 300, { sw: 3, head: 10 }), arrow(620, 318, 620, 330, { sw: 3, head: 10 }), text(648, 322, "2 cm", { size: 18, anchor: "start" })
    ],
    r: [["Arrivée d'eau", 300, 590], ["Robinet flotteur", 302, 251], ["Flotteur", 390, 310], ["Haut du trop-plein (tube central)", 535, 302], ["Niveau d'eau : 2 cm sous le trop-plein", 450, 330], ["Joint plat du clapet", 535, 542]]
  },

  "evier-bouche": {
    d: [
      path("M230 200 L330 200 L340 320 L560 320 L570 200 L690 200", { fill: "none", sw: 10 }),
      // bonde, siphon démontable et ses écrous
      rect(430, 318, 40, 20, { fill: C.steel, sw: 4 }), pipe("M450 340 L450 420 Q450 470 500 470 Q550 470 550 420 L550 400 L650 400", 24),
      hex(450, 380, 20), hex(550, 412, 20), hex(620, 400, 18),
      // seau dessous
      path("M390 520 L610 520 L595 610 L405 610 Z", { fill: C.mid }),
      // ventouse au-dessus
      line(450, 150, 450, 270, { stroke: C.amberLine, sw: 10 }), path("M410 300 Q450 250 490 300 Z", { fill: C.red, stroke: "#8E2323", sw: 4 })
    ],
    r: [["Ventouse", 450, 285], ["Bonde", 450, 328], ["Écrous du siphon", 450, 380], ["Siphon démontable", 500, 470], ["Seau", 500, 570]]
  },

  "trou-placo": {
    d: [
      // plaque de plâtre en coupe, trou, renfort derrière
      rect(240, 300, 180, 40, { fill: "#F2EEE6" }), rect(500, 300, 180, 40, { fill: "#F2EEE6" }),
      rect(370, 344, 180, 22, { fill: "#D8C7A5", stroke: C.amberLine, sw: 4 }), screw(395, 355, 7), screw(525, 355, 7),
      // enduit (plusieurs couches), bande, ponçage
      rect(420, 300, 80, 40, { fill: "#E2E7EE", stroke: C.ink, sw: 3, "stroke-dasharray": "6 5" }),
      path("M360 300 Q460 284 560 300", { fill: "#E2E7EE", stroke: C.ink, sw: 3 }), line(380, 296, 540, 296, { stroke: C.blue, sw: 3, "stroke-dasharray": "10 6" }),
      rect(410, 200, 100, 40, { rx: 8, fill: C.amber, stroke: C.amberLine, sw: 4 }), arrow(470, 180, 520, 180, { sw: 4, head: 12 }), arrow(450, 180, 400, 180, { sw: 4, head: 12 })
    ],
    r: [["Cale à poncer", 460, 220], ["Bande", 520, 296], ["Enduit (en plusieurs couches)", 460, 320], ["Plaque de plâtre", 300, 320], ["Renfort derrière le trou", 460, 355]]
  },

  "remplacer-prise-electrique": {
    d: [
      // mécanisme vu de dos et ses bornes
      rect(320, 220, 260, 240, { rx: 18, fill: C.light }), screw(345, 340, 12), screw(555, 340, 12),
      rect(370, 400, 40, 34, { rx: 6, fill: C.steel, sw: 4 }), rect(490, 400, 40, 34, { rx: 6, fill: C.steel, sw: 4 }), rect(430, 240, 40, 34, { rx: 6, fill: C.steel, sw: 4 }),
      path("M390 434 C390 520 300 540 260 600", { fill: "none", stroke: BROWN, sw: 8 }), path("M510 434 C510 520 600 540 640 600", { fill: "none", stroke: BLUEW, sw: 8 }),
      path("M450 240 C450 180 600 170 680 160", { fill: "none", stroke: "#3E9B5A", sw: 8 }), path("M450 240 C450 180 600 170 680 160", { fill: "none", stroke: "#F2D24B", sw: 8, "stroke-dasharray": "12 12" }),
      // disjoncteur coupé
      rect(230, 170, 60, 100, { rx: 8, fill: C.white, sw: 4 }), rect(250, 220, 20, 34, { rx: 4, fill: C.dark, sw: 0 }), arrow(260, 190, 260, 214, { sw: 3, head: 10, color: C.red })
    ],
    r: [["Disjoncteur coupé", 260, 237], ["Borne de terre (fil vert-jaune)", 450, 257], ["Vis de fixation", 555, 340], ["Borne de phase (fil rouge ou marron)", 390, 417], ["Borne de neutre (fil bleu)", 510, 417]]
  },

  "refaire-joint-silicone": {
    d: [
      // carrelage (mur) et rebord de la baignoire, en coupe
      rect(230, 150, 150, 300, { fill: C.light }), ...[200, 260, 320, 380].map(y => line(232, y, 378, y, { stroke: C.steel, sw: 4 })),
      rect(380, 430, 320, 90, { fill: C.white }), path("M380 520 L700 520", { stroke: C.ink, sw: 6, fill: "none" }),
      // ruban de masquage de part et d'autre, cordon de silicone dans l'angle
      rect(380, 340, 10, 60, { fill: C.amber, stroke: C.amberLine, sw: 2 }), rect(420, 420, 70, 10, { fill: C.amber, stroke: C.amberLine, sw: 2 }),
      path("M380 395 Q392 424 418 430 L380 430 Z", { fill: "#E6EBF0", stroke: C.ink, sw: 3 }),
      // lisseur
      path("M520 250 L430 390 L452 402 L540 262 Z", { fill: C.blue, stroke: "#174BAA", sw: 3 })
    ],
    r: [["Carrelage", 300, 230], ["Ruban de masquage", 385, 360], ["Cordon de silicone", 392, 422], ["Lisseur (ou le doigt)", 480, 330], ["Rebord de la baignoire", 560, 475]]
  },

  "changer-flexible-douche": {
    d: [
      // mitigeur
      rect(230, 180, 300, 60, { rx: 28, fill: C.steel }), rect(250, 160, 40, 30, { fill: C.mid, sw: 4 }), rect(470, 160, 40, 30, { fill: C.mid, sw: 4 }),
      hex(380, 262, 22), ellipse(380, 300, 26, 7, { fill: C.dark, sw: 2 }),
      // flexible
      path("M380 320 C380 520 600 560 620 400 C630 330 620 300 600 290", { fill: "none", stroke: C.steel, sw: 16 }), path("M380 320 C380 520 600 560 620 400 C630 330 620 300 600 290", { fill: "none", stroke: C.ink, sw: 2, "stroke-dasharray": "4 6" }),
      // côté pommeau
      ellipse(600, 262, 26, 7, { fill: C.dark, sw: 2 }), hex(600, 236, 22), rect(585, 140, 30, 80, { rx: 12, fill: C.light }), circle(600, 140, 44, { fill: C.light })
    ],
    r: [["Écrou côté mitigeur", 380, 262], ["Joint plat", 380, 300], ["Flexible", 500, 520], ["Joint plat (côté pommeau)", 600, 262], ["Écrou côté pommeau", 600, 236]]
  },

  "groupe-securite-chauffe-eau": {
    d: [
      path("M250 150 L670 150 L670 210 Q460 270 250 210 Z", { fill: C.light }),
      pipe("M460 240 L460 300", 18),
      // groupe de sécurité : corps, robinet, soupape
      rect(430, 300, 60, 140, { rx: 10, fill: "#C9A24A", stroke: C.amberLine, sw: 4 }),
      line(490, 340, 560, 340, { stroke: C.blue, sw: 12 }), circle(490, 340, 10, { fill: C.dark, sw: 0 }),
      rect(395, 380, 40, 34, { rx: 8, fill: C.red, stroke: "#8E2323", sw: 4 }),
      pipe("M460 440 L460 610", 18), arrow(520, 600, 520, 520, { sw: 4, head: 12 }),
      // siphon d'évacuation (entonnoir)
      path("M330 450 L410 450 L380 490 L360 490 Z", { fill: C.light }), pipe("M370 490 L370 610", 12), line(420, 435, 390, 455, { stroke: C.waterLine, sw: 4 })
    ],
    r: [["Chauffe-eau", 460, 190], ["Robinet du groupe", 540, 340], ["Soupape (à manœuvrer)", 415, 397], ["Siphon d'évacuation", 370, 470], ["Arrivée d'eau froide", 460, 580]]
  },

  "nettoyer-bouches-vmc": {
    d: [
      line(220, 170, 700, 170, { sw: 8 }),
      // bouche d'extraction au plafond, grille démontée
      ellipse(330, 186, 80, 16, { fill: C.light }), ellipse(330, 186, 40, 8, { fill: C.mid, sw: 3 }),
      ellipse(330, 300, 80, 24, { fill: C.white }), ...[-50, -25, 0, 25, 50].map(dx => line(330 + dx, 286, 330 + dx, 314, { stroke: C.steel, sw: 3 })), ellipse(330, 300, 26, 9, { fill: C.mid, sw: 3 }),
      arrow(330, 270, 330, 214, { sw: 4, head: 12, color: C.ink }),
      // fenêtre et son entrée d'air
      rect(480, 300, 200, 260, { fill: "#DCEAF7", stroke: C.ink, sw: 6 }), line(580, 300, 580, 560, { sw: 5 }),
      rect(500, 268, 160, 26, { rx: 4, fill: C.mid, sw: 4 }), slats(500, 268, 160, 26, 2, { sw: 2 })
    ],
    r: [["Bouche d'extraction (plafond)", 330, 186], ["Réglage d'ouverture", 330, 300], ["Grille démontée", 380, 300], ["Entrée d'air (au-dessus de la fenêtre)", 580, 281], ["Fenêtre", 630, 450]]
  },

  "entretien-poele-granules": {
    d: [
      rect(320, 160, 300, 440, { rx: 20 }), rect(440, 150, 160, 24, { rx: 8, fill: C.mid, sw: 4 }),
      rect(350, 230, 240, 230, { rx: 10, fill: C.dark }),
      // creuset et ses trous d'air
      rect(410, 380, 120, 60, { rx: 8, fill: C.steel, sw: 4 }), ...[430, 455, 480, 505].map(x => circle(x, 410, 6, { fill: C.dark, sw: 0 })),
      // cendrier sorti
      path("M370 500 L570 500 L600 560 L340 560 Z", { fill: C.mid, sw: 4 }),
      // porte ouverte avec sa vitre
      path("M320 220 L230 250 L230 470 L320 470 Z", { fill: C.light }), path("M308 240 L242 262 L242 458 L308 458 Z", { fill: "#C9D6E3", sw: 3 })
    ],
    r: [["Trémie à granulés (couvercle)", 520, 162], ["Creuset (trous d'air)", 467, 410], ["Cendrier", 470, 530], ["Vitre de la porte", 275, 360]]
  },

  "entretien-perceuse-visseuse": {
    d: [
      // perceuse : corps, aérations, mandrin, poignée
      path("M260 240 L520 240 Q560 240 560 280 L560 300 Q560 340 520 340 L380 340 L420 520 L330 520 L300 340 Q260 340 260 300 Z", { fill: C.light }),
      ...[290, 310, 330].map(x => line(x, 260, x, 320, { sw: 5 })),
      rect(560, 262, 60, 56, { rx: 8, fill: C.steel }), rect(620, 278, 60, 24, { fill: C.dark, sw: 3 }),
      // batterie retirée, chargeur
      rect(300, 540, 140, 50, { rx: 10, fill: C.amber, stroke: C.amberLine, sw: 4 }), arrow(375, 535, 375, 525, { sw: 3, head: 10, color: C.ink }),
      rect(520, 520, 150, 70, { rx: 12, fill: C.mid }), circle(640, 545, 8, { fill: C.green, stroke: C.greenLine, sw: 2 })
    ],
    r: [["Aérations du moteur", 310, 290], ["Mandrin", 590, 290], ["Batterie (retirée)", 370, 565], ["Chargeur", 590, 560]]
  },

  "entretien-ponceuse": {
    d: [
      // plateau vu de dessous, abrasif posé à moitié, trous alignés
      rect(260, 200, 340, 260, { rx: 20, fill: C.dark }), ...[0, 1, 2].flatMap(r => [0, 1, 2].map(c => circle(330 + c * 100, 260 + r * 70, 10, { fill: "#14181D", stroke: C.steel, sw: 2 }))),
      rect(260, 200, 180, 260, { rx: 20, fill: "#E8D7B4", stroke: C.amberLine, sw: 4 }), ...[0, 1, 2].map(r => circle(330, 260 + r * 70, 10, { fill: "#14181D", stroke: C.amberLine, sw: 2 })),
      // sac à poussière
      path("M600 300 L660 290 Q700 330 690 400 L600 380 Z", { fill: C.mid })
    ],
    r: [["Abrasif", 300, 230], ["Trous d'aspiration (alignés)", 330, 330], ["Plateau à scratch", 520, 230], ["Sac à poussière", 650, 345]]
  },

  "filtre-aspirateur-eau-poussiere": {
    d: [
      rect(300, 180, 300, 80, { rx: 30, fill: C.mid }),
      path("M300 260 L600 260 L580 580 L320 580 Z", { fill: C.light }),
      // filtre cartouche plissé, flotteur dessous
      rect(380, 260, 140, 200, { fill: C.white, sw: 4 }), path("M390 270 " + Array.from({ length: 12 }, (_, i) => `L${i % 2 ? 510 : 390} ${280 + i * 15}`).join(" "), { fill: "none", sw: 2 }),
      rect(425, 460, 50, 40, { rx: 6, fill: C.amber, stroke: C.amberLine, sw: 4 }),
      // tuyau
      path("M600 330 C660 330 690 380 690 450", { fill: "none", stroke: C.dark, sw: 22 })
    ],
    r: [["Tête moteur", 450, 220], ["Filtre cartouche plissé", 450, 360], ["Flotteur", 450, 480], ["Cuve", 520, 540], ["Tuyau", 660, 345]]
  },

  "entretien-radiateur-electrique": {
    d: [
      rect(230, 210, 460, 300, { rx: 18, fill: C.light }),
      rect(250, 222, 420, 26, { rx: 6, fill: C.mid, sw: 3 }), slats(250, 222, 420, 26, 1, { sw: 3 }),
      rect(250, 472, 420, 26, { rx: 6, fill: C.mid, sw: 3 }), slats(250, 472, 420, 26, 1, { sw: 3 }),
      circle(640, 300, 22, { fill: C.white, sw: 4 }), line(640, 300, 640, 284, { sw: 4 }),
      arrow(350, 600, 350, 520, { sw: 5, head: 14 }), arrow(560, 600, 560, 520, { sw: 5, head: 14 }), arrow(350, 200, 350, 140, { sw: 5, head: 14, color: C.red }), arrow(560, 200, 560, 140, { sw: 5, head: 14, color: C.red })
    ],
    r: [["Grille de sortie d'air (haut)", 460, 235], ["Thermostat", 640, 300], ["Façade", 460, 380], ["Grille d'entrée d'air (bas)", 460, 485]]
  },

  "entretien-pompe-a-chaleur": {
    d: [
      rect(230, 210, 460, 300, { rx: 14, fill: C.light }),
      circle(380, 360, 115, { fill: C.dark }), ...[0, 120, 240].map(a => { const r = a * Math.PI / 180; return ellipse(380 + 50 * Math.cos(r), 360 + 50 * Math.sin(r), 50, 22, { fill: C.steel, sw: 3 }); }),
      ...Array.from({ length: 7 }, (_, i) => line(270 + i * 37, 245, 270 + i * 37, 475, { stroke: "#596372", sw: 2 })),
      rect(530, 240, 140, 240, { fill: C.mid, sw: 4 }), ...Array.from({ length: 13 }, (_, i) => line(540 + i * 10, 250, 540 + i * 10, 470, { stroke: C.steel, sw: 2 })),
      // évacuation des condensats, espace libre autour
      rect(300, 510, 20, 40, { fill: C.dark, sw: 0 }), drop(310, 575, 0.7),
      rect(200, 180, 520, 380, { rx: 20, fill: "none", stroke: C.greenLine, sw: 4, "stroke-dasharray": "14 10" })
    ],
    r: [["Grille du ventilateur", 380, 280], ["Ailettes de l'échangeur (ne pas tordre)", 600, 360], ["Évacuation des condensats", 310, 530], ["Espace libre autour", 700, 520]]
  },

  "entretien-portail-motorise": {
    d: [
      line(210, 560, 710, 560, { sw: 5 }),
      // pilier, feu clignotant, moteur
      rect(240, 260, 44, 300, { fill: C.mid }), path("M244 260 Q262 220 280 260 Z", { fill: C.amber, stroke: C.amberLine, sw: 4 }),
      rect(290, 480, 66, 70, { rx: 8, fill: C.light }),
      // portail, crémaillère, rail
      rect(370, 300, 270, 210, { fill: "none", sw: 6 }), ...Array.from({ length: 8 }, (_, i) => line(400 + i * 32, 300, 400 + i * 32, 510, { sw: 4 })),
      rect(370, 510, 270, 14, { fill: C.steel, sw: 3 }), ...Array.from({ length: 13 }, (_, i) => line(378 + i * 20, 524, 378 + i * 20, 532, { sw: 3 })),
      line(340, 552, 680, 552, { stroke: C.steel, sw: 8 }),
      // cellules photoélectriques face à face
      rect(286, 430, 22, 30, { rx: 4, fill: C.dark, sw: 0 }), rect(652, 430, 22, 30, { rx: 4, fill: C.dark, sw: 0 }), rect(648, 280, 30, 280, { fill: C.mid }),
      line(308, 445, 652, 445, { stroke: C.red, sw: 3, "stroke-dasharray": "8 8" })
    ],
    r: [["Feu clignotant", 262, 245], ["Cellule (émetteur)", 297, 445], ["Cellule (récepteur)", 663, 445], ["Moteur", 323, 515], ["Crémaillère", 505, 517], ["Rail", 600, 552]]
  },

  "visiophone-ne-sonne-plus": {
    d: [
      // platine de rue
      rect(240, 200, 150, 280, { rx: 16, fill: C.mid }), circle(315, 250, 20, { fill: C.dark, sw: 4 }), slats(260, 290, 110, 60, 4), rect(285, 380, 60, 40, { rx: 8, fill: C.white, sw: 4 }),
      rect(270, 440, 90, 30, { rx: 4, fill: C.amber, stroke: C.amberLine, sw: 3 }),
      // poste intérieur
      rect(480, 200, 210, 200, { rx: 16, fill: C.light }), rect(500, 220, 170, 110, { fill: C.dark, sw: 0 }), rect(510, 350, 100, 14, { rx: 7, fill: C.mid, sw: 3 }), circle(580, 357, 10, { fill: C.blue, stroke: C.blue, sw: 0 }),
      // alimentation au tableau électrique
      rect(420, 500, 90, 90, { rx: 8, fill: C.white, sw: 4 }), path("M315 480 L315 545 L420 545 M510 545 L585 545 L585 400", { fill: "none", sw: 4 })
    ],
    r: [["Platine de rue", 315, 250], ["Bouton d'appel", 315, 400], ["Piles (modèles sans fil)", 315, 455], ["Poste intérieur", 585, 275], ["Réglage du volume de la sonnerie", 580, 357], ["Alimentation (tableau électrique)", 465, 545]]
  }
};
