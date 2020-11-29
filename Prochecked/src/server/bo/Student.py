#!/usr/bin/python
#-*- coding: utf-8 -*-

from Person import Person

class Student(Person):
    def __init__(self):
        super.__init__()
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

    def __str__(self, ):
        pass

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in ein Person()-Objekt."""
        obj = Student()
        obj.set_id(dictionary["id"])  # eigentlich Teil von BusinessObject !
        obj.set_name(dictionary["name"])
        obj.set_vorname(dictionary["vorname"]) #muss "vorname" hier private sein?
        obj.set_berechtigung(dictionary["berechtigung"])# ""
        obj.set_studiengang(dictionary["studiengang"])
        obj.set_matr_nr(dictionary["matr_nr"])
        return obj


if __name__ == "__main__":

    s1 = Student()
    s1.set_matr_nr(38543)
    s1.set_studiengang("Wirtschaftsinformatik und digitale Medien")
    s1.set_name("Müller")
    s1.set_id(5)
    s1.set_vorname("Holger")

    print(s1.get_vollständigerName())
    print(s1.get_id())


