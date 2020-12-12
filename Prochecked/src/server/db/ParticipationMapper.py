#!/usr/bin/python
#-*- coding: utf-8 -*-

from server.db.Mapper import Mapper

class ParticipationMapper(Mapper):
    def __init__(self):
        pass

    def find_all(self, ):
        pass

    def find_by_id(self, ):
        pass

    def find_by_studentID(self, studentID):
        """Auslesen aller Teilnahmen eines durch Fremdschlüssel (StudentID) gegebenen Studenten.

        :param studeten_id Schlüssel des zugehörigen Studenten.
        :return Eine Sammlung mit Teilnahme-Objekten, die sämtliche teilnahmen des
                betreffenden Studentenn repräsentieren.
        """
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT id, studentID FROM participation WHERE studentID={} ORDER BY id".format(studentID)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, studentID) in tuples:
            p = Participation()
            p.set_id(id)
            p.set_student(studentID)
            result.append(p)
        
        self._cnx.commit()
        cursor.close()

        return result