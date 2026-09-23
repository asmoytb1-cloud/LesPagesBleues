/* Les Pages Bleues — à propos : mission, vérification, réparateurs, crédits photos */

renderHeader("");
renderFooter();

const sourcesCount = GUIDES.reduce((n, g) => n + (g.sources || []).length, 0);
const withSources = GUIDES.filter(g => (g.sources || []).length).length;
const LICENSES = { cc0: "CC0 (domaine public)", pdm: "Domaine public", by: "Creative Commons BY", "by-sa": "Creative Commons BY-SA" };

document.getElementById("about").innerHTML = `
  <p style="font-size:1.15rem;color:var(--text)"><strong>Les Pages Bleues</strong> veut devenir la référence francophone, gratuite, de la réparation du quotidien : une encyclopédie collaborative où chacun peut trouver — et partager — la façon de réparer un objet plutôt que de le jeter.</p>

  <h2>Pourquoi ce projet ?</h2>
  <p>Les Français aiment l'idée de réparer, mais passent peu à l'acte :</p>
  <table>
    <thead><tr><th>Constat</th><th>Source</th></tr></thead>
    <tbody>
      <tr><td>81 % des Français ont une bonne image de la réparation, mais seulement 36 % réparent leurs appareils lorsqu'ils tombent en panne.</td><td>ADEME, cité dans la <a href="https://www.assemblee-nationale.fr/dyn/16/questions/QANR5L16QE15049" rel="noopener" target="_blank">question écrite n° 15049</a> (Assemblée nationale, 13 février 2024)</td></tr>
      <tr><td>715 227 réparations ont bénéficié du bonus réparation en 2024, pour 24,3 millions d'euros.</td><td><a href="https://www.neomag.fr/article/10510/le-bonus-reparation-evolue-pour-financer-plus-largement-l-univers-de-la-reparation" rel="noopener" target="_blank">Neomag</a>, 27 mars 2025</td></tr>
      <tr><td>La réparation d'un aspirateur coûte en moyenne 122 € chez un professionnel.</td><td><a href="https://www.clcv.org/articles/reparation-des-progres-significatifs-mais-encore-des-mesures-deployer" rel="noopener" target="_blank">CLCV</a>, 1er octobre 2024</td></tr>
    </tbody>
  </table>
  <p>Entre l'envie et le geste, il manque souvent une explication claire, en français, fiable et gratuite. C'est ce que nous construisons.</p>

  <h2 id="verification">Comment nous vérifions les fiches</h2>
  <ul>
    <li><strong>Des sources citées.</strong> ${withSources} fiches sur ${GUIDES.length} indiquent les pages consultées pour vérifier leurs consignes et leurs chiffres (${sourcesCount} sources au total) : notices de fabricants, organismes publics, professionnels du secteur.</li>
    <li><strong>Une date de vérification</strong> affichée sur chaque fiche (dernière vérification documentaire : ${escapeHtml(formatDate(REVIEWED_ON))}).</li>
    <li><strong>La sécurité d'abord.</strong> Chaque fiche commence par les précautions à prendre et signale quand il vaut mieux faire appel à un professionnel.</li>
    <li><strong>Bientôt, une relecture humaine.</strong> Les fiches proposées par la communauté seront relues par un modérateur, puis par des réparateurs, avant d'être publiées. En attendant, elles sont marquées « non relue ».</li>
    <li><strong>Vous repérez une erreur ?</strong> Chaque fiche propose un lien « Signaler une erreur ».</li>
  </ul>

  <h2 id="reparateur">Trouver un réparateur près de chez vous</h2>
  <p>Certaines réparations demandent un professionnel. Ces services officiels vous aident à en trouver un :</p>
  <ul>
    <li><a href="https://www.e-reparation.eco/" rel="noopener" target="_blank">e-reparation.eco</a> : les réparateurs labellisés <strong>QualiRépar</strong>, chez qui le <strong>bonus réparation</strong> est déduit directement de la facture pour les appareils électriques et électroniques éligibles.</li>
    <li><a href="https://epargnonsnosressources.gouv.fr/bonnes-adresses-mieux-consommer/" rel="noopener" target="_blank">Les bonnes adresses de l'ADEME</a> : réparer, louer, emprunter ou acheter d'occasion près de chez vous.</li>
    <li><a href="https://www.repaircafe.org/fr/visiter/" rel="noopener" target="_blank">Repair Café</a> : des ateliers gratuits où des bénévoles vous aident à réparer.</li>
    <li><a href="https://www.ecosystem.eco/comprendre/bonus-reparation" rel="noopener" target="_blank">Montants du bonus réparation</a> par type d'appareil (ecosystem).</li>
  </ul>

  <h2>Ce qui arrive ensuite</h2>
  <ul>
    <li>Des comptes pour publier vos fiches et discuter avec toute la communauté (aujourd'hui, tout reste sur votre appareil).</li>
    <li>La relecture des fiches par des modérateurs et des réparateurs.</li>
    <li>Un assistant de diagnostic enrichi par les retours d'intervention des réparateurs.</li>
  </ul>

  <h2 id="credits">Crédits photos</h2>
  <p>Les photos proviennent de banques d'images sous licences libres. Merci à leurs auteurs.</p>
  <div class="credits" id="credits"><p class="muted">Chargement…</p></div>`;

fetch(ROOT + "assets/img/photos/credits.json")
  .then(r => r.json())
  .then(list => {
    document.getElementById("credits").innerHTML = list.map(c => `
      <figure class="credit" style="margin:0">
        <img src="${ROOT}assets/img/photos/${escapeHtml(c.file)}" alt="${escapeHtml(c.title)}" loading="lazy">
        <div><strong>${escapeHtml(c.title)}</strong><br>
          ${c.creator ? `par ${escapeHtml(c.creator)} · ` : ""}<a href="${escapeHtml(c.license_url || "#")}" rel="noopener" target="_blank">${escapeHtml(LICENSES[c.license] || c.license)}</a> ·
          <a href="${escapeHtml(c.source_url)}" rel="noopener" target="_blank">source</a></div>
      </figure>`).join("");
  })
  .catch(() => { document.getElementById("credits").innerHTML = `<p class="muted">La liste des crédits est dans le fichier assets/img/photos/credits.json.</p>`; });

hydrateIcons();
