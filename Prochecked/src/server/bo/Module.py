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

  
    def from_dict(self, dict):
        pass

    def __str__(self, ):
        pass

