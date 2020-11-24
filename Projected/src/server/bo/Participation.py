#!/usr/bin/python
#-*- coding: utf-8 -*-

from BusinessObjects import BusinessObjects

class Participation(BusinessObjects):
    def __init__(self):
        self.Zuteilung = None
        self.Leistungsergebnis = None
        self.Veranstaltung = None
        self.Interessent = None

    def from_dict(self, dict):
        pass

    def __str__(self, ):
        pass

