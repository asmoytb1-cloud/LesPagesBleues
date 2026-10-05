/* Les Pages Bleues — bêta ouverte : présentation et formulaire d'avis (gardé sur l'appareil, envoi par e-mail au choix) */

renderHeader("");
renderFooter();

const FEEDBACK = "lpb-beta-avis";
const root = document.getElementById("beta-root");
const list = () => store.get(FEEDBACK, []);

root.innerHTML = `
  <p style="font-size:1.1rem;color:var(--text)">Les Pages Bleues est <strong>gratuit</strong> et le restera pour les fiches. Cette bêta sert à vérifier, avec vous, que l'encyclopédie aide vraiment à entretenir et réparer : ce qui manque, ce qui est confus, ce qui ne marche pas.</p>

  <h2>Ce que vous pouvez déjà faire</h2>
  <ul>
    <li><strong>${GUIDES.length} fiches vérifiées</strong>, avec leurs sources, et un mode accompagnement pas à pas.</li>
    <li>Un <a href="diagnostic.html">diagnostic guidé</a> pour trouver la cause d'une panne.</li>
    <li><a href="materiel.html">Mon matériel</a> et son carnet d'entretien : rappels, historique, export pour la revente.</li>
    <li>Rédiger vos propres fiches, poser des questions, garder vos favoris.</li>
  </ul>

  <h2>Ce qui arrive</h2>
  <ul>
    <li>Le partage de vos fiches et de vos questions avec toute la communauté (aujourd'hui, tout reste sur votre appareil).</li>
    <li>La relecture des fiches par des réparateurs.</li>
    <li>De nouvelles fiches chaque semaine, en priorité celles que vous demandez.</li>
  </ul>

  <h2>Les limites de la bêta</h2>
  <ul>
    <li>Vos données sont enregistrées dans ce navigateur : pensez à les <a href="profil.html">exporter</a> si vous changez d'appareil.</li>
    <li>Des fonctions peuvent changer d'une semaine à l'autre.</li>
  </ul>

  <h2 id="avis">Donner mon avis</h2>
  <form id="beta-form" class="beta-form" novalidate>
    <fieldset class="beta-rating">
      <legend>Dans l'ensemble, le site vous a-t-il été utile ?</legend>
      ${[1, 2, 3, 4, 5].map(n => `<label class="chip"><input type="radio" name="note" value="${n}"> ${n}${n === 1 ? " — pas du tout" : n === 5 ? " — très utile" : ""}</label>`).join("")}
    </fieldset>
    <label class="field"><span>Qu'est-ce qui vous a plu ?</span><textarea class="input" name="plus" rows="2" maxlength="1000"></textarea></label>
    <label class="field"><span>Qu'est-ce qui manque ou vous a gêné ? (une fiche, un appareil, un bug…)</span><textarea class="input" name="moins" rows="3" maxlength="2000"></textarea></label>
    <label class="field"><span>Sur quel appareil et quel navigateur ? (facultatif)</span><input class="input" name="appareil" maxlength="120" placeholder="ex. iPhone, Safari"></label>
    <p class="field-err" id="beta-err" hidden>Écrivez au moins un mot ou choisissez une note.</p>
    <div class="beta-actions">
      <button class="btn btn-primary" type="submit">${icon("send")} ${SITE_CONTACT ? "Envoyer mon avis" : "Enregistrer mon avis"}</button>
    </div>
    <p class="muted" style="margin-top:.6rem;font-size:.9rem">${SITE_CONTACT
      ? `L'avis s'ouvre dans votre messagerie, adressé à <strong>${escapeHtml(SITE_CONTACT)}</strong> : vous voyez exactement ce qui est envoyé. Une copie reste sur cet appareil.`
      : "L'adresse de contact de l'équipe sera bientôt indiquée ici. En attendant, votre avis est gardé sur cet appareil et vous pouvez le copier."}</p>
  </form>
  <div id="beta-sent"></div>`;

hydrateIcons(root);

function textOf(a) {
  return [`Note : ${a.note || "—"}/5`, `Ce qui m'a plu : ${a.plus || "—"}`, `Ce qui manque ou gêne : ${a.moins || "—"}`,
    `Appareil : ${a.appareil || "—"}`, `Date : ${formatDate(a.date)}`].join("\n");
}

function renderSent() {
  const items = list();
  document.getElementById("beta-sent").innerHTML = items.length ? `
    <h3 style="margin-top:1.4rem">Vos avis enregistrés (${items.length})</h3>
    ${items.map((a, i) => `<div class="qa-item"><header>${icon("chat")} ${escapeHtml(formatDate(a.date))}${a.note ? ` · ${a.note}/5` : ""}</header>
      <p style="white-space:pre-line">${escapeHtml(textOf(a))}</p>
      <button class="btn btn-ghost btn-sm" type="button" data-copy="${i}">${icon("doc")} Copier</button></div>`).join("")}` : "";
}

document.getElementById("beta-form").addEventListener("submit", e => {
  e.preventDefault();
  const f = new FormData(e.target);
  const a = { note: f.get("note") || "", plus: (f.get("plus") || "").trim(), moins: (f.get("moins") || "").trim(), appareil: (f.get("appareil") || "").trim(), date: new Date().toISOString() };
  const empty = !a.note && !a.plus && !a.moins;
  document.getElementById("beta-err").hidden = !empty;
  if (empty) return;
  store.set(FEEDBACK, [a, ...list()].slice(0, 50));
  e.target.reset();
  renderSent();
  if (SITE_CONTACT) location.href = `mailto:${SITE_CONTACT}?subject=${encodeURIComponent("Avis sur la bêta des Pages Bleues")}&body=${encodeURIComponent(textOf(a))}`;
  toast("Merci ! Votre avis est enregistré.");
});

document.getElementById("beta-sent").addEventListener("click", e => {
  const b = e.target.closest("[data-copy]");
  if (!b) return;
  const txt = textOf(list()[+b.dataset.copy]);
  (navigator.clipboard ? navigator.clipboard.writeText(txt) : Promise.reject()).then(() => toast("Avis copié."), () => toast("Copie impossible : sélectionnez le texte."));
});

renderSent();
