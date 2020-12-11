import BusinessObject from './BusinessObject';

/**
 * Represents a participation of the system
 */
export default class ParticipationBO extends BusinessObject {

  /**
   * Constructs a ParticipationBO object with a given student, grading, project and module
   * 
   * @param {String} aname - the name of this ParticipationBO.
   */
  constructor(astudent, agrading, aproject, amodule) {
    super();
    this.student = astudent;
    this.grading = agrading
    this.project = aproject
    this.module = amodule
  }

  /**
   * Sets a new name
   * 
   * @param {String} aname - the new name of this ParticipationBO.
   */
  setStudent(astudent) {
    this.student = astudent;
  }

  /**
   * Gets the name.
   */
  getStudent() {
    return this.student;
  }

  setGrading(agrading){
    this.grading = agrading
  }

  getGrading(){
    return this.grading
  }

  setProject(aproject){
    this.project = aproject
  }

  getProject(){
    return this.project
  }

  setModule(amodule){
    this.module = amodule
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