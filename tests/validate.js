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
const icon0 = vm.runInContext('icon("__inconnue__")', ctx);   // rendu d'une icône qui n'existe pas

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
  ...fs.readdirSync(path.join(ROOT, "fiches")).filter(f => f.endsWith(".html")).map(f => "fiches/" + f),
  ...fs.readdirSync(path.join(ROOT, "categories")).filter(f => f.endsWith(".html")).map(f => "categories/" + f)
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
  for (const m of html.matchAll(/\bsrcset="([^"]+)"/g)) {
    for (const part of m[1].split(",")) {
      const u = part.trim().split(/\s+/)[0];
      if (!fs.existsSync(path.resolve(dir, u))) fail(`${f} : image de srcset introuvable ${u}`);
    }
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
for (const c of CATEGORIES) if (!fs.existsSync(path.join(ROOT, "categories", c.id + ".html"))) fail(`page de domaine manquante : categories/${c.id}.html (lancez node tools/build.js)`);
const sw = fs.readFileSync(path.join(ROOT, "sw.js"), "utf8");
for (const m of sw.match(/const CORE = \[([\s\S]*?)\];/)[1].matchAll(/"([^"]+)"/g)) {
  if (m[1] !== "./" && !fs.existsSync(path.join(ROOT, m[1]))) fail(`sw.js : fichier à mettre en cache introuvable ${m[1]}`);
}
/* ---------- Domaines : texte d'introduction et précautions ---------- */
for (const c of CATEGORIES) {
  if (!c.intro || c.intro.length < 60) fail(`domaine ${c.id} : introduction manquante ou trop courte`);
  if (!Array.isArray(c.tips) || !c.tips.length) fail(`domaine ${c.id} : précautions (« tips ») manquantes`);
}

/* ---------- Catalogue « Mon matériel » ---------- */
vm.runInContext(fs.readFileSync(path.join(ROOT, "assets/js/materiel-data.js"), "utf8"), ctx, { filename: "materiel-data.js" });
const { APPLIANCE_TYPES, CAR_MAKES, MOTO_MAKES, MATERIEL_SOURCES } = vm.runInContext("({ APPLIANCE_TYPES, CAR_MAKES, MOTO_MAKES, MATERIEL_SOURCES })", ctx);
const typeIds = new Set(APPLIANCE_TYPES.map(t => t.id));
const diagDevices = new Set(DIAGNOSTICS.map(d => d.device));
for (const t of APPLIANCE_TYPES) {
  if (t.source && !t.brands.length) fail(`matériel ${t.id} : aucune marque relevée alors qu'une source est indiquée`);
  if (t.source && !MATERIEL_SOURCES[t.source]) fail(`matériel ${t.id} : source inconnue ${t.source}`);
  if (!catIds.has(t.category)) fail(`matériel ${t.id} : domaine inconnu ${t.category}`);
  for (const b of Object.keys(t.models || {})) if (!t.brands.includes(b)) fail(`matériel ${t.id} : modèles pour une marque absente (${b})`);
  if (t.diag && !diagDevices.has(t.diag)) fail(`matériel ${t.id} : appareil de diagnostic inconnu ${t.diag}`);
  if (vm.runInContext(`icon(${JSON.stringify(t.icon)})`, ctx) === icon0) fail(`matériel ${t.id} : icône inconnue ${t.icon}`);
}
if (new Set(APPLIANCE_TYPES.map(t => t.id)).size !== APPLIANCE_TYPES.length) fail("matériel : identifiant de type en double");
for (const g of GUIDES) for (const d of g.devices || []) if (!typeIds.has(d) && d !== "voiture" && d !== "moto") fail(`fiche ${g.id} : type d'appareil inconnu ${d} (voir tools/materiel.js)`);
for (const c of [...CAR_MAKES, ...MOTO_MAKES]) {
  if (!c.models.length) fail(`voiture ${c.name} : aucun modèle`);
  for (const m of c.models) if (m.from && m.to && m.to < m.from) fail(`voiture ${c.name} ${m.name} : années inversées`);
}
const regenerated = (() => { const out = []; const orig = fs.writeFileSync; fs.writeFileSync = (f, d) => out.push(d); const log = console.log; console.log = () => {};
  try { require("../tools/materiel.js").build(); } finally { fs.writeFileSync = orig; console.log = log; } return out[0]; })();
if (regenerated !== fs.readFileSync(path.join(ROOT, "assets/js/materiel-data.js"), "utf8")) fail("assets/js/materiel-data.js n'est pas à jour : lancez node tools/build.js");

const credits = JSON.parse(fs.readFileSync(path.join(ROOT, "assets/img/photos/credits.json"), "utf8"));
for (const f of fs.readdirSync(path.join(ROOT, "assets/img/photos")).filter(f => f.endsWith(".webp"))) {
  const original = f.replace(/-(480|800)\.webp$/, ".webp");   // versions réduites d'une même photo
  if (!credits.find(c => c.file === original)) fail(`photo sans crédit : ${f}`);
  if (original === f && !fs.existsSync(path.join(ROOT, "assets/img/photos", f.replace(".webp", "-480.webp")))) fail(`version 480 px manquante pour ${f}`);
}

console.log(`${GUIDES.length} fiches, ${DIAGNOSTICS.length} diagnostics, ${htmlFiles.length} pages HTML vérifiées.`);
if (warn.length) console.log(`À noter (${warn.length}) :\n  - ` + warn.join("\n  - "));
if (errors.length) {
  console.error(`\n${errors.length} erreur(s) :\n  ✗ ` + errors.join("\n  ✗ "));
  process.exit(1);
}
console.log("✓ Aucune erreur.");
