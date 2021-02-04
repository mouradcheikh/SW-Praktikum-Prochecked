#!/usr/bin/python
#-*- coding: utf-8 -*-

from server.bo import BusinessObjects as bo
from datetime import datetime

 """Basisklasse, die in allen den Klassen: Module, Persoon, Projekt, Projekttyp, Semester und Student
    übernommen werden."""

class NamedBusinessObjects(bo.BusinessObjects):
    def __init__(self):
        super().__init__()
        self._name = ""

    def get_name(self):
        """Auslesen des Namen"""
        return self._name

    def set_name(self, name):
        """Setzen des Namen"""
        self._name = name
    
    def __str__(self):
        """Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz"""
        return self._name

