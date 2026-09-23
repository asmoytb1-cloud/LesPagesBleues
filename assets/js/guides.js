/* Les Pages Bleues — recherche et liste des guides (onglets, filtres, tri) */

renderHeader("guides");
renderFooter();
hydrateIcons();

const params = new URLSearchParams(location.search);
const state = {
  q: params.get("q") || "",
  tab: params.get("tab") || "all",
  cat: params.get("cat") || "",
  diff: params.get("diff") || "",
  time: params.get("time") || "",
  fav: params.get("fav") === "1",
  sort: params.get("sort") || "pertinence",
  shown: 10
};
const PAGE = 10;
const $ = id => document.getElementById(id);
const qInput = $("q"), fCat = $("f-cat"), fDiff = $("f-diff"), fTime = $("f-time"), sortSel = $("sort"), favBtn = $("fav-toggle");

fCat.innerHTML = `<option value="">Tous les domaines</option>` + CATEGORIES.map(c =>
  `<option value="${c.id}">${c.parent ? "— " : ""}${escapeHtml(c.name)}</option>`).join("");
qInput.value = state.q; fCat.value = state.cat; fDiff.value = state.diff; fTime.value = state.time; sortSel.value = state.sort;
if (params.get("focus")) qInput.focus();

const euros = g => parseInt((g.savings || "0").replace(/\D/g, ""), 10) || 0;
const SORTS = {
  duree: (a, b) => (a.minutes || 999) - (b.minutes || 999),
  facile: (a, b) => levelOf(a) - levelOf(b) || (a.minutes || 999) - (b.minutes || 999),
  economie: (a, b) => euros(b) - euros(a),
  az: (a, b) => a.title.localeCompare(b.title, "fr")
};

function guideResults() {
  const favs = getFavs();
  let list = searchGuides(state.q, state.cat)
    .filter(g => !state.diff || g.difficulty === state.diff)
    .filter(g => !state.time || (g.minutes || 999) <= +state.time)
    .filter(g => !state.fav || favs.has(g.id));
  if (SORTS[state.sort]) list = [...list].sort(SORTS[state.sort]);
  return list;
}
function diagResults() {
  if (typeof searchDiagnostics !== "function") return [];
  return state.q ? searchDiagnostics(state.q).slice(0, 4) : [];
}
function postResults() {
  const words = queryWords(state.q);
  const posts = loadPosts();
  if (!words.length) return posts.slice(0, 20);
  return posts.filter(p => scoreText([[p.title, 3], [p.body || "", 1], [p.symptom || "", 2], [p.cause || "", 2]], words) > 0);
}

function diagCard(d) {
  return `
    <a class="grow" href="diagnostic.html?s=${encodeURIComponent(d.id)}">
      <div class="grow-media"><div class="gcard-icon">${icon("stethoscope")}</div></div>
      <div><h3>${escapeHtml(d.title)}</h3><p>${escapeHtml(d.intro)}</p>
        <div class="gcard-meta"><span class="tag tag-soft">Diagnostic guidé</span><span>${d.causes.length} causes possibles</span></div></div>
      ${icon("chevron")}
    </a>`;
}
function postCard(p) {
  const label = { question: "Question", astuce: "Astuce", intervention: "Retour de réparateur" }[p.type] || "Discussion";
  return `
    <a class="grow" href="communaute.html#post-${encodeURIComponent(p.id)}">
      <div class="grow-media"><div class="gcard-icon">${icon(p.type === "intervention" ? "wrench" : "chat")}</div></div>
      <div><h3>${escapeHtml(p.title)}</h3><p>${escapeHtml(p.body || p.cause || "")}</p>
        <div class="gcard-meta"><span class="tag tag-soft">${label}</span><span>${escapeHtml(formatDate(p.date))}</span></div></div>
      ${icon("chevron")}
    </a>`;
}

function render() {
  const words = queryWords(state.q);
  const guides = guideResults(), diags = diagResults(), posts = postResults();
  $("page-title").innerHTML = state.q
    ? `Résultats pour <span class="accent">« ${escapeHtml(state.q)} »</span>`
    : state.fav ? `Mes <span class="accent">favoris</span>`
    : state.cat ? `${escapeHtml(categoryById(state.cat).name)}`
    : `Tous les <span class="accent">guides</span>`;
  document.title = (state.q ? `« ${state.q} » — ` : "") + "Rechercher un guide — Les Pages Bleues";

  const tabs = [["all", "Tous", guides.length + diags.length + (state.q ? posts.length : 0)], ["guides", "Guides", guides.length], ["diag", "Diagnostics", diags.length], ["posts", "Discussions", posts.length]];
  $("tabs").innerHTML = tabs.map(([k, t, n]) =>
    `<button class="tab" role="tab" type="button" data-tab="${k}" aria-selected="${state.tab === k}">${t}<span class="chip-n">${n}</span></button>`).join("");
  $("filterbar").hidden = state.tab === "diag" || state.tab === "posts";
  favBtn.classList.toggle("active", state.fav);
  favBtn.setAttribute("aria-pressed", state.fav);

  const out = [`<h2 class="sr-only">Résultats</h2>`];
  let count = "";
  if (state.tab === "all" || state.tab === "guides") {
    count = `<strong>${guides.length}</strong> guide${guides.length > 1 ? "s" : ""}${state.q ? ` pour « ${escapeHtml(state.q)} »` : ""}`;
    if (state.tab === "all" && diags.length) out.push(`<h2 class="section-head" style="font-size:1.1rem;margin:0 0 10px">Diagnostics guidés</h2><div class="rows">${diags.slice(0, 2).map(diagCard).join("")}</div><h2 class="section-head" style="font-size:1.1rem;margin:22px 0 10px">Guides</h2>`);
    if (guides.length) {
      out.push(`<div class="rows" id="guide-rows">${guides.slice(0, state.shown).map(g => guideRow(g, words)).join("")}</div>`);
      if (guides.length > state.shown) out.push(`<div class="more-row"><button class="btn btn-ghost" type="button" data-more>Voir plus de résultats (${guides.length - state.shown})</button></div>`);
    } else {
      const favEmpty = state.fav && !getFavs().size;
      out.push(`<div class="empty">${icon(favEmpty ? "heart" : "search")}
        <h3>${favEmpty ? "Pas encore de favoris" : "Aucun guide ne correspond"}</h3>
        <p>${favEmpty ? "Touchez le cœur d'une fiche pour la retrouver ici, même sans réseau." : "Essayez d'autres mots, retirez des filtres ou lancez le diagnostic guidé."}</p>
        <div class="empty-actions"><button class="btn btn-ghost" type="button" data-reset>Effacer les filtres</button>
        <a class="btn btn-primary" href="diagnostic.html${state.q ? "?q=" + encodeURIComponent(state.q) : ""}">${icon("stethoscope")}Diagnostic guidé</a></div></div>`);
    }
    if (state.tab === "all" && state.q && posts.length) out.push(`<h2 class="section-head" style="font-size:1.1rem;margin:22px 0 10px">Discussions</h2><div class="rows">${posts.slice(0, 3).map(postCard).join("")}</div>`);
  } else if (state.tab === "diag") {
    count = `<strong>${diags.length}</strong> diagnostic${diags.length > 1 ? "s" : ""} guidé${diags.length > 1 ? "s" : ""}`;
    out.push(diags.length ? `<div class="rows">${diags.map(diagCard).join("")}</div>`
      : `<div class="empty">${icon("stethoscope")}<h3>${state.q ? "Aucun diagnostic pour cette recherche" : "Tapez un symptôme"}</h3><p>Le diagnostic guidé couvre les pannes les plus courantes. Décrivez la vôtre avec vos mots.</p><div class="empty-actions"><a class="btn btn-primary" href="diagnostic.html${state.q ? "?q=" + encodeURIComponent(state.q) : ""}">Ouvrir le diagnostic</a></div></div>`);
  } else {
    count = `<strong>${posts.length}</strong> discussion${posts.length > 1 ? "s" : ""}`;
    out.push(posts.length ? `<div class="rows">${posts.map(postCard).join("")}</div>`
      : `<div class="empty">${icon("chat")}<h3>Aucune discussion</h3><p>Les questions et astuces de la communauté apparaîtront ici.</p><div class="empty-actions"><a class="btn btn-primary" href="communaute.html?ask=1">Poser une question</a></div></div>`);
  }
  $("count").innerHTML = count;
  $("results").innerHTML = out.join("");
  $("ask-diag").href = "diagnostic.html" + (state.q ? "?q=" + encodeURIComponent(state.q) : "");
  $("ask-q").href = "communaute.html?ask=1" + (state.q ? "&q=" + encodeURIComponent(state.q) : "");

  const url = new URL(location.href);
  url.searchParams.delete("focus");
  for (const [k, v] of Object.entries({ q: state.q, tab: state.tab === "all" ? "" : state.tab, cat: state.cat, diff: state.diff, time: state.time, fav: state.fav ? "1" : "", sort: state.sort === "pertinence" ? "" : state.sort })) {
    v ? url.searchParams.set(k, v) : url.searchParams.delete(k);
  }
  history.replaceState(null, "", url);
}

$("tabs").addEventListener("click", e => {
  const b = e.target.closest("[data-tab]");
  if (b) { state.tab = b.dataset.tab; state.shown = PAGE; render(); }
});
$("tabs").addEventListener("keydown", e => {
  if (!["ArrowLeft", "ArrowRight"].includes(e.key)) return;
  const tabs = [...$("tabs").querySelectorAll("[data-tab]")];
  const i = tabs.findIndex(t => t.dataset.tab === state.tab);
  const n = tabs[(i + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length];
  state.tab = n.dataset.tab; render();
  $("tabs").querySelector(`[data-tab="${state.tab}"]`).focus();
});
for (const [el, key] of [[fCat, "cat"], [fDiff, "diff"], [fTime, "time"], [sortSel, "sort"]]) {
  el.addEventListener("change", () => { state[key] = el.value; state.shown = PAGE; render(); });
}
favBtn.addEventListener("click", () => { state.fav = !state.fav; state.shown = PAGE; render(); });
$("results").addEventListener("click", e => {
  if (e.target.closest("[data-more]")) { state.shown += PAGE; render(); }
  if (e.target.closest("[data-reset]")) {
    Object.assign(state, { q: "", cat: "", diff: "", time: "", fav: false, shown: PAGE });
    qInput.value = ""; fCat.value = ""; fDiff.value = ""; fTime.value = "";
    render();
  }
});
$("search-form").addEventListener("submit", e => {
  e.preventDefault();
  state.q = qInput.value.trim(); state.shown = PAGE;
  qInput.blur();
  render();
});
let debounce;
qInput.addEventListener("input", () => {
  clearTimeout(debounce);
  debounce = setTimeout(() => { state.q = qInput.value.trim(); state.shown = PAGE; render(); }, 150);
});

render();
