#!/usr/bin/python
#-*- coding: utf-8 -*-

from Person import Person

class Student(Person):
    def __init__(self):
        self.studiengang = None
        self.matr_nr = None
        self.Registrierung = []
        self.Beteiligter = None

    def set_matr_nr(self, matr_nr):
        pass

    def get_matr_nr(self, ):
        pass

    def set_studiengang(self, str):
        pass

    def get_studiengang(self, ):
        pass

    def from_dict(self, dict):
        pass

    def __str__(self, ):
        pass

