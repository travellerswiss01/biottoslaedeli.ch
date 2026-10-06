# Biottos Lädeli – Website

Statische Website (HTML, CSS, JavaScript), ohne Build-Schritt und ohne Framework.

## Branch für die aktuelle Überarbeitung

Die aktuelle Überarbeitung liegt auf dem Branch `website02`.

## Wo ändere ich was?

| Was | Wo |
|---|---|
| Texte, Korbinhalte, Preise, Impressum, Datenschutz | `index.html` |
| Zusätzliche Conversion-/Responsive-Stile | `css/relaunch.css` |
| Grundlayout, Farben, Schriften, bestehende Komponenten | `css/style.css` |
| Bestellzettel, Korbauswahl, Abholzeiten, Formularversand | `js/app.js` |
| Fotos und Grafiken | `img/` |

### Preise und Körbe

Die Bestelllogik verwendet aktuell die drei Körbe direkt in `js/app.js`:

- Gross & Guet – CHF 49.95
- Fein & Guet – CHF 29.95
- Chli & Fii – CHF 19.95

Wenn Preise oder Korbnamen geändert werden, müssen deshalb **Anzeige in `index.html` und Bestelllogik in `js/app.js`** gemeinsam geprüft werden.

### Bestellzeiten

Der Bestellzettel bietet aktuell Abholzeiten im 30-Minuten-Raster von 08:00 bis 18:00 Uhr und Termine bis drei Monate im Voraus an. Die Bestellmenge wurde auf bis zu 10 Körbe erweitert.

## Datenschutz und externe Dienste

Die Website verwendet Formspree für das Bestellformular, Google Fonts, Google Maps sowie Vercel Web Analytics und Vercel Speed Insights. Der Datenschutztext in `index.html` beschreibt diese eingesetzten Dienste; die konkrete rechtliche Ausgestaltung sollte vor dem produktiven Einsatz fachlich geprüft werden.

## SEO

Die Startseite enthält Meta-Description, Open-Graph-Daten, Twitter-/X-Metadaten sowie strukturierte Store- und FAQ-Daten inklusive Adresse, Öffnungszeiten, Korb-Angeboten und sichtbaren FAQ-Inhalten.
Zusätzlich liegt eine einfache `robots.txt` im Root und erlaubt das Crawling der öffentlichen Seiten.

Eine Canonical-URL und eine Sitemap sollten erst mit der **tatsächlich verwendeten öffentlichen Domain** ergänzt werden; bis dahin werden keine Domain-Platzhalter als echte URLs eingetragen.

## Ohne JavaScript

Die Seite enthält weiterhin eine Noscript-Fallback-Struktur. Die zentrale Navigation funktioniert als normale Sprungnavigation; interaktive Bestell- und Overlay-Funktionen benötigen JavaScript.
