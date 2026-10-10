# Aktueller Qualitätsnachweis – Audit-Umsetzung, 9. Oktober 2026

31 lokale Node-Tests und statische Prüfung von 26 Quelldateien bestanden. 74 Rasterbilder vollständig decodiert. Der lokale Server liefert Module, PNG und WebP mit korrektem MIME-Typ (echte HTTP-Prüfung). Die Vorschau wurde auf Desktop visuell geprüft; das Apfellogo ist auf Startseite, Sortiment und Warenkorb korrekt eingebunden. Ein Mischwarenkorb mit Chli & Fii und Gross & Guet ergab CHF 69.90, blieb nach Reload erhalten und wurde anschliessend wieder geleert. Kein realer Checkout ausgelöst.

134 aktuelle Browserprüfungen bei fünf Bildschirmbreiten, 195 Fotoöffnungen und 90 isolierte Formspree-Rückfallprüfungen in GitHub Actions bestanden, ohne JavaScript-Fehler; Ergebnisse im [Audit-Protokoll](docs/audit-umsetzung-2026-10-09.md). Frühere Testzahlen unten gelten ausschliesslich für den damaligen Stand.

---

## Historische Qualitätsnachweise

# Qualitätsbericht – Biottos Lädeli

Stand: 7. Oktober 2026. Ausgangspunkt: `main`, Commit `9e23cdd`. Arbeitsbranch: `fix/website-quality`. Die vollständige Root-`AGENTS.md` wurde gelesen; weitere `AGENTS.md` waren im Checkout nicht vorhanden. Der Checkout war vor Beginn sauber.

## Umgesetzt

| Aufgabe | Ergebnis und Dateien |
|---|---|
| Fehlende Storyfotos | Verweise in `js/app.js` repariert. Echtes Erntefoto statt nicht vorhandener Dateien, sachlich passende Alternativtexte. Alle fünf Textschritte bleiben vorhanden. |
| Linkvorschau | Alle drei Angebotsseiten verwenden `gross-vorne.jpg`; Format, Abmessungen und Bildbeschriftung ergänzt. |
| Bilddarstellung | Intrinsische Bildabmessungen in `index.html` an reale Dateien angepasst; vorhandenes Lazy Loading erhalten, Einstiegslogo priorisiert. |
| Dokumentation | `README.md` enthält aktuelle Branches, Windows-Vorschau, Server, Tests, Dienste, Preisstellen, Freigabe- und Rückkehrablauf. Veraltete Analytics-/Sitemap-Angaben entfernt. |
| Statische Prüfung | `scripts/check-site.mjs` prüft auch JavaScript-Bildpfade, CSS, eigene absolute URLs, Metadaten, strukturierte JSON-Daten und Sitemap. Regressionstests ergänzt. |
| Entwicklungsumgebung | GitHub-Workflow auf unterstützte Node.js-Reihe 24 gestellt. Abgleich mit offiziellem Releaseplan; keine Produktionspakete hinzugefügt. |
| Bestelllogik | Schweizer Kalenderdatum, korrekt begrenzte Monatsenden, frische Terminauswahl, Validierung von Variante/Datum/Zeit/Menge/Name, Sperre während Übermittlung und 20-Sekunden-Abbruch. Nicht ausgewähltes Kontaktfeld wird nicht übermittelt. |
| Sprache | Originaltexte und Attribute werden für die Rückübersetzung erhalten; dynamische Story- und Fehlermeldungen wenden die Sprachauswahl an. Zusätzliche Bedienelemente übersetzt. |
| Mobile Darstellung | Körbe untereinander mit lesbaren Texten und Bildern, keine überlappenden Badges; Süssmost-Schritte in zwei Spalten; Bestellbutton verdeckt keine Inhalte. |
| Zusatzseiten und Tablet | Navigation kann umbrechen; Zusatzseiten haben konsistente Karten und Layouts. Überlauf von Lucias Kontaktbereich bei Tabletbreite korrigiert. |
| Tastatur | Sichtbare Fokusmarkierung ergänzt. Bestelldialog berücksichtigt nur sichtbare Bedienelemente. Fotoansicht per Tastatur erreichbar; Escape erhält einen darunter offenen Bestellzettel. Rechtsdialog setzt Fokus und gibt ihn zurück. |

## Tatsächlich ausgeführte Prüfungen

- `npm test`: drei Regressionstests bestanden; sämtliche erfassten lokalen Verweise und JavaScript-Syntaxprüfungen bestanden.
- `git diff --check`: bestanden.
- `CHROMIUM_PATH=/tmp/chromium node scripts/browser-check.mjs`: **90 Prüfungen bestanden, sieben simulierte Formspree-Anfragen, keine JavaScript-Laufzeitfehler und keine fehlgeschlagenen lokalen Ressourcen**.
- 68 Layout-/Bildprüfungen: 15 Hauptseitenbereiche und zwei Zusatzseiten jeweils bei 360, 390, 768 und 1440 Pixeln. Kein horizontaler Dokumentüberlauf; sichtbare Bilder geladen.
- Fünf Storyschritte und ihre aktiven Zustände geprüft.
- Mobile Navigation und Wechsel Deutsch → Schweizerdeutsch → Deutsch geprüft.
- Alle drei Varianten mit Totalberechnung geprüft, einschliesslich zehn grossen Körben (CHF 499.50).
- Erfolg, HTTP-Fehler, Netzwerkabbruch und doppelte Submit-Ereignisse simuliert. Keine Anfrage hat Formspree erreicht.
- Telefonkontakt geprüft: zuvor eingegebene E-Mail wurde nicht mitgesendet.
- Leerzeichen als Name und Menge 11 wurden ohne Anfrage zurückgewiesen.
- Veraltete Datumswahl nach Schweizer Mitternacht zurückgewiesen; Samstag überspringt Sonntag; 30. November + drei Monate endet vor März, mit letzter zulässiger Abholung am Samstag, 27. Februar 2027.
- Browsergerätezeitzone absichtlich `America/Los_Angeles`: Abholdatum blieb korrekt auf `Europe/Zurich` bezogen.
- Fokusumlauf im Bestellzettel, Fotoöffnung per Enter, Rückkehr mit Escape und Rechtsdialog geprüft.
- Screenshots der Hauptseite, mobilen Korbauswahl, Süssmost-Geschichte und Zusatzseiten visuell geprüft. Die Screenshotprüfung fand zusätzliche mobile Überlappungen, die reine Überlaufmessung nicht erkannte; diese wurden korrigiert.
- Metadaten, Sitemap und robots.txt lokal abgeglichen. Namen, Preise, Telefonnummer, Abholzeiten und Zahlungsverfahren im vorhandenen Code abgeglichen; keine neuen Geschäftsdaten erfunden.
- Geänderten Code auf Geheimnisse und Verarbeitung von Formularwerten geprüft. Kontaktwerte werden mit `textContent` oder URL-Kodierung ausgegeben; keine neuen Zugangsdaten oder privaten Formulardaten eingecheckt.

## Grenzen und verbleibende Punkte

- Die drei Originalfotos fehlen. Die vorhandene Ernteaufnahme dient mehreren Storyschritten; passende Originalbilder würden die Geschichte abwechslungsreicher machen.
- Reale Bestellannahme und Zustellung an Biottos Lädeli wurden nicht getestet. Ein Timeout/Netzwerkfehler ist kein Beweis, dass ein Dienst eine Anfrage niemals angenommen hat; vor erneuter Bestellung bei Unsicherheit nachfragen.
- Externe Ressourcen waren in der Browser-Suite absichtlich blockiert. Screenshots zeigen Ersatzschriften. Öffentliche Bild-Erreichbarkeit, Google Fonts, Maps und Social-Media-Caches müssen nach freigegebener Veröffentlichung separat geprüft werden.
- Browserprüfung in Chromium, keine Behauptung über Safari/Firefox oder physische Geräte. Keine vollständige WCAG-, Sicherheits- oder Rechtsprüfung.
- Sprache bleibt das bestehende Wörterbuchsystem; neue nicht hinterlegte Texte bleiben deutsch. Keine vollständige sprachliche Neufassung vorgenommen.
- Umfangreiche historische CSS-Überschreibungen in `css/style.css` bleiben erhalten. Gezielte doppelte Regeln wurden in `css/relaunch.css` zusammengeführt; keine riskante vollständige CSS-Neuordnung.
- Preise stehen weiterhin auch in statischen Texten und strukturierten Daten. Die README benennt alle gemeinsam zu pflegenden Stellen.
- Feiertagsausnahmen, Verfügbarkeit und Kapazitätsprüfung sind nicht im Projekt definiert. Keine solchen Regeln ergänzt.
- Eine Lizenz fehlt weiterhin; Rechteklärung bleibt beim Eigentümer.
- Keine Änderung an `main`, kein Merge, keine Produktionsveröffentlichung und keine Änderung an Hosting oder Domain. Eine mögliche automatische Branch-Vorschau beim Push ist nicht gleichbedeutend mit einer Produktionsfreigabe.

## Screenshots

Screenshots der lokalen Prüfung, mit blockierten externen Diensten:

- [Korbauswahl auf dem Handy](docs/qa/koerbe-390.png)
- [Süssmost auf dem Handy](docs/qa/suessmost-390.png)
- [Geschenkskörbe auf dem Desktop](docs/qa/geschenkskoerbe-1440.png)
- [Startseite auf dem Desktop](docs/qa/start-1440.png)

## Freigegebene Korbauswahl (7. Oktober 2026)

Desktop: drei ruhige Karten mit Foto, Korbname, Preis, Bestellbutton und aufklappbaren Inhalten. Darunter eine dreistufige Bildanleitung; Geschenk-Anlässe stehen bei der Überschrift, der Firmenlink im Footer.

Mobile: „Was möchtest du schenken?“ mit Mitbringsel, Dankeschön und Grosses Geschenk. Vollständige Fotos, Preise, direkte Bestellbuttons und aufklappbare Inhalte. Keine vorgelagerte Auswahl, keine Wischpflicht und keine sichtbare Bestellanleitung. Originale Korbnamen bleiben in Bestelllogik und Desktop erhalten.

Die schmale mobile Leiste auf der Korbansicht zeigt Logo und Menü. Sie blendet beim Herunterscrollen aus und beim Hochscrollen ein. Bei geöffnetem Menü oder Tastaturfokus bleibt sie sichtbar. Sprachwahl im Menü; auf Desktop und anderen Ansichten bleibt ihre bisherige Position erhalten.

Prüfung: npm test (drei Regressionstests und statische Prüfung), git diff --check und 90 Browserprüfungen bei 360/390/768/1440 Pixeln bestanden. Sieben Bestellanfragen simuliert. Zusätzlich Aus-/Einblenden, Menü und Sprachwechsel im Browser geprüft und als 10-Sekunden-Demo aufgezeichnet.

Nachweise: docs/qa/mobile-navigation/open.png, scrolled.png, menu.png und demo.mp4. Keine reale Bestellung, kein Merge, keine Produktionsveröffentlichung. Geschäftsdaten und bestehende Grenzen bleiben unverändert.

