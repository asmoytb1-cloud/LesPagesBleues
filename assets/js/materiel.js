/* Les Pages Bleues — « Mon matériel » : l'utilisateur enregistre ses appareils et sa voiture
   (catalogue : assets/js/materiel-data.js) et ne voit ensuite que les fiches qui les concernent. */

renderHeader("materiel");
renderFooter();

const root = document.getElementById("materiel-root");
const params = new URLSearchParams(location.search);
const THIS_YEAR = new Date().getFullYear();
const OTHER = "__autre";
let kind = params.get("kind") === "voiture" ? "voiture" : "appareil";
let preType = params.get("type") || "";

const typeById = id => APPLIANCE_TYPES.find(t => t.id === id);
const makeByName = name => CAR_MAKES.find(c => c.name === name);
const years = m => m.from ? (m.to ? `${m.from}–${m.to}` : `à partir de ${m.from}`) : "";
const newId = () => "m" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);

function typeOptions() {
  const groups = [...new Set(APPLIANCE_TYPES.map(t => t.group))];
  return `<option value="">Choisissez…</option>` + groups.map(gr => `<optgroup label="${escapeHtml(gr)}">${APPLIANCE_TYPES.filter(t => t.group === gr)
    .map(t => `<option value="${t.id}" ${t.id === preType ? "selected" : ""}>${escapeHtml(t.name)}</option>`).join("")}</optgroup>`).join("");
}

function formHtml() {
  const yearField = `<div class="field"><label for="m-year">Année <small>(facultatif)</small></label>
    <input class="input" id="m-year" type="number" inputmode="numeric" min="1950" max="${THIS_YEAR + 1}" placeholder="${kind === "voiture" ? "2012" : "2020"}">
    <p class="field-hint" id="year-hint" aria-live="polite"></p></div>`;
  const body = kind === "appareil" ? `
    <div class="form-row form-row-2">
      <div class="field"><label for="m-type">Type d'appareil</label>
        <select class="input" id="m-type" required>${typeOptions()}</select></div>
      <div class="field"><label for="m-brand">Marque</label>
        <input class="input" id="m-brand" list="brand-list" autocomplete="off" placeholder="LG, Bosch, Whirlpool…">
        <datalist id="brand-list"></datalist>
        <p class="field-hint" id="brand-hint"></p></div>
    </div>
    <div class="form-row form-row-2">
      <div class="field"><label for="m-model">Modèle ou référence <small>(facultatif)</small></label>
        <input class="input" id="m-model" autocomplete="off" maxlength="60" placeholder="ex. F4WV309S0">
        <p class="field-hint">Elle figure sur la plaque signalétique, souvent dans l'encadrement de la porte ou au dos de l'appareil. Utile pour commander la bonne pièce.</p></div>
      ${yearField}
    </div>` : `
    <div class="form-row form-row-2">
      <div class="field"><label for="m-make">Marque</label>
        <select class="input" id="m-make" required><option value="">Choisissez…</option>${CAR_MAKES.map(c => `<option>${escapeHtml(c.name)}</option>`).join("")}<option value="${OTHER}">Autre marque</option></select>
        <input class="input" id="m-make-other" maxlength="40" placeholder="Nom de la marque" aria-label="Autre marque" hidden style="margin-top:8px"></div>
      <div class="field"><label for="m-car">Modèle</label>
        <select class="input" id="m-car" disabled><option value="">Choisissez d'abord la marque</option></select>
        <input class="input" id="m-car-other" maxlength="40" placeholder="Nom du modèle" aria-label="Autre modèle" hidden style="margin-top:8px"></div>
    </div>
    <div class="form-row form-row-2">
      ${yearField}
      <div class="field"><label for="m-engine">Motorisation <small>(facultatif)</small></label>
        <input class="input" id="m-engine" maxlength="40" autocomplete="off" placeholder="ex. 1.6 TDI 105 ch">
        <p class="field-hint">Le type exact figure sur la carte grise, rubrique D.2 (type, variante, version).</p></div>
    </div>`;
  return `
    <form class="form-card mat-form" id="mat-form" novalidate>
      <h2>${icon("plus")} Ajouter du matériel</h2>
      <div class="seg" role="radiogroup" aria-label="Type de matériel">
        <button type="button" role="radio" data-kind="appareil" aria-checked="${kind === "appareil"}">${icon("washer")} Électroménager</button>
        <button type="button" role="radio" data-kind="voiture" aria-checked="${kind === "voiture"}">${icon("car")} Voiture</button>
      </div>
      ${body}
      <p class="field-err" id="mat-err" hidden></p>
      <div><button class="btn btn-primary" type="submit">${icon("check")} Enregistrer</button></div>
    </form>`;
}

function cardHtml(m) {
  const guides = guidesForMateriel(m);
  const t = m.kind === "appareil" ? typeById(m.type) : null;
  const diagDevice = m.kind === "voiture" ? "Voiture" : t?.diag;
  const details = [m.model && m.kind === "appareil" ? `Réf. ${m.model}` : "", m.engine || "", m.year ? `${m.year}` : ""].filter(Boolean).join(" · ");
  return `
    <article class="mat-card" id="mat-${m.id}">
      <header class="mat-head">
        <span class="mat-ico">${icon(m.kind === "voiture" ? "car" : (t?.icon || "plug"))}</span>
        <div><h3>${escapeHtml(materielName(m))}</h3>${details ? `<p class="muted">${escapeHtml(details)}</p>` : ""}</div>
        <button class="icon-btn" type="button" data-del="${m.id}" aria-label="Retirer ${escapeHtml(materielName(m))}">${icon("trash")}</button>
      </header>
      ${guides.length ? `
        <p class="mat-count"><strong>${guides.length} fiche${guides.length > 1 ? "s" : ""}</strong> pour ${m.kind === "voiture" ? "votre voiture" : "cet appareil"}</p>
        <div class="rows">${guides.slice(0, 4).map(g => guideRow(g)).join("")}</div>`
      : `<p class="muted mat-count">Pas encore de fiche dédiée à ce type d'appareil. Vous savez le réparer ? Partagez votre méthode.</p>`}
      <div class="mat-actions">
        ${guides.length > 4 ? `<a class="btn btn-ghost btn-sm" href="guides.html?materiel=${m.id}">${icon("list")} Voir les ${guides.length} fiches</a>` : ""}
        ${diagDevice ? `<a class="btn btn-ghost btn-sm" href="diagnostic.html?d=${encodeURIComponent(diagDevice)}">${icon("stethoscope")} Diagnostiquer une panne</a>` : ""}
        <a class="btn btn-ghost btn-sm" href="communaute.html?ask=1&q=${encodeURIComponent(materielLabel(m).replace(/ · /g, " "))}">${icon("chat")} Poser une question</a>
        ${guides.length ? "" : `<a class="btn btn-ghost btn-sm" href="ajouter.html">${icon("plus")} Partager une fiche</a>`}
      </div>
    </article>`;
}

function render() {
  const list = loadMateriel();
  root.innerHTML = `
    <div class="mat-layout">
      <div>${formHtml()}
        <p class="muted mat-note">${icon("shield")} Enregistré dans ce navigateur uniquement. Marques d'électroménager d'après le catalogue de pièces Spareka ; marques, modèles et années de voitures d'après les catalogues constructeurs réunis par catcar.info.</p>
      </div>
      <section aria-labelledby="mat-list-title">
        <h2 id="mat-list-title">Mes appareils <span class="chip-n">${list.length}</span></h2>
        ${list.length ? `<div class="mat-list">${list.map(cardHtml).join("")}</div>` : `
          <div class="empty">${icon("box")}<h3>Rien d'enregistré pour l'instant</h3>
            <p>Ajoutez par exemple « lave-linge LG de 2020 » ou « Audi A3 de 2012 » : vous retrouverez ici les fiches qui les concernent, et un raccourci vers le bon diagnostic.</p></div>`}
      </section>
    </div>`;
  wireForm();
}

function wireForm() {
  const $ = id => document.getElementById(id);
  const yearHint = () => {
    const y = +$("m-year").value, hint = $("year-hint");
    hint.classList.remove("warn");
    hint.textContent = "";
    if (kind !== "voiture") return;
    const make = makeByName($("m-make").value);
    const model = make?.models[+$("m-car").value];
    if (!model?.from) return;
    hint.textContent = `Produit ${model.to ? "de " + model.from + " à " + model.to : "à partir de " + model.from}.`;
    if (y && (y < model.from - 1 || (model.to && y > model.to + 1))) {
      hint.classList.add("warn");
      hint.textContent += " L'année saisie ne correspond pas : vérifiez la carte grise (rubrique B, date de 1re immatriculation).";
    }
  };
  $("m-year").addEventListener("input", yearHint);
  if (kind === "appareil") {
    const fill = () => {
      const t = typeById($("m-type").value);
      $("brand-list").innerHTML = t ? t.brands.map(b => `<option value="${escapeHtml(b)}"></option>`).join("") : "";
      $("brand-hint").textContent = t ? `${t.brands.length} marques proposées, ou tapez la vôtre.` : "";
    };
    $("m-type").addEventListener("change", fill);
    fill();
  } else {
    $("m-make").addEventListener("change", () => {
      const v = $("m-make").value, make = makeByName(v), sel = $("m-car");
      $("m-make-other").hidden = v !== OTHER;
      if (v === OTHER) $("m-make-other").focus();
      sel.disabled = !v;
      sel.innerHTML = !v ? `<option value="">Choisissez d'abord la marque</option>`
        : `<option value="">Choisissez…</option>` + (make ? make.models.map((m, i) => `<option value="${i}">${escapeHtml(m.name)}${m.from ? ` (${years(m)})` : ""}</option>`).join("") : "")
          + `<option value="${OTHER}">${make ? "Autre modèle" : "Saisir le modèle"}</option>`;
      if (v === OTHER) sel.value = OTHER;
      $("m-car-other").hidden = sel.value !== OTHER;
      yearHint();
    });
    $("m-car").addEventListener("change", () => {
      $("m-car-other").hidden = $("m-car").value !== OTHER;
      if ($("m-car").value === OTHER) $("m-car-other").focus();
      yearHint();
    });
  }
  $("mat-form").addEventListener("submit", e => {
    e.preventDefault();
    const err = $("mat-err");
    const fail = (msg, el) => { err.textContent = msg; err.hidden = false; el.focus(); };
    err.hidden = true;
    const yRaw = $("m-year").value.trim();
    const year = yRaw ? +yRaw : null;
    if (yRaw && !(year >= 1950 && year <= THIS_YEAR + 1)) return fail(`L'année doit être comprise entre 1950 et ${THIS_YEAR + 1}.`, $("m-year"));
    let item;
    if (kind === "appareil") {
      const t = typeById($("m-type").value);
      if (!t) return fail("Choisissez le type d'appareil.", $("m-type"));
      const typed = $("m-brand").value.trim();
      const known = t.brands.find(b => normalize(b) === normalize(typed));
      item = { kind, type: t.id, typeName: t.name, icon: t.icon, brand: known || typed.slice(0, 40), model: $("m-model").value.trim() };
    } else {
      const mv = $("m-make").value;
      if (!mv) return fail("Choisissez la marque de la voiture.", $("m-make"));
      const brand = mv === OTHER ? $("m-make-other").value.trim() : mv;
      if (!brand) return fail("Indiquez la marque de la voiture.", $("m-make-other"));
      const cv = $("m-car").value;
      const model = cv === OTHER ? $("m-car-other").value.trim() : makeByName(mv)?.models[+cv]?.name;
      if (!model) return fail("Indiquez le modèle de la voiture.", cv === OTHER ? $("m-car-other") : $("m-car"));
      item = { kind, type: "voiture", typeName: "Voiture", icon: "car", brand, model, engine: $("m-engine").value.trim() };
    }
    Object.assign(item, { id: newId(), year, added: new Date().toISOString() });
    if (!saveMateriel([item, ...loadMateriel()])) return fail("Enregistrement impossible : le stockage du navigateur est plein ou bloqué.", $("mat-form").querySelector("[type=submit]"));
    preType = "";
    render();
    const n = guidesForMateriel(item).length;
    toast(`${materielName(item)} enregistré${n ? ` : ${n} fiche${n > 1 ? "s" : ""} dédiée${n > 1 ? "s" : ""}` : ""}.`);
    document.getElementById("mat-" + item.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

root.addEventListener("click", e => {
  const seg = e.target.closest("[data-kind]");
  if (seg && seg.dataset.kind !== kind) {
    kind = seg.dataset.kind;
    render();
    document.querySelector(`[data-kind="${kind}"]`).focus();
    return;
  }
  const del = e.target.closest("[data-del]");
  if (del) {
    const m = materielById(del.dataset.del);
    if (!m) return;
    openModal("Retirer ce matériel ?", `
      <p>${escapeHtml(materielLabel(m))} sera retiré de votre liste. Vos fiches, favoris et réparations ne sont pas touchés.</p>
      <div class="form-actions"><button class="btn btn-ghost" type="button" data-close>Annuler</button>
        <button class="btn btn-danger" type="button" id="confirm-del">${icon("trash")} Retirer</button></div>`, (wrap, close) => {
      wrap.querySelector("#confirm-del").addEventListener("click", () => {
        saveMateriel(loadMateriel().filter(x => x.id !== m.id));
        close();
        render();
        document.getElementById("mat-list-title").setAttribute("tabindex", "-1");
        document.getElementById("mat-list-title").focus();
        toast("Matériel retiré.");
      });
    });
  }
});

render();
