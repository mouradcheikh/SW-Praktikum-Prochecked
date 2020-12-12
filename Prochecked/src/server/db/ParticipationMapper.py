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

    def find_by_project_id(self, projectID):
        """Auslesen aller Teilnahmen eines durch Fremdschlüssel (projectID) gegebenen Projekts.

        :param project_id Schlüssel des zugehörigen Studenten.
        :return Eine Sammlung mit Teilnahme-Objekten, die sämtliche teilnahmen des
                betreffenden Studentenn repräsentieren.
        """
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT id, projectID FROM participation WHERE projectID={} ORDER BY id".format(projectID)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, projectID) in tuples:
            p = Participation()
            p.set_id(id)
            p.set_project(projectID)
            result.append(p)
        
        self._cnx.commit()
        cursor.close()

        return result