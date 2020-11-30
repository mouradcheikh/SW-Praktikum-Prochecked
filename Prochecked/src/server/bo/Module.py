#!/usr/bin/python
#-*- coding: utf-8 -*-

from NamedBusinessObjects import NamedBusinessObjects

class Module(NamedBusinessObjects):
    def __init__(self):
        self.__edv_nr = None

    def get_edv_nr(self, ):
        return self.__edv_nr

    def set_edv_nr (self, edv_nr):
        self.__edv_nr = edv_nr

    def __str__(self, ):
        pass

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

