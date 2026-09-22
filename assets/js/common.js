/* Les Pages Bleues — éléments partagés : icônes, en-tête, pied de page, cartes */

const ICONS = {
  book: '<path d="M2 5.5C4.5 4 8 4 12 6v14c-4-2-7.5-2-10-.5z"/><path d="M22 5.5C19.5 4 16 4 12 6v14c4-2 7.5-2 10-.5z"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  back: '<path d="M19 12H5M11 18l-6-6 6-6"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>',
  car: '<path d="M5 16V11l2-5h10l2 5v5"/><path d="M3 16h18v2H3z"/><path d="M5 11h14"/><circle cx="7.5" cy="13.5" r=".8"/><circle cx="16.5" cy="13.5" r=".8"/><path d="M6 18v2M18 18v2"/>',
  washer: '<rect x="4" y="2.5" width="16" height="19" rx="2"/><path d="M4 7h16"/><circle cx="12" cy="14" r="4.5"/><path d="M9.5 14.5c1-1 2-1 3 0s2 1 2.5 0"/><circle cx="7" cy="4.8" r=".5"/>',
  laptop: '<rect x="4" y="4" width="16" height="11" rx="1.5"/><path d="M2 19h20l-2-4H4z"/>',
  phone: '<rect x="6.5" y="2" width="11" height="20" rx="2"/><path d="M11 18.5h2"/>',
  drill: '<path d="M3 6h11v6H3z"/><path d="M14 8h4M18 9h3"/><path d="M7 12l-1 8h5l1-8"/>',
  bike: '<circle cx="5.5" cy="16" r="3.5"/><circle cx="18.5" cy="16" r="3.5"/><path d="M5.5 16 9 9h6l3.5 7M9 9l3 7h-6.5M12 16l3-7M8 6h3M15 9l-1-3h2"/>',
  leaf: '<path d="M4 20c0-9 6-15 16-16-1 10-7 16-16 16z"/><path d="M4 20 13 11"/>',
  gamepad: '<path d="M7 7h10a5 5 0 0 1 4.9 6l-.8 4a2.5 2.5 0 0 1-4.3 1.1L14.5 16h-5l-2.3 2.1a2.5 2.5 0 0 1-4.3-1.1l-.8-4A5 5 0 0 1 7 7z"/><path d="M7.5 10.5v3M6 12h3"/><circle cx="16" cy="11" r=".6"/><circle cx="17.5" cy="13" r=".6"/>',
  more: '<circle cx="6" cy="12" r="1.2"/><circle cx="12" cy="12" r="1.2"/><circle cx="18" cy="12" r="1.2"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><circle cx="17" cy="9" r="2.5"/><path d="M16.5 14a5 5 0 0 1 5 5"/>',
  heart: '<path d="M12 20s-8-4.8-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 9c0 6.2-8 11-8 11z"/>',
  wallet: '<path d="M3 7h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M3 7l12-3v3"/><path d="M16 13.5h2"/>',
  cap: '<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c3 2.5 9 2.5 12 0v-5"/><path d="M22 9v5"/>',
  doc: '<path d="M6 2h8l5 5v15H6z"/><path d="M14 2v5h5M9 12h7M9 16h7"/>',
  wrench: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
  share: '<circle cx="18" cy="5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="19" r="2.5"/><path d="m8.2 10.8 7.6-4.5M8.2 13.2l7.6 4.5"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  gauge: '<path d="M4 18a8 8 0 1 1 16 0"/><path d="m12 18 4-6"/>',
  euro: '<path d="M17 6.5A6.5 6.5 0 1 0 17 17.5"/><path d="M4 10.5h9M4 13.5h9"/>',
  tool: '<path d="m14 6 4-4 4 4-4 4zM16 8 5 19l-2 2M3 21l-1-1"/>',
  box: '<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>',
  check: '<path d="m5 12 5 5 9-10"/>',
  play: '<path d="M7 4.5v15l12-7.5z"/>',
  shield: '<path d="M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6z"/><path d="m9 12 2 2 4-4"/>',
  bulb: '<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z"/>',
  volume: '<path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"/>',
  mute: '<path d="M4 9h4l5-4v14l-5-4H4z"/><path d="m17 9 5 6M22 9l-5 6"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>'
};

function icon(name, cls = "") {
  return `<svg class="ico ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ""}</svg>`;
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
}

/* Fiches ajoutées par l'utilisateur (stockées dans ce navigateur) */
function loadUserGuides() {
  try { return JSON.parse(localStorage.getItem("lpb-guides") || "[]"); } catch { return []; }
}
function saveUserGuide(g) {
  const list = loadUserGuides();
  list.unshift(g);
  try { localStorage.setItem("lpb-guides", JSON.stringify(list)); return true; } catch { return false; }
}
function allGuides() { return [...loadUserGuides(), ...GUIDES]; }
function categoryById(id) { return CATEGORIES.find(c => c.id === id) || CATEGORIES[CATEGORIES.length - 1]; }

function normalize(s) {
  return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
function searchGuides(query, cat) {
  const words = normalize(query || "").split(/\s+/).filter(w => w.length > 1);
  return allGuides().filter(g => {
    if (cat && g.category !== cat) return false;
    if (!words.length) return true;
    const hay = normalize([g.title, g.summary, categoryById(g.category).name, ...(g.steps || []).map(s => s.title)].join(" "));
    return words.some(w => hay.includes(w));
  });
}

/* Carte de guide : visuel « plan technique » + pastille catégorie */
function guideCard(g) {
  const c = categoryById(g.category);
  return `
    <a class="guide-card" href="guide.html?id=${encodeURIComponent(g.id)}">
      <div class="guide-visual" data-cat="${c.id}">
        ${icon(c.icon, "guide-visual-ico")}
        <span class="tag">${escapeHtml(c.short || c.name)}</span>
      </div>
      <div class="guide-body">
        <h3>${escapeHtml(g.title)}</h3>
        <span class="round-btn">${icon("arrow")}</span>
      </div>
      <div class="guide-meta">
        <span>${icon("gauge")} ${escapeHtml(g.difficulty)}</span>
        <span>${icon("clock")} ${escapeHtml(g.duration)}</span>
      </div>
    </a>`;
}

function renderHeader(active) {
  const links = [
    ["categories", "Catégories", "index.html#categories"],
    ["guides", "Guides", "guides.html"],
    ["communaute", "Communauté", "index.html#communaute"],
    ["apropos", "À propos", "index.html#apropos"]
  ];
  const el = document.getElementById("site-header");
  el.className = "site-header";
  el.innerHTML = `
    <div class="container header-inner">
      <a class="brand" href="index.html" aria-label="Les Pages Bleues — accueil">
        ${icon("book", "brand-ico")}
        <span><strong>Les Pages <em>Bleues</em></strong><small>Réparer. Comprendre. Transmettre.</small></span>
      </a>
      <nav class="main-nav" id="main-nav">
        ${links.map(([k, t, h]) => `<a href="${h}" class="${k === active ? "active" : ""}">${t}</a>`).join("")}
      </nav>
      <div class="header-actions">
        <a class="icon-btn" href="guides.html" aria-label="Rechercher">${icon("search")}</a>
        <a class="btn btn-ghost hide-sm" href="#" onclick="alert('La connexion arrive bientôt !');return false;">Se connecter</a>
        <a class="btn btn-primary" href="ajouter.html">${icon("plus")}<span class="hide-xs">Ajouter une fiche</span></a>
        <button class="icon-btn menu-btn" aria-label="Menu" aria-expanded="false">${icon("menu")}</button>
      </div>
    </div>`;
  const btn = el.querySelector(".menu-btn");
  btn.addEventListener("click", () => {
    const open = el.classList.toggle("nav-open");
    btn.setAttribute("aria-expanded", open);
    btn.innerHTML = icon(open ? "close" : "menu");
  });
}

function renderFooter() {
  const el = document.getElementById("site-footer");
  el.className = "site-footer";
  el.innerHTML = `
    <div class="container footer-inner">
      <div>
        <a class="brand" href="index.html">${icon("book", "brand-ico")}<span><strong>Les Pages <em>Bleues</em></strong><small>L'encyclopédie de l'entretien</small></span></a>
        <p class="muted">Le savoir à portée de tous. Réparer, comprendre, entretenir — pour un monde qui dure plus longtemps.</p>
      </div>
      <div class="footer-cols">
        <div><h4>Explorer</h4><a href="index.html#categories">Catégories</a><a href="guides.html">Tous les guides</a><a href="ajouter.html">Ajouter une fiche</a></div>
        <div><h4>Domaines</h4>${CATEGORIES.slice(0, 4).map(c => `<a href="guides.html?cat=${c.id}">${c.short || c.name}</a>`).join("")}</div>
      </div>
    </div>
    <div class="container footer-bottom muted">© ${new Date().getFullYear()} Les Pages Bleues — La connaissance est notre meilleur outil.</div>`;
}

// Remplace les <span data-icon="…"> par l'icône SVG correspondante
function hydrateIcons(root = document) {
  root.querySelectorAll("[data-icon]").forEach(el => {
    const tpl = document.createElement("template");
    tpl.innerHTML = icon(el.dataset.icon, el.hasAttribute("data-fill") ? "fill" : "").trim();
    el.replaceWith(tpl.content.firstChild);
  });
}
