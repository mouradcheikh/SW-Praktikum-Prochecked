#!/usr/bin/python
#-*- coding: utf-8 -*-

from server.bo import BusinessObjects as bo
from datetime import datetime

class Participation(bo.BusinessObjects):
    def __init__(self):
        super().__init__()
        self._student = 0
        self._grading = 0
        self._project = 0
        self._module = 0
    

    def set_student(self, student_id):
        self._student = student_id

    def get_student(self):
        return self._student
    
    def set_grading(self, grading_id):
        self._grading = grading_id

    def get_grading (self):
        return self._grading

    def set_project(self, project_id):
        self._project = project_id

    def get_project(self):
        return self._project

    def set_module(self, module_id):
        self._module = module_id

    def get_module (self):
        return self._module
    

    def to_dict(self):
        """Umwandeln User() in ein Python dict()"""
        result = {
            "id": self.get_id(),
            "creation_date": self.get_creation_date(),
            "grading_id": self.get_grading(),
            "module_id": self.get_module(),
            "project_id": self.get_project(),
            "student_id": self.get_student(),        
        }
        return result
       

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in einen Participation()."""
        obj = Participation()
        obj.set_id(dictionary["id"])  # eigentlich Teil von BusinessObject !
        obj.set_creation_date(Participation.date_format(dictionary["creation_date"]))
        obj.set_grading(dictionary["grading_id"])  
        obj.set_module(dictionary["module_id"])
        obj.set_project(dictionary["project_id"])  
        obj.set_student(dictionary["student_id"])
        
        return obj
    
    @staticmethod
    def from_tuples(tuples=list()):
        """Umwandeln eines DB tuples in eine P() (Python Objekt)"""
        result = []
        for (participation_id, creation_date, grading_id, module_id, project_id , student_id) in tuples:#participation_id richtig???
            part = Participation()
            part.set_id(participation_id)
            part.set_creation_date(creation_date)
            part.set_grading(grading_id)
            part.set_module(module_id)
            part.set_project(project_id)
            part.set_student(student_id)
            result.append(part)
        return result

    # def __str__(self, ):
    #     pass

if __name__ == "__main__":
    pass
