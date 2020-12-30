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

    def find_by_id(self, ):
        pass

