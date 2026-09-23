/* Les Pages Bleues — carnet d'entretien d'un matériel (carnet.html?id=…).
   Sur le modèle de MotoBook : entretiens et contrôles à venir, intervalles réglables, prévision selon le
   kilométrage moyen, fil d'historique avec factures, vue d'ensemble de l'état, statistiques, export. */

renderHeader("materiel");
renderFooter();

const root = document.getElementById("carnet-root");
const params = new URLSearchParams(location.search);
const item = materielById(params.get("id") || "");
let c = item ? loadCarnet(item.id) : null;
const ORDER = { defaillant: 0, retard: 1, bientot: 2, inconnu: 3, ok: 4, libre: 5 };
const STATE_LABEL = { defaillant: "Défaillant", retard: "En retard", bientot: "Bientôt", inconnu: "À renseigner", ok: "À jour", libre: "Selon la notice" };
const today = () => new Date().toISOString().slice(0, 10);
const newId = () => "e" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
const fmtKm = n => `${Math.round(n).toLocaleString("fr-FR")} km`;
const euros = n => `${Number(n).toLocaleString("fr-FR", { minimumFractionDigits: 0, maximumFractionDigits: 2 })} €`;

function save() {
  if (!saveCarnet(item.id, c)) toast("Enregistrement impossible : le stockage du navigateur est plein. Retirez des photos de factures.");
  render();
}

// Photos de factures : réduites à 1000 px en JPEG avant d'être stockées dans ce navigateur
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
    return cv.toDataURL("image/jpeg", 0.7);
  } finally { URL.revokeObjectURL(url); }
}

function download(name, text, type) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([text], { type }));
  a.download = name;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
}

/* ---------- Affichage ---------- */
function statusText(t, st) {
  const bits = [];
  if (st.state === "defaillant") bits.push(`Dernier contrôle défaillant${st.last?.note ? ` : ${st.last.note}` : ""}`);
  if (st.due) bits.push(`${st.days < 0 ? "Échéance dépassée" : "Prochaine fois"} ${relDays(st.days)}${st.dueKm ? ` (à ${fmtKm(st.dueKm)})` : ""}`);
  else if (st.dueKm) bits.push(`Prochaine fois à ${fmtKm(st.dueKm)}${kmPerDay(c) ? "" : " · relevez le compteur pour une date estimée"}`);
  else if (st.state === "inconnu") bits.push("Jamais enregistré : notez la dernière fois pour lancer le suivi");
  if (st.last) bits.push(`dernière fois le ${formatDate(st.last.date)}${Number.isFinite(st.last.km) ? ` à ${fmtKm(st.last.km)}` : ""}`);
  return bits.join(" · ");
}

function taskRow(t) {
  const st = taskStatus(item, c, t);
  const g = t.guide && guideById(t.guide);
  return `
    <li class="task task-${st.state}">
      <span class="task-dot" aria-hidden="true"></span>
      <div class="task-body">
        <strong>${escapeHtml(t.label)}</strong> <span class="task-state">${STATE_LABEL[st.state]}</span>
        <small>${escapeHtml(statusText(t, st))}</small>
        <small class="muted">${escapeHtml(intervalText(t))}${t.note ? ` — ${escapeHtml(t.note)}` : ""}</small>
      </div>
      <div class="task-actions no-print">
        <button class="btn btn-primary btn-sm" type="button" data-log-task="${t.id}">${icon("check")} ${t.kind === "controle" ? "Contrôlé" : "Fait"}</button>
        ${g ? `<a class="btn btn-ghost btn-sm" href="${guideUrl(g)}">${icon("doc")} Fiche</a>` : ""}
        <button class="icon-btn" type="button" data-edit-task="${t.id}" aria-label="Régler « ${escapeHtml(t.label)} »">${icon("gauge")}</button>
      </div>
    </li>`;
}

function taskColumn(kind, tasks) {
  const list = tasks.filter(t => t.kind === kind)
    .sort((a, b) => ORDER[taskStatus(item, c, a).state] - ORDER[taskStatus(item, c, b).state]);
  return `
    <section class="card task-col">
      <h3>${icon(kind === "entretien" ? "wrench" : "check")} ${kind === "entretien" ? "Entretiens" : "Contrôles"} <span class="chip-n">${list.length}</span></h3>
      ${list.length ? `<ul class="task-list">${list.map(taskRow).join("")}</ul>` : `<p class="muted">Aucun ${kind === "entretien" ? "entretien" : "contrôle"} suivi.</p>`}
    </section>`;
}

function logRow(e) {
  const k = LOG_KINDS[e.kind] || LOG_KINDS.note;
  const g = e.guide && guideById(e.guide);
  return `
    <li class="log-entry">
      <span class="log-ico">${icon(k.icon)}</span>
      <div class="log-body">
        <div class="log-top"><strong>${escapeHtml(e.label || k.label)}</strong>
          ${e.state ? `<span class="tag ${e.state === "ok" ? "tag-green" : e.state === "defaillant" ? "tag-red" : "tag-orange"}">${CONTROL_STATES[e.state]}</span>` : ""}</div>
        <small class="muted">${escapeHtml(formatDate(e.date))} · ${k.label}${Number.isFinite(e.km) ? ` · ${fmtKm(e.km)}` : ""}${e.cost ? ` · ${euros(e.cost)}` : ""}</small>
        ${e.note ? `<p>${escapeHtml(e.note)}</p>` : ""}
        ${g ? `<p><a class="accent" href="${guideUrl(g)}">${icon("doc")} ${escapeHtml(g.title)}</a></p>` : ""}
        ${e.photo ? `<button class="log-photo" type="button" data-photo="${e.id}" aria-label="Voir la facture ou la photo"><img src="${e.photo}" alt=""></button>` : ""}
      </div>
      <button class="icon-btn no-print" type="button" data-del-log="${e.id}" aria-label="Supprimer cette entrée">${icon("trash")}</button>
    </li>`;
}

function stats() {
  const now = new Date(), yearAgo = addMonths(now, -12).toISOString().slice(0, 10);
  const costs = c.log.filter(e => e.cost > 0);
  const total = costs.reduce((n, e) => n + e.cost, 0);
  const last12 = costs.filter(e => e.date >= yearAgo).reduce((n, e) => n + e.cost, 0);
  const works = c.log.filter(e => e.kind === "entretien" || e.kind === "reparation").length;
  const rate = kmPerDay(c);
  const first = [...c.log].sort(byDate)[0];
  return `
    <div class="cstats">
      <div><strong>${euros(total)}</strong><small>dépensés au total</small></div>
      <div><strong>${euros(last12)}</strong><small>sur les 12 derniers mois</small></div>
      <div><strong>${works}</strong><small>entretien${works > 1 ? "s" : ""} et réparation${works > 1 ? "s" : ""}</small></div>
      ${usesKm(item) ? `<div><strong>${rate ? fmtKm(rate * 30.4) : "—"}</strong><small>par mois en moyenne</small></div>`
        : `<div><strong>${first ? formatDate(first.date) : "—"}</strong><small>début du suivi</small></div>`}
    </div>`;
}

function settingsHtml() {
  const opts = VEHICLE_OPTIONS[item.kind];
  if (!opts) return "";
  const labels = { energie: "Énergie", transmission: "Transmission" };
  return `
    <div class="carnet-settings no-print">${Object.entries(opts).map(([k, list]) => `
      <label class="field"><span class="label">${labels[k]}</span>
        <select class="input input-sm" data-setting="${k}"><option value="">Non précisé</option>${list.map(([v, l]) =>
          `<option value="${v}" ${c.settings[k] === v ? "selected" : ""}>${l}</option>`).join("")}</select></label>`).join("")}
      <p class="field-hint">Le plan s'adapte : pas de vidange sur un moteur électrique, pas de graissage de chaîne sur une transmission à courroie ou à cardan.</p>
    </div>`;
}

function render() {
  if (!item) {
    root.innerHTML = `<div class="empty">${icon("box")}<h2>Matériel introuvable</h2>
      <p>Ce carnet n'existe pas dans ce navigateur. Les carnets sont enregistrés sur l'appareil où ils ont été créés ; importez-le si vous l'avez exporté.</p>
      <div class="empty-actions"><a class="btn btn-primary" href="materiel.html">Mon matériel</a></div></div>`;
    return;
  }
  document.title = `Carnet d'entretien : ${materielName(item)} — Les Pages Bleues`;
  const plan = carnetPlan(item, c);
  const active = plan.filter(t => !t.off), off = plan.filter(t => t.off);
  const counts = { defaillant: 0, retard: 0, bientot: 0, ok: 0, inconnu: 0, libre: 0 };
  for (const t of active) counts[taskStatus(item, c, t).state]++;
  const followed = counts.ok + counts.bientot + counts.retard + counts.defaillant;
  const pct = followed ? Math.round(counts.ok / followed * 100) : null;
  const cur = currentKm(c), rate = kmPerDay(c);
  const log = [...c.log].sort(byDate).reverse();
  const details = [item.model && !isVehicle(item) ? item.model : "", item.engine, item.year].filter(Boolean).join(" · ");

  root.innerHTML = `
    <section class="page-hero carnet-hero">
      <div class="container">
        <nav class="breadcrumb no-print" aria-label="Fil d'Ariane">
          <a href="index.html">${icon("home")} Accueil</a>${icon("chevron")}
          <a href="materiel.html">Mon matériel</a>${icon("chevron")}
          <span aria-current="page">Carnet d'entretien</span>
        </nav>
        <div class="carnet-head">
          <span class="mat-ico">${icon(item.icon || "box")}</span>
          <div>
            <p class="eyebrow">Carnet d'entretien</p>
            <h1>${escapeHtml(materielName(item))}</h1>
            ${details ? `<p class="muted">${escapeHtml(details)}</p>` : ""}
          </div>
        </div>
        <div class="carnet-overview">
          <div class="gauge" role="img" aria-label="${pct == null ? "État général non renseigné" : `${pct} % des points suivis sont à jour`}">
            <svg viewBox="0 0 36 36" aria-hidden="true"><circle cx="18" cy="18" r="15.9" class="gauge-bg"/>
              ${pct ? `<circle cx="18" cy="18" r="15.9" class="gauge-val" stroke-dasharray="${pct} 100"/>` : ""}</svg>
            <span>${pct == null ? "—" : pct + " %"}</span>
          </div>
          <ul class="overview-counts">
            ${counts.defaillant ? `<li class="st-defaillant"><strong>${counts.defaillant}</strong> défaillant${counts.defaillant > 1 ? "s" : ""}</li>` : ""}
            <li class="st-retard"><strong>${counts.retard}</strong> en retard</li>
            <li class="st-bientot"><strong>${counts.bientot}</strong> bientôt</li>
            <li class="st-ok"><strong>${counts.ok}</strong> à jour</li>
            <li class="st-inconnu"><strong>${counts.inconnu}</strong> à renseigner</li>
          </ul>
          ${usesKm(item) ? `<div class="odometer">
            <small>Compteur</small><strong>${cur != null ? fmtKm(cur) : "—"}</strong>
            <small>${rate ? `≈ ${fmtKm(rate * 30.4)} par mois` : "Deux relevés espacés d'une semaine donnent la moyenne"}</small>
            <button class="btn btn-ghost btn-sm no-print" type="button" data-odometer>${icon("gauge")} Relever</button>
          </div>` : ""}
        </div>
        ${settingsHtml()}
      </div>
    </section>

    <section class="section section-tight">
      <div class="container">
        <div class="section-head"><h2>À <span class="accent">venir</span></h2>
          <div class="carnet-tools no-print">
            <button class="btn btn-primary btn-sm" type="button" data-log-free>${icon("plus")} Noter une intervention</button>
            <button class="btn btn-ghost btn-sm" type="button" data-add-task>${icon("plus")} Suivre autre chose</button>
          </div></div>
        ${active.length ? "" : `<p class="muted" style="margin-bottom:12px">Pas encore de plan d'entretien pour ce type de matériel : ajoutez ce que vous voulez suivre (« Suivre autre chose »).</p>`}
        <div class="task-cols">${taskColumn("entretien", active)}${taskColumn("controle", active)}</div>
        ${off.length ? `<p class="muted no-print" style="margin-top:12px">Non suivis : ${off.map(t => `<button class="linkish" type="button" data-edit-task="${t.id}">${escapeHtml(t.label)}</button>`).join(", ")}</p>` : ""}
      </div>
    </section>

    <section class="section section-tight">
      <div class="container carnet-lower">
        <section>
          <h2 class="h-sub">Historique <span class="chip-n">${log.length}</span></h2>
          ${log.length ? `<ol class="log-list">${log.map(logRow).join("")}</ol>` : `<div class="empty">${icon("doc")}<h3>Rien pour l'instant</h3>
            <p>Chaque entretien, contrôle, réparation ou relevé noté ici construit l'historique de votre matériel : utile pour anticiper, et pour la revente.</p></div>`}
        </section>
        <aside>
          <div class="card">
            <h2>${icon("coins")} Statistiques</h2>
            ${stats()}
          </div>
          <div class="card no-print">
            <h2>${icon("share")} Garder et transmettre</h2>
            <p class="muted">Le carnet reste dans ce navigateur. Exportez-le pour le sauvegarder, le passer sur un autre appareil ou le remettre à l'acheteur lors d'une revente.</p>
            <div class="carnet-export">
              <button class="btn btn-ghost btn-sm" type="button" data-print>${icon("print")} Imprimer / PDF</button>
              <button class="btn btn-ghost btn-sm" type="button" data-export>${icon("download")} Exporter le carnet</button>
              <label class="btn btn-ghost btn-sm" for="carnet-import">${icon("upload")} Importer</label>
              <input type="file" id="carnet-import" accept="application/json" hidden>
              <button class="btn btn-ghost btn-sm" type="button" data-ics>${icon("clock")} Rappels (agenda)</button>
            </div>
          </div>
        </aside>
      </div>
    </section>`;
}

/* ---------- Fenêtres ---------- */
function entryForm(opts) {
  const { title, kind, task, label = "", guide = "" } = opts;
  const cur = currentKm(c);
  openModal(title, `
    <form class="form" id="entry-form">
      ${task ? "" : `<div class="form-row form-row-2">
        <div class="field"><label for="e-kind">Type</label>
          <select class="input" id="e-kind">${["reparation", "entretien", "controle", "note"].map(k => `<option value="${k}" ${k === kind ? "selected" : ""}>${LOG_KINDS[k].label}</option>`).join("")}</select></div>
        <div class="field"><label for="e-label">Intitulé</label><input class="input" id="e-label" maxlength="100" required value="${escapeHtml(label)}" placeholder="ex. Remplacement de la courroie"></div>
      </div>`}
      <div class="form-row form-row-2">
        <div class="field"><label for="e-date">Date</label><input class="input" id="e-date" type="date" required max="${today()}" value="${today()}"></div>
        ${usesKm(item) ? `<div class="field"><label for="e-km">Compteur <small>(km)</small></label><input class="input" id="e-km" type="number" inputmode="numeric" min="0" step="1" value="${cur ?? ""}"></div>` : ""}
      </div>
      ${kind === "controle" || !task ? `<fieldset class="field state-field" ${kind === "controle" ? "" : "hidden"}><legend class="label">Résultat du contrôle</legend>
        <div class="seg">${Object.entries(CONTROL_STATES).map(([v, l], i) => `<label><input type="radio" name="e-state" value="${v}" ${i === 0 ? "checked" : ""}> ${l}</label>`).join("")}</div></fieldset>` : ""}
      <div class="form-row form-row-2">
        <div class="field"><label for="e-cost">Coût <small>(€, facultatif)</small></label><input class="input" id="e-cost" type="number" inputmode="decimal" min="0" step="0.01"></div>
        <div class="field"><label for="e-photo">Facture ou photo <small>(facultatif)</small></label><input class="input" id="e-photo" type="file" accept="image/*"></div>
      </div>
      <div class="field"><label for="e-note">Note <small>(pièce, référence, garage…)</small></label><textarea class="input" id="e-note" rows="2" maxlength="500"></textarea></div>
      <p class="field-err" id="e-err" hidden></p>
      <div class="form-actions"><button class="btn btn-ghost" type="button" data-close>Annuler</button><button class="btn btn-primary" type="submit">${icon("check")} Enregistrer</button></div>
    </form>`, (wrap, close) => {
    const $ = s => wrap.querySelector(s);
    $("#e-kind")?.addEventListener("change", e => { $(".state-field").hidden = e.target.value !== "controle"; });
    $("#entry-form").addEventListener("submit", async e => {
      e.preventDefault();
      const err = $("#e-err");
      const k = task ? kind : $("#e-kind").value;
      const lbl = task ? label : $("#e-label").value.trim();
      if (!lbl) { err.textContent = "Donnez un intitulé."; err.hidden = false; return; }
      const kmRaw = $("#e-km")?.value.trim();
      const km = kmRaw ? Math.round(+kmRaw) : null;
      if (km != null && !(km >= 0)) { err.textContent = "Kilométrage invalide."; err.hidden = false; return; }
      if (km != null && cur != null && km < cur && $("#e-date").value >= (readings(c).pop()?.date || "")) {
        err.textContent = `Le compteur ne peut pas être inférieur au dernier relevé (${fmtKm(cur)}).`; err.hidden = false; return;
      }
      const file = $("#e-photo").files[0];
      const entry = { id: newId(), date: $("#e-date").value || today(), kind: k, label: lbl, ...(task && { task }), ...(guide && { guide }),
        ...(km != null && { km }), ...(+$("#e-cost").value > 0 && { cost: +$("#e-cost").value }),
        ...(k === "controle" && { state: wrap.querySelector("[name=e-state]:checked")?.value || "ok" }),
        ...($("#e-note").value.trim() && { note: $("#e-note").value.trim() }) };
      if (file) { try { entry.photo = await compress(file); } catch { toast("Cette image n'a pas pu être lue."); } }
      c.log.push(entry);
      close();
      save();
      toast(entry.state === "defaillant" ? "Noté comme défaillant : voyez la fiche liée pour y remédier." : "Ajouté au carnet.");
    });
  });
}

function odometerForm() {
  openModal("Relever le compteur", `
    <form class="form" id="odo-form">
      <div class="form-row form-row-2">
        <div class="field"><label for="o-date">Date</label><input class="input" id="o-date" type="date" required max="${today()}" value="${today()}"></div>
        <div class="field"><label for="o-km">Kilométrage</label><input class="input" id="o-km" type="number" inputmode="numeric" min="0" required value="${currentKm(c) ?? ""}"></div>
      </div>
      <p class="field-hint">Chaque relevé affine la moyenne de roulage, qui sert à prévoir la date des entretiens au kilomètre.</p>
      <div class="form-actions"><button class="btn btn-ghost" type="button" data-close>Annuler</button><button class="btn btn-primary" type="submit">Enregistrer</button></div>
    </form>`, (wrap, close) => {
    wrap.querySelector("#odo-form").addEventListener("submit", e => {
      e.preventDefault();
      const km = Math.round(+wrap.querySelector("#o-km").value);
      if (!(km >= 0)) return;
      c.log.push({ id: newId(), date: wrap.querySelector("#o-date").value || today(), kind: "compteur", label: "Relevé du compteur", km });
      close();
      save();
    });
  });
}

function taskForm(t) {
  const isNew = !t;
  const km = usesKm(item);
  openModal(isNew ? "Suivre autre chose" : `Régler « ${t.label} »`, `
    <form class="form" id="task-form">
      ${isNew ? `<div class="form-row form-row-2">
        <div class="field"><label for="t-label">Intitulé</label><input class="input" id="t-label" required maxlength="80" placeholder="ex. Détartrage, courroie, révision…"></div>
        <div class="field"><label for="t-kind">Type</label><select class="input" id="t-kind"><option value="entretien">Entretien</option><option value="controle">Contrôle</option></select></div>
      </div>` : ""}
      <div class="form-row form-row-2">
        <div class="field"><label for="t-months">Tous les … mois</label><input class="input" id="t-months" type="number" min="0" max="240" value="${t?.months || ""}"></div>
        ${km ? `<div class="field"><label for="t-km">ou tous les … km</label><input class="input" id="t-km" type="number" min="0" step="100" value="${t?.km || ""}"></div>` : ""}
      </div>
      ${t?.days ? `<p class="field-hint">Intervalle actuel : ${escapeHtml(intervalText(t).toLowerCase())}. Indiquez des mois pour le remplacer.</p>` : ""}
      <p class="field-hint">Le premier des deux atteint déclenche le rappel. Laissez vide pour un suivi sans échéance.</p>
      ${isNew ? "" : `<label class="check"><input type="checkbox" id="t-off" ${t.off ? "checked" : ""}> Ne plus suivre</label>`}
      <div class="form-actions">
        ${!isNew && t.custom ? `<button class="btn btn-danger" type="button" id="t-delete">${icon("trash")} Supprimer</button>`
          : !isNew && c.tasks[t.id] ? `<button class="btn btn-ghost" type="button" id="t-reset">Revenir à l'intervalle conseillé</button>` : `<button class="btn btn-ghost" type="button" data-close>Annuler</button>`}
        <button class="btn btn-primary" type="submit">Enregistrer</button></div>
    </form>`, (wrap, close) => {
    const $ = s => wrap.querySelector(s);
    const num = s => { const v = +($(s)?.value || 0); return v > 0 ? Math.round(v) : undefined; };
    $("#task-form").addEventListener("submit", e => {
      e.preventDefault();
      const interval = { months: num("#t-months"), km: num("#t-km") };
      if (isNew) {
        const label = $("#t-label").value.trim();
        if (!label) return;
        c.custom.push({ id: "c" + Date.now().toString(36), custom: true, label, kind: $("#t-kind").value, ...interval });
      } else if (t.custom) {
        Object.assign(c.custom.find(x => x.id === t.id), interval, { off: $("#t-off").checked, days: interval.months ? undefined : t.days });
      } else {
        c.tasks[t.id] = { ...interval, days: interval.months ? undefined : t.days, off: $("#t-off").checked };
      }
      close();
      save();
    });
    $("#t-reset")?.addEventListener("click", () => { delete c.tasks[t.id]; close(); save(); });
    $("#t-delete")?.addEventListener("click", () => { c.custom = c.custom.filter(x => x.id !== t.id); close(); save(); });
  });
}

/* ---------- Export ---------- */
function ics() {
  const stamp = new Date().toISOString().replace(/[-:]/g, "").slice(0, 15) + "Z";
  const events = carnetPlan(item, c).filter(t => !t.off).map(t => ({ t, st: taskStatus(item, c, t) })).filter(x => x.st.due);
  if (!events.length) { toast("Aucune échéance datée : notez d'abord la dernière fois de chaque entretien."); return; }
  const day = d => new Date(Math.max(d, Date.now())).toISOString().slice(0, 10).replace(/-/g, "");
  const esc = s => String(s).replace(/[\\;,]/g, m => "\\" + m).replace(/\n/g, "\\n");
  const lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Les Pages Bleues//Carnet d'entretien//FR", "CALSCALE:GREGORIAN",
    ...events.flatMap(({ t, st }) => ["BEGIN:VEVENT", `UID:${item.id}-${t.id}@lespagesbleues`, `DTSTAMP:${stamp}`,
      `DTSTART;VALUE=DATE:${day(st.due)}`, `SUMMARY:${esc(`${t.label} — ${materielName(item)}`)}`,
      `DESCRIPTION:${esc(`${intervalText(t)}. Carnet d'entretien Les Pages Bleues.`)}`, "END:VEVENT"]), "END:VCALENDAR"];
  download(`entretien-${slugify(materielName(item))}.ics`, lines.join("\r\n"), "text/calendar");
}
const slugify = s => normalize(s).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

root.addEventListener("click", e => {
  const b = e.target.closest("button");
  if (!b) return;
  const plan = carnetPlan(item, c);
  if (b.dataset.logTask) {
    const t = plan.find(x => x.id === b.dataset.logTask);
    entryForm({ title: t.label, kind: t.kind, task: t.id, label: t.label, guide: t.guide });
  } else if (b.dataset.editTask) taskForm(plan.find(x => x.id === b.dataset.editTask));
  else if (b.hasAttribute("data-add-task")) taskForm(null);
  else if (b.hasAttribute("data-log-free")) entryForm({ title: "Noter une intervention", kind: "reparation" });
  else if (b.hasAttribute("data-odometer")) odometerForm();
  else if (b.dataset.delLog) {
    const entry = c.log.find(x => x.id === b.dataset.delLog);
    openModal("Supprimer cette entrée ?", `<p>${escapeHtml(entry.label || "")} du ${escapeHtml(formatDate(entry.date))} sera retiré de l'historique.</p>
      <div class="form-actions"><button class="btn btn-ghost" type="button" data-close>Annuler</button><button class="btn btn-danger" type="button" id="del-ok">${icon("trash")} Supprimer</button></div>`,
      (wrap, close) => wrap.querySelector("#del-ok").addEventListener("click", () => { c.log = c.log.filter(x => x.id !== entry.id); close(); save(); }));
  } else if (b.dataset.photo) {
    const entry = c.log.find(x => x.id === b.dataset.photo);
    openModal(entry.label || "Facture", `<img class="photo-full" src="${entry.photo}" alt="Facture ou photo : ${escapeHtml(entry.label || "")}">`);
  } else if (b.hasAttribute("data-print")) window.print();
  else if (b.hasAttribute("data-export")) {
    download(`carnet-${slugify(materielName(item))}.json`, JSON.stringify({ app: "Les Pages Bleues", format: "carnet-entretien", version: 1,
      exported: new Date().toISOString(), materiel: item, carnet: c }, null, 1), "application/json");
  } else if (b.hasAttribute("data-ics")) ics();
});

root.addEventListener("change", async e => {
  if (e.target.dataset.setting) {
    c.settings[e.target.dataset.setting] = e.target.value || undefined;
    save();
  } else if (e.target.id === "carnet-import" && e.target.files[0]) {
    try {
      const data = JSON.parse(await e.target.files[0].text());
      if (data.format !== "carnet-entretien" || !data.carnet) throw new Error();
      c = { ...loadCarnet("__vide__"), ...data.carnet };
      save();
      toast("Carnet importé.");
    } catch { toast("Ce fichier n'est pas un carnet d'entretien des Pages Bleues."); }
  }
});

render();

// Depuis une fiche terminée : carnet.html?id=…&fiche=<id> ouvre directement la saisie de l'intervention
const fromGuide = item && params.get("fiche") && guideById(params.get("fiche"));
if (fromGuide) {
  const task = carnetPlan(item, c).find(t => t.guide === fromGuide.id && !t.off);
  entryForm(task ? { title: task.label, kind: task.kind, task: task.id, label: task.label, guide: task.guide }
    : { title: "Noter la réparation", kind: "reparation", label: fromGuide.title, guide: fromGuide.id });
  history.replaceState(null, "", `carnet.html?id=${item.id}`);
}
