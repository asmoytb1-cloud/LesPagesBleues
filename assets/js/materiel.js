/* Les Pages Bleues — « Mon matériel » : vos appareils, véhicules et objets en un seul endroit.
   Trois écrans : la liste (par défaut), le détail d'un matériel (?id=…) et l'ajout (?ajouter=1,
   ou ?type=lave-linge, ?kind=voiture, ?cat=jardin). Catalogue : assets/js/materiel-data.js. */

renderHeader("materiel");
renderFooter();

const root = document.getElementById("materiel-root");
const params = new URLSearchParams(location.search);
const THIS_YEAR = new Date().getFullYear();
const OTHER = "__autre";
const VEHICLES = {
  voiture: { label: "Voiture", icon: "car", makes: CAR_MAKES, source: "lpb", yearPh: "2012", production: true },
  moto: { label: "Moto", icon: "moto", makes: MOTO_MAKES, source: "lpb", yearPh: "2021", production: false }
};

const typeById = id => APPLIANCE_TYPES.find(t => t.id === id);
const domains = () => CATEGORIES.filter(c => APPLIANCE_TYPES.some(t => t.category === c.id));
const years = m => m.from ? (m.to && m.to !== m.from ? `${m.from}–${m.to}` : m.to ? `${m.from}` : `à partir de ${m.from}`) : "";
const newId = () => "m" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
const plural = (n, w) => `${n} ${w}${n > 1 ? "s" : ""}`;
const details = m => [!isVehicle(m) && m.model ? m.model : "", m.engine || "", m.year ? `${m.year}` : ""].filter(Boolean).join(" · ");
const thumb = m => `<span class="mat-thumb">${m.photo ? `<img src="${m.photo}" alt="">` : icon(m.icon || typeById(m.type)?.icon || "box")}</span>`;

// Index de recherche d'un type : [texte affiché, forme simplifiée, marque] pour toutes les marques
const modelIndex = new Map();
async function typeIndex(t) {
  if (!modelIndex.has(t.id)) {
    const rows = [];
    for (const [b, ms] of Object.entries(t.models || {})) for (const m of ms) rows.push([m, squash(m), b]);
    modelIndex.set(t.id, rows);
  }
  return modelIndex.get(t.id);
}
// Forme simplifiée pour la recherche : « F4WV-309 S0 » → « f4wv309s0 »
const squash = s => normalize(s).replace(/[^a-z0-9]/g, "");

/* ==================== Liste ==================== */
function worstState(m) {
  const items = careItems([m]);
  return items.length ? items.sort(byUrgency)[0].st.state : null;
}

function listView() {
  const list = loadMateriel();
  const care = careItems(list);
  const todo = care.filter(x => STATE_INFO[x.st.state].group === "todo").length;
  const soon = care.filter(x => x.st.state === "bientot").length;
  root.innerHTML = `
    <div class="mat-view">
      <header>
        <h1 class="diag-title">Mon matériel</h1>
        <p class="diag-sub" style="margin-top:4px">Vos appareils, véhicules et objets en un seul endroit.</p>
      </header>
      ${list.length ? `
        <a class="care-summary" href="entretien.html">
          <span class="tile-ico tint-green">${icon("calendar")}</span>
          <span class="lrow-text"><strong>Entretien</strong>
            ${todo || soon ? `<span class="pills">${todo ? `<span class="status status-todo">${icon("alert")}${todo} à faire</span>` : ""}${soon ? `<span class="status status-soon">${icon("clock")}${soon} bientôt</span>` : ""}</span>`
              : `<small>Rien d'urgent. Voir les prochains entretiens.</small>`}
          </span>${icon("chevron")}
        </a>
        <ul class="lgroup mat-list">${list.map(m => {
          const worst = worstState(m);
          return `
          <li><a class="lrow mat-row" id="mat-${m.id}" href="materiel.html?id=${m.id}">
            ${thumb(m)}
            <span class="lrow-text"><strong class="mat-name">${escapeHtml(materielName(m))}</strong>${details(m) ? `<small>${escapeHtml(details(m))}</small>` : ""}</span>
            ${worst && ["defaillant", "retard", "bientot"].includes(worst) ? statusPill(worst) : ""}
            ${icon("chevron")}
          </a></li>`;
        }).join("")}</ul>` : `
        <div class="empty">${icon("box")}<h2>Rien d'enregistré pour l'instant</h2>
          <p>Ajoutez votre lave-linge, votre voiture ou votre vélo : vous retrouverez ici les fiches qui les concernent, leur entretien et un diagnostic adapté.</p></div>`}
      <a class="btn btn-primary btn-lg btn-block" href="materiel.html?ajouter=1">${icon("plus")} Ajouter un matériel</a>
      <p class="mat-import"><label class="link-btn" for="carnet-file">${icon("upload")} Importer un carnet d'entretien</label>
        <input type="file" id="carnet-file" accept="application/json" hidden>
        <small class="muted">Vous achetez d'occasion ? Importez le carnet exporté par le vendeur.</small></p>
      <p class="muted mat-note">${icon("shield")}<span>Enregistré sur cet appareil uniquement.</span></p>
    </div>`;
}

/* ==================== Détail ==================== */
function carnetText(m) {
  const s = carnetSummary(m);
  const pills = [
    s.defaillant + s.retard ? `<span class="status status-todo">${icon("alert")}${s.defaillant + s.retard} à faire</span>` : "",
    s.bientot ? `<span class="status status-soon">${icon("clock")}${s.bientot} bientôt</span>` : "",
    s.ok ? `<span class="status status-ok">${icon("check")}${s.ok} à jour</span>` : "",
    s.inconnu ? `<span class="status status-unknown">${icon("pencil")}${s.inconnu} à renseigner</span>` : ""
  ].filter(Boolean);
  return pills.length ? `<span class="pills">${pills.join("")}</span>`
    : `<small>${s.entries ? plural(s.entries, "entrée") : "Suivre les entretiens et garder l'historique"}</small>`;
}

function detailView(m) {
  const guides = guidesForMateriel(m);
  const t = typeById(m.type);
  const diagDevice = m.kind === "voiture" ? "Voiture" : t?.diag;
  const forWhat = m.kind === "voiture" ? "votre voiture" : m.kind === "moto" ? "votre moto" : "cet appareil";
  document.title = `${materielName(m)} — Mon matériel — Les Pages Bleues`;
  root.innerHTML = `
    <div class="mat-view">
      <a class="back-link" href="materiel.html">${icon("back")} Mon matériel</a>
      <header class="mat-detail-head">
        ${thumb(m)}
        <div><h1>${escapeHtml(materielName(m))}</h1>${details(m) ? `<p>${escapeHtml(details(m))}</p>` : ""}</div>
      </header>
      <ul class="lgroup">
        <li><a class="lrow mat-carnet" href="carnet.html?id=${m.id}"><span class="tile-ico tint-green">${icon("calendar")}</span>
          <span class="lrow-text"><strong>Carnet d'entretien</strong>${carnetText(m)}</span>${icon("chevron")}</a></li>
        ${diagDevice ? `<li><a class="lrow" href="diagnostic.html?d=${encodeURIComponent(diagDevice)}"><span class="tile-ico">${icon("stethoscope")}</span>
          <span class="lrow-text"><strong>Diagnostiquer une panne</strong><small>Quelques questions pour trouver la cause</small></span>${icon("chevron")}</a></li>` : ""}
        <li><a class="lrow" href="communaute.html?ask=1&amp;q=${encodeURIComponent(materielLabel(m).replace(/ · /g, " "))}"><span class="tile-ico">${icon("chat")}</span>
          <span class="lrow-text"><strong>Poser une question</strong><small>À la communauté</small></span>${icon("chevron")}</a></li>
        <li><label class="lrow" for="mat-photo" style="cursor:pointer"><span class="tile-ico tint-amber">${icon("camera")}</span>
          <span class="lrow-text"><strong>${m.photo ? "Changer la photo" : "Ajouter une photo"}</strong><small>Pour le reconnaître d'un coup d'œil</small></span>
          <input type="file" id="mat-photo" accept="image/*" class="sr-only"></label></li>
      </ul>
      <section aria-labelledby="fiches-h">
        <h2 class="h2 mat-count" id="fiches-h">${guides.length ? `${plural(guides.length, "fiche")} pour ${forWhat}` : "Pas encore de fiche dédiée"}</h2>
        ${guides.length ? `<div class="rows">${guides.slice(0, 4).map(g => guideRow(g)).join("")}</div>
          ${guides.length > 4 ? `<p style="margin-top:12px"><a class="btn btn-ghost btn-block" href="guides.html?materiel=${m.id}">${icon("list")} Voir les ${guides.length} fiches</a></p>` : ""}`
          : `<p class="muted">Vous savez réparer ce type de matériel ? <a class="accent" href="ajouter.html">Partagez votre méthode</a>.</p>`}
      </section>
      <p><button class="btn btn-danger btn-sm" type="button" data-del="${m.id}">${icon("trash")} Retirer ce matériel</button></p>
    </div>`;
}

/* ==================== Ajout ==================== */
// Point de départ : ?type=lave-linge, ?kind=voiture, ?cat=jardin
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
        <input class="input" id="m-make-other" maxlength="40" placeholder="Nom de la marque" aria-label="Autre marque" hidden></div>
      <div class="field"><label for="m-car">Modèle</label>
        <select class="input" id="m-car" disabled><option value="">Choisissez d'abord la marque</option></select>
        <input class="input" id="m-car-other" maxlength="40" placeholder="Nom du modèle" aria-label="Autre modèle" hidden></div>
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

// Wikidata n'est cité que s'il a réellement complété le catalogue
function sourcesNote() {
  const wd = APPLIANCE_TYPES.some(t => t.sources.includes("wikidata"));
  return wd ? ` Certains modèles viennent de <a href="${MATERIEL_SOURCES.wikidata.url}" target="_blank" rel="noopener">Wikidata</a> (domaine public).` : "";
}

function addView() {
  const kinds = [["appareil", "plug", "Un appareil"], ["voiture", "car", "Une voiture"], ["moto", "moto", "Une moto"]];
  document.title = "Ajouter un matériel — Les Pages Bleues";
  root.innerHTML = `
    <div class="mat-view">
      <a class="back-link" href="materiel.html">${icon("back")} Mon matériel</a>
      <header>
        <h1 class="diag-title">Ajouter un matériel</h1>
        <p class="diag-sub" style="margin-top:4px">On vous montrera ensuite les fiches et l'entretien qui le concernent.</p>
      </header>
      <form class="form-card mat-form" id="mat-form" novalidate>
        <div class="field"><span class="label" id="kind-label">C'est…</span>
          <div class="kind-choice" role="radiogroup" aria-labelledby="kind-label">${kinds.map(([k, ic, label]) =>
            `<button type="button" role="radio" data-kind="${k}" aria-checked="${kind === k}">${icon(ic)}${label}</button>`).join("")}</div></div>
        ${kind === "appareil" ? applianceFields() : vehicleFields()}
        <div class="field"><span class="label">Photo <small>(facultatif)</small></span>
          <div class="mat-photo-field">
            <span class="mat-thumb" id="m-photo-preview">${icon("camera")}</span>
            <label class="btn btn-ghost btn-sm" for="m-photo">${icon("image")} Choisir une photo</label>
            <input type="file" id="m-photo" accept="image/*" class="sr-only">
          </div>
          <p class="field-hint">Pour le reconnaître d'un coup d'œil. Elle reste sur cet appareil.</p></div>
        <p class="field-err" id="mat-err" hidden></p>
        <button class="btn btn-primary btn-lg btn-block" type="submit">${icon("check")} Enregistrer</button>
      </form>
      <p class="muted mat-note">${icon("shield")}<span>Enregistré dans ce navigateur uniquement. Les marques et modèles proposés sont une liste de départ rédigée par Les Pages Bleues.${sourcesNote()} Votre modèle n'y est pas ? Tapez-le simplement.</span></p>
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
  $("m-photo").addEventListener("change", () => {
    const f = $("m-photo").files[0];
    $("m-photo-preview").innerHTML = f ? `<img src="${URL.createObjectURL(f)}" alt="Photo choisie">` : icon("camera");
  });

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
    $("m-domain").addEventListener("change", () => { domain = $("m-domain").value; preType = ""; addView(); $("m-type").focus(); });
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

  $("mat-form").addEventListener("submit", async e => {
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
    const file = $("m-photo").files[0];
    if (file) { try { item.photo = await compressImage(file, 600, .72); } catch { toast("Cette photo n'a pas pu être lue : le matériel est enregistré sans photo."); } }
    if (!saveMateriel([item, ...loadMateriel()])) return fail("Enregistrement impossible : le stockage du navigateur est plein ou bloqué.", $("mat-form").querySelector("[type=submit]"));
    location.href = `materiel.html?id=${item.id}&nouveau=1`;
  });
}

/* ==================== Actions ==================== */
root.addEventListener("change", async e => {
  if (e.target.id === "carnet-file" && e.target.files[0]) {
    try {
      const data = JSON.parse(await e.target.files[0].text());
      if (data.format !== "carnet-entretien" || !data.materiel || !data.carnet) throw new Error();
      const item = { ...data.materiel, id: newId(), added: new Date().toISOString() };
      saveMateriel([item, ...loadMateriel()]);
      saveCarnet(item.id, data.carnet);
      location.href = `carnet.html?id=${item.id}`;
    } catch { toast("Ce fichier n'est pas un carnet d'entretien des Pages Bleues."); }
  } else if (e.target.id === "mat-photo" && e.target.files[0]) {
    const m = materielById(params.get("id"));
    try {
      const photo = await compressImage(e.target.files[0], 600, .72);
      if (!saveMateriel(loadMateriel().map(x => x.id === m.id ? { ...x, photo } : x))) throw new Error();
      detailView(materielById(m.id));
      toast("Photo enregistrée.");
    } catch { toast("Photo impossible à enregistrer : stockage plein, ou image illisible."); }
  }
});

root.addEventListener("click", e => {
  const seg = e.target.closest("[data-kind]");
  if (seg && seg.dataset.kind !== kind) {
    kind = seg.dataset.kind;
    addView();
    document.querySelector(`[data-kind="${kind}"]`).focus();
    return;
  }
  const del = e.target.closest("[data-del]");
  if (del) {
    const m = materielById(del.dataset.del);
    if (!m) return;
    openModal("Retirer ce matériel ?", `
      <p>${escapeHtml(materielLabel(m))} sera retiré de votre liste, avec son carnet d'entretien. Vos fiches, favoris et réparations ne sont pas touchés.</p>
      ${carnetSummary(m).entries ? `<p class="muted" style="margin-top:8px">Pensez à exporter le carnet avant (page du carnet) si vous voulez le garder ou le transmettre.</p>` : ""}
      <div class="form-actions" style="margin-top:16px"><button class="btn btn-ghost" type="button" data-close>Annuler</button>
        <button class="btn btn-danger" type="button" id="confirm-del">${icon("trash")} Retirer</button></div>`, (wrap, close) => {
      wrap.querySelector("#confirm-del").addEventListener("click", () => {
        saveMateriel(loadMateriel().filter(x => x.id !== m.id));
        store.remove("lpb-carnet-" + m.id);
        close();
        location.href = "materiel.html?retire=1";
      });
    });
  }
});

/* ==================== Écran affiché ==================== */
const current = params.get("id") && materielById(params.get("id"));
if (current) {
  detailView(current);
  if (params.get("nouveau")) {
    const n = guidesForMateriel(current).length;
    toast(`${materielName(current)} enregistré${n ? ` : ${plural(n, "fiche")} pour ${current.kind === "voiture" ? "votre voiture" : current.kind === "moto" ? "votre moto" : "cet appareil"}` : ""}.`);
    history.replaceState(null, "", `materiel.html?id=${current.id}`);
  }
} else if (params.get("ajouter") || params.get("type") || params.get("kind") || params.get("cat")) {
  addView();
} else {
  listView();
  if (params.get("retire")) { toast("Matériel retiré."); history.replaceState(null, "", "materiel.html"); }
  else if (params.get("id")) toast("Ce matériel n'existe pas sur cet appareil.");
}
