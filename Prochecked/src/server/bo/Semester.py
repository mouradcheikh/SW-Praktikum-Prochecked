#!/usr/bin/python
#-*- coding: utf-8 -*-

from server.bo.NamedBusinessObjects import NamedBusinessObjects
from datetime import datetime

class Semester(NamedBusinessObjects):
    def __init__(self):
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

