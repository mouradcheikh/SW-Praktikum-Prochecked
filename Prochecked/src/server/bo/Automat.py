from server.bo.ProjectState import ProjectState


class Automat:

    #Statische Variablen der Zustände, die nach dem Anlegen eines Automats(Projekts) diesem zugeordnet werden können.
    #Jedes dieser Varablen initiiert ein Objekt der Klasse ProjectState
    s_new = ProjectState("New")
    s_accepted = ProjectState("Accepted")
    s_declined = ProjectState("Declined")
    s_inReview = ProjectState("In Review")
    s_reviewCompleted = ProjectState("Review completed")

    def __init__(self):
        #Beim erzeugen eines Objeks, wird der Zustand automatisch auf neu gesetzt
        self.current_state = Automat.s_new

    def set_state(self, zustand):
        self.current_state = zustand

    def get_state(self):
        return self.current_state

    def is_in_state(self, zustand):
        #prüft ob der derzeitige Status mit dem mitgegebenen Atrribut übereinstimmt, falls ja gibt er True zurück, sonst False
        return zustand == self.current_state
    
    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in ein Automat()-Objekt."""
        obj = Automat()
        obj.set_state(dictionary["zustand"])  # eigentlich Teil von BusinessObject !
      
        return obj
    
