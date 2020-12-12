import BusinessObject from './BusinessObject';

/**
 * Represents a participation of the system
 */
export default class ParticipationBO extends BusinessObject {

  /**
   * Constructs a ParticipationBO object with a given student, grading, project and module
   * 
   * @param {String} aname - the name of this ParticipationBO. //STIMMT DAS HIER ???
   */
  constructor(astudentID, agradingID, aprojectID, amoduleID) {
    super();
    this.student = astudentID
    this.grading = agradingID
    this.project = aprojectID
    this.module = amoduleID
  }

  /**
   * Sets a new name
   * 
   * @param {String} aname - the new name of this ParticipationBO.
   */
  setStudent(astudentID) {
    this.student = astudentID;
  }

  /**
   * Gets the name.
   */
  getStudent() {
    return this.student;
  }

  setGrading(agradingID){
    this.grading = agradingID
  }

  getGrading(){
    return this.grading
  }

  setProject(aprojectID){
    this.project = aprojectID
  }

  getProject(){
    return this.project
  }

  setModule(amoduleID){
    this.module = amoduleID
  }

  getModule(){
    return this.module
  }

  /** 
   * Returns an Array of ParticipationBOs from a given JSON structure.
   */
  static fromJSON(participations) {
    let result = [];

    if (Array.isArray(participations)) {
      participations.forEach((p) => {
        Object.setPrototypeOf(p, ParticipationBO.prototype);
        result.push(p);
      })
    } else {
      // Es handelt sich offenbar um ein singuläres Objekt
      let p = participations;
      Object.setPrototypeOf(p, ParticipationBO.prototype);
      result.push(p);
    }

    return result;
  }
}