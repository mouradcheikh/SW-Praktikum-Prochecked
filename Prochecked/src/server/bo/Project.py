
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
        super().__init__()
        
        self._capacity = None
        self._room = None
        self._ext_partner_list = None
        self._short_description = None
        self._weekly_flag = None
        # self._number_bd_per_week = None
        self._number_bd_b_lecturetime = None #blocktage vor beginn der vorlesungszeit
        self._number_bd_examtime = None
        self._number_bd_lecturetime = None #blocktage vorlesungszeit
        self._preffered_bd = None #Gibt es Vorlesungen am Wochenende? wenn ja welches datum?
        self._special_room = None
        self._module = None
        self._dozent = None
        self._dozent2 = None
        self._semester = None #Kommt hier ein Objekt von Semester rein?
        self._project_type = None
        self._project_state = None

    def set_project_type(self, project_type):
        self._project_type = project_type

    def get_project_type(self):
        return self._project_type

    def set_project_state(self, project_state):
        self._project_state = project_state

    def get_project_state(self):
        return self._project_state

    def set_capacity(self, capacity):
        self._capacity = capacity

    def get_capacity(self):
        return self._capacity

    def set_room(self, room):
        self._room = room

    def get_room(self):
        return self._room

    def set_ext_partner_list(self, ext_partner_list):
        self._ext_partner_list = ext_partner_list

    def get_ext_partner_list(self):
        return self._ext_partner_list

    def set_short_description(self, short_description):
        self._short_description = short_description
        
    def get_short_description(self):
        return self._short_description

    def set_weekly_flag(self, weekly_flag):
        if weekly_flag == True:
            self._weekly_flag = 1
        elif weekly_flag == False:
            self._weekly_flag = 0
        else:
            self._weekly_flag = None

    def get_weekly_flag(self):
        return self._weekly_flag

    def set_number_bd_b_lecturetime(self, number_bd_b_lecturetime):
        self._number_bd_b_lecturetime = number_bd_b_lecturetime
   
    def get_number_bd_b_lecturetime(self):
        return self._number_bd_b_lecturetime

    def set_number_bd_examtime(self, number_bd_examtime):
        self._number_bd_examtime = number_bd_examtime

    def get_number_bd_examtime(self):
        return self._number_bd_examtime
    def set_number_bd_lecturetime(self,number_bd_lecturetime):
        self._number_bd_lecturetime = number_bd_lecturetime

    def get_number_bd_lecturetime(self):
        return self._number_bd_lecturetime

    def set_preffered_bd(self, preffered_bd):
        self._preffered_bd = preffered_bd

    def get_preffered_bd(self):
        return self._preffered_bd

    def set_special_room(self, special_room):
        self._special_room = special_room

    def get_special_room(self):
        return self._special_room
 
    def set_dozent(self, dozent):
        self._dozent = dozent

    def get_dozent(self):
        return self._dozent

    def set_dozent2(self, dozent):
        self._dozent2 = dozent

    def get_dozent2(self):
        return self._dozent2

    def set_semester(self, semester):
        self._semester = semester

    def get_semester(self):
        return self._semester

    def get_module(self):
        return self._module

    def set_module(self, module_id):
        self._module = module_id

    def __str__(self):
        return "Projekt: {}, {}, {}".format(self.get_name(), self.get_project_type(), self.get_dozent())

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in ein Projekt()-Objekt."""
        obj = Project()
        obj.set_id(dictionary["id"])  # eigentlich Teil von BusinessObject !
        obj.set_name(dictionary["name"])
        obj.set_project_type(dictionary["project_type"])
        obj.set_capacity(dictionary["capacity"])
        # obj.set_room(dictionary["room"])
        obj.set_ext_partner_list(dictionary["ext_partner_list"])
        obj.set_short_description(dictionary["short_description"])
        obj.set_weekly_flag(dictionary["weekly_flag"])
        obj.set_number_bd_b_lecturetime(dictionary["number_bd_b_lecturetime"])
        obj.set_number_bd_examtime(dictionary["number_bd_examtime"])
        obj.set_preffered_bd(dictionary["preffered_bd"])
        obj.set_special_room(dictionary["special_room"])
        obj.set_dozent(dictionary["dozent"])
        obj.set_dozent2(dictionary["dozent2"])
        obj.set_number_bd_lecturetime(dictionary["number_bd_lecturetime"])
        obj.set_project_state(dictionary["project_state"])
        obj.set_project_type(dictionary["project_type"])
        obj.set_creation_date(Project.date_format(dictionary["creation_date"]))
        obj.set_last_updated(Project.date_format(dictionary["last_updated"]))
        obj.set_semester(dictionary["semester"])
        obj.set_module(dictionary["module"])
        return obj

if __name__ == "__main__":

    Project1 = Project()
    Project1.set_state(Project.s_new)
    Project1.set_project_type(Project.transdisziplinaer)
    Project1.set_short_description("Das hier ist eine Kurzbeschreibung")
    Project1.set_name("Datenbank")
    
    print(Project1)