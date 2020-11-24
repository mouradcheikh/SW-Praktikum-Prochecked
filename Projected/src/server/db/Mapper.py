#!/usr/bin/python
#-*- coding: utf-8 -*-

from Mapper import Mapper
from ABC import ABC

class Mapper(Mapper, ABC):
    def __init__(self):
        self.connection = None

    def __enter__(self, ):
        pass

    def __exit__(self, ):
        pass

    def find_all(self, ):
        pass

    def find_by_id(self, ):
        pass

    def find_by_name(self, ):
        pass

    def insert(self, ):
        pass

    def update(self, ):
        pass

    def delete(self, ):
        pass

