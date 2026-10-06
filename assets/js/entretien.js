/* Les Pages Bleues — Entretien : tous les entretiens de votre matériel, du plus urgent au plus lointain.
   À faire (en retard ou contrôle défaillant) · Bientôt · À venir · À renseigner (jamais noté).
   Chaque ligne indique l'objet, l'entretien et l'échéance ; elle ouvre le carnet du matériel. */

renderHeader("entretien");
renderFooter();

const root = document.getElementById("entretien-root");
const materiel = loadMateriel();
const items = careItems(materiel).filter(x => x.st.state !== "libre");

function row({ m, t, st }) {
  // À faire, bientôt, à renseigner : la saisie s'ouvre directement ; à venir : le carnet
  const href = st.state === "ok" ? `carnet.html?id=${m.id}` : `carnet.html?id=${m.id}&amp;task=${encodeURIComponent(t.id)}`;
  const info = STATE_INFO[st.state];
  return `
    <li><a class="lrow due-row" href="${href}">
      <span class="tile-ico tint-amber">${icon(m.icon || "box")}</span>
      <span class="lrow-text"><strong>${escapeHtml(t.label)}</strong><small>${escapeHtml(materielName(m))}${info.detail ? ` · ${info.detail}` : ""}</small></span>
      <span class="lrow-side">${statusPill(st.state)}${dueText(st) ? `<small class="due-when">${escapeHtml(dueText(st))}</small>` : ""}</span>
    </a></li>`;
}

function section(id, title, list) {
  return list.length ? `
    <section class="due-section" aria-labelledby="h-${id}">
      <h2 id="h-${id}">${title} <span class="chip-n">${list.length}</span></h2>
      <ul class="lgroup">${list.map(row).join("")}</ul>
    </section>` : "";
}

if (!materiel.length) {
  root.innerHTML = `
    <div class="empty">${icon("calendar")}<h2>Ajoutez votre matériel</h2>
      <p>Chaque appareil ou véhicule enregistré reçoit un plan d'entretien tiré de nos fiches vérifiées : vidange, filtres, détartrage, contrôles… On vous dit quand c'est le moment.</p>
      <div class="empty-actions"><a class="btn btn-primary" href="materiel.html?ajouter=1">${icon("plus")} Ajouter un matériel</a></div></div>`;
} else if (!items.length) {
  root.innerHTML = `
    <div class="empty">${icon("calendar")}<h2>Pas encore d'entretien suivi</h2>
      <p>Votre matériel n'a pas de plan d'entretien tout prêt. Vous pouvez ajouter ce que vous voulez suivre dans son carnet.</p>
      <div class="empty-actions"><a class="btn btn-primary" href="materiel.html">Mon matériel</a></div></div>`;
} else {
  const sorted = [...items].sort(byUrgency);
  const todo = sorted.filter(x => STATE_INFO[x.st.state].group === "todo");
  const soon = sorted.filter(x => x.st.state === "bientot");
  const ok = sorted.filter(x => x.st.state === "ok");
  const unknown = sorted.filter(x => x.st.state === "inconnu");
  root.innerHTML = `
    <div class="mat-view">
      <div class="legend" aria-label="Légende">${statusPill("retard")}${statusPill("bientot")}${statusPill("ok")}</div>
      ${todo.length || soon.length ? "" : `<div class="notice notice-ok">${icon("check")}<p><strong>Rien d'urgent.</strong> Vos prochains entretiens sont listés ci-dessous.</p></div>`}
      ${section("todo", `${icon("alert")} À faire`, todo)}
      ${section("soon", `${icon("clock")} Bientôt`, soon)}
      ${section("ok", `${icon("check")} À venir`, ok)}
      ${unknown.length ? `
        <details class="more-due"${ok.length + todo.length + soon.length ? "" : " open"}>
          <summary>${icon("pencil")} ${unknown.length} à renseigner${icon("chevron")}</summary>
          <ul class="lgroup">${unknown.map(row).join("")}</ul>
        </details>
        <p class="field-hint">« À renseigner » : notez la dernière fois que c'est fait, et le suivi démarre.</p>` : ""}
      <p class="muted mat-note">${icon("shield")}<span>Les intervalles viennent de nos fiches vérifiées ; vous pouvez les régler dans le carnet de chaque matériel.</span></p>
    </div>`;
}
