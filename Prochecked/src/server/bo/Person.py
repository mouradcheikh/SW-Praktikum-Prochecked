from Role import Role
from NamedBusinessObjects import NamedBusinessObjects

class Person(NamedBusinessObjects):

    student = Role("Student")
    dozent = Role("Dozent")
    admin = Role("Admin")


    def __init__(self):
        super().__init__() #Erbt Attribut Name und dessen Getter und Setter von NamedBusinessObject

        self.__berechtigung = None

    def set_name(self,vorname):
        self.__name = vorname
    
    def get_name(self):
        return self.__name

    def set_berechtigung(self, rolle):
        self.__berechtigung = rolle

    def get_berechtigung(self):
        return self.__berechtigung



if __name__ == "__main__":

    Mensch1 = Person()
    Mensch1.set_berechtigung(Person.student)
    print(Mensch1.get_name(),Mensch1.get_berechtigung())
   

    Mensch2 = Person()
    Mensch2.set_name("Georg")
    Mensch2.set_berechtigung(Person.dozent)
    print(Mensch2.get_berechtigung())

  

    