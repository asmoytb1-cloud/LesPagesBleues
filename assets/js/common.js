/* Les Pages Bleues — éléments partagés : icônes, données locales, recherche, cartes, en-tête, pied de page.
   Ce fichier ne touche au DOM que dans les fonctions render* : il peut donc aussi être chargé par
   le script de génération des pages statiques (tools/build.js). */

/* Chemin vers la racine du site (les pages de /fiches/ déclarent window.LPB_ROOT = "../") */
const ROOT = (typeof window !== "undefined" && window.LPB_ROOT) || "";

const ICONS = {
  book: '<path d="M2 5.5C4.5 4 8 4 12 6v14c-4-2-7.5-2-10-.5z"/><path d="M22 5.5C19.5 4 16 4 12 6v14c4-2 7.5-2 10-.5z"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  back: '<path d="M19 12H5M11 18l-6-6 6-6"/>',
  chevron: '<path d="m9 6 6 6-6 6"/>',
  chevronLeft: '<path d="m15 6-6 6 6 6"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>',
  home: '<path d="M3 11 12 4l9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/>',
  car: '<path d="M5 16V11l2-5h10l2 5v5"/><path d="M3 16h18v2H3z"/><path d="M5 11h14"/><circle cx="7.5" cy="13.5" r=".8"/><circle cx="16.5" cy="13.5" r=".8"/><path d="M6 18v2M18 18v2"/>',
  washer: '<rect x="4" y="2.5" width="16" height="19" rx="2"/><path d="M4 7h16"/><circle cx="12" cy="14" r="4.5"/><path d="M9.5 14.5c1-1 2-1 3 0s2 1 2.5 0"/><circle cx="7" cy="4.8" r=".5"/>',
  laptop: '<rect x="4" y="4" width="16" height="11" rx="1.5"/><path d="M2 19h20l-2-4H4z"/>',
  fridge: '<rect x="5" y="2.5" width="14" height="19" rx="2"/><path d="M5 10h14M8.5 5.5v2M8.5 13v3"/>',
  oven: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 8h18"/><rect x="6.5" y="11" width="11" height="7" rx="1"/><circle cx="7" cy="5.5" r=".6"/><circle cx="10" cy="5.5" r=".6"/>',
  fan: '<circle cx="12" cy="12" r="1.8"/><path d="M12 10.2C11 6 12 3 15 3c2 0 2.5 3-.5 5.5M13.6 12.9c4 1.5 6 4 4.5 6.5-1 1.7-4 .7-4.8-3M10.4 12.9c-3 3-6.2 3.5-7.4 1-.9-1.8 1.5-3.8 4.8-2.6"/><path d="M12 14v7"/>',
  coffee: '<path d="M5 8h11v6a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5z"/><path d="M16 10h1.5a2.5 2.5 0 0 1 0 5H16M8 2.5v2.5M11 2.5v2.5M3 21.5h16"/>',
  plug: '<path d="M9 2v6M15 2v6M6 8h12v3a6 6 0 0 1-12 0z"/><path d="M12 17v5"/>',
  list: '<path d="M8 6h13M8 12h13M8 18h13"/><circle cx="3.5" cy="6" r=".8"/><circle cx="3.5" cy="12" r=".8"/><circle cx="3.5" cy="18" r=".8"/>',
  phone: '<rect x="6.5" y="2" width="11" height="20" rx="2"/><path d="M11 18.5h2"/>',
  drill: '<path d="M3 6h11v6H3z"/><path d="M14 8h4M18 9h3"/><path d="M7 12l-1 8h5l1-8"/>',
  bike: '<circle cx="5.5" cy="16" r="3.5"/><circle cx="18.5" cy="16" r="3.5"/><path d="M5.5 16 9 9h6l3.5 7M9 9l3 7h-6.5M12 16l3-7M8 6h3M15 9l-1-3h2"/>',
  leaf: '<path d="M4 20c0-9 6-15 16-16-1 10-7 16-16 16z"/><path d="M4 20 13 11"/>',
  gamepad: '<path d="M7 7h10a5 5 0 0 1 4.9 6l-.8 4a2.5 2.5 0 0 1-4.3 1.1L14.5 16h-5l-2.3 2.1a2.5 2.5 0 0 1-4.3-1.1l-.8-4A5 5 0 0 1 7 7z"/><path d="M7.5 10.5v3M6 12h3"/><circle cx="16" cy="11" r=".6"/><circle cx="17.5" cy="13" r=".6"/>',
  shirt: '<path d="M8 3 4 5 2 10l3 1.5V21h14v-9.5L22 10l-2-5-4-2c0 2-1.8 3-4 3S8 5 8 3z"/>',
  music: '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
  more: '<circle cx="6" cy="12" r="1.2"/><circle cx="12" cy="12" r="1.2"/><circle cx="18" cy="12" r="1.2"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><circle cx="17" cy="9" r="2.5"/><path d="M16.5 14a5 5 0 0 1 5 5"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  heart: '<path d="M12 20s-8-4.8-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 9c0 6.2-8 11-8 11z"/>',
  wallet: '<path d="M3 7h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M3 7l12-3v3"/><path d="M16 13.5h2"/>',
  cap: '<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c3 2.5 9 2.5 12 0v-5"/><path d="M22 9v5"/>',
  doc: '<path d="M6 2h8l5 5v15H6z"/><path d="M14 2v5h5M9 12h7M9 16h7"/>',
  wrench: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
  share: '<circle cx="18" cy="5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="19" r="2.5"/><path d="m8.2 10.8 7.6-4.5M8.2 13.2l7.6 4.5"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  gauge: '<path d="M4 18a8 8 0 1 1 16 0"/><path d="m12 18 4-6"/>',
  euro: '<path d="M17 6.5A6.5 6.5 0 1 0 17 17.5"/><path d="M4 10.5h9M4 13.5h9"/>',
  coins: '<ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6"/><path d="M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"/>',
  tool: '<path d="m14 6 4-4 4 4-4 4zM16 8 5 19l-2 2M3 21l-1-1"/>',
  box: '<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>',
  check: '<path d="m5 12 5 5 9-10"/>',
  checkCircle: '<circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
  play: '<path d="M7 4.5v15l12-7.5z"/>',
  shield: '<path d="M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6z"/><path d="m9 12 2 2 4-4"/>',
  bulb: '<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z"/>',
  volume: '<path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"/>',
  mute: '<path d="M4 9h4l5-4v14l-5-4H4z"/><path d="m17 9 5 6M22 9l-5 6"/>',
  mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>',
  micOff: '<path d="M15 9.3V6a3 3 0 0 0-5.7-1.3M9 9v2a3 3 0 0 0 4.7 2.5M5 11a7 7 0 0 0 11.3 5.5M19 11c0 .8-.1 1.5-.4 2.2M12 18v3M3 3l18 18"/>',
  timer: '<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2.5M10 2h4M12 2v3"/>',
  pause: '<path d="M8 5v14M16 5v14"/>',
  print: '<path d="M7 9V3h10v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M7 14h10v7H7z"/>',
  trash: '<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>',
  refresh: '<path d="M20 11a8 8 0 1 0-2.3 5.7M20 4v7h-7"/>',
  alert: '<path d="M12 3 2 20h20z"/><path d="M12 10v4M12 17.5v.5"/>',
  sort: '<path d="M7 4v16M3 16l4 4 4-4M17 20V4M13 8l4-4 4 4"/>',
  filter: '<path d="M3 5h18l-7 8v6l-4 2v-8z"/>',
  download: '<path d="M12 3v12M7 10l5 5 5-5M4 19h16"/>',
  upload: '<path d="M12 21V9M7 14l5-5 5 5M4 5h16"/>',
  chat: '<path d="M4 5h16v11H9l-5 4z"/><path d="M8 9h8M8 12h5"/>',
  star: '<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.3 6.4 20.2l1.1-6.2L3 9.6l6.2-.9z"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  moon: '<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/>',
  camera: '<path d="M4 7h3l2-3h6l2 3h3v13H4z"/><circle cx="12" cy="13" r="4"/>',
  medal: '<circle cx="12" cy="15" r="6"/><path d="m8.5 10.2-3-7.2h4l2.5 5M15.5 10.2l3-7.2h-4L12 8"/><path d="m12 12.5.9 1.8 2 .3-1.4 1.4.3 2-1.8-.9-1.8.9.3-2-1.4-1.4 2-.3z"/>',
  stethoscope: '<path d="M6 3v6a4 4 0 0 0 8 0V3"/><path d="M10 13v2a5 5 0 0 0 10 0v-3"/><circle cx="20" cy="10" r="2"/>',
  pin: '<path d="M12 22s7-6.3 7-12a7 7 0 0 0-14 0c0 5.7 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/>',
  link: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
  send: '<path d="M4 12 20 4l-4 16-4-7z"/><path d="m12 13 8-9"/>',
  eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>'
};

function icon(name, cls = "") {
  return `<svg class="ico ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ""}</svg>`;
}

function escapeHtml(s) {
  return String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
}

/* ---------- Stockage local tolérant aux erreurs (navigation privée, stockage bloqué…) ---------- */
const store = {
  get(key, fallback) {
    try { const v = localStorage.getItem(key); return v === null ? fallback : JSON.parse(v); } catch { return fallback; }
  },
  set(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); return true; } catch { return false; }
  },
  remove(key) { try { localStorage.removeItem(key); } catch {} }
};

/* ---------- Guides ---------- */
function loadUserGuides() { return store.get("lpb-guides", []); }
function saveUserGuide(g) { return store.set("lpb-guides", [g, ...loadUserGuides().filter(x => x.id !== g.id)]); }
function deleteUserGuide(id) {
  store.set("lpb-guides", loadUserGuides().filter(g => g.id !== id));
  store.remove("lpb-progress-" + id);
  setFav(id, false);
}
function allGuides() { return [...loadUserGuides(), ...GUIDES]; }
function guideById(id) { return allGuides().find(g => g.id === id); }
function categoryById(id) { return CATEGORIES.find(c => c.id === id) || CATEGORIES.find(c => c.id === "autres"); }
function topCategories() { return CATEGORIES.filter(c => !c.parent); }
function subCategories(parentId) { return CATEGORIES.filter(c => c.parent === parentId); }
function inCategory(g, catId) {
  if (!catId) return true;
  const c = categoryById(g.category);
  return c.id === catId || c.parent === catId;
}
function levelOf(g) { return Math.max(1, DIFFICULTIES.indexOf(g.difficulty) + 1); }

/* Adresse d'une fiche : page statique pour les fiches du site, page dynamique pour les fiches perso */
function guideUrl(g, extra = "") {
  return g.user ? `${ROOT}guide.html?id=${encodeURIComponent(g.id)}${extra ? "&" + extra : ""}`
                : `${ROOT}fiches/${g.id}.html${extra ? "?" + extra : ""}`;
}
function categoryUrl(c) { return `${ROOT}categories/${typeof c === "string" ? c : c.id}.html`; }
function photoUrl(name) { return name ? `${ROOT}assets/img/photos/${name}.webp` : null; }
/* Les photos du site existent aussi en 480 px (et 800 px pour les grandes) : le navigateur choisit
   la plus légère qui suffit à l'écran. sizes = largeur affichée de l'image. */
const PHOTO_FULL = { hero: 1024, terre: 1024, velo: 960 };
function imgSrc(src, sizes) {
  const m = src && src.match(/^(.*assets\/img\/photos\/)([a-z]+)\.webp$/);
  if (!m) return `src="${src}"`;
  const [, dir, name] = m;
  const full = PHOTO_FULL[name] || 1000;
  const set = [`${dir}${name}-480.webp 480w`, ...(full > 1000 || name === "terre" ? [`${dir}${name}-800.webp 800w`] : []), `${src} ${full}w`];
  return `src="${src}" srcset="${set.join(", ")}" sizes="${sizes}"`;
}
function guidePhoto(g) {
  if (g.cover) return g.cover;                    // photo envoyée par l'auteur (fiches perso)
  const c = categoryById(g.category);
  const parent = c.parent ? categoryById(c.parent) : null;
  return photoUrl(g.photo || c.photo || (parent && parent.photo));
}
function formatDate(iso) {
  try { return new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" }); } catch { return iso; }
}

/* ---------- Favoris, progression, avis ---------- */
function getFavs() { return new Set(store.get("lpb-favs", [])); }
function isFav(id) { return getFavs().has(id); }
function setFav(id, on) {
  const f = getFavs();
  on ? f.add(id) : f.delete(id);
  store.set("lpb-favs", [...f]);
  updateFavBadge();
}
function getProgress(id) { return new Set(store.get("lpb-progress-" + id, [])); }
function saveProgress(id, done) { store.set("lpb-progress-" + id, [...done]); }
function getResult(id) { return store.get("lpb-result-" + id, null); }
function inProgressGuides() {
  return allGuides().filter(g => {
    const n = getProgress(g.id).size;
    return n > 0 && n < g.steps.length;
  });
}

/* ---------- Profil local (en attendant les comptes) ---------- */
function getProfile() {
  let p = store.get("lpb-profile", null);
  if (!p) {
    p = { name: "", since: new Date().toISOString() };
    store.set("lpb-profile", p);
  }
  return p;
}
function saveProfile(p) { store.set("lpb-profile", p); }
function initials(name) {
  const parts = String(name || "").trim().split(/\s+/).filter(Boolean);
  return parts.length ? (parts[0][0] + (parts[1] ? parts[1][0] : "")).toUpperCase() : "";
}

/* ---------- Communauté locale (questions, astuces, retours de réparateurs) ---------- */
function loadPosts() { return store.get("lpb-posts", []); }
function savePosts(posts) { return store.set("lpb-posts", posts); }

// Mon matériel : appareils et voitures enregistrés dans ce navigateur
function loadMateriel() { return store.get("lpb-materiel", []); }
function saveMateriel(list) { return store.set("lpb-materiel", list); }
function materielById(id) { return loadMateriel().find(m => m.id === id); }
// inSentence : « Pour votre lave-linge LG » plutôt que « Pour votre Lave-linge LG »
function materielName(m, inSentence = false) {
  const type = inSentence && m.typeName ? m.typeName.charAt(0).toLowerCase() + m.typeName.slice(1) : m.typeName;
  return (m.kind === "voiture" ? [m.brand, m.model] : [type, m.brand]).filter(Boolean).join(" ");
}
function materielLabel(m) { return [materielName(m), m.year].filter(Boolean).join(" · "); }
function guideFitsMateriel(g, m) {
  return m.kind === "voiture" ? inCategory(g, "automobile") : (g.devices || []).includes(m.type);
}
function guidesForMateriel(m) { return allGuides().filter(g => guideFitsMateriel(g, m)); }

/* ---------- Recherche : pondérée, insensible aux accents et au pluriel ---------- */
function normalize(s) {
  return String(s ?? "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}
const STOPWORDS = new Set("a au aux avec ce ces d de des du en et il la le les l ma mes mon ne ou par pas plus pour qu que qui sa se ses son sur un une y je j me m mais est sont fait".split(" "));
function queryWords(query) {
  return normalize(query || "").split(/[^a-z0-9]+/)
    .filter(w => w.length > 1 && !STOPWORDS.has(w))
    .map(w => (w.length > 3 ? w.replace(/(s|x)$/, "") : w));
}
function scoreText(fields, words) {
  const f = fields.map(([t, w]) => [normalize(t), w]);
  let score = 0, matched = 0;
  for (const w of words) {
    let best = 0;
    for (const [t, weight] of f) if (t.includes(w)) best = Math.max(best, weight);
    if (best) { matched++; score += best; }
  }
  // Bonus quand toutes les notions de la recherche sont trouvées
  return matched ? score + (matched === words.length ? 2 * words.length : 0) : 0;
}
function scoreGuide(g, words) {
  return scoreText([
    [g.title, 6],
    [(g.keywords || []).join(" "), 4],
    [categoryById(g.category).name, 2],
    [g.summary || "", 2],
    [(g.steps || []).map(s => s.title + " " + s.text).join(" "), 1]
  ], words);
}
// minRatio écarte les résultats nettement moins pertinents que le meilleur
function searchGuides(query, cat, minRatio = 0.25) {
  const words = queryWords(query);
  const list = allGuides().filter(g => inCategory(g, cat));
  if (!words.length) return list;
  const scored = list.map(g => [g, scoreGuide(g, words)]).filter(([, s]) => s > 0);
  const best = Math.max(0, ...scored.map(([, s]) => s));
  return scored.filter(([, s]) => s >= best * minRatio).sort((a, b) => b[1] - a[1]).map(([g]) => g);
}

/* ---------- Petits composants HTML ---------- */
function dots(g) {
  const lvl = levelOf(g);
  return `<span class="dots lvl-${lvl}" role="img" aria-label="Difficulté : ${escapeHtml(g.difficulty)}">${[1, 2, 3].map(i => `<i class="${i <= lvl ? "on" : ""}"></i>`).join("")}</span>`;
}
function bars(g) {
  const lvl = levelOf(g);
  return `<span class="bars lvl-${lvl}" aria-hidden="true">${[1, 2, 3].map(i => `<i class="${i <= lvl ? "on" : ""}"></i>`).join("")}</span>`;
}
function media(g, alt = "", sizes = "(max-width: 600px) 82vw, 300px") {
  const src = guidePhoto(g);
  return src
    ? `<img ${imgSrc(src, sizes)} alt="${escapeHtml(alt)}" loading="lazy" decoding="async">`
    : `<div class="gcard-icon">${icon(categoryById(g.category).icon)}</div>`;
}

/* Carte photo (grilles, carrousel) */
function guideCard(g) {
  const c = categoryById(g.category);
  const done = getProgress(g.id).size;
  const pct = Math.round(done / g.steps.length * 100);
  return `
    <a class="gcard" href="${guideUrl(g)}">
      <div class="gcard-media">
        ${media(g)}
        <span class="tag">${escapeHtml(c.short || c.name)}</span>
        ${isFav(g.id) ? `<span class="card-fav" title="Dans vos favoris">${icon("heart", "fill")}</span>` : ""}
        ${g.user ? `<span class="tag tag-green card-user">Ma fiche</span>` : ""}
        <h3>${escapeHtml(g.title)}</h3>
        <span class="round-btn">${icon("arrow")}</span>
      </div>
      <div class="gcard-meta">
        <span>${icon("clock")} ${escapeHtml(g.duration)}</span>
        <span>Difficulté ${dots(g)}</span>
        ${g.savings ? `<span>${icon("euro")} ${escapeHtml(g.savings.replace("≈", "").trim())}</span>` : ""}
      </div>
      ${done && pct < 100 ? `<div class="card-progress" title="${pct} % fait"><div style="width:${pct}%"></div></div>` : ""}
    </a>`;
}

/* Ligne de résultat (page de recherche), avec les mots cherchés surlignés */
function highlight(text, words) {
  const src = String(text ?? "");
  const plain = normalize(src);
  const marks = new Array(src.length).fill(false);
  // normalize() garde une lettre par lettre accentuée : les positions restent alignées
  if (plain.length === src.length) {
    for (const w of words.filter(w => w.length > 2)) {
      let i = plain.indexOf(w);
      while (i !== -1) { for (let k = i; k < i + w.length; k++) marks[k] = true; i = plain.indexOf(w, i + w.length); }
    }
  }
  let out = "", open = false;
  for (let i = 0; i < src.length; i++) {
    if (marks[i] && !open) { out += "<mark>"; open = true; }
    if (!marks[i] && open) { out += "</mark>"; open = false; }
    out += escapeHtml(src[i]);
  }
  return out + (open ? "</mark>" : "");
}
function guideRow(g, words = []) {
  const c = categoryById(g.category);
  return `
    <a class="grow" href="${guideUrl(g)}">
      <div class="grow-media">${media(g, "", "160px")}</div>
      <div>
        <h3>${highlight(g.title, words)}</h3>
        <p>${escapeHtml(g.summary || "")}</p>
        <div class="gcard-meta">
          <span class="tag tag-soft">${escapeHtml(c.short || c.name)}</span>
          <span>${icon("clock")} ${escapeHtml(g.duration)}</span>
          <span>${dots(g)} ${escapeHtml(g.difficulty)}</span>
          ${isFav(g.id) ? `<span style="color:var(--pink)">${icon("heart", "fill")}</span>` : ""}
          ${g.user ? `<span class="tag tag-user">Ma fiche</span>` : ""}
        </div>
      </div>
      ${icon("chevron")}
    </a>`;
}

/* ---------- Messages temporaires ---------- */
function toast(message) {
  let box = document.getElementById("toasts");
  if (!box) {
    box = document.createElement("div");
    box.id = "toasts";
    box.className = "toasts";
    box.setAttribute("role", "status");
    box.setAttribute("aria-live", "polite");
    document.body.appendChild(box);
  }
  const t = document.createElement("div");
  t.className = "toast";
  t.textContent = message;
  box.appendChild(t);
  setTimeout(() => t.classList.add("out"), 3400);
  setTimeout(() => t.remove(), 3800);
}

/* ---------- Fenêtre modale accessible ---------- */
function openModal(title, bodyHtml, onReady) {
  const opener = document.activeElement;
  const wrap = document.createElement("div");
  wrap.className = "modal";
  wrap.innerHTML = `
    <div class="modal-box" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div class="modal-head"><h2 id="modal-title">${escapeHtml(title)}</h2>
        <button class="icon-btn" type="button" data-close aria-label="Fermer">${icon("close")}</button></div>
      ${bodyHtml}
    </div>`;
  document.body.appendChild(wrap);
  const close = () => { wrap.remove(); document.removeEventListener("keydown", onKey); opener?.focus?.(); };
  const onKey = e => { if (e.key === "Escape") close(); };
  document.addEventListener("keydown", onKey);
  wrap.addEventListener("click", e => { if (e.target === wrap || e.target.closest("[data-close]")) close(); });
  const first = wrap.querySelector("input, textarea, select, button:not([data-close])");
  (first || wrap.querySelector("[data-close]")).focus();
  onReady?.(wrap, close);
  return close;
}

/* ---------- Thème clair / sombre ---------- */
function currentTheme() { return document.documentElement.dataset.theme === "light" ? "light" : "dark"; }
function setTheme(t) {
  document.documentElement.dataset.theme = t;
  store.set("lpb-theme", t);
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", t === "light" ? "#f3f6fb" : "#050b18");
  document.querySelectorAll("[data-theme-toggle]").forEach(b => {
    b.innerHTML = icon(t === "light" ? "moon" : "sun");
    b.setAttribute("aria-label", t === "light" ? "Passer au thème sombre" : "Passer au thème clair");
  });
}

/* ---------- Suggestions de recherche (en-tête et accueil) ---------- */
function attachSuggest(input, box) {
  let items = [], active = -1;
  const close = () => { box.hidden = true; input.setAttribute("aria-expanded", "false"); active = -1; };
  const highlightItem = i => {
    active = i;
    box.querySelectorAll("[role=option]").forEach((el, n) => el.setAttribute("aria-selected", n === i));
    input.setAttribute("aria-activedescendant", i >= 0 ? `${box.id}-${i}` : "");
  };
  input.addEventListener("input", () => {
    const q = input.value.trim();
    items = q.length > 1 ? searchGuides(q, "", 0.5).slice(0, 5) : [];
    if (!items.length) {
      if (q.length > 1) {
        box.innerHTML = `<div class="suggest-empty">Pas encore de fiche pour « ${escapeHtml(q)} ».<br>
          <a href="${ROOT}diagnostic.html?q=${encodeURIComponent(q)}">Lancer le diagnostic guidé</a> ou
          <a href="${ROOT}ajouter.html">écrire la fiche</a>.</div>`;
        box.hidden = false;
      } else close();
      return;
    }
    box.innerHTML = `<div class="suggest-head">Fiches</div>` + items.map((g, i) => `
      <a id="${box.id}-${i}" role="option" aria-selected="false" href="${guideUrl(g)}">
        ${icon(categoryById(g.category).icon)}
        <span><strong>${escapeHtml(g.title)}</strong><small>${escapeHtml(g.difficulty)} · ${escapeHtml(g.duration)}</small></span>
      </a>`).join("") + `<a class="suggest-all" href="${ROOT}guides.html?q=${encodeURIComponent(q)}">Voir tous les résultats ${icon("arrow")}</a>`;
    box.hidden = false;
    input.setAttribute("aria-expanded", "true");
    active = -1;
  });
  input.addEventListener("keydown", e => {
    if (box.hidden || !items.length) return;
    if (e.key === "ArrowDown") { e.preventDefault(); highlightItem((active + 1) % items.length); }
    else if (e.key === "ArrowUp") { e.preventDefault(); highlightItem((active - 1 + items.length) % items.length); }
    else if (e.key === "Enter" && active >= 0) { e.preventDefault(); location.href = document.getElementById(`${box.id}-${active}`).href; }
    else if (e.key === "Escape") close();
  });
  document.addEventListener("click", e => { if (!box.contains(e.target) && e.target !== input) close(); });
}

/* ---------- En-tête, barre mobile, pied de page ---------- */
function renderHeader(active) {
  const links = [
    ["categories", "Catégories", "categories.html"],
    ["guides", "Guides", "guides.html"],
    ["diagnostic", "Diagnostic", "diagnostic.html"],
    ["communaute", "Communauté", "communaute.html"]
  ];
  const skip = document.createElement("a");
  skip.className = "skip-link";
  skip.href = "#main";
  skip.textContent = "Aller au contenu";
  document.body.prepend(skip);

  const prof = getProfile();
  const el = document.getElementById("site-header");
  el.className = "site-header";
  el.innerHTML = `
    <div class="container header-inner">
      <a class="brand" href="${ROOT}index.html" aria-label="Les Pages Bleues — accueil">
        ${icon("book", "brand-ico")}
        <span><strong>Les Pages <em>Bleues</em></strong><small>Réparer. Comprendre. Transmettre.</small></span>
      </a>
      <nav class="main-nav" id="main-nav" aria-label="Navigation principale">
        ${links.map(([k, t, h]) => `<a href="${ROOT}${h}" ${k === active ? 'class="active" aria-current="page"' : ""}>${t}</a>`).join("")}
        <a class="nav-extra" href="${ROOT}a-propos.html">À propos</a>
        <a class="nav-extra" href="${ROOT}materiel.html">Mon matériel</a>
        <a class="nav-extra" href="${ROOT}guides.html?fav=1">Mes favoris</a>
      </nav>
      <div class="header-search search-wrap" role="search">
        <form class="search-bar" action="${ROOT}guides.html">
          ${icon("search")}
          <input type="search" name="q" id="header-q" placeholder="Rechercher un guide, un problème…" aria-label="Rechercher un guide ou un problème"
                 autocomplete="off" role="combobox" aria-autocomplete="list" aria-expanded="false" aria-controls="header-suggest">
        </form>
        <div class="suggest-box" id="header-suggest" role="listbox" aria-label="Fiches suggérées" hidden></div>
      </div>
      <div class="header-actions">
        <button class="icon-btn" type="button" data-theme-toggle></button>
        <a class="icon-btn hide-xs" href="${ROOT}guides.html?fav=1" aria-label="Mes favoris">${icon("heart")}<span class="badge" id="fav-badge" hidden></span></a>
        <a class="icon-btn hide-md" href="${ROOT}profil.html" aria-label="Mon profil">${prof.name ? `<span class="avatar">${escapeHtml(initials(prof.name))}</span>` : icon("user")}</a>
        <a class="btn btn-primary hide-md" href="${ROOT}ajouter.html">${icon("plus")}<span>Ajouter une fiche</span></a>
        <button class="icon-btn menu-btn" type="button" aria-label="Menu" aria-controls="main-nav" aria-expanded="false">${icon("menu")}</button>
      </div>
    </div>`;
  const btn = el.querySelector(".menu-btn");
  const setOpen = open => {
    el.classList.toggle("nav-open", open);
    btn.setAttribute("aria-expanded", open);
    btn.innerHTML = icon(open ? "close" : "menu");
  };
  btn.addEventListener("click", () => setOpen(!el.classList.contains("nav-open")));
  el.querySelectorAll(".main-nav a").forEach(a => a.addEventListener("click", () => setOpen(false)));
  el.querySelector("[data-theme-toggle]").addEventListener("click", () => setTheme(currentTheme() === "light" ? "dark" : "light"));
  setTheme(currentTheme());
  attachSuggest(document.getElementById("header-q"), document.getElementById("header-suggest"));
  updateFavBadge();
  renderTabbar(active);
}

function renderTabbar(active) {
  const nav = document.createElement("nav");
  nav.className = "tabbar";
  nav.setAttribute("aria-label", "Navigation mobile");
  const items = [
    ["accueil", "home", "Accueil", "index.html"],
    ["guides", "search", "Rechercher", "guides.html?focus=1"],
    ["ajouter", "plus", "Ajouter", "ajouter.html"],
    ["diagnostic", "stethoscope", "Diagnostic", "diagnostic.html"],
    ["profil", "user", "Profil", "profil.html"]
  ];
  nav.innerHTML = items.map(([k, ic, t, h]) =>
    `<a href="${ROOT}${h}" class="${k === active ? "active" : ""} ${k === "ajouter" ? "tab-add" : ""}" ${k === active ? 'aria-current="page"' : ""}>${icon(ic)}<span>${t}</span></a>`).join("");
  document.body.appendChild(nav);
}

function updateFavBadge() {
  if (typeof document === "undefined") return;
  const b = document.getElementById("fav-badge");
  if (!b) return;
  const n = getFavs().size;
  b.hidden = !n;
  b.textContent = n;
}

function renderFooter() {
  const el = document.getElementById("site-footer");
  el.className = "site-footer";
  el.innerHTML = `
    <div class="container footer-inner">
      <div>
        <a class="brand" href="${ROOT}index.html">${icon("book", "brand-ico")}<span><strong>Les Pages <em>Bleues</em></strong><small>Réparer. Comprendre. Transmettre.</small></span></a>
        <p class="muted">L'encyclopédie collaborative de la réparation, en français. Un monde plus durable commence par un geste.</p>
      </div>
      <div class="footer-cols">
        <div><h2>Explorer</h2>
          <a href="${ROOT}categories.html">Catégories</a><a href="${ROOT}guides.html">Tous les guides</a>
          <a href="${ROOT}diagnostic.html">Diagnostic guidé</a><a href="${ROOT}materiel.html">Mon matériel</a>
          <a href="${ROOT}guides.html?fav=1">Mes favoris</a></div>
        <div><h2>Participer</h2>
          <a href="${ROOT}ajouter.html">Ajouter une fiche</a><a href="${ROOT}communaute.html">Communauté</a>
          <a href="${ROOT}profil.html">Mon profil</a></div>
        <div><h2>Le projet</h2>
          <a href="${ROOT}a-propos.html">À propos</a><a href="${ROOT}a-propos.html#verification">Comment on vérifie</a>
          <a href="${ROOT}a-propos.html#reparateur">Trouver un réparateur</a></div>
      </div>
    </div>
    <div class="container footer-bottom muted">
      <span>© ${new Date().getFullYear()} Les Pages Bleues — La connaissance est notre meilleur outil.</span>
      <nav aria-label="Informations légales">
        <a href="${ROOT}mentions-legales.html">Mentions légales</a>
        <a href="${ROOT}confidentialite.html">Confidentialité</a>
        <a href="${ROOT}a-propos.html#credits">Crédits photos</a>
      </nav>
    </div>`;
}

// Remplace les <span data-icon="…"> par l'icône SVG correspondante
function hydrateIcons(root = document) {
  root.querySelectorAll("[data-icon]").forEach(el => {
    const tpl = document.createElement("template");
    tpl.innerHTML = icon(el.dataset.icon, el.hasAttribute("data-fill") ? "fill" : "").trim();
    el.replaceWith(tpl.content.firstChild);
  });
}

/* Mode hors ligne : le site reste consultable au garage, même sans réseau */
if (typeof window !== "undefined" && "serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost")) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register(ROOT + "sw.js").catch(() => {});
  });
}
