"""Les Pages Bleues — met à jour les catalogues de matériel à partir des plans de site publics (sitemaps).
Usage : python3 tools/fetch-catalogues.py [spareka] [leroymerlin]     puis : node tools/build.js

- Spareka : plan de site des références d'appareils (pvref-*.xml.gz) et des rubriques × marques
  → tools/data/spareka-references.json.gz  {"univers/rubrique": {"marque": ["référence", …]}}
- Leroy Merlin : plan de site des marques (sitemap-brands-navigation*.xml) et des produits (sitemap-product*.xml)
  → tools/data/leroymerlin-marques.json      {"slug": "Nom affiché"}
  → tools/data/leroymerlin-produits.jsonl.gz [type, titre] pour les produits des types suivis (voir LM_TYPES)
Seuls des noms de marques, de références et de produits sont conservés. Les deux sites autorisent ces fichiers
dans leur robots.txt ; le script les lit un par un, avec une pause entre chaque."""
import gzip, html, json, re, subprocess, sys, time, unicodedata, collections, pathlib

DATA = pathlib.Path(__file__).resolve().parent / "data"
UA = "Mozilla/5.0 (X11; Linux x86_64) LesPagesBleues-catalogue"

def get(url, binary=False):
    for _ in range(3):
        r = subprocess.run(["curl", "-s", "-L", "--max-time", "180", "-A", UA, url], capture_output=True)
        if r.returncode == 0 and r.stdout:
            return r.stdout if binary else r.stdout.decode("utf8", "ignore")
        time.sleep(5)
    return b"" if binary else ""

def locs(xml):
    return re.findall(r"<loc>([^<]*)</loc>", xml)

def spareka():
    base = "https://www.spareka.fr/media/sitemap/spareka-fr/"
    data = collections.defaultdict(lambda: collections.defaultdict(list))
    def add(url, with_ref):
        p = url.replace("https://www.spareka.fr/", "").strip("/").split("/")
        if with_ref and len(p) == 4: data[p[0] + "/" + p[1]][p[2]].append(p[3])
        if not with_ref and len(p) == 3: data[p[0] + "/" + p[1]].setdefault(p[2], [])
    for index, with_ref in (("pvref-index.xml", True), ("pvcat-pvbrand-index.xml", False)):
        for f in locs(get(base + index)):
            xml = gzip.decompress(get(f, binary=True)).decode("utf8", "ignore")
            for u in locs(xml): add(u, with_ref)
            time.sleep(1)
    out = DATA / "spareka-references.json.gz"
    out.write_bytes(gzip.compress(json.dumps(data).encode("utf8"), 9))
    print("Spareka :", len(data), "rubriques,", sum(len(v) for b in data.values() for v in b.values()), "références")

def norm(s):
    return unicodedata.normalize("NFD", s.lower()).encode("ascii", "ignore").decode()

# Types suivis chez Leroy Merlin : le titre du produit commence par l'un de ces mots (sans accents)
LM_TYPES = [
    ("robot-tondeuse", r"^(robot (de )?tonte|robot[- ]tondeuse|tondeuse robot)"),
    ("tondeuse", r"^(tondeuse|tracteur[- ]tondeuse|autoportee)"),
    ("debroussailleuse", r"^(debroussailleuse|coupe[- ]bordures?)"),
    ("taille-haie", r"^(taille[- ]haies?|tronconneuse|elagueuse)"),
    ("nettoyeur-haute-pression", r"^nettoyeur (haute|hp)"),
    ("souffleur", r"^(souffleur|aspirateur[- ]souffleur|aspiro[- ]souffleur)"),
    ("motobineuse", r"^(motobineuse|motoculteur|bineuse)"),
    ("barbecue", r"^(barbecue|plancha)"),
    ("piscine", r"^(robot (de |nettoyeur (de |pour )?|electrique (de |pour )?)?piscine|robot nettoyeur|pompe (de filtration|piscine|pour piscine)|pompe a chaleur (de |pour )?piscine|filtre a sable|groupe de filtration)"),
    ("perceuse", r"^(perceuse|visseuse|perforateur|boulonneuse|cle a choc|marteau[- ]perforateur)"),
    ("scie-ponceuse", r"^(scie (circulaire|sauteuse|sabre|plongeante|a onglet|radiale|sur table|a chantourner)|ponceuse|meuleuse|rabot electrique|defonceuse|decoupeuse)"),
    ("robinet", r"^(mitigeur|robinet (de |d')?(cuisine|lavabo|evier|baignoire|douche|bain)|colonne de douche|robinetterie)"),
    ("chasse-eau", r"^(mecanisme (de )?chasse|chasse d'eau|pack wc|wc |reservoir (de )?wc|bati[- ]support|robinet flotteur)"),
    ("radiateur-electrique", r"^(radiateur (electrique|a inertie|rayonnant|connecte|mobile|bain d'huile|soufflant)|seche[- ]serviettes? electrique|convecteur)"),
    ("poele-granules", r"^(poele (a|au) (granul|pellet|bois)|chaudiere)"),
    ("pompe-a-chaleur", r"^pompe a chaleur(?! (de |pour )?piscine)"),
    ("motorisation", r"^(motorisation|moteur (de |pour )?(volet|portail|porte de garage|store|porte)|kit motorisation|automatisme de portail)"),
    ("chauffe-eau", r"^(chauffe[- ]eau|ballon d'eau chaude|ballon thermodynamique)"),
    ("climatiseur", r"^climatiseur"),
    ("vmc", r"^(vmc|extracteur d'air|kit vmc)"),
    ("interphone", r"^(interphone|visiophone)"),
    ("aspirateur-chantier", r"^aspirateur (de chantier|eau et poussiere|atelier|cendres)"),
]

def leroymerlin():
    index = get("https://www.leroymerlin.fr/sitemap-index.xml")
    brands = {}
    for f in [u for u in locs(index) if "brands-navigation" in u]:
        for blk in get(f).split("<url>")[1:]:
            loc = re.search(r"<loc>([^<]*)</loc>", blk).group(1)
            m = re.match(r"https://www\.leroymerlin\.fr/marques/([^/]+)/$", loc)
            t = re.search(r"<image:title>([^<]*)</image:title>", blk)
            if m and t: brands[m.group(1)] = html.unescape(t.group(1)).strip()
        time.sleep(1)
    (DATA / "leroymerlin-marques.json").write_text(json.dumps(brands, ensure_ascii=False, indent=0), "utf8")
    rx = [(t, re.compile(r)) for t, r in LM_TYPES]
    rows = set()
    for f in [u for u in locs(index) if re.search(r"sitemap-product\d+\.xml", u)]:
        for title in re.findall(r"<image:title>([^<]*)</image:title>", get(f)):
            title = html.unescape(title).strip(); nt = norm(title)
            for ty, r in rx:
                if r.search(nt): rows.add((ty, title)); break
        time.sleep(1)
    lines = "\n".join(json.dumps(r, ensure_ascii=False) for r in sorted(rows))
    (DATA / "leroymerlin-produits.jsonl.gz").write_bytes(gzip.compress(lines.encode("utf8"), 9))
    print("Leroy Merlin :", len(brands), "marques,", len(rows), "produits retenus")

if __name__ == "__main__":
    which = sys.argv[1:] or ["spareka", "leroymerlin"]
    if "spareka" in which: spareka()
    if "leroymerlin" in which: leroymerlin()
