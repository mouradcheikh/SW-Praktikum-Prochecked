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
        cursor.execute("SELECT * from prochecked.module")
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
        pass

