/* Les Pages Bleues — liste, recherche, filtres et tri des guides */

renderHeader("guides");
renderFooter();
hydrateIcons();

const params = new URLSearchParams(location.search);
const state = {
  q: params.get("q") || "",
  cat: params.get("cat") || "",
  diff: params.get("diff") || "",
  fav: params.get("fav") === "1",
  sort: params.get("sort") || "pertinence"
};

const qInput = document.getElementById("q");
const sortSel = document.getElementById("sort");
const favBtn = document.getElementById("fav-toggle");
qInput.value = state.q;
sortSel.value = state.sort;
if (params.get("focus")) qInput.focus();

const euros = g => parseInt((g.savings || "0").replace(/\D/g, ""), 10) || 0;
const SORTS = {
  duree: (a, b) => (a.minutes || 999) - (b.minutes || 999),
  facile: (a, b) => DIFFICULTIES.indexOf(a.difficulty) - DIFFICULTIES.indexOf(b.difficulty) || (a.minutes || 999) - (b.minutes || 999),
  economie: (a, b) => euros(b) - euros(a),
  az: (a, b) => a.title.localeCompare(b.title, "fr")
};

function renderFilters() {
  const count = id => searchGuides(state.q, id).length;
  document.getElementById("filters").innerHTML =
    `<button class="chip ${state.cat ? "" : "active"}" data-cat="" aria-pressed="${!state.cat}">Tous <span class="chip-n">${count("")}</span></button>` +
    CATEGORIES.map(c => `<button class="chip ${c.id === state.cat ? "active" : ""}" data-cat="${c.id}" aria-pressed="${c.id === state.cat}">${c.name} <span class="chip-n">${count(c.id)}</span></button>`).join("");
  document.getElementById("diff").innerHTML = ["", ...DIFFICULTIES].map(d =>
    `<button type="button" class="${state.diff === d ? "on" : ""}" data-diff="${d}" aria-pressed="${state.diff === d}">${d || "Toutes difficultés"}</button>`).join("");
  favBtn.classList.toggle("active", state.fav);
  favBtn.setAttribute("aria-pressed", state.fav);
}

function render() {
  const favs = getFavs();
  let results = searchGuides(state.q, state.cat)
    .filter(g => !state.diff || g.difficulty === state.diff)
    .filter(g => !state.fav || favs.has(g.id));
  if (SORTS[state.sort]) results = [...results].sort(SORTS[state.sort]);

  const parts = [];
  if (state.cat) parts.push(`dans « ${categoryById(state.cat).name} »`);
  if (state.q) parts.push(`pour « ${state.q} »`);
  if (state.diff) parts.push(`niveau ${state.diff.toLowerCase()}`);
  if (state.fav) parts.push("parmi vos favoris");
  document.getElementById("count").textContent =
    `${results.length} guide${results.length > 1 ? "s" : ""} ${parts.join(", ")}`.trim();

  const empty = state.fav && !favs.size
    ? `<div class="empty" style="grid-column:1/-1">${icon("heart")}<h3>Pas encore de favoris</h3>
       <p class="muted" style="margin:.5rem 0 1.2rem">Touchez le cœur d'une fiche pour la retrouver ici, même sans réseau.</p>
       <button class="btn btn-ghost" type="button" data-reset>Voir tous les guides</button></div>`
    : `<div class="empty" style="grid-column:1/-1">${icon("search")}<h3>Aucun guide pour l'instant</h3>
       <p class="muted" style="margin:.5rem 0 1.2rem">Vous savez comment faire ? Soyez le premier à partager la solution.</p>
       <div class="empty-actions"><a class="btn btn-primary" href="ajouter.html">${icon("plus")}Ajouter une fiche</a>
       <button class="btn btn-ghost" type="button" data-reset>Effacer les filtres</button></div></div>`;
  document.getElementById("results").innerHTML = results.length ? results.map(guideCard).join("") : empty;
  renderFilters();

  const url = new URL(location.href);
  url.searchParams.delete("focus");
  for (const [k, v] of Object.entries({ q: state.q, cat: state.cat, diff: state.diff, fav: state.fav ? "1" : "", sort: state.sort === "pertinence" ? "" : state.sort })) {
    v ? url.searchParams.set(k, v) : url.searchParams.delete(k);
  }
  history.replaceState(null, "", url);
}

document.getElementById("filters").addEventListener("click", e => {
  const b = e.target.closest("[data-cat]");
  if (b) { state.cat = b.dataset.cat; render(); }
});
document.getElementById("diff").addEventListener("click", e => {
  const b = e.target.closest("[data-diff]");
  if (b) { state.diff = b.dataset.diff; render(); }
});
favBtn.addEventListener("click", () => { state.fav = !state.fav; render(); });
sortSel.addEventListener("change", () => { state.sort = sortSel.value; render(); });
document.getElementById("results").addEventListener("click", e => {
  if (!e.target.closest("[data-reset]")) return;
  Object.assign(state, { q: "", cat: "", diff: "", fav: false });
  qInput.value = "";
  render();
});
document.getElementById("search-form").addEventListener("submit", e => {
  e.preventDefault();
  state.q = qInput.value.trim();
  qInput.blur();
  render();
});
let debounce;
qInput.addEventListener("input", () => {
  clearTimeout(debounce);
  debounce = setTimeout(() => { state.q = qInput.value.trim(); render(); }, 120);
});

render();
