/* Les Pages Bleues — « Plus » : le suivi, la communauté, les réglages et les informations, rangés.
   Les liens sont dans la page (lisibles sans JavaScript) ; ce script ajoute les compteurs et le choix du thème. */

renderHeader("plus");
renderFooter();
hydrateIcons();

const favs = getFavs().size;
if (favs) document.getElementById("plus-favs").textContent = `${favs} fiche${favs > 1 ? "s" : ""} gardée${favs > 1 ? "s" : ""} sous la main`;
const repaired = allGuides().filter(g => getResult(g.id) === "ok").length;
const ongoing = inProgressGuides().length;
if (repaired || ongoing) document.getElementById("plus-repairs").textContent =
  [ongoing && `${ongoing} en cours`, repaired && `${repaired} réussie${repaired > 1 ? "s" : ""}`].filter(Boolean).join(" · ");

// Apparence : automatique (comme l'appareil), clair ou sombre
const choice = document.getElementById("theme-choice");
const buttons = [...choice.querySelectorAll("[data-theme-choice]")];
const paint = () => {
  const pref = themePref();
  buttons.forEach(b => {
    const on = b.dataset.themeChoice === pref;
    b.setAttribute("aria-checked", on);
    b.tabIndex = on ? 0 : -1;
  });
};
const pick = b => { setTheme(b.dataset.themeChoice); paint(); };
choice.addEventListener("click", e => { const b = e.target.closest("[data-theme-choice]"); if (b) pick(b); });
choice.addEventListener("keydown", e => {
  const i = buttons.findIndex(b => b.getAttribute("aria-checked") === "true");
  const to = ["ArrowRight", "ArrowDown"].includes(e.key) ? (i + 1) % buttons.length : ["ArrowLeft", "ArrowUp"].includes(e.key) ? (i - 1 + buttons.length) % buttons.length : -1;
  if (to < 0) return;
  e.preventDefault();
  pick(buttons[to]);
  buttons[to].focus();
});
paint();
