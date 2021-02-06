# Installationsanleitung

Die Installationsanleeitung bezieht sich auf die Client-Seite sowie die Server/Service- Seite

## Client Seite

1. Node.js (siehe https://nodejs.org/ oder Installation via [Homebrew](https://brew.sh) 
2. Package dependecies: 
Vor dem Start müssen die Dependencies installiert werden. Dies erfolgt über das Kommando `npm install` im Terminal. Dabei werden folgende Abhängigkeiten  installiert:
- [React Router](https://reacttraining.com/react-router/web/guides/quick-start)
- [Material-UI](https://material-ui.com)
- [Google firebase authentication](https://firebase.google.com/docs/web/setup)

## Starten des Servers

React bringt einen eignen Development-Server mit, mit welchem zur Echtzeit der React-Code in JavaScript übersetzt wird. Dies erfolgt im Hintergrund auf Basis von [Babel](https://babeljs.io), einem JavaScript Compiler.

Der Server wird in einem Terminal im Fronted mit dem Kommando ```npm``` gestartet. Nach erfolgreichem Start ist die React-App unter http://localhost:3000 verfügbar sofern zuvor das Backend 

## Server/Service-Seite

Die Server-Seite baut auf Python, Flask (Cors) sowie RestX auf.
Daher werden folgende Packages vorrab benötigt:

1. Python (Version 3.7 oder höher)
2. Flask (inkl. Jinja und Werkzeug)
3. flask-cors
4. flask-restx
5. requests
6. google-auth

Um die nötigen Packages zu installieren, kann der Befehl ```pip```verwendet werden. 
Eine andere Möglichkeit ist, wenn man über PyCharm ein Virtual Enviornment anlegt und darin dann die Packages installiert. 

## Wie wird der Server gestartet?
Derzeit ist Datei ```main.py``` auszuführen, mehr nicht. Natürlich setzt dies ein
ordentlich installiertes Environment voraus (s.o.). Unter PyCharm genügt der Rechtsklick
auf die Datei ```main.py``` und die Auswahl von ```Run main```. Der Start des 
Development Server kann in der PyCharm Console beobachtet werden. Anschließend kann man
auf die Dienste zugreifen.


