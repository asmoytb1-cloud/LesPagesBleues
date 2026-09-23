/* Les Pages Bleues — génération des pages statiques des fiches, du plan du site et de robots.txt.
   Usage : node tools/build.js      (à relancer après toute modification de assets/js/data.js)
   Aucune dépendance : seulement Node.js (version 18 ou plus). */

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT_DIR = path.resolve(__dirname, "..");
const SITE = "https://asmoytb1-cloud.github.io/LesPagesBleues/";
const OUT = path.join(ROOT_DIR, "fiches");

// Charge les scripts du site dans un bac à sable, comme le ferait le navigateur (sans DOM)
const sandbox = { window: { LPB_ROOT: "../" }, navigator: {}, console, URLSearchParams };
vm.createContext(sandbox);
for (const f of ["data.js", "common.js", "guide-view.js"]) {
  vm.runInContext(fs.readFileSync(path.join(ROOT_DIR, "assets/js", f), "utf8") + "\n;globalThis.__ok = true;", sandbox, { filename: f });
}
const { GUIDES, REVIEWED_ON, guidePageHTML, relatedGuides, categoryById, escapeHtml } = vm.runInContext(
  "({ GUIDES, REVIEWED_ON, guidePageHTML, relatedGuides, categoryById, escapeHtml })", sandbox);

const esc = s => escapeHtml(s);
const iso = m => m ? `PT${Math.floor(m / 60) ? Math.floor(m / 60) + "H" : ""}${m % 60 ? m % 60 + "M" : ""}` : undefined;

function jsonLd(g) {
  const c = categoryById(g.category);
  const url = `${SITE}fiches/${g.id}.html`;
  const img = `${SITE}assets/img/photos/${g.photo || c.photo || (c.parent && categoryById(c.parent).photo)}.webp`;
  const howto = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: g.title,
    description: g.summary,
    inLanguage: "fr-FR",
    url,
    image: img,
    ...(g.minutes && { totalTime: iso(g.minutes) }),
    ...(g.savings && { estimatedCost: { "@type": "MonetaryAmount", currency: "EUR", value: "0" } }),
    tool: (g.tools || []).map(t => ({ "@type": "HowToTool", name: t })),
    supply: (g.parts || []).map(p => ({ "@type": "HowToSupply", name: p })),
    step: g.steps.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: s.title, text: s.text, url: `${url}#etapes` })),
    dateModified: REVIEWED_ON
  };
  delete howto.estimatedCost; // l'économie n'est pas un coût : on ne la déclare pas
  const crumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: SITE },
      { "@type": "ListItem", position: 2, name: c.name, item: `${SITE}guides.html?cat=${c.id}` },
      { "@type": "ListItem", position: 3, name: g.title, item: url }
    ]
  };
  return [howto, crumbs].map(o => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, "\\u003c")}</script>`).join("\n  ");
}

function page(g) {
  const c = categoryById(g.category);
  const photo = g.photo || c.photo || (c.parent && categoryById(c.parent).photo);
  const title = `${g.title} : guide pas à pas — Les Pages Bleues`;
  const desc = `${g.summary} Difficulté : ${g.difficulty.toLowerCase()}, durée : ${g.duration}.`;
  const body = guidePageHTML(g, { related: relatedGuides(g, GUIDES) });
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(desc)}">
  <meta name="theme-color" content="#050b18">
  <script>(function(){try{var t=JSON.parse(localStorage.getItem("lpb-theme"));if(t)document.documentElement.dataset.theme=t}catch(e){}})()</script>
  <link rel="icon" href="../assets/img/favicon.svg" type="image/svg+xml">
  <link rel="manifest" href="../manifest.webmanifest">
  <link rel="apple-touch-icon" href="../assets/img/icon-180.png">
  <link rel="canonical" href="${SITE}fiches/${g.id}.html">
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="Les Pages Bleues">
  <meta property="og:title" content="${esc(g.title)}">
  <meta property="og:description" content="${esc(g.summary)}">
  <meta property="og:image" content="${SITE}assets/img/photos/${photo}.webp">
  <meta property="og:locale" content="fr_FR">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@600&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../assets/css/style.css">
  ${jsonLd(g)}
</head>
<body>
  <header id="site-header"></header>
  <main id="main" tabindex="-1">
    <div id="guide">${body}</div>
  </main>
  <footer id="site-footer"></footer>

  <script>window.LPB_ROOT = "../"; window.LPB_GUIDE_ID = ${JSON.stringify(g.id)};</script>
  <script src="../assets/js/data.js"></script>
  <script src="../assets/js/common.js"></script>
  <script src="../assets/js/guide-view.js"></script>
  <script src="../assets/js/guide.js"></script>
</body>
</html>
`;
}

fs.mkdirSync(OUT, { recursive: true });
const keep = new Set(GUIDES.map(g => `${g.id}.html`));
for (const f of fs.readdirSync(OUT)) if (f.endsWith(".html") && !keep.has(f)) fs.unlinkSync(path.join(OUT, f));
for (const g of GUIDES) fs.writeFileSync(path.join(OUT, `${g.id}.html`), page(g));

const pages = ["", "categories.html", "guides.html", "diagnostic.html", "communaute.html", "a-propos.html", "ajouter.html", "mentions-legales.html", "confidentialite.html"];
const urls = [
  ...pages.map(p => `  <url><loc>${SITE}${p}</loc><lastmod>${REVIEWED_ON}</lastmod></url>`),
  ...GUIDES.map(g => `  <url><loc>${SITE}fiches/${g.id}.html</loc><lastmod>${REVIEWED_ON}</lastmod></url>`)
];
fs.writeFileSync(path.join(ROOT_DIR, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`);
fs.writeFileSync(path.join(ROOT_DIR, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}sitemap.xml\n`);

console.log(`${GUIDES.length} fiches générées dans /fiches, sitemap.xml (${urls.length} adresses) et robots.txt`);
