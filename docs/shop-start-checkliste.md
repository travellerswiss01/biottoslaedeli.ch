# Arbeitscheckliste – Korbübersicht

Arbeitsstand: 9. Oktober 2026 · Vorschau-Branch `feat/shopify-pickup`  
Die Häkchen bedeuten, dass ein Schritt anhand des Codes oder der Browserprüfung bestätigt wurde. Die Reihenfolge folgt dem vereinbarten Vier-Punkte-Plan.

1. [x] Projektregeln, vorhandenen Branch und uncommittierte Änderungen geprüft.
2. [x] Geschenkskorb-Bereich geprüft: auf dem Handy waren die vollen Korbnamen und Inhalte nicht gemeinsam sichtbar; der Inhalt musste aufgeklappt werden.
3. [x] Drei Korbkarten übersichtlich zeigen: vollständiger Name, Foto, Preis, Spezialitätenzahl und kompletter Inhalt direkt sichtbar; zweite Fotoansicht optional; Auswahl klar beschriften.
4. [x] Codeprüfung und Browserprüfung abschliessen: Korbinhalt, mobile und Desktopdarstellung, Tastaturbedienung, Fotovergrösserung, Schliessen und Fokus-Rückkehr geprüft. Die CI-Browserläufe und die Codeprüfungen sind erfolgreich.

## Abgrenzung

Diese Liste dokumentiert nur den begonnenen Korbauftrag. Inhalte und Preise werden aus dem bestehenden Projekt übernommen und in dieser Arbeit nicht neu festgelegt. Andere Startfreigaben oder offene Produktdaten gehören nicht zu diesen vier Arbeitsschritten.

## Shopify-Vorschau vorbereitet · 9. Oktober 2026

- [x] 19 aktive Shopify-Produkte und Preise live abgeglichen.
- [x] Alle Shopify-Produkt- und Varianten-IDs in `js/shopify-product-data.mjs` erfasst.
- [x] Drei veröffentlichte Geschenksharassen für den gemeinsamen Shopify-Warenkorb aktiviert.
- [x] Die 16 aktiven, aber noch nicht im Online-Store veröffentlichten Produkte sichtbar gemacht und bis zur Freischaltung für Bestellungen gesperrt.
- [x] Die Namen, Preise, Fotos und Inhalte der drei Harassen in der Start- und Harassenseite angeglichen.
- [x] Desktop-/Mobil-Code, Varianten-Zuordnung und Foto-Assets geprüft: 35 Node-Tests, Seitenprüfung und 74 Bilddekodierungen bestanden.
- [ ] Aktuellen Browser-Screenshot-Lauf ausführen: Chromium fehlt in der Umgebung und liess sich wegen der Netzwerksperre nicht installieren.
- [ ] Vercel-Vorschau erstellen und im Browser gemeinsam prüfen. Dafür müssen die noch uncommittierten Änderungen auf `feat/shopify-pickup` als Vorschau bereitgestellt werden.
- [ ] Die 16 übrigen Produkte erst nach Freigabe im Shopify-Online-Store-Kanal veröffentlichen; dies ändert die öffentliche Verkaufssichtbarkeit.

Preise und Veröffentlichungsstatus: [Shopify-Produktdaten](produktdaten-bestaetigt.md). Die Vorschau nutzt einen lokalen Datenschnappschuss; Änderungen in Shopify werden nicht automatisch in den Website-Code synchronisiert.
