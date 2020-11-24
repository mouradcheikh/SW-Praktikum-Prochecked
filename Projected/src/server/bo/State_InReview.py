from ProjectState import ProjectState

class State_InReview(ProjectState):
    state_name = "inReview"
    allowed = ["reviewCompleted"]

