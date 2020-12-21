#!/usr/bin/python
#-*- coding: utf-8 -*-

from server.db.Mapper import Mapper
from server.bo.Grading import Grading

class GradingMapper(Mapper):
    def __init__(self):
        super().__init__()

    def find_all(self):
        """Auslesen aller Noten.

        :return Eine Sammlung mit GRading-Objekten, die sämtliche Noten der Studierenden
                repräsentieren.
        """
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * from prochecked.grading"
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, creation_date,grade,passed) in tuples:
            grades = Grading()
            grades.set_id(id)
            grades.set_creation_date(creation_date)
            grades.set_grade(grade)
            grades.set_passed(passed)
            result.append(grades)

        self._cnx.commit()
        cursor.close()
        return result

    def find_by_id(self, ):
        pass

