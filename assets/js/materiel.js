/* Les Pages Bleues — « Mon matériel » : l'utilisateur enregistre ses équipements, sa voiture ou sa moto
   (catalogue : assets/js/materiel-data.js) et ne voit ensuite que les fiches qui les concernent. */

renderHeader("materiel");
renderFooter();

const root = document.getElementById("materiel-root");
const params = new URLSearchParams(location.search);
const THIS_YEAR = new Date().getFullYear();
const OTHER = "__autre";
const VEHICLES = {
  voiture: { label: "Voiture", icon: "car", makes: CAR_MAKES, source: "catcar", yearPh: "2012", production: true },
  moto: { label: "Moto", icon: "moto", makes: MOTO_MAKES, source: "motobook", yearPh: "2021", production: false }
};

const typeById = id => APPLIANCE_TYPES.find(t => t.id === id);
const domains = () => CATEGORIES.filter(c => APPLIANCE_TYPES.some(t => t.category === c.id));
const years = m => m.from ? (m.to && m.to !== m.from ? `${m.from}–${m.to}` : m.to ? `${m.from}` : `à partir de ${m.from}`) : "";
const newId = () => "m" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);

// Références et modèles d'un type : fichiers assets/data/modeles/*.json, chargés seulement quand on en a besoin
const modelFiles = new Map();
function loadModels(t) {
  if (!t?.refFile) return Promise.resolve(null);
  if (!modelFiles.has(t.refFile)) modelFiles.set(t.refFile, fetch(`${ROOT}assets/data/modeles/${t.refFile}.json`)
    .then(r => r.ok ? r.json() : null).catch(() => null));
  return modelFiles.get(t.refFile).then(d => d && d[t.id]);
}
// Index de recherche d'un type : [texte affiché, forme simplifiée, marque] pour toutes les marques
const modelIndex = new Map();
async function typeIndex(t) {
  if (!modelIndex.has(t.id)) {
    const refs = await loadModels(t) || {};
    const rows = [];
    for (const [b, ms] of Object.entries(t.models || {})) for (const m of ms) rows.push([m, squash(m), b]);
    for (const [b, list] of Object.entries(refs)) for (const r of list.split("\n")) { const shown = showRef(r); rows.push([shown, squash(shown), b]); }
    modelIndex.set(t.id, rows);
  }
  return modelIndex.get(t.id);
}
// Les références Spareka sont stockées en minuscules avec des tirets : « f4wv309s0 » → « F4WV309S0 »
const showRef = r => /^[a-z0-9-]+$/.test(r) ? r.replace(/-/g, " ").toUpperCase() : r;
const squash = s => normalize(s).replace(/[^a-z0-9]/g, "");

// Point de départ : ?type=lave-linge, ?type=voiture, ?kind=moto, ?cat=jardin
let preType = params.get("type") || "";
let kind = VEHICLES[preType] ? preType : VEHICLES[params.get("kind")] ? params.get("kind") : "appareil";
let domain = typeById(preType)?.category || (domains().some(c => c.id === params.get("cat")) ? params.get("cat") : "electromenager");

function applianceFields() {
  const types = APPLIANCE_TYPES.filter(t => t.category === domain);
  const groups = [...new Set(types.map(t => t.group))];
  return `
    <div class="form-row form-row-2">
      <div class="field"><label for="m-domain">Domaine</label>
        <select class="input" id="m-domain">${domains().map(c => `<option value="${c.id}" ${c.id === domain ? "selected" : ""}>${escapeHtml(c.name)}</option>`).join("")}</select></div>
      <div class="field"><label for="m-type">Type d'équipement</label>
        <select class="input" id="m-type" required><option value="">Choisissez…</option>${groups.map(gr => `<optgroup label="${escapeHtml(gr)}">${types.filter(t => t.group === gr)
          .map(t => `<option value="${t.id}" ${t.id === preType ? "selected" : ""}>${escapeHtml(t.name)}</option>`).join("")}</optgroup>`).join("")}</select></div>
    </div>
    <div class="form-row form-row-2">
      <div class="field"><label for="m-brand">Marque</label>
        <input class="input" id="m-brand" list="brand-list" autocomplete="off" maxlength="40" placeholder="Tapez ou choisissez la marque">
        <datalist id="brand-list"></datalist>
        <p class="field-hint" id="brand-hint"></p></div>
      <div class="field"><label for="m-model">Modèle ou référence <small>(facultatif)</small></label>
        <input class="input" id="m-model" list="model-list" autocomplete="off" maxlength="160" placeholder="ex. F4WV309S0">
        <datalist id="model-list"></datalist>
        <p class="field-hint" id="model-hint">Elle figure sur l'étiquette ou la plaque signalétique (dessous, dos ou encadrement de porte). Utile pour commander la bonne pièce.</p></div>
    </div>
    <div class="form-row form-row-2">${yearField()}</div>`;
}

function vehicleFields() {
  const v = VEHICLES[kind];
  return `
    <div class="form-row form-row-2">
      <div class="field"><label for="m-make">Marque</label>
        <select class="input" id="m-make" required><option value="">Choisissez…</option>${v.makes.map(c => `<option>${escapeHtml(c.name)}</option>`).join("")}<option value="${OTHER}">Autre marque</option></select>
        <input class="input" id="m-make-other" maxlength="40" placeholder="Nom de la marque" aria-label="Autre marque" hidden style="margin-top:8px"></div>
      <div class="field"><label for="m-car">Modèle</label>
        <select class="input" id="m-car" disabled><option value="">Choisissez d'abord la marque</option></select>
        <input class="input" id="m-car-other" maxlength="40" placeholder="Nom du modèle" aria-label="Autre modèle" hidden style="margin-top:8px"></div>
    </div>
    <div class="form-row form-row-2">
      ${yearField()}
      <div class="field"><label for="m-engine">${kind === "voiture" ? "Motorisation" : "Version ou cylindrée"} <small>(facultatif)</small></label>
        <input class="input" id="m-engine" maxlength="40" autocomplete="off" placeholder="${kind === "voiture" ? "ex. 1.6 TDI 105 ch" : "ex. 800 cm³"}">
        <p class="field-hint">${kind === "voiture" ? "Le type exact figure sur la carte grise, rubrique D.2 (type, variante, version)." : "La carte grise indique le type exact (rubrique D.2) et la cylindrée (rubrique P.1)."}</p></div>
    </div>`;
}

function yearField() {
  return `<div class="field"><label for="m-year">Année <small>(facultatif)</small></label>
    <input class="input" id="m-year" type="number" inputmode="numeric" min="1950" max="${THIS_YEAR + 1}" placeholder="${VEHICLES[kind]?.yearPh || "2020"}">
    <p class="field-hint" id="year-hint" aria-live="polite"></p></div>`;
}

function formHtml() {
  const kinds = [["appareil", "plug", "Équipement"], ["voiture", "car", "Voiture"], ["moto", "moto", "Moto"]];
  return `
    <form class="form-card mat-form" id="mat-form" novalidate>
      <h2>${icon("plus")} Ajouter du matériel</h2>
      <div class="seg" role="radiogroup" aria-label="Type de matériel">${kinds.map(([k, ic, label]) =>
        `<button type="button" role="radio" data-kind="${k}" aria-checked="${kind === k}">${icon(ic)} ${label}</button>`).join("")}</div>
      ${kind === "appareil" ? applianceFields() : vehicleFields()}
      <p class="field-err" id="mat-err" hidden></p>
      <div><button class="btn btn-primary" type="submit">${icon("check")} Enregistrer</button></div>
    </form>`;
}

function cardHtml(m) {
  const guides = guidesForMateriel(m);
  const t = typeById(m.type);
  const diagDevice = m.kind === "voiture" ? "Voiture" : t?.diag;
  const details = [!isVehicle(m) && m.model ? m.model : "", m.engine || "", m.year ? `${m.year}` : ""].filter(Boolean).join(" · ");
  const forWhat = m.kind === "voiture" ? "votre voiture" : m.kind === "moto" ? "votre moto" : "cet équipement";
  return `
    <article class="mat-card" id="mat-${m.id}">
      <header class="mat-head">
        <span class="mat-ico">${icon(m.icon || t?.icon || "box")}</span>
        <div><h3>${escapeHtml(materielName(m))}</h3>${details ? `<p class="muted">${escapeHtml(details)}</p>` : ""}</div>
        <button class="icon-btn" type="button" data-del="${m.id}" aria-label="Retirer ${escapeHtml(materielName(m))}">${icon("trash")}</button>
      </header>
      ${guides.length ? `
        <p class="mat-count"><strong>${guides.length} fiche${guides.length > 1 ? "s" : ""}</strong> pour ${forWhat}</p>
        <div class="rows">${guides.slice(0, 4).map(g => guideRow(g)).join("")}</div>`
      : `<p class="muted mat-count">Pas encore de fiche dédiée à ce type de matériel. Vous savez le réparer ? Partagez votre méthode.</p>`}
      <div class="mat-actions">
        ${guides.length > 4 ? `<a class="btn btn-ghost btn-sm" href="guides.html?materiel=${m.id}">${icon("list")} Voir les ${guides.length} fiches</a>` : ""}
        ${diagDevice ? `<a class="btn btn-ghost btn-sm" href="diagnostic.html?d=${encodeURIComponent(diagDevice)}">${icon("stethoscope")} Diagnostiquer une panne</a>` : ""}
        <a class="btn btn-ghost btn-sm" href="communaute.html?ask=1&q=${encodeURIComponent(materielLabel(m).replace(/ · /g, " "))}">${icon("chat")} Poser une question</a>
        ${guides.length ? "" : `<a class="btn btn-ghost btn-sm" href="ajouter.html">${icon("plus")} Partager une fiche</a>`}
      </div>
    </article>`;
}

function sourcesNote() {
  const used = [...new Set([...APPLIANCE_TYPES.flatMap(t => t.sources).filter(Boolean), "catcar", "motobook"])];
  return used.map(k => MATERIEL_SOURCES[k]).filter(Boolean)
    .map(s => `<a href="${s.url}" target="_blank" rel="noopener">${escapeHtml(s.name)}</a>`).join(", ");
}

function render() {
  const list = loadMateriel();
  root.innerHTML = `
    <div class="mat-layout">
      <div>${formHtml()}
        <p class="muted mat-note">${icon("shield")}<span>Enregistré dans ce navigateur uniquement. Types, marques et modèles proposés d'après les catalogues de ${sourcesNote()}. Votre modèle n'y est pas ? Tapez-le simplement.</span></p>
      </div>
      <section aria-labelledby="mat-list-title">
        <h2 id="mat-list-title">Mon matériel <span class="chip-n">${list.length}</span></h2>
        ${list.length ? `<div class="mat-list">${list.map(cardHtml).join("")}</div>` : `
          <div class="empty">${icon("box")}<h3>Rien d'enregistré pour l'instant</h3>
            <p>Ajoutez par exemple « lave-linge LG de 2020 », « Audi A3 de 2012 » ou votre moto : vous retrouverez ici les fiches qui les concernent, et un raccourci vers le bon diagnostic.</p></div>`}
      </section>
    </div>`;
  wireForm();
}

function wireForm() {
  const $ = id => document.getElementById(id);
  const vehicleModel = () => VEHICLES[kind]?.makes.find(c => c.name === $("m-make").value)?.models[+$("m-car").value];
  const yearHint = () => {
    const y = +$("m-year").value, hint = $("year-hint");
    hint.classList.remove("warn");
    hint.textContent = "";
    const model = VEHICLES[kind] && vehicleModel();
    if (!model?.from) return;
    if (!VEHICLES[kind].production) { hint.textContent = `Millésimes connus : ${years(model)}.`; return; }
    hint.textContent = `Produit ${model.to ? "de " + model.from + " à " + model.to : "à partir de " + model.from}.`;
    if (y && (y < model.from - 1 || (model.to && y > model.to + 1))) {
      hint.classList.add("warn");
      hint.textContent += " L'année saisie ne correspond pas : vérifiez la carte grise (rubrique B, date de 1re immatriculation).";
    }
  };
  $("m-year").addEventListener("input", yearHint);

  if (kind === "appareil") {
    let rows = [], request = 0;
    const brandOf = () => { const t = typeById($("m-type").value); return t?.brands.find(b => normalize(b) === normalize($("m-brand").value.trim())); };
    const suggest = () => {
      const q = squash($("m-model").value), brand = brandOf();
      const hits = [];
      for (const r of rows) {
        if ((!brand || r[2] === brand) && (!q || r[1].includes(q))) hits.push(r);
        if (hits.length >= 40) break;
      }
      $("model-list").innerHTML = hits.map(([m, , b]) => `<option value="${escapeHtml(m)}"${!brand && b ? ` label="${escapeHtml(b)}"` : ""}></option>`).join("");
    };
    const fillModels = async () => {
      const t = typeById($("m-type").value), brand = brandOf();
      const hint = $("model-hint"), ticket = ++request;
      if (!t) { rows = []; suggest(); return; }
      if (t.refFile && !modelIndex.has(t.id)) hint.textContent = "Chargement des modèles connus…";
      const all = await typeIndex(t);
      if (ticket !== request) return;
      rows = all;
      const n = brand ? all.filter(r => r[2] === brand).length : all.length;
      const first = all.find(r => !brand || r[2] === brand);
      $("m-model").placeholder = first ? `ex. ${first[0].slice(0, 40)}` : "ex. F4WV309S0";
      hint.textContent = n
        ? `${n.toLocaleString("fr-FR")} modèle${n > 1 ? "s" : ""} ou référence${n > 1 ? "s" : ""} connu${n > 1 ? "s" : ""}${brand ? ` pour ${brand}` : ""} : tapez le début du vôtre (étiquette ou plaque signalétique).`
        : "Elle figure sur l'étiquette ou la plaque signalétique (dessous, dos ou encadrement de porte). Utile pour commander la bonne pièce.";
      suggest();
    };
    // Modèle choisi dans la liste alors que la marque est vide : on la remplit
    const pickModel = () => {
      if ($("m-brand").value.trim()) return;
      const v = $("m-model").value, row = rows.find(r => r[0] === v && r[2]);
      if (row) { $("m-brand").value = row[2]; fillModels(); }
    };
    const fill = () => {
      const t = typeById($("m-type").value);
      $("brand-list").innerHTML = t ? t.brands.map(b => `<option value="${escapeHtml(b)}"></option>`).join("") : "";
      $("brand-hint").textContent = t ? (t.brands.length ? `${t.brands.length} marque${t.brands.length > 1 ? "s" : ""} proposée${t.brands.length > 1 ? "s" : ""}, ou tapez la vôtre.` : "Tapez la marque.") : "";
      fillModels();
    };
    $("m-domain").addEventListener("change", () => { domain = $("m-domain").value; preType = ""; render(); $("m-type").focus(); });
    $("m-type").addEventListener("change", fill);
    $("m-brand").addEventListener("input", fillModels);
    $("m-model").addEventListener("input", () => { suggest(); pickModel(); });
    fill();
  } else {
    const makes = VEHICLES[kind].makes;
    $("m-make").addEventListener("change", () => {
      const v = $("m-make").value, make = makes.find(c => c.name === v), sel = $("m-car");
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
      if (!t) return fail("Choisissez le type d'équipement.", $("m-type"));
      const typed = $("m-brand").value.trim();
      const known = t.brands.find(b => normalize(b) === normalize(typed));
      item = { kind, type: t.id, typeName: t.name, category: t.category, icon: t.icon, brand: known || typed.slice(0, 40), model: $("m-model").value.trim() };
    } else {
      const v = VEHICLES[kind];
      const mv = $("m-make").value;
      const label = kind === "voiture" ? "de la voiture" : "de la moto";
      if (!mv) return fail(`Choisissez la marque ${label}.`, $("m-make"));
      const brand = mv === OTHER ? $("m-make-other").value.trim() : mv;
      if (!brand) return fail(`Indiquez la marque ${label}.`, $("m-make-other"));
      const cv = $("m-car").value;
      const model = cv === OTHER ? $("m-car-other").value.trim() : v.makes.find(c => c.name === mv)?.models[+cv]?.name;
      if (!model) return fail(`Indiquez le modèle ${label}.`, cv === OTHER ? $("m-car-other") : $("m-car"));
      item = { kind, type: kind, typeName: v.label, category: "automobile", icon: v.icon, brand, model, engine: $("m-engine").value.trim() };
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
