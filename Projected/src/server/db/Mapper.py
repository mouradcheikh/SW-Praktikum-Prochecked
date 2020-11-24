#!/usr/bin/python
#-*- coding: utf-8 -*-
import mysql.connector as connector
from Mapper import Mapper
from os import os
from abc import ABC, abstractmethod



class Mapper(Mapper, ABC):
    def __init__(self):
        self.connection = None

    def __enter__(self, ):
        
        if os.getenv('GAE_ENV', '').startswith('standard'):
            """Landen wir in diesem Zweig, so haben wir festgestellt, dass der Code in der Cloud abläuft.
            Die App befindet sich somit im **Production Mode** und zwar im *Standard Environment*.
            Hierbei handelt es sich also um die Verbindung zwischen Google App Engine und Cloud SQL."""

            self._cnx = connector.connect(user='demo', password='demo',
                                          unix_socket='',
                                          database='')
        else:
            """Wenn wir hier ankommen, dann handelt sich offenbar um die Ausführung des Codes in einer lokalen Umgebung,
            also auf einem Local Development Server. Hierbei stellen wir eine einfache Verbindung zu einer lokal
            installierten mySQL-Datenbank her."""

            self._cnx = connector.connect(user='demo', password='demo',
                                  host='127.0.0.1',
                                  database='bankproject')
                                  

        return self
        

    def __exit__(self, ):
        pass

    def find_all(self, ):
        pass

    def find_by_id(self, ):
        pass

    def find_by_name(self, ):
        pass

    def insert(self, ):
        pass

    def update(self, ):
        pass

    def delete(self, ):
        pass

