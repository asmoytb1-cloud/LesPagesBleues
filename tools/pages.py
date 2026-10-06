"""Génère les pages HTML du site à partir d'un gabarit commun (en-tête <head>, scripts).
Usage : python3 tools/pages.py   (à relancer après modification d'un gabarit ci-dessous)"""
import pathlib
ROOT = pathlib.Path(__file__).resolve().parent.parent
SITE = "https://asmoytb1-cloud.github.io/LesPagesBleues/"

# Thème : automatique (réglage du téléphone) sauf choix explicite, appliqué avant l'affichage (pas de flash)
THEME_JS = ('(function(){try{var t=JSON.parse(localStorage.getItem("lpb-theme"));if(t==="light"||t==="dark"){'
            'document.documentElement.dataset.theme=t;var c=t==="dark"?"#0a1426":"#f4f7fb";'
            'document.querySelectorAll(\'meta[name="theme-color"]\').forEach(function(m){m.setAttribute("content",c)})}}catch(e){}})()')

HEAD = """<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>{title}</title>
  <meta name="description" content="{desc}">
  <meta name="color-scheme" content="light dark">
  <meta name="theme-color" content="#f4f7fb" media="(prefers-color-scheme: light)">
  <meta name="theme-color" content="#0a1426" media="(prefers-color-scheme: dark)">
  <script>{theme}</script>
  <link rel="icon" href="assets/img/favicon.svg" type="image/svg+xml">
  <link rel="manifest" href="manifest.webmanifest">
  <link rel="apple-touch-icon" href="assets/img/icon-180.png">
  <link rel="canonical" href="{site}{path}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Les Pages Bleues">
  <meta property="og:title" content="{title}">
  <meta property="og:description" content="{desc}">
  <meta property="og:image" content="{site}assets/img/og-image.png">
  <meta property="og:locale" content="fr_FR">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="preload" href="assets/fonts/inter-latin.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
  <header id="site-header"></header>
  <main id="main" tabindex="-1">
{body}
  </main>
  <footer id="site-footer"></footer>

  <script src="assets/js/data.js"></script>
  <script src="assets/js/common.js"></script>
{scripts}
</body>
</html>
"""

def arrow():
    return '<span data-icon="arrow"></span>'

PAGES = {}

PAGES["index.html"] = dict(
  title="Les Pages Bleues — Réparer. Comprendre. Transmettre.",
  desc="Réparer, entretenir et faire durer vos objets : décrivez votre problème, Les Pages Bleues vous aident à trouver la solution. Guides vérifiés pas à pas, diagnostic simple, carnet d'entretien.",
  scripts=["entretien-data.js", "carnet-core.js", "home.js"], active="accueil",
  body="""    <section class="home">
      <div class="narrow home-inner">
        <p class="home-hello"><span id="hello">Bonjour</span> <span aria-hidden="true">👋</span></p>
        <h1 class="home-title">Que voulez-vous faire aujourd'hui&nbsp;?</h1>
        <p class="home-sub">On vous aide à réparer, entretenir et faire durer vos objets.</p>
        <div class="search-wrap home-search">
          <form class="search-bar search-xl" action="diagnostic.html" role="search">
            <span data-icon="search"></span>
            <input type="search" name="q" id="hero-q" placeholder="Décrivez votre problème…" aria-label="Décrivez votre problème" autocomplete="off" enterkeyhint="search"
                   role="combobox" aria-autocomplete="list" aria-expanded="false" aria-controls="hero-suggest">
            <button class="btn btn-primary" type="submit" aria-label="Analyser mon problème"><span data-icon="arrow"></span></button>
          </form>
          <div class="suggest-box" id="hero-suggest" role="listbox" aria-label="Fiches suggérées" hidden></div>
        </div>
        <p class="home-example">Par exemple : <a href="diagnostic.html?q=Mon%20lave-linge%20fait%20beaucoup%20de%20bruit">« Mon lave-linge fait beaucoup de bruit »</a></p>
        <nav class="action-grid" aria-label="Que voulez-vous faire ?">
          <a class="action-card ac-repair" href="diagnostic.html"><span class="tile-ico"><span data-icon="wrench"></span></span><span class="ac-kicker">Réparer</span><span class="ac-title">J'ai un problème</span><span data-icon="chevron"></span></a>
          <a class="action-card ac-care" href="entretien.html"><span class="tile-ico"><span data-icon="calendar"></span></span><span class="ac-kicker">Entretenir</span><span class="ac-title">Éviter les pannes</span><span data-icon="chevron"></span></a>
          <a class="action-card ac-stuff" href="materiel.html"><span class="tile-ico"><span data-icon="box"></span></span><span class="ac-kicker">Mon matériel <span class="ac-count" id="home-mat-count" hidden></span></span><span class="ac-title">Mes appareils et véhicules</span><span data-icon="chevron"></span></a>
          <a class="action-card ac-explore" href="guides.html"><span class="tile-ico"><span data-icon="book"></span></span><span class="ac-kicker">Explorer</span><span class="ac-title">Tous les guides</span><span data-icon="chevron"></span></a>
        </nav>
        <div class="home-more" id="home-more"></div>
      </div>
    </section>""")

PAGES["guides.html"] = dict(
  title="Guides de réparation et d'entretien — Les Pages Bleues",
  desc="Tous les guides des Pages Bleues : cherchez un objet ou une panne, parcourez les domaines, filtrez par difficulté et par durée.",
  scripts=["diagnostics-data.js", "materiel-data.js", "guides.js"], active="guides",
  body="""    <section class="page-hero">
      <div class="container">
        <h1 id="page-title">Guides</h1>
        <p id="page-sub">Cherchez un objet ou une panne, ou parcourez les domaines.</p>
        <form class="search-bar explore-search" id="search-form" role="search">
          <span data-icon="search"></span>
          <input type="search" name="q" id="q" placeholder="Ex. : lave-linge, pneu, fuite…" aria-label="Rechercher un guide ou une panne" autocomplete="off" enterkeyhint="search">
          <button class="btn btn-primary" type="submit"><span data-icon="search"></span><span>Rechercher</span></button>
        </form>
      </div>
    </section>
    <section class="section section-tight">
      <div class="container">
        <div id="domains"></div><!-- /domains -->
        <div class="tabs" role="tablist" id="tabs" aria-label="Type de résultats"></div>
        <script>(function(){var s=location.search;document.getElementById("tabs").hidden=!/[?&]q=[^&]/.test(s);document.getElementById("domains").hidden=/[?&](q|materiel|type|fav|cat|diff|time)=[^&]/.test(s)})()</script>
        <div class="list-tools">
          <p class="result-count" id="count" aria-live="polite"></p>
        </div>
        <details class="filters" id="filters">
          <summary><span data-icon="filter"></span>Filtrer et trier<span data-icon="chevron"></span></summary>
          <div class="filterbar" id="filterbar">
            <div class="field"><label for="f-cat">Domaine</label><select id="f-cat" class="input input-sm"></select></div>
            <div class="field"><label for="f-diff">Difficulté</label>
              <select id="f-diff" class="input input-sm"><option value="">Toutes</option><option>Facile</option><option>Moyen</option><option>Difficile</option></select></div>
            <div class="field"><label for="f-time">Durée</label>
              <select id="f-time" class="input input-sm"><option value="">Toutes</option><option value="20">20 min ou moins</option><option value="45">45 min ou moins</option><option value="90">1 h 30 ou moins</option></select></div>
            <div class="field"><label for="sort">Trier par</label>
              <select id="sort" class="input input-sm">
                <option value="pertinence">Pertinence</option>
                <option value="duree">Les plus rapides</option>
                <option value="facile">Les plus faciles</option>
                <option value="economie">Plus grosse économie</option>
                <option value="az">A → Z</option>
              </select></div>
            <button class="chip" id="fav-toggle" type="button" aria-pressed="false"><span data-icon="heart"></span> Mes favoris</button>
          </div>
        </details>
        <div id="results"></div>
        <div class="ask-band">
          <span data-icon="chat"></span>
          <div><strong>Vous ne trouvez pas ?</strong><small>Décrivez votre problème : on cherche la cause avec vous. Ou demandez à la communauté.</small></div>
          <div class="btns">
            <a class="btn btn-primary" id="ask-diag" href="diagnostic.html">Décrire mon problème</a>
            <a class="btn btn-ghost" id="ask-q" href="communaute.html?ask=1">Poser une question</a>
          </div>
        </div>
      </div>
    </section>""")

PAGES["categories.html"] = dict(
  title="Tous les domaines de réparation — Les Pages Bleues",
  desc="Les domaines des Pages Bleues : automobile et moto, électroménager, téléphonie, maison, vélo, jardin, loisirs, mode et instruments.",
  scripts=["categories.js"], active="categories",
  body="""    <section class="page-hero">
      <div class="container">
        <h1>Domaines</h1>
        <p>Choisissez un domaine : ses équipements, ses pannes fréquentes et ses fiches.</p>
      </div>
    </section>
    <section class="section section-tight">
      <div class="container">
        <div class="cat-list-grid" id="cat-main"></div>
      </div>
    </section>""")

PAGES["guide.html"] = dict(
  title="Guide de réparation — Les Pages Bleues",
  desc="Guide de réparation pas à pas, avec mode accompagnement.",
  scripts=["guide-view.js", "guide.js"], active="guides",
  body="""    <div id="guide"></div>""")

PAGES["ajouter.html"] = dict(
  title="Ajouter une fiche — Les Pages Bleues",
  desc="Transmettez votre savoir-faire : rédigez une fiche de réparation en quatre étapes.",
  scripts=["ajouter.js"], active="ajouter",
  body="""    <section class="page-hero">
      <div class="container">
        <h1>Ajouter une fiche</h1>
        <p>Transmettez une réparation que vous savez faire, en quatre étapes.</p>
      </div>
    </section>
    <section class="section">
      <div class="container" id="add-root"></div>
    </section>""")

PAGES["communaute.html"] = dict(
  title="La communauté — Les Pages Bleues",
  desc="Questions, astuces et retours de réparateurs : la communauté des Pages Bleues s'entraide pour réparer au quotidien.",
  scripts=["communaute.js"], active="communaute",
  body="""    <section class="page-hero">
      <div class="container page-hero-row">
        <div>
          <h1>Communauté</h1>
          <p>Questions, astuces et retours de réparateurs : on s'entraide pour réparer.</p>
        </div>
        <button class="btn btn-primary btn-lg" id="new-post" type="button"><span data-icon="plus"></span>Poser une question</button>
      </div>
    </section>
    <section class="section">
      <div class="container two-cols">
        <div>
          <div class="tabs" role="tablist" id="post-tabs" aria-label="Type de message"></div>
          <h2 class="sr-only">Discussions</h2>
          <div class="post-list" id="posts" style="margin-top:16px"></div>
        </div>
        <aside class="community-side" id="community-side"></aside>
      </div>
    </section>""")

PAGES["profil.html"] = dict(
  title="Mon profil — Les Pages Bleues",
  desc="Vos fiches, vos réparations, vos favoris et vos badges sur Les Pages Bleues.",
  scripts=["profil.js"], active="profil",
  body="""    <section class="page-hero">
      <div class="container" id="profile-head"></div>
    </section>
    <section class="section">
      <div class="container" id="profile-body"></div>
    </section>""")

PAGES["materiel.html"] = dict(
  title="Mon matériel — Les Pages Bleues",
  desc="Vos appareils, véhicules et objets en un seul endroit : les fiches qui les concernent, leur carnet d'entretien et un diagnostic adapté.",
  scripts=["materiel-data.js", "entretien-data.js", "carnet-core.js", "materiel.js"], active="materiel",
  body="""    <section class="section section-tight">
      <div class="narrow" id="materiel-root"></div>
    </section>""")

PAGES["carnet.html"] = dict(
  title="Carnet d'entretien — Les Pages Bleues",
  desc="Le carnet d'entretien de votre matériel : entretiens et contrôles à venir, historique avec factures, prévision selon votre kilométrage.",
  scripts=["materiel-data.js", "entretien-data.js", "carnet-core.js", "carnet.js"], active="materiel",
  body="""    <div id="carnet-root"></div>""")

PAGES["diagnostic.html"] = dict(
  title="Diagnostic : quel est le problème ? — Les Pages Bleues",
  desc="Décrivez ce qui se passe : quelques questions simples, les causes les plus probables, puis le guide qui convient.",
  scripts=["diagnostics-data.js", "diagnostic.js"], active="diagnostic",
  body="""    <section class="diag">
      <div class="narrow" id="diag-root"></div>
      <noscript><div class="narrow"><h1 class="diag-title">Quel est le problème ?</h1><p class="diag-sub">Le diagnostic a besoin de JavaScript. Vous pouvez aussi <a href="guides.html">parcourir les guides</a>.</p></div></noscript>
    </section>""")

PAGES["entretien.html"] = dict(
  title="Entretien : vos prochains entretiens — Les Pages Bleues",
  desc="Les entretiens à faire, bientôt et à venir pour tout votre matériel, d'après ses carnets d'entretien.",
  scripts=["entretien-data.js", "carnet-core.js", "entretien.js"], active="entretien",
  body="""    <section class="page-hero">
      <div class="narrow">
        <h1>Entretien</h1>
        <p>Vos prochains entretiens à venir.</p>
      </div>
    </section>
    <section class="section section-tight">
      <div class="narrow" id="entretien-root"></div>
    </section>""")

PAGES["plus.html"] = dict(
  title="Plus — Les Pages Bleues",
  desc="Votre suivi, la communauté, les réglages et les informations sur Les Pages Bleues.",
  scripts=["plus.js"], active="plus",
  body="""    <section class="page-hero">
      <div class="narrow">
        <h1>Plus</h1>
        <p>Votre suivi, la communauté et les réglages.</p>
      </div>
    </section>
    <section class="section section-tight">
      <div class="narrow plus-groups">
        <section aria-labelledby="g-suivi">
          <h2 class="lgroup-title" id="g-suivi">Mon suivi</h2>
          <ul class="lgroup">
            <li><a class="lrow" href="entretien.html"><span class="tile-ico tint-green"><span data-icon="calendar"></span></span><span class="lrow-text"><strong>Carnet d'entretien</strong><small>Vos prochains entretiens à venir</small></span><span data-icon="chevron"></span></a></li>
            <li><a class="lrow" href="guides.html?fav=1"><span class="tile-ico tint-red"><span data-icon="heart"></span></span><span class="lrow-text"><strong>Mes favoris</strong><small id="plus-favs">Les fiches gardées sous la main, même sans réseau</small></span><span data-icon="chevron"></span></a></li>
            <li><a class="lrow" href="profil.html?tab=repairs"><span class="tile-ico"><span data-icon="wrench"></span></span><span class="lrow-text"><strong>Mes réparations</strong><small id="plus-repairs">En cours et réussies</small></span><span data-icon="chevron"></span></a></li>
            <li><a class="lrow" href="profil.html"><span class="tile-ico tint-slate"><span data-icon="user"></span></span><span class="lrow-text"><strong>Mon profil</strong><small>Pseudo, fiches publiées et badges</small></span><span data-icon="chevron"></span></a></li>
          </ul>
        </section>
        <section aria-labelledby="g-participer">
          <h2 class="lgroup-title" id="g-participer">Participer</h2>
          <ul class="lgroup">
            <li><a class="lrow" href="communaute.html"><span class="tile-ico"><span data-icon="users"></span></span><span class="lrow-text"><strong>Communauté</strong><small>Questions, astuces et retours de réparateurs</small></span><span data-icon="chevron"></span></a></li>
            <li><a class="lrow" href="ajouter.html"><span class="tile-ico"><span data-icon="plus"></span></span><span class="lrow-text"><strong>Ajouter une fiche</strong><small>Transmettre une réparation que vous savez faire</small></span><span data-icon="chevron"></span></a></li>
            <li><a class="lrow" href="beta.html"><span class="tile-ico"><span data-icon="chat"></span></span><span class="lrow-text"><strong>Donner mon avis sur la bêta</strong><small>Ce qui marche, ce qui manque</small></span><span data-icon="chevron"></span></a></li>
          </ul>
        </section>
        <section aria-labelledby="g-reglages">
          <h2 class="lgroup-title" id="g-reglages">Réglages</h2>
          <div class="lgroup">
            <div class="theme-row">
              <span class="tile-ico tint-slate"><span data-icon="contrast"></span></span>
              <span class="lrow-text"><strong id="theme-label">Apparence</strong><small>« Automatique » suit le réglage de votre appareil.</small></span>
              <div class="seg" role="radiogroup" aria-labelledby="theme-label" id="theme-choice">
                <button type="button" role="radio" data-theme-choice="auto" aria-checked="true">Automatique</button>
                <button type="button" role="radio" data-theme-choice="light" aria-checked="false">Clair</button>
                <button type="button" role="radio" data-theme-choice="dark" aria-checked="false">Sombre</button>
              </div>
            </div>
            <a class="lrow" href="profil.html?tab=data"><span class="tile-ico tint-slate"><span data-icon="shield"></span></span><span class="lrow-text"><strong>Mes données</strong><small>Tout reste sur cet appareil : exporter, importer ou effacer</small></span><span data-icon="chevron"></span></a>
          </div>
        </section>
        <section aria-labelledby="g-apropos">
          <h2 class="lgroup-title" id="g-apropos">À propos</h2>
          <ul class="lgroup">
            <li><a class="lrow" href="a-propos.html"><span class="tile-ico tint-slate"><span data-icon="info"></span></span><span class="lrow-text"><strong>À propos des Pages Bleues</strong><small>La mission, la méthode, les crédits</small></span><span data-icon="chevron"></span></a></li>
            <li><a class="lrow" href="a-propos.html#verification"><span class="tile-ico tint-slate"><span data-icon="check"></span></span><span class="lrow-text"><strong>Comment on vérifie les fiches</strong><small>Sources citées, relecture</small></span><span data-icon="chevron"></span></a></li>
            <li><a class="lrow" href="mentions-legales.html"><span class="tile-ico tint-slate"><span data-icon="doc"></span></span><span class="lrow-text"><strong>Mentions légales</strong></span><span data-icon="chevron"></span></a></li>
            <li><a class="lrow" href="conditions-utilisation.html"><span class="tile-ico tint-slate"><span data-icon="doc"></span></span><span class="lrow-text"><strong>Conditions d'utilisation</strong></span><span data-icon="chevron"></span></a></li>
            <li><a class="lrow" href="confidentialite.html"><span class="tile-ico tint-slate"><span data-icon="lock"></span></span><span class="lrow-text"><strong>Confidentialité</strong><small>Aucune donnée envoyée, aucun cookie</small></span><span data-icon="chevron"></span></a></li>
          </ul>
        </section>
        <p class="plus-foot">Les Pages Bleues · version bêta · Réparer. Comprendre. Transmettre.</p>
      </div>
    </section>""")

PAGES["a-propos.html"] = dict(
  title="À propos des Pages Bleues — mission, vérification, crédits",
  desc="La mission des Pages Bleues, notre méthode de vérification des fiches, où trouver un réparateur et les crédits des photos.",
  scripts=["apropos.js"], active="apropos",
  body="""    <section class="page-hero">
      <div class="container">
        <h1>À propos des Pages Bleues</h1>
        <p>Donner à chacun les moyens de réparer ses objets, gratuitement.</p>
      </div>
    </section>
    <section class="section">
      <div class="narrow prose" id="about"></div>
    </section>""")

PAGES["mentions-legales.html"] = dict(
  title="Mentions légales — Les Pages Bleues",
  desc="Mentions légales du site Les Pages Bleues : éditeur, hébergement, propriété intellectuelle, contact.",
  scripts=[], active="legal",
  body="""    <section class="page-hero">
      <div class="container"><h1>Mentions légales</h1></div>
    </section>
    <section class="section">
      <div class="narrow prose">
        <h2>Éditeur</h2>
        <p>Les Pages Bleues est édité à titre non commercial par <strong>Matthis Hache</strong>, particulier.<br>
        Directeur de la publication : Matthis Hache.<br>
        Contact : <a href="mailto:matthis.hache@hotmail.fr">matthis.hache@hotmail.fr</a> — ou le lien « Signaler » présent sur chaque fiche.</p>
        <h2>Hébergement</h2>
        <p>Pendant la bêta privée, Les Pages Bleues est une application installée par son éditeur sur ses propres appareils : le site n'est pas encore hébergé en ligne.</p>
        <div class="notice"><span data-icon="alert"></span><p>Avant toute mise en ligne publique, cette page indiquera l'hébergeur (nom, adresse, téléphone) et les coordonnées complètes de l'éditeur exigées par l'article 1-1 de la loi n° 2004-575 du 21 juin 2004.</p></div>
        <h2>Contenus et responsabilité</h2>
        <p>Les fiches sont fournies à titre informatif. Chaque fiche indique les sources consultées pour sa vérification. Toute réparation se fait sous la responsabilité de la personne qui l'entreprend : en cas de doute, notamment pour l'électricité, le gaz, les freins ou les appareils sous garantie, faites appel à un professionnel. Voir aussi les <a href="conditions-utilisation.html">conditions d'utilisation</a>.</p>
        <h2>Propriété intellectuelle</h2>
        <p>Les textes des fiches sont rédigés par Les Pages Bleues et diffusés sous licence <a href="conditions-utilisation.html#licence">Creative Commons BY-SA 4.0</a>. Les photos proviennent de banques d'images sous licences libres ; leurs auteurs et licences sont listés dans la page <a href="a-propos.html#credits">À propos</a>.</p>
        <p>Les noms de marques et de modèles cités (fabricants, enseignes, sites consultés comme sources) appartiennent à leurs titulaires. Ils sont mentionnés uniquement pour identifier un appareil ou une source ; Les Pages Bleues n'est affilié à aucun d'eux.</p>
        <h2>Signaler un contenu</h2>
        <p>Pour signaler une erreur ou un contenu qui vous paraît illicite (atteinte à vos droits, contenu dangereux…), utilisez le lien « Signaler une erreur » de la fiche ou écrivez-nous. La procédure est décrite dans les <a href="conditions-utilisation.html#signaler">conditions d'utilisation</a>.</p>
      </div>
    </section>""")

PAGES["conditions-utilisation.html"] = dict(
  title="Conditions d'utilisation — Les Pages Bleues",
  desc="Conditions d'utilisation des Pages Bleues : service gratuit en bêta, responsabilité, contributions, licence des contenus, signalement.",
  scripts=[], active="legal",
  body="""    <section class="page-hero">
      <div class="container"><h1>Conditions d'utilisation</h1><p>Les règles du jeu, en clair. Version du 5 octobre 2026.</p></div>
    </section>
    <section class="section">
      <div class="narrow prose">
        <h2>1. Le service</h2>
        <p>Les Pages Bleues est une encyclopédie gratuite de l'entretien et de la réparation, accessible sans inscription. Le site est en <strong>version bêta</strong> : il évolue souvent, certaines fonctions peuvent changer ou être interrompues, et nous comptons sur vos retours pour l'améliorer (<a href="beta.html">donner mon avis</a>). Utiliser le site vaut acceptation des présentes conditions.</p>

        <h2>2. Fiches et sécurité</h2>
        <p>Les fiches donnent des repères généraux vérifiés à partir des sources qu'elles citent. Elles ne remplacent ni la notice de votre appareil, ni l'avis d'un professionnel. Avant toute intervention, lisez les précautions de la fiche ; en cas de doute (électricité, gaz, freins, batteries, appareil sous garantie), faites appel à un professionnel. Ouvrir un appareil peut faire perdre sa garantie.</p>
        <p>Vous réalisez les réparations sous votre propre responsabilité. Les Pages Bleues met tout en œuvre pour que les fiches soient exactes, mais ne peut garantir qu'elles conviennent à chaque appareil.</p>

        <h2>3. Vos contributions</h2>
        <p>Pendant la bêta, les fiches, questions, retours et photos que vous rédigez restent <strong>enregistrés sur votre appareil</strong> : ils ne sont pas publiés ni transmis. Quand le partage entre utilisateurs ouvrira, ces règles s'appliqueront à tout ce que vous publierez :</p>
        <ul>
          <li><strong>Rédigez avec vos mots et vos photos.</strong> Ne copiez pas les textes, photos, schémas ou vidéos d'autres sites (sites de réparation, fabricants, notices, forums, vidéos…), même en partie, même en les traduisant. Vous pouvez vous en inspirer pour vérifier une information : citez-les alors comme source, avec un lien.</li>
          <li><strong>Vous garantissez</strong> être l'auteur de votre contribution et disposer des droits sur vos photos, et que celles-ci ne montrent pas de personnes reconnaissables sans leur accord.</li>
          <li><strong>Licence.</strong> En publiant, vous acceptez que votre contribution soit diffusée sous licence <a href="https://creativecommons.org/licenses/by-sa/4.0/deed.fr" rel="noopener" target="_blank">CC BY-SA 4.0</a>, comme le reste de l'encyclopédie : chacun pourra la lire, la corriger et la partager en citant son origine.</li>
          <li><strong>Restez prudent et respectueux.</strong> Pas de contenu dangereux, trompeur, injurieux, publicitaire ou contraire à la loi.</li>
        </ul>
        <p>Les contributions publiées pourront être relues, corrigées ou retirées par la modération si elles ne respectent pas ces règles ; leur auteur en sera informé avec la raison de la décision.</p>

        <h2 id="licence">4. Licence des contenus</h2>
        <p>Sauf mention contraire, les textes des Pages Bleues sont diffusés sous licence <a href="https://creativecommons.org/licenses/by-sa/4.0/deed.fr" rel="noopener" target="_blank">Creative Commons Attribution – Partage dans les mêmes conditions 4.0 International (CC BY-SA 4.0)</a>. Vous pouvez les réutiliser à condition de citer « Les Pages Bleues » avec un lien vers la fiche, d'indiquer vos modifications et de partager vos versions sous la même licence.</p>
        <p>Ne sont pas couverts par cette licence : les photos (chacune a sa propre licence, voir les <a href="a-propos.html#credits">crédits</a>), les logos et le nom « Les Pages Bleues », ni les noms de marques cités, qui appartiennent à leurs titulaires et ne sont mentionnés que pour identifier un appareil ou une source.</p>

        <h2 id="signaler">5. Signaler une erreur ou un contenu illicite</h2>
        <p>Chaque fiche comporte un lien « Signaler une erreur ou proposer une amélioration ». Pour un contenu qui vous paraît illicite (par exemple une copie de votre travail), indiquez l'adresse de la page, ce qui pose problème et pourquoi, et vos coordonnées. Nous examinons chaque signalement rapidement, retirons ou corrigeons le contenu si nécessaire et vous tenons informé de la décision.</p>

        <h2>6. Données personnelles</h2>
        <p>Voir la page <a href="confidentialite.html">Confidentialité</a>. En bref : pendant la bêta, vos données restent sur votre appareil.</p>

        <h2>7. Droit applicable</h2>
        <p>Les présentes conditions sont régies par le droit français. Elles peuvent évoluer, notamment à l'ouverture des comptes ; la date de version figure en haut de la page.</p>
      </div>
    </section>""")

PAGES["confidentialite.html"] = dict(
  title="Confidentialité — Les Pages Bleues",
  desc="Comment Les Pages Bleues traite vos données : tout reste sur votre appareil.",
  scripts=[], active="legal",
  body="""    <section class="page-hero">
      <div class="container"><h1>Confidentialité</h1><p>En bref : vos données restent sur votre appareil.</p></div>
    </section>
    <section class="section">
      <div class="narrow prose">
        <h2>Ce que le site enregistre</h2>
        <p>Pendant la bêta, Les Pages Bleues n'a ni compte utilisateur ni serveur de données. Tout ce que vous faites sur le site est enregistré <strong>uniquement dans votre navigateur</strong> (stockage local) :</p>
        <ul>
          <li>vos favoris et la progression de vos réparations ;</li>
          <li>votre matériel et ses carnets d'entretien (dates, kilométrages, factures en photo) ;</li>
          <li>les fiches, questions, retours d'expérience et avis sur la bêta que vous rédigez, ainsi que leurs photos ;</li>
          <li>votre pseudo et vos préférences (thème, lecture à voix haute).</li>
        </ul>
        <p>Ces informations ne sont envoyées à personne. Vous pouvez les exporter ou les effacer à tout moment depuis <a href="profil.html">votre profil</a>, ou en effaçant les données du site dans votre navigateur. Si vous choisissez d'envoyer votre avis sur la bêta par e-mail, seul ce que vous écrivez dans le message nous parvient.</p>
        <h2>Cookies et mesure d'audience</h2>
        <p>Le site n'utilise ni cookie, ni outil de mesure d'audience, ni publicité.</p>
        <h2>Services tiers</h2>
        <p>Les polices de caractères sont hébergées sur le site lui-même : aucune requête n'est envoyée à Google Fonts ni à un autre service tiers pendant la navigation. Les liens vers d'autres sites (sources, réparateurs) ne s'ouvrent que si vous cliquez dessus. Les commandes vocales du mode accompagnement utilisent la reconnaissance vocale de votre navigateur, qui peut s'appuyer sur un service en ligne de son éditeur.</p>
        <p class="muted">Cette page sera complétée avant l'ouverture des comptes et du partage entre utilisateurs (données collectées, durée de conservation, vos droits et la façon de les exercer).</p>
      </div>
    </section>""")

PAGES["beta.html"] = dict(
  title="Bêta ouverte — Les Pages Bleues",
  desc="Les Pages Bleues est en bêta ouverte et gratuite : ce qui marche déjà, ce qui arrive, et comment nous aider en donnant votre avis.",
  scripts=["beta.js"], active="beta",
  body="""    <section class="page-hero">
      <div class="container"><h1>Bêta ouverte</h1><p>Gratuite, sans inscription. Testez, cassez, dites-nous tout.</p></div>
    </section>
    <section class="section">
      <div class="narrow prose" id="beta-root"></div>
    </section>""")

PAGES["404.html"] = dict(
  title="Page introuvable — Les Pages Bleues",
  desc="Cette page n'existe pas.",
  scripts=[], active="",
  body="""    <section class="page-404">
      <div class="narrow">
        <span data-logo></span>
        <h1>Page introuvable</h1>
        <p>Cette page n'existe pas, ou elle a changé d'adresse.</p>
        <div class="empty-actions">
          <a class="btn btn-primary" href="index.html">Retour à l'accueil</a>
          <a class="btn btn-ghost" href="guides.html">Voir les guides</a>
        </div>
      </div>
    </section>""")

def build():
    for name, p in PAGES.items():
        scripts = "\n".join(f'  <script src="assets/js/{s}"></script>' for s in p["scripts"])
        if not p["scripts"]:
            scripts = f'  <script>renderHeader("{p.get("active","")}"); renderFooter(); hydrateIcons();</script>'
        path = "" if name == "index.html" else name
        html = HEAD.format(title=p["title"], desc=p["desc"], body=p["body"].replace("ARROW", arrow()), scripts=scripts, site=SITE, path=path, theme=THEME_JS)
        if name == "404.html":
            # la page 404 peut être servie depuis n'importe quel dossier : chemins absolus depuis la racine du dépôt
            html = html.replace('<script>renderHeader', '<script>window.LPB_ROOT = "/LesPagesBleues/";</script>\n  <script>renderHeader')
            for a in ['href="assets/', 'src="assets/', 'href="manifest', 'href="index.html"', 'href="guides.html"']:
                html = html.replace(a, a[:a.index('"') + 1] + "/LesPagesBleues/" + a[a.index('"') + 1:])
        (ROOT / name).write_text(html, encoding="utf-8")
        print("écrit", name)

if __name__ == "__main__":
    build()
