from NamedBusinessObjects import NamedBusinessObjects
from datetime import datetime


class ProjectType(NamedBusinessObjects):
    def __init__(self, name="", sws = 0, ects = 0):
        super().__init__()
        self.__name = name
        self.__number_SWS = sws
        self.__number_ECTS = ects
        self.__Charakterannehmer = []


    def set_number_SWS(self, number_SWS):
        self.__number_SWS = number_SWS

    def get_number_SWS(self):
        return self.__number_SWS 

    def set_number_ECTS(self, number_ECTS):
        self.__number_ECTS = number_ECTS 

    def get_number_ECTS(self):
        return self.__number_ECTS

    def __str__(self):
        return self.__name
    
    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in ein Person()-Objekt."""
        obj = ProjectType()
        obj.set_id(dictionary["id"])  # eigentlich Teil von BusinessObject !
        obj.set_name(dictionary["name"])
        obj.set_number_SWS(dictionary["number_SWS"]) #muss "vorname" hier private sein?
        obj.set_number_ECTS(dictionary["number_ETCS"])# ""
        return obj