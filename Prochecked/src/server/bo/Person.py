from server.bo.Role import Role
from server.bo.NamedBusinessObjects import NamedBusinessObjects 
from datetime import datetime

class Person(NamedBusinessObjects):
    """Personen können die Rolle: Student, Dozent oder Admin annehmen"""

    student = Role("Student")
    dozent = Role("Dozent")
    admin = Role("Admin")

    def __init__(self):
        super().__init__() 
        self._email = ""
        self._google_id = ""
        self._berechtigung = 0
        self._student = 0

    def set_berechtigung(self, rolle):
        """Setzen der Rolle"""
        self._berechtigung = rolle

    def get_berechtigung(self):
        """Auslesen der Rolle"""
        return self._berechtigung

    def set_google_id(self, google_id):
        """Setzen der Google ID"""
        self._google_id = google_id

    def get_google_id (self):
        """Auslesen der Google ID"""
        return self._google_id
    
    def set_email(self, email):
        """Setzen der Email"""
        self._email = email
    
    def get_email(self):
        """Auslesen der Email"""
        return self._email
    
    def set_student(self, student_id):
        """Setzen der Studenten ID"""
        self._student = student_id
    
    def get_student(self):
        """Auslesen der Studenten ID"""
        return self._student

    def __str__(self):
        """Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz"""
        return "Person: {}, {},{}".format(self.get_id(),self.get_creation_date(),self.get_name())

    def to_dict(self):
        """Umwandeln User() in ein Python dict()"""
        result = {
            "id": self.get_id(),
            "name": self.get_name(),
            "email": self.get_email(),
            "google_id": self.get_google_id(),
            "creation_date": self.get_creation_date(),
            "last_updated": self.get_last_updated(),
            "berechtigung": self.get_berechtigung(),
            "student": self.get_student(),
        }
        return result

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in ein Person()-Objekt."""
        obj = Person()
        obj.set_id(dictionary["id"])  # eigentlich Teil von BusinessObject !
        obj.set_name(dictionary["name"])
        obj.set_berechtigung(dictionary["berechtigung"])
        obj.set_email(dictionary["email"])
        obj.set_google_id(dictionary["google_id"])
        obj.set_creation_date(Person.date_format(dictionary["creation_date"]))
        obj.set_last_updated(Person.date_format(dictionary["last_updated"]))
        obj.set_student(dictionary["student_id"])
        return obj

    
    @staticmethod
    def from_tuples(tuples=list()):
        """Umwandeln eines DB tuples in eine Person() (Python Objekt)"""
        result = []
        for (user_id, creation_date, name, google_id, email , role_id, student_id) in tuples:
            person = Person()
            person.set_id(user_id)
            person.set_name(name)
            person.set_berechtigung(role_id)
            person.set_email(email)
            person.set_google_id(google_id)
            person.set_creation_date(creation_date)
            person.set_student(student_id)
            result.append(person)
        return result
       
if __name__ == "__main__":

    Mensch1 = Person()
    Mensch1.set_berechtigung(Person.student)
    Mensch1.set_name("Lauch")
    Mensch1.set_id(5)
    print(Mensch1)
    
  
  

    