/* Les Pages Bleues — communauté : questions, astuces et retours de réparateurs.
   En attendant les comptes et un serveur, les messages sont enregistrés sur cet appareil. */

renderHeader("communaute");
renderFooter();
hydrateIcons();

const params = new URLSearchParams(location.search);
const TYPES = {
  question: { label: "Question", plural: "Questions", icon: "chat" },
  astuce: { label: "Astuce", plural: "Astuces", icon: "bulb" },
  intervention: { label: "Retour de réparateur", plural: "Retours de réparateurs", icon: "wrench" }
};
let tab = "all";

function postHTML(p) {
  const t = TYPES[p.type] || TYPES.question;
  const g = p.guide ? guideById(p.guide) : null;
  const cat = p.category ? categoryById(p.category) : null;
  return `
    <article class="post" id="post-${escapeHtml(p.id)}">
      <span class="avatar" aria-hidden="true">${escapeHtml(initials(p.author) || "?")}</span>
      <div>
        <h3>${escapeHtml(p.title)}</h3>
        ${p.type === "intervention" ? `
          <dl class="intervention">
            ${p.device ? `<dt>Appareil</dt><dd>${escapeHtml(p.device)}</dd>` : ""}
            <dt>Symptôme</dt><dd>${escapeHtml(p.symptom || "—")}</dd>
            <dt>Cause trouvée</dt><dd>${escapeHtml(p.cause || "—")}</dd>
            <dt>Réparation</dt><dd>${escapeHtml(p.fix || "—")}</dd>
            ${p.time ? `<dt>Temps</dt><dd>${escapeHtml(p.time)}</dd>` : ""}
            ${p.level ? `<dt>Difficulté</dt><dd>${escapeHtml(p.level)}/5</dd>` : ""}
          </dl>` : ""}
        ${p.body ? `<p>${escapeHtml(p.body)}</p>` : ""}
        <div class="post-meta">
          <span class="tag tag-soft">${icon(t.icon)} ${t.label}</span>
          ${cat ? `<span>${escapeHtml(cat.name)}</span>` : ""}
          <span>${icon("user")} ${escapeHtml(p.author || "Vous")}</span>
          <span>${icon("clock")} ${escapeHtml(formatDate(p.date))}</span>
          ${g ? `<a class="link-arrow" href="${guideUrl(g)}">${escapeHtml(g.title)} ${icon("arrow")}</a>` : ""}
        </div>
        ${(p.replies || []).length ? `<div class="replies">${p.replies.map(r => `<p class="reply"><strong>${escapeHtml(r.author || "Vous")}</strong> — ${escapeHtml(r.body)}</p>`).join("")}</div>` : ""}
        <form class="reply-form" data-reply="${escapeHtml(p.id)}">
          <label class="sr-only" for="r-${escapeHtml(p.id)}">Répondre</label>
          <input class="input" id="r-${escapeHtml(p.id)}" maxlength="400" placeholder="Répondre…">
          <button class="btn btn-soft btn-sm" type="submit">${icon("send")}<span class="sr-only">Envoyer</span></button>
          <button class="icon-btn" type="button" data-del="${escapeHtml(p.id)}" aria-label="Supprimer ce message">${icon("trash")}</button>
        </form>
      </div>
    </article>`;
}

function render() {
  const posts = loadPosts();
  const counts = { all: posts.length };
  for (const k of Object.keys(TYPES)) counts[k] = posts.filter(p => p.type === k).length;
  document.getElementById("post-tabs").innerHTML = [["all", "Discussions récentes"], ...Object.entries(TYPES).map(([k, v]) => [k, v.plural])]
    .map(([k, t]) => `<button class="tab" role="tab" type="button" data-tab="${k}" aria-selected="${tab === k}">${t}<span class="chip-n">${counts[k]}</span></button>`).join("");
  const list = posts.filter(p => tab === "all" || p.type === tab);
  document.getElementById("posts").innerHTML = list.length ? list.map(postHTML).join("") : `
    <div class="empty">${icon("users")}
      <h3>${posts.length ? "Rien dans cette rubrique" : "Lancez la première discussion"}</h3>
      <p>Posez une question, partagez une astuce ou documentez une réparation que vous avez faite : c'est ce qui fera la richesse des Pages Bleues.</p>
      <div class="empty-actions">
        <button class="btn btn-primary" type="button" data-new="question">${icon("chat")} Poser une question</button>
        <button class="btn btn-ghost" type="button" data-new="intervention">${icon("wrench")} Partager une réparation</button>
      </div>
    </div>`;
  document.getElementById("community-side").innerHTML = `
    <div class="card">
      <span class="big-ico">${icon("users")}</span>
      <h3 style="display:block">Une communauté qui répare</h3>
      <p class="muted" style="font-size:.92rem">Unis par la même idée : réparer plutôt que remplacer. Particuliers, bricoleurs et réparateurs professionnels.</p>
      <div class="notice" style="margin-top:.9rem">${icon("alert")}<p style="font-size:.85rem">Les comptes ne sont pas encore ouverts : vos messages sont enregistrés <strong>sur cet appareil</strong> (${counts.all} pour l'instant).</p></div>
      <button class="btn btn-primary btn-block" type="button" data-new="question" style="margin-top:1rem">Poser une question</button>
    </div>
    <div class="card">
      <h3>${icon("wrench")} Vous êtes réparateur ?</h3>
      <p class="muted" style="font-size:.9rem">Documentez une intervention réelle : symptôme, cause trouvée, réparation, temps, difficulté. Ces retours nourriront le diagnostic guidé pour aider d'autres personnes.</p>
      <button class="btn btn-ghost btn-block" type="button" data-new="intervention" style="margin-top:.9rem">Partager une intervention</button>
    </div>`;
  if (location.hash.startsWith("#post-")) {
    const el = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (el) { el.style.borderColor = "var(--blue)"; el.scrollIntoView({ block: "center" }); }
  }
}

function newPost(type = "question", preset = {}) {
  const guideOpts = allGuides().map(g => `<option value="${g.id}" ${preset.guide === g.id ? "selected" : ""}>${escapeHtml(g.title)}</option>`).join("");
  openModal("Nouveau message", `
    <form id="post-form" class="form" style="gap:14px">
      <div class="seg" role="radiogroup" aria-label="Type de message">
        ${Object.entries(TYPES).map(([k, v]) => `<button type="button" role="radio" data-type="${k}" class="${k === type ? "on" : ""}" aria-checked="${k === type}">${v.label}</button>`).join("")}
      </div>
      <div class="field"><label for="p-title">Titre <span class="req">*</span></label>
        <input class="input" id="p-title" maxlength="120" required value="${escapeHtml(preset.title || "")}" placeholder="Ex. : Mon lave-linge fait un bruit de claquement à l'essorage"></div>
      <div class="form-row form-row-2">
        <div class="field"><label for="p-cat">Domaine</label>
          <select class="input" id="p-cat">${CATEGORIES.map(c => `<option value="${c.id}" ${preset.category === c.id ? "selected" : ""}>${escapeHtml(c.name)}</option>`).join("")}</select></div>
        <div class="field"><label for="p-guide">Fiche concernée <small>(facultatif)</small></label>
          <select class="input" id="p-guide"><option value="">Aucune</option>${guideOpts}</select></div>
      </div>
      <div id="p-intervention" class="form-row form-row-2" ${type === "intervention" ? "" : "hidden"}>
        <div class="field"><label for="p-device">Appareil, marque et modèle</label><input class="input" id="p-device" maxlength="120" placeholder="Ex. : lave-linge Whirlpool"></div>
        <div class="field"><label for="p-symptom">Symptôme</label><input class="input" id="p-symptom" maxlength="200" placeholder="Ex. : claque à l'essorage"></div>
        <div class="field"><label for="p-cause">Cause trouvée</label><input class="input" id="p-cause" maxlength="200" placeholder="Ex. : amortisseurs hors service"></div>
        <div class="field"><label for="p-fix">Réparation</label><input class="input" id="p-fix" maxlength="200" placeholder="Ex. : remplacement des deux amortisseurs"></div>
        <div class="field"><label for="p-time">Temps passé</label><input class="input" id="p-time" maxlength="40" placeholder="Ex. : environ 45 min"></div>
        <div class="field"><label for="p-level">Difficulté (1 à 5)</label><select class="input" id="p-level"><option value="">—</option>${[1, 2, 3, 4, 5].map(n => `<option>${n}</option>`).join("")}</select></div>
      </div>
      <div class="field"><label for="p-body">Message</label>
        <textarea class="input" id="p-body" rows="4" maxlength="2000" placeholder="Décrivez le contexte : depuis quand, ce que vous avez déjà essayé…">${escapeHtml(preset.body || "")}</textarea></div>
      <p class="muted" style="font-size:.85rem">Enregistré sur cet appareil en attendant l'ouverture des comptes. Signé : <strong>${escapeHtml(getProfile().name || "Vous")}</strong> (modifiable dans <a class="accent" href="profil.html">votre profil</a>).</p>
      <div class="form-actions"><button class="btn btn-ghost" type="button" data-close>Annuler</button><button class="btn btn-primary" type="submit">${icon("send")} Publier</button></div>
    </form>`, (wrap, close) => {
    let current = type;
    wrap.querySelector(".seg").addEventListener("click", e => {
      const b = e.target.closest("[data-type]");
      if (!b) return;
      current = b.dataset.type;
      wrap.querySelectorAll("[data-type]").forEach(x => { x.classList.toggle("on", x === b); x.setAttribute("aria-checked", x === b); });
      wrap.querySelector("#p-intervention").hidden = current !== "intervention";
    });
    wrap.querySelector("#p-guide").addEventListener("change", e => {
      const g = guideById(e.target.value);
      if (g) wrap.querySelector("#p-cat").value = g.category;
    });
    wrap.querySelector("#post-form").addEventListener("submit", e => {
      e.preventDefault();
      const v = id => wrap.querySelector(id).value.trim();
      if (!v("#p-title")) { wrap.querySelector("#p-title").focus(); return; }
      const post = { id: "p" + Date.now().toString(36), type: current, title: v("#p-title"), body: v("#p-body"), category: v("#p-cat"),
        guide: v("#p-guide") || undefined, author: getProfile().name || "Vous", date: new Date().toISOString(), replies: [] };
      if (current === "intervention") Object.assign(post, { device: v("#p-device"), symptom: v("#p-symptom"), cause: v("#p-cause"), fix: v("#p-fix"), time: v("#p-time"), level: v("#p-level") });
      if (!savePosts([post, ...loadPosts()])) { toast("Stockage plein : impossible d'enregistrer."); return; }
      close();
      tab = "all";
      render();
      toast("Message publié sur cet appareil.");
    });
  });
}

document.addEventListener("click", e => {
  const n = e.target.closest("[data-new]");
  if (n) newPost(n.dataset.new);
  const t = e.target.closest("#post-tabs [data-tab]");
  if (t) { tab = t.dataset.tab; render(); }
  const d = e.target.closest("[data-del]");
  if (d && confirm("Supprimer ce message ?")) { savePosts(loadPosts().filter(p => p.id !== d.dataset.del)); render(); }
});
document.getElementById("new-post").addEventListener("click", () => newPost("question"));
document.getElementById("posts").addEventListener("submit", e => {
  const form = e.target.closest("[data-reply]");
  if (!form) return;
  e.preventDefault();
  const input = form.querySelector("input");
  if (!input.value.trim()) return;
  const posts = loadPosts();
  const p = posts.find(x => x.id === form.dataset.reply);
  (p.replies = p.replies || []).push({ body: input.value.trim(), author: getProfile().name || "Vous", date: new Date().toISOString() });
  savePosts(posts);
  render();
});

render();
if (params.get("ask")) {
  const g = params.get("guide") ? guideById(params.get("guide")) : null;
  const preset = params.get("type") === "erreur" && g
    ? { title: `Correction proposée pour « ${g.title} »`, guide: g.id, category: g.category, body: "Étape concernée :\nCe qui est inexact :\nCe que je propose :" }
    : { title: params.get("q") || "" };
  newPost(params.get("type") === "erreur" ? "astuce" : "question", preset);
}
