const CACHE_NAME = "mobilidade-curitiba-v1";

const APP_FILES = [
    "./",
    "./index.html",
    "./CSS/estilo.css",
    "./JS/app.js",
    "./manifest.webmanifest",
    "./icons/icon-192.png",
    "./icons/icon-512.png"
];


self.addEventListener("install", event => {

    event.waitUntil(

        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(APP_FILES))

    );

});


self.addEventListener("activate", event => {

    event.waitUntil(

        caches.keys()
            .then(keys => Promise.all(

                keys
                    .filter(key => key !== CACHE_NAME)
                    .map(key => caches.delete(key))

            ))

    );

});


self.addEventListener("fetch", event => {

    event.respondWith(

        caches.match(event.request)
            .then(response => response || fetch(event.request))

    );

});
