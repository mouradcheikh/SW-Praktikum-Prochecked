#!/usr/bin/python
#-*- coding: utf-8 -*-

from server.bo import BusinessObjects as bo
from datetime import datetime

class Participation(bo.BusinessObjects):
    def __init__(self):
        super().__init__()
        self._student = None
        self._grading = None
        self._project = None
        self._module = None
    

    def set_student(self, student):
        self._student = student

    def get_student (self):
        return self._student
    
    def set_grading(self, grading):
        self._grading = grading

    def get_grading (self):
        return self._grading

    def set_project(self, project):
        self._project = project

    def get_project (self):
        return self._project

    def set_module(self, module):
        self._module = module

    def get_module (self):
        return self._module
    

    def to_dict(self):
        """Umwandeln User() in ein Python dict()"""
        result = {
            "id": self.get_id(),
            "creation_date": self.get_creation_date(),
            "gradingID": self.get_grading(),
            "moduleID": self.get_module(),
            "projectID": self.get_project(),
            "studentID": self.get_student(),        
        }
        return result
       

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in einen Participation()."""
        obj = Participation()
        obj.set_id(dictionary["id"])  # eigentlich Teil von BusinessObject !
        obj.set_creation_date(Participation.date_format(dictionary["creation_date"]))
        obj.set_grading(dictionary["gradingID"])  
        obj.set_module(dictionary["moduleID"])
        obj.set_project(dictionary["projectID"])  
        obj.set_student(dictionary["studentID"])
        
        return obj
    
    @staticmethod
    def from_tuples(tuples=list()):
        """Umwandeln eines DB tuples in eine P() (Python Objekt)"""
        result = []
        for (participation_id, creation_date, gradingID, moduleID, projectID , studentID) in tuples:
            person = Person()
            person.set_id(participation_id)
            person.set_creation_date(creation_date)
            person.set_gradingID(gradingID)
            person.set_moduleID(moduleID)
            person.set_projectID(projectID)
            person.set_studentID(studentID)
            result.append(person)
        return result

    # def __str__(self, ):
    #     pass

if __name__ == "__main__":
    pass
