from server.db.Mapper import Mapper
from server.bo.Participation import Participation

class ParticipationMapper(Mapper):
    """Mapper-Klasse, die Participation-Objekte auf eine relationale
    Datenbank abbildet. Hierzu wird eine Reihe von Methoden zur Verfügung
    gestellt, mit deren Hilfe z.B. Objekte gesucht, erzeugt, modifiziert und
    gelöscht werden können. Das Mapping ist bidirektional. D.h., Objekte können
    in DB-Strukturen und DB-Strukturen in Objekte umgewandelt werden.
    """
    
    def __init__(self):
        super().__init__()

    def find_all(self, ):
        """Auslesen aller Teilnahmen.

                :return Eine Sammlung mit Participation-Objekten, die sämtliche Teilnahmen an einem Projekt
                        repräsentieren.
                """
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * from prochecked.participation"
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, creation_date, grading_id, module_id, project_id, student_id) in tuples:
            participation = Participation()
            participation.set_id(id),
            participation.set_creation_date(creation_date),
            participation.set_grading(grading_id),
            participation.set_module(module_id),
            participation.set_project(project_id),
            participation.set_student(student_id),
            result.append(participation)

        self._cnx.commit()
        cursor.close()
        return result

    def find_by_id(self, id):

        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, creation_date, grading_id, module_id, project_id, student_id FROM participation WHERE id={}".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, creation_date, grading_id, module_id, project_id, student_id) = tuples[0]
            participation = Participation()
            participation.set_id(id),
            participation.set_creation_date(creation_date),
            participation.set_grading(grading_id),
            participation.set_module(module_id),
            participation.set_project(project_id),
            participation.set_student(student_id),
            result = participation

        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._cnx.commit()
        cursor.close()
        return result
    
    def delete_participation(self, participation_id):
        """Löschen der Daten eines Participation-Objekts aus der Datenbank.

        :param participation das aus der DB zu löschende "Objekt"
        """
        cursor = self._cnx.cursor()

        command = "DELETE FROM participation WHERE id={}".format(participation_id)
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

    def find_by_project_id(self, project_id):
        """Auslesen aller Teilnahmen eines durch Fremdschlüssel (project_id) gegebenen Projekts.

        :param project_id Schlüssel des zugehörigen Studenten.
        :return Eine Sammlung mit Teilnahme-Objekten, die sämtliche teilnahmen des
                betreffenden Studentenn repräsentieren.
        """
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT id, grading_id, module_id, project_id, student_id FROM participation WHERE project_id={} ORDER BY project_id".format(project_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, grading_id, module_id, project_id, student_id) in tuples:
            p = Participation()
            p.set_id(id)
            p.set_grading(grading_id)
            p.set_module(module_id)
            p.set_project(project_id)
            p.set_student(student_id)
            result.append(p)
        
        self._cnx.commit()
        cursor.close()
        return result

    def find_by_student_id(self, student_id):
        """Auslesen aller Teilnahmen eines durch Fremdschlüssel (student_id) gegebenen Projekts.

        :param project_id Schlüssel des zugehörigen Studenten.
        :return Eine Sammlung mit Teilnahme-Objekten, die sämtliche teilnahmen des
                betreffenden Studentenn repräsentieren.
        """
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT id, grading_id, module_id, project_id, student_id FROM participation WHERE student_id={} ORDER BY project_id".format(student_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, grading_id, module_id, project_id, student_id) in tuples:
            p = Participation()
            p.set_id(id)
            p.set_grading(grading_id)
            p.set_module(module_id)
            p.set_project(project_id)
            p.set_student(student_id)
            result.append(p)
        
        self._cnx.commit()
        cursor.close()
        return result

    def find_by_student_id_and_project_id(self, student_id, project_id):
        """Auslesen einer Teilnahme durch Fremdschlüssel (student_id und project_id) 

        :param project_id Schlüssel des zugehörigen Studenten.
        :return Teilnahme-Objekt
        """
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT id, grading_id, module_id, project_id, student_id FROM participation WHERE student_id={} and project_id={} ORDER BY project_id".format(student_id, project_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, grading_id, module_id, project_id, student_id) in tuples:
            p = Participation()
            p.set_id(id)
            p.set_grading(grading_id)
            p.set_module(module_id)
            p.set_project(project_id)
            p.set_student(student_id)
            result.append(p)
        
        self._cnx.commit()
        cursor.close()
        return result[0]

    def update(self, participation):
        """Wiederholtes Schreiben eines Objekts in die Datenbank.

        :param participation das Objekt, das in die DB geschrieben werden soll
        """
        cursor = self._cnx.cursor()

        command = "UPDATE participation SET grading_id=%s, module_id=%s, project_id=%s, student_id=%s WHERE id=%s"
        data = (
                participation.get_grading(),
                participation.get_module(),
                participation.get_project(),
                participation.get_student(),
                participation.get_id())

        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def insert(self, participation):
        """Einfügen eines Participation-Objekts in die Datenbank.
        
        Dabei wird auch der Primärschlüssel des übergebenen Objekts geprüft und ggf.
        berichtigt.

        :param participation das zu speichernde Objekt
        :return das bereits übergebene Objekt, jedoch mit ggf. korrigierter ID.
        """
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM participation ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            if maxid[0] is not None:
                """Wenn wir eine maximale ID festellen konnten, zählen wir diese
                um 1 hoch und weisen diesen Wert als ID dem Participation-Objekt zu."""
                participation.set_id(maxid[0] + 1)
            else:
                """Wenn wir KEINE maximale ID feststellen konnten, dann gehen wir
                davon aus, dass die Tabelle leer ist und wir mit der ID 1 beginnen können."""
                participation.set_id(1)

        command = "INSERT INTO participation (id, creation_date, grading_id, module_id, project_id, student_id) VALUES (%s,%s,%s,%s,%s,%s)"
        data = (participation.get_id(),
                participation.get_creation_date(),
                participation.get_grading(),
                participation.get_module(),
                participation.get_project(),
                participation.get_student()
                )
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()
        return participation

if (__name__ == "__main__"):

    with ParticipationMapper() as mapper:
        result = mapper.find_by_student_id(1)
        for p in result:
            print(p)






       

