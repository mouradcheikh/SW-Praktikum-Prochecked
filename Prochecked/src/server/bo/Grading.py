#!/usr/bin/python
#-*- coding: utf-8 -*-
from datetime import datetime

from server.bo import BusinessObjects as bo

"""Note die ein Student bei seiner Teilnahme an einem Projekt erreicht hat"""

class Grading(bo.BusinessObjects):
    def __init__(self):
        super().__init__()
        self._passed = False 
        self._grade = 0.0
        self._participation = 0

    def set_grade(self, grade):
        """Setzen der Noten"""
        self._grade = float(grade)
        # self.set_passed(grade)

    def get_grade(self):
        """Auslesen der Noten"""
        return self._grade

    def set_passed(self, passed):
        """Setzen der ob Bestanden oder nicht"""
        self._passed = passed

    def get_passed(self):
        """Auslesen der ob Bestanden oder nicht"""
        return self._passed
    
    def set_participation(self, participation_id):
        """Setzen der Teilnahme"""
        self._participation = participation_id
    
    def get_participation(self):
        """Auslesen der Teilnahme"""
        return self._participation

    def __str__(self):
         """Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz"""
        return "Grading: {}, {}, {}, {}".format(self.get_id(), self.get_grade(), self.get_passed(), self.get_participation())

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in ein Grading()-Objekt."""
        obj = Grading()
        obj.set_id(dictionary["id"])  # eigentlich Teil von BusinessObject !
        obj.set_grade(dictionary["grade"])
        obj.set_passed(dictionary["passed"]) 
        obj.set_participation(dictionary["participation"])
        obj.set_creation_date(Grading.date_format(dictionary["creation_date"]))
        return obj

    @staticmethod
    def from_tuples(tuples=list()):
        """Umwandeln eines DB tuples in eine Grading (Python Objekt)"""
        result = []
        for (grading_id, creation_date, grade, passed, participation_id) in tuples:
            gra = Grading()
            gra.set_id(grading_id)
            gra.set_creation_date(creation_date)
            gra.set_grade(grade)
            gra.set_passed(passed)
            gra.set_participation(participation_id)
            
            result.append(gra)
        return result



