/* Les Pages Bleues — service worker : le site reste utilisable sans réseau (garage, cave, jardin…) */
const CACHE = "lpb-v6";
const CORE = [
  "./", "index.html", "guides.html", "guide.html", "categories.html", "diagnostic.html", "communaute.html",
  "profil.html", "ajouter.html", "a-propos.html", "404.html",
  "assets/css/style.css", "assets/fonts/inter-latin.woff2", "assets/fonts/caveat-600-latin.woff2",
  "assets/js/data.js", "assets/js/common.js", "assets/js/home.js", "assets/js/guides.js", "assets/js/categories.js",
  "assets/js/guide-view.js", "assets/js/guide.js", "assets/js/ajouter.js", "assets/js/communaute.js",
  "assets/js/profil.js", "assets/js/diagnostics-data.js", "assets/js/diagnostic.js", "assets/js/apropos.js",
  "assets/img/favicon.svg", "assets/img/icon-192.png", "assets/img/photos/hero.webp", "manifest.webmanifest"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Réseau d'abord (contenu à jour), cache en secours (hors ligne)
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  const sameOrigin = url.origin === location.origin;
  if (!sameOrigin) return;

  e.respondWith(
    fetch(req)
      .then(res => {
        if (res.ok) {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(req, copy));
        }
        return res;
      })
      .catch(() =>
        caches.match(req, { ignoreSearch: req.mode === "navigate" })
          .then(hit => hit || (req.mode === "navigate" ? caches.match("index.html") : undefined))
      )
  );
});
