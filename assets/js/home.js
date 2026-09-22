/* Les Pages Bleues — page d'accueil */

renderHeader("");
renderFooter();

document.getElementById("benefits").innerHTML = [
  ["leaf", "Moins de déchets", "Un geste pour la planète"],
  ["wallet", "Plus d'économies", "Réparez au lieu de remplacer"],
  ["cap", "Plus d'autonomie", "Le savoir accessible à tous"]
].map(([i, t, s]) => `<div class="benefit">${icon(i)}<div><strong>${t}</strong><small>${s}</small></div></div>`).join("");

const countByCat = id => allGuides().filter(g => g.category === id).length;
document.getElementById("cat-grid").innerHTML = CATEGORIES.map((c, i) => `
  <a class="cat-card ${i === 0 ? "active" : ""} ${c.id === "autres" ? "more" : ""}" href="guides.html?cat=${c.id}">
    <span class="cat-count">${countByCat(c.id)}</span>
    ${icon(c.icon, "cat-ico")}
    <div class="cat-foot"><span>${c.name}</span>${c.id === "autres" ? "" : icon("arrow")}</div>
  </a>`).join("");

document.getElementById("how").innerHTML = [
  ["search", "Recherchez", "Votre objet ou votre problème"],
  ["doc", "Suivez un guide", "Étape par étape, en mode accompagné"],
  ["wrench", "Réparez", "Avec les bons outils et les bonnes pièces"],
  ["share", "Partagez", "Vos astuces pour aider la communauté"]
].map(([i, t, s], n) => `<li><span class="num">${n + 1}</span>${icon(i)}<div><strong>${t}</strong><small>${s}</small></div></li>`).join("");

document.getElementById("popular").innerHTML = GUIDES.filter(g => g.popular).map(guideCard).join("");
document.getElementById("express").innerHTML = GUIDES.filter(g => g.minutes <= 20 && !g.popular).slice(0, 4).map(guideCard).join("");

// Réparations commencées et pas terminées
const started = inProgressGuides();
if (started.length) {
  document.getElementById("resume").hidden = false;
  document.getElementById("resume-list").innerHTML = started.map(g => {
    const done = getProgress(g.id).size;
    const pct = Math.round(done / g.steps.length * 100);
    const next = g.steps.findIndex((_, i) => !getProgress(g.id).has(i));
    return `
      <a class="resume-card" href="guide.html?id=${encodeURIComponent(g.id)}&coach=1">
        <span class="resume-ico">${icon(categoryById(g.category).icon)}</span>
        <span class="resume-txt">
          <strong>${escapeHtml(g.title)}</strong>
          <small>Prochaine étape : ${next + 1}. ${escapeHtml(g.steps[next].title)}</small>
          <span class="progress"><span style="width:${pct}%"></span></span>
        </span>
        <span class="btn btn-primary btn-sm">${icon("play")}<span class="hide-xs">Reprendre</span></span>
      </a>`;
  }).join("");
}

document.getElementById("domain-strip").innerHTML = [
  ["automobile", "car", "Automobile"],
  ["maison", "drill", "Maison"],
  ["electromenager", "washer", "Électroménager"],
  ["velo", "bike", "Vélo"],
  ["telephonie", "laptop", "Électronique"],
  ["", "wrench", "Et bien plus"]
].map(([id, i, t]) => `<a href="guides.html${id ? "?cat=" + id : ""}">${icon(i)}${t}</a>`).join("");

hydrateIcons();

// Compteurs animés à l'apparition
const fmt = new Intl.NumberFormat("fr-FR");
const counters = document.querySelectorAll("[data-count]");
const animate = el => {
  const target = +el.dataset.count;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) { el.textContent = "+ " + fmt.format(target); return; }
  const t0 = performance.now();
  const tick = t => {
    const p = Math.min(1, (t - t0) / 1400);
    el.textContent = "+ " + fmt.format(Math.round(target * (1 - Math.pow(1 - p, 3))));
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) { animate(e.target); io.unobserve(e.target); }
  }), { threshold: .5 });
  counters.forEach(c => io.observe(c));
} else counters.forEach(animate);

/* Suggestions instantanées dans la recherche de l'accueil */
(() => {
  const input = document.getElementById("hero-q");
  const box = document.getElementById("suggest-box");
  let items = [], active = -1;

  const close = () => { box.hidden = true; input.setAttribute("aria-expanded", "false"); active = -1; };
  const highlight = i => {
    active = i;
    box.querySelectorAll("[role=option]").forEach((el, n) => el.setAttribute("aria-selected", n === i));
    input.setAttribute("aria-activedescendant", i >= 0 ? "sg-" + i : "");
  };
  input.addEventListener("input", () => {
    const q = input.value.trim();
    items = q.length > 1 ? searchGuides(q, "", 0.5).slice(0, 5) : [];
    if (!items.length) {
      if (q.length > 1) {
        box.innerHTML = `<div class="suggest-empty">Pas encore de guide pour « ${escapeHtml(q)} ». <a href="ajouter.html">Écrivez-le !</a></div>`;
        box.hidden = false;
      } else close();
      return;
    }
    box.innerHTML = items.map((g, i) => `
      <a id="sg-${i}" role="option" aria-selected="false" href="guide.html?id=${encodeURIComponent(g.id)}">
        ${icon(categoryById(g.category).icon)}
        <span><strong>${escapeHtml(g.title)}</strong><small>${escapeHtml(g.difficulty)} · ${escapeHtml(g.duration)}</small></span>
      </a>`).join("") + `<a class="suggest-all" href="guides.html?q=${encodeURIComponent(q)}">Voir tous les résultats ${icon("arrow")}</a>`;
    box.hidden = false;
    input.setAttribute("aria-expanded", "true");
    active = -1;
  });
  input.addEventListener("keydown", e => {
    if (box.hidden || !items.length) return;
    if (e.key === "ArrowDown") { e.preventDefault(); highlight((active + 1) % items.length); }
    else if (e.key === "ArrowUp") { e.preventDefault(); highlight((active - 1 + items.length) % items.length); }
    else if (e.key === "Enter" && active >= 0) { e.preventDefault(); location.href = box.querySelector("#sg-" + active).href; }
    else if (e.key === "Escape") close();
  });
  document.addEventListener("click", e => { if (!e.target.closest(".search-wrap")) close(); });
})();
