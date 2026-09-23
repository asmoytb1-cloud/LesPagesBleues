/* Les Pages Bleues — profil local : fiches, réparations, favoris, badges et données */

renderHeader("profil");
renderFooter();

let tab = new URLSearchParams(location.search).get("tab") || "guides";

function stats() {
  const all = allGuides();
  const mine = loadUserGuides();
  const repaired = all.filter(g => getResult(g.id) === "ok");
  const ongoing = inProgressGuides();
  const posts = loadPosts();
  return { all, mine, repaired, ongoing, favs: all.filter(g => isFav(g.id)), posts,
    interventions: posts.filter(p => p.type === "intervention"), replies: posts.reduce((n, p) => n + (p.replies || []).length, 0),
    domains: new Set(repaired.map(g => categoryById(g.category).parent || g.category)).size };
}

const BADGES = [
  ["Premier pas", "Commencer une réparation", "play", s => s.ongoing.length + s.repaired.length >= 1],
  ["Réparateur", "Réussir une réparation", "wrench", s => s.repaired.length >= 1],
  ["Série de 5", "Réussir 5 réparations", "medal", s => s.repaired.length >= 5],
  ["Touche-à-tout", "Réparer dans 3 domaines différents", "globe", s => s.domains >= 3],
  ["Transmetteur", "Publier une fiche", "doc", s => s.mine.length >= 1],
  ["Pédagogue", "Publier 3 fiches", "cap", s => s.mine.length >= 3],
  ["Curieux", "Poser une question", "chat", s => s.posts.some(p => p.type === "question")],
  ["Entraide", "Répondre à une discussion", "users", s => s.replies >= 1],
  ["Expert de terrain", "Documenter une intervention", "shield", s => s.interventions.length >= 1],
  ["Collectionneur", "Mettre 5 fiches en favori", "heart", s => s.favs.length >= 5]
];

function render() {
  const p = getProfile();
  const s = stats();
  const earned = BADGES.filter(b => b[3](s));
  document.getElementById("profile-head").innerHTML = `
    <div class="profile-head">
      <span class="avatar avatar-lg">${escapeHtml(initials(p.name)) || icon("user")}</span>
      <div>
        <h1>${escapeHtml(p.name || "Réparateur anonyme")}</h1>
        <p class="muted">Sur cet appareil depuis le ${escapeHtml(formatDate(p.since))}${p.bio ? ` · ${escapeHtml(p.bio)}` : ""}</p>
        ${earned.length ? `<p style="margin-top:.5rem"><span class="tag">${icon("medal")} ${earned.length} badge${earned.length > 1 ? "s" : ""}</span></p>` : ""}
      </div>
      <button class="btn btn-ghost profile-edit" id="edit-profile" type="button">${icon("user")} Modifier le profil</button>
    </div>
    <div class="pstats">
      <div class="pstat"><strong>${s.mine.length}</strong><small>fiche${s.mine.length > 1 ? "s" : ""} publiée${s.mine.length > 1 ? "s" : ""}</small></div>
      <div class="pstat"><strong>${s.repaired.length}</strong><small>réparation${s.repaired.length > 1 ? "s" : ""} réussie${s.repaired.length > 1 ? "s" : ""}</small></div>
      <div class="pstat"><strong>${s.ongoing.length}</strong><small>en cours</small></div>
      <div class="pstat"><strong>${s.posts.length}</strong><small>message${s.posts.length > 1 ? "s" : ""} dans la communauté</small></div>
    </div>`;

  const tabs = [["guides", "Mes guides", s.mine.length], ["repairs", "Mes réparations", s.repaired.length + s.ongoing.length], ["favs", "Favoris", s.favs.length], ["badges", "Badges", earned.length], ["data", "Mes données", ""]];
  let body = "";
  if (tab === "guides") body = s.mine.length ? `<div class="rows">${s.mine.map(g => guideRow(g)).join("")}</div>`
    : `<div class="empty">${icon("doc")}<h3>Vous n'avez pas encore publié de fiche</h3><p>Vous savez réparer quelque chose ? Transmettez-le, étape par étape.</p><div class="empty-actions"><a class="btn btn-primary" href="ajouter.html">${icon("plus")} Partager un guide</a></div></div>`;
  if (tab === "repairs") body = (s.ongoing.length || s.repaired.length) ? `
    ${s.ongoing.length ? `<h2 style="font-size:1.1rem;margin-bottom:10px">En cours</h2><div class="rows">${s.ongoing.map(g => guideRow(g)).join("")}</div>` : ""}
    ${s.repaired.length ? `<h2 style="font-size:1.1rem;margin:22px 0 10px">Réussies</h2><div class="rows">${s.repaired.map(g => guideRow(g)).join("")}</div>` : ""}`
    : `<div class="empty">${icon("wrench")}<h3>Aucune réparation pour l'instant</h3><p>Lancez le mode accompagnement d'une fiche : votre progression apparaîtra ici.</p><div class="empty-actions"><a class="btn btn-primary" href="guides.html">Trouver un guide</a></div></div>`;
  if (tab === "favs") body = s.favs.length ? `<div class="guide-grid">${s.favs.map(guideCard).join("")}</div>`
    : `<div class="empty">${icon("heart")}<h3>Pas encore de favoris</h3><p>Touchez le cœur d'une fiche pour la retrouver ici, même sans réseau.</p></div>`;
  if (tab === "badges") body = `<div class="badge-grid">${BADGES.map(([name, how, ic, test]) => `
    <div class="badge-card ${test(s) ? "earned" : ""}"><span class="medal">${icon(ic)}</span><div><strong>${name}</strong><small>${test(s) ? "Obtenu" : how}</small></div></div>`).join("")}</div>`;
  if (tab === "data") body = `
    <div class="card">
      <h3>${icon("shield")} Vos données restent sur cet appareil</h3>
      <p class="muted">Fiches, photos, favoris, progression, messages et préférences sont enregistrés dans ce navigateur, nulle part ailleurs. Exportez-les pour les conserver ou les transférer sur un autre appareil.</p>
      <div class="data-actions" style="margin-top:1rem">
        <button class="btn btn-primary" id="export" type="button">${icon("download")} Exporter mes données</button>
        <label class="btn btn-ghost" for="import">${icon("upload")} Importer</label>
        <input type="file" id="import" accept="application/json" hidden>
        <button class="btn btn-danger" id="wipe" type="button">${icon("trash")} Tout effacer</button>
      </div>
    </div>`;
  document.getElementById("profile-body").innerHTML = `
    <div class="tabs" role="tablist" id="ptabs" style="margin:0 0 20px">${tabs.map(([k, t, n]) =>
      `<button class="tab" role="tab" type="button" data-tab="${k}" aria-selected="${tab === k}">${t}${n !== "" ? `<span class="chip-n">${n}</span>` : ""}</button>`).join("")}</div>
    ${body}`;
}

function lpbKeys() {
  const keys = [];
  try { for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); if (k.startsWith("lpb-")) keys.push(k); } } catch {}
  return keys;
}

document.addEventListener("click", e => {
  const t = e.target.closest("#ptabs [data-tab]");
  if (t) { tab = t.dataset.tab; render(); document.querySelector(`#ptabs [data-tab="${tab}"]`).focus(); }
  if (e.target.closest("#edit-profile")) {
    const p = getProfile();
    openModal("Modifier le profil", `
      <form class="form" id="prof-form" style="gap:14px">
        <div class="field"><label for="pf-name">Pseudo</label><input class="input" id="pf-name" maxlength="40" value="${escapeHtml(p.name)}" placeholder="Ex. : MecaMorgane"></div>
        <div class="field"><label for="pf-bio">En quelques mots</label><input class="input" id="pf-bio" maxlength="120" value="${escapeHtml(p.bio || "")}" placeholder="Ex. : Passionnée d'auto, de bricolage et de solutions durables"></div>
        <div class="form-actions"><button class="btn btn-ghost" type="button" data-close>Annuler</button><button class="btn btn-primary" type="submit">Enregistrer</button></div>
      </form>`, (wrap, close) => {
      wrap.querySelector("#prof-form").addEventListener("submit", ev => {
        ev.preventDefault();
        saveProfile({ ...p, name: wrap.querySelector("#pf-name").value.trim(), bio: wrap.querySelector("#pf-bio").value.trim() });
        close();
        location.reload();
      });
    });
  }
  if (e.target.closest("#export")) {
    const data = { app: "Les Pages Bleues", exported: new Date().toISOString(), data: {} };
    for (const k of lpbKeys()) data.data[k] = store.get(k, null);
    const blob = new Blob([JSON.stringify(data, null, 1)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `pages-bleues-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  }
  if (e.target.closest("#wipe") && confirm("Effacer toutes vos données Pages Bleues de cet appareil ? (fiches, favoris, progression, messages)")) {
    lpbKeys().forEach(k => store.remove(k));
    location.reload();
  }
});
document.addEventListener("change", async e => {
  if (e.target.id !== "import" || !e.target.files[0]) return;
  try {
    const json = JSON.parse(await e.target.files[0].text());
    if (json.app !== "Les Pages Bleues" || typeof json.data !== "object") throw new Error();
    if (!confirm("Remplacer les données de cet appareil par celles du fichier ?")) return;
    for (const [k, v] of Object.entries(json.data)) if (k.startsWith("lpb-")) store.set(k, v);
    location.reload();
  } catch { toast("Ce fichier n'est pas un export des Pages Bleues."); }
});

render();
