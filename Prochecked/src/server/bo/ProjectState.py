class ProjectState:

    def __init__(self, txt="New"):
        self.name = txt

    def get_name(self):
        return self.name

    def set_name(self, txt):
        self.name = txt

    def __eq__(self, other):
        if isinstance(other, ProjectState):
            return self.name == other.name
        else:
            return False


    
