const CACHE_NAME = "mobilidade-curitiba-v5";

const APP_FILES = [
    "./",
    "./index.html",
    "./CSS/estilo.css",
    "./JS/app.js",
    "./vendor/leaflet/leaflet.css",
    "./vendor/leaflet/leaflet.js",
    "./vendor/leaflet/images/marker-icon.png",
    "./vendor/leaflet/images/marker-icon-2x.png",
    "./vendor/leaflet/images/marker-shadow.png",
    "./manifest.webmanifest",
    "./icons/icon-192.png",
    "./icons/icon-512.png",
    "./fotos/rua-24-horas.png",
    "./fotos/praca-tiradentes.png",
    "./fotos/rua-das-flores.png",
    "./fotos/museu-ferroviario.png",
    "./fotos/teatro-paiol.png",
    "./fotos/jardim-botanico.png",
    "./fotos/mercado-municipal.png",
    "./fotos/teatro-guaira.png",
    "./fotos/passeio-publico.png",
    "./fotos/centro-civico.png",
    "./fotos/bosque-do-papa.png",
    "./fotos/opera-de-arame.png",
    "./fotos/museu-oscar-niemeyer.png",
    "./fotos/bosque-alemao.png",
    "./fotos/parque-sao-lourenco.png",
    "./fotos/parque-tingui.png",
    "./fotos/parque-barigui.png",
    "./fotos/parque-tangua.png",
    "./fotos/santa-felicidade.png",
    "./fotos/torre-panoramica.png",
    "./fotos/setor-historico.png"
];


self.addEventListener("install", event => {

    event.waitUntil(

        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(APP_FILES))
            .then(() => self.skipWaiting())

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
            .then(() => self.clients.claim())

    );

});


self.addEventListener("fetch", event => {

    event.respondWith(

        caches.match(event.request)
            .then(response => response || fetch(event.request))

    );

});
