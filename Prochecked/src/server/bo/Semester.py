#!/usr/bin/python
#-*- coding: utf-8 -*-

from server.bo.NamedBusinessObjects import NamedBusinessObjects
from datetime import datetime

class Semester(NamedBusinessObjects):
    def __init__(self):
        super().__init__()
        self.teilleistung = []


    def __str__(self, ):
        pass

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in ein Semster()-Objekt."""
        obj = Semester()
        obj.set_id(dictionary["id"])  # eigentlich Teil von BusinessObject !
        obj.set_name(dictionary["name"])    
        return obj

    @staticmethod
    def from_tuples(tuples=list()):
        """Umwandeln eines DB tuples in ein Semester() (Python Objekt)"""
        result = []
        for (id, creation_date, name) in tuples:
            semester = Semester()
            semester.set_id(id)
            semester.set_creation_date(creation_date)
            semester.set_name(name)
            result.append(semester)
        return result