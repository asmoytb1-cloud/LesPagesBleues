/* Les Pages Bleues — vérifications sans navigateur : données, liens internes, pages générées.
   Usage : node tests/validate.js   (sortie en erreur si un problème est trouvé) */

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const errors = [];
const warn = [];
const fail = m => errors.push(m);

// Charge les données comme le navigateur
const ctx = { window: { LPB_ROOT: "" }, navigator: {}, console, URLSearchParams };
vm.createContext(ctx);
for (const f of ["data.js", "common.js", "diagnostics-data.js", "guide-view.js"]) {
  vm.runInContext(fs.readFileSync(path.join(ROOT, "assets/js", f), "utf8"), ctx, { filename: f });
}
const { GUIDES, CATEGORIES, DIFFICULTIES, DIAGNOSTICS, REVIEWED_ON } = vm.runInContext("({ GUIDES, CATEGORIES, DIFFICULTIES, DIAGNOSTICS, REVIEWED_ON })", ctx);

/* ---------- Données des guides ---------- */
const ids = new Set();
const catIds = new Set(CATEGORIES.map(c => c.id));
for (const c of CATEGORIES) {
  if (c.parent && !catIds.has(c.parent)) fail(`catégorie ${c.id} : parent inconnu ${c.parent}`);
  if (c.photo && !fs.existsSync(path.join(ROOT, "assets/img/photos", c.photo + ".webp"))) fail(`catégorie ${c.id} : photo manquante ${c.photo}`);
}
for (const g of GUIDES) {
  const where = `fiche ${g.id}`;
  if (ids.has(g.id)) fail(`${where} : identifiant en double`);
  ids.add(g.id);
  if (!/^[a-z0-9-]+$/.test(g.id)) fail(`${where} : identifiant invalide (minuscules, chiffres et tirets)`);
  for (const k of ["title", "category", "difficulty", "duration", "summary", "safety"]) if (!g[k]) fail(`${where} : champ « ${k} » manquant`);
  if (!catIds.has(g.category)) fail(`${where} : catégorie inconnue ${g.category}`);
  if (!DIFFICULTIES.includes(g.difficulty)) fail(`${where} : difficulté inconnue ${g.difficulty}`);
  if (!Number.isFinite(g.minutes)) fail(`${where} : « minutes » manquant (utilisé pour le tri et les filtres)`);
  if (!Array.isArray(g.steps) || g.steps.length < 3) fail(`${where} : au moins 3 étapes attendues`);
  (g.steps || []).forEach((s, i) => {
    if (!s.title || !s.text) fail(`${where}, étape ${i + 1} : titre ou texte manquant`);
    if (s.timer !== undefined && !(s.timer > 0 && s.timer <= 4 * 3600)) fail(`${where}, étape ${i + 1} : minuteur invalide`);
  });
  if (g.photo && !fs.existsSync(path.join(ROOT, "assets/img/photos", g.photo + ".webp"))) fail(`${where} : photo manquante ${g.photo}`);
  if (!(g.sources || []).length) warn.push(`${g.id} : aucune source citée`);
  for (const s of g.sources || []) {
    if (!/^https:\/\//.test(s.url)) fail(`${where} : source non https ${s.url}`);
    if (!s.label) fail(`${where} : source sans libellé ${s.url}`);
  }
  if (g.title.length > 70) warn.push(`${g.id} : titre long (${g.title.length} caractères) pour les moteurs de recherche`);
}
if (!/^\d{4}-\d{2}-\d{2}$/.test(REVIEWED_ON)) fail("REVIEWED_ON doit être une date AAAA-MM-JJ");

/* ---------- Diagnostic guidé ---------- */
const diagIds = new Set();
for (const d of DIAGNOSTICS) {
  if (diagIds.has(d.id)) fail(`diagnostic ${d.id} : identifiant en double`);
  diagIds.add(d.id);
  if (!catIds.has(d.category)) fail(`diagnostic ${d.id} : catégorie inconnue`);
  const qIds = new Set(d.questions.map(q => q.id));
  for (const c of d.causes) {
    if (c.guide && !ids.has(c.guide)) fail(`diagnostic ${d.id} : fiche inconnue ${c.guide}`);
    if (!c.checks || !c.checks.length) fail(`diagnostic ${d.id} / ${c.title} : aucune vérification proposée`);
    for (const [q, w] of Object.entries(c.weights || {})) {
      if (!qIds.has(q)) fail(`diagnostic ${d.id} / ${c.title} : question inconnue ${q}`);
      const opts = new Set(d.questions.find(x => x.id === q)?.options.map(o => o.v));
      for (const v of Object.keys(w)) if (!opts.has(v)) fail(`diagnostic ${d.id} / ${c.title} : réponse inconnue ${q}=${v}`);
    }
  }
}

/* ---------- Liens internes de toutes les pages HTML ---------- */
const htmlFiles = [
  ...fs.readdirSync(ROOT).filter(f => f.endsWith(".html")),
  ...fs.readdirSync(path.join(ROOT, "fiches")).filter(f => f.endsWith(".html")).map(f => "fiches/" + f)
];
for (const f of htmlFiles) {
  if (f === "404.html") continue; // chemins absolus prévus pour GitHub Pages
  const html = fs.readFileSync(path.join(ROOT, f), "utf8");
  const dir = path.dirname(path.join(ROOT, f));
  for (const m of html.matchAll(/\b(?:href|src)="([^"#?]+)[^"]*"/g)) {
    const u = m[1];
    if (/^(https?:|mailto:|data:|\/\/)/.test(u) || u.includes("${")) continue;
    if (!fs.existsSync(path.resolve(dir, u))) fail(`${f} : lien cassé vers ${u}`);
  }
  if (!/<title>[^<]{10,}<\/title>/.test(html)) fail(`${f} : titre de page manquant`);
  if (!/<meta name="description" content="[^"]{30,}"/.test(html)) fail(`${f} : description manquante ou trop courte`);
  if (!html.includes('lang="fr"')) fail(`${f} : langue non déclarée`);
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(m[1]); } catch { fail(`${f} : données structurées JSON-LD invalides`); }
  }
}
for (const g of GUIDES) if (!fs.existsSync(path.join(ROOT, "fiches", g.id + ".html"))) fail(`page statique manquante : fiches/${g.id}.html (lancez node tools/build.js)`);

/* ---------- Plan du site et service worker ---------- */
const sitemap = fs.readFileSync(path.join(ROOT, "sitemap.xml"), "utf8");
for (const g of GUIDES) if (!sitemap.includes(`fiches/${g.id}.html`)) fail(`sitemap.xml : fiche absente ${g.id}`);
const sw = fs.readFileSync(path.join(ROOT, "sw.js"), "utf8");
for (const m of sw.match(/const CORE = \[([\s\S]*?)\];/)[1].matchAll(/"([^"]+)"/g)) {
  if (m[1] !== "./" && !fs.existsSync(path.join(ROOT, m[1]))) fail(`sw.js : fichier à mettre en cache introuvable ${m[1]}`);
}
const credits = JSON.parse(fs.readFileSync(path.join(ROOT, "assets/img/photos/credits.json"), "utf8"));
for (const f of fs.readdirSync(path.join(ROOT, "assets/img/photos")).filter(f => f.endsWith(".webp"))) {
  if (!credits.find(c => c.file === f)) fail(`photo sans crédit : ${f}`);
}

console.log(`${GUIDES.length} fiches, ${DIAGNOSTICS.length} diagnostics, ${htmlFiles.length} pages HTML vérifiées.`);
if (warn.length) console.log(`À noter (${warn.length}) :\n  - ` + warn.join("\n  - "));
if (errors.length) {
  console.error(`\n${errors.length} erreur(s) :\n  ✗ ` + errors.join("\n  ✗ "));
  process.exit(1);
}
console.log("✓ Aucune erreur.");
