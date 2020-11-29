from Role import Role
from NamedBusinessObjects import NamedBusinessObjects

class Person(NamedBusinessObjects):

    student = Role("Student")
    dozent = Role("Dozent")
    admin = Role("Admin")


    def __init__(self):
        #super().__init__() #Erbt Attribut Name und dessen Getter und Setter von NamedBusinessObject

        self.__berechtigung = None
        self.__vorname = ""
        self.__google_id = ""

    
    def set_berechtigung(self, rolle):
        self.__berechtigung = rolle

    def get_berechtigung(self):
        return self.__berechtigung


    def set_vorname(self,vorname):
        self.__vorname = vorname
    
    def get_vollständigerName(self):
        return self.__vorname + " " + self.get_name()


    def set_google_id(self, google_id):
        self.__google_id = google_id

    def get_google_id (self):
        return self.__google_id
    
    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in ein Person()-Objekt."""
        obj = Person()
        obj.set_id(dictionary["id"])  # eigentlich Teil von BusinessObject !
        obj.set_name(dictionary["name"])
        obj.set_vorname(dictionary["vorname"]) 
        obj.set_berechtigung(dictionary["berechtigung"])# ""
        return obj
    
    

if __name__ == "__main__":

    Mensch1 = Person()
    Mensch1.set_berechtigung(Person.student)
    Mensch1.set_name("Lauch")
    Mensch1.set_vorname("Günther")
    print(Mensch1.get_vollständigerName())
    print(Mensch1.get_berechtigung())
  
  

    