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
CORS(app, resources=r'/bank/*')

"""Namespaces"""
Prochecked = api.namespace('app', description="Funktionen der App")

"""Nachfolgend werden analog zu unseren BusinessObject-Klassen transferierbare Strukturen angelegt.

BusinessObject dient als Basisklasse."""

bo = api.model('BusinessObject', {
    'id': fields.Integer(attribute='_id', description='Der Unique Identifier eines Business Object'),
})










































































































































































@banking.route('/persons')
@banking.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class PersonListOperations(Resource):
    @banking.marshal_list_with(person)
    @secured
    def get(self):
        """Auslesen aller Person-Objekte.

        Sollten keine Person-Objekte verfügbar sein, so wird eine leere Sequenz zurückgegeben."""
        adm = ProjectAdministration()
        persons = adm.get_all_persons()
        return persons

    @banking.marshal_with(person, code=200)
    @banking.expect(person)  # Wir erwarten ein Person-Objekt von Client-Seite.
    @secured
    def post(self):
        """Anlegen eines neuen Customer-Objekts.

        **ACHTUNG:** Wir fassen die vom Client gesendeten Daten als Vorschlag auf.
        So ist zum Beispiel die Vergabe der ID nicht Aufgabe des Clients.
        Selbst wenn der Client eine ID in dem Proposal vergeben sollte, so
        liegt es an der ProjektAdministration (Businesslogik), eine korrekte ID
        zu vergeben. *Das korrigierte Objekt wird schließlich zurückgegeben.*
        """
        adm = ProjectAdministration()

        proposal = Person.from_dict(api.payload)

        """RATSCHLAG: Prüfen Sie stets die Referenzen auf valide Werte, bevor Sie diese verwenden!"""
        if proposal is not None:
            """ Wir verwenden lediglich Vor- und Nachnamen des Proposals für die Erzeugung
            eines Person-Objekts. Das serverseitig erzeugte Objekt ist das maßgebliche und 
            wird auch dem Client zurückgegeben. 
            """
            c = adm.create_person(proposal.get_vorname(), proposal.get_name())
            return c, 200
        else:
            # Wenn irgendetwas schiefgeht, dann geben wir nichts zurück und werfen einen Server-Fehler.
            return '', 500


@banking.route('/customers/<int:id>')
@banking.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@banking.param('id', 'Die ID des Customer-Objekts')
class PersonOperations(Resource):
    @banking.marshal_with(person)
    @secured
    def get(self, id):
        """Auslesen eines bestimmten Person-Objekts.

        Das auszulesende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        adm = ProjectAdministration()
        pers = adm.get_person_by_id(id)
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

    @banking.marshal_with(person)
    @banking.expect(person, validate=True)
    @secured
    def put(self, id):
        """Update eines bestimmten Customer-Objekts.

        **ACHTUNG:** Relevante id ist die id, die mittels URI bereitgestellt und somit als Methodenparameter
        verwendet wird. Dieser Parameter überschreibt das ID-Attribut des im Payload der Anfrage übermittelten
        Customer-Objekts.
        """
        adm = ProjectAdministration()
        p = Person.from_dict(api.payload)

        if p is not None:
            """Hierdurch wird die id des zu überschreibenden (vgl. Update) Person-Objekts gesetzt.
            Siehe Hinweise oben.
            """
            p.set_id(id)
            adm.save_person(p)
            return '', 200
        else:
            return '', 500

@banking.route('/persons-by-name/<string:name>') #string:name korrekt?
@banking.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@banking.param('name', 'Der Nachname des Kunden')#ebenfalls lastname mit name ersetzt
class PersonsByNameOperations(Resource):
    @banking.marshal_with(person)
    @secured
    def get(self, name):
        """ Auslesen von Person-Objekten, die durch den Nachnamen bestimmt werden.

        Die auszulesenden Objekte werden durch ```name``` in dem URI bestimmt.
        """
        adm = ProjectAdministration()
        pers = adm.get_person_by_name(name)
        return pers
