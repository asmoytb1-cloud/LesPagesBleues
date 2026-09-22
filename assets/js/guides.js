/* Les Pages Bleues — liste et recherche de guides */

renderHeader("guides");
renderFooter();
hydrateIcons();

const params = new URLSearchParams(location.search);
let query = params.get("q") || "";
let cat = params.get("cat") || "";

const qInput = document.getElementById("q");
qInput.value = query;

function renderFilters() {
  document.getElementById("filters").innerHTML =
    `<button class="chip ${cat ? "" : "active"}" data-cat="">Tous</button>` +
    CATEGORIES.map(c => `<button class="chip ${c.id === cat ? "active" : ""}" data-cat="${c.id}">${c.name}</button>`).join("");
}

function render() {
  const results = searchGuides(query, cat);
  const count = document.getElementById("count");
  const where = cat ? ` dans « ${categoryById(cat).name} »` : "";
  count.textContent = `${results.length} guide${results.length > 1 ? "s" : ""}${where}${query ? ` pour « ${query} »` : ""}`;
  document.getElementById("results").innerHTML = results.length
    ? results.map(guideCard).join("")
    : `<div class="empty" style="grid-column:1/-1">${icon("search")}<h3>Aucun guide pour l'instant</h3>
       <p class="muted" style="margin:.5rem 0 1.2rem">Vous savez comment faire ? Soyez le premier à partager la solution.</p>
       <a class="btn btn-primary" href="ajouter.html">${icon("plus")}Ajouter une fiche</a></div>`;
  renderFilters();

  const url = new URL(location.href);
  query ? url.searchParams.set("q", query) : url.searchParams.delete("q");
  cat ? url.searchParams.set("cat", cat) : url.searchParams.delete("cat");
  history.replaceState(null, "", url);
}

document.getElementById("filters").addEventListener("click", e => {
  const b = e.target.closest("[data-cat]");
  if (!b) return;
  cat = b.dataset.cat;
  render();
});
document.getElementById("search-form").addEventListener("submit", e => {
  e.preventDefault();
  query = qInput.value.trim();
  render();
});
qInput.addEventListener("input", () => { query = qInput.value.trim(); render(); });

render();
