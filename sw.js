// Pilon Homes Inspector - lets the app open with no connection.
const CACHE = "pilon-inspector-v1";
const SHELL = ["./", "./index.html", "./manifest.webmanifest", "./icon-180.png", "./icon-192.png", "./icon-512.png"];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL))); self.skipWaiting(); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  const req = e.request; if (req.method !== "GET") return;
  const u = new URL(req.url);
  if (u.origin === location.origin) {
    // app files: newest when online, saved copy when offline
    e.respondWith(fetch(req).then(r => { if (r.ok) { const c = r.clone(); caches.open(CACHE).then(cc => cc.put(req, c)); } return r; }).catch(() => caches.match(req, { ignoreSearch: true }).then(r => r || caches.match("./index.html"))));
  } else if (/(^|\.)cdnjs\.cloudflare\.com$|fonts\.googleapis\.com$|fonts\.gstatic\.com$/.test(u.hostname)) {
    // PDF maker and fonts: saved copy first
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(r => { if (r.ok || r.type === "opaque") { const c = r.clone(); caches.open(CACHE).then(cc => cc.put(req, c)); } return r; })));
  }
});
