# Aktueller verbindlicher Projektstand – Audit-Umsetzung, 9. Oktober 2026

Im Branch `feat/shopify-pickup` liegen eine gemeinsame Zuordnung der Shopify-Varianten, bestätigten Preise und lokalen Produktfotos sowie die Warenkorb-Brücke. Live geprüft: 19 Produkte sind aktiv; die drei Geschenksharassen sind im Online-Store-Kanal veröffentlicht, die 16 einzelnen Sortimentsprodukte noch nicht. Nur veröffentlichte Harassen erhalten einen Checkout-Knopf. Die Website verwendet einen lokalen Shopify-Datenschnappschuss, keinen Live-API-Aufruf und keinen Vercel-Schlüssel. Es wurden keine Shopify-Veröffentlichungen, Theme-Einstellungen oder Checkout-Einstellungen geändert. Native Abholung ohne verpflichtenden Termin bleibt das Zielmodell. Aktuelle Daten: [Produktdaten](produktdaten-bestaetigt.md); Umsetzungs- und Prüfstatus: [Audit-Umsetzung](audit-umsetzung-2026-10-09.md).

Die folgenden Abschnitte sind eine historische Chronologie. Angaben zu früher deaktivierter Brücke, Pickeasy, alten Füllmengen oder Testzahlen sind keine aktuellen Arbeitsanweisungen.

---

# Shopify-Arbeitsstand – 9. Oktober 2026

Basis nach neuem Betreiber-Upload: `18d62de08f679ec9de094bdea55f2b621f1c2034`, Branch `feat/shopify-pickup`.
Root-AGENTS.md vollständig gelesen; keine weiteren AGENTS.md im Repository-Tree.
PR #3 offen, Draft. main frisch gelesen: `62c2893cc113f1506a167afa240596a86f1027d3`.

| Nr. | Aufgabe | Ergebnis / verbleibende Grenze |
|---|---|---|
| 1 | 10-Liter-Foto | Während der Arbeit als Süssmost pasteurisiert 10 Liter.png hochgeladen (18d62de). Upload erhalten, Bild geprüft und der 10-L-Variante zugeordnet. |
| 2 | Produktdaten dauerhaft sichern | 9 Einzelprodukte und 3 Süssmostgrössen im Produktentwurf erfasst; Betreiberangaben, Füllmengen und gemeldete Vorräte getrennt von Livebestand. Vollständige Angaben in produktdaten-bestaetigt.md. Masterplan wird mit diesem Ergebnis aktualisiert. |
| 3 | Fehlende Produktdaten | Konkrete Erfassungsliste für Traubensaft, Dörrfrüchte und neue Geschenksharassen erstellt. Betreiberantworten fehlen. |
| 4 | Preise / Lagerung / Haltbarkeit | Für neue Produkte weiterhin unbekannt; keine erfundenen Preise oder Allergenfrei-Aussagen. Glas und Deckel Tomatensauce ca. CHF 0.90 sind keine Vollkosten. |
| 5 | Shopify-Produkte / Varianten | Frisch geprüft: exakt 3 bestehende aktive Körbe, keine weiteren Produkte. Bestehende Varianten zugeordnet; neue Produkte wegen offener Daten nicht angelegt. |
| 6 | Bildoptimierung | 25 WebP-Ableitungen direkt in img/, maximal 960 px, ohne Beschnitt. 41.917.237 → 2256614 Bytes (rund 95 % weniger). Originale bleiben unverändert. picture-Element mit Original als Format-Fallback eingebunden. |
| 7 | Katalog | Frischer realer Request: HTTP 400, Online Store channel is locked. Schutz nicht aufgehoben. Kein öffentlicher Token oder zusätzlicher Verkaufskanal eingerichtet. |
| 8 | Gemeinsamer Warenkorb / Mobiltest | Bestehende Brücke bleibt erhalten. Gemeinsamer Warenkorb für neues Sortiment und echter mobiler Shopify-Test weiterhin offen. 20 vorhandene Tests und 20 Quelldateiprüfungen bestanden. Neue Browserprüfung scheiterte vor Start: Chromium fehlt, Browserdownload lieferte ungültige ZIPs. |
| 9 | Inhalte / Betrieb | Veröffentlichte Shopify-Kontaktseite contact erfolgreich um bestätigte Betreiberadresse, Telefon und E-Mail ergänzt. Horizon weiterhin MAIN; Kopie UNPUBLISHED. Nur Datenschutz-Policy vorhanden; übrige Inhaltslücken bleiben. App-Abonnements: Zugriff auf activeSubscriptions einer fremden App verweigert. Kein No-show-Versand, keine Testauftragsbereinigung, keine Kostenfreigabe. |
| 10 | Startprüfung / Veröffentlichung | Nicht startbereit wegen der oben genannten Daten-, Katalog-, Checkout- und Betriebsblockaden. Kein Merge, Theme-Publish oder Produktionsdeploy. |

## Ausgeführte Prüfungen

- 54 ursprüngliche Binärdateien geladen und gegen Git-Blob-SHA geprüft.
- 25 WebP-Dateien mit Pillow dekodiert; Tomatensauce visuell geprüft.
- 20/20 bestehende Node-Tests und 20 Quelldateiprüfungen erfolgreich.
- Bestätigte Füllmengen und Vorräte separat geprüft; insbesondere Kirschessig 250 ml und Süssmost 3/5/10 L mit 25/50/25 Stück.
- Unbekannte Preise, Shopify-Bestände und Produkt-IDs bleiben null.
- Kein neuer Browser-/Checkout-/Zahlungs- oder Zustellungstest als bestanden behauptet.

Die Kontaktänderung wurde von Shopify ohne userErrors bestätigt. Alle weiteren Arbeiten bleiben im Entwicklungszweig. Es wurden keine Bestellungen, Zahlungen, Kundenmails, Stornierungen oder Rückerstattungen ausgelöst.

