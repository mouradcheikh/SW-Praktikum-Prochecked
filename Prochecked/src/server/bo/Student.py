#!/usr/bin/python
#-*- coding: utf-8 -*-

from Person import Person

class Student(Person):
    def __init__(self):
        self.__studiengang = None
        self.__matr_nr = None
        self.__Registrierung = []
        self.__Beteiligter = None

    def set_matr_nr(self, matr_nr):
        self.__matr_nr = matr_nr

    def get_matr_nr(self):
        return self.__matr_nr

    def set_studiengang(self, studiengang):
        self.self__studiengang = studiengang

    def get_studiengang(self):
        return self.__studiengang

    def from_dict(self, dict):
        pass

    def __str__(self, ):
        pass

