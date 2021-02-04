from server.db.Mapper import Mapper
from server.bo.Module import Module

class ModuleMapper(Mapper):
    """Mapper-Klasse, die Module-Objekte auf eine relationale
    Datenbank abbildet. Hierzu wird eine Reihe von Methoden zur Verfügung
    gestellt, mit deren Hilfe z.B. Objekte gesucht, erzeugt, modifiziert und
    gelöscht werden können. Das Mapping ist bidirektional. D.h., Objekte können
    in DB-Strukturen und DB-Strukturen in Objekte umgewandelt werden.
    """
    
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

    def insert(self, module):
        """Einfügen eines Modul-Objekts in die Datenbank.

        Dabei wird auch der Primärschlüssel des übergebenen Objekts geprüft und ggf.
        berichtigt.

        :param module das zu speichernde Objekt
        :return das bereits übergebene Objekt, jedoch mit ggf. korrigierter ID.
        """
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM module ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            if maxid[0] is not None:
                """Wenn wir eine maximale ID festellen konnten, zählen wir diese
                um 1 hoch und weisen diesen Wert als ID dem Module-Objekt zu."""
                module.set_id(maxid[0] + 1)
            else:
                """Wenn wir KEINE maximale ID feststellen konnten, dann gehen wir
                davon aus, dass die Tabelle leer ist und wir mit der ID 1 beginnen können."""
                module.set_id(1)

        command = "INSERT INTO module (id, creation_date, name, edv_nr) VALUES (%s,%s,%s,%s)"
        data = (module.get_id(), 
                module.get_creation_date(), 
                module.get_name(),
                module.get_edv_nr(),
               )

        cursor.execute(command, data)
        self._cnx.commit()
        cursor.close()
        return module
    
    def find_by_id(self, id ):
        """Suchen eines Moduls mit vorgegebener ID. Da diese eindeutig ist,
        wird genau ein Objekt zurückgegeben.

        :param key Primärschlüsselattribut (->DB)
        :return Modul-Objekt, das dem übergebenen Schlüssel entspricht, None bei
            nicht vorhandenem DB-Tupel.
        """

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

    def update(self, module):
        """Wiederholtes Schreiben eines Objekts in die Datenbank.

        :param semester das Objekt, das in die DB geschrieben werden soll
        """
        cursor = self._cnx.cursor()

        command = "UPDATE module " + "SET creation_date=%s, name=%s, edv_nr=%s WHERE id=%s"

        data = (module.get_creation_date(), 
                module.get_name(),
                module.get_edv_nr(),
                module.get_id(), 
               )

        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

if (__name__ == "__main__"):


    m = Module()
    m.set_id(1)

    with ModuleMapper() as mapper:
        # result = mapper.find_all()
        # for p in result:
        #     print(p)
        mapper.delete(m)