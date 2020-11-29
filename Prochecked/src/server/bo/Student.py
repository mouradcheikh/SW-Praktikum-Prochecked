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


if __name__ == "__main__":

    s1 = Student()
    s1.set_matr_nr(38543)
    s1.set_studiengang("Wirtschaftsinformatik und digitale Medien")
    s1.set_name("Müller")
    s1.set_id(5)
    s1.set_vorname("Holger")

    print(s1.get_vollständigerName())
    print(s1.get_id())


