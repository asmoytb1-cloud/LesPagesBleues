/* Les Pages Bleues — partager un guide : formulaire en 4 étapes, brouillon automatique, photos */

renderHeader("ajouter");
renderFooter();

const params = new URLSearchParams(location.search);
const editId = params.get("edit");
const editing = editId ? loadUserGuides().find(g => g.id === editId) : null;
const DRAFT = "lpb-draft";
const STEPS = ["Informations", "Contenu", "Images", "Publication"];
let current = 0;

// Modèle de la fiche en cours de rédaction
const blank = () => ({ title: "", category: "electromenager", difficulty: "Facile", minutes: "", savings: "", summary: "",
  safety: "", tools: "", parts: "", troubleshoot: "", sources: "", cover: "", steps: [{}, {}] });
let draft = editing ? fromGuide(editing) : (store.get(DRAFT, null) || blank());
const restored = !editing && store.get(DRAFT, null) && (draft.title || draft.steps.some(s => s.title || s.text));

function fromGuide(g) {
  return { title: g.title, category: g.category, difficulty: g.difficulty, minutes: g.minutes || "", savings: parseInt((g.savings || "").replace(/\D/g, ""), 10) || "",
    summary: g.summary || "", safety: g.safety || "", tools: (g.tools || []).join("\n"), parts: (g.parts || []).join("\n"),
    troubleshoot: (g.troubleshoot || []).join("\n"), sources: (g.sources || []).map(s => s.url).join("\n"), cover: g.cover || "",
    steps: g.steps.map(s => ({ title: s.title, text: s.text, tip: s.tip || "", timer: s.timer ? Math.round(s.timer / 60) : "", photo: s.photo || "" })) };
}

const root = document.getElementById("add-root");
root.innerHTML = `
  <ol class="stepper" id="stepper" aria-label="Étapes de rédaction"></ol>
  <div class="add-layout">
    <form class="form" id="add-form" novalidate>
      <div id="panel"></div>
      <div id="form-msg" aria-live="polite"></div>
      <div class="form-actions">
        <button class="btn btn-ghost" type="button" id="prev">${icon("back")} Précédent</button>
        <div style="display:flex;gap:.6rem;flex-wrap:wrap">
          <button class="btn btn-ghost" type="button" id="clear">Tout effacer</button>
          <button class="btn btn-primary" type="submit" id="next"></button>
        </div>
      </div>
    </form>
    <aside class="writing-tips">
      <h3>${icon("bulb")} Nos conseils</h3>
      <ul>
        <li>${icon("check")}<span><strong>Soyez clair et précis.</strong> Une action par étape : « Prenez la douille de 10 et retirez les vis du cache ».</span></li>
        <li>${icon("check")}<span><strong>Ajoutez des photos</strong> : une image par étape vaut mieux qu'un long texte.</span></li>
        <li>${icon("check")}<span><strong>Détaillez chaque étape</strong> et indiquez les temps d'attente : le mode accompagnement lancera un minuteur.</span></li>
        <li>${icon("check")}<span><strong>Indiquez les outils nécessaires</strong>, avec la taille exacte.</span></li>
        <li>${icon("check")}<span><strong>Pensez sécurité</strong> : courant coupé, gants, lunettes, chandelles…</span></li>
        <li>${icon("check")}<span><strong>Partagez votre expérience</strong> : les astuces font gagner du temps aux autres.</span></li>
      </ul>
      <div class="notice" style="margin-top:1rem">${icon("leaf")}<p><strong>Chaque guide compte !</strong> Vous aidez des milliers de personnes à réparer plutôt qu'à jeter.</p></div>
    </aside>
  </div>`;

const panel = document.getElementById("panel");
const f = name => panel.querySelector(`[name="${name}"]`);

function saveDraft() {
  if (editing) return;
  if (!store.set(DRAFT, draft)) toast("Brouillon trop lourd pour être sauvegardé (photos) : pensez à publier.");
}

function paintStepper() {
  document.getElementById("stepper").innerHTML = STEPS.map((s, i) => `
    <li class="${i < current ? "done" : ""} ${i === current ? "current" : ""}">
      <button type="button" data-go="${i}" aria-label="Étape ${i + 1} : ${s}" ${i === current ? 'aria-current="step"' : ""}>${i < current ? icon("check") : i + 1}</button>${s}
    </li>`).join("");
  document.getElementById("prev").style.visibility = current ? "visible" : "hidden";
  document.getElementById("next").innerHTML = current === STEPS.length - 1
    ? `${icon("check")} ${editing ? "Enregistrer les modifications" : "Publier la fiche"}` : `Suivant ${icon("arrow")}`;
}

/* ---------- Panneaux ---------- */
function panelInfos() {
  return `
    ${restored ? `<div class="notice">${icon("refresh")}<p>Nous avons retrouvé votre brouillon.</p></div>` : ""}
    ${editing ? `<div class="notice">${icon("doc")}<p>Vous modifiez votre fiche « ${escapeHtml(editing.title)} ».</p></div>` : ""}
    <fieldset class="form-card">
      <legend>${icon("doc")} Informations</legend>
      <div class="field">
        <label for="f-title">Titre du guide <span class="req" aria-hidden="true">*</span></label>
        <input class="input" id="f-title" name="title" required maxlength="90" placeholder="Ex. : Changer la batterie d'une voiture" value="${escapeHtml(draft.title)}" aria-describedby="err-title">
        <p class="field-err" id="err-title" hidden>Donnez un titre à votre guide.</p>
      </div>
      <div class="form-row">
        <div class="field"><label for="f-cat">Catégorie</label>
          <select class="input" id="f-cat" name="category">${CATEGORIES.filter(c => c.id !== "autres").map(c => `<option value="${c.id}" ${draft.category === c.id ? "selected" : ""}>${escapeHtml(c.name)}</option>`).join("")}<option value="autres" ${draft.category === "autres" ? "selected" : ""}>Autres</option></select></div>
        <div class="field"><label for="f-diff">Difficulté</label>
          <select class="input" id="f-diff" name="difficulty">${DIFFICULTIES.map(d => `<option ${draft.difficulty === d ? "selected" : ""}>${d}</option>`).join("")}</select></div>
        <div class="field"><label for="f-min">Durée estimée <small>(minutes)</small></label>
          <input class="input" id="f-min" name="minutes" type="number" min="1" max="1440" inputmode="numeric" placeholder="30" value="${escapeHtml(draft.minutes)}"></div>
      </div>
      <div class="form-row form-row-2">
        <div class="field"><label for="f-sum">Description courte <small>— le problème et la solution</small></label>
          <textarea class="input" id="f-sum" name="summary" maxlength="300" placeholder="Expliquez en quelques mots ce que permet ce guide…">${escapeHtml(draft.summary)}</textarea></div>
        <div class="field"><label for="f-sav">Économie estimée <small>(€, facultatif)</small></label>
          <input class="input" id="f-sav" name="savings" type="number" min="0" max="10000" inputmode="numeric" placeholder="60" value="${escapeHtml(draft.savings)}"></div>
      </div>
    </fieldset>`;
}

function stepEditor(s, i, n) {
  return `
    <div class="step-edit" data-i="${i}">
      <span class="num">${i + 1}</span>
      <div>
        <input class="input step-title" maxlength="80" aria-label="Titre de l'étape ${i + 1}" placeholder="Titre de l'étape — ex. « Retirer le panneau arrière »" value="${escapeHtml(s.title || "")}">
        <textarea class="input step-text" rows="2" aria-label="Description de l'étape ${i + 1}" placeholder="L'action à faire — ex. « Prenez la douille de 10 et retirez les vis du cache, en partant du haut »">${escapeHtml(s.text || "")}</textarea>
        <div class="step-extra">
          <input class="input step-tip" maxlength="200" aria-label="Astuce de l'étape ${i + 1}" placeholder="Astuce (facultatif)" value="${escapeHtml(s.tip || "")}">
          <label class="step-wait">${icon("timer")}<input class="input step-timer" type="number" min="0" max="240" inputmode="numeric" placeholder="0" aria-label="Temps d'attente de l'étape ${i + 1}, en minutes" value="${escapeHtml(s.timer || "")}"><span>min d'attente</span></label>
        </div>
      </div>
      <div class="step-tools">
        <button type="button" class="icon-btn" data-move="-1" aria-label="Monter l'étape ${i + 1}" ${i === 0 ? "disabled" : ""}>${icon("back")}</button>
        <button type="button" class="icon-btn" data-move="1" aria-label="Descendre l'étape ${i + 1}" ${i === n - 1 ? "disabled" : ""}>${icon("arrow")}</button>
        <button type="button" class="icon-btn" data-del aria-label="Supprimer l'étape ${i + 1}" ${n === 1 ? "disabled" : ""}>${icon("trash")}</button>
      </div>
    </div>`;
}

function panelContenu() {
  return `
    <fieldset class="form-card">
      <legend>${icon("shield")} Préparation</legend>
      <div class="field"><label for="f-safety">Sécurité <small>— ce qu'il faut faire avant de commencer</small></label>
        <input class="input" id="f-safety" name="safety" maxlength="220" placeholder="Ex. : Débranchez l'appareil et mettez des gants." value="${escapeHtml(draft.safety)}"></div>
      <div class="form-row form-row-2">
        <div class="field"><label for="f-tools">Outils <small>— un par ligne</small></label>
          <textarea class="input" id="f-tools" name="tools" placeholder="Gants&#10;Clé à douille de 10">${escapeHtml(draft.tools)}</textarea></div>
        <div class="field"><label for="f-parts">Pièces <small>— une par ligne</small></label>
          <textarea class="input" id="f-parts" name="parts" placeholder="Courroie (référence sur l'ancienne)">${escapeHtml(draft.parts)}</textarea></div>
      </div>
    </fieldset>
    <fieldset class="form-card">
      <legend>${icon("doc")} Les étapes <span class="req" aria-hidden="true">*</span></legend>
      <div class="step-editor" id="steps">${draft.steps.map((s, i) => stepEditor(s, i, draft.steps.length)).join("")}</div>
      <p class="field-err" id="err-steps" hidden>Décrivez au moins une étape.</p>
      <button type="button" class="btn btn-ghost" id="add-step">${icon("plus")} Ajouter une étape</button>
    </fieldset>
    <fieldset class="form-card">
      <legend>${icon("alert")} Si ça ne marche pas <small class="muted">(facultatif)</small></legend>
      <div class="field"><label for="f-trouble">Pistes à vérifier <small>— une par ligne</small></label>
        <textarea class="input" id="f-trouble" name="troubleshoot" placeholder="Ex. : La courroie ressaute : vérifiez que le moteur est bien fixé.">${escapeHtml(draft.troubleshoot)}</textarea></div>
    </fieldset>`;
}

function photoSlot(key, label, src) {
  return `
    <div class="photo-slot">
      <label class="ph" for="ph-${key}">${src ? `<img src="${src}" alt="${escapeHtml(label)}">` : `${icon("camera")}`}</label>
      <input type="file" id="ph-${key}" accept="image/*" data-photo="${key}">
      <span>${escapeHtml(label)}</span>
      ${src ? `<button type="button" class="icon-btn rm" data-rm="${key}" aria-label="Retirer la photo : ${escapeHtml(label)}">${icon("trash")}</button>` : ""}
    </div>`;
}
function panelImages() {
  return `
    <fieldset class="form-card">
      <legend>${icon("camera")} Images</legend>
      <p class="muted">Une photo nette par étape aide énormément. Elles sont réduites automatiquement pour rester légères. Ne photographiez ni personne ni plaque d'immatriculation sans accord.</p>
      <h3 style="font-size:1rem">Photo principale</h3>
      <div class="photo-grid">${photoSlot("cover", "Photo principale de la fiche", draft.cover)}</div>
      <h3 style="font-size:1rem">Photos des étapes</h3>
      <div class="photo-grid">${draft.steps.map((s, i) => photoSlot("s" + i, `Étape ${i + 1}${s.title ? " — " + s.title : ""}`, s.photo)).join("")}</div>
    </fieldset>`;
}
function panelPublication() {
  const steps = draft.steps.filter(s => s.title || s.text);
  return `
    <fieldset class="form-card">
      <legend>${icon("eye")} Relecture et publication</legend>
      <div class="preview-box">
        <strong style="font-size:1.1rem">${escapeHtml(draft.title || "Sans titre")}</strong>
        <p class="muted" style="margin-top:.3rem">${escapeHtml(categoryById(draft.category).name)} · ${escapeHtml(draft.difficulty)} · ${draft.minutes ? escapeHtml(draft.minutes) + " min" : "durée non précisée"}</p>
        ${draft.summary ? `<p style="margin-top:.5rem">${escapeHtml(draft.summary)}</p>` : ""}
        <ol>${steps.map(s => `<li><strong>${escapeHtml(s.title || "Étape")}</strong>${s.text ? " — " + escapeHtml(s.text) : ""}</li>`).join("")}</ol>
      </div>
      <div class="field"><label for="f-src">Sources consultées <small>— une adresse web par ligne (facultatif)</small></label>
        <textarea class="input" id="f-src" name="sources" placeholder="https://…">${escapeHtml(draft.sources)}</textarea></div>
      <label class="check"><input type="checkbox" id="ok-safety"><span>J'ai indiqué les précautions de sécurité nécessaires (courant, gaz, freins, produits…).</span></label>
      <label class="check"><input type="checkbox" id="ok-own"><span>J'ai écrit ce guide moi-même, ou je cite mes sources, et mes photos m'appartiennent.</span></label>
      <p class="field-err" id="err-checks" hidden>Cochez les deux cases pour publier.</p>
      <div class="notice">${icon("shield")}<p>Votre fiche sera marquée « non relue » jusqu'à la relecture par un modérateur. Pour l'instant, elle est enregistrée uniquement dans ce navigateur.</p></div>
    </fieldset>`;
}
const PANELS = [panelInfos, panelContenu, panelImages, panelPublication];

/* ---------- Lecture du panneau courant ---------- */
function readPanel() {
  panel.querySelectorAll("[name]").forEach(el => { draft[el.name] = el.value; });
  const eds = panel.querySelectorAll(".step-edit");
  if (eds.length) {
    draft.steps = [...eds].map((d, i) => ({
      ...draft.steps[i],
      title: d.querySelector(".step-title").value.trim(),
      text: d.querySelector(".step-text").value.trim(),
      tip: d.querySelector(".step-tip").value.trim(),
      timer: d.querySelector(".step-timer").value
    }));
  }
}

function show(i) {
  readPanel();
  current = i;
  panel.innerHTML = PANELS[i]();
  paintStepper();
  saveDraft();
  document.getElementById("form-msg").innerHTML = "";
  window.scrollTo({ top: document.querySelector(".page-hero").offsetHeight - 20, behavior: "smooth" });
}

function validate(i) {
  if (i === 0) {
    const ok = !!f("title").value.trim();
    document.getElementById("err-title").hidden = ok;
    f("title").setAttribute("aria-invalid", !ok);
    if (!ok) f("title").focus();
    return ok;
  }
  if (i === 1) {
    readPanel();
    const ok = draft.steps.some(s => s.title || s.text);
    document.getElementById("err-steps").hidden = ok;
    if (!ok) panel.querySelector(".step-title").focus();
    return ok;
  }
  if (i === 3) {
    const ok = document.getElementById("ok-safety").checked && document.getElementById("ok-own").checked;
    document.getElementById("err-checks").hidden = ok;
    return ok;
  }
  return true;
}

/* ---------- Photos : réduites à 1000 px en JPEG avant d'être stockées ---------- */
async function compress(file, max = 1000) {
  const url = URL.createObjectURL(file);
  try {
    const img = new Image();
    img.src = url;
    await img.decode();
    const scale = Math.min(1, max / Math.max(img.naturalWidth, img.naturalHeight));
    const cv = document.createElement("canvas");
    cv.width = Math.round(img.naturalWidth * scale);
    cv.height = Math.round(img.naturalHeight * scale);
    cv.getContext("2d").drawImage(img, 0, 0, cv.width, cv.height);
    return cv.toDataURL("image/jpeg", 0.72);
  } finally { URL.revokeObjectURL(url); }
}

panel.addEventListener("change", async e => {
  const key = e.target.dataset.photo;
  if (!key || !e.target.files[0]) return;
  if (!e.target.files[0].type.startsWith("image/")) { toast("Choisissez une image."); return; }
  try {
    const data = await compress(e.target.files[0], key === "cover" ? 1200 : 1000);
    if (key === "cover") draft.cover = data; else draft.steps[+key.slice(1)].photo = data;
    panel.innerHTML = panelImages();
    saveDraft();
  } catch { toast("Impossible de lire cette image."); }
});
panel.addEventListener("click", e => {
  const rm = e.target.closest("[data-rm]");
  if (rm) {
    const key = rm.dataset.rm;
    if (key === "cover") draft.cover = ""; else draft.steps[+key.slice(1)].photo = "";
    panel.innerHTML = panelImages();
    saveDraft();
    return;
  }
  const item = e.target.closest(".step-edit");
  const move = e.target.closest("[data-move]");
  const del = e.target.closest("[data-del]");
  if (e.target.closest("#add-step")) {
    readPanel();
    draft.steps.push({});
    panel.innerHTML = panelContenu();
    panel.querySelectorAll(".step-title")[draft.steps.length - 1].focus();
    saveDraft();
  } else if (move || del) {
    readPanel();
    const i = +item.dataset.i;
    if (move) {
      const j = i + +move.dataset.move;
      [draft.steps[i], draft.steps[j]] = [draft.steps[j], draft.steps[i]];
    } else if (draft.steps.length > 1) draft.steps.splice(i, 1);
    panel.innerHTML = panelContenu();
    const target = move ? panel.querySelector(`.step-edit[data-i="${i + +move.dataset.move}"] [data-move="${move.dataset.move}"]`) : null;
    (target && !target.disabled ? target : panel.querySelector(".step-title")).focus();
    saveDraft();
  }
});
let inputTimer;
panel.addEventListener("input", () => { clearTimeout(inputTimer); inputTimer = setTimeout(() => { readPanel(); saveDraft(); }, 400); });

document.getElementById("stepper").addEventListener("click", e => {
  const b = e.target.closest("[data-go]");
  if (!b) return;
  const target = +b.dataset.go;
  if (target > current && !validate(current)) return;
  show(target);
});
document.getElementById("prev").addEventListener("click", () => current && show(current - 1));
document.getElementById("clear").addEventListener("click", () => {
  if (!confirm("Effacer tout le contenu du formulaire ?")) return;
  store.remove(DRAFT);
  draft = editing ? fromGuide(editing) : blank();
  panel.innerHTML = "";   // sinon show() relirait les anciens champs
  show(0);
});

/* ---------- Publication ---------- */
const lines = v => String(v || "").split("\n").map(s => s.trim()).filter(Boolean);
const slug = s => normalize(s).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60);
const fmtDuration = m => m >= 60 ? `${Math.floor(m / 60)} h${m % 60 ? " " + String(m % 60).padStart(2, "0") : ""}` : `${m} min`;

document.getElementById("add-form").addEventListener("submit", e => {
  e.preventDefault();
  if (!validate(current)) return;
  if (current < STEPS.length - 1) { show(current + 1); return; }
  readPanel();
  if (!draft.title.trim()) { show(0); validate(0); return; }
  const steps = draft.steps.filter(s => s.title || s.text).map((s, i) => ({
    title: s.title || `Étape ${i + 1}`, text: s.text || "",
    ...(s.tip && { tip: s.tip }), ...(+s.timer > 0 && { timer: +s.timer * 60 }), ...(s.photo && { photo: s.photo })
  }));
  if (!steps.length) { show(1); validate(1); return; }
  const minutes = parseInt(draft.minutes, 10) || 0;
  const savings = parseInt(draft.savings, 10) || 0;
  const guide = {
    id: editing ? editing.id : `${slug(draft.title) || "fiche"}-${Date.now().toString(36)}`,
    title: draft.title.trim(), category: draft.category, difficulty: draft.difficulty,
    duration: minutes ? fmtDuration(minutes) : "—", ...(minutes && { minutes }), ...(savings && { savings: `≈ ${savings} €` }),
    summary: draft.summary.trim(), safety: draft.safety.trim(),
    tools: lines(draft.tools), parts: lines(draft.parts), troubleshoot: lines(draft.troubleshoot),
    sources: lines(draft.sources).filter(u => /^https?:\/\//.test(u)).map(u => ({ url: u, label: u.replace(/^https?:\/\/(www\.)?/, "").slice(0, 70) })),
    ...(draft.cover && { cover: draft.cover }),
    steps, user: true, created: editing ? editing.created : new Date().toISOString(), status: "non relue"
  };
  if (saveUserGuide(guide)) {
    store.remove(DRAFT);
    location.href = guideUrl(guide);
  } else {
    document.getElementById("form-msg").innerHTML =
      `<p class="notice notice-error">${icon("alert")}<span>Impossible d'enregistrer la fiche : le stockage de ce navigateur est plein ou bloqué. Retirez quelques photos et réessayez.</span></p>`;
  }
});

panel.innerHTML = PANELS[0]();
paintStepper();
