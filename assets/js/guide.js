/* Les Pages Bleues — page d'une fiche : progression, favoris, avis, questions et mode accompagnement.
   Le HTML de la fiche vient de guide-view.js (le même rendu sert aux pages statiques de /fiches/). */

renderHeader("guides");
renderFooter();

const params = new URLSearchParams(location.search);
const guideId = (typeof window !== "undefined" && window.LPB_GUIDE_ID) || params.get("id");
const guide = guideById(guideId);
const root = document.getElementById("guide");

const fmtTime = sec => {
  sec = Math.max(0, Math.round(sec));
  return `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, "0")}`;
};

if (!guide) {
  root.innerHTML = `<section class="section"><div class="container"><div class="empty">${icon("search")}<h1 class="empty-title">Guide introuvable</h1>
    <p>Ce guide n'existe pas ou a été supprimé de cet appareil.</p>
    <div class="empty-actions"><a class="btn btn-primary" href="${ROOT}guides.html">Voir tous les guides</a></div></div></div></section>`;
} else {
  if (!guide.user && !window.LPB_GUIDE_ID && !params.get("coach")) {
    // Ancienne adresse guide.html?id=… : on redirige vers la page statique, mieux référencée
    location.replace(guideUrl(guide));
  }
  renderGuide();
  if (params.get("coach") === "1" && !document.querySelector(".coach")) {
    params.delete("coach");
    history.replaceState(null, "", location.pathname + (params.toString() ? "?" + params : "") + location.hash);
    document.getElementById("coach-start").click();
  }
}

function guideQuestions() {
  return loadPosts().filter(p => p.guide === guide.id && p.type === "question");
}

function renderGuide() {
  const c = categoryById(guide.category);
  document.title = `${guide.title} — Les Pages Bleues`;
  document.querySelector('meta[name="description"]')?.setAttribute("content", guide.summary || guide.title);
  const done = getProgress(guide.id);
  root.innerHTML = guidePageHTML(guide, {
    done, result: getResult(guide.id), questions: guideQuestions(), related: relatedGuides(guide, allGuides())
  });

  const update = () => {
    const pct = Math.round(done.size / guide.steps.length * 100);
    document.getElementById("bar").style.width = pct + "%";
    document.getElementById("pct").textContent = pct === 100 ? "Terminé ✓" : pct + " %";
    document.getElementById("reset").hidden = !done.size;
    document.getElementById("coach-label").textContent =
      done.size && pct < 100 ? `Reprendre à l'étape ${guide.steps.findIndex((_, i) => !done.has(i)) + 1}` : "Lancer l'accompagnement";
  };

  // Coche / décoche une étape, dans la liste comme dans le mode accompagnement
  const setDone = (i, on) => {
    on ? done.add(i) : done.delete(i);
    const li = root.querySelector(`.step-item[data-i="${i}"]`);
    const btn = li.querySelector(".step-check");
    li.classList.toggle("done", on);
    btn.setAttribute("aria-pressed", on);
    btn.innerHTML = on ? icon("check") : i + 1;
    saveProgress(guide.id, done);
    update();
  };
  update();

  root.querySelector(".step-list").addEventListener("click", e => {
    const btn = e.target.closest(".step-check");
    if (!btn) return;
    const i = +btn.closest(".step-item").dataset.i;
    setDone(i, !done.has(i));
  });

  document.getElementById("reset").addEventListener("click", () => {
    [...done].forEach(i => setDone(i, false));
    store.remove("lpb-result-" + guide.id);
    toast("Progression remise à zéro.");
  });

  // « Ça a marché ? »
  root.querySelectorAll("[data-result]").forEach(b => b.addEventListener("click", () => {
    store.set("lpb-result-" + guide.id, b.dataset.result);
    if (b.dataset.result === "ok") guide.steps.forEach((_, i) => done.has(i) || setDone(i, true));
    toast(b.dataset.result === "ok" ? "Bravo ! Un objet de plus sauvé de la poubelle." : "Voici les pistes à vérifier.");
    renderGuide();
    if (b.dataset.result === "ko") document.getElementById("conseils").scrollIntoView({ behavior: "smooth" });
  }));

  // Favori
  const favBtn = document.getElementById("fav");
  const paintFav = () => {
    const on = isFav(guide.id);
    favBtn.classList.toggle("on", on);
    favBtn.setAttribute("aria-pressed", on);
    favBtn.innerHTML = `${icon("heart", on ? "fill" : "")}<span>${on ? "Dans mes favoris" : "Favori"}</span>`;
  };
  paintFav();
  favBtn.addEventListener("click", () => {
    const on = !isFav(guide.id);
    setFav(guide.id, on);
    paintFav();
    toast(on ? "Ajouté à vos favoris : retrouvez-le même sans réseau." : "Retiré de vos favoris.");
  });

  // Note personnelle
  const stars = [...root.querySelectorAll("[data-star]")];
  const paintStars = n => stars.forEach(s => {
    const on = +s.dataset.star <= n;
    s.classList.toggle("on", on);
    s.setAttribute("aria-checked", +s.dataset.star === n);
  });
  paintStars(store.get("lpb-rating-" + guide.id, 0));
  stars.forEach(s => s.addEventListener("click", () => {
    const n = +s.dataset.star;
    store.set("lpb-rating-" + guide.id, n);
    paintStars(n);
    document.getElementById("rating-note").textContent = `Merci ! Vous avez donné ${n}/5 à ce guide.`;
  }));

  // Questions sur la fiche
  document.getElementById("qa-form").addEventListener("submit", e => {
    e.preventDefault();
    const ta = document.getElementById("qa-text");
    const body = ta.value.trim();
    if (!body) { ta.focus(); return; }
    const prof = getProfile();
    const posts = loadPosts();
    posts.unshift({ id: "q" + Date.now().toString(36), type: "question", guide: guide.id, category: guide.category,
      title: `Question sur « ${guide.title} »`, body, author: prof.name || "Vous", date: new Date().toISOString(), replies: [] });
    savePosts(posts);
    toast("Question publiée.");
    renderGuide();
    document.getElementById("qa").scrollIntoView();
  });

  // Onglets de section : suit le défilement
  const tabs = [...root.querySelectorAll(".guide-tabs .tab")];
  const sections = tabs.map(t => document.querySelector(t.getAttribute("href")));
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        tabs.forEach(t => t.getAttribute("href") === "#" + en.target.id ? t.setAttribute("aria-current", "true") : t.removeAttribute("aria-current"));
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(s => s && io.observe(s));
  }

  document.getElementById("print").addEventListener("click", () => window.print());
  document.getElementById("share").addEventListener("click", async () => {
    const url = location.href.split("?")[0].split("#")[0] + (guide.user ? `?id=${encodeURIComponent(guide.id)}` : "");
    try {
      if (navigator.share) await navigator.share({ title: guide.title, text: guide.summary, url });
      else { await navigator.clipboard.writeText(url); toast("Lien copié ✓"); }
    } catch (err) {
      if (err && err.name !== "AbortError") toast("Impossible de partager depuis ce navigateur.");
    }
  });

  document.getElementById("delete")?.addEventListener("click", () => {
    if (!confirm("Supprimer définitivement cette fiche de ce navigateur ?")) return;
    deleteUserGuide(guide.id);
    location.href = ROOT + "profil.html";
  });

  document.getElementById("coach-start").addEventListener("click", e => {
    e.preventDefault();
    startCoach(guide, done, setDone, () => {
      // Après l'accompagnement, la fiche reflète le résultat (badge « Réparé », pistes de dépannage…)
      renderGuide();
      document.getElementById("coach-start").focus();
    });
  });
}

/* ==========================================================
   Mode accompagnement : une étape à la fois, en plein écran
   ========================================================== */
function startCoach(guide, done, setDone, onClose) {
  const steps = guide.steps;
  const total = steps.length;
  // Écran 0 = préparation, 1..total = étapes, total + 1 = fin
  const firstTodo = steps.findIndex((_, i) => !done.has(i));
  let pos = done.size && firstTodo >= 0 ? firstTodo + 1 : 0;
  let voice = store.get("lpb-voice", false);
  let wakeLock = null;
  let feedback = null;            // "ok" | "ko" sur l'écran final
  const checked = new Set();      // outils / pièces cochés pendant la préparation
  const canSpeak = "speechSynthesis" in window;
  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  let rec = null, listening = false;
  let timer = null;               // { step, total, endAt, left, running, finished }
  let ticker = null;

  const el = document.createElement("div");
  el.className = "coach theme-dark";
  el.setAttribute("role", "dialog");
  el.setAttribute("aria-modal", "true");
  el.setAttribute("aria-label", "Accompagnement : " + guide.title);
  document.body.appendChild(el);
  document.body.classList.add("coach-open");

  const keepAwake = () => {
    try { navigator.wakeLock?.request("screen").then(l => { wakeLock = l; }).catch(() => {}); } catch {}
  };
  keepAwake();
  const onVisible = () => { if (document.visibilityState === "visible") keepAwake(); };
  document.addEventListener("visibilitychange", onVisible);

  /* ---------- Minuteur ---------- */
  const timeLeft = () => !timer ? 0 : timer.running ? (timer.endAt - Date.now()) / 1000 : timer.left;
  function startTimer(stepIndex) {
    const s = steps[stepIndex];
    if (!s || !s.timer) return;
    if (!timer || timer.step !== stepIndex || timer.finished) timer = { step: stepIndex, total: s.timer, left: s.timer };
    timer.running = true;
    timer.finished = false;
    timer.endAt = Date.now() + timer.left * 1000;
    ticker = ticker || setInterval(tick, 250);
    paintTimer();
  }
  function pauseTimer() {
    if (!timer || !timer.running) return;
    timer.left = timeLeft();
    timer.running = false;
    paintTimer();
  }
  function resetTimer() {
    if (!timer) return;
    timer = { step: timer.step, total: timer.total, left: timer.total, running: false };
    paintTimer();
  }
  function tick() {
    if (!timer || !timer.running) return;
    if (timeLeft() <= 0) {
      timer.running = false;
      timer.finished = true;
      timer.left = 0;
      alarm();
    }
    paintTimer();
  }
  function alarm() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      [0, .35, .7].forEach(t => {
        const o = ctx.createOscillator(), g = ctx.createGain();
        o.frequency.value = 880;
        g.gain.setValueAtTime(.25, ctx.currentTime + t);
        g.gain.exponentialRampToValueAtTime(.001, ctx.currentTime + t + .3);
        o.connect(g).connect(ctx.destination);
        o.start(ctx.currentTime + t);
        o.stop(ctx.currentTime + t + .3);
      });
    } catch {}
    try { navigator.vibrate?.([300, 150, 300]); } catch {}
    say(`Temps écoulé pour l'étape ${timer.step + 1}.`, true);
    toast(`⏱ Temps écoulé — étape ${timer.step + 1}`);
  }
  function paintTimer() {
    el.querySelectorAll("[data-timer-display]").forEach(d => { d.textContent = fmtTime(timeLeft()); });
    const box = el.querySelector(".coach-timer");
    if (box) {
      const mine = timer && +box.dataset.step === timer.step;
      box.classList.toggle("running", !!(mine && timer.running));
      box.classList.toggle("finished", !!(mine && timer.finished));
      if (mine) box.querySelector(".timer-ring").style.setProperty("--p", 1 - timeLeft() / timer.total);
      box.querySelector("[data-act=timer-toggle]").innerHTML = mine && timer.running
        ? `${icon("pause")} Pause`
        : mine && timer.finished ? `${icon("refresh")} Relancer`
        : `${icon("play")} ${mine && timer.left < timer.total ? "Reprendre" : "Démarrer le minuteur"}`;
    }
    const chip = el.querySelector(".timer-chip");
    if (chip) chip.hidden = !(timer && (timer.running || timer.finished) && timer.step !== pos - 1);
  }

  /* ---------- Voix : lecture et commandes ---------- */
  function say(text, force = false) {
    if (!canSpeak) return;
    if (!force) speechSynthesis.cancel();
    if (!voice && !force) return;
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "fr-FR";
    u.rate = 0.95;
    const fr = speechSynthesis.getVoices().find(v => v.lang && v.lang.startsWith("fr"));
    if (fr) u.voice = fr;
    speechSynthesis.speak(u);
  }

  function handleCommand(raw) {
    const t = normalize(raw);
    if (/\b(suivant|suivante|c'?est fait|fait|ok|d'accord|continue)\b/.test(t)) go(1);
    else if (/\b(precedent|precedente|retour|arriere)\b/.test(t)) go(-1);
    else if (/\b(repete|repeter|redis|encore|quoi)\b/.test(t)) say(screen().speak, true);
    else if (/\b(minuteur|chrono|lance|demarre)\b/.test(t) && steps[pos - 1]?.timer) startTimer(pos - 1);
    else if (/\bpause\b/.test(t)) pauseTimer();
    else if (/\b(quitte|quitter|ferme|fermer|stop|arrete)\b/.test(t)) close();
  }
  function toggleListening() {
    if (!Recognition) return;
    if (listening) { listening = false; try { rec.stop(); } catch {} render(); return; }
    rec = new Recognition();
    rec.lang = "fr-FR";
    rec.continuous = true;
    rec.interimResults = false;
    rec.onresult = e => {
      if (canSpeak && speechSynthesis.speaking) return;   // ne pas s'écouter soi-même
      const r = e.results[e.results.length - 1];
      if (r.isFinal) handleCommand(r[0].transcript);
    };
    rec.onerror = e => {
      if (e.error === "not-allowed" || e.error === "service-not-allowed") {
        listening = false;
        toast("Micro refusé : autorisez-le dans le navigateur pour les commandes vocales.");
        render();
      }
    };
    rec.onend = () => { if (listening) { try { rec.start(); } catch {} } };
    try {
      rec.start();
      listening = true;
      toast("Dites « suivant », « précédent », « répète », « minuteur » ou « quitter ».");
    } catch { listening = false; }
    render();
  }

  /* ---------- Écrans ---------- */
  const checklist = (title, ic, prefix, items) => items && items.length ? `
    <div class="coach-list"><h3>${icon(ic)} ${title}</h3>
      <ul>${items.map((t, i) => `<li><label><input type="checkbox" data-check="${prefix}${i}" ${checked.has(prefix + i) ? "checked" : ""}> <span>${escapeHtml(t)}</span></label></li>`).join("")}</ul>
    </div>` : "";

  function screen() {
    if (pos === 0) {
      const safety = guide.safety || "Travaillez dans un endroit dégagé et bien éclairé, et prenez votre temps.";
      const kit = [...(guide.tools || []), ...(guide.parts || [])];
      return {
        label: "Préparation",
        speak: `Avant de commencer. ${safety}${kit.length ? ` Préparez : ${kit.join(", ")}.` : ""}`,
        html: `
          <p class="coach-kicker">Préparation · ${escapeHtml(guide.duration || "")}</p>
          <h2>Avant de commencer</h2>
          <p class="coach-safety">${icon("shield")} <span>${escapeHtml(safety)}</span></p>
          <div class="coach-lists">
            ${checklist("Outils", "tool", "t", guide.tools)}
            ${checklist("Pièces", "box", "p", guide.parts)}
          </div>`
      };
    }
    if (pos > total) {
      const tips = guide.troubleshoot || [];
      return {
        label: "Terminé",
        speak: "Bravo, la réparation est terminée ! Est-ce que ça fonctionne ?",
        html: `
          <div class="coach-done">
            <div class="coach-done-ico">${icon("check")}</div>
            <h2>Bravo, dernière étape faite !</h2>
            <p>${guide.savings ? `Vous venez d'économiser environ <strong>${escapeHtml(guide.savings.replace("≈", "").trim())}</strong> et d'éviter un déchet.` : "Un objet de plus sauvé de la poubelle."}</p>
            <p class="coach-question">Est-ce que ça fonctionne ?</p>
            <div class="coach-feedback">
              <button class="btn ${feedback === "ok" ? "btn-primary" : "btn-ghost"}" data-act="ok" type="button">${icon("check")} Oui, c'est réparé</button>
              <button class="btn ${feedback === "ko" ? "btn-primary" : "btn-ghost"}" data-act="ko" type="button">${icon("alert")} Pas encore</button>
            </div>
            ${feedback === "ok" ? `<p class="coach-thanks">Génial ! Une astuce à partager ? <a href="${ROOT}ajouter.html">Écrivez votre propre fiche</a>.</p>` : ""}
            ${feedback === "ko" ? (tips.length
              ? `<div class="coach-trouble"><h3>${icon("alert")} Pistes à vérifier</h3><ul>${tips.map(t => `<li>${escapeHtml(t)}</li>`).join("")}</ul></div>`
              : `<p class="muted">Reprenez les étapes une à une : une vis ou un connecteur oublié est souvent en cause.</p>`) : ""}
          </div>`
      };
    }
    const s = steps[pos - 1];
    const i = pos - 1;
    const tLeft = timer && timer.step === i ? timeLeft() : s.timer;
    const waitWords = s.timer ? (s.timer >= 60 ? `${Math.round(s.timer / 60)} minutes` : `${s.timer} secondes`) : "";
    return {
      label: `Étape ${pos} sur ${total}`,
      speak: `Étape ${pos}. ${s.title}. ${s.text}${s.safety ? " Attention : " + s.safety : ""}${s.tip ? " Astuce : " + s.tip : ""}${s.timer ? ` Un minuteur de ${waitWords} est disponible.` : ""}`,
      html: `
        <p class="coach-kicker">Étape ${pos} / ${total}</p>
        <div class="coach-step">
          <span class="coach-num">${pos}</span>
          <div>
            <h2>${escapeHtml(s.title)}</h2>
            <p class="coach-text">${escapeHtml(s.text)}</p>
            ${s.photo ? `<div class="coach-photo"><img src="${s.photo}" alt="Photo de l'étape ${pos}"></div>` : ""}
            ${s.safety ? `<p class="coach-safety">${icon("shield")} <span>${escapeHtml(s.safety)}</span></p>` : ""}
            ${s.tip ? `<p class="coach-tip">${icon("bulb")} <span><strong>Astuce :</strong> ${escapeHtml(s.tip)}</span></p>` : ""}
            ${s.timer ? `
              <div class="coach-timer" data-step="${i}">
                <div class="timer-ring" style="--p:${timer && timer.step === i ? 1 - tLeft / s.timer : 0}"><span data-timer-display>${fmtTime(tLeft)}</span></div>
                <div class="timer-ctrl">
                  <strong>Temps d'attente</strong>
                  <div>
                    <button class="btn btn-primary" data-act="timer-toggle" type="button"></button>
                    <button class="icon-btn icon-btn-line" data-act="timer-reset" type="button" aria-label="Remettre le minuteur à zéro">${icon("refresh")}</button>
                  </div>
                  <small class="muted">Vous pouvez passer à l'étape suivante : le minuteur continue.</small>
                </div>
              </div>` : ""}
          </div>
        </div>`
    };
  }

  function render() {
    const sc = screen();
    const isStep = pos >= 1 && pos <= total;
    const nextLabel = pos === 0 ? "C'est prêt, on commence"
      : pos === total ? "C'est fait, terminer"
      : pos > total ? "Fermer" : "C'est fait, étape suivante";
    el.innerHTML = `
      <div class="coach-top">
        <div class="coach-title"><small>Accompagnement</small><strong>${escapeHtml(guide.title)}</strong></div>
        <button class="timer-chip" data-act="goto-timer" type="button" hidden>${icon("timer")} <span data-timer-display>0:00</span></button>
        ${Recognition ? `<button class="icon-btn coach-toggle ${listening ? "on listening" : ""}" data-act="listen" type="button" aria-pressed="${listening}" aria-label="Commandes vocales" title="Commandes vocales">${icon(listening ? "mic" : "micOff")}</button>` : ""}
        ${canSpeak ? `<button class="icon-btn coach-toggle ${voice ? "on" : ""}" data-act="voice" type="button" aria-pressed="${voice}" aria-label="Lecture à voix haute" title="Lecture à voix haute">${icon(voice ? "volume" : "mute")}</button>` : ""}
        <button class="icon-btn" data-act="close" type="button" aria-label="Quitter l'accompagnement">${icon("close")}</button>
      </div>
      <div class="coach-dots">
        ${steps.map((_, i) => `<button type="button" data-goto="${i + 1}" class="${done.has(i) ? "ok" : ""} ${pos === i + 1 ? "cur" : ""}" aria-label="Aller à l'étape ${i + 1}${done.has(i) ? " (faite)" : ""}"></button>`).join("")}
      </div>
      <div class="coach-body ${isStep ? "anim" : ""}" aria-live="polite">${sc.html}</div>
      <div class="coach-nav">
        <button class="btn btn-ghost" data-act="prev" type="button" ${pos === 0 ? "disabled" : ""}>${icon("back")}<span>Précédent</span></button>
        <span class="coach-count muted">${sc.label}</span>
        <button class="btn btn-primary" data-act="next" type="button">${nextLabel}${pos > total ? "" : icon("arrow")}</button>
      </div>`;
    paintTimer();
    el.querySelector('[data-act="next"]').focus({ preventScroll: true });
    say(sc.speak);
  }

  function go(delta) {
    if (delta > 0 && pos >= 1 && pos <= total) setDone(pos - 1, true);
    if (delta > 0 && pos > total) return close();
    pos = Math.max(0, Math.min(total + 1, pos + delta));
    render();
  }

  function close() {
    if (canSpeak) speechSynthesis.cancel();
    listening = false;
    try { rec?.stop(); } catch {}
    clearInterval(ticker);
    try { wakeLock?.release(); } catch {}
    document.removeEventListener("keydown", onKey);
    document.removeEventListener("visibilitychange", onVisible);
    document.body.classList.remove("coach-open");
    el.remove();
    onClose?.();
  }

  function onKey(e) {
    if (e.target.matches?.("input, textarea")) return;
    if (e.key === "Escape") close();
    else if (e.key === "ArrowRight") go(1);
    else if (e.key === "ArrowLeft") go(-1);
    else if (e.key === "Tab") {
      // Garde le focus à l'intérieur du mode accompagnement
      const f = [...el.querySelectorAll("button:not([disabled]):not([hidden]), a[href], input")];
      if (!f.length) return;
      if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
    }
  }
  document.addEventListener("keydown", onKey);

  el.addEventListener("change", e => {
    const k = e.target.dataset.check;
    if (k) e.target.checked ? checked.add(k) : checked.delete(k);
  });

  el.addEventListener("click", e => {
    const dot = e.target.closest("[data-goto]");
    if (dot) { pos = +dot.dataset.goto; render(); return; }
    const act = e.target.closest("[data-act]")?.dataset.act;
    if (act === "next") go(1);
    else if (act === "prev") go(-1);
    else if (act === "close") close();
    else if (act === "voice") { voice = !voice; store.set("lpb-voice", voice); render(); }
    else if (act === "listen") toggleListening();
    else if (act === "timer-toggle") {
      if (timer && timer.running && timer.step === pos - 1) pauseTimer();
      else startTimer(pos - 1);
    }
    else if (act === "timer-reset") { if (timer && timer.step === pos - 1) resetTimer(); }
    else if (act === "goto-timer" && timer) { pos = timer.step + 1; render(); }
    else if (act === "ok" || act === "ko") {
      feedback = act;
      store.set("lpb-result-" + guide.id, act);
      render();
    }
  });

  // Balayage gauche / droite sur mobile
  let x0 = null, y0 = null;
  el.addEventListener("touchstart", e => { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
  el.addEventListener("touchend", e => {
    if (x0 === null || e.target.closest("button, input, label, a")) return;
    const dx = e.changedTouches[0].clientX - x0;
    const dy = e.changedTouches[0].clientY - y0;
    x0 = null;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) go(dx < 0 ? 1 : -1);
  });

  render();
}
