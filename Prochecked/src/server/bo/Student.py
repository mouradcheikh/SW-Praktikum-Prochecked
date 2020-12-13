#!/usr/bin/python
#-*- coding: utf-8 -*-

from server.bo.Person import Person
from datetime import datetime

class Student(Person):
    def __init__(self):
        super().__init__()
        self._studiengang = ""
        self._matr_nr = 0
        # self.__Registrierung = []
        # self.__Beteiligter = None

    def set_matr_nr(self, matr_nr):
        self._matr_nr = matr_nr

    def get_matr_nr(self):
        return self._matr_nr

    def set_studiengang(self, studiengang):
        self._studiengang = studiengang

    def get_studiengang(self):
        return self._studiengang

    def __str__(self):
        return "Student: {}, {} ".format(self.get_matr_nr(),self.get_studiengang())
        

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in ein Person()-Objekt."""
        obj = Student()
        obj.set_id(dictionary["id"])  # eigentlich Teil von BusinessObject !
        obj.set_name(dictionary["name"])
        obj.set_berechtigung(dictionary["berechtigung"])
        obj.set_email(dictionary["email"])
        obj.set_google_id(dictionary["google_id"])
        obj.set_studiengang(dictionary["studiengang"])
        obj.set_matr_nr(dictionary["matr_nr"])
        obj.set_creation_date(Person.date_format(dictionary["creation_date"]))

        
        return obj
    
    @staticmethod
    def from_tuples(tuples=list()):
        """Umwandeln eines DB tuples in eine Person() (Python Objekt)"""
        result = []
        for (id, creation_date, name, matr_nr, studiengang) in tuples:
            student = Student()
            student.set_id(id)
            student.set_creation_date(creation_date)
            student.set_name(name)
            student.set_matr_nr(matr_nr)
            result.append(student)
        return result
        # PROBLEM: Datenbank


if __name__ == "__main__":

    s1 = Student()
    s1.set_matr_nr(38543)
    s1.set_studiengang("Wirtschaftsinformatik und digitale Medien")
    s1.set_name("Dettke")
    s1.set_id(5)

    print(s1)


