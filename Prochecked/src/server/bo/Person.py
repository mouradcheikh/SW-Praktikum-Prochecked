from Role import Role
from NamedBusinessObjects import NamedBusinessObjects

class Person(NamedBusinessObjects):

    student = Role("Student")
    dozent = Role("Dozent")
    admin = Role("Admin")


    def __init__(self):
        #super().__init__() #Erbt Attribut Name und dessen Getter und Setter von NamedBusinessObject

        self.__berechtigung = None
        self.__vorname = None

    def set_vorname(self,vorname):
        self.__vorname = vorname
    
    def get_vollständigerName(self):
        return self.__vorname + " " + self.get_name()
        

    def set_berechtigung(self, rolle):
        self.__berechtigung = rolle

    def get_berechtigung(self):
        return self.__berechtigung
    
    

if __name__ == "__main__":

    Mensch1 = Person()
    Mensch1.set_berechtigung(Person.student)
    Mensch1.set_name("Lauch")
    Mensch1.set_vorname("Günther")
    print(Mensch1.get_vollständigerName())
    print(Mensch1.get_berechtigung())
  
  

    