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
                            description='Berechtigung (bzw. Rolle) einer Person'),  # kommt komma wieder hin
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
    'edv_nr': fields.Integer(attribute='__edv_nr',
                             description='EDV-Nummer eines Moduls')
})

semester = api.inherit('Semster', nbo, {  # wird Semester in der Main benötigt??
    'teilleistung': fields.String(attribute='teilleistung',
                                  descripton='Teilleistung eines Semester')
})

project = api.inherit('Project', nbo, {
    'capacity': fields.Integer(attribute='_capacity',
                               description='Kapazität eines Projekt'),
    'room': fields.String(attribute='_room',
                          description='Raum wo das Projekt durchgeführt wird'),
    'ext_partner_list': fields.Integer(attribute='_ext_partner_list',
                                       description='Welche externe Partner werden für das Projekt benötigt'),
    'short_description': fields.String(attribute='_short_description',
                                       description='Kurzbeschreibung des Projekts'),
    'dozent': fields.String(attribute='_dozent',
                            description='Welche Dozenten betreuen ein Projekt'),
    'weekly_flag': fields.Boolean(attribute='_weekly_flag',
                                  # ist es mit einem Boolean möglich? oder wird Sgtring benötigt
                                  description='Gibt es wöchentliche Plfichttermine? True/False'),
    'number_bd_b_lecturetime': fields.Integer(attribute='_number_bd_b_lecturetime',
                                              description='Wie viele Blocktage vor Vorlesungsbeginn'),
    'number_bd_lecturetime': fields.Integer(attribute='_number_bd_lecturetime',
                                            description='Wie viele Blocktage gibt es während der Vorlesungszeit'),
    'number_bd_examtime': fields.Integer(attribute='_number_bd_examtime',
                                         description='Wie viele Blocktage gibt es während der Vorlesungszeit'),
    'preffered_bd': fields.String(attribute='_preffered_bd',  # fields.datettime ???
                                  description='Gibt es Vorlesungen an einem Samstag, wenn ja welche Tage präferiert (Datum)'),
    'special_room': fields.String(attribute='_special_room',
                                  description='Gibt es einen spezial Raum für das Projekt, wenn ja welche RaumNr'),
    'current_state': fields.Integer(attribute='_current_state',
                                    description='Jetziger Status des Projekts'),
    'project_type': fields.String(attribute='_project_type',
                                  description='Art des Projekts'),
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
    'passed': fields.Integer(attribute='_passed',
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

        '''l = []
        pers1 = Person()
        pers1.set_name("Perry Dettke")
        pers1.set_email("Perry@gmx.de")
        pers1.set_berechtigung(1)
        pers1.set_google_id('google1')
        pers1.set_id(1)
        pers2 = Person()
        pers2.set_name("Marius Fechter")
        pers2.set_email("Marius@gmx.de")
        pers2.set_berechtigung(2)
        pers2.set_google_id("google2")
        pers2.set_id(2)
        l.append(pers1)
        l.append(pers2)
        return l'''

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
        print(proposal)

        """RATSCHLAG: Prüfen Sie stets die Referenzen auf valide Werte, bevor Sie diese verwenden!"""
        if proposal is not None:
            """ Das serverseitig erzeugte Objekt ist das maßgebliche und 
            wird auch dem Client zurückgegeben. 
            """
            p = adm.create_person(proposal.get_name(), proposal.get_google_id(), proposal.get_email(),
                                  proposal.get_berechtigung())
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
        print(api.payload)
        p = Person.from_dict(api.payload)
        print(p)

        if p is not None:
            """Hierdurch wird die id des zu überschreibenden (vgl. Update) Person-Objekts gesetzt.
            Siehe Hinweise oben.
            """
            p.set_google_id(google_id)
            adm.save_person(p)
            return '', 200
        else:
            return '', 500
        # pers = Person()
        # pers.set_name("kai")
        # pers.set_email("K.k@gmx.de")
        # pers.set_berechtigung(Person.student)
        # pers.set_google_id("iffni")
        # pers.set_id(1)
        # return pers


@prochecked.route('/persons-by-name/<string:name>')  # string:name korrekt?
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


# Projekt Operationen (ein Projekt anlegen (post) oder alle bekommmen (get))
@prochecked.route('/project')
@prochecked.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class ProjectOperations(Resource):
    @prochecked.marshal_with(person, code=200)
    @prochecked.expect(person)  # Wir erwarten ein Person-Objekt von Client-Seite.
    @secured
    def post(self):
        """Anlegen eines neuen Projekt-Objekts.

        **ACHTUNG:** Wir fassen die vom Client gesendeten Daten als Vorschlag auf.
        So ist zum Beispiel die Vergabe der ID nicht Aufgabe des Clients.
        Selbst wenn der Client eine ID in dem Proposal vergeben sollte, so
        liegt es an der ProjektAdministration (Businesslogik), eine korrekte ID
        zu vergeben. *Das korrigierte Objekt wird schließlich zurückgegeben.*
        """
        adm = ProjectAdministration()

        proposal = Project.from_dict(api.payload)
        print(proposal)

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

    # Project related

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
        project_list = adm.get_projects_by_dozent(person_id)

        return project_list

            # Zunächst benötigen wir den durch id gegebenen Dozent.
            # doz = adm.get_dozent_by_id(id)

            # # Haben wir eine brauchbare Referenz auf ein Dozent-Objekt bekommen?
            # if doz is not None:
            #     # Jetzt erst lesen wir die Konten des Dozent aus.
            #     project_list = adm.get_projects_by_dozent(doz)
            #     return project_list
            # else:
            #     return "Dozent not found", 500


'''@prochecked.route('/dozents/<int:id>/projects')
@prochecked.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@prochecked.param('id', 'Die ID des Dozent-Objekts')
class ProjectsByDozentOperation(Resource):
    @prochecked.marshal_with(project)
    @secured
    def get(self, id):
        """Auslesen aller Project-Objekte bzgl. eines bestimmten Dozent-Objekts.

        Das Dozent-Objekt dessen Projects wir lesen möchten, wird durch die ```id``` in dem URI bestimmt.
        """
        adm = ProjectAdministration()
        # Zunächst benötigen wir den durch id gegebenen Dozent.
        doz = adm.get_dozent_by_id(id)

        # Haben wir eine brauchbare Referenz auf ein Dozent-Objekt bekommen?
        if doz is not None:
            # Jetzt erst lesen wir die Konten des Dozent aus.
            project_list = adm.get_projects_by_dozent(doz)
            return project_list
        else:
            return "Dozent not found", 500    '''


# Participation related


# @prochecked.route('/projects/<int:id>/participations')
# @prochecked.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
# @prochecked.param('id', 'Die ID des Project-Objekts')
# class ParticipationsByProjectOperation(Resource):
#     @prochecked.marshal_with(participation)
#     @secured
#     def get(self, project_id):
#         """Auslesen aller Participation-Objekte bzgl. eines bestimmten Project-Objekts.

#         Das Project-Objekt dessen Participations wir lesen möchten, wird durch die ```id``` in dem URI bestimmt.
#         """
#         adm = ProjectAdministration()
#         # Zunächst benötigen wir das durch id gegebene Project.
#         participation_list = adm.get_participations_by_project(project_id)
#         return participation_list

#         # # Haben wir eine brauchbare Referenz auf ein Project-Objekt bekommen?
#         # if pro is not None:
#         #     # Jetzt erst lesen wir die Teinahmen des Projects aus.
#         #     participation_list = adm.get_participations_by_project(pro)
#         #     return participation_list
#         # else:
#         #     return "Project not found", 500




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
        for p in par:
            print(p)
        return par


        #FOR SCLEIFE NOCH DEFINIEREN

        # Haben wir eine brauchbare Referenz auf ein Project-Objekt bekommen?
        # if par is not None: ---> WIRD IM FRONTEND EINZELN ABGEFRAGT
        #     # Jetzt erst lesen wir die Teinahmen des Projects aus.
        #     student_list = adm.get_students_by_id(par.get_student_id)  # par.get_student_id vermutlich richtig ?!?!?
        #     return student_list
        # else:
        #     return "project_not_found", 500
        # 

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
        pro = adm.get_project_by_id(project_id) #funktioniert

        if pro is not None:
            # Jetzt erst macht es Sinn, für den Projekt ein neues Teilnahme anzulegen und dieses zurückzugeben.
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
    @prochecked.expect(participation)  # Wir erwarten ein Grading-Objekt von Client-Seite.
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

# StudentByParticipationOperation
#     GET
# brauchen wir glaube erstmal nicht


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
        print(id)
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
        print(proposal.get_grade(), proposal.get_passed())
        print(api.payload)


        """RATSCHLAG: Prüfen Sie stets die Referenzen auf valide Werte, bevor Sie diese verwenden!"""
        if proposal is not None:
            """ Das serverseitig erzeugte Objekt ist das maßgebliche und 
            wird auch dem Client zurückgegeben. 
            """
            p = adm.create_grading(proposal.get_grade(),proposal.get_participation())
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






if __name__ == '__main__':
    app.run(debug=True)


    '''adm = ProjectAdministration()
    g = adm.get_grading_by_participation_id(1)
    print(g.get_grade())'''





    '''p = adm.get_participations_by_project(3)
    for i in p:
        print(i)'''


    '''adm = ProjectAdministration()
    s = adm.get_student_by_id(1)
    print(s.get_name())'''

    '''p = Participation()
    p.set_grading(3)
    p.set_id(6)
    p.set_project(3)
    p.set_student(s.get_id())


    result = adm.save_participation(p)
    print(result)'''

    '''adm = ProjectAdministration()
    p = adm.create_grading(4.0, 1)
    print(type(p))'''

    #adm = ProjectAdministration()
    #adm.create_grading(1.1,3)

    #adm = ProjectAdministration()
    #par = adm.get_participation_by_id(3)
    #print(par)
    #adm.delete_participation(3)


    # adm = ProjectAdministration()
    # participations = adm.get_participations_by_project(3)
    # print(participations)
    # for p in participations:
    #     print(p.get_id(), p.get_project(), p.get_student())

    # adm = ProjectAdministration()
    # persons = adm.get_persons_by_role(2)
    # print(persons[0].get_name())
    

    '''adm = ProjectAdministration()
    persons = adm.get_all_persons()
    print(persons[0].get_name())'''

    '''adm = ProjectAdministration()
    projects = adm.get_projects_by_dozent(4)
    for p in projects:
        print(p.get_name())
    print(projects)'''
    # participations = adm.get_participations_by_project(1)
    # print(participations)
    # for p in participations:
    #     print(p.get_id(), p.get_project(), p.get_student())

    # student = adm.get_students_by_id(1)
    # print(student.get_name(), student.get_matr_nr())

    # print(type(student))

    # for i in participations:
    #     print(type(i))

    # for e in projects:
    #     print(type(e))

    """adm = ProjectAdministration()
    project = Project()
    project.set_name("SE")
    project.set_capacity(123)
    project.set_id(1)
    project.set_dozent(12)
    project.set_state(13)
    project.set_project_type(1)
    project.set_semester(2)

    adm.create_project(project)"""
