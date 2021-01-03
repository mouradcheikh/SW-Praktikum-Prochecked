#!/usr/bin/python
#-*- coding: utf-8 -*-

from server.bo.Person import Person
from datetime import datetime

class Student(Person):
    def __init__(self):
        super().__init__()
        self._studiengang = ""
        self._matr_nr = 0
        self._person = 0

    def set_matr_nr(self, matr_nr):
        self._matr_nr = matr_nr

    def get_matr_nr(self):
        return self._matr_nr

    def set_studiengang(self, studiengang):
        self._studiengang = studiengang

    def get_studiengang(self):
        return self._studiengang

    def set_person(self, person_id):
        self._person = person_id

    def get_person(self):
        return self._person

    def __str__(self):
        return "Student: {}, {}, {} ".format(self.get_name(),self.get_matr_nr(),self.get_studiengang())
        
    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in ein Person()-Objekt."""
        obj = Student()
        obj.set_id(dictionary["id"])  # eigentlich Teil von BusinessObject !
        obj.set_studiengang(dictionary["studiengang"])
        obj.set_matr_nr(dictionary["matr_nr"])
        obj.set_creation_date(Person.date_format(dictionary["creation_date"]))
        obj.set_person(dictionary["person_id"])

        
        return obj
    
    @staticmethod
    def from_tuples(tuples=list()):
        """Umwandeln eines DB tuples in eine Person() (Python Objekt)"""
        result = []
        for (id, creation_date, matr_nr, studiengang, person_id) in tuples:
            student = Student()
            student.set_id(id)
            student.set_creation_date(creation_date)
            student.set_matr_nr(matr_nr)
            student.set_studiengang(studiengang)
            student.set_person(person_id)
            result.append(student)
        return result
        
if __name__ == "__main__":

    s1 = Student()
    s1.set_matr_nr(38543)
    s1.set_studiengang("Wirtschaftsinformatik und digitale Medien")
    s1.set_name("Dettke")
    s1.set_id(5)

    print(s1)


