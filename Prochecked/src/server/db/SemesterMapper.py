from server.db.Mapper import Mapper
from server.bo.Semester import Semester

class SemesterMapper(Mapper):
    """Mapper-Klasse, die Semester-Objekte auf eine relationale
    Datenbank abbildet. Hierzu wird eine Reihe von Methoden zur Verfügung
    gestellt, mit deren Hilfe z.B. Objekte gesucht, erzeugt, modifiziert und
    gelöscht werden können. Das Mapping ist bidirektional. D.h., Objekte können
    in DB-Strukturen und DB-Strukturen in Objekte umgewandelt werden.
    """
    
    def __init__(self):
        super().__init__()

    def find_all(self):
        """Auslesen aller Semester.

        :return Eine Sammlung mit Projekt-Objekten, die sämtliche Projekte
                        repräsentieren.
        """
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * from prochecked.semester"
        cursor.execute(command)
        tuples = cursor.fetchall()

        result = Semester.from_tuples(tuples)

        self._cnx.commit()
        cursor.close()
        return result
    
    def insert(self, semester):
        """Einfügen eines Semester-Objekts in die Datenbank.

        Dabei wird auch der Primärschlüssel des übergebenen Objekts geprüft und ggf.
        berichtigt.

        :param semester das zu speichernde Objekt
        :return das bereits übergebene Objekt, jedoch mit ggf. korrigierter ID.
        """
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM semester")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            if maxid[0] is not None:
                """Wenn wir eine maximale ID festellen konnten, zählen wir diese
                um 1 hoch und weisen diesen Wert als ID dem Semster-Objekt zu."""
                semester.set_id(maxid[0] + 1)
            else:
                """Wenn wir KEINE maximale ID feststellen konnten, dann gehen wir
                davon aus, dass die Tabelle leer ist und wir mit der ID 1 beginnen können."""
                semester.set_id(1)

        command = "INSERT INTO semester (id, creation_date, name) VALUES (%s,%s,%s)"
        data = (semester.get_id(), 
                semester.get_creation_date(), 
                semester.get_name(),
               )
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return semester

    def delete(self, semester):
        """Löschen der Daten eines Semester-Objekts aus der Datenbank.

        :param semester das aus der DB zu löschende "Objekt"
        """
        cursor = self._cnx.cursor()

        command = "DELETE FROM semester WHERE id={}".format(semester.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

    def find_by_id(self, id):

        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, creation_date, name FROM semester WHERE id={}".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, creation_date, name) = tuples[0]
            semester = Semester()
            semester.set_id(id),
            semester.set_creation_date(creation_date),
            semester.set_name(name),
            result = semester

        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def update(self, semester):
        """Wiederholtes Schreiben eines Objekts in die Datenbank.

        :param semester das Objekt, das in die DB geschrieben werden soll
        """
        cursor = self._cnx.cursor()

        command = "UPDATE semester " + "SET creation_date=%s, name=%s WHERE id=%s"

        data = (
                semester.get_creation_date(),
                semester.get_name(),
                semester.get_id())

        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

if __name__ == "__main__":
    with SemesterMapper() as mapper:
        mapper.delete(1)

