from abc import ABC, abstractmethod

class BusinessObjects():
    def __init__(self):
        self._creation_date = 0.0
        self.__id = 0

    def set_id(self, value):
        self.__id = value
    
    def get_id(self):
        return self.__id

    def set_date(self, start):
        self._creation_date = start
    
    def get_date(self):
        return self._creation_date
    
   
