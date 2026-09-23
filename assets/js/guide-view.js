/* Les Pages Bleues — rendu HTML d'une fiche guide.
   Fonction pure (aucun accès au DOM) : utilisée par la page guide.html et par tools/build.js
   pour générer les pages statiques de /fiches/ (bon référencement, lisibles sans JavaScript). */

const fmtWait = sec => {
  if (sec < 60) return `${sec} s`;
  const m = Math.round(sec / 60);
  return m >= 60 ? `${Math.floor(m / 60)} h${m % 60 ? " " + String(m % 60).padStart(2, "0") : ""}` : `${m} min`;
};

// Met en couleur le complément du titre : « Changer la courroie d'un <lave-linge> »
function accentTitle(t) {
  const m = t.match(/^(.*\s(?:d'une?|de la|du|des|de|d'un|d'une)\s)([^:]{3,32})$/i) || t.match(/^(.*\sd')([^:\s][^:]{2,30})$/i);
  return m ? `${escapeHtml(m[1])}<span class="accent">${escapeHtml(m[2])}</span>` : escapeHtml(t);
}

function guidePageHTML(g, st = {}) {
  const c = categoryById(g.category);
  const parent = c.parent ? categoryById(c.parent) : null;
  const done = st.done || new Set();
  const result = st.result || null;
  const questions = st.questions || [];
  const related = (st.related || []).slice(0, 3);
  const photo = guidePhoto(g);
  const tips = g.steps.filter(s => s.tip).map((s, i) => ({ step: g.steps.indexOf(s) + 1, text: s.tip }));
  const list = (items, ic) => items && items.length
    ? `<ul class="kit-list">${items.map(i => `<li>${icon(ic)}<span>${escapeHtml(i)}</span></li>`).join("")}</ul>`
    : `<p class="muted">Rien de particulier.</p>`;

  return `
  <div class="guide-top">
    <div class="container guide-top-inner">
      <div>
        <nav class="breadcrumb" aria-label="Fil d'Ariane">
          <a href="${ROOT}index.html">${icon("home")} Accueil</a>${icon("chevron")}
          ${parent ? `<a href="${categoryUrl(parent)}">${escapeHtml(parent.name)}</a>${icon("chevron")}` : ""}
          <a href="${categoryUrl(c)}">${escapeHtml(c.name)}</a>${icon("chevron")}
          <span aria-current="page">${escapeHtml(g.title)}</span>
        </nav>
        <div class="guide-tags" style="display:flex;flex-wrap:wrap;gap:.4rem">
          <span class="tag tag-soft">${escapeHtml(c.short || c.name)}</span>
          ${g.user ? `<span class="tag tag-user">Ma fiche · non relue</span>` : `<span class="tag tag-soft">${icon("shield")} Vérifiée</span>`}
          ${result === "ok" ? `<span class="tag tag-green">${icon("check")} Réparé</span>` : ""}
          ${loadMateriel().filter(m => guideFitsMateriel(g, m)).slice(0, 2).map(m =>
            `<a class="tag" href="${ROOT}materiel.html#mat-${m.id}">${icon("box")} Pour votre ${escapeHtml(materielName(m, true))}</a>`).join("")}
        </div>
        <h1>${accentTitle(g.title)}</h1>
        <p class="lead">${escapeHtml(g.summary || "")}</p>
        <div class="guide-facts">
          <span>${icon("clock")} ${escapeHtml(g.duration || "—")}</span>
          <span>${bars(g)} ${escapeHtml(g.difficulty)}</span>
          ${g.savings ? `<span>${icon("leaf", "leaf")} Économie : ${escapeHtml(g.savings.replace("≈", "environ"))}</span>` : ""}
        </div>
        <div class="guide-actions">
          <a class="btn btn-primary btn-coach" id="coach-start" href="${guideUrl(g, "coach=1")}">${icon("play")} <span id="coach-label">Lancer l'accompagnement</span></a>
          <button class="btn btn-ghost fav-btn" id="fav" type="button" aria-pressed="false">${icon("heart")}<span>Favori</span></button>
          <button class="icon-btn icon-btn-line" id="share" type="button" aria-label="Partager la fiche" title="Partager">${icon("share")}</button>
        </div>
        <p class="coach-hint">${icon("mic")} Mode accompagnement : une étape à la fois, en grand, avec lecture à voix haute, minuteurs et commandes vocales.</p>
      </div>
      <figure class="guide-photo" style="margin:0">
        ${photo ? `<img ${imgSrc(photo, "(max-width: 900px) 100vw, 560px")} alt="" width="1000" height="667">` : `<div class="gcard-icon">${icon(c.icon)}</div>`}
        <p class="handwritten">Réparer<br>plutôt que<br>remplacer !</p>
      </figure>
    </div>
  </div>

  <nav class="guide-tabs no-print" aria-label="Sections de la fiche">
    <div class="container tabs">
      <a class="tab" href="#etapes" aria-current="true">Étapes</a>
      <a class="tab" href="#materiel">Matériel</a>
      <a class="tab" href="#conseils">Conseils</a>
      <a class="tab" href="#qa">Questions${questions.length ? `<span class="chip-n">${questions.length}</span>` : ""}</a>
    </div>
  </nav>

  <div class="container guide-layout">
    <article class="guide-main">
      <section id="etapes" aria-labelledby="h-etapes">
        <h2 id="h-etapes">${icon("doc")} Les étapes</h2>
        ${g.safety ? `<div class="safety-box">${icon("shield")}<div><strong>Avant de commencer</strong><p>${escapeHtml(g.safety)}</p></div></div>` : ""}
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
          <div><strong>C'est terminé !</strong><p>${result === "ok" ? "Vous avez indiqué que la réparation a fonctionné. Bravo !" : "Dernière étape faite ? Dites-nous si la réparation a fonctionné."}</p></div>
          <div class="btns no-print">
            <button class="btn btn-sm ${result === "ok" ? "btn-primary" : "btn-ghost"}" type="button" data-result="ok">${icon("check")} Ça a marché</button>
            <button class="btn btn-sm ${result === "ko" ? "btn-primary" : "btn-ghost"}" type="button" data-result="ko">${icon("alert")} Pas encore</button>
          </div>
        </div>
      </section>

      <section id="materiel" aria-labelledby="h-materiel">
        <h2 id="h-materiel">${icon("tool")} Le matériel nécessaire</h2>
        <div class="kit-cols">
          <div><h3 style="font-size:1rem;margin-bottom:.6rem">Outils</h3>${list(g.tools, "tool")}</div>
          <div><h3 style="font-size:1rem;margin-bottom:.6rem">Pièces</h3>${list(g.parts, "box")}
            ${g.parts && g.parts.length ? `<p class="muted" style="font-size:.85rem;margin-top:.6rem">Relevez la référence sur l'ancienne pièce ou la plaque signalétique de l'appareil avant de commander.</p>` : ""}</div>
        </div>
      </section>

      <section id="conseils" aria-labelledby="h-conseils">
        <h2 id="h-conseils">${icon("bulb")} Conseils</h2>
        ${tips.length ? `<ul class="tips-list tips-blue">${tips.map(t => `<li>${icon("bulb")}<span><strong>Étape ${t.step} :</strong> ${escapeHtml(t.text)}</span></li>`).join("")}</ul>` : ""}
        ${g.troubleshoot && g.troubleshoot.length ? `
          <h3 style="margin:1.2rem 0 .6rem">Ça ne marche toujours pas ?</h3>
          <ul class="tips-list" id="troubleshoot">${g.troubleshoot.map(t => `<li>${icon("alert")}<span>${escapeHtml(t)}</span></li>`).join("")}</ul>` : ""}
        <div class="sources-box" style="margin-top:1.2rem">
          <strong>${icon("shield")} Vérification de la fiche</strong>
          ${g.user
            ? `<p class="muted" style="margin-top:.4rem">Fiche rédigée sur cet appareil${g.created ? ` le ${escapeHtml(formatDate(g.created))}` : ""}, pas encore relue par un modérateur.</p>
               ${g.sources && g.sources.length ? `<ul>${g.sources.map(s => `<li><a href="${escapeHtml(s.url)}" rel="noopener nofollow" target="_blank">${escapeHtml(s.label || s.url)}</a></li>`).join("")}</ul>` : ""}`
            : g.sources && g.sources.length
            ? `<p class="muted" style="margin-top:.4rem">Consignes et chiffres vérifiés le ${escapeHtml(formatDate(REVIEWED_ON))} à partir de :</p>
               <ul>${g.sources.map(s => `<li><a href="${escapeHtml(s.url)}" rel="noopener" target="_blank">${escapeHtml(s.label)}</a></li>`).join("")}</ul>`
            : `<p class="muted" style="margin-top:.4rem">Procédure courante relue le ${escapeHtml(formatDate(REVIEWED_ON))}. Aucune source externe n'est encore citée pour cette fiche.</p>`}
          <div class="status">
            <span class="tag ${g.user ? "tag-orange" : "tag-green"}">${icon(g.user ? "alert" : "check")} ${g.user ? "Non relue" : "Vérification documentaire"}</span>
            <span class="tag tag-orange">${icon("wrench")} Relecture par un réparateur : à venir</span>
          </div>
          <p style="margin-top:.8rem"><a class="link-arrow" href="${ROOT}communaute.html?ask=1&amp;type=erreur&amp;guide=${encodeURIComponent(g.id)}">Signaler une erreur ou proposer une amélioration ${icon("arrow")}</a></p>
        </div>
      </section>

      <section id="qa" aria-labelledby="h-qa">
        <h2 id="h-qa">${icon("chat")} Questions sur cette fiche</h2>
        <form class="qa-form" id="qa-form">
          <label class="sr-only" for="qa-text">Votre question</label>
          <textarea class="input" id="qa-text" rows="2" maxlength="500" placeholder="Une question sur une étape ? Posez-la ici."></textarea>
          <div style="display:flex;justify-content:space-between;align-items:center;gap:.6rem;margin-top:.5rem;flex-wrap:wrap">
            <small class="muted">Pour l'instant, les questions sont enregistrées sur cet appareil (les comptes arrivent bientôt).</small>
            <button class="btn btn-primary btn-sm" type="submit">${icon("send")} Publier</button>
          </div>
        </form>
        <div class="qa-list" id="qa-list">
          ${questions.map(q => `<div class="qa-item"><header>${icon("user")} ${escapeHtml(q.author || "Vous")} · ${escapeHtml(formatDate(q.date))}</header><p>${escapeHtml(q.body)}</p></div>`).join("")}
        </div>
      </section>

      ${g.user ? `
        <div class="notice notice-warn owner-box" style="margin-top:28px">${icon("alert")}
          <div style="flex:1"><p>Cette fiche est enregistrée uniquement dans ce navigateur.</p>
          <p style="margin-top:.6rem;display:flex;gap:.5rem;flex-wrap:wrap"><a class="btn btn-ghost btn-sm" href="${ROOT}ajouter.html?edit=${encodeURIComponent(g.id)}">Modifier</a>
          <button class="btn btn-danger btn-sm" id="delete" type="button">${icon("trash")} Supprimer</button></p></div>
        </div>` : ""}
    </article>

    <aside class="guide-aside">
      <div class="card facts-card">
        <div class="fact-row">${bars(g)}<div><small>Difficulté</small><strong>${escapeHtml(g.difficulty)}</strong></div></div>
        <div class="fact-row">${icon("clock")}<div><small>Durée</small><strong>${escapeHtml(g.duration || "—")}</strong></div></div>
        ${g.savings ? `<div class="fact-row">${icon("coins")}<div><small>Économie estimée</small><strong>${escapeHtml(g.savings.replace("≈", "environ"))}</strong></div></div>` : ""}
        <div class="fact-row">${icon("leaf", "leaf")}<div><small>Impact</small><strong>Un objet de moins à la poubelle</strong></div></div>
      </div>
      <div class="card progress-card no-print">
        <h3>${icon("check")} Progression <span class="muted" id="pct" style="margin-left:auto;font-weight:500">0 %</span></h3>
        <div class="progress"><div id="bar"></div></div>
        <button class="link-btn" id="reset" type="button" style="margin-top:10px" hidden>${icon("refresh")} Tout décocher</button>
      </div>
      <div class="card help-card no-print">
        <h3>${icon("chat")} Besoin d'aide ?</h3>
        <p class="muted" style="font-size:.9rem">Diagnostic guidé, question à la communauté ou réparateur près de chez vous.</p>
        <div style="display:grid;gap:.5rem;margin-top:.8rem">
          <a class="btn btn-ghost btn-sm" href="${ROOT}diagnostic.html?q=${encodeURIComponent(g.title)}">${icon("stethoscope")} Diagnostic guidé</a>
          <a class="btn btn-ghost btn-sm" href="#qa">${icon("chat")} Poser une question</a>
          <a class="btn btn-ghost btn-sm" href="https://www.e-reparation.eco/" target="_blank" rel="noopener">${icon("pin")} Réparateur labellisé QualiRépar</a>
        </div>
      </div>
      <div class="card no-print">
        <h3>${icon("download")} Télécharger le guide</h3>
        <p class="muted" style="font-size:.9rem">Version imprimable, ou « Enregistrer au format PDF » dans la fenêtre d'impression.</p>
        <button class="btn btn-soft btn-sm btn-block" id="print" type="button" style="margin-top:.8rem">${icon("print")} Imprimer / PDF</button>
      </div>
      <div class="card rating-card no-print">
        <h3>${icon("heart")} Ce guide vous a été utile ?</h3>
        <div class="stars" id="stars" role="radiogroup" aria-label="Votre note">
          ${[1, 2, 3, 4, 5].map(n => `<button class="star" type="button" role="radio" aria-checked="false" data-star="${n}" aria-label="${n} sur 5">${icon("star")}</button>`).join("")}
        </div>
        <small class="muted" id="rating-note">Votre note reste sur cet appareil.</small>
      </div>
    </aside>
  </div>

  ${related.length ? `
    <section class="container related">
      <div class="section-head"><h2>Guides <span class="accent">similaires</span></h2>
        <a class="link-arrow" href="${categoryUrl(c)}">Voir plus de guides ${icon("arrow")}</a></div>
      <div class="guide-grid">${related.map(guideCard).join("")}</div>
    </section>` : ""}`;
}

/* Guides proches : même catégorie d'abord, puis même catégorie parente */
function relatedGuides(g, pool) {
  const c = categoryById(g.category);
  const same = pool.filter(x => x.id !== g.id && x.category === g.category);
  const near = pool.filter(x => x.id !== g.id && x.category !== g.category && inCategory(x, c.parent || g.category));
  return [...same, ...near].slice(0, 3);
}
