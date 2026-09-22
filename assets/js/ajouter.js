/* Les Pages Bleues — formulaire d'ajout de fiche */

renderHeader("");
renderFooter();
hydrateIcons();

const form = document.getElementById("add-form");
const stepsEl = document.getElementById("steps");

document.getElementById("category").innerHTML =
  CATEGORIES.map(c => `<option value="${c.id}">${c.name}</option>`).join("");

function renumber() {
  stepsEl.querySelectorAll(".step-edit .num").forEach((n, i) => { n.textContent = i + 1; });
}
function addStep() {
  const div = document.createElement("div");
  div.className = "step-edit";
  div.innerHTML = `
    <span class="num"></span>
    <div>
      <input class="input step-title" placeholder="Titre de l'étape" maxlength="80">
      <textarea class="input step-text" placeholder="Décrivez l'action à réaliser" rows="2"></textarea>
    </div>
    <button type="button" class="icon-btn" aria-label="Supprimer l'étape">${icon("close")}</button>`;
  div.querySelector("button").addEventListener("click", () => {
    if (stepsEl.children.length > 1) { div.remove(); renumber(); }
  });
  stepsEl.appendChild(div);
  renumber();
}
addStep(); addStep();
document.getElementById("add-step").addEventListener("click", addStep);

const lines = v => v.split("\n").map(s => s.trim()).filter(Boolean);
const slug = s => normalize(s).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

form.addEventListener("submit", e => {
  e.preventDefault();
  const msg = document.getElementById("form-msg");
  const title = form.elements.title.value.trim();
  const steps = [...stepsEl.querySelectorAll(".step-edit")]
    .map(d => ({ title: d.querySelector(".step-title").value.trim(), text: d.querySelector(".step-text").value.trim() }))
    .filter(s => s.title || s.text)
    .map((s, i) => ({ title: s.title || `Étape ${i + 1}`, text: s.text }));

  if (!title || !steps.length) {
    msg.innerHTML = `<p class="notice" style="border-color:#ff6b6b;background:rgba(255,107,107,.08)">Ajoutez au moins un titre et une étape.</p>`;
    return;
  }
  const guide = {
    id: `${slug(title) || "fiche"}-${Date.now().toString(36)}`,
    title,
    category: form.elements.category.value,
    difficulty: form.elements.difficulty.value,
    duration: form.elements.duration.value.trim() || "—",
    summary: form.elements.summary.value.trim(),
    tools: lines(form.elements.tools.value),
    parts: lines(form.elements.parts.value),
    steps,
    user: true
  };
  if (saveUserGuide(guide)) location.href = `guide.html?id=${encodeURIComponent(guide.id)}`;
  else msg.innerHTML = `<p class="notice">Impossible d'enregistrer la fiche dans ce navigateur.</p>`;
});
