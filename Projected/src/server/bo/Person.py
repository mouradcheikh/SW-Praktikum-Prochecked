#!/usr/bin/python
#-*- coding: utf-8 -*-

from NamedBusinessObjects import NamedBusinessObjects

class Person(NamedBusinessObjects):
    def __init__(self):
        self.__first_name = None

    # def from_dict(in dict)(self, ):
    #     pass

    def set_first_name(self, name):
        self.__first_name = name

    def get_first_name(self, ):
        return self.__first_name

    def __str__(self, ):
        pass

