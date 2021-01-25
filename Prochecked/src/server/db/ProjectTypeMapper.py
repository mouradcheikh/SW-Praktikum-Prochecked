#!/usr/bin/python
#-*- coding: utf-8 -*-

from server.db.Mapper import Mapper
from server.bo.ProjectType import ProjectType

class ProjectTypeMapper(Mapper):
    def __init__(self):
        super().__init__()

    def find_all(self):
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * from prochecked.projecttype"
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, creation_date, name, number_ECTS, number_SWS) in tuples:
            p = ProjectType()
            p.set_id(id)
            p.set_creation_date(creation_date)
            p.set_name(name)
            p.set_number_ects(number_ECTS)
            p.set_number_sws(number_SWS)
            result.append(p)

        self._cnx.commit()
        cursor.close()
        return result

    def find_by_id(self, id):
        """Suchen eines ProjectType mit vorgegebener ID. Da diese eindeutig ist,
        wird genau ein Objekt zurückgegeben.

        :param key Primärschlüsselattribut (->DB)
        :return Customer-Objekt, das dem übergebenen Schlüssel entspricht, None bei
            nicht vorhandenem DB-Tupel.
        """
        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, creation_date, name, number_ects, number_sws FROM projecttype WHERE id={}".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, creation_date, name, number_ects, number_sws) = tuples[0]
            projecttype = ProjectType()
            projecttype.set_id(id)
            projecttype.set_creation_date(creation_date)
            projecttype.set_name(name)
            projecttype.set_number_ects(number_ects)
            projecttype.set_number_sws(number_sws)
 

            result = projecttype
        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._cnx.commit()
        cursor.close()

        return result
        

    def insert(self, projecttype):
        """Einfügen eines ProjectType-Objekts in die Datenbank.

        Dabei wird auch der Primärschlüssel des übergebenen Objekts geprüft und ggf.
        berichtigt.

        :param projecttype das zu speichernde Objekt
        :return das bereits übergebene Objekt, jedoch mit ggf. korrigierter ID.
        """
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM projecttype ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            if maxid[0] is not None:
                """Wenn wir eine maximale ID festellen konnten, zählen wir diese
                um 1 hoch und weisen diesen Wert als ID dem ProjectType-Objekt zu."""
                projecttype.set_id(maxid[0] + 1)
            else:
                """Wenn wir KEINE maximale ID feststellen konnten, dann gehen wir
                davon aus, dass die Tabelle leer ist und wir mit der ID 1 beginnen können."""
                projecttype.set_id(1)

        command = "INSERT INTO projecttype (id, creation_date, name, number_ects, number_sws) VALUES (%s,%s,%s,%s,%s)"
        data = (projecttype.get_id(), projecttype.get_creation_date(), projecttype.get_name(),
                projecttype.get_number_ects(), projecttype.get_number_sws())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return projecttype
          

    def update_by_id(self, projecttype):
            
        cursor = self._cnx.cursor()

        command = "UPDATE projecttype SET name=%s,number_ects=%s, number_sws=%s WHERE id=%s"
        data = (projecttype.get_name(),
                projecttype.get_number_ects(),
                projecttype.get_number_sws(), 
                projecttype.get_id())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()
        

    def delete(self, projecttype):
        """Löschen der Daten eines projecttype-Objekts aus der Datenbank.

        :param user das aus der DB zu löschende "Objekt"
        """
        cursor = self._cnx.cursor()

        command = "DELETE FROM projecttype WHERE id={}".format(projecttype.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()
    

if __name__ == "__main__":
    p = ProjectType()
    p.set_id(4)

    with ProjectTypeMapper() as mapper:
        # result = mapper.find_all()
        # for p in result:
        #     print(p)
        mapper.delete(p)