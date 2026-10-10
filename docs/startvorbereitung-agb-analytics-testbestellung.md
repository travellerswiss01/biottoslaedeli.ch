# Startvorbereitung: AGB, Analytics und Testbestellung

**Stand:** 10. Oktober 2026  
**Ablage:** interne Arbeitsnotiz für den offenen Entwurfs-PR. Dies ist kein veröffentlichter Rechtstext.

## Aktueller, geprüfter Stand

- Der verbundene Shopify-Shop ist **Biottos Lädeli**, Schweiz, CHF, Basic.
- Die Shopify-Admin-Abfrage zu den Shop-Richtlinien liefert derzeit nur eine Datenschutzerklärung. Eine AGB-/Nutzungsbedingungen-Richtlinie und eine Rückerstattungsrichtlinie sind darin nicht vorhanden.
- Shopify meldet für die Schweiz in den Customer-Privacy-Regeln aktuell `consentRequired: false` und `dataSaleOptOutRequired: false`. Das bestätigt nicht, ob ein Cookie-Banner oder einzelne Pixel eingerichtet sind.
- In den geprüften Website-Dateien `index.html`, `js/app.js` und `warenkorb.html` wurde kein GA4-Mess-Tag gefunden. Die Shopify-Seite **Einstellungen → Kundenereignisse** zeigt keine konfigurierten App- oder benutzerdefinierten Pixel. Ob ein separates Google-Analytics-Konto oder eine Property existiert, ist weiterhin nicht geprüft.
- Der aktuelle Shopify-Katalog enthält 19 aktive Produkte. Die drei Geschenksharassen und verfügbare Spezialitäten sind im Codebestand abgebildet.
- Shopify-Richtlinien und Analytics-Einstellungen wurden in diesem Arbeitsschritt nicht geändert. Für den autorisierten Test wurde Shopify Payments kurz in den Testmodus geschaltet und danach wieder deaktiviert. Eine Testbestellung wurde durchgeführt, storniert und die zwei Artikel wurden dem Bestand wieder gutgeschrieben; es wurde keine echte Zahlung verarbeitet.

## 1. AGB vorbereiten

**Aktualisierung gemäss Betreiberangabe vom 10. Oktober 2026:** Es bestehen keine offizielle Rechtsform und keine offizielle Firmenbezeichnung. Der Anbieter muss im Onlinehandel dennoch klar und vollständig identifizierbar sein. Der Shopname allein wird deshalb nicht als ausreichende Anbieterangabe vorausgesetzt; die Darstellung mit Josef Ignaz Zehnder ist vor Veröffentlichung rechtlich zu prüfen. [SECO: Onlinehandel](https://www.seco.admin.ch/de/onlinehandel); [KMU-Portal: Rechtsform Einzelunternehmen](https://www.kmu.admin.ch/de/rechtsform-einzelunternehmen)

### Schweizer E-Commerce-Anforderungen

Die offiziellen Informationen des SECO nennen vier Punkte für Onlineangebote: Anbieteridentität und Kontakt, verständliche Schritte zum Vertragsabschluss, eine Möglichkeit zum Erkennen und Korrigieren von Eingabefehlern sowie eine unverzügliche elektronische Bestellbestätigung. Das KMU-Portal erklärt, dass AGB nicht anstelle dieser Informationen treten; wenn AGB verwendet werden, müssen Käuferinnen und Käufer vor dem Abschluss darauf hingewiesen werden und sie lesen können.

Quellen:

- [SECO: Onlinehandel](https://www.seco.admin.ch/seco/de/home/Werbe_Geschaeftsmethoden/Unlauterer_Wettbewerb/Onlinehandel.html)
- [KMU-Portal: Gesetze der Schweiz und der EU](https://www.kmu.admin.ch/kmu/de/home/praktisches-wissen/kmu-betreiben/e-commerce/rechtliche-aspekte/gesetze-der-schweiz-und-der-eu.html)

### Gesicherte Geschäftsangaben für einen späteren Entwurf

- Shopname: Biottos Lädeli.
- Vom Betreiber bestätigter Vertragspartner: Josef Ignaz Zehnder.
- Geschäftsadresse und Abholort: Hauptstrasse 90, 8357 Guntershausen, Schweiz. Der Betreiber hat am 10. Oktober 2026 ausdrücklich bestätigt, dass diese Adresse zugleich die Geschäftsadresse ist; Shopify zeigt sie am Standort «Biottos Lädeli» ebenfalls vollständig mit PLZ an.
- Kontakt: biottoslaedeli@gmail.com; +41 76 255 22 56.
- Verkauf über Shopify; Abholung im Lädeli, kein Versand.
- Es wurde bestätigt, dass Onlinezahlung sowie Barzahlung oder TWINT bei der Abholung angeboten werden sollen.
- Die Website beschreibt, dass Shopify den Abholort und die erwartete Bereitstellung anzeigt und Biottos Lädeli nach der Vorbereitung eine Abholbestätigung sendet.
- Vom Betreiber bestätigt: Die bereitgestellte Bestellung soll innerhalb einer Woche nach der Abholbestätigung abgeholt werden.
- Vom Betreiber bestätigt: Wird die Bestellung innerhalb dieser Woche nicht abgeholt, wird sie storniert; eine bereits eingegangene Zahlung wird zurückerstattet.

### Vor dem AGB-Text zu bestätigen

1. **Vertragspartner:** Der Betreiber bestätigt: Es gibt keine offizielle Rechtsform und keine offizielle Firmenbezeichnung. «Biottos Lädeli» ist der Shopname; Josef Ignaz Zehnder ist als Betreiber bestätigt. Die UID ist nicht bestätigt. Für einen AGB-Entwurf muss die natürliche Person als Anbieter eindeutig genannt werden; die rechtlich korrekte Anbieterangabe im Impressum/Checkout ist vor Veröffentlichung zu prüfen.
2. **Abholung und Nichtabholung:** Die Abholfrist von einer Woche nach der Abholbestätigung sowie Stornierung und Rückerstattung bei Nichtabholung innerhalb dieser Frist sind bestätigt.
3. **Änderung, Stornierung, Mängel und Haftung:** Der Wunsch nach einem Haftungsausschluss ist festgehalten. Eine pauschale Ausschlussklausel wird nicht übernommen: Haftung für rechtswidrige Absicht oder grobe Fahrlässigkeit kann nicht im Voraus ausgeschlossen werden; Konsumenten-AGB dürfen zudem keine missbräuchliche Benachteiligung enthalten. Der zulässige Umfang und die Behandlung mangelhafter/beschädigter Ware müssen geprüft werden. Änderungen und Stornierungen vor der Abholung sind noch festzulegen.
4. **Preis-/Steuerangabe:** Der Betreiber gibt an, nicht MWST-registriert zu sein und keine Steuern anzuwenden. Das allein bestätigt keine Befreiung von der MWST-Pflicht. Die ESTV nennt für die meisten Unternehmen eine massgebende Umsatzgrenze von CHF 100'000; entscheidend sind die nach MWST-Recht massgebenden Leistungen im In- und Ausland sowie die absehbare Umsatzentwicklung. Der tatsächliche Umsatz und die Prognose sind noch zu bestätigen; bis dahin wird weder eine Steuerbefreiung behauptet noch eine definitive Steuerangabe veröffentlicht. [ESTV: MWST-Steuerpflicht](https://www.estv.admin.ch/de/mwst-steuerpflicht)


### AGB-Gerüst für die nächste Fassung (intern, nicht veröffentlichen)

- **Vertragspartner und Kontakt:** Shopname «Biottos Lädeli»; Betreiber Josef Ignaz Zehnder; laut Betreiber bestehen keine offizielle Rechtsform und keine offizielle Firmenbezeichnung; UID nicht bestätigt. Hauptstrasse 90, 8357 Guntershausen; biottoslaedeli@gmail.com; +41 76 255 22 56. Die gesetzlich klare Anbieteridentität für Impressum und AGB muss vor Veröffentlichung geprüft werden.
- **Sortiment, Bestellung und Preis:** konkrete Produkte, Varianten und angezeigte Preise gemäss Shopify. Der Betreiber gibt an, nicht MWST-registriert zu sein und keine Steuern anzuwenden. Ob eine Registrierungspflicht besteht, ist wegen der noch fehlenden Umsatzangabe offen; bis zur Klärung keine definitive Steuerformulierung veröffentlichen.
- **Zahlung:** Onlinezahlung oder Barzahlung/TWINT bei Abholung gemäss bestätigtem Ablauf; vor Veröffentlichung mit den tatsächlich aktiven Shopify-Zahlungsarten abgleichen.
- **Abholung:** kein Versand; Abholung am angegebenen Standort. Bereitstellung wird per Abholbestätigung mitgeteilt. Abholung innerhalb einer Woche ab dieser Bestätigung.
- **Nichtabholung:** nach Ablauf der Wochenfrist wird die Bestellung storniert; eine bereits eingegangene Zahlung wird zurückerstattet.
- **Änderungen, Stornierung vor Bereitstellung und mangelhafte/beschädigte Ware:** Abläufe noch offen. Haftungsausschluss ist gewünscht, wird aber nur im rechtlich zulässigen Umfang erwogen; kein Ausschluss für rechtswidrige Absicht oder grobe Fahrlässigkeit. Verbraucherrecht und Klausel müssen fachlich geprüft werden.
- **Datenschutz:** Verweis auf die separate Datenschutzerklärung; keine Datenschutzklausel aus der AGB ableiten.

Das ist eine Arbeitsstruktur mit bestätigten Fakten und offenen Stellen, kein abschliessender Rechtstext. Vor Veröffentlichung bleiben die offene Anbieteridentität im Impressum, UID-/Registerstatus, Steuerangabe und der Umgang mit Änderungen/Mängeln zu klären; anschliessend muss die AGB im Bestellablauf vor Abschluss lesbar verlinkt werden.

Rechtliche Prüfpunkte (amtliche Schweizer Stellen):

- [OR Art. 100: Grenzen eines vorgängigen Haftungsausschlusses](https://www.fedlex.admin.ch/eli/cc/27/317_321_377/de#art_100)
- [SECO: Missbräuchliche Geschäftsbedingungen](https://www.seco.admin.ch/de/missbraeuchliche-geschaeftsbedingungen)
- [ESTV: MWST-Pflicht und Umsatzgrenze](https://www.estv.admin.ch/de/mwst-steuerpflicht)
- [KMU-Portal: Rechtsform Einzelunternehmen und Firmenname](https://www.kmu.admin.ch/de/rechtsform-einzelunternehmen)

Erst nach diesen Antworten kann ein vollständiger, inhaltlich passender Entwurf geschrieben werden. Er bleibt bis zur fachlichen Prüfung als Entwurf markiert und wird nicht in Shopify veröffentlicht. Das Schweizer KMU-Portal weist darauf hin, dass für Schweizer Onlinekäufe kein allgemeines gesetzliches Widerrufsrecht wie in der EU besteht; daraus wird hier keine Rückgabe- oder Stornoklausel abgeleitet.

## 2. Analytics vorbereiten

### Vorhandene Hinweise

- Der geprüfte Website-Code enthält keine GA4-Mess-ID und kein GA4-Tag.
- Die Shopify-Privacy-Abfrage meldet für die Schweiz keine erforderliche Zustimmung in der aktuellen Shopify-Regelkonfiguration. Das ist keine rechtliche Beurteilung und kein Nachweis, dass ein Banner oder ein Pixel korrekt eingebunden ist.
- Der EDÖB verlangt verständliche Informationen über Datenbearbeitungen und beschreibt für Cookies/ähnliche Technologien grundsätzlich Information und eine Widerspruchsmöglichkeit; bei unerwarteten oder risikoreichen Bearbeitungen kann eine vorgängige ausdrückliche Einwilligung nötig sein. Ob dies für die gewünschte Messung und Kundschaft greift, muss für das konkrete Setup geprüft werden.

Quellen:

- [EDÖB: Datenschutzerklärungen im Internet](https://www.edoeb.admin.ch/de/datenschutzerklaerungen-im-internet)
- [EDÖB: aktualisierter Cookie-Leitfaden](https://www.edoeb.admin.ch/de/cookie-leitfaden-aktualisiert)
- [Shopify: GA4 einrichten](https://help.shopify.com/de/manual/reports-and-analytics/google-analytics/google-analytics-setup)
- [Shopify: Customer-Privacy-Einstellungen](https://help.shopify.com/de/manual/privacy-and-security/privacy/customer-privacy-settings/understanding-customer-privacy-settings)

### Empfohlene Reihenfolge

1. In Shopify unter **Einstellungen → Customer Events** vorhandene App- und Custom-Pixel prüfen.
2. Entscheiden, ob Shopify-eigene Berichte genügen oder GA4 benötigt wird. Für GA4 braucht es ein Google-Analytics-Konto, eine GA4-Property und eine Web-Datenstream-/Mess-ID.
3. Vor einer Einbindung den Verkaufs-/Messbereich festlegen: Schweiz allein oder zusätzlich Kundschaft im EWR bzw. weiteren Ländern.
4. Die Datenfreigabe und den Cookie-/Datenschutz-Hinweis passend zu den tatsächlich eingesetzten Tools einstellen. Keine doppelte GA4-Einbindung über Google-&-YouTube-App und zusätzliches manuelles Tag.
5. Erst nach geklärter Mess-ID und Datenschutzkonfiguration Ereignisse prüfen: Produktansicht, Warenkorb, Checkout-Beginn und Kauf.
6. Shopify weist darauf hin, dass GA4 keine Shopdaten erfasst, solange der Online-Shop im privaten Modus ist. Den privaten Modus deshalb nicht für diese Vorbereitung umschalten; Messung kann erst beim freigegebenen Shopzugang end-to-end verifiziert werden.

**Noch benötigt:** Entscheidung Shopify-Berichte oder GA4; falls GA4 gewünscht ist, die Mess-ID (Format `G-...`) und die Bestätigung, wer Zugriff auf das Google-Konto erhält.

## 3. Testbestellung vorbereiten

### Sicherer Testfall

Vorgeschlagener Mischwarenkorb: **1 × Es Tröpfli Heimat (CHF 29.00) und 1 × Birnenessig (CHF 8.50), total CHF 37.50 vor allfälligen Checkout-Anpassungen.** Die aktuellen Produktnamen, Varianten und Preise stammen aus der verbundenen Shopify-Abfrage. Der Test prüft einen Korb zusammen mit einer Spezialität in derselben Bestellung.

### Durchgeführter Testlauf (10. Oktober 2026)

1. Shopify Payments wurde für den Test kurz in den Testmodus geschaltet. Der Shop zeigte danach sichtbar „Testmodus aktiviert“; nach dem Checkout wurde der Testmodus wieder deaktiviert. Die Zahlungsseite zeigte anschliessend „Testmodus deaktiviert“.
2. Im Checkout wurden **1 × Es Tröpfli Heimat (CHF 29.00)** und **1 × Birnenessig (CHF 8.50)** bestellt. Der Gesamtbetrag war **CHF 37.50**, Abholung bei Biottos Lädeli war kostenlos. Für die Kartenzahlung wurde die von Shopify dokumentierte Visa-Testnummer mit Endung 4242 verwendet; es wurde keine echte Kartenzahlung verarbeitet.
3. Shopify erstellte **Bestellung #1004**, Bestätigungsnummer **PQV84U8GQ**. Der Checkout zeigte die Bestellbestätigung und die angegebene Testadresse.
4. Die Shopify-Bestellchronik bestätigt, dass die Bestellbestätigung und anschliessend die Benachrichtigung „a ready for pickup“ an biottoslaedeli@gmail.com gesendet wurden. Das belegt den Versand durch Shopify, nicht die Zustellung oder Darstellung im Posteingang.
5. Bestellung #1004 wurde storniert. Die Chronik bestätigt, dass beide Artikel wieder aufgestockt wurden. Shopify zeigt eine Rückerstattung von CHF 37.50 als ausstehend; die Bestellung ist als Testbestellung markiert und es wurde keine echte Zahlung verarbeitet.
6. Die vorbestehenden Testbestellungen #1001–#1003 wurden nicht verändert. Die aktiven Zahlungsarten wurden nicht geändert; Testmodus ist wieder deaktiviert.

Shopify-Quellen:

- [Shopify: Testbestellung durchführen](https://help.shopify.com/de/manual/checkout-settings/test-orders/processing-test-order)
- [Shopify: Test-Zahlungs-Gateway aktivieren](https://help.shopify.com/de/manual/checkout-settings/test-orders/payments-test-mode)
- [Shopify: Testbestellungen](https://help.shopify.com/de/manual/checkout-settings/test-orders)

**Status:** Checkout, Bestellbestätigung und Abholbenachrichtigung wurden mit der vom Betreiber angegebenen Testadresse geprüft. Shopify zeigt die Testbestellung #1004 als storniert; zwei Artikel sind zurückgebucht, und eine Test-Rückerstattung von CHF 37.50 wird noch als ausstehend angezeigt. Testmodus ist deaktiviert. Die Zustellung der E-Mails im Posteingang konnte nicht geprüft werden.
