# Les Pages Bleues

L'encyclopédie de l'entretien — **Réparer. Comprendre. Transmettre.**

Trouvez en quelques clics comment réparer vos objets, au lieu de les jeter.

## Pages

| Fichier | Contenu |
| --- | --- |
| `index.html` | Accueil : recherche, domaines, chiffres clés, « Comment ça marche ? », guides populaires, manifeste |
| `guides.html` | Tous les guides, recherche (`?q=`) et filtre par domaine (`?cat=`) |
| `guide.html?id=…` | Un guide pas à pas, avec outils, pièces et suivi de progression |
| `ajouter.html` | Formulaire pour rédiger une fiche (enregistrée dans le navigateur pour l'instant) |

## Lancer le site

Site statique, sans dépendance ni compilation :

```sh
python3 -m http.server 8000
# puis ouvrir http://localhost:8000
```

Il peut aussi être publié tel quel sur GitHub Pages.

## Structure

- `assets/css/style.css` — thème sombre « plan technique »
- `assets/js/data.js` — catégories et guides de démonstration (à enrichir)
- `assets/js/common.js` — icônes, en-tête, pied de page, recherche
- `assets/js/*.js` — script propre à chaque page
