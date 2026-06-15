FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY index.html /usr/share/nginx/html/index.html
COPY manifest.webmanifest /usr/share/nginx/html/manifest.webmanifest
COPY sw.js /usr/share/nginx/html/sw.js
COPY CSS /usr/share/nginx/html/CSS
COPY JS /usr/share/nginx/html/JS
COPY icons /usr/share/nginx/html/icons
COPY fotos /usr/share/nginx/html/fotos

EXPOSE 80
