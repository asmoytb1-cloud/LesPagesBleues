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

  root.querySelector(".step-list").addEventListener("click", e => {
    const btn = e.target.closest(".step-check");
    if (!btn) return;
    const li = btn.closest(".step-item");
    const i = +li.dataset.i;
    done.has(i) ? done.delete(i) : done.add(i);
    const on = done.has(i);
    li.classList.toggle("done", on);
    btn.setAttribute("aria-pressed", on);
    btn.innerHTML = on ? icon("check") : i + 1;
    try { localStorage.setItem(key, JSON.stringify([...done])); } catch {}
    update();
  });

  document.getElementById("share").addEventListener("click", async e => {
    try {
      if (navigator.share) await navigator.share({ title: guide.title, url: location.href });
      else { await navigator.clipboard.writeText(location.href); e.target.textContent = "Lien copié ✓"; }
    } catch {}
  });
}
