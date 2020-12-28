from server.bo import BusinessObjects as bo
class Role(bo.BusinessObjects):
    

    def __init__(self, name = ""):
        super().__init__()
        self.__name = name

    def set_name(self, name):
        self.__name = name

    def get_name(self):
        return self.__name

    def __str__(self):
        return self.__name
    
    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in ein Role()-Objekt."""
        obj = Role()
        obj.set_name(dictionary["name"])  # eigentlich Teil von BusinessObject !
        return obj


