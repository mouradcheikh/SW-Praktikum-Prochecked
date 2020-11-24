#!/usr/bin/python
#-*- coding: utf-8 -*-

from BusinessObjects import BusinessObjects

class Grading(BusinessObjects):
    def __init__(self):
        self.__passed = None
        self.__grade = None
        self.__Beteiligung = None

    def set_grade(self, grade):
        self.__grade = grade

    def get_grade(self, ):
        return self.__grade

    def set_passed(self, passed):
        self.__passed = passed 

    def get_passed(self, ):
        return self.__passed


    def from_dict(self, dict):
        pass

    def __str__(self, ):
        pass

