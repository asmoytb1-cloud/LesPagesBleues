/* Les Pages Bleues — génère le catalogue du matériel à partir de tools/data/ :
     types.json                     types d'équipement (domaine, groupe, rubriques Spareka, produits Leroy Merlin)
     electromenager-marques.json    noms de marques tels qu'affichés par Spareka (rubriques électroménager)
     spareka-references.json.gz     toutes les références d'appareils du plan de site public de Spareka
                                    ({"univers/rubrique": {"marque": ["référence", …]}}, voir tools/fetch-catalogues.py)
     leroymerlin-marques.json       marques de Leroy Merlin (nom affiché)
     leroymerlin-produits.jsonl.gz  produits Leroy Merlin rattachés à un type ([type, titre])
     boutiques.json                 marques et modèles relevés chez Boulanger, Leroy Merlin et Micromania
     voitures.txt / motos.txt       marques, modèles et années (catcar.info, motobook.app)
   Sorties :
     assets/js/materiel-data.js     types, marques, voitures, motos (chargé par les pages)
     assets/data/modeles/*.json     références et modèles par type et par marque (chargés à la demande)
   Lancé automatiquement par tools/build.js. */

const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

const ROOT_DIR = path.resolve(__dirname, "..");
const DATA = path.join(__dirname, "data");
const MODEL_DIR = path.join(ROOT_DIR, "assets/data/modeles");
const OWN_FILE_MIN = 5000;   // au-delà, un type a son propre fichier de modèles ; sinon il est regroupé par domaine

const SOURCES = {
  spareka: { name: "Spareka", url: "https://www.spareka.fr/" },
  boulanger: { name: "Boulanger", url: "https://www.boulanger.com/" },
  leroymerlin: { name: "Leroy Merlin", url: "https://www.leroymerlin.fr/" },
  micromania: { name: "Micromania", url: "https://www.micromania.fr/" },
  catcar: { name: "catcar.info", url: "https://www.catcar.info/en/" },
  motobook: { name: "MotoBook", url: "https://motobook.app/" }
};

const readJSON = f => JSON.parse(fs.readFileSync(path.join(DATA, f), "utf8"));
const readGz = f => zlib.gunzipSync(fs.readFileSync(path.join(DATA, f))).toString("utf8");
const slug = s => String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

// Écriture des marques : « DE DIETRICH » → « De Dietrich », sigles courts gardés en capitales
const SPECIAL = { "DELONGHI": "De'Longhi", "KITCHENAID": "KitchenAid", "IROBOT": "iRobot", "LG": "LG", "AEG": "AEG", "SEB": "SEB",
  "WPRO": "Wpro", "SMEG": "Smeg", "KÜPPERSBUSCH": "Küppersbusch", "CANDY / HOOVER": "Candy / Hoover", "HOTPOINT ARISTON": "Hotpoint-Ariston",
  "GENERAL ELECTRIC": "General Electric", "RUSSELL HOBBS": "Russell Hobbs", "OK": "OK", "KARCHER": "Kärcher", "HP": "HP", "JBL": "JBL",
  "TCL": "TCL", "BRANDT": "Brandt", "BOSCH": "Bosch", "STIHL": "Stihl", "MSI": "MSI", "DYU": "DYU", "BWT": "BWT", "ABB": "ABB",
  "HARMANKARDON": "Harman Kardon" };
// Même marque sous deux noms selon les sources
const ALIASES = { "hewlett-packard": "hp", "caterpillar": "cat", "philip": "philips", "harmankardon": "harman-kardon", "black-decker": "black-decker",
  "black-et-decker": "black-decker", "karcher": "karcher", "segway": "segway-ninebot", "ninebot": "segway-ninebot" };
const brandKey = n => { const k = slug(n); return ALIASES[k] || k; };
function brandName(raw) {
  raw = String(raw).trim();
  if (SPECIAL[raw.toUpperCase()]) return SPECIAL[raw.toUpperCase()];
  if (raw !== raw.toUpperCase()) return raw;                                // déjà écrit proprement (« Gardena », « iRobot »)
  return raw.split(/(\s+|-|\/|&)/).map(w => {
    if (!/[A-ZÀ-Ý]/.test(w)) return w;
    if (w.length <= 3 && !/[AEIOUY]/.test(w.slice(1))) return w;          // sigles : CDA, BSK, PKM…
    return w.charAt(0) + w.slice(1).toLowerCase();
  }).join("");
}

// Noms de marques connus (clé = forme simplifiée) : Spareka d'abord, puis boutiques, puis Leroy Merlin
function brandDirectory(shopTypes, lmBrands) {
  const names = new Map();
  const add = n => { const k = brandKey(n); if (k && !names.has(k)) names.set(k, brandName(n)); };
  for (const list of Object.values(readJSON("electromenager-marques.json"))) list.forEach(add);
  for (const t of shopTypes) t.brands.forEach(add);
  for (const n of Object.values(lmBrands)) add(n);
  return { get: key => names.get(brandKey(key)) || brandName(key.replace(/-/g, " ").toUpperCase()), names };
}

function vehicleMakes(file) {
  const makes = [];
  for (const line of fs.readFileSync(path.join(DATA, file), "utf8").split("\n")) {
    const l = line.trim();
    if (!l || l.startsWith("#")) continue;
    if (l.startsWith("=")) { makes.push({ name: l.slice(1).trim(), models: [] }); continue; }
    const [name, years] = l.split(";").map(x => x.trim());
    const m = { name };
    const y = years && years.match(/^(\d{4})-(\d{4})?$/);
    if (y) { m.from = +y[1]; if (y[2]) m.to = +y[2]; }
    makes[makes.length - 1].models.push(m);
  }
  return makes.sort((a, b) => a.name.localeCompare(b.name, "fr"));
}

// Marque d'un titre de produit Leroy Merlin : la plus longue marque connue citée en mot entier,
// écrite comme sur le site ou en capitales (« BOSCH ») — la casse évite « 3 m » → 3M, « nature » → Nature…
function lmBrandFinder(lmBrands) {
  const esc = n => n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const word = s => `(^|[^\\p{L}\\p{N}])${esc(s)}($|[^\\p{L}\\p{N}])`;
  const list = Object.values(lmBrands).filter(n => n && n.length >= 2).sort((a, b) => b.length - a.length)
    .map(n => ({ n, upper: new RegExp(word(n.toUpperCase()), "u"), exact: new RegExp(word(n), "u") }));
  // Marques qui sont aussi des mots courants : retenues seulement en capitales
  const COMMON = new Set(["unique", "nature", "delta", "evolution", "retro", "solid", "ring", "slide", "gloss", "iris", "onyx", "rapid",
    "supra", "ideal", "google", "info", "aria", "brilliant", "lenz", "huber", "hunter", "viva", "fitt", "mmc", "skf", "gre"]);
  const upperOk = b => /\p{L}/u.test(b.n) && !(b.n.length <= 3 && /\d/.test(b.n));      // « 3M » ≠ « 3 m »
  // d'abord la marque en capitales (convention des titres : « Mitigeur de lavabo GROHE »), sinon telle qu'écrite
  return title => (list.find(b => upperOk(b) && !COMMON.has(b.n.toLowerCase()) && b.upper.test(title))
    || list.find(b => !COMMON.has(b.n.toLowerCase()) && b.exact.test(title)))?.n;
}
// Accessoires et pièces qui commencent par le nom d'un appareil (« Tondeuse robotisée, 60 lames de rechange… »)
const ACCESSORY = /(lames? de rechange|compatibles? avec|pour (tondeuse|robot|taille|nettoyeur|debroussailleuse|débroussailleuse)|housse|abri |garage pour|accessoire|pi[eè]ces? d[ée]tach[ée]es?|kit de (lames|coupe|nettoyage)|rallonge)/i;

function build() {
  const typesDef = readJSON("types.json").types;
  const shops = readJSON("boutiques.json");
  const shopById = Object.fromEntries(shops.types.map(t => [t.id, t]));
  const lmBrands = readJSON("leroymerlin-marques.json");
  const dir = brandDirectory(shops.types, lmBrands);
  const spareka = JSON.parse(readGz("spareka-references.json.gz"));
  const legacy = readJSON("electromenager-marques.json");
  const findLm = lmBrandFinder(lmBrands);
  const lmProducts = readGz("leroymerlin-produits.jsonl.gz").split("\n").filter(Boolean).map(l => JSON.parse(l))
    .map(([ty, title]) => [ty, title.replace(/\uFFFD/g, "").replace(/\s+/g, " ").trim()])   // caractères corrompus dans certains titres
    .filter(([, title]) => !ACCESSORY.test(title));

  const types = [], refsByType = {};
  for (const def of typesDef) {
    const brands = new Map();                  // nom affiché → Set de modèles
    const unbranded = new Set();
    const sources = new Set();
    const addBrand = n => { const name = dir.get(n); if (!brands.has(name)) brands.set(name, new Set()); return brands.get(name); };
    for (const key of def.sp || []) {
      for (const [b, refs] of Object.entries(spareka[key] || {})) { const s = addBrand(b); refs.forEach(r => s.add(r)); sources.add("spareka"); }
    }
    if (def.legacy) (legacy[def.legacy] || []).forEach(n => { addBrand(n); sources.add("spareka"); });
    if (def.lm) for (const [ty, title] of lmProducts) {
      if (ty !== def.id) continue;
      const b = findLm(title);
      (b ? addBrand(b) : unbranded).add(title);          // sans marque reconnue : retrouvable par la recherche de modèle
      sources.add("leroymerlin");
    }
    const shop = shopById[def.id];
    const inline = {};
    if (shop) {
      shop.brands.forEach(addBrand);
      if (shop.source) sources.add(shop.source);
      for (const [b, ms] of Object.entries(shop.models || {})) inline[dir.get(b)] = ms;
    }
    const brandList = [...brands.keys()].sort((a, b) => a.localeCompare(b, "fr"));
    const refs = {};
    let refCount = unbranded.size;
    if (unbranded.size) refs[""] = [...unbranded].sort((x, y) => x.localeCompare(y, "fr")).join("\n");
    for (const b of brandList) {
      const set = [...brands.get(b)].sort((x, y) => x.localeCompare(y, "fr"));
      if (set.length) { refs[b] = set.join("\n"); refCount += set.length; }
    }
    refsByType[def.id] = refs;
    const { sp, lm, legacy: _l, ...rest } = def;
    types.push({ ...rest, sources: [...sources], brands: brandList, ...(Object.keys(inline).length && { models: inline }), refCount });
  }

  // Fichiers de modèles : gros types à part, petits types regroupés par domaine
  fs.rmSync(MODEL_DIR, { recursive: true, force: true });
  fs.mkdirSync(MODEL_DIR, { recursive: true });
  const files = {};
  for (const t of types) {
    if (!t.refCount) continue;
    const file = t.refCount >= OWN_FILE_MIN ? t.id : `${t.category}-divers`;
    (files[file] ||= {})[t.id] = refsByType[t.id];
    t.refFile = file;
  }
  for (const [file, content] of Object.entries(files)) fs.writeFileSync(path.join(MODEL_DIR, `${file}.json`), JSON.stringify(content));

  const cars = vehicleMakes("voitures.txt");
  const motos = vehicleMakes("motos.txt");
  const out = `/* Les Pages Bleues — catalogue du matériel (fichier généré par tools/materiel.js, ne pas modifier à la main).
   Sources : Spareka (références d'appareils), Boulanger, Leroy Merlin, Micromania, catcar.info, MotoBook. Voir tools/data/.
   Les références et modèles de chaque type sont dans assets/data/modeles/<refFile>.json, chargés à la demande. */

const MATERIEL_SOURCES = ${JSON.stringify(SOURCES)};

const APPLIANCE_TYPES = ${JSON.stringify(types)};

const CAR_MAKES = ${JSON.stringify(cars)};

const MOTO_MAKES = ${JSON.stringify(motos)};
`;
  fs.writeFileSync(path.join(ROOT_DIR, "assets/js/materiel-data.js"), out);
  const nb = types.reduce((n, t) => n + t.brands.length, 0);
  const nr = types.reduce((n, t) => n + t.refCount, 0);
  const nm = cars.reduce((n, c) => n + c.models.length, 0);
  const nmo = motos.reduce((n, c) => n + c.models.length, 0);
  console.log(`matériel : ${types.length} types d'équipement, ${nb} marques, ${nr} modèles et références (${Object.keys(files).length} fichiers), ` +
    `${cars.length} marques de voitures (${nm} modèles), ${motos.length} marques de motos (${nmo} modèles)`);
}

if (require.main === module) build();
module.exports = { build };
