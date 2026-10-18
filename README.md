# Markota Reinigung – Webseite

Vite-Projekt (HTML, CSS, JavaScript ohne Framework).

## Starten

```bash
npm install
npm run dev       # Entwicklungsserver mit Live-Reload
npm run build     # fertige Webseite im Ordner dist/
npm run preview   # Build lokal testen
```

Den Inhalt von `dist/` kannst du auf einen beliebigen Webspace hochladen. Die Pfade sind relativ, deshalb funktioniert das auch in einem Unterordner.

## Struktur

```
index.html                     Inhalt der Seite
src/main.js                    Interaktionen (Menü, Bereiche, Formular)
src/style.css                  Design und Responsive-Regeln
src/assets/katarina-markota.jpg
src/assets/favicon.svg
vite.config.js
```

## Kontakt-Formular

Das Formular öffnet das E-Mail-Programm mit einer fertigen Nachricht an reinigung@markota.ch. Dafür braucht es keinen Server.
