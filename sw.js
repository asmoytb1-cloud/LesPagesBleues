/* Les Pages Bleues — service worker : le site reste utilisable sans réseau (garage, cave, jardin…) */
const CACHE = "lpb-v3";
const CORE = [
  "./", "index.html", "guides.html", "guide.html", "ajouter.html", "404.html",
  "assets/css/style.css",
  "assets/js/data.js", "assets/js/common.js", "assets/js/home.js",
  "assets/js/guides.js", "assets/js/guide.js", "assets/js/ajouter.js",
  "assets/img/favicon.svg", "assets/img/icon-192.png", "manifest.webmanifest"
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
  const isFont = url.hostname.endsWith("fonts.googleapis.com") || url.hostname.endsWith("fonts.gstatic.com");
  if (!sameOrigin && !isFont) return;

  e.respondWith(
    fetch(req)
      .then(res => {
        if (res.ok || res.type === "opaque") {
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
