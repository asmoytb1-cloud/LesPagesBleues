/* Les Pages Bleues — toutes les catégories */

renderHeader("categories");
renderFooter();

const countIn = id => allGuides().filter(g => inCategory(g, id)).length;
const plural = n => `${n} fiche${n > 1 ? "s" : ""}`;

document.getElementById("cat-main").innerHTML = topCategories().filter(c => c.photo).map(c => `
  <a class="cat-tile cat-big" href="guides.html?cat=${c.id}">
    <img src="${photoUrl(c.photo)}" alt="" loading="lazy" decoding="async">
    <span class="cat-count">${plural(countIn(c.id))}</span>
    <span class="cat-tile-body"><strong>${escapeHtml(c.name)}</strong><small>${escapeHtml(c.desc)}</small></span>
  </a>`).join("");

const others = subCategories("autres");
document.getElementById("cat-other").id = "autres";
document.getElementById("autres").innerHTML = others.map(c => `
  <a class="cat-small" href="guides.html?cat=${c.id}">
    ${icon(c.icon)}<strong>${escapeHtml(c.name)}</strong><small>${plural(countIn(c.id))}</small>
  </a>`).join("") + `
  <a class="cat-small" href="ajouter.html">
    ${icon("plus")}<strong>Votre domaine</strong><small>Proposez la première fiche</small>
  </a>`;

hydrateIcons();
