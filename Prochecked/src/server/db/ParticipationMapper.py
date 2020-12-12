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

    def find_by_project_id(self, projectID):
        """Auslesen aller Teilnahmen eines durch Fremdschlüssel (project_id) gegebenen Projekts.

        :param project_id Schlüssel des zugehörigen Studenten.
        :return Eine Sammlung mit Teilnahme-Objekten, die sämtliche teilnahmen des
                betreffenden Studentenn repräsentieren.
        """
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT id, project_id FROM participation WHERE project_id={} ORDER BY id".format(projectID)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, project_id) in tuples:
            p = Participation()
            p.set_id(id)
            p.set_project(project_id)
            result.append(p)
        
        self._cnx.commit()
        cursor.close()

        return result