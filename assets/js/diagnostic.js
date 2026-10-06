/* Les Pages Bleues — diagnostic : « Je rencontre un problème → on m'aide à trouver la solution ».
   Sans intelligence artificielle : des règles écrites à partir des fiches vérifiées (assets/js/diagnostics-data.js).
   Un écran à la fois : décrire → (choisir) → répondre aux questions → causes probables → guide recommandé. */

renderHeader("diagnostic");
renderFooter();

const root = document.getElementById("diag-root");
const params = new URLSearchParams(location.search);
const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const DEVICES = [...new Set(DIAGNOSTICS.map(d => d.device))];
const DEVICE_ICONS = {
  "Lave-linge": "washer", "Voiture": "car", "Téléphone": "phone", "Ordinateur": "laptop", "Robinet": "drop", "Toilettes": "drop",
  "Évier": "drop", "Réfrigérateur": "fridge", "Aspirateur": "plug", "Lave-vaisselle": "washer", "Cafetière": "coffee", "Tondeuse": "leaf",
  "Vélo": "bike", "Manette": "gamepad", "Prise électrique": "plug"
};
const PHOTO_KEY = "lpb-diag-photo";   // photo jointe : gardée le temps de la visite, pour une question à la communauté

let text = params.get("q") || "";
let photo = null;
try { photo = sessionStorage.getItem(PHOTO_KEY); } catch {}
let diag = null, answers = {}, qIndex = 0;
const history_ = [];   // écrans précédents, pour le bouton « Retour »

let current = null;   // fonction qui redessine l'écran courant
function go(fn, push = true) {
  if (push && current) history_.push(current);
  current = fn;
  fn();
}
function back() {
  const prev = history_.pop();
  if (prev) { current = prev; prev(); } else go(describe, false);
}
const backBtn = () => `<button class="back-link link-btn" type="button" data-back>${icon("back")} Retour</button>`;

/* ---------- 1. Décrire ---------- */
function describe() {
  render(`
    <h1>Quel est le problème&nbsp;?</h1>
    <p class="diag-sub">Décrivez ce qui se passe, avec vos mots.</p>
    <form class="describe" id="describe">
      <label class="sr-only" for="symptom">Décrivez ce qui se passe</label>
      <textarea class="input" id="symptom" rows="4" maxlength="400" placeholder="Ex. : mon lave-linge fait beaucoup de bruit pendant l'essorage">${escapeHtml(text)}</textarea>
      <button class="btn btn-primary btn-lg btn-block" type="submit">Analyser mon problème</button>
    </form>
    <div class="opt-row">
      <label class="opt" for="ph-camera">${icon("camera")}<span>Prendre une photo</span><input type="file" id="ph-camera" accept="image/*" capture="environment"></label>
      <label class="opt" for="ph-pick">${icon("image")}<span>Choisir une photo</span><input type="file" id="ph-pick" accept="image/*"></label>
      <button class="opt" type="button" id="dictate" aria-pressed="false">${icon("mic")}<span>Commande vocale</span></button>
    </div>
    <div id="photo-box">${photoBox()}</div>
    <p class="diag-divider">ou</p>
    <section aria-labelledby="dev-h" class="diag-step">
      <h2 class="h2" id="dev-h">Choisir directement un équipement</h2>
      <div class="device-grid">${DEVICES.map(d => `
        <button class="device-btn" type="button" data-device="${escapeHtml(d)}"><span class="tile-ico">${icon(DEVICE_ICONS[d] || "wrench")}</span>${escapeHtml(d)}</button>`).join("")}</div>
    </section>`);
  const input = document.getElementById("symptom");
  input.addEventListener("input", () => { text = input.value; });
  document.getElementById("describe").addEventListener("submit", e => {
    e.preventDefault();
    text = input.value.trim();
    if (!text) { input.focus(); toast("Décrivez d'abord ce qui se passe, en quelques mots."); return; }
    analyse(text);
  });
  document.getElementById("dictate").addEventListener("click", dictate);
}

// La photo n'est pas analysée : elle est jointe à la question si l'on demande de l'aide (dit clairement)
function photoBox() {
  return photo ? `
    <div class="photo-thumbs">
      <span class="photo-thumb"><img src="${photo}" alt="Votre photo"><button class="icon-btn" type="button" data-photo-rm aria-label="Retirer la photo">${icon("close")}</button></span>
      <p class="field-hint" style="flex:1;min-width:200px">Photo gardée pour votre question. Elle n'est pas analysée automatiquement : si le diagnostic ne suffit pas, elle accompagnera votre question à la communauté.</p>
    </div>` : "";
}

function dictate(e) {
  const btn = e.currentTarget, input = document.getElementById("symptom");
  if (!Recognition) {
    input.focus();
    toast("Touchez le micro de votre clavier pour dicter votre description.");
    return;
  }
  const rec = new Recognition();
  rec.lang = "fr-FR";
  rec.interimResults = false;
  btn.classList.add("on");
  btn.setAttribute("aria-pressed", "true");
  btn.querySelector("span").textContent = "Je vous écoute…";
  rec.onresult = ev => {
    const said = ev.results[0][0].transcript;
    input.value = (input.value.trim() ? input.value.trim() + " " : "") + said;
    text = input.value;
  };
  const stop = () => {
    btn.classList.remove("on");
    btn.setAttribute("aria-pressed", "false");
    btn.querySelector("span").textContent = "Commande vocale";
  };
  rec.onend = stop;
  rec.onerror = () => { stop(); toast("Micro indisponible : autorisez-le, ou écrivez votre description."); };
  try { rec.start(); } catch { stop(); }
}

/* ---------- 2. Comprendre la description ---------- */
function analyse(desc) {
  const scored = diagnosticScores(desc).slice(0, 4);
  if (!scored.length) return go(() => unknown(desc));
  // Une piste nettement en tête : on la suit directement
  if (scored.length === 1 || scored[0][1] >= 1.5 * scored[1][1]) return begin(scored[0][0]);
  const found = scored.map(([d]) => d);
  go(() => render(`
    ${backBtn()}
    <h1>Lequel correspond le mieux&nbsp;?</h1>
    <p class="diag-sub">Plusieurs problèmes ressemblent à votre description.</p>
    <ul class="lgroup problem-list">${found.map(d => `
      <li><button class="lrow" type="button" data-diag="${d.id}"><span class="tile-ico">${icon(DEVICE_ICONS[d.device] || "wrench")}</span>
        <span class="lrow-text"><strong>${escapeHtml(d.title)}</strong><small>${escapeHtml(d.device)}</small></span>${icon("chevron")}</button></li>`).join("")}
      <li><button class="lrow" type="button" data-none><span class="tile-ico tint-slate">${icon("search")}</span>
        <span class="lrow-text"><strong>Aucun de ceux-ci</strong><small>Voir les fiches qui pourraient aider</small></span>${icon("chevron")}</button></li>
    </ul>`));
}

function device(name) {
  const list = DIAGNOSTICS.filter(d => d.device === name);
  if (list.length === 1) return begin(list[0]);
  go(() => render(`
    ${backBtn()}
    <h1>${escapeHtml(name)} : quel est le problème&nbsp;?</h1>
    <ul class="lgroup problem-list">${list.map(d => `
      <li><button class="lrow" type="button" data-diag="${d.id}"><span class="lrow-text"><strong>${escapeHtml(d.title)}</strong></span>${icon("chevron")}</button></li>`).join("")}
    </ul>
    <p class="diag-note">Votre problème n'y est pas ? <button class="linkish" type="button" data-describe>Décrivez-le avec vos mots</button>.</p>`));
}

/* ---------- 3. Questions, une à la fois ---------- */
function begin(d) {
  diag = d; answers = {}; qIndex = 0;
  const url = new URL(location.href);
  url.searchParams.set("s", d.id); url.searchParams.delete("q"); url.searchParams.delete("d");
  history.replaceState(null, "", url);
  go(question);
}

function question() {
  const q = diag.questions[qIndex];
  if (!q) return results();
  const n = diag.questions.length;
  const answerIcon = { oui: "check", non: "close", nsp: "info" };
  render(`
    <button class="back-link link-btn" type="button" data-prev>${icon("back")} ${qIndex ? "Question précédente" : "Retour"}</button>
    <div class="q-progress"><small>Question ${qIndex + 1} sur ${n}</small><div class="progress" role="img" aria-label="Question ${qIndex + 1} sur ${n}"><span style="width:${Math.round(qIndex / n * 100)}%"></span></div></div>
    <div class="q-card">
      <h1 class="q-about">${escapeHtml(diag.title)}</h1>
      ${qIndex === 0 ? `<p>${escapeHtml(diag.intro)}</p>` : ""}
      ${qIndex === 0 && diag.safety ? `<p class="note note-safety">${icon("shield")}<span>${escapeHtml(diag.safety)}</span></p>` : ""}
      <h2 id="q-text">${escapeHtml(q.text)}</h2>
      <div class="answer-list" role="group" aria-labelledby="q-text">${q.options.map(o => `
        <button class="answer-btn" type="button" data-answer="${o.v}">${icon(answerIcon[o.v] || "chevron")}${escapeHtml(o.label)}</button>`).join("")}</div>
    </div>`);
}

/* ---------- 4. Ce que nous avons trouvé ---------- */
function results() {
  const ranked = rankCauses(diag, answers);
  const top = ranked.filter(c => c.score > 0);
  const shown = (top.length ? top : ranked).slice(0, 3);
  const danger = shown.find(c => c.danger && c.score > 0);
  const reco = shown.map(c => c.guide && guideById(c.guide)).find(Boolean);
  const first = shown[0];
  const firstGuide = first.guide && guideById(first.guide);
  const advice = danger ? `Par sécurité, commencez par là : ${danger.checks[0]}`
    : first.pro && !firstGuide ? `${first.checks[0]} Un réparateur labellisé QualiRépar peut s'en charger ; le bonus réparation réduit la facture si l'appareil y donne droit.`
    : `Commencez par la cause n° 1 : c'est la plus probable${first.level === 1 ? ", et la plus simple à vérifier" : ""}. ${first.checks[0]}`;
  const posts = loadPosts().filter(p => p.type === "intervention" && scoreText([[p.symptom || "", 3], [p.device || "", 2], [p.title, 2]], queryWords(diag.title + " " + diag.device)) > 0).slice(0, 3);
  const ask = `communaute.html?ask=1&q=${encodeURIComponent(text || diag.title)}${photo ? "&photo=1" : ""}`;
  render(`
    <button class="back-link link-btn" type="button" data-prev>${icon("back")} Modifier mes réponses</button>
    <div class="results-head">
      <p class="eyebrow">${escapeHtml(diag.title)}</p>
      <h1>Voici ce que nous avons trouvé</h1>
      <p>Les causes les plus probables d'après vos réponses, de la plus à la moins probable.</p>
    </div>
    ${danger ? `<div class="notice notice-error">${icon("alert")}<p><strong>Attention :</strong> ${escapeHtml(danger.checks[0])}</p></div>` : ""}
    <ol class="hyp-list">${shown.map((c, i) => {
      const g = c.guide && guideById(c.guide);
      const level = c.confidence === "élevée" ? "high" : c.confidence === "moyenne" ? "mid" : "low";
      return `
      <li><details class="hyp"${i === 0 ? " open" : ""}>
        <summary>
          <span class="hyp-num" aria-hidden="true">${i + 1}</span>
          <span class="hyp-main">
            <h2>${icon(c.pro ? "wrench" : g ? "doc" : "search")}<span><span class="sr-only">Cause ${i + 1} : </span>${escapeHtml(c.title)}</span></h2>
            <span class="hyp-prob prob-${level}">Probabilité ${c.confidence}<span class="prob-bar" aria-hidden="true"><span style="width:${Math.round(Math.max(.08, c.share) * 100)}%"></span></span></span>
          </span>
          ${icon("chevron")}
        </summary>
        <div class="hyp-body">
          <ul class="check-list">${c.checks.map(ch => `<li>${icon("check")}<span>${escapeHtml(ch)}</span></li>`).join("")}</ul>
          ${g || c.pro ? `<div class="gcard-meta">
            ${g ? `<span>${icon("clock")} ${escapeHtml(g.duration)}</span><span>${dots(g)} ${escapeHtml(g.difficulty)}</span>` : ""}
            ${c.pro ? `<span class="tag tag-orange">${icon("wrench")} Professionnel conseillé</span>` : ""}</div>` : ""}
          <div class="hyp-actions">
            ${g ? `<a class="btn btn-ghost btn-sm" href="${guideUrl(g)}">${icon("doc")} Voir la fiche</a>` : ""}
            ${c.pro ? `<a class="btn btn-ghost btn-sm" href="https://www.e-reparation.eco/" target="_blank" rel="noopener">${icon("pin")} Réparateur labellisé</a>` : ""}
          </div>
        </div>
      </details></li>`;
    }).join("")}</ol>
    <div class="advice"><h2>${icon("bulb")} Notre conseil</h2><p>${escapeHtml(advice)}</p></div>
    <div class="result-actions">
      ${reco ? `<a class="btn btn-primary btn-lg btn-block" id="reco-guide" href="${guideUrl(reco)}">Voir le guide recommandé ${icon("arrow")}</a>`
        : `<a class="btn btn-primary btn-lg btn-block" href="https://www.e-reparation.eco/" target="_blank" rel="noopener">${icon("pin")} Trouver un réparateur</a>`}
      <div class="result-more">
        <a class="btn btn-ghost btn-sm" href="${ask}">${icon("chat")} Demander à la communauté</a>
        ${reco ? `<a class="btn btn-ghost btn-sm" href="https://www.e-reparation.eco/" target="_blank" rel="noopener">${icon("pin")} Trouver un réparateur</a>` : ""}
        <button class="btn btn-ghost btn-sm" type="button" data-restart>${icon("refresh")} Nouveau diagnostic</button>
      </div>
    </div>
    ${posts.length ? `<section class="card"><h2>${icon("wrench")} Retours de réparateurs sur cet appareil</h2>
      <ul class="check-list">${posts.map(p => `<li>${icon("wrench")}<span>${escapeHtml(p.symptom || p.title)} → <strong>${escapeHtml(p.cause || "?")}</strong>${p.fix ? ` (${escapeHtml(p.fix)})` : ""}</span></li>`).join("")}</ul></section>` : ""}
    <p class="diag-note">Ce classement est une estimation tirée de vos réponses, selon des règles écrites d'après nos fiches vérifiées. Il oriente, mais ne remplace pas l'avis d'un professionnel.</p>`);
}

function unknown(desc) {
  const guides = searchGuides(desc, "", 0.6).slice(0, 3);
  const ask = `communaute.html?ask=1&q=${encodeURIComponent(desc)}${photo ? "&photo=1" : ""}`;
  render(`
    ${backBtn()}
    <div class="results-head">
      <h1>Nous ne connaissons pas encore ce problème</h1>
      <p>Le diagnostic couvre pour l'instant ${DIAGNOSTICS.length} pannes courantes.${guides.length ? " Ces fiches peuvent quand même vous aider :" : ""}</p>
    </div>
    ${guides.length ? `<div class="rows">${guides.map(g => guideRow(g, queryWords(desc))).join("")}</div>` : ""}
    <div class="result-actions">
      <a class="btn btn-primary btn-lg btn-block" href="${ask}">${icon("chat")} Demander à la communauté</a>
      <div class="result-more">
        <a class="btn btn-ghost btn-sm" href="https://www.e-reparation.eco/" target="_blank" rel="noopener">${icon("pin")} Trouver un réparateur</a>
        <button class="btn btn-ghost btn-sm" type="button" data-restart>${icon("refresh")} Nouveau diagnostic</button>
      </div>
    </div>`);
}

function render(html) {
  const hadFocus = root.contains(document.activeElement);
  root.innerHTML = `<div class="diag-step">${html}</div>`;
  const h = root.querySelector("h1");
  // Après un choix, le lecteur d'écran repart du titre du nouvel écran
  if (h && hadFocus) { h.tabIndex = -1; h.focus({ preventScroll: true }); }
  window.scrollTo(0, 0);
}

/* ---------- Interactions ---------- */
root.addEventListener("click", e => {
  const b = e.target.closest("button");
  if (!b || b.disabled) return;
  if (b.hasAttribute("data-back")) back();
  else if (b.hasAttribute("data-prev")) {
    if (current === results) { qIndex = diag.questions.length - 1; delete answers[diag.questions[qIndex].id]; back(); }
    else if (current === question && qIndex > 0) { qIndex--; delete answers[diag.questions[qIndex].id]; question(); }
    else back();
  }
  else if (b.dataset.device) device(b.dataset.device);
  else if (b.dataset.diag) begin(DIAGNOSTICS.find(d => d.id === b.dataset.diag));
  else if (b.hasAttribute("data-none")) go(() => unknown(text));
  else if (b.hasAttribute("data-describe")) go(describe);
  else if (b.dataset.answer) {
    answers[diag.questions[qIndex].id] = b.dataset.answer;
    qIndex++;
    if (qIndex >= diag.questions.length) go(results); else question();
  } else if (b.hasAttribute("data-restart")) {
    const url = new URL(location.href);
    ["s", "q", "d"].forEach(k => url.searchParams.delete(k));
    history.replaceState(null, "", url);
    text = ""; diag = null; history_.length = 0;
    current = null;
    go(describe, false);
  } else if (b.hasAttribute("data-photo-rm")) {
    photo = null;
    try { sessionStorage.removeItem(PHOTO_KEY); } catch {}
    document.getElementById("photo-box").innerHTML = "";
  }
});

root.addEventListener("change", async e => {
  if (!["ph-camera", "ph-pick"].includes(e.target.id) || !e.target.files[0]) return;
  try {
    photo = await compressImage(e.target.files[0], 900, .7);
    try { sessionStorage.setItem(PHOTO_KEY, photo); } catch {}
    document.getElementById("photo-box").innerHTML = photoBox();
  } catch { toast("Cette image n'a pas pu être lue."); }
  e.target.value = "";
});

/* ---------- Point de départ : ?s=<diagnostic>, ?q=<description>, ?d=<appareil> ---------- */
const startDiag = params.get("s") && DIAGNOSTICS.find(d => d.id === params.get("s"));
const startDevice = params.get("d");
if (startDiag) { current = describe; begin(startDiag); }
else if (startDevice && DEVICES.includes(startDevice)) { current = describe; device(startDevice); }
else if (text.trim()) { current = describe; analyse(text.trim()); }
else go(describe, false);
