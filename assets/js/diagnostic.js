/* Les Pages Bleues — diagnostic guidé.
   Version sans intelligence artificielle : des règles écrites à partir des fiches vérifiées
   (assets/js/diagnostics-data.js). L'interface est pensée pour accueillir plus tard un agent IA. */

renderHeader("diagnostic");
renderFooter();

const chat = document.getElementById("chat");
const params = new URLSearchParams(location.search);
const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let diag = null, answers = {}, qIndex = 0;

const DEVICES = [...new Set(DIAGNOSTICS.map(d => d.device))];

function bot(html, extra = "") {
  const el = document.createElement("div");
  el.className = "msg";
  el.innerHTML = `<span class="msg-ico">${icon("stethoscope")}</span><div class="msg-body">${html}${extra}</div>`;
  chat.appendChild(el);
  el.scrollIntoView({ behavior: "smooth", block: "nearest" });
  return el;
}
function me(text) {
  const el = document.createElement("div");
  el.className = "msg user";
  el.innerHTML = `<span class="msg-ico">${icon("user")}</span><div class="msg-body"><p>${escapeHtml(text)}</p></div>`;
  chat.appendChild(el);
}
function lockChoices() {
  chat.querySelectorAll(".choices button, .diag-input input, .diag-input button").forEach(b => { b.disabled = true; });
}

function start(prefill = "") {
  chat.innerHTML = "";
  diag = null; answers = {}; qIndex = 0;
  bot(`<p><strong>Bonjour ! Qu'est-ce qui est en panne ?</strong></p><p>Décrivez le problème avec vos mots, par exemple « mon lave-linge fait un bruit de claquement à l'essorage », ou choisissez un appareil.</p>`, `
    <form class="diag-input" id="describe">
      <label class="sr-only" for="symptom">Décrivez la panne</label>
      <input class="input" id="symptom" maxlength="200" autocomplete="off" placeholder="Décrivez la panne…" value="${escapeHtml(prefill)}">
      ${Recognition ? `<button class="icon-btn icon-btn-line" type="button" id="dictate" aria-label="Dicter la panne">${icon("mic")}</button>` : ""}
      <button class="btn btn-primary" type="submit">${icon("send")}<span class="hide-xs">Analyser</span></button>
    </form>
    <div class="choices">${DEVICES.map(d => `<button class="chip" type="button" data-device="${escapeHtml(d)}">${escapeHtml(d)}</button>`).join("")}</div>`);
  const input = document.getElementById("symptom");
  document.getElementById("describe").addEventListener("submit", e => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) { input.focus(); return; }
    lockChoices(); me(text); match(text);
  });
  document.getElementById("dictate")?.addEventListener("click", ev => {
    const rec = new Recognition();
    rec.lang = "fr-FR";
    rec.interimResults = false;
    ev.currentTarget.classList.add("coach-toggle", "on", "listening");
    rec.onresult = e2 => { input.value = e2.results[0][0].transcript; };
    rec.onend = () => document.getElementById("dictate")?.classList.remove("on", "listening");
    rec.onerror = () => toast("Micro indisponible : autorisez-le ou tapez votre description.");
    try { rec.start(); } catch {}
  });
  if (prefill) { lockChoices(); me(prefill); match(prefill); } else input.focus({ preventScroll: true });
}

function match(text) {
  const scored = diagnosticScores(text).slice(0, 4);
  const found = scored.map(([d]) => d);
  if (!found.length) return unknown(text);
  // Une piste nettement en tête : on la suit directement
  if (found.length === 1 || scored[0][1] >= 1.5 * scored[1][1]) return begin(found[0]);
  bot(`<p>J'ai plusieurs pistes. Lequel de ces problèmes correspond le mieux ?</p>`,
    `<div class="choices">${found.map(d => `<button class="btn btn-ghost btn-sm" type="button" data-diag="${d.id}">${escapeHtml(d.title)}</button>`).join("")}
     <button class="btn btn-ghost btn-sm" type="button" data-none>Aucun de ceux-ci</button></div>`);
}

function unknown(text) {
  const guides = searchGuides(text, "", 0.5).slice(0, 3);
  bot(`<p>Je ne connais pas encore ce problème : le diagnostic guidé couvre pour l'instant ${DIAGNOSTICS.length} pannes courantes.</p>
    ${guides.length ? `<p>Ces fiches pourraient quand même vous aider :</p><div class="rows" style="margin-top:.6rem">${guides.map(g => guideRow(g, queryWords(text))).join("")}</div>` : ""}
    <p style="margin-top:.8rem">Vous pouvez aussi poser la question à la communauté, ou trouver un réparateur près de chez vous.</p>`,
    `<div class="choices">
      <a class="btn btn-primary btn-sm" href="communaute.html?ask=1&q=${encodeURIComponent(text)}">${icon("chat")} Poser la question</a>
      <a class="btn btn-ghost btn-sm" href="https://www.e-reparation.eco/" target="_blank" rel="noopener">${icon("pin")} Trouver un réparateur</a>
      <button class="btn btn-ghost btn-sm" type="button" data-restart>${icon("refresh")} Recommencer</button></div>`);
}

function begin(d) {
  diag = d; answers = {}; qIndex = 0;
  const url = new URL(location.href);
  url.searchParams.set("s", d.id); url.searchParams.delete("q");
  history.replaceState(null, "", url);
  bot(`<p><strong>${escapeHtml(d.title)}</strong></p><p>${escapeHtml(d.intro)}</p>
    ${d.safety ? `<p class="note note-safety">${icon("shield")}<span>${escapeHtml(d.safety)}</span></p>` : ""}`);
  ask();
}

function ask() {
  const q = diag.questions[qIndex];
  if (!q) return results();
  bot(`<p><span class="muted">Question ${qIndex + 1} sur ${diag.questions.length}</span><br><strong>${escapeHtml(q.text)}</strong></p>`,
    `<div class="choices">${q.options.map(o => `<button class="btn btn-ghost btn-sm" type="button" data-answer="${o.v}">${escapeHtml(o.label)}</button>`).join("")}</div>`);
}

function results() {
  const ranked = rankCauses(diag, answers);
  const top = ranked.filter(c => c.score > 0);
  const shown = (top.length ? top : ranked).slice(0, 3);
  const danger = shown.find(c => c.danger && c.score > 0);
  const posts = loadPosts().filter(p => p.type === "intervention" && scoreText([[p.symptom || "", 3], [p.device || "", 2], [p.title, 2]], queryWords(diag.title + " " + diag.device)) > 0).slice(0, 3);
  bot(`<p><strong>Voici les causes les plus probables, de la plus à la moins vraisemblable :</strong></p>
    ${danger ? `<p class="note note-safety">${icon("alert")}<span><strong>Attention :</strong> ${escapeHtml(danger.checks[0])}</span></p>` : ""}
    <div class="hyp-list">${shown.map((c, i) => {
      const g = c.guide ? guideById(c.guide) : null;
      const pct = Math.round(Math.max(.08, c.share) * 100);
      return `
        <div class="hyp">
          <header><h3>${i + 1}. ${escapeHtml(c.title)}</h3>
            <span class="conf">Confiance ${c.confidence}<span class="conf-bar"><span style="width:${pct}%"></span></span></span></header>
          <ul class="check-list">${c.checks.map(ch => `<li>${icon("check")}<span>${escapeHtml(ch)}</span></li>`).join("")}</ul>
          <div class="gcard-meta" style="padding:.6rem 0 0">
            ${g ? `<span>${icon("clock")} ${escapeHtml(g.duration)}</span><span>${dots(g)} ${escapeHtml(g.difficulty)}</span>` : c.time ? `<span>${icon("clock")} ${escapeHtml(c.time)}</span>` : ""}
            ${c.pro ? `<span class="tag tag-orange">${icon("wrench")} Professionnel conseillé</span>` : ""}
          </div>
          <div class="hyp-actions">
            ${g ? `<a class="btn btn-primary btn-sm" href="${guideUrl(g)}">${icon("doc")} Voir la fiche</a>
                   <a class="btn btn-ghost btn-sm" href="${guideUrl(g, "coach=1")}">${icon("play")} Réparer avec l'accompagnement</a>` : ""}
            ${c.pro ? `<a class="btn btn-ghost btn-sm" href="https://www.e-reparation.eco/" target="_blank" rel="noopener">${icon("pin")} Réparateur labellisé</a>` : ""}
          </div>
        </div>`;
    }).join("")}</div>
    ${posts.length ? `<p style="margin-top:1rem"><strong>Retours de réparateurs sur cet appareil :</strong></p>
      <ul class="check-list">${posts.map(p => `<li>${icon("wrench")}<span>${escapeHtml(p.symptom || p.title)} → <strong>${escapeHtml(p.cause || "?")}</strong>${p.fix ? ` (${escapeHtml(p.fix)})` : ""}</span></li>`).join("")}</ul>` : ""}
    <p class="muted" style="margin-top:1rem;font-size:.85rem">Ce diagnostic suit des règles écrites à partir de nos fiches vérifiées : il oriente, mais ne remplace pas l'avis d'un professionnel.</p>`,
    `<div class="choices">
      <button class="btn btn-ghost btn-sm" type="button" data-restart>${icon("refresh")} Nouveau diagnostic</button>
      <a class="btn btn-ghost btn-sm" href="communaute.html?ask=1&q=${encodeURIComponent(diag.title)}">${icon("chat")} Demander à la communauté</a></div>`);
}

chat.addEventListener("click", e => {
  const b = e.target.closest("button");
  if (!b || b.disabled) return;
  if (b.dataset.device) {
    lockChoices(); me(b.dataset.device);
    const list = DIAGNOSTICS.filter(d => d.device === b.dataset.device);
    if (list.length === 1) return begin(list[0]);
    bot(`<p>Quel est le problème avec : ${escapeHtml(b.dataset.device.toLowerCase())} ?</p>`,
      `<div class="choices">${list.map(d => `<button class="btn btn-ghost btn-sm" type="button" data-diag="${d.id}">${escapeHtml(d.title)}</button>`).join("")}</div>`);
  } else if (b.dataset.diag) {
    lockChoices(); me(b.textContent.trim());
    begin(DIAGNOSTICS.find(d => d.id === b.dataset.diag));
  } else if (b.hasAttribute("data-none")) {
    lockChoices(); me("Aucun de ceux-ci");
    unknown(document.getElementById("symptom")?.value || "");
  } else if (b.dataset.answer) {
    lockChoices(); me(b.textContent.trim());
    answers[diag.questions[qIndex].id] = b.dataset.answer;
    qIndex++;
    ask();
  } else if (b.hasAttribute("data-restart")) {
    const url = new URL(location.href);
    url.searchParams.delete("s"); url.searchParams.delete("q");
    history.replaceState(null, "", url);
    start();
  }
});

document.getElementById("diag-side").innerHTML = `
  <div class="card">
    <h3>${icon("stethoscope")} Comment ça marche ?</h3>
    <ul class="check-list">
      <li>${icon("check")}<span>Vous décrivez la panne, à l'écrit ou à la voix.</span></li>
      <li>${icon("check")}<span>Quelques questions simples réduisent les hypothèses.</span></li>
      <li>${icon("check")}<span>Les causes possibles sont classées, avec les vérifications à faire.</span></li>
      <li>${icon("check")}<span>Vous accédez à la fiche de réparation, ou à un réparateur si besoin.</span></li>
    </ul>
    <p class="muted" style="font-size:.85rem;margin-top:.8rem">${DIAGNOSTICS.length} pannes couvertes aujourd'hui. Les retours d'intervention partagés par les réparateurs dans la <a class="accent" href="communaute.html">communauté</a> enrichiront le diagnostic.</p>
  </div>
  <div class="card pro-card">
    <h3>${icon("pin")} Besoin d'un pro ?</h3>
    <ul>
      <li><a href="https://www.e-reparation.eco/" target="_blank" rel="noopener">Réparateurs labellisés QualiRépar</a><br><small class="muted">Bonus réparation déduit de la facture.</small></li>
      <li><a href="https://www.repaircafe.org/fr/visiter/" target="_blank" rel="noopener">Repair Café près de chez vous</a><br><small class="muted">Des bénévoles vous aident gratuitement.</small></li>
    </ul>
  </div>`;

const s = params.get("s");
const startDiag = s && DIAGNOSTICS.find(d => d.id === s);
if (startDiag) { start(); lockChoices(); me(startDiag.title); begin(startDiag); }
else start(params.get("q") || "");
