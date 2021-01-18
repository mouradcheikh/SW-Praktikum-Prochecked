#!/usr/bin/python
#-*- coding: utf-8 -*-

from server.db.Mapper import Mapper
from server.bo.Module import Module

class ModuleMapper(Mapper):
    def __init__(self):
        super().__init__()

    def find_all(self):
        """Auslesen aller Module.

                :return Eine Sammlung mit Module-Objekten, die sämtliche Module 
                        repräsentieren.
                """
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * from prochecked.module"
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, creation_date,name,edv_nr) in tuples:
            modul = Module()
            modul.set_id(id)
            modul.set_creation_date(creation_date)
            modul.set_name(name)
            modul.set_edv_nr(edv_nr)
            result.append(modul)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_id(self, ):

        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, creation_date, name, edv_nr FROM module WHERE id={}".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, creation_date, name, edv_nr) = tuples[0]
            module = Module()
            module.set_id(id),
            module.set_creation_date(creation_date),
            module.set_name(name),
            module.set_edv_nr(edv_nr),
            result = module

        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def delete(self, module):
        """Löschen der Daten eines Moudle-Objekts aus der Datenbank.

        :param module das aus der DB zu löschende "Objekt"
        """
        cursor = self._cnx.cursor()

        command = "DELETE FROM module WHERE id={}".format(module.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

if (__name__ == "__main__"):
    with ModuleMapper() as mapper:
        result = mapper.find_all()
        for p in result:
            print(p)