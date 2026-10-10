# Startvorbereitung: AGB, Analytics und Testbestellung

**Stand:** 10. Oktober 2026  
**Ablage:** interne Arbeitsnotiz für den offenen Entwurfs-PR. Dies ist kein veröffentlichter Rechtstext.

## Aktueller, geprüfter Stand

- Der verbundene Shopify-Shop ist **Biottos Lädeli**, Schweiz, CHF, Basic.
- Die Shopify-Admin-Abfrage zu den Shop-Richtlinien liefert derzeit nur eine Datenschutzerklärung. Eine AGB-/Nutzungsbedingungen-Richtlinie und eine Rückerstattungsrichtlinie sind darin nicht vorhanden.
- Shopify meldet für die Schweiz in den Customer-Privacy-Regeln aktuell `consentRequired: false` und `dataSaleOptOutRequired: false`. Das bestätigt nicht, ob ein Cookie-Banner oder einzelne Pixel eingerichtet sind.
- In den geprüften Website-Dateien `index.html`, `js/app.js` und `warenkorb.html` wurde kein GA4-Mess-Tag gefunden. Die Shopify-Einstellungen für Customer Events und ein mögliches Google-Analytics-Konto konnten über die verfügbare Admin-Abfrage nicht abschliessend geprüft werden.
- Der aktuelle Shopify-Katalog enthält 19 aktive Produkte. Die drei Geschenksharassen und verfügbare Spezialitäten sind im Codebestand abgebildet.
- **Keine** Shopify-Richtlinie, Analytics-Einstellung, Zahlungsmethode, Veröffentlichung oder Bestellung wurde in diesem Arbeitsschritt verändert. Es wurde keine Bestellung, Zahlung oder E-Mail ausgelöst.

## 1. AGB vorbereiten

### Schweizer E-Commerce-Anforderungen

Die offiziellen Informationen des SECO nennen vier Punkte für Onlineangebote: Anbieteridentität und Kontakt, verständliche Schritte zum Vertragsabschluss, eine Möglichkeit zum Erkennen und Korrigieren von Eingabefehlern sowie eine unverzügliche elektronische Bestellbestätigung. Das KMU-Portal erklärt, dass AGB nicht anstelle dieser Informationen treten; wenn AGB verwendet werden, müssen Käuferinnen und Käufer vor dem Abschluss darauf hingewiesen werden und sie lesen können.

Quellen:

- [SECO: Onlinehandel](https://www.seco.admin.ch/seco/de/home/Werbe_Geschaeftsmethoden/Unlauterer_Wettbewerb/Onlinehandel.html)
- [KMU-Portal: Gesetze der Schweiz und der EU](https://www.kmu.admin.ch/kmu/de/home/praktisches-wissen/kmu-betreiben/e-commerce/rechtliche-aspekte/gesetze-der-schweiz-und-der-eu.html)

### Gesicherte Geschäftsangaben für einen späteren Entwurf

- Shopname: Biottos Lädeli.
- Geschäftsadresse und Abholort: Hauptstrasse 90, 8357 Guntershausen, Schweiz.
- Kontakt: biottoslaedeli@gmail.com; +41 76 255 22 56.
- Verkauf über Shopify; Abholung im Lädeli, kein Versand.
- Es wurde bestätigt, dass Onlinezahlung sowie Barzahlung oder TWINT bei der Abholung angeboten werden sollen.
- Die Website beschreibt, dass Shopify den Abholort und die erwartete Bereitstellung anzeigt und Biottos Lädeli nach der Vorbereitung eine Abholbestätigung sendet. Ein fixer Abholtag wird nicht versprochen.

### Vor dem AGB-Text zu bestätigen

1. **Vertragspartner:** Ist «Biottos Lädeli» der vollständige Anbietername, oder muss eine natürliche Person bzw. ein eingetragener Unternehmensname genannt werden?
2. **Abholung und Nichtabholung:** Wie lange bleibt eine bereitgestellte Bestellung reserviert? Gibt es eine Frist und was soll nach deren Ablauf geschehen?
3. **Änderung, Stornierung, Mängel:** Bis wann kann storniert/geändert werden? Wie soll mit bereits bezahlten Bestellungen und fehlerhaften oder beschädigten Produkten umgegangen werden?
4. **Preis-/Steuerangabe:** Sind die angezeigten Endpreise inklusive aller anwendbaren Steuern? Das wird in den AGB und im Checkout nicht geraten.

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

### Testablauf nach Bestätigung

1. Im Shopify-Admin prüfen, ob der Checkout privat/testbereit ist und welche Zahlungsarten aktuell aktiv sind.
2. Einen Shopify-Zahlungstestmodus verwenden; keine echte Karte und keine reale TWINT-Zahlung verwenden. Shopify warnt, dass während des Testmodus keine regulären Kreditkartenzahlungen angenommen werden. Beim Test-Zahlungs-Gateway muss der aktive Kartenanbieter möglicherweise vorübergehend deaktiviert werden. Testbestellungen sind laut Shopify erst nach Wahl eines kostenpflichtigen Plans möglich.
3. Eine vom Betreiber kontrollierte E-Mail-Adresse einsetzen. Keine echte Kundschaft als Testkontakt verwenden.
4. Abholung auswählen und Bestellung nur im Testmodus abschliessen.
5. Prüfen: angezeigte Produkte/Preise, Abholort, Bestelleingang in Shopify, Bestellbestätigungs-E-Mail, Status «Bereit zur Abholung» und Abholbestätigung.
6. Danach die Testbestellung stornieren, Bestand wiederherstellen und den Testmodus deaktivieren bzw. ursprüngliche Zahlungsarten wiederherstellen. Den Checkout anschliessend erneut kontrollieren.

Shopify-Quellen:

- [Shopify: Testbestellung durchführen](https://help.shopify.com/de/manual/checkout-settings/test-orders/processing-test-order)
- [Shopify: Test-Zahlungs-Gateway aktivieren](https://help.shopify.com/de/manual/checkout-settings/test-orders/payments-test-mode)
- [Shopify: Testbestellungen](https://help.shopify.com/de/manual/checkout-settings/test-orders)

**Status:** Testfall und Prüfschritte sind vorbereitet; keine Bestellung wurde aufgegeben. Vor dem Abschluss des Testkaufs müssen eine kontrollierte E-Mail-Adresse und ein verfügbarer, nicht abrechnender Testzahlungsweg bestätigt sein.
