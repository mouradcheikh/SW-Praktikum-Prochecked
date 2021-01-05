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
from server.bo.Grading import Grading
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
    'last_updated': fields.DateTime(attribute='_last_updated',
                                    description='Änderungsdatum des BOs, wird durch'
                                                'Unix Time Stamp ermittlet',
                                    dt_format="iso8601")
})

"""NamedBusinessObject, Person, Student, Module, Semester, Project & ProjectType sind BusinessObjects"""

nbo = api.inherit('NamedBusinessObjects', bo, {
    'name': fields.String(attribute='_name',
                          description='Nachname bei Personen oder Student'  # Name ist manchmal Nachname und manchmal die Bezeichnung
                                      'Name bzw. Bezeichnung von Projekt, Semester, Module, ProjectType,')
})

person = api.inherit('Person', nbo, {
    'email': fields.String(attribute='_email',
                           description='E-Mail-Adresse einer Person'),
    'google_id': fields.String(attribute='_google_id',
                            description='Google User ID einer Person'),
    'berechtigung': fields.Integer(attribute='_berechtigung',
                            description='Berechtigung (bzw. Rolle) einer Person'),  
    'student_id': fields.Integer(attribute='_student',
                            description='Falls Person ein Student ist')
})

student = api.inherit('Student', person, {
    'studiengang': fields.String(attribute='_studiengang',
                            description='Studiengang eines Studenten'),
    'matr_nr': fields.Integer(attribute='_matr_nr',
                            description='Matrikelnummer eines Studenten'),
    'person_id': fields.Integer(attribute='_person',
                            description='PersonenObjekt eines Studenten')
})

module = api.inherit('Module', nbo, {
    'edv_nr': fields.Integer(attribute='_edv_nr',
                             description='EDV-Nummer eines Moduls')
})

semester = api.inherit('Semster', nbo, {  
    'teilleistung': fields.String(attribute='teilleistung',
                                  descripton='Teilleistung eines Semester')
})

project = api.inherit('Project', nbo, {
    'capacity': fields.String(attribute='_capacity',
                               description='Kapazität eines Projekt'),
    # 'room': fields.String(attribute='_room',
    #                       description='Raum wo das Projekt durchgeführt wird'),
    'ext_partner_list': fields.String(attribute='_ext_partner_list',
                                       description='Welche externe Partner werden für das Projekt benötigt'),
    'short_description': fields.String(attribute='_short_description',
                                       description='Kurzbeschreibung des Projekts'),
    'dozent': fields.Integer(attribute='_dozent',
                            description='Welche Dozenten betreuen ein Projekt'),
    'dozent2': fields.Integer(attribute='_dozent2',
                            description='Welche Dozenten betreuen ein Projekt'),
    'weekly_flag': fields.Boolean(attribute='_weekly_flag',
                                  description='Gibt es wöchentliche Plfichttermine? True/False'),
    'number_bd_b_lecturetime': fields.String(attribute='_number_bd_b_lecturetime',
                                              description='Wie viele Blocktage vor Vorlesungsbeginn'),
    'number_bd_lecturetime': fields.String(attribute='_number_bd_lecturetime',
                                            description='Wie viele Blocktage gibt es während der Vorlesungszeit'),
    'number_bd_examtime': fields.String(attribute='_number_bd_examtime',
                                         description='Wie viele Blocktage gibt es während der Vorlesungszeit'),
    'preffered_bd': fields.String(attribute='_preffered_bd', 
                                  description='Gibt es Vorlesungen an einem Samstag, wenn ja welche Tage präferiert (Datum)'),
    'special_room': fields.String(attribute='_special_room',
                                  description='Gibt es einen spezial Raum für das Projekt, wenn ja welche RaumNr'),
    'project_state': fields.Integer(attribute='_project_state',
                                    description='Jetziger Status des Projekts'),
    'project_type': fields.Integer(attribute='_project_type',
                                  description='Art des Projekts'),
    'semester': fields.Integer(attribute='_semester', description='semester des Projekts'),
    'module': fields.Integer(attribute='_module', description='semester des Projekts')
})

participation = api.inherit('Participation', bo, {
    'grading_id': fields.Integer(attribute='_grading',
                                 description='Note der Teilnahme'),
    'module_id': fields.Integer(attribute='_module',
                                description='Module der Teilnahme'),
    'project_id': fields.Integer(attribute='_project',
                                 description='Project der Teilnahme'),
    'student_id': fields.Integer(attribute='_student',
                                 description='Student der Teilnahme'),
})

grading = api.inherit('Grading', bo, {
    'grade': fields.String(attribute='_grade',
                            description= 'Bewertung des Teilnehmer'),
    'passed': fields.Boolean(attribute='_passed',
                            description= 'Bestanden JA/Nein (0 oder 1)'),
    'participation_id': fields.Integer(attribute= '_participation',
                            description ='ID der Teilnahme für die Note')
})

# Person related
@prochecked.route('/persons')
@prochecked.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class PersonListOperations(Resource):
    @prochecked.marshal_list_with(person)
    @secured
    def get(self):
        # """Auslesen aller Person-Objekte.

        # Sollten keine Person-Objekte verfügbar sein, so wird eine leere Sequenz zurückgegeben."""
        adm = ProjectAdministration()
        persons = adm.get_all_persons()
        return persons

    @prochecked.marshal_with(person, code=200)
    @prochecked.expect(person)  # Wir erwarten ein Person-Objekt von Client-Seite.
    @secured
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
        #print(proposal)

        """RATSCHLAG: Prüfen Sie stets die Referenzen auf valide Werte, bevor Sie diese verwenden!"""
        if proposal is not None:
            """ Das serverseitig erzeugte Objekt ist das maßgebliche und 
            wird auch dem Client zurückgegeben. 
            """
            p = adm.create_person(proposal.get_name(), proposal.get_google_id(), proposal.get_email())
            return p, 200
        else:
            # Wenn irgendetwas schiefgeht, dann geben wir nichts zurück und werfen einen Server-Fehler.
            return '', 500

@prochecked.route('/persons/<string:google_id>')
@prochecked.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@prochecked.param('google_id', 'Die google_id des Person-Objekts')
class PersonOperations(Resource):
    @prochecked.marshal_with(person)
    @secured
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
    @prochecked.expect(person)
    @secured
    def put(self, google_id):
        """Update eines bestimmten Person-Objekts.

        **ACHTUNG:** Relevante id ist die id, die mittels URI bereitgestellt und somit als Methodenparameter
        verwendet wird. Dieser Parameter überschreibt das ID-Attribut des im Payload der Anfrage übermittelten
        Project-Objekts.
        """
        adm = ProjectAdministration()
        #print(api.payload)
        p = Person.from_dict(api.payload)
        #print(p)

        if p is not None:
            """Hierdurch wird die id des zu überschreibenden (vgl. Update) Person-Objekts gesetzt.
            Siehe Hinweise oben.
            """
            p.set_google_id(google_id)
            adm.save_person(p)
            return '', 200
        else:
            return '', 500

@prochecked.route('/persons-by-name/<string:name>')  
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

# Projekt Operationen 
@prochecked.route('/project')
@prochecked.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class ProjectOperations(Resource):
    @prochecked.marshal_with(project, code=200)
    @prochecked.expect(project)  
    @secured
    def post(self):
        """Anlegen eines neuen Projekt-Objekts.

        **ACHTUNG:** Wir fassen die vom Client gesendeten Daten als Vorschlag auf.
        So ist zum Beispiel die Vergabe der ID nicht Aufgabe des Clients.
        Selbst wenn der Client eine ID in dem Proposal vergeben sollte, so
        liegt es an der ProjektAdministration (Businesslogik), eine korrekte ID
        zu vergeben. *Das korrigierte Objekt wird schließlich zurückgegeben.*
        """
        #print(api.payload)
        adm = ProjectAdministration()

        proposal = Project.from_dict(api.payload)
        #print(proposal.get_preffered_bd())

        """RATSCHLAG: Prüfen Sie stets die Referenzen auf valide Werte, bevor Sie diese verwenden!"""
        if proposal is not None:
            """ Das serverseitig erzeugte Objekt ist das maßgebliche und 
            wird auch dem Client zurückgegeben. 
            """
            p = adm.create_project(proposal)
            return p, 200
        else:
            # Wenn irgendetwas schiefgeht, dann geben wir nichts zurück und werfen einen Server-Fehler.
            return '', 500
    
    @prochecked.marshal_with(project)
    @prochecked.expect(project)
    @secured
    def put(self):
        """Update eines bestimmten Project-Objekts.

        **ACHTUNG:** Relevante id ist die id, die mittels URI bereitgestellt und somit als Methodenparameter
        verwendet wird. Dieser Parameter überschreibt das ID-Attribut des im Payload der Anfrage übermittelten
        Project-Objekts.
        """
        adm = ProjectAdministration()
        #print(api.payload)
        p = Project.from_dict(api.payload)
        #print(p)

        if p is not None:
            """Hierdurch wird die id des zu überschreibenden (vgl. Update) Person-Objekts gesetzt.
            Siehe Hinweise oben.
            """
            adm.save_project(p)
            return '', 200
        else:
            return '', 500
    
    # @prochecked.marshal_list_with(project)
    # @secured
    # def get(self):
    #     """Auslesen aller Project-Objekte bzgl. eines bestimmten State-Objekts.

    #     Das State-Objekt dessen Projects wir lesen möchten, wird durch die ```id``` in dem URI bestimmt.
    #     """
    #     adm = ProjectAdministration()
    #     project_list = adm.get_projects_by_state_new()
    #     # for p in project_list:
    #     #     print(p.get_project_state())
    #     return project_list

@prochecked.route('/projects/<int:project_state>')
@prochecked.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@prochecked.param('project_state', 'Jetziger Status des Projekts')
class ProjectsByStateOperation(Resource):
    @prochecked.marshal_list_with(project)
    @secured
    def get(self,project_state):
        """Auslesen eines bestimmten Person-Objekts.

        Das auszulesende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        print(project_state)
        adm = ProjectAdministration()
        project_list = adm.get_projects_by_state(project_state)
        #for p in project_list:
            #print(p.get_project_state())
        return project_list


@prochecked.route('/students/<int:matr_nr>/projects')
@prochecked.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@prochecked.param('matr_nr', 'Die Personen ID des Student-Objekts')
class ProjectsByStudentOperation(Resource):
    @prochecked.marshal_list_with(project)  #evtl. list rausnehemn ?!?!
    @secured
    def get(self, matr_nr):
        """Auslesen aller Project-Objekte bzgl. eines bestimmten Dozent-Objekts.

        Das Dozent-Objekt dessen Projects wir lesen möchten, wird durch die ```id``` in dem URI bestimmt.
        """
        adm = ProjectAdministration()
        project_list = adm.get_projects_by_student(matr_nr)

        return project_list

@prochecked.route('/dozentn/<int:person_id>/projectn')
@prochecked.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@prochecked.param('person_id', 'Die ID des Dozent-Objekts')
class ProjectsByDozentOperationNew(Resource):
    @prochecked.marshal_with(project)  #evtl. list rausnehemn ?!?!
    @secured
    def get(self, person_id):
        """Auslesen aller Project-Objekte bzgl. eines bestimmten Dozent-Objekts.

        Das Dozent-Objekt dessen Projects wir lesen möchten, wird durch die ```id``` in dem URI bestimmt.
        """
        adm = ProjectAdministration()
        project_list = adm.get_projects_by_dozent_new(person_id)

        return project_list

@prochecked.route('/dozents/<int:person_id>/projects')
@prochecked.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@prochecked.param('person_id', 'Die ID des Dozent-Objekts')
class ProjectsByDozentOperation(Resource):
    @prochecked.marshal_with(project)  #evtl. list rausnehemn ?!?!
    @secured
    def get(self, person_id):
        """Auslesen aller Project-Objekte bzgl. eines bestimmten Dozent-Objekts.

        Das Dozent-Objekt dessen Projects wir lesen möchten, wird durch die ```id``` in dem URI bestimmt.
        """
        adm = ProjectAdministration()
        project_list = adm.get_projects_by_dozent_accepted(person_id)

        return project_list

@prochecked.route('/dozent/<int:person_id>/project')
@prochecked.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@prochecked.param('person_id', 'Die ID des Dozent-Objekts')
class ProjectsByDozentOperationInReview(Resource):
    @prochecked.marshal_with(project)  #evtl. list rausnehemn ?!?!
    @secured
    def get(self, person_id):
        """Auslesen aller Project-Objekte bzgl. eines bestimmten Dozent-Objekts.

        Das Dozent-Objekt dessen Projects wir lesen möchten, wird durch die ```id``` in dem URI bestimmt.
        """
        adm = ProjectAdministration()
        project_list = adm.get_projects_by_dozent_in_review(person_id)

        return project_list

@prochecked.route('/dozente/<int:person_id>/projecte')
@prochecked.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@prochecked.param('person_id', 'Die ID des Dozent-Objekts')
class ProjectsByDozentOperationReviewed(Resource):
    @prochecked.marshal_with(project)  #evtl. list rausnehemn ?!?!
    @secured
    def get(self, person_id):
        """Auslesen aller Project-Objekte bzgl. eines bestimmten Dozent-Objekts.

        Das Dozent-Objekt dessen Projects wir lesen möchten, wird durch die ```id``` in dem URI bestimmt.
        """
        adm = ProjectAdministration()
        project_list = adm.get_projects_by_dozent_reviewed(person_id)

        return project_list

@prochecked.route('/person-by-role/<int:role_id>')
@prochecked.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class PersonByRoleOperation(Resource):
    @prochecked.marshal_list_with(person)
    @secured
    def get(self, role_id):
        # """Auslesen aller Person-Objekte mit bestimmter Rolle.

        # Sollten keine Person-Objekte verfügbar sein, so wird eine leere Sequenz zurückgegeben."""
        adm = ProjectAdministration()
        persons = adm.get_persons_by_role(role_id)
        return persons

@prochecked.route('/projects/<int:project_id>/participations')
@prochecked.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@prochecked.param('project_id', 'Die ID des Project-Objekts')
class ParticipationsByProjectOperation(Resource):
    @prochecked.marshal_list_with(participation) #evtl. list rausnehemn ?!?!
    @secured
    def get(self, project_id):
        """Auslesen aller Participation-Objekte bzgl. eines bestimmten Project-Objekts.

        Das Project-Objekt dessen Participations wir lesen möchten, wird durch die ```id``` in dem URI bestimmt.
        """
        adm = ProjectAdministration()
        # Zunächst benötigen wir das durch id gegebene Project.
        par = adm.get_participations_by_project(project_id)
        #for p in par:
            #print(p)
        return par

    @prochecked.marshal_with(participation, code=201)
    @secured
    def post(self, project_id):
        """Anlegen eines Teilnahmes für einen gegebenen Projekt.

        Das neu angelegte Teilnahme wird als Ergebnis zurückgegeben.

        **Hinweis:** Unter der id muss ein Projekt existieren, andernfalls wird Status Code 500 ausgegeben."""
        adm = ProjectAdministration()
        """Stelle fest, ob es unter der id einen Projekt gibt. 
        Dies ist aus Gründen der referentiellen Integrität sinnvoll!
        """
        pro = adm.get_project_by_id(project_id) 

        if pro is not None:
            result = adm.create_participation_for_project(pro)
            return result
        else:
            return "Project unknown", 500
    


@prochecked.route('/participation/<int:id>')
@prochecked.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@prochecked.param('id', 'Die ID des Participation-Objekts.')
class ParticipationOperations(Resource):

    @secured
    def delete(self, id):
        """Löschen eines bestimmten Participation-Objekts.

        Das zu löschende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        adm = ProjectAdministration()
        par = adm.get_participation_by_id(id)


        if par is not None:
            adm.delete_participation(par)
            return '', 200
        else:
            return '', 500  # Wenn unter id keine Participation existiert.'''

@prochecked.route('/participation')
@prochecked.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class ParticipationPutOperation(Resource):
    @prochecked.marshal_with(participation, code=200)
    @prochecked.expect(participation)  # Wir erwarten ein participation-Objekt von Client-Seite.
    @secured
    def put(self):
        """Update eines bestimmten Participation-Objekts."""

        adm = ProjectAdministration()
        p = Participation.from_dict(api.payload)

        if p is not None:
            adm.save_participation(p)
            return '', 200
        else:
            return '', 500


# Student related

@prochecked.route('/students/<int:id>')
@prochecked.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@prochecked.param('id', 'Die id des Student-Objekts')
class StudentOperations(Resource):
    @prochecked.marshal_with(student)
    @secured
    def get(self, id):
        """Auslesen eines bestimmten Person-Objekts.

        Das auszulesende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        adm = ProjectAdministration()
        #print(id)
        stud = adm.get_student_by_id(id)
        
        return stud

@prochecked.route('/student-by-matr/<int:matr_nr>')
@prochecked.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@prochecked.param('matr_nr', 'Die matrikelnummer des Student-Objekts')
class StudentByMatrikelNummerOperation(Resource):
    @prochecked.marshal_with(student)
    @secured
    def get(self, matr_nr):
        """Auslesen eines bestimmten Person-Objekts.

        Das auszulesende Objekt wird durch die ```matr_nr``` in dem URI bestimmt.
        """
        adm = ProjectAdministration()
        stud = adm.get_student_by_matr_nr(matr_nr)
    
        return stud

@prochecked.route('/student-by-person-id/<int:person_id>')
@prochecked.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@prochecked.param('person_id', 'Die personen id des Student-Objekts')
class StudentByMatrikelNummerOperations(Resource):
    @prochecked.marshal_with(student)
    @secured
    def get(self, person_id):
        """Auslesen eines bestimmten Person-Objekts.

        Das auszulesende Objekt wird durch die ```matr_nr``` in dem URI bestimmt.
        """
        adm = ProjectAdministration()
        stud = adm.get_student_by_person_id(person_id)
    
        return stud


@prochecked.route('/student')
@prochecked.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class StudentLogInOperations(Resource):
    @prochecked.marshal_with(student, code=200)
    @prochecked.expect(student)  
    @secured
    def post(self):
        """Anlegen eines neuen Projekt-Objekts.

        **ACHTUNG:** Wir fassen die vom Client gesendeten Daten als Vorschlag auf.
        So ist zum Beispiel die Vergabe der ID nicht Aufgabe des Clients.
        Selbst wenn der Client eine ID in dem Proposal vergeben sollte, so
        liegt es an der ProjektAdministration (Businesslogik), eine korrekte ID
        zu vergeben. *Das korrigierte Objekt wird schließlich zurückgegeben.*
        """
        print(api.payload)
        adm = ProjectAdministration()

        proposal = Student.from_dict(api.payload)
        print(proposal.get_matr_nr())

        """RATSCHLAG: Prüfen Sie stets die Referenzen auf valide Werte, bevor Sie diese verwenden!"""
        if proposal is not None:
            """ Das serverseitig erzeugte Objekt ist das maßgebliche und 
            wird auch dem Client zurückgegeben. 
            """
            p = adm.create_student(proposal.get_matr_nr(), proposal.get_studiengang(), proposal.get_person())
            return p, 200
        else:
            # Wenn irgendetwas schiefgeht, dann geben wir nichts zurück und werfen einen Server-Fehler.
            return '', 500

@prochecked.route('/semesters')
@prochecked.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class SemesterOperations(Resource):
    @prochecked.marshal_with(semester)
    @secured
    def get(self):
        """Auslesen aller Semester Objekte
        """
        adm = ProjectAdministration()
        sem = adm.get_all_semesters()
        return sem

    @prochecked.marshal_list_with(semester, code=200)
    @prochecked.expect(semester)  # Wir erwarten ein Semester-Objekt von Client-Seite.
    @secured
    def post(self):
        """Anlegen eines neuen Grading-Objekts.

        **ACHTUNG:** Wir fassen die vom Client gesendeten Daten als Vorschlag auf.
        So ist zum Beispiel die Vergabe der ID nicht Aufgabe des Clients.
        Selbst wenn der Client eine ID in dem Proposal vergeben sollte, so
        liegt es an der ProjektAdministration (Businesslogik), eine korrekte ID
        zu vergeben. *Das korrigierte Objekt wird schließlich zurückgegeben.*
        """
        adm = ProjectAdministration()

        proposal = Semester.from_dict(api.payload)
        #print(proposal.get_grade(), proposal.get_passed())
        #print(api.payload)

        """RATSCHLAG: Prüfen Sie stets die Referenzen auf valide Werte, bevor Sie diese verwenden!"""
        if proposal is not None:
            """ Das serverseitig erzeugte Objekt ist das maßgebliche und 
            wird auch dem Client zurückgegeben. 
            """
            s = adm.create_semester(proposal.get_name())
            print(s)
            return s, 200
        else:
            # Wenn irgendetwas schiefgeht, dann geben wir nichts zurück und werfen einen Server-Fehler.
            return '', 500
    
    

#Grading related 

@prochecked.route('/studentsGrading')
@prochecked.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class GradingListOperations(Resource):
    @prochecked.marshal_list_with(grading, code=200)
    @prochecked.expect(grading)  # Wir erwarten ein Grading-Objekt von Client-Seite.
    @secured
    def post(self):
        """Anlegen eines neuen Grading-Objekts.

        **ACHTUNG:** Wir fassen die vom Client gesendeten Daten als Vorschlag auf.
        So ist zum Beispiel die Vergabe der ID nicht Aufgabe des Clients.
        Selbst wenn der Client eine ID in dem Proposal vergeben sollte, so
        liegt es an der ProjektAdministration (Businesslogik), eine korrekte ID
        zu vergeben. *Das korrigierte Objekt wird schließlich zurückgegeben.*
        """
        adm = ProjectAdministration()

        proposal = Grading.from_dict(api.payload)
        #print(proposal.get_grade(), proposal.get_passed())
        #print(api.payload)

        """RATSCHLAG: Prüfen Sie stets die Referenzen auf valide Werte, bevor Sie diese verwenden!"""
        if proposal is not None:
            """ Das serverseitig erzeugte Objekt ist das maßgebliche und 
            wird auch dem Client zurückgegeben. 
            """
            #print(proposal.get_passed())
            p = adm.create_grading(proposal.get_grade(), proposal.get_passed(), proposal.get_participation())
            #print(p)
            return p, 200
        else:
            # Wenn irgendetwas schiefgeht, dann geben wir nichts zurück und werfen einen Server-Fehler.
            return '', 500

@prochecked.route('/participation/<int:participation_id>/grading')
@prochecked.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@prochecked.param('participation_id', 'Die ID des Participation-Objekts')
class GradingByParticipationOperation(Resource):
    @prochecked.marshal_with(grading)
    @secured
    def get(self, participation_id):
        """Auslesen eines Grading-Objekte bzgl. eines bestimmten Participation-Objekts.

        Das Participation-Objekt dessen GRading wir lesen möchten, wird durch die ```id``` in dem URI bestimmt.
        """
        adm = ProjectAdministration()
        # Zunächst benötigen wir das durch id gegebene Project.
        gra = adm.get_grading_by_participation_id(participation_id)
        # 'for p in par:
        #     print(p)'
        return gra

@prochecked.route('/gradings/<int:id>')
@prochecked.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@prochecked.param('id', 'Die id des Grading-Objekts')
class GradingOperations(Resource):
    @prochecked.marshal_with(grading)
    @secured
    def get(self, id):
        """Auslesen eines bestimmten Person-Objekts.

        Das auszulesende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        adm = ProjectAdministration()
        #print(id)
        gra = adm.get_grading_by_id(id)
        
        return gra


@prochecked.route('/gradings-by-project-and-matr/<int:project_id>/<int:matr_nr>')
@prochecked.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@prochecked.param('project_id', 'matr_nr')
class GradingByProjectandStudentOperations(Resource):
    @prochecked.marshal_with(grading)
    @secured
    def get(self, project_id, matr_nr):
        """Auslesen eines bestimmten Grading-Objekts.

        Das auszulesende Objekt wird durch die ```project_id``` und matrnr in dem URI bestimmt.
        """
        adm = ProjectAdministration()
        gra = adm.get_grading_by_project_id_and_matr_nr(project_id, matr_nr)
        
        return gra


@prochecked.route('/modules')
@prochecked.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class ModuleOperations(Resource):
    @prochecked.marshal_list_with(module)
    @secured
    def get(self):
        """Auslesen aller Module-Objekte, die noch frei sind.
        """
        adm = ProjectAdministration()
        mod = adm.get_all_free_modules()
        return mod

if __name__ == '__main__':
    app.run(debug=True)

    '''project = Project()
    project.set_id(1)
    project.set_name("ADS")
    project.set_project_state(2)

    adm = ProjectAdministration()
    z = adm.save_project(project)
    print(z)'''

    # adm = ProjectAdministration()
    # p = adm.get_projects_by_state(2)
    # for i in p:
    #     print(i.get_name(), i.get_project_state())
   
