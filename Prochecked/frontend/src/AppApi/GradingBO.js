import BusinessObject from './BusinessObject';


/**
 * Represents a person of the system
 */
export default class GradingBO extends BusinessObject {

  /**
   * Constructs a GradingBO object with a given creation_date, grade, passed
   * 
   * @param {String} aname - the name of this GradingBO.
   */
  constructor(agrade, aparticipation_id) {
    super();
    this.creation_date = null
    this.grade = agrade
    this.passed = false
    this.participation = aparticipation_id
  }

  /**
   * Sets a new name
   * 
   * @param {String} aname - the new name of this PersonBO.
   */
  setCreationDate(acreation_date) {
    this.creation_date = acreation_date
  }

  /**
   * Gets the name.
   */
  getCreationDate() {
    return this.getCreationDate
  }

  setGrade(agrade){
    this.grade = agrade
  }

  getGrade(){
    return this.grade
  }

  setPassed(apassed){
    this.passed = apassed
  }

  getPassed(){
    return this.passed
  }

  setParticipation(aparticipation_id) {
    this.participation = aparticipation_id
  }
  
  getParticipation(){
    return this.participation
  }



  /** 
   * Returns an Array of GradingBO from a given JSON structure.
   */
  static fromJSON(grading) {
    let result = [];

    if (Array.isArray(grading)) {
      grading.forEach((p) => {
        Object.setPrototypeOf(p, GradingBO.prototype);
        result.push(p);
      })
    } else {
      // Es handelt sich offenbar um ein singuläres Objekt
      let p = grading;
      Object.setPrototypeOf(p, GradingBO.prototype);
      result.push(p);
    }

    return result;
  }
}