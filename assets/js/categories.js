/* Les Pages Bleues — tous les domaines : une tuile par domaine (icône, nom, nombre de fiches) */

renderHeader("categories");
renderFooter();

const countIn = id => allGuides().filter(g => inCategory(g, id)).length;
const plural = n => `${n} fiche${n > 1 ? "s" : ""}`;
const tile = c => `
  <a class="domain-tile" href="${categoryUrl(c)}">
    <span class="tile-ico">${icon(c.icon)}</span>
    <span><strong>${escapeHtml(c.name)}</strong><small>${escapeHtml(c.desc)} · ${plural(countIn(c.id))}</small></span>
    ${icon("chevron")}
  </a>`;

// Les domaines principaux, puis le détail de « Autres » (mode, instruments…)
document.getElementById("cat-main").innerHTML =
  topCategories().filter(c => c.id !== "autres").map(tile).join("") + subCategories("autres").map(tile).join("") + `
  <a class="domain-tile" href="ajouter.html">
    <span class="tile-ico tint-slate">${icon("plus")}</span>
    <span><strong>Votre domaine</strong><small>Proposez la première fiche</small></span>
    ${icon("chevron")}
  </a>`;
