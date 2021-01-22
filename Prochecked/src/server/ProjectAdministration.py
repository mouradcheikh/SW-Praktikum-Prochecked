from server.bo.Person import Person
from server.bo.Role import Role
from server.bo.Project import Project
from server.bo.Grading import Grading
from server.bo.Module import Module
from server.bo.Participation import Participation
from server.bo.ProjectType import ProjectType
from server.bo.Semester import Semester
from server.bo.Student import Student
from server.bo.ProjectState import ProjectState
from server.bo.Automat import Automat

from server.db.StudentMapper import StudentMapper
from server.db.PersonMapper import PersonMapper
from server.db.ProjectMapper import ProjectMapper
from server.db.ParticipationMapper import ParticipationMapper
from server.db.SemesterMapper import SemesterMapper
from server.db.ProjectTypeMapper import ProjectTypeMapper

from server.db.RoleMapper import RoleMapper
from server.db.GradingMapper import GradingMapper
from server.db.ModuleMapper import ModuleMapper
from server.db.ProjectStateMapper import ProjectStateMapper
from server.db.AutomatMapper import AutomatMapper


class ProjectAdministration (object):
    def __init__(self):
        pass 

#Person related
    def create_person(self, name, google_id, email, berechtigung):
        #berechtigung?
        person = Person()
        person.set_name(name)
        person.set_google_id(google_id)
        person.set_email(email)
        person.set_berechtigung(berechtigung)
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
            return mapper.update(person)

    def save_person_by_id(self, person):
        """Die gegebene Person speichern."""
        """Methode mir Rollentabelle"""
        with PersonMapper() as mapper:
            mapper.update_by_id(person)
        
    
    def delete_person(self, person):
        """Die gegebene Person aus unserem System löschen."""
        adm = ProjectAdministration()
        stu = adm.get_student_by_person_id(person.get_id())
        if stu is not None:
            with StudentMapper() as mapper:
                mapper.delete(stu)

        with PersonMapper() as mapper:
            mapper.delete_by_id(person)

        
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

    def get_student_by_person_id(self, person_id):
        with StudentMapper() as mapper:
            stud = mapper.find_by_person_id(person_id) 

        with PersonMapper() as mapper:
            pers = mapper.find_by_id(person_id)


        if stud is not None: 
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

    def create_student(self,matr_nr,studiengang,person_id):
        
        student = Student()
        student.set_matr_nr(matr_nr)
        student.set_studiengang(studiengang)
        student.set_person(person_id)
        student.set_id(1)
        
        with StudentMapper() as mapper:
            return mapper.insert(student)
    
    def save_student(self, student):
        with StudentMapper() as mapper:
            mapper.update(student)
    

    '''# def get_student_by_name(self, name):
    #     with StudentMapper() as mapper:
    #         return mapper.find_by_name(name)

    # def get_students_by_project(self, project):
    #     with StudentMapper() as mapper:
    #         return mapper.find_by_student_id(project.get_id())

  

    # def delete_student(self, student):
    #     with StudentMapper() as mapper:
    #         project = self.get_projects_of_student(student)

    #         if not(project is None):
    #             for a in project:
    #                 self.delete_project(a)

    #         mapper.delete(student)

'''
    
#Projekt related

    def get_projects_by_dozent_new(self, person_id): #dozent eig. !!
        """Alle Projects des gegebenen Dozenten auslesen."""
        # with ProjectMapper() as mapper:
        #     return mapper.find_by_dozent_id(person_id) 

        with ProjectMapper() as mapper:
            pro = mapper.find_by_dozent_id(person_id)

            p_list = []

            for p in pro:
                if p.get_project_state() ==  1:
                    p_list.append(p)
            return p_list
    
    def get_projects_by_dozent_accepted(self, person_id): #dozent eig. !!
        """Alle Projects des gegebenen Dozenten auslesen."""
        # with ProjectMapper() as mapper:
        #     return mapper.find_by_dozent_id(person_id) 

        with ProjectMapper() as mapper:
            pro = mapper.find_by_dozent_id(person_id)

            p_list = []

            for p in pro:
                if p.get_project_state() == 3:
                    p_list.append(p)
            return p_list

    def get_projects_by_dozent_in_review(self, person_id): #dozent eig. !!
        """Alle Projects des gegebenen Dozenten auslesen."""
        # with ProjectMapper() as mapper:
        #     return mapper.find_by_dozent_id(person_id) 

        with ProjectMapper() as mapper:
            pro = mapper.find_by_dozent_id(person_id)

            p_list = []

            for p in pro:
                if p.get_project_state() == 4:
                    p_list.append(p)
            return p_list
        
    def get_projects_by_dozent_reviewed(self, person_id): #dozent eig. !!
        """Alle Projects des gegebenen Dozenten auslesen."""
        # with ProjectMapper() as mapper:
        #     return mapper.find_by_dozent_id(person_id) 

        with ProjectMapper() as mapper:
            pro = mapper.find_by_dozent_id(person_id)

            p_list = []

            for p in pro:
                if p.get_project_state() == 5:
                    p_list.append(p)
            return p_list


    def get_projects_by_student(self, matr_nr):
        adm = ProjectAdministration()
        student = adm.get_student_by_matr_nr(matr_nr)
        student_id = student.get_id()
        participations = adm.get_participations_by_student_id(student_id)

        project_list = []

        for p in participations:
            project_id = p.get_project()
            project = adm.get_project_by_id(project_id)
            project_list.append(project)
         
        return project_list
            

    def get_projects_by_state_new(self):
        """Alle Projects mit dem Status Neu auslesen."""

        with ProjectMapper() as mapper:
            pro = mapper.find_project_by_project_state_id(1)

            p_list = []

            for p in pro:
                p_list.append(p)
            return p_list
    
    def get_projects_by_state(self, project_state):
        """Alle Projects mit dem Status Neu auslesen."""

        with ProjectMapper() as mapper:
            pro = mapper.find_project_by_project_state_id(project_state)

            p_list = []

            for p in pro:
                p_list.append(p)
            return p_list

    def get_project_by_id(self, id):
        """Das Project mit der gegebenen ID auslesen."""
        with ProjectMapper() as mapper:
            return mapper.find_by_id(id)

  

    def get_all_projects(self):
        with ProjectMapper() as mapper:
            return mapper.find_all()

    def get_projects_by_person(self, person):
        pass

    def delete_project(self, project):
        with ProjectMapper() as mapper:
            mapper.delete(project)

    def create_project(self, project):
        with ProjectMapper() as mapper:
            return mapper.insert(project)

    def save_project(self, project):
        with ProjectMapper() as mapper:
            mapper.update(project)


#Grading Related

    def create_grading(self, grade, passed, participation_id):
        "Erstelen eines Gradings (Bewertung) mit gegebener Note(grade), Teilnahme ID (participation_id) und dem passed flag"
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

    def get_grading_by_project_id_and_matr_nr(self, project_id, matr_nr):
        "Ein Grading Objekt nach gegebener project id und Matrikelnummer auslesen"
        adm = ProjectAdministration()
        student = adm.get_student_by_matr_nr(matr_nr)
        student_id = student.get_id()
        participation = adm.get_participation_by_student_id_and_project_id(student_id, project_id)
        participation_id = participation.get_id()
        grading = adm.get_grading_by_participation_id(participation_id)
        return grading

    def get_grading_by_id(self, id):
        with GradingMapper() as mapper:
            gra = mapper.find_by_id(id)
            return gra

    def delete_grading(self, grading):
         with GradingMapper() as mapper:
            mapper.delete(grading)

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
                
    def create_participation(self, participation):
        with ParticipationMapper() as mapper:
            return mapper.insert(participation)
    
    def get_participation_by_id(self, id):
        """Das Participation mit der gegebenen ID auslesen."""
        with ParticipationMapper() as mapper:
            return mapper.find_by_id(id)

    def get_participations_by_student_id(self, student_id):
        with ParticipationMapper() as mapper:
            return mapper.find_by_student_id(student_id)

    def get_participation_by_student_id_and_project_id(self, student_id, project_id):
        with ParticipationMapper() as mapper:
            return mapper.find_by_student_id_and_project_id(student_id, project_id)

    def delete_participation(self, participation):
        """Eine Participation löschen"""
        adm = ProjectAdministration()
        print("adm:",participation)
        if participation.get_grading() is not None:
            gra = adm.get_grading_by_id(participation.get_grading())
            adm.delete_grading(gra)
            with ParticipationMapper() as mapper:
                mapper.delete_participation(participation.get_id())
        else:
            print(participation.get_id())
            with ParticipationMapper() as mapper:
                mapper.delete_participation(participation.get_id())




#Semester related

    def get_all_semesters(self):
        with SemesterMapper() as mapper:
            return mapper.find_all()

    def create_semester(self, name):
        #berechtigung?
        semester = Semester()
        semester.set_name(name)
   
        with SemesterMapper() as mapper:
            mapper.insert(semester)

    def get_semester_by_id(self, id):
        """Das Semester mit der gegebenen ID auslesen."""
        with SemesterMapper() as mapper:
            return mapper.find_by_id(id)
    
    def delete_semester(self, semester):
        """Ein Semester löschen, wenn es nicht von einem Projekt genutzt wird"""
        adm = ProjectAdministration()
        projects = adm.get_all_projects()
        semester_found = False
        for p in projects:
            if p.get_semester() == semester:
                semester_found = True
        if semester_found == False:
            with SemesterMapper() as mapper:
                mapper.delete(semester)
      

    def save_semester(self, semester):
        """Ein Semester updaten"""
        with SemesterMapper() as mapper:
            mapper.update(semester)

         

    
  
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


#Module Related
    def get_free_modules_by_semester(self, semester_id):
        """Alle Module auslesen, welche in einem bestimmten gegebenen Semester noch nicht mit einem projekt belegt wurden, also noch frei sind"""
        with ModuleMapper() as mapper:
            all_modules = mapper.find_all()

        adm = ProjectAdministration()
        all_projects = adm.get_all_projects()

        semester_id = semester_id

        free_modules = []
        found = False

        for m in all_modules:
            module_id = m.get_id()
            for p in all_projects:
                # print(p.get_name(), p.get_module(), "modul:", module_id)
                if p.get_module() == module_id and p.get_semester() == semester_id:
                    found = True
            if found == False:
                free_modules.append(m)
            found = False

        return free_modules


    def get_all_modules(self):
        with ModuleMapper() as mapper:
            return mapper.find_all()


    def get_bound_modules_by_semester(self, semester_id):
        """Alle Module auslesen, welche in einem bestimmten gegebenen Semester mit einem projekt belegt wurden, also nicht mehr frei sind"""
        with ModuleMapper() as mapper:
            all_modules = mapper.find_all()

        adm = ProjectAdministration()
        all_projects = adm.get_all_projects()

        semester_id = semester_id

        bound_modules = []
        found = False

        for m in all_modules:
            module_id = m.get_id()
            for p in all_projects:
                # print(p.get_name(), p.get_module(), "modul:", module_id)
                if p.get_module() == module_id and p.get_semester() == semester_id:
                    found = True
            if found == True:
                bound_modules.append(m)
            found = False

        return bound_modules
                

#Module related

    def get_all_module(self):
        with ModuleMapper() as mapper:
            return mapper.find_all()

    def create_module(self, module):
        # module = Module()
        # module.set_name(module.get_name())
        # module.set_edv_nr(module.get_name())
   
        with ModuleMapper() as mapper:
            mapper.insert(module)

    def get_module_by_id(self, id):
        """Das Module mit der gegebenen ID auslesen."""
        with ModuleMapper() as mapper:
            return mapper.find_by_id(id)
    
    def delete_module(self, module):
        """Ein Module löschen, wenn es nicht von einem Projekt genutzt wird"""
        adm = ProjectAdministration()
        projects = adm.get_all_projects()
        module_found = False
        for p in projects:
            if p.get_module() == module:
                module_found = True
        if module_found == False:
            with ModuleMapper() as mapper:
                mapper.delete(module)

#ProjectType Related

    def get_all_project_types(self):
        with ProjectTypeMapper() as mapper:
            return mapper.find_all()

    def create_projecttype(self, name, number_ects, number_sws):
        projecttype = ProjectType()
        projecttype.set_name(name)
        projecttype.set_number_ects(number_ects)
        projecttype.set_number_sws(number_sws)
        projecttype.set_id(1)
   
        with ProjectTypeMapper() as mapper:
            mapper.insert(projecttype)


    def get_projecttype_by_id(self, id):
        with ProjectTypeMapper() as mapper:
            return mapper.find_by_id(id)

    def save_projecttype_by_id(self, projecttype):
            """Die gegebene Person speichern."""
            """Methode mir Rollentabelle"""
            with ProjectTypeMapper() as mapper:
                mapper.update_by_id(projecttype)
    
    def delete_projecttype(self, projecttype):
        """Eine Participation löschen"""
        with ProjectTypeMapper() as mapper:
            mapper.delete(projecttype)

    def get_all_projecttype(self):
        with ProjectTypeMapper() as mapper:
            return mapper.find_all()



if __name__ == '__main__':

    '''dictionary = {"email": "kai.kuster@gmx.de", "google_id": "i6YrxATieAexaC86OWQuf57VjpN2", "berechtigung": "student", "name": "Kai", "id": 3, "creation_date": None, "last_updated": None}
    p = Person.from_dict(dictionary)
    adm = ProjectAdministration()
    adm.save_person(p)'''



    adm = ProjectAdministration()
    modules = adm.get_free_modules_by_semester(1)
    print(modules, modules[0], modules[0].get_edv_nr())

    # p = adm.create_grading(2, 1)
    # print(p)


    '''par = adm.get_participation_by_id(3)
    print(par)
    adm.delete_participation(par)'''
