#!/usr/bin/python
#-*- coding: utf-8 -*-
from datetime import datetime

from server.bo import BusinessObjects as bo

class Grading(bo.BusinessObjects):
    def __init__(self):
        super().__init__()
        self._passed = False #angangs immer False? also nicht bestanden?
        self._grade = None
        self._participation = 0

    def set_grade(self, grade):
        self._grade = grade

    def get_grade(self):
        return self._grade

    def set_passed(self, passed):
        self._passed = passed 

    def get_passed(self):
        return self._passed
    
    def set_participation(self, participation_id):
        self._participation = participation_id
    
    def get_participation(self):
        return self._participation

    def __str__(self, ):
        pass

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in ein Grading()-Objekt."""
        obj = Grading()
        obj.set_id(dictionary["id"])  # eigentlich Teil von BusinessObject !
        obj.set_grade(dictionary["grade"])
        obj.set_passed(dictionary["passed"]) 
        obj.set_participation(dictionary["participation_id"])
        return obj

    @staticmethod
    def from_tuples(tuples=list()):
        """Umwandeln eines DB tuples in eine P() (Python Objekt)"""
        result = []
        for (grading_id, creation_date, grade, passed, participation_id) in tuples:#grading_id richtig???
            gra = Grading()
            gra.set_id(grading_id)
            gra.set_creation_date(creation_date)
            gra.set_grade(grade)
            gra.set_passed(passed)
            gra.set_participaton(participation_id)
            
            result.append(gra)
        return result

    

