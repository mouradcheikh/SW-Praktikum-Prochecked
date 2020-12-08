# Unser Service basiert auf Flask
from flask import Flask
# Auf Flask aufbauend nutzen wir RestX
from flask_restx import Api, Resource, fields
# Wir benutzen noch eine Flask-Erweiterung für Cross-Origin Resource Sharing
from flask_cors import CORS


# Wir greifen natürlich auf unsere Applikationslogik inkl. BusinessObject-Klassen zurück
from server.ProjectAdministration import ProjectAdministration
from server.bo.Automat import Automat
from server.bo.Grading import Grading
from server.bo.Module import Module
from server.bo.Participation import Participation

from server.bo.Person import Person

from server.bo.Project import Project
from server.bo.ProjectState import ProjectState
from server.bo.ProjectType import ProjectType
from server.bo.Role import Role
from server.bo.Semester import Semester
from server.bo.Student import Student


# Außerdem nutzen wir einen selbstgeschriebenen Decorator, der die Authentifikation übernimmt
from SecurityDecorator import secured

"""Hier wird Flask instanziert"""
app = Flask(__name__)

"""Flask-Erweiterung für Cross-Origin Resource Sharing"""
CORS(app, resources=r'/app/*')


api = Api(app, version='1.0', title='Prochecked api',
          description='Eine rudimentäre Demo-API für Listenerstellung.')

"""Namespaces"""
prochecked = api.namespace('app', description="Funktionen der App")

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

nbo = api.inherit('NamedBusinessObjects', bo, {    
    'name': fields.String(attribute='_name',
                        description='Nachname bei Personen oder Student'# Name ist manchmal Nachname und manchmal die Bezeichnung
                                    'Name bzw. Bezeichnung von Projekt, Semester, Module, ProjectType,')
})

person = api.inherit('Person', nbo, {
    'email': fields.String(attribute='_email',
                           description='E-Mail-Adresse einer Person'),
    'google_id': fields.String(atttribute='_google_id',
                            description='Google User ID einer Person'),
    'berechtigung': fields.String(attribute='_berechtigung',
                                description='Berechtigung (bzw. Rolle) einer Person')#kommt komma wieder hin
    #'vorname': fields.String(atrribute='__vorname',
                            #description='Vorname einer Person')
})

student = api.inherit('Student',nbo, {
    'studiengang': fields.String(attribute='_studiengang',
                                description='Studiengang eines Studenten'),
    'matr_nr': fields.Integer(attribute='_matr_nr',
                            description='Matrikelnummer eines Studenten')
})

module = api.inherit('Module', nbo, {
    'edv_nr': fields.Integer(attribute='__edv_nr',
                            description='EDV-Nummer eines Moduls')
})

semester = api.inherit('Semster', nbo, {                           #wird Semester in der Main benötigt??
    'teilleistung': fields.String(attribute='teilleistung',
                                 descripton='Teilleistung eines Semester')
})

project = api.inherit('Project', nbo, {
    'capacity': fields.Integer(attribute='__capacity',
                              description='Kapazität eines Projekt'),
    'room': fields.String(attribute='__room',
                         description='Raum wo das Projekt durchgeführt wird'),
    'ext_partner_list': fields.Integer(attribute='__ext_partner_list',
                                     description='Welche externe Partner werden für das Projekt benötigt'),
    'short_description': fields.String(attribute='__short_description',
                                    description='Kurzbeschreibung des Projekts'),
    'dozent': fields.String(attribute='__dozent',
                        description='Welche Dozenten betreuen ein Projekt'),
    'weekly_flag': fields.Boolean(attribute='__weekly_flag', #ist es mit einem Boolean möglich? oder wird Sgtring benötigt
                         description='Gibt es wöchentliche Plfichttermine? True/False'),
    'number_bd_b_lecturetime': fields.Integer(attribute='__number_bd_b_lecturetime',
                                     description='Wie viele Blocktage vor Vorlesungsbeginn'),
    'number_bd_lecturetime': fields.Integer(attribute='__number_bd_lecturetime',
                                    description='Wie viele Blocktage gibt es während der Vorlesungszeit'),
    'preffered_bd': fields.String(attribute='__preffered_bd', #fields.datettime ???
                         description='Gibt es Vorlesungen an einem Samstag, wenn ja welche Tage präferiert (Datum)'), 
    'special_room': fields.String(attribute='__special_room',
                                     description='Gibt es einen spezial Raum für das Projekt, wenn ja welche RaumNr'),     
})


@prochecked.route('/persons')
@prochecked.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class PersonListOperations(Resource):
    @prochecked.marshal_with(person) 
    @secured
    def get(self):
        # """Auslesen aller Person-Objekte.

        #Sollten keine Person-Objekte verfügbar sein, so wird eine leere Sequenz zurückgegeben."""
        adm = ProjectAdministration()
        persons = adm.get_all_persons()
        return persons
        '''pers = Person()
        pers.set_name("kai")
        pers.set_email("K.k@gmx.de")
        pers.set_berechtigung(Person.student)
        pers.set_google_id("iffni")
        pers.set_id(1)
        return pers'''



    @prochecked.marshal_with(person, code=200)
    @prochecked.expect(person)  # Wir erwarten ein Person-Objekt von Client-Seite.
    #@secured
    def post(self):
        """Anlegen eines neuen Person-Objekts.

        **ACHTUNG:** Wir fassen die vom Client gesendeten Daten als Vorschlag auf.
        So ist zum Beispiel die Vergabe der ID nicht Aufgabe des Clients.
        Selbst wenn der Client eine ID in dem Proposal vergeben sollte, so
        liegt es an der ProjektAdministration (Businesslogik), eine korrekte ID
        zu vergeben. *Das korrigierte Objekt wird schließlich zurückgegeben.*
        """
        adm = ProjectAdministration()

        proposal = Person.from_dict(api.payload)
        print (proposal)

        """RATSCHLAG: Prüfen Sie stets die Referenzen auf valide Werte, bevor Sie diese verwenden!"""
        if proposal is not None:
            """ Das serverseitig erzeugte Objekt ist das maßgebliche und 
            wird auch dem Client zurückgegeben. 
            """
            p = adm.create_person(proposal.get_name(), proposal.get_google_id(), proposal.get_email(), proposal.get_berechtigung())
            return p, 200
        else:
            # Wenn irgendetwas schiefgeht, dann geben wir nichts zurück und werfen einen Server-Fehler.
            return '', 500


@prochecked.route('/persons/<string:google_id>')
@prochecked.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@prochecked.param('google_id', 'Die GoogleID des Person-Objekts')
class PersonOperations(Resource):
    @prochecked.marshal_with(person)
    #@secured
    def get(self, google_id):
        """Auslesen eines bestimmten Person-Objekts.

        Das auszulesende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        adm = ProjectAdministration()
        pers = adm.get_person_by_google_id(google_id)
        return pers

    @secured
    def delete(self, id):
        """Löschen eines bestimmten Person-Objekts.

        Das zu löschende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        adm = ProjectAdministration()
        pers = adm.get_person_by_id(id)
        adm.delete_person(pers)
        return '', 200

    @prochecked.marshal_with(person)
    @prochecked.expect(person, validate=True)
    # @secured
    def put(self, google_id):
        """Update eines bestimmten Customer-Objekts.

        **ACHTUNG:** Relevante id ist die id, die mittels URI bereitgestellt und somit als Methodenparameter
        verwendet wird. Dieser Parameter überschreibt das ID-Attribut des im Payload der Anfrage übermittelten
        Customer-Objekts.
        """
        # adm = ProjectAdministration()
        # p = Person.from_dict(api.payload)

        # if p is not None:
        #     """Hierdurch wird die id des zu überschreibenden (vgl. Update) Person-Objekts gesetzt.
        #     Siehe Hinweise oben.
        #     """
        #     p.set_id(id)
        #     adm.save_person(p)
        #     return '', 200
        # else:
        #     return '', 500
        pers = Person()
        pers.set_name("kai")
        pers.set_email("K.k@gmx.de")
        pers.set_berechtigung(Person.student)
        pers.set_google_id("iffni")
        pers.set_id(1)
        return pers

@prochecked.route('/persons-by-name/<string:name>') #string:name korrekt?
@prochecked.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@prochecked.param('name', 'Der Nachname des Kunden')
class PersonsByNameOperations(Resource):
    @prochecked.marshal_with(person)
    @secured
    def get(self, name):
        """ Auslesen von Person-Objekten, die durch den Nachnamen bestimmt werden.

        Die auszulesenden Objekte werden durch ```name``` in dem URI bestimmt.
        """
        adm = ProjectAdministration()
        pers = adm.get_person_by_name(name)
        return pers


if __name__ == '__main__':
    app.run(debug=True)