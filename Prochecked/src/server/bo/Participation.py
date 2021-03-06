from server.bo import BusinessObjects as bo
from datetime import datetime

class Participation(bo.BusinessObjects):
    """Teilnahmen der Stundenten an Projekten"""

    def __init__(self):
        super().__init__()
        self._grading = 0
        self._project = 0
        self._module = 0
        self._student = 0
    
    def set_grading(self, grading_id):
        """Setzen der Noten"""
        self._grading = grading_id

    def get_grading(self):
        """Auslesen der Noten"""
        return self._grading

    def set_project(self, project_id):
        """Setzen des Projekts"""
        self._project = project_id

    def get_project(self):
        """Auslesen des Projekts"""
        return self._project

    def set_module(self, module_id):
        """Setzen des Moduls"""
        self._module = module_id

    def get_module(self):
        """Auslesen des Moduls"""
        return self._module

    def set_student(self, student_id):
        """Setzen des Studenten"""
        self._student = student_id

    def get_student(self):
        """Auslesen des Studenten"""
        return self._student

    def __str__(self):
        """Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz"""
        return "Participation: {}, {}, {}, {}, {}, {}".format(self.get_id(), self.get_creation_date(), self.get_grading(), self.get_module(), self.get_project(), self.get_student())
    

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
        """Umwandeln eines DB tuples in eine Participation (Python Objekt)"""
        result = []
        for (id, creation_date, grading_id, module_id, project_id , student_id) in tuples:#participation_id richtig???
            part = Participation()
            part.set_id(id)
            part.set_creation_date(creation_date)
            part.set_grading(grading_id)
            part.set_module(module_id)
            part.set_project(project_id)
            part.set_student(student_id)
            result.append(part)
        return result

if __name__ == "__main__":
    pass
