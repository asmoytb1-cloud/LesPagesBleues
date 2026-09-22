/* Les Pages Bleues — page d'un guide, avec suivi de progression */

renderHeader("guides");
renderFooter();

const id = new URLSearchParams(location.search).get("id");
const guide = allGuides().find(g => g.id === id);
const root = document.getElementById("guide");

if (!guide) {
  root.innerHTML = `<div class="empty">${icon("search")}<h3>Guide introuvable</h3>
    <p class="muted" style="margin:.5rem 0 1.2rem">Ce guide n'existe pas ou a été déplacé.</p>
    <a class="btn btn-primary" href="guides.html">Voir tous les guides</a></div>`;
} else {
  const c = categoryById(guide.category);
  document.title = `${guide.title} — Les Pages Bleues`;
  const key = "lpb-progress-" + guide.id;
  let done;
  try { done = new Set(JSON.parse(localStorage.getItem(key) || "[]")); } catch { done = new Set(); }

  const list = items => items && items.length
    ? `<ul>${items.map(i => `<li>${escapeHtml(i)}</li>`).join("")}</ul>`
    : `<p class="muted" style="font-size:.9rem">Aucun(e) en particulier.</p>`;

  root.innerHTML = `
    <a class="breadcrumb" href="guides.html?cat=${c.id}">${icon("back")} ${escapeHtml(c.name)}</a>
    <div class="guide-layout">
      <article>
        <header class="guide-header">
          <span class="tag">${escapeHtml(c.short || c.name)}</span>
          <h1>${escapeHtml(guide.title)}</h1>
          <p class="lead">${escapeHtml(guide.summary || "")}</p>
          <div class="facts">
            <span class="fact">${icon("gauge")} ${escapeHtml(guide.difficulty)}</span>
            <span class="fact">${icon("clock")} ${escapeHtml(guide.duration || "—")}</span>
            ${guide.savings ? `<span class="fact">${icon("euro")} Économie ${escapeHtml(guide.savings)}</span>` : ""}
          </div>
          <button class="btn btn-primary btn-coach" id="coach-start">${icon("play")} Lancer l'accompagnement</button>
          <p class="muted coach-hint">Une étape à la fois, en grand, avec lecture à voix haute. Idéal les mains dans le cambouis.</p>
        </header>
        <ol class="step-list">
          ${guide.steps.map((s, i) => `
            <li class="step-item ${done.has(i) ? "done" : ""}" data-i="${i}">
              <button class="step-check" aria-pressed="${done.has(i)}" aria-label="Marquer l'étape ${i + 1} comme faite">${done.has(i) ? icon("check") : i + 1}</button>
              <div><h3>${escapeHtml(s.title)}</h3><p>${escapeHtml(s.text)}</p></div>
            </li>`).join("")}
        </ol>
      </article>
      <aside class="guide-aside">
        <div class="aside-card">
          <h4>${icon("check")} Progression <span class="muted" id="pct" style="margin-left:auto;font-weight:500"></span></h4>
          <div class="progress"><div id="bar"></div></div>
        </div>
        <div class="aside-card"><h4>${icon("tool")} Outils</h4>${list(guide.tools)}</div>
        <div class="aside-card"><h4>${icon("box")} Pièces</h4>${list(guide.parts)}</div>
        <div class="aside-card">
          <h4>${icon("share")} Partager</h4>
          <button class="btn btn-ghost" id="share" style="width:100%;justify-content:center">Copier le lien</button>
        </div>
      </aside>
    </div>`;

  const update = () => {
    const pct = Math.round(done.size / guide.steps.length * 100);
    document.getElementById("bar").style.width = pct + "%";
    document.getElementById("pct").textContent = pct === 100 ? "Réparé ! 🎉" : pct + " %";
  };
  update();

  // Coche / décoche une étape, dans la liste comme dans le mode accompagnement
  const setDone = (i, on) => {
    on ? done.add(i) : done.delete(i);
    const li = root.querySelector(`.step-item[data-i="${i}"]`);
    const btn = li.querySelector(".step-check");
    li.classList.toggle("done", on);
    btn.setAttribute("aria-pressed", on);
    btn.innerHTML = on ? icon("check") : i + 1;
    try { localStorage.setItem(key, JSON.stringify([...done])); } catch {}
    update();
  };

  root.querySelector(".step-list").addEventListener("click", e => {
    const btn = e.target.closest(".step-check");
    if (!btn) return;
    const i = +btn.closest(".step-item").dataset.i;
    setDone(i, !done.has(i));
  });

  document.getElementById("coach-start").addEventListener("click", () => startCoach(guide, done, setDone));

  document.getElementById("share").addEventListener("click", async e => {
    try {
      if (navigator.share) await navigator.share({ title: guide.title, url: location.href });
      else { await navigator.clipboard.writeText(location.href); e.target.textContent = "Lien copié ✓"; }
    } catch {}
  });
}

/* ==========================================================
   Mode accompagnement : une étape à la fois, en plein écran
   ========================================================== */
function startCoach(guide, done, setDone) {
  const steps = guide.steps;
  const total = steps.length;
  // Écran 0 = préparation, 1..total = étapes, total + 1 = fin
  const firstTodo = steps.findIndex((_, i) => !done.has(i));
  let pos = done.size && firstTodo >= 0 ? firstTodo + 1 : 0;
  let voice = false;
  let wakeLock = null;
  const canSpeak = "speechSynthesis" in window;

  const el = document.createElement("div");
  el.className = "coach";
  el.setAttribute("role", "dialog");
  el.setAttribute("aria-modal", "true");
  el.setAttribute("aria-label", "Accompagnement : " + guide.title);
  document.body.appendChild(el);
  document.body.classList.add("coach-open");

  try { navigator.wakeLock?.request("screen").then(l => { wakeLock = l; }).catch(() => {}); } catch {}

  const checklist = (title, ic, items) => items && items.length ? `
    <div class="coach-list"><h3>${icon(ic)} ${title}</h3>
      <ul>${items.map(t => `<li><label><input type="checkbox"> <span>${escapeHtml(t)}</span></label></li>`).join("")}</ul>
    </div>` : "";

  function screen() {
    if (pos === 0) {
      const safety = guide.safety || "Travaillez dans un endroit dégagé et bien éclairé, et prenez votre temps.";
      return {
        label: "Avant de commencer",
        speak: `Avant de commencer. ${safety} Préparez vos outils : ${(guide.tools || []).join(", ")}.`,
        html: `
          <p class="coach-kicker">Préparation</p>
          <h2>Avant de commencer</h2>
          <p class="coach-safety">${icon("shield")} ${escapeHtml(safety)}</p>
          <div class="coach-lists">
            ${checklist("Outils", "tool", guide.tools)}
            ${checklist("Pièces", "box", guide.parts)}
          </div>`
      };
    }
    if (pos > total) {
      return {
        label: "Terminé",
        speak: "Bravo, la réparation est terminée !",
        html: `
          <div class="coach-done">
            <div class="coach-done-ico">${icon("check")}</div>
            <h2>Bravo, c'est réparé !</h2>
            <p>Un objet de plus sauvé de la poubelle. ${guide.savings ? `Vous avez économisé environ ${escapeHtml(guide.savings.replace("≈", "").trim())}.` : ""}</p>
            <p class="muted">Une astuce à ajouter ? Partagez-la avec la communauté.</p>
          </div>`
      };
    }
    const s = steps[pos - 1];
    return {
      label: `Étape ${pos} sur ${total}`,
      speak: `Étape ${pos}. ${s.title}. ${s.text}${s.tip ? " Astuce : " + s.tip : ""}`,
      html: `
        <p class="coach-kicker">Étape ${pos} / ${total}</p>
        <div class="coach-step">
          <span class="coach-num">${pos}</span>
          <div>
            <h2>${escapeHtml(s.title)}</h2>
            <p class="coach-text">${escapeHtml(s.text)}</p>
            ${s.safety ? `<p class="coach-safety">${icon("shield")} ${escapeHtml(s.safety)}</p>` : ""}
            ${s.tip ? `<p class="coach-tip">${icon("bulb")} <span><strong>Astuce :</strong> ${escapeHtml(s.tip)}</span></p>` : ""}
          </div>
        </div>`
    };
  }

  function speak(text) {
    if (!canSpeak) return;
    speechSynthesis.cancel();
    if (!voice) return;
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "fr-FR";
    const fr = speechSynthesis.getVoices().find(v => v.lang && v.lang.startsWith("fr"));
    if (fr) u.voice = fr;
    speechSynthesis.speak(u);
  }

  function render() {
    const sc = screen();
    const isStep = pos >= 1 && pos <= total;
    const nextLabel = pos === 0 ? "C'est prêt, on commence"
      : pos === total ? "C'est fait, terminer"
      : pos > total ? "Fermer" : "C'est fait, étape suivante";
    el.innerHTML = `
      <div class="coach-top">
        <div class="coach-title"><small>Accompagnement</small><strong>${escapeHtml(guide.title)}</strong></div>
        ${canSpeak ? `<button class="icon-btn coach-voice ${voice ? "on" : ""}" data-act="voice" aria-pressed="${voice}" aria-label="Lecture à voix haute">${icon(voice ? "volume" : "mute")}</button>` : ""}
        <button class="icon-btn" data-act="close" aria-label="Quitter l'accompagnement">${icon("close")}</button>
      </div>
      <div class="coach-dots" aria-hidden="true">
        ${steps.map((_, i) => `<span class="${done.has(i) ? "ok" : ""} ${pos === i + 1 ? "cur" : ""}"></span>`).join("")}
      </div>
      <div class="coach-body" aria-live="polite">${sc.html}</div>
      <div class="coach-nav">
        <button class="btn btn-ghost" data-act="prev" ${pos === 0 ? "disabled" : ""}>${icon("back")}<span>Précédent</span></button>
        <span class="coach-count muted">${sc.label}</span>
        <button class="btn btn-primary" data-act="next">${nextLabel}${pos > total ? "" : icon("arrow")}</button>
      </div>`;
    if (isStep) el.querySelector(".coach-body").classList.add("anim");
    el.querySelector('[data-act="next"]').focus({ preventScroll: true });
    speak(sc.speak);
  }

  function go(delta) {
    if (delta > 0 && pos >= 1 && pos <= total) setDone(pos - 1, true);
    if (delta > 0 && pos > total) return close();
    pos = Math.max(0, Math.min(total + 1, pos + delta));
    render();
  }

  function close() {
    if (canSpeak) speechSynthesis.cancel();
    try { wakeLock?.release(); } catch {}
    document.removeEventListener("keydown", onKey);
    document.body.classList.remove("coach-open");
    el.remove();
    document.getElementById("coach-start").focus();
  }

  function onKey(e) {
    if (e.key === "Escape") close();
    else if (e.key === "ArrowRight") go(1);
    else if (e.key === "ArrowLeft") go(-1);
  }
  document.addEventListener("keydown", onKey);

  el.addEventListener("click", e => {
    const act = e.target.closest("[data-act]")?.dataset.act;
    if (act === "next") go(1);
    else if (act === "prev") go(-1);
    else if (act === "close") close();
    else if (act === "voice") { voice = !voice; render(); }
  });

  // Balayage gauche / droite sur mobile
  let x0 = null;
  el.addEventListener("touchstart", e => { x0 = e.touches[0].clientX; }, { passive: true });
  el.addEventListener("touchend", e => {
    if (x0 === null || e.target.closest("button, input, label")) return;
    const dx = e.changedTouches[0].clientX - x0;
    x0 = null;
    if (Math.abs(dx) > 60) go(dx < 0 ? 1 : -1);
  });

  render();
}
