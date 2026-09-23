/* Les Pages Bleues — page d'accueil */

renderHeader("accueil");
renderFooter();

// Domaines principaux, avec photo et nombre de fiches
const countIn = id => allGuides().filter(g => inCategory(g, id)).length;
document.getElementById("cat-grid").innerHTML = topCategories().map(c => c.photo ? `
  <a class="cat-tile" href="${categoryUrl(c)}">
    <img ${imgSrc(photoUrl(c.photo), "(max-width: 600px) 50vw, 200px")} alt="" decoding="async">
    <span class="cat-count">${countIn(c.id)}</span>
    <span class="cat-tile-body"><strong>${escapeHtml(c.name)}</strong><small>${escapeHtml(c.desc)}</small></span>
  </a>` : `
  <a class="cat-tile no-photo" href="categories.html#autres">
    ${icon("more", "more-ico")}
    <span class="cat-tile-body"><strong>${escapeHtml(c.name)}</strong><small>${escapeHtml(c.desc)}</small></span>
  </a>`).join("");

// Chiffres réels, calculés à partir du contenu du site (pas de chiffres inventés)
const sourcesCount = GUIDES.reduce((n, g) => n + (g.sources || []).length, 0);
// moyenne sur les fiches qui chiffrent une économie (les fiches d'entretien n'en indiquent pas)
const priced = GUIDES.map(g => parseInt((g.savings || "").replace(/\D/g, ""), 10)).filter(n => n > 0);
const avgSaving = Math.round(priced.reduce((n, v) => n + v, 0) / priced.length);
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
        ${src ? `<img class="resume-thumb" ${imgSrc(src, "80px")} alt="" loading="lazy">` : `<span class="resume-thumb gcard-icon">${icon(categoryById(g.category).icon)}</span>`}
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

// Mon matériel : raccourcis vers les fiches de chaque appareil enregistré
const materiel = loadMateriel();
if (materiel.length) {
  document.getElementById("mat-strip").innerHTML = materiel.map(m => {
    const n = guidesForMateriel(m).length;
    return `<a class="mat-chip" href="${n ? "guides.html?materiel=" + m.id : "materiel.html#mat-" + m.id}">${icon(m.icon || "box")}${escapeHtml(materielName(m))}${m.year ? ` <small>${m.year}</small>` : ""} <small>· ${n} fiche${n > 1 ? "s" : ""}</small></a>`;
  }).join("") + `<a class="mat-chip" href="materiel.html">${icon("plus")}Ajouter</a>`;
}

// Carnets d'entretien : ce qui est en retard, défaillant ou proche, tous matériels confondus
const due = [];
for (const m of materiel) {
  const c = loadCarnet(m.id);
  for (const t of carnetPlan(m, c)) {
    if (t.off) continue;
    const st = taskStatus(m, c, t);
    if (["defaillant", "retard", "bientot"].includes(st.state)) due.push({ m, t, st });
  }
}
if (due.length) {
  const rank = { defaillant: 0, retard: 1, bientot: 2 };
  due.sort((a, b) => rank[a.st.state] - rank[b.st.state] || (a.st.days ?? 0) - (b.st.days ?? 0));
  const box = document.getElementById("home-due");
  box.hidden = false;
  box.innerHTML = `<h3>${icon("wrench")} Entretiens à prévoir</h3><ul>${due.slice(0, 5).map(({ m, t, st }) => `
    <li><a href="carnet.html?id=${m.id}"><span class="st st-${st.state}">${st.state === "defaillant" ? "Défaillant" : st.state === "retard" ? "En retard" : "Bientôt"}</span>
      <strong>${escapeHtml(t.label)}</strong> <small>${escapeHtml(materielName(m))}${st.days != null ? ` · ${relDays(st.days)}` : ""}</small></a></li>`).join("")}</ul>`;
}
