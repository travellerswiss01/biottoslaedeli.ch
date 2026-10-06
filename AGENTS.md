# AGENTS.md — Biottos Lädeli Website

## 1. Projekt und Architektur
- Diese Website ist eine statische Website mit HTML, CSS und JavaScript.
- Es gibt derzeit keinen Build-Schritt und kein Framework. Keine Migration auf React, Next.js, TypeScript oder andere Frameworks ohne ausdrücklichen Auftrag.
- Bestehende Dateistruktur, Benennung und Architektur beibehalten.
- Bestehende Funktionen und das visuelle Erscheinungsbild schützen.

## 2. Vor jeder Änderung
1. Lies diese Datei vollständig.
2. Prüfe den aktuellen Branch und relevante bestehende Änderungen.
3. Lies die betroffenen Dateien sowie ihre Abhängigkeiten.
4. Suche nach weiteren Stellen, an denen dieselben Inhalte oder Werte verwendet werden.
5. Plane eine kleine, gezielte Änderung und beachte mögliche Risiken.
6. Ändere nur, was für den Auftrag erforderlich ist.

## 3. Git-Workflow und Freigaben
- Der Benutzer entscheidet, ob direkt auf `main` oder auf einem separaten Branch gearbeitet wird.
- Wenn der Benutzer nichts anderes vorgibt, darf der bestehende direkte Workflow auf `main` verwendet werden.
- Wenn der Benutzer einen Branch, eine Vorschau oder eine Prüfung vor dem Merge verlangt, halte dich daran und ändere `main` nicht vor der Freigabe.
- Frage nach, wenn der gewünschte Workflow für eine Änderung unklar ist oder eine Änderung erhebliche Risiken für die Live-Website hat.
- Ein Commit auf `main` kann über Vercel automatisch die öffentliche Website aktualisieren. Berücksichtige das vor Änderungen.
- Keine Pull Requests mergen, keine Produktionsveröffentlichung gesondert auslösen und keine Vercel-, DNS- oder Domain-Einstellungen ändern, sofern der Benutzer dies nicht ausdrücklich beauftragt hat.
- Bestehende Arbeit anderer Änderungen niemals überschreiben.

## 4. Design und Benutzerfreundlichkeit
- Bestehende Gestaltung, Farben, Schriftarten, Abstände und Bildsprache respektieren.
- Mobiltelefone, Tablets und Desktop-Geräte berücksichtigen.
- Keine bestehenden Abschnitte, Inhalte oder Funktionen ohne Auftrag entfernen.
- Navigation, Tastaturbedienbarkeit, Fokuszustände und ausreichende Kontraste erhalten.
- Keine Platzhalterbilder, erfundenen Inhalte oder nicht angeforderten Redesigns einführen.
- Externe Schriftarten und Dienste nicht ohne nachvollziehbaren Grund ersetzen.

## 5. Bestelllogik und Geschäftsdaten
- Änderungen an Korbnamen und Preisen sowohl in `index.html` als auch in `js/app.js` prüfen, da diese Werte an mehreren Stellen vorkommen können.
- Bestellmengen, Abholzeiten, Formularversand und Sprachvarianten nicht unbeabsichtigt verändern.
- Telefonnummern, Formularkonfigurationen, Preise, Öffnungszeiten und Geschäftsdaten niemals erfinden.
- Änderungen an Formularen und externen Diensten besonders sorgfältig prüfen.
- Datenschutz- und SEO-Angaben nicht als rechtlich geprüft darstellen, wenn keine fachliche Prüfung stattgefunden hat.

## 6. Codequalität und Sicherheit
- Kleine, gezielte und nachvollziehbare Änderungen bevorzugen.
- Vorhandene HTML-, CSS- und JavaScript-Konventionen einhalten.
- Keine unnötigen Abhängigkeiten hinzufügen.
- Keine Zugangsdaten, Tokens, Passwörter oder privaten Formulardaten in den Code aufnehmen.
- Keine bestehenden Sicherheits- oder Datenschutzmechanismen abschwächen.
- Fehler und Unsicherheiten offen benennen, statt funktionierenden Code aufgrund einer Vermutung umzubauen.

## 7. Prüfung nach Änderungen
- Geänderte Dateien auf Syntaxfehler und unbeabsichtigte Seiteneffekte prüfen.
- Alle relevanten HTML-Seiten und verknüpften CSS-/JavaScript-Dateien berücksichtigen.
- Falls Browserprüfung verfügbar ist, Desktop- und Mobilansicht sowie Navigation und den Bestellablauf prüfen.
- Falls keine automatisierten Tests vorhanden sind, keine erfolgreichen Tests behaupten.
- Nur tatsächlich ausgeführte Prüfungen als bestanden melden.
- Nicht verfügbare Tests oder Werkzeuge ausdrücklich nennen.

## 8. Mehrere Aufgaben in einem Auftrag selbstständig abarbeiten
- Wenn der Benutzer mehrere Aufgaben in einer Liste oder einem Gesamtauftrag vorgibt, behandle sie als zusammenhängenden Auftrag und erstelle eine interne Checkliste.
- Arbeite die Aufgaben in der angegebenen Reihenfolge ab. Nach Abschluss eines Punkts beginne automatisch mit dem nächsten offenen Punkt; warte nicht allein deshalb auf eine neue Nachricht des Benutzers.
- Stelle keine unnötigen Zwischenfragen und unterbrich die Arbeit nicht nur für Zwischenberichte. Frage nach, wenn wesentliche Informationen fehlen, Anforderungen widersprüchlich sind oder eine Entscheidung bzw. Freigabe des Benutzers erforderlich ist.
- Wenn eine Aufgabe blockiert ist, halte den konkreten Grund fest und fahre mit den übrigen Aufgaben fort, sofern das sicher und sinnvoll möglich ist.
- Aktualisiere die Checkliste nach jedem erledigten oder blockierten Punkt. Bei einer Unterbrechung nutze den dokumentierten Stand, um offene Arbeit fortzusetzen, sofern die Plattform bzw. Umgebung das unterstützt.
- Behaupte nicht, im Hintergrund weiterzuarbeiten oder später automatisch fortzufahren, wenn die verwendete Umgebung das nicht tatsächlich ermöglicht. Ein Prompt kann technische Laufzeit-, Tool- oder Freigabegrenzen nicht umgehen.
- Wenn die Plattform den Auftrag beendet, ein Tool-Aufruf fehlschlägt oder eine Bestätigung verlangt, berichte ehrlich, wo die Arbeit steht, und nenne den nächsten erforderlichen Schritt.
- Schließe den Gesamtauftrag erst ab, wenn alle ausführbaren Punkte erledigt und überprüft wurden oder die verbleibenden Blockaden klar dokumentiert sind. Führe nicht erledigte Punkte nicht als erledigt auf.
- Führe keine riskanten, irreversiblen oder ausdrücklich freigabepflichtigen Aktionen aus, nur um den Ablauf ohne Rückfrage fortzusetzen.
- Prüfe bei mehreren Aufgaben vor jedem Schreibvorgang den aktuellen Branch und bestehende Änderungen. Überschreibe keine Änderungen anderer Agents oder Personen. Vermeide parallele Schreibvorgänge auf denselben Dateien.
- Der Abschlussbericht für einen Gesamtauftrag soll erledigte Punkte, tatsächlich ausgeführte Prüfungen, fehlgeschlagene oder blockierte Punkte und verbleibende Risiken getrennt aufführen.

## 9. Abschlussbericht
Nach jeder Aufgabe kurz berichten:
1. Was geändert wurde und welche Dateien betroffen sind.
2. Welche Prüfungen tatsächlich ausgeführt wurden und mit welchem Ergebnis.
3. Welche Risiken oder offenen Punkte verbleiben.
4. Ob ein Commit, Preview-Deployment oder Produktions-Deployment erstellt wurde.

## 10. Definition of Done
Eine Aufgabe ist erst abgeschlossen, wenn die angeforderte Änderung umgesetzt, relevante Seiteneffekte geprüft und nicht durchgeführte Tests oder offene Risiken transparent dokumentiert wurden.
