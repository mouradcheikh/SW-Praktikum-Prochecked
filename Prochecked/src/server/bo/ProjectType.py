from server.bo.NamedBusinessObjects import NamedBusinessObjects
from datetime import datetime

class ProjectType(NamedBusinessObjects):
    def __init__(self, name="", sws = 0, ects = 0):
        super().__init__()
        self._number_sws = sws
        self._number_ects = ects

    def set_number_sws(self, number_sws):
        """Setzen der SWS"""
        self._number_sws = number_sws

    def get_number_sws(self):
        """Auslesen der SWS"""
        return self._number_sws 

    def set_number_ects(self, number_ects):
        """Setzen der ECTS"""
        self._number_ects = number_ects 

    def get_number_ects(self):
        """Auslesen der SWS"""
        return self._number_ects

    def __str__(self):
        """Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz"""
        return self._name
    
    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in ein Person()-Objekt."""
        obj = ProjectType()
        obj.set_id(dictionary["id"])
        obj.set_name(dictionary["name"])
        obj.set_number_sws(dictionary["number_sws"])
        obj.set_number_ects(dictionary["number_ects"])
        return obj