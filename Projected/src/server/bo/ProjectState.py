class ProjectState(object):
    state_name = "state"
    allowed = []

    def switch(self, state):
        """ Switch to new state """
        if state.state_name in self.allowed:
            print("Erfolgreich")
            self.__class__ = state
        else:
            print("Fehlgeschlagen")

    def __str__(self):
        return self.state_name


    
