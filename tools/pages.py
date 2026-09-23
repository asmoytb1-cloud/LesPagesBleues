"""Génère les pages HTML du site à partir d'un gabarit commun (en-tête <head>, scripts).
Usage : python3 tools/pages.py   (à relancer après modification d'un gabarit ci-dessous)"""
import pathlib
ROOT = pathlib.Path(__file__).resolve().parent.parent
SITE = "https://asmoytb1-cloud.github.io/LesPagesBleues/"

HEAD = """<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>{title}</title>
  <meta name="description" content="{desc}">
  <meta name="theme-color" content="#050b18">
  <script>(function(){{try{{var t=JSON.parse(localStorage.getItem("lpb-theme"));if(t)document.documentElement.dataset.theme=t}}catch(e){{}}}})()</script>
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
  desc="L'encyclopédie collaborative de la réparation, en français : guides vérifiés pas à pas, diagnostic guidé et mode accompagnement pour réparer au lieu de jeter.",
  scripts=["home.js"],
  body="""    <section class="hero theme-dark">
      <img class="hero-photo" src="assets/img/photos/hero.webp" alt="" fetchpriority="high">
      <div class="container hero-inner">
        <div>
          <h1>Réparer.<span class="accent">Comprendre.</span>Transmettre.</h1>
          <p class="hero-lead">L'encyclopédie collaborative des réparations. Des guides concrets, vérifiés, écrits pour ceux qui n'ont jamais tenu un tournevis.</p>
          <div class="search-wrap">
            <form class="search-bar" action="guides.html" role="search">
              <span data-icon="search"></span>
              <input type="search" name="q" id="hero-q" placeholder="Quel est votre souci aujourd'hui ?" aria-label="Quel est votre souci aujourd'hui ?" autocomplete="off"
                     role="combobox" aria-autocomplete="list" aria-expanded="false" aria-controls="hero-suggest">
              <button class="btn btn-primary" type="submit"><span data-icon="search"></span><span>Rechercher</span></button>
            </form>
            <div class="suggest-box" id="hero-suggest" role="listbox" aria-label="Fiches suggérées" hidden></div>
          </div>
          <div class="suggestions">
            <span>Essayez :</span>
            <a class="chip" href="guides.html?q=lave-linge">Lave-linge</a>
            <a class="chip" href="guides.html?q=voiture">Voiture</a>
            <a class="chip" href="guides.html?q=smartphone">Smartphone</a>
            <a class="chip" href="guides.html?q=tondeuse">Tondeuse</a>
            <a class="chip" href="guides.html?q=fuite">Fuite d'eau</a>
            <a class="chip" href="guides.html?q=vélo">Vélo</a>
          </div>
        </div>
        <div class="hero-side">
          <p class="handwritten">Le savoir<br>pour réparer<br>dure plus longtemps.</p>
          <a class="hero-card" href="diagnostic.html">
            <span data-icon="leaf"></span>
            <span><strong>Réparer, pas remplacer.</strong><small>Pas sûr de la panne ? Lancez le diagnostic guidé.</small></span>
            <span class="round-btn"><span data-icon="chevron"></span></span>
          </a>
        </div>
      </div>
      <div class="container benefits">
        <div class="benefit"><span data-icon="wrench"></span><div><strong>Guides pas à pas</strong><small>Simples et détaillés</small></div></div>
        <div class="benefit"><span data-icon="shield"></span><div><strong>Informations vérifiées</strong><small>Sources citées dans chaque fiche</small></div></div>
        <div class="benefit"><span data-icon="users"></span><div><strong>Une communauté ouverte</strong><small>Passionnés et professionnels</small></div></div>
        <div class="benefit"><span data-icon="leaf"></span><div><strong>Moins de déchets</strong><small>Pour une planète plus durable</small></div></div>
      </div>
    </section>

    <section class="section section-tight" id="resume" hidden>
      <div class="container">
        <div class="section-head"><h2>Reprendre ma <span class="accent">réparation</span></h2></div>
        <div class="resume-list" id="resume-list"></div>
      </div>
    </section>

    <section class="section" id="categories">
      <div class="container">
        <div class="section-head">
          <h2>Choisissez un <span class="accent">domaine</span></h2>
          <a class="link-arrow" href="categories.html">Voir tous les domaines ARROW</a>
        </div>
        <div class="cat-grid" id="cat-grid"></div>
        <div class="stats" id="stats"></div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head">
          <h2>Problème <span class="accent">du moment</span></h2>
          <a class="link-arrow" href="guides.html">Tous les guides ARROW</a>
        </div>
        <div class="carousel" id="carousel">
          <button class="carousel-btn prev" type="button" aria-label="Guides précédents"><span data-icon="chevronLeft"></span></button>
          <div class="carousel-track" id="popular" tabindex="0" aria-label="Guides populaires"></div>
          <button class="carousel-btn next" type="button" aria-label="Guides suivants"><span data-icon="chevron"></span></button>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head">
          <h2>Comment <span class="accent">ça marche ?</span></h2>
          <a class="link-arrow" href="a-propos.html">Découvrir en détail ARROW</a>
        </div>
        <ol class="how">
          <li><span class="how-ico"><span data-icon="search"></span></span><div><strong><b>1.</b> Recherchez</strong><small>Décrivez votre panne ou votre objet, ou lancez le diagnostic guidé.</small></div></li>
          <li><span class="how-ico"><span data-icon="doc"></span></span><div><strong><b>2.</b> Suivez</strong><small>Des étapes claires, avec les outils, les pièces et la sécurité.</small></div></li>
          <li><span class="how-ico"><span data-icon="wrench"></span></span><div><strong><b>3.</b> Réparez</strong><small>Le mode accompagnement vous guide, une étape à la fois.</small></div></li>
          <li><span class="how-ico"><span data-icon="users"></span></span><div><strong><b>4.</b> Partagez</strong><small>Ajoutez vos astuces et vos réparations pour aider les autres.</small></div></li>
        </ol>
      </div>
    </section>

    <section class="section section-tight">
      <div class="container">
        <div class="diag-band">
          <span class="diag-band-ico"><span data-icon="stethoscope"></span></span>
          <div>
            <h2>Vous ne savez pas ce qui est en panne ?</h2>
            <p>Décrivez le symptôme : le diagnostic guidé vous pose quelques questions, classe les causes possibles et vous oriente vers la bonne fiche… ou vers un réparateur.</p>
          </div>
          <a class="btn btn-primary btn-lg" href="diagnostic.html"><span data-icon="play"></span>Lancer le diagnostic</a>
        </div>
      </div>
    </section>

    <section class="join theme-dark">
      <img class="join-photo" src="assets/img/photos/terre.webp" alt="" loading="lazy">
      <div class="container join-inner">
        <div>
          <h2>Un monde qui se <strong>répare</strong><br>va plus loin.</h2>
          <a class="btn btn-primary btn-lg" href="communaute.html" style="margin-top:1.4rem">Rejoindre la communauté</a>
        </div>
        <div class="join-card">
          <h3>Rejoignez <span class="accent">Les Pages Bleues</span></h3>
          <p>Partagez vos connaissances, posez vos questions, aidez d'autres personnes à réparer et faites vivre le savoir-faire.</p>
          <div class="join-perks">
            <span><span data-icon="wrench"></span>Gratuit</span>
            <span><span data-icon="shield"></span>Sans publicité intrusive</span>
            <span><span data-icon="user"></span>Ouvert à tous</span>
          </div>
        </div>
      </div>
    </section>""")

PAGES["guides.html"] = dict(
  title="Rechercher un guide de réparation — Les Pages Bleues",
  desc="Tous les guides de réparation des Pages Bleues : recherchez une panne ou un objet, filtrez par domaine, difficulté et durée.",
  scripts=["diagnostics-data.js", "guides.js"], active="guides",
  body="""    <section class="page-hero search-page">
      <div class="container">
        <h1 id="page-title">Tous les <span class="accent">guides</span></h1>
        <p>Cherchez un objet ou une panne, puis affinez par domaine, difficulté ou durée.</p>
        <form class="search-bar" id="search-form" role="search" style="margin-top:1.2rem">
          <span data-icon="search"></span>
          <input type="search" name="q" id="q" placeholder="Ex. : lave-linge ne démarre plus" aria-label="Rechercher un guide ou une panne" autocomplete="off">
          <button class="btn btn-primary" type="submit"><span data-icon="search"></span><span>Rechercher</span></button>
        </form>
        <div class="tabs" role="tablist" id="tabs" aria-label="Type de résultats"></div>
      </div>
    </section>
    <section class="section section-tight">
      <div class="container">
        <div class="filterbar" id="filterbar">
          <label class="sr-only" for="f-cat">Domaine</label>
          <select id="f-cat" class="input input-sm"></select>
          <label class="sr-only" for="f-diff">Difficulté</label>
          <select id="f-diff" class="input input-sm">
            <option value="">Toutes difficultés</option><option>Facile</option><option>Moyen</option><option>Difficile</option>
          </select>
          <label class="sr-only" for="f-time">Durée</label>
          <select id="f-time" class="input input-sm">
            <option value="">Toutes durées</option><option value="20">20 min ou moins</option><option value="45">45 min ou moins</option><option value="90">1 h 30 ou moins</option>
          </select>
          <button class="chip" id="fav-toggle" type="button" aria-pressed="false"><span data-icon="heart"></span> Mes favoris</button>
          <label class="sort"><span data-icon="sort"></span><span class="sr-only">Trier</span>
            <select id="sort" class="input input-sm">
              <option value="pertinence">Pertinence</option>
              <option value="duree">Les plus rapides</option>
              <option value="facile">Les plus faciles</option>
              <option value="economie">Plus grosse économie</option>
              <option value="az">A → Z</option>
            </select>
          </label>
        </div>
        <p class="result-count muted" id="count" aria-live="polite"></p>
        <div id="results"></div>
        <div class="ask-band">
          <span data-icon="chat"></span>
          <div><strong>Vous ne trouvez pas la solution ?</strong><small>Le diagnostic guidé vous aide à trouver la cause, ou posez votre question à la communauté.</small></div>
          <div class="btns">
            <a class="btn btn-ghost" id="ask-diag" href="diagnostic.html">Diagnostic guidé</a>
            <a class="btn btn-primary" id="ask-q" href="communaute.html?ask=1">Poser une question</a>
          </div>
        </div>
      </div>
    </section>""")

PAGES["categories.html"] = dict(
  title="Toutes les catégories de réparation — Les Pages Bleues",
  desc="Explorez les domaines de réparation : automobile, électroménager, téléphonie, maison, vélo, jardin, loisirs, mode et instruments.",
  scripts=["categories.js"], active="categories",
  body="""    <section class="page-hero">
      <div class="container">
        <h1>Toutes les <span class="accent">catégories</span></h1>
        <p>Explorez nos domaines de réparation.</p>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="cat-big-grid" id="cat-main"></div>
        <div class="section-head" style="margin-top:36px"><h2>Autres catégories</h2></div>
        <div class="cat-small-grid" id="cat-other"></div>
        <div class="earth-band">
          <img src="assets/img/photos/terre.webp" alt="" loading="lazy">
          <div><span data-icon="leaf"></span><span>Réparer aujourd'hui,<br>un demain plus durable.</span></div>
        </div>
      </div>
    </section>""")

PAGES["guide.html"] = dict(
  title="Guide de réparation — Les Pages Bleues",
  desc="Guide de réparation pas à pas, avec mode accompagnement.",
  scripts=["guide-view.js", "guide.js"], active="guides",
  body="""    <div id="guide"></div>""")

PAGES["ajouter.html"] = dict(
  title="Partager un guide — Les Pages Bleues",
  desc="Transmettez votre savoir-faire : rédigez une fiche de réparation en quatre étapes.",
  scripts=["ajouter.js"], active="ajouter",
  body="""    <section class="page-hero">
      <div class="container">
        <h1>Partager un <span class="accent">guide</span></h1>
        <p>Transmettez votre savoir-faire à la communauté, en quatre étapes.</p>
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
          <h1>La <span class="accent">communauté</span></h1>
          <p>Des passionnés et des professionnels qui s'entraident au quotidien.</p>
        </div>
        <button class="btn btn-primary btn-lg" id="new-post" type="button"><span data-icon="plus"></span>Poser une question</button>
      </div>
    </section>
    <section class="section">
      <div class="container two-cols">
        <div>
          <div class="tabs" role="tablist" id="post-tabs" aria-label="Type de message" style="margin-top:0"></div>
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

PAGES["diagnostic.html"] = dict(
  title="Diagnostic guidé : trouver ce qui est en panne — Les Pages Bleues",
  desc="Décrivez le symptôme : le diagnostic guidé pose quelques questions, classe les causes possibles et vous oriente vers la bonne réparation.",
  scripts=["diagnostics-data.js", "diagnostic.js"], active="diagnostic",
  body="""    <section class="page-hero">
      <div class="container">
        <h1>Diagnostic <span class="accent">guidé</span></h1>
        <p>« Qu'est-ce qui est en panne ? » Décrivez le symptôme, on cherche la cause ensemble.</p>
      </div>
    </section>
    <section class="section">
      <div class="container diag-shell">
        <div class="chat" id="chat" aria-live="polite"></div>
        <aside id="diag-side"></aside>
      </div>
    </section>""")

PAGES["a-propos.html"] = dict(
  title="À propos des Pages Bleues — mission, vérification, crédits",
  desc="La mission des Pages Bleues, notre méthode de vérification des fiches, où trouver un réparateur et les crédits des photos.",
  scripts=["apropos.js"], active="",
  body="""    <section class="page-hero">
      <div class="container">
        <h1>À propos des <span class="accent">Pages Bleues</span></h1>
        <p>Donner à chacun les moyens de réparer ses objets, gratuitement.</p>
      </div>
    </section>
    <section class="section">
      <div class="narrow prose" id="about"></div>
    </section>""")

PAGES["mentions-legales.html"] = dict(
  title="Mentions légales — Les Pages Bleues",
  desc="Mentions légales du site Les Pages Bleues.",
  scripts=[], active="",
  body="""    <section class="page-hero">
      <div class="container"><h1>Mentions <span class="accent">légales</span></h1></div>
    </section>
    <section class="section">
      <div class="narrow prose">
        <div class="notice notice-warn"><span data-icon="alert"></span><p>Page à compléter avant la mise en ligne publique : les informations marquées « à compléter » dépendent de l'éditeur du site.</p></div>
        <h2>Éditeur du site</h2>
        <p>Nom ou raison sociale : <span class="todo">à compléter</span><br>Adresse : <span class="todo">à compléter</span><br>Adresse e-mail de contact : <span class="todo">à compléter</span><br>Directeur de la publication : <span class="todo">à compléter</span></p>
        <h2>Hébergement</h2>
        <p>Le site est prévu pour être hébergé par GitHub Pages, service de GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, États-Unis. <span class="todo">à confirmer selon l'hébergeur retenu</span></p>
        <h2>Contenus et responsabilité</h2>
        <p>Les fiches sont fournies à titre informatif. Chaque fiche indique les sources consultées pour sa vérification. Toute réparation se fait sous la responsabilité de la personne qui l'entreprend : en cas de doute, notamment pour l'électricité, le gaz, les freins ou les appareils sous garantie, faites appel à un professionnel.</p>
        <h2>Propriété intellectuelle</h2>
        <p>Les photos proviennent de banques d'images sous licences libres (domaine public, CC0 ou Creative Commons Attribution) ; leurs auteurs et licences sont listés dans la page <a href="a-propos.html#credits">À propos</a>.</p>
      </div>
    </section>""")

PAGES["confidentialite.html"] = dict(
  title="Confidentialité — Les Pages Bleues",
  desc="Comment Les Pages Bleues traite vos données : tout reste sur votre appareil.",
  scripts=[], active="",
  body="""    <section class="page-hero">
      <div class="container"><h1><span class="accent">Confidentialité</span></h1><p>En bref : vos données restent sur votre appareil.</p></div>
    </section>
    <section class="section">
      <div class="narrow prose">
        <h2>Ce que le site enregistre</h2>
        <p>Pour l'instant, Les Pages Bleues n'a ni compte utilisateur ni serveur de données. Tout ce que vous faites sur le site est enregistré <strong>uniquement dans votre navigateur</strong> (stockage local) :</p>
        <ul>
          <li>vos favoris et la progression de vos réparations ;</li>
          <li>les fiches, questions et retours d'expérience que vous rédigez, ainsi que leurs photos ;</li>
          <li>votre pseudo, vos préférences (thème, lecture à voix haute) et vos avis sur les fiches.</li>
        </ul>
        <p>Ces informations ne sont envoyées à personne. Vous pouvez les exporter ou les effacer à tout moment depuis <a href="profil.html">votre profil</a>, ou en effaçant les données du site dans votre navigateur.</p>
        <h2>Cookies et mesure d'audience</h2>
        <p>Le site n'utilise ni cookie publicitaire ni outil de mesure d'audience.</p>
        <h2>Services tiers</h2>
        <p>Les polices de caractères sont hébergées sur le site lui-même : aucune requête n'est envoyée à Google Fonts ni à un autre service tiers pendant la navigation. Les commandes vocales du mode accompagnement utilisent la reconnaissance vocale de votre navigateur, qui peut s'appuyer sur un service en ligne de son éditeur.</p>
        <p class="muted">Cette page évoluera à l'ouverture des comptes utilisateurs.</p>
      </div>
    </section>""")

PAGES["404.html"] = dict(
  title="Page introuvable — Les Pages Bleues",
  desc="Cette page n'existe pas.",
  scripts=[], active="",
  body="""    <section class="section blueprint" style="min-height:60vh;display:grid;place-items:center">
      <div class="container" style="text-align:center;max-width:560px">
        <p class="handwritten" style="position:static;transform:rotate(-4deg);text-align:center;color:var(--blue)">Pièce manquante !</p>
        <h1 style="font-size:clamp(3rem,10vw,6rem);font-weight:800;color:var(--blue)">404</h1>
        <p class="muted" style="margin:.8rem 0 1.6rem">Cette page n'existe pas… ou elle attend encore d'être réparée.</p>
        <div class="empty-actions">
          <a class="btn btn-primary" href="index.html">Retour à l'accueil</a>
          <a class="btn btn-ghost" href="guides.html">Voir tous les guides</a>
        </div>
      </div>
    </section>""")

def build():
    for name, p in PAGES.items():
        scripts = "\n".join(f'  <script src="assets/js/{s}"></script>' for s in p["scripts"])
        if not p["scripts"]:
            scripts = f'  <script>renderHeader("{p.get("active","")}"); renderFooter(); hydrateIcons();</script>'
        path = "" if name == "index.html" else name
        html = HEAD.format(title=p["title"], desc=p["desc"], body=p["body"].replace("ARROW", arrow()), scripts=scripts, site=SITE, path=path)
        if name == "404.html":
            # la page 404 peut être servie depuis n'importe quel dossier : chemins absolus depuis la racine du dépôt
            html = html.replace('<script>renderHeader', '<script>window.LPB_ROOT = "/LesPagesBleues/";</script>\n  <script>renderHeader')
            for a in ['href="assets/', 'src="assets/', 'href="manifest', 'href="index.html"', 'href="guides.html"']:
                html = html.replace(a, a[:a.index('"') + 1] + "/LesPagesBleues/" + a[a.index('"') + 1:])
        (ROOT / name).write_text(html, encoding="utf-8")
        print("écrit", name)

if __name__ == "__main__":
    build()
