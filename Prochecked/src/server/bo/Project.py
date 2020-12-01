
from server.bo.NamedBusinessObjects import NamedBusinessObjects 
from server.bo.Automat import Automat 
from server.bo.ProjectType import ProjectType
from datetime import datetime

class Project(NamedBusinessObjects, Automat):

    #Statische Variablen der ProjektTypen, die nach dem Anlegen eines Projekts diesem zugeordnet werden können.
    #Jedes dieser Varablen initiiert ein Objekt der Klasse ProjectType
    transdisziplinaer = ProjectType("Transdiziplinäres Projekt",10, 20)  
    interdisziplinaer = ProjectType("Interdisziplinäres Projekt",5, 10)
    fachspezifisch = ProjectType("Fachspezifisches Projekt",3, 5)



    def __init__(self):
        #super().__init__() #vermute man braucht die super init nicht, da automat und NamedBusinesObject nicht erzeugt werden müssen, deren methoden können trozdem verwendet werden
        
        #mpssen hier glaub einige  variablen rausnehmen - denke nicht dass wir die alle brauchen
        self.__capacity = None
        self.__room = None
        self.__ext_partner_list = None
        self.__short_description = None
        self.__weekly_flag = None
        self.__number_bd_per_week = None
        self.__number_bd_b_lecturetime = None
        self.__number_bd_examtime = None
        self.__number_bd_lecturetime = None
        self.__preffered_bd = None
        self.__special_room = None
        self.__special_room_number = None
        self.__module = None
        self.__dozent = []
        self.__Beteiligung = []
        self.__Charakter = None
        self.__Zeitraum = None #Kommt hier ein Objekt von Semester rein?
        self.__Veranstaltung = None
        self.__Zustandsgeber = None #brauchen wir glaube nicht, macht projettype oder?
        self.__projecttype = None


    def set_projecttype(self, projecttype):
        self.__projecttype = projecttype

    def get_projecttype(self):
        return self.__projecttype


    def set_capacity(self, capacity):
        self.__capacity = capacity

    def get_capacity(self):
        return self.__capacity


    def set_room(self, room):
        self.__room = room

    def get_room(self):
        return self.__room


    def set_ext_partner_list(self, ext_partner_list):
        self.__ext_partner_list = ext_partner_list

    def get_ext_partner_list(self):
        return self.__ext_partner_list


    def set_short_description(self, short_description):
        self.__short_description = short_description
        
    def get_short_description(self):
        return self.__short_description


    def set_weekly_flag(self, weekly_flag):
        self.__weekly_flag = weekly_flag

    def get_weekly_flag(self):
        return self.__weekly_flag

    def set_number_bd_b_lecturetime(self, number_bd_b_lecturetime):
        self.__number_bd_b_lecturetime = number_bd_b_lecturetime
   
    def get_number_bd_b_lecturetime(self):
        return self.__number_bd_b_lecturetime


    def set_number_bd_examtime(self, number_bd_examtime):
        self.__number_bd_examtime = number_bd_examtime

    def get_number_bd_examtime(self):
        return self.__number_bd_examtime


    def set_preffered_bd(self, preffered_bd):
        self.__preffered_bd = preffered_bd

    def get_preffered_bd(self):
        return self.__preffered_bd


    def set_special_room(self, special_room):
        self.__special_room = special_room

    def get_special_room(self):
        return self.__special_room

    
    def set_dozent(self, dozent):
        self.__dozent = dozent

    def get_dozent(self):
        return self.__dozent


    def __str__(self):
        return "Projekt: {}, {}, {}".format(self.get_name(), self.get_projecttype(), self.get_dozent())

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in ein Person()-Objekt."""
        obj = Project()
        obj.set_id(dictionary["id"])  # eigentlich Teil von BusinessObject !
        obj.set_name(dictionary["name"])
        #benötigen wir hier alle Attribute ?

if __name__ == "__main__":

    Project1 = Project()
    Project1.set_state(Project.s_new)
    Project1.set_projecttype(Project.transdisziplinaer)
    Project1.set_short_description("Das hier ist eine Kurzbeschreibung")
    Project1.set_name("Datenbank")
    Project1.set_dozent("Lehmann")
    
    print(Project1)