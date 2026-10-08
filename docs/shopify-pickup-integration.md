# Shopify-Abholung – Vorbereitungsstand

**Stand: 8. Oktober 2026 (Europe/Zurich).** Die Betreiberentscheidung ist jetzt: **keine verpflichtende Datum-/Zeitwahl**. Kund:innen bestellen ohne Termin; nach der Vorbereitung wird die Bestellung in Shopify als «Bereit zur Abholung» markiert und Shopify versendet die Abholbestätigung. Diese Datei hält den tatsächlichen Shopstand, die native Abnahme und die gesperrte Website-Brücke fest. Sie bestätigt nicht, dass Shopify-Bestellungen bereits öffentlich angenommen oder zugestellt werden.

## Aktuelles Zielmodell: native Shopify-Abholung ohne festen Termin

Kunde bestellt → Shopify zeigt Standort und erwartete Bereitstellung → Betreiber bereitet den Korb vor → Betreiber markiert die Bestellung als «Bereit zur Abholung» → Shopify versendet die Abholbestätigung → Kunde holt während der Öffnungszeiten ab. Ein exakter Abholtag oder ein Zeitfenster wird nicht versprochen.

Pickeasy wird für diesen Ablauf nicht benötigt. Beide Theme-Einbettungen und die separate Pickeasy-Checkout-Validierung bleiben ausgeschaltet; die App bleibt lediglich installiert, solange keine ausdrückliche Deinstallation beauftragt ist. Die Website-Brücke bleibt bis zur nativen Abnahme auf `enabled: false`, Formspree bleibt der Rückfallweg.

## Aktueller Shopify-Stand

- Shopwährung: CHF; Zeitzone: `Europe/Zurich`; Land: Schweiz.
- Shopstatus: Testzeitraum; im Admin wird die Storefront als **privat** angezeigt und ist noch nicht eröffnet. Ein Verkauf ist nicht freigegeben.
- Shopify meldet den Tarif **Basic**. Im Admin unter Einstellungen → Plan wird eine Aktion von **CHF 1 pro Monat bis 6. Januar 2027** angezeigt; **CHF 29 pro Monat** ist als regulärer Betrag durchgestrichen. Der genaue Betrag der späteren Rechnung sollte nach Ablauf der Aktion erneut geprüft werden. Die Planansicht nennt Kartengebühren von 2,95 % + CHF 0,30 online und 2 % + CHF 0,00 vor Ort. Das sind Kartengebühren; sie belegen keine Gebühr auf Barzahlung oder TWINT bei Abholung. Shopify Plus ist nicht aktiv.
- Vor diesem Auftrag waren keine Produkte vorhanden. Die drei unten aufgeführten Produkte wurden als **Entwürfe** mit belegten Inhalten, Preisen und bestehenden Websitefotos angelegt. Die erneute Produktprüfung bestätigte die Entwürfe und Bilder; der Betreiber hat am 7. Oktober 2026 einen Bestand von **5 je Sorte** bestätigt; dieser Bestand wurde im Shopify-Standort Biottos Lädeli eingetragen und erneut als verfügbar **5** zurückgelesen. Die Produkte bleiben Entwürfe und sind nicht veröffentlicht. Es wurden keine Kaufbuttons in die Website eingebaut.
- Der vorher unvollständige Standort ist jetzt «Biottos Lädeli», Hauptstrasse 90, 8357 Guntershausen.
- Shopify Payments zeigt im Admin **Zahlungen werden akzeptiert** und **Auszahlungen werden erhalten**; Shop Pay, Karten und weitere Methoden sind aktiv. PayPal ist angezeigt, das Setup ist unvollständig. Der Betreiber hat am 7. Oktober 2026 bestätigt, dass Onlinezahlung neben Bar/TWINT bei Abholung aktiv bleiben soll. Die manuelle Zahlungsmethode **«Bar oder TWINT bei Abholung»** wurde anhand der bestehenden Website-Angabe eingerichtet. Manuell bezahlte Bestellungen bleiben bis zum tatsächlichen Zahlungseingang unbezahlt; Zustellung und Checkout wurden nicht getestet.
- Pickeasy ist installiert, aber für das aktuelle native Abholmodell nicht aktiv: Theme-Einbettungen und die Checkout-Validierung sind ausgeschaltet. Die frühere Testphase bis **21. Oktober 2026** und die mögliche Nutzungsgebühr von **USD 9.99 je 30 Tage** bleiben als App-Abrechnungshinweis bestehen; eine Deinstallation wurde nicht beauftragt. Diese Abrechnungsschwelle ist keine Warenkorb-Mengenbegrenzung.

| Geschenkidee | Shopify-Produkt | Preis | Status | Shopify-Produkt-ID | Varianten-ID |
|---|---|---:|---|---|---|
| Mitbringsel | Chli & Fii | CHF 19.95 | Aktiv | `gid://shopify/Product/10659082797322` | `gid://shopify/ProductVariant/53868017549578` |
| Dankeschön | Fein & Guet | CHF 29.95 | Aktiv | `gid://shopify/Product/10659082830090` | `gid://shopify/ProductVariant/53868017582346` |
| Grosses Geschenk | Gross & Guet | CHF 49.95 | Aktiv | `gid://shopify/Product/10659082895626` | `gid://shopify/ProductVariant/53868017647882` |

Das sind echte IDs aus diesem Shop, aber wegen des Entwurfsstatus keine freigegebenen Live-Kaufziele. Preise stehen weiterhin zusätzlich in Website-HTML, strukturierten Daten und `js/app.js`. Bis eine automatische Produktdarstellung umgesetzt und geprüft ist, müssen Preisänderungen gemeinsam in Shopify und den Websitequellen erfolgen.

## Website-Bridge im Draft-Branch (8. Oktober 2026)

Auf dem Branch `feat/shopify-pickup` ist eine kleine Shopify-Cart-Brücke vorbereitet. Sie kennt die drei echten Varianten und kann einen Cart-Permalink mit `storefront=true` erzeugen. Der Aufruf bleibt jedoch absichtlich **deaktiviert** (`enabled: false`); die bestehenden Formspree-Bestellungen bleiben dadurch unverändert. Die Startseite lädt die Brücke vor `js/app.js`, und der vorhandene «Jetzt bestellen»-Ablauf fällt bei deaktivierter Brücke weiterhin auf den bisherigen Bestellzettel zurück.

Die Brücke wird erst freigeschaltet, wenn ein direkter Einstieg den nativen Shopify-Abholweg erreicht und eine eindeutig gekennzeichnete Testbestellung ohne Termin bis zur Statusänderung «Bereit zur Abholung» samt Benachrichtigung nachgewiesen ist. Deshalb gibt es noch keine öffentliche Umschaltung, keinen neuen Kaufbutton und keine Entfernung von Formspree.

### Einbettungsstatus im Theme-Editor (8. Oktober 2026)

Die Prüfung bestätigt den neuen Zustand: Im veröffentlichten Theme «Horizon» (Theme-ID `194903867658`) sind «Date and Time Picker» und «Zipcode check all pages» ausgeschaltet. Im unveröffentlichten Entwurf «Kopie von Horizon» (Theme-ID `194906685706`) sind ebenfalls beide Pickeasy-Einbettungen ausgeschaltet; zusätzlich ist die Pickeasy-Checkout-Validierung deaktiviert. Der Draft wurde gespeichert, aber nicht veröffentlicht. Die Cart-Brücke bleibt bis zur nativen Abnahme bei `enabled: false`.

## Vorgesehene Architektur

Die bestehende statische Website und die freigegebene Produktdarstellung bleiben erhalten. Nach erfolgreicher Abnahme soll jede Produktkarte die gewählte Shopify-Variante mit Menge 1 vorladen und zur Shopify-Onlineshop-Warenkorbseite führen. Shopify dokumentiert Warenkorb-Permalinks für vorausgewählte Varianten und Mengen; mit `storefront=true` kann der Link zuerst den Onlineshop-Warenkorb statt des Checkouts öffnen. Dadurch kann ein Terminpicker auf Produkt- oder Warenkorbseite angezeigt werden.

Der Shopify Buy Button ist kein Standardweg: Shopify dokumentiert, dass Buy Buttons nicht mit Apps aus dem Shopify App Store kompatibel sind. Ein Direktlink, der den Warenkorb überspringt, ist für einen verpflichtenden Termin ebenfalls nicht freigegeben. Direkte Checkout-Aufrufe, Shop Pay und andere beschleunigte Wege müssen vor Freigabe nachweislich einen gültigen Termin verlangen.

Shopify-Abholung am Standort und eine Terminwahl sind verschiedene Funktionen. Für Biottos Lädeli wird jetzt die native Abholung verwendet: Shopify zeigt Standort und erwartete Bearbeitungszeit, danach löst der Betreiber die «Bereit zur Abholung»-Benachrichtigung aus. Eine Termin-App ist dafür nicht erforderlich.

### Historischer Termin-App-Kandidat (nicht mehr verwendet)

[Pickup Delivery Date Pickeasy](https://apps.shopify.com/order-delivery-date-time) ist installiert und Freemium ist aktiviert. Laut Admin läuft die 14-tägige Testphase bis **21. Oktober 2026**; bei mehr als 10 von Pickeasy gezählten App-Bestellungen kann eine Nutzungsgebühr von **USD 9.99 je 30 Tage** anfallen. Das ist eine App-Abrechnungsschwelle, kein Limit für die Anzahl der Körbe im Warenkorb. Die tatsächliche Zählweise und Abbuchung sind nicht durch eine Testbestellung geprüft. Der Checkout-Seiten-Widget-Hinweis aus der App-Seite macht eine Prüfung im Warenkorb-/Theme-Weg erforderlich.

Pickeasy war für eine frühere Terminoption eingerichtet: Montag–Samstag, 08:00–18:00 Uhr, 30-Minuten-Schritte, 1 Tag Vorlauf und ein sichtbarer Kalender von 90 Tagen. Diese Terminlogik ist für das aktuelle Zielmodell nicht mehr erforderlich; die Checkout-Validierung wurde deaktiviert und beide Theme-Einbettungen sind ausgeschaltet. Die native Shopify-Abholung für den Standort «Biottos Lädeli» bleibt aktiviert. Der Schweizer Standardversand wurde entfernt. Keine Bestellung ausgelöst.

### Installationsberechtigungen

In den Shopify-Steuern ist die Schweiz derzeit als «Nicht erhoben» markiert; «Umsatzsteuer in Produktpreis und Versandtarif einschliessen» ist aktiviert, und Shopify zeigt die Annahme 0 %, weil keine Steuerregistrierung hinterlegt ist. Vor dem Verkauf muss der Betreiber den tatsächlichen Steuerstatus klären. Die Datenschutzerklärung in Shopify ist automatisch veröffentlicht. Rückgabe-/Stornierungsregeln, Widerrufsrecht, AGB, Versandbedingungen, Kontaktinformationen und Impressum sind nicht hinterlegt. Vor Veröffentlichung müssen diese Angaben geprüft und vervollständigt werden; es werden hier keine Rechtsdaten erfunden.

In den Shopify-Mitteilungen ist die Absenderadresse auf eine öffentliche Gmail-Adresse gesetzt; Shopify weist auf eine generische Absenderadresse bei Shopify-E-Mails hin. Die Standardvorlage der Bestellbestätigung und lokale Abholbenachrichtigungen sind vorhanden; ihr Empfang wurde nicht getestet.

Die Installationsseite nennt Zugriff auf Kundendaten (Name, E-Mail, Telefonnummer, physische Adresse sowie Geolokalisierung, IP-Adresse, Browser und Betriebssystem), Inhaberdaten (Name, E-Mail, Telefonnummer, physische Adresse), Kunden- und Produktdaten, Inventar und Kollektionen, die gesamte Bestellhistorie der letzten 60 Tage, Bestellentwürfe und Versand-/Fulfillmentdaten. Zusätzlich werden Bearbeitungsrechte für Bestellungen, Shopify Functions (Zustellanpassungen und Warenkorb-/Checkout-Validierungen) sowie Onlineshop-Themes und Skript-Tags angefordert. Standorte und Gebietsschemas werden angezeigt. Diese Berechtigungen wurden bei der Installation erteilt. Die Nutzung/Abfrage tatsächlicher Kunden- oder Bestelldaten wurde nicht getestet; es wurde keine App-Bestellung ausgelöst.

## Abholung und Zahlung

Der Betreiber hat das native Modell bestätigt: Kund:innen wählen keinen konkreten Abholtag und kein Zeitfenster. Shopify zeigt den Abholort «Biottos Lädeli», Hauptstrasse 90, 8357 Guntershausen, sowie die erwartete Bereitstellung («Gewöhnlich fertig in 24 Stunden»). Nach der Vorbereitung markiert der Betreiber die Bestellung als «Bereit zur Abholung»; Shopify versendet danach die Abholbestätigung. Die Abholung erfolgt während der Öffnungszeiten.

Gemischte Sorten sind erlaubt; ein 10-Körbe-Limit ist nicht erforderlich. Es wird keine Gesamtstückzahlgrenze für den Shopify-Warenkorb eingerichtet. Die frühere Pickeasy-App-Abrechnungsschwelle bleibt nur als Hinweis für die installierte, derzeit inaktive App dokumentiert.

Die Website nennt weiterhin Zahlung bei Abholung, bar oder TWINT. Dafür ist eine manuelle Shopify-Zahlungsart mit klaren Anweisungen vorgesehen. Manuelle Shopify-Bestellungen bleiben bis zur tatsächlichen Zahlung als unbezahlt markiert; erst nach Erhalt von Bargeld oder TWINT wird der Zahlungsstatus im Admin auf bezahlt gesetzt. TWINT vor Ort ist keine Online-TWINT-Zahlung über Shopify Payments. Karten/Shop Pay bleiben als optionale Onlinezahlung neben der manuellen Zahlung bei Abholung aktiv.

## Betreiberablauf nach erfolgreicher Freigabe

Diese Schritte gelten erst, nachdem App, Standort, Zahlungsart, Kundenmitteilung und eine gekennzeichnete Testbestellung geprüft wurden.

1. **Bestellung finden:** Shopify-Admin → Bestellungen; nach Bestellnummer oder Kundenkontakt suchen. Das Admin-Konto ist die verbindliche Quelle, nicht eine Website-Erfolgsmeldung.
2. **Abholort und Bereitstellung prüfen:** Standort, erwartete Bereitstellung und Artikel im gespeicherten Bestellbeleg kontrollieren. Es gibt keinen verpflichtenden Termin.
3. **Bestellung vorbereiten und melden:** Korb zusammenstellen und danach den in Shopify vorgesehenen Schritt «Bereit zur Abholung» ausführen. Erst dadurch wird die Abholbestätigung ausgelöst; eine Bestelleingangsbestätigung bedeutet nicht, dass der Korb bereits vorbereitet ist.
4. **Zahlung bei Abholung erfassen:** Bestellung bleibt unbezahlt, bis Bargeld oder TWINT eingegangen ist. Dann die Zahlung im Admin als bezahlt markieren.
5. **Stornieren:** Bestellung über Shopify stornieren und den Grund erfassen. Bei manueller, noch unbezahlter Zahlung ist keine Online-Rückerstattung auszulösen. Historische Bestellungen nicht löschen.
6. **Benachrichtigungsproblem erkennen:** Bestellung im Admin prüfen. Bei fehlender E-Mail zuerst Status und Empfängeradresse kontrollieren. Betreiber- und Kundenzustellung müssen im separaten Zustellungstest nachgewiesen werden.

## Kosten und Freigabepunkte

| Position | Aktueller Preis/Status | Einordnung |
|---|---|---|
| Shopify | Basic; CHF 1/Monat bis 6. Januar 2027 laut Planansicht; regulär CHF 29/Monat durchgestrichen | Kartengebühren laut Planansicht: online 2,95 % + CHF 0,30; vor Ort 2 % + CHF 0,00. Nicht mit Bar/TWINT bei Abholung gleichzusetzen. |
| Pickeasy | Installiert, aber Theme-Einbettungen und Checkout-Validierung ausgeschaltet; keine Terminwahl im Zielmodell | Keine Deinstallation beauftragt; mögliche frühere App-Abrechnung bleibt zu beobachten. |
| Shopify manuelle Zahlung | «Bar oder TWINT bei Abholung» aktiviert | Zahlung erst nach tatsächlichem Eingang als bezahlt markieren; kein Zustellungstest. |
| Shopify Payments online | Im Admin aktiv; Karten, Shop Pay und weitere Methoden werden angezeigt | Der Betreiber hat bestätigt, dass die Onlinezahlung neben Bar/TWINT bei Abholung aktiv bleiben soll. |

Pickeasy ist installiert, aber für das native Zielmodell inaktiv; die angezeigten App-Berechtigungen bleiben als Installationshistorie dokumentiert. Die manuelle Zahlungsmethode «Bar oder TWINT bei Abholung» ist aktiviert; Shopify Payments ist ebenfalls online aktiv. Beide Theme-Einbettungen sind deaktiviert, der Draft wurde gespeichert und nicht veröffentlicht. Keine Testbestellung ausgelöst.

## Tests und offene Abnahme

**Tatsächlich geprüft:** Shopify-Entwürfe und CHF-Preise wurden nach Erstellung erneut kontrolliert; sechs Produktfotos sind den drei Entwürfen zugeordnet. Der Standort wurde nach der Adresskorrektur erneut gelesen. Im Repository wurden `npm test`, JavaScript-Syntax und statische Seitenverweise am Commit `62c2893cc113f1506a167afa240596a86f1027d3` geprüft. `npm test` bestand: Regressionstest und statische Prüfung liefen durch.

**Noch nicht geprüft:** Steuerstatus Schweiz, rechtliche Checkout-Richtlinien, veröffentlichte Produktseite, Bestellspeicherung, Bestellnummer, Kontaktfelder, Zahlungsstatus, «Bereit zur Abholung»-Benachrichtigung, echte Testbestellung, Wiederaufnahme, alle vier Browserbreiten und reale Mobilgeräte. Der native Checkout ohne Termin ist inzwischen lesend geöffnet und zeigt Abholort sowie erwartete Bereitstellung; es wurde keine Bestellung abgeschickt.

Vor Freigabe müssen über den echten Shopify-Testkanal mindestens diese Fälle nachgewiesen werden: alle drei Produkte; einzelne und gemischte Varianten; Menge 1 und mehrere Stück ohne 10-Körbe-Grenze; Produkt und Preis; nativer Abholort; erwartete Bereitstellung; «Bereit zur Abholung»-Status; Kund:innenbenachrichtigung; unbezahlter Status; Doppelklick; langsame oder verlorene Verbindung; Reload/Wiederholung; gespeicherte Bestellreferenz; Adresse; Zahlungsstatus; alle vier Browserbreiten und reale Mobilgeräte. Ein kontrollierter, eindeutig als Test gekennzeichneter Zustellungstest bleibt offen. Kein Nachweis ersetzt automatisch den nächsten.

Die öffentliche Website verwendet weiterhin den bisherigen Formspree-Bestellweg. Formspree und seine Daten wurden nicht entfernt oder verändert. Ein Wechsel erfolgt erst nach geprüfter Shopify-Vorschau; danach bleibt ein dokumentierter Rückweg über den vorherigen Website-Commit erhalten. Es gibt keinen Merge und keine Produktionsveröffentlichung.

## Bestätigte Betreiberentscheidungen

- Kund:innen wählen keinen festen Abholtag und kein Zeitfenster; Shopify zeigt die erwartete Bereitstellung und versendet nach manueller Statusänderung «Bereit zur Abholung» die Abholbestätigung.
- Gemischte Sorten sind erlaubt; für die Warenkorbmenge ist keine Obergrenze von 10 Körben erforderlich.

## Noch offene Freigabe

- Native Shopify-Abholung ohne festen Termin: Checkout, Abholort, erwartete Bereitstellung, Status «Bereit zur Abholung» und Kund:innenbenachrichtigung müssen mit einer klar markierten Testbestellung abgenommen werden. Pickeasy bleibt inaktiv; eine Deinstallation ist eine separate, noch nicht beauftragte Entscheidung. Die Produkte bleiben bis zur bestätigten Bestandsmenge Entwürfe.

## Verwendete Shopify-Quellen

- [Shopify-Testzeitraum](https://help.shopify.com/en/manual/intro-to-shopify/pricing-plans/free-trial)
- [Shopify Schweiz: Preise und Gebühren](https://www.shopify.com/ch/preise)
- [Shopify-Abholung im Geschäft](https://help.shopify.com/en/manual/fulfillment/setup/delivery-methods/pickup-in-store)
- [Shopify-Buy-Button-FAQ](https://help.shopify.com/en/manual/online-sales-channels/buy-button/faq)
- [Shopify-Warenkorb-Permalinks](https://shopify.dev/docs/apps/build/checkout/create-cart-permalinks)
- [Shopify manuelle Zahlungsmethoden](https://help.shopify.com/en/manual/payments/manual-payments)
- [Shopify TWINT in der Schweiz](https://help.shopify.com/en/manual/payments/shopify-payments/local-payment-methods/twint)

## Prüfstand vom 8. Oktober 2026

Dieser datierte Nachtrag ergänzt den Snapshot vom 7. Oktober und hat bei abweichenden Aussagen Vorrang:

- Der Shopify-Standort bleibt strukturiert als Hauptstrasse 90, Postleitzahl 8357, Ort Guntershausen gespeichert. In Pickeasy wurde die separate Option «Adresse ersetzen» eingeschaltet und die Warenkorbanzeige auf drei Zeilen gesetzt: «Hauptstrasse 90», «8357 Guntershausen», «Switzerland». Nach dem Speichern und Neuladen ist die Reihenfolge im Warenkorb des unveröffentlichten Themes «Kopie von Horizon» sichtbar bestätigt.
- Das Pickeasy-Widget und der Terminwähler erscheinen in dieser Draft-Theme-Vorschau. Eine Prüfung des direkten Warenkorb-Permalinks mit `storefront=true` führte dagegen zum aktiven Theme-Warenkorb; dort wurde kein Pickeasy-Widget angezeigt. Damit ist der Permalink-Einstieg von der bestehenden Website noch nicht abgenommen. Die App-Einbettung des aktiven Themes bleibt aus; kein Live-Theme wurde verändert oder veröffentlicht.
- Kein Kaufbutton wurde ergänzt, kein Checkout abgeschlossen und keine neue Bestellung angelegt. Der nächste Umsetzungsschritt ist, den Cart-Einstieg so zu verifizieren, dass Pickeasy auf dem tatsächlich erreichten Warenkorb verfügbar ist und den Abholtermin erzwingt. Erst danach folgen CTA-Änderungen auf `feat/shopify-pickup`, Vorschau- und Mobiltests sowie CI-Prüfung. Formspree bleibt bis zur späteren Abnahme bestehen.


### Aktueller Abgleich am 8. Oktober 2026

Dieser Abgleich ersetzt die älteren Aussagen über den Produkt-Entwurfsstatus: Alle drei Produkte sind im Shopify-Admin **Aktiv**. Die Variantenpreise sind CHF 19.95, CHF 29.95 und CHF 49.95; jede Variante zeigt 5 verfügbare Stück. Der Shop bleibt passwortgeschützt. Die Website-Kaufbuttons und der öffentliche Start sind noch nicht freigegeben.

Der Warenkorb-Einstieg ist weiterhin der konkrete Integrationsblocker: Der getestete Cart-Permalink öffnet das aktive Theme ohne Pickeasy, während der Terminpicker im unveröffentlichten Draft funktioniert. Vor CTA-Code müssen korrekte Variante/Menge, sichtbarer Pickeasy-Picker und Blockierung ohne gültigen Termin über denselben Einstiegspfad nachgewiesen werden. Formspree bleibt bis zur erfolgreichen Abnahme der Bestellweg.

Shopify dokumentiert zeitlich begrenzte Vorschau-Links für unveröffentlichte Themes und bestätigt, dass Cart-Permalinks den Storefront-Passwortschutz nicht umgehen. Vorschau-Links sind daher kein dauerhafter Website-Kaufpfad. Quellen: [Theme-Vorschau](https://help.shopify.com/en/manual/online-store/themes/adding-themes), [Cart Permalinks](https://shopify.dev/docs/apps/build/checkout/create-cart-permalinks).


### Ergänzender Draft-Test am 8. Oktober 2026

Nach erneutem Öffnen der authentifizierten Vorschau von «Kopie von Horizon» wurde derselbe Cart-Permalink für Variante `53868017549578`, Menge 1, mit `storefront=true` getestet. Der Redirect behielt in dieser Sitzung den Draft-Kontext bei (Vorschauleiste: «Kopie von Horizon Draft»). Der Warenkorb zeigte Chli & Fii, Menge 1, CHF 19.95. Pickeasy wurde nachgeladen und zeigte «Hauptstrasse 90 / 8357 Guntershausen / Switzerland». Der Checkout-Klick ohne Termin blieb im Warenkorb und zeigte «Wähle ein Abholzeitfenster aus, um fortzufahren.» Keine Bestellung wurde angelegt.

Dieser Befund präzisiert den früheren Test: Der Permalink kann in einer bereits bestehenden Draft-Vorschau-Sitzung Pickeasy erreichen. Ein direkter Einstieg aus einer frischen Kundensitzung ist damit nicht bewiesen. Die öffentliche Integration bleibt offen; Vorschau-Sitzung oder Vorschau-Token dürfen keine Voraussetzung des späteren Kaufpfads sein.


### Abnahmetests am 8. Oktober 2026 – normaler Einstieg, gemischter Warenkorb und Reload

| Test | Beobachtetes Ergebnis | Bewertung |
|---|---|---|
| Draft-Vorschau ausdrücklich verlassen, normalen Warenkorb neu geladen | Aktives Theme mit englischen Standardtexten; kein Pickeasy-Block | Öffentlicher Kaufpfad weiterhin nicht abgenommen. Kein Test einer vollständig neuen oder anonymen Sitzung. |
| Draft-Vorschau erneut geöffnet; Cart-Permalink mit allen drei Varianten, Menge je 1 | Chli & Fii CHF 19.95, Fein & Guet CHF 29.95, Gross & Guet CHF 49.95; Gesamt CHF 99.85 | Varianten, Mengen und Summe im Draft bestanden |
| Gemischter Draft-Warenkorb ohne Termin; Checkout geklickt | Verbleibt im Warenkorb; Meldung «Wähle ein Abholzeitfenster aus, um fortzufahren.» | Terminpflicht in diesem UI-Pfad bestanden |
| Gültiges Datum und Zeit gewählt | Freitag, 9. Oktober 2026; 10:00–10:30 Uhr sichtbar gewählt | Auswahl bestanden; noch kein Checkout-/Bestellnachweis |
| Reload der Permalink-Zielseite mit `cart_link_id` | Nach Pickeasy-Nachladen Datum/Uhrzeit nicht mehr sichtbar gewählt | Wiederaufnahme nicht bestanden |
| Derselbe Test auf normalem `/cart` ohne Linkparameter | Datum/Uhrzeit nach Reload ebenfalls nicht mehr sichtbar gewählt; Checkout wird erneut mit Fehlermeldung blockiert | Effekt nicht auf `cart_link_id` begrenzt; Ursache und Speicherung in Cart-/Bestelldaten noch offen |

Es wurde keine Bestellung erstellt und kein Theme veröffentlicht. Der Befund zum Reload belegt die fehlende sichtbare Wiederherstellung, nicht automatisch den Verlust serverseitiger Daten. Vor Freigabe Pickeasy-Konfiguration bzw. dokumentiertes Verhalten prüfen und den Datenerhalt sowie Terminzwang im Checkout separat nachweisen. Die Express-Checkout-Umgehungsprüfung bleibt offen.


## Aktueller Nachtrag vom 8. Oktober 2026: native Abnahme begonnen

Der Draft «Kopie von Horizon» wurde auf den nativen Shopify-Abholweg zurückgeführt: «Date and Time Picker» ist deaktiviert und gespeichert. In Pickeasy wurde zusätzlich die separate Checkout-Regel «Zeitfenster im Checkout validieren» deaktiviert und erfolgreich gespeichert; dadurch blockiert der Checkout nicht mehr wegen eines fehlenden Termins.

Der aktive Theme-Pfad wurde lesend geprüft. Ohne Termin zeigt der Shopify-Checkout den Abholort «Biottos Lädeli», «Hauptstrasse 90, Guntershausen», «KOSTENLOS», «Gewöhnlich fertig in 24 Stunden» sowie «Bar oder TWINT bei Abholung». Es wurde kein Kundendatensatz ausgefüllt, keine Zahlung ausgelöst und keine Bestellung abgesendet.

Offen bleibt die positive Abnahme des vollständigen Statuswegs: eine eindeutig als Test gekennzeichnete Bestellung anlegen, den Korb vorbereiten, in Shopify «Bereit zur Abholung» setzen und die Zustellung der Abholbestätigung an die Testadresse prüfen. Bis dahin bleibt die Website-Brücke `enabled: false`, Formspree bleibt erhalten und es wird nichts veröffentlicht.
