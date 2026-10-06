/* Les Pages Bleues — intégration des schémas techniques d'un pack d'illustrations.
   Usage : node tools/illustrations.js <dossier du pack>     (le dossier contient manifest.json et svg/<id>.svg)
   Nécessite Playwright, comme les tests : Chromium mesure les dessins et produit les images de partage.

   La relecture tools/data/illustrations-review.json décide : seuls les schémas « valide » sont intégrés,
   les autres fiches gardent leur photo. Pour chaque schéma validé :
   - répare les balises cassées du pack (« <circle » sans son « < ») ;
   - n'accepte que des formes simples (aucun script, lien, image ou ressource externe) ;
   - garde la zone de dessin seulement (ni titres, ni étapes, ni texte provisoire) ;
   - redessine les repères en bleu Pages Bleues, numérotés sans texte (la légende est écrite dans la fiche),
     avec les corrections de la relecture et sans traits qui se croisent ;
   - recadre sur le dessin.
   Écrit assets/img/technical/<id>.svg, <id>.png (1200 × 630, image de partage), assets/js/illustrations-data.js
   (registre lu par les fiches) et docs/visuels/AUDIT.md (bilan des schémas du pack). */

const fs = require("fs");
const path = require("path");
const vm = require("vm");
const { chromium } = require("playwright");

const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, "assets/img/technical");
const REVIEW_FILE = path.join(ROOT, "tools/data/illustrations-review.json");
const BLUE = "#1F5FD6";            // bleu du site sur fond clair (contraste 5,7:1 sur blanc)
const GROUP = /<g transform="translate\(105,95\) scale\(\.72\)">([\s\S]*?)<\/g>/;  // zone « Plan technique » du gabarit
const FONT = "Inter, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

const fail = msg => { console.error("✗ " + msg); process.exit(1); };
const packDir = process.argv[2];
if (!packDir) fail("indiquez le dossier du pack : node tools/illustrations.js <dossier>");
const manifest = JSON.parse(fs.readFileSync(path.join(packDir, "manifest.json"), "utf8"));
const review = JSON.parse(fs.readFileSync(REVIEW_FILE, "utf8"));

// Les fiches du site : titres et domaines viennent de data.js, jamais du pack
const sandbox = { window: {}, navigator: {}, console };
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(path.join(ROOT, "assets/js/data.js"), "utf8") + "\n;globalThis.__d = { GUIDES, CATEGORIES };", sandbox);
const { GUIDES, CATEGORIES } = sandbox.__d;
const guide = id => GUIDES.find(g => g.id === id);

// Chaque fiche du site a une relecture, chaque relecture une fiche, chaque fiche du pack une relecture
const ids = Object.keys(review.fiches);
const problems = [
  ...GUIDES.filter(g => !review.fiches[g.id]).map(g => `fiche sans relecture : ${g.id}`),
  ...ids.filter(id => !guide(id)).map(id => `relecture d'une fiche inconnue : ${id}`),
  ...manifest.filter(m => !review.fiches[m.id]).map(m => `schéma du pack sans relecture : ${m.id}`),
  ...ids.filter(id => !["valide", "a-refaire"].includes(review.fiches[id].statut)).map(id => `statut inconnu : ${id}`)
];
if (problems.length) fail(problems.join("\n  "));

/* ---------- Lecture d'un SVG du pack ---------- */
const SHAPES = new Set(["line", "circle", "rect", "path", "ellipse", "polygon", "polyline"]);
const SAFE_ATTRS = new Set(["x", "y", "width", "height", "rx", "ry", "cx", "cy", "r", "x1", "y1", "x2", "y2", "d", "points",
  "fill", "stroke", "stroke-width", "stroke-linecap", "stroke-linejoin", "stroke-dasharray", "opacity", "fill-opacity",
  "stroke-opacity", "fill-rule", "text-anchor", "font-family", "font-size", "font-weight"]);
const SAFE_VALUE = /^[#\w\s.,%'()-]*$/;   // couleurs, nombres, tracés, noms de police : rien d'autre
const unescapeXml = s => s.replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n)).replace(/&quot;/g, '"')
  .replace(/&apos;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
const escapeXml = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function readPackSvg(id) {
  const file = path.join(packDir, "svg", id + ".svg");
  let svg = fs.readFileSync(file, "utf8");
  if (svg.length > 300000) throw new Error("fichier trop lourd");
  const before = svg;
  svg = svg.replace(/\/>(circle|path|rect|line|ellipse|polygon|polyline|text) /g, "/><$1 ");
  const repaired = before !== svg;
  if (/<script|<foreignObject|<image|<use\b|<style|<!DOCTYPE|<!ENTITY|\bon\w+\s*=|href\s*=|url\s*\(|javascript:/i.test(svg))
    throw new Error("contenu actif ou externe : schéma refusé");
  const m = svg.match(GROUP);
  if (!m) throw new Error("zone de dessin introuvable (gabarit inattendu)");
  return { inner: m[1], repaired };
}

// Découpe la zone de dessin en éléments ; rien ne doit rester hors des éléments reconnus
function tokens(inner) {
  const TOKEN = /<(\w+)\b([^>]*?)\/>|<text\b([^>]*)>([^<]*)<\/text>/g;
  const list = [];
  let rest = inner, m;
  while ((m = TOKEN.exec(inner))) {
    const tag = m[1] || "text";
    if (tag !== "text" && !SHAPES.has(tag)) throw new Error(`élément refusé : <${tag}>`);
    const attrs = {};
    for (const [, k, v] of (m[2] ?? m[3]).matchAll(/([\w:-]+)="([^"]*)"/g)) {
      if (!SAFE_ATTRS.has(k) || !SAFE_VALUE.test(v)) throw new Error(`attribut refusé : ${k}="${v}"`);
      attrs[k] = v;
    }
    list.push({ tag, attrs, text: m[4] !== undefined ? unescapeXml(m[4]) : null });
    rest = rest.replace(m[0], "");
  }
  if (rest.trim()) throw new Error(`contenu non reconnu : ${rest.trim().slice(0, 80)}`);
  return list;
}

// Un repère du pack : trait, point d'arrivée, bulle, numéro, libellé — tous de la même couleur
function splitCallouts(list) {
  const callouts = [], drawing = [];
  for (let i = 0; i < list.length; i++) {
    const [line, dot, bubble, num, label] = list.slice(i, i + 5);
    const color = line?.attrs.stroke;
    if (line?.tag === "line" && line.attrs["stroke-width"] === "4" && dot?.tag === "circle" && dot.attrs.r === "9" &&
        dot.attrs.stroke === color && bubble?.tag === "circle" && bubble.attrs.r === "24" && bubble.attrs.stroke === color &&
        num?.tag === "text" && /^\d+$/.test(num.text.trim()) && label?.tag === "text") {
      callouts.push({ n: +num.text, label: label.text.trim(), at: [+line.attrs.x1, +line.attrs.y1], bubble: [+line.attrs.x2, +line.attrs.y2] });
      i += 4;
    } else drawing.push(list[i]);
  }
  return { callouts: callouts.sort((a, b) => a.n - b.n), drawing };
}

/* ---------- Repères : association sans croisement ---------- */
const cross = (p1, p2, q1, q2) => {
  const o = (a, b, c) => Math.sign((b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]));
  return o(p1, p2, q1) * o(p1, p2, q2) < 0 && o(q1, q2, p1) * o(q1, q2, p2) < 0;
};
const permutations = a => a.length <= 1 ? [a] : a.flatMap((x, i) => permutations([...a.slice(0, i), ...a.slice(i + 1)]).map(p => [x, ...p]));
function layout(reperes, bubbles) {
  let best = null;
  for (const order of permutations(bubbles.map((_, i) => i))) {
    const segs = reperes.map((r, i) => [bubbles[order[i]], r.at]);
    let crossings = 0, length = 0;
    segs.forEach(([a, b], i) => {
      length += Math.hypot(a[0] - b[0], a[1] - b[1]);
      for (let j = i + 1; j < segs.length; j++) if (cross(a, b, ...segs[j])) crossings++;
    });
    // Sans croisement, l'ordre d'origine (celui du pack ou de la relecture) est gardé ; sinon le plus court
    const score = crossings * 1e6 + (order.every((x, i) => x === i) ? 0 : 1e4) + length;
    if (!best || score < best.score) best = { score, crossings, order };
  }
  // Numéros de haut en bas, dans l'ordre des bulles
  const placed = reperes.map((r, i) => ({ label: r.label, at: r.at, bubble: bubbles[best.order[i]] }))
    .sort((a, b) => a.bubble[1] - b.bubble[1] || a.bubble[0] - b.bubble[0]);
  return { placed, crossings: best.crossings };
}

const el = t => t.tag === "text"
  ? `<text${Object.entries(t.attrs).map(([k, v]) => ` ${k}="${escapeXml(v)}"`).join("")}>${escapeXml(t.text)}</text>`
  : `<${t.tag}${Object.entries(t.attrs).map(([k, v]) => ` ${k}="${escapeXml(v)}"`).join("")}/>`;
const calloutsSvg = placed => placed.map((p, i) =>
  `<line x1="${p.at[0]}" y1="${p.at[1]}" x2="${p.bubble[0]}" y2="${p.bubble[1]}" stroke="${BLUE}" stroke-width="4" stroke-linecap="round"/>` +
  `<circle cx="${p.at[0]}" cy="${p.at[1]}" r="8" fill="#fff" stroke="${BLUE}" stroke-width="4"/>` +
  `<circle cx="${p.bubble[0]}" cy="${p.bubble[1]}" r="23" fill="#fff" stroke="${BLUE}" stroke-width="4"/>` +
  `<text x="${p.bubble[0]}" y="${p.bubble[1] + 8}" text-anchor="middle" font-family="${FONT}" font-size="23" font-weight="800" fill="${BLUE}">${i + 1}</text>`
).join("");

/* ---------- Image de partage (1200 × 630) ---------- */
const fontCss = `@font-face{font-family:Inter;src:url(data:font/woff2;base64,${fs.readFileSync(path.join(ROOT, "assets/fonts/inter-latin.woff2")).toString("base64")}) format("woff2");font-weight:400 800}`;
const logo = fs.readFileSync(path.join(ROOT, "assets/img/logo.svg"), "utf8");
const shareHtml = (g, svg, labels) => `<!doctype html><html lang="fr"><head><meta charset="utf-8"><style>${fontCss}
  html,body{margin:0;width:1200px;height:630px;background:#f4f7fb;font-family:Inter,sans-serif;color:#0e1b32}
  .card{position:absolute;inset:28px;display:grid;grid-template-columns:600px 1fr;gap:36px;align-items:center;background:#fff;border:2px solid #dce4ee;border-radius:30px;padding:28px 40px 28px 28px}
  .pic{height:518px;display:grid;place-items:center;background:#fbfdff;border-radius:20px}
  .pic img{max-width:560px;max-height:490px}
  .brand{display:flex;align-items:center;gap:12px;font-weight:750;font-size:24px}.brand svg{width:40px;height:40px}.brand b{color:#1f5fd6;font-weight:750}
  .kicker{margin-top:30px;color:#1f5fd6;font-weight:800;font-size:17px;letter-spacing:.08em;text-transform:uppercase}
  h1{margin:8px 0 18px;font-size:${g.title.length > 48 ? 34 : 40}px;line-height:1.12;letter-spacing:-.02em;font-weight:780}
  ol{margin:0;padding:0;list-style:none;display:grid;gap:9px;font-size:21px;font-weight:600}
  li{display:flex;gap:12px;align-items:center}li span{flex:none;width:32px;height:32px;border:3px solid #1f5fd6;border-radius:50%;display:grid;place-items:center;color:#1f5fd6;font-weight:800;font-size:17px;box-sizing:border-box}
  .note{margin-top:20px;color:#55637a;font-size:17px}
</style></head><body><div class="card">
  <div class="pic"><img src="data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}" alt=""></div>
  <div><div class="brand">${logo}<span>Les Pages <b>Bleues</b></span></div>
    <div class="kicker">Schéma de principe</div><h1>${escapeXml(g.title)}</h1>
    <ol>${labels.slice(0, 5).map((l, i) => `<li><span>${i + 1}</span>${escapeXml(l)}</li>`).join("")}</ol>
    <p class="note">La conception peut varier selon le modèle.</p></div>
</div></body></html>`;

/* ---------- Bilan lisible : docs/visuels/AUDIT.md ---------- */
function writeAudit(done) {
  const date = new Date(review.relu_le + "T12:00:00").toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
  const domain = g => { const c = CATEGORIES.find(x => x.id === g.category); const p = c && c.parent && CATEGORIES.find(x => x.id === c.parent); return (p && p.id !== "autres" ? p : c || { name: "Autre" }).name; };  // « Autres » : sa sous-catégorie (mode, instruments)
  const valid = ids.filter(id => review.fiches[id].statut === "valide");
  const todo = ids.filter(id => review.fiches[id].statut === "a-refaire");
  const repairedCount = Object.values(done).filter(d => d.repaired).length;
  const broken = manifest.filter(m => /\/>(circle|path|rect|line|ellipse|polygon|polyline|text) /.test(fs.readFileSync(path.join(packDir, "svg", m.id + ".svg"), "utf8"))).length;
  const byDomain = {};
  todo.forEach(id => (byDomain[domain(guide(id))] ||= []).push(id));
  const md = `# Schémas techniques : relecture du pack « ${review.pack} »

Relu le ${date}, fiche par fiche, en comparant chaque schéma au texte de sa fiche.
Ce fichier est produit par \`node tools/illustrations.js <dossier du pack>\` à partir de
\`tools/data/illustrations-review.json\` : pour changer une décision, modifier ce fichier de relecture puis relancer la commande.

**Règle appliquée**, celle de la bible des visuels : « Une belle image fausse est pire qu'une image simple mais juste. »
Un schéma n'est affiché que s'il montre le bon objet et que chaque repère désigne la bonne pièce.
Sinon la fiche garde sa photo, comme le prévoit l'ordre « schéma technique > photo propre à la fiche > photo du domaine ».

## Résultat

- **${valid.length} schémas intégrés**, dont ${valid.filter(id => review.fiches[id].reperes).length} avec des repères corrigés (détail ci-dessous) ;
- **${todo.length} schémas à refaire** : dessin d'un autre objet, dessin passe-partout repris d'une fiche à l'autre, ou repères qui désignent la mauvaise pièce.

## Défauts communs aux fichiers du pack, corrigés pour les schémas intégrés

- **Balises cassées** dans ${broken} fichiers (\`/>circle\` au lieu de \`/><circle\`) : un élément du dessin ne s'affichait pas
  (stick gauche de la manette, ligne de collage de la semelle, plateau du vélo, tige du mécanisme de chasse…). La balise est réparée${repairedCount ? ` (${repairedCount} des schémas intégrés étaient concernés)` : ""}.
- **Texte provisoire** « Famille d'équipement » dans le panneau de droite et **faux bouton** « SCHÉMA DE PRINCIPE » : seule la zone de dessin est gardée.
- **Repères** : traits de rappel qui barrent les libellés, couleur différente selon le domaine (orange et vert trop pâles sur fond blanc).
  Les repères sont redessinés en bleu Pages Bleues et numérotés ; la légende est écrite en texte dans la fiche,
  lisible sur téléphone et par les lecteurs d'écran.
- **Planche entière** (1200 × 780, avec titres, outils et étapes déjà présents dans la fiche) illisible sur téléphone : le schéma est recadré sur le dessin.

## Schémas intégrés (${valid.length})

| Fiche | Repères affichés | Correction |
| --- | --- | --- |
${valid.map(id => `| ${guide(id).title} (\`${id}\`) | ${done[id].labels.map((l, i) => `${i + 1}. ${l}`).join(" ; ")} | ${(review.fiches[id].corrections || []).join(" ") || "—"} |`).join("\n")}

## Schémas à refaire (${todo.length})

Classés par domaine. Pour chaque fiche : ce qui ne va pas, puis ce que le schéma doit montrer.

${Object.entries(byDomain).map(([name, list]) => `### ${name} (${list.length})

${list.map(id => `- **${guide(id).title}** (\`${id}\`) — ${review.fiches[id].raison}
  *À dessiner :* ${review.fiches[id].a_dessiner}`).join("\n")}`).join("\n\n")}

## Intégrer un schéma refait

1. Déposer le nouveau pack (même structure : \`manifest.json\`, \`svg/<id>.svg\` au gabarit 1200 × 780).
2. Relire le schéma face au texte de la fiche ; dans \`tools/data/illustrations-review.json\`, passer la fiche à
   \`"statut": "valide"\` (et, si un repère est mal placé, donner la liste \`reperes\` corrigée).
3. Lancer \`node tools/illustrations.js <dossier du pack>\`, puis \`node tools/build.js\`, \`node tests/validate.js\` et \`node tests/e2e.js\`.
`;
  fs.mkdirSync(path.join(ROOT, "docs/visuels"), { recursive: true });
  fs.writeFileSync(path.join(ROOT, "docs/visuels/AUDIT.md"), md);
}

/* ---------- Traitement ---------- */
(async () => {
  const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
  const page = await browser.newPage();
  const bbox = svgInner => page.evaluate(inner => {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.innerHTML = `<g>${inner}</g>`;
    document.body.appendChild(svg);
    const b = svg.firstChild.getBBox();
    svg.remove();
    return { x: b.x, y: b.y, w: b.width, h: b.height };
  }, svgInner);

  fs.mkdirSync(OUT, { recursive: true });
  const done = {}, registry = {};
  for (const id of ids.filter(id => review.fiches[id].statut === "valide")) {
    const g = guide(id), r = review.fiches[id], item = manifest.find(m => m.id === id);
    if (!item) fail(`${id} : absent du pack`);
    let pack;
    try { pack = readPackSvg(id); } catch (e) { fail(`${id} : ${e.message}`); }
    let parts;
    try { parts = splitCallouts(tokens(pack.inner)); } catch (e) { fail(`${id} : ${e.message}`); }
    const { callouts, drawing } = parts;
    if (!callouts.length) fail(`${id} : aucun repère trouvé`);
    const drawingSvg = drawing.map(el).join("");
    const box = await bbox(drawingSvg);

    // Bulles : celles du pack, rapprochées du dessin (les libellés, qui les séparaient du dessin, passent en légende)
    const reperes = r.reperes || callouts.map(c => ({ label: c.label, at: c.at }));
    let bubbles = callouts.map(c => [...c.bubble]);
    if (bubbles.length !== reperes.length) {
      const x = bubbles.reduce((s, b) => s + b[0], 0) / bubbles.length;
      const ys = bubbles.map(b => b[1]), y0 = Math.min(...ys), y1 = Math.max(...ys);
      bubbles = reperes.map((_, i) => [x, reperes.length === 1 ? (y0 + y1) / 2 : y0 + (y1 - y0) * i / (reperes.length - 1)]);
    }
    // … et ramenées à la hauteur du dessin, en gardant leur ordre et 64 d'écart entre deux bulles
    bubbles.sort((a, b) => a[1] - b[1]);
    bubbles.forEach((b, i) => { b[1] = Math.min(Math.max(b[1], box.y - 20), box.y + box.h + 20); });
    for (let i = 1; i < bubbles.length; i++) bubbles[i][1] = Math.max(bubbles[i][1], bubbles[i - 1][1] + 64);
    const right = Math.max(...bubbles.map(b => b[0]));
    const shift = Math.max(0, Math.round(box.x - 70 - (right + 23)));
    bubbles = bubbles.map(([x, y]) => [x + shift, y]);
    const { placed, crossings } = layout(reperes, bubbles);
    if (crossings) fail(`${id} : traits de repère qui se croisent`);

    const content = drawingSvg + calloutsSvg(placed);
    const b = await bbox(content), pad = 22;
    const vb = [Math.floor(b.x - pad), Math.floor(b.y - pad), Math.ceil(b.w + 2 * pad), Math.ceil(b.h + 2 * pad)];
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb.join(" ")}" width="${vb[2]}" height="${vb[3]}">` +
      `<title>${escapeXml(`Schéma de principe : ${g.title}`)}</title>${content}</svg>\n`;
    fs.writeFileSync(path.join(OUT, id + ".svg"), svg);

    const labels = placed.map(p => p.label);
    await page.setViewportSize({ width: 1200, height: 630 });
    await page.setContent(shareHtml(g, svg, labels), { waitUntil: "load" });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: path.join(OUT, id + ".png") });

    done[id] = { labels, repaired: pack.repaired };
    registry[id] = { w: vb[2], h: vb[3], reperes: labels, modelSpecific: !!item.model_specific, variants: [] };
    console.log(`✓ ${id}${pack.repaired ? " (balise réparée)" : ""}${r.reperes ? " (repères corrigés)" : ""} : ${labels.join(", ")}`);
  }
  await browser.close();

  // Plus de fichier pour un schéma retiré de la relecture
  for (const f of fs.readdirSync(OUT)) if (/\.(svg|png)$/.test(f) && !registry[f.replace(/\.(svg|png)$/, "")]) fs.unlinkSync(path.join(OUT, f));

  fs.writeFileSync(path.join(ROOT, "assets/js/illustrations-data.js"),
`/* Schémas techniques des fiches — fichier produit par tools/illustrations.js (ne pas modifier à la main).
   Seuls les schémas relus et jugés justes figurent ici ; les autres fiches gardent leur photo
   (relecture : tools/data/illustrations-review.json, bilan : docs/visuels/AUDIT.md).
   w, h : taille du dessin ; reperes : légende, dans l'ordre des numéros ;
   modelSpecific : la conception dépend du modèle (le pack le précise) ;
   variants : variantes marque / modèle, uniquement vérifiées sur une source fiable (aucune pour l'instant). */
const ILLUSTRATIONS = {
${Object.entries(registry).map(([id, v]) => `  ${JSON.stringify(id)}: { ${Object.entries(v).map(([k, x]) => `${k}: ${Array.isArray(x) ? `[${x.map(y => JSON.stringify(y)).join(", ")}]` : JSON.stringify(x)}`).join(", ")} }`).join(",\n")}
};
`);
  writeAudit(done);
  console.log(`${Object.keys(registry).length} schémas intégrés dans assets/img/technical, ${ids.length - Object.keys(registry).length} à refaire (docs/visuels/AUDIT.md)`);
})().catch(e => fail(e.stack || e.message));
