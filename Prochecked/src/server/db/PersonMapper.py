#!/usr/bin/python
# -*- coding: utf-8 -*-

from server.db.Mapper import Mapper
from server.bo.Person import Person



class PersonMapper(Mapper):
    def __init__(self):
        super().__init__()

    def find_by_google_id(self, google_id):
        """Suchen eines Benutzers mit vorgegebener Google ID. Da diese eindeutig ist,
        wird genau ein Objekt zurückgegeben.

        :param google_user_id die Google ID des gesuchten Users.
        :return User-Objekt, das die übergebene Google ID besitzt,
            None bei nicht vorhandenem DB-Tupel.
        """
        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, creation_date, name, google_id, email, role_id, student_id FROM person WHERE google_id='{}'".format(
            google_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, creation_date, name, google_id, email, role_id, student_id) = tuples[0]
            u = Person()
            u.set_id(id)
            u.set_creation_date(creation_date)
            u.set_name(name)
            u.set_google_id(google_id)
            u.set_creation_date(creation_date)
            u.set_email(email)
            u.set_berechtigung(role_id)
            u.set_student(student_id)
            
            result = u
        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def insert(self, person):
        """Einfügen eines Person-Objekts in die Datenbank.

        Dabei wird auch der Primärschlüssel des übergebenen Objekts geprüft und ggf.
        berichtigt.

        :param person das zu speichernde Objekt
        :return das bereits übergebene Objekt, jedoch mit ggf. korrigierter ID.
        """
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM person ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            if maxid[0] is not None:
                """Wenn wir eine maximale ID festellen konnten, zählen wir diese
                um 1 hoch und weisen diesen Wert als ID dem Person-Objekt zu."""
                person.set_id(maxid[0] + 1)
            else:
                """Wenn wir KEINE maximale ID feststellen konnten, dann gehen wir
                davon aus, dass die Tabelle leer ist und wir mit der ID 1 beginnen können."""
                person.set_id(1)

        command = "INSERT INTO person (id, creation_date, name, google_id, email, role_id, student_id) VALUES (%s,%s,%s,%s,%s,%s,%s)"
        data = (person.get_id(), person.get_creation_date(), person.get_name(),
                person.get_google_id(), person.get_email(), person.get_berechtigung(), person.get_student())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return person

    def find_all(self):
        """Auslesen aller Kunde.

        :return Eine Sammlung mit Person-Objekten, die sämtliche Kunden
                repräsentieren.
        """
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * from prochecked.person"
        cursor.execute(command)
        tuples = cursor.fetchall()

        result = Person.from_tuples(tuples)

        self._cnx.commit()
        cursor.close()
        return result



    def find_by_id(self, id):
        """Suchen eines Person mit vorgegebener ID. Da diese eindeutig ist,
        wird genau ein Objekt zurückgegeben.

        :param key Primärschlüsselattribut (->DB)
        :return Customer-Objekt, das dem übergebenen Schlüssel entspricht, None bei
            nicht vorhandenem DB-Tupel.
        """
        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, creation_date, name, google_id, email, role_id, student_id FROM person WHERE id={}".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, creation_date, name, google_id, email, role_id, student_id) = tuples[0]
            person = Person()
            person.set_id(id)
            person.set_creation_date(creation_date)
            person.set_name(name)
            person.set_google_id(google_id)
            person.set_email(email)
            person.set_berechtigung(role_id)
            person.set_student(student_id)

            result = person
        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def update(self, person):
        """Wiederholtes Schreiben eines Objekts in die Datenbank.

        :param person das Objekt, das in die DB geschrieben werden soll
        """
        cursor = self._cnx.cursor()

        command = "UPDATE person SET name=%s, email=%s, role_id=%s, student_id=%s WHERE google_id=%s"
        data = (person.get_name(), person.get_email(), person.get_berechtigung(), person.get_student(), person.get_google_id())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()


    def delete(self, person):
        """Löschen der Daten eines Person-Objekts aus der Datenbank.

        :param user das aus der DB zu löschende "Objekt"
        """
        cursor = self._cnx.cursor()

        command = "DELETE FROM person WHERE id={}".format(person.get_google_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()



    def find_by_role(self, role_id):
        """Suchen eines Benutzers mit vorgegebener Google ID. Da diese eindeutig ist,
        wird genau ein Objekt zurückgegeben.

        :param google_user_id die Google ID des gesuchten Users.
        :return User-Objekt, das die übergebene Google ID besitzt,
            None bei nicht vorhandenem DB-Tupel.
        """
        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, creation_date, name, google_id, email, role_id, student_id FROM person WHERE role_id='{}'".format(
            role_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        result = Person.from_tuples(tuples)

        self._cnx.commit()
        cursor.close()

        return result


if (__name__ == "__main__"):
#     '''person = Person()
#     person.set_email("j@gmx.de")
#     person.set_google_id("kfwowaf")
#     person.set_id(1)
#     person.set_name("j")
#     person.set_berechtigung("Student")'''

  with PersonMapper() as mapper:
        result = mapper.find_by_id(1)
        print(result)
        # for p in result:
        #     print(p)
