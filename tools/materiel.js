/* Les Pages Bleues — génère le catalogue du matériel à partir de tools/data/ :
     types.json             types d'équipement (domaine, groupe), rédigés par Les Pages Bleues
     marques.json           marques courantes par famille, rédigées par Les Pages Bleues (noms seuls)
     modeles.json           modèles courants d'appareils, rédigés par Les Pages Bleues
     vehicules.txt          marques et modèles courants de voitures et de motos, rédigés par Les Pages Bleues
     wikidata-modeles.json  (facultatif) modèles issus de Wikidata, CC0 / domaine public : tools/fetch-wikidata.py
   Aucune base de données d'un tiers n'est reprise (droit du producteur de bases de données, art. L342-1 du code de
   la propriété intellectuelle) : marques et modèles sont des noms publics, et le formulaire accepte toute autre saisie.
   Sorties :
     assets/js/materiel-data.js   types, marques et modèles, voitures, motos (chargé par les pages)
   Lancé automatiquement par tools/build.js. */

const fs = require("fs");
const path = require("path");

const ROOT_DIR = path.resolve(__dirname, "..");
const DATA = path.join(__dirname, "data");
const MODEL_DIR = path.join(ROOT_DIR, "assets/data/modeles");   // ancien emplacement des références : supprimé

const SOURCES = {
  lpb: { name: "Les Pages Bleues (liste rédigée par l'équipe, complétée par vos saisies)", url: "a-propos.html#methode" },
  wikidata: { name: "Wikidata (CC0)", url: "https://www.wikidata.org/wiki/Wikidata:Licensing" }
};
// Marques de véhicules proposées (noms publics) ; les modèles viennent de Wikidata
const CAR_BRANDS = ["Abarth", "Alfa Romeo", "Alpine", "Audi", "BMW", "BYD", "Citroën", "Cupra", "Dacia", "DS Automobiles", "Fiat", "Ford",
  "Honda", "Hyundai", "Jaguar", "Jeep", "Kia", "Land Rover", "Lexus", "Mazda", "Mercedes-Benz", "MG", "Mini", "Mitsubishi", "Nissan", "Opel",
  "Peugeot", "Polestar", "Porsche", "Renault", "Seat", "Škoda", "Smart", "SsangYong", "Subaru", "Suzuki", "Tesla", "Toyota", "Volkswagen", "Volvo"];
const MOTO_BRANDS = ["Aprilia", "BMW", "Ducati", "Harley-Davidson", "Honda", "Husqvarna", "Kawasaki", "KTM", "Kymco", "Moto Guzzi",
  "MV Agusta", "Peugeot", "Piaggio", "Royal Enfield", "Suzuki", "SYM", "Triumph", "Vespa", "Yamaha", "Zero Motorcycles"];
const MIN_YEAR = 1985;   // véhicules plus anciens : saisie libre

const readJSON = f => JSON.parse(fs.readFileSync(path.join(DATA, f), "utf8"));
const key = s => String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "");
const byName = (a, b) => a.localeCompare(b, "fr", { numeric: true });

// Nom du modèle sans la marque en tête (« Renault Clio » → « Clio »)
function shortName(model, brand) {
  const words = brand.split(/\s+/);
  let name = model.trim();
  for (const w of [brand, ...words]) if (key(name.slice(0, w.length)) === key(w) && /\s/.test(name[w.length] || "")) { name = name.slice(w.length).trim(); break; }
  return name || model.trim();
}
const usable = m => !/\b(concept|prototype|study|étude|show car)\b/i.test(m.name) && !/^Q\d+$/.test(m.name);

// Wikidata : { brand, name, from, to } → par marque connue
function modelsByBrand(rows, brands, vehicles) {
  const wanted = new Map(brands.map(b => [key(b), b]));
  const out = new Map();
  for (const r of rows || []) {
    const brand = wanted.get(key(r.brand));
    if (!brand || !usable(r)) continue;
    if (vehicles && !((r.from && r.from >= MIN_YEAR) || (r.to && r.to >= MIN_YEAR + 10))) continue;
    const name = shortName(r.name, brand);
    if (!out.has(brand)) out.set(brand, new Map());
    const list = out.get(brand), k = key(name);
    const prev = list.get(k);
    if (!prev || (!prev.from && r.from)) list.set(k, { name, ...(r.from && { from: r.from }), ...(r.to && { to: r.to }) });
  }
  return out;
}

// vehicules.txt : « [voiture] », « = Marque », puis un modèle par ligne
function ownVehicles() {
  const out = { voiture: new Map(), moto: new Map() };
  let kind = null, make = null;
  for (const line of fs.readFileSync(path.join(DATA, "vehicules.txt"), "utf8").split("\n")) {
    const l = line.trim();
    if (!l || (l.startsWith("#") && l.length > 2 && l[1] === " ")) continue;
    if (/^\[(voiture|moto)\]$/.test(l)) { kind = l.slice(1, -1); continue; }
    if (l.startsWith("= ")) { make = l.slice(2).trim(); out[kind].set(make, new Map()); continue; }
    out[kind].get(make).set(key(l), { name: l });
  }
  return out;
}
function vehicleMakes(own, rows, brands) {
  const by = modelsByBrand(rows, brands, true);
  for (const [b, list] of by) {                       // Wikidata complète la liste et apporte les années
    if (!own.has(b)) own.set(b, new Map());
    for (const [k, m] of list) own.get(b).set(k, { ...own.get(b).get(k), ...m });
  }
  return [...own].filter(([, l]) => l.size).map(([name, l]) => ({ name, models: [...l.values()].sort((x, y) => byName(x.name, y.name)) }))
    .sort((a, b) => byName(a.name, b.name));
}

function build() {
  const typesDef = readJSON("types.json").types;
  const marques = readJSON("marques.json").groups;
  const wd = fs.existsSync(path.join(DATA, "wikidata-modeles.json")) ? readJSON("wikidata-modeles.json") : {};

  const own = readJSON("modeles.json");
  const types = typesDef.map(def => {
    const { sp, lm, legacy, ...rest } = def;
    const t = { ...rest, sources: ["lpb"], brands: [...new Set(marques[def.group] || [])].sort(byName) };
    const models = new Map(Object.entries(own[def.id] || {}).map(([b, l]) => [b, new Set(l)]));
    const by = wd[def.id] && modelsByBrand(wd[def.id], t.brands, false);
    if (by && by.size) {
      for (const [b, list] of by) { if (!models.has(b)) models.set(b, new Set()); for (const m of list.values()) models.get(b).add(m.name); }
      t.sources.push("wikidata");
    }
    if (models.size) t.models = Object.fromEntries([...models].map(([b, l]) => [b, [...l].sort(byName)]).sort((a, b) => byName(a[0], b[0])));
    t.refCount = Object.values(t.models || {}).reduce((n, l) => n + l.length, 0);
    return t;
  });

  fs.rmSync(MODEL_DIR, { recursive: true, force: true });   // anciennes références de boutiques : plus publiées

  const mine = ownVehicles();
  const cars = vehicleMakes(mine.voiture, wd.voiture, CAR_BRANDS);
  const motos = vehicleMakes(mine.moto, wd.moto, MOTO_BRANDS);
  const out = `/* Les Pages Bleues — catalogue du matériel (fichier généré par tools/materiel.js, ne pas modifier à la main).
   Marques et modèles : listes rédigées par Les Pages Bleues (tools/data/), complétées par Wikidata (CC0) quand le fichier est présent. */

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
  console.log(`matériel : ${types.length} types d'équipement, ${nb} marques, ${nr} modèles d'appareils, ` +
    `${cars.length} marques de voitures (${nm} modèles), ${motos.length} marques de motos (${nmo} modèles)`);
}

if (require.main === module) build();
module.exports = { build };
