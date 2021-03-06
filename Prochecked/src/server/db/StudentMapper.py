from server.db.Mapper import Mapper
from server.bo.Student import Student


class StudentMapper(Mapper):
    """Mapper-Klasse, die Studenten-Objekte auf eine relationale
    Datenbank abbildet. Hierzu wird eine Reihe von Methoden zur Verfügung
    gestellt, mit deren Hilfe z.B. Objekte gesucht, erzeugt, modifiziert und
    gelöscht werden können. Das Mapping ist bidirektional. D.h., Objekte können
    in DB-Strukturen und DB-Strukturen in Objekte umgewandelt werden.
    """
    
    def __init__(self):
        super().__init__()

    def find_all(self, ):
        """Auslesen aller Projekte.

        :return Eine Sammlung mit Projekt-Objekten, die sämtliche Projekte
                        repräsentieren.
        """
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * from prochecked.student"
        cursor.execute(command)
        tuples = cursor.fetchall()

        result = Student.from_tuples(tuples)

        self._cnx.commit()
        cursor.close()
        return result

    def find_by_id(self, id):
        """Suchen eines Studentens mit vorgegebener ID. Da diese eindeutig ist,
        wird genau ein Objekt zurückgegeben.

        :param key Primärschlüsselattribut (->DB)
        :return Studenten-Objekt, das dem übergebenen Schlüssel entspricht, None bei
            nicht vorhandenem DB-Tupel.
        """
        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, creation_date, matr_nr, studiengang, person_id FROM student WHERE id={}".format(
            id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, creation_date, matr_nr, studiengang, person_id) = tuples[0]
            student = Student()
            student.set_id(id)
            student.set_creation_date(creation_date)
            student.set_matr_nr(matr_nr)
            student.set_studiengang(studiengang)
            student.set_person(person_id)
            result = student
        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_person_id(self, person_id):
        """Suchen eines Studentens mit vorgegebener ID. Da diese eindeutig ist,
        wird genau ein Objekt zurückgegeben.

        :param person_id Primärschlüsselattribut 
        :return Student-Objekt, das dem übergebenen Schlüssel entspricht, None bei
            nicht vorhandenem DB-Tupel.
        """
        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, creation_date, matr_nr, studiengang, person_id FROM student WHERE person_id={}".format(
            person_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, creation_date, matr_nr, studiengang, person_id) = tuples[0]
            student = Student()
            student.set_id(id)
            student.set_creation_date(creation_date)
            student.set_matr_nr(matr_nr)
            student.set_studiengang(studiengang)
            student.set_person(person_id)
            result = student
        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_matr_nr(self, matr_nr):
        """Suchen eines Studentens mit vorgegebener matr_nr. Da diese eindeutig ist,
        wird genau ein Objekt zurückgegeben.

        :param matr_nr Primärschlüsselattribut (->DB)
        :return Student-Objekt, das dem übergebenen Schlüssel entspricht, None bei
            nicht vorhandenem DB-Tupel.
        """
        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, creation_date, matr_nr, studiengang, person_id FROM student WHERE matr_nr={}".format(
            matr_nr)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, creation_date, matr_nr, studiengang, person_id) = tuples[0]
            student = Student()
            student.set_id(id)
            student.set_creation_date(creation_date)
            student.set_matr_nr(matr_nr)
            student.set_studiengang(studiengang)
            student.set_person(person_id)
            result = student
        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def insert(self, student):
        """Einfügen eines Student-Objekts in die Datenbank.

        Dabei wird auch der Primärschlüssel des übergebenen Objekts geprüft und ggf.
        berichtigt.

        :param student das zu speichernde Objekt
        :return das bereits übergebene Objekt, jedoch mit ggf. korrigierter ID.
        """

        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM student ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:

            if maxid[0] is not None:
                    """Wenn wir eine maximale ID festellen konnten, zählen wir diese
                    um 1 hoch und weisen diesen Wert als ID dem Studentt-Objekt zu."""
                    student.set_id(maxid[0] + 1)
            else:
                    """Wenn wir KEINE maximale ID feststellen konnten, dann gehen wir
                    davon aus, dass die Tabelle leer ist und wir mit der ID 1 beginnen können."""
                    student.set_id(1)

        command = "INSERT INTO student (id,creation_date,matr_nr, studiengang, person_id) VALUES (%s,%s,%s,%s,%s)"
        data = (
                student.get_id(),
                student.get_creation_date(),
                student.get_matr_nr(),
                student.get_studiengang(),
                student.get_person(),
                )
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return student
        
    def delete(self, student):
        """Löschen der Daten eines Person-Objekts aus der Datenbank.

        :param student das aus der DB zu löschende "Objekt"
        """
        cursor = self._cnx.cursor()

        command = "DELETE FROM student WHERE id={}".format(student.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

    def update(self, student):
        """Wiederholtes Schreiben eines Objekts in die Datenbank.

        :param student das Objekt, das in die DB geschrieben werden soll
        """
        print("StudentMapper:", student.get_id(), student.get_matr_nr(), student.get_studiengang(), student.get_person())
        cursor = self._cnx.cursor()

        command = "UPDATE student SET matr_nr=%s, studiengang=%s, person_id=%s WHERE id=%s"
        data = (student.get_matr_nr(),
                student.get_studiengang(), 
                student.get_person(),
                student.get_id())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()



if (__name__ == "__main__"):
  '''  student = Student()
    student.set_matr_nr(38454)
    student.set_person(2)
    student.set_id(1)
    student.set_studiengang("WI8")

with StudentMapper() as mapper:
    result = mapper.update(student)'''