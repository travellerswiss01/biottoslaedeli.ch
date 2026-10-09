# Audit-Umsetzung – 9. Oktober 2026

Basis: feat/shopify-pickup, 23027197bc72438d64cbce54fd641097539a579a. Nur Branch-Vorschau; keine Produktions- oder Shopify-Admin-Änderung. Userauftrag: Apfellogo sinnvoll integrieren und die 28 Auditpunkte schrittweise bearbeiten.

| Auditpunkt | Umsetzung / Status |
|---|---|
| A01 Mobile Geschenkdetails | CSS-Kaskade repariert, lesbare und bedienbare Mengen-Details. Auf 320, 360 und 390 Pixeln im Browser bestanden. |
| A02 Roter Test | Sachliche Prüfung von Inhaltsprodukten und Mengen ersetzt veralteten Gesamtstring. Lokal und in GitHub Actions bestanden. |
| A03 Verkaufsweg neues Sortiment | Gemeinsamer Warenkorb für bestehende drei Produkte umgesetzt. Neue 19 Entwürfe bleiben mangels bestätigter Daten/IDs nicht bestellbar; keine falsche Zuordnung. |
| A04 Fehlende Daten | Vollständige aktualisierte Daten-/Lückenliste erstellt. Betreiberangaben, verbindliche Preise und Freigabe fehlen weiterhin. |
| A05 Überschrift und Einstieg | Punkt entfernt; kurzer Untertext unmittelbar darunter; reduzierte Abstände und kompakter Hinweis. |
| A06 Ordnung | Sechs Kategorieabschnitte, passende Überschriften und direkte Kategorieauswahl. Himbeeressig bei Essigen. |
| A07 Mobile Karten | Sehr schmale Geräte einspaltig; Geschenk-Inhalte zweispaltig und mit 16-Pixel-Beschriftung; Saftgrössen bleiben nebeneinander. |
| A08 Schwarze Schrift | Dunkle automatische Textpalette entfernt; gemeinsame helle Darstellung, schwarze fette Produktnamen. |
| A09 Footer | Auf allen Seiten lesbare 16-Pixel-Links und mindestens 44-Pixel-Klickflächen. |
| A10 Navigation | Neue Harassen zur gefilterten Vorschau; bereits bestellbare Körbe ausdrücklich getrennt benannt; Warenkorb erreichbar. |
| A11 Klare Texte | „Produkte“, ein Vorschauhinweis, geordnete Produktkarten und ausdrücklicher offener Preisstatus. |
| A12 Ansprache | Geschenkskorbseite auf du vereinheitlicht; Firmenansprache bleibt Sie. Bestehende Sprachumschaltung erhalten. |
| A13 Schriften | Gleiche vorhandene Schriftfamilien auch in Vorschau/Warenkorb geladen; Fallbacks vorhanden. |
| A14 Bildoptimierung | Fehlende WebP-Ableitungen von Birnenweggen und Himbeeressig erstellt; Originale unverändert. |
| A15 Boxgrösse | Einheitliche proportionale Skalierung: 5-Liter-Box kleiner als 10 Liter, keine getrennte X/Y-Verzerrung. |
| A16 Grossansicht | Dialog lädt Originalauflösung; deutliches „× Schliessen“; Escape und Fokus-Rückkehr. |
| A17 Gemeinsamer Warenkorb | Kombinieren, Menge ändern, entfernen, Reload, Speicherfehler und ungültige Daten berücksichtigt. Echte Shopify-Checkout-Abnahme offen. |
| A18 Abholbestätigung | Historische #1003 nicht als aktuelle Zustellabnahme behandelt. Erreichbare Testadresse und autorisierter End-to-End-Test fehlen; keine E-Mail versendet. |
| A19 Shopzugang | Kein Schutz oder Kanal geändert. Aktuelle öffentliche Katalog-/Checkout-Abnahme weiterhin offen. |
| A20 Produktdokumentation | Aktuelle Tabelle aus den Daten erzeugt; alle Essige 250 ml, bestätigte Gläser 250 ml; Masterplan wird fortgeschrieben. |
| A21 Integrationsstatus | Aktueller aktiver Stand vor die eindeutig gekennzeichnete historische Chronologie gesetzt. |
| A22 Lokaler Server | MIME-Typen für Module, PNG, WebP und weitere Bilder ergänzt. |
| A23 Browserprüfung | Neue aktuelle Suite mit fünf Bildschirmbreiten, Sortiment, Bilddialog, Warenkorb und No-JS-Fallback. Separater isolierter Formular-Regressionslauf. |
| A24 CI | Vorschau-Branch in Pushfilter aufgenommen; Bilddecodierung und Browserprüfung hinzugefügt; QA-Artefakte aufbewahrt. |
| A25 Leere Bilder | Nullbyte-Verweise abgelehnt; dynamische Daten prüfen Originale/WebP; vollständige Rasterdecodierung zusätzlich. |
| A26 CSS-Ordnung | Vorschau-CSS zusammenhängend neu geordnet; gemeinsame Lesbarkeitsregeln zentralisiert. Historische Regeln anderer Funktionen erhalten, keine vollständige Neufassung der ganzen Website. |
| A27 Ohne JavaScript | Vollständiges statisches Sortiment mit Grössen, Richtpreisen und direkt vergrösserbaren Fotos ergänzt. |
| A28 Freigabe/Rollback | Aktuellen Prüf-/Releaseprozess und Revert-Verfahren dokumentiert. Veröffentlichung bleibt separat freizugeben. |

## Apfellogo

Das bereitgestellte Logo ist in allen Haupt-Seitenköpfen, auf der Startseite und im Warenkorb integriert. Seine Zeichnung und Beschriftung werden nicht geändert. Der Darstellungsrahmen blendet nur die grossen weissen Ränder aus; ein optimiertes WebP wird geladen. Originalupload unverändert aufbewahrt; optimierte Ableitung im Projekt.

## Tatsächlich ausgeführte Prüfungen

- 31 Node-Tests lokal bestanden, einschliesslich gemeinsamem Warenkorb, ungültiger Varianten, Speicherung und Entwurfs-Sperre.
- 74 Rasterdateien vollständig decodiert, keine Bildfehler.
- JavaScript-Syntax und lokale Verweise: 26 Quelldateien erfolgreich geprüft. Lokaler Server zusätzlich durch tatsächliche HTTP-HEAD-Abfragen auf Modul-/PNG-/WebP-MIME-Typen geprüft.
- GitHub Actions für Seitenstand `7edf38f`: erfolgreich. 134 aktuelle Browserprüfungen bei 320, 360, 390, 768 und 1440 Pixeln; 195 Fotoöffnungen, keine JavaScript-Fehler oder fehlenden lokalen Ressourcen. Mobile Geschenkdetails, schwarze Produktnamen, Footer-Klickflächen, Suche/Filter, Escape/Fokus, Warenkorb und JavaScript-Fallback bestanden.
- 90 isolierte Formularprüfungen bestanden, sieben simulierte Anfragen, keine externe Übermittlung. Screenshots als QA-Artefakt erhalten. [Prüflauf](https://github.com/travellerswiss01/biottoslaedeli.ch/actions/runs/37950822236).
- Desktop-Vorschau visuell geprüft: Apfellogo, Originalfoto der grossen Harasse mit BIOTTOS-Etikette, gut sichtbares Schliessen, kombinierter Warenkorb mit CHF 69.90.
- Folgecommit `fdfceb4` ändert ausschliesslich QA-Diagnose und Zeitbegrenzung; kein Anwendungscode. Dessen wiederholter Lauf wird separat kontrolliert.
- Kein realer Checkout, keine Zahlung, Bestellung oder Kundenmail ausgelöst.

## Konkrete verbleibende Grenzen

Neue Shopify-Produkte können ohne verbindliche Preise und vollständige Daten nicht als kaufbar freigegeben werden. Aktuell offen sind insbesondere Birnenweggen-Verkaufseinheit, Preise für sieben Produktgruppen sowie Süssmostvarianten, Zutaten/Allergene/Lagerung/Haltbarkeit und die zweite Traubensaftgrösse. Schrift-, Bild- und Warenkorbprüfungen ersetzen keine juristische oder Lebensmittel-Freigabe. Reale mobile Geräte, tatsächlicher Shopify-Checkout und Zustellung sind noch abzunehmen.
