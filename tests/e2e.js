/* Les Pages Bleues — tests de bout en bout dans un vrai navigateur (Chromium, via Playwright).
   Installation : npm install && npx playwright install chromium
   Lancement    : npm run test:e2e        (ou npm test pour tout vérifier) */

const path = require("path");
const fs = require("fs");
const { chromium } = require("playwright");
const { server } = require("../tools/serve.js");

const PORT = 8790;
const B = `http://localhost:${PORT}/`;
const results = [];
let failed = 0;

async function test(name, fn) {
  const t0 = Date.now();
  try { await fn(); results.push(`  ✓ ${name} (${Date.now() - t0} ms)`); }
  catch (e) { failed++; results.push(`  ✗ ${name}\n      ${String(e.message || e).split("\n")[0]}`); }
}
function expect(cond, msg) { if (!cond) throw new Error(msg); }

(async () => {
  await new Promise(r => server.listen(PORT, r));
  const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
  const newCtx = async (opts = {}) => {
    const ctx = await browser.newContext({ viewport: { width: 1366, height: 900 }, ...opts });
    await ctx.route(/^https?:\/\/(?!localhost|127\.0\.0\.1)/, r => r.abort());   // aucune requête vers l'extérieur : tests reproductibles
    return ctx;
  };
  const watch = (page, errs) => {
    page.on("pageerror", e => errs.push("erreur JS : " + e.message));
    page.on("console", m => { if (m.type() === "error" && !/Failed to load resource|net::ERR/.test(m.text())) errs.push("console : " + m.text()); });
  };

  const PAGES = ["index.html", "guides.html", "guides.html?q=frein", "categories.html", "fiches/courroie-lave-linge.html", "fiches/remplacer-prise-electrique.html",
    "categories/electromenager.html", "categories/autres.html", "ajouter.html", "communaute.html", "profil.html", "materiel.html", "entretien.html", "plus.html", "diagnostic.html", "diagnostic.html?s=lave-linge-bruit-essorage", "a-propos.html", "mentions-legales.html", "conditions-utilisation.html", "confidentialite.html", "beta.html", "LesPagesBleues/page-inconnue"];

  /* ---------- 1. Toutes les pages : sans erreur, sans débordement, dans les deux thèmes ---------- */
  for (const [w, h, label] of [[1366, 900, "ordinateur"], [390, 844, "mobile"]]) {
    for (const theme of ["dark", "light"]) {
      await test(`Pages sans erreur ni débordement — ${label}, thème ${theme === "dark" ? "sombre" : "clair"}`, async () => {
        const ctx = await newCtx({ viewport: { width: w, height: h } });
        await ctx.addInitScript(t => localStorage.setItem("lpb-theme", JSON.stringify(t)), theme);
        const problems = [];
        for (const u of PAGES) {
          const p = await ctx.newPage(); const errs = []; watch(p, errs);
          await p.goto(B + u, { waitUntil: "load" });
          await p.waitForTimeout(150);
          const sw = await p.evaluate(() => document.documentElement.scrollWidth);
          if (sw > w + 1) problems.push(`${u} déborde (${sw}px)`);
          if (!(await p.$("h1"))) problems.push(`${u} sans titre h1`);
          errs.forEach(e => problems.push(`${u} : ${e}`));
          await p.close();
        }
        await ctx.close();
        expect(!problems.length, problems.join(" | "));
      });
    }
  }

  await test("Polices hébergées sur le site, aucune requête vers un service tiers", async () => {
    const ctx = await newCtx(); const p = await ctx.newPage(); const outside = [];
    p.on("request", r => { if (!r.url().startsWith(B) && !r.url().startsWith("data:")) outside.push(r.url()); });
    for (const u of ["index.html", "fiches/courroie-lave-linge.html", "categories/jardin.html"]) {
      await p.goto(B + u, { waitUntil: "load" });
      await p.evaluate(() => document.fonts.ready);
      const ok = await p.evaluate(() => document.fonts.check("700 16px Inter") && [...document.fonts].some(f => f.family.replace(/"/g, "") === "Inter" && f.status === "loaded"));
      expect(ok, `${u} : la police Inter n'est pas chargée depuis le site`);
    }
    await ctx.close();
    expect(!outside.length, "requêtes externes : " + outside.slice(0, 3).join(", "));
  });

  /* ---------- 2. Recherche ---------- */
  await test("Suggestions de l'en-tête et navigation au clavier", async () => {
    const ctx = await newCtx(); const p = await ctx.newPage();
    await p.goto(B + "categories.html");
    await p.fill("#header-q", "machine à laver");
    await p.waitForSelector("#header-suggest [role=option]");
    await p.keyboard.press("ArrowDown"); await p.keyboard.press("Enter");
    await p.waitForURL(/fiches\/.+\.html/);
    expect(/lave-linge/i.test(await p.textContent("h1")), "la suggestion doit mener à une fiche lave-linge");
    await ctx.close();
  });
  await test("Page de recherche : onglets, filtres, tri, « voir plus »", async () => {
    const ctx = await newCtx(); const p = await ctx.newPage();
    await p.goto(B + "guides.html?q=lave-linge ne démarre plus");
    expect(/lave-linge qui ne démarre plus/i.test(await p.textContent("#guide-rows .grow h3")), "le premier guide doit être « Lave-linge qui ne démarre plus »");
    await p.click('[data-tab="diag"]');
    expect((await p.$$("#results .grow")).length >= 1, "au moins un diagnostic attendu");
    await p.goto(B + "guides.html");
    const total = (await p.$$("#guide-rows .grow")).length;
    expect(total === 10, "10 résultats avant « voir plus », obtenu " + total);
    await p.click("[data-more]");
    expect((await p.$$("#guide-rows .grow")).length > 10, "« voir plus » doit afficher d'autres résultats");
    expect(await p.isVisible("#domains .domain-tile"), "sans recherche, les domaines sont proposés");
    await p.click("#filters summary");
    await p.selectOption("#f-diff", "Difficile");
    const diffs = await p.$$eval("#results .grow .dots", els => els.map(e => e.getAttribute("aria-label")));
    expect(diffs.length && diffs.every(d => d.includes("Difficile")), "le filtre de difficulté doit s'appliquer");
    await p.selectOption("#f-diff", ""); await p.selectOption("#sort", "duree");
    const [first, shortest] = await p.evaluate(() => {
      const t = document.querySelector("#guide-rows .grow h3").textContent.trim();
      return [(allGuides().find(g => g.title === t) || {}).minutes, Math.min(...allGuides().map(g => g.minutes))];
    });
    expect(first === shortest, `tri par durée : la fiche la plus courte (${shortest} min) doit être en premier, obtenu ${first} min`);
    await p.selectOption("#f-cat", "autres");
    const cats = await p.$$eval("#results .grow .tag-soft", els => els.map(e => e.textContent.trim()));
    const expected = await p.evaluate(() => GUIDES.filter(g => ["mode", "instruments"].includes(g.category)).length);
    expect(cats.length === expected && cats.every(c => /Mode|Musique/.test(c)), `« Autres » doit inclure ses ${expected} fiches de sous-catégories : ` + cats);
    await ctx.close();
  });

  /* ---------- 3. Fiche ---------- */
  await test("Fiche : progression, favori, note, question, « ça a marché »", async () => {
    const ctx = await newCtx(); const p = await ctx.newPage(); const errs = []; watch(p, errs);
    await p.goto(B + "fiches/evier-bouche.html");
    await p.click('.step-item[data-i="0"] .step-check');
    expect((await p.textContent("#pct")).trim() === "17 %", "progression attendue 17 %, obtenu " + await p.textContent("#pct"));
    expect(/Reprendre à l'étape 2/.test(await p.textContent("#coach-label")), "le bouton doit proposer de reprendre à l'étape 2");
    await p.click("#fav");
    expect(await p.evaluate(() => getFavs().size) === 1 && await p.getAttribute("#fav", "aria-pressed") === "true", "la fiche doit passer en favori");
    await p.click("#tab-outils");
    expect(await p.isVisible("#outils") && await p.isHidden("#etapes"), "l'onglet Outils doit n'afficher que les outils");
    await p.keyboard.press("ArrowRight");
    expect(await p.isVisible("#pieces") && await p.evaluate(() => document.activeElement.id) === "tab-pieces", "les flèches du clavier changent d'onglet");
    await p.click("#tab-etapes");
    await p.click('[data-star="4"]');
    expect((await p.$$(".star.on")).length === 4, "4 étoiles attendues");
    await p.fill("#qa-text", "Faut-il couper l'eau pour démonter le siphon ?");
    await p.click("#qa-form button[type=submit]");
    await p.waitForSelector("#qa-list .qa-item");
    await p.click('[data-result="ok"]');
    await p.waitForSelector(".tag-green");
    expect((await p.textContent("#pct")).includes("Terminé"), "« ça a marché » doit terminer la progression");
    await p.reload();
    expect(await p.$eval("#fav", b => b.getAttribute("aria-pressed")) === "true", "le favori doit être mémorisé");
    expect(!errs.length, errs.join(" | "));
    await ctx.close();
  });
  await test("Fiche statique lisible sans JavaScript (référencement)", async () => {
    const ctx = await newCtx({ javaScriptEnabled: false }); const p = await ctx.newPage();
    await p.goto(B + "fiches/plaquettes-frein.html");
    expect((await p.$$(".step-item")).length === 7, "les 7 étapes doivent être dans le HTML");
    expect((await p.textContent(".sources-box")).includes("ATE"), "les sources doivent être dans le HTML");
    const ld = await p.$$eval('script[type="application/ld+json"]', s => s.map(x => JSON.parse(x.textContent)["@type"]));
    expect(ld.includes("HowTo") && ld.includes("BreadcrumbList"), "données structurées HowTo et BreadcrumbList attendues");
    await ctx.close();
  });
  await test("Version imprimable (PDF)", async () => {
    const ctx = await newCtx(); const p = await ctx.newPage();
    await p.goto(B + "fiches/changer-roue.html");
    await p.emulateMedia({ media: "print" });
    expect(await p.$eval(".site-header", e => getComputedStyle(e).display) === "none", "l'en-tête doit être masqué à l'impression");
    expect(await p.$eval(".sources-box", e => getComputedStyle(e).display) !== "none", "les sources doivent rester à l'impression");
    await ctx.close();
  });

  /* ---------- 4. Mode accompagnement ---------- */
  await test("Mode accompagnement : minuteur, pastille, fin, pistes de dépannage", async () => {
    const ctx = await newCtx(); const p = await ctx.newPage(); const errs = []; watch(p, errs);
    await p.goto(B + "fiches/detartrer-cafetiere.html");
    await p.click("#coach-start");
    await p.waitForSelector(".coach");
    await p.click("[data-act=next]"); await p.click("[data-act=next]");
    expect(await p.$(".coach-timer"), "l'étape 2 doit proposer un minuteur");
    await p.click("[data-act=timer-toggle]"); await p.waitForTimeout(1300);
    expect(/^1:5\d$/.test(await p.textContent(".coach-timer [data-timer-display]")), "le minuteur doit décompter");
    await p.click("[data-act=next]");
    expect(!(await p.$eval(".timer-chip", e => e.hidden)), "la pastille du minuteur doit rester visible à l'étape suivante");
    for (let i = 0; i < 6 && !(await p.$("[data-act=ko]")); i++) await p.click("[data-act=next]");
    await p.click("[data-act=ko]");
    expect(await p.$(".coach-trouble"), "« pas encore » doit afficher les pistes");
    await p.keyboard.press("Escape");
    expect(!(await p.$(".coach")), "Échap doit fermer l'accompagnement");
    expect(await p.evaluate(() => document.activeElement.id) === "coach-start", "le focus doit revenir sur le bouton");
    expect(!errs.length, errs.join(" | "));
    await ctx.close();
  });
  await test("Reprise depuis l'accueil", async () => {
    const ctx = await newCtx(); const p = await ctx.newPage();
    await p.goto(B + "fiches/crevaison-velo.html");
    await p.click('.step-item[data-i="0"] .step-check'); await p.click('.step-item[data-i="1"] .step-check');
    await p.goto(B + "index.html");
    expect(await p.isVisible("#resume"), "la section « Reprendre » doit apparaître");
    await p.click(".resume-card");
    await p.waitForSelector(".coach");
    expect((await p.textContent(".coach-kicker")).startsWith("Étape 3"), "l'accompagnement doit reprendre à l'étape 3");
    await ctx.close();
  });

  /* ---------- 5. Diagnostic guidé ---------- */
  await test("Diagnostic : description libre → questions → causes probables → guide recommandé", async () => {
    const ctx = await newCtx(); const p = await ctx.newPage(); const errs = []; watch(p, errs);
    await p.goto(B + "diagnostic.html");
    expect((await p.textContent("h1")).includes("Quel est le problème"), "titre du diagnostic");
    await p.fill("#symptom", "ma voiture ne démarre plus, j'entends juste un clic");
    await p.click("#describe button[type=submit]");
    expect(/Question 1 sur 4/.test(await p.textContent(".q-progress")), "une question à la fois, avec la progression");
    for (const a of ["oui", "oui", "non", "oui"]) await p.click(`[data-answer="${a}"]`);
    await p.waitForSelector(".hyp");
    expect((await p.textContent("h1")).includes("Voici ce que nous avons trouvé"), "titre des résultats");
    expect(/Batterie/i.test(await p.textContent(".hyp h2")), "la batterie doit arriver en tête");
    expect(/Probabilité/.test(await p.textContent(".hyp-prob")) && await p.isVisible(".advice"), "probabilité et conseil attendus");
    await p.click("[data-prev]");
    expect(/Question 4 sur 4/.test(await p.textContent(".q-progress")), "« Modifier mes réponses » ramène à la dernière question");
    await p.click('[data-answer="oui"]');
    await p.click("#reco-guide");
    await p.waitForURL(/voiture-ne-demarre-plus/);
    await p.goto(B + "diagnostic.html");
    await p.fill("#symptom", "ma machine à coudre fait des nœuds");
    await p.click("#describe button[type=submit]");
    expect(/ne connaissons pas encore/.test(await p.textContent("#diag-root")), "une panne inconnue doit être signalée honnêtement");
    await p.goto(B + "diagnostic.html");
    await p.click('[data-device="Lave-linge"]');
    await p.click('[data-diag="lave-linge-bruit-essorage"]');
    for (const a of ["non", "oui", "non", "oui"]) await p.click(`[data-answer="${a}"]`);
    expect(/Amortisseurs/.test(await p.textContent(".hyp h2")), "l'exemple du document (claquement + rebond) doit donner les amortisseurs");
    expect(!errs.length, errs.join(" | "));
    await ctx.close();
  });
  await test("Accueil : description du problème → diagnostic ; quatre choix ; navigation", async () => {
    const ctx = await newCtx({ viewport: { width: 390, height: 844 } }); const p = await ctx.newPage(); const errs = []; watch(p, errs);
    await p.goto(B + "index.html");
    const cards = await p.$$eval(".action-card .ac-kicker", k => k.map(x => x.textContent.trim().split(/\s/)[0].toLowerCase()));
    expect(cards.join() === "réparer,entretenir,mon,explorer", "quatre choix attendus : " + cards);
    const tabs = await p.$$eval(".tabbar a", a => a.map(x => x.textContent.trim()));
    expect(tabs.join() === "Accueil,Diagnostic,Guides,Matériel,Plus", "barre de navigation : " + tabs);
    await p.fill("#hero-q", "Mon lave-linge fait beaucoup de bruit");
    await Promise.all([p.waitForNavigation(), p.press("#hero-q", "Enter")]);
    expect(/diagnostic\.html/.test(p.url()) && /lave-linge/i.test(await p.textContent("#diag-root")), "la description mène au diagnostic du lave-linge");
    await p.goto(B + "materiel.html");
    expect((await p.textContent(".tabbar a.active")).trim() === "Matériel", "l'onglet actif doit être Matériel");
    expect(!errs.length, errs.join(" | "));
    await ctx.close();
  });
  await test("Plus : thème automatique, clair ou sombre, mémorisé", async () => {
    const ctx = await newCtx(); const p = await ctx.newPage();
    await p.goto(B + "plus.html");
    expect(await p.getAttribute('[data-theme-choice="auto"]', "aria-checked") === "true", "automatique par défaut");
    await p.click('[data-theme-choice="dark"]');
    expect(await p.evaluate(() => document.documentElement.dataset.theme) === "dark", "le thème sombre doit s'appliquer");
    await p.goto(B + "guides.html");
    expect(await p.evaluate(() => document.documentElement.dataset.theme) === "dark" && await p.evaluate(() => getComputedStyle(document.body).backgroundColor) === "rgb(10, 20, 38)", "le choix doit être mémorisé");
    await p.goto(B + "plus.html");
    await p.click('[data-theme-choice="auto"]');
    expect(await p.evaluate(() => !document.documentElement.dataset.theme && localStorage.getItem("lpb-theme") === null), "automatique : aucun thème imposé");
    await ctx.close();
  });

  /* ---------- 6. Contribution ---------- */
  await test("Contribution en 4 étapes avec photo, puis modification et suppression", async () => {
    const ctx = await newCtx(); const p = await ctx.newPage(); const errs = []; watch(p, errs);
    await p.goto(B + "ajouter.html");
    await p.click("#next");
    expect(await p.isVisible("#err-title"), "le titre est obligatoire");
    await p.fill('[name="title"]', "Changer la pile d'une montre");
    await p.fill('[name="minutes"]', "75");
    await p.click("#next");
    await p.fill(".step-title >> nth=0", "Ouvrir le fond");
    await p.fill(".step-title >> nth=1", "Remplacer la pile");
    await p.fill(".step-timer >> nth=1", "2");
    await p.click('.step-edit[data-i="1"] [data-move="-1"]');
    expect(await p.inputValue(".step-title >> nth=0") === "Remplacer la pile", "les étapes doivent pouvoir être réordonnées");
    await p.reload();
    expect(await p.inputValue('[name="title"]') === "Changer la pile d'une montre", "le brouillon doit être restauré");
    await p.click("#next"); await p.click("#next");
    await p.setInputFiles("#ph-cover", path.join(__dirname, "..", "assets/img/icon-512.png"));
    await p.waitForSelector('.photo-slot img');
    await p.click("#next");
    await p.click("#next");
    expect(await p.isVisible("#err-checks"), "les cases de publication sont obligatoires");
    await p.check("#ok-safety"); await p.check("#ok-own");
    await p.click("#next");
    await p.waitForURL(/guide\.html\?id=/);
    expect(/1 h 15/.test(await p.textContent(".guide-facts")), "durée 1 h 15 attendue");
    expect(await p.$eval(".guide-photo img", i => i.src.startsWith("data:image/jpeg")), "la photo doit être compressée en JPEG");
    expect(/non relue/i.test(await p.textContent(".guide-tags")), "une fiche perso doit être marquée « non relue »");
    await p.goto(B + "guides.html?q=montre");
    expect(/montre/i.test(await p.textContent(".grow h3")), "la fiche doit être trouvée par la recherche");
    await p.click(".grow");
    p.once("dialog", d => d.accept());
    await p.click("#delete");
    await p.waitForURL(/profil\.html/);
    expect(!errs.length, errs.join(" | "));
    await ctx.close();
  });

  /* ---------- 7. Communauté et profil ---------- */
  await test("Communauté : question, réponse, retour de réparateur, signalement d'erreur", async () => {
    const ctx = await newCtx(); const p = await ctx.newPage(); const errs = []; watch(p, errs);
    await p.goto(B + "communaute.html");
    await p.click("#new-post");
    await p.fill("#p-title", "Mon lave-linge fait un bruit de claquement à l'essorage");
    await p.click("#post-form button[type=submit]");
    await p.fill(".reply-form input", "Vérifiez d'abord le filtre de vidange !");
    await p.click(".reply-form button[type=submit]");
    await p.waitForSelector(".reply");
    await p.click('[data-new="intervention"] >> nth=0');
    await p.click('[data-type="intervention"]');
    await p.fill("#p-title", "Whirlpool qui claque à l'essorage");
    await p.fill("#p-symptom", "claque à l'essorage"); await p.fill("#p-cause", "amortisseurs HS"); await p.fill("#p-fix", "remplacement des deux amortisseurs");
    await p.click("#post-form button[type=submit]");
    await p.click('[data-tab="intervention"]');
    expect((await p.$$(".post .intervention")).length === 1, "le retour de réparateur doit s'afficher");
    await p.goto(B + "communaute.html?ask=1&type=erreur&guide=changer-roue");
    expect(/Correction proposée/.test(await p.inputValue("#p-title")), "le signalement d'erreur doit être prérempli");
    expect(!errs.length, errs.join(" | "));
    await ctx.close();
  });
  await test("Profil : pseudo, badges, export et effacement des données", async () => {
    const ctx = await newCtx({ acceptDownloads: true }); const p = await ctx.newPage();
    await p.goto(B + "fiches/ampoule-phare.html");
    await p.click('[data-result="ok"]');
    await p.goto(B + "profil.html");
    await p.click("#edit-profile");
    await p.fill("#pf-name", "Morgane Mécano");
    await Promise.all([p.waitForNavigation(), p.click("#prof-form button[type=submit]")]);
    expect((await p.textContent("h1")).includes("Morgane Mécano"), "le pseudo doit s'afficher");
    expect(/MM/.test(await p.textContent(".site-header")), "les initiales doivent apparaître dans l'en-tête");
    await p.click('[data-tab="badges"]');
    expect((await p.$$(".badge-card.earned")).length >= 2, "les badges « Premier pas » et « Réparateur » doivent être obtenus");
    await p.click('[data-tab="data"]');
    const [dl] = await Promise.all([p.waitForEvent("download"), p.click("#export")]);
    const json = JSON.parse(fs.readFileSync(await dl.path(), "utf8"));
    expect(json.app === "Les Pages Bleues" && json.data["lpb-profile"], "l'export doit contenir le profil");
    p.once("dialog", d => d.accept());
    await Promise.all([p.waitForNavigation(), p.click("#wipe")]);
    expect((await p.textContent("h1")).includes("anonyme"), "l'effacement doit réinitialiser le profil");
    await ctx.close();
  });

  await test("Mon matériel : lave-linge LG 2020 et Audi A3 2012 → fiches dédiées, diagnostic, filtre", async () => {
    const ctx = await newCtx(); const p = await ctx.newPage();
    const errs = []; watch(p, errs);
    await p.goto(B + "materiel.html");
    expect((await p.textContent("h1")).includes("Mon matériel") && (await p.textContent("main")).includes("Vos appareils, véhicules et objets en un seul endroit."), "titre et sous-titre de la liste");
    await Promise.all([p.waitForNavigation(), p.click('a[href="materiel.html?ajouter=1"]')]);
    await p.goto(B + "materiel.html?type=lave-linge");
    expect(await p.inputValue("#m-type") === "lave-linge", "le type passé dans l'adresse doit être présélectionné");
    expect(await p.$$eval("#brand-list option", o => o.some(x => x.value === "LG")), "LG doit être proposé pour les lave-linge");
    await p.fill("#m-brand", "lg");
    await p.dispatchEvent("#m-brand", "input");
    await p.waitForFunction(() => /plaque signalétique/.test(document.getElementById("model-hint").textContent), null, { timeout: 15000 });
    await p.fill("#m-year", "2020");
    await Promise.all([p.waitForNavigation(), p.click("#mat-form [type=submit]")]);
    expect((await p.textContent("h1")) === "Lave-linge LG", "après l'ajout, la page du matériel s'ouvre");
    const nWasher = parseInt(await p.textContent(".mat-count"), 10);
    await p.goto(B + "materiel.html?kind=voiture");
    await p.click("#mat-form [type=submit]");
    expect(!(await p.isHidden("#mat-err")), "une voiture sans marque doit être refusée");
    await p.selectOption("#m-make", "Audi");
    const a3 = await p.$$eval("#m-car option", o => o.find(x => x.textContent === "A3").value);
    await p.selectOption("#m-car", a3);
    await p.fill("#m-year", "2012");
    await Promise.all([p.waitForNavigation(), p.click("#mat-form [type=submit]")]);
    const nCar = parseInt(await p.textContent(".mat-count"), 10);
    const expected = await p.evaluate(() => [GUIDES.filter(g => g.category === "automobile" && !(g.devices || []).length).length, GUIDES.filter(g => (g.devices || []).includes("lave-linge")).length]);
    expect([nCar, nWasher].join() === expected.join(), `nombre de fiches : ${[nCar, nWasher]} au lieu de ${expected}`);
    await p.goto(B + "materiel.html");
    const names = await p.$$eval(".mat-row .mat-name", h => h.map(x => x.textContent));
    expect(names.join("|") === "Audi A3|Lave-linge LG", "les deux matériels doivent être listés : " + names.join("|"));
    const ids = await p.evaluate(() => loadMateriel().map(m => m.id));
    await p.goto(B + "guides.html?materiel=" + ids[1]);
    const shown = await p.$$eval("#guide-rows .grow h3", h => h.map(x => x.textContent));
    expect(shown.length === expected[1] && shown.every(t => /lave-linge/i.test(t)), "le filtre doit n'afficher que les fiches du lave-linge : " + shown.join(" / "));
    await p.goto(B + "fiches/courroie-lave-linge.html");
    expect((await p.textContent(".guide-tags")).includes("Pour votre lave-linge LG"), "la fiche doit indiquer qu'elle concerne l'appareil");
    await p.goto(B + "diagnostic.html?d=Lave-linge");
    expect((await p.textContent("#diag-root")).includes("Lave-linge : quel est le problème"), "le diagnostic doit partir de l'appareil");
    await p.goto(B + "index.html");
    expect(/^2/.test(await p.textContent("#home-mat-count")), "l'accueil doit indiquer le nombre de matériels");
    await p.goto(B + "materiel.html?id=" + ids[0]);
    await p.click(`[data-del="${ids[0]}"]`);
    await Promise.all([p.waitForNavigation(), p.click("#confirm-del")]);
    expect((await p.$$(".mat-row")).length === 1, "la suppression doit retirer la voiture");
    expect(!errs.length, errs.join(" | "));
    await ctx.close();
  });

  await test("Mon matériel : smartphone et console (modèles proposés), moto → fiches dédiées", async () => {
    const ctx = await newCtx(); const p = await ctx.newPage();
    const errs = []; watch(p, errs);
    await p.goto(B + "materiel.html?type=smartphone");
    await p.waitForFunction(() => /connu/.test(document.getElementById("model-hint").textContent), null, { timeout: 15000 });
    await p.fill("#m-model", "galaxy s2");
    await p.dispatchEvent("#m-model", "input");
    const first = await p.$$eval("#model-list option", o => o.find(x => x.label === "Samsung").value);
    await p.fill("#m-model", first);
    await p.dispatchEvent("#m-model", "input");
    expect(await p.inputValue("#m-brand") === "Samsung", "choisir un modèle Samsung sans marque doit remplir la marque : " + await p.inputValue("#m-brand"));
    await p.goto(B + "materiel.html?cat=loisirs");
    expect(await p.inputValue("#m-domain") === "loisirs", "le domaine passé dans l'adresse doit être présélectionné");
    await p.selectOption("#m-type", "console");
    await p.fill("#m-brand", "sony");
    await p.dispatchEvent("#m-brand", "input");
    expect(await p.$$eval("#model-list option", o => o.some(x => x.value === "PlayStation 5")), "les modèles de consoles Sony doivent être proposés");
    await p.fill("#m-model", "PlayStation 5");
    await Promise.all([p.waitForNavigation(), p.click("#mat-form [type=submit]")]);
    const nConsole = parseInt(await p.textContent(".mat-count"), 10);
    await p.goto(B + "materiel.html?ajouter=1");
    await p.click('[data-kind="moto"]');
    await p.selectOption("#m-make", "Yamaha");
    const mt = await p.$$eval("#m-car option", o => o.find(x => x.textContent.startsWith("MT-07"))?.value);
    expect(mt, "le MT-07 de Yamaha doit être proposé");
    await p.selectOption("#m-car", mt);
    await Promise.all([p.waitForNavigation(), p.click("#mat-form [type=submit]")]);
    const nMoto = parseInt(await p.textContent(".mat-count"), 10);
    await p.goto(B + "materiel.html");
    const names = await p.$$eval(".mat-row .mat-name", h => h.map(x => x.textContent));
    expect(names[0].startsWith("Yamaha MT-07") && names[1] === "Console de jeux Sony", "matériels enregistrés : " + names.join(" | "));
    const expected = await p.evaluate(() => [GUIDES.filter(g => g.category === "moto").length, GUIDES.filter(g => (g.devices || []).includes("console")).length]);
    expect([nMoto, nConsole].join() === expected.join(), `fiches : ${[nMoto, nConsole]} au lieu de ${expected}`);
    expect(!errs.length, errs.join(" | "));
    await ctx.close();
  });

  await test("Bêta : avis enregistré, bonus réparation sur une fiche, fin de vie sur un domaine", async () => {
    const ctx = await newCtx(); const p = await ctx.newPage();
    const errs = []; watch(p, errs);
    await p.goto(B + "beta.html");
    await p.click("#beta-form [type=submit]");
    expect(!(await p.isHidden("#beta-err")), "un avis vide doit être refusé");
    await p.check('#beta-form input[name="note"][value="4"]');
    await p.fill('#beta-form textarea[name="moins"]', "Il manque une fiche pour mon grille-pain");
    await p.click("#beta-form [type=submit]");
    const saved = await p.evaluate(() => JSON.parse(localStorage.getItem("lpb-beta-avis")));
    expect(saved.length === 1 && saved[0].note === "4" && /grille-pain/.test(saved[0].moins), "l'avis doit être gardé sur l'appareil");
    expect((await p.textContent("#beta-sent")).includes("grille-pain"), "l'avis enregistré doit s'afficher");
    expect(await p.isVisible(".beta-pill"), "le badge Bêta doit être visible dans l'en-tête");
    await p.goto(B + "fiches/courroie-lave-linge.html");
    const bonus = await p.textContent(".bonus-box");
    expect(/50 €/.test(bonus) && /QualiRépar/.test(bonus), "la fiche lave-linge doit annoncer le bonus réparation de 50 € : " + bonus);
    expect((await p.textContent(".licence-note")).includes("CC BY-SA 4.0"), "la fiche doit indiquer sa licence");
    await p.goto(B + "categories/electromenager.html");
    expect((await p.textContent(".eol-card")).includes("un pour un"), "le domaine doit expliquer quoi faire d'un appareil irréparable");
    await p.goto(B + "categories/automobile.html");
    expect(!(await p.$(".eol-card")), "pas de bloc appareils électriques pour l'automobile");
    expect(!errs.length, errs.join(" | "));
    await ctx.close();
  });

  await test("Carnet d'entretien : plan adapté, saisie, contrôle défaillant, prévision au kilomètre, lien depuis une fiche", async () => {
    const ctx = await newCtx(); const p = await ctx.newPage();
    const errs = []; watch(p, errs);
    await p.goto(B + "materiel.html");
    await p.evaluate(() => {
      const d = n => new Date(Date.now() - n * 864e5).toISOString().slice(0, 10);
      localStorage.setItem("lpb-materiel", JSON.stringify([{ kind: "moto", type: "moto", typeName: "Moto", category: "automobile", icon: "moto", brand: "Yamaha", model: "MT-07", id: "m1" }]));
      localStorage.setItem("lpb-carnet-m1", JSON.stringify({ log: [{ id: "a", date: d(30), kind: "compteur", km: 10000 }] }));
    });
    await p.goto(B + "materiel.html?id=m1");
    await Promise.all([p.waitForNavigation(), p.click(".mat-carnet")]);
    expect((await p.textContent("h1")).includes("Yamaha MT-07"), "titre du carnet");
    expect(await p.$('[data-log-task="graissage-chaine"]'), "le graissage de chaîne doit être proposé");
    await p.selectOption('[data-setting="transmission"]', "cardan");
    expect(!(await p.$('[data-log-task="graissage-chaine"]')), "pas de graissage de chaîne sur une transmission à cardan");
    await p.selectOption('[data-setting="transmission"]', "chaine");
    // relevé de compteur aujourd'hui : 300 km en 30 jours → 10 km/jour
    await p.click("[data-odometer]"); await p.fill("#o-km", "10300"); await p.click("#odo-form [type=submit]");
    await p.click('[data-log-task="graissage-chaine"]'); await p.fill("#e-cost", "12"); await p.click("#entry-form [type=submit]");
    const txt = await p.$eval('[data-log-task="graissage-chaine"]', b => b.closest(".task").innerText);
    expect(/à 10\s?800 km/.test(txt) && /dans 2 mois/.test(txt), "prochaine échéance prévue avec la moyenne de roulage : " + txt.replace(/\s+/g, " "));
    await p.click('[data-log-task="pression-pneus"]'); await p.check('[name=e-state][value=defaillant]'); await p.fill("#e-note", "Pneu arrière sous-gonflé");
    await p.click("#entry-form [type=submit]");
    expect((await p.textContent(".overview-counts")).includes("1 défaillant"), "le contrôle défaillant doit apparaître dans la vue d'ensemble");
    expect((await p.$$(".log-entry")).length === 4, "historique : 4 entrées attendues");
    expect((await p.textContent(".cstats")).includes("12 €"), "statistiques : coût total");
    await p.goto(B + "index.html");
    expect((await p.textContent("#home-due")).includes("Pression des pneus"), "l'accueil doit signaler le contrôle défaillant");
    await p.goto(B + "entretien.html");
    expect((await p.textContent("#h-todo")).includes("À faire") && (await p.textContent("#entretien-root")).includes("Pression des pneus"), "la page Entretien doit classer le contrôle défaillant dans « À faire »");
    await Promise.all([p.waitForNavigation(), p.click('#entretien-root a[href*="task=pression-pneus"]')]);
    expect(await p.$("#entry-form"), "depuis Entretien, la saisie de l'entretien doit s'ouvrir");
    await p.goto(B + "fiches/entretien-chaine-moto.html");
    await p.click('[data-result="ok"]');
    await Promise.all([p.waitForNavigation(), p.click('a[href*="carnet.html?id=m1&fiche=entretien-chaine-moto"]')]);
    expect(await p.$("#entry-form"), "depuis la fiche, la saisie de l'intervention doit s'ouvrir");
    expect(!errs.length, errs.join(" | "));
    await ctx.close();
  });

  await test("Page d'introduction d'un domaine : présentation, équipements, pannes, précautions", async () => {
    const ctx = await newCtx(); const p = await ctx.newPage();
    const errs = []; watch(p, errs);
    await p.goto(B + "categories/automobile.html");
    expect((await p.textContent("h1")).trim() === "Auto / Moto", "titre du domaine");
    expect((await p.$$(".guide-rows, main .rows .grow")).length === 0, "la page d'intro ne doit plus lister les fiches");
    const tiles = await p.$$eval(".type-tile strong", t => t.map(x => x.textContent));
    expect(tiles.join() === "Voiture,Moto", "tuiles Voiture et Moto : " + tiles);
    expect((await p.$$(".diag-links li")).length > 0 && (await p.$$(".check-list li")).length > 0, "pannes fréquentes et précautions attendues");
    await Promise.all([p.waitForNavigation(), p.click(".type-tile >> text=Moto")]);
    const n = await p.evaluate(() => GUIDES.filter(g => g.category === "moto").length);
    expect((await p.$$("#guide-rows .grow")).length === n, "le lien Moto doit filtrer les fiches moto");
    await p.goto(B + "categories/jardin.html");
    expect((await p.$$(".type-tile")).length >= 5, "le domaine Jardin doit présenter ses équipements");
    expect(!errs.length, errs.join(" | "));
    await ctx.close();
  });

  /* ---------- 8. Hors ligne ---------- */
  await test("Mode hors ligne (service worker)", async () => {
    const ctx = await newCtx(); const p = await ctx.newPage();
    await p.goto(B + "index.html");
    await p.evaluate(() => navigator.serviceWorker.ready);
    await p.goto(B + "fiches/robinet-qui-fuit.html");
    await p.waitForTimeout(300);
    await ctx.setOffline(true);
    await p.reload();
    expect(/robinet/i.test(await p.textContent("h1")), "la fiche visitée doit s'afficher hors ligne");
    await ctx.setOffline(false);
    await ctx.close();
  });

  /* ---------- 9. Accessibilité (axe-core) ---------- */
  await test("Accessibilité : aucune violation grave, titres dans l'ordre (axe-core)", async () => {
    const axe = fs.readFileSync(require.resolve("axe-core/axe.min.js"), "utf8");
    const problems = [];
    for (const theme of ["dark", "light"]) {
      const ctx = await newCtx();
      await ctx.addInitScript(t => localStorage.setItem("lpb-theme", JSON.stringify(t)), theme);
      for (const u of ["index.html", "guides.html?q=frein", "fiches/courroie-lave-linge.html", "diagnostic.html", "ajouter.html", "communaute.html", "profil.html", "materiel.html", "materiel.html?ajouter=1", "entretien.html", "plus.html", "carnet.html", "categories.html", "categories/jardin.html", "a-propos.html"]) {
        const p = await ctx.newPage();
        await p.goto(B + u, { waitUntil: "load" });
        await p.addScriptTag({ content: axe });
        const res = await p.evaluate(async () => (await axe.run(document, { resultTypes: ["violations"] })).violations
          .filter(v => ["serious", "critical"].includes(v.impact) || v.id === "heading-order").map(v => `${v.id} (${v.nodes.length}) : ${v.nodes[0].target.join(" ")}`));
        res.forEach(r => problems.push(`${theme} ${u} — ${r}`));
        await p.close();
      }
      await ctx.close();
    }
    expect(!problems.length, problems.slice(0, 20).join(" | ") + (problems.length > 20 ? ` … (${problems.length})` : ""));
  });

  await test("Pas de saut de mise en page au chargement (CLS < 0,1)", async () => {
    const problems = [];
    for (const [w, h] of [[412, 823], [1366, 900]]) {
      const ctx = await newCtx({ viewport: { width: w, height: h } });
      await ctx.addInitScript(() => {
        window.__cls = 0;
        new PerformanceObserver(l => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__cls += e.value; }).observe({ type: "layout-shift", buffered: true });
      });
      for (const u of ["index.html", "guides.html", "guides.html?q=frein", "categories.html", "diagnostic.html", "materiel.html", "plus.html", "profil.html", "communaute.html", "fiches/deboucher-toilettes.html"]) {
        const p = await ctx.newPage();
        await p.goto(B + u, { waitUntil: "load" });
        await p.waitForTimeout(600);
        const cls = await p.evaluate(() => window.__cls);
        if (cls >= 0.1) problems.push(`${u} en ${w}px : ${cls.toFixed(3)}`);
        await p.close();
      }
      await ctx.close();
    }
    expect(!problems.length, problems.join(" | "));
  });

  await browser.close();
  server.close();
  console.log(`\nTests de bout en bout — ${results.length - failed}/${results.length} réussis\n` + results.join("\n"));
  process.exit(failed ? 1 : 0);
})().catch(e => { console.error(e); server.close(); process.exit(1); });
