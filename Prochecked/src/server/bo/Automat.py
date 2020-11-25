from ProjectState import ProjectState


class Automat:
    s_new = ProjectState("New")
    s_approved = ProjectState("Approved")
    s_dismissed = ProjectState("Dismissed")
    s_inreview = ProjectState("In Review")
    s_reviewCompleted = ProjectState("Review completed")

    def _init_(self):
        self.current_state = Automat.s_new

    def set_state(self, zustand):
        self.current_state = zustand

    def is_in_state(self, zustand):
        return zustand == self.current_state

if __name__ == "__main__":

    a = Automat(Automat.s_new)

    if a.is_in_state(Automat.s_new):
        print("Bin in New!")

    a.set_state(Automat.s_approved)

    if a.is_in_state(Automat.s_approved):
        print("Bin jetzt in Approved!")
