#!/usr/bin/python
#-*- coding: utf-8 -*-
from server.db.Mapper import Mapper
from server.bo.Project import Project

class ProjectMapper(Mapper):
    def __init__(self):
        super().__init__()


    def find_all(self, ):
        """Auslesen aller Projekte.

                :return Eine Sammlung mit Projekt-Objekten, die sämtliche Projekte
                        repräsentieren.
                """
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * from prochecked.project"
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, name, creation_date, capacity, ext_partner_list, short_description, weekly_flag, number_bd_b_lecturetime, number_bd_examtime,number_bd_lecturetime, preffered_bd, special_room, person_id, project_state_id, project_type_id, semester_id, person2_id, module_id) in tuples:
            project = Project()
            project.set_id(id),
            project.set_name(name),
            project.set_creation_date(creation_date),
            project.set_capacity(capacity),
            project.set_ext_partner_list(ext_partner_list),
            project.set_short_description(short_description),
            project.set_weekly_flag(weekly_flag),
            project.set_number_bd_b_lecturetime(number_bd_b_lecturetime),
            project.set_number_bd_examtime(number_bd_examtime),
            project.set_number_bd_lecturetime(number_bd_lecturetime),
            project.set_preffered_bd(preffered_bd),
            project.set_special_room(special_room),
            project.set_dozent(person_id),
            project.set_project_state(project_state_id),
            project.set_project_type(project_type_id),
            project.set_semester(semester_id),
            project.set_dozent(person2_id)
            project.set_module(module_id)
            result.append(project)

        self._cnx.commit()
        cursor.close()
        return result

    def find_by_id(self, id):
        """Auslesen aller Teilnahmen eines durch Fremdschlüssel gegebenen Projekts.
        :param project_id Schlüssel des zugehörigen Projekts.
        :return Eine Sammlung mit Project-Objekten, die sämtliche Teilnahmen der
                betreffenden Projects repräsentieren. --> STIMMT NICHT
        """

        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, name, creation_date, capacity, ext_partner_list, short_description, weekly_flag, number_bd_b_lecturetime, number_bd_examtime,number_bd_lecturetime, preffered_bd, special_room, person_id, project_state_id, project_type_id, semester_id, person2_id, module_id FROM project WHERE id={}".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, name, creation_date, capacity, ext_partner_list, short_description, weekly_flag, number_bd_b_lecturetime, number_bd_examtime,number_bd_lecturetime, preffered_bd, special_room, person_id, project_state_id, project_type_id, semester_id, person2_id, module_id) = tuples[0]
            project = Project()
            project.set_id(id),
            project.set_name(name),
            project.set_creation_date(creation_date),
            project.set_capacity(capacity),
            project.set_ext_partner_list(ext_partner_list),
            project.set_short_description(short_description),
            project.set_weekly_flag(weekly_flag),
            project.set_number_bd_b_lecturetime(number_bd_b_lecturetime),
            project.set_number_bd_examtime(number_bd_examtime),
            project.set_number_bd_lecturetime(number_bd_lecturetime),
            project.set_preffered_bd(preffered_bd),
            project.set_special_room(special_room),
            project.set_dozent(person_id),
            project.set_project_state(project_state_id),
            project.set_project_type(project_type_id),
            project.set_semester(semester_id),
            project.set_dozent(person2_id),
            project.set_module(module_id),
            result = project

        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None


        self._cnx.commit()
        cursor.close()

        return result

         

    def insert(self, project):
        """Einfügen eines Project-Objekts in die Datenbank.

        Dabei wird auch der Primärschlüssel des übergebenen Objekts geprüft und ggf.
        berichtigt.

        :param project das zu speichernde Objekt
        :return das bereits übergebene Objekt, jedoch mit ggf. korrigierter ID.
        """
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM project ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:

            if maxid[0] is not None:
                    """Wenn wir eine maximale ID festellen konnten, zählen wir diese
                    um 1 hoch und weisen diesen Wert als ID dem Project-Objekt zu."""
                    project.set_id(maxid[0] + 1)
            else:
                    """Wenn wir KEINE maximale ID feststellen konnten, dann gehen wir
                    davon aus, dass die Tabelle leer ist und wir mit der ID 1 beginnen können."""
                    project.set_id(1)


        command = "INSERT INTO project (id, name, creation_date, capacity, ext_partner_list, short_description, weekly_flag, number_bd_b_lecturetime, number_bd_examtime,number_bd_lecturetime, preffered_bd, special_room, person_id, project_state_id, project_type_id, semester_id, person2_id, module_id) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
        data = (
                project.get_id(),
                project.get_name(),
                project.get_creation_date(),
                project.get_capacity(),
                project.get_ext_partner_list(),
                project.get_short_description(),
                project.get_weekly_flag(),
                project.get_number_bd_b_lecturetime(),
                project.get_number_bd_examtime(),
                project.get_number_bd_lecturetime(),
                project.get_preffered_bd(),
                project.get_special_room(),
                project.get_dozent(),
                project.get_project_state(),
                project.get_project_type(),
                project.get_semester(),
                project.get_dozent2(),
                project.get_module()
                )
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return project

    def update(self, project):
        """Wiederholtes Schreiben eines Objekts in die Datenbank.

        :param user das Objekt, das in die DB geschrieben werden soll
        """
        cursor = self._cnx.cursor()

        command = "UPDATE project SET name=%s, capacity=%s, ext_partner_list=%s, short_description=%s, weekly_flag=%s, number_bd_b_lecturetime=%s, number_bd_examtime=%s, number_bd_lecturetime=%s, preffered_bd=%s, special_room=%s, person_id=%s, project_state_id=%s, project_type_id=%s, semester_id=%s, person2_id=%s,  module_id=%s WHERE id=%s"

        
        data = (
            project.get_name(),
            project.get_capacity(),
            project.get_ext_partner_list(),
            project.get_short_description(),
            project.get_weekly_flag(),
            project.get_number_bd_b_lecturetime(),
            project.get_number_bd_examtime(),
            project.get_number_bd_lecturetime(),
            project.get_preffered_bd(),
            project.get_special_room(),
            project.get_dozent(),
            
            project.get_project_state(),
            project.get_project_type(),
            project.get_semester(),
            project.get_dozent2(),
            project.get_module(),
            project.get_id())
            
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()
           
    def find_by_dozent_id(self, person_id):
        """Auslesen aller Projekte eines durch Fremdschlüssel (DozentID bzw. PersonID?.) gegebenen Kunden.

        :param person_id Schlüssel des zugehörigen Dozenten.
        :return Eine Sammlung mit Projekte-Objekten, die sämtliche Projekte des
                betreffenden Dozenten repräsentieren.
        """
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT id, name, person_id, project_state_id, person2_id, module_id from project WHERE person_id={}".format(person_id) #zweiter befehl für filtern der Projekte deren projektstateID 2(genehmigt) entspricht
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, name, person_id, project_state, person2_id, module_id) in tuples:
            p = Project()
            p.set_id(id)
            p.set_name(name)
            p.set_dozent(person_id)
            p.set_project_state(project_state)
            p.set_dozent2(person2_id)
            p.set_module(module_id)
            result.append(p)

        cursor = self._cnx.cursor()
        command = "SELECT id, name, person_id, project_state_id, person2_id from project WHERE person2_id={}".format(
            person_id)  # zweiter befehl für filtern der Projekte deren projektstateID 2(genehmigt) entspricht
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, name, person_id, project_state, person2_id) in tuples:
            p = Project()
            p.set_id(id)
            p.set_name(name)
            p.set_dozent(person_id)
            p.set_project_state(project_state)
            p.set_dozent2(person2_id)
            result.append(p)
        #hier fehlen warscheinlich noch die anderen attribute
        self._cnx.commit()
        cursor.close()

        return result

    def find_project_by_project_state_id(self, project_state_id):
        """Auslesen aller Projekte eines durch Fremdschlüssel (ProjectStateID) gegebenen Projekte.
        """
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT id, name, creation_date, capacity, ext_partner_list, short_description, weekly_flag, number_bd_b_lecturetime, number_bd_examtime,number_bd_lecturetime, preffered_bd, special_room, person_id, project_state_id, project_type_id, semester_id, person2_id, module_id from project WHERE project_state_id={}".format(project_state_id) 
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, name, creation_date, capacity, ext_partner_list, short_description, weekly_flag, number_bd_b_lecturetime, number_bd_examtime,number_bd_lecturetime, preffered_bd, special_room, person_id, project_state_id, project_type_id, semester_id, person2_id, module_id) in tuples:
            project = Project()
            project.set_id(id),
            project.set_name(name),
            project.set_creation_date(creation_date),
            project.set_capacity(capacity),
            project.set_ext_partner_list(ext_partner_list),
            project.set_short_description(short_description),
            project.set_weekly_flag(weekly_flag),
            project.set_number_bd_b_lecturetime(number_bd_b_lecturetime),
            project.set_number_bd_examtime(number_bd_examtime),
            project.set_number_bd_lecturetime(number_bd_lecturetime),
            project.set_preffered_bd(preffered_bd),
            project.set_special_room(special_room),
            project.set_dozent(person_id),
            project.set_project_state(project_state_id),
            project.set_project_type(project_type_id),
            project.set_semester(semester_id),
            project.set_dozent2(person2_id),
            project.set_module(module_id)

            result.append(project)

               
        self._cnx.commit()
        cursor.close()

        return result

    def delete(self, project):
        """Löschen der Daten eines User-Objekts aus der Datenbank.

        :param user das aus der DB zu löschende "Objekt"
        """
        cursor = self._cnx.cursor()

        command = "DELETE FROM project WHERE id={}".format(project.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()


if __name__ == "__main__":


    with ProjectMapper() as mapper:
        result = mapper.find_project_by_project_state_id(1)
        for p in result:
            print(p.get_project_state())
