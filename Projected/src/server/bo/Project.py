

from State_Accepted import State_Accepted
from NamedBusinessObjects import NamedBusinessObjects
from Automat import Automat

class Project(NamedBusinessObjects, Automat):

    def __init__(self):
        
        
        self.capacity = None
        self.room = None
        self.ext_partner_list = None
        self.short_description = None
        self.weekly_flag = None
        self.number_bd_per_week = None
        self.number_bd_b_lecturetime = None
        self.number_bd_examtime = None
        self.number_bd_lecturetime = None
        self.preffered_bd = None
        self.special_room = None
        self.special_room_number = None
        self.module = None
        self.Dozent = []
        self.Beteiligung = []
        self.Charakter = None
        self.Zeitraum = None
        self.Veranstaltung = None
        self.Zustandsgeber = None

    def get_projecttype(self, ):
        pass

    def set_capacity(self, int):
        pass

    def get_(self, ):
        pass

    def Operation1(self, ):
        pass

    def get_capacity(self, ):
        pass

    def set_capacity(self, capacitiy):
        pass

    def get_room(self, ):
        pass

    def set_room(self, room):
        pass

    def get_ext_partner_list(self, ):
        pass

    def set_ext_partner_list(self, ext_partner_list):
        pass

    def get_short_description(self):
        pass

    def set_short_description(self, short_description):
        pass

    def get_weekly_flag(self, ):
        pass

    def set_weekly_flag(self, weekly_flag):
        pass

    def get_number_bd_b_lecturetime(self, ):
        pass

    def set_number_bd_b_lecturetime(self, number_bd_b_lecturetime):
        pass

    def get_number_bd_examtime(self, ):
        pass

    def set_number_bd_examtime(self, number_bd_examtime):
        pass

    def get_number_bd_lecturetime(self, ):
        pass

    def set_number_bd_lecturetime(self, number_bd_lecturetime):
        pass

    def get_preffered_bd(self, ):
        pass

    def set_preffered_bd(self, preffered_bd):
        pass

    def get_special_room(self, ):
        pass

    def set_capacitiy(self, capacity):
        pass

    def get(self, ):
        pass

    def from_dict(self, dict):
        pass

    def set_special_room(self, special_room):
        pass

    def Operation2(self, ):
        pass

    def __str__(self, ):
        pass

Projekt3 = Project("algo")
Projekt3.change(State_Accepted)