# Biottos Lädeli – Website

Statische Geschäftswebsite mit HTML, CSS und JavaScript. Kein Framework, kein Build-Schritt und keine benötigten npm-Pakete. Besucher sehen Angebote und bestellen Geschenkskörbe zur Abholung; Firmenanfragen erfolgen über WhatsApp. Bezahlt wird vor Ort bar oder mit TWINT. Onlinezahlung, Lagerverwaltung und automatische Kapazitätsprüfung sind nicht enthalten.

## Auf Windows lokal ansehen

1. Auf GitHub den gewünschten Branch auswählen: `main` ist der Hauptstand; Änderungen dieses Auftrags liegen auf `fix/website-quality`.
2. **Code → Download ZIP**, danach **Alle extrahieren**. Alle Ordner zusammen lassen.
3. Für eine schnelle Ansicht `index.html` in Chrome oder Edge öffnen. Für zuverlässige Prüfung den lokalen Server verwenden.
4. [Node.js 24 LTS](https://nodejs.org/en/download) installieren. Die Reihe 24 ist laut [offiziellem Releaseplan](https://github.com/nodejs/Release#release-schedule) am 7. Oktober 2026 unterstützt, mit geplantem Wartungsende am 30. April 2028.
5. Im entpackten Ordner ein Terminal öffnen und ausführen:

```powershell
npm start
```

Dann `http://localhost:8080` öffnen. Beenden mit `Ctrl+C`. Der Server hört nur auf dem eigenen Rechner. `npm install` ist nicht erforderlich. Ein ZIP-Download wird nicht automatisch mit späteren GitHub-Änderungen aktualisiert.

**Achtung:** Auch die lokale Vorschau verwendet das echte Formspree-Ziel. Nicht auf „Bestellung verbindlich senden“ klicken, wenn keine echte Bestellung beabsichtigt ist. Entwicklungstests müssen die Netzwerkanfrage abfangen.

## Wo ändere ich was?

| Inhalt | Datei |
|---|---|
| Hauptseite, Produkttexte, Preise, Bestellformular, Impressum und Datenschutz | `index.html` |
| Zusätzliche Angebotsseiten | `geschenkskoerbe.html`, `firmengeschenke.html` |
| Grundgestaltung und vorhandene Komponenten | `css/style.css` |
| Ergänzende Gestaltung, Angebotsseiten und responsive Korrekturen | `css/relaunch.css` |
| Navigation, Sprache, Bildergeschichte, Termine und Formularversand | `js/app.js` |
| Fotos, Logo | `img/` |
| Verweis- und Syntaxprüfung sowie ihre Tests | `scripts/check-site.mjs`, `scripts/check-site.test.mjs` |
| Lokale Vorschau | `scripts/serve.mjs` |
| GitHub-Prüflauf | `.github/workflows/site-checks.yml` |
| Suchmaschinen | Metadaten in den HTML-Dateien, `sitemap.xml`, `robots.txt` |

### Preise und Bestellung

- Gross & Guet: CHF 49.95, sechs Spezialitäten.
- Fein & Guet: CHF 29.95, fünf Spezialitäten.
- Chli & Fii: CHF 19.95, drei Spezialitäten.

Preise und Namen bleiben bewusst auch statisch lesbar. Bei Änderungen **`index.html`, `geschenkskoerbe.html`, `firmengeschenke.html`, strukturierte Daten und die `K`-Liste in `js/app.js` gemeinsam abgleichen**. Die Spannweite auf den Zusatzseiten ebenfalls aktualisieren.

Eine Bestellung enthält 1–10 Körbe derselben Variante. Abholung: Montag–Samstag, 08:00–18:00 im 30-Minuten-Raster, frühestens am nächsten Tag und bis drei Kalendermonate voraus. Monatsenden werden auf den letzten gültigen Tag begrenzt. Der heutige Tag wird in `Europe/Zurich` berechnet, auch auf Geräten in anderen Zeitzonen. Feiertags- und Kapazitätsregeln sind nicht hinterlegt. Vor dem Versand wird die Auswahl erneut geprüft. Während der Übermittlung bleibt der Bestellzettel gesperrt; nach spätestens 20 Sekunden wird ein ausstehender Aufruf abgebrochen. Ein Fehler bedeutet nicht sicher, dass der Dienst die Bestellung nie erhalten hat: vor einer erneuten Bestellung im Zweifel nachfragen.

### Bilder und Linkvorschau

Die drei ursprünglichen Fotos `obstbäume.jpeg`, `laden-fruechte.jpg` und `Mostaufstuhl.jpeg` sind weder im aktuellen Stand noch in der verfügbaren Historie vorhanden. Die Süssmost-Geschichte nutzt deshalb das echte vorhandene Erntefoto mit passenden Alternativtexten. Es ist kein Foto des Pressvorgangs oder fertiger Mostflaschen. Mit passenden Originalfotos kann jeder Schritt später wieder eine eigene Abbildung erhalten.

Open Graph und Twitter verwenden den vorhandenen Geschenkskorb `img/gross-vorne.jpg` (1100 × 1467, JPEG). Die öffentliche Erreichbarkeit muss nach einer freigegebenen Veröffentlichung erneut geprüft werden; Social-Media-Vorschauen können alte Bilder zwischenspeichern.

## Prüfungen

```powershell
npm test
```

Prüft Regressionstests, JavaScript-Syntax, lokale HTML-Links und Anker, CSS-Ressourcen, vollständige literale JavaScript-Bildpfade, Vorschau-Metadaten, strukturierte JSON-Daten und Sitemap-Ziele. Absolute URLs zu `https://biottoslaedeli.ch` werden lokal zugeordnet. Externe Dienste werden nicht auf Verfügbarkeit geprüft.

Die Verweisprüfung ist eine gezielte statische Prüfung, kein vollständiger HTML-/CSS-/JavaScript-Parser. Dynamisch zusammengesetzte Dateipfade werden nicht ausgewertet; vollständige Pfade in den vorhandenen Bild-Datenlisten verwenden. Sie ersetzt weder Browserprüfung noch rechtliche Prüfung oder den Nachweis einer tatsächlichen Bestellzustellung.

Für die wiederholbare Browserprüfung optional Playwright als lokales Entwicklungswerkzeug installieren (keine Abhängigkeit der Website):

```powershell
npm install --no-save --package-lock=false playwright
npx playwright install chromium
node scripts/browser-check.mjs
```

Die Suite startet selbst einen lokalen Prüfserver, blockiert externe Ressourcen und fängt sämtliche Formspree-Anfragen ab. Sie verwendet ausschliesslich erfundene Testkontakte. Screenshots landen standardmässig im temporären Ordner `biottos-browser-qa`. Optional steuern `CHROMIUM_PATH` den Browserpfad und `QA_OUTPUT_DIR` den Screenshot-Ordner. Durch blockierte Google Fonts zeigen die Tests die vorhandenen Ersatzschriften; Google Maps und reale Dienstverfügbarkeit werden damit nicht bestätigt.

Vor Freigabe alle drei Angebotsseiten und Hauptseitenbereiche bei 360, 390, 768 und 1440 Pixeln ansehen. Navigation, Sprachwechsel, Tastaturfokus, Bildanzeige sowie Bestell-Erfolg, Netzwerkfehler und Mehrfachübermittlung mit abgefangenen Anfragen prüfen. Testbefunde dieses Auftrags stehen in `QUALITY-REPORT.md`.

## Änderungen, Veröffentlichung und Rückkehr

1. `AGENTS.md` lesen, Branch und bestehende Änderungen prüfen.
2. Einen eigenen Branch verwenden, Änderungen durchführen und prüfen.
3. Draft-Pull-Request mit Beschreibung und tatsächlichen Prüfergebnissen erstellen.
4. Erst nach ausdrücklicher Freigabe zusammenführen. Laut Projektregeln kann ein Commit auf `main` über Vercel die öffentliche Website aktualisieren. Die konkrete Vercel-Projektverknüpfung ist hier nicht dokumentiert; Domain-/Hosting-Einstellungen nicht erraten oder verändern.
5. Nach Veröffentlichung öffentliche Links, Vorschau und freigegebenen Zustellungstest prüfen.

Für eine Rückkehr einen fehlerhaften Commit über einen neuen Branch mit `git revert <commit>` rückgängig machen und diesen Stand erneut prüfen und freigeben. Kein `reset --hard` oder Force-Push auf gemeinsam genutzte Branches. Ein erneuter Download eines älteren GitHub-Stands ändert die Live-Website nicht.

## Externe Dienste und Rechte

Formspree: Bestellübermittlung. Google Fonts: Schriften. Google Maps: Karte und Routenlink. WhatsApp: direkte Anfragen und optionaler Link nach Bestellung. Die Vercel-Analytics-/Speed-Insights-Skripte wurden entfernt; Hosting ist davon getrennt. Datenschutztexte sind keine fachlich bestätigte Rechtsberatung.

Eine `LICENSE`-Datei fehlt. Ohne Klärung der Rechte an Code, Fotos, Logo und Texten das Projekt nicht als frei verwendbare Kundenvorlage anbieten. Dieser Auftrag fügt keine Lizenz hinzu.
