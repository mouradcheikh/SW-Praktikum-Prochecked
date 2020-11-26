from Role import Role

class Person():

    student = Role("Student")
    dozent = Role("Dozent")
    admin = Role("Admin")



    def __init__(self, name):
        self.__name = name
        self.__berechtigung = None

    def set_berechtigung(self, rolle):
        self.__berechtigung = rolle

    def get_berechtigung(self):
        return self.__berechtigung



if __name__ == "__main__":

    Mensch1 = Person("Hans")
    Mensch1.set_berechtigung(Person.student)
    print(Mensch1.get_berechtigung())
   

    Mensch2 = Person("Georg")
    Mensch2.set_berechtigung(Person.dozent)
    print(Mensch2.get_berechtigung())