from abc import ABC, abstractmethod
from datetime import datetime

class BusinessObjects():


 """Basisklasse, die in allen anderen Klassen übernommen wird."""

    def __init__(self):
        self._id = 0
        self._creation_date = datetime.now().isoformat()
        self._last_updated = self._creation_date

    def set_id(self, value):
        """Setzen der ID"""
        self._id = value
    
    def get_id(self):
        """Auslesen der ID"""
        return self._id

    # def set_date(self, start):
    #     """Setzen der des Erstellungsdatum"""
    #     self._creation_date = start
    
    # def get_date(self):
    #     """Auslesen der des Erstellungsdatum"""
    #     return self._creation_date


    def set_creation_date(self, creation_date):
        """Setzen der des Erstellungsdatum"""
        self._creation_date = creation_date
    
    def get_creation_date(self):
        """Auslesen der des Erstellungsdatum"""
        return self._creation_date

    
    def set_last_updated(self, last_updated):
        """Erstellungsdatum wird aktualisiert"""
        self._last_updated = last_updated
    
    def get_last_updated(self):
        return self._last_updated
        
    
    def __str__(self):
        """Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz"""
        return str(self._id)
    
    
    @staticmethod
    def date_format(date_string):
        if date_string is not None:
            return datetime.fromisoformat(date_string.replace("Z", ""))
        return None

    
   
