# Biottos Lädeli – Website

Statische Website mit HTML, CSS und JavaScript, ohne Framework oder Build-Schritt. Änderungen dieses Auftrags gelten für `feat/shopify-pickup`; Produktion und Shopify-Einstellungen bleiben separat freizugeben.

## Aktueller Stand – 9. Oktober 2026

- Das bereitgestellte Apfellogo ist im Seitenkopf und auf der Startseite eingebunden. Die Originalupload bleibt unverändert; weisse Ränder werden nur durch den Darstellungsrahmen ausgeblendet.
- `shop-vorschau.html` zeigt 19 Entwürfe, sechs Kategorieabschnitte, Suche und Filter. Sämtliche sieben Essig-/Balsamicoprodukte haben 250 ml. Richtpreise sind ausdrücklich unverbindlich.
- Neue Produkte sind noch nicht bestellbar: verbindliche Preise, vollständige Produktangaben und echte Shopify-Zuordnungen fehlen. Details: [Produktdaten](docs/produktdaten-bestaetigt.md).
- Die drei bereits aktiven Körbe Chli & Fii, Fein & Guet und Gross & Guet können im gemeinsamen `warenkorb.html` kombiniert werden. Der Browser speichert nur Produkt-Schlüssel und Menge. Preise und Varianten stammen aus der bestätigten Zuordnung in `js/shopify-cart.js`; Shopify prüft die endgültige Verfügbarkeit und Preise.
- Die aktive Brücke ist `enabled:true`. Bei Browsern ohne Speicherung bleibt der direkte Shopify-Einstieg erhalten. Für den gemeinsamen Warenkorb ohne JavaScript gibt es direkte Einzelkorb-Links.
- Native Abholung: kostenlos, Hauptstrasse 90, 8357 Guntershausen, Montag–Samstag 08:00–18:00, bereit nach Abholbestätigung. Keine verpflichtende Terminwahl. Onlinezahlung sowie Bar/TWINT bei Abholung sind historisch dokumentiert; vor Freigabe aktuell abnehmen.
- Formspree bleibt als bestehender Rückfallweg im Projekt. Keine App deinstalliert, kein Theme veröffentlicht, kein Verkaufskanal geändert.

## Lokal öffnen

Node.js 24 verwenden. Im Projektordner:

```sh
npm start
```

Dann `http://localhost:8080` bzw. `http://localhost:8080/shop-vorschau.html` öffnen. Nicht direkt als file:// öffnen: die Vorschau lädt JavaScript-Module. Beenden mit Ctrl+C. Website-Abhängigkeiten müssen nicht installiert werden.

**Lokale Bestelltests:** Die vorhandenen externen Ziele sind echt. Checkout bzw. Formularversand nur bei bewusst beauftragter Bestellung auslösen. Die Browser-Suiten blockieren externe Dienste und senden keine tatsächlichen Bestellungen.

## Zuständigkeiten

| Inhalt | Dateien |
|---|---|
| Hauptseite, Sprachtexte, Formular und Rechtstexte | index.html, js/app.js |
| Angebotsseiten | geschenkskoerbe.html, firmengeschenke.html |
| Neues Sortiment / bestätigte Entwurfsdaten | shop-vorschau.html, js/product-drafts.mjs, js/shop-preview.mjs |
| Bestehende Varianten und gemeinsamer Warenkorb | js/shopify-cart.js, warenkorb.html, js/cart-page.js, css/cart.css |
| Grundgestaltung / gemeinsame Lesbarkeit / Vorschau | css/style.css, css/relaunch.css, css/shop.css |
| Produktbilder und Apfellogo | img/ |
| Tests und lokaler Server | scripts/ |
| CI / SEO | .github/workflows/site-checks.yml, robots.txt, sitemap.xml |

Namen und Preise der bestehenden Körbe gemeinsam in index.html, Angebotsseiten, strukturierten Daten, der K-Liste in js/app.js und js/shopify-cart.js pflegen. Neue Produkte niemals anhand ähnlicher Namen vorhandenen Shopify-IDs zuordnen. Betreiberbestände sind keine Livebestände.

## Prüfungen

```sh
npm test
python3 scripts/check-images.py
```

Der zweite Befehl benötigt Pillow. npm test prüft Daten, Warenkorb, Fehlerfälle, Syntax und lokale Verweise. Referenzierte leere Bilddateien werden abgelehnt. Produktbilder müssen Originale und gültige WebP-Signaturen besitzen; vollständige Decodierung erfolgt im Python-Schritt.

Optionale Browserprüfung mit Playwright als Entwicklungswerkzeug:

```sh
npm install --no-save --package-lock=false playwright@1.62.1
npx playwright install chromium
node scripts/browser-check.mjs
node scripts/form-fallback-browser-check.mjs
```

Die aktuelle Suite umfasst Hauptseite, Zusatzseiten, neues Sortiment, Warenkorb, 320/360/390/768/1440 Pixel, dunkle Systemeinstellung, mobile Geschenkdetails, Suche, Fotos und JavaScript-Fallback. Die separate Formularsuite prüft ausschliesslich den deaktivierten Shopify-Rückfallweg mit simuliertem Formspree. Google Fonts und Maps sind dabei blockiert: reale Dienstverfügbarkeit und echte Geräte sind separat abzunehmen. QA_OUTPUT_DIR und CHROMIUM_PATH sind optional.

CI führt diese Prüfungen bei Pull Requests und Pushes auf main, fix/website-quality und feat/shopify-pickup aus. Screenshots und Ergebnisdateien werden als browser-qa-Artefakt aufbewahrt. Tatsächlicher Nachweis: [Umsetzungsstatus](docs/audit-umsetzung-2026-10-09.md), nicht historische Qualitätsberichte.

## Freigabe und Rückkehr

1. AGENTS.md lesen, Branch und fremde Änderungen prüfen.
2. Änderungen im vereinbarten Entwicklungsbranch prüfen; rote Checks beheben.
3. Produktdaten und echte mobile/Shopify-Abnahme dokumentieren.
4. Erst nach ausdrücklicher Freigabe mergen/veröffentlichen. main kann automatisch die Produktionswebsite aktualisieren.
5. Bei Fehlern einen neuen Revert-Commit auf einem Entwicklungsbranch erstellen und prüfen. Kein Force-Push auf gemeinsam genutzte Branches.

Für noch offene externe Abnahmen siehe docs/audit-umsetzung-2026-10-09.md. Formspree enthält weiterhin die separate ältere Terminlogik; sie wurde weder entfernt noch als Zielmodell für native Shopify-Abholung neu eingeführt.

## Externe Dienste und Rechte

Shopify, Formspree, Google Fonts, Google Maps und WhatsApp bleiben die tatsächlich verwendeten Dienste. Rechtstexte sind keine juristische Freigabe. An Code, Fotos und Logo wurden keine neuen Nutzungsrechte behauptet; keine freie Vorlagenlizenz hinzugefügt.
