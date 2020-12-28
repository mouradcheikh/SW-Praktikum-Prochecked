from server.bo.Person import Person
from server.bo.Role import Role
from server.bo.Project import Project
from server.bo.Grading import Grading
from server.bo.Module import Module
from server.bo.Participation import Participation
from server.bo.ProjectType import ProjectType
from server.bo.Semester import Semester
from server.bo.ProjectState import ProjectState
from server.bo.Automat import Automat

from server.db.StudentMapper import StudentMapper
from server.db.PersonMapper import PersonMapper
from server.db.ProjectMapper import ProjectMapper
from server.db.ParticipationMapper import ParticipationMapper
from server.db.SemesterMapper import SemesterMapper
from .db.RoleMapper import RoleMapper
from .db.GradingMapper import GradingMapper
from .db.ModuleMapper import ModuleMapper
from .db.ProjectTypeMapper import ProjectTypeMapper
from .db.ProjectStateMapper import ProjectStateMapper
from .db.AutomatMapper import AutomatMapper



class ProjectAdministration (object):
    def __init__(self):
        pass 


        

#Person related
    def create_person(self, name, google_id, email):
        #berechtigung?
        person = Person()
        person.set_name(name)
        person.set_google_id(google_id)
        person.set_email(email)
        #person.set_berechtigung(berechtigung)
        person.set_id(1)
        

        adm = ProjectAdministration()
        person_exists = adm.get_person_by_google_id(google_id)

        if person_exists is not None:
            adm.save_person(person)
        else:
            with PersonMapper() as mapper:
                return mapper.insert(person)


    def get_person_by_name(self, name):
        """Alle Personen mit Namen 'name' auslesen."""
        with PersonMapper() as mapper:
            return mapper.find_by_name(name)

    def get_person_by_id(self, id):
        """Die Person mit der gegebenen ID auslesen."""
        with PersonMapper() as mapper:
            return mapper.find_by_id(id)


    def get_person_by_email(self, email):
        """Alle Personen mit gegebener E-Mail-Adresse auslesen."""
        with PersonMapper() as mapper:
            return mapper.find_by_email(email)

    def get_person_by_google_id(self, google_id):
        """Die Person mit der gegebenen Google ID auslesen."""
        with PersonMapper() as mapper:
            return mapper.find_by_google_id(google_id)

    def get_persons_by_role(self, role_id):
        with PersonMapper() as mapper:
            return mapper.find_by_role(role_id)

    def get_all_persons(self, ):
        """Alle Personen auslesen."""
        with PersonMapper() as mapper:
            return mapper.find_all()

    def save_person(self, person):
        """Die gegebene Person speichern."""
        """Methode mir Rollentabelle"""
        # adm = ProjectAdministration()
        # saved_person = adm.get_person_by_google_id(person.get_google_id)
        # saved_role = saved_person.get_berechtigung()
        # if saved_role is None:
        #     role = person.get_berechtigung()
        #     updated_role = adm.create_role(role)
        #     person.set_berechtigung(updated_role)   
        
        with PersonMapper() as mapper:
            mapper.update(person)
        
    
    def delete_person(self, person):
        """Die gegebene Person aus unserem System löschen."""
        with PersonMapper() as mapper:
            mapper.delete(person)

        
    def get_dozent_by_id(self, id): #Person_by_id???
        """Die Person mit der gegebenen ID auslesen."""
        with PersonMapper() as mapper:
            return mapper.find_by_id(id) 


        
    
    
#Student-spezifische Methoden

    '''#DOZENTENVIEW
    # def create_student(self, name, vorname, google_id, email, matr_nr, studiengang, datetime, last_updated):
        # student = Student()
        # student.set_name(name)
        # student.set_vorname(vorname)
        # student.set_google_id(google_id)
        # student.set_email(email)
        # student.set_matr_nr(matr_nr)
        # student.set_studiengang(studiengang)
        # student.set_id(1)
        # student.set_creation_date(datetime) #-- Erstellungsdatum hinzufügen. Villeicht mit Modul datetime       
        # student.set_last_updated(last_updated)
        # with StudentMapper() as mapper:  Fehler weil StundetMapper noch nicht geschrieben
        #     return mapper.insert(student)'''

        
    def get_student_by_matr_nr(self, matr_nr): 
        """Die Person mit der gegebenen ID auslesen."""
        with StudentMapper() as mapper:
            stud = mapper.find_by_matr_nr(matr_nr) 

        with PersonMapper() as mapper:
            pers = mapper.find_by_id(stud.get_person())

        stud.set_name(pers.get_name())
        stud.set_google_id(pers.get_google_id())
        stud.set_email(pers.get_email())
        stud.set_berechtigung(pers.get_berechtigung())
        return stud
    

    def get_student_by_id(self, id):
        with StudentMapper() as mapper:
            stud = mapper.find_by_id(id)
            print("Student", stud) 

        with PersonMapper() as mapper:
            
            pers = mapper.find_by_id(stud.get_person())
            print("Person:", pers)

        stud.set_name(pers.get_name())
        stud.set_google_id(pers.get_google_id())
        stud.set_email(pers.get_email())
        stud.set_berechtigung(pers.get_berechtigung())
        return stud
    

    '''# def get_student_by_name(self, name):
    #     with StudentMapper() as mapper:
    #         return mapper.find_by_name(name)

    # def get_students_by_project(self, project):
    #     with StudentMapper() as mapper:
    #         return mapper.find_by_student_id(project.get_id())

    # def save_student(self, student):
    #     with StudentMapper() as mapper:
    #         mapper.update(student)

    # def delete_student(self, student):
    #     with StudentMapper() as mapper:
    #         project = self.get_projects_of_student(student)

    #         if not(project is None):
    #             for a in project:
    #                 self.delete_project(a)

    #         mapper.delete(student)

'''
    
#Projekt related

    
    def get_projects_by_dozent(self, person_id): #dozent eig. !!
        """Alle Projects des gegebenen Dozenten auslesen."""
        # with ProjectMapper() as mapper:
        #     return mapper.find_by_dozent_id(person_id) 

        with ProjectMapper() as mapper:
            pro = mapper.find_by_dozent_id(person_id)

            p_list = []

            for p in pro:
                if p.get_project_state() == 2:
                    p_list.append(p)
            return p_list

    def get_projects_by_State_New(self, project_state_id):
        """Alle Projects mit dem Status Neu auslesen."""

        with ProjectMapper() as mapper:
            pro = mapper.find_project_by_project_state_id(project_state_id)

            p_list = []

            for p in pro:
                if p.get_project_state() == 2:
                    p_list.append(p)
            return p_list
                


    def get_project_by_id(self, id):
        """Das Project mit der gegebenen ID auslesen."""
        with ProjectMapper() as mapper:
            return mapper.find_by_id(id) 

  

    def get_all_projects(self, ):
        pass

    def get_projects_by_person(self, person):
        pass

    def get_projects_by_student(self, student):
        pass

    def delete_project(self, project):
        pass

    def create_project(self, project):
        with ProjectMapper() as mapper:
            return mapper.insert(project)

    def save_project(self, project):
        pass


#Grading Related

    def create_grading(self, grade, passed, participation_id):
        print(grade)
        grading = Grading()
        grading.set_grade(grade)
        grading.set_passed(passed)
        grading.set_participation(participation_id)
        grading.set_id(1)

        adm = ProjectAdministration()
        grading_exists = adm.get_grading_by_participation_id(participation_id)
        if grading_exists is not None:
            adm.save_grading(grading)
        else:
            with GradingMapper() as mapper:
                mapper.insert(grading)
        
        par = adm.get_participation_by_id(participation_id)
        updated_grading = adm.get_grading_by_participation_id(participation_id)   

        par.set_grading(updated_grading.get_id())

        if par is not None:
            adm.save_participation(par)
        else: 
            pass
        return updated_grading
        

    def get_grading_by_participation_id(self, participation_id):
        """Die Grading mit der gegebenen participation ID auslesen."""
        with GradingMapper() as mapper:
            return mapper.find_by_participation_id(participation_id) 

    def get_grading_by_id(self, id):
        with GradingMapper() as mapper:
            gra = mapper.find_by_id(id)
            return gra

    def delete_grading(self, grading):
        pass

    def save_grading(self, grading):
        with GradingMapper() as mapper:
            mapper.update(grading)



#Participation Related

    def get_participations_by_project(self, project_id):
        """Alle Teilnahmen des gegebenen Projekts auslesen."""
        with ParticipationMapper() as mapper:
            return mapper.find_by_project_id(project_id) 


    def save_participation(self, participation):
        with ParticipationMapper() as mapper:
            mapper.update(participation)


    def add_student_to_participation(self, ):
        pass

    def add_grading_to_participation(self, ):
        pass

    def create_participation_for_project(self, project):
        """Für einen gegebenen Projekt ein neues Teilnahme anlegen."""
        with ParticipationMapper() as mapper:
            if project is not None:
                participation = Participation()
                participation.set_id(1)
                participation.set_project(project.get_id())               

                return mapper.insert(participation)
            else:
                return None
    
    def get_participation_by_id(self, id):
        """Das Participation mit der gegebenen ID auslesen."""
        with ParticipationMapper() as mapper:
            return mapper.find_by_id(id)

    def delete_participation(self, participation):
        """Eine Participation löschen"""
        with ParticipationMapper() as mapper:
            mapper.delete_participation(participation)



#Semester related

    def get_all_semesters(self):
        with SemesterMapper() as mapper:
            return mapper.find_all()

    def get_semester_by_name(self, ):
        pass

    def add_project_to_semester(self, ):
        pass

    def add_semeter_to_project(self, ):
        pass

   
    
#Role Related

    def create_role(self, role):
        pass

    def save_role(self, ):
        pass

    def delete_role(self, ):
        pass










if __name__ == '__main__':

    '''dictionary = {"email": "kai.kuster@gmx.de", "google_id": "i6YrxATieAexaC86OWQuf57VjpN2", "berechtigung": "student", "name": "Kai", "id": 3, "creation_date": None, "last_updated": None}
    p = Person.from_dict(dictionary)
    adm = ProjectAdministration()
    adm.save_person(p)'''



    # adm = ProjectAdministration()

    # p = adm.create_grading(2, 1)
    # print(p)


    '''par = adm.get_participation_by_id(3)
    print(par)
    adm.delete_participation(par)'''
