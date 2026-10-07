# Shopify-Abholung – Vorbereitungsstand

**Stand: 7. Oktober 2026.** Die Integration ist vorbereitet, aber der Shopify-Checkout ist nicht freigegeben. Diese Datei hält den tatsächlichen Shopstand, die vorgesehene Verbindung und die Abnahmebedingungen fest. Sie bestätigt nicht, dass Shopify-Bestellungen bereits angenommen oder zugestellt werden.

## Aktueller Shopify-Stand

- Shopwährung: CHF; Zeitzone: CEST; Land: Schweiz.
- Shopstatus: Testzeitraum. Shopify startet Shops im privaten Modus bzw. mit inaktivem Checkout. Während eines Testzeitraums kann verkauft werden, wenn ein Zahlungsanbieter eingerichtet und der private Modus deaktiviert ist. Freischaltung und Zahlungsanbieter wurden hier nicht geprüft.
- Kein bezahlter Tarif ist ausgewählt; Shopify Plus ist nicht aktiv. Shopify Basic kostet zurzeit CHF 29 pro Monat oder CHF 21 pro Monat bei jährlicher Abrechnung (CHF 252 im Voraus). Vor Auswahl die aktuellen Konditionen im Admin prüfen.
- Vor diesem Auftrag waren keine Produkte vorhanden. Die drei unten aufgeführten Produkte wurden als **Entwürfe** mit belegten Inhalten, Preisen und bestehenden Websitefotos angelegt. Sie sind nicht veröffentlicht. Es wurden keine Kaufbuttons in die Website eingebaut.
- Der vorher unvollständige Standort ist jetzt «Biottos Lädeli», Hauptstrasse 90, 8357 Maischhausen.
- Eine Termin-App ist nicht installiert. Zahlungsanbieter und manuelle Zahlungsarten sind noch nicht abschliessend geprüft.

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

[Pickup Delivery Date Pickeasy](https://apps.shopify.com/order-delivery-date-time) ist ein **Kandidat für einen kostenlosen Pilottest**, keine bereits gewählte oder installierte Lösung. Die aktuelle App-Store-Seite nennt Abholung, Datum und Zeitslots, Sperrzeiten, Vorlauf, Bestelllimits und Deutsch als unterstützte Sprache. Der kostenlose Tarif ist laut Eintrag auf 10 Bestellungen pro Monat und einen Standort begrenzt. Starter kostet laut Eintrag USD 9.99 pro Monat; höhere Tarife kosten USD 19.99 bzw. USD 29.99. Die genauen Bestellgrenzen der kostenpflichtigen Tarife und der tatsächlich nutzbare Funktionsumfang sind vor Aktivierung zu prüfen. Das Checkout-Seiten-Widget wird auf der App-Seite nur für Shopify Plus ausgewiesen; die Produkt-/Warenkorbvariante müsste hier getestet werden.

Es wurde keine App installiert, kein kostenpflichtiger Tarif aktiviert und keine Bestellung ausgelöst. App-Abrechnung, Wechselkurs und allfällige Abgaben sind nicht im Shop bestätigt.

## Abholung und Zahlung

Der aktuelle Website-/Auditstand dokumentiert: frühestens am Folgetag, Montag bis Samstag, 08:00–18:00 Uhr, Halbstundenschritte, bis drei Kalendermonate voraus, Zeitzone Europe/Zurich. Diese Regeln müssen vor Übernahme durch den Betreiber bestätigt werden. Feiertage, Sperrtage, Kapazitäten und Vorbereitungszeiten ausser dem dokumentierten Mindestvorlauf bleiben offen.

Der bisherige Ablauf erlaubt 1–10 Körbe einer Variante pro Bestellung. Für den ersten Shopify-Abnahmeumfang soll diese bestehende Beschränkung erhalten bleiben, bis entschieden ist, ob gemischte Körbe oder 10 Stück je Produkt gewünscht sind. Eine Warenkorbmenge lässt sich nicht durch JavaScript allein absichern; die tatsächliche Server-/Appbegrenzung muss mit ungültigen Mengen getestet werden.

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
| Shopify | Testzeitraum; Basic CHF 29 monatlich oder CHF 21/Monat bei jährlicher Abrechnung | Noch kein Tarif ausgewählt. Der Jahrespreis wird im Voraus abgerechnet. |
| Termin-App Pickeasy | Laut Listing kostenlos bis 10 Bestellungen/Monat; Starter USD 9.99/Monat | Nicht installiert. Funktions- und Bestellgrenze für den Liveumfang offen. |
| Shopify manuelle Zahlung | Keine externe Shopify-Transaktionsgebühr für manuelle Zahlungsmethoden laut Shopify-Hilfe | Bar/TWINT vor Ort bleibt vorgesehen; Zahlung erst nach Eingang als bezahlt markieren. |
| Shopify Payments online | Nicht eingerichtet oder für diesen Auftrag aktiviert | Nicht Teil der vorgesehenen Pflichtzahlung. Gebühren hängen vom Tarif ab; Online-TWINT wäre eine separate optionale Erweiterung. |

Keine kostenpflichtige App, kein Tarif und kein Theme wurde aktiviert. Vor einer Aktivierung muss die konkrete CHF-Gesamtsumme im Shopify-Admin freigegeben werden.

## Tests und offene Abnahme

**Tatsächlich geprüft:** Shopify-Entwürfe und CHF-Preise wurden nach Erstellung erneut kontrolliert; sechs Produktfotos sind den drei Entwürfen zugeordnet. Der Standort wurde nach der Adresskorrektur erneut gelesen. Im Repository wurden `npm test`, JavaScript-Syntax und statische Seitenverweise am Commit `62c2893cc113f1506a167afa240596a86f1027d3` geprüft. `npm test` bestand: Regressionstest und statische Prüfung liefen durch.

**Noch nicht geprüft:** App-Kompatibilität, veröffentlichte Produktseite, vorausgefüllter Warenkorb, Checkout, Pflichttermin gegen Direktaufruf/Shop Pay, Bestellspeicherung, Bestellnummer, Kontaktfelder, Zahlungsstatus, Benachrichtigungen, echte Testbestellung, Wiederaufnahme, alle vier Browserbreiten und reale Mobilgeräte. Es wurde keine echte oder kostenpflichtige Bestellung ausgelöst.

Vor Freigabe müssen über den echten Shopify-Testkanal mindestens diese Fälle nachgewiesen werden: alle drei Produkte; Menge 1/10/0/11; Produkt und Preis; Pflichttermin; Vergangenheit/Sonntag/Monatsende/Jahreswechsel/Sommerzeit; Rückkehr und Terminänderung; Doppelklick; langsame oder verlorene Verbindung; Reload/Wiederholung; gespeicherte Bestellreferenz; Adresse; unbezahlter Status und Nachrichtenzustellung. Danach folgen Desktop-/Mobilprüfung bei 360, 390, 768 und 1440 Pixeln und ein kontrollierter, eindeutig als Test gekennzeichneter Zustellungstest. Kein Nachweis ersetzt automatisch den nächsten.

Die öffentliche Website verwendet weiterhin den bisherigen Formspree-Bestellweg. Formspree und seine Daten wurden nicht entfernt oder verändert. Ein Wechsel erfolgt erst nach geprüfter Shopify-Vorschau; danach bleibt ein dokumentierter Rückweg über den vorherigen Website-Commit erhalten. Es gibt keinen Merge und keine Produktionsveröffentlichung.

## Offene Betreiberentscheidungen

- Gelten Abholvorlauf, Öffnungstage, Zeitfenster und Drei-Monats-Grenze weiterhin genau so?
- Soll eine Bestellung wie bisher nur eine Korbart enthalten und höchstens 10 Stück umfassen, oder sind gemischte Körbe erlaubt?
- Darf Pickeasy zunächst im kostenlosen Umfang (höchstens 10 Bestellungen/Monat) für einen Test eingerichtet werden? Für höhere Nutzung braucht es eine Kostenfreigabe nach bestätigter App-Abrechnung.

## Verwendete Shopify-Quellen

- [Shopify-Testzeitraum](https://help.shopify.com/en/manual/intro-to-shopify/pricing-plans/free-trial)
- [Shopify Schweiz: Preise und Gebühren](https://www.shopify.com/ch/preise)
- [Shopify-Abholung im Geschäft](https://help.shopify.com/en/manual/fulfillment/setup/delivery-methods/pickup-in-store)
- [Shopify-Buy-Button-FAQ](https://help.shopify.com/en/manual/online-sales-channels/buy-button/faq)
- [Shopify-Warenkorb-Permalinks](https://shopify.dev/docs/apps/build/checkout/create-cart-permalinks)
- [Shopify manuelle Zahlungsmethoden](https://help.shopify.com/en/manual/payments/manual-payments)
- [Shopify TWINT in der Schweiz](https://help.shopify.com/en/manual/payments/shopify-payments/local-payment-methods/twint)
