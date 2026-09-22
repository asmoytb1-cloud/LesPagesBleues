/* Les Pages Bleues — formulaire d'ajout de fiche, avec brouillon automatique */

renderHeader("");
renderFooter();
hydrateIcons();

const form = document.getElementById("add-form");
const stepsEl = document.getElementById("steps");
const DRAFT = "lpb-draft";

document.getElementById("category").innerHTML =
  CATEGORIES.map(c => `<option value="${c.id}">${c.name}</option>`).join("");

/* ---------- Éditeur d'étapes ---------- */
function renumber() {
  const items = [...stepsEl.children];
  items.forEach((d, i) => {
    d.querySelector(".num").textContent = i + 1;
    d.querySelector("[data-move='-1']").disabled = i === 0;
    d.querySelector("[data-move='1']").disabled = i === items.length - 1;
    d.querySelector("[data-del]").disabled = items.length === 1;
  });
}
function addStep(data = {}, focus = false) {
  const div = document.createElement("div");
  div.className = "step-edit";
  div.innerHTML = `
    <span class="num"></span>
    <div>
      <input class="input step-title" placeholder="Titre de l'étape — ex. « Retirer le panneau arrière »" maxlength="80" aria-label="Titre de l'étape">
      <textarea class="input step-text" rows="2" aria-label="Description de l'étape"
        placeholder="L'action à faire — ex. « Prenez la douille de 10 et retirez les vis du cache, en partant du haut »"></textarea>
      <div class="step-extra">
        <input class="input step-tip" placeholder="Astuce (facultatif)" maxlength="200" aria-label="Astuce">
        <label class="step-wait">${icon("timer")}<input class="input step-timer" type="number" min="0" max="240" inputmode="numeric" placeholder="0" aria-label="Temps d'attente en minutes"><span>min d'attente</span></label>
      </div>
    </div>
    <div class="step-tools">
      <button type="button" class="icon-btn" data-move="-1" aria-label="Monter l'étape">${icon("back")}</button>
      <button type="button" class="icon-btn" data-move="1" aria-label="Descendre l'étape">${icon("arrow")}</button>
      <button type="button" class="icon-btn" data-del aria-label="Supprimer l'étape">${icon("trash")}</button>
    </div>`;
  div.querySelector(".step-title").value = data.title || "";
  div.querySelector(".step-text").value = data.text || "";
  div.querySelector(".step-tip").value = data.tip || "";
  div.querySelector(".step-timer").value = data.timer ? Math.round(data.timer / 60) : "";
  stepsEl.appendChild(div);
  renumber();
  if (focus) div.querySelector(".step-title").focus();
}

stepsEl.addEventListener("click", e => {
  const item = e.target.closest(".step-edit");
  const move = e.target.closest("[data-move]");
  if (move) {
    const dir = +move.dataset.move;
    if (dir < 0 && item.previousElementSibling) stepsEl.insertBefore(item, item.previousElementSibling);
    if (dir > 0 && item.nextElementSibling) stepsEl.insertBefore(item.nextElementSibling, item);
    renumber();
    saveDraft();
    move.focus();
  } else if (e.target.closest("[data-del]") && stepsEl.children.length > 1) {
    item.remove();
    renumber();
    saveDraft();
  }
});
document.getElementById("add-step").addEventListener("click", () => addStep({}, true));

/* ---------- Lecture du formulaire ---------- */
const lines = v => v.split("\n").map(s => s.trim()).filter(Boolean);
const slug = s => normalize(s).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const f = name => form.elements[name].value.trim();

function readSteps() {
  return [...stepsEl.querySelectorAll(".step-edit")].map(d => ({
    title: d.querySelector(".step-title").value.trim(),
    text: d.querySelector(".step-text").value.trim(),
    tip: d.querySelector(".step-tip").value.trim(),
    timer: (parseInt(d.querySelector(".step-timer").value, 10) || 0) * 60
  }));
}
function readForm() {
  return {
    title: f("title"), category: f("category"), difficulty: f("difficulty"),
    minutes: f("minutes"), summary: f("summary"), savings: f("savings"),
    safety: f("safety"), tools: form.elements.tools.value, parts: form.elements.parts.value,
    troubleshoot: form.elements.troubleshoot.value, steps: readSteps()
  };
}
const fmtDuration = m => m >= 60 ? `${Math.floor(m / 60)} h${m % 60 ? " " + String(m % 60).padStart(2, "0") : ""}` : `${m} min`;

/* ---------- Brouillon automatique ---------- */
let draftTimer;
function saveDraft() {
  clearTimeout(draftTimer);
  draftTimer = setTimeout(() => store.set(DRAFT, readForm()), 300);
}
function loadDraft() {
  const d = store.get(DRAFT, null);
  const hasContent = d && (d.title || (d.steps || []).some(s => s.title || s.text));
  if (!hasContent) { addStep(); addStep(); return; }
  for (const k of ["title", "category", "difficulty", "minutes", "summary", "savings", "safety", "tools", "parts", "troubleshoot"]) {
    if (d[k] != null && form.elements[k]) form.elements[k].value = d[k];
  }
  (d.steps && d.steps.length ? d.steps : [{}, {}]).forEach(s => addStep(s));
  const note = document.getElementById("draft-note");
  note.hidden = false;
  note.innerHTML = `${icon("refresh")} <span>Nous avons retrouvé votre brouillon.</span>`;
}
form.addEventListener("input", saveDraft);
form.addEventListener("change", saveDraft);
document.getElementById("clear-draft").addEventListener("click", () => {
  if (!confirm("Effacer tout le contenu du formulaire ?")) return;
  store.remove(DRAFT);
  form.reset();
  stepsEl.innerHTML = "";
  addStep(); addStep();
  document.getElementById("draft-note").hidden = true;
});
loadDraft();

/* ---------- Publication ---------- */
function showError(id, show, input) {
  document.getElementById(id).hidden = !show;
  if (input) input.setAttribute("aria-invalid", show);
}

form.addEventListener("submit", e => {
  e.preventDefault();
  const title = f("title");
  const steps = readSteps()
    .filter(s => s.title || s.text)
    .map((s, i) => ({
      title: s.title || `Étape ${i + 1}`,
      text: s.text,
      ...(s.tip && { tip: s.tip }),
      ...(s.timer && { timer: s.timer })
    }));

  showError("title-err", !title, form.elements.title);
  showError("steps-err", !steps.length);
  if (!title) { form.elements.title.focus(); return; }
  if (!steps.length) { stepsEl.querySelector(".step-title").focus(); return; }

  const minutes = parseInt(f("minutes"), 10) || 0;
  const savings = parseInt(f("savings"), 10) || 0;
  const guide = {
    id: `${slug(title) || "fiche"}-${Date.now().toString(36)}`,
    title,
    category: f("category"),
    difficulty: f("difficulty"),
    duration: minutes ? fmtDuration(minutes) : "—",
    ...(minutes && { minutes }),
    ...(savings && { savings: `≈ ${savings} €` }),
    summary: f("summary"),
    safety: f("safety"),
    tools: lines(form.elements.tools.value),
    parts: lines(form.elements.parts.value),
    troubleshoot: lines(form.elements.troubleshoot.value),
    steps,
    user: true
  };
  if (saveUserGuide(guide)) {
    store.remove(DRAFT);
    location.href = `guide.html?id=${encodeURIComponent(guide.id)}`;
  } else {
    document.getElementById("form-msg").innerHTML =
      `<p class="notice notice-error">Impossible d'enregistrer la fiche dans ce navigateur (stockage bloqué ou plein).</p>`;
  }
});
