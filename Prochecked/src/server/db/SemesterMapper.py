#!/usr/bin/python
#-*- coding: utf-8 -*-

from server.db.Mapper import Mapper
from server.bo.Semester import Semester

class SemesterMapper(Mapper):
    def __init__(self):
        pass

    def find_all(self):
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
                um 1 hoch und weisen diesen Wert als ID dem Person-Objekt zu."""
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

    def find_by_id(self, ):
        pass

