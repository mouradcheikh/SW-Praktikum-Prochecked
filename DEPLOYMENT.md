# Deployment auf Google Cloud Platform (GCP)


## Google Cloud SDK
Das Deployment (dt. Auslieferung) des Service bzw. der App geschieht vollständig auf Basis von GCP.
Hierzu ist insbesondere das Programm ```gcloud``` auf der Kommandozeile (engl. Console) von Bedeutung.
Sie müssen also zunächst dieses Programm installieren. Es ist Bestandteil des *Google Cloud SDK*
(SDK = Software Development Kit).

## Datenbank (Google Cloud SQL)
Als erstes ist eine Datenbank in der Cloud anzulegen. Dafür muss der beigelegte mySQL-Dump in einen sogenannten Bucket geladen werden. Um alle Funktionen der App auszuführen, wurden Testdaten in der Datenbank erstellt.

## Backend (Google App Engine)
Weiter muss das hier vorhandene Python-Projekt "deploy-fähig" gemacht werden. Eine genaue Anleitung gibt es dafür in der oben stehenden Dokumentation.

Zusammenfassend sind die Dateien app.yaml, requirements.txt sowie .gcloudignore erforderlich, um die App auf GCP zu deployen. Diese Dateien müssen selbst erstellt werden.

In der app.yaml können verschiedene Eigenschaften der App konfiguriert werden.

In der Datei requirements.txt werden alle Packages angegeben, die für das Starten der Anwendung benötigt werden (z.B. Flask, Flask-Cors, Flask-RestX)

In .gcloudignore wird angegeben welche Dateien beim Deployment nicht berücksichtigt werden müssen.

## Frontend
Über das Kommando npm run build können die einzelnen Clients für ein Deployment unter flask vorbereitet werden. Die jeweilige App wird daraufhin produktionsreif und performanzoptimiert in dem jeweiligen Vereichnis unter /build zur Verfügung gestellt.