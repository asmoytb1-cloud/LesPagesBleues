/* Les Pages Bleues — logo et icônes générés à partir d'un seul dessin (la page au coin replié, clé découpée).
   Usage : node tools/icons.js   (nécessite Playwright, comme les tests ; à relancer seulement si le logo change)
   Produit : assets/img/logo.svg, favicon.svg, icon-180/192/512.png, icon-maskable-512.png, og-image.png
             et les icônes de l'application iPhone (claire, sombre, teintée). */

const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");

const ROOT = path.resolve(__dirname, "..");
const IMG = path.join(ROOT, "assets/img");
const IOS = path.join(ROOT, "ios/LesPagesBleues/Assets.xcassets/AppIcon.appiconset");

// Le dessin, dans un carré de 48 : page arrondie, coin replié, clé découpée (masque : vraie transparence)
const PAGE = "M14 4H30L40 14V38A6 6 0 0 1 34 44H14A6 6 0 0 1 8 38V10A6 6 0 0 1 14 4Z";
const FOLD = "M30 4V11A3 3 0 0 0 33 14H40Z";
const WRENCH_MASK = id => `<mask id="${id}" maskUnits="userSpaceOnUse" x="0" y="0" width="48" height="48"><rect width="48" height="48" fill="#fff"/>` +
  `<g transform="translate(23.5 26.5) rotate(45)"><circle cx="-8" cy="0" r="6" fill="#000"/><path d="M-4 0H12" stroke="#000" stroke-width="4.6" stroke-linecap="round"/>` +
  `<rect x="-16" y="-2.4" width="8.6" height="4.8" fill="#fff"/></g></mask>`;
const mark = ({ page, fold, id = "lpb-cut", extra = "" }) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"${extra}><defs>${WRENCH_MASK(id)}</defs>` +
  `<path d="${PAGE}" fill="${page}" mask="url(#${id})"/><path d="${FOLD}" fill="${fold}"/></svg>`;

const LIGHT = { page: "#0e1b32", fold: "#2f6bff" };
const DARK = { page: "#f4f7fb", fold: "#4c86ff" };

// Fichiers vectoriels
fs.writeFileSync(path.join(IMG, "logo.svg"), mark(LIGHT) + "\n");
fs.writeFileSync(path.join(IMG, "favicon.svg"),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><style>.p{fill:#0e1b32}.f{fill:#2f6bff}` +
  `@media (prefers-color-scheme:dark){.p{fill:#f4f7fb}.f{fill:#4c86ff}}</style><defs>${WRENCH_MASK("c")}</defs>` +
  `<path class="p" d="${PAGE}" mask="url(#c)"/><path class="f" d="${FOLD}"/></svg>\n`);

const font = `@font-face{font-family:Inter;src:url(data:font/woff2;base64,${fs.readFileSync(path.join(ROOT, "assets/fonts/inter-latin.woff2")).toString("base64")}) format("woff2");font-weight:400 800}`;
// Icône carrée : fond, puis le dessin centré (scale = part de la largeur occupée par la page)
const iconHtml = (size, { bg, colors, scale = .62, radius = 0 }) => `<!doctype html><html><head><style>
  html,body{margin:0;width:${size}px;height:${size}px;background:transparent}
  .i{width:${size}px;height:${size}px;display:grid;place-items:center;background:${bg};border-radius:${radius}px}
  .i svg{width:${Math.round(size * scale / (32 / 48))}px;height:auto}
</style></head><body><div class="i">${mark(colors)}</div></body></html>`;

const LIGHT_BG = "linear-gradient(180deg,#ffffff 0%,#eaf1fc 100%)";
const DARK_BG = "linear-gradient(180deg,#10203f 0%,#0a1426 100%)";

const OG = `<!doctype html><html><head><style>${font}
  html,body{margin:0;width:1200px;height:630px}
  body{display:flex;align-items:center;gap:64px;padding:0 96px;box-sizing:border-box;background:#f4f7fb;font-family:Inter,sans-serif;color:#0e1b32}
  svg{width:250px;flex:none}
  h1{margin:0;font-size:84px;font-weight:800;letter-spacing:-.035em;line-height:1}
  h1 span{color:#1f5fd6}
  p{margin:22px 0 0;font-size:38px;font-weight:600;color:#3c4a63;letter-spacing:-.01em}
  small{display:block;margin-top:30px;font-size:26px;color:#5a6880;font-weight:500}
</style></head><body>${mark(LIGHT)}<div><h1>Les Pages <span>Bleues</span></h1>
  <p>Réparer. Comprendre. Transmettre.</p><small>Guides de réparation et d'entretien, en français.</small></div></body></html>`;

(async () => {
  const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
  const shot = async (html, w, h, file, transparent = false) => {
    const p = await browser.newPage({ viewport: { width: w, height: h } });
    await p.setContent(html, { waitUntil: "load" });
    await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: file, omitBackground: transparent });
    await p.close();
    console.log("écrit", path.relative(ROOT, file));
  };
  // Site et application web (fond clair, l'appareil arrondit lui-même les coins)
  await shot(iconHtml(180, { bg: LIGHT_BG, colors: LIGHT }), 180, 180, path.join(IMG, "icon-180.png"));
  await shot(iconHtml(192, { bg: LIGHT_BG, colors: LIGHT }), 192, 192, path.join(IMG, "icon-192.png"));
  await shot(iconHtml(512, { bg: LIGHT_BG, colors: LIGHT }), 512, 512, path.join(IMG, "icon-512.png"));
  // Icône « maskable » : le dessin reste dans la zone sûre (cercle de 80 %)
  await shot(iconHtml(512, { bg: LIGHT_BG, colors: LIGHT, scale: .5 }), 512, 512, path.join(IMG, "icon-maskable-512.png"));
  await shot(OG, 1200, 630, path.join(IMG, "og-image.png"));
  // Application iPhone : icône claire, sombre (fond transparent demandé par Apple) et teintée (niveaux de gris)
  await shot(iconHtml(1024, { bg: LIGHT_BG, colors: LIGHT }), 1024, 1024, path.join(IOS, "AppIcon.png"));
  await shot(iconHtml(1024, { bg: "transparent", colors: DARK }), 1024, 1024, path.join(IOS, "AppIcon-dark.png"), true);
  await shot(iconHtml(1024, { bg: "transparent", colors: { page: "#ffffff", fold: "#b8b8b8" } }), 1024, 1024, path.join(IOS, "AppIcon-tinted.png"), true);
  fs.writeFileSync(path.join(IOS, "Contents.json"), JSON.stringify({
    images: [
      { filename: "AppIcon.png", idiom: "universal", platform: "ios", size: "1024x1024" },
      { appearances: [{ appearance: "luminosity", value: "dark" }], filename: "AppIcon-dark.png", idiom: "universal", platform: "ios", size: "1024x1024" },
      { appearances: [{ appearance: "luminosity", value: "tinted" }], filename: "AppIcon-tinted.png", idiom: "universal", platform: "ios", size: "1024x1024" }
    ],
    info: { author: "xcode", version: 1 }
  }, null, 2) + "\n");
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
