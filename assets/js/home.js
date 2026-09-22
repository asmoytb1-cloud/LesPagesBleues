/* Les Pages Bleues — page d'accueil */

renderHeader("");
renderFooter();

document.getElementById("benefits").innerHTML = [
  ["leaf", "Moins de déchets", "Un geste pour la planète"],
  ["wallet", "Plus d'économies", "Réparez au lieu de remplacer"],
  ["cap", "Plus d'autonomie", "Le savoir accessible à tous"]
].map(([i, t, s]) => `<div class="benefit">${icon(i)}<div><strong>${t}</strong><small>${s}</small></div></div>`).join("");

document.getElementById("cat-grid").innerHTML = CATEGORIES.map((c, i) => `
  <a class="cat-card ${i === 0 ? "active" : ""} ${c.id === "autres" ? "more" : ""}" href="guides.html?cat=${c.id}">
    ${icon(c.icon, "cat-ico")}
    <div class="cat-foot"><span>${c.name}</span>${c.id === "autres" ? "" : icon("arrow")}</div>
  </a>`).join("");

document.getElementById("how").innerHTML = [
  ["search", "Recherchez", "Votre objet ou votre problème"],
  ["doc", "Suivez un guide", "Étape par étape, avec photos et vidéos"],
  ["wrench", "Réparez", "Avec les bons outils et les bonnes pièces"],
  ["share", "Partagez", "Vos astuces pour aider la communauté"]
].map(([i, t, s], n) => `<li><span class="num">${n + 1}</span>${icon(i)}<div><strong>${t}</strong><small>${s}</small></div></li>`).join("");

document.getElementById("popular").innerHTML = GUIDES.filter(g => g.popular).map(guideCard).join("");

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
