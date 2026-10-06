/* Les Pages Bleues — accueil : une question, une recherche, quatre choix.
   En dessous, seulement ce qui vous concerne : la réparation en cours et les entretiens à prévoir. */

renderHeader("accueil");
renderFooter();
hydrateIcons();

const prof = getProfile();
if (prof.name) document.getElementById("hello").textContent = `Bonjour ${prof.name.split(/\s+/)[0]}`;

// La recherche propose les fiches pendant la frappe ; « Entrée » lance le diagnostic avec la description
attachSuggest(document.getElementById("hero-q"), document.getElementById("hero-suggest"));

const materiel = loadMateriel();
if (materiel.length) {
  const n = document.getElementById("home-mat-count");
  n.innerHTML = `${materiel.length}<span class="sr-only"> enregistré${materiel.length > 1 ? "s" : ""}</span>`;
  n.hidden = false;
}

const more = [];

// Réparation commencée et pas terminée : la plus récente d'abord (une seule, pour rester simple)
const started = inProgressGuides();
if (started.length) {
  const g = started[0];
  const done = getProgress(g.id);
  const pct = Math.round(done.size / g.steps.length * 100);
  const next = g.steps.findIndex((_, i) => !done.has(i));
  const src = guidePhoto(g);
  more.push(`
    <section id="resume" aria-labelledby="resume-h">
      <h2 id="resume-h">Reprendre ma réparation</h2>
      <a class="resume-card" href="${guideUrl(g, "coach=1")}">
        ${src ? `<img class="resume-thumb" ${imgSrc(src, "64px")} alt="" loading="lazy">` : `<span class="resume-thumb gcard-icon">${icon(categoryById(g.category).icon)}</span>`}
        <span class="resume-txt">
          <strong>${escapeHtml(g.title)}</strong>
          <small>Étape ${next + 1} sur ${g.steps.length} : ${escapeHtml(g.steps[next].title)}</small>
        </span>
        <span class="resume-go"><span class="progress" role="img" aria-label="${pct} % fait"><span style="width:${pct}%"></span></span>
          <span class="btn btn-primary btn-sm">${icon("play")} Reprendre</span></span>
      </a>
      ${started.length > 1 ? `<p style="margin-top:8px"><a class="link-arrow" href="profil.html?tab=repairs">${started.length - 1} autre${started.length > 2 ? "s" : ""} en cours ${icon("arrow")}</a></p>` : ""}
    </section>`);
}

// Entretiens à faire ou bientôt, tous matériels confondus (trois au plus)
const due = careItems(materiel).filter(x => ["defaillant", "retard", "bientot"].includes(x.st.state)).sort(byUrgency);
if (due.length) {
  more.push(`
    <section id="due" aria-labelledby="due-h">
      <h2 id="due-h">À prévoir</h2>
      <ul class="lgroup" id="home-due">${due.slice(0, 3).map(({ m, t, st }) => `
        <li><a class="lrow" href="carnet.html?id=${m.id}&amp;task=${encodeURIComponent(t.id)}">
          <span class="tile-ico tint-amber">${icon(m.icon || "box")}</span>
          <span class="lrow-text"><strong>${escapeHtml(t.label)}</strong><small>${escapeHtml(materielName(m))}${dueText(st) ? ` · ${escapeHtml(dueText(st))}` : ""}</small></span>
          ${statusPill(st.state)}
        </a></li>`).join("")}</ul>
      ${due.length > 3 ? `<p style="margin-top:8px"><a class="link-arrow" href="entretien.html">Tous les entretiens ${icon("arrow")}</a></p>` : ""}
    </section>`);
}

document.getElementById("home-more").innerHTML = more.join("");
