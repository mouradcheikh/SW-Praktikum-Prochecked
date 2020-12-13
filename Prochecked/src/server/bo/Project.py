
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
        
        #mpssen hier glaub einige  variablen rausnehmen - denke nicht dass wir die alle brauchen
        self._capacity = None
        self._room = None
        self._ext_partner_list = None
        self._short_description = None
        self._weekly_flag = None
        self._number_bd_per_week = None
        self._number_bd_b_lecturetime = None #blocktage vor beginn der vorlesungszeit
        self._number_bd_examtime = None
        self._number_bd_lecturetime = None #blocktage vorlesungszeit
        self._preffered_bd = None #Gibt es Vorlesungen am Wochenende? wenn ja welches datum?
        self._special_room = None
        self._module = None
        self._dozent = [None,None]
        self._semester = None #Kommt hier ein Objekt von Semester rein?
        self._project_type = None


    def set_project_type(self, project_type):
        self._project_type = project_type
        
    def get_dozent_id(self):
        return self._dozent

    def set_projecttype(self, projecttype):
        self._projecttype = projecttype

    def get_project_type(self):
        return self._project_type

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
        self._weekly_flag = weekly_flag

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
        if self._dozent[0] == None:
            self._dozent[0]= dozent
        else: self._dozent[1] = dozent
    # def set_dozent(self, dozent): //obere ist richtig ?!
    #     self._dozent = dozent

    # def get_dozent(self):
    #     return self._dozent

    def set_semester(self, semester):
        self._semester = semester

    def get_semester(self):
        return self._semester

    def __str__(self):
        return "Projekt: {}, {}, {}".format(self.get_name(), self.get_projecttype(), self.get_dozent_id())

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in ein Person()-Objekt."""
        obj = Project()
        obj.set_id(dictionary["id"])  # eigentlich Teil von BusinessObject !
        obj.set_name(dictionary["name"])
        obj.set_project_type(dictionary["project_type"])
        obj.set_capacity(dictionary["capacity"])
        obj.set_room(dictionary["room"])
        obj.set_ext_partner_list(dictionary["ext_partner_list"])
        obj.set_short_description(dictionary["short_description"])
        obj.set_weekly_flag(dictionary["weekly_flag"])
        obj.set_number_bd_b_lecturetime(dictionary["number_bd_b_lecturetime"])
        obj.set_number_bd_examtime(dictionary["number_bd_examtime"])
        obj.set_preffered_bd(dictionary["preffered_bd"])
        obj.set_special_room(dictionary["special_room"])
        obj.set_dozent(dictionary["dozent"])
        obj.set_number_bd_lecturetime(dictionary["number_bd_lecturetime"])
        obj.set_state(dictionary["current_state"])
        #benötigen wir hier alle Attribute ? JA

if __name__ == "__main__":

    Project1 = Project()
    Project1.set_state(Project.s_new)
    Project1.set_project_type(Project.transdisziplinaer)
    Project1.set_short_description("Das hier ist eine Kurzbeschreibung")
    Project1.set_name("Datenbank")
    
    print(Project1)