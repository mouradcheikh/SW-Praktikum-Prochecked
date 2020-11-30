#!/usr/bin/python
#-*- coding: utf-8 -*-

from Person import Person

class Student(Person):
    def __init__(self):
        super().__init__()
        self.__studiengang = None
        self.__matr_nr = None
        # self.__Registrierung = []
        # self.__Beteiligter = None

    def set_matr_nr(self, matr_nr):
        self.__matr_nr = matr_nr

    def get_matr_nr(self):
        return self.__matr_nr

    def set_studiengang(self, studiengang):
        self.__studiengang = studiengang

    def get_studiengang(self):
        return self.__studiengang

    def __str__(self):
        return "Student: {}, {}, {}".format(self.get_matr_nr(), self.get_vollständigerName(),self.get_studiengang())
        

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in ein Person()-Objekt."""
        obj = Student()
        obj.set_id(dictionary["id"])  # eigentlich Teil von BusinessObject !
        obj.set_name(dictionary["name"])
        obj.set_vorname(dictionary["vorname"]) 
        obj.set_berechtigung(dictionary["berechtigung"])
        obj.set_email(dictionary["email"])
        obj.set_google_id(dictionary["googleId"])
        obj.set_studiengang(dictionary["studiengang"])
        obj.set_matr_nr(dictionary["matr_nr"])
        obj.set_creation_date(Person.date_format(dictionary["creationDate"]))
        obj.set_last_updated(Person.date_format(dictionary["lastUpdated"]))
        
        return obj
    
    @staticmethod
    def from_tuples(tuples=list()):
        """Umwandeln eines DB tuples in eine Person() (Python Objekt)"""
        result = []
        for (user_id, name,vorname, berechtigung, creation_date, email, google_id, matr_nr, studiengang, last_updated) in tuples:
            student = Student()
            student.set_id(user_id)
            student.set_name(name)
            student.set_vorname(vorname)
            student.set_berechtigung(berechtigung)
            student.set_email(email)
            student.set_google_id(google_id)
            student.set_matr_nr(matr_nr)
            student.set_studiengang(studiengang)
            student.set_creation_date(creation_date)
            student.set_last_updated(last_updated)
            result.append(student)
        return result


if __name__ == "__main__":

    s1 = Student()
    s1.set_matr_nr(38543)
    s1.set_studiengang("Wirtschaftsinformatik und digitale Medien")
    s1.set_name("Dettke")
    s1.set_id(5)
    s1.set_vorname("Perry")

    print(s1)


