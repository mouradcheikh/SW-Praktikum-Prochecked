from ProjectState import ProjectState

class State_Accepted(ProjectState):
    state_name = "accepted"
    allowed = ["inReview"]
