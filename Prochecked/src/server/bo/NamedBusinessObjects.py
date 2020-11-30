#!/usr/bin/python
#-*- coding: utf-8 -*-

from BusinessObjects import BusinessObjects
from datetime import datetime

class NamedBusinessObjects(BusinessObjects):
    def __init__(self):
        self.__name = ""

    def get_name(self):
        return self.__name

    def set_name(self, name):
        self.__name = name
    
    def __str__(self):
        return self.__name

