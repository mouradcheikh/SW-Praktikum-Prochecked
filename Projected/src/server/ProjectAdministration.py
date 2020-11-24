from .bo.Student import Student
from .bo.Person import Person
from .bo.Role import Role
from .bo.Project import Project
from .bo.Grading import Grading
from .bo.Module import Module
from .bo.Participation import Participation
from .bo.ProjectType import ProjectType
from .bo.Semester import Semester
from .bo.ProjectState import ProjectState
from .bo.Automat import Automat

from .db.StudentMapper import StudentMapper
from .db.PersonMapper import PersonMapper
from .db.RoleMapper import RoleMapper
from .db.ProjectMapper import ProjectMapper
from .db.GradingMapper import GradingMapper
from .db.ModuleMapper import ModuleMapper
from .db.ParticipationMapper import ParticipationMapper
from .db.ProjectTypeMapper import ProjectTypeMapper
from .db.SemesterMapper import SemesterMapper
from .db.ProjectStateMapper import ProjectStateMapper
from .db.AutomatMapper import AutomatMapper






class ProjectAdministration:
    def __init__(self):
        pass

    def create_student(self, name, email, google_id, matrnr):
        pass

    def get_student_by_matrnr(self, matrnr):
        pass

    def get_student_by_id(self, ):
        pass

    def get_student_by_name(self, ):
        pass

    def get_students_by_project(self, project):
        pass

    def save_student(self, ):
        pass

    def delete_student(self, ):
        pass

    def create_person(self, name, email, google_id):
        pass

    def get_person_by_name(self, name):
        pass

    def get_person_by_id(self, id):
        pass

    def get_person_by_email(self, email):
        pass

    def get_person_by_person_id(self, person_id):
        pass

    def get_all_persons(self, ):
        pass

    def save_person(self, person):
        pass

    def add_role_to_person(self, ):
        pass

    def remove_role_from_person(self, ):
        pass

    def delete_person(self, person):
        pass

    def get_all_projects(self, ):
        pass

    def get_project_by_id(self, id):
        pass

    def get_projects_by_person(self, person):
        pass

    def get_projects_by_student(self, student):
        pass

    def delete_project(self, project):
        pass

    def create_project(self, Person, module, capacity, room, ):
        pass

    def save_project(self, project):
        pass

    def create_grading(self, passed, grade):
        pass

    def delete_grading(self, grading):
        pass

    def save_grading(self, ):
        pass

    def rate_project(self, grading):
        pass

    def get_grading_by_project_and_student(self, project, student):
        pass

    def get_grading_by_project(self, project):
        pass

    def get_grading_by_student(self, student):
        pass

    def get_accumulated_grading_by_project(self, project):
        pass

    def get_accumulated_grading_by_student(self, student):
        pass

    def create_module(self, name, edvnr):
        pass

    def delete_module(self, module):
        pass

    def save_module(self, module):
        pass

    def get_module_by_id(self, id):
        pass

    def get_module_by_edvnr(self, edvnr):
        pass

    def create_participation(self, project, student):
        pass

    def get_participation_by_student(self, student):
        pass

    def get_participation_by_id(self, ):
        pass

    def get_all_participations(self, ):
        pass

    def get_participation_by_project(self, project):
        pass

    def save_participation(self, participation):
        pass

    def add_student_to_participation(self, ):
        pass

    def add_grading_to_participation(self, ):
        pass

    def add_project_to_participation(self, ):
        pass

    def remove_student_from_participation(self, ):
        pass

    def remove_project_from_participation(self, ):
        pass

    def remove_grading_from_participation(self, ):
        pass

    def delete_participation(self, participation):
        pass

    def get_current_capacity_for_project(self, project):
        pass

    def set_projecttype_to_project(self, project, projecttype):
        pass

    def set_create_projecttype(self, ):
        pass

    def create_semester(self, ):
        pass

    def save_semester(self, ):
        pass

    def delete_semester(self, ):
        pass

    def get_semester_by_id(self, ):
        pass

    def get_all_semesters(self, ):
        pass

    def get_semester_by_name(self, ):
        pass

    def add_project_to_semester(self, ):
        pass

    def add_semeter_to_project(self, ):
        pass

    def remove_project_from_semester(self, ):
        pass

    def create_role(self, ):
        pass

    def save_role(self, ):
        pass

    def delete_role(self, ):
        pass

    def get_role_by_id(self, ):
        pass

    def create_automat(self, ):
        pass

    def save_automat(self, ):
        pass

    def delete_automat(self, ):
        pass

    def get_automat_by_id(self, ):
        pass

    def get_all_automats(self, ):
        pass
