#!/usr/bin/python
#-*- coding: utf-8 -*-

from NamedBusinessObjects import NamedBusinessObjects

class Person(NamedBusinessObjects):
    def __init__(self):
        self.first_name = None
        self.Lehrveranstaltung = []
        self.Berechtigung = None
        self.Rolle = None

    def from_dict(in dict)(self, ):
        pass

    def set_first_name(self, str):
        pass

    def get_first_name(self, ):
        pass

    def __str__(self, ):
        pass

