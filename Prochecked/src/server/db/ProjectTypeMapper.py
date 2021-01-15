#!/usr/bin/python
#-*- coding: utf-8 -*-

from server.db.Mapper import Mapper
from server.bo.ProjectType import ProjectType

class ProjectTypeMapper(Mapper):
    def __init__(self):
        pass

    def find_all(self, ):
        """Auslesen aller ProjectTypes.

                :return Eine Sammlung mit ProjectType-Objekten, die sämtliche ProjectTypes 
                repräsentieren.
                """
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

    def find_by_id(self, ):
        pass

