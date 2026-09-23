/* Les Pages Bleues — page d'accueil */

renderHeader("accueil");
renderFooter();

// Domaines principaux, avec photo et nombre de fiches
const countIn = id => allGuides().filter(g => inCategory(g, id)).length;
document.getElementById("cat-grid").innerHTML = topCategories().map(c => c.photo ? `
  <a class="cat-tile" href="${categoryUrl(c)}">
    <img src="${photoUrl(c.photo)}" alt="" decoding="async">
    <span class="cat-count">${countIn(c.id)}</span>
    <span class="cat-tile-body"><strong>${escapeHtml(c.name)}</strong><small>${escapeHtml(c.desc)}</small></span>
  </a>` : `
  <a class="cat-tile no-photo" href="categories.html#autres">
    ${icon("more", "more-ico")}
    <span class="cat-tile-body"><strong>${escapeHtml(c.name)}</strong><small>${escapeHtml(c.desc)}</small></span>
  </a>`).join("");

// Chiffres réels, calculés à partir du contenu du site (pas de chiffres inventés)
const sourcesCount = GUIDES.reduce((n, g) => n + (g.sources || []).length, 0);
const avgSaving = Math.round(GUIDES.reduce((n, g) => n + (parseInt((g.savings || "0").replace(/\D/g, ""), 10) || 0), 0) / GUIDES.length);
document.getElementById("stats").innerHTML = `
  <div class="stat">${icon("doc")}<div><strong>${GUIDES.length} guides</strong><small>vérifiés, dans ${topCategories().length - 1} domaines</small></div></div>
  <div class="stat">${icon("shield")}<div><strong>${sourcesCount} sources</strong><small>citées pour vérifier les fiches</small></div></div>
  <div class="stat">${icon("coins")}<div><strong>≈ ${avgSaving} €</strong><small>d'économie estimée par réparation</small></div></div>
  <div class="stat">${icon("heart", "fill")}<div><strong>100 % gratuit</strong><small>sans inscription</small></div></div>`;

// Problème du moment : carrousel des fiches populaires, puis des réparations rapides
const popular = [...GUIDES.filter(g => g.popular), ...GUIDES.filter(g => !g.popular && g.minutes <= 30)].slice(0, 10);
const track = document.getElementById("popular");
track.innerHTML = popular.map(guideCard).join("");
const prev = document.querySelector(".carousel-btn.prev");
const next = document.querySelector(".carousel-btn.next");
const step = () => track.querySelector(".gcard").getBoundingClientRect().width + 16;
const paintArrows = () => {
  prev.disabled = track.scrollLeft < 8;
  next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 8;
};
prev.addEventListener("click", () => track.scrollBy({ left: -step(), behavior: "smooth" }));
next.addEventListener("click", () => track.scrollBy({ left: step(), behavior: "smooth" }));
track.addEventListener("scroll", paintArrows, { passive: true });
window.addEventListener("resize", paintArrows);
paintArrows();

// Réparations commencées et pas terminées
const started = inProgressGuides();
if (started.length) {
  document.getElementById("resume").hidden = false;
  document.getElementById("resume-list").innerHTML = started.map(g => {
    const done = getProgress(g.id);
    const pct = Math.round(done.size / g.steps.length * 100);
    const nextStep = g.steps.findIndex((_, i) => !done.has(i));
    const src = guidePhoto(g);
    return `
      <a class="resume-card" href="${guideUrl(g, "coach=1")}">
        ${src ? `<img class="resume-thumb" src="${src}" alt="" loading="lazy">` : `<span class="resume-thumb gcard-icon">${icon(categoryById(g.category).icon)}</span>`}
        <span class="resume-txt">
          <strong>${escapeHtml(g.title)}</strong>
          <small>Prochaine étape : ${nextStep + 1}. ${escapeHtml(g.steps[nextStep].title)}</small>
          <span class="progress"><span style="width:${pct}%"></span></span>
        </span>
        <span class="btn btn-primary btn-sm">${icon("play")}<span class="hide-xs">Reprendre</span></span>
      </a>`;
  }).join("");
}

hydrateIcons();
attachSuggest(document.getElementById("hero-q"), document.getElementById("hero-suggest"));
