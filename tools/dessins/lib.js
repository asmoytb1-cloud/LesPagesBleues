/* Les Pages Bleues — petits outils de dessin des schémas techniques.
   Un schéma = des formes simples (aucun texte superflu) + des repères [libellé, x, y] posés sur la bonne pièce.
   Coordonnées du dessin : zone utile x 220 → 700, y 140 → 620 (les bulles numérotées se placent à gauche).
   Le gabarit écrit est celui du pack d'illustrations (1200 × 780), que tools/illustrations.js sait lire. */

// Couleurs (règles : docs/visuels/VISUELS_TECHNIQUES.md)
const C = {
  ink: "#4E5A69",       // contours graphite
  light: "#EEF2F6",     // surfaces claires
  mid: "#D6DDE6",       // surfaces moyennes
  steel: "#B8C2CE",     // métal
  dark: "#3A4350",      // pièces sombres (caoutchouc, plastique noir)
  white: "#FFFFFF",
  water: "#CFE6F7", waterLine: "#5E9CCB",
  amber: "#F2B45C", amberLine: "#B86A0A",   // pièce à remplacer, vigilance
  green: "#9FD3B4", greenLine: "#2F8A5B",   // contrôle correct
  red: "#D64545",                           // danger, interdit
  blue: "#1F5FD6"                           // flèches de mouvement
};

const attrs = o => Object.entries(o).filter(([, v]) => v !== undefined && v !== null).map(([k, v]) => ` ${k}="${v}"`).join("");
const style = ({ fill = C.light, stroke = C.ink, sw = 6, ...o } = {}) => ({ fill, stroke, "stroke-width": sw, ...o });

const rect = (x, y, w, h, { rx = 0, ...o } = {}) => `<rect${attrs({ x, y, width: w, height: h, rx, ...style(o) })}/>`;
const circle = (cx, cy, r, o = {}) => `<circle${attrs({ cx, cy, r, ...style(o) })}/>`;
const ellipse = (cx, cy, rx, ry, o = {}) => `<ellipse${attrs({ cx, cy, rx, ry, ...style(o) })}/>`;
const path = (d, o = {}) => `<path${attrs({ d, ...style(o) })}/>`;
const poly = (pts, o = {}) => `<polygon${attrs({ points: pts, ...style(o) })}/>`;
const line = (x1, y1, x2, y2, { stroke = C.ink, sw = 6, ...o } = {}) =>
  `<line${attrs({ x1, y1, x2, y2, stroke, "stroke-width": sw, "stroke-linecap": "round", ...o })}/>`;
const text = (x, y, s, { size = 24, weight = 750, fill = C.ink, anchor = "middle" } = {}) =>
  `<text${attrs({ x, y, "text-anchor": anchor, "font-family": "Inter,Arial", "font-size": size, "font-weight": weight, fill })}>${String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;")}</text>`;
// Flèche de mouvement (trait + pointe)
function arrow(x1, y1, x2, y2, { color = C.blue, sw = 6, head = 18 } = {}) {
  const a = Math.atan2(y2 - y1, x2 - x1), at = t => [(x2 - head * Math.cos(a + t)).toFixed(1), (y2 - head * Math.sin(a + t)).toFixed(1)];
  const [l1, l2] = [at(0.45), at(-0.45)];
  return line(x1, y1, +(x2 - head * 0.8 * Math.cos(a)).toFixed(1), +(y2 - head * 0.8 * Math.sin(a)).toFixed(1), { stroke: color, sw }) +
    `<polygon${attrs({ points: `${x2},${y2} ${l1} ${l2}`, fill: color, stroke: color, "stroke-width": 2 })}/>`;
}
// Flèche courbe (rotation, sens d'enroulement) : arc de cercle centré en (cx, cy)
function turn(cx, cy, r, from, to, o = {}) {
  const rad = d => d * Math.PI / 180, pt = d => [cx + r * Math.cos(rad(d)), cy + r * Math.sin(rad(d))];
  const [x1, y1] = pt(from), [x2, y2] = pt(to), [xb, yb] = pt(to - Math.sign(to - from) * 8);
  const large = Math.abs(to - from) > 180 ? 1 : 0, sweep = to > from ? 1 : 0;
  return path(`M${x1.toFixed(1)} ${y1.toFixed(1)} A${r} ${r} 0 ${large} ${sweep} ${xb.toFixed(1)} ${yb.toFixed(1)}`, { fill: "none", stroke: o.color || C.blue, sw: o.sw || 6, "stroke-linecap": "round" })
    + arrow(xb, yb, x2, y2, { color: o.color || C.blue, sw: 2, head: 18 });
}
// Interdit : croix rouge
const forbid = (x, y, s = 22) => line(x - s, y - s, x + s, y + s, { stroke: C.red, sw: 8 }) + line(x - s, y + s, x + s, y - s, { stroke: C.red, sw: 8 });
// Contrôle correct : coche verte
const check = (x, y, s = 20) => path(`M${x - s} ${y} L${x - s / 3} ${y + s * 0.7} L${x + s} ${y - s * 0.7}`, { fill: "none", stroke: C.greenLine, sw: 8, "stroke-linecap": "round", "stroke-linejoin": "round" });
// Vis vue de face (tête cruciforme)
const screw = (x, y, r = 11) => circle(x, y, r, { fill: C.steel, sw: 4 }) + line(x - r * 0.55, y, x + r * 0.55, y, { sw: 3 }) + line(x, y - r * 0.55, x, y + r * 0.55, { sw: 3 });
// Signes + et − dessinés (pas de texte : rendu identique partout)
const plus = (x, y, s = 14, color = C.white) => line(x - s, y, x + s, y, { stroke: color, sw: 6 }) + line(x, y - s, x, y + s, { stroke: color, sw: 6 });
const minus = (x, y, s = 14, color = C.white) => line(x - s, y, x + s, y, { stroke: color, sw: 6 });
// Gouttes d'eau
const drop = (x, y, s = 1, o = {}) => path(`M${x} ${y - 16 * s} C${x + 10 * s} ${y - 2 * s} ${x + 10 * s} ${y + 8 * s} ${x} ${y + 8 * s} C${x - 10 * s} ${y + 8 * s} ${x - 10 * s} ${y - 2 * s} ${x} ${y - 16 * s} Z`, { fill: o.fill || C.water, stroke: o.stroke || C.waterLine, sw: 3 });

/* Gabarit du pack : planche 1200 × 780, zone de dessin translate(105,95) scale(.72), repères au format du pack.
   Les bulles se placent en colonne à gauche, dans l'ordre vertical de leurs cibles. */
function packSvg(title, def) {
  const reperes = def.r.map(([label, x, y]) => ({ label, x, y }));
  const order = [...reperes].sort((a, b) => a.y - b.y || a.x - b.x);
  const n = order.length, y0 = 170, y1 = 600;
  order.forEach((r, i) => { r.by = n === 1 ? (y0 + y1) / 2 : Math.round(y0 + (y1 - y0) * i / (n - 1)); r.bx = 95; });
  const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");
  const callouts = order.map((r, i) =>
    `<line x1="${r.x}" y1="${r.y}" x2="${r.bx}" y2="${r.by}" stroke="#0B78E3" stroke-width="4" stroke-linecap="round"/>` +
    `<circle cx="${r.x}" cy="${r.y}" r="9" fill="#fff" stroke="#0B78E3" stroke-width="4"/>` +
    `<circle cx="${r.bx}" cy="${r.by}" r="24" fill="#fff" stroke="#0B78E3" stroke-width="4"/>` +
    `<text x="${r.bx}" y="${r.by + 7}" text-anchor="middle" font-family="Inter,Arial" font-size="20" font-weight="800" fill="#0B78E3">${i + 1}</text>` +
    `<text x="${r.bx + 34}" y="${r.by + 7}" font-family="Inter,Arial" font-size="20" font-weight="650" fill="#0F1E36">${esc(r.label)}</text>`).join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="780" viewBox="0 0 1200 780">
<rect width="1200" height="780" fill="#F7FAFD"/>
<text x="48" y="60" font-family="Inter,Arial" font-size="26" font-weight="850" fill="#10203A">${esc(title)}</text>
<g transform="translate(105,95) scale(.72)">${def.d.join("")}${callouts}</g>
</svg>
`;
}

module.exports = { plus, minus, C, rect, circle, ellipse, path, poly, line, text, arrow, turn, forbid, check, screw, drop, packSvg };
