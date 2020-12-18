#!/usr/bin/python
#-*- coding: utf-8 -*-

from server.db.Mapper import Mapper
from server.bo.Participation import Participation

class ParticipationMapper(Mapper):
    def __init__(self):
        pass

    def find_all(self, ):
        pass

    def find_by_id(self, ):
        pass

    def find_by_project_id(self, project_id):
        """Auslesen aller Teilnahmen eines durch Fremdschlüssel (project_id) gegebenen Projekts.

        :param project_id Schlüssel des zugehörigen Studenten.
        :return Eine Sammlung mit Teilnahme-Objekten, die sämtliche teilnahmen des
                betreffenden Studentenn repräsentieren.
        """
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT id, project_id, student_id FROM participation WHERE project_id={} ORDER BY id".format(project_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, project_id, student_id) in tuples:
            p = Participation()
            p.set_id(id)
            p.set_project(project_id)
            p.set_student(student_id)
            result.append(p)
        
        self._cnx.commit()
        cursor.close()

        return result

    def update(self, participation):
        """Wiederholtes Schreiben eines Objekts in die Datenbank.

        :param participation das Objekt, das in die DB geschrieben werden soll
        """
        cursor = self._cnx.cursor()

        command = "UPDATE participation " + "SET creation_date=%s, grading_id=%s, module_id=%s, project_id=%s, student_id=%s WHERE id=%s"
        data = (participation.get_creation_date(), participation.get_grading_id(), participation.get_module_id(), participation.get_project_id(),participation.get_student_id())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()



if __name__ == "__main__":

      with ParticipationMapper() as mapper:
        result = mapper.find_by_project_id(1)
        for p in result:
            print(p.get_id(), p.get_project(), p.get_student())
