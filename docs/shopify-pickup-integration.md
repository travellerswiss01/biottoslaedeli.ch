# Shopify-Abholung – Vorbereitungsstand

**Stand: 7. Oktober 2026.** Die Integration ist vorbereitet, aber der Shopify-Checkout ist nicht freigegeben. Diese Datei hält den tatsächlichen Shopstand, die vorgesehene Verbindung und die Abnahmebedingungen fest. Sie bestätigt nicht, dass Shopify-Bestellungen bereits angenommen oder zugestellt werden.

## Aktueller Shopify-Stand

- Shopwährung: CHF; Zeitzone: CEST; Land: Schweiz.
- Shopstatus: Testzeitraum. Shopify startet Shops im privaten Modus bzw. mit inaktivem Checkout. Während eines Testzeitraums kann verkauft werden, wenn ein Zahlungsanbieter eingerichtet und der private Modus deaktiviert ist. Freischaltung und Zahlungsanbieter wurden hier nicht geprüft.
- Shopify meldet den Tarif **Basic**. Im Admin unter Einstellungen → Plan wird eine Aktion von **CHF 1 pro Monat bis 6. Januar 2027** angezeigt; **CHF 29 pro Monat** ist als regulärer Betrag durchgestrichen. Der genaue Betrag der späteren Rechnung sollte nach Ablauf der Aktion erneut geprüft werden. Die Planansicht nennt Kartengebühren von 2,95 % + CHF 0,30 online und 2 % + CHF 0,00 vor Ort. Das sind Kartengebühren; sie belegen keine Gebühr auf Barzahlung oder TWINT bei Abholung. Shopify Plus ist nicht aktiv.
- Vor diesem Auftrag waren keine Produkte vorhanden. Die drei unten aufgeführten Produkte wurden als **Entwürfe** mit belegten Inhalten, Preisen und bestehenden Websitefotos angelegt. Die erneute Produktprüfung bestätigte die Entwürfe und Bilder; alle drei Varianten zeigen Lagerbestand **0**. Sie sind nicht veröffentlicht und nicht verkaufsbereit. Es wurden keine Kaufbuttons in die Website eingebaut.
- Der vorher unvollständige Standort ist jetzt «Biottos Lädeli», Hauptstrasse 90, 8357 Maischhausen.
- Pickeasy Freemium ist aktiviert. Der Admin zeigt eine 14-tägige Testphase bis **21. Oktober 2026**; die Nutzungsgebühr kann **USD 9.99 je 30 Tage** betragen, wenn mehr als 10 App-Bestellungen gezählt werden. Diese Abrechnungsschwelle gilt für die App und ist keine Warenkorb-Mengenbegrenzung. Zahlungsanbieter und manuelle Zahlungsarten sind noch nicht abschliessend geprüft.

| Geschenkidee | Shopify-Produkt | Preis | Status | Shopify-Produkt-ID | Varianten-ID |
|---|---|---:|---|---|---|
| Mitbringsel | Chli & Fii | CHF 19.95 | Entwurf | `gid://shopify/Product/10659082797322` | `gid://shopify/ProductVariant/53868017549578` |
| Dankeschön | Fein & Guet | CHF 29.95 | Entwurf | `gid://shopify/Product/10659082830090` | `gid://shopify/ProductVariant/53868017582346` |
| Grosses Geschenk | Gross & Guet | CHF 49.95 | Entwurf | `gid://shopify/Product/10659082895626` | `gid://shopify/ProductVariant/53868017647882` |

Das sind echte IDs aus diesem Shop, aber wegen des Entwurfsstatus keine freigegebenen Live-Kaufziele. Preise stehen weiterhin zusätzlich in Website-HTML, strukturierten Daten und `js/app.js`. Bis eine automatische Produktdarstellung umgesetzt und geprüft ist, müssen Preisänderungen gemeinsam in Shopify und den Websitequellen erfolgen.

## Vorgesehene Architektur

Die bestehende statische Website und die freigegebene Produktdarstellung bleiben erhalten. Nach erfolgreicher Abnahme soll jede Produktkarte die gewählte Shopify-Variante mit Menge 1 vorladen und zur Shopify-Onlineshop-Warenkorbseite führen. Shopify dokumentiert Warenkorb-Permalinks für vorausgewählte Varianten und Mengen; mit `storefront=true` kann der Link zuerst den Onlineshop-Warenkorb statt des Checkouts öffnen. Dadurch kann ein Terminpicker auf Produkt- oder Warenkorbseite angezeigt werden.

Der Shopify Buy Button ist kein Standardweg: Shopify dokumentiert, dass Buy Buttons nicht mit Apps aus dem Shopify App Store kompatibel sind. Ein Direktlink, der den Warenkorb überspringt, ist für einen verpflichtenden Termin ebenfalls nicht freigegeben. Direkte Checkout-Aufrufe, Shop Pay und andere beschleunigte Wege müssen vor Freigabe nachweislich einen gültigen Termin verlangen.

Shopify-Abholung am Standort und die Wahl eines konkreten Abholdatums mit Uhrzeit sind verschiedene Funktionen. Die native Abholung zeigt Standort und erwartete Bearbeitungszeit; der exakte Termin benötigt eine kompatible Terminlösung. Es gibt keinen Nachweis, dass eine App auf diesem Shop, Tarif, Theme und Warenkorbweg funktioniert oder den Termin zuverlässig in der Bestellung speichert.

### Vorläufiger Termin-App-Kandidat

[Pickup Delivery Date Pickeasy](https://apps.shopify.com/order-delivery-date-time) ist installiert und Freemium ist aktiviert. Laut Admin läuft die 14-tägige Testphase bis **21. Oktober 2026**; bei mehr als 10 von Pickeasy gezählten App-Bestellungen kann eine Nutzungsgebühr von **USD 9.99 je 30 Tage** anfallen. Das ist eine App-Abrechnungsschwelle, kein Limit für die Anzahl der Körbe im Warenkorb. Die tatsächliche Zählweise und Abbuchung sind nicht durch eine Testbestellung geprüft. Der Checkout-Seiten-Widget-Hinweis aus der App-Seite macht eine Prüfung im Warenkorb-/Theme-Weg erforderlich.

Pickeasy ist für Abholung eingerichtet: Montag–Samstag, 08:00–18:00 Uhr, 30-Minuten-Schritte, 1 Tag Vorlauf und ein sichtbarer Kalender von 90 Tagen; Sonntag ist als Vorbereitungstag ausgeschlossen. Die Checkout-Validierung für ein gewähltes Zeitfenster ist eingeschaltet. Diese Einstellungen wurden aus dem Admin-Stand übernommen, aber im Storefront-Theme noch nicht end-to-end getestet. Keine Bestellung ausgelöst.

### Installationsberechtigungen

Die Installationsseite nennt Zugriff auf Kundendaten (Name, E-Mail, Telefonnummer, physische Adresse sowie Geolokalisierung, IP-Adresse, Browser und Betriebssystem), Inhaberdaten (Name, E-Mail, Telefonnummer, physische Adresse), Kunden- und Produktdaten, Inventar und Kollektionen, die gesamte Bestellhistorie der letzten 60 Tage, Bestellentwürfe und Versand-/Fulfillmentdaten. Zusätzlich werden Bearbeitungsrechte für Bestellungen, Shopify Functions (Zustellanpassungen und Warenkorb-/Checkout-Validierungen) sowie Onlineshop-Themes und Skript-Tags angefordert. Standorte und Gebietsschemas werden angezeigt. Diese Berechtigungen wurden bei der Installation erteilt. Die Nutzung/Abfrage tatsächlicher Kunden- oder Bestelldaten wurde nicht getestet; es wurde keine App-Bestellung ausgelöst.

## Abholung und Zahlung

Der Betreiber hat am 7. Oktober 2026 bestätigt: frühestens am Folgetag, Montag bis Samstag, 08:00–18:00 Uhr, Halbstundenschritte, bis drei Kalendermonate voraus, Zeitzone Europe/Zurich. Feiertage, Sperrtage, Kapazitäten und Vorbereitungszeiten ausser dem dokumentierten Mindestvorlauf bleiben offen.

Der Betreiber hat bestätigt: gemischte Sorten sind erlaubt; ein 10-Körbe-Limit ist nicht erforderlich. Es wird keine Gesamtstückzahlgrenze für den Shopify-Warenkorb eingerichtet. Die Pickeasy-App-Abrechnungsschwelle von 10 App-Bestellungen ist davon getrennt und kann bei Überschreiten USD 9.99 je 30 Tage auslösen. Vor Freigabe bleibt zu testen, ob der Warenkorb mehrere Varianten korrekt zusammenführt und Pickeasy das erforderliche Zeitfenster in der Bestellung speichert.

Die Website nennt weiterhin Zahlung bei Abholung, bar oder TWINT. Dafür ist eine manuelle Shopify-Zahlungsart mit klaren Anweisungen vorgesehen. Manuelle Shopify-Bestellungen bleiben bis zur tatsächlichen Zahlung als unbezahlt markiert; erst nach Erhalt von Bargeld oder TWINT wird der Zahlungsstatus im Admin auf bezahlt gesetzt. TWINT vor Ort ist keine Online-TWINT-Zahlung über Shopify Payments. Onlinezahlung wird nicht verpflichtend aktiviert.

## Betreiberablauf nach erfolgreicher Freigabe

Diese Schritte gelten erst, nachdem App, Standort, Zahlungsart, Kundenmitteilung und eine gekennzeichnete Testbestellung geprüft wurden.

1. **Bestellung finden:** Shopify-Admin → Bestellungen; nach Bestellnummer oder Kundenkontakt suchen. Das Admin-Konto ist die verbindliche Quelle, nicht eine Website-Erfolgsmeldung.
2. **Termin und Standort prüfen:** Datum, Uhrzeit, Standort und Artikel im gespeicherten Bestellbeleg kontrollieren. Die genaue Stelle, an der die Termin-App den Wert ablegt, muss im Pilot dokumentiert werden.
3. **Bestellung vorbereiten:** Erst nach betrieblicher Prüfung den in Shopify vorgesehenen Schritt «Bereit zur Abholung» ausführen. Eine Bestelleingangsbestätigung bedeutet nicht, dass der Korb bereits vorbereitet ist.
4. **Zahlung bei Abholung erfassen:** Bestellung bleibt unbezahlt, bis Bargeld oder TWINT eingegangen ist. Dann die Zahlung im Admin als bezahlt markieren.
5. **Stornieren:** Bestellung über Shopify stornieren und den Grund erfassen. Bei manueller, noch unbezahlter Zahlung ist keine Online-Rückerstattung auszulösen. Historische Bestellungen nicht löschen.
6. **Benachrichtigungsproblem erkennen:** Bestellung im Admin prüfen. Bei fehlender E-Mail zuerst Status und Empfängeradresse kontrollieren. Betreiber- und Kundenzustellung müssen im separaten Zustellungstest nachgewiesen werden.

## Kosten und Freigabepunkte

| Position | Aktueller Preis/Status | Einordnung |
|---|---|---|
| Shopify | Basic; CHF 1/Monat bis 6. Januar 2027 laut Planansicht; regulär CHF 29/Monat durchgestrichen | Kartengebühren laut Planansicht: online 2,95 % + CHF 0,30; vor Ort 2 % + CHF 0,00. Nicht mit Bar/TWINT bei Abholung gleichzusetzen. |
| Termin-App Pickeasy | Freemium aktiviert; Testphase bis 21. Oktober 2026; bis 10 App-Bestellungen laut Admin ohne Nutzungsgebühr, bei Überschreiten USD 9.99 je 30 Tage | Separat vom Warenkorb-Mengenlimit; keine Bestellung ausgelöst. |
| Shopify manuelle Zahlung | Keine externe Shopify-Transaktionsgebühr für manuelle Zahlungsmethoden laut Shopify-Hilfe | Bar/TWINT vor Ort bleibt vorgesehen; Zahlung erst nach Eingang als bezahlt markieren. |
| Shopify Payments online | Nicht eingerichtet oder für diesen Auftrag aktiviert | Nicht Teil der vorgesehenen Pflichtzahlung. Gebühren hängen vom Tarif ab; Online-TWINT wäre eine separate optionale Erweiterung. |

Pickeasy Freemium ist aktiviert; die angezeigten App-Berechtigungen wurden bei der Installation erteilt. Das Horizon-App-Embed ist weiterhin deaktiviert. Basic zeigt die zeitlich befristete Aktion. Keine Testbestellung ausgelöst.

## Tests und offene Abnahme

**Tatsächlich geprüft:** Shopify-Entwürfe und CHF-Preise wurden nach Erstellung erneut kontrolliert; sechs Produktfotos sind den drei Entwürfen zugeordnet. Der Standort wurde nach der Adresskorrektur erneut gelesen. Im Repository wurden `npm test`, JavaScript-Syntax und statische Seitenverweise am Commit `62c2893cc113f1506a167afa240596a86f1027d3` geprüft. `npm test` bestand: Regressionstest und statische Prüfung liefen durch.

**Noch nicht geprüft:** App-Kompatibilität, veröffentlichte Produktseite, vorausgefüllter Warenkorb, Checkout, Pflichttermin gegen Direktaufruf/Shop Pay, Bestellspeicherung, Bestellnummer, Kontaktfelder, Zahlungsstatus, Benachrichtigungen, echte Testbestellung, Wiederaufnahme, alle vier Browserbreiten und reale Mobilgeräte. Es wurde keine echte oder kostenpflichtige Bestellung ausgelöst.

Vor Freigabe müssen über den echten Shopify-Testkanal mindestens diese Fälle nachgewiesen werden: alle drei Produkte; einzelne und gemischte Varianten; Menge 1 und mehrere Stück ohne 10-Körbe-Grenze; Menge 0 muss abgewiesen werden; Produkt und Preis; Pflichttermin; Vergangenheit/Sonntag/Monatsende/Jahreswechsel/Sommerzeit; Rückkehr und Terminänderung; Doppelklick; langsame oder verlorene Verbindung; Reload/Wiederholung; gespeicherte Bestellreferenz; Adresse; unbezahlter Status und Nachrichtenzustellung. Danach folgen Desktop-/Mobilprüfung bei 360, 390, 768 und 1440 Pixeln und ein kontrollierter, eindeutig als Test gekennzeichneter Zustellungstest. Kein Nachweis ersetzt automatisch den nächsten.

Die öffentliche Website verwendet weiterhin den bisherigen Formspree-Bestellweg. Formspree und seine Daten wurden nicht entfernt oder verändert. Ein Wechsel erfolgt erst nach geprüfter Shopify-Vorschau; danach bleibt ein dokumentierter Rückweg über den vorherigen Website-Commit erhalten. Es gibt keinen Merge und keine Produktionsveröffentlichung.

## Bestätigte Betreiberentscheidungen

- Abholvorlauf, Öffnungstage und Zeitfenster sind wie oben im Pickeasy-Admin eingestellt; der Kalender ist auf 90 Tage begrenzt.
- Gemischte Sorten sind erlaubt; für die Warenkorbmenge ist keine Obergrenze von 10 Körben erforderlich.

## Noch offene Freigabe

- Pickeasy Freemium ist bereits aktiviert; vor Ende der Testphase am 21. Oktober 2026 ist die App-Abrechnung weiter zu beobachten. Zusätzlich müssen Terminpflicht, gemischte Varianten, Theme-Kompatibilität und gespeicherte Terminangaben in der Vorschau geprüft werden. Die Produkte bleiben bis zur bestätigten Bestandsmenge Entwürfe.

## Verwendete Shopify-Quellen

- [Shopify-Testzeitraum](https://help.shopify.com/en/manual/intro-to-shopify/pricing-plans/free-trial)
- [Shopify Schweiz: Preise und Gebühren](https://www.shopify.com/ch/preise)
- [Shopify-Abholung im Geschäft](https://help.shopify.com/en/manual/fulfillment/setup/delivery-methods/pickup-in-store)
- [Shopify-Buy-Button-FAQ](https://help.shopify.com/en/manual/online-sales-channels/buy-button/faq)
- [Shopify-Warenkorb-Permalinks](https://shopify.dev/docs/apps/build/checkout/create-cart-permalinks)
- [Shopify manuelle Zahlungsmethoden](https://help.shopify.com/en/manual/payments/manual-payments)
- [Shopify TWINT in der Schweiz](https://help.shopify.com/en/manual/payments/shopify-payments/local-payment-methods/twint)
