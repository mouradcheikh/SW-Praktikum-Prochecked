#!/usr/bin/python
#-*- coding: utf-8 -*-

from NamedBusinessObjects import NamedBusinessObjects


class ProjectType(NamedBusinessObjects):
    def __init__(self):
        self.number_SWS = None
        self.number_ECTS = None
        self.Erstellungszeitpunkt = None
        self.Charakterannehmer = []

    def get_number_SWS(self, ):
        pass

    def set_number_SWS(self, number_SWS):
        pass

    def get_number_ECTS(self, ):
        pass

    def set_number_ECTS(self, number_ECTS):
        pass

    def from_dict(self, dict):
        pass

    def __str__(self, ):
        pass

