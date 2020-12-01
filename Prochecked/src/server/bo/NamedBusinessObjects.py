#!/usr/bin/python
#-*- coding: utf-8 -*-

from server.bo import BusinessObjects as bo
from datetime import datetime

class NamedBusinessObjects(bo.BusinessObjects):
    def __init__(self):
        self.__name = ""

    def get_name(self):
        return self.__name

    def set_name(self, name):
        self.__name = name
    
    def __str__(self):
        return self.__name

