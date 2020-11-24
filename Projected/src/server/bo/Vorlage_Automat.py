class ProjectState(object):
    name = "state"
    allowed = []

    def switch(self, state):
        """ Switch to new state """
        if state.name in self.allowed:
            print("Erfolgreich")
            self.__class__ = state
        else:
            print("Fehlgeschlagen")

    def __str__(self):
        return self.name


class State_New(ProjectState):
    name = "new"
    allowed = ["accepted", "declined"]

class State_Accepted(ProjectState):
    name = "accepted"
    allowed = ["inReview"]

class State_Declined(ProjectState):
    name = "declined"
    allowed = []

class State_InReview(ProjectState):
    name = "inReview"
    allowed = ["reviewCompleted"]

class State_ReviewCompleted(ProjectState):
    name = "reviewCompleted"
    allowed = []



class Automat(object):
    def __init__(self, name):
        self.name = name
        self.state = State_New()

    def change(self, state):
        self.state.switch(state)

if __name__ == "__main__":

    Projekt1 = Automat("ADS")
    Projekt1.change(State_Accepted)
    Projekt1.change(State_Declined)
    Projekt1.change(State_InReview)