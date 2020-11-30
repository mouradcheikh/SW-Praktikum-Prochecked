from abc import ABC, abstractmethod
from datetime import datetime

class BusinessObjects():
    def __init__(self):
        self._id = 0
        self._creation_date = datetime.now().isoformat()
        self._last_updated = self._creation_date

    def set_id(self, value):
        self._id = value
    
    def get_id(self):
        return self._id


    def set_date(self, start):
        self._creation_date = start
    
    def get_date(self):
        return self._creation_date


    def set_creation_date(self, creation_date):
        #Setzen des Erstellungsdatums
        self._creation_date = creation_date
    
    def get_creation_date(self):
        return self._creation_date

    
    def set_last_updated(self, last_updated):
        #Setzen des Erstellungsdatums
        self._last_updated = last_updated
    
    def get_last_updated(self):
        return self._last_updated
        
    
    def __str__(self):
        return str(self._id)
    
    
    @staticmethod
    def date_format(date_string):
        if date_string is not None:
            return datetime.fromisoformat(date_string.replace("Z", ""))
        return None

    
   
