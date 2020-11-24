#!/usr/bin/python
#-*- coding: utf-8 -*-

from BusinessObjects import BusinessObjects

class Grading(BusinessObjects):
    def __init__(self):
        self.passed = None
        self.grade = None
        self.Beteiligung = None

    def set_grade(self, float):
        pass

    def get_grade(self, ):
        pass

    def set_passed(self, bool):
        pass

    def get_passed(self, ):
        pass

    def from_dict(self, dict):
        pass

    def __str__(self, ):
        pass

