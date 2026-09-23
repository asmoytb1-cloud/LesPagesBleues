/* Les Pages Bleues — génération des pages statiques des fiches, du plan du site et de robots.txt.
   Usage : node tools/build.js      (à relancer après toute modification de assets/js/data.js)
   Aucune dépendance : seulement Node.js (version 18 ou plus). */

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT_DIR = path.resolve(__dirname, "..");
require("./materiel.js").build();   // catalogue du matériel (assets/js/materiel-data.js)
const SITE = "https://asmoytb1-cloud.github.io/LesPagesBleues/";
const OUT = path.join(ROOT_DIR, "fiches");
const CAT_OUT = path.join(ROOT_DIR, "categories");

// Charge les scripts du site dans un bac à sable, comme le ferait le navigateur (sans DOM)
const sandbox = { window: { LPB_ROOT: "../" }, navigator: {}, console, URLSearchParams };
vm.createContext(sandbox);
for (const f of ["data.js", "common.js", "guide-view.js", "diagnostics-data.js", "materiel-data.js"]) {
  vm.runInContext(fs.readFileSync(path.join(ROOT_DIR, "assets/js", f), "utf8") + "\n;globalThis.__ok = true;", sandbox, { filename: f });
}
const { GUIDES, CATEGORIES, REVIEWED_ON, guidePageHTML, relatedGuides, categoryById, escapeHtml, guideRow, inCategory, subCategories, icon,
  DIAGNOSTICS, APPLIANCE_TYPES, MATERIEL_SOURCES, guidesForType, imgSrc, photoUrl } = vm.runInContext(
  "({ GUIDES, CATEGORIES, REVIEWED_ON, guidePageHTML, relatedGuides, categoryById, escapeHtml, guideRow, inCategory, subCategories, icon, DIAGNOSTICS, APPLIANCE_TYPES, MATERIEL_SOURCES, guidesForType, imgSrc, photoUrl })", sandbox);

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


/* En-tête <head> commun aux pages générées */
function head({ title, desc, canonical, image, type = "website", extra = "" }) {
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
  <link rel="canonical" href="${canonical}">
  <meta property="og:type" content="${type}">
  <meta property="og:site_name" content="Les Pages Bleues">
  <meta property="og:title" content="${esc(title.split(" — ")[0])}">
  <meta property="og:description" content="${esc(desc)}">
  <meta property="og:image" content="${image}">
  <meta property="og:locale" content="fr_FR">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="preload" href="../assets/fonts/inter-latin.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="../assets/css/style.css">
  ${extra}
</head>`;
}

/* Page statique d'un domaine : liste de ses fiches, lisible sans JavaScript */
// Types d'équipement présentés sur la page d'un domaine (Auto / Moto : voiture et moto)
function typesOf(c) {
  if (c.id === "automobile") return [{ id: "voiture", name: "Voiture", icon: "car", group: "Véhicules", source: "catcar" }, { id: "moto", name: "Moto", icon: "moto", group: "Véhicules", source: "motobook" }];
  if (c.id === "moto") return [{ id: "moto", name: "Moto", icon: "moto", group: "Véhicules", source: "motobook" }];
  return APPLIANCE_TYPES.filter(t => t.category === c.id);
}

// Page d'introduction d'un domaine : présentation, équipements, pannes fréquentes, précautions
function categoryPage(c) {
  const guides = GUIDES.filter(g => inCategory(g, c.id));
  const parent = c.parent ? categoryById(c.parent) : null;
  const photo = c.photo || (parent && parent.photo) || "hero";
  const n = guides.length;
  const types = typesOf(c).map(t => ({ ...t, n: guidesForType(t.id).length })).sort((a, b) => (b.n > 0) - (a.n > 0));
  const subs = subCategories(c.id).filter(sc => !types.some(t => t.id === sc.id));   // Moto est déjà une tuile d'Auto / Moto
  const groups = [...new Set(types.map(t => t.group))];
  const diags = DIAGNOSTICS.filter(d => inCategory({ category: d.category }, c.id));
  const sources = [...new Set(types.map(t => t.source).filter(Boolean))].map(k => MATERIEL_SOURCES[k]).filter(Boolean);
  const plural = (k, w) => `${k} ${w}${k > 1 ? "s" : ""}`;
  const typeTile = t => `
          <a class="type-tile" href="${t.n ? `../guides.html?type=${t.id}` : `../materiel.html?type=${t.id}`}">
            <span class="type-ico">${icon(t.icon)}</span>
            <span><strong>${esc(t.name)}</strong><small>${t.n ? plural(t.n, "fiche") : "Pas encore de fiche · l'enregistrer"}</small></span>
          </a>`;
  const page = {
    "@context": "https://schema.org", "@type": "CollectionPage", name: c.name, description: c.intro || c.desc,
    url: `${SITE}categories/${c.id}.html`, isPartOf: { "@type": "WebSite", name: "Les Pages Bleues", url: SITE }
  };
  return `${head({
    title: `${c.name} : réparer soi-même, ${plural(n, "guide")} — Les Pages Bleues`,
    desc: (c.intro || c.desc).slice(0, 155),
    canonical: `${SITE}categories/${c.id}.html`, image: `${SITE}assets/img/photos/${photo}.webp`,
    extra: `<script type="application/ld+json">${JSON.stringify(page).replace(/</g, "\\u003c")}</script>`
  })}
<body>
  <header id="site-header"></header>
  <main id="main" tabindex="-1">
    <section class="cat-hero">
      <div class="container cat-hero-inner">
        <div class="cat-hero-text">
          <nav class="breadcrumb" aria-label="Fil d'Ariane">
            <a href="../index.html">${icon("home")} Accueil</a>${icon("chevron")}
            <a href="../categories.html">Catégories</a>${icon("chevron")}
            ${parent ? `<a href="${parent.id}.html">${esc(parent.name)}</a>${icon("chevron")}` : ""}
            <span aria-current="page">${esc(c.name)}</span>
          </nav>
          <h1>${esc(c.name)}</h1>
          <p class="lead">${esc(c.intro || c.desc)}</p>
          <ul class="cat-stats">
            <li><strong>${n}</strong> ${n > 1 ? "fiches vérifiées" : "fiche vérifiée"}</li>
            <li><strong>${diags.length}</strong> ${diags.length > 1 ? "pannes diagnostiquées" : "panne diagnostiquée"}</li>
            ${types.length ? `<li><strong>${types.length}</strong> ${types.length > 1 ? "types d'équipement" : "type d'équipement"}</li>` : ""}
          </ul>
          <div class="cat-actions">
            <a class="btn btn-primary btn-lg" href="../guides.html?cat=${c.id}">${icon("doc")} Voir les ${plural(n, "fiche")}</a>
            ${types.length ? `<a class="btn btn-ghost btn-lg" href="../materiel.html?${types.length === 1 ? `type=${types[0].id}` : `cat=${c.id}`}">${icon("box")} Enregistrer mon matériel</a>` : ""}
          </div>
        </div>
        <figure class="cat-hero-photo"><img ${imgSrc(photoUrl(photo), "(max-width: 900px) 100vw, 480px")} alt="" width="960" height="640" fetchpriority="high"></figure>
      </div>
    </section>

    <section class="section section-tight" id="cat-mine" hidden>
      <div class="container">
        <div class="section-head"><h2>Mon matériel <span class="accent">dans ce domaine</span></h2><a class="link-arrow" href="../materiel.html">Gérer ${icon("arrow")}</a></div>
        <div class="mat-strip" id="cat-mine-list"></div>
      </div>
    </section>

    ${types.length ? `<section class="section">
      <div class="container">
        <div class="section-head"><h2>Que voulez-vous <span class="accent">réparer ?</span></h2></div>
        ${groups.map(gr => `${groups.length > 1 ? `<h3 class="type-group">${esc(gr)}</h3>` : ""}
        <div class="type-grid">${types.filter(t => t.group === gr).map(typeTile).join("")}
        </div>`).join("")}
        ${sources.length ? `<p class="muted cat-sources">Types, marques et modèles d'après ${sources.map(s => `<a href="${s.url}" target="_blank" rel="noopener">${esc(s.name)}</a>`).join(", ")}.</p>` : ""}
      </div>
    </section>` : ""}

    ${subs.length ? `<section class="section${types.length ? " section-tight" : ""}">
      <div class="container">
        <div class="section-head"><h2>${c.id === "autres" ? "Les domaines" : "Sous-domaines"}</h2></div>
        <div class="cat-small-grid">${subs.map(sc => `
          <a class="cat-small" href="${sc.id}.html">${icon(sc.icon)}<strong>${esc(sc.name)}</strong><small>${plural(GUIDES.filter(g => inCategory(g, sc.id)).length, "fiche")}</small></a>`).join("")}</div>
      </div>
    </section>` : ""}

    <section class="section section-tight">
      <div class="container cat-two">
        <div class="card">
          <h2>${icon("stethoscope")} Pannes fréquentes</h2>
          ${diags.length ? `<ul class="diag-links">${diags.map(d => `
            <li><a href="../diagnostic.html?s=${d.id}">${esc(d.title)}${icon("chevron")}</a></li>`).join("")}</ul>`
          : `<p class="muted">Pas encore de diagnostic guidé dans ce domaine. Décrivez votre panne : le diagnostic cherchera parmi toutes les fiches.</p>`}
          <p style="margin-top:12px"><a class="btn btn-ghost btn-sm" href="../diagnostic.html">${icon("stethoscope")} Décrire ma panne</a></p>
        </div>
        <div class="card">
          <h2>${icon("shield")} Avant de commencer</h2>
          <ul class="check-list">${(c.tips || []).map(t => `<li>${icon("check")}<span>${esc(t)}</span></li>`).join("")}</ul>
        </div>
      </div>
    </section>

    <section class="section section-tight">
      <div class="container">
        <div class="ask-band">
          ${icon("chat")}
          <div><strong>Vous connaissez une réparation qui manque ?</strong><small>Partagez-la : elle aidera les prochains à ne pas jeter.</small></div>
          <div class="btns">
            <a class="btn btn-ghost" href="../communaute.html?ask=1">Poser une question</a>
            <a class="btn btn-primary" href="../ajouter.html">Partager une fiche</a>
          </div>
        </div>
      </div>
    </section>
  </main>
  <footer id="site-footer"></footer>

  <script>window.LPB_ROOT = "../";</script>
  <script src="../assets/js/data.js"></script>
  <script src="../assets/js/common.js"></script>
  <script>
    renderHeader("categories"); renderFooter();
    renderCategoryMine(${JSON.stringify(c.id)});
  </script>
</body>
</html>
`;
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
  <link rel="preload" href="../assets/fonts/inter-latin.woff2" as="font" type="font/woff2" crossorigin>
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
fs.mkdirSync(CAT_OUT, { recursive: true });
for (const f of fs.readdirSync(CAT_OUT)) if (f.endsWith(".html")) fs.unlinkSync(path.join(CAT_OUT, f));
for (const c of CATEGORIES) fs.writeFileSync(path.join(CAT_OUT, `${c.id}.html`), categoryPage(c));

const pages = ["", "categories.html", "guides.html", "diagnostic.html", "materiel.html", "communaute.html", "a-propos.html", "ajouter.html", "mentions-legales.html", "confidentialite.html"];
const urls = [
  ...pages.map(p => `  <url><loc>${SITE}${p}</loc><lastmod>${REVIEWED_ON}</lastmod></url>`),
  ...CATEGORIES.map(c => `  <url><loc>${SITE}categories/${c.id}.html</loc><lastmod>${REVIEWED_ON}</lastmod></url>`),
  ...GUIDES.map(g => `  <url><loc>${SITE}fiches/${g.id}.html</loc><lastmod>${REVIEWED_ON}</lastmod></url>`)
];
fs.writeFileSync(path.join(ROOT_DIR, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`);
fs.writeFileSync(path.join(ROOT_DIR, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}sitemap.xml\n`);

console.log(`${GUIDES.length} fiches (/fiches), ${CATEGORIES.length} pages de domaine (/categories), sitemap.xml (${urls.length} adresses) et robots.txt`);
