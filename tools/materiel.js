/* Les Pages Bleues — génère assets/js/materiel-data.js (types d'équipement, marques, voitures, motos)
   à partir de tools/data/ :
     electromenager-marques.json  marques par type d'appareil, relevées sur spareka.fr
     boutiques.json               autres types d'équipement et leurs marques (Boulanger, Leroy Merlin, Micromania)
     voitures.txt                 marques, modèles et années de production, relevés sur catcar.info
     motos.txt                    marques, modèles et millésimes de motos, relevés sur motobook.app
   Lancé automatiquement par tools/build.js. */

const fs = require("fs");
const path = require("path");

const ROOT_DIR = path.resolve(__dirname, "..");
const DATA = path.join(__dirname, "data");

/* Types d'appareils électroménagers. `spareka` = rubrique d'où viennent les marques ;
   `diag` = nom de l'appareil dans le diagnostic guidé (diagnostics-data.js). */
const TYPES = [
  { id: "lave-linge", name: "Lave-linge", icon: "washer", group: "Linge", spareka: "lave-linge", diag: "Lave-linge" },
  { id: "seche-linge", name: "Sèche-linge", icon: "washer", group: "Linge", spareka: "seche-linge" },
  { id: "fer-a-repasser", name: "Fer ou centrale vapeur", icon: "plug", group: "Linge", spareka: "centrale-vapeur-fer-a-repasser" },
  { id: "lave-vaisselle", name: "Lave-vaisselle", icon: "washer", group: "Cuisine", spareka: "lave-vaisselle", diag: "Lave-vaisselle" },
  { id: "refrigerateur", name: "Réfrigérateur", icon: "fridge", group: "Froid", spareka: "refrigerateur", diag: "Réfrigérateur" },
  { id: "congelateur", name: "Congélateur", icon: "fridge", group: "Froid", spareka: "congelateur", diag: "Réfrigérateur" },
  { id: "cave-a-vin", name: "Cave à vin", icon: "fridge", group: "Froid", spareka: "cave-a-vin" },
  { id: "four", name: "Four ou cuisinière", icon: "oven", group: "Cuisson", spareka: "four-cuisiniere" },
  { id: "plaque-de-cuisson", name: "Plaque de cuisson", icon: "oven", group: "Cuisson", spareka: "plaques-de-cuisson" },
  { id: "micro-ondes", name: "Micro-ondes", icon: "oven", group: "Cuisson", spareka: "micro-ondes" },
  { id: "hotte", name: "Hotte", icon: "fan", group: "Cuisson", spareka: "hotte" },
  { id: "cafetiere", name: "Cafetière ou expresso", icon: "coffee", group: "Petit électroménager", spareka: "cafetiere-et-expresso", diag: "Cafetière" },
  { id: "bouilloire", name: "Bouilloire", icon: "coffee", group: "Petit électroménager", spareka: "bouilloire" },
  { id: "grille-pain", name: "Grille-pain", icon: "plug", group: "Petit électroménager", spareka: "grille-pain" },
  { id: "robot-de-cuisine", name: "Robot de cuisine", icon: "plug", group: "Petit électroménager", spareka: "robot-de-cuisine" },
  { id: "machine-a-pain", name: "Machine à pain", icon: "plug", group: "Petit électroménager", spareka: "machine-a-pain" },
  { id: "friteuse", name: "Friteuse", icon: "plug", group: "Petit électroménager", spareka: "friteuse" },
  { id: "cocotte", name: "Cocotte-minute ou mijoteur", icon: "plug", group: "Petit électroménager", spareka: "cocotte-minute-mijoteur" },
  { id: "extracteur-de-jus", name: "Extracteur de jus", icon: "plug", group: "Petit électroménager", spareka: "extracteur-de-jus" },
  { id: "raclette-grill", name: "Raclette, grill ou plancha", icon: "plug", group: "Petit électroménager", spareka: "raclette-grill" },
  { id: "aspirateur", name: "Aspirateur", icon: "plug", group: "Entretien de la maison", spareka: "aspirateur", diag: "Aspirateur" },
  { id: "aspirateur-robot", name: "Aspirateur robot", icon: "plug", group: "Entretien de la maison", spareka: "aspirateur-robot" },
  { id: "nettoyeur-vapeur", name: "Nettoyeur vapeur", icon: "plug", group: "Entretien de la maison", spareka: "nettoyeur-vapeur-pression" },
  { id: "climatiseur", name: "Climatiseur", icon: "fan", group: "Confort", spareka: "climatiseur" },
  { id: "ventilateur", name: "Ventilateur", icon: "fan", group: "Confort", spareka: "ventilateur" },
  { id: "deshumidificateur", name: "Déshumidificateur", icon: "fan", group: "Confort", spareka: "deshumidificateur" },
  { id: "chauffe-eau", name: "Chauffe-eau", icon: "plug", group: "Confort", spareka: "chauffe-eau" },
  { id: "broyeur", name: "Broyeur sous évier", icon: "plug", group: "Confort", spareka: "broyeur-sous-evier" },
  { id: "seche-cheveux", name: "Sèche-cheveux ou brosse", icon: "plug", group: "Soin", spareka: "seche-cheveux-brosse-coiffante" },
  { id: "rasoir", name: "Rasoir ou tondeuse", icon: "plug", group: "Soin", spareka: "rasoir-tondeuse" }
];

// Écriture des marques : « DE DIETRICH » → « De Dietrich », sigles courts gardés en capitales
const SPECIAL = { "DELONGHI": "De'Longhi", "KITCHENAID": "KitchenAid", "IROBOT": "iRobot", "LG": "LG", "AEG": "AEG", "SEB": "SEB",
  "WPRO": "Wpro", "SMEG": "Smeg", "KÜPPERSBUSCH": "Küppersbusch", "CANDY / HOOVER": "Candy / Hoover", "HOTPOINT ARISTON": "Hotpoint-Ariston",
  "GENERAL ELECTRIC": "General Electric", "RUSSELL HOBBS": "Russell Hobbs", "OK": "OK" };
function brandName(raw) {
  if (SPECIAL[raw]) return SPECIAL[raw];
  return raw.split(/(\s+|-|\/|&)/).map(w => {
    if (!/[A-ZÀ-Ý]/.test(w)) return w;
    if (w.length <= 3 && !/[AEIOUY]/.test(w.slice(1))) return w;          // sigles : CDA, BSK, PKM…
    return w.charAt(0) + w.slice(1).toLowerCase();
  }).join("");
}

const SOURCES = {
  spareka: { name: "Spareka", url: "https://www.spareka.fr/" },
  boulanger: { name: "Boulanger", url: "https://www.boulanger.com/" },
  leroymerlin: { name: "Leroy Merlin", url: "https://www.leroymerlin.fr/" },
  micromania: { name: "Micromania", url: "https://www.micromania.fr/" },
  catcar: { name: "catcar.info", url: "https://www.catcar.info/en/" },
  motobook: { name: "MotoBook", url: "https://motobook.app/" }
};

function applianceTypes() {
  const raw = JSON.parse(fs.readFileSync(path.join(DATA, "electromenager-marques.json"), "utf8"));
  const electro = TYPES.map(t => {
    const brands = [...new Set((raw[t.spareka] || []).map(brandName))].sort((a, b) => a.localeCompare(b, "fr"));
    const { spareka, ...rest } = t;
    return { ...rest, category: "electromenager", source: "spareka", brands };
  });
  const shops = JSON.parse(fs.readFileSync(path.join(DATA, "boutiques.json"), "utf8")).types.map(t => ({
    ...t, brands: [...t.brands].sort((a, b) => a.localeCompare(b, "fr"))
  }));
  return [...electro, ...shops];
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

function build() {
  const types = applianceTypes();
  const cars = vehicleMakes("voitures.txt");
  const motos = vehicleMakes("motos.txt");
  const out = `/* Les Pages Bleues — catalogue du matériel (fichier généré par tools/materiel.js, ne pas modifier à la main).
   Marques d'électroménager : spareka.fr. Autres équipements : Boulanger, Leroy Merlin, Micromania.
   Voitures : catcar.info (catalogues Europe). Motos : motobook.app. Voir tools/data/. */

const MATERIEL_SOURCES = ${JSON.stringify(SOURCES)};

const APPLIANCE_TYPES = ${JSON.stringify(types)};

const CAR_MAKES = ${JSON.stringify(cars)};

const MOTO_MAKES = ${JSON.stringify(motos)};
`;
  fs.writeFileSync(path.join(ROOT_DIR, "assets/js/materiel-data.js"), out);
  const nb = types.reduce((n, t) => n + t.brands.length, 0);
  const nm = cars.reduce((n, c) => n + c.models.length, 0);
  const nmo = motos.reduce((n, c) => n + c.models.length, 0);
  console.log(`matériel : ${types.length} types d'équipement (${nb} marques), ${cars.length} marques de voitures (${nm} modèles), ${motos.length} marques de motos (${nmo} modèles)`);
}

if (require.main === module) build();
module.exports = { build };
