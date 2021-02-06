class ProjectState:
    """Der Projektstatus gibt den Status eines Projekts an"""

    def __init__(self, txt="New"):
        self.name = txt

    def get_name(self):
        """Auslesen des Namen"""
        return self.name

    def set_name(self, txt):
        """Setzen des Namen"""
        self.name = txt
    
    def __str__(self):
        """Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz"""
        return self.name

    
    def __eq__(self, other):
        """Vergleicht die Identität zweier Objekte miteinander und gibt ein True zurück, falls diese übereinstimmt"""
        if isinstance(other, ProjectState):
            return self.name == other.name
        else:
            return False


    
