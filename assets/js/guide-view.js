/* Les Pages Bleues — rendu HTML d'une fiche guide.
   Fonction pure (aucun accès au DOM) : utilisée par la page guide.html et par tools/build.js
   pour générer les pages statiques de /fiches/ (bon référencement, lisibles sans JavaScript).
   Sans JavaScript, les quatre onglets (Étapes, Outils, Pièces, Sécurité) s'affichent les uns sous les autres. */

const fmtWait = sec => {
  if (sec < 60) return `${sec} s`;
  const m = Math.round(sec / 60);
  return m >= 60 ? `${Math.floor(m / 60)} h${m % 60 ? " " + String(m % 60).padStart(2, "0") : ""}` : `${m} min`;
};

// « Pas envie de le faire vous-même ? » : bonus réparation si un appareil de la fiche y donne droit
function bonusBox(g) {
  const b = typeof bonusFor === "function" ? bonusFor(g.devices) : null;
  if (!b) return "";
  return `<div class="bonus-box">
          <strong>${icon("wrench")} Pas envie de le faire vous-même ?</strong>
          <p>Chez un réparateur labellisé <strong>QualiRépar</strong>, le <strong>bonus réparation</strong> déduit ${b.min === b.max ? "" : "de "}${bonusText(b)} de la facture pour cet appareil, s'il n'est plus sous garantie.</p>
          <p><a class="link-arrow" href="${BONUS_REPARATION.find}" rel="noopener" target="_blank">Trouver un réparateur labellisé ${icon("arrow")}</a>
          <small>Barème : <a href="${BONUS_REPARATION.source.url}" rel="noopener" target="_blank">ecosystem</a>.</small></p>
        </div>`;
}

const GUIDE_TABS = [["etapes", "Étapes"], ["outils", "Outils"], ["pieces", "Pièces"], ["securite", "Sécurité"]];

function guidePageHTML(g, st = {}) {
  const c = categoryById(g.category);
  const parent = c.parent ? categoryById(c.parent) : null;
  const done = st.done || new Set();
  const result = st.result || null;
  const questions = st.questions || [];
  const related = (st.related || []).slice(0, 3);
  const photo = guidePhoto(g);
  const mine = loadMateriel().filter(m => guideFitsMateriel(g, m)).slice(0, 2);
  const stepSafety = g.steps.map((s, i) => s.safety ? { n: i + 1, text: s.safety } : null).filter(Boolean);
  const list = (items, ic) => items && items.length
    ? `<ul class="kit-list">${items.map(i => `<li>${icon(ic)}<span>${escapeHtml(i)}</span></li>`).join("")}</ul>`
    : `<p class="muted">Rien de particulier.</p>`;
  const safety = g.safety || "Travaillez dans un endroit dégagé et bien éclairé, appareil débranché, et prenez votre temps.";
  const counts = { outils: (g.tools || []).length, pieces: (g.parts || []).length };

  return `
  <div class="guide-head">
    <div class="container guide-wrap guide-head-inner">
      <nav class="breadcrumb" aria-label="Fil d'Ariane">
        <a href="${ROOT}index.html">${icon("home")} Accueil</a>${icon("chevron")}
        ${parent ? `<a href="${categoryUrl(parent)}">${escapeHtml(parent.name)}</a>${icon("chevron")}` : ""}
        <a href="${categoryUrl(c)}">${escapeHtml(c.name)}</a>
      </nav>
      <div class="guide-tags">
        <span class="tag tag-soft">${escapeHtml(c.short || c.name)}</span>
        ${g.user ? `<span class="tag tag-user">${icon("pencil")} Ma fiche · non relue</span>` : `<span class="tag tag-green">${icon("check")} Vérifiée</span>`}
        ${result === "ok" ? `<span class="tag tag-green">${icon("check")} Réparé</span>` : ""}
        ${mine.map(m => `<a class="tag tag-orange" href="${ROOT}materiel.html?id=${m.id}">${icon("box")} Pour votre ${escapeHtml(materielName(m, true))}</a>`).join("")}
      </div>
      <h1>${escapeHtml(g.title)}</h1>
      <figure class="guide-photo">
        ${photo ? `<img ${imgSrc(photo, "(max-width: 900px) 100vw, 400px")} alt="" width="1000" height="667">` : `<div class="gcard-icon">${icon(c.icon)}</div>`}
      </figure>
      <div class="guide-facts">
        <div class="fact"><small>${icon("gauge")} Difficulté</small><strong>${dots(g)} ${escapeHtml(g.difficulty)}</strong></div>
        <div class="fact"><small>${icon("clock")} Durée</small><strong>${escapeHtml(g.duration || "—")}</strong></div>
        <div class="fact"><small>${icon("coins")} Économie</small><strong>${g.savings ? escapeHtml(g.savings.replace("≈", "≈ ").replace(/\s+/g, " ")) : "—"}</strong></div>
      </div>
      <p class="lead">${escapeHtml(g.summary || "")}</p>
      <div class="guide-actions">
        <a class="btn btn-primary btn-lg btn-coach" id="coach-start" href="${guideUrl(g, "coach=1")}">${icon("play")} <span id="coach-label">Commencer le guide</span></a>
        <button class="btn btn-ghost btn-lg fav-btn" id="fav" type="button" aria-pressed="false">${icon("heart")}<span>Favori</span></button>
        <button class="icon-btn icon-btn-line" id="share" type="button" aria-label="Partager la fiche" title="Partager">${icon("share")}</button>
      </div>
      <p class="coach-hint">${icon("mic")}<span>Mode accompagnement : une étape à la fois, en grand, avec lecture à voix haute et minuteurs.</span></p>
    </div>
  </div>

  <nav class="guide-tabs no-print" aria-label="Sections de la fiche">
    <div class="container guide-wrap"><div class="tabs" id="guide-tabs">
      ${GUIDE_TABS.map(([id, label], i) => `<a class="tab" href="#${id}" id="tab-${id}" data-panel="${id}"${i === 0 ? ' aria-current="true"' : ""}>${label}${counts[id] ? `<span class="chip-n">${counts[id]}</span>` : ""}</a>`).join("")}
    </div></div>
  </nav>

  <div class="container guide-wrap guide-body">
    <section class="tab-panel" id="etapes" aria-labelledby="h-etapes">
      <h2 id="h-etapes">${icon("doc")} Les étapes</h2>
      ${g.safety ? `<div class="safety-box">${icon("shield")}<div><strong>Avant de commencer</strong><p>${escapeHtml(g.safety)}</p></div></div>` : ""}
      <div class="progress-line no-print">
        <strong>Progression</strong>
        <div class="progress"><div id="bar"></div></div>
        <span id="pct">0 %</span>
        <button class="link-btn" id="reset" type="button" hidden>${icon("refresh")} Tout décocher</button>
      </div>
      <ol class="step-list">
        ${g.steps.map((s, i) => `
          <li class="step-item ${done.has(i) ? "done" : ""} ${s.photo ? "has-photo" : ""}" data-i="${i}">
            <button class="step-check" type="button" aria-pressed="${done.has(i)}" aria-label="Étape ${i + 1} faite">${done.has(i) ? icon("check") : i + 1}</button>
            <div>
              <h3>${escapeHtml(s.title)} ${s.timer ? `<span class="wait-badge">${icon("timer")} ${fmtWait(s.timer)}</span>` : ""}</h3>
              <p>${escapeHtml(s.text)}</p>
              ${s.safety ? `<p class="note note-safety">${icon("shield")} <span>${escapeHtml(s.safety)}</span></p>` : ""}
              ${s.tip ? `<p class="note note-tip">${icon("bulb")} <span><strong>Astuce :</strong> ${escapeHtml(s.tip)}</span></p>` : ""}
            </div>
            ${s.photo ? `<div class="step-photo"><img src="${s.photo}" alt="Photo de l'étape ${i + 1}" loading="lazy"></div>` : ""}
          </li>`).join("")}
      </ol>
      <div class="done-box" id="done-box">
        ${icon("check")}
        <div><strong>Ça a marché ?</strong><p>${result === "ok" ? "Vous avez indiqué que la réparation a fonctionné. Bravo !" : "Dernière étape faite ? Dites-nous si la réparation a fonctionné."}</p></div>
        <div class="btns no-print">
          <button class="btn btn-sm ${result === "ok" ? "btn-primary" : "btn-ghost"}" type="button" data-result="ok">${icon("check")} Oui, ça marche</button>
          <button class="btn btn-sm ${result === "ko" ? "btn-primary" : "btn-ghost"}" type="button" data-result="ko">${icon("alert")} Pas encore</button>
        </div>
        ${result === "ok" ? mine.map(m =>
          `<a class="btn btn-sm btn-ghost no-print" href="${ROOT}carnet.html?id=${m.id}&fiche=${g.id}">${icon("calendar")} Noter dans le carnet : ${escapeHtml(materielName(m))}</a>`).join("") : ""}
      </div>
    </section>

    <section class="tab-panel" id="outils" aria-labelledby="h-outils">
      <h2 id="h-outils">${icon("tool")} Outils</h2>
      ${list(g.tools, "tool")}
    </section>

    <section class="tab-panel" id="pieces" aria-labelledby="h-pieces">
      <h2 id="h-pieces">${icon("box")} Pièces</h2>
      ${list(g.parts, "box")}
      ${counts.pieces ? `<p class="kit-note">Relevez la référence sur l'ancienne pièce ou sur la plaque signalétique de l'appareil avant de commander.</p>` : ""}
    </section>

    <section class="tab-panel" id="securite" aria-labelledby="h-securite">
      <h2 id="h-securite">${icon("shield")} Sécurité</h2>
      <div class="safety-box">${icon("shield")}<div><strong>Avant de commencer</strong><p>${escapeHtml(safety)}</p></div></div>
      ${stepSafety.length ? `<ul class="tips-list">${stepSafety.map(x => `<li>${icon("alert")}<span><strong>Étape ${x.n} :</strong> ${escapeHtml(x.text)}</span></li>`).join("")}</ul>` : ""}
      <div class="notice" style="margin-top:12px">${icon("pin")}<p>En cas de doute (électricité, gaz, freins, batterie qui gonfle ou chauffe, appareil sous garantie), confiez la réparation à un professionnel. <a href="${BONUS_REPARATION.find}" rel="noopener" target="_blank">Trouver un réparateur labellisé</a>.</p></div>
    </section>

    ${g.troubleshoot && g.troubleshoot.length ? `
    <section class="guide-sec" id="depannage" aria-labelledby="h-depannage">
      <h2 id="h-depannage">${icon("alert")} Ça ne marche toujours pas ?</h2>
      <ul class="tips-list" id="troubleshoot">${g.troubleshoot.map(t => `<li>${icon("alert")}<span>${escapeHtml(t)}</span></li>`).join("")}</ul>
    </section>` : ""}

    <section class="guide-sec help-sec no-print" id="aide" aria-labelledby="h-aide">
      <h2 id="h-aide">${icon("chat")} Besoin d'aide ?</h2>
      <ul class="lgroup help-list">
        <li><a class="lrow" href="${ROOT}diagnostic.html?q=${encodeURIComponent(g.title)}"><span class="tile-ico">${icon("stethoscope")}</span><span class="lrow-text"><strong>Décrire mon problème</strong><small>Le diagnostic cherche la cause avec vous</small></span>${icon("chevron")}</a></li>
        <li><a class="lrow" href="#qa"><span class="tile-ico">${icon("chat")}</span><span class="lrow-text"><strong>Poser une question</strong><small>Sur une étape de cette fiche</small></span>${icon("chevron")}</a></li>
        <li><a class="lrow" href="https://www.e-reparation.eco/" target="_blank" rel="noopener"><span class="tile-ico">${icon("pin")}</span><span class="lrow-text"><strong>Trouver un réparateur</strong><small>Labellisé QualiRépar, près de chez vous</small></span>${icon("chevron")}</a></li>
      </ul>
      ${bonusBox(g)}
    </section>

    <section class="guide-sec" id="verification" aria-labelledby="h-verif">
      <h2 id="h-verif" class="sr-only">Vérification de la fiche</h2>
      <div class="sources-box">
        <strong>${icon("shield")} Vérification de la fiche</strong>
        ${g.user
          ? `<p class="muted" style="margin-top:.4rem">Fiche rédigée sur cet appareil${g.created ? ` le ${escapeHtml(formatDate(g.created))}` : ""}, pas encore relue par un modérateur.</p>
             ${g.sources && g.sources.length ? `<ul>${g.sources.map(s => `<li><a href="${escapeHtml(s.url)}" rel="noopener nofollow" target="_blank">${escapeHtml(s.label || s.url)}</a></li>`).join("")}</ul>` : ""}`
          : g.sources && g.sources.length
          ? `<p class="muted" style="margin-top:.4rem">Consignes et chiffres vérifiés le ${escapeHtml(formatDate(REVIEWED_ON))} à partir de :</p>
             <ul>${g.sources.map(s => `<li><a href="${escapeHtml(s.url)}" rel="noopener" target="_blank">${escapeHtml(s.label)}</a></li>`).join("")}</ul>`
          : `<p class="muted" style="margin-top:.4rem">Procédure courante relue le ${escapeHtml(formatDate(REVIEWED_ON))}. Aucune source externe n'est encore citée pour cette fiche.</p>`}
        <div class="status-tags">
          <span class="tag ${g.user ? "tag-orange" : "tag-green"}">${icon(g.user ? "alert" : "check")} ${g.user ? "Non relue" : "Vérification documentaire"}</span>
          <span class="tag tag-soft">${icon("wrench")} Relecture par un réparateur : à venir</span>
        </div>
        <p style="margin-top:.8rem"><a class="link-arrow" href="${ROOT}communaute.html?ask=1&amp;type=erreur&amp;guide=${encodeURIComponent(g.id)}">Signaler une erreur ou proposer une amélioration ${icon("arrow")}</a></p>
        ${g.user ? "" : `<p class="muted licence-note">Texte original des Pages Bleues, rédigé avec nos mots d'après les sources citées, sous licence <a href="${ROOT}conditions-utilisation.html#licence">CC BY-SA 4.0</a>.</p>`}
      </div>
    </section>

    <section class="guide-sec" id="qa" aria-labelledby="h-qa">
      <h2 id="h-qa">${icon("chat")} Questions sur cette fiche</h2>
      <form class="qa-form" id="qa-form">
        <label class="sr-only" for="qa-text">Votre question</label>
        <textarea class="input" id="qa-text" rows="2" maxlength="500" placeholder="Une question sur une étape ? Posez-la ici."></textarea>
        <div class="qa-form-foot">
          <small>Pour l'instant, les questions restent sur cet appareil.</small>
          <button class="btn btn-primary btn-sm" type="submit">${icon("send")} Publier</button>
        </div>
      </form>
      <div class="qa-list" id="qa-list">
        ${questions.map(q => `<div class="qa-item"><header>${icon("user")} ${escapeHtml(q.author || "Vous")} · ${escapeHtml(formatDate(q.date))}</header><p>${escapeHtml(q.body)}</p></div>`).join("")}
      </div>
    </section>

    <section class="guide-sec rating-sec no-print" aria-labelledby="h-avis">
      <h2 id="h-avis">${icon("star")} Ce guide vous a été utile ?</h2>
      <div class="rating">
        <div class="stars" id="stars" role="radiogroup" aria-label="Votre note">
          ${[1, 2, 3, 4, 5].map(n => `<button class="star" type="button" role="radio" aria-checked="false" data-star="${n}" aria-label="${n} sur 5">${icon("star")}</button>`).join("")}
        </div>
        <small class="muted" id="rating-note">Votre note reste sur cet appareil.</small>
      </div>
      <div class="guide-tools" style="margin-top:12px">
        <button class="btn btn-ghost btn-sm" id="print" type="button">${icon("print")} Imprimer ou enregistrer en PDF</button>
      </div>
    </section>

    ${g.user ? `
      <div class="notice notice-warn owner-box">${icon("alert")}
        <div style="flex:1"><p>Cette fiche est enregistrée uniquement dans ce navigateur.</p>
        <p style="margin-top:.6rem;display:flex;gap:.5rem;flex-wrap:wrap"><a class="btn btn-ghost btn-sm" href="${ROOT}ajouter.html?edit=${encodeURIComponent(g.id)}">${icon("pencil")} Modifier</a>
        <button class="btn btn-danger btn-sm" id="delete" type="button">${icon("trash")} Supprimer</button></p></div>
      </div>` : ""}

    ${related.length ? `
      <section class="guide-sec related" aria-labelledby="h-related">
        <div class="section-head"><h2 id="h-related">Fiches similaires</h2>
          <a class="link-arrow" href="${categoryUrl(c)}">${escapeHtml(c.name)} ${icon("arrow")}</a></div>
        <div class="guide-grid">${related.map(guideCard).join("")}</div>
      </section>` : ""}
  </div>`;
}

/* Guides proches : même catégorie d'abord, puis même catégorie parente */
function relatedGuides(g, pool) {
  const c = categoryById(g.category);
  const same = pool.filter(x => x.id !== g.id && x.category === g.category);
  const near = pool.filter(x => x.id !== g.id && x.category !== g.category && inCategory(x, c.parent || g.category));
  return [...same, ...near].slice(0, 3);
}
