#!/usr/bin/python
#-*- coding: utf-8 -*-

from server.db.Mapper import Mapper
from server.bo.Project import Project

class ProjectMapper(Mapper):
    def __init__(self):
        super().__init__()


    def find_all(self, ):
        pass

    '''def find_by_id(self, id):
        """Auslesen aller Konten eines durch Fremdschlüssel gegebenen Projekts.
        :param project_id Schlüssel des zugehörigen Projekts.
        :return Eine Sammlung mit Project-Objekten, die sämtliche Konten der
                betreffenden Projects repräsentieren.
        """
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT id, name, creation_date, capacity, external_partners, short_description, weekly_flag, number_bd_b_lecturetime, number_bd_examtime, preferred_bd, special_room, person_id, project_state_id, project_type_id, semester_id, module, person2_id FROM project WHERE id={} ORDER BY id
            project = Project()
            project.set_id(id)
            project.set_name(name)
            project.set_creation_date(creation_date)
            project.set_capacity(capacity)
            project.set_external_partners(external_partners)
            project.set_short_descripton(short_description)
            project.set_weekly_flag(weekly_flag)
            project.set_number_bd_b_lecturetime(number_bd_b_lecturetime)
            project.set_number_bd_examtime(number_bd_examtime)
            project.set_preferred_bd(preferred_bd)
            project.set_special_room(special_room)
            project.set_person_ID(person_ID)
            project.set_projectStateID(projectStateID)
            project.set_projectTypeID(projectTypeID)
            project.set_semesterID(semesterID)
            result.append(project)

        self._cnx.commit()
        cursor.close()

        return result'''

    
    def find_by_dozent_id(self, person_ID):
        """Auslesen aller Projekte eines durch Fremdschlüssel (DozentID bzw. PersonID?.) gegebenen Kunden.

        :param person_id Schlüssel des zugehörigen Dozenten.
        :return Eine Sammlung mit Projekte-Objekten, die sämtliche Projekte des
                betreffenden Dozenten repräsentieren.
        """
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT id, person_ID FROM project WHERE person_ID={} ORDER BY id".format(person_ID)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, person_ID) in tuples:
            p = Project()
            p.set_id(id)
            p.set_dozent_id(person_ID)
            result.append(p)
        #hier fehlen warscheinlich noch die anderen attribute
        self._cnx.commit()
        cursor.close()

        return result


if __name__ == "__main__":

      with ProjectMapper() as mapper:
        result = mapper.find_by_dozent_id(2)
        for p in result:
            print(p.get_id(), p.get_dozent())

