#!/usr/bin/python
#-*- coding: utf-8 -*-
from datetime import datetime

from server.bo import BusinessObjects as bo

class Grading(bo.BusinessObjects):
    def __init__(self):
        self.__passed = False #angangs immer False? also nicht bestanden?
        self.__grade = None
        self.__Beteiligung = None

    def set_grade(self, grade):
        self.__grade = grade

    def get_grade(self, ):
        return self.__grade

    def set_passed(self, passed):
        self.__passed = passed 

    def get_passed(self, ):
        return self.__passed

    def __str__(self, ):
        pass

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in ein Person()-Objekt."""
        obj = Grading()
        obj.set_id(dictionary["id"])  # eigentlich Teil von BusinessObject !
        obj.set_grade(dictionary["grade"])
        obj.set_passed(dictionary["passed"]) #muss "vorname" hier private sein?
        return obj

