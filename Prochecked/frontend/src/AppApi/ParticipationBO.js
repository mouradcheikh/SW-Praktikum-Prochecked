import BusinessObject from './BusinessObject';

/**
 * Represents a participation of the system
 */
export default class ParticipationBO extends BusinessObject {

  /**
   * Constructs a ParticipationBO object with a given student, grading, project and module
   * 
   * @param {String} astudentID - the name of this ParticipationBO. 
   */
  constructor() { //astudentID, agradingID, aprojectID, amoduleID (rausgenommen da sonst undefined)
    super();
    this.student_id = null
    this.grading_id = null
    this.project_id = null
    this.module_id = null
  }

  /**
   * Sets a new name
   * 
   * @param {String} aname - the new name of this ParticipationBO.
   */
  setStudent(astudentID) {
    this.student_id = astudentID;
  }

  getStudent(){
    return this.student_id
  }

  setGrading(agradingID){
    this.grading_id = agradingID
  }

  getGrading(){
    return this.grading_id
  }

  setProject(aprojectID){
    this.project_id = aprojectID
  }

  getProject(){
    return this.project_id
  }

  setModule(amoduleID){
    this.module_id = amoduleID
  }

  getModule(){
    return this.module_id
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