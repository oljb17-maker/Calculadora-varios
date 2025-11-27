// Nombre del caché
const CACHE_NAME = "kairos-flex-v1";

// Archivos básicos que se guardan para modo app
const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./manifest.webmanifest"
  // Si quieres, luego añades CSS, imágenes, etc.
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
  );
});

// Limpiar cachés viejos cuando actualices la versión
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // si está en caché, lo usa; si no, va a la red
      return response || fetch(event.request);
    })
  );
});
