#!/usr/bin/python
#-*- coding: utf-8 -*-

from NamedBusinessObjects import NamedBusinessObjects

class Module(NamedBusinessObjects):
    def __init__(self):
        self.edv_nr = None
        self.Moduleinheit = []
        self.Anrechnung = []

    def get_edv_nr(self, ):
        pass

    def set_edv_grading(self, str):
        pass

    def set_edv_nr(self, str):
        pass

    def from_dict(self, dict):
        pass

    def __str__(self, ):
        pass

