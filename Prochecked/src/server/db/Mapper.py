import mysql.connector as connector
import os
from contextlib import AbstractContextManager
from abc import ABC, abstractmethod

class Mapper():
    def __init__(self):
        self._cnx = None

    def __enter__(self, ):
        
        if os.getenv('GAE_ENV', '').startswith('standard'):
            """Landen wir in diesem Zweig, so haben wir festgestellt, dass der Code in der Cloud abläuft.
            Die App befindet sich somit im **Production Mode** und zwar im *Standard Environment*.
            Hierbei handelt es sich also um die Verbindung zwischen Google App Engine und Cloud SQL."""

            self._cnx = connector.connect(user='demo', password='demo',
                                          unix_socket='/cloudsql/prochecked:europe-west3:prochecked-db',
                                          database='prochecked')
        else:
            """Wenn wir hier ankommen, dann handelt sich offenbar um die Ausführung des Codes in einer lokalen Umgebung,
            also auf einem Local Development Server. Hierbei stellen wir eine einfache Verbindung zu einer lokal
            installierten mySQL-Datenbank her."""

            self._cnx = connector.connect(user='demo', password='demo',
                                host='127.0.0.1',
                                database='prochecked')
                                  
        return self
        
    def __exit__(self, exc_type, exc_val, exc_tb):
        """Was soll geschehen, wenn wir (evtl. vorübergehend) aufhören, mit dem Mapper zu arbeiten?"""
        self._cnx.close()

    @abstractmethod
    """Lies alle Tupel aus und gib sie als Objekte zurück."""
    def find_all(self, ):
            pass

    @abstractmethod
    """Lies den einen Tupel mit der gegebenen ID (vgl. Primärschlüssel) aus."""
    def find_by_id(self,id ):
            pass

    @abstractmethod
    """Füge das folgende Objekt als Datensatz in die DB ein."""
    def find_by_name(self, ):
            pass

    @abstractmethod
    """Ein Objekt auf einen bereits in der DB enthaltenen Datensatz abbilden."""
    def insert(self,object ):
            pass

    @abstractmethod
    def update(self,object ):
            pass

    @abstractmethod
    """Den Datensatz, der das gegebene Objekt in der DB repräsentiert löschen."""
    def delete(self,object ):
            pass


