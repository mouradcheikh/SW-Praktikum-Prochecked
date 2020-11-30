# Unser Service basiert auf Flask
from flask import Flask
# Auf Flask aufbauend nutzen wir RestX
from flask_restx import Api, Resource, fields
# Wir benutzen noch eine Flask-Erweiterung für Cross-Origin Resource Sharing
from flask_cors import CORS


# Wir greifen natürlich auf unsere Applikationslogik inkl. BusinessObject-Klassen zurück
from src.server.ProjectAdministration import ProjectAdministration
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
from src.server.SecurityDecorator import secured

"""Hier wird Flask instanziert"""
app = Flask(__name__)

"""Flask-Erweiterung für Cross-Origin Resource Sharing"""
CORS(app, resources=r'/bank/*')


api = Api(app, version='1.0', title='Prochecked api',
          description='Eine rudimentäre Demo-API für Listenerstellung.')

"""Namespaces"""
Prochecked = api.namespace('app', description="Funktionen der App")

"""Nachfolgend werden analog zu unseren BusinessObject-Klassen transferierbare Strukturen angelegt.

BusinessObject dient als Basisklasse."""

bo = api.model('BusinessObjects', {
    'id': fields.Integer(attribute='_id', 
                        description='Der Unique Identifier eines Business Object'),
    'creation_date': fields.DateTime(attribute='_creation_date', 
                                    description='Erstellungsdatum des BOs, wird '
                                                'durch Unix Time Stamp ermittlet',
                                    dt_format='iso8601'),
     'lastUpdated': fields.DateTime(attribute='_last_updated',
                                   description='Änderungsdatum des BOs, wird durch'
                                               'Unix Time Stamp ermittlet',
                                   dt_format="iso8601")
})

"""NamedBusinessObject, Person, Student, Module, Semester, Project & ProjectType sind BusinessObjects"""

nbo = api.inherit('NamedBusinessObjects', bo,{    
    'name': fields.String(attribute='__name',
                        description='Nachname bei Personen oder Student'# Name ist manchmal Nachname und manchmal die Bezeichnung
                                    'Name bzw. Bezeichnung von Projekt, Semester, Module, ProjectType,')
})

person = api.inherit('Person', nbo,{
    'email': fields.String(attribute='_email',
                           description='E-Mail-Adresse einer Person'),
    'google_id': fields.String(atttribute='_google_id',
                            description='Google User ID einer Person'),
    'berechtigung': fields.String(attribute='__berechtigung',
                                description='Berechtigung (bzw. Rolle) einer Person'),
    'vorname': fields.String(atrribute='__vorname',
                            description='Vorname einer Person')
})

student = api.inherit('Student',nbo,{
    'studiengang': fields.String(attribute='__studiengang',
                                description='Studiengang eines Studenten'),
    'matr_nr': fields.Integer(attribute='__matr_nr',
                            description='Matrikelnummer eines Studenten')
})


