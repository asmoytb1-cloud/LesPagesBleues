# Les Pages Bleues

L'encyclopédie de l'entretien — **Réparer. Comprendre. Transmettre.**

Trouvez en quelques clics comment réparer vos objets, au lieu de les jeter.

## Fonctionnalités

- **28 guides** dans 8 domaines (automobile, électroménager, téléphonie, maison, vélo, jardin, loisirs…), chacun avec consignes de sécurité, outils, pièces, astuces et pistes de dépannage.
- **Mode accompagnement** : une étape à la fois en plein écran, écran de préparation avec liste à cocher, **minuteurs** pour les temps d'attente (alarme sonore + vibration), **lecture à voix haute**, **commandes vocales** (« suivant », « précédent », « répète », « minuteur », « quitter »), balayage sur mobile, écran maintenu allumé, reprise là où on s'est arrêté.
- **Recherche intelligente** : synonymes (« machine à laver » → lave-linge), insensible aux accents, suggestions instantanées.
- **Filtres et tri** : domaine, difficulté, favoris ; tri par rapidité, facilité, économie.
- **Favoris**, **reprise d'une réparation en cours** depuis l'accueil, **guides similaires**, **impression** propre d'une fiche.
- **Ajouter une fiche** : brouillon sauvegardé automatiquement, étapes réordonnables, minuteur et astuce par étape.
- **Hors ligne** : le site s'installe sur le téléphone et reste consultable sans réseau (garage, cave, jardin).
- Accessibilité : navigation au clavier, lien d'évitement, focus visible, animations réduites si demandé.

## Pages

| Fichier | Contenu |
| --- | --- |
| `index.html` | Accueil : recherche, reprise, domaines, guides populaires et express, manifeste |
| `guides.html` | Tous les guides : recherche (`?q=`), domaine (`?cat=`), difficulté (`?diff=`), favoris (`?fav=1`), tri (`?sort=`) |
| `guide.html?id=…` | Un guide pas à pas ; `&coach=1` lance directement l'accompagnement |
| `ajouter.html` | Rédiger une fiche (enregistrée dans le navigateur pour l'instant) |
| `404.html` | Page introuvable |

## Lancer le site

Site statique, sans dépendance ni compilation :

```sh
python3 -m http.server 8000
# puis ouvrir http://localhost:8000
```

## Publier sur GitHub Pages

1. Fusionner le travail dans `main`.
2. Sur GitHub : **Settings → Pages**, source **Deploy from a branch**, branche **main**, dossier **/ (root)**.
3. Le site est en ligne quelques minutes plus tard à l'adresse `https://<utilisateur>.github.io/LesPagesBleues/`.

## Structure

- `assets/css/style.css` — thème sombre « plan technique », version mobile et impression
- `assets/js/data.js` — catégories et guides (voir les champs documentés en tête du fichier)
- `assets/js/common.js` — icônes, en-tête, pied de page, recherche, favoris, progression, stockage
- `assets/js/home.js`, `guides.js`, `guide.js`, `ajouter.js` — script propre à chaque page
- `sw.js` + `manifest.webmanifest` — mode hors ligne et installation sur téléphone

## Ajouter un guide au site

Ajoutez un objet dans le tableau `GUIDES` de `assets/js/data.js` :

```js
{
  id: "mon-guide",               // identifiant unique, utilisé dans l'adresse
  title: "Réparer …",
  category: "maison",            // id d'une catégorie
  difficulty: "Facile",          // Facile | Moyen | Difficile
  duration: "20 min", minutes: 20,
  savings: "≈ 40 €",
  keywords: ["synonyme", "autre mot"],
  summary: "…",
  safety: "Coupez le courant…",
  tools: ["…"], parts: ["…"],
  steps: [
    { title: "…", text: "…", tip: "…", safety: "…", timer: 600 }  // timer en secondes
  ],
  troubleshoot: ["…"]
}
```

Pensez à incrémenter `CACHE` dans `sw.js` quand vous modifiez des fichiers, pour que les visiteurs reçoivent la nouvelle version hors ligne.
