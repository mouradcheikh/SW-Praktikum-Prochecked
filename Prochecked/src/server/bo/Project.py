
from NamedBusinessObjects import NamedBusinessObjects
from Automat import Automat
from ProjectType import ProjectType

class Project(NamedBusinessObjects, Automat):

    transdisziplinaer = ProjectType("Transdiziplinäres Projekt",10,20)
    interdisziplinaer = ProjectType( "Interdisziplinäres Projekt",5,10)
    fachspezifisch = ProjectType("Fachspezifisches Projekt",3, 5)



    def __init__(self):
        super().__init__()
        super().__init_()
        
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
        self.__Dozent = []
        self.__Beteiligung = []
        self.__Charakter = None
        self.__Zeitraum = None
        self.__Veranstaltung = None
        self.__Zustandsgeber = None
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
        return self._short_description


    def set_weekly_flag(self, weekly_flag):
        self.__weekly_flag = weekly_flag

    def get_weekly_flag(self):
        return self.__weekly_flag

    
    def set_number_bd_b_lecturetime(self, number_bd_b_lecturetime):
        self.__number_bd_b_lecturetime = number_bd_b_lecturetime
   
    def get_number_bd_b_lecturetime(self):
        return self.__number_bd_b_lecturetime


    def set_number_bd_examtime(self, number_bd_examtime):
        self.__number_bd_examtim = number_bd_examtime

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


    def from_dict(self, dict):
        pass

    def __str__(self, ):
        pass

if __name__ == "__main__":

    Project1 = Project("ALGO",Project.s_new)
    Project1.set_state(Project.s_new)
    Project1.set_projecttype(Project.transdisziplinaer)
    print(Project1.get_projecttype())