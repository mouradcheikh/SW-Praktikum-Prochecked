#!/usr/bin/python
#-*- coding: utf-8 -*-

from NamedBusinessObjects import NamedBusinessObjects


class ProjectType(NamedBusinessObjects):
    def __init__(self):
        self.__number_SWS = None
        self.__number_ECTS = None
        self.__Erstellungszeitpunkt = None
        self.__Charakterannehmer = []


    def set_number_SWS(self, number_SWS):
        self.__number_SWS = number_SWS

    def get_number_SWS(self):
        return self.__number_SWS 

    def set_number_ECTS(self, number_ECTS):
        self.__number_ECTS = number_ECTS 

    def get_number_ECTS(self):
        return self.__number_ECTS

    def from_dict(self, dict):

    # def __str__(self, ):
    #     pass