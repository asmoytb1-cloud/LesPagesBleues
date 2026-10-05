#!/usr/bin/env python3
"""Les Pages Bleues — télécharge depuis Wikidata (données sous licence CC0, domaine public) les modèles de voitures,
motos, smartphones, tablettes, ordinateurs portables et consoles, avec leur marque et leurs années.
Sortie : tools/data/wikidata-modeles.json, lu par tools/materiel.js.
Le service de requêtes de Wikidata limite le débit : une requête par minute, avec un User-Agent identifiable."""
import json, os, sys, time, urllib.parse, urllib.request

UA = "LesPagesBleues/0.2 (encyclopedie collaborative de l'entretien et de la reparation; https://github.com/asmoytb1-cloud/LesPagesBleues)"
OUT = os.path.join(os.path.dirname(__file__), "data", "wikidata-modeles.json")
CLASSES = {                       # type de matériel → classe Wikidata des modèles
    "voiture": "Q3231690",        # modèle d'automobile
    "moto": "Q23866334",          # modèle de motocyclette
    "smartphone": "Q19723451",    # modèle de smartphone
    "tablette": "Q155972",        # tablette tactile
    "ordinateur-portable": "Q3962",  # ordinateur portable
    "console": "Q8076",           # console de jeux vidéo
}
QUERY = """SELECT ?m ?label ?brandLabel ?start ?end WHERE {
  ?m wdt:P31/wdt:P279* wd:%s .
  { ?m wdt:P1716 ?brand } UNION { FILTER NOT EXISTS { ?m wdt:P1716 [] } ?m wdt:P176 ?brand }
  OPTIONAL { ?m wdt:P571 ?start }
  OPTIONAL { ?m wdt:P2669 ?end }
  ?m rdfs:label ?label . FILTER(LANG(?label) IN ("fr", "en"))
  SERVICE wikibase:label { bd:serviceParam wikibase:language "fr,en". ?brand rdfs:label ?brandLabel . }
}"""

def run(q):
    url = "https://query.wikidata.org/sparql?" + urllib.parse.urlencode({"query": q, "format": "json"})
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "application/sparql-results+json"})
    for attempt in range(5):
        try:
            return json.load(urllib.request.urlopen(req, timeout=180))["results"]["bindings"]
        except urllib.error.HTTPError as e:
            if e.code != 429: raise
            print("  limite de débit, nouvel essai dans 70 s", file=sys.stderr); time.sleep(70)
    raise SystemExit("Wikidata indisponible")

def year(v): return int(v["value"][:4]) if v and v["value"][:4].isdigit() else None

out = {}
for i, (kind, cls) in enumerate(CLASSES.items()):
    if i: time.sleep(65)
    rows = run(QUERY % cls)
    models = {}
    for r in rows:
        qid = r["m"]["value"].rsplit("/", 1)[1]
        lang = r["label"].get("xml:lang")
        cur = models.get(qid)
        if cur and (cur["lang"] == "fr" or lang != "fr"):
            continue                                  # étiquette française de préférence
        models[qid] = {"lang": lang, "name": r["label"]["value"], "brand": r["brandLabel"]["value"],
                       "from": year(r.get("start")), "to": year(r.get("end"))}
    out[kind] = sorted(({k: v for k, v in m.items() if k != "lang" and v is not None} | {"id": q} for q, m in models.items()),
                       key=lambda m: (m["brand"], m["name"]))
    print(f"{kind} : {len(out[kind])} modèles", file=sys.stderr)

json.dump({"_licence": "Données Wikidata, CC0 1.0 (domaine public) — https://www.wikidata.org/wiki/Wikidata:Licensing",
           "_date": time.strftime("%Y-%m-%d"), **out}, open(OUT, "w"), ensure_ascii=False, indent=0)
print("écrit", OUT, file=sys.stderr)
