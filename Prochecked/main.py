# Unser Service basiert auf Flask
from flask import Flask
# Auf Flask aufbauend nutzen wir RestX
from flask_restx import Api, Resource, fields
# Wir benutzen noch eine Flask-Erweiterung für Cross-Origin Resource Sharing
from flask_cors import CORS


# Wir greifen natürlich auf unsere Applikationslogik inkl. BusinessObject-Klassen zurück
from src.server.bo.Automat import Automat
from src.server.bo.Grading import Grading
from src.server.bo.Module import Module
from src.server.bo.Participation import Participation
from src.server.bo.Person import Person
from src.server.bo.Project import Project
from src.server.bo.ProjectState import ProjectState
from src.server.bo.ProjectType import ProjectType
from src.server.bo.Role import Role
from src.server.bo.Semester import Semester
from src.server.bo.Student import Student


# Außerdem nutzen wir einen selbstgeschriebenen Decorator, der die Authentifikation übernimmt
from SecurityDecorator import secured

"""Hier wird Flask instanziert"""
app = Flask(__name__)

"""Flask-Erweiterung für Cross-Origin Resource Sharing"""
CORS(app, resources=r'/prochecked/*')

"""Namespaces"""
Prochecked = api.namespace('app', description="Funktionen der App")

"""Nachfolgend werden analog zu unseren BusinessObject-Klassen transferierbare Strukturen angelegt.

BusinessObject dient als Basisklasse."""

bo = api.model('BusinessObject', {
    'id': fields.Integer(attribute='_id', description='Der Unique Identifier eines Business Object'),
})

