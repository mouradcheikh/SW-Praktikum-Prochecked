#!/usr/bin/python
#-*- coding: utf-8 -*-

from BusinessObjects import BusinessObjects

class NamedBusinessObjects(BusinessObjects):
    def __init__(self):
        self.name = None

    def get_name(self):
        return self.name

    def set_name(self, name):
        self.name = name
    
    def __str__(self):
        return self.name

