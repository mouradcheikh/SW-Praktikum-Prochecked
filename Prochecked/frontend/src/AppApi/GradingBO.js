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
  constructor(acreation_date, agrade, apassed) {
    super();
    this.creation_date = acreation_date
    this.grade = agrade
    this.passed = apassed
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



  /** 
   * Returns an Array of GradingBO from a given JSON structure.
   */
  static fromJSON(grading) {
    let result = [];

    if (Array.isArray(grading)) {
      persons.forEach((p) => {
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