#!/usr/bin/python
#-*- coding: utf-8 -*-
from datetime import datetime

from server.bo.NamedBusinessObjects import NamedBusinessObjects

"""Module die in den jeweiligen Semestern vorhanden sind"""

class Module(NamedBusinessObjects):
    def __init__(self):
        super().__init__()
        self._edv_nr = None

    def get_edv_nr(self, ):
        """Auslesen der EDV-Nummer"""
        return self._edv_nr

    def set_edv_nr (self, edv_nr):
        """Setzen der EDV-Nummer"""
        self._edv_nr = edv_nr

    def __str__(self):
        """Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz"""
        return "Module: {}, {}, {}".format(self.get_id(), self.get_name(), self.get_edv_nr())

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in einen Module()."""
        obj = Module()
        obj.set_id(dictionary["id"])  # eigentlich Teil von BusinessObject !
        obj.set_name(dictionary["name"])
        obj.set_edv_nr(dictionary["edv_nr"]) #muss "edv_nr" hier private sein?
        return obj



if __name__ == "__main__":

    m1 = Module()
    m1.set_name("herbert")
    print(m1.get_name())

