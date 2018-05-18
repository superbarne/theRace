# Einleitung

theRace ist ein Geschicklichkeitsspiel, das in einem Browser ausgeführt wird. Ziel ist es, ein
Fahrzeug möglichst schnell durch einen Parcours zu manövrieren.
Das Spiel kann allein oder auch zu zweit gespielt werden. Die Fahrzeuge können mit der
Tastatur oder mit per Websocket-Broadcast verbundenen Smartphones oder Tablets gesteuert
werden.

Eine einfache Benutzerverwaltung erlaubt die Erstellung einer Bestenliste. Benutzerdaten,
Bestenliste oder sonstige Daten werden persistent auf dem HS-Server borsti gespeichert.

# Funktionsanforderungen

## Allgemeine Anforderungen

 - theRace soll als single-page Desktop-Browser-Anwendung erstellt werden.
 - Ansichten für die verschiedenen Operationen und Optionen sollen bei Bedarf dynamisch ein- und ausgeblendet werden.
 - Die Smartphone-Steuerung des Spiels soll ebenfalls eine Browser-Anwendung sein.
 - Die Bedienung des Systems soll einfach sein, sodass eine Verwendung ohne weitere Anleitung möglich ist.
 - Allgemeine Operationen sollen mit Maus und Tastatur ausführbar sein.
 - Die Fahrzeugsteuerung soll am Desktop mit der Tastatur oder durch Lageänderung der verbundenen Smartphones erfolgen.
 - Es soll Clientsoftware für das Spiele-Host System selbst („Desktop-System“) und für die verbundenen Smartphone-Clients entwickelt werden.
 - Eine Anwendungsinstanz dieses Programms (Desktop) soll über einen Websocket-Broadcast-Server nur mit den Smartphone-Steuerungen des eigenenTyps und dieser Spielinstanz kommunizieren können.
 - Die gleichzeitige Ausführung mehrerer Spieleinstanzen eines Typs mit demselben Websocket-Broadcast-Server soll möglich sein.
 - Die Verbindungen der Smartphone-Steuerungen sollen über im Desktop eingeblendete QR-Codes initiiert werden.

## Registrierung, Anmeldung und Verbindung

 - Eine Registrierung per Nickname und Kennwort soll am Desktop-Client möglich sein.
 - Registrierte BenutzerInnen sollen sich am Desktop-Client anmelden und abmelden können.
 - Die Registrierungsdaten und Anmeldedaten sollen persistent auf borsti gespeichert werden.
 - Die Smartphone-Controller-Clients sollen sich über die am Desktop eingeblendeten QR-Codes verbinden können.
 - Die QR-Codes sollen für jede aktuellen Spielinstanz eindeutig sein.

 ## Spielablauf

 - Es soll ein geeignetes Verfahren zum Starten des Rennens entwickelt und implementiert werden (optisch oder akustisch oder sonst wie sensorisch ...).
 - Ein Rennen soll erfolgreich gewertet werden, wenn ein Fahrzeug in vorgegebener Richtung den Parcours bis zum Ziel durchfahren hat.
 - Die Fahrzeit soll individuell für jedes Spiel und jedes Fahrzeug erfasst und gespeichert werden.
 - Aus den Fahrzeiten soll eine Rangliste in geeigneter Weise erzeugt werden.
 - Die Fahrzeuge sollen sich nur innerhalb eines definierten Parcours bewegen können.
 - Kollisionen mit dem Rand des Parcours oder mit dem zweiten Fahrzeug sollen die Fortbewegung unmittelbar unterbrechen.
 - Nach einer Kollision soll man die Fahrzeuge auf der Stelle drehen können, um eine Position zur weiteren freien Fahrt zu finden.

 ## Fahrzeugsteuerung

 - Ein Fahrzeug soll nur in seiner Vorwärtsrichtung fahren und sich um seine Hochachse drehen können.
 - Geschwindigkeit und Drehrichtung des Fahrzeugs sollen in mehreren Stufen steuerbar sein.
 - Bei der Tastatursteuerung soll ein Spieler etwa die hoch/runter-Cursortasten zur Steuerung der Vorwärtsgeschwindigkeit und die links/rechts-Cursortasten für die Richtungsänderung verwenden.
 - Für einen zweiten Spieler sollen auf derselben Tastatur andere geeignet angeordnete Tasten verwendet werden, z.B. w/y und a/s.
 - Die Smartphone-Steuerung soll über die Orientierungssensoren erfolgen: ein Kippen aus der waagerechten Lage nach vorn/hinten soll die Geschwindigkeit steuern, Kippen nach links/rechts soll die Richtung ändern.

 ## Parcours

 - Der Parcours soll aus Kreissegmenten und geraden Abschnitten aufgebaut werden.
 - Für jeden Parcours sollen Kreissegmente mit unterschiedlichen Radien verwendet werden.
 - Es sollen mindestens zwei Parcours mit unterschiedlicher Komplexität (Level) zur Verfügung stehen.
 - Die Fahrbahnbreite soll so ausgelegt sein, dass Überholvorgänge möglich sind.
 - Der Parcours mit höherer Komplexität soll mindestens mit einem Engpass oder einem sonstigen Hinderniss ausgestattet werden.

 ## Custom Element

 - Es soll mindestens ein UI-widget eigener Wahl als HTML5 Custom Element selbst entwickelt und sinnvoll verwendet werden.
 - Es soll nur die „Custom Element V1“ Technik verwendet werden
 - Die Funktionalität und das Aussehen des Custom Elements soll mit eigenem JavaScript-, HTML- und CSS-Code definiert werden. (Ein „umbenanntes“ div-Element ist nicht hinreichend.)
 - Die Verwendung des Shadow DOM ist nicht erforderlich und nicht gefordert.
 - Custom Elements V1 können zur Zeit nur mit Chrome ausgeführt werden. Es sollen keine Libraries verwendet werden, die Custom Elements V1 für andere Browser ermöglichen (polyfills).

 ## Broadcast Netzkooperation

 - Die theRace - Clients sollen über den gegebenen Websocket-Broadcast-Server ws://borsti.inf.fh-flensburg.de:8080/ kommunizieren.
 - Alle Websocket-Nachrichten sollen nach einem beliebigen eigenen Verfahren verschlüsselt werden, so dass nur Clients eines Typs die Nachrichten entschlüsseln können.

 # Implementationsanforderungen

  - Die Anwendung soll realisiert werden mit:
    - HTML5
    - CSS3
    - JavaScript (ES6) und DOM-Scripting
    - den JS-APIs: WebSocket, Device Orientation oder Device Motion, WebComponents/Custom Elements
    - dem QR-Code Generator qrcode.js (siehe HinweiseZurHausarbeitSS18.pdf)
    - dem für die persistente Speicherung auf borsti bereitgestellten container-API (siehe HinweiseZurHausarbeitSS18.pdf)
    - JSON zur Formatierung der Kommunikationsdaten
    - HTML Canvas 2D oder SVG
 - Die Anwendung soll für die aktuelle Version von Google Chrome ausgelegt sein.
 - Für die Smartphone-Steuerungen kann Mozilla Firefox verwendet werden.
 - Der Code soll den W3C-Validator http://validator.w3.org/ fehlerfrei passieren.
 - Die HTML-Elemente sollen semantisch korrekt eingesetzt werden.
 - Der JavaScript-Code soll objektorientiert entwickelt werden, den globalen Namensraum nicht verletzen und den strict-Modus nutzen.
 - Die intuitive Bedienbarkeit soll für die Gestaltung und das Layout der Anwendung maßgebend sein. Falls durch ansprechende Gestaltung ein positiver Eindruck entsteht, soll dies nicht negativ bewertet werden.
 - Die Persistenz der Registrierungsdaten, Favoritenlisten und sonstiger Einstellungen soll allein mit dem borsti-container-API hergestellt werden.
 - Es sollen keine zusätzlichen Bibliotheken oder Frameworks verwendet werden (z.B. jQuery, Bootstrap, Polymer, Bricks, ... ).
 - Die Smartphone-Anwendung soll zur Projektabgabe auf borsti gehostet werden.
 - Es soll kein serverseitiger Code erstellt werden, auch kein serverseitiges JavaScript.
 - Der Anteil des statisch definierten oder per DOM-Scripting generierten Codes wird nicht spezifiziert. Die Softwarearchitektur soll dies sinnvoll festlegen.

 # Dokumentation

 Auf dem Deckblatt soll angegeben werden:
- zu verwendende Browsertypen (Desktop und Smartphone)
- Datei-Pfad und -Name sowie Zeilennummer der Smartphone- URL-Definition.
 - Die Dokumentation (Projektordner) soll insbesondere beschreiben:
   - das Layout und das Bedienkonzept dieser single-page Anwendung
   - die Erzeugung der Parcours
   - die Kollisionserkennung
   - die Fahrzeugsteuerung (lokal und remote)
   - den Einsatz der Custom Elements
   - die Nachrichtenverschlüsselung
   - die Definition der WebSocket-Nachrichtenkommunikation, d.h. die Festlegung des eigenen Protokolls
   - die Datenstruktur der persistenten Daten
- Probleme, Besonderheiten, Bemerkenswertes
- evtl. nicht erfüllte Anforderungen
- Die Dokumentation soll aus Skizzen, Diagrammen, Bildern etc. und kurzen, verständlichen, gehaltvollen, textuellen Beschreibungen bestehen. Langatmiges Geschwafel führt zur Abwertung.
- Der Umfang der Text-Dokumentation (ohne Quellcode, Skizzen, Diagramme, Bilder) soll fünf A4 Seiten nicht übersteigen (Richtwert 400 Wörter/Seite).
- Seiten ohne Header-Informationen (siehe Teilnahmebedingungen), loses Blattwerk, rückwärts auf dem Kopf eingeheftete und zusammen getackerte Seiten werden bei der Bewertung nicht berücksichtigt.

