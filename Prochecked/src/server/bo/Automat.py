from State_New  import State_New
from State_Accepted import State_Accepted
from State_Declined import State_Declined
from State_InReview import State_InReview
from State_ReviewCompleted import State_ReviewCompleted


class Automat(object):
    def __init__(self, automat_name):
        self.automat_name = automat_name
        self.current_state = State_New()

    def change(self, state):
        self.state.switch(state)

    def __str__(self):
        return self.automat_name
if __name__ == "__main__":

    Projekt1 = Automat("ADS")
    Projekt1.change(State_Accepted)
    Projekt1.change(State_Declined)
    Projekt1.change(State_InReview)

    Projekt2 = Automat("SE")
    print(Projekt2)

    def get current_state (self):
        return self.current_state

    def set current_state (self,state)
        self.current_state = state
