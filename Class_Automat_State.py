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


class New(ProjectState):
    name = "new"
    allowed = ["accepted", "declined"]

class Accepted(ProjectState):
    name = "accepted"
    allowed = ["inReview"]

class Declined(ProjectState):
    name = "declined"
    allowed = []

class InReview(ProjectState):
    name = "inReview"
    allowed = ["reviewCompleted"]

class ReviewCompleted(ProjectState):
    name = "reviewCompleted"
    allowed = []



class Project(object):
    def __init__(self, name):
        self.name = name
        self.state = New()

    def change(self, state):
        self.state.switch(state)

if __name__ == "__main__":

    Zustand_New = New()
    Zustand_Acceped = Accepted()
    Zustand_Declined = Declined()
    Zustand_inReview = InReview()
    Zustand_ReviewCompleted = ReviewCompleted()

    Projekt1 = Project("ADS")
    Projekt1.change(Accepted)
    Projekt1.change(Declined)
    Projekt1.change(InReview)