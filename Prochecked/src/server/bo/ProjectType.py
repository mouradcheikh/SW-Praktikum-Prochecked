from NamedBusinessObjects import NamedBusinessObjects


class ProjectType(NamedBusinessObjects):
    def __init__(self, name, sws, ects):
        super().__init__()
        self.__name = name
        self.__number_SWS = sws
        self.__number_ECTS = ects
        self.__Erstellungszeitpunkt = None
        self.__Charakterannehmer = []


    """def set_number_SWS(self, number_SWS):
        self.__number_SWS = number_SWS

    def get_number_SWS(self):
        return self.__number_SWS 

    def set_number_ECTS(self, number_ECTS):
        self.__number_ECTS = number_ECTS 

    def get_number_ECTS(self):
        return self.__number_ECTS

    def from_dict(self, dict):"""

    # def __str__(self, ):
    #     pass
    def __init__(self, name):
        self.__name = name

    def set_name(self, name):
        self.__name = name

    def get_name(self):
        return self.__name

    def __str__(self):
        return self.__name