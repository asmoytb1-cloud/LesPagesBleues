/* Les Pages Bleues — carnet d'entretien : données et calcul des échéances (partagé par les pages).
   Un carnet par matériel, stocké dans ce navigateur (clé lpb-carnet-<id>) :
     settings  options du véhicule (énergie, transmission) et date de mise en service
     tasks     réglages de l'utilisateur par tâche : intervalle modifié, tâche désactivée
     custom    entretiens et contrôles ajoutés par l'utilisateur
     log       fil d'historique : entretiens, contrôles, relevés de compteur, réparations, notes (+ facture) */

const DAY = 864e5;
const LOG_KINDS = {
  entretien: { label: "Entretien", icon: "wrench" },
  controle: { label: "Contrôle", icon: "check" },
  compteur: { label: "Relevé du compteur", icon: "gauge" },
  reparation: { label: "Réparation", icon: "tool" },
  note: { label: "Note", icon: "doc" }
};
const CONTROL_STATES = { ok: "Bon état", surveiller: "À surveiller", defaillant: "Défaillant" };

function loadCarnet(id) {
  const c = store.get("lpb-carnet-" + id, null) || {};
  return { settings: c.settings || {}, tasks: c.tasks || {}, custom: c.custom || [], log: c.log || [] };
}
function saveCarnet(id, c) { return store.set("lpb-carnet-" + id, c); }
function usesKm(m) { return m.kind === "voiture" || m.kind === "moto"; }

// Plan d'entretien : modèle du type + tâches personnalisées, filtré selon les options, avec les réglages de l'utilisateur
function carnetPlan(m, c) {
  let tpl = typeof MAINTENANCE !== "undefined" ? MAINTENANCE[m.type] : null;
  if (typeof tpl === "string") tpl = MAINTENANCE[tpl];
  const s = c.settings;
  const base = (tpl || []).filter(t => !t.when || Object.entries(t.when).every(([k, v]) => !s[k] || v.includes(s[k])));
  return [...base, ...c.custom].map(t => ({ ...t, ...(c.tasks[t.id] || {}) }));
}

const byDate = (a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0);
// Relevés de compteur : toutes les entrées qui portent un kilométrage
function readings(c) { return c.log.filter(e => Number.isFinite(e.km)).sort(byDate); }
function currentKm(c) { const r = readings(c); return r.length ? Math.max(...r.map(e => e.km)) : null; }
// Moyenne de roulage (km par jour) : entre le premier et le dernier relevé, sur au moins une semaine
function kmPerDay(c) {
  const r = readings(c);
  if (r.length < 2) return null;
  const days = (new Date(r[r.length - 1].date) - new Date(r[0].date)) / DAY;
  const km = r[r.length - 1].km - r[0].km;
  return days >= 7 && km > 0 ? km / days : null;
}
function lastDone(c, taskId) { return c.log.filter(e => e.task === taskId).sort(byDate).pop() || null; }
function addMonths(date, n) { const d = new Date(date); d.setMonth(d.getMonth() + n); return d; }
const hasInterval = t => !!(t.months || t.days || t.km);

/* État d'une tâche :
   defaillant : dernier contrôle « défaillant » · retard : échéance dépassée · bientot : dans moins de 15 jours (ou 10 % de l'intervalle)
   ok : à jour · inconnu : jamais enregistrée · libre : pas d'intervalle (selon la notice) */
function taskStatus(m, c, t, now = new Date()) {
  const last = lastDone(c, t.id);
  const out = { last, state: "libre", due: null, dueKm: null, days: null };
  if (last?.state === "defaillant") out.state = "defaillant";
  if (!hasInterval(t)) return out;
  if (!last) { if (out.state !== "defaillant") out.state = "inconnu"; return out; }
  const candidates = [];
  if (t.months) candidates.push(addMonths(last.date, t.months));
  if (t.days) candidates.push(new Date(new Date(last.date).getTime() + t.days * DAY));
  if (t.km && usesKm(m) && Number.isFinite(last.km)) {
    out.dueKm = last.km + t.km;
    const cur = currentKm(c), rate = kmPerDay(c);
    if (cur != null && cur >= out.dueKm) candidates.push(now);                                   // kilométrage déjà atteint
    else if (cur != null && rate) candidates.push(new Date(now.getTime() + (out.dueKm - cur) / rate * DAY));   // prévision
  }
  if (!candidates.length) { if (out.state !== "defaillant") out.state = "inconnu"; return out; }
  out.due = new Date(Math.min(...candidates));
  out.days = Math.round((out.due - now) / DAY);
  const span = t.months ? t.months * 30 : t.days || (t.km && kmPerDay(c) ? t.km / kmPerDay(c) : 60);
  if (out.state !== "defaillant") out.state = out.days < 0 ? "retard" : out.days <= Math.max(15, span * 0.1) ? "bientot" : "ok";
  return out;
}

function carnetSummary(m) {
  const c = loadCarnet(m.id);
  const counts = { retard: 0, defaillant: 0, bientot: 0, ok: 0, inconnu: 0, libre: 0 };
  for (const t of carnetPlan(m, c)) if (!t.off) counts[taskStatus(m, c, t).state]++;
  return { ...counts, entries: c.log.length };
}

// « dans 12 jours », « il y a 3 mois », « aujourd'hui »
function relDays(days) {
  if (days === 0) return "aujourd'hui";
  const a = Math.abs(days);
  const txt = a < 45 ? `${a} jour${a > 1 ? "s" : ""}` : a < 548 ? `${Math.round(a / 30.4)} mois` : `${Math.round(a / 365)} ans`;
  return days > 0 ? `dans ${txt}` : `il y a ${txt}`;
}
function intervalText(t) {
  const parts = [];
  if (t.months) parts.push(t.months === 1 ? "tous les mois" : t.months % 12 === 0 ? (t.months === 12 ? "tous les ans" : `tous les ${t.months / 12} ans`) : `tous les ${t.months} mois`);
  if (t.days) parts.push(t.days === 7 ? "toutes les semaines" : t.days % 7 === 0 ? `toutes les ${t.days / 7} semaines` : `tous les ${t.days} jours`);
  if (t.km) parts.push(`tous les ${t.km.toLocaleString("fr-FR")} km`);
  const txt = parts.join(" ou ");
  return txt ? txt.charAt(0).toUpperCase() + txt.slice(1) : "Intervalle libre (selon la notice)";
}
