#!/usr/bin/python
#-*- coding: utf-8 -*-

from server.db.Mapper import Mapper
from server.bo.Grading import Grading

class GradingMapper(Mapper):
    def __init__(self):
        super().__init__()

    def find_all(self ):
        """Auslesen aller Noten.

        :return Eine Sammlung mit GRading-Objekten, die sämtliche Noten der Studierenden
                repräsentieren.
        """
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * from prochecked.grading"
        cursor.execute(command)
        tuples = cursor.fetchall()

        result = Grading.from_tuples(tuples)

        self._cnx.commit()
        cursor.close()
        return result

    def find_by_id(self, ):
        pass

