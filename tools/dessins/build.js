/* Les Pages Bleues — écrit les schémas redessinés dans le pack source tools/schemas/svg/ (gabarit du pack).
   Usage : node tools/dessins/build.js   puis   node tools/illustrations.js   (qui lit tools/schemas par défaut)
   Les dessins sont dans les fichiers de ce dossier, un par domaine. */
const fs = require("fs");
const path = require("path");
const { packSvg } = require("./lib.js");

const ROOT = path.resolve(__dirname, "../..");
const manifest = JSON.parse(fs.readFileSync(path.join(ROOT, "tools/schemas/manifest.json"), "utf8"));
const files = fs.readdirSync(__dirname).filter(f => f.endsWith(".js") && !["lib.js", "build.js"].includes(f)).sort();
let n = 0;
for (const f of files) {
  const defs = require(path.join(__dirname, f));
  for (const [id, def] of Object.entries(defs)) {
    const item = manifest.find(m => m.id === id);
    if (!item) throw new Error(`${f} : fiche inconnue ${id}`);
    if (!def.d?.length || !def.r?.length) throw new Error(`${id} : dessin ou repères manquants`);
    fs.writeFileSync(path.join(ROOT, "tools/schemas/svg", id + ".svg"), packSvg(item.title, def));
    n++;
  }
}
console.log(`${n} schémas redessinés écrits dans tools/schemas/svg`);
