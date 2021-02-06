ProChecked starten:

Im folgenden wird erklärt wie ProChecked auf Ihrem Rechner gestartet wird.

# 1. Starten der Datenbank 

1. Laden Sie sich die [mySQL](https://dev.mysql.com/downloads/workbench/) (Workbench) auf Ihren Rechner. 
2. Starten Sie die mySQL Workbench. 
3. Klicken Sie auf (+) zum erstellen einer neuen Connection.
4. Geben Sie einen Namen für ihre Connection ein und klicken Sie auf "OK".
5. Kopieren Sie den Inhalt aus der Datei /mysql/MySQL-Dump.sql und fügen diesen in einem neuen Query ein - danach starten Sie das Query indem Sie auf das Blitzsymbol oben in der Leiste klicken.
6. Es wird eine Datenbank (ProChecked) mit Beispieldaten erstellt.
7. Klicken Sie oben in der Navigationsleiste auf "Database" wählen Sie "Connect to Database.." aus und wählen Sie ihre erstellte Datenbank aus.

# 2. Starten des Backends

Voraussetzungen: Installierte Packages / Virtual Enviroment (INSTALLATION.md)

1. Starten Sie Datei /src/main.py. 

# 3. Starten des Fronted 

Voraussetzungen: Installierte Dependencies (INSTALLATION.md)

1. Öffnen Sie das Terminal des Frontendsverzeichnisses. 
2. Geben Sie im Terminal den das Kommando npm start ein.
3. Über localhost:3000 ist die Anwendung auf ihrem lokalen Rechner aufrufbar.

