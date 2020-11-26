class ProjectState:

    def __init__(self, txt="New"):
        self.name = txt

    def get_name(self):
        return self.name

    def set_name(self, txt):
        self.name = txt
    
    def __str__(self):
        return self.name

    #Vergleicht die Identität zweier Objekte miteinander und gibt ein True zurück, falls diese übereinstimmt
    def __eq__(self, other):
        if isinstance(other, ProjectState):
            #Prüft ob ein Objekt eine Instanz der Klasse ProjectState ist, falls ja Return True
            return self.name == other.name
        else:
            return False


    
